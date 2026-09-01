/**
 * Purchase Orders — Sprint 3 (Supply Chain Design 3)
 *
 * Buyer-facing PO endpoints. Buyer is one of:
 *   - Restaurant (Restaurant Admin / Owner / Staff)
 *   - Brand (Brand General / Manager)
 *   - Foodcourt (Foodcourt General / Manager)
 *
 * Sprint 3 simplifications (will be relaxed in Sprint 4):
 *   - submit transitions draft → confirmed (no separate supplier-confirm step)
 *   - mark-shipped is buyer self-action
 *   - cancel only allowed on draft
 *
 * 9 endpoints — all require: authenticateToken + requireBuyerRole
 */

const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const database = require('../config/database');
const {
  PurchaseOrder,
  PurchaseOrderItem,
  PurchaseOrderReturn,
  IngredientSellerProduct,
  Ingredient,
  SupplierContract,
  SupplierCompany,
  InventoryBatch,
  InventoryTransaction,
  StockAlert,
  Restaurant,
  RestaurantIngredientCost
} = require('../models');
const { authenticateToken } = require('../middleware/auth');
const { requireBuyerRole } = require('../middleware/buyerScope');
const { sanitizeString } = require('../middleware/validation');
const { appendTrackingEvent, emitPoEvent } = require('../services/poRealtimeService');
const { normalizeCurrencyCode, sameCurrency } = require('../utils/currency');
const { resolveSellers, getSeller, getSellerName, isExternalSeller } = require('../utils/sellerNames');
const { readableIngredient, parentBrandIdOf, overlayMapFor, effectiveSettings } = require('../utils/brandStockAccess');
const { applySubmitGate } = require('../utils/poOwnerApproval');
const { stockTargetAttrs } = require('../utils/stockTarget');
const { attachSellerProductIdentity } = require('../utils/sellerProductIdentity');
// 발주 알림은 services/poNotifications.js 단일 소스. 2026-08-30: 이 파일에 같은 이름의
// 로컬 정의가 한 벌 더 있어 경로별로 갈릴 수 있었다(동작은 동일했음) → 서비스로 통합.
const { fireOwnerApprovalPendingNotification, fireSellerSubmittedNotification, fireBuyerConfirmNotification } = require('../services/poNotifications');

const FRONTEND_URL = process.env.FRONTEND_URL || (process.env.NODE_ENV === 'production' ? 'https://purplehere.com' : 'https://dev.purplehere.com');

// Path-level guards so unrelated /api/* fall-throughs aren't blocked by buyer-role.
router.use('/purchase-orders', authenticateToken, requireBuyerRole);

// ============================================
// Helpers
// ============================================

const VALID_SELLER_TYPES = ['system_admin', 'brand', 'foodcourt', 'supplier'];

const ENTITY_TYPE_PREFIX = {
  restaurant: 'R',
  brand: 'B',
  foodcourt: 'F'
};

function buyerScopeRequired(req, res) {
  if (!req.buyerEntity) {
    res.status(400).json({
      success: false,
      message: 'entity_type & entity_id query params required for System Admin'
    });
    return false;
  }
  return true;
}

function checkPOOwnership(po, req) {
  if (req.buyerIsAdmin && !req.buyerEntity) return true; // SA without override
  if (!req.buyerEntity) return false;
  return po.entity_type === req.buyerEntity.type && po.entity_id === req.buyerEntity.id;
}

/**
 * Verify the buyer may ORDER this ingredient.
 *
 * A restaurant may order its own stock items AND its parent brand's shared ones
 * (브랜드 표준 재료 — 정의는 브랜드, 발주는 매장). Ownership rules live in one place:
 * utils/brandStockAccess.js. brand_id is resolved server-side there (never from the client)
 * so sibling brands of the same owner cannot leak.
 */
async function ingredientBelongsToBuyer(ingredientId, buyerEntity) {
  return readableIngredient(ingredientId, buyerEntity);
}

/**
 * Verify the buyer can purchase from this seller (Phase 2 — 2026-04-27).
 *
 *  supplier      → SupplierContract status='active' required
 *  brand   (BG)  → Restaurant.brand_id === seller_id (소속 자체가 계약)
 *  foodcourt(FG) → Restaurant.foodcourt_id === seller_id (입점 자체가 계약)
 *  system_admin  → 항상 허용 (POS 자체 카탈로그)
 *
 * Returns { allowed: boolean, contractId: number|null, reason?: string }.
 */
async function verifySellerRelation(sellerType, sellerEntityId, buyerEntity) {
  if (!buyerEntity) return { allowed: false, contractId: null, reason: 'NO_BUYER_SCOPE' };

  if (sellerType === 'system_admin') {
    return { allowed: true, contractId: null };
  }

  const sellerId = parseInt(sellerEntityId, 10);
  if (!Number.isFinite(sellerId)) {
    return { allowed: false, contractId: null, reason: 'INVALID_SELLER' };
  }

  if (sellerType === 'supplier') {
    // 외부업체는 부모 브랜드 계약을 상속해 레스토랑이 발주 가능 (Fable 2026-07-05)
    const { findEffectiveContract } = require('../utils/supplierAccess');
    const contract = await findEffectiveContract(sellerId, buyerEntity);
    if (!contract) return { allowed: false, contractId: null, reason: 'NO_ACTIVE_CONTRACT' };
    return { allowed: true, contractId: contract.id };
  }

  // brand / foodcourt sellers: only Restaurant buyers can purchase from them.
  if (buyerEntity.type !== 'restaurant') {
    return { allowed: false, contractId: null, reason: 'BG_FG_RESTAURANT_ONLY' };
  }

  const restaurant = await Restaurant.findByPk(buyerEntity.id);
  if (!restaurant) return { allowed: false, contractId: null, reason: 'RESTAURANT_NOT_FOUND' };

  if (sellerType === 'brand') {
    if (parseInt(restaurant.brand_id, 10) !== sellerId) {
      return { allowed: false, contractId: null, reason: 'NOT_OWN_BRAND' };
    }
    return { allowed: true, contractId: null };
  }

  if (sellerType === 'foodcourt') {
    if (parseInt(restaurant.foodcourt_id, 10) !== sellerId) {
      return { allowed: false, contractId: null, reason: 'NOT_OWN_FOODCOURT' };
    }
    return { allowed: true, contractId: null };
  }

  return { allowed: false, contractId: null, reason: 'INVALID_SELLER_TYPE' };
}

/** Generate the next PO number for this buyer entity.
 *  Uses MAX(seq) of existing po_numbers (paranoid:false to include soft-deleted)
 *  so hard-deleted gaps don't cause duplicate-key collisions.
 *  offset: in-transaction sequence offset (bulk creates use 0, 1, 2, ...).
 */
async function generatePoNumber(buyerEntity, offset = 0) {
  const prefix = ENTITY_TYPE_PREFIX[buyerEntity.type] || 'X';
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const dateStr = `${yyyy}${mm}${dd}`;

  const baseNumber = `PO-${prefix}${buyerEntity.id}-${dateStr}`;
  // Use raw SQL to inspect raw + soft-deleted po_numbers (paranoid:false).
  const { sequelize } = require('../config/database');
  const [rows] = await sequelize.query(
    `SELECT po_number FROM purchase_orders
     WHERE po_number LIKE :pat
     ORDER BY po_number DESC
     LIMIT 1`,
    { replacements: { pat: `${baseNumber}-%` } }
  );
  let nextSeq = 1;
  if (rows && rows[0] && rows[0].po_number) {
    const match = String(rows[0].po_number).match(/-(\d+)$/);
    if (match) nextSeq = parseInt(match[1], 10) + 1;
  }
  const seq = String(nextSeq + offset).padStart(3, '0');
  return `${baseNumber}-${seq}`;
}

/** Recompute totals from the items array. */
function computeTotals(items) {
  let subtotal = 0;
  for (const it of items) {
    const qty = parseFloat(it.quantity_ordered) || 0;
    const price = parseFloat(it.unit_price) || 0;
    const line = Math.round(qty * price * 100) / 100;
    subtotal += line;
  }
  subtotal = Math.round(subtotal * 100) / 100;
  return { subtotal, total_amount: subtotal, tax_amount: 0 };
}

// ============================================
// 1. GET /api/purchase-orders
// ============================================
// PO CRUD: list/get/suggestions/create/bulk/update/pdf
// split from purchase-orders.js (2026-05-03)

router.get('/purchase-orders', async (req, res) => {
  try {
    if (!req.buyerEntity && !req.buyerIsAdmin) {
      return res.status(400).json({ success: false, message: 'Buyer scope required' });
    }

    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 20));
    const offset = (page - 1) * limit;

    const where = {};
    if (req.buyerEntity) {
      where.entity_type = req.buyerEntity.type;
      where.entity_id = req.buyerEntity.id;
    }
    if (req.query.status) where.status = req.query.status;
    if (req.query.seller_type && VALID_SELLER_TYPES.includes(req.query.seller_type)) {
      where.seller_type = req.query.seller_type;
    }
    // 날짜 범위 필터 (created_at)
    if (req.query.from || req.query.to) {
      const dateWhere = {};
      if (req.query.from) dateWhere[Op.gte] = new Date(req.query.from + 'T00:00:00');
      if (req.query.to) dateWhere[Op.lte] = new Date(req.query.to + 'T23:59:59');
      where.created_at = dateWhere;
    }

    const { rows, count } = await PurchaseOrder.findAndCountAll({
      where,
      order: [['created_at', 'DESC']],
      limit,
      offset,
      distinct: true
    });

    // 모든 PO에 item_count / total_quantity / seller_name / is_external 항상 포함
    // (Staging 페이지: include=items || status=draft 일 때는 items 배열 + seller 객체도 함께)
    const includeItems = req.query.include === 'items' || req.query.status === 'draft';
    const ids = rows.map(p => p.id);

    // Item 집계 (모든 PO 공통)
    const itemAggRows = ids.length ? await PurchaseOrderItem.findAll({
      where: { purchase_order_id: { [Op.in]: ids } },
      attributes: [
        'purchase_order_id',
        [database.sequelize.fn('COUNT', database.sequelize.col('id')), 'item_count'],
        [database.sequelize.fn('SUM', database.sequelize.col('quantity_ordered')), 'total_quantity']
      ],
      group: ['purchase_order_id'],
      raw: true
    }) : [];
    const aggMap = Object.fromEntries(itemAggRows.map(r => [r.purchase_order_id, r]));

    // 판매자 정보 — supplier / brand / foodcourt 전부. (2026-07-12: supplier 만 조회해서
    // 브랜드 발주의 공급업체 이름이 비어 있었다. 해석은 utils/sellerNames 단일 소스.)
    const sellerMap = await resolveSellers(rows);

    // includeItems 일 때만 items 배열 동봉
    let itemsByPo = {};
    if (includeItems && ids.length) {
      // 2026-06-22 (Irene): 품목 이름을 함께 (staging 표시 + WhatsApp/Email 내용). description 스냅샷 우선,
      // 없으면 ingredient.name. (Item #id 만 보이던 문제)
      const allItems = await PurchaseOrderItem.findAll({
        where: { purchase_order_id: { [Op.in]: ids } },
        include: [{ model: Ingredient, as: 'ingredient', attributes: ['id', 'name'], required: false }]
      });
      const plainItems = [];
      for (const it of allItems) {
        const plain = it.toJSON();
        plain.product_name = plain.description || (plain.ingredient && plain.ingredient.name) || null;
        plainItems.push(plain);
        (itemsByPo[plain.purchase_order_id] = itemsByPo[plain.purchase_order_id] || []).push(plain);
      }
      // 2026-08-27 (Irene): staging 에서 보내는 WhatsApp/이메일에도 공급업체 판매품목명·SKU 가
      // 나가야 한다(받는 쪽이 자기 창고에서 대조 가능하게). 단일 소스 = utils/sellerProductIdentity.
      await attachSellerProductIdentity({ items: plainItems });
    }

    const enriched = rows.map(p => {
      const plain = p.toJSON();
      const agg = aggMap[p.id] || {};
      plain.item_count = parseInt(agg.item_count || 0, 10);
      plain.total_quantity = parseFloat(agg.total_quantity || 0);
      plain.seller_name = getSellerName(sellerMap, p.seller_type, p.seller_entity_id);
      plain.is_external = isExternalSeller(sellerMap, p.seller_type, p.seller_entity_id);
      if (includeItems) {
        plain.items = itemsByPo[p.id] || [];
        plain.seller = getSeller(sellerMap, p.seller_type, p.seller_entity_id);
      }
      return plain;
    });

    res.json({
      success: true,
      data: enriched,
      pagination: { total: count, page, limit, totalPages: Math.ceil(count / limit) }
    });
  } catch (err) {
    console.error('GET /api/purchase-orders error:', err);
    res.status(500).json({ success: false, message: 'Failed to load purchase orders' });
  }
});

// ============================================
// 9. GET /api/purchase-orders/suggestions
//    (defined BEFORE /:id to avoid route collision)
// ============================================
router.get('/purchase-orders/suggestions', async (req, res) => {
  try {
    if (!buyerScopeRequired(req, res)) return;

    // 대상 = 내 재료 ∪ 부모 브랜드 표준 재료 (재고관리의 Bulk Order 체크박스와 발주 페이지
    // 제안 패널이 이 라우트를 쓴다 — 대시보드 제안만 고치면 "부족하다고 뜨는데 담을 수가 없는"
    // 반쪽이 된다. Fable 2026-07-13)
    //
    // ⚠ 브랜드 분기에 `min_stock > 0` SQL 필터를 걸면 안 된다 — 브랜드 행의 min_stock 은 0 이고
    //   실제 임계치는 **매장 오버레이**에 있다. 브랜드 쪽은 전부 뽑아 effective 로 거른다.
    let ownershipOr;
    if (req.buyerEntity.type === 'restaurant') {
      const brandId = await parentBrandIdOf(req.buyerEntity.id);
      ownershipOr = [
        { restaurant_id: req.buyerEntity.id, min_stock: { [Op.gt]: 0 } },
        ...(brandId ? [{ owner_type: 'brand', brand_id: brandId }] : [])
      ];
    } else if (req.buyerEntity.type === 'brand') {
      ownershipOr = [{ brand_id: req.buyerEntity.id, min_stock: { [Op.gt]: 0 } }];
    } else {
      // foodcourt: no foodcourt_id on Ingredient — return empty
      return res.json({ success: true, data: { groups: [] } });
    }

    const ingredients = await Ingredient.findAll({
      where: {
        [Op.or]: ownershipOr,
        is_active: true
        // 2026-09-01(Q5): track_stock 조건 제거 — 스위치가 꺼졌다고 발주 화면에서 사라지면 안 된다
      }
    });

    // 브랜드 재료의 재고·임계치는 이 매장의 오버레이가 진실 (지점마다 발주점이 다르다)
    const sugOverlay = req.buyerEntity.type === 'restaurant'
      ? await overlayMapFor(req.buyerEntity.id, ingredients.filter(i => i.owner_type === 'brand').map(i => i.id))
      : {};
    const effOf = (ing) => {
      const isBrandShared = req.buyerEntity.type === 'restaurant' && ing.owner_type === 'brand';
      const overlay = isBrandShared ? sugOverlay[ing.id] : null;
      const eff = effectiveSettings(ing, overlay);
      return {
        isBrandShared,
        cur: isBrandShared
          ? (overlay ? parseFloat(overlay.current_stock) || 0 : 0)
          : (parseFloat(ing.current_stock) || 0),
        min: parseFloat(eff.min_stock) || 0
      };
    };

    const lowIngredients = ingredients.filter(ing => {
      const { cur, min } = effOf(ing);
      return min > 0 && cur < min;
    });

    if (lowIngredients.length === 0) {
      return res.json({ success: true, data: { groups: [] } });
    }

    const ingIds = lowIngredients.map(i => i.id);

    // Preferred sellers per ingredient
    const sellerSources = await IngredientSellerProduct.findAll({
      where: {
        ingredient_id: { [Op.in]: ingIds },
        is_active: true
      },
      order: [['is_preferred', 'DESC'], ['unit_price', 'ASC']]
    });

    const preferredByIng = {};
    for (const s of sellerSources) {
      if (!preferredByIng[s.ingredient_id]) preferredByIng[s.ingredient_id] = s;
    }

    // 판매자 이름 (supplier/brand/foodcourt/system_admin) — 목록·상세와 동일 해석기
    const sellerMap = await resolveSellers(Object.values(preferredByIng));

    // Build suggestion entries grouped by seller
    const groups = {};
    for (const ing of lowIngredients) {
      const { cur, min, isBrandShared } = effOf(ing);
      const suggested = Math.max(0, Math.round(((min * 1.5) - cur) * 100) / 100);
      const seller = preferredByIng[ing.id] || null;

      const groupKey = seller
        ? `${seller.seller_type}:${seller.seller_entity_id || 0}`
        : 'unassigned:0';

      if (!groups[groupKey]) {
        groups[groupKey] = {
          seller_type: seller ? seller.seller_type : null,
          seller_entity_id: seller ? seller.seller_entity_id : null,
          seller_name: seller ? getSellerName(sellerMap, seller.seller_type, seller.seller_entity_id) : null,
          items: []
        };
      }
      groups[groupKey].items.push({
        ingredient: {
          id: ing.id,
          name: ing.name,
          unit: ing.unit,
          current_stock: cur,   // 브랜드 재료면 이 매장의 오버레이 재고
          min_stock: min,       // 브랜드 재료면 이 매장의 임계치
          owner_type: ing.owner_type
        },
        is_brand_shared: isBrandShared,
        suggested_qty: suggested,
        seller_source: seller ? {
          id: seller.id,
          unit_price: parseFloat(seller.unit_price) || 0,
          unit_conversion: parseFloat(seller.unit_conversion) || 1,
          min_order_quantity: seller.min_order_quantity,
          lead_time_days: seller.lead_time_days
        } : null
      });
    }

    res.json({ success: true, data: { groups: Object.values(groups) } });
  } catch (err) {
    console.error('GET /api/purchase-orders/suggestions error:', err);
    res.status(500).json({ success: false, message: 'Failed to compute suggestions' });
  }
});

// ============================================
// 2. GET /api/purchase-orders/:id
// ============================================
router.get('/purchase-orders/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (!Number.isFinite(id)) {
      return res.status(404).json({ success: false, message: 'Purchase order not found' });
    }

    const po = await PurchaseOrder.findByPk(id, {
      include: [{
        model: PurchaseOrderItem,
        as: 'items',
        include: [
          { model: Ingredient, as: 'ingredient' },
          { model: IngredientSellerProduct, as: 'sellerSource' }
        ]
      }]
    });
    if (!po) {
      return res.status(404).json({ success: false, message: 'Purchase order not found' });
    }
    if (!checkPOOwnership(po, req)) {
      return res.status(404).json({ success: false, message: 'Purchase order not found' });
    }

    // seller 정보 + is_external 보강 (supplier/brand/foodcourt 동일 규칙 — utils/sellerNames)
    const plain = po.toJSON();
    const sellerMap = await resolveSellers([po]);
    plain.seller_name = getSellerName(sellerMap, po.seller_type, po.seller_entity_id);
    plain.seller = getSeller(sellerMap, po.seller_type, po.seller_entity_id);
    plain.is_external = isExternalSeller(sellerMap, po.seller_type, po.seller_entity_id);

    // Item-level identity flattening (P0-3): internal name (RA Ingredient or BG
    // ProductIngredient or description) + supplier's own sale-product name/SKU via
    // the sellerSource mapping. So the PO detail screen can show both.
    const items = plain.items || [];
    if (items.length) {
      const { ProductIngredient } = require('../models');
      const pIngIds = [...new Set(items.map(it => it.product_ingredient_id).filter(Boolean))];
      const [, pIngRows] = await Promise.all([
        // 판매품목명·SKU 는 단일 소스(utils/sellerProductIdentity)로 — 인쇄본·공유메시지·
        // 공급업체 수신함이 같은 이름을 쓰게 한다
        attachSellerProductIdentity(plain),
        pIngIds.length ? ProductIngredient.findAll({ where: { id: pIngIds }, attributes: ['id', 'name', 'unit'] }) : []
      ]);
      const pIngMap = Object.fromEntries(pIngRows.map(p => [p.id, p]));
      for (const it of items) {
        it.ingredient_name = (it.ingredient && it.ingredient.name) || (pIngMap[it.product_ingredient_id] && pIngMap[it.product_ingredient_id].name) || it.description || null;
      }
    }

    res.json({ success: true, data: plain });
  } catch (err) {
    console.error('GET /api/purchase-orders/:id error:', err);
    res.status(500).json({ success: false, message: 'Failed to load purchase order' });
  }
});

// ============================================
// PO creation core (used by single + bulk endpoints)
// Returns: { ok: true, po } or { ok: false, status, body }
// ============================================
/**
 * Resolve credit_limit for a given (buyer, seller) pair, plus the (issuer,payer)
 * filter needed to total outstanding invoices.
 *
 * Returns: { credit_limit, currency, issuer_type, issuer_id, payer_type, payer_id }
 *  - credit_limit null/0 → no limit (caller passes through)
 */
async function resolveCreditTermsForPair({ buyerEntity, seller_type, seller_entity_id, contract_id }) {
  if (seller_type === 'supplier' && contract_id) {
    const SupplierContract = require('../models/SupplierContract');
    const contract = await SupplierContract.findByPk(contract_id);
    if (!contract?.payment_terms) return null;
    // payer = buyer side (restaurant / brand_manager / foodcourt_manager)
    let payer_type = null, payer_id = null;
    if (buyerEntity.type === 'restaurant') {
      payer_type = 'restaurant'; payer_id = buyerEntity.id;
    } else if (buyerEntity.type === 'brand') {
      const Brand = require('../models/Brand');
      const b = await Brand.findByPk(buyerEntity.id, { attributes: ['owner_id'] });
      if (!b?.owner_id) return null;
      payer_type = 'brand_manager'; payer_id = b.owner_id;
    } else if (buyerEntity.type === 'foodcourt') {
      const Foodcourt = require('../models/Foodcourt');
      const f = await Foodcourt.findByPk(buyerEntity.id, { attributes: ['owner_id'] });
      if (!f?.owner_id) return null;
      payer_type = 'foodcourt_manager'; payer_id = f.owner_id;
    }
    if (!payer_type) return null;
    return {
      credit_limit: contract.payment_terms.credit_limit,
      currency: contract.payment_terms.currency,
      issuer_type: 'supplier',
      issuer_id: contract.supplier_company_id,
      payer_type, payer_id
    };
  }

  if (seller_type === 'brand' && seller_entity_id && buyerEntity.type === 'restaurant') {
    const Restaurant = require('../models/Restaurant');
    const r = await Restaurant.findByPk(buyerEntity.id, {
      attributes: ['id', 'brand_id', 'brand_billing_terms']
    });
    if (!r || r.brand_id !== parseInt(seller_entity_id, 10)) return null;
    if (!r.brand_billing_terms) return null;
    return {
      credit_limit: r.brand_billing_terms.credit_limit,
      currency: r.brand_billing_terms.currency,
      issuer_type: 'brand',
      issuer_id: r.brand_id,
      payer_type: 'restaurant',
      payer_id: r.id
    };
  }

  if (seller_type === 'foodcourt' && seller_entity_id && buyerEntity.type === 'restaurant') {
    const Restaurant = require('../models/Restaurant');
    const r = await Restaurant.findByPk(buyerEntity.id, {
      attributes: ['id', 'foodcourt_id', 'foodcourt_billing_terms']
    });
    if (!r || r.foodcourt_id !== parseInt(seller_entity_id, 10)) return null;
    if (!r.foodcourt_billing_terms) return null;
    return {
      credit_limit: r.foodcourt_billing_terms.credit_limit,
      currency: r.foodcourt_billing_terms.currency,
      issuer_type: 'foodcourt',
      issuer_id: r.foodcourt_id,
      payer_type: 'restaurant',
      payer_id: r.id
    };
  }

  return null;
}

/**
 * Enforce credit limit on PO create.
 * Returns { ok: true } when no limit is configured or under limit.
 * Returns { ok: false, message, hint, outstanding, credit_limit } when blocked.
 */
async function checkCreditLimit({ buyerEntity, seller_type, seller_entity_id, contract_id, newOrderTotal, currency }) {
  const terms = await resolveCreditTermsForPair({ buyerEntity, seller_type, seller_entity_id, contract_id });
  if (!terms) return { ok: true };
  const limit = parseFloat(terms.credit_limit);
  if (!Number.isFinite(limit) || limit <= 0) return { ok: true };

  // Sum outstanding (unpaid / overdue / payment_submitted) trade+SOA invoices for this pair.
  // SOA child invoices have parent_soa_invoice_id set — count only the SOA parent or
  // standalone trade invoices, not both, to avoid double-counting.
  const Invoice = require('../models/Invoice');
  const { Op } = require('sequelize');
  const invoices = await Invoice.findAll({
    where: {
      invoice_category: { [Op.in]: ['trade', 'soa'] },
      issuer_type: terms.issuer_type,
      issuer_id: terms.issuer_id,
      payer_type: terms.payer_type,
      payer_id: terms.payer_id,
      status: { [Op.in]: ['pending_payment', 'overdue', 'payment_submitted'] }
    },
    attributes: ['id', 'total_amount', 'paid_amount', 'invoice_category', 'parent_soa_invoice_id']
  });

  let outstanding = 0;
  for (const inv of invoices) {
    // Skip child trade invoices already bundled into a SOA parent (avoid double count)
    if (inv.invoice_category === 'trade' && inv.parent_soa_invoice_id) continue;
    const total = parseFloat(inv.total_amount) || 0;
    const paid = parseFloat(inv.paid_amount) || 0;
    outstanding += Math.max(0, total - paid);
  }
  outstanding = Math.round(outstanding * 100) / 100;

  const projected = outstanding + (parseFloat(newOrderTotal) || 0);
  if (projected <= limit) return { ok: true };

  const cur = currency || terms.currency || 'MYR';
  const fmt = (n) => `${cur} ${Number(n).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  return {
    ok: false,
    outstanding,
    credit_limit: limit,
    currency: cur,
    message: `Credit limit exceeded: outstanding ${fmt(outstanding)} + this order ${fmt(newOrderTotal)} = ${fmt(projected)} > limit ${fmt(limit)}.`,
    hint: outstanding > 0
      ? 'Pay outstanding trade invoices first, then place this order again.'
      : 'Reduce the order total or ask the seller to raise the credit limit.'
  };
}

async function createPurchaseOrderCore({ buyerEntity, userId, payload, transaction, poNumberOffset = 0, mergeDraft = false }) {
  const { seller_type, seller_entity_id, items, expected_delivery_date, delivery_address, notes } = payload || {};

  // Buyer 엔티티 default 배송지 결정 — payload 미지정 시
  let resolvedDeliveryAddress = delivery_address;
  if (!resolvedDeliveryAddress && buyerEntity) {
    if (buyerEntity.type === 'restaurant') {
      const Restaurant = require('../models/Restaurant');
      const r = await Restaurant.findByPk(buyerEntity.id, { attributes: ['address', 'delivery_address'] });
      if (r) resolvedDeliveryAddress = r.delivery_address || r.address || null;
    } else if (buyerEntity.type === 'brand') {
      const Brand = require('../models/Brand');
      const b = await Brand.findByPk(buyerEntity.id, { attributes: ['address'] }).catch(() => null);
      if (b) resolvedDeliveryAddress = b.address || null;
    } else if (buyerEntity.type === 'foodcourt') {
      const Foodcourt = require('../models/Foodcourt');
      const f = await Foodcourt.findByPk(buyerEntity.id, { attributes: ['address'] }).catch(() => null);
      if (f) resolvedDeliveryAddress = f.address || null;
    }
  }

  if (!VALID_SELLER_TYPES.includes(seller_type)) {
    return { ok: false, status: 400, body: { success: false, message: 'Invalid seller_type' } };
  }
  if (!Array.isArray(items) || items.length === 0) {
    return { ok: false, status: 400, body: { success: false, message: 'At least one item is required' } };
  }

  const relation = await verifySellerRelation(seller_type, seller_entity_id, buyerEntity);
  if (!relation.allowed) {
    return {
      ok: false, status: 400,
      body: { success: false, code: 'NO_ACTIVE_CONTRACT', message: 'No active relation with this seller', reason: relation.reason }
    };
  }
  const contractId = relation.contractId;

  const validatedItems = [];
  for (const raw of items) {
    // 2026-09-01: 레시피 없는 프로덕트 = 재고아이템 자체(수량이 프로덕트에 산다).
    // 그전에는 발주 라인이 재료만 가리킬 수 있어 **사온 물건이 프로덕트로 들어올 길이 없었다**
    // → 같은 물건이 프로덕트와 따로 만든 재고아이템으로 갈라졌다(GIT 포장재).
    if (raw.product_id || raw.brand_product_id) {
      const isBrandSide = !!raw.brand_product_id;
      const targetKey = isBrandSide ? 'brand_product_id' : 'product_id';
      const pid = parseInt(raw[targetKey], 10);
      const qtyP = parseFloat(raw.quantity_ordered);
      if (!Number.isFinite(pid) || !(qtyP > 0)) {
        return { ok: false, status: 400, body: { success: false, message: `Each item requires ${targetKey} and quantity_ordered > 0` } };
      }
      const Model = require(isBrandSide ? '../models/BrandProduct' : '../models/Product');
      const prod = await Model.findByPk(pid, { transaction });
      if (!prod) {
        return { ok: false, status: 400, body: { success: false, message: `Product ${pid} not found` } };
      }
      // 소유권 — 프로덕트는 매장(RA) 또는 BG 오너 소유다. 남의 프로덕트로 입고가 흘러가면 안 된다.
      const owned = isBrandSide
        ? (prod.owner_user_id != null && prod.owner_user_id === userId)
        : (buyerEntity && buyerEntity.type === 'restaurant' && parseInt(prod.restaurant_id, 10) === buyerEntity.id);
      if (!owned) {
        return { ok: false, status: 400, body: { success: false, message: `Product ${pid} not accessible to this buyer` } };
      }
      // 레시피가 있으면 재고는 재료에서 빠진다 — 그런 프로덕트를 재고아이템처럼 사면 이중 계상이 된다.
      const hasRecipe = prod.product_recipe_id != null || (!isBrandSide && prod.recipe_id != null);
      if (hasRecipe || prod.is_set_menu) {
        return {
          ok: false, status: 400,
          body: { success: false, code: 'PRODUCT_HAS_RECIPE', message: `Product ${pid} has a recipe (or is a set) — order its ingredients instead` }
        };
      }
      let convP = 1, priceP = 0, mappingP = raw.ingredient_seller_product_id || null;
      if (seller_type !== 'system_admin') {
        const mw = { [targetKey]: pid, seller_type, seller_entity_id: seller_entity_id ? parseInt(seller_entity_id, 10) : null, is_active: true };
        if (raw.ingredient_seller_product_id) mw.id = raw.ingredient_seller_product_id;
        const mapping = await IngredientSellerProduct.findOne({ where: mw, transaction });
        if (!mapping) {
          return { ok: false, status: 400, body: { success: false, code: 'MAPPING_REQUIRED', message: `Product ${pid} is not mapped to this seller` } };
        }
        mappingP = mapping.id; convP = parseFloat(mapping.unit_conversion) || 1; priceP = parseFloat(mapping.unit_price) || 0;
      }
      const fConvP = raw.unit_conversion != null ? (parseFloat(raw.unit_conversion) || 1) : convP;
      const fPriceP = raw.unit_price != null ? (parseFloat(raw.unit_price) || 0) : priceP;
      validatedItems.push({
        ...stockTargetAttrs(targetKey, pid),
        ingredient_seller_product_id: mappingP,
        quantity_ordered: qtyP,
        quantity_received: 0,
        unit: raw.unit || prod.stock_unit || prod.unit || null,
        unit_price: fPriceP,
        unit_conversion: fConvP,
        line_total: Math.round((qtyP * fPriceP) * 100) / 100,
        notes: raw.notes ? sanitizeString(String(raw.notes)).slice(0, 255) : null,
        description: prod.name ? String(prod.name).slice(0, 255) : null
      });
      continue;
    }

    // BG 재고아이템(ProductIngredient) 라인 — RA ingredient_id 경로와 분리
    if (raw.product_ingredient_id) {
      const piId = parseInt(raw.product_ingredient_id, 10);
      const qtyB = parseFloat(raw.quantity_ordered);
      if (!Number.isFinite(piId) || !(qtyB > 0)) {
        return { ok: false, status: 400, body: { success: false, message: 'Each item requires product_ingredient_id and quantity_ordered > 0' } };
      }
      const ProductIngredient = require('../models/ProductIngredient');
      const pIng = await ProductIngredient.findByPk(piId, { transaction });
      // 소유권: BG 본인(owner_user_id===생성자) 만. 공용 모델이라 유저 단위.
      if (!pIng || (pIng.owner_user_id != null && pIng.owner_user_id !== userId)) {
        return { ok: false, status: 400, body: { success: false, message: `Stock item ${piId} not accessible to this buyer` } };
      }
      let convB = 1, priceB = 0, mappingB = raw.ingredient_seller_product_id || null;
      if (seller_type !== 'system_admin') {
        const mw = { product_ingredient_id: piId, seller_type, seller_entity_id: seller_entity_id ? parseInt(seller_entity_id, 10) : null, is_active: true };
        if (raw.ingredient_seller_product_id) mw.id = raw.ingredient_seller_product_id;
        const mapping = await IngredientSellerProduct.findOne({ where: mw, transaction });
        if (!mapping) {
          return { ok: false, status: 400, body: { success: false, code: 'MAPPING_REQUIRED', message: `Stock item ${piId} is not mapped to this seller` } };
        }
        mappingB = mapping.id; convB = parseFloat(mapping.unit_conversion) || 1; priceB = parseFloat(mapping.unit_price) || 0;
      }
      const fConv = raw.unit_conversion != null ? (parseFloat(raw.unit_conversion) || 1) : convB;
      const fPrice = raw.unit_price != null ? (parseFloat(raw.unit_price) || 0) : priceB;
      validatedItems.push({
        ...stockTargetAttrs('product_ingredient_id', piId),
        ingredient_seller_product_id: mappingB,
        quantity_ordered: qtyB,
        quantity_received: 0,
        unit: raw.unit || pIng.unit || null,
        unit_price: fPrice,
        unit_conversion: fConv,
        line_total: Math.round((qtyB * fPrice) * 100) / 100,
        notes: raw.notes ? sanitizeString(String(raw.notes)).slice(0, 255) : null,
        description: pIng.name ? String(pIng.name).slice(0, 255) : null
      });
      continue;
    }

    const ingredientId = parseInt(raw.ingredient_id, 10);
    const qty = parseFloat(raw.quantity_ordered);
    if (!Number.isFinite(ingredientId) || !(qty > 0)) {
      return { ok: false, status: 400, body: { success: false, message: 'Each item requires ingredient_id and quantity_ordered > 0' } };
    }
    const ing = await ingredientBelongsToBuyer(ingredientId, buyerEntity);
    if (!ing) {
      return { ok: false, status: 400, body: { success: false, message: `Ingredient ${ingredientId} not accessible to this buyer` } };
    }

    let convFallback = 1;
    let priceFallback = 0;
    let resolvedMappingId = raw.ingredient_seller_product_id || null;

    if (seller_type !== 'system_admin') {
      const mappingWhere = {
        ingredient_id: ingredientId,
        seller_type,
        seller_entity_id: seller_entity_id ? parseInt(seller_entity_id, 10) : null,
        is_active: true
      };
      if (raw.ingredient_seller_product_id) mappingWhere.id = raw.ingredient_seller_product_id;
      const mapping = await IngredientSellerProduct.findOne({ where: mappingWhere, transaction });
      if (!mapping) {
        return { ok: false, status: 400, body: { success: false, code: 'MAPPING_REQUIRED', message: `Ingredient ${ingredientId} is not mapped to this seller` } };
      }
      resolvedMappingId = mapping.id;
      convFallback = parseFloat(mapping.unit_conversion) || 1;
      priceFallback = parseFloat(mapping.unit_price) || 0;
    } else if (raw.ingredient_seller_product_id) {
      const sellerSrc = await IngredientSellerProduct.findByPk(raw.ingredient_seller_product_id, { transaction });
      if (sellerSrc && sellerSrc.ingredient_id === ingredientId) {
        convFallback = parseFloat(sellerSrc.unit_conversion) || 1;
        priceFallback = parseFloat(sellerSrc.unit_price) || 0;
      }
    }

    const finalConv = raw.unit_conversion != null ? (parseFloat(raw.unit_conversion) || 1) : convFallback;
    const finalPrice = raw.unit_price != null ? (parseFloat(raw.unit_price) || 0) : priceFallback;
    validatedItems.push({
      ...stockTargetAttrs('ingredient_id', ingredientId),
      ingredient_seller_product_id: resolvedMappingId,
      quantity_ordered: qty,
      quantity_received: 0,
      unit: raw.unit || ing.unit || null,
      unit_price: finalPrice,
      unit_conversion: finalConv,
      line_total: Math.round((qty * finalPrice) * 100) / 100,
      notes: raw.notes ? sanitizeString(String(raw.notes)).slice(0, 255) : null,
      description: ing.name ? String(ing.name).slice(0, 255) : null
    });
  }

  // ─────────────────────────────────────────────────────────────────
  // Currency 검증 — 구매자 통화 기준. 미설정 또는 공급업체와 불일치 시 차단.
  // ─────────────────────────────────────────────────────────────────
  let buyerCurrency = null;
  if (buyerEntity.type === 'restaurant') {
    const Restaurant = require('../models/Restaurant');
    const r = await Restaurant.findByPk(buyerEntity.id, { attributes: ['currency'] });
    buyerCurrency = r?.currency || null;
  } else if (buyerEntity.type === 'brand') {
    const Brand = require('../models/Brand');
    const b = await Brand.findByPk(buyerEntity.id, { attributes: ['currency'] }).catch(() => null);
    buyerCurrency = b?.currency || null;
  } else if (buyerEntity.type === 'foodcourt') {
    const Foodcourt = require('../models/Foodcourt');
    const f = await Foodcourt.findByPk(buyerEntity.id, { attributes: ['currency'] }).catch(() => null);
    buyerCurrency = f?.currency || null;
  }
  if (!buyerCurrency) {
    return {
      ok: false, status: 400,
      body: {
        success: false,
        code: 'NO_BUYER_CURRENCY',
        message: 'Buyer currency is not set. Please configure currency in payment settings.',
        settingsUrl: '/pos/settings'
      }
    };
  }

  // Seller currency 비교 (supplier / brand / foodcourt)
  let sellerCurrency = null;
  if (seller_type === 'supplier' && seller_entity_id) {
    const SupplierCompany = require('../models/SupplierCompany');
    const s = await SupplierCompany.findByPk(parseInt(seller_entity_id, 10), { attributes: ['currency'] });
    sellerCurrency = s?.currency || null;
  } else if (seller_type === 'brand' && seller_entity_id) {
    const Brand = require('../models/Brand');
    const b = await Brand.findByPk(parseInt(seller_entity_id, 10), { attributes: ['currency'] }).catch(() => null);
    sellerCurrency = b?.currency || null;
  } else if (seller_type === 'foodcourt' && seller_entity_id) {
    const Foodcourt = require('../models/Foodcourt');
    const f = await Foodcourt.findByPk(parseInt(seller_entity_id, 10), { attributes: ['currency'] }).catch(() => null);
    sellerCurrency = f?.currency || null;
  }
  // Compare by ISO code so a display symbol matches its code (RM == MYR). Without
  // normalization a restaurant saved as "RM" and a brand saved as "MYR" — the same
  // currency — were wrongly blocked (with MIN Cafe production report 2026-06-18).
  if (sellerCurrency && !sameCurrency(sellerCurrency, buyerCurrency)) {
    return {
      ok: false, status: 400,
      body: {
        success: false,
        code: 'CURRENCY_MISMATCH',
        message: `Currency mismatch: buyer uses ${normalizeCurrencyCode(buyerCurrency)}, seller uses ${normalizeCurrencyCode(sellerCurrency)}. Align currencies in payment settings or supplier contract before ordering.`,
        buyerCurrency: normalizeCurrencyCode(buyerCurrency),
        sellerCurrency: normalizeCurrencyCode(sellerCurrency),
        settingsUrl: '/pos/settings'
      }
    };
  }

  const totals = computeTotals(validatedItems);

  // ─────────────────────────────────────────────────────────────────
  // Credit limit 검증 — 미수금 누적 + 신규 PO 총액이 한도 초과면 차단.
  // 한도 미설정(null/0)이면 통과. supplier/brand/foodcourt seller 3종 지원.
  // ─────────────────────────────────────────────────────────────────
  const creditCheck = await checkCreditLimit({
    buyerEntity,
    seller_type,
    seller_entity_id,
    contract_id: contractId,
    newOrderTotal: totals.total_amount,
    currency: buyerCurrency
  });
  if (!creditCheck.ok) {
    return {
      ok: false, status: 400,
      body: {
        success: false,
        code: 'CREDIT_LIMIT_EXCEEDED',
        message: creditCheck.message,
        hint: creditCheck.hint,
        outstanding: creditCheck.outstanding,
        credit_limit: creditCheck.credit_limit,
        currency: creditCheck.currency
      }
    };
  }

  // 2026-06-22 (Irene): 같은 공급업체끼리 합치기. 카트(bulk) 제출 시 동일 buyer+seller 의 draft PO 가
  // 이미 staging 에 있으면 새 PO 를 또 만들지 않고 그 draft 에 품목을 합치고 총액을 누적한다.
  // (이전엔 제출할 때마다 같은 공급업체라도 PO 가 따로따로 쌓였음.) draft 만 대상 — 제출된 PO 는 별개.
  if (mergeDraft) {
    const existing = await PurchaseOrder.findOne({
      where: {
        entity_type: buyerEntity.type,
        entity_id: buyerEntity.id,
        seller_type,
        seller_entity_id: seller_entity_id ? parseInt(seller_entity_id, 10) : null,
        status: 'draft'
      },
      order: [['created_at', 'ASC']],
      transaction,
      lock: transaction.LOCK.UPDATE
    });
    if (existing) {
      // 2026-08-28 (Irene): 같은 품목을 다시 담으면 **줄이 하나 더 생겼다**.
      //   실제 사고: 어제 담은 draft 에 오늘 같은 품목을 담아 Glass Noddle 이 2줄로 제출됐다
      //   ("내가 주문을 이렇게 지금 다 안넣었는데 왜 글라스누들이 들어있어?").
      //   같은 (재고, 판매자상품) 라인이 이미 있으면 **수량을 합친다**. 줄은 늘리지 않는다.
      const prevItems = await PurchaseOrderItem.findAll({
        where: { purchase_order_id: existing.id }, transaction, lock: transaction.LOCK.UPDATE
      });
      const keyOf = (it) => [
        it.ingredient_id ?? 'n', it.product_ingredient_id ?? 'n', it.ingredient_seller_product_id ?? 'n'
      ].join('|');
      const prevByKey = new Map(prevItems.map(it => [keyOf(it), it]));

      const itemsToCreate = [];
      for (const it of validatedItems) {
        const hit = prevByKey.get(keyOf(it));
        if (hit) {
          const qty = Math.round(((parseFloat(hit.quantity_ordered) || 0) + (parseFloat(it.quantity_ordered) || 0)) * 100) / 100;
          const unit = parseFloat(it.unit_price) || parseFloat(hit.unit_price) || 0;
          await hit.update({
            quantity_ordered: qty,
            unit_price: unit,
            line_total: Math.round(qty * unit * 100) / 100
          }, { transaction });
        } else {
          itemsToCreate.push({ ...it, purchase_order_id: existing.id });
        }
      }
      if (itemsToCreate.length) await PurchaseOrderItem.bulkCreate(itemsToCreate, { transaction });

      // 합산이 생겼으므로 총액은 누적이 아니라 **라인에서 다시 계산**한다(중복 가산 방지)
      const freshItems = await PurchaseOrderItem.findAll({ where: { purchase_order_id: existing.id }, transaction });
      const recomputed = computeTotals(freshItems.map(x => ({
        quantity_ordered: x.quantity_ordered, unit_price: x.unit_price
      })));
      await existing.update({
        subtotal: recomputed.subtotal,
        tax_amount: recomputed.tax_amount,
        total_amount: recomputed.total_amount,
        // 배송지/예정일/메모는 기존 draft 유지(있으면), 없으면 새 값 채움
        expected_delivery_date: existing.expected_delivery_date || expected_delivery_date || null,
        delivery_address: existing.delivery_address || (resolvedDeliveryAddress ? sanitizeString(String(resolvedDeliveryAddress)) : null)
      }, { transaction });
      return { ok: true, po: existing, merged: true };
    }
  }

  const poNumber = await generatePoNumber(buyerEntity, poNumberOffset);

  const po = await PurchaseOrder.create({
    po_number: poNumber,
    entity_type: buyerEntity.type,
    entity_id: buyerEntity.id,
    seller_type,
    seller_entity_id: seller_entity_id ? parseInt(seller_entity_id, 10) : null,
    contract_id: contractId,
    status: 'draft',
    subtotal: totals.subtotal,
    tax_amount: totals.tax_amount,
    total_amount: totals.total_amount,
    currency: buyerCurrency,
    expected_delivery_date: expected_delivery_date || null,
    delivery_address: resolvedDeliveryAddress ? sanitizeString(String(resolvedDeliveryAddress)) : null,
    notes: notes ? sanitizeString(String(notes)) : null,
    created_by_user_id: userId
  }, { transaction });

  const itemsToCreate = validatedItems.map(it => ({ ...it, purchase_order_id: po.id }));
  await PurchaseOrderItem.bulkCreate(itemsToCreate, { transaction });

  return { ok: true, po };
}

// ============================================
// 3. POST /api/purchase-orders
// ============================================
router.post('/purchase-orders', async (req, res) => {
  const t = await database.sequelize.transaction();
  try {
    if (!buyerScopeRequired(req, res)) { await t.rollback(); return; }

    const result = await createPurchaseOrderCore({
      buyerEntity: req.buyerEntity, userId: req.user.id, payload: req.body, transaction: t
    });
    if (!result.ok) {
      await t.rollback();
      return res.status(result.status).json(result.body);
    }

    await t.commit();

    const created = await PurchaseOrder.findByPk(result.po.id, {
      include: [{ model: PurchaseOrderItem, as: 'items' }]
    });
    res.status(201).json({ success: true, data: created });
  } catch (err) {
    if (!t.finished) await t.rollback();
    console.error('POST /api/purchase-orders error:', err);
    res.status(500).json({ success: false, message: 'Failed to create purchase order' });
  }
});

// ============================================
// 3b. POST /api/purchase-orders/bulk (Sprint 5 — multi-seller cart)
//   body: { groups: [{ seller_type, seller_entity_id, items, ... }, ...], auto_submit?: boolean }
// ============================================
router.post('/purchase-orders/bulk', async (req, res) => {
  const t = await database.sequelize.transaction();
  try {
    if (!buyerScopeRequired(req, res)) { await t.rollback(); return; }
    const groups = Array.isArray(req.body?.groups) ? req.body.groups : null;
    if (!groups || groups.length === 0) {
      await t.rollback();
      return res.status(400).json({ success: false, message: 'groups[] is required' });
    }
    if (groups.length > 20) {
      await t.rollback();
      return res.status(400).json({ success: false, message: 'Too many groups (max 20)' });
    }

    const created = [];
    for (let i = 0; i < groups.length; i++) {
      const g = groups[i];
      const result = await createPurchaseOrderCore({
        buyerEntity: req.buyerEntity, userId: req.user.id, payload: g, transaction: t, poNumberOffset: i, mergeDraft: true
      });
      if (!result.ok) {
        await t.rollback();
        return res.status(result.status).json({ ...result.body, group_index: i });
      }
      created.push(result.po);
    }

    await t.commit();

    // Optional auto-submit (Sprint 5: triggered by Inventory bulk-order UX)
    const autoSubmit = !!req.body?.auto_submit;
    const orders = [];
    for (const po of created) {
      if (autoSubmit) {
        try {
          const fresh = await PurchaseOrder.findByPk(po.id);
          if (fresh && fresh.status === 'draft') {
            // 일괄발주(재고관리 Bulk Order)도 **발주가 나가는 경로**다 → 오너 승인 게이트 필수.
            // 예전엔 여기서 submitted 직행이라 승인 ON 이어도 그냥 나갔다 (Fable 2026-07-13).
            const needsApproval = await applySubmitGate(fresh, null, appendTrackingEvent);
            if (needsApproval) {
              emitPoEvent(req, fresh, 'seller-order-updated');
              setImmediate(() => fireOwnerApprovalPendingNotification(fresh));
            } else {
              emitPoEvent(req, fresh, 'seller-order-created');
              setImmediate(() => fireSellerSubmittedNotification(fresh));
              setImmediate(() => fireBuyerConfirmNotification(fresh));
            }
          }
        } catch (e) {
          console.error('[bulk] auto-submit error po=' + po.id, e.message);
        }
      }
      const full = await PurchaseOrder.findByPk(po.id, { include: [{ model: PurchaseOrderItem, as: 'items' }] });
      orders.push(full);
    }

    res.status(201).json({ success: true, data: { orders } });
  } catch (err) {
    if (!t.finished) await t.rollback();
    console.error('POST /api/purchase-orders/bulk error:', err);
    res.status(500).json({ success: false, message: 'Failed to create bulk purchase orders' });
  }
});

// ============================================
// 4. PUT /api/purchase-orders/:id (draft only)
// ============================================
router.put('/purchase-orders/:id', async (req, res) => {
  const t = await database.sequelize.transaction();
  try {
    const id = parseInt(req.params.id, 10);
    if (!Number.isFinite(id)) {
      await t.rollback();
      return res.status(404).json({ success: false, message: 'Purchase order not found' });
    }

    const po = await PurchaseOrder.findByPk(id, { transaction: t });
    if (!po) {
      await t.rollback();
      return res.status(404).json({ success: false, message: 'Purchase order not found' });
    }
    if (!checkPOOwnership(po, req)) {
      await t.rollback();
      return res.status(404).json({ success: false, message: 'Purchase order not found' });
    }
    // Sprint 6: allow editing draft AND submitted (before seller confirm).
    if (!['draft', 'submitted'].includes(po.status)) {
      await t.rollback();
      return res.status(400).json({ success: false, message: 'Only draft or submitted orders can be edited' });
    }

    const { items, expected_delivery_date, delivery_address, notes } = req.body;
    const updates = {};

    if (expected_delivery_date !== undefined) updates.expected_delivery_date = expected_delivery_date || null;
    if (delivery_address !== undefined) updates.delivery_address = delivery_address ? sanitizeString(String(delivery_address)) : null;
    if (notes !== undefined) updates.notes = notes ? sanitizeString(String(notes)) : null;

    if (Array.isArray(items)) {
      if (items.length === 0) {
        await t.rollback();
        return res.status(400).json({ success: false, message: 'At least one item is required' });
      }
      const validated = [];
      for (const raw of items) {
        const ingredientId = parseInt(raw.ingredient_id, 10);
        const qty = parseFloat(raw.quantity_ordered);
        if (!Number.isFinite(ingredientId) || !(qty > 0)) {
          await t.rollback();
          return res.status(400).json({
            success: false, message: 'Each item requires ingredient_id and quantity_ordered > 0'
          });
        }
        const ing = await ingredientBelongsToBuyer(ingredientId, req.buyerEntity);
        if (!ing) {
          await t.rollback();
          return res.status(400).json({
            success: false, message: `Ingredient ${ingredientId} not accessible to this buyer`
          });
        }
        validated.push({
          purchase_order_id: po.id,
          ingredient_id: ingredientId,
          ingredient_seller_product_id: raw.ingredient_seller_product_id || null,
          quantity_ordered: qty,
          quantity_received: 0,
          unit: raw.unit || ing.unit || null,
          unit_price: parseFloat(raw.unit_price) || 0,
          unit_conversion: parseFloat(raw.unit_conversion) || 1,
          line_total: Math.round((qty * (parseFloat(raw.unit_price) || 0)) * 100) / 100,
          notes: raw.notes ? sanitizeString(String(raw.notes)).slice(0, 255) : null,
          description: ing.name ? String(ing.name).slice(0, 255) : null
        });
      }
      // Replace items
      await PurchaseOrderItem.destroy({ where: { purchase_order_id: po.id }, transaction: t });
      await PurchaseOrderItem.bulkCreate(validated, { transaction: t });

      const totals = computeTotals(validated);
      updates.subtotal = totals.subtotal;
      updates.tax_amount = totals.tax_amount;
      updates.total_amount = totals.total_amount;
    }

    await po.update(updates, { transaction: t });
    await t.commit();

    const updated = await PurchaseOrder.findByPk(po.id, {
      include: [{ model: PurchaseOrderItem, as: 'items' }]
    });
    res.json({ success: true, data: updated });
  } catch (err) {
    if (!t.finished) await t.rollback();
    console.error('PUT /api/purchase-orders/:id error:', err);
    res.status(500).json({ success: false, message: 'Failed to update purchase order' });
  }
});

// ============================================
// 5. POST /api/purchase-orders/:id/submit
// ============================================
// ============================================
// GET /api/purchase-orders/:id/pdf — 외부 supplier 발주서 PDF 생성 (HTML 응답, 브라우저에서 인쇄 → PDF)
// ============================================

module.exports = router;

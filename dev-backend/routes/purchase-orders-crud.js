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
const { sendNotificationBatch, getSupplierAdminIds, getBrandManagerIds, getFoodcourtManagerIds } = require('../utils/notificationService');
const { normalizeCurrencyCode, sameCurrency } = require('../utils/currency');

const FRONTEND_URL = process.env.FRONTEND_URL || (process.env.NODE_ENV === 'production' ? 'https://purplehere.com' : 'https://dev.purplehere.com');

/**
 * Notify seller (Supplier Admin / Brand General / Foodcourt General) when a new PO is submitted.
 * Sends email via sendNotificationBatch with category 'seller_order_received'.
 * Recipients honor their notification preferences. Errors do not block PO submit.
 */
async function fireSellerSubmittedNotification(po) {
  try {
    let userIds = [];
    if (po.seller_type === 'supplier' && po.seller_entity_id) {
      userIds = await getSupplierAdminIds(po.seller_entity_id);
    } else if (po.seller_type === 'brand' && po.seller_entity_id) {
      userIds = await getBrandManagerIds(po.seller_entity_id);
    } else if (po.seller_type === 'foodcourt' && po.seller_entity_id) {
      userIds = await getFoodcourtManagerIds(po.seller_entity_id);
    }
    if (userIds.length === 0) return;
    // Buyer 이름 resolve — Restaurant / Brand / Foodcourt
    let buyerName = 'A buyer';
    try {
      const Restaurant = require('../models/Restaurant');
      const Brand = require('../models/Brand');
      const Foodcourt = require('../models/Foodcourt');
      if (po.entity_type === 'restaurant') {
        const r = await Restaurant.findByPk(po.entity_id, { attributes: ['name'] });
        if (r?.name) buyerName = r.name;
      } else if (po.entity_type === 'brand') {
        const b = await Brand.findByPk(po.entity_id, { attributes: ['name'] });
        if (b?.name) buyerName = b.name;
      } else if (po.entity_type === 'foodcourt') {
        const f = await Foodcourt.findByPk(po.entity_id, { attributes: ['name'] });
        if (f?.name) buyerName = f.name;
      }
    } catch (_) { /* keep default */ }
    const { sellerOrderReceivedEmail } = require('../utils/notificationTemplates');
    const mail = sellerOrderReceivedEmail({
      buyerName,
      poNumber: po.po_number,
      total: po.total_amount,
      currency: po.currency || 'MYR',
      link: `${FRONTEND_URL}/pos/seller-orders`
    });
    await sendNotificationBatch(userIds, 'seller_order_received', mail);
  } catch (e) {
    console.error('[purchase-orders] fireSellerSubmittedNotification error:', e.message);
  }
}

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

/** Verify ingredient is owned by the buyer entity. */
async function ingredientBelongsToBuyer(ingredientId, buyerEntity) {
  const ing = await Ingredient.findByPk(ingredientId);
  if (!ing) return null;
  if (!buyerEntity) return ing; // SA without override: allow
  if (buyerEntity.type === 'restaurant') {
    if (parseInt(ing.restaurant_id, 10) === buyerEntity.id) return ing;
  } else if (buyerEntity.type === 'brand') {
    if (parseInt(ing.brand_id, 10) === buyerEntity.id) return ing;
  } else if (buyerEntity.type === 'foodcourt') {
    // Phase 2 (2026-04-29): foodcourt 도 ingredient 소유 (owner_type='foodcourt')
    if (parseInt(ing.foodcourt_id, 10) === buyerEntity.id) return ing;
  }
  return null;
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
    const contract = await SupplierContract.findOne({
      where: {
        supplier_company_id: sellerId,
        entity_type: buyerEntity.type,
        entity_id: buyerEntity.id,
        status: 'active'
      }
    });
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
    const SupplierCompany = require('../models/SupplierCompany');
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

    // Supplier 정보 (seller_type='supplier' 인 PO 만)
    const supplierIds = [...new Set(rows.filter(p => p.seller_type === 'supplier').map(p => p.seller_entity_id).filter(Boolean))];
    const suppliers = supplierIds.length ? await SupplierCompany.findAll({
      where: { id: { [Op.in]: supplierIds } },
      attributes: ['id', 'name', 'phone', 'email', 'is_system_registered', 'min_order_amount']
    }) : [];
    const supplierMap = Object.fromEntries(suppliers.map(s => [s.id, s]));

    // includeItems 일 때만 items 배열 동봉
    let itemsByPo = {};
    if (includeItems && ids.length) {
      const allItems = await PurchaseOrderItem.findAll({ where: { purchase_order_id: { [Op.in]: ids } } });
      for (const it of allItems) {
        (itemsByPo[it.purchase_order_id] = itemsByPo[it.purchase_order_id] || []).push(it);
      }
    }

    const enriched = rows.map(p => {
      const plain = p.toJSON();
      const agg = aggMap[p.id] || {};
      plain.item_count = parseInt(agg.item_count || 0, 10);
      plain.total_quantity = parseFloat(agg.total_quantity || 0);
      const sup = (p.seller_type === 'supplier' && supplierMap[p.seller_entity_id]) ? supplierMap[p.seller_entity_id] : null;
      plain.seller_name = sup ? sup.name : null;
      plain.is_external = sup ? !sup.is_system_registered : false;
      if (includeItems) {
        plain.items = itemsByPo[p.id] || [];
        plain.seller = sup ? sup.toJSON() : null;
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

    // Build ingredient ownership filter
    const ownershipWhere = {};
    if (req.buyerEntity.type === 'restaurant') {
      ownershipWhere.restaurant_id = req.buyerEntity.id;
    } else if (req.buyerEntity.type === 'brand') {
      ownershipWhere.brand_id = req.buyerEntity.id;
    } else {
      // foodcourt: no foodcourt_id on Ingredient — return empty
      return res.json({ success: true, data: { groups: [] } });
    }

    const ingredients = await Ingredient.findAll({
      where: {
        ...ownershipWhere,
        is_active: true,
        track_stock: true,
        min_stock: { [Op.gt]: 0 }
      }
    });

    const lowIngredients = ingredients.filter(ing => {
      const cur = parseFloat(ing.current_stock) || 0;
      const min = parseFloat(ing.min_stock) || 0;
      return cur < min;
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

    // Sprint 5: resolve seller names for each group (supplier/brand/foodcourt)
    const sellerKeys = new Map();
    for (const ing of lowIngredients) {
      const seller = preferredByIng[ing.id];
      if (!seller) continue;
      const k = `${seller.seller_type}:${seller.seller_entity_id || 0}`;
      sellerKeys.set(k, { type: seller.seller_type, id: seller.seller_entity_id });
    }
    const sellerNames = new Map();
    for (const [k, v] of sellerKeys) {
      try {
        if (v.type === 'supplier' && v.id) {
          const s = await SupplierCompany.findByPk(v.id, { attributes: ['id', 'name', 'trade_name'] });
          if (s) sellerNames.set(k, s.trade_name || s.name);
        } else if (v.type === 'brand' && v.id) {
          const { Brand } = require('../models');
          const b = await Brand.findByPk(v.id, { attributes: ['id', 'name', 'trade_name'] });
          if (b) sellerNames.set(k, b.trade_name || b.name);
        } else if (v.type === 'foodcourt' && v.id) {
          const { Foodcourt } = require('../models');
          const f = await Foodcourt.findByPk(v.id, { attributes: ['id', 'name', 'trade_name'] });
          if (f) sellerNames.set(k, f.trade_name || f.name);
        } else if (v.type === 'system_admin') {
          sellerNames.set(k, 'POS Catalog');
        }
      } catch (e) {
        // fall through — name remains null
      }
    }

    // Build suggestion entries grouped by seller
    const groups = {};
    for (const ing of lowIngredients) {
      const cur = parseFloat(ing.current_stock) || 0;
      const min = parseFloat(ing.min_stock) || 0;
      const suggested = Math.max(0, Math.round(((min * 1.5) - cur) * 100) / 100);
      const seller = preferredByIng[ing.id] || null;

      const groupKey = seller
        ? `${seller.seller_type}:${seller.seller_entity_id || 0}`
        : 'unassigned:0';

      if (!groups[groupKey]) {
        groups[groupKey] = {
          seller_type: seller ? seller.seller_type : null,
          seller_entity_id: seller ? seller.seller_entity_id : null,
          seller_name: seller ? (sellerNames.get(groupKey) || null) : null,
          items: []
        };
      }
      groups[groupKey].items.push({
        ingredient: {
          id: ing.id,
          name: ing.name,
          unit: ing.unit,
          current_stock: parseFloat(ing.current_stock) || 0,
          min_stock: parseFloat(ing.min_stock) || 0
        },
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

    // seller 정보 + is_external 보강
    const plain = po.toJSON();
    if (po.seller_type === 'supplier' && po.seller_entity_id) {
      const SupplierCompany = require('../models/SupplierCompany');
      const sup = await SupplierCompany.findByPk(po.seller_entity_id, {
        attributes: ['id', 'name', 'phone', 'email', 'is_system_registered']
      });
      if (sup) {
        plain.seller_name = sup.name;
        plain.seller = sup.toJSON();
        plain.is_external = !sup.is_system_registered;
      }
    } else if (po.seller_type === 'brand' && po.seller_entity_id) {
      const Brand = require('../models/Brand');
      const b = await Brand.findByPk(po.seller_entity_id, { attributes: ['id', 'name'] }).catch(() => null);
      if (b) plain.seller_name = b.name;
    } else if (po.seller_type === 'foodcourt' && po.seller_entity_id) {
      const Foodcourt = require('../models/Foodcourt');
      const f = await Foodcourt.findByPk(po.seller_entity_id, { attributes: ['id', 'name'] }).catch(() => null);
      if (f) plain.seller_name = f.name;
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

async function createPurchaseOrderCore({ buyerEntity, userId, payload, transaction, poNumberOffset = 0 }) {
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
        ingredient_id: null,
        product_ingredient_id: piId,
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
      ingredient_id: ingredientId,
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
        buyerEntity: req.buyerEntity, userId: req.user.id, payload: g, transaction: t, poNumberOffset: i
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
            const newTracking = appendTrackingEvent(fresh, 'submitted');
            const now = new Date();
            await fresh.update({ status: 'submitted', submitted_at: now, tracking_info: newTracking });
            emitPoEvent(req, fresh, 'seller-order-created');
            setImmediate(() => fireSellerSubmittedNotification(fresh));
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

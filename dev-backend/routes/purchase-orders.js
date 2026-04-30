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
    const subject = `[Purple POS] New Purchase Order ${po.po_number}`;
    const link = `${FRONTEND_URL}/pos/seller-orders`;
    const html = `
      <p>You have received a new purchase order.</p>
      <p><strong>PO #:</strong> ${po.po_number}</p>
      <p><strong>Total:</strong> ${po.currency || 'MYR'} ${parseFloat(po.total_amount || 0).toFixed(2)}</p>
      <p><a href="${link}">Open in Purple POS</a></p>
    `;
    await sendNotificationBatch(userIds, 'seller_order_received', { subject, html });
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
  if (sellerCurrency && sellerCurrency !== buyerCurrency) {
    return {
      ok: false, status: 400,
      body: {
        success: false,
        code: 'CURRENCY_MISMATCH',
        message: `Currency mismatch: buyer uses ${buyerCurrency}, seller uses ${sellerCurrency}. Align currencies in payment settings or supplier contract before ordering.`,
        buyerCurrency,
        sellerCurrency,
        settingsUrl: '/pos/settings'
      }
    };
  }

  const totals = computeTotals(validatedItems);
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
router.get('/purchase-orders/:id/pdf', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (!Number.isFinite(id)) return res.status(404).json({ success: false, message: 'Not found' });
    const po = await PurchaseOrder.findByPk(id, { include: [{ model: PurchaseOrderItem, as: 'items' }] });
    if (!po) return res.status(404).json({ success: false, message: 'Not found' });
    if (!checkPOOwnership(po, req)) return res.status(404).json({ success: false, message: 'Not found' });

    // Seller 정보 (외부 supplier 면 SupplierCompany 모델에서 가져옴)
    const SupplierCompany = require('../models/SupplierCompany');
    let seller = null;
    if (po.seller_type === 'supplier' && po.seller_entity_id) {
      seller = await SupplierCompany.findByPk(po.seller_entity_id);
    }

    // Buyer 정보
    let buyerName = '';
    let buyerAddress = '';
    if (po.buyer_entity_type === 'restaurant') {
      const Restaurant = require('../models/Restaurant');
      const r = await Restaurant.findByPk(po.buyer_entity_id);
      if (r) { buyerName = r.name; buyerAddress = r.address || ''; }
    }

    // Ingredient 이름 lookup
    const ingIds = (po.items || []).map(i => i.ingredient_id).filter(Boolean);
    const ings = ingIds.length ? await Ingredient.findAll({ where: { id: { [Op.in]: ingIds } }, attributes: ['id', 'name', 'unit'] }) : [];
    const ingMap = Object.fromEntries(ings.map(i => [i.id, i]));

    const items = (po.items || []).map(it => {
      const ing = ingMap[it.ingredient_id];
      const qty = parseFloat(it.quantity_ordered) || 0;
      const unitPrice = parseFloat(it.unit_price) || 0;
      return {
        name: ing?.name || `Ingredient #${it.ingredient_id}`,
        unit: ing?.unit || '',
        qty,
        unit_price: unitPrice,
        line_total: qty * unitPrice
      };
    });
    const subtotal = items.reduce((s, i) => s + i.line_total, 0);

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>PO ${po.po_number || po.id}</title>
<style>
* { box-sizing: border-box; }
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #0A2540; padding: 32px; max-width: 800px; margin: 0 auto; }
h1 { font-size: 24px; margin: 0 0 4px; }
.meta { color: #6B7280; font-size: 13px; margin-bottom: 28px; }
.parties { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 28px; }
.party { padding: 14px; border: 1px solid #E6EBF1; border-radius: 8px; }
.party h3 { margin: 0 0 8px; font-size: 12px; color: #6B7280; text-transform: uppercase; letter-spacing: 0.4px; }
.party .name { font-weight: 600; font-size: 15px; }
.party .line { font-size: 13px; color: #374151; margin-top: 4px; }
table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
th { background: #F8FAFC; text-align: left; padding: 10px 12px; font-size: 11px; color: #6B7280; text-transform: uppercase; letter-spacing: 0.4px; border-bottom: 1px solid #E6EBF1; }
th.num, td.num { text-align: right; }
td { padding: 10px 12px; border-bottom: 1px solid #F3F4F6; font-size: 13px; }
.total-row td { font-weight: 700; font-size: 15px; border-bottom: none; padding-top: 16px; }
.notes { padding: 14px; background: #F8FAFC; border-radius: 8px; font-size: 13px; color: #374151; line-height: 1.5; margin-bottom: 20px; }
.notes h3 { margin: 0 0 6px; font-size: 12px; color: #6B7280; text-transform: uppercase; letter-spacing: 0.4px; }
.footer { font-size: 11px; color: #9CA3AF; margin-top: 28px; padding-top: 16px; border-top: 1px solid #F1F5F9; }
@media print { body { padding: 0; } }
</style>
</head>
<body>
<h1>Purchase Order</h1>
<div class="meta">
  <strong>${po.po_number || `#${po.id}`}</strong> · ${new Date(po.created_at).toLocaleDateString('en-MY')}
  ${po.expected_delivery_date ? ` · Expected: ${po.expected_delivery_date}` : ''}
</div>
<div class="parties">
  <div class="party">
    <h3>From (Buyer)</h3>
    <div class="name">${buyerName || '—'}</div>
    ${buyerAddress ? `<div class="line">${buyerAddress}</div>` : ''}
    ${po.delivery_address ? `<div class="line"><strong>Deliver to:</strong> ${po.delivery_address}</div>` : ''}
  </div>
  <div class="party">
    <h3>To (Supplier)</h3>
    <div class="name">${seller?.name || '—'}</div>
    ${seller?.phone ? `<div class="line">Phone: ${seller.phone}</div>` : ''}
    ${seller?.email ? `<div class="line">Email: ${seller.email}</div>` : ''}
    ${seller?.address ? `<div class="line">${seller.address}</div>` : ''}
  </div>
</div>
<table>
  <thead><tr><th>Item</th><th class="num">Qty</th><th>Unit</th><th class="num">Unit Price</th><th class="num">Total</th></tr></thead>
  <tbody>
    ${items.map(i => `<tr><td>${i.name}</td><td class="num">${i.qty}</td><td>${i.unit}</td><td class="num">${i.unit_price.toFixed(2)}</td><td class="num">${i.line_total.toFixed(2)}</td></tr>`).join('')}
    <tr class="total-row"><td colspan="4" class="num">Total (${po.currency || 'MYR'})</td><td class="num">${subtotal.toFixed(2)}</td></tr>
  </tbody>
</table>
${po.notes ? `<div class="notes"><h3>Notes</h3>${po.notes.replace(/\n/g, '<br>')}</div>` : ''}
<div class="footer">Generated via PurpleHere · ${new Date().toLocaleString('en-MY')}</div>
<script>window.onload = function() { setTimeout(() => window.print(), 300); };</script>
</body></html>`;

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(html);
  } catch (err) {
    console.error('GET /purchase-orders/:id/pdf error:', err);
    res.status(500).json({ success: false, message: 'Failed to render PDF' });
  }
});

// ============================================
// POST /api/purchase-orders/:id/mark-sent-external — 외부 PO 수동 발송 완료 마킹 (status='submitted')
// ============================================
router.post('/purchase-orders/:id/mark-sent-external', async (req, res) => {
  const t = await database.sequelize.transaction();
  try {
    const id = parseInt(req.params.id, 10);
    const po = await PurchaseOrder.findByPk(id, { transaction: t });
    if (!po) { await t.rollback(); return res.status(404).json({ success: false, message: 'Not found' }); }
    if (!checkPOOwnership(po, req)) { await t.rollback(); return res.status(404).json({ success: false, message: 'Not found' }); }
    if (po.status !== 'draft') { await t.rollback(); return res.status(400).json({ success: false, message: 'Only draft can be marked sent' }); }
    const newTracking = appendTrackingEvent(po, 'submitted', null, { source: 'external_manual_send', method: req.body?.method || 'manual' });
    await po.update({ status: 'submitted', submitted_at: new Date(), tracking_info: newTracking }, { transaction: t });
    await t.commit();
    res.json({ success: true, data: po });
  } catch (err) {
    if (!t.finished) await t.rollback();
    console.error('mark-sent-external error:', err);
    res.status(500).json({ success: false, message: 'Failed' });
  }
});

// ============================================
// POST /api/purchase-orders/:id/upload-invoice — 외부 공급업체 인보이스 파일 URL 저장
//   url 은 /api/upload/files 호출로 사전 업로드된 결과 (relativePath, originalName 포함)
// ============================================
router.post('/purchase-orders/:id/upload-invoice', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (!Number.isFinite(id)) return res.status(404).json({ success: false, message: 'Not found' });

    const { url, filename } = req.body || {};
    if (!url || typeof url !== 'string') {
      return res.status(400).json({ success: false, message: 'Invoice URL required' });
    }
    if (!url.startsWith('/uploads/')) {
      return res.status(400).json({ success: false, message: 'Invalid invoice URL' });
    }

    const po = await PurchaseOrder.findByPk(id);
    if (!po) return res.status(404).json({ success: false, message: 'Not found' });
    if (!checkPOOwnership(po, req)) return res.status(404).json({ success: false, message: 'Not found' });

    // 외부 공급업체만 업로드 허용
    if (po.seller_type !== 'supplier') {
      return res.status(400).json({ success: false, message: 'Invoice upload only available for supplier orders' });
    }
    const SupplierCompany = require('../models/SupplierCompany');
    const supplier = await SupplierCompany.findByPk(po.seller_entity_id);
    if (!supplier || supplier.is_system_registered) {
      return res.status(400).json({ success: false, message: 'Invoice upload only for external (non-system) suppliers' });
    }

    await po.update({
      external_invoice_url: url,
      external_invoice_filename: filename || url.split('/').pop(),
      external_invoice_uploaded_at: new Date()
    });

    res.json({ success: true, data: po });
  } catch (err) {
    console.error('upload-invoice error:', err);
    res.status(500).json({ success: false, message: 'Failed to save invoice' });
  }
});

// ============================================
// POST /api/purchase-orders/:id/mark-received — 수령 완료 (간단 마킹, /receive 의 lite 버전)
//   /receive 는 품목별 수량 검증 + GeneralStock 업데이트가 있어 무거움. 단순 수령 확인용.
// ============================================
router.post('/purchase-orders/:id/mark-received', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (!Number.isFinite(id)) return res.status(404).json({ success: false, message: 'Not found' });

    const po = await PurchaseOrder.findByPk(id);
    if (!po) return res.status(404).json({ success: false, message: 'Not found' });
    if (!checkPOOwnership(po, req)) return res.status(404).json({ success: false, message: 'Not found' });

    if (po.status === 'received' || po.status === 'cancelled') {
      return res.status(400).json({ success: false, message: `Already ${po.status}` });
    }

    const now = new Date();
    const newTracking = appendTrackingEvent(po, 'received', null, { source: 'mark_received_action' });
    await po.update({
      status: 'received',
      received_at: now,
      actual_delivery_date: now,
      tracking_info: newTracking
    });

    res.json({ success: true, data: po });
  } catch (err) {
    console.error('mark-received error:', err);
    res.status(500).json({ success: false, message: 'Failed to mark received' });
  }
});

router.post('/purchase-orders/:id/submit', async (req, res) => {
  let po;
  try {
    const id = parseInt(req.params.id, 10);
    if (!Number.isFinite(id)) {
      return res.status(404).json({ success: false, message: 'Purchase order not found' });
    }
    po = await database.sequelize.transaction(async (t) => {
      const locked = await PurchaseOrder.findByPk(id, {
        lock: t.LOCK.UPDATE,
        include: [{ model: PurchaseOrderItem, as: 'items' }],
        transaction: t
      });
      if (!locked) { const e = new Error('NOT_FOUND'); e.code = 'NOT_FOUND'; throw e; }
      if (!checkPOOwnership(locked, req)) { const e = new Error('NOT_FOUND'); e.code = 'NOT_FOUND'; throw e; }
      if (locked.status !== 'draft') {
        const e = new Error('Only draft orders can be submitted');
        e.code = 'BAD_STATUS';
        throw e;
      }
      if (!locked.items || locked.items.length === 0) {
        const e = new Error('Purchase order has no items');
        e.code = 'EMPTY_ITEMS';
        throw e;
      }
      const now = new Date();
      const tracking = appendTrackingEvent(locked, 'submitted');
      await locked.update({
        status: 'submitted',
        submitted_at: now,
        tracking_info: tracking
      }, { transaction: t });
      return locked;
    });
    emitPoEvent(req, po, 'seller-order-created');

    // Notify seller asynchronously — don't block response
    setImmediate(() => fireSellerSubmittedNotification(po));

    res.json({ success: true, data: po });
  } catch (err) {
    if (err.code === 'NOT_FOUND') return res.status(404).json({ success: false, message: 'Purchase order not found' });
    if (err.code === 'BAD_STATUS') return res.status(400).json({ success: false, message: err.message });
    if (err.code === 'EMPTY_ITEMS') return res.status(400).json({ success: false, message: err.message });
    console.error('POST /api/purchase-orders/:id/submit error:', err);
    res.status(500).json({ success: false, message: 'Failed to submit purchase order' });
  }
});

// ============================================
// 6. POST /api/purchase-orders/:id/mark-shipped
// ============================================
router.post('/purchase-orders/:id/mark-shipped', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (!Number.isFinite(id)) {
      return res.status(404).json({ success: false, message: 'Purchase order not found' });
    }
    const po = await PurchaseOrder.findByPk(id);
    if (!po) return res.status(404).json({ success: false, message: 'Purchase order not found' });
    if (!checkPOOwnership(po, req)) {
      return res.status(404).json({ success: false, message: 'Purchase order not found' });
    }
    // External suppliers only — system supplier shipping must go through seller flow
    // (so SupplierProduct stock decrement + InventoryTransaction는 seller-orders.js 에서 처리)
    if (po.seller_type === 'supplier' && po.seller_entity_id) {
      const supplier = await SupplierCompany.findByPk(po.seller_entity_id, { attributes: ['is_system_registered'] });
      if (supplier && supplier.is_system_registered) {
        return res.status(403).json({
          success: false,
          message: 'System supplier orders must be shipped by the seller. Buyer mark-shipped is only allowed for external suppliers.'
        });
      }
    }
    if (po.status !== 'confirmed') {
      return res.status(400).json({
        success: false,
        message: 'Only confirmed orders can be marked shipped'
      });
    }

    const newTracking = appendTrackingEvent(po, 'shipped', 'Marked shipped by buyer');
    await po.update({ status: 'shipped', shipped_at: new Date(), tracking_info: newTracking });
    emitPoEvent(req, po, 'seller-order-updated');
    res.json({ success: true, data: po });
  } catch (err) {
    console.error('POST /api/purchase-orders/:id/mark-shipped error:', err);
    res.status(500).json({ success: false, message: 'Failed to mark shipped' });
  }
});

// ============================================
// 7. POST /api/purchase-orders/:id/receive
// ============================================
router.post('/purchase-orders/:id/receive', async (req, res) => {
  const t = await database.sequelize.transaction();
  try {
    const id = parseInt(req.params.id, 10);
    if (!Number.isFinite(id)) {
      await t.rollback();
      return res.status(404).json({ success: false, message: 'Purchase order not found' });
    }
    const po = await PurchaseOrder.findByPk(id, {
      include: [{ model: PurchaseOrderItem, as: 'items' }],
      transaction: t
    });
    if (!po) {
      await t.rollback();
      return res.status(404).json({ success: false, message: 'Purchase order not found' });
    }
    if (!checkPOOwnership(po, req)) {
      await t.rollback();
      return res.status(404).json({ success: false, message: 'Purchase order not found' });
    }
    if (!['shipped', 'delivered', 'partial_received'].includes(po.status)) {
      await t.rollback();
      return res.status(400).json({
        success: false,
        message: 'Only shipped or partially received orders can receive items'
      });
    }

    const { items: receivedItems } = req.body;
    if (!Array.isArray(receivedItems) || receivedItems.length === 0) {
      await t.rollback();
      return res.status(400).json({ success: false, message: 'items array is required' });
    }

    // Map for fast lookup
    const itemMap = new Map();
    for (const it of po.items) itemMap.set(it.id, it);

    const affectedIngredientIds = new Set();
    const autoReturns = [];          // Sprint 7: damaged/wrong_item auto-generated
    const discrepancyLines = [];      // Sprint 7: short/pending 보고만

    // Sprint 7: each item can have splits[] — backward compat with quantity_received-only payload
    // - Old payload: { item_id, quantity_received, unit_cost?, batch_no?, expiry_date? }
    // - New payload: { item_id, splits: [{ quantity, reason, unit_cost?, batch_no?, expiry_date?, discrepancy_note? }, ...] }
    const normalizeItemPayload = (r) => {
      if (Array.isArray(r.splits)) return r.splits.map(s => ({
        quantity: parseFloat(s.quantity),
        reason: s.reason ?? null,
        unit_cost: s.unit_cost,
        batch_no: s.batch_no,
        expiry_date: s.expiry_date,
        discrepancy_note: s.discrepancy_note
      }));
      // Legacy single-split (정상 수령) — backward compat
      return [{
        quantity: parseFloat(r.quantity_received),
        reason: null,
        unit_cost: r.unit_cost,
        batch_no: r.batch_no,
        expiry_date: r.expiry_date
      }];
    };

    for (const r of receivedItems) {
      const itemId = parseInt(r.item_id, 10);
      if (!Number.isFinite(itemId)) {
        await t.rollback();
        return res.status(400).json({ success: false, message: 'item_id is required' });
      }
      const item = itemMap.get(itemId);
      if (!item) {
        await t.rollback();
        return res.status(400).json({
          success: false, message: `item_id ${itemId} does not belong to this PO`
        });
      }

      const splits = normalizeItemPayload(r);
      const totalSplitQty = splits.reduce((sum, s) => sum + (Number.isFinite(s.quantity) ? s.quantity : 0), 0);
      if (!(totalSplitQty > 0)) {
        await t.rollback();
        return res.status(400).json({ success: false, message: `item ${itemId}: total split quantity must be > 0` });
      }

      // Validate Σ split.quantity ≤ remaining
      const ordered = parseFloat(item.quantity_ordered) || 0;
      const alreadyReceived = parseFloat(item.quantity_received) || 0;
      const remaining = ordered - alreadyReceived;
      if (totalSplitQty > remaining + 0.001) {
        await t.rollback();
        return res.status(400).json({
          success: false,
          message: `item ${itemId}: total quantity ${totalSplitQty} exceeds remaining ${remaining}`
        });
      }

      // Validate reason ENUM
      const ALLOWED = new Set([null, 'short', 'damaged', 'wrong_item', 'pending']);
      for (const s of splits) {
        if (!ALLOWED.has(s.reason)) {
          await t.rollback();
          return res.status(400).json({ success: false, message: `Invalid discrepancy_reason: ${s.reason}` });
        }
        if (!(s.quantity > 0)) {
          await t.rollback();
          return res.status(400).json({ success: false, message: 'Each split requires quantity > 0' });
        }
      }

      // Lock ingredient row to prevent race with FIFO deduction
      const ingredient = await Ingredient.findByPk(item.ingredient_id, {
        lock: t.LOCK.UPDATE,
        transaction: t
      });
      if (!ingredient) {
        await t.rollback();
        return res.status(400).json({
          success: false, message: `Ingredient ${item.ingredient_id} not found`
        });
      }

      const conv = parseFloat(item.unit_conversion) || 1;
      let currentStock = parseFloat(ingredient.current_stock) || 0;
      let normalQtyTotal = 0;             // sum of split.quantity where reason === null
      let lastDiscrepancyReason = null;   // 마지막 short/pending split 기록 — UI에서 표시용

      // ─── Sprint 7: process splits ───────────────────────
      for (const split of splits) {
        const qty = split.quantity;
        const reason = split.reason;

        if (reason === null) {
          // 정상 수령 — 재고 + InventoryBatch + InventoryTransaction
          normalQtyTotal = Math.round((normalQtyTotal + qty) * 100) / 100;
          const stockDelta = Math.round(qty * conv * 100) / 100;
          const newStock = Math.round((currentStock + stockDelta) * 100) / 100;
          const unitCost = split.unit_cost != null
            ? parseFloat(split.unit_cost)
            : (parseFloat(item.unit_price) || 0);

          // InventoryBatch — Sprint 7: entity_type 명시 (모든 buyer)
          await InventoryBatch.create({
            entity_type: po.entity_type,
            entity_id: po.entity_id,
            ingredient_id: item.ingredient_id,
            batch_number: split.batch_no || null,
            initial_quantity: stockDelta,
            remaining_quantity: stockDelta,
            unit: ingredient.unit,
            unit_cost: unitCost,
            expiry_date: split.expiry_date || null,
            received_date: new Date(),
            status: 'active',
            purchase_order_id: po.id,
            created_by: req.user.id
          }, { transaction: t });

          // InventoryTransaction — Sprint 7: entity_type 명시 + purchase_order_id FK
          await InventoryTransaction.create({
            entity_type: po.entity_type,
            entity_id: po.entity_id,
            ingredient_id: item.ingredient_id,
            transaction_type: 'purchase',
            quantity_change: stockDelta,
            unit: ingredient.unit,
            stock_after: newStock,
            purchase_order_id: po.id,
            notes: `PO ${po.po_number} receive`,
            created_by: req.user.id
          }, { transaction: t });

          // Restaurant buyer 가중평균 cost
          if (po.entity_type === 'restaurant') {
            const incomingCostPerIng = (parseFloat(item.unit_price) || 0) / conv;
            const existingCostRow = await RestaurantIngredientCost.findOne({
              where: { restaurant_id: po.entity_id, ingredient_id: item.ingredient_id },
              transaction: t
            });
            const oldCost = existingCostRow
              ? parseFloat(existingCostRow.unit_cost) || 0
              : (parseFloat(ingredient.unit_cost) || 0);
            const weighted = currentStock > 0 && newStock > 0
              ? (currentStock * oldCost + stockDelta * incomingCostPerIng) / newStock
              : incomingCostPerIng;
            const newAvg = Math.round(weighted * 10000) / 10000;

            if (existingCostRow) {
              await existingCostRow.update({
                unit_cost: newAvg,
                notes: `PO ${po.po_number} receive`,
                updated_by: req.user.id
              }, { transaction: t });
            } else {
              await RestaurantIngredientCost.create({
                restaurant_id: po.entity_id,
                ingredient_id: item.ingredient_id,
                unit_cost: newAvg,
                notes: `PO ${po.po_number} receive`,
                updated_by: req.user.id
              }, { transaction: t });
            }
          }

          await ingredient.update(
            { current_stock: newStock, last_stock_take_at: new Date() },
            { transaction: t }
          );
          currentStock = newStock;
        } else if (reason === 'damaged' || reason === 'wrong_item') {
          // Auto returns — 재고 변동 없음
          const sourceEvent = reason === 'damaged' ? 'receive_damage' : 'receive_wrong_item';
          const ar = await PurchaseOrderReturn.create({
            purchase_order_id: po.id,
            purchase_order_item_id: item.id,
            ingredient_id: item.ingredient_id,
            quantity: qty,
            unit: item.unit || ingredient.unit,
            unit_price: parseFloat(item.unit_price) || 0,
            reason: split.discrepancy_note || `Auto-generated: ${reason} on receive`,
            status: 'requested',
            requested_by_user_id: req.user.id,
            auto_generated: true,
            source_event: sourceEvent
          }, { transaction: t });
          autoReturns.push({
            id: ar.id, item_id: item.id, ingredient_id: item.ingredient_id,
            quantity: qty, reason
          });
        } else if (reason === 'short' || reason === 'pending') {
          // 보고만 — discrepancy 컬럼 update
          await PurchaseOrderItem.update({
            discrepancy_reason: reason,
            discrepancy_note: split.discrepancy_note || null,
            discrepancy_reported_at: new Date(),
            discrepancy_reported_by_user_id: req.user.id
          }, { where: { id: item.id }, transaction: t });
          lastDiscrepancyReason = reason;
          discrepancyLines.push({ item_id: item.id, quantity: qty, reason });
        }
      }

      // Update item.quantity_received with normal split sum
      if (normalQtyTotal > 0) {
        const newRecv = Math.round((alreadyReceived + normalQtyTotal) * 100) / 100;
        await PurchaseOrderItem.update(
          { quantity_received: newRecv },
          { where: { id: item.id }, transaction: t }
        );
        item.quantity_received = newRecv;
      }
      // (legacy block removed — splits 처리로 대체됨 below)
      affectedIngredientIds.add(item.ingredient_id);
    }

    // Determine PO completion status
    const allReceived = po.items.every(it =>
      (parseFloat(it.quantity_received) || 0) >= (parseFloat(it.quantity_ordered) || 0)
    );

    const newStatus = allReceived ? 'received' : 'partial_received';
    const newTracking = appendTrackingEvent(po, newStatus,
      allReceived ? 'Order received in full' : 'Order partially received');
    const updates = allReceived
      ? { status: 'received', received_at: new Date(), tracking_info: newTracking }
      : { status: 'partial_received', tracking_info: newTracking };
    await po.update(updates, { transaction: t });

    // Resolve stock alerts (best-effort, restaurant-scoped — Sprint 7: brand/foodcourt 미지원, restaurant only)
    if (po.entity_type === 'restaurant' && affectedIngredientIds.size > 0) {
      await StockAlert.update(
        { is_resolved: true, resolved_at: new Date() },
        {
          where: {
            restaurant_id: po.entity_id,
            ingredient_id: { [Op.in]: Array.from(affectedIngredientIds) },
            is_resolved: false
          },
          transaction: t
        }
      );
    }

    await t.commit();

    const updated = await PurchaseOrder.findByPk(po.id, {
      include: [{ model: PurchaseOrderItem, as: 'items' }]
    });

    // Sprint 5: emit realtime event to seller + buyer rooms
    emitPoEvent(req, updated, 'seller-order-updated');

    // Sprint 7: response includes auto_returns + discrepancy_lines for UI feedback
    res.locals.sprint7Extra = { auto_returns: autoReturns, discrepancy_lines: discrepancyLines };

    // Sprint 4: Auto-issue Trade Invoice when fully received (idempotent, non-blocking)
    if (updated.status === 'received') {
      (async () => {
        try {
          const { createTradeInvoice } = require('../services/purchaseOrderService');
          await createTradeInvoice(updated);
        } catch (e) {
          console.error('[Sprint 4] Trade invoice auto-issue failed:', e.message);
        }
      })();
    }

    res.json({
      success: true,
      data: updated,
      auto_returns: autoReturns,
      discrepancy_lines: discrepancyLines
    });
  } catch (err) {
    if (!t.finished) await t.rollback();
    console.error('POST /api/purchase-orders/:id/receive error:', err);
    res.status(500).json({ success: false, message: 'Failed to receive purchase order' });
  }
});

// ============================================
// Sprint 7 — PUT /api/purchase-orders/:id/items/:itemId/discrepancy
// 사후 차이 보고/변경 (예: pending → damaged 발견)
// ============================================
router.put('/purchase-orders/:id/items/:itemId/discrepancy', async (req, res) => {
  const t = await database.sequelize.transaction();
  try {
    const id = parseInt(req.params.id, 10);
    const itemId = parseInt(req.params.itemId, 10);
    if (!Number.isFinite(id) || !Number.isFinite(itemId)) {
      await t.rollback();
      return res.status(404).json({ success: false, message: 'Not found' });
    }

    const po = await PurchaseOrder.findByPk(id, { transaction: t });
    if (!po || !checkPOOwnership(po, req)) {
      await t.rollback();
      return res.status(404).json({ success: false, message: 'Not found' });
    }

    const item = await PurchaseOrderItem.findByPk(itemId, { transaction: t });
    if (!item || item.purchase_order_id !== po.id) {
      await t.rollback();
      return res.status(404).json({ success: false, message: 'Item not found' });
    }

    const ALLOWED = new Set([null, 'short', 'damaged', 'wrong_item', 'pending']);
    const reason = req.body?.reason ?? null;
    if (!ALLOWED.has(reason)) {
      await t.rollback();
      return res.status(400).json({ success: false, message: `Invalid reason: ${reason}` });
    }
    const note = (req.body?.note != null) ? String(req.body.note).slice(0, 500) : null;
    const qty = req.body?.quantity != null ? parseFloat(req.body.quantity) : null;

    // Update line discrepancy fields
    await PurchaseOrderItem.update({
      discrepancy_reason: reason,
      discrepancy_note: note,
      discrepancy_reported_at: reason ? new Date() : null,
      discrepancy_reported_by_user_id: reason ? req.user.id : null
    }, { where: { id: itemId }, transaction: t });

    // damaged/wrong_item으로 사후 변경 시 auto-return 자동 생성 (qty 필수)
    let autoReturn = null;
    if ((reason === 'damaged' || reason === 'wrong_item') && qty > 0) {
      const sourceEvent = reason === 'damaged' ? 'receive_damage' : 'receive_wrong_item';
      autoReturn = await PurchaseOrderReturn.create({
        purchase_order_id: po.id,
        purchase_order_item_id: itemId,
        ingredient_id: item.ingredient_id,
        quantity: qty,
        unit: item.unit,
        unit_price: parseFloat(item.unit_price) || 0,
        reason: note || `Auto-generated (post-receive): ${reason}`,
        status: 'requested',
        requested_by_user_id: req.user.id,
        auto_generated: true,
        source_event: sourceEvent
      }, { transaction: t });
    }

    await t.commit();
    emitPoEvent(req, po, 'seller-order-updated');
    res.json({
      success: true,
      data: { item_id: itemId, reason, note, quantity: qty },
      auto_return: autoReturn ? { id: autoReturn.id, quantity: qty, reason } : null
    });
  } catch (err) {
    if (!t.finished) await t.rollback();
    console.error('PUT discrepancy error:', err);
    res.status(500).json({ success: false, message: 'Failed to update discrepancy' });
  }
});

// ============================================
// 8. POST /api/purchase-orders/:id/cancel
// ============================================
router.post('/purchase-orders/:id/cancel', async (req, res) => {
  let po;
  try {
    const id = parseInt(req.params.id, 10);
    if (!Number.isFinite(id)) {
      return res.status(404).json({ success: false, message: 'Purchase order not found' });
    }
    const reason = req.body.reason ? sanitizeString(String(req.body.reason)) : null;
    po = await database.sequelize.transaction(async (t) => {
      const locked = await PurchaseOrder.findByPk(id, { lock: t.LOCK.UPDATE, transaction: t });
      if (!locked) { const e = new Error('NOT_FOUND'); e.code = 'NOT_FOUND'; throw e; }
      if (!checkPOOwnership(locked, req)) { const e = new Error('NOT_FOUND'); e.code = 'NOT_FOUND'; throw e; }
      if (!['draft', 'submitted'].includes(locked.status)) {
        const e = new Error(`Cannot cancel order in status '${locked.status}'. Use returns flow after delivery.`);
        e.code = 'BAD_STATUS';
        throw e;
      }
      const tracking = appendTrackingEvent(locked, 'cancelled', reason ? `Cancelled by buyer: ${reason.slice(0, 200)}` : 'Cancelled by buyer');
      await locked.update({
        status: 'cancelled',
        cancelled_at: new Date(),
        cancelled_reason: reason,
        tracking_info: tracking
      }, { transaction: t });
      return locked;
    });
    emitPoEvent(req, po, 'seller-order-updated');

    res.json({ success: true, data: po });
  } catch (err) {
    if (err.code === 'NOT_FOUND') return res.status(404).json({ success: false, message: 'Purchase order not found' });
    if (err.code === 'BAD_STATUS') return res.status(400).json({ success: false, message: err.message });
    console.error('POST /api/purchase-orders/:id/cancel error:', err);
    res.status(500).json({ success: false, message: 'Failed to cancel purchase order' });
  }
});

module.exports = router;

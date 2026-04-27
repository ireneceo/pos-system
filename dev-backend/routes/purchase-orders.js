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
    // Ingredient model has no foodcourt_id column; foodcourt buyers cannot
    // own ingredients directly in current schema. Reject.
    return null;
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

    const { rows, count } = await PurchaseOrder.findAndCountAll({
      where,
      order: [['created_at', 'DESC']],
      limit,
      offset,
      distinct: true
    });

    res.json({
      success: true,
      data: rows,
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

    res.json({ success: true, data: po });
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
    currency: 'MYR',
    expected_delivery_date: expected_delivery_date || null,
    delivery_address: delivery_address ? sanitizeString(String(delivery_address)) : null,
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
router.post('/purchase-orders/:id/submit', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (!Number.isFinite(id)) {
      return res.status(404).json({ success: false, message: 'Purchase order not found' });
    }
    const po = await PurchaseOrder.findByPk(id, {
      include: [{ model: PurchaseOrderItem, as: 'items' }]
    });
    if (!po) return res.status(404).json({ success: false, message: 'Purchase order not found' });
    if (!checkPOOwnership(po, req)) {
      return res.status(404).json({ success: false, message: 'Purchase order not found' });
    }
    if (po.status !== 'draft') {
      return res.status(400).json({ success: false, message: 'Only draft orders can be submitted' });
    }
    if (!po.items || po.items.length === 0) {
      return res.status(400).json({ success: false, message: 'Purchase order has no items' });
    }

    // Sprint 5: submit transitions draft → submitted (seller confirms separately)
    const now = new Date();
    const newTracking = appendTrackingEvent(po, 'submitted');
    await po.update({
      status: 'submitted',
      submitted_at: now,
      tracking_info: newTracking
    });
    emitPoEvent(req, po, 'seller-order-created');

    res.json({ success: true, data: po });
  } catch (err) {
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
    const restaurantIdForBatch = po.entity_type === 'restaurant' ? po.entity_id : null;

    for (const r of receivedItems) {
      const itemId = parseInt(r.item_id, 10);
      const qtyReceived = parseFloat(r.quantity_received);
      if (!Number.isFinite(itemId) || !(qtyReceived > 0)) {
        await t.rollback();
        return res.status(400).json({
          success: false, message: 'Each receive line requires item_id and quantity_received > 0'
        });
      }
      const item = itemMap.get(itemId);
      if (!item) {
        await t.rollback();
        return res.status(400).json({
          success: false, message: `item_id ${itemId} does not belong to this PO`
        });
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
      const stockDelta = Math.round(qtyReceived * conv * 100) / 100;
      const currentStock = parseFloat(ingredient.current_stock) || 0;
      const newStock = Math.round((currentStock + stockDelta) * 100) / 100;

      // Update item.quantity_received
      const newRecv = Math.round(((parseFloat(item.quantity_received) || 0) + qtyReceived) * 100) / 100;
      await PurchaseOrderItem.update(
        { quantity_received: newRecv },
        { where: { id: item.id }, transaction: t }
      );
      item.quantity_received = newRecv; // mutate local snapshot for completion check

      // Determine restaurant_id for InventoryBatch (NOT NULL on the table).
      // For non-restaurant buyers, batches at the ingredient-level cannot be
      // recorded with a restaurant_id; we still create transaction + stock update.
      // For restaurant buyer, write the batch.
      const unitCost = r.unit_cost != null
        ? parseFloat(r.unit_cost)
        : (parseFloat(item.unit_price) || 0);

      if (restaurantIdForBatch) {
        await InventoryBatch.create({
          restaurant_id: restaurantIdForBatch,
          ingredient_id: item.ingredient_id,
          batch_number: r.batch_no || null,
          initial_quantity: stockDelta,
          remaining_quantity: stockDelta,
          unit: ingredient.unit,
          unit_cost: unitCost,
          expiry_date: r.expiry_date || null,
          received_date: new Date(),
          status: 'active',
          purchase_order_id: po.id,
          created_by: req.user.id
        }, { transaction: t });

        await InventoryTransaction.create({
          restaurant_id: restaurantIdForBatch,
          ingredient_id: item.ingredient_id,
          transaction_type: 'purchase',
          quantity_change: stockDelta,
          unit: ingredient.unit,
          stock_after: newStock,
          notes: `PO ${po.po_number} receive`,
          created_by: req.user.id
        }, { transaction: t });
      }

      // Update ingredient stock
      await ingredient.update(
        { current_stock: newStock, last_stock_take_at: new Date() },
        { transaction: t }
      );

      // Phase 2: weighted-average cost upsert for Restaurant buyer.
      // Brand-shared ingredients keep master cost untouched; restaurant override carries actuals.
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

    // Resolve stock alerts (best-effort, restaurant-scoped)
    if (restaurantIdForBatch && affectedIngredientIds.size > 0) {
      await StockAlert.update(
        { is_resolved: true, resolved_at: new Date() },
        {
          where: {
            restaurant_id: restaurantIdForBatch,
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

    res.json({ success: true, data: updated });
  } catch (err) {
    if (!t.finished) await t.rollback();
    console.error('POST /api/purchase-orders/:id/receive error:', err);
    res.status(500).json({ success: false, message: 'Failed to receive purchase order' });
  }
});

// ============================================
// 8. POST /api/purchase-orders/:id/cancel
// ============================================
router.post('/purchase-orders/:id/cancel', async (req, res) => {
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
    // Sprint 6: allow buyer cancel on draft (no seller awareness) AND submitted (before seller confirms).
    // Beyond that, returns flow handles cancellation/refund.
    if (!['draft', 'submitted'].includes(po.status)) {
      return res.status(400).json({
        success: false,
        message: `Cannot cancel order in status '${po.status}'. Use returns flow after delivery.`
      });
    }

    const reason = req.body.reason ? sanitizeString(String(req.body.reason)) : null;
    const newTracking = appendTrackingEvent(po, 'cancelled', reason ? `Cancelled by buyer: ${reason.slice(0, 200)}` : 'Cancelled by buyer');

    await po.update({
      status: 'cancelled',
      cancelled_at: new Date(),
      cancelled_reason: reason,
      tracking_info: newTracking
    });
    emitPoEvent(req, po, 'seller-order-updated');

    res.json({ success: true, data: po });
  } catch (err) {
    console.error('POST /api/purchase-orders/:id/cancel error:', err);
    res.status(500).json({ success: false, message: 'Failed to cancel purchase order' });
  }
});

module.exports = router;

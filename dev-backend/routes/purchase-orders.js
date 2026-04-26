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
  StockAlert
} = require('../models');
const { authenticateToken } = require('../middleware/auth');
const { requireBuyerRole } = require('../middleware/buyerScope');
const { sanitizeString } = require('../middleware/validation');

router.use(authenticateToken);
router.use(requireBuyerRole);

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
 * For supplier seller, find an active SupplierContract for this buyer.
 * Returns the contract or null.
 */
async function findActiveSupplierContract(supplierCompanyId, buyerEntity) {
  if (!buyerEntity) return null;
  return SupplierContract.findOne({
    where: {
      supplier_company_id: supplierCompanyId,
      entity_type: buyerEntity.type,
      entity_id: buyerEntity.id,
      status: 'active'
    }
  });
}

/** Generate the next PO number for this buyer entity. */
async function generatePoNumber(buyerEntity) {
  const prefix = ENTITY_TYPE_PREFIX[buyerEntity.type] || 'X';
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const dateStr = `${yyyy}${mm}${dd}`;

  const startOfDay = new Date(yyyy, today.getMonth(), today.getDate(), 0, 0, 0, 0);
  const endOfDay = new Date(yyyy, today.getMonth(), today.getDate(), 23, 59, 59, 999);

  const count = await PurchaseOrder.count({
    where: {
      entity_type: buyerEntity.type,
      entity_id: buyerEntity.id,
      created_at: { [Op.between]: [startOfDay, endOfDay] }
    }
  });
  const seq = String(count + 1).padStart(3, '0');
  return `PO-${prefix}${buyerEntity.id}-${dateStr}-${seq}`;
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
// 3. POST /api/purchase-orders
// ============================================
router.post('/purchase-orders', async (req, res) => {
  const t = await database.sequelize.transaction();
  try {
    if (!buyerScopeRequired(req, res)) { await t.rollback(); return; }

    const {
      seller_type,
      seller_entity_id,
      items,
      expected_delivery_date,
      delivery_address,
      notes
    } = req.body;

    if (!VALID_SELLER_TYPES.includes(seller_type)) {
      await t.rollback();
      return res.status(400).json({ success: false, message: 'Invalid seller_type' });
    }
    if (!Array.isArray(items) || items.length === 0) {
      await t.rollback();
      return res.status(400).json({ success: false, message: 'At least one item is required' });
    }

    // Validate each item
    const validatedItems = [];
    for (const raw of items) {
      const ingredientId = parseInt(raw.ingredient_id, 10);
      const qty = parseFloat(raw.quantity_ordered);
      if (!Number.isFinite(ingredientId) || !(qty > 0)) {
        await t.rollback();
        return res.status(400).json({
          success: false,
          message: 'Each item requires ingredient_id and quantity_ordered > 0'
        });
      }
      const ing = await ingredientBelongsToBuyer(ingredientId, req.buyerEntity);
      if (!ing) {
        await t.rollback();
        return res.status(400).json({
          success: false,
          message: `Ingredient ${ingredientId} not accessible to this buyer`
        });
      }
      // Fall back unit_conversion + unit_price to IngredientSellerProduct if linked
      let convFallback = 1;
      let priceFallback = 0;
      if (raw.ingredient_seller_product_id) {
        const sellerSrc = await IngredientSellerProduct.findByPk(raw.ingredient_seller_product_id, { transaction: t });
        if (sellerSrc && sellerSrc.ingredient_id === ingredientId) {
          convFallback = parseFloat(sellerSrc.unit_conversion) || 1;
          priceFallback = parseFloat(sellerSrc.unit_price) || 0;
        }
      }
      const finalConv = raw.unit_conversion != null ? (parseFloat(raw.unit_conversion) || 1) : convFallback;
      const finalPrice = raw.unit_price != null ? (parseFloat(raw.unit_price) || 0) : priceFallback;
      validatedItems.push({
        ingredient_id: ingredientId,
        ingredient_seller_product_id: raw.ingredient_seller_product_id || null,
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

    // Supplier contract gate
    let contractId = null;
    if (seller_type === 'supplier') {
      const supplierId = parseInt(seller_entity_id, 10);
      if (!Number.isFinite(supplierId)) {
        await t.rollback();
        return res.status(400).json({ success: false, message: 'seller_entity_id is required for supplier' });
      }
      const contract = await findActiveSupplierContract(supplierId, req.buyerEntity);
      if (!contract) {
        await t.rollback();
        return res.status(400).json({
          success: false,
          code: 'NO_ACTIVE_CONTRACT',
          message: 'No active contract with this supplier'
        });
      }
      contractId = contract.id;
    }

    const totals = computeTotals(validatedItems);
    const poNumber = await generatePoNumber(req.buyerEntity);

    const po = await PurchaseOrder.create({
      po_number: poNumber,
      entity_type: req.buyerEntity.type,
      entity_id: req.buyerEntity.id,
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
      created_by_user_id: req.user.id
    }, { transaction: t });

    const itemsToCreate = validatedItems.map(it => ({ ...it, purchase_order_id: po.id }));
    await PurchaseOrderItem.bulkCreate(itemsToCreate, { transaction: t });

    await t.commit();

    const created = await PurchaseOrder.findByPk(po.id, {
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
    if (po.status !== 'draft') {
      await t.rollback();
      return res.status(400).json({ success: false, message: 'Only draft orders can be edited' });
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

    const now = new Date();
    await po.update({
      status: 'confirmed', // Sprint 3 임시 — Sprint 4: 'submitted' 후 supplier confirm
      submitted_at: now,
      confirmed_at: now
    });

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

    await po.update({ status: 'shipped', shipped_at: new Date() });
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
    if (!['shipped', 'partial_received'].includes(po.status)) {
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

      affectedIngredientIds.add(item.ingredient_id);
    }

    // Determine PO completion status
    const allReceived = po.items.every(it =>
      (parseFloat(it.quantity_received) || 0) >= (parseFloat(it.quantity_ordered) || 0)
    );

    const updates = allReceived
      ? { status: 'received', received_at: new Date() }
      : { status: 'partial_received' };
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
    if (po.status !== 'draft') {
      return res.status(400).json({
        success: false,
        message: 'Only draft orders can be cancelled in Sprint 3'
      });
    }

    const reason = req.body.reason ? sanitizeString(String(req.body.reason)) : null;

    await po.update({
      status: 'cancelled',
      cancelled_at: new Date(),
      cancelled_reason: reason
    });

    res.json({ success: true, data: po });
  } catch (err) {
    console.error('POST /api/purchase-orders/:id/cancel error:', err);
    res.status(500).json({ success: false, message: 'Failed to cancel purchase order' });
  }
});

module.exports = router;

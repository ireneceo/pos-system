/**
 * Purchase Order Returns — Sprint 6 (2026-04-27).
 *
 * Buyer-initiated returns on received PO line items.
 * Seller approves → Credit Note Invoice auto-issued + stock reversal.
 *
 *   POST /api/purchase-orders/:id/returns                     — buyer initiate
 *   GET  /api/purchase-orders/:id/returns                     — buyer view
 *   GET  /api/seller-orders/:id/returns                       — seller view
 *   POST /api/seller-orders/:id/returns/:returnId/approve     — seller approve
 *   POST /api/seller-orders/:id/returns/:returnId/reject      — seller reject
 */

const express = require('express');
const router = express.Router();
const database = require('../config/database');
const {
  PurchaseOrder, PurchaseOrderItem, PurchaseOrderReturn,
  Ingredient, IngredientSellerProduct, SupplierProduct, SupplierInventoryTransaction,
  Invoice, InvoiceItem
} = require('../models');
const { authenticateToken } = require('../middleware/auth');
const { requireBuyerRole } = require('../middleware/buyerScope');
const { requireSellerRole } = require('../middleware/sellerScope');
const { sanitizeString } = require('../middleware/validation');
const { emitPoEvent } = require('../services/poRealtimeService');

// ============================================
// Buyer endpoints — owns the PO
// ============================================
router.use('/purchase-orders/:id/returns', authenticateToken, requireBuyerRole);

router.post('/purchase-orders/:id/returns', async (req, res) => {
  const t = await database.sequelize.transaction();
  try {
    const id = parseInt(req.params.id, 10);
    if (!Number.isFinite(id)) { await t.rollback(); return res.status(404).json({ success: false, message: 'Purchase order not found' }); }
    const po = await PurchaseOrder.findByPk(id, { include: [{ model: PurchaseOrderItem, as: 'items' }], transaction: t });
    if (!po) { await t.rollback(); return res.status(404).json({ success: false, message: 'Purchase order not found' }); }

    // Buyer ownership
    const buyer = req.buyerEntity;
    if (!buyer || po.entity_type !== buyer.type || parseInt(po.entity_id, 10) !== parseInt(buyer.id, 10)) {
      await t.rollback();
      return res.status(404).json({ success: false, message: 'Purchase order not found' });
    }

    // Allowed status: only after delivery (received or partial_received or delivered)
    if (!['received', 'partial_received', 'delivered'].includes(po.status)) {
      await t.rollback();
      return res.status(400).json({ success: false, message: `Returns only allowed after delivery (current status: ${po.status})` });
    }

    const items = req.body?.items;
    if (!Array.isArray(items) || items.length === 0) {
      await t.rollback();
      return res.status(400).json({ success: false, message: 'items array is required' });
    }

    const itemMap = new Map();
    for (const it of po.items) itemMap.set(it.id, it);

    const reasonGlobal = sanitizeString(String(req.body?.reason || '')).slice(0, 1000);
    const created = [];

    for (const r of items) {
      const itemId = parseInt(r.purchase_order_item_id, 10);
      const qty = parseFloat(r.quantity);
      if (!Number.isFinite(itemId) || !(qty > 0)) {
        await t.rollback();
        return res.status(400).json({ success: false, message: 'Each return line requires purchase_order_item_id and quantity > 0' });
      }
      const poItem = itemMap.get(itemId);
      if (!poItem) {
        await t.rollback();
        return res.status(400).json({ success: false, message: `Item ${itemId} does not belong to this PO` });
      }
      // Cannot return more than received
      const received = parseFloat(poItem.quantity_received) || 0;
      if (qty > received) {
        await t.rollback();
        return res.status(400).json({ success: false, message: `Return qty (${qty}) exceeds received (${received}) for item ${itemId}` });
      }

      const ret = await PurchaseOrderReturn.create({
        purchase_order_id: po.id,
        purchase_order_item_id: itemId,
        ingredient_id: poItem.ingredient_id,
        quantity: qty,
        unit: poItem.unit,
        unit_price: poItem.unit_price,
        reason: r.reason ? sanitizeString(String(r.reason)).slice(0, 1000) : reasonGlobal || null,
        status: 'requested',
        requested_by_user_id: req.user.id
      }, { transaction: t });
      created.push(ret);
    }

    await t.commit();
    emitPoEvent(req, po, 'seller-order-updated');
    res.status(201).json({ success: true, data: created });
  } catch (err) {
    if (!t.finished) await t.rollback();
    console.error('POST returns error:', err);
    res.status(500).json({ success: false, message: 'Failed to create return' });
  }
});

router.get('/purchase-orders/:id/returns', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (!Number.isFinite(id)) return res.status(404).json({ success: false, message: 'Purchase order not found' });
    const po = await PurchaseOrder.findByPk(id);
    if (!po) return res.status(404).json({ success: false, message: 'Purchase order not found' });
    const buyer = req.buyerEntity;
    if (!buyer || po.entity_type !== buyer.type || parseInt(po.entity_id, 10) !== parseInt(buyer.id, 10)) {
      return res.status(404).json({ success: false, message: 'Purchase order not found' });
    }
    const list = await PurchaseOrderReturn.findAll({
      where: { purchase_order_id: po.id },
      order: [['created_at', 'DESC']]
    });
    res.json({ success: true, data: list });
  } catch (err) {
    console.error('GET returns error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch returns' });
  }
});

// ============================================
// Seller endpoints — approve/reject
// ============================================
router.use('/seller-orders/:id/returns', authenticateToken, requireSellerRole);

router.get('/seller-orders/:id/returns', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (!Number.isFinite(id)) return res.status(404).json({ success: false, message: 'Order not found' });
    const po = await PurchaseOrder.findByPk(id);
    if (!po) return res.status(404).json({ success: false, message: 'Order not found' });
    const sellerOk = req.sellerEntity
      ? po.seller_type === req.sellerEntity.type &&
        (req.sellerEntity.id == null
          ? po.seller_entity_id == null
          : parseInt(po.seller_entity_id, 10) === parseInt(req.sellerEntity.id, 10))
      : !!req.sellerIsAdmin;
    if (!sellerOk) return res.status(404).json({ success: false, message: 'Order not found' });

    const list = await PurchaseOrderReturn.findAll({
      where: { purchase_order_id: po.id },
      order: [['created_at', 'DESC']]
    });
    res.json({ success: true, data: list });
  } catch (err) {
    console.error('GET seller returns error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch returns' });
  }
});

async function loadAndCheckReturn(req) {
  const id = parseInt(req.params.id, 10);
  const returnId = parseInt(req.params.returnId, 10);
  if (!Number.isFinite(id) || !Number.isFinite(returnId)) return { error: 'Order/Return not found', status: 404 };
  const po = await PurchaseOrder.findByPk(id);
  if (!po) return { error: 'Order not found', status: 404 };
  const sellerOk = req.sellerEntity
    ? po.seller_type === req.sellerEntity.type &&
      (req.sellerEntity.id == null
        ? po.seller_entity_id == null
        : parseInt(po.seller_entity_id, 10) === parseInt(req.sellerEntity.id, 10))
    : !!req.sellerIsAdmin;
  if (!sellerOk) return { error: 'Order not found', status: 404 };
  const ret = await PurchaseOrderReturn.findByPk(returnId);
  if (!ret || ret.purchase_order_id !== po.id) return { error: 'Return not found', status: 404 };
  return { po, ret };
}

router.post('/seller-orders/:id/returns/:returnId/approve', async (req, res) => {
  const t = await database.sequelize.transaction();
  try {
    const { error, status, po, ret } = await loadAndCheckReturn(req);
    if (error) { await t.rollback(); return res.status(status).json({ success: false, message: error }); }
    if (ret.status !== 'requested') {
      await t.rollback();
      return res.status(400).json({ success: false, message: `Return cannot be approved in status '${ret.status}'` });
    }

    // 1. Reverse buyer-side ingredient stock (decrement)
    if (po.entity_type === 'restaurant') {
      const ingredient = await Ingredient.findByPk(ret.ingredient_id, { lock: t.LOCK.UPDATE, transaction: t });
      if (ingredient) {
        const cur = parseFloat(ingredient.current_stock) || 0;
        const newStock = Math.max(0, Math.round((cur - parseFloat(ret.quantity)) * 100) / 100);
        await ingredient.update({ current_stock: newStock }, { transaction: t });
      }
    }

    // 2. Increment supplier stock + transaction
    if (po.seller_type === 'supplier' && po.seller_entity_id) {
      const item = await PurchaseOrderItem.findByPk(ret.purchase_order_item_id, { transaction: t });
      if (item?.ingredient_seller_product_id) {
        const mapping = await IngredientSellerProduct.findByPk(item.ingredient_seller_product_id, { transaction: t });
        if (mapping?.seller_product_id) {
          const sp = await SupplierProduct.findByPk(mapping.seller_product_id, { lock: t.LOCK.UPDATE, transaction: t });
          if (sp) {
            const old = parseFloat(sp.current_stock) || 0;
            const delta = parseFloat(ret.quantity) || 0;
            const nu = Math.round((old + delta) * 100) / 100;
            await sp.update({ current_stock: nu }, { transaction: t });
            await SupplierInventoryTransaction.create({
              supplier_company_id: po.seller_entity_id,
              supplier_product_id: sp.id,
              transaction_type: 'manual_adjust',
              quantity_change: delta,
              unit: sp.unit || null,
              stock_after: nu,
              reason: 'return_approved',
              reference_type: 'purchase_order',
              reference_id: po.id,
              notes: `Return #${ret.id} approved`,
              created_by: req.user?.id || null
            }, { transaction: t });
          }
        }
      }
    }

    // 3. Issue Credit Note Invoice (negative-style: use status='credit')
    const lineTotal = Math.round((parseFloat(ret.quantity) * (parseFloat(ret.unit_price) || 0)) * 100) / 100;
    const creditInvoice = await Invoice.create({
      invoice_number: `CN-${po.po_number}-R${ret.id}`,
      type: 'automatic',
      invoice_category: 'credit_note',
      category_display_name: 'Credit Note (Return)',
      issuer_type: po.seller_type === 'system_admin' ? 'system_admin' : po.seller_type,
      issuer_id: po.seller_entity_id || 1,
      issued_by: req.user?.id || 1,
      issued_at: new Date(),
      payer_type: po.entity_type === 'restaurant' ? 'restaurant' : (po.entity_type === 'brand' ? 'brand_manager' : 'foodcourt_manager'),
      payer_id: po.entity_id,
      restaurant_id: po.entity_type === 'restaurant' ? po.entity_id : null,
      contract_id: po.contract_id || null,
      billing_period_start: new Date(),
      billing_period_end: new Date(),
      due_date: new Date(),
      subtotal: lineTotal,
      tax_amount: 0,
      discount_amount: 0,
      total_amount: lineTotal,
      currency: po.currency || 'MYR',
      status: 'credit',
      notes: `Credit Note for Return #${ret.id} (PO ${po.po_number})`
    }, { transaction: t });

    await InvoiceItem.create({
      invoice_id: creditInvoice.id,
      description: `Return: ingredient #${ret.ingredient_id} × ${ret.quantity} ${ret.unit || ''}`,
      quantity: ret.quantity,
      unit_price: ret.unit_price || 0,
      calculated_amount: lineTotal,
      total_amount: lineTotal,
      tax_amount: 0,
      item_type: 'product',
      calculation_method: 'fixed'
    }, { transaction: t });

    await ret.update({
      status: 'approved',
      approved_by_user_id: req.user.id,
      resolved_at: new Date(),
      credit_invoice_id: creditInvoice.id
    }, { transaction: t });

    await t.commit();
    emitPoEvent(req, po, 'seller-order-updated');
    res.json({ success: true, data: { return: ret, credit_invoice: creditInvoice }, message: 'Return approved' });
  } catch (err) {
    if (!t.finished) await t.rollback();
    console.error('POST approve return error:', err);
    res.status(500).json({ success: false, message: 'Failed to approve return' });
  }
});

router.post('/seller-orders/:id/returns/:returnId/reject', async (req, res) => {
  try {
    const { error, status, po, ret } = await loadAndCheckReturn(req);
    if (error) return res.status(status).json({ success: false, message: error });
    if (ret.status !== 'requested') {
      return res.status(400).json({ success: false, message: `Return cannot be rejected in status '${ret.status}'` });
    }
    const reason = sanitizeString(String(req.body?.reason || '').trim()).slice(0, 1000);
    if (!reason) return res.status(400).json({ success: false, message: 'reason is required' });

    await ret.update({
      status: 'rejected',
      rejected_by_user_id: req.user.id,
      resolved_at: new Date(),
      rejection_reason: reason
    });
    emitPoEvent(req, po, 'seller-order-updated');
    res.json({ success: true, data: ret, message: 'Return rejected' });
  } catch (err) {
    console.error('POST reject return error:', err);
    res.status(500).json({ success: false, message: 'Failed to reject return' });
  }
});

module.exports = router;

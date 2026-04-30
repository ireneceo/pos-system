/**
 * Seller Orders — Sprint 4 (Supply Chain Design 4)
 *
 * Seller-facing PO endpoints. Seller is one of:
 *   - Supplier (Supplier Admin)
 *   - Brand (Brand General / Manager)
 *   - Foodcourt (Foodcourt General / Manager)
 *   - System Admin (override via ?seller_type=&seller_entity_id=)
 *
 * 6 endpoints — all require: authenticateToken + requireSellerRole
 *
 * IDOR defense: every :id operation checks seller scope match.
 * Notifications: non-blocking, fired post-commit via try/catch.
 */

const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const {
  PurchaseOrder,
  PurchaseOrderItem,
  Ingredient,
  IngredientSellerProduct,
  SupplierProduct,
  SupplierInventoryTransaction,
  User,
  Restaurant,
  Brand,
  Foodcourt,
  SupplierContract,
  SupplierCompany
} = require('../models');
const { authenticateToken } = require('../middleware/auth');
const { requireSellerRole } = require('../middleware/sellerScope');
const { sanitizeString } = require('../middleware/validation');
const { appendTrackingEvent, decorateCarrier, emitPoEvent } = require('../services/poRealtimeService');
const { sendNotificationBatch, getRestaurantOwnerIds, getBrandManagerIds, getFoodcourtManagerIds } = require('../utils/notificationService');
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');

router.use(authenticateToken);
router.use(requireSellerRole);

// ============================================
// Helpers
// ============================================

const FRONTEND_URL = process.env.FRONTEND_URL || (process.env.NODE_ENV === 'production' ? 'https://purplehere.com' : 'https://dev.purplehere.com');

function buildSellerWhere(req) {
  // System Admin without override → return all (used for stats / list)
  if (req.sellerIsAdmin && !req.sellerEntity) return {};
  if (!req.sellerEntity) return null;
  const where = { seller_type: req.sellerEntity.type };
  if (req.sellerEntity.id !== null && req.sellerEntity.id !== undefined) {
    where.seller_entity_id = req.sellerEntity.id;
  } else {
    where.seller_entity_id = null; // system_admin
  }
  return where;
}

function checkSellerOwnership(po, req) {
  if (req.sellerIsAdmin && !req.sellerEntity) return true;
  if (!req.sellerEntity) return false;
  if (po.seller_type !== req.sellerEntity.type) return false;
  if (req.sellerEntity.id === null || req.sellerEntity.id === undefined) {
    return po.seller_entity_id === null;
  }
  return parseInt(po.seller_entity_id, 10) === parseInt(req.sellerEntity.id, 10);
}

/** Resolve buyer info for display (name + entity meta). */
async function resolveBuyerInfo(po) {
  try {
    if (po.entity_type === 'restaurant') {
      const r = await Restaurant.findByPk(po.entity_id, { attributes: ['id', 'name', 'email'] });
      return r ? { id: r.id, type: 'restaurant', name: r.name, email: r.email } : null;
    }
    if (po.entity_type === 'brand') {
      const b = await Brand.findByPk(po.entity_id, { attributes: ['id', 'name', 'owner_id'] });
      return b ? { id: b.id, type: 'brand', name: b.name, owner_id: b.owner_id } : null;
    }
    if (po.entity_type === 'foodcourt') {
      const f = await Foodcourt.findByPk(po.entity_id, { attributes: ['id', 'name', 'owner_id'] });
      return f ? { id: f.id, type: 'foodcourt', name: f.name, owner_id: f.owner_id } : null;
    }
  } catch (e) {
    console.error('[seller-orders] resolveBuyerInfo error:', e.message);
  }
  return null;
}

/** Get buyer recipient user IDs (Restaurant Admin/Owner OR Brand/Foodcourt General). */
async function getBuyerRecipientUserIds(po) {
  try {
    const ids = new Set();
    if (po.entity_type === 'restaurant') {
      const admins = await sequelize.query(
        `SELECT id FROM users WHERE restaurant_id = :rid AND role = 'Restaurant Admin' AND email IS NOT NULL`,
        { replacements: { rid: po.entity_id }, type: QueryTypes.SELECT }
      );
      admins.forEach(u => ids.add(u.id));
      const owners = await getRestaurantOwnerIds(po.entity_id);
      owners.forEach(id => ids.add(id));
    } else if (po.entity_type === 'brand') {
      const mgrs = await getBrandManagerIds(po.entity_id);
      mgrs.forEach(id => ids.add(id));
    } else if (po.entity_type === 'foodcourt') {
      const mgrs = await getFoodcourtManagerIds(po.entity_id);
      mgrs.forEach(id => ids.add(id));
    }
    return Array.from(ids);
  } catch (e) {
    console.error('[seller-orders] getBuyerRecipientUserIds error:', e.message);
    return [];
  }
}

async function fireBuyerNotification(po, category, mailOptions) {
  try {
    const userIds = await getBuyerRecipientUserIds(po);
    if (userIds.length === 0) return;
    await sendNotificationBatch(userIds, category, mailOptions);
  } catch (e) {
    console.error(`[seller-orders] notification (${category}) error:`, e.message);
  }
}

// ============================================
// 1. GET /api/seller-orders
// ============================================
router.get('/', async (req, res) => {
  try {
    const where = buildSellerWhere(req);
    if (!where && !req.sellerIsAdmin) {
      return res.status(400).json({ success: false, message: 'Seller scope required' });
    }

    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 20));
    const offset = (page - 1) * limit;

    const filterWhere = { ...(where || {}) };
    if (req.query.status) filterWhere.status = req.query.status;
    // Sprint 6: date range filter (from/to ISO date strings)
    if (req.query.from || req.query.to) {
      filterWhere.created_at = {};
      if (req.query.from) filterWhere.created_at[Op.gte] = new Date(req.query.from);
      if (req.query.to) filterWhere.created_at[Op.lte] = new Date(req.query.to);
    }

    const { rows, count } = await PurchaseOrder.findAndCountAll({
      where: filterWhere,
      include: [
        { model: PurchaseOrderItem, as: 'items', include: [{ model: Ingredient, as: 'ingredient', attributes: ['id', 'name', 'unit'] }] },
        { model: User, as: 'createdBy', attributes: ['id', 'username', 'full_name', 'email'] }
      ],
      order: [['created_at', 'DESC']],
      limit,
      offset,
      distinct: true
    });

    // Attach buyer info to each PO
    const data = await Promise.all(rows.map(async (po) => {
      const obj = po.toJSON();
      obj.buyer = await resolveBuyerInfo(po);
      return obj;
    }));

    res.json({
      success: true,
      data,
      pagination: { total: count, page, limit, totalPages: Math.ceil(count / limit) }
    });
  } catch (err) {
    console.error('GET /api/seller-orders error:', err);
    res.status(500).json({ success: false, message: 'Failed to load seller orders' });
  }
});

// ============================================
// 6. GET /api/seller-orders/stats
//    (defined BEFORE /:id to avoid collision)
// ============================================
router.get('/stats', async (req, res) => {
  try {
    const where = buildSellerWhere(req);
    if (!where && !req.sellerIsAdmin) {
      return res.status(400).json({ success: false, message: 'Seller scope required' });
    }
    const baseWhere = where || {};

    const [pending, confirmed, shipped, cancelled] = await Promise.all([
      PurchaseOrder.count({ where: { ...baseWhere, status: 'submitted' } }),
      PurchaseOrder.count({ where: { ...baseWhere, status: 'confirmed' } }),
      PurchaseOrder.count({ where: { ...baseWhere, status: 'shipped' } }),
      PurchaseOrder.count({ where: { ...baseWhere, status: 'cancelled' } })
    ]);

    // received_this_month: count POs received this month
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
    const receivedThisMonth = await PurchaseOrder.count({
      where: {
        ...baseWhere,
        status: { [Op.in]: ['received', 'partial_received', 'closed'] },
        received_at: { [Op.between]: [monthStart, monthEnd] }
      }
    });

    res.json({
      success: true,
      data: {
        pending,
        confirmed,
        shipped,
        received_this_month: receivedThisMonth,
        cancelled
      }
    });
  } catch (err) {
    console.error('GET /api/seller-orders/stats error:', err);
    res.status(500).json({ success: false, message: 'Failed to load stats' });
  }
});

// ============================================
// 2. GET /api/seller-orders/:id
// ============================================
router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (!Number.isFinite(id)) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    const po = await PurchaseOrder.findByPk(id, {
      include: [
        { model: PurchaseOrderItem, as: 'items', include: [{ model: Ingredient, as: 'ingredient', attributes: ['id', 'name', 'unit'] }] },
        { model: User, as: 'createdBy', attributes: ['id', 'username', 'full_name', 'email'] },
        { model: SupplierContract, as: 'contract', required: false }
      ]
    });
    if (!po) return res.status(404).json({ success: false, message: 'Order not found' });
    if (!checkSellerOwnership(po, req)) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    const obj = po.toJSON();
    obj.buyer = await resolveBuyerInfo(po);
    res.json({ success: true, data: obj });
  } catch (err) {
    console.error('GET /api/seller-orders/:id error:', err);
    res.status(500).json({ success: false, message: 'Failed to load order' });
  }
});

// ============================================
// 3. POST /api/seller-orders/:id/confirm
// ============================================
router.post('/:id/confirm', async (req, res) => {
  let po;
  try {
    const id = parseInt(req.params.id, 10);
    if (!Number.isFinite(id)) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    po = await sequelize.transaction(async (t) => {
      const locked = await PurchaseOrder.findByPk(id, { lock: t.LOCK.UPDATE, transaction: t });
      if (!locked) { const e = new Error('NOT_FOUND'); e.code = 'NOT_FOUND'; throw e; }
      if (!checkSellerOwnership(locked, req)) { const e = new Error('NOT_FOUND'); e.code = 'NOT_FOUND'; throw e; }
      if (locked.status !== 'submitted') {
        const e = new Error(`Cannot confirm order in status '${locked.status}'`);
        e.code = 'BAD_STATUS';
        throw e;
      }
      const newTracking = appendTrackingEvent(locked, 'confirmed');
      await locked.update({ status: 'confirmed', confirmed_at: new Date(), tracking_info: newTracking }, { transaction: t });
      return locked;
    });
    emitPoEvent(req, po, 'seller-order-updated');

    // Fire notification (non-blocking)
    setImmediate(async () => {
      try {
        const buyer = await resolveBuyerInfo(po);
        const { sellerOrderReceivedEmail } = require('../utils/notificationTemplates');
        // Reuse "order received" template flavor — buyer-facing variant: tell buyer it's confirmed
        const mail = {
          subject: `Order Confirmed: ${po.po_number}`,
          html: require('../utils/notificationTemplates').wrapTemplate(
            'Purchase Order Confirmed',
            `<p style="color:#374151;font-size:16px;margin:0 0 16px;">Your purchase order <strong>${po.po_number}</strong> has been confirmed by the seller.</p>
             <p style="color:#6B7280;font-size:14px;margin:0 0 16px;line-height:1.6;">You will receive a shipping update once the order is dispatched.</p>
             <div style="text-align:center;margin:24px 0;"><a href="${FRONTEND_URL}/pos/purchase-orders/${po.id}" style="display:inline-block;background:#635BFF;color:#ffffff;padding:12px 32px;border-radius:6px;text-decoration:none;font-weight:600;font-size:15px;">View Order</a></div>`,
            'en'
          ),
          text: `Your purchase order ${po.po_number} has been confirmed.`
        };
        await fireBuyerNotification(po, 'seller_order_received', mail);
      } catch (e) {
        console.error('[seller-orders] confirm notification error:', e.message);
      }
    });

    res.json({ success: true, data: po, message: 'Order confirmed' });
  } catch (err) {
    if (err.code === 'NOT_FOUND') return res.status(404).json({ success: false, message: 'Order not found' });
    if (err.code === 'BAD_STATUS') return res.status(400).json({ success: false, message: err.message });
    console.error('POST /api/seller-orders/:id/confirm error:', err);
    res.status(500).json({ success: false, message: 'Failed to confirm order' });
  }
});

// ============================================
// 4. POST /api/seller-orders/:id/ship
// ============================================
router.post('/:id/ship', async (req, res) => {
  let po, newTracking;
  try {
    const id = parseInt(req.params.id, 10);
    if (!Number.isFinite(id)) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    // Sanitize tracking_info before transaction (no DB I/O)
    const raw = req.body?.tracking_info;
    let trackingPatch = {};
    if (raw && typeof raw === 'object' && !Array.isArray(raw)) {
      for (const [k, v] of Object.entries(raw)) {
        if (k === 'events') continue; // server-managed only
        if (typeof v === 'string') trackingPatch[k] = sanitizeString(v).slice(0, 500);
        else if (typeof v === 'number' || typeof v === 'boolean') trackingPatch[k] = v;
      }
    }

    const result = await sequelize.transaction(async (t) => {
      const locked = await PurchaseOrder.findByPk(id, { lock: t.LOCK.UPDATE, transaction: t });
      if (!locked) { const e = new Error('NOT_FOUND'); e.code = 'NOT_FOUND'; throw e; }
      if (!checkSellerOwnership(locked, req)) { const e = new Error('NOT_FOUND'); e.code = 'NOT_FOUND'; throw e; }
      if (locked.status !== 'confirmed') {
        const e = new Error(`Cannot ship order in status '${locked.status}'`);
        e.code = 'BAD_STATUS';
        throw e;
      }

      // Resolve carrier name + tracking_url from catalog (Sprint 5)
      const merged = await decorateCarrier({ ...(locked.tracking_info || {}), ...trackingPatch });
      const carrierNote = merged.carrier_name
        ? `Shipped via ${merged.carrier_name}${merged.tracking_number ? ' (' + merged.tracking_number + ')' : ''}`
        : 'Order shipped';
      const tracking = appendTrackingEvent({ tracking_info: merged }, 'shipped', carrierNote);

      await locked.update({
        status: 'shipped',
        shipped_at: new Date(),
        tracking_info: tracking
      }, { transaction: t });

      // Sprint 6: Decrement supplier stock + record inventory transaction — IN SAME TRANSACTION.
      // Only for seller_type='supplier'. Failure here rolls back the ship.
      if (locked.seller_type === 'supplier' && locked.seller_entity_id) {
        const items = await PurchaseOrderItem.findAll({ where: { purchase_order_id: locked.id }, transaction: t });
        for (const it of items) {
          let mapping = null;
          if (it.ingredient_seller_product_id) {
            mapping = await IngredientSellerProduct.findByPk(it.ingredient_seller_product_id, { transaction: t });
          }
          if (!mapping || !mapping.seller_product_id) continue;
          const sp = await SupplierProduct.findByPk(mapping.seller_product_id, { lock: t.LOCK.UPDATE, transaction: t });
          if (!sp) continue;
          const oldStock = parseFloat(sp.current_stock) || 0;
          const delta = -1 * (parseFloat(it.quantity_ordered) || 0);
          const newStockS = Math.round((oldStock + delta) * 100) / 100;
          await sp.update({ current_stock: newStockS }, { transaction: t });
          await SupplierInventoryTransaction.create({
            supplier_company_id: locked.seller_entity_id,
            supplier_product_id: sp.id,
            transaction_type: 'po_shipped',
            quantity_change: delta,
            unit: sp.unit || null,
            stock_after: newStockS,
            reference_type: 'purchase_order',
            reference_id: locked.id,
            unit_cost: parseFloat(it.unit_price) || null,
            notes: `Shipped on PO ${locked.po_number}`,
            created_by: req.user?.id || null
          }, { transaction: t });
        }
      }
      return { po: locked, newTracking: tracking };
    });
    po = result.po;
    newTracking = result.newTracking;
    emitPoEvent(req, po, 'seller-order-updated');

    setImmediate(async () => {
      try {
        const { wrapTemplate } = require('../utils/notificationTemplates');
        const ti = newTracking || {};
        const carrierLine = ti.carrier_name || ti.carrier;
        const carrier = carrierLine ? `<p style="color:#374151;font-size:14px;margin:0 0 8px;"><strong>Carrier:</strong> ${carrierLine}</p>` : '';
        const trackingNo = ti.tracking_number ? `<p style="color:#374151;font-size:14px;margin:0 0 8px;"><strong>Tracking #:</strong> ${ti.tracking_number}</p>` : '';
        const eta = (ti.estimated_arrival || ti.est_arrival) ? `<p style="color:#374151;font-size:14px;margin:0 0 8px;"><strong>Estimated Arrival:</strong> ${ti.estimated_arrival || ti.est_arrival}</p>` : '';
        const html = wrapTemplate(
          'Order Shipped',
          `<p style="color:#374151;font-size:16px;margin:0 0 16px;">Your purchase order <strong>${po.po_number}</strong> has been shipped.</p>
           ${carrier}${trackingNo}${eta}
           <div style="text-align:center;margin:24px 0;"><a href="${FRONTEND_URL}/pos/purchase-orders/${po.id}" style="display:inline-block;background:#635BFF;color:#ffffff;padding:12px 32px;border-radius:6px;text-decoration:none;font-weight:600;font-size:15px;">Track Order</a></div>`,
          'en'
        );
        const mail = {
          subject: `Order Shipped: ${po.po_number}`,
          html,
          text: `Your purchase order ${po.po_number} has been shipped.${ti.tracking_number ? ' Tracking: ' + ti.tracking_number : ''}`
        };
        await fireBuyerNotification(po, 'seller_order_received', mail);
      } catch (e) {
        console.error('[seller-orders] ship notification error:', e.message);
      }
    });

    res.json({ success: true, data: po, message: 'Order shipped' });
  } catch (err) {
    if (err.code === 'NOT_FOUND') return res.status(404).json({ success: false, message: 'Order not found' });
    if (err.code === 'BAD_STATUS') return res.status(400).json({ success: false, message: err.message });
    console.error('POST /api/seller-orders/:id/ship error:', err);
    res.status(500).json({ success: false, message: 'Failed to ship order' });
  }
});

// ============================================
// 5. POST /api/seller-orders/:id/reject
// ============================================
router.post('/:id/reject', async (req, res) => {
  let po;
  try {
    const id = parseInt(req.params.id, 10);
    if (!Number.isFinite(id)) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    const reason = sanitizeString(String(req.body?.reason || '').trim());
    if (!reason) {
      return res.status(400).json({ success: false, message: 'Reason is required' });
    }
    po = await sequelize.transaction(async (t) => {
      const locked = await PurchaseOrder.findByPk(id, { lock: t.LOCK.UPDATE, transaction: t });
      if (!locked) { const e = new Error('NOT_FOUND'); e.code = 'NOT_FOUND'; throw e; }
      if (!checkSellerOwnership(locked, req)) { const e = new Error('NOT_FOUND'); e.code = 'NOT_FOUND'; throw e; }
      if (locked.status !== 'submitted') {
        const e = new Error(`Cannot reject order in status '${locked.status}'`);
        e.code = 'BAD_STATUS';
        throw e;
      }
      const tracking = appendTrackingEvent(locked, 'cancelled', `Rejected by seller: ${reason.slice(0, 200)}`);
      await locked.update({
        status: 'cancelled',
        cancelled_at: new Date(),
        cancelled_reason: reason.slice(0, 1000),
        tracking_info: tracking
      }, { transaction: t });
      return locked;
    });
    emitPoEvent(req, po, 'seller-order-updated');

    setImmediate(async () => {
      try {
        const { wrapTemplate } = require('../utils/notificationTemplates');
        const html = wrapTemplate(
          'Purchase Order Rejected',
          `<p style="color:#374151;font-size:16px;margin:0 0 16px;">Your purchase order <strong>${po.po_number}</strong> has been rejected by the seller.</p>
           <div style="background:#FEF2F2;border-left:4px solid #DC2626;padding:16px;margin:0 0 24px;border-radius:0 8px 8px 0;">
             <p style="color:#991B1B;font-size:13px;font-weight:600;margin:0 0 6px;">Reason</p>
             <p style="color:#374151;font-size:14px;margin:0;">${reason.slice(0, 600)}</p>
           </div>
           <div style="text-align:center;margin:24px 0;"><a href="${FRONTEND_URL}/pos/purchase-orders/${po.id}" style="display:inline-block;background:#635BFF;color:#ffffff;padding:12px 32px;border-radius:6px;text-decoration:none;font-weight:600;font-size:15px;">View Order</a></div>`,
          'en'
        );
        const mail = {
          subject: `Order Rejected: ${po.po_number}`,
          html,
          text: `Your purchase order ${po.po_number} was rejected. Reason: ${reason}`
        };
        await fireBuyerNotification(po, 'seller_order_received', mail);
      } catch (e) {
        console.error('[seller-orders] reject notification error:', e.message);
      }
    });

    res.json({ success: true, data: po, message: 'Order rejected' });
  } catch (err) {
    if (err.code === 'NOT_FOUND') return res.status(404).json({ success: false, message: 'Order not found' });
    if (err.code === 'BAD_STATUS') return res.status(400).json({ success: false, message: err.message });
    console.error('POST /api/seller-orders/:id/reject error:', err);
    res.status(500).json({ success: false, message: 'Failed to reject order' });
  }
});

// ============================================
// Sprint 6 — POST /api/seller-orders/:id/deliver
// shipped → delivered (seller 능동 알림)
// ============================================
router.post('/:id/deliver', async (req, res) => {
  let po;
  try {
    const id = parseInt(req.params.id, 10);
    if (!Number.isFinite(id)) return res.status(404).json({ success: false, message: 'Order not found' });
    const note = sanitizeString(String(req.body?.note || '').trim()).slice(0, 500) || 'Order delivered to buyer';
    po = await sequelize.transaction(async (t) => {
      const locked = await PurchaseOrder.findByPk(id, { lock: t.LOCK.UPDATE, transaction: t });
      if (!locked) { const e = new Error('NOT_FOUND'); e.code = 'NOT_FOUND'; throw e; }
      if (!checkSellerOwnership(locked, req)) { const e = new Error('NOT_FOUND'); e.code = 'NOT_FOUND'; throw e; }
      if (locked.status !== 'shipped') {
        const e = new Error(`Cannot mark delivered in status '${locked.status}'`);
        e.code = 'BAD_STATUS';
        throw e;
      }
      const tracking = appendTrackingEvent(locked, 'delivered', note);
      await locked.update({ status: 'delivered', tracking_info: tracking }, { transaction: t });
      return locked;
    });
    emitPoEvent(req, po, 'seller-order-updated');

    setImmediate(async () => {
      try {
        const { wrapTemplate } = require('../utils/notificationTemplates');
        const html = wrapTemplate(
          'Order Delivered',
          `<p style="color:#374151;font-size:16px;margin:0 0 16px;">Your purchase order <strong>${po.po_number}</strong> has been delivered.</p>
           <p style="color:#6B7280;font-size:14px;margin:0 0 16px;">Please confirm receipt in your system.</p>
           <div style="text-align:center;margin:24px 0;"><a href="${FRONTEND_URL}/pos/purchase-orders/${po.id}" style="display:inline-block;background:#635BFF;color:#ffffff;padding:12px 32px;border-radius:6px;text-decoration:none;font-weight:600;font-size:15px;">Confirm Receipt</a></div>`,
          'en'
        );
        await fireBuyerNotification(po, 'seller_order_received', {
          subject: `Order Delivered: ${po.po_number}`,
          html,
          text: `Your purchase order ${po.po_number} has been delivered. Please confirm receipt.`
        });
      } catch (e) { console.error('[seller-orders] deliver notification error:', e.message); }
    });

    res.json({ success: true, data: po, message: 'Order marked delivered' });
  } catch (err) {
    if (err.code === 'NOT_FOUND') return res.status(404).json({ success: false, message: 'Order not found' });
    if (err.code === 'BAD_STATUS') return res.status(400).json({ success: false, message: err.message });
    console.error('POST /api/seller-orders/:id/deliver error:', err);
    res.status(500).json({ success: false, message: 'Failed to mark delivered' });
  }
});

// ============================================
// Sprint 6 — PUT /api/seller-orders/:id/tracking
// Update carrier/tracking after ship (status='shipped' or 'delivered')
// ============================================
router.put('/:id/tracking', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (!Number.isFinite(id)) return res.status(404).json({ success: false, message: 'Order not found' });
    const po = await PurchaseOrder.findByPk(id);
    if (!po) return res.status(404).json({ success: false, message: 'Order not found' });
    if (!checkSellerOwnership(po, req)) return res.status(404).json({ success: false, message: 'Order not found' });
    if (!['shipped', 'delivered'].includes(po.status)) {
      return res.status(400).json({ success: false, message: `Tracking can only be updated when status is shipped or delivered (current: ${po.status})` });
    }

    const raw = req.body?.tracking_info;
    if (!raw || typeof raw !== 'object') {
      return res.status(400).json({ success: false, message: 'tracking_info is required' });
    }

    let trackingPatch = { ...(po.tracking_info || {}) };
    for (const [k, v] of Object.entries(raw)) {
      if (k === 'events') continue; // server-managed
      if (typeof v === 'string') trackingPatch[k] = sanitizeString(v).slice(0, 500);
      else if (typeof v === 'number' || typeof v === 'boolean') trackingPatch[k] = v;
      else if (v == null) delete trackingPatch[k];
    }
    // Re-derive carrier_name + tracking_url from catalog if carrier_code changed
    trackingPatch = await decorateCarrier(trackingPatch);
    // Append a tracking_updated event to history
    const eventNote = trackingPatch.carrier_name
      ? `Tracking updated: ${trackingPatch.carrier_name}${trackingPatch.tracking_number ? ' (' + trackingPatch.tracking_number + ')' : ''}`
      : 'Tracking updated';
    const newTracking = appendTrackingEvent({ tracking_info: trackingPatch }, po.status, eventNote);

    await po.update({ tracking_info: newTracking });
    emitPoEvent(req, po, 'seller-order-updated');
    res.json({ success: true, data: po, message: 'Tracking updated' });
  } catch (err) {
    console.error('PUT /api/seller-orders/:id/tracking error:', err);
    res.status(500).json({ success: false, message: 'Failed to update tracking' });
  }
});

module.exports = router;

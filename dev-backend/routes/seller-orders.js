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
const { sendNotificationBatch, getRestaurantAdminAndOwnerIds, getBrandManagerIds, getFoodcourtManagerIds } = require('../utils/notificationService');
const { sequelize } = require('../config/database');

router.use(authenticateToken);
router.use(requireSellerRole);

// Attach the supplier's own sale-product identity (name + SKU) to each PO item so the
// seller sees THEIR product name/code, not just the buyer's internal item name. P0-3.
// (Design: docs/STOCK_ITEM_VS_SUPPLIER_PRODUCT_DESIGN.md.)
// 2026-08-27: 같은 조인이 구매자 상세·목록에도 필요해져 utils/sellerProductIdentity 로
// 단일화했다. 여기는 얇은 위임만 남긴다(호출부 4곳이 같은 이름을 보게).
const { attachSellerProductIdentity } = require('../utils/sellerProductIdentity');
async function attachSellerProductInfo(pos) {
  return attachSellerProductIdentity(pos);
}

// ============================================
// Helpers
// ============================================

const FRONTEND_URL = process.env.FRONTEND_URL || (process.env.NODE_ENV === 'production' ? 'https://purplehere.com' : 'https://dev.purplehere.com');

/**
 * 판매자에게 **보이면 안 되는** 발주 상태.
 *   draft            — 구매자의 장바구니. 아직 보내지도 않았다.
 *   pending_approval — 오너 승인 대기. "승인 전엔 판매자에게 나가지 않는다"가 이 기능의 계약이다.
 * (Fable 2026-07-13: 상태 필터가 아예 없어 둘 다 판매자 포털에 그대로 보이고 있었다.)
 */
const SELLER_HIDDEN = ['draft', 'pending_approval'];

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
      (await getRestaurantAdminAndOwnerIds(po.entity_id)).forEach(id => ids.add(id));
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
    // 숨김 상태는 쿼리로 요청해도 뚫리지 않는다 (필터를 덮어쓰던 자리)
    if (req.query.status && !SELLER_HIDDEN.includes(req.query.status)) {
      filterWhere.status = req.query.status;
    } else {
      filterWhere.status = { [Op.notIn]: SELLER_HIDDEN };
    }
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
    await attachSellerProductInfo(data);

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

    const [pending, confirmed, shipped, received, cancelled] = await Promise.all([
      PurchaseOrder.count({ where: { ...baseWhere, status: 'submitted' } }),
      PurchaseOrder.count({ where: { ...baseWhere, status: 'confirmed' } }),
      PurchaseOrder.count({ where: { ...baseWhere, status: 'shipped' } }),
      PurchaseOrder.count({ where: { ...baseWhere, status: { [Op.in]: ['received', 'partial_received', 'closed'] } } }),
      PurchaseOrder.count({ where: { ...baseWhere, status: 'cancelled' } })
    ]);

    // received_this_month: count POs received this month (KPI separate from counts)
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
        cancelled,
        // Tab counts (used by incoming-orders TabBadge — submitted/confirmed/shipped/received total/cancelled)
        counts: {
          submitted: pending,
          confirmed,
          shipped,
          received,
          cancelled
        }
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
    // 발신 전(draft)·승인 대기(pending_approval) 는 판매자에게 존재하지 않는 주문이다
    if (SELLER_HIDDEN.includes(po.status)) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    const obj = po.toJSON();
    obj.buyer = await resolveBuyerInfo(po);
    await attachSellerProductInfo(obj);
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
      // BG (브랜드 판매자) 출고 — BrandProduct 레시피(BOM)로 ProductIngredient 차감 (RA 주문차감 미러).
      // 같은 트랜잭션. 레시피 없으면 차감 없음(RA 동일). supplier 분기와 별개·격리.
      if (locked.seller_type === 'brand' && locked.seller_entity_id) {
        const { BrandProduct, ProductRecipeIngredient, ProductIngredient, InventoryTransaction } = require('../models');
        const bItems = await PurchaseOrderItem.findAll({ where: { purchase_order_id: locked.id }, transaction: t });
        for (const it of bItems) {
          if (!it.ingredient_seller_product_id) continue;
          const mapping = await IngredientSellerProduct.findByPk(it.ingredient_seller_product_id, { transaction: t });
          if (!mapping || !mapping.seller_product_id) continue;
          const bp = await BrandProduct.findByPk(mapping.seller_product_id, { transaction: t });
          if (!bp) continue;

          if (!bp.product_recipe_id) {
            // ── 레시피 없는 프로덕트는 **그 상품 자체가 재고 단위** ─────────────
            // 매장이 메뉴를 팔 때와 같은 규칙(2026-08-22 확정 모델). 그대로 파는 물건은
            // BOM 이 있을 수 없는데, 예전에는 여기서 그냥 건너뛰어 팔려도 재고가 안 줄었다.
            // 2026-09-01: `track_stock` 게이트 제거 — 항상 깎는다(매장 판매 차감과 같은 규칙).
            //   스위치가 꺼져 있으면 팔려도 조용히 안 깎였다.
            const soldQtyDirect = parseFloat(it.quantity_ordered) || 0;
            if (soldQtyDirect <= 0) continue;
            const curBp = parseFloat(bp.current_stock) || 0;
            const takeBp = Math.min(soldQtyDirect, curBp);      // 음수 재고 금지
            const shortBp = Math.round((soldQtyDirect - takeBp) * 100) / 100;
            const nextBp = Math.round((curBp - takeBp) * 100) / 100;
            // 0 에서 0 을 빼는 원장 줄은 남기지 않는다(재고 이력이 빈 줄로 덮이지 않게)
            if (takeBp > 0) {
              await bp.update({ current_stock: nextBp }, { transaction: t });
              await InventoryTransaction.create({
                entity_type: 'brand', entity_id: locked.seller_entity_id,
                brand_product_id: bp.id,
                transaction_type: 'order_deduct',
                quantity_change: -takeBp,
                unit: bp.stock_unit || bp.unit || 'ea',
                stock_after: nextBp,
                purchase_order_id: locked.id,
                notes: `Sold on PO ${locked.po_number} (${bp.name})`
                  + (shortBp > 0 ? ` [stock_shortfall ${shortBp}]` : ''),
                created_by: req.user?.id || null
              }, { transaction: t });
            }
            continue;
          }
          const recipeIngs = await ProductRecipeIngredient.findAll({ where: { recipe_id: bp.product_recipe_id }, transaction: t });
          const soldQty = parseFloat(it.quantity_ordered) || 0;
          for (const ri of recipeIngs) {
            const pIng = await ProductIngredient.findByPk(ri.ingredient_id, { lock: t.LOCK.UPDATE, transaction: t });
            if (!pIng) continue;
            const useQty = Math.round((parseFloat(ri.quantity) || 0) * soldQty * 100) / 100;
            if (useQty <= 0) continue;
            const cur = parseFloat(pIng.current_stock) || 0;
            const newStock = Math.round((cur - useQty) * 100) / 100; // 2026-09-01: 스위치 제거, 항상 추적
            await pIng.update({ current_stock: newStock }, { transaction: t });
            await InventoryTransaction.create({
              entity_type: 'brand', entity_id: locked.seller_entity_id,
              product_ingredient_id: pIng.id,
              transaction_type: 'order_deduct',
              quantity_change: -useQty,
              unit: pIng.unit, stock_after: newStock,
              purchase_order_id: locked.id,
              notes: `Sold on PO ${locked.po_number} (${bp.name})`,
              created_by: req.user?.id || null
            }, { transaction: t });
          }
        }
      }

      // FG (푸드코트 판매자) 출고 — FoodcourtProduct.current_stock 직접 차감.
      // FG 는 BOM 이 없다(상품 자체가 재고) — BG 처럼 레시피를 거치지 않는다.
      // ⚠ 예전엔 이 분기가 **아예 없어서** 출고해도 재고가 안 줄었다. 그런데 반품 승인은
      //   FoodcourtProduct 를 늘렸다 → 깎은 적 없는 재고를 환원 = **FG 재고 인플레이션**
      //   (반대 방향 비대칭 — Fable 2026-07-13 적발). 이제 ship(−q) ↔ 반품(+q) 이 대칭이다.
      if (locked.seller_type === 'foodcourt' && locked.seller_entity_id) {
        const { FoodcourtProduct, InventoryTransaction } = require('../models');
        const fItems = await PurchaseOrderItem.findAll({ where: { purchase_order_id: locked.id }, transaction: t });
        for (const it of fItems) {
          if (!it.ingredient_seller_product_id) continue;
          const mapping = await IngredientSellerProduct.findByPk(it.ingredient_seller_product_id, { transaction: t });
          if (!mapping || !mapping.seller_product_id) continue;
          const fp = await FoodcourtProduct.findByPk(mapping.seller_product_id, { lock: t.LOCK.UPDATE, transaction: t });
          if (!fp) continue;
          const qty = parseFloat(it.quantity_ordered) || 0;
          if (qty <= 0) continue;
          const old = parseFloat(fp.current_stock) || 0;
          const nu = Math.round((old - qty) * 100) / 100;   // 음수 허용 = supplier 분기와 동일(과판매 가시화)
          await fp.update({ current_stock: nu }, { transaction: t });
          await InventoryTransaction.create({
            entity_type: 'foodcourt', entity_id: locked.seller_entity_id,
            ingredient_id: it.ingredient_id,        // 반품 FG 분기와 동일 관례
            transaction_type: 'order_deduct',
            quantity_change: -qty,
            unit: fp.unit || it.unit || 'unit',     // InventoryTransaction.unit 은 NOT NULL
            stock_after: nu,
            purchase_order_id: locked.id,
            notes: `Sold on PO ${locked.po_number} (${fp.name})`,
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

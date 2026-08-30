/**
 * 발주 오너 승인 라우터 (2026-06-21, with MIN Cafe 발주관리 추가요청 #2)
 *
 * 레스토랑 발주(pending_approval)를 연결된 Owner 가 승인/반려한다.
 * 별도 라우터인 이유: purchase-orders-{crud,workflow}.js 는 router.use(requireBuyerRole) 로
 * 일괄 가드되어 멀티매장 오너(restaurant_id 미할당)가 403 으로 막힌다. 여기서는 오너 scope를
 * RestaurantManager(ownership) join 으로 직접 해석한다. server.js 에서 purchaseOrdersRouter
 * "앞"에 마운트해야 /purchase-orders/:id/approve 등이 requireBuyerRole 을 건너뛴다.
 *
 * Endpoints (authenticateToken + 오너 scope):
 *   GET  /purchase-orders/pending-approval        — 오너 승인 대기 큐
 *   POST /purchase-orders/:id/approve             — 승인 → submitted (판매자 통지)
 *   POST /purchase-orders/:id/reject              — 반려 → draft (사유)
 */
const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const database = require('../config/database');
const { PurchaseOrder, PurchaseOrderItem, Restaurant } = require('../models');
const { authenticateToken } = require('../middleware/auth');
const { sanitizeString } = require('../middleware/validation');
const { appendTrackingEvent, emitPoEvent } = require('../services/poRealtimeService');
const { resolveOwnerRestaurantIds } = require('../utils/poOwnerApproval');
const { resolveSellers, getSellerName } = require('../utils/sellerNames');
const {
  fireSellerSubmittedNotification,
  fireBuyerConfirmNotification,
  fireOwnerApprovalResultNotification
} = require('../services/poNotifications');

/**
 * 오너 scope 미들웨어 — 이 유저가 ownership 으로 소유한 restaurant_id 집합을 req.ownerRestaurantIds 에.
 * 소유 매장이 없으면 403. (System Admin 은 전체 허용)
 */
async function requireOwnerScope(req, res, next) {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ success: false, message: 'Not authenticated' });
    if (user.role === 'System Admin') {
      req.ownerIsAdmin = true;
      req.ownerRestaurantIds = null; // null = 전체
      return next();
    }
    const ids = await resolveOwnerRestaurantIds(user);
    if (!ids.length) {
      return res.status(403).json({ success: false, message: 'Owner role with a connected restaurant required' });
    }
    req.ownerIsAdmin = false;
    req.ownerRestaurantIds = ids;
    next();
  } catch (e) {
    console.error('[po-approval] requireOwnerScope error:', e.message);
    res.status(500).json({ success: false, message: 'Failed to resolve owner scope' });
  }
}

/** PO 가 이 오너의 소유 레스토랑 발주인지 검증. */
function ownsPO(po, req) {
  if (po.entity_type !== 'restaurant') return false;
  if (req.ownerIsAdmin) return true;
  return Array.isArray(req.ownerRestaurantIds) && req.ownerRestaurantIds.includes(parseInt(po.entity_id, 10));
}

// per-route 가드만 적용 — 블랭킷 router.use 금지(레스토랑 Admin 의 발주 생성/조회까지 403 으로
// 막아버린다). 매칭 안 되는 /purchase-orders/* 는 이 라우터를 통과해 purchaseOrdersRouter 로 폴스루.

// ============================================
// GET /purchase-orders/pending-approval — 오너 승인 대기 큐
// ============================================
router.get('/purchase-orders/pending-approval', authenticateToken, requireOwnerScope, async (req, res) => {
  try {
    const where = { entity_type: 'restaurant', status: 'pending_approval' };
    if (!req.ownerIsAdmin) where.entity_id = { [Op.in]: req.ownerRestaurantIds };

    const rows = await PurchaseOrder.findAll({
      where,
      include: [{ model: PurchaseOrderItem, as: 'items' }],
      order: [['created_at', 'DESC']]
    });

    // 레스토랑 이름 매핑
    const rids = [...new Set(rows.map(p => p.entity_id))];
    const restaurants = rids.length
      ? await Restaurant.findAll({ where: { id: { [Op.in]: rids } }, attributes: ['id', 'name'] })
      : [];
    const nameMap = {};
    restaurants.forEach(r => { nameMap[r.id] = r.name; });

    // Seller 이름 (supplier/brand/foodcourt/system_admin) — 목록·상세·제안과 동일 해석기
    const sellerMap = await resolveSellers(rows);

    const data = rows.map(p => {
      const o = p.toJSON();
      o.restaurant_name = nameMap[p.entity_id] || null;
      o.seller_name = getSellerName(sellerMap, p.seller_type, p.seller_entity_id);
      return o;
    });
    res.json({ success: true, data });
  } catch (err) {
    console.error('GET /api/purchase-orders/pending-approval error:', err);
    res.status(500).json({ success: false, message: 'Failed to load pending approvals' });
  }
});

// ============================================
// POST /purchase-orders/:id/approve — 승인 → submitted
// ============================================
router.post('/purchase-orders/:id/approve', authenticateToken, requireOwnerScope, async (req, res) => {
  let po;
  try {
    const id = parseInt(req.params.id, 10);
    if (!Number.isFinite(id)) return res.status(404).json({ success: false, message: 'Purchase order not found' });

    po = await database.sequelize.transaction(async (t) => {
      const locked = await PurchaseOrder.findByPk(id, {
        lock: t.LOCK.UPDATE,
        include: [{ model: PurchaseOrderItem, as: 'items' }],
        transaction: t
      });
      if (!locked) { const e = new Error('NOT_FOUND'); e.code = 'NOT_FOUND'; throw e; }
      if (!ownsPO(locked, req)) { const e = new Error('NOT_FOUND'); e.code = 'NOT_FOUND'; throw e; }
      if (locked.status !== 'pending_approval') {
        const e = new Error('Only orders awaiting approval can be approved');
        e.code = 'BAD_STATUS'; throw e;
      }
      const now = new Date();
      const tracking = appendTrackingEvent(locked, 'submitted', 'Approved by Owner');
      await locked.update({
        status: 'submitted',
        submitted_at: now,
        approved_by_user_id: req.user.id,
        approved_at: now,
        tracking_info: tracking
      }, { transaction: t });
      return locked;
    });

    emitPoEvent(req, po, 'seller-order-created');
    // 승인 후 판매자 통지 + 작성자 결과 통지
    setImmediate(() => fireSellerSubmittedNotification(po));
    setImmediate(() => fireBuyerConfirmNotification(po));
    setImmediate(() => fireOwnerApprovalResultNotification(po, { approved: true }));

    res.json({ success: true, data: po });
  } catch (err) {
    if (err.code === 'NOT_FOUND') return res.status(404).json({ success: false, message: 'Purchase order not found' });
    if (err.code === 'BAD_STATUS') return res.status(400).json({ success: false, message: err.message });
    console.error('POST /api/purchase-orders/:id/approve error:', err);
    res.status(500).json({ success: false, message: 'Failed to approve purchase order' });
  }
});

// ============================================
// POST /purchase-orders/:id/reject — 반려 → draft
// ============================================
router.post('/purchase-orders/:id/reject', authenticateToken, requireOwnerScope, async (req, res) => {
  let po;
  try {
    const id = parseInt(req.params.id, 10);
    if (!Number.isFinite(id)) return res.status(404).json({ success: false, message: 'Purchase order not found' });

    const reason = sanitizeString(req.body && req.body.reason ? String(req.body.reason) : '').trim();
    if (!reason) {
      return res.status(400).json({ success: false, message: 'Rejection reason is required' });
    }

    po = await database.sequelize.transaction(async (t) => {
      const locked = await PurchaseOrder.findByPk(id, {
        lock: t.LOCK.UPDATE,
        include: [{ model: PurchaseOrderItem, as: 'items' }],
        transaction: t
      });
      if (!locked) { const e = new Error('NOT_FOUND'); e.code = 'NOT_FOUND'; throw e; }
      if (!ownsPO(locked, req)) { const e = new Error('NOT_FOUND'); e.code = 'NOT_FOUND'; throw e; }
      if (locked.status !== 'pending_approval') {
        const e = new Error('Only orders awaiting approval can be rejected');
        e.code = 'BAD_STATUS'; throw e;
      }
      const now = new Date();
      const tracking = appendTrackingEvent(locked, 'draft', `Rejected by Owner: ${reason}`.slice(0, 240));
      await locked.update({
        status: 'draft',
        rejected_by_user_id: req.user.id,
        rejected_at: now,
        rejected_reason: reason.slice(0, 1000),
        tracking_info: tracking
      }, { transaction: t });
      return locked;
    });

    emitPoEvent(req, po, 'seller-order-updated');
    setImmediate(() => fireOwnerApprovalResultNotification(po, { approved: false, reason }));

    res.json({ success: true, data: po });
  } catch (err) {
    if (err.code === 'NOT_FOUND') return res.status(404).json({ success: false, message: 'Purchase order not found' });
    if (err.code === 'BAD_STATUS') return res.status(400).json({ success: false, message: err.message });
    console.error('POST /api/purchase-orders/:id/reject error:', err);
    res.status(500).json({ success: false, message: 'Failed to reject purchase order' });
  }
});

module.exports = router;

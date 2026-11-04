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
 *   POST /purchase-orders/:id/revoke-approval     — 승인취소 → pending_approval (2026-10-22 Fable 설계)
 *   GET/POST/DELETE /purchase-orders/approval-exemptions… — 오너 승인 예외 규칙 (2026-11-01 Fable 설계 §G-7-4 ②)
 */
const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const database = require('../config/database');
const { PurchaseOrder, PurchaseOrderItem, PurchaseOrderSchedule, Restaurant } = require('../models');
const { authenticateToken, checkRestaurantAccess } = require('../middleware/auth');
const { sanitizeString } = require('../middleware/validation');
const { appendTrackingEvent, emitPoEvent } = require('../services/poRealtimeService');
const { resolveOwnerRestaurantIds, canRevokeApproval, isApprovalRequiredForRestaurant, restaurantHasOwner } = require('../utils/poOwnerApproval');
const { resolveSellers, getSeller, getSellerName, isExternalSeller } = require('../utils/sellerNames');
const {
  fireSellerSubmittedNotification,
  fireBuyerConfirmNotification,
  fireOwnerApprovalResultNotification,
  fireSellerApprovalRevokedNotification
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
// 오너 승인 예외 규칙 (2026-11-01 Fable 설계 docs/PURCHASE_ORDER_SYSTEM.md §G-7-4 ②)
//   읽기 = 그 매장에 접근 가능한 사람(RA·직원·오너·SA) · 쓰기 = 그 매장 ownership 오너·System Admin 만.
//   승인은 오너의 권한이고 예외는 그 권한을 넘기는 행위라 넘기는 사람이 정한다.
//   ⚠ /purchase-orders/:id/… 라우트보다 앞에 둔다(이 파일·purchaseOrdersRouter 둘 다).
// ============================================
const { PoApprovalExemption } = require('../models');
const exemptionsUtil = require('../utils/poApprovalExemptions');
const { logActivity } = require('../utils/activityLogger');

function parseRid(v) {
  const n = parseInt(v, 10);
  return Number.isFinite(n) && n > 0 ? n : null;
}
function ownsRestaurantId(req, rid) {
  if (req.ownerIsAdmin) return true;
  return Array.isArray(req.ownerRestaurantIds) && req.ownerRestaurantIds.includes(rid);
}

// GET /purchase-orders/approval-exemptions?restaurant_id=N — 규칙 목록(표시 이름 포함)
router.get('/purchase-orders/approval-exemptions', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const rid = parseRid(req.query.restaurant_id);
    if (!rid) return res.status(400).json({ success: false, message: 'restaurant_id is required' });
    const rows = await PoApprovalExemption.findAll({ where: { restaurant_id: rid }, order: [['created_at', 'DESC']] });
    const data = await exemptionsUtil.describeRules(rows);
    const owned = req.user.role === 'System Admin' ? true : (await resolveOwnerRestaurantIds(req.user)).includes(rid);
    // 마스터(레스토랑별 «오너 승인») 상태 — 규칙은 마스터가 ON 일 때만 뜻이 있다(§G-7-1). 판정 함수와 같은 조건.
    const restaurant = await Restaurant.findByPk(rid, { attributes: ['id', 'operation_settings'] });
    const master_on = !!restaurant && (await isApprovalRequiredForRestaurant(restaurant));
    const has_owner = await restaurantHasOwner(rid);
    res.json({ success: true, data, can_edit: owned, master_on, has_owner });
  } catch (e) {
    console.error('[po-approval] GET exemptions error:', e.message);
    res.status(500).json({ success: false, message: 'Failed to load approval exemptions' });
  }
});

// GET /purchase-orders/approval-exemptions/candidates?restaurant_id=N&scope=…&q= — 고를 후보
router.get('/purchase-orders/approval-exemptions/candidates', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const rid = parseRid(req.query.restaurant_id);
    const scope = String(req.query.scope || '');
    if (!rid) return res.status(400).json({ success: false, message: 'restaurant_id is required' });
    if (!exemptionsUtil.SCOPES.includes(scope)) return res.status(400).json({ success: false, message: 'Invalid scope' });
    const data = await exemptionsUtil.listCandidates(rid, scope, req.query.q);
    res.json({ success: true, data });
  } catch (e) {
    console.error('[po-approval] GET exemption candidates error:', e.message);
    res.status(500).json({ success: false, message: 'Failed to load candidates' });
  }
});

// POST /purchase-orders/approval-exemptions — 규칙 추가(멱등: 같은 규칙이면 그 행)
router.post('/purchase-orders/approval-exemptions', authenticateToken, requireOwnerScope, async (req, res) => {
  try {
    const body = req.body || {};
    const rid = parseRid(body.restaurant_id);
    const scope = String(body.scope || '');
    if (!rid) return res.status(400).json({ success: false, message: 'restaurant_id is required' });
    if (!ownsRestaurantId(req, rid)) return res.status(403).json({ success: false, message: 'Only the Owner of this restaurant can change approval rules' });
    if (!exemptionsUtil.SCOPES.includes(scope)) return res.status(400).json({ success: false, message: 'Invalid scope' });
    const sellerType = scope === 'seller' ? String(body.seller_type || '') : 'none';
    if (scope === 'seller' && !exemptionsUtil.SELLER_TYPES.includes(sellerType)) {
      return res.status(400).json({ success: false, message: 'Invalid seller_type' });
    }
    const targetId = scope === 'seller' && sellerType === 'system_admin' ? 0 : parseInt(body.target_id, 10);
    if (!Number.isFinite(targetId) || targetId < 0 || (targetId === 0 && sellerType !== 'system_admin')) {
      return res.status(400).json({ success: false, message: 'target_id is required' });
    }
    const cand = await exemptionsUtil.findCandidate(rid, scope, sellerType, targetId);
    if (!cand) return res.status(400).json({ success: false, code: 'TARGET_NOT_AVAILABLE', message: 'This item is not available for this restaurant' });
    const note = body.note != null ? (sanitizeString(String(body.note)) || '').slice(0, 255) || null : null;

    const where = { restaurant_id: rid, scope, seller_type: sellerType, target_id: targetId };
    const existing = await PoApprovalExemption.findOne({ where });
    if (existing) {
      const [described] = await exemptionsUtil.describeRules([existing]);
      return res.json({ success: true, data: described, existed: true });
    }
    let row;
    try {
      row = await PoApprovalExemption.create({ ...where, note, created_by_user_id: req.user.id });
    } catch (err) {
      if (err && err.name === 'SequelizeUniqueConstraintError') {
        row = await PoApprovalExemption.findOne({ where });
        const [described] = await exemptionsUtil.describeRules([row]);
        return res.json({ success: true, data: described, existed: true });
      }
      throw err;
    }
    await logActivity(req, {
      restaurant_id: rid, action_type: 'create', entity_type: 'po_approval_exemption', entity_id: row.id,
      entity_name: cand.name, changes: { scope, seller_type: sellerType, target_id: targetId, note },
      description: `Owner approval exemption added: ${scope} «${cand.name}»`
    });
    const [described] = await exemptionsUtil.describeRules([row]);
    res.status(201).json({ success: true, data: described });
  } catch (e) {
    console.error('[po-approval] POST exemption error:', e.message);
    res.status(500).json({ success: false, message: 'Failed to save approval exemption' });
  }
});

// DELETE /purchase-orders/approval-exemptions/:exemptionId — 규칙 삭제(다음 제출부터 승인 대상 · 소급 없음)
router.delete('/purchase-orders/approval-exemptions/:exemptionId', authenticateToken, requireOwnerScope, async (req, res) => {
  try {
    const row = await PoApprovalExemption.findByPk(parseInt(req.params.exemptionId, 10) || 0);
    if (!row) return res.status(404).json({ success: false, message: 'Rule not found' });
    if (!ownsRestaurantId(req, Number(row.restaurant_id))) return res.status(403).json({ success: false, message: 'Only the Owner of this restaurant can change approval rules' });
    const [described] = await exemptionsUtil.describeRules([row]);
    await row.destroy();
    await logActivity(req, {
      restaurant_id: Number(row.restaurant_id), action_type: 'delete', entity_type: 'po_approval_exemption', entity_id: row.id,
      entity_name: described.display_name || null, changes: { scope: row.scope, seller_type: row.seller_type, target_id: row.target_id },
      description: `Owner approval exemption removed: ${row.scope} «${described.display_name || row.target_id}»`
    });
    res.json({ success: true, data: { id: row.id } });
  } catch (e) {
    console.error('[po-approval] DELETE exemption error:', e.message);
    res.status(500).json({ success: false, message: 'Failed to remove approval exemption' });
  }
});

// PUT /purchase-orders/approval-master {restaurant_id, on} — 발주 오너 승인 스위치(operation_settings.requirePoOwnerApproval)
//   2026-11-01 Irene «권고대로» · Fable §G-7-8 A안: 오너 연결 매장의 스위치는 그 매장 오너·SA 만 바꾼다.
//   operation_settings 의 이 키 하나만 고친다(나머지 설정 무접촉 — 행을 잠그고 읽은 값에 덮어쓴다).
router.put('/purchase-orders/approval-master', authenticateToken, requireOwnerScope, async (req, res) => {
  const t = await database.sequelize.transaction();
  try {
    const rid = parseRid(req.body?.restaurant_id);
    if (!rid) { await t.rollback(); return res.status(400).json({ success: false, message: 'restaurant_id is required' }); }
    if (!ownsRestaurantId(req, rid)) { await t.rollback(); return res.status(403).json({ success: false, message: 'Only the Owner of this restaurant can change this' }); }
    if (typeof req.body?.on !== 'boolean') { await t.rollback(); return res.status(400).json({ success: false, message: 'on must be true or false' }); }
    const restaurant = await Restaurant.findByPk(rid, { attributes: ['id', 'operation_settings'], transaction: t, lock: t.LOCK.UPDATE });
    if (!restaurant) { await t.rollback(); return res.status(404).json({ success: false, message: 'Restaurant not found' }); }
    let os = restaurant.getDataValue('operation_settings');
    if (typeof os === 'string') { try { os = JSON.parse(os); } catch (_) { os = {}; } }
    os = os && typeof os === 'object' ? { ...os } : {};
    const before = os.requirePoOwnerApproval;
    os.requirePoOwnerApproval = req.body.on;
    restaurant.operation_settings = os;
    restaurant.changed('operation_settings', true);
    await restaurant.save({ transaction: t });
    await t.commit();
    await logActivity(req, {
      restaurant_id: rid, action_type: 'update', entity_type: 'restaurant_settings', entity_id: rid,
      entity_name: 'requirePoOwnerApproval', changes: { requirePoOwnerApproval: { from: before === undefined ? null : before, to: req.body.on } },
      description: `Owner approval for purchase orders turned ${req.body.on ? 'on' : 'off'}`
    });
    res.json({ success: true, data: { restaurant_id: rid, on: req.body.on } });
  } catch (e) {
    try { await t.rollback(); } catch (_) {}
    console.error('[po-approval] PUT approval-master error:', e.message);
    res.status(500).json({ success: false, message: 'Failed to update Owner approval setting' });
  }
});

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
      // 외부(앱 미사용) 공급업체 여부 — 승인 문구·보내기 버튼을 가른다. 목록·상세와 같은 해석기(2026-10-04 §5).
      o.is_external = isExternalSeller(sellerMap, p.seller_type, p.seller_entity_id);
      // 발주 마감 (2026-10-27 Fable M-4 ④) — 오너가 늦게 승인하면 마감을 넘긴다. 같은 해석기 값 그대로
      o.seller_order_windows = (getSeller(sellerMap, p.seller_type, p.seller_entity_id) || {}).order_windows || null;
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
  let scheduleForDispatch = null;
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
      // 오너가 본 발주와 지금 발주가 같은가 (2026-11-04) — 오너가 화면을 연 뒤 매장이 품목을 고쳤으면
      //   그 바뀐 발주를 오너가 못 본 채 승인하지 않게 막는다. 화면이 본 updated_at 을 보낸다(안 보내면 예전처럼 승인).
      const expected = req.body && req.body.expected_updated_at;
      if (expected) {
        const seen = new Date(expected).getTime();
        const now0 = new Date(locked.updated_at).getTime();
        if (!Number.isFinite(seen) || seen !== now0) {
          const e = new Error('This order was changed after you opened it — review the latest version before approving');
          e.code = 'PO_CHANGED'; throw e;
        }
      }
      const now = new Date();
      const tracking = appendTrackingEvent(locked, 'submitted', 'Approved by Owner', null, { owner_signed: true });
      await locked.update({
        status: 'submitted',
        submitted_at: now,
        // 예상 배송일 — 승인 순간이 판매자에게 가는 순간(2026-10-27 Fable M-3 ④). 비어 있을 때만.
        ...(await require('../utils/orderSchedule').expectedDeliveryPatch(locked, now)),
        approved_by_user_id: req.user.id,
        approved_at: now,
        tracking_info: tracking
      }, { transaction: t });
      // 정기 발주에서 나온 발주 — 오너가 본 이 총액이 새 기준선(«다시 1번 승인» · 2026-10-22 recurring-po §3-5).
      // 틀이 아직 오너 승인을 거친 적이 없으면(오너가 나중에 연결된 매장) 이 승인으로 틀도 승인된다(§4-2 ①).
      if (locked.schedule_id) {
        const sched = await PurchaseOrderSchedule.findByPk(locked.schedule_id, { lock: t.LOCK.UPDATE, transaction: t });
        if (sched) {
          await sched.update({
            approved_total: locked.total_amount,
            ...(sched.approved_at ? {} : { approved_by_user_id: req.user.id, approved_at: now })
          }, { transaction: t });
          scheduleForDispatch = sched;
        }
      }
      return locked;
    });

    emitPoEvent(req, po, 'seller-order-created');
    // 승인 후 판매자 통지 + 작성자 결과 통지
    setImmediate(() => fireSellerSubmittedNotification(po));
    if (scheduleForDispatch) {
      // 정기 발주 — 작성자 쪽엔 «정기 발주 나감/기록됨» 한 통(외부 구독 업체에 «보내 주세요» 를 쓰지 않는다 · Irene 10-22)
      const { notePlaced } = require('../services/poScheduleService');
      await notePlaced(scheduleForDispatch, po);
    } else {
      setImmediate(() => fireBuyerConfirmNotification(po));
      setImmediate(() => fireOwnerApprovalResultNotification(po, { approved: true }));
    }

    res.json({ success: true, data: po });
  } catch (err) {
    if (err.code === 'NOT_FOUND') return res.status(404).json({ success: false, message: 'Purchase order not found' });
    if (err.code === 'BAD_STATUS') return res.status(400).json({ success: false, message: err.message });
    if (err.code === 'PO_CHANGED') return res.status(409).json({ success: false, code: 'PO_CHANGED', message: err.message });
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
      // 정기 발주에서 나온 발주를 반려 → 틀 일시정지(매주 같은 반려가 반복되지 않게 · recurring-po §4-4)
      if (locked.schedule_id) {
        await PurchaseOrderSchedule.update(
          { status: 'paused', paused_reason: `Owner rejected PO ${locked.po_number}: ${reason}`.slice(0, 255) },
          { where: { id: locked.schedule_id, status: { [Op.in]: ['active', 'pending_approval'] } }, transaction: t });
      }
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

// ============================================
// POST /purchase-orders/:id/revoke-approval — 승인취소 → pending_approval
// 발주를 죽이지 않고 «승인 전» 으로 되돌린다(취소는 기존 cancel). 판정은 canRevokeApproval 하나 —
// 외부 = 받기 전 전부 · 가입 = 판매자 확인 전 · 결제·수령된 발주 불가. 재고·돈 이동 0.
// 되돌린 발주는 기존 approve/reject 로 그대로 이어진다. (2026-10-22 Fable 설계 owner-po-approval-revoke)
// ============================================
const REVOKE_MESSAGES = {
  NOT_APPROVED: 'This order did not go through owner approval',
  PAID: 'Already paid — reverse the payment first',
  RECEIVED: 'Goods already received — use the returns flow',
  SELLER_CONFIRMED: 'The supplier has already confirmed this order',
  BAD_STATUS: 'Approval cannot be revoked in this status'
};

router.post('/purchase-orders/:id/revoke-approval', authenticateToken, requireOwnerScope, async (req, res) => {
  let po;
  let isExternal = false;
  try {
    const id = parseInt(req.params.id, 10);
    if (!Number.isFinite(id)) return res.status(404).json({ success: false, message: 'Purchase order not found' });

    const reason = sanitizeString(req.body && req.body.reason ? String(req.body.reason) : '').trim().slice(0, 1000);

    po = await database.sequelize.transaction(async (t) => {
      const locked = await PurchaseOrder.findByPk(id, {
        lock: t.LOCK.UPDATE,
        include: [{ model: PurchaseOrderItem, as: 'items' }],
        transaction: t
      });
      if (!locked) { const e = new Error('NOT_FOUND'); e.code = 'NOT_FOUND'; throw e; }
      if (!ownsPO(locked, req)) { const e = new Error('NOT_FOUND'); e.code = 'NOT_FOUND'; throw e; }

      const sellerMap = await resolveSellers([locked]);
      isExternal = isExternalSeller(sellerMap, locked.seller_type, locked.seller_entity_id);
      const verdict = canRevokeApproval(locked, isExternal);
      if (!verdict.ok) {
        const e = new Error(REVOKE_MESSAGES[verdict.code] || REVOKE_MESSAGES.BAD_STATUS);
        e.code = 'NOT_REVOKABLE'; e.reasonCode = verdict.code; throw e;
      }

      const tracking = appendTrackingEvent(locked, 'pending_approval',
        `Approval revoked by Owner${reason ? ': ' + reason.slice(0, 200) : ''}`, null,
        {
          approval_revoked: true,
          status_before: locked.status,
          approved_at_before: locked.approved_at,
          approved_by_before: locked.approved_by_user_id,
          by_user_id: req.user.id
        });
      await locked.update({
        status: 'pending_approval',
        approval_required: true,
        approved_at: null,
        approved_by_user_id: null,
        tracking_info: tracking
      }, { transaction: t });
      return locked;
    });

    emitPoEvent(req, po, 'seller-order-updated');
    if (!isExternal) setImmediate(() => fireSellerApprovalRevokedNotification(po));
    setImmediate(() => fireOwnerApprovalResultNotification(po, { approved: false, revoked: true, reason }));

    res.json({ success: true, data: po });
  } catch (err) {
    if (err.code === 'NOT_FOUND') return res.status(404).json({ success: false, message: 'Purchase order not found' });
    if (err.code === 'NOT_REVOKABLE') return res.status(400).json({ success: false, code: err.reasonCode, message: err.message });
    console.error('POST /api/purchase-orders/:id/revoke-approval error:', err);
    res.status(500).json({ success: false, message: 'Failed to revoke approval' });
  }
});

// ============================================
// 정기 발주(Standing order) — 오너 (2026-10-22 Fable 설계 recurring-po §3-5 · §4-1)
//   GET  /purchase-orders/schedules/pending-approval   승인 대기 틀 + 지금 가격 미리보기
//   GET  /purchase-orders/schedules/owned              소유 매장의 모든 틀
//   POST /purchase-orders/schedules/:id/approve        승인 → active (기준선 = 지금 총액)
//   POST /purchase-orders/schedules/:id/reject         반려(사유 필수) → paused
//   POST /purchase-orders/schedules/:id/owner-pause    일시정지 · /owner-end 종료
//   (구매자 쪽 pause/end 와 경로를 나눈 이유: 이 라우터가 앞에 마운트돼 같은 경로면 매장 관리자가 오너 가드 403 에 막힌다)
// ============================================
function ownsSchedule(s, req) {
  if (!s || s.entity_type !== 'restaurant') return false;
  if (req.ownerIsAdmin) return true;
  return Array.isArray(req.ownerRestaurantIds) && req.ownerRestaurantIds.includes(parseInt(s.entity_id, 10));
}

async function ownerSchedulesWhere(req, extra = {}) {
  const where = { entity_type: 'restaurant', ...extra };
  if (!req.ownerIsAdmin) where.entity_id = { [Op.in]: req.ownerRestaurantIds };
  return where;
}

async function withRestaurantNames(list) {
  const rids = [...new Set(list.map(s => s.entity_id))];
  const rs = rids.length ? await Restaurant.findAll({ where: { id: { [Op.in]: rids } }, attributes: ['id', 'name'] }) : [];
  const m = new Map(rs.map(r => [r.id, r.name]));
  return list.map(s => ({ ...s, restaurant_name: m.get(s.entity_id) || null }));
}

router.get('/purchase-orders/schedules/pending-approval', authenticateToken, requireOwnerScope, async (req, res) => {
  try {
    const { decorateSchedules } = require('./purchase-orders-recurring');
    const { previewSchedule } = require('../services/poScheduleService');
    const rows = await PurchaseOrderSchedule.findAll({ where: await ownerSchedulesWhere(req, { status: 'pending_approval' }), order: [['created_at', 'DESC']] });
    const list = await withRestaurantNames(await decorateSchedules(rows));
    for (const s of list) {
      const p = await previewSchedule(s);
      s.preview = p.ok ? { total: p.total, subtotal: p.subtotal, delivery_fee: p.delivery_fee, currency: p.currency, lines: p.lines } : null;
      s.preview_error = p.ok ? null : p.error.message;
    }
    res.json({ success: true, data: list });
  } catch (err) {
    console.error('GET /purchase-orders/schedules/pending-approval error:', err);
    res.status(500).json({ success: false, message: 'Failed to load standing orders' });
  }
});

router.get('/purchase-orders/schedules/owned', authenticateToken, requireOwnerScope, async (req, res) => {
  try {
    const { decorateSchedules } = require('./purchase-orders-recurring');
    const rows = await PurchaseOrderSchedule.findAll({ where: await ownerSchedulesWhere(req), order: [['created_at', 'DESC']] });
    res.json({ success: true, data: await withRestaurantNames(await decorateSchedules(rows)) });
  } catch (err) {
    console.error('GET /purchase-orders/schedules/owned error:', err);
    res.status(500).json({ success: false, message: 'Failed to load standing orders' });
  }
});

async function loadOwnerSchedule(req, res) {
  const id = parseInt(req.params.id, 10);
  const s = Number.isFinite(id) ? await PurchaseOrderSchedule.findByPk(id) : null;
  if (!ownsSchedule(s, req)) { res.status(404).json({ success: false, message: 'Standing order not found' }); return null; }
  return s;
}

router.post('/purchase-orders/schedules/:id/approve', authenticateToken, requireOwnerScope, async (req, res) => {
  try {
    const s = await loadOwnerSchedule(req, res); if (!s) return;
    if (s.status !== 'pending_approval') return res.status(400).json({ success: false, message: 'Only standing orders awaiting approval can be approved' });
    const { previewSchedule, computeFirstRunDate } = require('../services/poScheduleService');
    // 오너가 승인하는 금액 = 지금 가격 총액(화면 미리보기와 같은 계산)
    const p = await previewSchedule(s);
    if (!p.ok) return res.status(400).json({ success: false, code: p.error.code, message: `This standing order cannot be placed now: ${p.error.message}` });
    await s.update({
      status: 'active',
      approved_by_user_id: req.user.id,
      approved_at: new Date(),
      approved_total: p.total,
      rejected_by_user_id: null, rejected_at: null, rejected_reason: null,
      paused_reason: null,
      next_run_date: await computeFirstRunDate(s)
    });
    const { fireScheduleApprovalResultNotification } = require('../services/poScheduleNotifications');
    setImmediate(() => fireScheduleApprovalResultNotification(s, { approved: true }));
    const [out] = await require('./purchase-orders-recurring').decorateSchedules([s]);
    res.json({ success: true, data: out });
  } catch (err) {
    console.error('POST /purchase-orders/schedules/:id/approve error:', err);
    res.status(500).json({ success: false, message: 'Failed to approve standing order' });
  }
});

router.post('/purchase-orders/schedules/:id/reject', authenticateToken, requireOwnerScope, async (req, res) => {
  try {
    const reason = sanitizeString(req.body && req.body.reason ? String(req.body.reason) : '').trim();
    if (!reason) return res.status(400).json({ success: false, message: 'Rejection reason is required' });
    const s = await loadOwnerSchedule(req, res); if (!s) return;
    if (s.status !== 'pending_approval') return res.status(400).json({ success: false, message: 'Only standing orders awaiting approval can be rejected' });
    await s.update({
      status: 'paused',
      paused_reason: `Rejected by Owner: ${reason}`.slice(0, 255),
      rejected_by_user_id: req.user.id, rejected_at: new Date(), rejected_reason: reason.slice(0, 1000)
    });
    const { fireScheduleApprovalResultNotification } = require('../services/poScheduleNotifications');
    setImmediate(() => fireScheduleApprovalResultNotification(s, { approved: false, reason }));
    const [out] = await require('./purchase-orders-recurring').decorateSchedules([s]);
    res.json({ success: true, data: out });
  } catch (err) {
    console.error('POST /purchase-orders/schedules/:id/reject error:', err);
    res.status(500).json({ success: false, message: 'Failed to reject standing order' });
  }
});

router.post('/purchase-orders/schedules/:id/owner-pause', authenticateToken, requireOwnerScope, async (req, res) => {
  try {
    const s = await loadOwnerSchedule(req, res); if (!s) return;
    if (s.status !== 'active' && s.status !== 'pending_approval') return res.status(400).json({ success: false, message: 'Only active standing orders can be paused' });
    await s.update({ status: 'paused', paused_reason: 'Paused by Owner' });
    const [out] = await require('./purchase-orders-recurring').decorateSchedules([s]);
    res.json({ success: true, data: out });
  } catch (err) {
    console.error('owner-pause error:', err);
    res.status(500).json({ success: false, message: 'Failed to pause' });
  }
});

router.post('/purchase-orders/schedules/:id/owner-end', authenticateToken, requireOwnerScope, async (req, res) => {
  try {
    const s = await loadOwnerSchedule(req, res); if (!s) return;
    if (s.status === 'ended') return res.status(400).json({ success: false, message: 'Already ended' });
    await s.update({ status: 'ended', paused_reason: 'Ended by Owner' });
    const [out] = await require('./purchase-orders-recurring').decorateSchedules([s]);
    res.json({ success: true, data: out });
  } catch (err) {
    console.error('owner-end error:', err);
    res.status(500).json({ success: false, message: 'Failed to end' });
  }
});

module.exports = router;

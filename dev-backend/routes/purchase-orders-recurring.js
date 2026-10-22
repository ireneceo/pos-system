/**
 * 정기 발주(Standing order) — 구매자 라우트 (2026-10-22 Fable 설계 .claude/fable-design-20261022-recurring-po.md §3-5)
 *
 * barrel(routes/purchase-orders.js)에서 **crud 보다 앞에** 마운트한다 — crud 의 GET /purchase-orders/:id 가
 * /purchase-orders/schedules 를 먼저 먹으면 parseInt('schedules') → 404.
 * 가드: authenticateToken + requireBuyerRole(구매자 범위 · purchasing 권한) — crud/workflow 와 같다.
 * 오너 승인·일시정지·종료는 routes/purchase-orders-approval.js(오너 scope).
 *
 *   GET  /purchase-orders/schedules               내 구매자 범위 틀 목록
 *   POST /purchase-orders/schedules               지난 발주(또는 초안)에서 틀 만들기 — 드라이런 통과해야 생성
 *   POST /purchase-orders/schedules/preview       만들기 전 미리보기(드라이런만, 저장 없음)
 *   PUT  /purchase-orders/schedules/:id           이름·수량·주기 수정(수량·주기 → 다시 승인)
 *   POST /purchase-orders/schedules/:id/pause | resume | end
 *   GET  /purchase-orders/schedules/:id/runs      실행 기록(최근 50)
 */
const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { PurchaseOrder, PurchaseOrderItem, PurchaseOrderSchedule, PurchaseOrderScheduleRun, Restaurant } = require('../models');
const { authenticateToken } = require('../middleware/auth');
const { requireBuyerRole } = require('../middleware/buyerScope');
const { sanitizeString } = require('../middleware/validation');
const { isApprovalRequiredForRestaurant, resolveOwnerRestaurantIds } = require('../utils/poOwnerApproval');
const { resolveSellers, getSellerName, isExternalSeller } = require('../utils/sellerNames');
const D = require('../utils/poScheduleDates');
const svc = require('../services/poScheduleService');

router.use('/purchase-orders/schedules', authenticateToken, requireBuyerRole);

function ownsSchedule(s, req) {
  if (!req.buyerEntity) return false;
  return s.entity_type === req.buyerEntity.type && Number(s.entity_id) === Number(req.buyerEntity.id);
}

function cadenceFrom(body, fallback = {}) {
  const frequency = body.frequency ?? fallback.frequency;
  const out = { frequency, weekday: null, day_of_month: null };
  if (frequency === 'monthly') out.day_of_month = body.day_of_month != null ? Number(body.day_of_month) : fallback.day_of_month;
  else out.weekday = body.weekday != null ? Number(body.weekday) : fallback.weekday;
  return out;
}

/** 틀 승인 상태 — 승인 필요 매장이고 작성자가 그 매장 오너가 아니면 pending_approval. */
async function approvalStateFor(entityType, entityId, user) {
  if (entityType !== 'restaurant') return { required: false, byOwner: false };
  const restaurant = await Restaurant.findByPk(entityId, { attributes: ['id', 'operation_settings'] });
  const required = await isApprovalRequiredForRestaurant(restaurant);
  if (!required) return { required: false, byOwner: false };
  const owned = await resolveOwnerRestaurantIds(user);
  return { required: true, byOwner: owned.includes(Number(entityId)) };
}

async function decorate(rows) {
  const list = rows.map(r => (typeof r.toJSON === 'function' ? r.toJSON() : r));
  const sellerMap = await resolveSellers(list);
  const poIds = list.map(s => s.last_po_id).filter(Boolean);
  const pos = poIds.length
    ? await PurchaseOrder.findAll({ where: { id: { [Op.in]: poIds } }, attributes: ['id', 'po_number', 'status', 'total_amount', 'currency'] })
    : [];
  const poMap = new Map(pos.map(p => [p.id, p.toJSON()]));
  const pending = list.length
    ? await PurchaseOrder.findAll({
      where: { schedule_id: { [Op.in]: list.map(s => s.id) }, status: 'pending_approval' },
      attributes: ['schedule_id', 'id', 'po_number']
    })
    : [];
  const pendingMap = new Map(pending.map(p => [p.schedule_id, { id: p.id, po_number: p.po_number }]));
  return list.map(s => ({
    ...s,
    next_run_date: D.toDateStr(s.next_run_date),
    last_run_date: D.toDateStr(s.last_run_date),
    ends_on: D.toDateStr(s.ends_on),
    line_items: svc.parseLines(s.line_items),
    seller_name: getSellerName(sellerMap, s.seller_type, s.seller_entity_id),
    is_external: isExternalSeller(sellerMap, s.seller_type, s.seller_entity_id),
    last_po: s.last_po_id ? (poMap.get(s.last_po_id) || null) : null,
    pending_po: pendingMap.get(s.id) || null
  }));
}

// GET /purchase-orders/schedules
router.get('/purchase-orders/schedules', async (req, res) => {
  try {
    if (!req.buyerEntity) return res.json({ success: true, data: [] });
    const rows = await PurchaseOrderSchedule.findAll({
      where: { entity_type: req.buyerEntity.type, entity_id: req.buyerEntity.id },
      order: [['created_at', 'DESC']]
    });
    res.json({ success: true, data: await decorate(rows) });
  } catch (err) {
    console.error('GET /purchase-orders/schedules error:', err);
    res.status(500).json({ success: false, message: 'Failed to load standing orders' });
  }
});

/** 출처 발주를 읽어 틀 재료(판매자·줄)로. 400 이면 { error }. */
async function sourceFrom(req, sourcePoId) {
  const id = parseInt(sourcePoId, 10);
  if (!Number.isFinite(id)) return { error: { status: 400, message: 'source_po_id is required' } };
  const po = await PurchaseOrder.findByPk(id, { include: [{ model: PurchaseOrderItem, as: 'items' }] });
  if (!po || !req.buyerEntity || po.entity_type !== req.buyerEntity.type || Number(po.entity_id) !== Number(req.buyerEntity.id)) {
    return { error: { status: 404, message: 'Purchase order not found' } };
  }
  if (po.seller_type !== 'supplier') {
    return { error: { status: 400, code: 'SUPPLIER_ONLY', message: 'Standing orders are available for supplier orders only' } };
  }
  if (po.status === 'cancelled') return { error: { status: 400, message: 'A cancelled order cannot be repeated' } };
  const lines = svc.linesFromPoItems(po.items || []);
  if (!lines.length) return { error: { status: 400, message: 'This order has no items' } };
  // 기본 요일 = 출처 발주를 만든 요일(구매자 시간대)
  const tz = await svc.buyerTimeZone(po.entity_type, po.entity_id);
  const localDay = D.localParts(new Date(po.submitted_at || po.created_at), tz).date;
  const defaultWeekday = new Date(localDay + 'T00:00:00Z').getUTCDay();
  return { po, lines, defaultWeekday };
}

function previewBody(p) {
  return { total: p.total, subtotal: p.subtotal, delivery_fee: p.delivery_fee, currency: p.currency, lines: p.lines };
}

// POST /purchase-orders/schedules/preview — 만들기 창 미리보기(드라이런만)
router.post('/purchase-orders/schedules/preview', async (req, res) => {
  try {
    const src = await sourceFrom(req, req.body?.source_po_id);
    if (src.error) return res.status(src.error.status).json({ success: false, code: src.error.code, message: src.error.message });
    const cadence = cadenceFrom(req.body || {}, { frequency: 'weekly', weekday: src.defaultWeekday });
    const bad = D.validateCadence(cadence);
    if (bad) return res.status(400).json({ success: false, message: bad });
    const p = await svc.previewSchedule({
      entity_type: src.po.entity_type, entity_id: src.po.entity_id, seller_type: src.po.seller_type,
      seller_entity_id: src.po.seller_entity_id, line_items: src.lines, created_by_user_id: req.user.id
    });
    if (!p.ok) return res.status(400).json({ success: false, code: p.error.code, message: p.error.message });
    const first = await svc.computeFirstRunDate({ entity_type: src.po.entity_type, entity_id: src.po.entity_id, ...cadence });
    const appr = await approvalStateFor(src.po.entity_type, src.po.entity_id, req.user);
    const sellerMap = await resolveSellers([src.po]);
    res.json({
      success: true,
      data: {
        ...previewBody(p),
        first_run_date: first,
        approval_required: appr.required && !appr.byOwner,
        seller_name: getSellerName(sellerMap, src.po.seller_type, src.po.seller_entity_id),
        is_external: isExternalSeller(sellerMap, src.po.seller_type, src.po.seller_entity_id),
      }
    });
  } catch (err) {
    console.error('POST /purchase-orders/schedules/preview error:', err);
    res.status(500).json({ success: false, message: 'Failed to preview standing order' });
  }
});

// POST /purchase-orders/schedules
router.post('/purchase-orders/schedules', async (req, res) => {
  try {
    const body = req.body || {};
    const src = await sourceFrom(req, body.source_po_id);
    if (src.error) return res.status(src.error.status).json({ success: false, code: src.error.code, message: src.error.message });
    const cadence = cadenceFrom(body, { frequency: 'weekly', weekday: src.defaultWeekday });
    const bad = D.validateCadence(cadence);
    if (bad) return res.status(400).json({ success: false, message: bad });

    const base = {
      entity_type: src.po.entity_type, entity_id: src.po.entity_id,
      seller_type: src.po.seller_type, seller_entity_id: src.po.seller_entity_id,
      line_items: src.lines, created_by_user_id: req.user.id
    };
    // 드라이런 — 지금 발주가 안 되는 틀(연결 끊김·판매 중지·최소주문…)은 만들지 않는다
    const p = await svc.previewSchedule(base);
    if (!p.ok) return res.status(400).json({ success: false, code: p.error.code, message: `This standing order cannot be placed now: ${p.error.message}` });

    const appr = await approvalStateFor(src.po.entity_type, src.po.entity_id, req.user);
    const now = new Date();
    const first = await svc.computeFirstRunDate({ ...base, ...cadence }, now);
    const status = (appr.required && !appr.byOwner) ? 'pending_approval' : 'active';
    const approvedByOwner = appr.required && appr.byOwner;
    const schedule = await PurchaseOrderSchedule.create({
      ...base,
      ...cadence,
      name: body.name ? sanitizeString(String(body.name)).slice(0, 100) : null,
      next_run_date: first,
      status,
      approval_required: appr.required,
      // 작성자가 그 매장 오너면 승인자 = 작성자(applySubmitGate 예외와 같은 뜻)
      approved_by_user_id: approvedByOwner ? req.user.id : null,
      approved_at: approvedByOwner ? now : null,
      // 기준선 — 오너 승인이 없는 매장도 지금 총액을 남긴다(나중에 오너가 연결되면 처음 한 번은 승인으로 간다 §4-2 ①)
      approved_total: p.total,
      source_po_id: src.po.id
    });
    if (status === 'pending_approval') {
      const { fireScheduleApprovalPendingNotification } = require('../services/poScheduleNotifications');
      setImmediate(() => fireScheduleApprovalPendingNotification(schedule, p));
    }
    const [out] = await decorate([schedule]);
    res.status(201).json({ success: true, data: { ...out, preview: previewBody(p) } });
  } catch (err) {
    console.error('POST /purchase-orders/schedules error:', err);
    res.status(500).json({ success: false, message: 'Failed to create standing order' });
  }
});

async function loadOwned(req, res) {
  const id = parseInt(req.params.id, 10);
  const s = Number.isFinite(id) ? await PurchaseOrderSchedule.findByPk(id) : null;
  if (!s || !ownsSchedule(s, req)) { res.status(404).json({ success: false, message: 'Standing order not found' }); return null; }
  return s;
}

// PUT /purchase-orders/schedules/:id
router.put('/purchase-orders/schedules/:id', async (req, res) => {
  try {
    const s = await loadOwned(req, res); if (!s) return;
    if (s.status === 'ended') return res.status(400).json({ success: false, message: 'An ended standing order cannot be changed' });
    const body = req.body || {};
    const patch = {};
    if (body.name !== undefined) patch.name = body.name ? sanitizeString(String(body.name)).slice(0, 100) : null;

    // 수량 — 틀 줄 순서 그대로 quantity_ordered 만 받는다(품목 교체·추가는 v1 범위 밖)
    let linesChanged = false;
    const cur = svc.parseLines(s.line_items);
    if (Array.isArray(body.line_items)) {
      if (body.line_items.length !== cur.length) return res.status(400).json({ success: false, message: 'Only quantities can be changed' });
      const next = cur.map((l, i) => {
        const q = parseFloat(body.line_items[i]?.quantity_ordered);
        return { ...l, quantity_ordered: q };
      });
      if (next.some(l => !(l.quantity_ordered > 0))) return res.status(400).json({ success: false, message: 'quantity_ordered must be > 0' });
      linesChanged = next.some((l, i) => l.quantity_ordered !== parseFloat(cur[i].quantity_ordered));
      if (linesChanged) patch.line_items = next;
    }
    let cadenceChanged = false;
    if (body.frequency !== undefined || body.weekday !== undefined || body.day_of_month !== undefined) {
      const cadence = cadenceFrom(body, s);
      const bad = D.validateCadence(cadence);
      if (bad) return res.status(400).json({ success: false, message: bad });
      cadenceChanged = cadence.frequency !== s.frequency || (cadence.frequency === 'monthly'
        ? Number(cadence.day_of_month) !== Number(s.day_of_month)
        : Number(cadence.weekday) !== Number(s.weekday));
      if (cadenceChanged) {
        Object.assign(patch, cadence);
        patch.next_run_date = await svc.computeFirstRunDate({ ...s.toJSON(), ...cadence });
      }
    }

    let preview = null;
    if (linesChanged || cadenceChanged) {
      preview = await svc.previewSchedule({ ...s.toJSON(), line_items: patch.line_items || cur });
      if (!preview.ok) return res.status(400).json({ success: false, code: preview.error.code, message: `This standing order cannot be placed now: ${preview.error.message}` });
      // 오너가 본 내용(품목 수량·주기)이 바뀌었다 → 승인 필요 매장이면 다시 승인(§4-4)
      const appr = await approvalStateFor(s.entity_type, s.entity_id, req.user);
      patch.approval_required = appr.required;
      patch.approved_total = preview.total;
      if (appr.required && !appr.byOwner) {
        Object.assign(patch, { approved_by_user_id: null, approved_at: null, rejected_by_user_id: null, rejected_at: null, rejected_reason: null });
        if (s.status === 'active' || s.status === 'pending_approval') patch.status = 'pending_approval';
      } else if (appr.required && appr.byOwner) {
        Object.assign(patch, { approved_by_user_id: req.user.id, approved_at: new Date() });
      }
    }
    await s.update(patch);
    if (patch.status === 'pending_approval' && preview) {
      const { fireScheduleApprovalPendingNotification } = require('../services/poScheduleNotifications');
      setImmediate(() => fireScheduleApprovalPendingNotification(s, preview));
    }
    const [out] = await decorate([s]);
    res.json({ success: true, data: out });
  } catch (err) {
    console.error('PUT /purchase-orders/schedules/:id error:', err);
    res.status(500).json({ success: false, message: 'Failed to update standing order' });
  }
});

// POST /purchase-orders/schedules/:id/pause
router.post('/purchase-orders/schedules/:id/pause', async (req, res) => {
  try {
    const s = await loadOwned(req, res); if (!s) return;
    if (s.status !== 'active' && s.status !== 'pending_approval') return res.status(400).json({ success: false, message: 'Only active standing orders can be paused' });
    await s.update({ status: 'paused', paused_reason: 'Paused by buyer' });
    const [out] = await decorate([s]);
    res.json({ success: true, data: out });
  } catch (err) {
    console.error('pause schedule error:', err);
    res.status(500).json({ success: false, message: 'Failed to pause' });
  }
});

// POST /purchase-orders/schedules/:id/resume — 틀 내용이 안 바뀌었으므로 승인 상태는 그대로(§3-5)
router.post('/purchase-orders/schedules/:id/resume', async (req, res) => {
  try {
    const s = await loadOwned(req, res); if (!s) return;
    if (s.status !== 'paused') return res.status(400).json({ success: false, message: 'Only paused standing orders can be resumed' });
    // 반려로 멈춘 틀은 승인부터(반려 사유가 남아 있음) — 승인 필요 매장이면 승인 대기로 돌아간다
    const appr = await approvalStateFor(s.entity_type, s.entity_id, req.user);
    const needsApproval = appr.required && !appr.byOwner && (!s.approved_at || s.rejected_at);
    await s.update({
      status: needsApproval ? 'pending_approval' : 'active',
      paused_reason: null,
      consecutive_failures: 0,
      next_run_date: await svc.computeFirstRunDate(s)
    });
    if (needsApproval) {
      const preview = await svc.previewSchedule(s.toJSON());
      if (preview.ok) {
        const { fireScheduleApprovalPendingNotification } = require('../services/poScheduleNotifications');
        setImmediate(() => fireScheduleApprovalPendingNotification(s, preview));
      }
    }
    const [out] = await decorate([s]);
    res.json({ success: true, data: out });
  } catch (err) {
    console.error('resume schedule error:', err);
    res.status(500).json({ success: false, message: 'Failed to resume' });
  }
});

// POST /purchase-orders/schedules/:id/end — 되돌릴 수 없음(이미 만든 발주는 그대로)
router.post('/purchase-orders/schedules/:id/end', async (req, res) => {
  try {
    const s = await loadOwned(req, res); if (!s) return;
    if (s.status === 'ended') return res.status(400).json({ success: false, message: 'Already ended' });
    await s.update({ status: 'ended', paused_reason: 'Ended by buyer' });
    const [out] = await decorate([s]);
    res.json({ success: true, data: out });
  } catch (err) {
    console.error('end schedule error:', err);
    res.status(500).json({ success: false, message: 'Failed to end' });
  }
});

// GET /purchase-orders/schedules/:id/runs
router.get('/purchase-orders/schedules/:id/runs', async (req, res) => {
  try {
    const s = await loadOwned(req, res); if (!s) return;
    const runs = await PurchaseOrderScheduleRun.findAll({ where: { schedule_id: s.id }, order: [['run_date', 'DESC']], limit: 50 });
    const poIds = runs.map(r => r.po_id).filter(Boolean);
    const pos = poIds.length ? await PurchaseOrder.findAll({ where: { id: { [Op.in]: poIds } }, attributes: ['id', 'po_number', 'status'] }) : [];
    const poMap = new Map(pos.map(p => [p.id, p.toJSON()]));
    res.json({ success: true, data: runs.map(r => ({ ...r.toJSON(), run_date: D.toDateStr(r.run_date), po: r.po_id ? (poMap.get(r.po_id) || null) : null })) });
  } catch (err) {
    console.error('GET schedule runs error:', err);
    res.status(500).json({ success: false, message: 'Failed to load runs' });
  }
});

module.exports = router;
module.exports.decorateSchedules = decorate;

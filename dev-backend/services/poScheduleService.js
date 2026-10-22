/**
 * 정기 발주(Standing order) — 틀 미리보기·생성 1회·다음 날짜 (2026-10-22 Fable 설계 .claude/fable-design-20261022-recurring-po.md)
 *
 * 한 길 원칙:
 *  - 발주 만들기 = routes/purchase-orders-crud.createPurchaseOrderCore (사람이 담을 때와 같은 검사·현재가 단가)
 *  - 내보내기   = services/purchaseOrderService.submitDraftInTx → utils/poOwnerApproval.applySubmitGate
 *  - 외부 공급업체에는 아무것도 보내지 않는다(구독 업체가 알아서 배송·청구 — Irene 10-22) → notePlaced
 * ⛔ mergeDraft 는 반드시 false — 켜면 직원이 담아 둔 장바구니 초안에 합쳐진 채 자동 제출된다(§3-3).
 */
const { Op } = require('sequelize');
const database = require('../config/database');
const {
  PurchaseOrder, PurchaseOrderItem, PurchaseOrderSchedule, PurchaseOrderScheduleRun, Restaurant, SchedulerRun
} = require('../models');
const D = require('../utils/poScheduleDates');

const MAX_CONSECUTIVE_FAILURES = 3;

/** 발주 줄 → 틀 줄(createPurchaseOrderCore raw items). 단가·환산은 싣지 않는다 — 생성 때 판매자 현재가. */
function linesFromPoItems(items) {
  return (items || []).map(it => {
    const line = {};
    if (it.product_id) line.product_id = Number(it.product_id);
    else if (it.brand_product_id) line.brand_product_id = Number(it.brand_product_id);
    else if (it.product_ingredient_id) line.product_ingredient_id = Number(it.product_ingredient_id);
    else if (it.ingredient_id) line.ingredient_id = Number(it.ingredient_id);
    if (it.ingredient_seller_product_id) line.ingredient_seller_product_id = Number(it.ingredient_seller_product_id);
    line.quantity_ordered = parseFloat(it.quantity_ordered);
    const opts = Array.isArray(it.options) ? it.options.map(o => Number(o.option_id)).filter(n => n > 0) : [];
    if (opts.length) line.option_ids = opts;
    if (it.notes) line.notes = String(it.notes).slice(0, 255);
    line.description = it.description || null;   // 화면 표시용(서버 계산엔 안 쓰임)
    return line;
  }).filter(l => l.quantity_ordered > 0);
}

function parseLines(lines) {
  if (typeof lines === 'string') { try { return JSON.parse(lines); } catch (_) { return []; } }
  return Array.isArray(lines) ? lines : [];
}

function linesForCore(lines) {
  return parseLines(lines).map(({ description, ...rest }) => rest);
}

/** 구매자 시간대 — 매장은 operation_settings.timeZone, 아니면 사이트 기본. */
async function buyerTimeZone(entityType, entityId, transaction) {
  if (entityType === 'restaurant') {
    const r = await Restaurant.findByPk(entityId, { attributes: ['id', 'operation_settings'], transaction });
    const tz = r && r.operation_settings && r.operation_settings.timeZone;
    if (tz) return tz;
  }
  const { getSiteTimezone } = require('../utils/dateTimeHelper');
  return getSiteTimezone();
}

function scheduleNotes(schedule) {
  const label = schedule.frequency === 'monthly' ? `monthly (day ${schedule.day_of_month})`
    : `${schedule.frequency} (${['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][Number(schedule.weekday)]})`;
  return `Standing order #${schedule.id} · ${label}`;
}

function coreErrorOf(result) {
  const b = (result && result.body) || {};
  return { status: result.status || 400, code: b.code || 'CREATE_FAILED', message: b.message || 'Could not create order', body: b };
}

/**
 * 드라이런 — 실제 발주를 만들지 않고 «지금 가격» 총액·줄·오류를 낸다(트랜잭션을 연 뒤 항상 롤백).
 * @returns {{ok:true,total,subtotal,delivery_fee,currency,lines:[…]}|{ok:false,error:{status,code,message,body}}}
 */
async function previewSchedule({ entity_type, entity_id, seller_type, seller_entity_id, line_items, created_by_user_id }) {
  const { createPurchaseOrderCore } = require('../routes/purchase-orders-crud');
  const t = await database.sequelize.transaction();
  try {
    const result = await createPurchaseOrderCore({
      buyerEntity: { type: entity_type, id: Number(entity_id) },
      userId: created_by_user_id,
      payload: { seller_type, seller_entity_id, items: linesForCore(line_items) },
      transaction: t,
      mergeDraft: false
    });
    if (!result.ok) return { ok: false, error: coreErrorOf(result) };
    const rows = await PurchaseOrderItem.findAll({ where: { purchase_order_id: result.po.id }, transaction: t, order: [['id', 'ASC']] });
    return {
      ok: true,
      total: parseFloat(result.po.total_amount) || 0,
      subtotal: parseFloat(result.po.subtotal) || 0,
      delivery_fee: parseFloat(result.po.delivery_fee) || 0,
      currency: result.po.currency || 'MYR',
      lines: rows.map(r => ({
        name: r.description || 'Item',
        unit: r.unit || null,
        quantity_ordered: parseFloat(r.quantity_ordered),
        unit_price: parseFloat(r.unit_price),
        line_total: parseFloat(r.line_total)
      }))
    };
  } finally {
    if (!t.finished) await t.rollback();
  }
}

/** 지금(now) 기준 첫 발주일. */
async function computeFirstRunDate(schedule, now = new Date()) {
  const tz = await buyerTimeZone(schedule.entity_type, schedule.entity_id);
  const local = D.localParts(now, tz);
  return D.firstRunDate(schedule, local.date, local.hour);
}

function driftPct(total, base) {
  const b = parseFloat(base);
  if (!(b > 0)) return null;
  return Math.round(((parseFloat(total) - b) / b) * 10000) / 100;
}

async function isExternalSupplier(schedule) {
  if (schedule.seller_type !== 'supplier') return false;
  const { resolveSellers, isExternalSeller } = require('../utils/sellerNames');
  const map = await resolveSellers([{ seller_type: schedule.seller_type, seller_entity_id: schedule.seller_entity_id }]);
  return isExternalSeller(map, schedule.seller_type, schedule.seller_entity_id);
}

function fakeReq(io) {
  return { app: { get: (k) => (k === 'io' ? io : undefined) } };
}

/** 실패 기록 — PO 트랜잭션과 따로(롤백된 뒤) 남긴다. 3회 연속이면 일시정지. */
async function recordFailure(scheduleId, runDate, err) {
  let paused = false;
  let schedule = null;
  await database.sequelize.transaction(async (t) => {
    schedule = await PurchaseOrderSchedule.findByPk(scheduleId, { lock: t.LOCK.UPDATE, transaction: t });
    if (!schedule) return;
    const reason = `${err.code || 'ERROR'}: ${err.message || ''}`.slice(0, 500);
    try {
      await PurchaseOrderScheduleRun.create({ schedule_id: schedule.id, run_date: runDate, outcome: 'failed', reason }, { transaction: t });
    } catch (e) {
      if (e.name !== 'SequelizeUniqueConstraintError') throw e;
      return;   // 같은 날 이미 기록됨 — 다른 틱이 처리했다
    }
    const failures = (Number(schedule.consecutive_failures) || 0) + 1;
    paused = failures >= MAX_CONSECUTIVE_FAILURES;
    await schedule.update({
      consecutive_failures: failures,
      last_error: reason,
      last_run_date: runDate,
      next_run_date: D.nextRunAfter(schedule, schedule.next_run_date, runDate),
      ...(paused ? { status: 'paused', paused_reason: `Paused after ${failures} failures — ${reason}`.slice(0, 255) } : {})
    }, { transaction: t });
  });
  if (schedule) {
    const { fireScheduleFailedNotification } = require('./poScheduleNotifications');
    setImmediate(() => fireScheduleFailedNotification(schedule, { reason: err.message || err.code, paused }));
  }
  return { outcome: 'failed', paused };
}

/**
 * 틀 하나를 지금(now) 처리한다. 때가 아니면 { outcome: 'not_due' }.
 * @returns {Promise<{outcome, po_id?, reason?}>}
 */
async function runOneSchedule(scheduleId, { now = new Date(), io = null } = {}) {
  const { createPurchaseOrderCore } = require('../routes/purchase-orders-crud');
  const { submitDraftInTx } = require('./purchaseOrderService');
  const { appendTrackingEvent } = require('./poRealtimeService');

  let runDate = null;
  let ctx = null;   // 커밋 뒤 알림에 쓸 것
  const t = await database.sequelize.transaction();
  try {
    const schedule = await PurchaseOrderSchedule.findByPk(scheduleId, { lock: t.LOCK.UPDATE, transaction: t });
    if (!schedule || schedule.status !== 'active') { await t.rollback(); return { outcome: 'not_due' }; }
    const tz = await buyerTimeZone(schedule.entity_type, schedule.entity_id, t);
    const local = D.localParts(now, tz);
    if (schedule.ends_on && local.date > D.toDateStr(schedule.ends_on)) {
      await schedule.update({ status: 'ended', paused_reason: 'End date passed' }, { transaction: t });
      await t.commit();
      return { outcome: 'ended' };
    }
    if (!D.isDue(schedule.next_run_date, local)) { await t.rollback(); return { outcome: 'not_due' }; }
    runDate = local.date;

    // 하루 1건 — UNIQUE(schedule_id, run_date). 행 잠금 + next_run_date 진행과 겹으로 막는다.
    let run;
    try {
      run = await PurchaseOrderScheduleRun.create({ schedule_id: schedule.id, run_date: runDate }, { transaction: t });
    } catch (e) {
      if (e.name === 'SequelizeUniqueConstraintError') { await t.rollback(); return { outcome: 'already_ran' }; }
      throw e;
    }
    const advance = { last_run_date: runDate, next_run_date: D.nextRunAfter(schedule, schedule.next_run_date, runDate) };

    // 구매 매장이 정지(suspended)면 건너뜀
    if (schedule.entity_type === 'restaurant') {
      const r = await Restaurant.findByPk(schedule.entity_id, { attributes: ['id', 'status'], transaction: t });
      if (r && r.status === 'suspended') {
        await run.update({ outcome: 'skipped', reason: 'buyer_suspended' }, { transaction: t });
        await schedule.update(advance, { transaction: t });
        await t.commit();
        return { outcome: 'skipped', reason: 'buyer_suspended' };
      }
    }
    // 이 틀이 만든 발주가 아직 오너 승인 대기면 그 주는 건너뜀(미승인 발주를 겹쳐 두지 않는다 §6)
    const waiting = await PurchaseOrder.count({ where: { schedule_id: schedule.id, status: 'pending_approval' }, transaction: t });
    if (waiting > 0) {
      await run.update({ outcome: 'skipped', reason: 'awaiting_owner' }, { transaction: t });
      await schedule.update(advance, { transaction: t });
      await t.commit();
      return { outcome: 'skipped', reason: 'awaiting_owner' };
    }

    const created = await createPurchaseOrderCore({
      buyerEntity: { type: schedule.entity_type, id: Number(schedule.entity_id) },
      userId: schedule.created_by_user_id,
      payload: {
        seller_type: schedule.seller_type,
        seller_entity_id: schedule.seller_entity_id,
        items: linesForCore(schedule.line_items),
        notes: scheduleNotes(schedule)
      },
      transaction: t,
      mergeDraft: false
    });
    if (!created.ok) {
      await t.rollback();
      return recordFailure(schedule.id, runDate, coreErrorOf(created));
    }
    await created.po.update({ schedule_id: schedule.id }, { transaction: t });

    // 사전 승인 판정(§4-2) — 틀이 실제로 승인됐고(approved_at) 총액이 허용폭 안일 때만
    const total = parseFloat(created.po.total_amount) || 0;
    const drift = driftPct(total, schedule.approved_total);
    const tol = parseFloat(schedule.price_tolerance_pct);
    const withinTolerance = drift != null && Math.abs(drift) <= (Number.isFinite(tol) ? tol : 10);
    const preApproved = (schedule.approved_at && schedule.approved_by_user_id && withinTolerance)
      ? { scheduleId: schedule.id, approvedByUserId: schedule.approved_by_user_id, approvedAt: schedule.approved_at }
      : null;

    let submitted;
    try {
      submitted = await submitDraftInTx(created.po.id, t, { actor: null, preApproved });
    } catch (e) {
      if (e.name === 'MinOrderError' || e.name === 'InactiveSellerProductError' || e.code) {
        await t.rollback();
        return recordFailure(schedule.id, runDate, { code: e.code || e.name, message: e.message });
      }
      throw e;
    }
    const po = submitted.po;
    let pendingReason = null;
    if (submitted.needsApproval) {
      pendingReason = !schedule.approved_at
        ? 'This standing order has not been approved by an Owner yet'
        : `Total ${drift > 0 ? '+' : ''}${drift}% vs approved ${parseFloat(schedule.approved_total).toFixed(2)} (allowed ${tol}%)`;
      po.tracking_info = appendTrackingEvent(po, 'pending_approval', `Standing order #${schedule.id}: ${pendingReason}`);
      await po.save({ transaction: t });
    }
    await run.update({
      po_id: po.id,
      outcome: submitted.needsApproval ? 'pending_approval' : 'submitted',
      reason: pendingReason,
      total_amount: po.total_amount,
      drift_pct: drift
    }, { transaction: t });
    await schedule.update({ ...advance, last_po_id: po.id, consecutive_failures: 0, last_error: null }, { transaction: t });
    await t.commit();
    ctx = { schedule, po, run, needsApproval: submitted.needsApproval, pendingReason };
  } catch (err) {
    if (!t.finished) await t.rollback();
    if (runDate) return recordFailure(scheduleId, runDate, { code: 'ERROR', message: err.message });
    throw err;
  }

  return afterCommit(ctx, io);
}

/** 커밋 뒤: 소켓·알림·외부 메일(§3-3 ④ · §5). */
async function afterCommit({ schedule, po, run, needsApproval, pendingReason }, io) {
  const { emitPoEvent } = require('./poRealtimeService');
  const { fireOwnerApprovalPendingNotification, fireSellerSubmittedNotification } = require('./poNotifications');
  const { fireSchedulePlacedNotification } = require('./poScheduleNotifications');
  const req = fakeReq(io);

  if (needsApproval) {
    emitPoEvent(req, po, 'seller-order-updated');
    setImmediate(() => fireOwnerApprovalPendingNotification(po));
    setImmediate(() => fireSchedulePlacedNotification(schedule, po, 'pending', { reason: pendingReason }));
    return { outcome: 'pending_approval', po_id: po.id };
  }
  emitPoEvent(req, po, 'seller-order-created');
  setImmediate(() => fireSellerSubmittedNotification(po));
  await notePlaced(schedule, po);
  return { outcome: 'submitted', po_id: po.id };
}

/**
 * 나간(submitted) 정기 발주 뒤처리 — 가입 업체는 앱 알림(이미 나감), 외부 업체는 **아무것도 보내지 않는다**.
 * 2026-10-22 Irene: «구독설정된 업체라서 이미 계속 알아서 우리한테 인보이스 주고 진행하는데 … 무슨 이메일을 자동 발송해?»
 *   외부 구독 업체 정기 발주 = 우리 쪽 기록(받기·인보이스 대조·결제 체크용). 업체는 평소대로 배송·청구한다.
 * 오너가 허용폭 밖 정기 발주를 승인했을 때도 이 함수를 쓴다.
 */
async function notePlaced(schedule, po) {
  const { fireSchedulePlacedNotification } = require('./poScheduleNotifications');
  const { appendTrackingEvent } = require('./poRealtimeService');
  const external = await isExternalSupplier(schedule);
  if (external) {
    try {
      po.tracking_info = appendTrackingEvent(po, po.status,
        `Standing order #${schedule.id} — recorded for the supplier's subscription delivery (nothing sent to the supplier)`);
      await po.save();
    } catch (e) {
      console.error('[poSchedule] tracking save failed:', e.message);
    }
  }
  setImmediate(() => fireSchedulePlacedNotification(schedule, po, external ? 'recorded' : 'sent'));
}

/**
 * 매 정각 틱 — 때가 된 활성 틀을 하나씩(틀마다 별도 트랜잭션) 처리한다.
 * health-check 가 now 를 넣어 직접 부른다. onlyIds 를 주면 그 틀만 본다(검사가 다른 틀을 건드리지 않게).
 */
async function runDueSchedules({ now = new Date(), io = null, onlyIds = null } = {}) {
  const started = Date.now();
  let runRow = null;
  try { runRow = await SchedulerRun.create({ job_name: 'recurring_po_hourly', status: 'running', started_at: new Date() }); }
  catch (e) { console.error('[SchedulerRun] create failed:', e.message); }

  // 가장 이른 시간대(UTC+14)의 날짜까지 후보로 — 정확한 판정은 틀마다 구매자 시간대로
  const maxDate = D.localParts(now, 'Pacific/Kiritimati').date;
  const where = { status: 'active', next_run_date: { [Op.lte]: maxDate } };
  if (Array.isArray(onlyIds)) where.id = { [Op.in]: onlyIds };
  const results = { due: 0, created: 0, submitted: 0, pending_approval: 0, skipped: 0, failed: 0, ended: 0, sample: [] };
  try {
    const candidates = await PurchaseOrderSchedule.findAll({ where, attributes: ['id'], order: [['id', 'ASC']] });
    for (const c of candidates) {
      try {
        const r = await runOneSchedule(c.id, { now, io });
        if (r.outcome === 'not_due' || r.outcome === 'already_ran') continue;
        results.due++;
        if (r.po_id) results.created++;
        if (results[r.outcome] != null) results[r.outcome]++;
        if (results.sample.length < 10) results.sample.push({ schedule_id: c.id, ...r });
      } catch (e) {
        results.failed++;
        console.error(`[recurringPo] schedule ${c.id} error:`, e.message);
      }
    }
    if (runRow) await runRow.update({
      finished_at: new Date(), duration_ms: Date.now() - started,
      status: results.failed ? 'partial' : 'success', results
    });
  } catch (error) {
    if (runRow) await runRow.update({
      finished_at: new Date(), duration_ms: Date.now() - started, status: 'error', error_message: String(error?.message || error)
    });
    throw error;
  }
  return results;
}

module.exports = {
  MAX_CONSECUTIVE_FAILURES,
  linesFromPoItems,
  parseLines,
  previewSchedule,
  computeFirstRunDate,
  buyerTimeZone,
  driftPct,
  isExternalSupplier,
  runOneSchedule,
  runDueSchedules,
  notePlaced
};

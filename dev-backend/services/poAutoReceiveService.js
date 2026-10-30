/**
 * 배송 완료 뒤 자동 완료 (2026-10-30 Fable 설계 `.claude/fable-design-20261030-po-auto-complete.md` §2-2).
 *
 * Irene: «고객이 안받았다고 주문완료가 안되면 어떻게 해? 일정기간이 지나면 그냥 완료처리 되어야 해.»
 * 판매자가 «배송 완료» 를 누른 뒤 AUTO_RECEIVE_HOURS 안에 구매자가 «받았어요» 를 안 누르면
 * 서버가 대신 전량 수령 처리한다. 본체는 구매자 수령과 **같은 함수**(markAllReceived) — 새 길을 만들지 않는다.
 *
 * - 대상: status === 'delivered' 만. shipped·partial_received·취소는 건드리지 않는다(설계 §2-3).
 * - 발주 하나 = 트랜잭션 하나 + 행 잠금 + **잠근 뒤 상태 재확인** — 구매자가 같은 순간 눌러도 재고는 한 번만.
 * - 기한은 서버 한 곳(여기)에서만 계산한다. 화면은 응답의 auto_receive_at 만 보여 준다.
 */
const { Op } = require('sequelize');
const database = require('../config/database');
const { PurchaseOrder, SchedulerRun } = require('../models');

const AUTO_RECEIVE_HOURS = 72;
const AUTO_NOTE = 'Auto-completed — buyer did not confirm receipt within 3 days of delivery';

/** «배송 완료» 시각 — 추적 이벤트 delivered 의 마지막 at → 없으면 actual_delivery_date → updated_at */
function deliveredAtOf(po) {
  const events = po?.tracking_info && Array.isArray(po.tracking_info.events) ? po.tracking_info.events : [];
  for (let i = events.length - 1; i >= 0; i--) {
    const e = events[i];
    if (e && e.status === 'delivered' && e.at) {
      const d = new Date(e.at);
      if (!Number.isNaN(d.getTime())) return d;
    }
  }
  const fallback = po?.actual_delivery_date || po?.updated_at;
  if (!fallback) return null;
  const d = new Date(fallback);
  return Number.isNaN(d.getTime()) ? null : d;
}

/** delivered 발주가 자동 완료되는 시각 — delivered 가 아니면 null */
function autoReceiveDeadlineOf(po) {
  if (!po || po.status !== 'delivered') return null;
  const at = deliveredAtOf(po);
  return at ? new Date(at.getTime() + AUTO_RECEIVE_HOURS * 3600 * 1000) : null;
}

/** 응답 객체(plain)에 auto_receive_at 을 붙인다 — 목록·상세 공용 */
function attachAutoReceiveAt(obj) {
  if (!obj) return obj;
  const d = autoReceiveDeadlineOf(obj);
  obj.auto_receive_at = d ? d.toISOString() : null;
  return obj;
}

/** 구매자 시간대로 쓴 자동 완료 시각(메일 문장용) — 예 «2 Nov 2026, 14:05» */
async function autoReceiveLabel(po, deadline) {
  if (!deadline) return '';
  let tz = 'Asia/Kuala_Lumpur';
  try {
    const { Restaurant, Brand, Foodcourt } = require('../models');
    const { getRestaurantTimezone } = require('../utils/dateTimeHelper');
    const M = po.entity_type === 'restaurant' ? Restaurant : po.entity_type === 'brand' ? Brand : po.entity_type === 'foodcourt' ? Foodcourt : null;
    const e = M ? await M.findByPk(po.entity_id, { attributes: ['id', 'operation_settings'] }) : null;
    if (e) tz = getRestaurantTimezone(e) || tz;
  } catch (_) { /* 기본 시간대 */ }
  return deadline.toLocaleString('en-GB', { timeZone: tz, day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

/** 발주 하나 — 기한이 지났으면 전량 수령 처리. { outcome: 'completed'|'not_due'|'skipped', reason? } */
async function autoReceiveOne(id, { now = new Date(), io = null } = {}) {
  const { markAllReceived } = require('./purchaseOrderReceive');
  const { appendTrackingEvent } = require('./poRealtimeService');
  const t = await database.sequelize.transaction();
  let po;
  try {
    po = await PurchaseOrder.findByPk(id, { lock: t.LOCK.UPDATE, transaction: t });
    // 잠근 뒤 다시 본다 — 구매자가 막 «받았어요» 를 눌렀으면 여기서 빠진다(이중 재고 방지)
    if (!po || po.status !== 'delivered') { await t.rollback(); return { outcome: 'skipped', reason: po ? po.status : 'not_found' }; }
    const deadline = autoReceiveDeadlineOf(po);
    if (!deadline || deadline.getTime() > now.getTime()) { await t.rollback(); return { outcome: 'not_due' }; }

    const rcv = await markAllReceived(po, {
      userId: po.created_by_user_id || null,
      note: `PO ${po.po_number} auto-received`,
      trackingSource: 'auto_receive',
    }, t);
    if (!rcv.ok) { await t.rollback(); return { outcome: 'skipped', reason: rcv.message }; }

    // markAllReceived 가 남긴 received 이벤트에 «왜 자동인지» 를 적는다 — 타임라인이 note 를 그대로 보여 준다
    const info = po.tracking_info && typeof po.tracking_info === 'object' ? { ...po.tracking_info } : {};
    const events = Array.isArray(info.events) ? info.events.slice() : [];
    const last = events[events.length - 1];
    if (last && last.status === 'received') {
      events[events.length - 1] = { ...last, note: AUTO_NOTE, source: 'auto_receive' };
      info.events = events;
    } else {
      Object.assign(info, appendTrackingEvent(po, 'received', AUTO_NOTE, null, { source: 'auto_receive' }));
    }
    await po.update({ tracking_info: info }, { transaction: t });
    await t.commit();
  } catch (e) {
    if (!t.finished) await t.rollback();
    throw e;
  }

  // 커밋 뒤(비차단): 청구서 안전망(배포 전에 배송 완료된 옛 발주) · 알림 · 화면 갱신
  const { issueTradeInvoiceAfterCommit } = require('./purchaseOrderService');
  issueTradeInvoiceAfterCommit(po);
  setImmediate(() => {
    const { fireAutoReceivedNotifications } = require('./poNotifications');
    fireAutoReceivedNotifications(po);
  });
  if (io) {
    const { emitPoEvent } = require('./poRealtimeService');
    emitPoEvent({ app: { get: () => io } }, po, 'seller-order-updated');
  }
  return { outcome: 'completed' };
}

/**
 * 매 정각 틱 — health-check 가 now·onlyIds 를 넣어 직접 부른다(정기 발주 runDueSchedules 와 같은 틀).
 * 배송 완료 상태는 몇 건 안 되므로 전부 읽어 JS 로 기한을 판정한다.
 */
async function runAutoReceive({ now = new Date(), onlyIds = null, io = null } = {}) {
  const started = Date.now();
  let runRow = null;
  try { runRow = await SchedulerRun.create({ job_name: 'po_auto_receive_hourly', status: 'running', started_at: new Date() }); }
  catch (e) { console.error('[SchedulerRun] create failed:', e.message); }

  const results = { candidates: 0, completed: 0, skipped: 0, failed: 0, sample: [] };
  try {
    const where = { status: 'delivered' };
    if (Array.isArray(onlyIds)) where.id = { [Op.in]: onlyIds };
    const rows = await PurchaseOrder.findAll({
      where, attributes: ['id', 'po_number', 'status', 'tracking_info', 'actual_delivery_date', 'updated_at'], order: [['id', 'ASC']]
    });
    for (const row of rows) {
      const deadline = autoReceiveDeadlineOf(row);
      if (!deadline || deadline.getTime() > now.getTime()) continue;
      results.candidates++;
      try {
        const r = await autoReceiveOne(row.id, { now, io });
        if (r.outcome === 'completed') results.completed++;
        else if (r.outcome === 'skipped') results.skipped++;
        if (results.sample.length < 10) results.sample.push({ po_id: row.id, po_number: row.po_number, ...r });
      } catch (e) {
        results.failed++;
        console.error(`[poAutoReceive] PO ${row.id} error:`, e.message);
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
  AUTO_RECEIVE_HOURS,
  deliveredAtOf,
  autoReceiveDeadlineOf,
  attachAutoReceiveAt,
  autoReceiveLabel,
  autoReceiveOne,
  runAutoReceive,
};

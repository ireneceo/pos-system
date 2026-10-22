/**
 * 정기 발주(Standing order) 알림 — 2026-10-22 Fable 설계 recurring-po §7.
 * 모든 함수는 throw 하지 않는다(알림 실패가 발주·틀 상태를 막지 않음 — poNotifications 와 같은 원칙).
 *
 * 받는 사람
 *  - 발주됨/실패/정지(po_schedule_placed · po_schedule_failed): 틀 작성자 + 그 구매자 자리 관리자(작성자가 빠졌을 수 있다)
 *  - 틀 승인 요청(po_approval_pending): 그 매장 오너 전원
 *  - 틀 승인 결과(po_approval_result): 틀 작성자
 */
const {
  sendNotificationBatch, getEntityAddressees, getRestaurantAddressees, getUserAddressee
} = require('../utils/notificationService');
const { mailFor } = require('../utils/notificationAddressee');
const { goLink } = require('../utils/notificationLinks');

async function sellerNameOf(schedule) {
  try {
    const { resolveSellers, getSellerName } = require('../utils/sellerNames');
    const map = await resolveSellers([{ seller_type: schedule.seller_type, seller_entity_id: schedule.seller_entity_id }]);
    return getSellerName(map, schedule.seller_type, schedule.seller_entity_id) || '—';
  } catch (_) { return '—'; }
}

function displayName(schedule, sellerName) {
  return schedule.name || `${sellerName} #${schedule.id}`;
}

/** 작성자 + 자리 관리자(오너 제외 — 오너는 승인 알림을 따로 받는다), 중복 없이. */
async function buyerSideAddressees(schedule) {
  const list = [];
  const seen = new Set();
  if (schedule.created_by_user_id) {
    try {
      const a = await getUserAddressee(schedule.created_by_user_id, schedule.entity_type, schedule.entity_id);
      list.push({ id: Number(schedule.created_by_user_id), addressee: a });
      seen.add(Number(schedule.created_by_user_id));
    } catch (_) { /* skip */ }
  }
  const others = schedule.entity_type === 'restaurant'
    ? (await getRestaurantAddressees(schedule.entity_id)).filter(r => r.addressee.kind === 'store')
    : await getEntityAddressees(schedule.entity_type, schedule.entity_id);
  for (const r of others) {
    if (seen.has(Number(r.id))) continue;
    seen.add(Number(r.id));
    list.push(r);
  }
  return list;
}

function cadenceOf(schedule, lang) {
  const { poScheduleCadenceText } = require('../utils/notificationTemplates');
  return poScheduleCadenceText(schedule, lang);
}

/**
 * 이번 주기 발주가 만들어졌다. kind: 'sent'(가입 업체로 나감) | 'recorded'(외부 구독 업체 — 기록만) | 'pending'(오너 승인 대기)
 * @param {object} extra - { reason(승인 대기 사유) }
 */
async function fireSchedulePlacedNotification(schedule, po, kind, extra = {}) {
  try {
    const list = await buyerSideAddressees(schedule);
    if (!list.length) return;
    const { poScheduleEmail } = require('../utils/notificationTemplates');
    const { loadPoEmailItems } = require('../utils/poEmailItems');
    const sellerName = await sellerNameOf(schedule);
    const items = await loadPoEmailItems(po.id);
    await sendNotificationBatch(list.map(r => r.id), 'po_schedule_placed', mailFor(list, (a, user) => {
      const lang = user.preferred_language || 'en';
      return poScheduleEmail(kind, {
        scheduleName: displayName(schedule, sellerName), sellerName, poNumber: po.po_number,
        total: po.total_amount, currency: po.currency || 'MYR', items,
        reason: extra.reason, cadence: cadenceOf(schedule, lang),
        link: goLink(a, 'po_detail', { poId: po.id })
      }, lang);
    }));
  } catch (e) {
    console.error('[poScheduleNotifications] placed error:', e.message);
  }
}

/** 이번 주기 발주를 못 만들었다(paused=true 면 연속 실패로 멈춤). */
async function fireScheduleFailedNotification(schedule, { reason, paused = false } = {}) {
  try {
    const list = await buyerSideAddressees(schedule);
    if (!list.length) return;
    const { poScheduleEmail } = require('../utils/notificationTemplates');
    const sellerName = await sellerNameOf(schedule);
    await sendNotificationBatch(list.map(r => r.id), 'po_schedule_failed', mailFor(list, (a, user) => {
      const lang = user.preferred_language || 'en';
      return poScheduleEmail(paused ? 'paused' : 'failed', {
        scheduleName: displayName(schedule, sellerName), sellerName, reason,
        cadence: cadenceOf(schedule, lang), link: goLink(a, 'po_schedules')
      }, lang);
    }));
  } catch (e) {
    console.error('[poScheduleNotifications] failed error:', e.message);
  }
}

/** 오너에게 틀 승인 요청. preview = { lines(메일 품목 꼴), total, currency } */
async function fireScheduleApprovalPendingNotification(schedule, preview = {}) {
  try {
    if (schedule.entity_type !== 'restaurant') return;
    const list = (await getRestaurantAddressees(schedule.entity_id)).filter(r => r.addressee.kind === 'owner');
    if (!list.length) return;
    const { poScheduleEmail } = require('../utils/notificationTemplates');
    const sellerName = await sellerNameOf(schedule);
    const buyerName = list[0].addressee.entity_name || '—';
    await sendNotificationBatch(list.map(r => r.id), 'po_approval_pending', mailFor(list, (a, user) => {
      const lang = user.preferred_language || 'en';
      return poScheduleEmail('approval', {
        scheduleName: displayName(schedule, sellerName), sellerName, buyerName,
        total: preview.total, currency: preview.currency || 'MYR', items: preview.lines || [],
        cadence: cadenceOf(schedule, lang), tolerance: Number(schedule.price_tolerance_pct),
        link: goLink(a, 'po_approvals')
      }, lang);
    }));
  } catch (e) {
    console.error('[poScheduleNotifications] approval pending error:', e.message);
  }
}

/** 틀 작성자에게 승인/반려 결과. */
async function fireScheduleApprovalResultNotification(schedule, { approved, reason } = {}) {
  try {
    if (!schedule.created_by_user_id) return;
    const { poScheduleEmail } = require('../utils/notificationTemplates');
    const sellerName = await sellerNameOf(schedule);
    const a = await getUserAddressee(schedule.created_by_user_id, schedule.entity_type, schedule.entity_id);
    const list = [{ id: Number(schedule.created_by_user_id), addressee: a }];
    await sendNotificationBatch([schedule.created_by_user_id], 'po_approval_result', mailFor(list, (ad, user) => {
      const lang = user.preferred_language || 'en';
      return poScheduleEmail(approved ? 'approved' : 'rejected', {
        scheduleName: displayName(schedule, sellerName), sellerName, reason,
        cadence: cadenceOf(schedule, lang), link: goLink(ad, 'po_schedules')
      }, lang);
    }));
  } catch (e) {
    console.error('[poScheduleNotifications] approval result error:', e.message);
  }
}

module.exports = {
  fireSchedulePlacedNotification,
  fireScheduleFailedNotification,
  fireScheduleApprovalPendingNotification,
  fireScheduleApprovalResultNotification
};

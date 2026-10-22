/**
 * 발주 오너 승인 헬퍼 (2026-06-21, with MIN Cafe 발주관리 추가요청 #2)
 *
 * 레스토랑 발주를 연결된 Owner(restaurant_managers.relationship_type='ownership')가
 * 승인/반려한다. 오너 연결 시 기본 ON, operation_settings.requirePoOwnerApproval === false 면 OFF.
 *
 * ⚠ **발주가 판매자에게 나가는 경로는 세 곳**이다 — submit / bulk auto_submit /
 *   mark-sent-external(외부업체 수동전송). 셋 다 이 파일의 `applySubmitGate` 를 타야 한다.
 *   게이트를 라우트에 복붙하면 새 경로가 생길 때 조용히 우회된다(실제로 bulk·external 두 경로가
 *   승인 없이 발주를 내보내고 있었다 — Fable 2026-07-13).
 *   + 판매자가 총액을 **올리는** 수정(amend)도 같은 승인을 다시 받는다 — `applyAmendRaiseGate`
 *   (2026-10-15 Fable 설계 · 판매자 대리 주문 추가와 같은 길).
 */
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../config/database');

/** 이 유저가 ownership 관계로 소유한 restaurant_id 배열. */
async function resolveOwnerRestaurantIds(user) {
  if (!user) return [];
  const ids = new Set();
  const rows = await sequelize.query(
    `SELECT restaurant_id FROM restaurant_managers
     WHERE manager_id = :uid AND relationship_type = 'ownership'`,
    { replacements: { uid: user.id }, type: QueryTypes.SELECT });
  rows.forEach(r => ids.add(parseInt(r.restaurant_id, 10)));
  // 레거시 단일 할당
  if (user.role === 'Restaurant Owner' && user.restaurant_id) {
    ids.add(parseInt(user.restaurant_id, 10));
  }
  return [...ids];
}

/** 이 레스토랑에 연결된 오너(ownership)가 있는가. */
async function restaurantHasOwner(restaurantId) {
  const rows = await sequelize.query(
    `SELECT 1 AS x FROM restaurant_managers
     WHERE restaurant_id = :rid AND relationship_type = 'ownership' LIMIT 1`,
    { replacements: { rid: restaurantId }, type: QueryTypes.SELECT });
  return rows.length > 0;
}

/**
 * 이 레스토랑 발주에 오너 승인이 필요한가.
 * 오너 연결 AND operation_settings.requirePoOwnerApproval !== false (기본 ON).
 * @param {object} restaurant - operation_settings 포함 Restaurant 인스턴스
 */
async function isApprovalRequiredForRestaurant(restaurant) {
  if (!restaurant || !restaurant.id) return false;
  const hasOwner = await restaurantHasOwner(restaurant.id);
  if (!hasOwner) return false;
  const setting = restaurant.operation_settings && restaurant.operation_settings.requirePoOwnerApproval;
  return setting !== false; // 오너 연결 시 기본 ON, 명시적 false 만 OFF
}

/**
 * 발주를 판매자에게 내보내기 직전의 **단일 승인 게이트**.
 * 승인이 필요하면 PO 를 `pending_approval` 로, 아니면 `submitted` 로 확정한다.
 *
 * @param {object} po - PurchaseOrder 인스턴스(트랜잭션 안에서 잠근 것)
 * @param {object} t  - transaction
 * @param {function} appendTrackingEvent - 라우트가 쓰는 tracking 헬퍼(순환 require 회피용 주입)
 * @param {object} [actor] - 제출한 사람(req.user). **그 매장의 ownership 오너**면 승인 생략 — 승인자가 작성자다
 *          (2026-10-04 Fable 판정 owner-po-on-behalf ① §2-2). 구매자 쪽 경로만 넘긴다(판매자 대리 추가는 안 넘김).
 * @param {object} [opts] - { preApproved: { scheduleId, approvedByUserId, approvedAt } } — 정기 발주 틀을 오너가 이미 승인했고
 *          스케줄러가 허용폭 안이라고 판정한 경우(2026-10-22 Fable 설계 recurring-po §3-2). 승인이 필요한 매장이어도
 *          «승인을 거친 발주»(approval_required·approved_by·approved_at)로 기록하고 통과한다. 넘길지 말지는 호출부가 정한다.
 * @returns {Promise<boolean>} needsApproval — true 면 호출부는 **판매자 통지·seller-order-created 를
 *          내보내면 안 되고**, 대신 오너 승인 대기 통지를 보내야 한다.
 */
async function applySubmitGate(po, t, appendTrackingEvent, actor, opts = {}) {
  const Restaurant = require('../models/Restaurant');

  let needsApproval = false;
  let byOwner = false;
  if (po.entity_type === 'restaurant') {
    const restaurant = await Restaurant.findByPk(po.entity_id, {
      attributes: ['id', 'operation_settings'], transaction: t
    });
    needsApproval = await isApprovalRequiredForRestaurant(restaurant);
    if (needsApproval && actor) {
      const owned = await resolveOwnerRestaurantIds(actor);
      byOwner = owned.includes(parseInt(po.entity_id, 10));
      if (byOwner) needsApproval = false;
    }
  }

  const pre = opts && opts.preApproved;
  if (needsApproval && pre && pre.approvedByUserId) {
    const when = pre.approvedAt ? new Date(pre.approvedAt).toISOString().slice(0, 10) : '';
    const tracking = appendTrackingEvent(po, 'submitted',
      `Pre-approved by Owner via standing order #${pre.scheduleId}${when ? ` (approved ${when})` : ''}`);
    await po.update({
      status: 'submitted',
      submitted_at: new Date(),
      approval_required: true,
      approved_by_user_id: pre.approvedByUserId,
      approved_at: new Date(),
      tracking_info: tracking
    }, { transaction: t });
    return false;
  }

  if (needsApproval) {
    const tracking = appendTrackingEvent(po, 'pending_approval', 'Awaiting Owner approval');
    await po.update({
      status: 'pending_approval',
      approval_required: true,
      tracking_info: tracking
    }, { transaction: t });
  } else {
    const tracking = byOwner
      ? appendTrackingEvent(po, 'submitted', 'Submitted by Owner (approval skipped)')
      : appendTrackingEvent(po, 'submitted');
    await po.update({
      status: 'submitted',
      submitted_at: new Date(),
      tracking_info: tracking
    }, { transaction: t });
  }
  return needsApproval;
}

/** 이 발주의 구매 매장이 오너 승인을 요구하는가 (판매자 화면 안내·인상 수정 게이트가 같은 판정을 본다). */
async function isApprovalRequiredForPo(po, t) {
  if (!po || po.entity_type !== 'restaurant') return false;
  const Restaurant = require('../models/Restaurant');
  const restaurant = await Restaurant.findByPk(po.entity_id, {
    attributes: ['id', 'operation_settings'], transaction: t
  });
  return isApprovalRequiredForRestaurant(restaurant);
}

/**
 * 판매자가 총액을 올린 수정 뒤의 승인 게이트 (2026-10-15 Fable 설계 §2-2).
 * 오너 승인이 켜진 매장이면 `pending_approval` 로 되돌리고 true. 아니면 **상태를 건드리지 않고** false.
 * (`applySubmitGate` 를 쓰지 않는 이유: 그 함수는 승인이 필요 없을 때 submitted·submitted_at 을 다시 쓴다.)
 * 행위자 예외(오너가 작성자면 생략)는 없다 — 판매자 대리 주문 추가와 같다.
 */
async function applyAmendRaiseGate(po, t, appendTrackingEvent, { totalBefore, totalAfter, byUserId } = {}) {
  if (!(await isApprovalRequiredForPo(po, t))) return false;
  const tracking = appendTrackingEvent(
    po, 'pending_approval',
    `Awaiting Owner approval — seller raised the total ${(+totalBefore || 0).toFixed(2)} → ${(+totalAfter || 0).toFixed(2)}`,
    null,
    {
      raised_by_seller: true,
      status_before: po.status,
      total_before: totalBefore,
      total_after: totalAfter,
      by_user_id: byUserId || null
    }
  );
  await po.update({
    status: 'pending_approval',
    approval_required: true,
    tracking_info: tracking
  }, { transaction: t });
  return true;
}

/**
 * 구매자가 보낸 뒤 발주를 고쳤을 때의 승인 게이트 (2026-10-15 Fable 설계 buyer-po-edit §3-4).
 * 오너 승인 매장이면 인상·감량 불문 pending_approval(Irene «수정도 승인하게»). 행위자가 그 매장 ownership 오너면 생략
 * (applySubmitGate 와 같은 예외 — 승인자가 작성자). 아니면 상태를 건드리지 않고 false.
 * applyAmendRaiseGate(판매자·인상만) 와 다른 함수인 이유: 조건(전부 vs 인상)·행위자 예외(있음 vs 없음)가 다르다.
 */
async function applyBuyerAmendGate(po, t, appendTrackingEvent, { actor, totalBefore, totalAfter } = {}) {
  if (!(await isApprovalRequiredForPo(po, t))) return false;
  if (actor) {
    const owned = await resolveOwnerRestaurantIds(actor);
    if (owned.includes(parseInt(po.entity_id, 10))) return false;
  }
  const tracking = appendTrackingEvent(
    po, 'pending_approval',
    `Awaiting Owner approval — buyer edited the order ${(+totalBefore || 0).toFixed(2)} → ${(+totalAfter || 0).toFixed(2)}`,
    null,
    {
      edited_by_buyer: true,
      status_before: po.status,
      total_before: totalBefore,
      total_after: totalAfter,
      by_user_id: (actor && actor.id) || null
    }
  );
  await po.update({
    status: 'pending_approval',
    approval_required: true,
    tracking_info: tracking
  }, { transaction: t });
  return true;
}

/**
 * 오너 승인취소(승인 → 다시 승인 대기) 가능 판정 (2026-10-22 Fable 설계 owner-po-approval-revoke §1-1).
 * revoke 라우트와 목록·상세의 `approval_revocable` 플래그가 **같은 함수**를 본다(검사와 수정은 같은 조건).
 * 외부 공급업체 = 받기 전 전부 · 가입 공급업체 = 판매자 확인 전(submitted)만 · 결제된 발주는 불가(돈 무접촉).
 * @param {object} po - status·approved_at·payment_status 를 가진 발주(인스턴스 또는 평범한 객체)
 * @param {boolean} isExternal - utils/sellerNames.isExternalSeller 결과
 * @returns {{ok:true}|{ok:false, code:'NOT_APPROVED'|'PAID'|'RECEIVED'|'SELLER_CONFIRMED'|'BAD_STATUS'}}
 */
const REVOKABLE_EXTERNAL = ['submitted', 'confirmed', 'shipped', 'in_transit', 'delivered'];
const REVOKABLE_REGISTERED = ['submitted'];
function canRevokeApproval(po, isExternal) {
  if (!po || !po.approved_at) return { ok: false, code: 'NOT_APPROVED' };
  if (po.payment_status === 'paid') return { ok: false, code: 'PAID' };
  if (['received', 'partial_received', 'closed'].includes(po.status)) return { ok: false, code: 'RECEIVED' };
  const allowed = isExternal ? REVOKABLE_EXTERNAL : REVOKABLE_REGISTERED;
  if (!allowed.includes(po.status)) return { ok: false, code: isExternal ? 'BAD_STATUS' : 'SELLER_CONFIRMED' };
  return { ok: true };
}

module.exports = {
  canRevokeApproval,
  applyBuyerAmendGate,
  resolveOwnerRestaurantIds,
  restaurantHasOwner,
  isApprovalRequiredForRestaurant,
  isApprovalRequiredForPo,
  applySubmitGate,
  applyAmendRaiseGate
};

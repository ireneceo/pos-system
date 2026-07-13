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
 * @returns {Promise<boolean>} needsApproval — true 면 호출부는 **판매자 통지·seller-order-created 를
 *          내보내면 안 되고**, 대신 오너 승인 대기 통지를 보내야 한다.
 */
async function applySubmitGate(po, t, appendTrackingEvent) {
  const Restaurant = require('../models/Restaurant');

  let needsApproval = false;
  if (po.entity_type === 'restaurant') {
    const restaurant = await Restaurant.findByPk(po.entity_id, {
      attributes: ['id', 'operation_settings'], transaction: t
    });
    needsApproval = await isApprovalRequiredForRestaurant(restaurant);
  }

  if (needsApproval) {
    const tracking = appendTrackingEvent(po, 'pending_approval', 'Awaiting Owner approval');
    await po.update({
      status: 'pending_approval',
      approval_required: true,
      tracking_info: tracking
    }, { transaction: t });
  } else {
    const tracking = appendTrackingEvent(po, 'submitted');
    await po.update({
      status: 'submitted',
      submitted_at: new Date(),
      tracking_info: tracking
    }, { transaction: t });
  }
  return needsApproval;
}

module.exports = {
  resolveOwnerRestaurantIds,
  restaurantHasOwner,
  isApprovalRequiredForRestaurant,
  applySubmitGate
};

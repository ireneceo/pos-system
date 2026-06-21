/**
 * 발주 오너 승인 헬퍼 (2026-06-21, with MIN Cafe 발주관리 추가요청 #2)
 *
 * 레스토랑 발주를 연결된 Owner(restaurant_managers.relationship_type='ownership')가
 * 승인/반려한다. 오너 연결 시 기본 ON, operation_settings.requirePoOwnerApproval === false 면 OFF.
 *
 * submit 게이트(purchase-orders-workflow.js)와 승인 라우터(purchase-orders-approval.js)가 공유.
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

module.exports = {
  resolveOwnerRestaurantIds,
  restaurantHasOwner,
  isApprovalRequiredForRestaurant
};

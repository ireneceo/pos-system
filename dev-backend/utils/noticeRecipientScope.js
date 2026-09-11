/**
 * 받은 공지의 수신 조건(NoticeRecipient where 절의 [Op.or] 목록) — **단일 소스** (2026-09-11).
 *
 * `GET /api/notices/received`(공지 목록) · `POST /api/notices/mark-all-read`(공지 화면 «모두 읽음») ·
 * `/api/inbox`(알림함 목록·안 읽음 수·읽음 처리)가 전부 이 함수를 쓴다. 두 곳이 다른 범위를 쓰면
 * «알림함은 0 인데 공지 화면엔 안 읽은 공지가 있다» 가 된다 — 실제로 인박스는 브랜드·푸드코트 총괄의
 * 매장 범위를 넣지 않고 있었다(주석은 «공지 화면과 같은 범위» 라고 적혀 있었다).
 */
const { Op } = require('sequelize');
const { RestaurantManager, Brand, Restaurant, Foodcourt } = require('../models');

async function receivedRecipientConditions(user) {
  const recipientConditions = [];

  // 1) Notices where user is a direct user_id recipient
  recipientConditions.push({ user_id: user.id });

  // 2) Notices where user's restaurant is a recipient
  if (user.restaurant_id) {
    recipientConditions.push({ restaurant_id: user.restaurant_id });
  }

  // 3) For Restaurant Owner: notices to any owned restaurant
  if (user.role === 'Restaurant Owner') {
    const ownedLinks = await RestaurantManager.findAll({
      where: { manager_id: user.id, relationship_type: 'ownership' },
      attributes: ['restaurant_id']
    });
    const ownedIds = ownedLinks.map(l => l.restaurant_id);
    if (ownedIds.length > 0) {
      recipientConditions.push({ restaurant_id: { [Op.in]: ownedIds } });
    }
  }

  // 4) For Brand General: notices targeted to ALL their brands
  if (user.role === 'Brand General') {
    const brands = await Brand.findAll({ where: { owner_id: user.id } });
    for (const brand of brands) {
      const brandRestaurants = await Restaurant.findAll({ where: { brand_id: brand.id }, attributes: ['id'] });
      const brIds = brandRestaurants.map(r => r.id);
      if (brIds.length > 0) {
        recipientConditions.push({ restaurant_id: { [Op.in]: brIds } });
      }
    }
  }

  // 5) For Foodcourt General: notices targeted to ALL their foodcourts
  if (user.role === 'Foodcourt General') {
    const foodcourts = await Foodcourt.findAll({ where: { owner_id: user.id } });
    for (const foodcourt of foodcourts) {
      const fcRestaurants = await Restaurant.findAll({ where: { foodcourt_id: foodcourt.id }, attributes: ['id'] });
      const fcIds = fcRestaurants.map(r => r.id);
      if (fcIds.length > 0) {
        recipientConditions.push({ restaurant_id: { [Op.in]: fcIds } });
      }
    }
  }

  return recipientConditions;
}

module.exports = { receivedRecipientConditions };

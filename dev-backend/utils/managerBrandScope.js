/**
 * 브랜드 소속 판정 단일 소스 (2026-09-08)
 *
 * ## 왜 생겼나
 * `/api/orders`(orders-crud.js)와 `manager-sales.js` 가 Brand General 범위를
 * **`Brand.owner_id` 하나로만** 잡고 있었다. 그런데 이 솔루션에서 브랜드 사람은 두 갈래다:
 *   ① 브랜드를 **소유**한 사람 (`brands.owner_id`)
 *   ② 브랜드에 **배정된** 사람 (`users.brand_id`) — Brand General/Manager 로 붙여 둔 계정
 *
 * ②가 빠져 있어서, 배정만 된 Brand General 은 주문이 **0건**으로 왔다.
 * 매장 목록은 다른 경로(브랜드 기준)로 오기 때문에 화면엔 **매장은 보이는데 숫자만 0** 으로 나온다.
 * 운영 실측(2026-09-08): `with MIN Cafe`(매장 10, 브랜드 1) — DB 25건/RM 1,352.29 인데
 * 소유자 계정은 25건, 배정 계정은 0건을 받았다. 같은 역할·같은 브랜드인데 사람마다 달랐다.
 *
 * ⛔ 형제 브랜드(같은 소유자의 다른 브랜드)는 여기 넣지 않는다 — 이 신고가 요구하지 않고,
 *    권한을 필요 이상으로 넓히지 않는다.
 */
const { Op } = require('sequelize');

/**
 * 이 사용자가 볼 수 있는 브랜드 id 들 — **소유 ∪ 배정**.
 * @param {{id:number, role:string, brand_id?:number|null}} user
 * @returns {Promise<number[]>}
 */
async function brandIdsForUser(user) {
  if (!user || !['Brand General', 'Brand Manager'].includes(user.role)) return [];
  const Brand = require('../models/Brand');
  const ids = new Set();

  const owned = await Brand.findAll({ where: { owner_id: user.id }, attributes: ['id'] });
  owned.forEach((b) => ids.add(b.id));

  // 배정된 브랜드 — 실제로 존재하는 브랜드일 때만 (지워진 브랜드 id 가 남아 있을 수 있다)
  const assigned = parseInt(user.brand_id, 10);
  if (Number.isFinite(assigned)) {
    const exists = await Brand.findByPk(assigned, { attributes: ['id'] });
    if (exists) ids.add(exists.id);
  }
  return [...ids];
}

/** 위 브랜드들에 속한 매장 id 들. */
async function brandRestaurantIdsForUser(user) {
  const brandIds = await brandIdsForUser(user);
  if (!brandIds.length) return [];
  const Restaurant = require('../models/Restaurant');
  const rs = await Restaurant.findAll({ where: { brand_id: { [Op.in]: brandIds } }, attributes: ['id'] });
  return rs.map((r) => r.id);
}

module.exports = { brandIdsForUser, brandRestaurantIdsForUser };

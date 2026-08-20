'use strict';
/**
 * 공개 quick-login(데모/테스트 카드)이 **닿을 수 있는 매장** 집합.
 *
 * ── 왜 별도 단일소스인가 ───────────────────────────────────────────────────
 * 이 집합은 두 곳에서 쓰인다: ①로그인 가드(`services/authService.js` loginAsDemo)
 * ②영구 계약 검사(`scripts/health-check.js` security). 두 곳이 각자 쿼리를 들고 있으면
 * 한쪽만 고쳐져 **검사가 통과하는데 구멍은 열려 있는** 상태가 만들어진다.
 *
 * ── 집합의 성격: superset ──────────────────────────────────────────────────
 * `middleware/auth.js` 의 `userCanAccessRestaurant` 부여 경로를 **역할·관계유형 구분 없이
 * 통째로 합쳤다.** 실판정보다 넓다. fail-closed 가드는 과차단이 안전하고 미차단이 결함이다
 * (좁게 잡았다가 실제 부여 테이블 `restaurant_managers` 를 빠뜨려 구멍이 남았던 전례가 있다).
 */

const REACHABLE_SQL = `
  SELECT r.id, r.name, r.is_demo FROM restaurants r
   WHERE r.id = :rid
      OR r.admin_id = :uid
      OR r.id IN (SELECT rm.restaurant_id FROM restaurant_managers rm WHERE rm.manager_id = :uid)
      OR r.brand_id IN (SELECT b.id FROM brands b WHERE b.owner_id = :uid)
      OR (:bid IS NOT NULL AND r.brand_id = :bid)
      OR r.foodcourt_id IN (SELECT f.id FROM foodcourts f WHERE f.owner_id = :uid)
      OR (:fid IS NOT NULL AND r.foodcourt_id = :fid)
      OR r.id IN (
           SELECT uc.entity_id FROM user_contexts uc
            WHERE uc.user_id = :uid AND uc.entity_type = 'restaurant'
         )`;

/**
 * @param {object} sequelize  Sequelize 인스턴스
 * @param {{id:number, restaurant_id?:number|null, brand_id?:number|null, foodcourt_id?:number|null}} user
 * @returns {Promise<Array<{id:number,name:string,is_demo:number}>>}
 *   조회가 깨지면 예외를 그대로 올린다 — 판정 불가 시 빈 배열을 돌려주면 fail-open 이 된다.
 */
async function findReachableRestaurants(sequelize, user) {
  return sequelize.query(REACHABLE_SQL, {
    replacements: {
      rid: user.restaurant_id || 0,
      uid: user.id,
      bid: user.brand_id || null,
      fid: user.foodcourt_id || null
    },
    type: sequelize.QueryTypes.SELECT
  });
}

/** 닿는 매장 중 데모가 아닌 첫 매장(없으면 null). 가드·계약 검사 공통 판정. */
async function findReachableRealRestaurant(sequelize, user) {
  const rows = await findReachableRestaurants(sequelize, user);
  return (rows || []).find((r) => !r.is_demo) || null;
}

module.exports = { findReachableRestaurants, findReachableRealRestaurant, REACHABLE_SQL };

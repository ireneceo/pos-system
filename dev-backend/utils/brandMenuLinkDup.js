/**
 * 한 매장에 같은 브랜드 메뉴를 가리키는 상품이 둘 이상인 묶음 — 탐지 술어 단일 소스
 * (2026-10-07 Fable 판정 B · docs/TRADE_STRUCTURE.md ③). 내려보내기(brandMenuSyncService)는 매장당 한 행을
 * findOne 으로 집어 갱신하므로 둘이면 나머지 행은 영원히 옛값이 된다. 인스펙션 BM-LINK-001 과
 * 유일 인덱스 마이그(migrate-products-brand-menu-unique)가 같은 조건을 쓴다.
 */
const BRAND_MENU_DUP_GROUPS_SQL = `
  SELECT restaurant_id, brand_menu_id, COUNT(*) n
    FROM products
   WHERE brand_menu_id IS NOT NULL
   GROUP BY restaurant_id, brand_menu_id
  HAVING COUNT(*) > 1`;

module.exports = { BRAND_MENU_DUP_GROUPS_SQL };

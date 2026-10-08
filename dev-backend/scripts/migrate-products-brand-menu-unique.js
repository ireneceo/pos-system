/**
 * products 에 «한 매장 · 한 브랜드 메뉴 = 상품 한 줄» 유일 규칙 (2026-10-07 Fable 판정 B · docs/TRADE_STRUCTURE.md ③)
 *
 * ① 이미 같은 (restaurant_id, brand_menu_id) 묶음이 둘 이상이면 **인덱스를 만들지 않고 실패**한다
 *    → 먼저 `node scripts/adopt-restaurant-menus-to-brand.js --fix-shared` 로 갈라낸 뒤 다시 실행.
 *    (술어는 utils/brandMenuLinkDup — 인스펙션 BM-LINK-001 과 같은 SQL)
 * ② 없으면 UNIQUE INDEX uq_products_restaurant_brand_menu (restaurant_id, brand_menu_id) 추가.
 *    MySQL 은 NULL 을 유일성에서 빼므로 brand_menu_id 가 빈 매장 자체 상품은 제한 없음.
 * 성질: 멱등(인덱스 있으면 skip) · 데이터 무변경 · 되돌리기 = DROP INDEX uq_products_restaurant_brand_menu.
 * 모델(Product.js)에는 선언하지 않는다 — 같은 표의 idx_brand_menu 도 마이그로만 관리(sync --alter 중복 인덱스 위험).
 */
require('dotenv/config');
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');
const { BRAND_MENU_DUP_GROUPS_SQL } = require('../utils/brandMenuLinkDup');

const INDEX = 'uq_products_restaurant_brand_menu';

async function main() {
  const exists = await sequelize.query(
    `SELECT 1 FROM information_schema.STATISTICS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'products' AND INDEX_NAME = ? LIMIT 1`,
    { replacements: [INDEX], type: QueryTypes.SELECT }
  );
  if (exists.length) { console.log(`[brand-menu-unique] ${INDEX} 이미 있음 — skip`); return; }
  const dups = await sequelize.query(BRAND_MENU_DUP_GROUPS_SQL, { type: QueryTypes.SELECT });
  if (dups.length) {
    for (const d of dups.slice(0, 10)) console.error(`[brand-menu-unique] 공유 묶음: 매장 ${d.restaurant_id} · 브랜드 메뉴 ${d.brand_menu_id} · 상품 ${d.n}개`);
    throw new Error(`공유 묶음 ${dups.length}개 — adopt-restaurant-menus-to-brand.js --fix-shared 를 먼저 실행하세요`);
  }
  await sequelize.query(`ALTER TABLE products ADD UNIQUE INDEX ${INDEX} (restaurant_id, brand_menu_id)`);
  console.log(`[brand-menu-unique] ${INDEX} 추가`);
}

main()
  .then(() => process.exit(0))
  .catch((e) => { console.error('[brand-menu-unique] 실패:', e.message); process.exit(1); });

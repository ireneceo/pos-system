// 브랜드 메뉴의 «어느 매장이 추가했는가» 칸 (2026-09-17 Fable 판정 R4).
//   null = 브랜드가 직접 만든 것. 매장에서 올라온 메뉴만 값이 찬다.
// 멱등 — information_schema 먼저 확인. Usage: node scripts/migrate-brand-menu-origin-restaurant.js
const { sequelize } = require('../config/database');

(async () => {
  const [rows] = await sequelize.query(
    `SELECT COLUMN_NAME FROM information_schema.COLUMNS
      WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'brand_menus' AND COLUMN_NAME = 'origin_restaurant_id'`);
  if (rows.length > 0) {
    console.log('= brand_menus.origin_restaurant_id 이미 있음');
  } else {
    await sequelize.query(
      `ALTER TABLE brand_menus ADD COLUMN origin_restaurant_id INT NULL DEFAULT NULL
         COMMENT '매장에서 올라온 메뉴의 출처 매장 (null = 브랜드가 직접 만듦)'`);
    console.log('+ brand_menus.origin_restaurant_id 추가');
  }
  console.log('Done.');
  process.exit(0);
})().catch(err => { console.error('Migration failed:', err); process.exit(1); });

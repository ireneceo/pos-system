// 브랜드 메뉴 «메뉴 코드» 칸 (2026-11-08 Irene «브랜드 메뉴 넣을 때 왜 메뉴 코드입력하는 곳이 없어? 메뉴들 다 코드가 있어야지»).
//   매장 상품 products.code(VARCHAR 20) 와 같은 크기. 브랜드가 내려보낼 때 매장 상품 code 로 복사된다.
// 채우기(한 번만 의미 있음 · 멱등): 코드가 빈 브랜드 메뉴 중, 연결된 매장 상품들이 «비지 않은 코드 1종류» 로
//   일치하면 그 코드를 브랜드 메뉴에 채운다. 매장마다 코드가 다르면(2종 이상) 손대지 않는다 — 브랜드가 정한다.
//   같은 브랜드 안 다른 메뉴가 이미 그 코드를 쓰면 채우지 않는다(브랜드 안 코드 중복 금지와 같은 기준).
// Usage: node scripts/migrate-brand-menu-code.js
const { sequelize } = require('../config/database');

(async () => {
  const [rows] = await sequelize.query(
    `SELECT COLUMN_NAME FROM information_schema.COLUMNS
      WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'brand_menus' AND COLUMN_NAME = 'code'`);
  if (rows.length > 0) {
    console.log('= brand_menus.code 이미 있음');
  } else {
    await sequelize.query(
      `ALTER TABLE brand_menus ADD COLUMN code VARCHAR(20) NULL DEFAULT NULL
         COMMENT '메뉴 코드 — 내려보낼 때 매장 products.code 로 복사' AFTER name`);
    console.log('+ brand_menus.code 추가');
  }

  const [cands] = await sequelize.query(
    `SELECT bm.id, bm.brand_id, MIN(TRIM(p.code)) AS code
       FROM brand_menus bm
       JOIN products p ON p.brand_menu_id = bm.id AND p.code IS NOT NULL AND TRIM(p.code) <> ''
      WHERE bm.code IS NULL OR TRIM(bm.code) = ''
      GROUP BY bm.id, bm.brand_id
     HAVING COUNT(DISTINCT UPPER(TRIM(p.code))) = 1`);
  let filled = 0, skipped = 0;
  for (const c of cands) {
    const [dup] = await sequelize.query(
      `SELECT id FROM brand_menus WHERE brand_id = :b AND id <> :id AND UPPER(TRIM(code)) = UPPER(:code) LIMIT 1`,
      { replacements: { b: c.brand_id, id: c.id, code: c.code } });
    if (dup.length) { skipped++; continue; }
    await sequelize.query(`UPDATE brand_menus SET code = :code WHERE id = :id AND (code IS NULL OR TRIM(code) = '')`,
      { replacements: { code: String(c.code).slice(0, 20), id: c.id } });
    filled++;
  }
  console.log(`  매장 코드로 채움 ${filled}건 · 브랜드 안 중복이라 건너뜀 ${skipped}건`);
  console.log('Done.');
  process.exit(0);
})().catch(err => { console.error('Migration failed:', err); process.exit(1); });

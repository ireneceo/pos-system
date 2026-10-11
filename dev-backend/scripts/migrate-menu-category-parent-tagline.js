/**
 * 매장 메뉴 2단 카테고리 + 메뉴 한 줄 소개 칸 (2026-10-11 Fable 판정 · docs/MENU_CATEGORY_TWO_LEVEL.md)
 *
 * ① categories.parent_id INT NULL — 없을 때만 추가 (기존 행 전부 NULL = 1단, 지금과 같음)
 * ② products.tagline VARCHAR(80) NULL — 없을 때만 추가
 *
 * 성질: 멱등(두 번째 실행 0건) · 칸 추가만, 기존 값 무변경 · 다른 마이그가 이 칸을 읽지 않음
 * 되돌리기 = 칸을 남긴 채 옛 코드(옛 코드는 칸을 안 읽음).
 */
require('dotenv/config');
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');

async function addColumnIfMissing(table, column, ddl) {
  const cols = await sequelize.query(
    `SELECT COLUMN_NAME FROM information_schema.COLUMNS
      WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = :table AND COLUMN_NAME = :column`,
    { type: QueryTypes.SELECT, replacements: { table, column } }
  );
  if (cols.length) {
    console.log(`[menu-category-two-level] ${table}.${column} 이미 존재 — skip`);
    return;
  }
  await sequelize.query(`ALTER TABLE \`${table}\` ADD COLUMN ${ddl}`);
  console.log(`[menu-category-two-level] ${table}.${column} 추가`);
}

async function main() {
  await addColumnIfMissing('categories', 'parent_id',
    "`parent_id` INT NULL DEFAULT NULL COMMENT 'Parent category id (2-level menu categories). NULL = top level'");
  await addColumnIfMissing('products', 'tagline',
    "`tagline` VARCHAR(80) NULL DEFAULT NULL COMMENT 'One-line pitch shown on menu list cards'");
  console.log('[menu-category-two-level] 완료');
}

main()
  .then(() => process.exit(0))
  .catch((e) => { console.error('[menu-category-two-level] 실패:', e.message); process.exit(1); });

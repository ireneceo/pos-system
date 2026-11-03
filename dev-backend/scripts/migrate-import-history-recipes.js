// 레시피 CSV 업로드 기록 (2026-11-03 Fable 설계 · docs/RECIPE_MANAGEMENT_SYSTEM.md «CSV 업로드 + 표 보기» §6)
//
// Irene 원문: «레시피 관리 페이지들에 CSV 업로드도 있어야 해 … 레시피 관리가 힘들어.»
//
// import_history 를 브랜드 배치도 담게 넓힌다:
//   - import_type 에 'recipes' (⛔ ENUM 은 expand-only — 내 값만 보장)
//   - owner_type ('restaurant'|'brand', 기본 restaurant — 옛 행 그대로) · brand_id · restaurant_id NULL 허용
//   - undo_snapshot LONGTEXT (수정한 레시피의 이전 모습 — 되돌리기용)
// 멱등. 백필 없음.
// Usage: node scripts/migrate-import-history-recipes.js

const { sequelize } = require('../config/database');
const { expandEnum } = require('./lib/enumExpand');

async function columns() {
  const rows = await sequelize.query(
    `SELECT COLUMN_NAME AS name, IS_NULLABLE AS nullable FROM information_schema.COLUMNS
      WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'import_history'`,
    { type: sequelize.QueryTypes.SELECT });
  return Object.fromEntries(rows.map(r => [r.name, r]));
}

(async () => {
  await expandEnum(sequelize, 'import_history', 'import_type', ['recipes']);
  console.log('+ import_history.import_type 에 recipes 보장');

  let cols = await columns();
  if (!cols.owner_type) {
    await sequelize.query(`ALTER TABLE import_history ADD COLUMN owner_type ENUM('restaurant','brand') NOT NULL DEFAULT 'restaurant' AFTER batch_id`);
    console.log('+ owner_type 추가');
  }
  if (!cols.brand_id) {
    await sequelize.query(`ALTER TABLE import_history ADD COLUMN brand_id INT NULL AFTER owner_type`);
    console.log('+ brand_id 추가');
  }
  if (cols.restaurant_id && cols.restaurant_id.nullable === 'NO') {
    await sequelize.query(`ALTER TABLE import_history MODIFY COLUMN restaurant_id INT NULL`);
    console.log('+ restaurant_id NULL 허용');
  }
  if (!cols.undo_snapshot) {
    await sequelize.query(`ALTER TABLE import_history ADD COLUMN undo_snapshot LONGTEXT NULL`);
    console.log('+ undo_snapshot 추가');
  }
  console.log('migrate-import-history-recipes 완료');
  process.exit(0);
})().catch((e) => {
  console.error('migrate-import-history-recipes 실패:', e.message);
  process.exit(1);
});

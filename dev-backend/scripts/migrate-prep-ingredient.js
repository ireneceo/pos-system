/**
 * 준비된 재고(1차 가공 재고) — 자리 만들기 (2026-09-17 Fable 판정 «길 나»)
 *   docs/RECIPE_MANAGEMENT_SYSTEM.md §6
 *
 *   ① ingredients.source_recipe_id  — 재료의 **세 번째 출처**: «만드는 것 = 레시피»
 *      - FK → recipes(id) ON DELETE SET NULL (레시피가 지워져도 재고 행·수량은 남아야 한다)
 *      - UNIQUE — 레시피 1개 ↔ 준비 재료 1행
 *   ② inventory_transactions.transaction_type 에 'production' 추가 (**expand-only**)
 *
 * 멱등 — 이미 있으면 건너뛴다. 기존 행·차감 경로에 영향 없음(전부 NULL 로 시작).
 * Usage: node scripts/migrate-prep-ingredient.js
 */
const { sequelize } = require('../config/database');
const { expandEnum } = require('./lib/enumExpand');

async function hasColumn(table, column) {
  const [rows] = await sequelize.query(
    `SELECT COLUMN_NAME FROM information_schema.COLUMNS
      WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = :t AND COLUMN_NAME = :c`,
    { replacements: { t: table, c: column } });
  return rows.length > 0;
}

async function hasIndex(table, indexName) {
  const [rows] = await sequelize.query(
    `SELECT INDEX_NAME FROM information_schema.STATISTICS
      WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = :t AND INDEX_NAME = :i LIMIT 1`,
    { replacements: { t: table, i: indexName } });
  return rows.length > 0;
}

async function hasConstraint(table, name) {
  const [rows] = await sequelize.query(
    `SELECT CONSTRAINT_NAME FROM information_schema.TABLE_CONSTRAINTS
      WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = :t AND CONSTRAINT_NAME = :c LIMIT 1`,
    { replacements: { t: table, c: name } });
  return rows.length > 0;
}

(async () => {
  // ① 컬럼
  if (await hasColumn('ingredients', 'source_recipe_id')) {
    console.log('= ingredients.source_recipe_id 이미 있음');
  } else {
    await sequelize.query(
      `ALTER TABLE ingredients ADD COLUMN source_recipe_id INT NULL DEFAULT NULL
         COMMENT '이 재료를 만드는 준비 레시피(recipes.id). 사는 것/파는 것/만드는 것 중 하나'`);
    console.log('+ ingredients.source_recipe_id 추가');
  }

  // UNIQUE — 레시피 하나가 재료 두 줄을 만들지 못하게
  if (await hasIndex('ingredients', 'uniq_ingredients_source_recipe')) {
    console.log('= UNIQUE uniq_ingredients_source_recipe 이미 있음');
  } else {
    await sequelize.query(
      `ALTER TABLE ingredients ADD CONSTRAINT uniq_ingredients_source_recipe UNIQUE (source_recipe_id)`);
    console.log('+ UNIQUE uniq_ingredients_source_recipe 추가');
  }

  // FK — 레시피가 지워져도 재고 행은 남긴다(수량·장부가 사라지면 안 된다)
  if (await hasConstraint('ingredients', 'fk_ingredients_source_recipe')) {
    console.log('= FK fk_ingredients_source_recipe 이미 있음');
  } else {
    await sequelize.query(
      `ALTER TABLE ingredients ADD CONSTRAINT fk_ingredients_source_recipe
         FOREIGN KEY (source_recipe_id) REFERENCES recipes(id) ON DELETE SET NULL ON UPDATE CASCADE`);
    console.log('+ FK fk_ingredients_source_recipe 추가');
  }

  // ② ENUM — 목록 교체 금지, 부족한 값만 더한다
  const r = await expandEnum(sequelize, 'inventory_transactions', 'transaction_type', ['production']);
  console.log(r.added.length ? `+ transaction_type 에 ${r.added.join(',')} 추가` : '= transaction_type 에 production 이미 있음');
  console.log(`  현재 값: ${r.current.join(', ')}`);

  console.log('Done.');
  process.exit(0);
})().catch(err => { console.error('Migration failed:', err); process.exit(1); });

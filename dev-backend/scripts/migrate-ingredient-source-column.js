/**
 * Migration (deploy · 멱등): `ingredients.source_product_ingredient_id` 컬럼 + 인덱스.
 *
 * 배경: docs/INGREDIENT_UNIFICATION_DESIGN.md §3-1.
 *   재료의 유일한 입력처는 Stock Items(product_ingredients) 이고, `ingredients` 의 브랜드 행은
 *   그 거울이다. 한 Stock Item 이 여러 브랜드에 공유되면 거울이 여럿이므로 열쇠는 **거울 쪽**에 둔다
 *   (거울 N → Stock Item 1). 구 `product_ingredients.linked_ingredient_id` 는 1:1 이라 쓸 수 없다.
 *
 * 이 스크립트는 **스키마만** 만든다. 값 채우기는 통합 마이그(별도, manual)에서 한다.
 * 외래키 제약은 걸지 않는다 — Stock Item 이 비활성/삭제돼도 거울의 이력은 살아야 한다
 * (구 컬럼과 같은 판단, `models/ProductIngredient.js` 주석 참조).
 *
 * 멱등: 컬럼/인덱스가 이미 있으면 건너뛴다. 매 배포 재실행 안전.
 * process.exit 필수 ([[reference_deploy_migration_must_exit]]).
 */
require('dotenv').config();
const { sequelize } = require('../config/database');

const COLUMNS = [
  { name: 'source_product_ingredient_id', index: 'ingredients_source_product_ingredient_id',
    comment: '이 행이 거울인 Stock Item(product_ingredients.id). null 이면 거울이 아님' },
  // 출처 둘 중 하나 (2026-09-04): 파는 것(프로덕트)이 출처인 거울.
  { name: 'source_brand_product_id', index: 'ingredients_source_brand_product_id',
    comment: '이 행이 거울인 브랜드 프로덕트(brand_products.id). Stock Item 출처와 둘 중 하나만' },
];

(async () => {
  try {
    for (const c of COLUMNS) {
      const [cols] = await sequelize.query(
        `SELECT COLUMN_NAME FROM information_schema.COLUMNS
          WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'ingredients' AND COLUMN_NAME = :c`,
        { replacements: { c: c.name } });
      if (cols.length) console.log(`  – ingredients.${c.name} 이미 있음 (skip)`);
      else {
        await sequelize.query(`ALTER TABLE ingredients ADD COLUMN ${c.name} INT NULL COMMENT '${c.comment}'`);
        console.log(`  ✔ ingredients.${c.name} 추가`);
      }
      const [idx] = await sequelize.query(
        `SELECT INDEX_NAME FROM information_schema.STATISTICS
          WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'ingredients' AND INDEX_NAME = :i`,
        { replacements: { i: c.index } });
      if (idx.length) console.log(`  – 인덱스 ${c.index} 이미 있음 (skip)`);
      else {
        await sequelize.query(`CREATE INDEX ${c.index} ON ingredients (${c.name})`);
        console.log(`  ✔ 인덱스 ${c.index} 생성`);
      }
    }

    // 증명: 컬럼·인덱스가 실제로 있는지 다시 읽는다(판정 기계부터 의심한다).
    for (const c of COLUMNS) {
      const [v] = await sequelize.query(
        `SELECT
           (SELECT COUNT(*) FROM information_schema.COLUMNS
             WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME='ingredients' AND COLUMN_NAME=:c) col_ok,
           (SELECT COUNT(*) FROM information_schema.STATISTICS
             WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME='ingredients' AND INDEX_NAME=:i) idx_ok`,
        { replacements: { c: c.name, i: c.index } });
      const { col_ok, idx_ok } = v[0];
      console.log(`  증명 ${c.name}: 컬럼 ${col_ok} · 인덱스 ${idx_ok}`);
      if (!Number(col_ok) || !Number(idx_ok)) throw new Error(`${c.name} 적용 후 확인 실패`);
    }
    process.exit(0);
  } catch (e) {
    console.error('  ⛔ 실패:', e.message);
    process.exit(1);
  }
})();

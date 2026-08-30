/**
 * Migration: product_recipe_ingredients 에 UNIQUE (recipe_id, ingredient_id) 추가.
 *
 * 배경 (2026-08-30):
 *   형제 테이블 `recipe_ingredients`(레스토랑 레시피)에는 "한 레시피에 같은 재료는 1행"
 *   불변식이 유니크 인덱스로 걸려 있는데, brand 축인 `product_recipe_ingredients` 에만 없었다.
 *   같은 재료가 2행 들어가면 BG BOM 이 이중이 되어 **입고 시 재고 차감과 원가가 그만큼
 *   이중 계산**된다([[reference_po_return_stock_symmetry]]). API 로 도달 가능한 실제 경로다.
 *
 * 안전:
 *   - 인덱스만 추가. 기존 row/데이터 미수정 (행수 보존을 스스로 검증한다).
 *   - 멱등 (이미 있으면 skip). sync-database --alter 의존 금지([[reference_sync_alter_drops_columns]]).
 *   - 기존 중복이 있으면 **인덱스를 만들지 않고 실패**한다 — 조용히 행을 지우지 않는다.
 *     (착수 전 실측: dev 0건 / 운영 0건 · 운영 73행)
 *   - 인쇄 무관. process.exit 필수([[reference_deploy_migration_must_exit]]).
 *
 * 사용: node scripts/migrate-product-recipe-ingredient-unique.js
 */

require('dotenv').config();
const { sequelize } = require('../config/database');

const TABLE = 'product_recipe_ingredients';
const IDX = 'unique_product_recipe_ingredient';

(async () => {
  try {
    console.log('[migrate-product-recipe-ingredient-unique] Starting...');

    const [before] = await sequelize.query(`SELECT COUNT(*) AS c FROM ${TABLE}`);
    const rowsBefore = Number(before[0].c);
    console.log(`  현재 행수: ${rowsBefore}`);

    const [idx] = await sequelize.query(`SHOW INDEX FROM ${TABLE} WHERE Key_name = '${IDX}'`);
    if (idx.length > 0) {
      console.log(`  ✓ ${IDX} already exists — skip`);
      process.exit(0);
    }

    // 중복이 있으면 인덱스 생성이 실패한다. 먼저 재서 **사람이 판단할 수 있게** 보여준다.
    const [dups] = await sequelize.query(
      `SELECT recipe_id, ingredient_id, COUNT(*) AS c FROM ${TABLE}
       GROUP BY recipe_id, ingredient_id HAVING c > 1`
    );
    if (dups.length > 0) {
      console.error(`  ✗ 중복 ${dups.length}건 — 인덱스를 만들지 않고 중단한다(행을 지우지 않는다).`);
      dups.slice(0, 20).forEach(d =>
        console.error(`      recipe_id=${d.recipe_id} ingredient_id=${d.ingredient_id} → ${d.c}행`));
      console.error('    이중 BOM 후보다. 정리 방침을 정한 뒤 다시 실행할 것.');
      process.exit(1);
    }

    console.log(`  Adding UNIQUE INDEX ${IDX} (recipe_id, ingredient_id)...`);
    await sequelize.query(`ALTER TABLE ${TABLE} ADD UNIQUE INDEX ${IDX} (recipe_id, ingredient_id)`);

    const [after] = await sequelize.query(`SELECT COUNT(*) AS c FROM ${TABLE}`);
    const rowsAfter = Number(after[0].c);
    if (rowsAfter !== rowsBefore) {
      console.error(`  ✗ 행수가 변했다: ${rowsBefore} → ${rowsAfter}`);
      process.exit(1);
    }
    console.log(`  ✓ 인덱스 추가 완료 · 행수 보존 확인 (${rowsBefore} → ${rowsAfter})`);
    process.exit(0);
  } catch (e) {
    console.error('  ✗ Migration failed:', e.message);
    process.exit(1);
  }
})();

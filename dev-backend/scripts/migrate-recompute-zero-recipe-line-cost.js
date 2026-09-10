#!/usr/bin/env node
/**
 * Migration — **0 으로 박혀 있는 레시피 줄 원가**를 재료 단가에서 다시 계산한다.
 *
 * 배경 (2026-09-10 Fable 판정 · B-3):
 *   v3.87 이전에는 저장 라우트가 «화면이 보낸 숫자»를 그대로 넣었다. 그 화면이 이름·원가를
 *   API 값이 아니라 선택기 목록에서 다시 찾다 못 찾으면 0 을 보냈고, 그대로 저장됐다
 *   (운영 실측 2026-09-09: 브랜드 레시피 337줄 중 cost=0 이 21줄, 합계가 0 인 레시피 27개).
 *   저장 경로는 고쳤고 화면은 이미 제 값을 보여주지만, **DB 에 박힌 0 은 그대로**다.
 *   한 번 열어 저장하면 복구되지만 사람이 27개를 일일이 열 이유가 없다.
 *
 * 규칙 — 계산 가능한 줄만 고친다:
 *   `utils/recipeCost.computeLineCost` 가 값을 내지 못하면(단위 환산 불가 / 재료 단가가 0)
 *   **건드리지 않는다.** 특히 재료 단가 0 은 «원가가 0» 이 아니라 «아직 정하지 않았다» 는 뜻이라
 *   0 으로 덮는 순간 사람이 넣어 둔 값을 지우게 된다(docs/TRADE_STRUCTURE.md §5-1).
 *
 * 멱등: 고친 줄은 더 이상 0 이 아니므로 다음 실행의 대상에서 빠진다. 두 번 돌려도 두 번째는 0건.
 * 범위: `recipe_ingredients`(Recipe 계통)만. ProductRecipe 는 이번 판정 범위 밖이라 손대지 않는다.
 *
 * Usage:
 *   node scripts/migrate-recompute-zero-recipe-line-cost.js --dry-run
 *   node scripts/migrate-recompute-zero-recipe-line-cost.js
 */
require('dotenv').config();
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');
const { computeLineCost } = require('../utils/recipeCost');

const DRY = process.argv.includes('--dry-run');
const log = (m) => console.log(`[migrate-recompute-zero-recipe-line-cost]${DRY ? ' [DRY]' : ''} ${m}`);

async function run() {
  try {
    log(`DB: ${sequelize.config.database}@${sequelize.config.host}`);

    const rows = await sequelize.query(`
      SELECT ri.id, ri.recipe_id, ri.ingredient_id, ri.quantity, ri.unit, ri.cost,
             i.unit_cost, i.base_quantity, i.unit AS ing_unit, i.name AS ing_name,
             r.name AS recipe_name, r.owner_type
        FROM recipe_ingredients ri
        JOIN ingredients i ON i.id = ri.ingredient_id
        JOIN recipes r ON r.id = ri.recipe_id
       WHERE (ri.cost IS NULL OR ri.cost = 0)
       ORDER BY ri.recipe_id, ri.id`, { type: QueryTypes.SELECT });
    log(`0 으로 저장된 줄: ${rows.length}건`);

    let fixed = 0, skipped = 0;
    const touchedRecipes = new Set();
    for (const r of rows) {
      const computed = computeLineCost(
        { unit_cost: r.unit_cost, base_quantity: r.base_quantity, unit: r.ing_unit },
        r.quantity, r.unit);
      if (computed === null || !(computed > 0)) {
        skipped++;
        continue;   // 단가 미정(0) 또는 단위 환산 불가 — 사람이 정할 값이다
      }
      const val = Math.round(computed * 10000) / 10000;
      log(`  줄#${r.id} 레시피 «${r.recipe_name}» / 재료 «${r.ing_name}» ${r.quantity}${r.unit || ''} → ${val}`);
      if (!DRY) {
        await sequelize.query('UPDATE recipe_ingredients SET cost = :c WHERE id = :id',
          { replacements: { c: val, id: r.id } });
      }
      touchedRecipes.add(r.recipe_id);
      fixed++;
    }
    log(`재계산 ${fixed}건 · 계산 불가로 건너뜀 ${skipped}건 · 영향 레시피 ${touchedRecipes.size}개`);

    // 레시피 합계도 줄 합으로 다시 맞춘다(줄만 고치면 카드의 합계가 옛 값으로 남는다).
    if (!DRY && touchedRecipes.size) {
      await sequelize.query(`
        UPDATE recipes r
           SET r.total_ingredient_cost = (
                 SELECT COALESCE(SUM(ri.cost), 0) FROM recipe_ingredients ri WHERE ri.recipe_id = r.id)
         WHERE r.id IN (:ids)`, { replacements: { ids: [...touchedRecipes] } });
      log(`합계 재계산: 레시피 ${touchedRecipes.size}개`);
    }

    // 자가검증 — 남은 «계산 가능한데 0» 은 0건이어야 한다.
    const remain = await sequelize.query(`
      SELECT COUNT(*) n FROM recipe_ingredients ri JOIN ingredients i ON i.id = ri.ingredient_id
       WHERE (ri.cost IS NULL OR ri.cost = 0) AND i.unit_cost > 0 AND i.unit = ri.unit`,
      { type: QueryTypes.SELECT });
    log(`검증: 같은 단위 · 재료단가>0 인데 아직 0 인 줄 = ${remain[0].n}건`);
    if (!DRY && Number(remain[0].n) > 0) { log('✗ 재계산 후에도 남아 있다 — 확인 필요'); process.exit(1); }

    log('✓ done');
    process.exit(0);
  } catch (e) {
    console.error('[migrate-recompute-zero-recipe-line-cost] ✗ failed:', e && e.message);
    process.exit(1);
  }
}
run();

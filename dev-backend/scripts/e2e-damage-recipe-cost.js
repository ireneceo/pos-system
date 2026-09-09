#!/usr/bin/env node
/**
 * e2e-damage-recipe-cost.js — e2e 전용 «손상 상태» 주입기 (dev 전용)
 * -------------------------------------------------------------------
 * 왜 필요한가: 2026-09-09 부터 저장 라우트가 **서버에서 원가를 계산**한다.
 * 그래서 API 로는 «줄 원가 0 으로 저장된 옛 레시피» 를 더 이상 만들 수 없다.
 * 그 상태를 못 만들면 «저장값이 0 이어도 화면은 제 값을 보여준다» 와
 * «열어서 저장하면 DB 가 복구된다» 를 증명할 수 없다 — 통과해도 헛테스트다.
 *
 * 안전 레일 (하나라도 어긋나면 아무것도 안 하고 종료 코드 1):
 *   ① DB 이름에 'dev' 가 들어가야 한다 (운영 DB 차단)
 *   ② 레시피 이름이 E2E- / TMP- 로 시작해야 한다 (사람이 만든 레시피 차단)
 *
 * 사용: node scripts/e2e-damage-recipe-cost.js <recipeId>
 */
require('dotenv').config();
const { Sequelize, QueryTypes } = require('sequelize');

(async () => {
  const recipeId = parseInt(process.argv[2], 10);
  if (!Number.isFinite(recipeId)) {
    console.error('사용법: node scripts/e2e-damage-recipe-cost.js <recipeId>');
    process.exit(1);
  }
  if (!/dev/i.test(String(process.env.DB_NAME))) {
    console.error(`거부: DB_NAME=${process.env.DB_NAME} — dev DB 가 아니다.`);
    process.exit(1);
  }
  const s = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD,
    { host: process.env.DB_HOST, dialect: 'mysql', logging: false });

  const [recipe] = await s.query('SELECT id, name FROM recipes WHERE id = :id', {
    type: QueryTypes.SELECT, replacements: { id: recipeId } });
  if (!recipe) { console.error(`거부: 레시피 ${recipeId} 없음`); process.exit(1); }
  if (!/^(E2E|TMP)-/.test(recipe.name)) {
    console.error(`거부: «${recipe.name}» 은 테스트 레시피가 아니다 (E2E- / TMP- 로 시작해야 한다).`);
    process.exit(1);
  }

  await s.query('UPDATE recipe_ingredients SET cost = 0 WHERE recipe_id = :id',
    { replacements: { id: recipeId } });
  await s.query('UPDATE recipes SET total_ingredient_cost = 0 WHERE id = :id',
    { replacements: { id: recipeId } });
  const rows = await s.query('SELECT cost FROM recipe_ingredients WHERE recipe_id = :id',
    { type: QueryTypes.SELECT, replacements: { id: recipeId } });
  console.log(`손상 주입 완료: 레시피 ${recipeId} «${recipe.name}» — 줄 ${rows.length}개 cost=0, 합계 0`);
  process.exit(0);
})().catch((e) => { console.error(e.message); process.exit(1); });

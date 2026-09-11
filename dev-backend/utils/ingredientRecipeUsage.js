/**
 * 레시피가 쓰고 있는 재료인가 — 재료 삭제 게이트의 단일 소스 (2026-09-11 Fable 판정).
 *
 * `recipe_ingredients.ingredient_id` 가 ON DELETE CASCADE 라, 이 확인 없이 `ingredients` 행을 지우면
 * 그 재료를 쓰던 레시피 줄이 **흔적 없이** 사라진다 — 브랜드 레시피면 그 브랜드의 모든 매장 화면·다운로드에서
 * 재료가 조용히 빠진다. 삭제하는 곳은 먼저 이 함수로 묻고, 쓰는 레시피가 있으면 409 로 막는다.
 * (CASCADE 자체는 그대로 둔다 — 스키마 무접촉.)
 */
const { Recipe, RecipeIngredient } = require('../models');

/**
 * @param {number|number[]} ingredientIds
 * @returns {Promise<Array<{id:number, name:string}>>} 쓰는 레시피(중복 제거). 비어 있으면 지워도 된다.
 */
async function recipesUsingIngredients(ingredientIds, { transaction } = {}) {
  const ids = (Array.isArray(ingredientIds) ? ingredientIds : [ingredientIds])
    .map(Number).filter(Number.isFinite);
  if (!ids.length) return [];
  const rows = await RecipeIngredient.findAll({
    where: { ingredient_id: ids },
    attributes: ['recipe_id'],
    include: [{ model: Recipe, as: 'recipe', attributes: ['id', 'name'] }],
    transaction,
  });
  const byId = new Map();
  for (const r of rows) {
    if (r.recipe && !byId.has(r.recipe.id)) byId.set(r.recipe.id, { id: r.recipe.id, name: r.recipe.name });
  }
  return [...byId.values()];
}

/** 409 응답 본문 — 두 삭제 라우트가 같은 모양을 쓴다. */
function inUseBody(recipes, what = 'This ingredient') {
  return {
    success: false,
    code: 'IN_USE_BY_RECIPES',
    message: `${what} is used by ${recipes.length} recipe(s): ${recipes.map((r) => r.name).join(', ')}. Remove it from those recipes first.`,
    data: { recipes },
  };
}

module.exports = { recipesUsingIngredients, inUseBody };

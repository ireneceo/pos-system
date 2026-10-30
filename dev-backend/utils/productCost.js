/**
 * 매장 메뉴 1개(1인분)의 **지금** 재료 원가 — 단일 소스 (2026-10-08 · Fable 판정 Ⅱ-3-C)
 *
 * 판매 차감(services/inventoryDeductionService)과 **같은 길**로 센다 — 이론 원가(장부 order_deduct 금액)와 같은 질문이어야 한다:
 *   ① 레시피(products.recipe_id → recipe_ingredients)  : Σ 줄 원가(utils/recipeCost.computeLineCost, 그 매장이 보는 원가)
 *      ※ 차감이 레시피 수량 × 주문 수량이고 수율로 나누지 않으므로 여기서도 나누지 않는다
 *   ② 재료 직결(products.ingredient_id)                 : 그 재료 1 취급단위의 값(차감이 1:1)
 *   ③ 상품 자체 재고                                     : products.unit_cost
 * 레시피 줄 하나라도 원가를 모르면(0·NULL·단위 환산 불가) 그 메뉴 원가는 null — 일부만 더한 값을 «원가» 로 보이지 않는다.
 * 옵션·세트 구성품 원가는 넣지 않는다(이번 범위 밖 — 판정문 Ⅱ-3-C 은 메뉴 본체 기준).
 */
const { computeLineCost } = require('./recipeCost');

/**
 * @param {number} restaurantId
 * @param {number[]} productIds
 * @returns {Promise<Map<number, {unit_cost:number|null, source:'recipe'|'direct'|'self'|'none'}>>}
 */
async function menuUnitCosts(restaurantId, productIds) {
  const out = new Map();
  const ids = [...new Set((productIds || []).map(Number).filter(Boolean))];
  if (!ids.length) return out;
  const { Product, Recipe, RecipeIngredient, Ingredient } = require('../models');
  const { loadOverlayMap, effectiveStoreCost } = require('../services/storeCost');
  const products = await Product.findAll({ where: { id: ids, restaurant_id: restaurantId }, attributes: ['id', 'recipe_id', 'ingredient_id', 'unit_cost'] });
  const recipeIds = products.map(p => p.recipe_id).filter(Boolean);
  const lines = recipeIds.length ? await RecipeIngredient.findAll({
    where: { recipe_id: recipeIds },
    include: [{ model: Ingredient, as: 'ingredient', attributes: ['id', 'unit', 'unit_cost', 'base_quantity', 'owner_type', 'restaurant_id'] }],
  }) : [];
  const directIds = products.map(p => p.ingredient_id).filter(Boolean);
  const directs = directIds.length ? await Ingredient.findAll({ where: { id: directIds }, attributes: ['id', 'unit', 'unit_cost', 'base_quantity', 'owner_type', 'restaurant_id'] }) : [];
  const allIngIds = [...lines.map(l => l.ingredient_id), ...directIds];
  const overlay = await loadOverlayMap(restaurantId, allIngIds);
  const costed = (ing) => ({ unit: ing.unit, base_quantity: ing.base_quantity, unit_cost: effectiveStoreCost(ing, overlay.get(Number(ing.id)), restaurantId) });

  const byRecipe = new Map();
  for (const l of lines) {
    if (!byRecipe.has(l.recipe_id)) byRecipe.set(l.recipe_id, []);
    byRecipe.get(l.recipe_id).push(l);
  }
  const directMap = new Map(directs.map(d => [d.id, d]));
  for (const p of products) {
    if (p.recipe_id) {
      const ls = byRecipe.get(p.recipe_id) || [];
      if (!ls.length) { out.set(p.id, { unit_cost: null, source: 'recipe' }); continue; }
      let sum = 0; let unknown = false;
      for (const l of ls) {
        const c = l.ingredient ? computeLineCost(costed(l.ingredient), l.quantity, l.unit) : null;
        if (c === null) { unknown = true; break; }
        sum += c;
      }
      out.set(p.id, { unit_cost: unknown ? null : Math.round(sum * 10000) / 10000, source: 'recipe' });
    } else if (p.ingredient_id) {
      const d = directMap.get(p.ingredient_id);
      const c = d ? computeLineCost(costed(d), 1, d.unit) : null;
      out.set(p.id, { unit_cost: c === null ? null : Math.round(c * 10000) / 10000, source: 'direct' });
    } else {
      const c = parseFloat(p.unit_cost);
      out.set(p.id, { unit_cost: Number.isFinite(c) && c > 0 ? c : null, source: c > 0 ? 'self' : 'none' });
    }
  }
  return out;
}

/**
 * 옵션 1개(수량 1)의 재료 원가 — 수익성 분석 설계 §3-1 «+ 옵션» (2026-10-29 · 위 menuUnitCosts 는 그대로 두고 추가만).
 * 판매 차감과 같은 길: option_ingredients(option_id, ingredient_id, quantity) — 수량은 재료 취급단위(차감이 그대로 뺀다).
 *   재료 연결이 없는 옵션은 Map 에 넣지 않는다(«옵션 원가 미등록» — 부르는 쪽이 0 이 아니라 모름으로 센다).
 *   재료 줄 하나라도 원가를 모르면 null.
 * @param {number} restaurantId
 * @param {number[]} optionIds
 * @returns {Promise<Map<number, number|null>>}
 */
async function optionUnitCosts(restaurantId, optionIds) {
  const out = new Map();
  const ids = [...new Set((optionIds || []).map(Number).filter(Boolean))];
  if (!ids.length) return out;
  const { OptionIngredient, Ingredient } = require('../models');
  const { loadOverlayMap, effectiveStoreCost } = require('../services/storeCost');
  const rows = await OptionIngredient.findAll({
    where: { option_id: ids },
    include: [{ model: Ingredient, as: 'ingredient', attributes: ['id', 'unit', 'unit_cost', 'base_quantity', 'owner_type', 'restaurant_id'] }],
  });
  const overlay = await loadOverlayMap(restaurantId, rows.map(r => r.ingredient_id));
  for (const r of rows) {
    const prev = out.has(r.option_id) ? out.get(r.option_id) : 0;
    if (prev === null) continue;
    const ing = r.ingredient;
    const c = ing ? computeLineCost({ unit: ing.unit, base_quantity: ing.base_quantity, unit_cost: effectiveStoreCost(ing, overlay.get(Number(ing.id)), restaurantId) }, r.quantity, ing.unit) : null;
    out.set(r.option_id, c === null ? null : Math.round((prev + c) * 10000) / 10000);
  }
  return out;
}

module.exports = { menuUnitCosts, optionUnitCosts };

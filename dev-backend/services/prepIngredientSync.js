/**
 * 준비된 재고(1차 가공 재고) — 레시피 ↔ 재료 행 동기화 (2026-09-17 Fable 판정 «길 나»)
 *   docs/RECIPE_MANAGEMENT_SYSTEM.md §6
 *
 * Irene 원문: 「불고기를 재어 두는데 소고기를 이용해서 재 놓는 거지 … 그럼 준비된 재료인 불고기도
 *   재고관리가 되어야 해. 3kg을 재면 실제 2.5kg이 되는 거고.」
 *
 * 구조 한 줄: **준비된 재고는 새 표가 아니라 `ingredients` 의 한 행이고, 그 행의 출처가 레시피다.**
 *   - 수량·FIFO 배치·실사·저재고 경보·원가 2층·«재료를 상품으로 판다» 는 전부 기존 재료 기제를 탄다.
 *   - 새 행위는 «만들기(생산 기록)» 하나뿐이고, **판매 시 차감 코드는 0줄 바뀐다.**
 *
 * 스위치의 진실은 «재료 행이 있는가» 하나다 — Recipe 에 따로 플래그를 두지 않는다(두 벌이 되면 갈린다).
 */
const { Op } = require('sequelize');
// 관계(include as: 'ingredient'/'recipe')를 쓰므로 **models 인덱스**에서 가져온다 —
// 개별 파일을 직접 require 하면 관계가 등록되기 전 인스턴스를 잡을 수 있다.
const { Recipe, RecipeIngredient, Ingredient, Product } = require('../models');

// 재료가 쓸 수 있는 단위 — 'portion' 은 무게·부피가 아니라 재고로 셀 수 없다.
const INGREDIENT_UNITS = ['kg', 'g', 'L', 'ml', 'piece', 'pack', 'can', 'bottle'];

class PrepError extends Error {
  constructor(status, code, message, detail) {
    super(message);
    this.status = status;
    this.code = code;
    this.detail = detail;
  }
}

/** 이 레시피가 «준비 레시피» 인가 = 그 레시피에서 나온 재료 행이 살아 있는가 */
async function getPrepIngredient(recipeId, { includeInactive = false, transaction } = {}) {
  const where = { source_recipe_id: recipeId };
  if (!includeInactive) where.is_active = true;
  return Ingredient.findOne({ where, transaction });
}

/** 이 레시피를 쓰는 메뉴/상품 (준비 레시피는 메뉴에 붙을 수 없다 — 이중 차감 방지) */
async function findProductsUsingRecipe(recipeId, { transaction } = {}) {
  return Product.findAll({
    where: { recipe_id: recipeId },
    attributes: ['id', 'restaurant_id', 'name'],
    transaction
  });
}

/**
 * 준비 레시피의 «1단위 원가» — 재료비 합 ÷ 수율.
 * 재료비 합은 레시피 줄(사용량 × 재료 unit_cost)로 낸다. 재료 unit_cost 는 기준양(base_quantity)
 * 전체의 값이므로 기준양으로 나눠 1단위 값을 만든다 — 2026-09-11 ×1000 사고와 같은 자리다.
 */
async function computeUnitCostFromRecipe(recipe, { transaction } = {}) {
  const lines = await RecipeIngredient.findAll({
    where: { recipe_id: recipe.id },
    include: [{ model: Ingredient, as: 'ingredient', attributes: ['id', 'unit_cost', 'base_quantity'] }],
    transaction
  });
  let total = 0;
  for (const l of lines) {
    const ing = l.ingredient;
    if (!ing) continue;
    const base = Number(ing.base_quantity) || 1;
    const perUnit = (Number(ing.unit_cost) || 0) / base;   // 재료 1단위 값
    total += perUnit * (Number(l.quantity) || 0);
  }
  const yieldAmount = Number(recipe.yield_amount) || 0;
  if (!(yieldAmount > 0)) return 0;
  return Math.round((total / yieldAmount) * 10000) / 10000;
}

/** 준비 레시피로서 성립하는지 검사 — 성립 안 하면 PrepError */
async function assertCanBePrepRecipe(recipe, { transaction } = {}) {
  const unit = String(recipe.yield_unit || '').trim();
  if (!INGREDIENT_UNITS.includes(unit)) {
    throw new PrepError(400, 'PREP_YIELD_UNIT_REQUIRED',
      `준비 재료로 쓰려면 «실제로 나오는 양»의 단위가 ${INGREDIENT_UNITS.join(', ')} 중 하나여야 합니다 (portion 불가).`,
      { yield_unit: recipe.yield_unit });
  }
  if (!(Number(recipe.yield_amount) > 0)) {
    throw new PrepError(400, 'PREP_YIELD_AMOUNT_REQUIRED',
      '준비 재료로 쓰려면 «실제로 나오는 양»이 0보다 커야 합니다.',
      { yield_amount: recipe.yield_amount });
  }

  // 메뉴에 붙어 있으면 켤 수 없다 — 붙은 채로 켜면 원재료와 준비 재료가 **둘 다** 빠진다.
  const products = await findProductsUsingRecipe(recipe.id, { transaction });
  if (products.length) {
    throw new PrepError(409, 'PREP_RECIPE_IN_USE_BY_MENU',
      `메뉴 ${products.length}개에 연결돼 있어 준비 재료로 바꿀 수 없습니다. 먼저 메뉴 연결을 풀어 주세요.`,
      { products: products.map(p => ({ id: p.id, name: p.name, restaurant_id: p.restaurant_id })) });
  }

  // 준비 레시피 줄에 또 다른 준비 재료가 들어가면 중첩이 된다 — 1단계로 막는다(순환·이중차감 방지).
  const lines = await RecipeIngredient.findAll({
    where: { recipe_id: recipe.id }, attributes: ['ingredient_id'], transaction
  });
  const ids = lines.map(l => l.ingredient_id).filter(Boolean);
  if (ids.length) {
    const nested = await Ingredient.findAll({
      where: { id: { [Op.in]: ids }, source_recipe_id: { [Op.ne]: null } },
      attributes: ['id', 'name'], transaction
    });
    if (nested.length) {
      throw new PrepError(400, 'PREP_NESTED_NOT_ALLOWED',
        `준비 레시피 안에 다른 준비 재료(${nested.map(n => n.name).join(', ')})를 넣을 수 없습니다. 원재료로 적어 주세요.`,
        { ingredients: nested.map(n => ({ id: n.id, name: n.name })) });
    }
  }
}

/**
 * 스위치 ON — 레시피에서 재료 행을 만들거나(없으면) 되살린다(있으면).
 * 재료의 이름·단위·원가는 **레시피를 따라간다**(사람이 재료 쪽에서 못 고침 — 라우트에서 403).
 */
async function enablePrepIngredient(recipe, { transaction } = {}) {
  await assertCanBePrepRecipe(recipe, { transaction });

  const unitCost = await computeUnitCostFromRecipe(recipe, { transaction });
  const existing = await getPrepIngredient(recipe.id, { includeInactive: true, transaction });

  const shape = {
    name: recipe.name,
    unit: recipe.yield_unit,
    base_quantity: 1,
    package_unit: recipe.yield_unit,
    package_quantity: 1,
    unit_cost: unitCost,
    is_active: true
  };

  if (existing) {
    // 껐다 켜면 **같은 행**이 돌아온다 — 수량·배치·장부가 이어진다.
    await existing.update(shape, { transaction });
    return { ingredient: existing, created: false };
  }

  const ingredient = await Ingredient.create({
    ...shape,
    owner_type: recipe.owner_type,
    brand_id: recipe.owner_type === 'brand' ? recipe.brand_id : null,
    restaurant_id: recipe.owner_type === 'restaurant' ? recipe.restaurant_id : null,
    source_recipe_id: recipe.id,
    current_stock: 0,
    category: 'other'
  }, { transaction });
  return { ingredient, created: true };
}

/**
 * 스위치 OFF — 재고가 남아 있거나 메뉴 레시피가 그 재료를 쓰고 있으면 끄지 않는다(409 + 목록).
 * 끌 수 있으면 **삭제가 아니라 비활성** — 다시 켜면 같은 행이 살아난다.
 */
async function disablePrepIngredient(recipeId, { transaction } = {}) {
  const ing = await getPrepIngredient(recipeId, { transaction });
  if (!ing) return { changed: false, reason: 'not_prep' };

  const stock = Number(ing.current_stock) || 0;
  const users = await RecipeIngredient.findAll({
    where: { ingredient_id: ing.id },
    include: [{ model: Recipe, as: 'recipe', attributes: ['id', 'name'] }],
    transaction
  });
  if (stock > 0 || users.length) {
    throw new PrepError(409, 'PREP_INGREDIENT_IN_USE',
      stock > 0
        ? `재고가 ${stock}${ing.unit} 남아 있어 끌 수 없습니다. 먼저 재고를 0으로 만들어 주세요.`
        : `레시피 ${users.length}개가 이 준비 재료를 쓰고 있어 끌 수 없습니다.`,
      {
        current_stock: stock,
        unit: ing.unit,
        recipes: users.map(u => (u.recipe ? { id: u.recipe.id, name: u.recipe.name } : null)).filter(Boolean)
      });
  }
  await ing.update({ is_active: false }, { transaction });
  return { changed: true, ingredient_id: ing.id };
}

/**
 * 레시피 저장(생성·수정) 뒤 한 번 부르는 자리.
 * @param {object} recipe  저장된 Recipe 인스턴스
 * @param {boolean|undefined} wanted  요청의 스위치 값. undefined 면 **현 상태 유지**(이름·원가만 갱신).
 */
async function syncPrepIngredientForRecipe(recipe, wanted, { transaction } = {}) {
  const current = await getPrepIngredient(recipe.id, { transaction });

  if (wanted === undefined || wanted === null) {
    if (!current) return { state: 'off', changed: false };
    // 켜져 있으면 이름·단위·원가를 레시피에 다시 맞춘다(레시피가 단일 진실).
    await enablePrepIngredient(recipe, { transaction });
    return { state: 'on', changed: true, resynced: true };
  }

  if (wanted === true) {
    const r = await enablePrepIngredient(recipe, { transaction });
    return { state: 'on', changed: true, created: r.created, ingredient_id: r.ingredient.id };
  }
  const r = await disablePrepIngredient(recipe.id, { transaction });
  return { state: 'off', changed: r.changed };
}

module.exports = {
  INGREDIENT_UNITS,
  PrepError,
  getPrepIngredient,
  findProductsUsingRecipe,
  computeUnitCostFromRecipe,
  assertCanBePrepRecipe,
  enablePrepIngredient,
  disablePrepIngredient,
  syncPrepIngredientForRecipe
};

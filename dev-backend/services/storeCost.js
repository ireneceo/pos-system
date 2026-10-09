/**
 * 매장 층 원가 — **단일 소스** (2026-09-11 · docs/PURCHASE_ORDER_SYSTEM.md §8-4 D-5 · docs/TRADE_STRUCTURE.md §2-3)
 *
 * 원가는 두 층이다: 브랜드 층(브랜드가 사는 값) · 매장 층(매장이 실제로 산 값).
 * **매장 층의 자리는 재료 소유자가 정한다 — 칸은 하나다.**
 *   - 매장 소유 재료(`owner_type='restaurant'`, 그 매장)  → `ingredients.unit_cost` 자체가 매장 층
 *   - 브랜드 공유 재료(`owner_type='brand'`)             → `restaurant_ingredient_costs`(매장별 오버레이)가 매장 층,
 *                                                         없으면 브랜드 층으로 폴백
 *
 * 왜: 매장 소유 재료에 원가 칸이 둘(재료 행 45 · 수령 원가행 15.06)이라 화면은 앞을, 수령·대조는 뒤를 썼다.
 *   자기 레시피 원가가 사 온 값과 영원히 안 맞았다(dev 실측 Beef Brisket · Onion).
 *
 * 규칙
 *   - 쓰는 손(수령 가중평균 · 대조 덮어쓰기 · 수동 입력)은 전부 `writeStoreCost` 를 거친다.
 *   - 읽는 손은 `loadOverlayMap` + `effectiveStoreCost` 를 거친다.
 *   - ⛔ 매장 소유 재료에 이미 앉아 있는 오버레이 행은 **읽지 않는다.** 백필하지 않는다 —
 *     재료 행과 원가행 중 어느 쪽이 진짜인지 데이터로 가릴 수 없다. 다음 수령·대조부터 맞는다.
 */
const { Op } = require('sequelize');
const { Ingredient, RestaurantIngredientCost } = require('../models');

const round4 = (n) => Math.round((Number(n) || 0) * 10000) / 10000;

/** 이 재료의 매장 층이 재료 행 자체인가(= 그 매장이 소유한 재료인가). */
function isStoreOwned(ingredient, restaurantId) {
  return !!ingredient
    && ingredient.owner_type === 'restaurant'
    && Number(ingredient.restaurant_id) === Number(restaurantId);
}

/**
 * 매장이 보는 이 재료의 원가(= 매장 층, 없으면 브랜드 층).
 * @param overlayValue loadOverlayMap 이 준 값(브랜드 공유 재료의 오버레이). 없으면 undefined.
 */
function effectiveStoreCost(ingredient, overlayValue, restaurantId) {
  if (!ingredient) return 0;
  if (isStoreOwned(ingredient, restaurantId)) return parseFloat(ingredient.unit_cost) || 0;
  if (overlayValue !== undefined && overlayValue !== null) return parseFloat(overlayValue) || 0;
  return parseFloat(ingredient.unit_cost) || 0;
}

/**
 * 매장 오버레이 맵 — **브랜드 공유 재료에 앉은 행만** 돌려준다(매장 소유 재료의 옛 오버레이는 읽지 않는다).
 * @param ingredientIds 없으면 그 매장의 전부
 * @returns {Promise<Map<number, number>>} ingredient_id → unit_cost
 */
async function loadOverlayMap(restaurantId, ingredientIds, { transaction } = {}) {
  const rid = parseInt(restaurantId, 10);
  if (!Number.isFinite(rid)) return new Map();
  const where = { restaurant_id: rid };
  if (Array.isArray(ingredientIds)) {
    const ids = [...new Set(ingredientIds.map((i) => parseInt(i, 10)).filter(Number.isFinite))];
    if (!ids.length) return new Map();
    where.ingredient_id = { [Op.in]: ids };
  }
  const rows = await RestaurantIngredientCost.findAll({
    where,
    attributes: ['ingredient_id', 'unit_cost'],
    include: [{ model: Ingredient, as: 'ingredient', attributes: [], where: { owner_type: 'brand' }, required: true }],
    transaction,
  });
  return new Map(rows.map((r) => [r.ingredient_id, parseFloat(r.unit_cost)]));
}

/**
 * 매장 층 원가를 쓴다 — 자리는 재료 소유자가 정한다.
 * @param ingredient Ingredient 행(owner_type·restaurant_id·unit_cost 필요)
 * @returns {Promise<{target:'ingredient'|'overlay', oldValue:number|null, newValue:number, changed:boolean}>}
 */
async function writeStoreCost(restaurantId, ingredient, value, { transaction, userId, notes, log } = {}) {
  const result = await writeStoreCostRow(restaurantId, ingredient, value, { transaction, userId, notes });
  // 변경 이력 — 호출부가 log({source, ...}) 를 주면 바뀐 경우에만 cost_change_logs 1줄.
  //   대조(cost-reconciliation)는 자기가 이미 적으므로 log 를 안 준다(두 번 적지 않게).
  if (log && result.changed) {
    const { logCostChange } = require('./costSync');
    await logCostChange(require('../config/database').sequelize, transaction, {
      subject_type: 'ingredient', subject_id: ingredient.id,
      entity_type: 'restaurant', entity_id: restaurantId,
      old_value: result.oldValue, new_value: result.newValue, unit: ingredient.unit || null,
      changed_by_user_id: userId || null, note: notes || null,
      ...log,
    });
  }
  return result;
}

async function writeStoreCostRow(restaurantId, ingredient, value, { transaction, userId, notes } = {}) {
  const newValue = round4(value);
  if (isStoreOwned(ingredient, restaurantId)) {
    const oldValue = ingredient.unit_cost == null ? null : round4(ingredient.unit_cost);
    if (oldValue !== null && Math.abs(oldValue - newValue) < 0.0001) {
      return { target: 'ingredient', oldValue, newValue, changed: false };
    }
    await Ingredient.update({ unit_cost: newValue }, { where: { id: ingredient.id }, transaction });
    return { target: 'ingredient', oldValue, newValue, changed: true };
  }

  const row = await RestaurantIngredientCost.findOne({
    where: { restaurant_id: restaurantId, ingredient_id: ingredient.id }, transaction,
  });
  const oldValue = row ? round4(row.unit_cost) : null;
  if (oldValue !== null && Math.abs(oldValue - newValue) < 0.0001) {
    return { target: 'overlay', oldValue, newValue, changed: false };
  }
  if (row) {
    await row.update({ unit_cost: newValue, notes: notes || row.notes, updated_by: userId || null }, { transaction });
  } else {
    await RestaurantIngredientCost.create({
      restaurant_id: restaurantId, ingredient_id: ingredient.id,
      unit_cost: newValue, notes: notes || null, updated_by: userId || null,
    }, { transaction });
  }
  return { target: 'overlay', oldValue, newValue, changed: true };
}

/**
 * 본사 재고아이템(product_ingredients) 원가 = **마지막 실제 매입가** — 브랜드 발주의 수령·줄 대조가 쓴다
 *   (2026-10-09 Fable 판정 §3-2 · Irene «권고대로» — 매장의 writeStoreCost 와 같은 규칙, 브랜드 층).
 * 값의 뜻 = 기준양(base_quantity)의 가격 — 재고아이템 unit_cost 와 같은 뜻.
 * 흐름(10-09 실측): 재고아이템 → 거울 재료(브랜드 공유 ingredients, stockItemMirror.syncMirrors) → 자기 원가를 따로
 *   정하지 않은 매장의 레시피 원가. 매장별 원가(restaurant_ingredient_costs)는 건드리지 않는다.
 * 새 전파 코드는 만들지 않는다 — 거울 옮기기는 기존 syncMirrors 한 곳(costSync 와 같은 길).
 * @returns {Promise<{oldValue:number|null, newValue:number, changed:boolean}>}
 */
async function writeStockItemCost(stockItem, value, { transaction, userId, notes, log } = {}) {
  const newValue = round4(value);
  if (!stockItem || !(newValue > 0)) return { oldValue: null, newValue, changed: false };
  const oldValue = stockItem.unit_cost == null ? null : round4(stockItem.unit_cost);
  if (oldValue !== null && Math.abs(oldValue - newValue) < 0.0001) return { oldValue, newValue, changed: false };
  const { ProductIngredient } = require('../models');
  await ProductIngredient.update({ unit_cost: newValue }, { where: { id: stockItem.id }, transaction });
  if (log) {
    const { logCostChange } = require('./costSync');
    await logCostChange(require('../config/database').sequelize, transaction, {
      subject_type: 'product_ingredient', subject_id: stockItem.id,
      old_value: oldValue, new_value: newValue, unit: stockItem.unit || null,
      changed_by_user_id: userId || null, note: notes || null,
      ...log,
    });
  }
  // 거울(브랜드 공유 재료)까지 — raw UPDATE 라 모델 훅을 안 탄다, costSync 와 같은 방식으로 명시
  try {
    const { syncMirrors } = require('./stockItemMirror');
    const fresh = await ProductIngredient.findByPk(stockItem.id, { transaction });
    if (fresh) await syncMirrors(fresh, { transaction });
  } catch (e) {
    console.error(`[cost] 재고아이템 ${stockItem.id} 원가를 거울로 옮기지 못함:`, e.message);
  }
  return { oldValue, newValue, changed: true };
}

module.exports = { isStoreOwned, effectiveStoreCost, loadOverlayMap, writeStoreCost, writeStockItemCost };

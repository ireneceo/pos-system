/**
 * brandStockAccess.js — "이 buyer 가 이 재고아이템(Ingredient)에 무엇을 할 수 있나?" 의 단일 소스.
 *
 * 브랜드 재료(ingredients.owner_type='brand')는 **프랜차이즈 표준 재료 마스터**다.
 * 소속 매장은 그것을 **읽고 발주하고 입고**할 수 있지만 **수정·삭제·공급처 연결은 못 한다**
 * (정의는 브랜드가, 사용은 매장이 — Irene 승인 2026-07-12).
 *
 *   readable(재료 조회 / 공급처 목록 조회 / 발주 담기 / 입고·폐기·조정)
 *     restaurant → 자기 재료 ∪ **부모 브랜드 재료**
 *     brand      → 자기 브랜드 재료
 *     foodcourt  → 자기 푸드코트 재료
 *
 *   writable(재료 수정·삭제 / 공급처 연결·해제)
 *     소유자 본인만. 매장이 브랜드 재료에 쓰기 → 거부.
 *
 * ⚠ brand_id 는 **반드시 서버가 Restaurant 에서 조회**한다. 클라이언트가 준 값을 믿으면
 *   형제 브랜드(한 오너가 브랜드 여러 개) 재료가 새어 교차테넌트 누출이 된다.
 *
 * 매장별 실재고는 브랜드 재료일 때 restaurant_ingredient_stocks 오버레이가 단일 소스다
 * (브랜드 공유 행의 current_stock 을 매장이 갱신하면 형제 매장 재고가 오염된다).
 * 설계: docs/BRAND_STOCK_SHARING_DESIGN.md
 */
const { Ingredient, Restaurant, RestaurantIngredientStock } = require('../models');

/** 매장의 부모 브랜드 id (서버 조회 — 클라이언트 파라미터 불신). 없으면 null. */
async function parentBrandIdOf(restaurantId, transaction) {
  const r = await Restaurant.findByPk(restaurantId, { attributes: ['id', 'brand_id'], transaction });
  return r && r.brand_id ? parseInt(r.brand_id, 10) : null;
}

/** 이 재료가 buyer 가 속한 브랜드의 공유 재료인가? */
async function isBrandSharedFor(ing, buyerEntity, transaction) {
  if (!ing || !buyerEntity || buyerEntity.type !== 'restaurant') return false;
  if (ing.owner_type !== 'brand' || !ing.brand_id) return false;
  const brandId = await parentBrandIdOf(buyerEntity.id, transaction);
  return brandId != null && parseInt(ing.brand_id, 10) === brandId;
}

/**
 * 읽기/사용 권한 (조회·발주·입고). 허용이면 Ingredient 인스턴스, 아니면 null.
 * buyerEntity 가 없으면 System Admin override → 통과.
 */
async function readableIngredient(ingredientId, buyerEntity, transaction) {
  const ing = await Ingredient.findByPk(ingredientId, { transaction });
  if (!ing) return null;
  if (!buyerEntity) return ing; // SA
  if (buyerEntity.type === 'restaurant') {
    if (parseInt(ing.restaurant_id, 10) === buyerEntity.id) return ing;
    if (await isBrandSharedFor(ing, buyerEntity, transaction)) return ing; // 부모 브랜드 재료 = 읽기·사용 가능
  } else if (buyerEntity.type === 'brand') {
    if (parseInt(ing.brand_id, 10) === buyerEntity.id) return ing;
  } else if (buyerEntity.type === 'foodcourt') {
    if (parseInt(ing.foodcourt_id, 10) === buyerEntity.id) return ing;
  }
  return null;
}

/**
 * 쓰기 권한 (재료 수정·삭제 / 공급처 연결·해제). 소유자 본인만.
 * 브랜드 재료에 매장이 쓰려 하면 null → 호출부는 403.
 */
async function writableIngredient(ingredientId, buyerEntity, transaction) {
  const ing = await Ingredient.findByPk(ingredientId, { transaction });
  if (!ing) return null;
  if (!buyerEntity) return ing; // SA
  if (buyerEntity.type === 'restaurant') {
    if (parseInt(ing.restaurant_id, 10) === buyerEntity.id) return ing;
  } else if (buyerEntity.type === 'brand') {
    if (parseInt(ing.brand_id, 10) === buyerEntity.id) return ing;
  } else if (buyerEntity.type === 'foodcourt') {
    if (parseInt(ing.foodcourt_id, 10) === buyerEntity.id) return ing;
  }
  return null;
}

/** 이 매장에서 이 재료의 실재고 (브랜드 재료면 매장 오버레이, 매장 재료면 재료 행). */
async function stockFor(ing, restaurantId, transaction) {
  if (ing.owner_type !== 'brand') return parseFloat(ing.current_stock) || 0;
  const row = await RestaurantIngredientStock.findOne({
    where: { restaurant_id: restaurantId, ingredient_id: ing.id },
    transaction,
  });
  return row ? parseFloat(row.current_stock) || 0 : 0;
}

/** 매장 id → { ingredient_id: current_stock } (브랜드 재료 목록 표시용, 1쿼리). */
async function stockMapFor(restaurantId, ingredientIds, transaction) {
  const map = {};
  if (!ingredientIds || !ingredientIds.length) return map;
  const rows = await RestaurantIngredientStock.findAll({
    where: { restaurant_id: restaurantId, ingredient_id: ingredientIds },
    transaction,
  });
  rows.forEach((r) => { map[r.ingredient_id] = parseFloat(r.current_stock) || 0; });
  return map;
}

/**
 * 재고 반영 — 브랜드 재료면 매장 오버레이에, 매장 재료면 재료 행에 쓴다.
 * newStock 은 호출부가 계산한 최종값. track_stock=false 면 아무것도 안 쓴다.
 * 반환: 실제 기록된 재고(변경 안 했으면 기존값).
 */
async function applyStock(ing, restaurantId, newStock, transaction, opts = {}) {
  if (ing.track_stock === false) return parseFloat(ing.current_stock) || 0;
  const rounded = Math.round((parseFloat(newStock) || 0) * 100) / 100;
  // recordActual = 실사로 확정된 값(last_actual_stock 까지 기록). 입고/PO 입고는 stockTake 만 찍던
  // 기존 동작 그대로 — 그 호출부를 건드리지 않으려고 옵션을 분리했다.
  const stamp = {
    ...(opts.stockTake ? { last_stock_take_at: new Date() } : {}),
    ...(opts.recordActual ? { last_actual_stock: rounded } : {}),
  };

  if (ing.owner_type === 'brand') {
    const [row] = await RestaurantIngredientStock.findOrCreate({
      where: { restaurant_id: restaurantId, ingredient_id: ing.id },
      defaults: { restaurant_id: restaurantId, ingredient_id: ing.id, current_stock: 0 },
      transaction,
    });
    await row.update({ current_stock: rounded, ...stamp }, { transaction });
    return rounded;
  }

  await ing.update({ current_stock: rounded, ...stamp }, { transaction });
  return rounded;
}

/** 매장 id → { ingredient_id: 오버레이 row } (재고 + PAR 오버라이드를 한 번에). */
async function overlayMapFor(restaurantId, ingredientIds, transaction) {
  const map = {};
  if (!ingredientIds || !ingredientIds.length) return map;
  const rows = await RestaurantIngredientStock.findAll({
    where: { restaurant_id: restaurantId, ingredient_id: ingredientIds },
    transaction,
  });
  rows.forEach((r) => { map[r.ingredient_id] = r; });
  return map;
}

/** PAR 오버라이드 대상 필드 (NULL = 브랜드 기본값 상속). */
const SETTING_FIELDS = [
  'min_stock', 'min_order', 'lead_time_days', 'safety_stock_percent',
  'manual_daily_usage', 'avg_daily_usage', 'prediction_confidence',
  'last_actual_stock', 'last_stock_take_at',
];

/**
 * 이 매장에서 유효한 설정값 — 브랜드 재료면 오버레이가 있는 필드만 덮고 나머지는 브랜드 기본값.
 * ⚠ 0 은 유효한 오버라이드다 → `!= null` 로만 판정(falsy 판정 금지: min_stock 0 이 상속으로 오인된다).
 */
function effectiveSettings(ing, overlayRow) {
  const base = typeof ing.toJSON === 'function' ? ing.toJSON() : { ...ing };
  if (ing.owner_type !== 'brand' || !overlayRow) return base;
  const o = typeof overlayRow.toJSON === 'function' ? overlayRow.toJSON() : overlayRow;
  for (const f of SETTING_FIELDS) {
    if (o[f] != null) base[f] = o[f];
  }
  return base;
}

/** 알림·발주점이 쓰는 이 매장의 최소재고 (브랜드 재료면 오버레이 우선). */
async function effectiveMinStock(ing, restaurantId, transaction) {
  if (!ing) return 0;
  if (ing.owner_type !== 'brand') return parseFloat(ing.min_stock) || 0;
  const row = await RestaurantIngredientStock.findOne({
    where: { restaurant_id: restaurantId, ingredient_id: ing.id },
    transaction,
  });
  if (row && row.min_stock != null) return parseFloat(row.min_stock) || 0;
  return parseFloat(ing.min_stock) || 0;
}

/**
 * 설정 저장 — 브랜드 재료면 매장 오버레이에, 매장 재료면 재료 행에.
 * patch 의 `undefined` 필드는 건너뛰고, 명시적 `null` 은 "상속으로 되돌리기"로 저장한다.
 */
async function applySettings(ing, restaurantId, patch, transaction) {
  const clean = {};
  for (const [k, v] of Object.entries(patch || {})) {
    if (v !== undefined) clean[k] = v;
  }
  if (!Object.keys(clean).length) return;

  if (ing.owner_type === 'brand') {
    const [row] = await RestaurantIngredientStock.findOrCreate({
      where: { restaurant_id: restaurantId, ingredient_id: ing.id },
      defaults: { restaurant_id: restaurantId, ingredient_id: ing.id, current_stock: 0 },
      transaction,
    });
    await row.update(clean, { transaction });
    return;
  }
  await ing.update(clean, { transaction });
}

module.exports = {
  parentBrandIdOf,
  isBrandSharedFor,
  readableIngredient,
  writableIngredient,
  stockFor,
  stockMapFor,
  overlayMapFor,
  effectiveSettings,
  effectiveMinStock,
  applySettings,
  applyStock,
  SETTING_FIELDS,
};

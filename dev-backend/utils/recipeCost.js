/**
 * recipeCost.js — 레시피 줄 원가의 **서버 단일 소스** (2026-09-09 Irene 지시)
 * ---------------------------------------------------------------------------
 * Irene 원문: "레시피 원가 제대로 넣어. 브랜드레시피에서 계산을 하고 돌아야지"
 *
 * 왜 서버가 계산하나 — 예전엔 저장 라우트가 `const cost = item.cost || 0` 으로
 * **화면이 보낸 값을 그대로** 저장했다. 그래서 화면이 재료를 못 찾는 순간(거울 재료가
 * 선택기 목록에서 빠졌을 때) 0 이 그대로 DB 에 박혔다 — 열어서 저장만 해도 원가가 사라졌고
 * 운영 브랜드 레시피에 cost=0 이 21줄 생겼다. 화면을 고쳐도 옛 캐시 번들이 0 을 보내면
 * 같은 일이 또 난다. **원가는 재료 단가에서 서버가 계산한다.**
 *
 * 계산식 (화면 `lineCost` 와 동일해야 한다 — 보이는 값 = 저장되는 값):
 *   재료 1단위 값 = unit_cost / base_quantity      (예: 43.00 / 1000g → g 당 0.043)
 *   줄 원가       = 재료 1단위 값 × (레시피 수량을 재료 단위로 환산한 값)
 *
 * 환산 불가(무게↔개수처럼 카테고리가 다름)거나 **재료 단가가 0(=미정)** 이면 **null** 을 돌려준다.
 * 그때 0 으로 덮지 말 것 — 호출부가 «화면이 보낸 값 → 저장돼 있던 값» 순으로 지킨다.
 * 단가 0 을 «원가 0» 으로 보지 않는 근거: docs/TRADE_STRUCTURE.md §5-1 (0 은 미정이라 전파 제외).
 */

// 단위 표 — 프론트 `utils/unitConversion.ts` 의 STANDARD_UNITS 와 같은 값이어야 한다.
// 한쪽만 고치면 화면 값과 저장 값이 갈린다.
const UNITS = {
  kg:      { category: 'weight',  base: 'g',       multiplier: 1000 },
  g:       { category: 'weight',  base: 'g',       multiplier: 1 },
  mg:      { category: 'weight',  base: 'g',       multiplier: 0.001 },
  L:       { category: 'volume',  base: 'ml',      multiplier: 1000 },
  ml:      { category: 'volume',  base: 'ml',      multiplier: 1 },
  piece:   { category: 'count',   base: 'piece',   multiplier: 1 },
  pack:    { category: 'count',   base: 'pack',    multiplier: 1 },
  box:     { category: 'count',   base: 'box',     multiplier: 1 },
  can:     { category: 'count',   base: 'can',     multiplier: 1 },
  bottle:  { category: 'count',   base: 'bottle',  multiplier: 1 },
  bag:     { category: 'count',   base: 'bag',     multiplier: 1 },
  portion: { category: 'serving', base: 'portion', multiplier: 1 },
  serving: { category: 'serving', base: 'serving', multiplier: 1 },
  tbsp:    { category: 'cooking', base: 'ml',      multiplier: 15 },
  tsp:     { category: 'cooking', base: 'ml',      multiplier: 5 },
  cup:     { category: 'cooking', base: 'ml',      multiplier: 240 },
};

/** 수량 환산. 같은 base 를 쓰는 단위끼리만 된다. 불가면 null. */
function convertQuantity(quantity, fromUnit, toUnit) {
  const qty = parseFloat(quantity);
  if (!Number.isFinite(qty)) return null;
  if (fromUnit === toUnit) return qty;
  const from = UNITS[fromUnit];
  const to = UNITS[toUnit];
  if (!from || !to || from.base !== to.base) return null;
  return (qty * from.multiplier) / to.multiplier;
}

/**
 * 재료 한 줄의 원가. 계산 불가면 null (0 을 돌려주지 않는다 — 0 은 «원가 없음» 이 아니라 «모름»).
 * @param {{unit_cost:any, base_quantity:any, unit:string}} ingredient 재료 행
 * @param {any} quantity 레시피 수량
 * @param {string} unit  레시피 단위 (없으면 재료 단위로 본다)
 */
function computeLineCost(ingredient, quantity, unit) {
  if (!ingredient) return null;
  const qty = parseFloat(quantity);
  if (!Number.isFinite(qty)) return null;
  const unitCost = parseFloat(ingredient.unit_cost);
  if (!Number.isFinite(unitCost)) return null;
  // 🔴 단가 0 은 «원가가 0» 이 아니라 «아직 정하지 않았다» 는 뜻이다
  //   (docs/TRADE_STRUCTURE.md §5-1 — "0 은 미정이라 전파 제외").
  //   운영에 원가 0 인 활성 재고아이템이 95건 남아 있다. 이걸 0 으로 계산하면
  //   사람이 넣어 둔 줄 원가를 «저장만 해도» 0 으로 지운다 — 이번에 고치려던 그 사고다.
  if (unitCost === 0) return null;
  const baseQty = parseFloat(ingredient.base_quantity) || 1;
  const perUnit = unitCost / baseQty;
  const converted = convertQuantity(qty, unit || ingredient.unit, ingredient.unit);
  if (converted === null) return null;
  return perUnit * converted;
}

/**
 * 저장할 줄 원가를 정한다 — **서버 계산이 1순위**.
 * 계산 불가(단위 카테고리 불일치)면 화면이 보낸 값, 그것도 없으면 저장돼 있던 값을 지킨다.
 * ⛔ 어느 경우에도 «있던 값을 0 으로 덮는» 결과를 만들지 않는다.
 */
function resolveLineCost(ingredient, item, previousCost) {
  const computed = computeLineCost(ingredient, item && item.quantity, item && item.unit);
  if (computed !== null) return computed;
  const sent = parseFloat(item && item.cost);
  if (Number.isFinite(sent) && sent > 0) return sent;
  const prev = parseFloat(previousCost);
  if (Number.isFinite(prev) && prev > 0) return prev;
  return Number.isFinite(sent) ? sent : 0;
}

module.exports = { UNITS, convertQuantity, computeLineCost, resolveLineCost };

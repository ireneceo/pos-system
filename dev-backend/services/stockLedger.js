/**
 * 재고 장부 — **재고 수량을 바꾸는 단일 함수** (2026-10-08 · Fable 판정 `.claude/fable-verdict-20261008-inventory-po-cost.md` Ⅱ-2-A)
 *
 * 왜: 장부(inventory_transactions)는 하나인데 장부를 안 거치고 current_stock 을 바꾸는 문이 5개 있었고,
 *   장부에 금액이 없어 재고 총액·폐기 금액·기간 원가를 셀 수 없었다. 이 함수를 지나면
 *   ① 현재고 갱신과 장부 한 줄이 **같은 트랜잭션**으로 묶이고(장부 실패 = 전체 롤백)
 *   ② 장부 수량 = 실제로 바뀐 양(after − before) 이라 «장부 합 = 현재고» 가 성립하고
 *   ③ 그 순간 원가가 금액으로 같이 남는다.
 *
 * 단위 규칙(TRADE_STRUCTURE §2-2): quantity_change 는 취급단위, unit_cost 는 **기준양(base_quantity)의 가격**,
 *   cost_value = quantity_change ÷ base_quantity × unit_cost. 원가를 모르면(0·NULL) 금액은 NULL(«금액 미상»).
 *
 * 대상(target.kind) — 장부의 대상 칸과 같은 넷 + 푸드코트 상품:
 *   ingredient          재료 (매장 소유 → 재료 행 / 브랜드 공유 → 그 매장 오버레이, utils/brandStockAccess 규칙 그대로)
 *   product_ingredient  BG 재고아이템
 *   product             매장 메뉴 자체 재고
 *   brand_product       브랜드 상품 자체 재고
 *   foodcourt_product   푸드코트 상품 — 장부에 FK 칸이 없어 entity_type='foodcourt' + product_id(foodcourt_products.id) 로 적는다
 *
 * 이 함수가 하지 않는 것: FIFO 배치 차감·배치 생성(호출부 몫) · 저재고 알림(호출부 몫) · 원가 갱신(services/storeCost 몫).
 */
const { InventoryTransaction } = require('../models');
const { stockFor, applyStock } = require('../utils/brandStockAccess');

const round2 = (n) => Math.round((Number(n) || 0) * 100) / 100;
const round4 = (n) => Math.round((Number(n) || 0) * 10000) / 10000;
const KINDS = ['ingredient', 'product_ingredient', 'product', 'brand_product', 'foodcourt_product'];

/** 대상의 지금 재고 */
async function currentStockOf(target, restaurantId, transaction) {
  const { kind, row } = target;
  if (kind === 'ingredient' && restaurantId) return stockFor(row, restaurantId, transaction);
  return parseFloat(row.current_stock) || 0;
}

/** 대상의 그 순간 원가 { unit_cost(기준양 가격) | null, base_quantity } */
async function costBasisOf(target, restaurantId, transaction) {
  const { kind, row } = target;
  const base = parseFloat(row.base_quantity) || 1;
  if (kind === 'ingredient') {
    if (restaurantId) {
      const { loadOverlayMap, effectiveStoreCost } = require('./storeCost');
      const overlay = await loadOverlayMap(restaurantId, [row.id], { transaction });
      return { unit_cost: effectiveStoreCost(row, overlay.get(Number(row.id)), restaurantId), base_quantity: base };
    }
    return { unit_cost: parseFloat(row.unit_cost), base_quantity: base };
  }
  if (kind === 'product_ingredient') return { unit_cost: parseFloat(row.unit_cost), base_quantity: base };
  // 매장 메뉴 자체 재고: unit_cost = 재고 1단위의 원가(products.unit_cost 주석 «Cost per unit for inventory valuation»)
  if (kind === 'product') return { unit_cost: parseFloat(row.unit_cost), base_quantity: 1 };
  // 브랜드 상품·푸드코트 상품엔 원가 칸이 없다 → 금액 미상
  return { unit_cost: null, base_quantity: base };
}

/** 대상 칸·entity 를 장부 행 모양으로 */
function targetColumns(target, entity) {
  const id = target.row.id;
  switch (target.kind) {
    case 'ingredient': return { ingredient_id: id };
    case 'product_ingredient': return { product_ingredient_id: id };
    case 'product': return { product_id: id };
    case 'brand_product': return { brand_product_id: id };
    case 'foodcourt_product': return { product_id: id }; // entity_type='foodcourt' 일 때 product_id 는 foodcourt_products.id
    default: throw new Error(`stockLedger: unknown target kind ${target.kind}`);
  }
}

async function applyNewStock(target, restaurantId, newStock, transaction, applyOpts) {
  const { kind, row } = target;
  if (kind === 'ingredient' && restaurantId) return applyStock(row, restaurantId, newStock, transaction, applyOpts);
  const extra = kind === 'ingredient' && applyOpts && applyOpts.stockTake ? { last_stock_take_at: new Date() } : {};
  await row.update({ current_stock: newStock, ...extra }, { transaction });
  return newStock;
}

/**
 * 재고를 바꾸고 장부 한 줄을 남긴다.
 * @param {object} p
 * @param {{kind:string,row:object}} p.target   대상과 그 행(이미 잠갔으면 그 인스턴스)
 * @param {number} [p.restaurantId]            매장이면 매장 id(브랜드 공유 재료 오버레이·매장 원가에 필요)
 * @param {{type:string,id:number}} [p.entity] 장부 entity. 없으면 restaurantId 로 restaurant
 * @param {string} p.type                      장부 유형(initial·purchase·order_deduct·stock_take·waste·adjustment·return_in·return_out·production)
 * @param {number} [p.delta]                   증감(취급단위). setTo 와 둘 중 하나
 * @param {number} [p.setTo]                   최종값(초기재고·실사·절대값 조정)
 * @param {boolean} [p.clampAtZero]            결과가 음수면 0 에서 멈춘다(장부엔 실제로 바뀐 양만)
 * @param {{unit_cost:number, base_quantity?:number}} [p.cost]  금액 근거(입고가·반품가). 없으면 그 순간 원가
 * @param {object} [p.refs]                    { order_id, purchase_order_id, stock_take_id }
 * @param {boolean} [p.keepZero]               바뀐 양이 0 이어도 장부 줄을 남긴다(기본: 안 남김)
 * @returns {Promise<{before:number, after:number, change:number, unitCost:number|null, costValue:number|null, entry:object|null}>}
 */
async function record(p) {
  const {
    target, restaurantId = null, entity = null, type, delta, setTo, clampAtZero = false,
    applyOpts = {}, unit, cost = null, refs = {}, reasonCode = null, notes = null, userId = null,
    transaction, keepZero = false,
  } = p;
  if (!target || !KINDS.includes(target.kind) || !target.row) throw new Error('stockLedger.record: target {kind,row} 필요');
  if (!transaction) throw new Error('stockLedger.record: transaction 필요 — 재고와 장부는 한 트랜잭션');
  if (delta === undefined && setTo === undefined) throw new Error('stockLedger.record: delta 또는 setTo 필요');

  const before = round2(await currentStockOf(target, restaurantId, transaction));
  let after = setTo !== undefined ? round2(setTo) : round2(before + (parseFloat(delta) || 0));
  if (clampAtZero && after < 0) after = 0;
  const change = round2(after - before);

  if (change !== 0 || setTo !== undefined) {
    await applyNewStock(target, restaurantId, after, transaction, applyOpts);
  }
  if (change === 0 && !keepZero) return { before, after, change, unitCost: null, costValue: null, entry: null };

  // 호출부가 준 금액 근거(입고가·반품가·실사 원가)가 0·빈 값이면 그 순간 원가로 — «0 = 모름» 규칙(TRADE_STRUCTURE §5-1)
  const given = cost && Number.isFinite(parseFloat(cost.unit_cost)) && parseFloat(cost.unit_cost) > 0;
  const basis = given
    ? { unit_cost: parseFloat(cost.unit_cost), base_quantity: parseFloat(cost.base_quantity) || parseFloat(target.row.base_quantity) || 1 }
    : await costBasisOf(target, restaurantId, transaction);
  const known = Number.isFinite(basis.unit_cost) && basis.unit_cost > 0;
  const unitCost = known ? round4(basis.unit_cost) : null;
  const costValue = known ? round2((change / (basis.base_quantity || 1)) * basis.unit_cost) : null;

  const ent = entity || (restaurantId ? { type: 'restaurant', id: restaurantId } : null);
  const entry = await InventoryTransaction.create({
    ...(ent ? { entity_type: ent.type, entity_id: ent.id } : {}),
    ...(ent && ent.type === 'restaurant' ? { restaurant_id: ent.id } : {}),
    ...targetColumns(target, ent),
    transaction_type: type,
    quantity_change: change,
    unit: unit || target.row.unit || target.row.stock_unit || 'ea',
    stock_after: after,
    order_id: refs.order_id || null,
    purchase_order_id: refs.purchase_order_id || null,
    stock_take_id: refs.stock_take_id || null,
    unit_cost: unitCost,
    cost_value: costValue,
    base_quantity: known ? basis.base_quantity : null,
    reason_code: reasonCode,
    notes,
    created_by: userId,
  }, { transaction });

  return { before, after, change, unitCost, costValue, entry };
}

module.exports = { record, currentStockOf, costBasisOf };

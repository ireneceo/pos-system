/**
 * 일반재고(소모품) 수량 변경 — 일반재고 자기 장부(general_stock_transactions) 하나만 쓴다.
 * (2026-10-08 Fable 판정 Ⅱ-2-B: 일반재고는 재료 장부와 섞지 않는다 · 수량과 장부는 한 트랜잭션 · 장부 실패 = 전체 롤백)
 *
 * 매장 화면(routes/inventory-extra.js)과 브랜드 화면(routes/general-stock.js)이 같은 일을 따로 적고 있어
 * 장부 실패를 «non-critical» 로 삼키는 쪽과 안 삼키는 쪽이 갈렸다 — 여기 한 곳으로 모은다.
 * 금액: unit_cost = 재고 1단위 원가(일반재고엔 기준양이 없다), total_cost = 바뀐 양 × unit_cost (부호 = 수량 부호).
 */
const round2 = (n) => Math.round((Number(n) || 0) * 100) / 100;

/**
 * @param {object} p
 * @param {object} p.item          GeneralStock 행
 * @param {'initial'|'receive'|'adjustment'|'waste'} p.type
 * @param {number} [p.delta]       증감
 * @param {number} [p.setTo]       최종값
 * @param {object} [p.extra]       장부 추가 칸(batch_number 등)
 * @returns {Promise<{before:number, after:number, change:number}>}
 */
async function recordGeneralStock({ item, type, delta, setTo, ownerId = null, restaurantId = null, notes = null, extra = {}, userId = null, transaction }) {
  if (!transaction) throw new Error('recordGeneralStock: transaction 필요');
  const { GeneralStockTransaction } = require('../models');
  const before = round2(item.current_stock);
  let after = setTo !== undefined ? round2(setTo) : round2(before + (parseFloat(delta) || 0));
  if (after < 0) after = 0;
  const change = round2(after - before);
  await item.update({ current_stock: after, last_stock_take_at: new Date() }, { transaction });
  if (change === 0 && type !== 'initial') return { before, after, change };
  const unitCost = round2(item.unit_cost);
  await GeneralStockTransaction.create({
    owner_id: ownerId,
    restaurant_id: restaurantId,
    general_stock_id: item.id,
    transaction_type: type,
    quantity_change: change,
    unit: item.unit,
    stock_after: after,
    unit_cost: unitCost,
    total_cost: round2(change * unitCost),
    notes,
    ...extra,
    created_by: userId,
  }, { transaction });
  return { before, after, change };
}

module.exports = { recordGeneralStock };

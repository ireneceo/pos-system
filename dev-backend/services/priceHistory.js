/**
 * 발주 가격 이력 (2026-09-08 · docs/PURCHASE_ORDER_SYSTEM.md §6)
 *
 * > Irene: "다음 발주할 때도 해당 아이템이 어떤 가격변화가 있었는지 보이게 … 올랐다 안올랐다 아이콘"
 *
 * **새 표를 만들지 않는다.** 소스는 이미 있는 발주 라인이다 —
 *   실효가 = `COALESCE(invoiced_unit_price, unit_price)`
 *   (인보이스로 대조된 실제 청구가가 있으면 그것, 없으면 발주 시점 합의가)
 *
 * 범위: **같은 구매자**가 **같은 매핑(공급처↔상품)** 으로 실제로 **받은(received)** 라인만.
 *   받지 않은 발주는 "그 값에 샀다"는 근거가 못 된다.
 *
 * ⛔ 라인마다 호출하지 않는다 — 목록 1회에 그룹 쿼리 1개다.
 */
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../config/database');

/**
 * @param {number[]} mappingIds ingredient_seller_products.id 목록
 * @param {{type:string,id:number}|null} buyerEntity 구매자 범위
 * @param {{allowAllBuyers?:boolean}} [opts] 구매자 범위를 일부러 열 때만 true.
 *   ⚠ 기본은 **닫힘**이다 — buyerEntity 없이 부르면 빈 결과를 준다.
 *   브랜드 공유 재료는 여러 매장이 같이 읽으므로, 범위를 안 걸면 남의 매장이 얼마에 샀는지가 샌다.
 *   매핑 자체가 소유자에 묶인 경우(BG 재고아이템)에만 `allowAllBuyers` 로 연다.
 * @returns {Promise<Map<number, object>>} mappingId → price_history
 */
async function priceHistoryForMappings(mappingIds, buyerEntity, opts = {}) {
  const ids = [...new Set((mappingIds || []).filter(Boolean).map((v) => parseInt(v, 10)).filter(Number.isFinite))];
  if (!ids.length) return new Map();
  // 범위가 없으면 아무것도 주지 않는다(닫힘이 기본). 여는 것은 호출부의 명시적 선택이어야 한다.
  if (!buyerEntity && !opts.allowAllBuyers) return new Map();

  const where = [
    'poi.ingredient_seller_product_id IN (:ids)',
    "po.status IN ('received','partial_received','closed')",
    'po.deleted_at IS NULL'
  ];
  const repl = { ids };
  if (buyerEntity) {
    where.push('po.entity_type = :et AND po.entity_id = :ei');
    repl.et = buyerEntity.type;
    repl.ei = buyerEntity.id;
  }

  const rows = await sequelize.query(
    `SELECT poi.ingredient_seller_product_id map_id,
            COALESCE(poi.invoiced_unit_price, poi.unit_price) effective_price,
            COALESCE(po.received_at, po.updated_at) at
       FROM purchase_order_items poi
       JOIN purchase_orders po ON po.id = poi.purchase_order_id
      WHERE ${where.join(' AND ')}
      ORDER BY poi.ingredient_seller_product_id, at DESC, poi.id DESC`,
    { type: QueryTypes.SELECT, replacements: repl });

  const byMap = new Map();
  for (const r of rows) {
    if (!byMap.has(r.map_id)) byMap.set(r.map_id, []);
    byMap.get(r.map_id).push({ price: Number(r.effective_price), at: r.at });
  }

  const out = new Map();
  for (const [mapId, list] of byMap) {
    const prices = list.map((x) => x.price).filter((p) => Number.isFinite(p) && p > 0);
    if (!prices.length) continue;
    const last = list[0];
    const prev = list[1] || null;
    const sum = prices.reduce((a, b) => a + b, 0);
    out.set(mapId, {
      last_price: last.price,
      last_at: last.at,
      prev_price: prev ? prev.price : null,
      n: prices.length,
      avg: Math.round((sum / prices.length) * 10000) / 10000,
      min: Math.min(...prices),
      max: Math.max(...prices)
    });
  }
  return out;
}

/**
 * "지금 발주하려는 가격"이 지난번 실제로 낸 값보다 높은가 — 표시용 방향과 비율.
 * 기준은 *현재 판매상품가 vs 마지막 실효가* 다(설계 §6).
 * @returns {{trend:'up'|'down'|'flat'|null, change_pct:number|null}}
 */
function trendAgainst(currentPrice, history) {
  const cur = Number(currentPrice);
  if (!history || !Number.isFinite(cur) || !(history.last_price > 0)) return { trend: null, change_pct: null };
  const diff = cur - history.last_price;
  const pct = Math.round((diff / history.last_price) * 1000) / 10;
  // 0.5% 미만은 '변화 없음'으로 본다 — 반올림 잡음으로 화살표가 깜빡이지 않게
  if (Math.abs(pct) < 0.5) return { trend: 'flat', change_pct: 0 };
  return { trend: diff > 0 ? 'up' : 'down', change_pct: pct };
}

module.exports = { priceHistoryForMappings, trendAgainst };

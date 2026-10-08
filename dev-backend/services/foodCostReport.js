/**
 * 기간 원가 리포트 · 폐기 리포트 (2026-10-08 · Fable 판정 `.claude/fable-verdict-20261008-inventory-po-cost.md` Ⅱ-3-B·D)
 *
 * 숫자의 출처는 재고 장부(inventory_transactions) 하나다 — 장부 단일화(services/stockLedger) 덕분에 장부 줄에
 * 그때 금액(cost_value)이 남는다. 계산식은 utils/foodCostMath 한 곳.
 *
 * 기초·기말 재고 수량 = 지금 재고 − 그 시각 이후 장부 변화 합 (장부 합 = 현재고 가 성립하므로 정확하다).
 *   실사는 장부를 실측으로 맞추므로(stock_take 줄) 별도 경로가 필요 없다 — 그 날 실사가 있었으면 source 를 'stock_take' 로 표시만 한다.
 *   기초·기말 금액 = 그 수량 ÷ 기준양 × **지금** 원가(매장이 보는 원가). 기간 중 원가가 바뀐 몫은 «원가 변동분» 으로 따로 보인다.
 * 매출 = utils/revenueOrders 의 단일 정의(완료·서빙, 삭제 제외)로 고른 주문의 total_amount 합 — 새 매출식 없음.
 * 날짜 경계 = utils/dateTimeHelper.getDateBounds(YYYY-MM-DD, 매장 시간대) 한 곳.
 */
const { QueryTypes, Op } = require('sequelize');
const { ingredientPeriod, totals } = require('../utils/foodCostMath');
const { getDateBounds, getRestaurantTimezone, getSiteTimezone } = require('../utils/dateTimeHelper');
const r2 = (n) => Math.round((Number(n) || 0) * 100) / 100;

function sel(sql, replacements) {
  const { sequelize } = require('../config/database');
  return sequelize.query(sql, { replacements, type: QueryTypes.SELECT });
}

function bounds(start, end, tz) {
  const ok = (d) => /^\d{4}-\d{2}-\d{2}$/.test(String(d || ''));
  if (!ok(start) || !ok(end) || start > end) {
    const e = new Error('start/end must be YYYY-MM-DD and start <= end'); e.status = 400; throw e;
  }
  return { startUTC: getDateBounds(start, tz).startOfDay, endUTC: getDateBounds(end, tz).endOfDay };
}

/**
 * 대상 하나하나의 기간 계산.
 * @param {Array<{id,name,unit,qty,base_quantity,unit_cost,category}>} items 지금 수량·원가
 * @param {string} keyCol  장부의 대상 칸(ingredient_id | product_ingredient_id)
 * @param {string} entityWhere 장부 범위 SQL 조각(이 매장 / 이 소유자)
 */
async function periodLines(items, keyCol, entityWhere, rep, startUTC, endUTC) {
  if (!items.length) return [];
  const ids = items.map(i => i.id);
  // 금액이 없는 장부 줄(장부 금액 칸 이전의 옛 줄·원가 미정)은 그 수량을 **지금 원가**로 매긴다 — 기초·기말과 같은 눈금.
  //   0 으로 두면 옛 기간 리포트에서 매입이 0 으로 빠져 차이가 전부 «설명 안 됨» 으로 몰린다(dev 실측 −300.69).
  const inPeriod = await sel(`SELECT ${keyCol} k, transaction_type t, SUM(cost_value) v, SUM(cost_value IS NULL) unknown_rows,
           SUM(CASE WHEN cost_value IS NULL THEN quantity_change ELSE 0 END) unknown_qty
      FROM inventory_transactions WHERE ${entityWhere} AND ${keyCol} IN (:ids) AND created_at BETWEEN :s AND :e
     GROUP BY ${keyCol}, transaction_type`, { ...rep, ids, s: startUTC, e: endUTC });
  const afterStart = await sel(`SELECT ${keyCol} k, SUM(quantity_change) q FROM inventory_transactions
      WHERE ${entityWhere} AND ${keyCol} IN (:ids) AND created_at >= :s GROUP BY ${keyCol}`, { ...rep, ids, s: startUTC });
  const afterEnd = await sel(`SELECT ${keyCol} k, SUM(quantity_change) q FROM inventory_transactions
      WHERE ${entityWhere} AND ${keyCol} IN (:ids) AND created_at > :e GROUP BY ${keyCol}`, { ...rep, ids, e: endUTC });
  const aS = new Map(afterStart.map(r => [Number(r.k), Number(r.q) || 0]));
  const aE = new Map(afterEnd.map(r => [Number(r.k), Number(r.q) || 0]));
  const perBaseOf = new Map(items.map(it => [Number(it.id), it.unit_cost ? it.unit_cost / (it.base_quantity || 1) : 0]));
  const byType = new Map();
  const unknown = new Map();
  for (const r of inPeriod) {
    const k = Number(r.k);
    if (!byType.has(k)) byType.set(k, {});
    const estimated = (Number(r.unknown_qty) || 0) * (perBaseOf.get(k) || 0);
    byType.get(k)[r.t] = (byType.get(k)[r.t] || 0) + (Number(r.v) || 0) + estimated;
    unknown.set(k, (unknown.get(k) || 0) + (Number(r.unknown_rows) || 0));
  }
  const lines = [];
  for (const it of items) {
    const k = Number(it.id);
    const openingQty = r2(it.qty - (aS.get(k) || 0));
    const closingQty = r2(it.qty - (aE.get(k) || 0));
    const perBase = it.unit_cost ? it.unit_cost / (it.base_quantity || 1) : 0;
    const t = byType.get(k) || {};
    if (!openingQty && !closingQty && !Object.keys(t).length) continue; // 기간에 아무 일도 없고 재고도 없는 재료는 표에서 뺀다
    lines.push({
      id: it.id, name: it.name, unit: it.unit, category: it.category || null,
      unit_cost: it.unit_cost, base_quantity: it.base_quantity,
      opening_qty: openingQty, closing_qty: closingQty,
      ...ingredientPeriod({ opening_value: openingQty * perBase, closing_value: closingQty * perBase, by_type: t, unknown_rows: unknown.get(k) || 0 }),
      uncosted: !it.unit_cost,
    });
  }
  return lines.sort((a, b) => Math.abs(b.unexplained_variance) - Math.abs(a.unexplained_variance));
}

/** 매장 기간 원가 리포트 */
async function restaurantFoodCost(restaurantId, start, end) {
  const { Restaurant, Order } = require('../models');
  const { restaurantValuation } = require('./inventoryValuation');
  const { revenueOrderWhere } = require('../utils/revenueOrders');
  const restaurant = await Restaurant.findByPk(restaurantId);
  const tz = getRestaurantTimezone(restaurant);
  const { startUTC, endUTC } = bounds(start, end, tz);

  const val = await restaurantValuation(restaurantId);
  const lines = await periodLines(val.items, 'ingredient_id', "entity_type = 'restaurant' AND entity_id = :rid", { rid: restaurantId }, startUTC, endUTC);

  const revenue = await Order.sum('total_amount', {
    where: { restaurant_id: restaurantId, order_date: { [Op.gte]: startUTC, [Op.lte]: endUTC }, ...revenueOrderWhere() },
  });
  // 실사가 기간 시작 날·끝 날에 있었으면 그 실사로 맞춰진 숫자다(표시용)
  const takes = await sel(`SELECT completed_at FROM stock_takes WHERE restaurant_id = :rid AND status = 'completed'
      AND completed_at BETWEEN :a AND :b`, { rid: restaurantId, a: getDateBounds(start, tz).startOfDay, b: endUTC });
  const day = (d) => new Date(d).toLocaleDateString('en-CA', { timeZone: tz });
  const takeDays = new Set(takes.map(t => day(t.completed_at)));
  return {
    period: { start, end, time_zone: tz },
    opening_source: takeDays.has(start) ? 'stock_take' : 'ledger',
    closing_source: takeDays.has(end) ? 'stock_take' : 'ledger',
    stock_takes_in_period: takes.length,
    totals: totals(lines, revenue || 0),
    lines,
  };
}

/** BG 본사 창고 기간 원가 — 재고아이템(product_ingredients) · 매출 대신 «출고액»(브랜드 판매 발주 금액) */
async function stockItemCost(ownerUserId, start, end) {
  const { stockItemValuation } = require('./inventoryValuation');
  const tz = await getSiteTimezone(); // 본사 창고엔 매장 시간대가 없다 — 사이트 시간대
  const { startUTC, endUTC } = bounds(start, end, tz);
  const val = await stockItemValuation(ownerUserId);
  const lines = await periodLines(val.items, 'product_ingredient_id', '1 = 1', {}, startUTC, endUTC);
  const [out] = await sel(`SELECT COALESCE(SUM(po.total_amount), 0) v FROM purchase_orders po
      JOIN brands b ON b.id = po.seller_entity_id AND b.owner_id = :uid
     WHERE po.seller_type = 'brand' AND po.shipped_at BETWEEN :s AND :e AND po.status <> 'cancelled' AND po.deleted_at IS NULL`,
    { uid: ownerUserId, s: startUTC, e: endUTC });
  return { period: { start, end, time_zone: tz }, revenue_label: 'shipped_sales', totals: totals(lines, Number(out.v) || 0), lines };
}

/** 폐기 리포트 — 장부 waste 줄을 사유 × 재료로, 월별 추이 */
async function restaurantWaste(restaurantId, start, end) {
  const { Restaurant } = require('../models');
  const tz = getRestaurantTimezone(await Restaurant.findByPk(restaurantId));
  const { startUTC, endUTC } = bounds(start, end, tz);
  const rows = await sel(`SELECT t.ingredient_id, i.name, t.unit, t.reason_code, t.quantity_change q, t.cost_value v, t.created_at
      FROM inventory_transactions t LEFT JOIN ingredients i ON i.id = t.ingredient_id
     WHERE t.entity_type = 'restaurant' AND t.entity_id = :rid AND t.transaction_type = 'waste'
       AND t.created_at BETWEEN :s AND :e ORDER BY t.created_at`, { rid: restaurantId, s: startUTC, e: endUTC });
  const byReason = new Map(); const byIng = new Map(); const byMonth = new Map();
  let total = 0; let unknown = 0;
  for (const r of rows) {
    const qty = -(Number(r.q) || 0);
    const val = r.v === null ? null : -(Number(r.v) || 0);
    if (val === null) unknown++; else total += val;
    const reason = r.reason_code || 'unspecified';
    const br = byReason.get(reason) || { reason_code: reason, count: 0, value: 0 };
    br.count++; br.value = r2(br.value + (val || 0)); byReason.set(reason, br);
    const key = `${r.ingredient_id}|${reason}`;
    const bi = byIng.get(key) || { ingredient_id: r.ingredient_id, name: r.name, unit: r.unit, reason_code: reason, quantity: 0, value: 0 };
    bi.quantity = r2(bi.quantity + qty); bi.value = r2(bi.value + (val || 0)); byIng.set(key, bi);
    const month = new Date(r.created_at).toLocaleDateString('en-CA', { timeZone: tz }).slice(0, 7);
    byMonth.set(month, r2((byMonth.get(month) || 0) + (val || 0)));
  }
  return {
    period: { start, end, time_zone: tz },
    total_value: r2(total), entries: rows.length, unknown_value_entries: unknown,
    by_reason: [...byReason.values()].sort((a, b) => b.value - a.value),
    by_ingredient: [...byIng.values()].sort((a, b) => b.value - a.value),
    by_month: [...byMonth.entries()].map(([month, value]) => ({ month, value })).sort((a, b) => a.month.localeCompare(b.month)),
  };
}

module.exports = { restaurantFoodCost, stockItemCost, restaurantWaste };

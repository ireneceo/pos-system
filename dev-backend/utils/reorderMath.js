/**
 * 발주점·제안 수량 — 단일 공식 (2026-10-08 · Fable 판정 `.claude/fable-verdict-20261008-inventory-po-cost.md` Ⅱ-4)
 *
 * 예전엔 공식이 셋이었다(inventory reorder-suggestions · par-level · PO suggestions — 서로 다른 답)이고,
 * «하루 사용량» 을 판매가 아니라 **입고**(purchase 장부)로 계산했다. 이제:
 *   하루 사용량 = 최근 28일 장부의 «나간 양»(판매 차감 + 폐기 + 만들기에 쓴 원재료) ÷ 그중 기록이 있는 날 수
 *                 기록 있는 날이 7일 미만이면 수동 입력값(manual_daily_usage), 그것도 없으면 0
 *   안전재고     = 최소재고(min_stock)가 있으면 그것, 없으면 하루 사용량 × 리드타임 × 안전재고%
 *   발주점       = 하루 사용량 × 리드타임 + 안전재고
 *   제안 수량    = max(0, 발주점 + 하루 사용량 × 7 − 지금 재고 − 이미 발주해 오는 중인 양)
 * 수량 단위는 전부 재고 취급단위(장부와 같은 단위).
 */
const MIN_DAYS = 7;
const WINDOW_DAYS = 28;
const COVER_DAYS = 7;
const { RECEIVABLE_STATUSES: RECEIVABLE } = require('./poStatuses'); // 받을 수 있는 발주 상태 단일 소스(승인 대기 제외)
const r2 = (n) => Math.round((Number(n) || 0) * 100) / 100;

/** 순수 계산 — 테스트 대상 */
function compute({ dailyUsage = 0, leadTimeDays = 2, minStock = 0, safetyStockPercent = 20, onHand = 0, onOrder = 0 }) {
  const daily = Number(dailyUsage) || 0;
  const lead = Number(leadTimeDays) > 0 ? Number(leadTimeDays) : 2;
  const safety = Number(minStock) > 0 ? Number(minStock) : daily * lead * ((Number(safetyStockPercent) || 0) / 100);
  const reorderPoint = daily * lead + safety;
  const suggest = Math.max(0, reorderPoint + daily * COVER_DAYS - (Number(onHand) || 0) - (Number(onOrder) || 0));
  return {
    daily_usage: r2(daily), lead_time_days: lead, safety_stock: r2(safety),
    reorder_point: r2(reorderPoint), on_hand: r2(onHand), on_order: r2(onOrder),
    suggested_qty: Math.ceil(suggest * 10) / 10,
    needs_order: (Number(onHand) || 0) + (Number(onOrder) || 0) <= reorderPoint && suggest > 0,
  };
}

/** 판정 규칙: 장부 기록일 7일 이상이면 장부 값, 아니면 수동값 */
function pickDailyUsage(ledger, manual) {
  if (ledger && ledger.days_with_data >= MIN_DAYS) return { daily: ledger.used / ledger.days_with_data, source: 'ledger', days: ledger.days_with_data };
  const m = parseFloat(manual);
  if (Number.isFinite(m) && m > 0) return { daily: m, source: 'manual', days: ledger ? ledger.days_with_data : 0 };
  return { daily: 0, source: 'none', days: ledger ? ledger.days_with_data : 0 };
}

/** 매장 장부에서 재료별 최근 28일 «나간 양» · 기록 있는 날 수 */
async function ledgerUsage(restaurantId, ingredientIds) {
  const out = new Map();
  if (!ingredientIds.length) return out;
  const { sequelize } = require('../config/database');
  const rows = await sequelize.query(
    `SELECT ingredient_id, COUNT(DISTINCT DATE(created_at)) d, SUM(-quantity_change) used FROM inventory_transactions
      WHERE entity_type = 'restaurant' AND entity_id = :rid AND ingredient_id IN (:ids)
        AND created_at >= NOW() - INTERVAL ${WINDOW_DAYS} DAY
        AND (transaction_type IN ('order_deduct', 'waste') OR (transaction_type = 'production' AND quantity_change < 0))
      GROUP BY ingredient_id`,
    { replacements: { rid: restaurantId, ids: ingredientIds }, type: sequelize.QueryTypes.SELECT });
  rows.forEach(r => out.set(Number(r.ingredient_id), { used: Number(r.used) || 0, days_with_data: Number(r.d) || 0 }));
  return out;
}

/** 매장 열린 발주 줄의 아직 안 받은 양(취급단위 = 남은 주문 단위 × 환산) */
async function onOrderQty(restaurantId, ingredientIds) {
  const out = new Map();
  if (!ingredientIds.length) return out;
  const { sequelize } = require('../config/database');
  const rows = await sequelize.query(
    `SELECT i.ingredient_id, SUM(GREATEST(0, i.quantity_ordered - COALESCE(i.quantity_received, 0)) * COALESCE(NULLIF(i.unit_conversion, 0), 1)) q
       FROM purchase_order_items i JOIN purchase_orders p ON p.id = i.purchase_order_id
      WHERE p.entity_type = 'restaurant' AND p.entity_id = :rid AND p.status IN (:st) AND p.deleted_at IS NULL
        AND i.ingredient_id IN (:ids)
      GROUP BY i.ingredient_id`,
    { replacements: { rid: restaurantId, ids: ingredientIds, st: RECEIVABLE }, type: sequelize.QueryTypes.SELECT });
  rows.forEach(r => out.set(Number(r.ingredient_id), Number(r.q) || 0));
  return out;
}

module.exports = { compute, pickDailyUsage, ledgerUsage, onOrderQty, MIN_DAYS, WINDOW_DAYS };

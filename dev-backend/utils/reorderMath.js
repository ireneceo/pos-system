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
 *
 * 2026-11-03 확장(Fable 설계 .claude/fable-design-20261103-stock-foresight-oneclick-po.md §3):
 *   BG 입력 조회(ledgerUsageBrand·onOrderQtyBrand·committedOutboundBrand) · 단계 판정 classify ·
 *   주문 단위 환산+MOQ orderQtyFor · leadTimeFor. compute 본문은 바꾸지 않는다.
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

const r1 = (n) => Math.round((Number(n) || 0) * 10) / 10;

/**
 * 단계 판정(순수) — out | order_now | soon | ok | no_basis
 *   available = 지금 재고 − 이미 약속한 양(BG 미출고 매장 주문)
 */
function classify({ available = 0, on_order = 0, daily = 0, min_stock = 0, reorder_point = 0, committed = 0, cover_days = COVER_DAYS }) {
  const av = Number(available) || 0;
  const oo = Number(on_order) || 0;
  const d = Number(daily) || 0;
  const days_of_cover = d > 0 ? r1((av + oo) / d) : null;
  let status;
  if ((Number(committed) || 0) > 0 && av < 0) status = 'out';          // 매장 주문을 못 보낸다 — 기준 유무와 무관한 사실
  else if (!(d > 0 || (Number(min_stock) || 0) > 0)) status = 'no_basis';
  else if (av <= 0) status = 'out';
  else if (av + oo <= reorder_point) status = 'order_now';
  else if (d > 0 && av + oo <= reorder_point + d * cover_days) status = 'soon';
  else status = 'ok';
  return { status, days_of_cover };
}

/**
 * 주문 수량(순수) — 취급단위 제안 → 주문 단위로 올림 → 판매자 MOQ 로 올려 맞춤.
 *   moq 는 poMinOrder.minOrderRulesByMapping 의 min(1 = 미정 → null). 400 검사와 같은 답.
 */
function orderQtyFor({ suggest_stock = 0, item_min_order = 0, unit_conversion = 1, moq = null }) {
  const s1 = Math.max(Number(suggest_stock) || 0, Number(item_min_order) || 0);
  const conv = Number(unit_conversion) > 0 ? Number(unit_conversion) : 1;
  const s2 = s1 > 0 ? Math.ceil(s1 / conv - 1e-9) : 0;
  const m = moq != null && Number(moq) > 0 ? Number(moq) : null;
  const s3 = s2 > 0 && m != null ? Math.max(s2, m) : s2;
  return { order_qty: s3, stock_qty: r2(s3 * conv), steps: { s1: r2(s1), conv, s2, moq: m } };
}

/** 리드타임 — 품목·우선 연결 중 큰 쪽(보수적), 둘 다 없으면 2 */
function leadTimeFor(item, link) {
  const a = Number(item && item.lead_time_days) || 0;
  const b = Number(link && link.lead_time_days) || 0;
  const m = Math.max(a, b);
  return m > 0 ? m : 2;
}

/** BG 장부(entity_type='brand' · product_ingredient_id) 최근 28일 «나간 양» — ledgerUsage 와 같은 창·같은 종류 */
async function ledgerUsageBrand(piIds) {
  const out = new Map();
  if (!piIds.length) return out;
  const { sequelize } = require('../config/database');
  const rows = await sequelize.query(
    `SELECT product_ingredient_id pid, COUNT(DISTINCT DATE(created_at)) d, SUM(-quantity_change) used FROM inventory_transactions
      WHERE entity_type = 'brand' AND product_ingredient_id IN (:ids)
        AND created_at >= NOW() - INTERVAL ${WINDOW_DAYS} DAY
        AND (transaction_type IN ('order_deduct', 'waste') OR (transaction_type = 'production' AND quantity_change < 0))
      GROUP BY product_ingredient_id`,
    { replacements: { ids: piIds }, type: sequelize.QueryTypes.SELECT });
  rows.forEach(r => out.set(Number(r.pid), { used: Number(r.used) || 0, days_with_data: Number(r.d) || 0 }));
  return out;
}

/** BG 가 사 오는 중인 양(취급단위) — 품목이 주인 범위라 entity_id 필터 불필요 */
async function onOrderQtyBrand(piIds) {
  const out = new Map();
  if (!piIds.length) return out;
  const { sequelize } = require('../config/database');
  const rows = await sequelize.query(
    `SELECT i.product_ingredient_id pid, SUM(GREATEST(0, i.quantity_ordered - COALESCE(i.quantity_received, 0)) * COALESCE(NULLIF(i.unit_conversion, 0), 1)) q
       FROM purchase_order_items i JOIN purchase_orders p ON p.id = i.purchase_order_id
      WHERE p.entity_type = 'brand' AND p.status IN (:st) AND p.deleted_at IS NULL
        AND i.product_ingredient_id IN (:ids)
      GROUP BY i.product_ingredient_id`,
    { replacements: { ids: piIds, st: RECEIVABLE }, type: sequelize.QueryTypes.SELECT });
  rows.forEach(r => out.set(Number(r.pid), Number(r.q) || 0));
  return out;
}

/**
 * BG 가 매장에 이미 약속한 양(미출고 판매 주문 줄) → 재고아이템별 취급단위 합.
 *   줄 → 재고아이템 환산은 출고 차감(routes/seller-orders.js 출고 블록)과 같은 갈래:
 *   연결 → brand_products → 레시피(Σ qty × 레시피 양) · 다이렉트(qty × directDeductConversion) · 그 밖(자체 재고 등) 0.
 */
async function committedOutboundBrand(brandIds, piIds) {
  const out = new Map();
  if (!brandIds.length || !piIds.length) return out;
  const { sequelize } = require('../config/database');
  const { OPEN_OUTBOUND_STATUSES } = require('./poStatuses');
  const lines = await sequelize.query(
    `SELECT i.quantity_ordered qty, bp.id bp_id, bp.product_recipe_id rid, bp.product_ingredient_id pid
       FROM purchase_order_items i
       JOIN purchase_orders p ON p.id = i.purchase_order_id
       JOIN ingredient_seller_products isp ON isp.id = i.ingredient_seller_product_id AND isp.seller_type = 'brand'
       JOIN brand_products bp ON bp.id = isp.seller_product_id
      WHERE p.seller_type = 'brand' AND p.seller_entity_id IN (:bids) AND p.status IN (:st) AND p.deleted_at IS NULL
        AND i.shipped_at IS NULL`,
    { replacements: { bids: brandIds, st: OPEN_OUTBOUND_STATUSES }, type: sequelize.QueryTypes.SELECT });
  if (!lines.length) return out;
  const want = new Set(piIds.map(Number));
  const add = (pid, q) => { if (want.has(pid) && q > 0) out.set(pid, r2((out.get(pid) || 0) + q)); };

  const recipeIds = [...new Set(lines.filter(l => l.rid).map(l => Number(l.rid)))];
  const recipeRows = recipeIds.length ? await sequelize.query(
    `SELECT recipe_id, ingredient_id, quantity FROM product_recipe_ingredients WHERE recipe_id IN (:ids)`,
    { replacements: { ids: recipeIds }, type: sequelize.QueryTypes.SELECT }) : [];
  const byRecipe = new Map();
  recipeRows.forEach(r => { const k = Number(r.recipe_id); if (!byRecipe.has(k)) byRecipe.set(k, []); byRecipe.get(k).push(r); });

  const directLines = lines.filter(l => !l.rid && l.pid);
  let convByBp = new Map();
  if (directLines.length) {
    const { BrandProduct, ProductIngredient } = require('../models');
    const { directDeductConversion } = require('../services/sellerLinkConversion');
    const bps = await BrandProduct.findAll({ where: { id: [...new Set(directLines.map(l => Number(l.bp_id)))] } });
    const pis = await ProductIngredient.findAll({ where: { id: [...new Set(directLines.map(l => Number(l.pid)))] } });
    const piById = new Map(pis.map(p => [Number(p.id), p]));
    bps.forEach(bp => {
      const st = piById.get(Number(bp.product_ingredient_id));
      if (st) convByBp.set(Number(bp.id), directDeductConversion({ stock: st, sellerProduct: bp }).conv);
    });
  }

  for (const l of lines) {
    const qty = Number(l.qty) || 0;
    if (qty <= 0) continue;
    if (l.rid) {
      (byRecipe.get(Number(l.rid)) || []).forEach(ri => add(Number(ri.ingredient_id), qty * (Number(ri.quantity) || 0)));
    } else if (l.pid) {
      const conv = convByBp.get(Number(l.bp_id));
      if (conv != null) add(Number(l.pid), qty * conv);
    }
  }
  return out;
}

module.exports = {
  compute, pickDailyUsage, ledgerUsage, onOrderQty, MIN_DAYS, WINDOW_DAYS, COVER_DAYS,
  classify, orderQtyFor, leadTimeFor, ledgerUsageBrand, onOrderQtyBrand, committedOutboundBrand,
};

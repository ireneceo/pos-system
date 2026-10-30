/**
 * 수익성 분석 — 매장 1개 × 기간 1개 계산 (설계 .claude/fable-design-20261029-brand-profitability.md §2 · §3)
 *
 * 매장·오너·브랜드 라우트가 **같은 함수**를 부른다 — 역할마다 다른 것은 매장 id 목록뿐(§2 «계산은 한 곳»).
 * 순수 계산은 utils/profitabilityMath, 여기는 DB 를 읽어 넘기는 일만.
 *
 * 단일 소스로 쓰는 것(새로 만들지 않는다)
 *   - 매출 주문 = utils/revenueOrders.revenueOrderWhere (+ 직원 식사 제외는 계산에서 — 기존 매출 화면은 그대로)
 *   - 주문 라인 → 상품 = utils/stationEnrichment.resolveProductId + 이름 보조(reports-summary 방식) — 세 번째 규칙 금지(§12)
 *   - 메뉴 원가 = utils/productCost.menuUnitCosts(본체) + optionUnitCosts(옵션) · 세트 = 구성품 본체 원가 합
 *   - 기간 경계 = 매장 타임존 utils/dateTimeHelper.getDateBounds
 *
 * 1단계 범위(§8): 메뉴 공헌이익 · 메뉴 성과판 · 주문 구성 · 시뮬레이터 기준값 · 요약 + 준비도.
 *   원가는 «현재 레시피 기준»(지금 원가) 하나 — «판매 당시 원가»(장부) · 인건비 · 실제 식재료비 · 운영비 손익은 2단계.
 */
const { Op } = require('sequelize');
const { revenueOrderWhere } = require('../utils/revenueOrders');
const { resolveProductId } = require('../utils/stationEnrichment');
const { menuUnitCosts, optionUnitCosts } = require('../utils/productCost');
const { getDateBounds, getRestaurantTimezone } = require('../utils/dateTimeHelper');
const M = require('../utils/profitabilityMath');

const DEFAULT_SETTINGS = {
  fees: {},
  channel_fees: {},
  targets: { food_cost_pct: 35, prime_cost_pct: 60, variance_alert_pct: 10 },
  quadrant_baseline: 'median',
  share_with_brand: 'operations',
};

const FEE_KEYS = ['cash', 'card', 'ewallet', 'qr_payment', 'online', 'bankTransfer', 'counter'];
const CHANNEL_FEE_KEYS = ['dine_in', 'takeaway', 'delivery', 'pickup'];
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const SIM_WINDOW_DAYS = 84; // 최근 12주(§3-9)

function badRequest(message) { const e = new Error(message); e.status = 400; return e; }

/** operation_settings 원문(문자열·객체) → 수익성 설정(기본값 채움) */
function readSettings(raw) {
  let os = raw;
  if (typeof os === 'string') { try { os = JSON.parse(os); } catch { os = {}; } }
  const p = (os && os.profitability) || {};
  return {
    fees: { ...(p.fees || {}) },
    channel_fees: { ...(p.channel_fees || {}) },
    targets: { ...DEFAULT_SETTINGS.targets, ...(p.targets || {}) },
    quadrant_baseline: p.quadrant_baseline === 'avg70' ? 'avg70' : 'median',
    share_with_brand: p.share_with_brand === 'full' ? 'full' : 'operations',
    fees_configured: !!p.fees,
  };
}

/** 'YYYY-MM-DD' 두 개 → UTC 경계 · 일수 */
function periodBounds(start, end, tz) {
  if (!DATE_RE.test(start || '') || !DATE_RE.test(end || '')) throw badRequest('start and end must be YYYY-MM-DD');
  if (start > end) throw badRequest('start must be on or before end');
  const days = Math.round((Date.parse(`${end}T00:00:00Z`) - Date.parse(`${start}T00:00:00Z`)) / 86400000) + 1;
  if (days > 400) throw badRequest('period too long (max 400 days)');
  return { from: getDateBounds(start, tz).startOfDay, to: getDateBounds(end, tz).endOfDay, days };
}

const shiftDate = (ymd, deltaDays) => new Date(Date.parse(`${ymd}T00:00:00Z`) + deltaDays * 86400000).toISOString().slice(0, 10);
const todayIn = (tz) => new Date().toLocaleDateString('en-CA', { timeZone: tz });

/** 매장 정보 + 상품 사전(라인 해석·카테고리 이름) */
async function loadStore(restaurantId) {
  const { Restaurant, Product, Category } = require('../models');
  const r = await Restaurant.findByPk(restaurantId, { attributes: ['id', 'name', 'brand_id', 'operation_settings', 'country', 'currency', 'is_demo'] });
  if (!r) { const e = new Error('Restaurant not found'); e.status = 404; throw e; }
  const tz = getRestaurantTimezone(r);
  const settings = readSettings(r.getDataValue('operation_settings'));
  const os = r.operation_settings || {};
  const products = await Product.findAll({ where: { restaurant_id: restaurantId }, attributes: ['id', 'name', 'category', 'brand_menu_id', 'is_active', 'price'] });
  const categories = await Category.findAll({ where: { restaurant_id: restaurantId }, attributes: ['id', 'name'] });
  const catName = new Map(categories.map(c => [String(c.id), c.name]));
  const byId = new Map();
  const idByName = new Map();
  for (const p of products) {
    const category = catName.get(String(p.category)) || p.category || null;
    byId.set(p.id, { id: p.id, name: p.name, category, brand_menu_id: p.brand_menu_id, is_active: p.is_active !== false, price: parseFloat(p.price) || 0 });
    if (!idByName.has(p.name)) idByName.set(p.name, p.id);
  }
  return { row: r, tz, settings, currency: os.currency || r.currency || 'MYR', byId, idByName };
}

/** 주문 라인 → 이 매장 상품 id (resolveProductId → 이 매장 것인지 확인 → 이름 보조) */
function productIdOf(store, item) {
  const pid = resolveProductId(item);
  if (pid && store.byId.has(pid)) return pid;
  const viaMenu = item && item.menuItem && Number(item.menuItem.id);
  if (viaMenu && store.byId.has(viaMenu)) return viaMenu;
  return store.idByName.get(item && item.name) || null;
}

function componentPid(store, c) {
  const pid = Number(c && (c.product_id || c.id));
  if (pid && store.byId.has(pid)) return pid;
  return store.idByName.get(c && c.name) || null;
}

/** 기간 매출 주문 + 결제 줄 */
async function loadOrders(restaurantId, from, to) {
  const { Order } = require('../models');
  const OrderPayment = require('../models/OrderPayment');
  const orders = await Order.findAll({
    where: { restaurant_id: restaurantId, order_date: { [Op.gte]: from, [Op.lte]: to }, ...revenueOrderWhere() },
    attributes: ['id', 'order_date', 'order_items', 'order_type', 'source', 'payment_method', 'subtotal', 'takeaway_charge',
      'discount', 'discount_policy_amount', 'coupon_discount', 'point_discount', 'service_charge', 'delivery_fee'],
    raw: true,
  });
  for (const o of orders) {
    if (typeof o.order_items === 'string') { try { o.order_items = JSON.parse(o.order_items); } catch { o.order_items = []; } }
    if (!Array.isArray(o.order_items)) o.order_items = [];
  }
  const payments = new Map();
  const ids = orders.map(o => o.id);
  if (ids.length) {
    const rows = await OrderPayment.findAll({ where: { order_id: { [Op.in]: ids } }, attributes: ['order_id', 'payment_method', 'amount'], raw: true });
    for (const p of rows) {
      if (!payments.has(p.order_id)) payments.set(p.order_id, []);
      payments.get(p.order_id).push({ method: p.payment_method, amount: parseFloat(p.amount) || 0 });
    }
  }
  return { orders, payments };
}

/** 라인 해석·원가 콜백 만들기 — 필요한 상품·옵션 원가를 한 번에 읽는다 */
async function buildResolvers(store, restaurantId, orders) {
  const pids = new Set();
  const optionIds = new Set();
  for (const o of orders) {
    for (const it of o.order_items) {
      const pid = productIdOf(store, it);
      if (pid) pids.add(pid);
      if (Array.isArray(it.set_components)) for (const c of it.set_components) { const cp = componentPid(store, c); if (cp) pids.add(cp); }
      if (Array.isArray(it.selectedOptions)) for (const so of it.selectedOptions) { const id = parseInt(so && so.id, 10); if (id) optionIds.add(id); }
    }
  }
  const [body, opts] = await Promise.all([menuUnitCosts(restaurantId, [...pids]), optionUnitCosts(restaurantId, [...optionIds])]);
  const unitOf = (pid) => (pid && body.has(pid) ? body.get(pid).unit_cost : null);

  const resolveLine = (it) => {
    const pid = productIdOf(store, it);
    const p = pid ? store.byId.get(pid) : null;
    const name = (p && p.name) || it.name || 'Unknown';
    return { key: pid ? `p:${pid}` : `n:${name}`, name, category: it.category || (p && p.category) || 'Uncategorized', product_id: pid };
  };
  const costOfLine = (it) => {
    const pid = productIdOf(store, it);
    const comps = Array.isArray(it.set_components) ? it.set_components : [];
    const options = (Array.isArray(it.selectedOptions) ? it.selectedOptions : [])
      .map(so => parseInt(so && so.id, 10))
      .filter(Boolean)
      .map(id => (opts.has(id) ? opts.get(id) : null));
    return M.lineUnitCost({
      body: unitOf(pid),
      isSet: comps.length > 0,
      components: comps.map(c => ({ cost: unitOf(componentPid(store, c)), qty: parseInt(c.qty, 10) || 1 })),
      options,
    });
  };
  return { resolveLine, costOfLine, body };
}

/** 기간을 안 주면 매장 타임존의 «이번 달 1일 ~ 오늘»(브라우저 시계를 믿지 않는다) */
function resolvePeriod(store, start, end) {
  if (!start && !end) { const today = todayIn(store.tz); return { start: `${today.slice(0, 8)}01`, end: today }; }
  return { start, end };
}

/** 기간 1개 분석(내부) */
async function analyzePeriod(store, restaurantId, start, end) {
  ({ start, end } = resolvePeriod(store, start, end));
  const { from, to, days } = periodBounds(start, end, store.tz);
  const { orders, payments } = await loadOrders(restaurantId, from, to);
  const { resolveLine, costOfLine } = await buildResolvers(store, restaurantId, orders);
  const a = M.analyzeOrders(orders, { payments, resolveLine, costOfLine, settings: store.settings });
  return { ...a, days, orders };
}

function headline(t) {
  return {
    orders: t.orders,
    gross_sales: M.r2(t.gross),
    discounts: M.r2(t.discount),
    net_sales: M.r2(t.net),
    fees: M.r2(t.fees),
    avg_ticket: t.orders ? M.r2(t.net / t.orders) : null,
    // 공헌이익은 원가 아는 라인만 — 비율의 분모도 원가 아는 매출(카테고리 원가율과 같은 태도)
    contribution: M.r2(t.costed_contribution),
    contribution_pct: M.pct(t.costed_contribution, t.costed_net),
    food_cost_pct: M.pct(t.costed_cost, t.costed_net),
    costed_sales_pct: M.pct(t.costed_net, t.net),
    other_income: { service_charge: M.r2(t.service_charge), delivery_fee: M.r2(t.delivery_fee) },
    staff_meal: { orders: t.staff_meal.orders, cost: M.r2(t.staff_meal.cost), uncosted_lines: t.staff_meal.uncosted_lines },
    options_unknown_lines: t.options_unknown_lines,
  };
}

/** 준비도 띠(§6-1 ③) — 숫자가 왜 비었는지와 다음 행동 */
async function readiness(store, restaurantId, costedSalesPct) {
  const { StockTake, RestaurantCostEntry } = require('../models');
  const active = [...store.byId.values()].filter(p => p.is_active);
  const costs = await menuUnitCosts(restaurantId, active.map(p => p.id));
  const costed = active.filter(p => { const c = costs.get(p.id); return c && c.unit_cost !== null; }).length;
  const last = await StockTake.findOne({ where: { restaurant_id: restaurantId, status: 'completed' }, order: [['stock_take_date', 'DESC']], attributes: ['stock_take_date'], raw: true });
  const today = todayIn(store.tz);
  const rules = await RestaurantCostEntry.count({
    where: { restaurant_id: restaurantId, period_month: null, [Op.or]: [{ effective_to: null }, { effective_to: { [Op.gte]: today } }] },
  });
  return {
    menus_total: active.length,
    menus_costed: costed,
    menu_cost_pct: M.pct(costed, active.length),
    costed_sales_pct: costedSalesPct,
    last_stock_take: last ? String(last.stock_take_date).slice(0, 10) : null,
    fees_configured: store.settings.fees_configured,
    cost_rules: rules,
  };
}

// ───────────────────────── 공개 함수 ─────────────────────────

/** 요약 — 헤드라인 + 전 기간(같은 길이) 비교 + 준비도 */
async function storeSummary(restaurantId, start, end, { withReadiness = true } = {}) {
  const store = await loadStore(restaurantId);
  ({ start, end } = resolvePeriod(store, start, end));
  const cur = await analyzePeriod(store, restaurantId, start, end);
  const prevEnd = shiftDate(start, -1);
  const prevStart = shiftDate(start, -cur.days);
  const prev = await analyzePeriod(store, restaurantId, prevStart, prevEnd);
  const h = headline(cur.totals);
  return {
    restaurant: { id: store.row.id, name: store.row.name, brand_id: store.row.brand_id, currency: store.currency, time_zone: store.tz },
    period: { start, end, days: cur.days },
    previous: { start: prevStart, end: prevEnd, ...headline(prev.totals) },
    ...h,
    targets: store.settings.targets,
    readiness: withReadiness ? await readiness(store, restaurantId, h.costed_sales_pct) : undefined,
  };
}

/** 메뉴별 공헌이익 + 성과판 4분면 (§3-7) */
async function storeMenus(restaurantId, start, end) {
  const store = await loadStore(restaurantId);
  const { menus, totals } = await analyzePeriod(store, restaurantId, start, end);
  const rows = [...menus.values()].map(m => {
    const unitContribution = m.costed_quantity ? m.contribution / m.costed_quantity : null;
    return {
      key: m.key, name: m.name, category: m.category, product_id: m.product_id,
      quantity: m.quantity,
      avg_price: m.quantity ? M.r2(m.gross / m.quantity) : null,
      net_sales: M.r2(m.net),
      unit_cost: m.costed_quantity ? M.r2(m.cost / m.costed_quantity) : null,
      cost: m.uncosted_lines ? null : M.r2(m.cost),
      contribution: m.uncosted_lines && !m.costed_quantity ? null : M.r2(m.contribution),
      unit_contribution: unitContribution === null ? null : M.r2(unitContribution),
      contribution_pct: m.costed_quantity ? M.pct(m.contribution, m.costed_net) : null,
      partly_costed: m.uncosted_lines > 0 && m.costed_quantity > 0,
      options_unknown: m.options_unknown_lines > 0,
    };
  });
  const q = M.quadrants(rows, store.settings.quadrant_baseline);
  rows.forEach(r => { r.quadrant = q.quadrant.get(r.key); });
  rows.sort((a, b) => b.net_sales - a.net_sales);
  return {
    currency: store.currency,
    baseline: store.settings.quadrant_baseline,
    qty_line: q.qty_line,
    contribution_line: q.contribution_line,
    costed_sales_pct: M.pct(totals.costed_net, totals.net),
    menus: rows,
  };
}

/** 주문 구성 (§3-8) */
async function storeOrderMix(restaurantId, start, end) {
  const store = await loadStore(restaurantId);
  const { totals, channels, categoryOrders, pairs, menus } = await analyzePeriod(store, restaurantId, start, end);
  const n = totals.orders;
  const nameOf = (k) => (menus.get(k) && menus.get(k).name) || k;
  return {
    currency: store.currency,
    orders: n,
    avg_ticket: n ? M.r2(totals.net / n) : null,
    contribution_per_order: n ? M.r2(totals.costed_contribution / n) : null,
    costed_sales_pct: M.pct(totals.costed_net, totals.net),
    option_attach_pct: M.pct(totals.option_lines, totals.lines),
    set_order_pct: M.pct(totals.set_orders, n),
    channels: [...channels.values()].map(c => ({
      order_type: c.order_type, source: c.source, orders: c.orders,
      net_sales: M.r2(c.net), share_pct: M.pct(c.net, totals.net),
      avg_ticket: c.orders ? M.r2(c.net / c.orders) : null,
      contribution_per_order: c.orders ? M.r2(c.costed_contribution / c.orders) : null,
      costed_sales_pct: M.pct(c.costed_net, c.net),
      fees: M.r2(c.fees),
    })).sort((a, b) => b.net_sales - a.net_sales),
    categories: [...categoryOrders.entries()].map(([category, orders]) => ({ category, orders, attach_pct: M.pct(orders, n) }))
      .sort((a, b) => b.orders - a.orders),
    combos: [...pairs.values()].sort((a, b) => b.orders - a.orders).slice(0, 10).map(p => ({
      a: nameOf(p.a), b: nameOf(p.b), orders: p.orders, support_pct: M.pct(p.orders, n),
      contribution: p.uncosted ? null : M.r2(p.contribution),
    })),
  };
}

/** 시뮬레이터 기준값 (§3-9) — 최근 12주(끝 = end 또는 오늘) */
async function storeSimBaseline(restaurantId, end) {
  const store = await loadStore(restaurantId);
  const last = DATE_RE.test(end || '') ? end : todayIn(store.tz);
  const first = shiftDate(last, -(SIM_WINDOW_DAYS - 1));
  const { totals, menus, channels, orders } = await analyzePeriod(store, restaurantId, first, last);
  const openDays = new Set(orders.filter(o => !M.isStaffMeal(o)).map(o => new Date(o.order_date).toLocaleDateString('en-CA', { timeZone: store.tz }))).size;
  const { RestaurantCostEntry } = require('../models');
  const today = todayIn(store.tz);
  const rules = await RestaurantCostEntry.findAll({
    where: { restaurant_id: restaurantId, period_month: null, [Op.or]: [{ effective_to: null }, { effective_to: { [Op.gte]: today } }] },
    order: [['category', 'ASC'], ['id', 'ASC']],
  });
  const net = totals.net;
  const foodPct = M.pct(totals.costed_cost, totals.costed_net);
  const menuRows = [...menus.values()].sort((a, b) => b.net - a.net);
  const top = menuRows.slice(0, 10).map(m => ({
    key: m.key, name: m.name, share_pct: M.pct(m.net, net),
    food_cost_pct: m.costed_net > 0 ? M.pct(m.cost, m.costed_net) : null,
  }));
  const byType = new Map();
  for (const c of channels.values()) {
    const t = byType.get(c.order_type) || { order_type: c.order_type, net: 0, fees: 0 };
    t.net += c.net; t.fees += c.fees; byType.set(c.order_type, t);
  }
  return {
    currency: store.currency,
    window: { start: first, end: last, days: SIM_WINDOW_DAYS, open_days: openDays },
    orders: totals.orders,
    net_sales: M.r2(net),
    avg_ticket: totals.orders ? M.r2(net / totals.orders) : null,
    orders_per_day: openDays ? M.r1(totals.orders / openDays) : null,
    open_days_per_month: M.r1((openDays / SIM_WINDOW_DAYS) * (365 / 12)),
    monthly_net_sales: M.r2((net / SIM_WINDOW_DAYS) * (365 / 12)),
    discount_pct: M.pct(totals.discount, totals.gross),
    food_cost_pct: foodPct,
    fee_pct: M.pct(totals.fees, net),
    costed_sales_pct: M.pct(totals.costed_net, net),
    menus: top,
    others_share_pct: top.length ? M.r1(Math.max(0, 100 - top.reduce((s, m) => s + (m.share_pct || 0), 0))) : null,
    channels: [...byType.values()].map(t => ({ order_type: t.order_type, share_pct: M.pct(t.net, net), fee_pct: M.pct(t.fees, t.net) })),
    cost_rules: rules.map(costEntryView),
    targets: store.settings.targets,
  };
}

function costEntryView(e) {
  const j = e.toJSON ? e.toJSON() : e;
  return {
    id: j.id, category: j.category, label: j.label, rule: j.rule,
    fixed_amount: j.fixed_amount === null ? null : parseFloat(j.fixed_amount),
    pct: j.pct === null ? null : parseFloat(j.pct),
    period_month: j.period_month, external_sales: j.external_sales === null ? null : parseFloat(j.external_sales),
    effective_from: j.effective_from, effective_to: j.effective_to, note: j.note,
  };
}

/** 여러 매장 비교 행(§6-3 · §6-4) — 같은 storeSummary 를 매장마다 */
async function storesComparison(restaurantIds, start, end) {
  const rows = [];
  for (const id of restaurantIds) {
    try {
      const s = await storeSummary(id, start, end);
      rows.push({
        restaurant_id: id, name: s.restaurant.name, brand_id: s.restaurant.brand_id, currency: s.restaurant.currency,
        orders: s.orders, net_sales: s.net_sales, avg_ticket: s.avg_ticket,
        contribution: s.contribution, contribution_pct: s.contribution_pct, food_cost_pct: s.food_cost_pct,
        costed_sales_pct: s.costed_sales_pct,
        previous: { net_sales: s.previous.net_sales, contribution_pct: s.previous.contribution_pct },
        readiness: s.readiness, targets: s.targets,
      });
    } catch (e) {
      if (e.status === 400) throw e;
      rows.push({ restaurant_id: id, error: true });
    }
  }
  return rows;
}

module.exports = {
  DEFAULT_SETTINGS, FEE_KEYS, CHANNEL_FEE_KEYS,
  readSettings, storeSummary, storeMenus, storeOrderMix, storeSimBaseline, storesComparison, costEntryView,
};

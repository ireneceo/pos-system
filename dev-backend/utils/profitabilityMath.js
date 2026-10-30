/**
 * 수익성 분석 — 순수 계산 단일 소스 (설계 .claude/fable-design-20261029-brand-profitability.md §3)
 *
 * DB 를 읽지 않는다. 서비스(services/profitability)가 주문·원가를 읽어 여기로 넘긴다.
 * 검산 사례 §3-10 = tests/profitability-math.test.js.
 *
 * 규칙
 *   - 주문 순매출 = subtotal + takeaway_charge − 할인 4종 (세금·서비스차지·배달요금 제외 §3-2)
 *   - 라인 순매출 = 라인 총액(price × quantity) 을 주문 순매출에 비례 배분 · 반올림 잔차는 마지막 라인에
 *   - 공헌이익 = 라인 순매출 − 라인 원가 − 라인 수수료 · 원가 모르면 null(0 으로 두지 않는다)
 *   - 비율의 분모가 0 이면 null — 0 으로 나누지 않는다
 */

const r2 = (n) => Math.round((Number(n) || 0) * 100) / 100;
const r1 = (n) => Math.round((Number(n) || 0) * 10) / 10;
const num = (v) => { const n = parseFloat(v); return Number.isFinite(n) ? n : 0; };

/** 비율(%) — 분모 0·null 이면 null */
function pct(part, whole) {
  if (part === null || part === undefined || !(whole > 0)) return null;
  return r1((part / whole) * 100);
}

/** 할인 4종 합 */
function orderDiscount(o) {
  return num(o.discount) + num(o.discount_policy_amount) + num(o.coupon_discount) + num(o.point_discount);
}

/** 주문 총매출(할인 전) = subtotal + 포장요금 */
function orderGross(o) {
  return num(o.subtotal) + num(o.takeaway_charge);
}

/** 주문 순매출 — 음수가 되지 않는다(100 % 할인 = 0) */
function orderNetSales(o) {
  return r2(Math.max(0, orderGross(o) - orderDiscount(o)));
}

/** 라인 총액 = price × quantity */
function lineGross(item) {
  const q = parseInt(item && item.quantity, 10) || 1;
  return num(item && item.price) * q;
}

/**
 * 주문 순매출을 라인에 비례 배분. 라인 합 = 주문 순매출(잔차는 마지막 라인).
 * @param {number[]} grosses 라인 총액들
 * @param {number} net 주문 순매출
 * @returns {number[]}
 */
function allocateNet(grosses, net) {
  const total = grosses.reduce((s, g) => s + g, 0);
  if (!grosses.length) return [];
  if (!(total > 0) || !(net > 0)) return grosses.map(() => 0);
  const out = grosses.map(g => r2((g / total) * net));
  const diff = r2(net - out.reduce((s, v) => s + v, 0));
  out[out.length - 1] = r2(out[out.length - 1] + diff);
  return out;
}

/** 결제수단 이름 → 수수료 설정 키(payment_settings 어휘) */
function feeKey(method) {
  const m = String(method || '').trim();
  if (m === 'bank_transfer') return 'bankTransfer';
  if (m === 'e_wallet') return 'ewallet';
  if (m === 'payAtCounter') return 'counter';
  return m;
}

/**
 * 주문 1건의 수수료율(%) — 결제 줄이 여럿이면 금액 비중으로 섞는다 + 채널 수수료(delivery/pickup 등).
 * @param {{payment_method?:string, order_type?:string}} order
 * @param {Array<{method:string, amount:number}>} payments 주문 결제 줄(없으면 order.payment_method)
 * @param {{fees?:object, channel_fees?:object}} settings
 */
function orderFeeRate(order, payments, settings) {
  const fees = (settings && settings.fees) || {};
  const channelFees = (settings && settings.channel_fees) || {};
  const rateOf = (m) => num(fees[feeKey(m)]);
  let payRate;
  const rows = (payments || []).filter(p => num(p.amount) > 0);
  if (rows.length) {
    const sum = rows.reduce((s, p) => s + num(p.amount), 0);
    payRate = rows.reduce((s, p) => s + (num(p.amount) / sum) * rateOf(p.method), 0);
  } else {
    payRate = rateOf(order && order.payment_method);
  }
  return payRate + num(channelFees[order && order.order_type]);
}

/**
 * 라인 공헌이익.
 * @param {{net:number, cost:number|null, feeRate:number}} p feeRate 는 %
 * @returns {{net:number, fee:number, cost:number|null, contribution:number|null, margin_pct:number|null}}
 */
function lineContribution({ net, cost, feeRate }) {
  const fee = r2(num(net) * num(feeRate) / 100);
  if (cost === null || cost === undefined) return { net: r2(net), fee, cost: null, contribution: null, margin_pct: null };
  const contribution = r2(num(net) - num(cost) - fee);
  return { net: r2(net), fee, cost: r2(cost), contribution, margin_pct: pct(contribution, net) };
}

/**
 * 판매 라인 1개(수량 1)의 원가 = 본체 + 옵션 + 세트 구성품 (§3-1)
 *   - 본체 모르면 null
 *   - 세트: 구성품 하나라도 모르면 null(부분합 금지)
 *   - 옵션: 재료 연결 없는 옵션은 0 으로 두되 optionsUnknown 으로 알린다(메뉴 전체를 null 로 만들지 않는다)
 * @param {{body:number|null, isSet:boolean, components:Array<{cost:number|null, qty:number}>, options:Array<number|null>}} p
 * @returns {{unit_cost:number|null, options_unknown:boolean}}
 */
function lineUnitCost({ body, isSet, components, options }) {
  let base;
  if (isSet && components && components.length) {
    if (components.some(c => c.cost === null || c.cost === undefined)) return { unit_cost: null, options_unknown: false };
    base = components.reduce((s, c) => s + num(c.cost) * (num(c.qty) || 1), 0);
  } else {
    if (body === null || body === undefined) return { unit_cost: null, options_unknown: false };
    base = num(body);
  }
  let optionsUnknown = false;
  let opt = 0;
  for (const o of options || []) {
    if (o === null || o === undefined) optionsUnknown = true;
    else opt += num(o);
  }
  return { unit_cost: Math.round((base + opt) * 10000) / 10000, options_unknown: optionsUnknown };
}

/** 중앙값 — 빈 배열이면 null */
function median(values) {
  const v = values.filter(x => Number.isFinite(x)).sort((a, b) => a - b);
  if (!v.length) return null;
  const mid = Math.floor(v.length / 2);
  return v.length % 2 ? v[mid] : (v[mid - 1] + v[mid]) / 2;
}

/**
 * 메뉴 성과판 4분면 (§3-7). 원가 아는 메뉴만 분면에 넣고, 기준선은 메뉴 수 기준 중앙값(또는 평균의 70 %).
 * @param {Array<{key:string, quantity:number, unit_contribution:number|null}>} menus
 * @param {'median'|'avg70'} baseline
 * @returns {{qty_line:number|null, contribution_line:number|null, quadrant:Map<string,string>}}
 */
function quadrants(menus, baseline = 'median') {
  const costed = menus.filter(m => m.unit_contribution !== null && m.unit_contribution !== undefined);
  const line = (vals) => {
    if (!vals.length) return null;
    if (baseline === 'avg70') return (vals.reduce((s, x) => s + x, 0) / vals.length) * 0.7;
    return median(vals);
  };
  const qtyLine = line(costed.map(m => num(m.quantity)));
  const conLine = line(costed.map(m => num(m.unit_contribution)));
  const quadrant = new Map();
  for (const m of menus) {
    if (m.unit_contribution === null || m.unit_contribution === undefined) { quadrant.set(m.key, 'unknown'); continue; }
    const hiQ = num(m.quantity) >= qtyLine;
    const hiC = num(m.unit_contribution) >= conLine;
    quadrant.set(m.key, hiQ && hiC ? 'star' : hiQ ? 'plowhorse' : hiC ? 'puzzle' : 'dog');
  }
  return { qty_line: qtyLine === null ? null : r2(qtyLine), contribution_line: conLine === null ? null : r2(conLine), quadrant };
}

/**
 * 월 금액을 기간 일수로 배분 (§3-3 «10월 1~15일이면 월 임대료 × 15/31»)
 * @param {number} monthly 월 금액
 * @param {number} days 기간 안 일수
 * @param {number} daysInMonth 그 달 일수
 */
function prorateMonthly(monthly, days, daysInMonth) {
  if (!(daysInMonth > 0)) return 0;
  return r2(num(monthly) * days / daysInMonth);
}

/** 운영비 규칙 1개의 월 금액 (§3-5) — fixed / pct(순매출 %) / max(둘 중 큰 값) */
function ruleAmount({ rule, fixed_amount, pct: p }, sales) {
  const fixed = num(fixed_amount);
  const share = num(sales) * num(p) / 100;
  if (rule === 'pct') return r2(share);
  if (rule === 'max') return r2(Math.max(fixed, share));
  return r2(fixed);
}

/** 직원 식사 주문 — 매출이 아니라 비용(§3-2) */
const isStaffMeal = (o) => o && o.payment_method === 'staffMeal';

/** 세트 라인인가 — is_set_menu 또는 구성품이 있음 */
const isSetLine = (item) => !!(item && (item.is_set_menu || (Array.isArray(item.set_components) && item.set_components.length)));

/** 유료 옵션이 붙은 라인인가 («토핑 추가율» 자리 §3-8) */
const hasPaidOption = (item) => Array.isArray(item && item.selectedOptions) && item.selectedOptions.some(o => num(o && o.price) > 0);

/**
 * 주문 묶음 → 메뉴별·주문 구성 집계 (§3-2 · §3-8). DB 를 읽지 않는다 — 상품 해석·원가는 콜백으로 받는다.
 * @param {Array<object>} orders  매출 주문(revenueOrderWhere 로 읽은 것 — 직원 식사는 여기서 뺀다)
 * @param {{
 *   payments?: Map<number, Array<{method:string, amount:number}>>,
 *   resolveLine: (item:object) => {key:string, name:string, category:string, product_id:number|null},
 *   costOfLine: (item:object) => {unit_cost:number|null, options_unknown:boolean},
 *   settings: object,
 * }} ctx
 */
function analyzeOrders(orders, ctx) {
  const totals = {
    orders: 0, gross: 0, discount: 0, net: 0, fees: 0,
    lines: 0, costed_lines: 0, costed_net: 0, costed_cost: 0, costed_contribution: 0,
    service_charge: 0, delivery_fee: 0,
    option_lines: 0, set_orders: 0, options_unknown_lines: 0,
    staff_meal: { orders: 0, cost: 0, uncosted_lines: 0 },
  };
  const menus = new Map();
  const channels = new Map();
  const categoryOrders = new Map();
  const pairs = new Map();

  for (const o of orders || []) {
    const items = Array.isArray(o.order_items) ? o.order_items : [];
    if (isStaffMeal(o)) {
      totals.staff_meal.orders += 1;
      for (const it of items) {
        const q = parseInt(it.quantity, 10) || 1;
        const c = ctx.costOfLine(it);
        if (c.unit_cost === null) totals.staff_meal.uncosted_lines += 1;
        else totals.staff_meal.cost += c.unit_cost * q;
      }
      continue;
    }
    const net = orderNetSales(o);
    const feeRate = orderFeeRate(o, ctx.payments && ctx.payments.get(o.id), ctx.settings);
    const grosses = items.map(lineGross);
    const nets = allocateNet(grosses, net);

    totals.orders += 1;
    totals.gross += orderGross(o);
    totals.discount += orderDiscount(o);
    totals.net += net;
    totals.service_charge += num(o.service_charge);
    totals.delivery_fee += num(o.delivery_fee);

    const chKey = `${o.order_type || 'unknown'}|${o.source || 'pos'}`;
    if (!channels.has(chKey)) channels.set(chKey, { order_type: o.order_type || 'unknown', source: o.source || 'pos', orders: 0, net: 0, fees: 0, costed_contribution: 0, costed_net: 0 });
    const ch = channels.get(chKey);
    ch.orders += 1; ch.net += net;

    const cats = new Set();
    const keysInOrder = new Map();
    let hasSet = false;
    items.forEach((it, i) => {
      const q = parseInt(it.quantity, 10) || 1;
      const ref = ctx.resolveLine(it);
      const cost = ctx.costOfLine(it);
      const lineCost = cost.unit_cost === null ? null : cost.unit_cost * q;
      const lc = lineContribution({ net: nets[i], cost: lineCost, feeRate });

      totals.lines += 1;
      totals.fees += lc.fee;
      ch.fees += lc.fee;
      if (cost.options_unknown) totals.options_unknown_lines += 1;
      if (hasPaidOption(it)) totals.option_lines += 1;
      if (isSetLine(it)) hasSet = true;
      cats.add(ref.category);

      if (!menus.has(ref.key)) menus.set(ref.key, { key: ref.key, name: ref.name, category: ref.category, product_id: ref.product_id, quantity: 0, gross: 0, net: 0, fees: 0, cost: 0, contribution: 0, costed_quantity: 0, costed_net: 0, uncosted_lines: 0, options_unknown_lines: 0 });
      const m = menus.get(ref.key);
      m.quantity += q; m.gross += grosses[i]; m.net += lc.net; m.fees += lc.fee;
      if (cost.options_unknown) m.options_unknown_lines += 1;
      if (lc.contribution === null) m.uncosted_lines += 1;
      else {
        m.cost += lc.cost; m.contribution += lc.contribution; m.costed_quantity += q; m.costed_net += lc.net;
        totals.costed_lines += 1; totals.costed_net += lc.net; totals.costed_cost += lc.cost; totals.costed_contribution += lc.contribution;
        ch.costed_contribution += lc.contribution; ch.costed_net += lc.net;
      }
      const prev = keysInOrder.get(ref.key);
      keysInOrder.set(ref.key, prev === undefined ? lc.contribution : (prev === null || lc.contribution === null ? null : prev + lc.contribution));
    });
    if (hasSet) totals.set_orders += 1;
    for (const c of cats) categoryOrders.set(c, (categoryOrders.get(c) || 0) + 1);

    // 함께 든 메뉴 쌍(§3-8 조합) — 주문당 한 번씩
    const keys = [...keysInOrder.keys()].sort();
    for (let a = 0; a < keys.length; a++) {
      for (let b = a + 1; b < keys.length; b++) {
        const k = `${keys[a]}\u0000${keys[b]}`;
        if (!pairs.has(k)) pairs.set(k, { a: keys[a], b: keys[b], orders: 0, contribution: 0, uncosted: false });
        const p = pairs.get(k);
        p.orders += 1;
        const ca = keysInOrder.get(keys[a]); const cb = keysInOrder.get(keys[b]);
        if (ca === null || cb === null) p.uncosted = true; else p.contribution += ca + cb;
      }
    }
  }
  return { totals, menus, channels, categoryOrders, pairs };
}

module.exports = {
  isStaffMeal, isSetLine, hasPaidOption, analyzeOrders,
  r2, r1, pct,
  orderDiscount, orderGross, orderNetSales, lineGross, allocateNet,
  feeKey, orderFeeRate, lineContribution, lineUnitCost,
  median, quadrants, prorateMonthly, ruleAmount,
};

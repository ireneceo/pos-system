/**
 * 손님 주문 서버 재계산 (2026-10-09 사전점검 S1 · Fable 판정 backups/fable-pending/fable-verdict-20261009-s1-repricing.md)
 *
 * 로그인 없는 주문(손님 폰·키오스크·위조 요청)은 화면이 계산한 단가·합계를 믿지 않는다.
 *   ① resolveGuestLines  — 줄마다 이 매장 메뉴에서 상품·옵션·세트를 찾아 단가를 확정(DB)
 *   ② computeGuestTotals — 소계·포장비·배달비·쿠폰·포인트·세금·서비스차지·반올림.
 *      합계 공식은 새로 만들지 않고 단일 계산기 utils/orderTotals.computeOrderTotals 를 쓴다(그 파일 무변경).
 *   ③ priceGuestOrder    — 둘을 묶는다. 라우트(orders-crud POST / · mobile-orders POST /order)는 이것만 부른다.
 *
 * 못 찾으면 400 code 로 거절(주문 안 생김). 화면 값으로 돌아가는 폴백은 없다 — 폴백이 곧 구멍이다.
 * 산술 부분(takeawayChargeFor · deliveryFeeFor · roundCash · serviceChargeRateFor)은 순수 함수 — tests/guest-order-pricing.test.js.
 */
const { computeOrderTotals, round2 } = require('./orderTotals');
const { computeSetPricing, resolveSetGroups } = require('./setMenu');
// DB 를 쓰는 모듈(stationEnrichment·couponValidate → models)은 쓰는 함수 안에서 부른다 — 순수 산술부 단위 테스트가 DB 에 붙지 않게.

const fail = (code, message) => ({ ok: false, code, message });
const lower = (s) => String(s == null ? '' : s).trim().toLowerCase();
const num = (v) => { const n = Number(v); return Number.isFinite(n) ? n : 0; };

function parseIdList(v) {
  if (!v) return [];
  let p = v;
  try { if (typeof p === 'string') p = JSON.parse(p); if (typeof p === 'string') p = JSON.parse(p); } catch { return []; }
  return Array.isArray(p) ? p.map((x) => Number(typeof x === 'object' && x ? x.id : x)).filter(Number.isInteger) : [];
}

const normOrderType = (t) => lower(t).replace(/-/g, '_') || 'dine_in';

// ── 순수 함수 ──────────────────────────────────────────────────────────────

/** 포장비 — 화면 calculateTakeawayCharge / StoreContext.getTakeawayCharge 와 같은 규칙. metas: [{qty, product}] */
function takeawayChargeFor(orderType, takeawayPricing, metas) {
  const ot = normOrderType(orderType);
  if ((ot !== 'takeaway' && ot !== 'pickup') || !takeawayPricing || !takeawayPricing.enabled) return 0;
  const type = takeawayPricing.pricingType;
  let charge = 0;
  for (const m of metas) {
    let per = 0;
    if (type === 'per-item') {
      per = num(takeawayPricing.perItemCharge);
    } else if (type === 'per-item-individual') {
      const o = m.product && m.product.takeaway_charge;
      per = (o === null || o === undefined || o === '') ? num(takeawayPricing.defaultPerItemCharge) : num(o);
    } else {
      const cc = takeawayPricing.categoryCharges || {};
      const key = lower(m.product && m.product.category);
      per = key && Object.prototype.hasOwnProperty.call(cc, key) ? num(cc[key]) : 0;
    }
    charge += per * m.qty;
  }
  return round2(charge);
}

/** 배달비 — 구역 없으면 0 · 구역이 있는데 고르지 않았으면 오류 · freeAbove 이상이면 0. */
function deliveryFeeFor(orderType, deliveryPricing, deliveryInfo, subtotal) {
  if (normOrderType(orderType) !== 'delivery') return { ok: true, fee: 0 };
  const zones = (deliveryPricing && Array.isArray(deliveryPricing.zones)) ? deliveryPricing.zones : [];
  if (zones.length === 0) return { ok: true, fee: 0 };
  let info = deliveryInfo;
  if (typeof info === 'string') { try { info = JSON.parse(info); } catch { info = null; } }
  const zid = info && info.zoneId != null ? String(info.zoneId) : null;
  const zname = info && info.zoneName ? lower(info.zoneName) : null;
  const zone = zones.find((z) => (zid && String(z.id) === zid) || (zname && lower(z.name) === zname));
  if (!zone) return fail('DELIVERY_ZONE_REQUIRED', 'Please select a delivery zone');
  const freeAbove = deliveryPricing.freeAbove != null && deliveryPricing.freeAbove !== '' ? num(deliveryPricing.freeAbove) : 999999;
  return { ok: true, fee: subtotal >= freeAbove ? 0 : round2(num(zone.fee)) };
}

/** 서비스차지율 — 화면 scApplies 와 같은 규칙(takeaway 만 제외 토글, pickup 은 제외 안 함). */
function serviceChargeRateFor(orderType, os) {
  if (!os || !os.serviceChargeEnabled) return 0;
  const excludeTakeaway = os.serviceChargeExcludeTakeaway ?? true;
  if (normOrderType(orderType) === 'takeaway' && excludeTakeaway) return 0;
  return num(os.serviceChargeRate);
}

/** 현금 반올림 — rounding_apply_to==='all' 일 때만 합계에 적용(화면과 같은 규칙). */
function roundCash(total, cashRounding, applyTo) {
  const r = num(cashRounding);
  if (applyTo !== 'all' || !(r > 0)) return round2(total);
  return round2(Math.round(total / r) * r);
}

// ── ① 줄 해석 ───────────────────────────────────────────────────────────────

async function resolveGuestLines(restaurantId, items) {
  if (!Array.isArray(items) || items.length === 0) return fail('EMPTY_ORDER', 'Order has no items');
  const { Product, OptionGroup, Option } = require('../models');
  const { resolveProductId } = require('./stationEnrichment');

  const allProducts = await Product.findAll({
    where: { restaurant_id: restaurantId },
    attributes: ['id', 'code', 'name', 'price', 'category', 'optionGroups', 'is_active', 'is_set_menu', 'set_groups', 'set_items', 'takeaway_charge']
  });
  const byId = new Map(allProducts.map((p) => [Number(p.id), p]));
  const active = allProducts.filter((p) => p.is_active);
  const byName = new Map();
  const addName = (k, p) => { if (!k) return; if (!byName.has(k)) byName.set(k, []); byName.get(k).push(p); };
  for (const p of active) {
    addName(lower(p.name), p);
    if (p.code) addName(lower(`${p.code} ${p.name}`), p);
  }

  const groups = await OptionGroup.findAll({
    where: { restaurant_id: restaurantId, isActive: true },
    include: [{ model: Option, as: 'options', attributes: ['id', 'name', 'price', 'isActive'] }]
  });
  const groupOptions = new Map(groups.map((g) => [Number(g.id), (g.options || []).filter((o) => o.isActive)]));
  const optionsOf = (product) => parseIdList(product && product.optionGroups).flatMap((gid) => groupOptions.get(gid) || []);

  // 옵션 고르기 — 번호가 오면 번호로, 없으면 이름으로. 그 상품에 달린 활성 옵션 안에서만.
  const pickOptions = (product, ids, names, lineName) => {
    const allowed = optionsOf(product);
    const out = [];
    if (Array.isArray(ids) && ids.length > 0) {
      for (const raw of ids) {
        const o = allowed.find((x) => Number(x.id) === Number(raw));
        if (!o) return fail('OPTION_NOT_FOUND', `Option is not available for "${lineName}"`);
        out.push(o);
      }
      return { ok: true, options: out };
    }
    for (const n of (names || [])) {
      if (!lower(n)) continue;
      const o = allowed.find((x) => lower(x.name) === lower(n));
      if (!o) return fail('OPTION_NOT_FOUND', `Option "${n}" is not available for "${lineName}"`);
      out.push(o);
    }
    return { ok: true, options: out };
  };

  const lines = [];
  const metas = [];
  for (const item of items) {
    if (!item || typeof item !== 'object') return fail('EMPTY_ORDER', 'Invalid order item');
    const qty = Number(item.quantity);
    if (!Number.isInteger(qty) || qty < 1 || qty > 99) return fail('BAD_QUANTITY', 'Invalid item quantity');
    const lineName = String(item.name || '').trim();

    // 상품 찾기: ① 번호 ② 이름(«이름» 또는 «코드 이름»)
    let product = null;
    const pid = resolveProductId(item);
    if (pid != null) {
      const p = byId.get(pid);
      if (p && p.is_active) product = p;
    }
    if (!product) {
      const cands = byName.get(lower(lineName)) || [];
      if (cands.length === 1) product = cands[0];
      else if (cands.length > 1) {
        const hint = num(item.basePrice != null ? item.basePrice : item.price);
        product = cands.find((p) => round2(num(p.price)) === round2(hint))
          || cands.slice().sort((a, b) => num(b.price) - num(a.price))[0];
      }
    }
    if (!product) return fail('ITEM_NOT_FOUND', `"${lineName || 'Item'}" is not on the menu`);

    const base = round2(num(product.price));
    const optionNames = Array.isArray(item.optionDetails) && item.optionDetails.length
      ? item.optionDetails.map((o) => o && o.name)
      : (Array.isArray(item.options) ? item.options : []);
    const own = pickOptions(product, item.option_ids, optionNames, lineName);
    if (!own.ok) return own;
    const ownSum = own.options.reduce((s, o) => s + num(o.price), 0);

    let unit;
    const out = { ...item };
    const comps = Array.isArray(item.set_components) ? item.set_components : [];
    if (product.is_set_menu && comps.length > 0) {
      const setGroups = resolveSetGroups(product);
      const member = new Set();
      setGroups.forEach((g) => (g.items || []).forEach((it) => member.add(`${g.id}:${Number(it.product_id)}`)));
      let compOptSum = 0;
      for (const cp of comps) {
        if (!cp || !member.has(`${cp.group_id}:${Number(cp.product_id)}`)) {
          return fail('SET_COMPONENT_INVALID', `Set "${lineName}" has an invalid choice`);
        }
        const compProduct = byId.get(Number(cp.product_id));
        const co = pickOptions(compProduct, null, Array.isArray(cp.options) ? cp.options : [], cp.name || lineName);
        if (!co.ok) return co;
        compOptSum += co.options.reduce((s, o) => s + num(o.price), 0);
      }
      const sp = computeSetPricing(setGroups, base, comps.map((cp) => ({ ...cp, product_id: Number(cp.product_id) })));
      unit = round2(sp.total + compOptSum + ownSum);
      const upByKey = new Map(sp.components.map((cp) => [`${cp.group_id}:${cp.product_id}`, cp.upcharge]));
      out.set_components = comps.map((cp) => ({ ...cp, upcharge: upByKey.get(`${cp.group_id}:${Number(cp.product_id)}`) || 0 }));
    } else {
      unit = round2(base + ownSum);
    }

    out.price = unit;
    out.basePrice = base;
    out.optionPrice = round2(unit - base);
    if (own.options.length > 0 || Array.isArray(item.optionDetails)) {
      out.optionDetails = own.options.map((o) => ({ name: o.name, price: round2(num(o.price)) }));
    }
    lines.push(out);
    metas.push({ qty, product, unit });
  }
  return { ok: true, lines, metas };
}

// ── ② 합계 ─────────────────────────────────────────────────────────────────

async function computeGuestTotals({ restaurant, orderType, metas, couponCode, customerId, pointsUsed, deliveryInfo }) {
  const os = restaurant.operation_settings || {};
  const ot = normOrderType(orderType);
  const subtotal = round2(metas.reduce((s, m) => s + m.unit * m.qty, 0));
  const takeawayCharge = takeawayChargeFor(ot, os.takeawayPricing, metas);
  const dl = deliveryFeeFor(ot, os.deliveryPricing, deliveryInfo, subtotal);
  if (!dl.ok) return dl;

  // 쿠폰 — 쿠폰 화면·라우트와 같은 판정(utils/couponValidate), 기준 금액 = 소계(화면과 같음)
  let couponDiscount = 0, coupon = null, couponCodeOut = null;
  if (couponCode && String(couponCode).trim()) {
    const { validateCoupon } = require('./couponValidate');
    const r = await validateCoupon({ code: String(couponCode).trim(), restaurant_id: restaurant.id, customer_id: customerId || undefined, order_amount: subtotal, order_type: ot });
    if (r.status !== 200 || !r.body || !r.body.valid) {
      const msg = (r.body && (typeof r.body.error === 'string' ? r.body.error : r.body.error && r.body.error.message)) || 'Invalid coupon';
      return fail('COUPON_INVALID', msg);
    }
    couponDiscount = num(r.body.data.discountAmount);
    if (couponDiscount > 0) {
      const Coupon = require('../models/Coupon');
      const row = await Coupon.findByPk(r.body.data.coupon.id, { attributes: ['type', 'value', 'max_discount'] });
      coupon = row ? { type: row.type, value: num(row.value), maxDiscount: row.max_discount != null ? num(row.max_discount) : null } : null;
      couponCodeOut = r.body.data.coupon.code;
    }
  }

  // 포인트 — 회원만, 매장 멤버십 규칙 안에서
  const pts = parseInt(pointsUsed, 10) || 0;
  let pointDiscount = 0;
  if (pts > 0) {
    if (!customerId) return fail('POINTS_REQUIRE_MEMBER', 'Points can only be used by members');
    const { MembershipSettings, RestaurantCustomer } = require('../models');
    const ms = await MembershipSettings.findOne({ where: { restaurant_id: restaurant.id } });
    const rc = await RestaurantCustomer.findOne({ where: { restaurant_id: restaurant.id, customer_id: customerId } });
    const ptc = num(ms && ms.points_to_currency) || 100;
    const maxPct = ms && ms.max_points_per_order_percent != null ? num(ms.max_points_per_order_percent) : 50;
    const maxPts = Math.floor((subtotal - couponDiscount) * (maxPct / 100) * ptc);
    if (!ms || !ms.is_active || pts < (num(ms.min_points_to_use) || 0) || !rc || pts > num(rc.points) || pts > maxPts) {
      return fail('POINTS_INVALID', 'Points cannot be used for this order');
    }
    pointDiscount = round2(pts / ptc);
  }

  const taxRate = os.taxEnabled ? num(os.taxRate) : 0;
  const scRate = serviceChargeRateFor(ot, os);
  // oldTax / oldServiceCharge 는 computeOrderTotals 의 «원래 적용됐나» 관문 — 새 주문이라 켜짐(1)/꺼짐(0)만 넘긴다.
  const t = computeOrderTotals({
    newSubtotal: subtotal, oldSubtotal: subtotal, takeawayCharge, deliveryFee: dl.fee,
    discount: 0, oldDiscountPolicyAmount: 0, oldCouponDiscount: couponDiscount, coupon,
    pointDiscount, oldTax: taxRate > 0 ? 1 : 0, taxRate, oldServiceCharge: scRate > 0 ? 1 : 0, serviceChargeRate: scRate
  });
  const total = roundCash(t.total, restaurant.cash_rounding, restaurant.rounding_apply_to);
  return {
    ok: true,
    fields: {
      subtotal: t.subtotal,
      takeaway_charge: takeawayCharge,
      delivery_fee: dl.fee,
      coupon_code: t.couponDiscount > 0 ? couponCodeOut : null,
      coupon_discount: t.couponDiscount > 0 ? t.couponDiscount : null,
      points_used: pts > 0 ? pts : null,
      point_discount: pointDiscount > 0 ? pointDiscount : null,
      tax: t.tax,
      tax_rate: taxRate,
      service_charge: t.serviceCharge,
      service_charge_rate: scRate,
      total_amount: total
    }
  };
}

// ── ③ 묶음 ─────────────────────────────────────────────────────────────────

/**
 * @param {{restaurant: object, body: object}} p body = 주문 본문(order_items|items, order_type, coupon_code, customer_id, points_used, delivery_info, total_amount)
 * @returns {{ok:true, fields:object} | {ok:false, code:string, message:string}}
 */
async function priceGuestOrder({ restaurant, body }) {
  const items = body.order_items || body.items || [];
  const r = await resolveGuestLines(restaurant.id, items);
  if (!r.ok) return r;
  const t = await computeGuestTotals({
    restaurant,
    orderType: body.order_type || body.orderType,
    metas: r.metas,
    couponCode: body.coupon_code || body.couponCode,
    customerId: body.customer_id || body.customerId || null,
    pointsUsed: body.points_used,
    deliveryInfo: body.delivery_info
  });
  if (!t.ok) return t;
  const clientTotal = Number(body.total_amount);
  if (Number.isFinite(clientTotal) && Math.abs(clientTotal - t.fields.total_amount) > 0.05) {
    console.warn(`[GUEST-REPRICE] restaurant ${restaurant.id}: client ${clientTotal} → server ${t.fields.total_amount}`);
  }
  return { ok: true, fields: { ...t.fields, order_items: r.lines } };
}

module.exports = {
  priceGuestOrder, resolveGuestLines, computeGuestTotals,
  takeawayChargeFor, deliveryFeeFor, serviceChargeRateFor, roundCash
};

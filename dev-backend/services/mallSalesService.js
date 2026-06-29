/**
 * mallSalesService — 입점몰 매출보고 API 연동의 집계·인증·전송 핵심.
 *
 * 첫 사례: thefire01 @ IOI Mall Damansara (Tangent/Synthesis "POS SalesHourly").
 * 계약·매핑·결정의 단일 진실: docs/MALL_SALES_API_INTEGRATION.md
 *
 * 한 영업일 = 24개 시간별(hour 00~23) sale 레코드(전부 필수, 모든 값 string).
 * 매장 타임존(MYT) 기준 시간대 버킷. 전송은 OAuth2 password grant → POST /SalesHourly.
 */

const { Op } = require('sequelize');
const { Restaurant, Order, OrderPayment } = require('../models');
const { decrypt } = require('../utils/encryption');
const logger = require('../utils/logger');

// ── Provider 기본 엔드포인트 (환경별). UI/DB 미설정 시 폴백 ────────────────
const PROVIDER_DEFAULTS = {
  tangent_synthesis: {
    staging: {
      token_url: 'https://staging.synthesis.bz/posmy/v1/api/token',
      sales_url: 'https://staging.synthesis.bz/posmy/v1/api/SalesHourly'
    },
    // 운영 URL 은 몰이 별도 발송 — 도착 시 DB(token_url/sales_url) 또는 여기에 채움.
    production: { token_url: '', sales_url: '' }
  }
};

function resolveEndpoints(integration) {
  const d = (PROVIDER_DEFAULTS[integration.provider] || {})[integration.environment] || {};
  return {
    token_url: integration.token_url || d.token_url || '',
    sales_url: integration.sales_url || d.sales_url || ''
  };
}

// ── 타임존 헬퍼 (MYT 고정 UTC+8, DST 없음 — toLocaleString 으로 일반화) ──────
function getTimezoneOffsetHours(tz) {
  const s = new Date().toLocaleString('en-US', { timeZone: tz, timeZoneName: 'shortOffset' });
  const m = s.match(/GMT([+-]\d+)/);
  return m ? parseInt(m[1], 10) : 8; // 기본 MYT
}

// 매장 타임존 영업일(YYYY-MM-DD) → UTC 시작/끝 경계
function utcBoundsForDate(dateStr, tz, isEnd) {
  const offsetHours = getTimezoneOffsetHours(tz);
  const d = new Date(`${dateStr}T${isEnd ? '23:59:59.999' : '00:00:00.000'}`);
  d.setHours(d.getHours() - offsetHours);
  return d;
}

// UTC 시각 → 매장 타임존의 hour(0~23)
function hourInTz(utcDate, tz) {
  const h = utcDate.toLocaleString('en-US', { timeZone: tz, hour: '2-digit', hour12: false });
  // 'en-US' 24h 는 '00'~'23' 이지만 자정이 '24' 로 나오는 로캘 보호.
  const n = parseInt(h, 10) % 24;
  return Number.isFinite(n) ? n : 0;
}

function pad2(n) { return String(n).padStart(2, '0'); }
function money(n) { return (Math.round((Number(n) || 0) * 100) / 100).toFixed(2); }

// ── 플로어플랜 테이블 → 좌석수 맵 (noofpax 산출용) ────────────────────────
function buildSeatMap(restaurant) {
  let fp = restaurant.floor_plan;
  if (typeof fp === 'string') { try { fp = JSON.parse(fp); } catch { fp = null; } }
  const tables = (fp && Array.isArray(fp.tables)) ? fp.tables : [];
  const byId = new Map();      // floor_plan_table_id (예: "ft-...")
  const byNumber = new Map();  // tableNumber (예: "T001")
  for (const t of tables) {
    const seats = parseInt(t.seats, 10) || 0;
    if (t.id != null) byId.set(String(t.id), seats);
    if (t.tableNumber != null) byNumber.set(String(t.tableNumber), seats);
  }
  return { byId, byNumber };
}

function seatsForOrder(order, seatMap) {
  if (order.floor_plan_table_id && seatMap.byId.has(String(order.floor_plan_table_id))) {
    return seatMap.byId.get(String(order.floor_plan_table_id));
  }
  if (order.table_number && seatMap.byNumber.has(String(order.table_number))) {
    return seatMap.byNumber.get(String(order.table_number));
  }
  return 0;
}

// ── 결제수단 분류 → 몰 결제 버킷 ─────────────────────────────────────────
// 버킷: cash / tng(Touch'n Go 전용) / visa / mastercard / amex / voucher / othersamount
function addToBucket(buckets, method, cardType, amount) {
  const amt = Number(amount) || 0;
  if (amt === 0) return;
  const m = String(method || '').toLowerCase();
  const c = String(cardType || '').toLowerCase();

  if (m === 'cash') { buckets.cash += amt; return; }
  if (m === 'voucher' || m === 'gift' || m === 'giftcard') { buckets.voucher += amt; return; }
  // Touch 'n Go 전용 — 식별 가능한 경우만. 그 외 이월렛/QR 은 othersamount(보수적).
  if (m === 'tng' || m.includes('touch') || c === 'tng' || c.includes('touch')) { buckets.tng += amt; return; }
  // 카드 스킴
  if (c === 'visa') { buckets.visa += amt; return; }
  if (c === 'master' || c === 'mastercard') { buckets.mastercard += amt; return; }
  if (c === 'amex') { buckets.amex += amt; return; }
  // 분류 못한 카드/이월렛/QR/기타 = catch-all
  buckets.othersamount += amt;
}

function emptyHour() {
  return {
    receiptcount: 0, gto: 0, gst: 0, discount: 0, servicecharge: 0, noofpax: 0,
    cash: 0, tng: 0, visa: 0, mastercard: 0, amex: 0, voucher: 0, othersamount: 0
  };
}

/**
 * 한 영업일(dateStr=YYYY-MM-DD)의 24시간 집계.
 * 반환: { hours: [24개 emptyHour 누적], orderCount }
 */
async function aggregateDay(restaurant, dateStr) {
  const tz = restaurant.operation_settings?.timeZone || 'Asia/Kuala_Lumpur';
  const start = utcBoundsForDate(dateStr, tz, false);
  const end = utcBoundsForDate(dateStr, tz, true);
  const seatMap = buildSeatMap(restaurant);

  // 확정 매출 = 삭제X · 취소X · 결제완료. 시간대는 order_date(매장 tz) 기준.
  const orders = await Order.findAll({
    where: {
      restaurant_id: restaurant.id,
      order_date: { [Op.gte]: start, [Op.lte]: end },
      is_deleted: false,
      status: { [Op.ne]: 'cancelled' },
      payment_status: 'completed'
    },
    attributes: [
      'id', 'order_date', 'total_amount', 'tax', 'service_charge',
      'discount', 'coupon_discount', 'discount_policy_amount', 'point_discount',
      'payment_method', 'card_type', 'table_number', 'floor_plan_table_id'
    ]
  });

  const orderIds = orders.map(o => o.id);
  // split-bill 결제 — 있으면 결제 버킷을 OrderPayment 로(더 정확), 없으면 주문 레벨 폴백.
  const paymentsByOrder = new Map();
  if (orderIds.length) {
    const pays = await OrderPayment.findAll({
      where: { order_id: { [Op.in]: orderIds } },
      attributes: ['order_id', 'amount', 'payment_method', 'card_type']
    });
    for (const p of pays) {
      if (!paymentsByOrder.has(p.order_id)) paymentsByOrder.set(p.order_id, []);
      paymentsByOrder.get(p.order_id).push(p);
    }
  }

  const hours = Array.from({ length: 24 }, emptyHour);

  for (const o of orders) {
    const h = hourInTz(new Date(o.order_date), tz);
    const bucket = hours[h];

    const tax = Number(o.tax) || 0;
    const total = Number(o.total_amount) || 0;
    const discountSum = (Number(o.discount) || 0) + (Number(o.coupon_discount) || 0)
      + (Number(o.discount_policy_amount) || 0) + (Number(o.point_discount) || 0);

    // gto = 순매출(할인 후, SST 전, 서비스차지 포함) = total_amount − tax
    bucket.gto += (total - tax);
    bucket.gst += tax;
    bucket.discount += discountSum;
    bucket.servicecharge += Number(o.service_charge) || 0;
    bucket.noofpax += seatsForOrder(o, seatMap);
    bucket.receiptcount += 1;

    const pays = paymentsByOrder.get(o.id);
    if (pays && pays.length) {
      for (const p of pays) addToBucket(bucket, p.payment_method, p.card_type, p.amount);
    } else {
      // 주문 레벨 폴백 — 결제 금액은 total_amount 로 본다.
      addToBucket(bucket, o.payment_method, o.card_type, total);
    }
  }

  return { hours, orderCount: orders.length };
}

/**
 * 한 영업일의 SalesHourly sale[] (24개, 전부 string) 빌드.
 * batchid = YYYYMMDD (숫자 ≤12, 영업일당 1개 — 멱등 upsert).
 */
function buildSalesPayload(integration, dateStr, agg) {
  const ymd = dateStr.replace(/-/g, ''); // YYYYMMDD
  const machineid = String(integration.machine_id || '');
  const gstregistered = integration.gst_registered === 'Y' ? 'Y' : 'N';

  return agg.hours.map((b, hour) => ({
    sale: {
      machineid,
      batchid: ymd,
      date: ymd,
      hour: pad2(hour),
      receiptcount: String(b.receiptcount),
      gto: money(b.gto),
      gst: money(b.gst),
      discount: money(b.discount),
      servicecharge: money(b.servicecharge),
      noofpax: String(b.noofpax),
      cash: money(b.cash),
      tng: money(b.tng),
      visa: money(b.visa),
      mastercard: money(b.mastercard),
      amex: money(b.amex),
      voucher: money(b.voucher),
      othersamount: money(b.othersamount),
      gstregistered
    }
  }));
}

// ── OAuth2 토큰 (in-memory 캐시, 만료 60s 전 갱신) ───────────────────────
const tokenCache = new Map(); // integration.id → { token, expiresAt(ms) }

async function fetchToken(integration) {
  const { token_url } = resolveEndpoints(integration);
  if (!token_url) throw new Error('token_url 미설정 (운영 URL 미수령일 수 있음)');

  const cached = tokenCache.get(integration.id);
  if (cached && cached.expiresAt - 60000 > Date.now()) return cached.token;

  const password = decrypt(integration.password_enc || '');
  const body = new URLSearchParams({
    grant_type: 'password',
    username: integration.user_id || '',
    password: password || ''
  });

  const res = await fetch(token_url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString()
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`token HTTP ${res.status}: ${text.slice(0, 300)}`);
  let json;
  try { json = JSON.parse(text); } catch { throw new Error(`token 응답 파싱 실패: ${text.slice(0, 200)}`); }
  const token = json.access_token;
  if (!token) throw new Error(`access_token 없음: ${text.slice(0, 200)}`);

  const expiresIn = parseInt(json.expires_in, 10) || 2999;
  tokenCache.set(integration.id, { token, expiresAt: Date.now() + expiresIn * 1000 });
  return token;
}

async function postSalesHourly(integration, token, sales) {
  const { sales_url } = resolveEndpoints(integration);
  if (!sales_url) throw new Error('sales_url 미설정 (운영 URL 미수령일 수 있음)');

  const res = await fetch(sales_url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ sales })
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`SalesHourly HTTP ${res.status}: ${text.slice(0, 400)}`);
  let json;
  try { json = JSON.parse(text); } catch { json = { raw: text }; }
  return json;
}

/**
 * 한 매장의 최근 N영업일 전송. 각 날짜 24레코드 upsert.
 * 반환: { sent: [{date, records, message}], failed: [{date, error}] }
 */
async function sendForRestaurant(integration, opts = {}) {
  const days = opts.days || integration.send_window_days || 7;
  const restaurant = await Restaurant.findByPk(integration.restaurant_id, {
    attributes: ['id', 'name', 'operation_settings', 'floor_plan']
  });
  if (!restaurant) throw new Error(`restaurant ${integration.restaurant_id} 없음`);

  const tz = restaurant.operation_settings?.timeZone || 'Asia/Kuala_Lumpur';
  const todayStr = new Date().toLocaleDateString('en-CA', { timeZone: tz }); // YYYY-MM-DD (매장 tz)

  const token = await fetchToken(integration);

  const sent = [];
  const failed = [];
  for (let i = 0; i < days; i++) {
    const d = new Date(`${todayStr}T00:00:00`);
    d.setDate(d.getDate() - i);
    const dateStr = d.toLocaleDateString('en-CA'); // 로컬 노이즈 없는 단순 날짜 산술
    try {
      const agg = await aggregateDay(restaurant, dateStr);
      const sales = buildSalesPayload(integration, dateStr, agg);
      const resp = await postSalesHourly(integration, token, sales);
      sent.push({ date: dateStr, records: sales.length, orders: agg.orderCount, message: resp.message || resp.status || 'ok' });
    } catch (e) {
      logger.warn(`[mallSales] ${restaurant.name} ${dateStr} 전송 실패: ${e.message}`);
      failed.push({ date: dateStr, error: e.message });
    }
  }
  return { restaurant_id: restaurant.id, restaurant: restaurant.name, days, sent, failed };
}

module.exports = {
  resolveEndpoints,
  buildSeatMap,
  aggregateDay,
  buildSalesPayload,
  fetchToken,
  postSalesHourly,
  sendForRestaurant,
  PROVIDER_DEFAULTS,
  _internal: { hourInTz, utcBoundsForDate, addToBucket, money }
};

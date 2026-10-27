/**
 * 판매자 발주 마감·배송일 — 해석 한 곳 (2026-10-27 Fable 설계 · docs/PURCHASE_ORDER_SYSTEM.md «판매자 발주 마감·배송일» M-2).
 *
 * 판매자 3종(supplier_companies · brands · foodcourts) 같은 이름 칸 `order_schedule` JSON:
 *   { timezone, rules: [{ days:[0..6], time:'HH:MM', delivery: null | {kind:'after_days',min,max} | {kind:'weekday',weekday} }] }
 *   - days 7개 = «매일» · delivery null = 배송일 안 정해짐
 *   - weekday 배송 = 마감 날짜 **다음 날부터** 처음 오는 그 요일(토요일 마감 + «매주 토» = 다음 주 토)
 *   - 칸 null = 마감 정보 없음 = 화면에 아무것도 띄우지 않는다
 *
 * 날짜는 판매자 시간대의 'YYYY-MM-DD' 문자열로 다루고, 마감 순간만 instant(UTC)로 만든다.
 * 순수 함수 — DB 를 읽지 않는다(stampExpectedDelivery 만 예외: 판매자 행을 resolveSellers 로 읽음).
 * 안내 전용 — 마감이 지나도 발주를 막지 않는다(M-0 ④).
 */
const { localClockToUTC } = require('./dateTimeHelper');

const DEFAULT_TZ = 'Asia/Kuala_Lumpur';
const MAX_RULES = 7;
const MAX_AFTER_DAYS = 14;
const TIME_RE = /^([01]\d|2[0-3]):([0-5]\d)$/;

function toUTCDate(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}
function addDays(dateStr, n) {
  const dt = toUTCDate(dateStr);
  dt.setUTCDate(dt.getUTCDate() + n);
  return dt.toISOString().slice(0, 10);
}
function weekdayOf(dateStr) {
  return toUTCDate(dateStr).getUTCDay();
}
/** now 를 시간대 tz 에서 본 날짜 'YYYY-MM-DD'. */
function localDate(now, tz) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit'
  }).formatToParts(now);
  const get = (t) => parts.find(p => p.type === t)?.value;
  return `${get('year')}-${get('month')}-${get('day')}`;
}
function validTz(tz) {
  if (!tz || typeof tz !== 'string') return false;
  try { new Intl.DateTimeFormat('en-US', { timeZone: tz }); return true; } catch { return false; }
}

/** 규칙 하나 검사·정규화 → { rule } | { error } */
function normalizeRule(raw) {
  if (!raw || typeof raw !== 'object') return { error: 'invalid cutoff rule' };
  if (!Array.isArray(raw.days) || raw.days.length === 0) return { error: 'days: pick at least one weekday' };
  const days = [];
  for (const d of raw.days) {
    const n = Number(d);
    if (!Number.isInteger(n) || n < 0 || n > 6) return { error: 'days must be 0~6' };
    if (!days.includes(n)) days.push(n);
  }
  days.sort((a, b) => a - b);
  const time = String(raw.time || '').trim();
  if (!TIME_RE.test(time)) return { error: 'time must be HH:MM (00:00~23:59)' };
  let delivery = null;
  const dv = raw.delivery;
  if (dv != null) {
    if (dv.kind === 'after_days') {
      const min = Number(dv.min), max = Number(dv.max);
      if (!Number.isInteger(min) || !Number.isInteger(max) || min < 0 || max < min || max > MAX_AFTER_DAYS) {
        return { error: `delivery days must be 0 ≤ min ≤ max ≤ ${MAX_AFTER_DAYS}` };
      }
      delivery = { kind: 'after_days', min, max };
    } else if (dv.kind === 'weekday') {
      const w = Number(dv.weekday);
      if (!Number.isInteger(w) || w < 0 || w > 6) return { error: 'delivery weekday must be 0~6' };
      delivery = { kind: 'weekday', weekday: w };
    } else {
      return { error: 'delivery kind must be after_days or weekday' };
    }
  }
  return { rule: { days, time, delivery } };
}

/**
 * 저장 전 검사·정규화 — 판매자 3종 저장 라우트가 전부 이것만 쓴다.
 *   raw undefined 는 부르는 쪽에서 «무변경» 으로 처리한다.
 *   raw null · rules 빈 배열 → { schedule: null } (지움)
 *   timezone: 저장 라우트가 정한 판매자 시간대. 이미 저장된 값(existingTz)이 있으면 그것을 유지한다.
 * → { schedule } | { error }
 */
function normalizeScheduleForSave(raw, timezone, existingTz) {
  let obj = raw;
  if (typeof obj === 'string') {
    try { obj = JSON.parse(obj); } catch { return { error: 'order_schedule must be JSON' }; }
  }
  if (obj == null) return { schedule: null };
  if (typeof obj !== 'object' || Array.isArray(obj)) return { error: 'order_schedule must be an object' };
  const rulesRaw = obj.rules == null ? [] : obj.rules;
  if (!Array.isArray(rulesRaw)) return { error: 'order_schedule.rules must be a list' };
  if (rulesRaw.length === 0) return { schedule: null };
  if (rulesRaw.length > MAX_RULES) return { error: `at most ${MAX_RULES} cutoff rules` };
  const rules = [];
  const seen = new Set();
  for (const r of rulesRaw) {
    const { rule, error } = normalizeRule(r);
    if (error) return { error };
    for (const d of rule.days) {
      const k = `${d}@${rule.time}`;
      if (seen.has(k)) return { error: 'the same weekday and time appears twice' };
      seen.add(k);
    }
    rules.push(rule);
  }
  const tz = validTz(existingTz) ? existingTz : (validTz(timezone) ? timezone : DEFAULT_TZ);
  return { schedule: { timezone: tz, rules } };
}

/** 저장된 값 → 정규화된 객체 또는 null. 깨진 값은 null(던지지 않는다). */
function readSchedule(raw) {
  try {
    let obj = raw;
    if (typeof obj === 'string') obj = JSON.parse(obj);
    if (!obj || typeof obj !== 'object' || !Array.isArray(obj.rules) || obj.rules.length === 0) return null;
    const tz = validTz(obj.timezone) ? obj.timezone : DEFAULT_TZ;
    const rules = [];
    for (const r of obj.rules) {
      const { rule } = normalizeRule(r);
      if (rule) rules.push(rule);
    }
    return rules.length ? { timezone: tz, rules } : null;
  } catch {
    return null;
  }
}

/** 마감 날짜(판매자 시간대)에 대한 배송일 { from, to } 또는 null. */
function deliveryFor(rule, cutoffDate) {
  const dv = rule && rule.delivery;
  if (!dv) return null;
  if (dv.kind === 'after_days') {
    return { from: addDays(cutoffDate, dv.min), to: addDays(cutoffDate, dv.max) };
  }
  if (dv.kind === 'weekday') {
    // 마감 다음 날부터 처음 오는 그 요일 (1~7일 뒤 — 같은 날은 아님)
    const gap = ((dv.weekday - weekdayOf(cutoffDate) + 7) % 7) || 7;
    const d = addDays(cutoffDate, gap);
    return { from: d, to: d };
  }
  return null;
}

function windowOf(entry) {
  const dv = deliveryFor(entry.rule, entry.date);
  return {
    cutoff_at: entry.at.toISOString(),
    cutoff_date: entry.date,
    cutoff_time: entry.rule.time,
    delivery_from: dv ? dv.from : null,
    delivery_to: dv ? dv.to : null
  };
}

/**
 * now 기준 지난 마감 · 다음 마감 · 그다음 마감.
 *   경계: now >= cutoff_at 이면 지난 것(정각은 늦음).
 * → null(일정 없음) | { timezone, previous:{cutoff_at}|null, next:Window|null, following:Window|null }
 */
function orderWindows(scheduleRaw, now = new Date()) {
  const schedule = readSchedule(scheduleRaw);
  if (!schedule) return null;
  const tz = schedule.timezone;
  const today = localDate(now, tz);
  const entries = [];
  for (let i = -7; i <= 14; i++) {
    const date = addDays(today, i);
    const wd = weekdayOf(date);
    for (const rule of schedule.rules) {
      if (!rule.days.includes(wd)) continue;
      entries.push({ date, rule, at: localClockToUTC(date, rule.time, tz) });
    }
  }
  entries.sort((a, b) => a.at - b.at);
  const nowMs = now.getTime();
  const past = entries.filter(e => e.at.getTime() <= nowMs);
  const future = entries.filter(e => e.at.getTime() > nowMs);
  const prev = past.length ? past[past.length - 1] : null;
  return {
    timezone: tz,
    previous: prev ? { cutoff_at: prev.at.toISOString(), cutoff_time: prev.rule.time } : null,
    next: future[0] ? windowOf(future[0]) : null,
    following: future[1] ? windowOf(future[1]) : null
  };
}

/** at 시각에 보낸 발주의 예상 배송일(범위면 이른 날) 'YYYY-MM-DD' | null. */
function expectedDeliveryAt(scheduleRaw, at = new Date()) {
  const w = orderWindows(scheduleRaw, at);
  return (w && w.next && w.next.delivery_from) || null;
}

/**
 * 판매자에게 실제로 보내는 순간(submitted_at 을 찍는 자리)에 쓸 «예상 배송일» 칸.
 *   발주에 이미 값이 있으면 {} · 판매자 일정이 없으면 {} · 실패해도 {} (제출을 막지 않는다).
 *   → po.update 에 그대로 펼쳐 넣는 객체.
 */
async function expectedDeliveryPatch(po, at = new Date()) {
  try {
    if (!po || po.expected_delivery_date) return {};
    const sellerType = po.seller_type;
    const sellerId = po.seller_entity_id;
    if (!sellerType || !sellerId) return {};
    const { resolveSellers, getSeller } = require('./sellerNames');
    const resolved = await resolveSellers([{ seller_type: sellerType, seller_entity_id: sellerId }]);
    const row = getSeller(resolved, sellerType, sellerId);
    const date = row ? expectedDeliveryAt(row.order_schedule, at) : null;
    return date ? { expected_delivery_date: date } : {};
  } catch (e) {
    console.warn('[orderSchedule] expected delivery skipped:', e.message);
    return {};
  }
}

module.exports = {
  DEFAULT_TZ,
  normalizeScheduleForSave,
  readSchedule,
  deliveryFor,
  orderWindows,
  expectedDeliveryAt,
  expectedDeliveryPatch
};

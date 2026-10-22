/**
 * 정기 발주 날짜 계산 — 순수 함수 (2026-10-22 Fable 설계 recurring-po §3-4).
 * 날짜는 전부 **구매자 시간대의 'YYYY-MM-DD' 문자열**로 다룬다(instant 로 바꾸지 않는다 — 공용 날짜 경계 사고 교훈).
 * 생성 시각은 구매자 시간대 07:00 고정(RUN_HOUR).
 */
const RUN_HOUR = 7;
const FREQUENCIES = ['weekly', 'biweekly', 'monthly'];

/** DATEONLY 값 → 'YYYY-MM-DD'. 이 서버 sequelize 는 DATEONLY 를 UTC 자정 Date 로 돌려준다(config timezone +00:00). */
function toDateStr(v) {
  if (!v) return null;
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  return String(v).slice(0, 10);
}

function toUTC(dateStr) {
  const [y, m, d] = toDateStr(dateStr).split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}
function fmt(dt) {
  return dt.toISOString().slice(0, 10);
}
function addDays(dateStr, n) {
  const dt = toUTC(dateStr);
  dt.setUTCDate(dt.getUTCDate() + n);
  return fmt(dt);
}
function weekdayOf(dateStr) {
  return toUTC(dateStr).getUTCDay();
}

/** now(Date) 를 시간대 tz 에서 본 { date:'YYYY-MM-DD', hour:0~23 }. */
function localParts(now, tz) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', hourCycle: 'h23'
  }).formatToParts(now);
  const get = (t) => parts.find(p => p.type === t)?.value;
  return { date: `${get('year')}-${get('month')}-${get('day')}`, hour: parseInt(get('hour'), 10) % 24 };
}

/** 주기 설정 검사 — 틀린 것이 있으면 사유 문자열, 맞으면 null. */
function validateCadence({ frequency, weekday, day_of_month }) {
  if (!FREQUENCIES.includes(frequency)) return 'frequency must be weekly, biweekly or monthly';
  if (frequency === 'monthly') {
    const d = Number(day_of_month);
    if (!Number.isInteger(d) || d < 1 || d > 28) return 'day_of_month must be 1~28';
  } else {
    const w = Number(weekday);
    if (!Number.isInteger(w) || w < 0 || w > 6) return 'weekday must be 0~6';
  }
  return null;
}

function matches(cadence, dateStr) {
  if (cadence.frequency === 'monthly') return toUTC(dateStr).getUTCDate() === Number(cadence.day_of_month);
  return weekdayOf(dateStr) === Number(cadence.weekday);
}

/** after 보다 **뒤**의 첫 맞는 날(after 자체 제외). */
function nextOccurrence(cadence, after) {
  if (cadence.frequency === 'monthly') {
    const dt = toUTC(after);
    const dom = Number(cadence.day_of_month);
    let y = dt.getUTCFullYear(); let m = dt.getUTCMonth();
    if (dt.getUTCDate() >= dom) { m += 1; if (m > 11) { m = 0; y += 1; } }
    return fmt(new Date(Date.UTC(y, m, dom)));
  }
  const diff = ((Number(cadence.weekday) - weekdayOf(after)) + 7) % 7 || 7;
  return addDays(after, diff);
}

/** 맞는 날 runDate 에서 한 주기 뒤(weekly +7 · biweekly +14 · monthly 다음 달 같은 날). */
function advance(cadence, runDate) {
  if (cadence.frequency === 'weekly') return addDays(runDate, 7);
  if (cadence.frequency === 'biweekly') return addDays(runDate, 14);
  return nextOccurrence(cadence, runDate);
}

/** 만들 때·재개할 때 첫 발주일: 오늘이 맞는 날이고 아직 07:00 전이면 오늘, 아니면 다음 맞는 날. */
function firstRunDate(cadence, localDate, localHour) {
  if (matches(cadence, localDate) && localHour < RUN_HOUR) return localDate;
  return nextOccurrence(cadence, localDate);
}

/**
 * 생성한 뒤 다음 발주일. 예정일(scheduled)에서 주기만큼 밀어 오늘(runDate) 뒤로 보낸다 —
 * 며칠·몇 주 밀려도 발주는 1건만 만들고, 격주 박자(예정일 기준)는 유지한다.
 * 예정일이 주기에 안 맞으면(주기를 바꾼 직후 등) 오늘 기준 다음 맞는 날.
 */
function nextRunAfter(cadence, scheduledRaw, runDate) {
  const scheduled = toDateStr(scheduledRaw);
  if (!scheduled || !matches(cadence, scheduled)) return nextOccurrence(cadence, runDate);
  let d = scheduled;
  for (let i = 0; i < 1000 && d <= runDate; i++) d = advance(cadence, d);
  return d;
}

/** 지금 이 틀을 만들 때인가 — 구매자 날짜가 예정일 이상이고 07:00 이후. */
function isDue(nextRunDate, local) {
  const next = toDateStr(nextRunDate);
  if (!next) return false;
  return local.date >= next && local.hour >= RUN_HOUR;
}

module.exports = {
  RUN_HOUR, FREQUENCIES,
  toDateStr, localParts, validateCadence, matches, nextOccurrence, advance, firstRunDate, nextRunAfter, isDue, addDays
};

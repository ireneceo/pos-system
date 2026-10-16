/**
 * 휴가 일수 계산 — 한 함수(설계 .claude/fable-design-20261016-staff-attendance.md §2-5).
 * 기간(YYYY-MM-DD ~ YYYY-MM-DD, 양 끝 포함)의 날짜 중 ① 매장 휴일 ② 그 직원 쉬는 요일을 뺀 수. 반차(하루짜리)는 0.5.
 * 날짜는 문자열 그대로 다룬다 — 시각·타임존 변환 없음(달력 날짜라서).
 */
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const MAX_SPAN_DAYS = 366;

function isValidDate(s) {
  if (!DATE_RE.test(String(s || ''))) return false;
  const d = new Date(`${s}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === s;
}

/** start..end 의 날짜 문자열 배열 (end < start 면 빈 배열, 366일 넘으면 null) */
function eachDate(start, end) {
  const out = [];
  const d = new Date(`${start}T00:00:00Z`);
  const last = new Date(`${end}T00:00:00Z`);
  while (d <= last) {
    out.push(d.toISOString().slice(0, 10));
    if (out.length > MAX_SPAN_DAYS) return null;
    d.setUTCDate(d.getUTCDate() + 1);
  }
  return out;
}

/** 0=일 … 6=토 */
function weekdayOf(dateStr) {
  return new Date(`${dateStr}T00:00:00Z`).getUTCDay();
}

/**
 * @param {object} p
 * @param {string} p.start
 * @param {string} p.end
 * @param {'am'|'pm'|null} [p.halfDay]
 * @param {Iterable<string>} [p.holidays]  매장 휴일 날짜들
 * @param {number[]} [p.restDays]          쉬는 요일
 * @returns {{ days:number, workDates:string[] } | { error:string }}
 */
function computeLeaveDays({ start, end, halfDay = null, holidays = [], restDays = [] }) {
  if (!isValidDate(start) || !isValidDate(end)) return { error: 'INVALID_DATE' };
  if (end < start) return { error: 'END_BEFORE_START' };
  if (halfDay && start !== end) return { error: 'HALF_DAY_SINGLE_DATE_ONLY' };
  const all = eachDate(start, end);
  if (!all) return { error: 'RANGE_TOO_LONG' };
  const hol = new Set(holidays);
  const rest = new Set((restDays || []).map(Number));
  const workDates = all.filter(d => !hol.has(d) && !rest.has(weekdayOf(d)));
  if (!workDates.length) return { error: 'NO_WORKING_DAYS' };
  return { days: halfDay ? 0.5 : workDates.length, workDates };
}

module.exports = { computeLeaveDays, isValidDate, eachDate, weekdayOf };

/**
 * 주문 날짜·시각을 «그 주문 매장의 시간대» 로 읽는 순수 함수 (2026-11-01 Fable 설계
 * .claude/fable-design-20261101-brand-performance.md §2-2).
 *
 * 규칙
 *   - 근거 시각은 createdAt 하나(서버 주문 목록·서버 매출 집계가 전부 createdAt). order_date 는 쓰지 않는다.
 *   - 기간 판정 = 'YYYY-MM-DD' 문자열 비교 `start <= localDateKey(createdAt, tz) <= end`.
 *     setHours / new Date('YYYY-MM-DD') 경계 산술은 브라우저 시간대를 타므로 쓰지 않는다.
 *   - 서버 /api/orders 의 start_date·end_date 는 UTC 자정으로 잘리므로(🔒 orders-crud) 앞뒤 하루씩 넓혀 받고
 *     화면에서 자른다(fetchWindow).
 */

export const DEFAULT_TZ = 'Asia/Kuala_Lumpur';

const fmtCache: Record<string, Intl.DateTimeFormat> = {};
const fmt = (tz: string): Intl.DateTimeFormat => {
  if (!fmtCache[tz]) {
    try {
      fmtCache[tz] = new Intl.DateTimeFormat('en-CA', {
        timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', hourCycle: 'h23'
      });
    } catch {
      fmtCache[tz] = fmt(DEFAULT_TZ);
    }
  }
  return fmtCache[tz];
};

const parts = (iso: string | Date | null | undefined, tz: string) => {
  if (!iso) return null;
  const d = iso instanceof Date ? iso : new Date(iso);
  if (isNaN(d.getTime())) return null;
  const p: Record<string, string> = {};
  fmt(tz || DEFAULT_TZ).formatToParts(d).forEach(x => { p[x.type] = x.value; });
  return p;
};

/** 그 시간대의 달력 날짜 'YYYY-MM-DD' (값이 없거나 깨졌으면 '') */
export const localDateKey = (iso: string | Date | null | undefined, tz: string): string => {
  const p = parts(iso, tz);
  return p ? `${p.year}-${p.month}-${p.day}` : '';
};

/** 그 시간대의 시(0..23). 일부 브라우저가 자정을 «24» 로 주는 것을 0 으로 고친다. 값이 없으면 -1 */
export const localHour = (iso: string | Date | null | undefined, tz: string): number => {
  const p = parts(iso, tz);
  if (!p) return -1;
  const h = parseInt(p.hour, 10);
  return h === 24 ? 0 : h;
};

/** 'YYYY-MM-DD' 를 달력일로 n 일 옮긴다(시간대 무관 — UTC 산술) */
export const shiftDateKey = (key: string, n: number): string => {
  const d = new Date(`${key}T00:00:00Z`);
  if (isNaN(d.getTime())) return key;
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
};

/** 두 날짜 키 사이 일수(end - start) */
export const daysBetween = (start: string, end: string): number =>
  Math.round((new Date(`${end}T00:00:00Z`).getTime() - new Date(`${start}T00:00:00Z`).getTime()) / 86400000);

/** 매장 시간대 — 매장 목록 응답의 timeZone → operation_settings.timeZone → 기본 KL */
export const restaurantTimeZone = (r: any): string => {
  if (!r) return DEFAULT_TZ;
  if (r.timeZone) return r.timeZone;
  try {
    const os = typeof r.operation_settings === 'string' ? JSON.parse(r.operation_settings) : r.operation_settings;
    if (os && os.timeZone) return os.timeZone;
  } catch { /* 기본값 */ }
  return DEFAULT_TZ;
};

/** start ≤ key ≤ end (빈 키는 밖) */
export const inDateRange = (key: string, start: string, end: string): boolean =>
  !!key && key >= start && key <= end;

/** 서버에 보낼 넉넉한 창 — 어떤 시간대(±14h)든 [start, end] 의 초과집합이 되게 앞뒤 하루 */
export const fetchWindow = (start: string, end: string) => ({
  start_date: shiftDateKey(start, -1),
  end_date: shiftDateKey(end, 1)
});

/** 이전 기간 — 같은 길이, 바로 앞 */
export const previousPeriod = (start: string, end: string) => {
  const len = daysBetween(start, end);
  const prevEnd = shiftDateKey(start, -1);
  return { start: shiftDateKey(prevEnd, -len), end: prevEnd };
};

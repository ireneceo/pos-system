/**
 * 판매자 발주 마감·배송일 — 화면 쪽 (2026-10-27 Fable 설계 · docs/PURCHASE_ORDER_SYSTEM.md «판매자 발주 마감·배송일» M-4).
 *
 * 계산(다음 마감·배송일)은 서버 한 곳(dev-backend/utils/orderSchedule.js)이 한다. 여기서는
 *   ① 서버가 준 마감 순간(instant)으로 «지금 기준» 강조 단계·남은 시간만 정하고
 *   ② 표시 문구(요일·시각·배송일)를 매장 시간대로 만든다.
 * 안내 전용 — 마감이 지나도 발주를 막지 않는다.
 */

export type OrderDelivery =
  | null
  | { kind: 'after_days'; min: number; max: number }
  | { kind: 'weekday'; weekday: number };

export interface OrderRule {
  days: number[];        // 0=일 … 6=토 · 7개 = 매일
  time: string;          // 'HH:MM'
  delivery: OrderDelivery;
}

export interface OrderSchedule {
  timezone: string;
  rules: OrderRule[];
}

export interface OrderWindow {
  cutoff_at: string;
  cutoff_date: string;
  cutoff_time: string;
  delivery_from: string | null;
  delivery_to: string | null;
}

export interface OrderWindows {
  timezone: string;
  previous: { cutoff_at: string; cutoff_time?: string } | null;
  next: OrderWindow | null;
  following: OrderWindow | null;
}

export type CutoffLevel = 'closing' | 'today' | 'upcoming';

export interface CutoffState {
  level: CutoffLevel;
  window: OrderWindow;
  minutesLeft: number;
  /** 오늘(매장 시간대) 마감이 이미 지났다 — 표시는 다음 마감으로 넘어간다 */
  missedToday: boolean;
  /** 지나간 오늘 마감 시각(missedToday 일 때) */
  missedAt: string | null;
}

/** 남은 시간이 이 분 이하면 «closing»(빨강) */
export const CLOSING_MINUTES = 120;

/** 강조 색 — 인라인 hex 를 화면마다 쓰지 않게 여기 한 곳 */
export const CUTOFF_COLORS: Record<CutoffLevel | 'missed', { fg: string; bg: string | null; bold: boolean }> = {
  closing: { fg: '#B91C1C', bg: '#FEE2E2', bold: true },
  today: { fg: '#B45309', bg: '#FEF3C7', bold: true },
  upcoming: { fg: '#475569', bg: null, bold: false },
  missed: { fg: '#6B7280', bg: null, bold: false },
};

/** instant 를 시간대 tz 에서 본 'YYYY-MM-DD' */
export function dateInTz(ms: number, tz: string): string {
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date(ms));
  const get = (k: string) => parts.find(p => p.type === k)?.value;
  return `${get('year')}-${get('month')}-${get('day')}`;
}

function addDaysStr(dateStr: string, n: number): string {
  const [y, m, d] = dateStr.split('-').map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d + n));
  return dt.toISOString().slice(0, 10);
}

/**
 * 지금 기준 강조 단계. 일정이 없거나 다음 마감을 모르면 null.
 *   서버가 준 next 가 이미 지났으면(화면을 오래 열어 둠) following 을 당겨 쓴다 — 재조회 없이.
 */
export function cutoffState(windows: OrderWindows | null | undefined, nowMs: number, storeTz: string): CutoffState | null {
  if (!windows) return null;
  let win: OrderWindow | null = windows.next;
  let prevAt: string | null = windows.previous ? windows.previous.cutoff_at : null;
  if (win && Date.parse(win.cutoff_at) <= nowMs) {
    prevAt = win.cutoff_at;
    win = windows.following;
  }
  if (!win) return null;
  const at = Date.parse(win.cutoff_at);
  const minutesLeft = Math.max(0, Math.floor((at - nowMs) / 60000));
  const today = dateInTz(nowMs, storeTz);
  const level: CutoffLevel = minutesLeft <= CLOSING_MINUTES
    ? 'closing'
    : dateInTz(at, storeTz) === today ? 'today' : 'upcoming';
  const missedToday = !!prevAt && Date.parse(prevAt) <= nowMs && dateInTz(Date.parse(prevAt), storeTz) === today;
  return { level, window: win, minutesLeft, missedToday, missedAt: missedToday ? prevAt : null };
}

/** i18n 언어 → Intl 로캘 */
export function intlLocale(lang: string | undefined): string {
  const l = (lang || 'en').slice(0, 2);
  return l === 'ko' ? 'ko-KR' : l === 'zh' ? 'zh-CN' : l === 'ms' ? 'ms-MY' : 'en-GB';
}

/** 요일 이름(0=일) — 새 번역 키 대신 Intl 을 고정 UTC 날짜에 (2026-10-25 = 일요일) */
export function weekdayName(day: number, locale: string, style: 'short' | 'long' = 'short'): string {
  return new Intl.DateTimeFormat(locale, { weekday: style, timeZone: 'UTC' }).format(new Date(Date.UTC(2026, 9, 25 + day)));
}

/** 마감 시각 «3:00 PM» — 매장 시간대 */
export function cutoffClock(iso: string, storeTz: string, locale: string): string {
  return new Date(iso).toLocaleTimeString(locale, { hour: 'numeric', minute: '2-digit', timeZone: storeTz });
}

/** 배송일 'YYYY-MM-DD' → «Tue 28 Oct» (날짜 문자열이라 UTC 로 포맷 — 밀림 방지) */
export function deliveryDateLabel(dateStr: string, locale: string): string {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Intl.DateTimeFormat(locale, { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'UTC' })
    .format(new Date(Date.UTC(y, m - 1, d)));
}

type TFn = (key: string, def: string, opts?: Record<string, unknown>) => string;

/** 마감이 언제인지 — «today 3:00 PM» / «Tomorrow 3:00 PM» / «Thu 3:00 PM» */
export function cutoffWhen(win: OrderWindow, nowMs: number, storeTz: string, locale: string, t: TFn): string {
  const time = cutoffClock(win.cutoff_at, storeTz, locale);
  const day = dateInTz(Date.parse(win.cutoff_at), storeTz);
  const today = dateInTz(nowMs, storeTz);
  if (day === today) return t('orderCutoff.todayTime', 'today {{time}}', { time });
  if (day === addDaysStr(today, 1)) return t('orderCutoff.tomorrow', 'Tomorrow {{time}}', { time });
  const [y, m, d] = day.split('-').map(Number);
  const wd = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
  return t('orderCutoff.weekdayTime', '{{weekday}} {{time}}', { weekday: weekdayName(wd, locale), time });
}

/** 배송 문구 — «Delivery Tue 28 Oct» / «Delivery Sat 31 Oct–Sun 1 Nov» / null */
export function deliveryText(win: OrderWindow, locale: string, t: TFn): string | null {
  if (!win.delivery_from) return null;
  const from = deliveryDateLabel(win.delivery_from, locale);
  if (!win.delivery_to || win.delivery_to === win.delivery_from) return t('orderCutoff.delivery', 'Delivery {{date}}', { date: from });
  return t('orderCutoff.deliveryRange', 'Delivery {{from}}–{{to}}', { from, to: deliveryDateLabel(win.delivery_to, locale) });
}

/** 남은 시간 «1h 20m» / «45m» */
export function durationText(minutes: number, t: TFn): string {
  const h = Math.floor(minutes / 60), m = minutes % 60;
  return h > 0 ? t('orderCutoff.durationHm', '{{h}}h {{m}}m', { h, m }) : t('orderCutoff.durationM', '{{m}}m', { m });
}

/** 규칙 한 줄 설명 — 편집기 미리보기·읽기 전용 요약 «Mon, Thu 3:00 PM → Every Sat» */
export function describeRule(rule: OrderRule, locale: string, t: TFn): string {
  const days = rule.days.length === 7
    ? t('orderSchedule.everyDay', 'Every day')
    : rule.days.map(d => weekdayName(d, locale)).join(', ');
  const [hh, mm] = rule.time.split(':').map(Number);
  const time = new Date(Date.UTC(2026, 0, 1, hh, mm)).toLocaleTimeString(locale, { hour: 'numeric', minute: '2-digit', timeZone: 'UTC' });
  return t('orderSchedule.preview', '{{days}} {{time}} → {{delivery}}', { days, time, delivery: describeDelivery(rule.delivery, locale, t) });
}

export function describeDelivery(dv: OrderDelivery, locale: string, t: TFn): string {
  if (!dv) return t('orderSchedule.deliveryNone', 'Delivery not fixed');
  if (dv.kind === 'weekday') return t('orderSchedule.deliveryWeekday', 'Every {{weekday}}', { weekday: weekdayName(dv.weekday, locale, 'long') });
  if (dv.min === 0 && dv.max === 0) return t('orderSchedule.deliverySameDay', 'Same day');
  if (dv.min === 1 && dv.max === 1) return t('orderSchedule.deliveryNextDay', 'Next day');
  if (dv.min === dv.max) return t('orderSchedule.deliveryDays', '{{n}} days after', { n: dv.min });
  return t('orderSchedule.deliveryAfterDays', '{{min}}–{{max}} days after', { min: dv.min, max: dv.max });
}

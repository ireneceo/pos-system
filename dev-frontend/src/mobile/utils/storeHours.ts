// 매장 영업시간 → Open / On Break / Closed 판정 (표시 전용).
//
// ⚠️ 표시(뱃지)에만 쓴다. 주문 차단(ScanPage의 isOpen 게이트)에는 쓰지 않는다 —
// 매장이 영업시간을 안 맞췄거나(기본 09:00–22:00) 늦게까지 영업하면 시간 기반 차단이
// 매출을 막는 사고가 나기 때문. 차단은 계정 status 기준 그대로 둔다.
//
// 기준: operation_settings 의 openingTime/closingTime/breakTimes 를 매장 timeZone 의
// "벽시계 시각"으로 평가한다. 브라우저 로컬 시간 사용 금지 (CLAUDE.md 타임존 규칙).

export interface StoreHoursInput {
  openingTime?: string;   // "HH:MM"
  closingTime?: string;   // "HH:MM"
  timeZone?: string;      // IANA TZ (예: Asia/Kuala_Lumpur)
  breakTimes?: Array<{ start?: string; end?: string }>;
}

export type StoreOpenStatus = 'open' | 'break' | 'closed';

export interface StoreOpenState {
  status: StoreOpenStatus;
  isOpen: boolean;        // status === 'open' 일 때만 true
  hoursText: string;      // "9:00 AM – 10:00 PM" (미설정이면 '')
  breakText: string;      // 현재/대표 브레이크 "3:00 – 4:00 PM" (없으면 '')
}

const toMinutes = (hhmm?: string): number | null => {
  if (!hhmm || typeof hhmm !== 'string') return null;
  const [h, m] = hhmm.split(':').map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return null;
  return h * 60 + m;
};

// 매장 타임존 기준 현재 벽시계 분(0~1439). 파싱 실패 시 -1.
const nowMinutesInTz = (timeZone: string | undefined, now: Date): number => {
  try {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: timeZone || 'Asia/Kuala_Lumpur',
      hour: '2-digit', minute: '2-digit', hour12: false
    }).formatToParts(now);
    const h = Number(parts.find(p => p.type === 'hour')?.value);
    const m = Number(parts.find(p => p.type === 'minute')?.value);
    if (Number.isNaN(h) || Number.isNaN(m)) return -1;
    return (h % 24) * 60 + m;
  } catch {
    return -1;
  }
};

const fmt12 = (hhmm?: string): string => {
  const mins = toMinutes(hhmm);
  if (mins === null) return '';
  let h = Math.floor(mins / 60);
  const m = mins % 60;
  const period = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${h}:${m.toString().padStart(2, '0')} ${period}`;
};

// t 가 [start, end) 구간 안인가. end <= start 면 자정 넘김(예: 18:00–02:00)으로 처리.
const within = (t: number, start: number, end: number): boolean => {
  if (start === end) return true;          // 24시간 영업
  if (start < end) return t >= start && t < end;
  return t >= start || t < end;            // overnight
};

export function getStoreOpenState(input: StoreHoursInput, now: Date = new Date()): StoreOpenState {
  const open = toMinutes(input.openingTime);
  const close = toMinutes(input.closingTime);
  const breaks = Array.isArray(input.breakTimes) ? input.breakTimes : [];

  const hoursText = (open !== null && close !== null)
    ? `${fmt12(input.openingTime)} – ${fmt12(input.closingTime)}`
    : '';
  const firstBreak = breaks.find(b => toMinutes(b.start) !== null && toMinutes(b.end) !== null);
  const breakText = firstBreak ? `${fmt12(firstBreak.start)} – ${fmt12(firstBreak.end)}` : '';

  // 영업시간 미설정 → 닫힘 단정 금지(거짓 Closed 방지). 열림으로 표시.
  if (open === null || close === null) {
    return { status: 'open', isOpen: true, hoursText, breakText };
  }

  const cur = nowMinutesInTz(input.timeZone, now);
  if (cur < 0) {
    // 타임존 파싱 실패 → 표시 전용이므로 열림으로 폴백.
    return { status: 'open', isOpen: true, hoursText, breakText };
  }

  if (!within(cur, open, close)) {
    return { status: 'closed', isOpen: false, hoursText, breakText };
  }

  // 영업시간 안 → 브레이크 구간 검사
  for (const b of breaks) {
    const bs = toMinutes(b.start), be = toMinutes(b.end);
    if (bs === null || be === null) continue;
    if (within(cur, bs, be)) {
      return { status: 'break', isOpen: false, hoursText, breakText: `${fmt12(b.start)} – ${fmt12(b.end)}` };
    }
  }

  return { status: 'open', isOpen: true, hoursText, breakText };
}

/**
 * 직원 출퇴근·휴가 API — /api/restaurants/:id/attendance/...
 * 설계 .claude/fable-design-20261016-staff-attendance.md §3.
 * 실패 본문(code·message)을 그대로 돌려준다 — 공용 fetchAPI 는 실패 본문을 버린다([[reference_fetchapi_drops_error_body]]).
 */
import { getAuthHeaders } from '../../utils/auth';

export interface ApiResult<T = any> {
  ok: boolean;
  status: number;
  data: T;
  code?: string;
  message?: string;
}

export async function attendanceApi<T = any>(
  restaurantId: string | number,
  path: string,
  init: { method?: string; body?: unknown } = {}
): Promise<ApiResult<T>> {
  const res = await fetch(`/api/restaurants/${restaurantId}/attendance${path}`, {
    method: init.method || 'GET',
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    body: init.body !== undefined ? JSON.stringify(init.body) : undefined,
  });
  let json: any = null;
  try { json = await res.json(); } catch { json = null; }
  return {
    ok: res.ok && json?.success !== false,
    status: res.status,
    data: json?.data,
    code: json?.code || json?.error?.code,
    message: json?.message || json?.error?.message,
  };
}

export interface AttendanceRecord {
  id: number;
  user_id: number;
  user_name: string | null;
  work_date: string;
  clock_in_at: string;
  clock_out_at: string | null;
  minutes: number;
  is_open: boolean;
  clock_in_method: 'self' | 'pos_pin' | 'admin';
  clock_out_method: 'self' | 'pos_pin' | 'admin' | null;
  clock_in_network: 'ok' | 'off' | 'override' | null;
  clock_out_network: 'ok' | 'off' | 'override' | null;
  status: 'open' | 'closed' | 'corrected';
  corrected: boolean;
  original_clock_in_at: string | null;
  original_clock_out_at: string | null;
  correction_reason: string | null;
  note: string | null;
  overdue?: boolean;
}

export interface LeaveTypeRow {
  id: number;
  code: string;
  name: string;
  is_paid: boolean;
  default_days: string | number | null;
  requires_approval: boolean;
  color: string | null;
  is_active: boolean;
}

export interface LeaveRequestRow {
  id: number;
  user_id: number;
  user_name: string | null;
  leave_type_id: number;
  leave_type: { id: number; name: string; color: string | null; is_paid: boolean } | null;
  start_date: string;
  end_date: string;
  half_day: 'am' | 'pm' | null;
  days: number;
  reason: string | null;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  decision_note: string | null;
  created_at: string;
}

export interface LeaveBalance {
  leave_type_id: number;
  name: string;
  color: string | null;
  is_paid: boolean;
  is_active: boolean;
  entitled: number | null;
  entitlement_source: 'staff' | 'type_default' | 'untracked';
  used: number;
  pending: number;
  remaining: number | null;
}

export interface StaffProfile {
  user_id: number;
  name: string;
  role: string;
  has_pin: boolean;
  rest_days: number[];
  joined_at: string | null;
}

/** 분 → «7h 30m» */
export function formatMinutes(min: number): string {
  const m = Math.max(0, Math.round(min || 0));
  const h = Math.floor(m / 60);
  const r = m % 60;
  return h ? `${h}h ${String(r).padStart(2, '0')}m` : `${r}m`;
}

/** 'YYYY-MM-DD' 기간 표시 */
export function formatPeriod(r: { start_date: string; end_date: string; half_day?: string | null }): string {
  const base = r.start_date === r.end_date ? r.start_date : `${r.start_date} – ${r.end_date}`;
  return r.half_day ? `${base} (${r.half_day.toUpperCase()})` : base;
}

/** 매장 타임존의 오늘 'YYYY-MM-DD' */
export function todayIn(timeZone?: string | null): string {
  return new Date().toLocaleDateString('en-CA', { timeZone: timeZone || 'Asia/Kuala_Lumpur' });
}

/** 매장 타임존 기준 'YYYY-MM-DDTHH:mm' (datetime-local 입력 값) */
export function toLocalInput(iso: string | null | undefined, timeZone?: string | null): string {
  if (!iso) return '';
  const d = new Date(iso);
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: timeZone || 'Asia/Kuala_Lumpur', year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).formatToParts(d);
  const g = (t: string) => parts.find(p => p.type === t)?.value || '00';
  return `${g('year')}-${g('month')}-${g('day')}T${g('hour')}:${g('minute')}`;
}

/** 매장 타임존의 'YYYY-MM-DDTHH:mm' → UTC ISO (저장용) */
export function fromLocalInput(local: string, timeZone?: string | null): string | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(local || '');
  if (!m) return null;
  const tz = timeZone || 'Asia/Kuala_Lumpur';
  const guess = Date.UTC(+m[1], +m[2] - 1, +m[3], +m[4], +m[5]);
  // 그 순간의 매장 시계와 원하는 시계의 차이만큼 보정(서머타임 없는 지역 기준 1회 보정이면 충분, 2회로 안전하게)
  let t = guess;
  for (let i = 0; i < 2; i++) {
    const shown = toLocalInput(new Date(t).toISOString(), tz);
    const sm = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(shown)!;
    const shownUtc = Date.UTC(+sm[1], +sm[2] - 1, +sm[3], +sm[4], +sm[5]);
    t += guess - shownUtc;
  }
  return new Date(t).toISOString();
}

export const WEEKDAY_KEYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'] as const;

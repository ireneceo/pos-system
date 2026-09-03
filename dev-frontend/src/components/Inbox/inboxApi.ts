import { getAuthToken } from '../../utils/auth';

export type InboxType = 'notice' | 'support_ticket' | 'operation_ticket';
export type InboxSeverity = 'normal' | 'important' | 'urgent';
export type InboxFilter = 'all' | InboxType;

export interface InboxItem {
  id: string;                              // synthetic key (e.g. "notice-12")
  type: InboxType;
  source: { type: string; id: number | string; recipient_id?: number };
  title: string;
  preview: string;
  severity: InboxSeverity;
  category: string;
  author_name?: string;
  timestamp: string;
  read: boolean;
  link: string;
}

export interface InboxResponse {
  success: boolean;
  data: InboxItem[];
  unread_count: { notice: number; support_ticket: number; operation_ticket: number; total: number };
  has_more: boolean;
}

function authHeaders(): Record<string, string> {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function fetchInbox(opts: {
  type?: InboxFilter;
  unreadOnly?: boolean;
  limit?: number;
  before?: string;
} = {}): Promise<InboxResponse> {
  const params = new URLSearchParams();
  if (opts.type && opts.type !== 'all') params.set('type', opts.type);
  if (opts.unreadOnly) params.set('unread_only', 'true');
  if (opts.limit) params.set('limit', String(opts.limit));
  if (opts.before) params.set('before', opts.before);
  const r = await fetch(`/api/inbox?${params.toString()}`, { headers: authHeaders() });
  if (!r.ok) {
    return { success: false, data: [], unread_count: { notice: 0, support_ticket: 0, operation_ticket: 0, total: 0 }, has_more: false };
  }
  const j = await r.json();
  return {
    success: !!j.success,
    data: Array.isArray(j.data) ? j.data : [],
    unread_count: j.unread_count || { notice: 0, support_ticket: 0, operation_ticket: 0, total: 0 },
    has_more: !!j.has_more
  };
}

export async function fetchUnreadCount(): Promise<{
  total: number; notice: number; support_ticket: number; operation_ticket: number;
}> {
  try {
    const r = await fetch('/api/inbox/unread-count', { headers: authHeaders() });
    if (!r.ok) return { total: 0, notice: 0, support_ticket: 0, operation_ticket: 0 };
    const j = await r.json();
    return {
      total: Number(j.total) || 0,
      notice: Number(j.notice) || 0,
      support_ticket: Number(j.support_ticket) || 0,
      operation_ticket: Number(j.operation_ticket) || 0
    };
  } catch {
    return { total: 0, notice: 0, support_ticket: 0, operation_ticket: 0 };
  }
}

export async function markNoticeRead(noticeId: number | string): Promise<boolean> {
  try {
    const r = await fetch(`/api/inbox/notice/${noticeId}/read`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeaders() }
    });
    return r.ok;
  } catch { return false; }
}

export async function markAllRead(type: 'notice' = 'notice'): Promise<number> {
  try {
    const r = await fetch(`/api/inbox/mark-all-read?type=${type}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeaders() }
    });
    if (!r.ok) return 0;
    const j = await r.json();
    return Number(j.marked) || 0;
  } catch { return 0; }
}

/**
 * Relative time formatter — "3분 전", "어제", "2주 전".
 * Designed to read fast in a list; full timestamp goes in the title attribute.
 */
export function relativeTime(iso: string, locale: string = 'en'): string {
  if (!iso) return '';
  // 언어별 문구를 우리가 들고 있지 않는다 — 브라우저 표준을 쓴다.
  // 예전에는 ko/en 만 손으로 적어 두어 중국어·말레이어 사용자에게 영어가 나갔다(2026-09-03 실측).
  // numeric:'auto' 가 "어제 / yesterday / 昨天 / semalam" 까지 알아서 준다.
  // 언어가 늘어도 여기는 손댈 것이 없다.
  const then = new Date(iso).getTime();
  const sec = Math.floor(Math.max(0, Date.now() - then) / 1000);
  // 로케일 태그가 이상하면 Intl 이 RangeError 를 던진다. 이 함수는 고객이 보는
  // 카드(InboxItemCard) 렌더 경로에 있어, 던지면 화면이 통째로 오류 화면으로 간다.
  let rtf: Intl.RelativeTimeFormat;
  try { rtf = new Intl.RelativeTimeFormat(locale || 'en', { numeric: 'auto' }); }
  catch { rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' }); }
  if (sec < 60) return rtf.format(0, 'second').replace(/^in /, '');
  const min = Math.floor(sec / 60);
  if (min < 60) return rtf.format(-min, 'minute');
  const hr = Math.floor(min / 60);
  if (hr < 24) return rtf.format(-hr, 'hour');
  const day = Math.floor(hr / 24);
  if (day < 7) return rtf.format(-day, 'day');
  const wk = Math.floor(day / 7);
  if (wk < 5) return rtf.format(-wk, 'week');
  const mo = Math.floor(day / 30);
  if (mo < 12) return rtf.format(-mo, 'month');
  return rtf.format(-Math.floor(day / 365), 'year');
}

export const TYPE_COLORS: Record<InboxType, { bg: string; fg: string; dot: string }> = {
  notice:           { bg: '#EEF2FF', fg: '#4338CA', dot: '#6366F1' },  // indigo
  support_ticket:   { bg: '#FEF3C7', fg: '#92400E', dot: '#F59E0B' },  // amber
  operation_ticket: { bg: '#D1FAE5', fg: '#065F46', dot: '#10B981' }   // teal
};

export const SEVERITY_COLORS: Record<InboxSeverity, string> = {
  normal: '#6B7280',
  important: '#F59E0B',
  urgent: '#DC2626'
};

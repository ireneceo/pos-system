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
  const then = new Date(iso).getTime();
  const now = Date.now();
  const diff = Math.max(0, now - then);
  const sec = Math.floor(diff / 1000);
  if (sec < 60) return locale === 'ko' ? '방금' : 'just now';
  const min = Math.floor(sec / 60);
  if (min < 60) return locale === 'ko' ? `${min}분 전` : `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return locale === 'ko' ? `${hr}시간 전` : `${hr}h ago`;
  const day = Math.floor(hr / 24);
  if (day === 1) return locale === 'ko' ? '어제' : 'yesterday';
  if (day < 7) return locale === 'ko' ? `${day}일 전` : `${day}d ago`;
  const wk = Math.floor(day / 7);
  if (wk < 5) return locale === 'ko' ? `${wk}주 전` : `${wk}w ago`;
  const mo = Math.floor(day / 30);
  if (mo < 12) return locale === 'ko' ? `${mo}개월 전` : `${mo}mo ago`;
  const yr = Math.floor(day / 365);
  return locale === 'ko' ? `${yr}년 전` : `${yr}y ago`;
}

export const TYPE_COLORS: Record<InboxType, { bg: string; fg: string; dot: string }> = {
  notice:           { bg: '#EEF2FF', fg: '#4338CA', dot: '#6366F1' },  // indigo
  support_ticket:   { bg: '#FEF3C7', fg: '#92400E', dot: '#F59E0B' },  // amber
  operation_ticket: { bg: '#D1FAE5', fg: '#065F46', dot: '#10B981' }   // teal
};

export const SEVERITY_COLORS: Record<InboxSeverity, string> = {
  normal: '#9CA3AF',
  important: '#F59E0B',
  urgent: '#DC2626'
};

/**
 * Date formatting helpers that always use the restaurant's timezone.
 *
 * Why: Browser-local time produces wrong receipts/reports for staff
 * across timezones. Project rule: every `toLocale*` call must carry
 * a timeZone option.
 *
 * Usage:
 *   import { formatDateTime, formatDate, formatTime } from '../utils/dateFormat';
 *   formatDateTime(order.created_at, storeInfo.timeZone);
 *
 * If you don't have a timezone handy (system-admin pages, signup, etc.),
 * pass undefined and we fall back to `Asia/Kuala_Lumpur` (MY base market).
 */

const FALLBACK_TZ = 'Asia/Kuala_Lumpur';

const resolveTz = (tz?: string | null) => (tz && tz.trim()) || FALLBACK_TZ;

const toDate = (input: string | number | Date | null | undefined): Date | null => {
  if (input == null) return null;
  const d = input instanceof Date ? input : new Date(input);
  return Number.isNaN(d.getTime()) ? null : d;
};

export const formatDateTime = (
  input: string | number | Date | null | undefined,
  timeZone?: string | null,
  locale: string = 'en-MY'
): string => {
  const d = toDate(input);
  if (!d) return '—';
  return d.toLocaleString(locale, {
    timeZone: resolveTz(timeZone),
    year: 'numeric', month: 'short', day: '2-digit',
    hour: '2-digit', minute: '2-digit'
  });
};

export const formatDate = (
  input: string | number | Date | null | undefined,
  timeZone?: string | null,
  locale: string = 'en-MY'
): string => {
  const d = toDate(input);
  if (!d) return '—';
  return d.toLocaleDateString(locale, {
    timeZone: resolveTz(timeZone),
    year: 'numeric', month: 'short', day: '2-digit'
  });
};

export const formatTime = (
  input: string | number | Date | null | undefined,
  timeZone?: string | null,
  locale: string = 'en-MY'
): string => {
  const d = toDate(input);
  if (!d) return '—';
  return d.toLocaleTimeString(locale, {
    timeZone: resolveTz(timeZone),
    hour: '2-digit', minute: '2-digit'
  });
};

export const formatDateShort = (
  input: string | number | Date | null | undefined,
  timeZone?: string | null,
  locale: string = 'en-MY'
): string => {
  const d = toDate(input);
  if (!d) return '—';
  return d.toLocaleDateString(locale, {
    timeZone: resolveTz(timeZone),
    month: 'short', day: '2-digit'
  });
};

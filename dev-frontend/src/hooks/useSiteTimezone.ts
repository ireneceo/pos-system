import { useState, useEffect } from 'react';

/**
 * Fetches the site's configured timezone from /api/site-settings (public endpoint).
 * Used by landing page components (Blog, News, BlogPost) to ensure all dates are
 * displayed in the system admin's configured timezone, regardless of browser TZ.
 *
 * Returns 'Asia/Kuala_Lumpur' as sensible default until the fetch completes.
 */
let cachedTimezone: string | null = null;
let pendingFetch: Promise<string> | null = null;

async function fetchSiteTimezone(): Promise<string> {
  if (cachedTimezone) return cachedTimezone;
  if (pendingFetch) return pendingFetch;

  pendingFetch = (async () => {
    try {
      const res = await fetch('/api/site-settings');
      if (res.ok) {
        const data = await res.json();
        const tz = data?.data?.timezone || data?.timezone || 'Asia/Kuala_Lumpur';
        cachedTimezone = tz;
        return tz;
      }
    } catch (e) { /* silent */ }
    cachedTimezone = 'Asia/Kuala_Lumpur';
    return cachedTimezone;
  })();

  return pendingFetch;
}

/**
 * Hook: returns the site's configured timezone (reactive).
 * Starts with 'Asia/Kuala_Lumpur' default, updates once fetched.
 */
export function useSiteTimezone(): string {
  const [tz, setTz] = useState<string>(cachedTimezone || 'Asia/Kuala_Lumpur');

  useEffect(() => {
    if (cachedTimezone) {
      setTz(cachedTimezone);
      return;
    }
    fetchSiteTimezone().then(t => setTz(t));
  }, []);

  return tz;
}

/**
 * Format a date string in the site's configured timezone.
 * Use this everywhere instead of raw toLocaleDateString().
 */
export function formatDateInSiteTz(dateStr: string | null | undefined, tz: string, options?: Intl.DateTimeFormatOptions): string {
  if (!dateStr) return '';
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      timeZone: tz,
      ...options
    });
  } catch (e) {
    return '';
  }
}

export function formatDateTimeInSiteTz(dateStr: string | null | undefined, tz: string): string {
  if (!dateStr) return '';
  try {
    return new Date(dateStr).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: tz
    });
  } catch (e) {
    return '';
  }
}

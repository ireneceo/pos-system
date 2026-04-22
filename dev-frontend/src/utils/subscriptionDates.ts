/**
 * Subscription date calculation — shared between Restaurant / User (Brand General / Foodcourt General / Restaurant Owner) forms.
 *
 * Rules (per product spec):
 *   1. Start Date는 사용자 입력
 *   2. End Date는 표시 전용 — Monthly: Start + 1month - 1day, Annual: Start + 1year - 1day
 *   3. Start Date가 미래이고 trial 체크되어 있으면 그때까지 status='trial', trial_end_date = Start - 1day
 *   4. Start Date가 오늘/과거이면 trial 무효, 즉시 active
 *   5. Start Date가 미래인데 trial 미체크면 status='pending' (구독 대기)
 */

export type BillingCycle = 'monthly' | 'annual';
export type SubscriptionStatus = 'active' | 'trial' | 'pending';

/**
 * Calculate subscription end date from start date + billing cycle.
 * Monthly: Start + 1 month - 1 day (e.g., May 12 → Jun 11)
 * Annual:  Start + 1 year - 1 day  (e.g., May 12 2026 → May 11 2027)
 */
export function calcEndDate(start: Date, cycle: BillingCycle): Date {
  const end = new Date(start);
  if (cycle === 'monthly') {
    end.setMonth(end.getMonth() + 1);
  } else {
    end.setFullYear(end.getFullYear() + 1);
  }
  end.setDate(end.getDate() - 1);
  return end;
}

/**
 * Derive subscription status based on start date + trial flag.
 */
export function deriveStatus(start: Date, today: Date, markAsTrial: boolean): SubscriptionStatus {
  // Compare date only (ignore time)
  const startMidnight = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  if (startMidnight <= todayMidnight) {
    // Start has arrived → active (trial flag ignored)
    return 'active';
  }
  // Start is in the future
  return markAsTrial ? 'trial' : 'pending';
}

/**
 * Calculate trial end date (the day before subscription starts).
 * Returns null if start is today/past (no trial period).
 */
export function calcTrialEnd(start: Date, today: Date, markAsTrial: boolean): Date | null {
  if (!markAsTrial) return null;
  const startMidnight = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  if (startMidnight <= todayMidnight) return null;

  const trialEnd = new Date(start);
  trialEnd.setDate(trialEnd.getDate() - 1);
  return trialEnd;
}

/**
 * Format date as yyyy-MM-dd (local time, no UTC shift).
 */
export function formatDateISO(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/**
 * Parse yyyy-MM-dd as local Date (not UTC).
 * Accepts both plain 'YYYY-MM-DD' and ISO '2026-06-06T00:00:00.000Z'
 * so legacy DB rows stored as DATETIME don't render as invalid dates.
 */
export function parseDateLocal(s: string): Date {
  const datePart = String(s || '').slice(0, 10);
  const [y, m, d] = datePart.split('-').map(Number);
  return new Date(y, m - 1, d);
}

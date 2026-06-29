// Table-number session authority for mobile QR ordering.
//
// Problem (2026-06-29): the scanned table number lives in a SHARED localStorage
// key ('tableNumber'). A stale OrderTypePage tab (old table) can clobber it, so a
// fresh scan of table B sometimes submits as the old table A → wrong kitchen ticket.
//
// Fix = "scan is the absolute source":
//   - localStorage.tableNumber  → DURABLE store. Survives tab eviction so a resumed
//     checkout still has the table (keeps the 2026-06-12 fix: never submit null).
//   - sessionStorage.qrScanTable → PER-TAB authority. Holds THIS tab's actual scan;
//     another tab cannot overwrite it. Read with priority over localStorage so a
//     cross-tab clobber of localStorage can never change what THIS tab submits.
//
// Read order: sessionStorage (this tab's scan) → localStorage (durable fallback).
// See memory [[project_mobile_qr_table_reset]] / [[reference_mobile_order_session_storage]].

const LS_KEY = 'tableNumber';
const SS_KEY = 'qrScanTable';

export function getActiveTable(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    const perTab = sessionStorage.getItem(SS_KEY);
    if (perTab) return perTab;
  } catch { /* sessionStorage unavailable — fall through */ }
  try {
    return localStorage.getItem(LS_KEY);
  } catch {
    return null;
  }
}

// Set the active table for THIS tab (scan or explicit pick). Writes both the durable
// localStorage value and the per-tab session authority so they stay in sync.
export function setActiveTable(value: string): void {
  if (typeof window === 'undefined' || !value) return;
  try { localStorage.setItem(LS_KEY, value); } catch { /* ignore */ }
  try { sessionStorage.setItem(SS_KEY, value); } catch { /* ignore */ }
}

export function clearActiveTable(): void {
  if (typeof window === 'undefined') return;
  try { localStorage.removeItem(LS_KEY); } catch { /* ignore */ }
  try { sessionStorage.removeItem(SS_KEY); } catch { /* ignore */ }
}

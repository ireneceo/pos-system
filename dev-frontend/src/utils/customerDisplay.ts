/**
 * Customer Display Window Manager
 *
 * Opens the customer-facing checkout-display page on a secondary monitor when one is detected.
 * Falls back to a regular new window when:
 *   - Window Management API is unavailable (older browsers)
 *   - User denies the window-management permission
 *   - Only one screen is connected
 *
 * Browser security requires a user gesture (click) to open a popup, so this MUST be called
 * from a click handler. The first click each session also surfaces the permission prompt;
 * subsequent calls reuse the granted permission silently.
 *
 * Persistence: localStorage keys
 *   - cd.autoOpen   = '1' | '0'   (re-open on next POS session via tryAutoReopen)
 *   - cd.lastBounds = JSON {left,top,width,height} (best-effort restoration on next open)
 */

const KEY_AUTO = 'cd.autoOpen';
const KEY_BOUNDS = 'cd.lastBounds';
const WINDOW_NAME = 'PurpleHereCustomerDisplay';

interface ScreenLike {
  left: number;
  top: number;
  availWidth: number;
  availHeight: number;
  isPrimary?: boolean;
  isInternal?: boolean;
  label?: string;
}

interface ScreenDetailsLike {
  screens: ScreenLike[];
  currentScreen?: ScreenLike;
}

let openedWindow: Window | null = null;

export function isAutoOpenEnabled(): boolean {
  try { return localStorage.getItem(KEY_AUTO) === '1'; } catch { return false; }
}

export function setAutoOpenEnabled(enabled: boolean): void {
  try { localStorage.setItem(KEY_AUTO, enabled ? '1' : '0'); } catch { /* ignore */ }
}

function getStoredBounds(): { left: number; top: number; width: number; height: number } | null {
  try {
    const raw = localStorage.getItem(KEY_BOUNDS);
    if (!raw) return null;
    const b = JSON.parse(raw);
    if (typeof b?.left === 'number' && typeof b?.top === 'number' &&
        typeof b?.width === 'number' && typeof b?.height === 'number') return b;
    return null;
  } catch { return null; }
}

function storeBounds(b: { left: number; top: number; width: number; height: number }): void {
  try { localStorage.setItem(KEY_BOUNDS, JSON.stringify(b)); } catch { /* ignore */ }
}

async function pickSecondaryScreen(): Promise<ScreenLike | null> {
  const w = window as any;
  if (typeof w.getScreenDetails !== 'function') return null;
  try {
    const details: ScreenDetailsLike = await w.getScreenDetails();
    if (!details?.screens || details.screens.length < 2) return null;
    const current = details.currentScreen;
    // Prefer the first screen that is NOT current and NOT internal (laptop builtin).
    const external = details.screens.find(s => s !== current && s.isInternal === false);
    if (external) return external;
    // Otherwise pick any screen that is not the current one.
    return details.screens.find(s => s !== current) || null;
  } catch {
    // Permission denied or API failure — fall back to single window
    return null;
  }
}

/**
 * Open (or focus) the customer display window. Must be called from a user gesture.
 * Returns true if a window was opened/focused, false on popup block or error.
 */
export async function openCustomerDisplay(restaurantId: number | string): Promise<boolean> {
  const url = `/restaurant/${restaurantId}/checkout-display`;

  // Already open and not closed → just focus.
  if (openedWindow && !openedWindow.closed) {
    try { openedWindow.focus(); openedWindow.location.href = url; return true; } catch { /* fall through */ }
  }

  const secondary = await pickSecondaryScreen();
  let features = 'noopener=no,popup=yes';

  if (secondary) {
    const left = secondary.left;
    const top = secondary.top;
    const width = secondary.availWidth;
    const height = secondary.availHeight;
    features = `popup=yes,left=${left},top=${top},width=${width},height=${height}`;
    storeBounds({ left, top, width, height });
  } else {
    // Fall back to last-known bounds if any (user may have moved the window manually before)
    const b = getStoredBounds();
    if (b) features = `popup=yes,left=${b.left},top=${b.top},width=${b.width},height=${b.height}`;
  }

  const win = window.open(url, WINDOW_NAME, features);
  if (!win) return false; // popup blocked
  openedWindow = win;

  // Best-effort: try to enter fullscreen on the secondary screen once it loads.
  // (Browsers ignore programmatic fullscreen without a user gesture inside the new window;
  // this remains a hint — most setups keep the popup borderless across the second monitor anyway.)
  try {
    win.addEventListener('load', () => {
      try { (win as any).moveTo?.(features.match(/left=(\d+)/)?.[1] || 0, features.match(/top=(\d+)/)?.[1] || 0); } catch { /* ignore */ }
    });
  } catch { /* ignore cross-origin if any */ }

  return true;
}

/**
 * Re-open the customer display on the next user gesture if auto-mode is enabled.
 * Wire this once per POS Terminal mount. It attaches a one-shot pointerdown listener
 * that fires the popup, then detaches itself.
 */
export function tryAutoReopen(restaurantId: number | string): () => void {
  if (!isAutoOpenEnabled()) return () => {};
  // If a previous popup is still open across a SPA route change, focus it instead.
  if (openedWindow && !openedWindow.closed) {
    try { openedWindow.focus(); } catch { /* ignore */ }
    return () => {};
  }
  const handler = () => {
    document.removeEventListener('pointerdown', handler, true);
    openCustomerDisplay(restaurantId).catch(() => { /* swallow */ });
  };
  document.addEventListener('pointerdown', handler, true);
  return () => document.removeEventListener('pointerdown', handler, true);
}

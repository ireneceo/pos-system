/**
 * Customer Display Window Manager
 *
 * Opens the customer-facing display on a secondary monitor when one is detected.
 *
 * Returns a structured OpenResult so the caller can show actionable guidance for each
 * failure / fallback mode (popup blocked, permission denied, no second monitor, etc.)
 * — silent failures left staff thinking "the button doesn't work".
 *
 * Browser security requires a user gesture (click) to open a popup, so this MUST be
 * called from a click handler. The first click each session also surfaces the
 * Window Management permission prompt (Chrome/Edge); subsequent calls reuse silently.
 *
 * Persistence: localStorage keys
 *   - cd.autoOpen   = '1' | '0'   (re-open on next POS session via tryAutoReopen)
 *   - cd.lastBounds = JSON {left,top,width,height} (best-effort restoration on next open)
 */

const KEY_AUTO = 'cd.autoOpen';
const KEY_BOUNDS = 'cd.lastBounds';
const WINDOW_NAME = 'PurpleHereCustomerDisplay';

const DEFAULT_WIDTH = 1280;
const DEFAULT_HEIGHT = 800;

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

export type OpenResultReason =
  | 'opened'              // success, placed on secondary screen
  | 'focused'             // success, existing popup re-focused
  | 'opened-fallback'     // success, but on primary screen (no Window Management API)
  | 'permission-denied'   // opened on primary; Window Management permission denied
  | 'no-secondary-screen' // opened on primary; no second monitor detected
  | 'popup-blocked';      // failed — browser blocked window.open

export interface OpenResult {
  ok: boolean;
  reason: OpenResultReason;
  /** Present whenever the caller should surface guidance to the user. */
  title?: string;
  message?: string;
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

function clearStoredBounds(): void {
  try { localStorage.removeItem(KEY_BOUNDS); } catch { /* ignore */ }
}

/**
 * Manual reset for the saved Customer Display popup position.
 * Used by Settings → Customer Display → "Reset Position" so staff can
 * recover when the stored bounds point to a disconnected monitor or
 * an off-screen area for any reason.
 */
export function resetCustomerDisplayPosition(): void {
  clearStoredBounds();
}

/**
 * Validate that `b` lies inside at least one currently-attached screen.
 * Without this, a stale entry (e.g. second monitor was unplugged after the
 * last save) would snap the popup off-screen — the well-known "click does
 * nothing" failure.
 *
 * Uses getScreenDetails() when permitted; otherwise falls back to checking
 * the current window's screen rectangle, which still catches the most common
 * disconnect cases on a single-monitor setup.
 */
async function isBoundsOnAttachedScreen(b: { left: number; top: number; width: number; height: number }): Promise<boolean> {
  if (!(b.width >= 100 && b.height >= 100 && b.width <= 20000 && b.height <= 20000)) return false;
  const cx = b.left + b.width / 2;
  const cy = b.top + b.height / 2;

  const w = window as any;
  if (typeof w.getScreenDetails === 'function') {
    try {
      const perm = await getWindowManagementPermission();
      if (perm !== 'denied') {
        const details: ScreenDetailsLike = await w.getScreenDetails();
        if (details?.screens?.length) {
          return details.screens.some(s =>
            cx >= s.left && cx < s.left + s.availWidth &&
            cy >= s.top && cy < s.top + s.availHeight
          );
        }
      }
    } catch { /* permission denied or API failure — fall through */ }
  }

  // Fallback: validate against the current window's screen only. Catches the
  // common case where the user was on a 2-monitor setup, popup was on monitor 2,
  // and monitor 2 has been disconnected — the stale bounds no longer overlap the
  // remaining (primary) screen.
  try {
    const sw = window.screen.availWidth || 0;
    const sh = window.screen.availHeight || 0;
    const sLeft = (window.screen as any).availLeft ?? 0;
    const sTop = (window.screen as any).availTop ?? 0;
    return cx >= sLeft && cx < sLeft + sw && cy >= sTop && cy < sTop + sh;
  } catch { return false; }
}

/**
 * Returns stored bounds only if they still point at an attached screen.
 * Stale entries are auto-deleted to prevent repeat off-screen openings.
 */
async function getValidatedStoredBounds(): Promise<{ left: number; top: number; width: number; height: number } | null> {
  const b = getStoredBounds();
  if (!b) return null;
  const ok = await isBoundsOnAttachedScreen(b);
  if (!ok) { clearStoredBounds(); return null; }
  return b;
}

function storeBounds(b: { left: number; top: number; width: number; height: number }): void {
  try { localStorage.setItem(KEY_BOUNDS, JSON.stringify(b)); } catch { /* ignore */ }
}

async function getWindowManagementPermission(): Promise<'granted' | 'denied' | 'prompt' | 'unsupported'> {
  try {
    if (!('permissions' in navigator)) return 'unsupported';
    const res = await (navigator.permissions as any).query({ name: 'window-management' });
    const state = res?.state;
    if (state === 'granted' || state === 'denied' || state === 'prompt') return state;
    return 'unsupported';
  } catch {
    return 'unsupported';
  }
}

type PickReason = 'ok' | 'permission-denied' | 'single-screen' | 'unsupported';

async function pickSecondaryScreen(): Promise<{ screen: ScreenLike | null; reason: PickReason }> {
  const w = window as any;
  if (typeof w.getScreenDetails !== 'function') return { screen: null, reason: 'unsupported' };
  const perm = await getWindowManagementPermission();
  if (perm === 'denied') return { screen: null, reason: 'permission-denied' };
  try {
    const details: ScreenDetailsLike = await w.getScreenDetails();
    if (!details?.screens || details.screens.length < 2) {
      return { screen: null, reason: 'single-screen' };
    }
    const current = details.currentScreen;
    const external = details.screens.find(s => s !== current && s.isInternal === false);
    if (external) return { screen: external, reason: 'ok' };
    return { screen: details.screens.find(s => s !== current) || null, reason: 'ok' };
  } catch {
    return { screen: null, reason: 'permission-denied' };
  }
}

function fallbackBounds(): { left: number; top: number; width: number; height: number } {
  try {
    const sw = window.screen.availWidth || DEFAULT_WIDTH;
    const sh = window.screen.availHeight || DEFAULT_HEIGHT;
    const w = Math.min(DEFAULT_WIDTH, Math.max(640, sw - 40));
    const h = Math.min(DEFAULT_HEIGHT, Math.max(480, sh - 40));
    const left = Math.max(0, Math.floor((sw - w) / 2));
    const top = Math.max(0, Math.floor((sh - h) / 2));
    return { left, top, width: w, height: h };
  } catch {
    return { left: 0, top: 0, width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT };
  }
}

/**
 * Open (or focus) the customer display window. Must be called from a user gesture.
 * Returns a structured OpenResult — callers should always surface `title`/`message`
 * when present so staff know what to do.
 */
export async function openCustomerDisplay(
  restaurantId: number | string,
  kind: 'checkout-display' | 'display' = 'checkout-display'
): Promise<OpenResult> {
  const url = `/restaurant/${restaurantId}/${kind}`;

  const { screen: secondary, reason: pickReason } = await pickSecondaryScreen();

  let placement: { left: number; top: number; width: number; height: number };
  let placedOnSecondary = false;

  if (secondary) {
    placement = {
      left: secondary.left,
      top: secondary.top,
      width: secondary.availWidth,
      height: secondary.availHeight,
    };
    storeBounds(placement);
    placedOnSecondary = true;
  } else {
    placement = (await getValidatedStoredBounds()) || fallbackBounds();
  }

  const features = `popup=yes,noopener=no,left=${placement.left},top=${placement.top},width=${placement.width},height=${placement.height}`;

  // window.open() with a fixed WINDOW_NAME reuses any existing popup of the same name
  // (navigates it to `url`) or opens a fresh one. We deliberately do NOT early-return
  // on a cached `openedWindow.focus()` because that pattern silently fails when the
  // popup is minimized / behind / on a disconnected monitor — staff click the button
  // and "nothing happens". Always re-resolve, then forcibly reposition and focus.
  let win: Window | null = null;
  try {
    win = window.open(url, WINDOW_NAME, features);
  } catch {
    win = null;
  }

  if (!win) {
    return {
      ok: false,
      reason: 'popup-blocked',
      title: 'Popup Blocked',
      message:
        'Your browser blocked the Customer Display popup.\n\n' +
        '1. Look for a popup icon in the address bar (or a banner at the top).\n' +
        '2. Choose "Always allow popups from this site".\n' +
        '3. Click the Customer Display button again.',
    };
  }

  openedWindow = win;

  // Force the window into a visible position+size.
  // PWA standalone (Windows desktop app) 의 window.open 좌표 무시 우회 위해
  // 여러 timer 로 재시도. Chromium 가 popup 을 처음에 primary 모니터로 띄워도
  // 곧 moveTo() 로 secondary 로 강제 이동.
  const forcePlacement = () => {
    try {
      (win as any).moveTo?.(placement.left, placement.top);
      (win as any).resizeTo?.(placement.width, placement.height);
      win!.focus();
    } catch { /* ignore cross-origin / minimized-state guards */ }
  };
  try {
    win.focus();
    forcePlacement();
    win.addEventListener('load', forcePlacement);
    // 추가 재시도 — Chrome PWA standalone 의 window.open 좌표 무시 우회.
    // 일부 환경에서 popup 컨텐츠가 paint 후에야 moveTo() 가 적용됨.
    setTimeout(forcePlacement, 100);
    setTimeout(forcePlacement, 500);
    setTimeout(forcePlacement, 1500);
  } catch { /* ignore */ }

  if (placedOnSecondary) {
    return { ok: true, reason: 'opened' };
  }

  // Window opened but on the primary screen — explain why and what to do next.
  if (pickReason === 'permission-denied') {
    return {
      ok: true,
      reason: 'permission-denied',
      title: 'Allow "Window Management" for Second Monitor',
      message:
        'Customer Display opened on this screen because the browser blocked the "Window Management" permission needed to place it on the second monitor.\n\n' +
        'To fix:\n' +
        '1. Click the lock icon (left of the address bar).\n' +
        '2. Find "Window Management" and set it to "Allow".\n' +
        '3. Reload this page, then click Customer Display again.\n\n' +
        'For now, drag the popup to your second monitor manually — the position is saved for next time.',
    };
  }

  if (pickReason === 'single-screen') {
    return {
      ok: true,
      reason: 'no-secondary-screen',
      title: 'No Second Monitor Detected',
      message:
        'Customer Display opened on this screen because no second monitor was detected.\n\n' +
        'Check:\n' +
        '1. The second monitor is powered on and the cable is connected.\n' +
        '2. Windows: Settings → System → Display → set "Extend these displays".\n' +
        '3. macOS: System Settings → Displays → arrange screens (not mirrored).\n\n' +
        'Once the second monitor is detected, close this popup and try again.',
    };
  }

  // Browser does not support the Window Management API (Firefox / Safari / older).
  return {
    ok: true,
    reason: 'opened-fallback',
    title: 'Drag to Second Monitor',
    message:
      'Customer Display opened on this screen. Your browser does not support automatic placement on the second monitor.\n\n' +
      'Drag the popup window by its title bar to your second monitor — the position is saved for next time.\n\n' +
      '(For automatic placement, use Google Chrome or Microsoft Edge.)',
  };
}

/**
 * Re-open the customer display on the next user gesture if auto-mode is enabled.
 * Wire this once per POS Terminal mount. It attaches a one-shot pointerdown listener
 * that fires the popup, then detaches itself.
 */
export function tryAutoReopen(restaurantId: number | string): () => void {
  if (!isAutoOpenEnabled()) return () => {};
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

/**
 * Build Version Watcher
 *
 * Polls /index.html periodically and compares the bundled JS hash with the one
 * currently loaded. If a newer hash is detected (= a fresh deployment landed),
 * triggers a one-time soft reload so users always run the latest code without
 * needing to clear cache or hard-refresh.
 *
 * This is the user-zero-friction replacement for asking everyone to Ctrl+Shift+R
 * after every deployment. Cloudflare's 5-minute index.html cache is the maximum
 * staleness window; we poll a little more often than that.
 *
 * Skips reload while the user is mid-input (focused on form/textarea/contenteditable),
 * during active fetches the app might rely on, or when the tab is hidden, to avoid
 * losing in-progress work. Will retry on the next poll.
 */

const POLL_INTERVAL_MS = 4 * 60 * 1000;     // 4 minutes — under Cloudflare's 5-min TTL
const RELOAD_GRACE_MS = 30 * 1000;           // wait 30s after detecting new build before reload
const STORAGE_KEY = 'app.lastReloadAt';

let currentHash: string | null = null;
let pollTimer: ReturnType<typeof setInterval> | null = null;
let reloadScheduledAt: number | null = null;

function extractMainHash(html: string): string | null {
  // matches src="/static/js/main.<hash>.js" or src=/static/js/main.<hash>.js
  const m = html.match(/main\.([a-f0-9]+)\.js/);
  return m ? m[1] : null;
}

function readCurrentHashFromDOM(): string | null {
  const scripts = Array.from(document.querySelectorAll('script[src*="/static/js/main."]')) as HTMLScriptElement[];
  for (const s of scripts) {
    const m = s.src.match(/main\.([a-f0-9]+)\.js/);
    if (m) return m[1];
  }
  return null;
}

function userIsBusy(): boolean {
  if (document.hidden) return true;
  const el = document.activeElement;
  if (!el) return false;
  const tag = el.tagName?.toLowerCase();
  if (tag === 'input' || tag === 'textarea' || tag === 'select') return true;
  if ((el as HTMLElement).isContentEditable) return true;
  // Modal open — don't interrupt
  if (document.querySelector('[role="dialog"], .modal-open')) return true;
  return false;
}

function loopUntilSafeReload() {
  if (reloadScheduledAt && Date.now() - reloadScheduledAt > 10 * 60 * 1000) {
    // Stuck for >10 min waiting for safe moment — force reload anyway, user won't notice mid-edit
    // since they presumably stepped away if they've been "busy" that long.
    location.reload();
    return;
  }
  if (userIsBusy()) {
    setTimeout(loopUntilSafeReload, 5000);
    return;
  }
  // Avoid reload loop bug: throttle to once per 60s minimum
  try {
    const last = Number(localStorage.getItem(STORAGE_KEY) || 0);
    if (Date.now() - last < 60 * 1000) return;
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
  } catch { /* localStorage may be blocked */ }
  location.reload();
}

async function pollOnce() {
  try {
    const res = await fetch(`/?_v=${Date.now()}`, {
      cache: 'no-store',
      headers: { 'Cache-Control': 'no-cache' }
    });
    if (!res.ok) return;
    const html = await res.text();
    const remoteHash = extractMainHash(html);
    if (!remoteHash) return;
    if (!currentHash) currentHash = readCurrentHashFromDOM();
    if (!currentHash) return;
    if (remoteHash !== currentHash) {
      if (!reloadScheduledAt) {
        reloadScheduledAt = Date.now();
        // Soft delay so we don't yank the page out from under a user mid-action
        setTimeout(loopUntilSafeReload, RELOAD_GRACE_MS);
      }
    }
  } catch {
    // Network blip — try again next interval
  }
}

export function startBuildVersionWatcher(): void {
  if (pollTimer) return;
  currentHash = readCurrentHashFromDOM();
  // First poll after one interval (don't poll on mount — page just loaded)
  pollTimer = setInterval(pollOnce, POLL_INTERVAL_MS);
  // Also poll when the tab becomes visible after being hidden — covers the
  // common "open laptop, app was open in background overnight" case.
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) pollOnce();
  });
}

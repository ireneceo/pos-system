/**
 * App-shell navigation helper.
 *
 * "In-app shell" = running inside an installed PWA (display-mode: standalone)
 * OR the native Windows desktop app (Electron preload sets __PURPLE_DESKTOP).
 *
 * Full-screen POS pages (POS Terminal / Floor Plan / Kitchen / Customer Display /
 * Mobile Order) are launched from several places (sidebar, dashboard quick-action
 * tiles, empty-state buttons). In a plain browser we open them in a new tab so the
 * operator can spread them across monitors. Inside the app shell that same
 * window.open() spawns a DETACHED OS window which:
 *   - in Electron has no preload → shows the "install the desktop app" banner as if
 *     it were a plain browser, and
 *   - could run a SECOND auto-print poller = duplicate kitchen tickets.
 * So in-app we navigate in the SAME window instead. Every launch site must route
 * through openSecondaryPage() so the behaviour is consistent everywhere.
 *
 * Note: this branches app-shell *navigation* only. Print transport is a separate
 * concern (utils/billPrint.js feature-detects window.__NATIVE_PRINT) and must not
 * depend on this.
 */
import { isNativeDesktop } from './nativeDesktop';

export function isInAppShell(): boolean {
  if (typeof window === 'undefined') return false;
  const standalone =
    (typeof window.matchMedia === 'function' && window.matchMedia('(display-mode: standalone)').matches) ||
    (navigator as any).standalone === true;
  return Boolean(standalone) || isNativeDesktop();
}

export function openSecondaryPage(path: string, navigate: (p: string) => void): void {
  if (isInAppShell()) navigate(path);
  else window.open(path, '_blank');
}

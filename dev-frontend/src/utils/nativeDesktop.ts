/**
 * Native desktop (Electron) detection.
 *
 * The Windows desktop shell (desktop-pos/, QZ Tray replacement) injects
 * `window.__PURPLE_DESKTOP` via its preload script. That flag is the single
 * source of truth for "am I running inside our native app vs a plain browser".
 *
 * Use this to branch app-shell behaviour (e.g. navigate in-place instead of
 * opening a new OS window for full-screen POS pages), NOT to branch print
 * transport — printing feature-detects `window.__NATIVE_PRINT` separately in
 * utils/billPrint.js and must stay independent of this.
 */
export function isNativeDesktop(): boolean {
  if (typeof window === 'undefined') return false;
  return Boolean((window as any).__PURPLE_DESKTOP);
}

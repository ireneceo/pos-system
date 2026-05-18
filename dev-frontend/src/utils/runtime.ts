/**
 * Runtime environment helpers.
 *
 * `isStandalone()` — true when the app is running as an installed PWA / desktop app
 * (display-mode: standalone). Use this to decide whether sidebar links to
 * fullscreen pages (POS Terminal, Floor Plan, Kitchen Display, Customer Display,
 * Mobile Order) should open via in-app router navigate (standalone) or
 * window.open new tab (browser mode — multi-monitor workflow).
 *
 * `window.open(_, '_blank')` from a PWA standalone window pops out to the
 * external browser by spec, which is what we want to avoid for staff using
 * the desktop app.
 */
export function isStandalone(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) return true;
    // iOS Safari
    if ((window.navigator as any).standalone === true) return true;
  } catch {
    /* noop */
  }
  return false;
}

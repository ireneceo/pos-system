'use strict';
// Injected on app startup. Maps the Capacitor NativePrint plugin onto
// window.__NATIVE_PRINT using the EXACT §4 contract that billPrint.js already
// feature-detects — so the web app prints via Android natively with ZERO
// frontend changes (identical to the Windows Electron bridge).
//
// Wired via Capacitor (registerPlugin + injected before the remote page runs).
// This file is the JS side; the native implementation is native/NativePrintPlugin.kt.

(function () {
  if (typeof window === 'undefined') return;
  const Cap = window.Capacitor;
  if (!Cap || !Cap.Plugins || !Cap.Plugins.NativePrint) return; // not in the app
  const P = Cap.Plugins.NativePrint;

  const safe = (fn) => (arg) => Promise.resolve(fn(arg)).catch((e) => ({ ok: false, error: (e && e.message) || 'BRIDGE_ERROR' }));

  window.__PURPLE_DESKTOP = { isDesktop: true, platform: 'android' }; // hides the "download the app" CTA
  window.__NATIVE_PRINT = {
    available: true,
    version: '0.1.0',
    listPrinters: () => P.listPrinters().then((r) => r.printers || []).catch(() => []),
    getDefaultPrinter: () => P.getDefaultPrinter().then((r) => r.name || null).catch(() => null),
    printHtml: safe((job) => P.printHtml(job)),
    printRaw: safe((job) => P.printRaw(job)),        // { data(base64), target:{kind:'lan'|'os'|'usb'|'bt', ...} }
    openDrawer: safe((target) => P.openDrawer(target)),
    diagnostics: () => P.diagnostics().catch((e) => ({ platform: 'android', error: (e && e.message) || 'ERR' }))
  };
})();

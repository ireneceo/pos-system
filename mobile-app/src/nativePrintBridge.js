'use strict';
// Injected on every page load (MainActivity). Maps the Capacitor NativePrint plugin
// onto window.__NATIVE_PRINT using the EXACT §4 contract that billPrint.js already
// feature-detects — so the web app prints via Android natively with ZERO changes to
// billPrint (🔒 protected). Same contract as the Windows Electron bridge.
//
// Also exposes window.__NATIVE_PRINT_SETUP — Android ONLY (design §8-2). Android has no
// OS print spooler, so a network printer's name→host mapping must be registered on the
// device. The web Settings page is the only consumer; billPrint never reads it. Windows
// does not inject this object, so Windows behaviour stays byte-identical.
//
// Native side: android/app/src/main/java/com/purplehere/pos/mobile/NativePrintPlugin.kt

(function () {
  if (typeof window === 'undefined') return;
  const Cap = window.Capacitor;
  if (!Cap || !Cap.Plugins || !Cap.Plugins.NativePrint) return; // not in the app
  const P = Cap.Plugins.NativePrint;

  const safe = (fn) => (arg) => Promise.resolve(fn(arg)).catch((e) => ({ ok: false, error: (e && e.message) || 'BRIDGE_ERROR' }));

  window.__PURPLE_DESKTOP = { isDesktop: true, platform: 'android' }; // hides the "download the app" CTA

  window.__NATIVE_PRINT = {
    available: true,
    // Filled from the APK's BuildConfig.VERSION_NAME via diagnostics (below) — never a
    // constant here. A hand-maintained version constant drifts from the build the store
    // actually runs (2026-07-13 desktop CTA drift, same class).
    version: null,
    listPrinters: () => P.listPrinters().then((r) => r.printers || []).catch(() => []),
    getDefaultPrinter: () => P.getDefaultPrinter().then((r) => r.name || null).catch(() => null),
    printHtml: safe((job) => P.printHtml(job)),
    printRaw: safe((job) => P.printRaw(job)),        // { data(base64), target:{kind:'lan'|'os'|'bt', ...} }
    openDrawer: safe((target) => P.openDrawer(target)),
    diagnostics: () => P.diagnostics().catch((e) => ({ platform: 'android', error: (e && e.message) || 'ERR' }))
  };

  // Android-only setup surface (NOT §4 — billPrint must never call these).
  window.__NATIVE_PRINT_SETUP = {
    platform: 'android',
    getState: () => P.getSetupState().catch((e) => ({ platform: 'android', error: (e && e.message) || 'ERR' })),
    addNetPrinter: safe((p) => P.addNetPrinter(p)),                  // {name, host, port}
    removeNetPrinter: safe((name) => P.removeNetPrinter({ name })),
    setDefaultPrinter: safe((name) => P.setDefaultPrinter({ name })), // null/'' = clear
    requestBtPermission: () => P.requestBtPermission().catch(() => ({ state: 'denied' })),
    openSystemBluetoothSettings: safe(() => P.openSystemBluetoothSettings()),
    openAppSettings: safe(() => P.openAppSettings())
  };

  // Resolve the real APK version onto the bridge (App.tsx renders it as a badge).
  P.diagnostics()
    .then((d) => { if (d && d.appVersion) window.__NATIVE_PRINT.version = d.appVersion; })
    .catch(() => { /* stays null — the Settings diagnostics card surfaces the failure */ });
})();

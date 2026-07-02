'use strict';

// Preload runs in an isolated context (contextIsolation:ON, nodeIntegration:OFF).
// It is the ONLY bridge between the remote web app and the native main process.
//
// It exposes `window.__NATIVE_PRINT` (design §4). billPrint.js feature-detects
// this object: present => delegate the QZ send functions to native IPC; absent
// (a plain browser) => take the existing QZ path unchanged. So the SAME web
// bundle runs byte-for-byte identically in a browser.
//
// Contract: every print/drawer method resolves to { ok, error? } and NEVER
// throws (we catch IPC rejections here and normalize them).

const { contextBridge, ipcRenderer } = require('electron');

function safeInvoke(channel, arg) {
  return ipcRenderer.invoke(channel, arg).catch((err) => ({
    ok: false,
    error: (err && err.message) || 'IPC_ERROR'
  }));
}

let appVersion = '0.0.0';
try {
  appVersion = ipcRenderer.sendSync('native:versionSync') || appVersion;
} catch (_) { /* non-fatal */ }

contextBridge.exposeInMainWorld('__PURPLE_DESKTOP', {
  isDesktop: true,
  version: appVersion
});

contextBridge.exposeInMainWorld('__NATIVE_PRINT', {
  available: true,
  version: appVersion,

  listPrinters: () => ipcRenderer.invoke('native:listPrinters').catch(() => []),
  getDefaultPrinter: () => ipcRenderer.invoke('native:getDefaultPrinter').catch(() => null),

  // HTML pixel print (replaces sendHTMLViaQZTray). printerName '' = OS default.
  printHtml: (job) => safeInvoke('native:printHtml', job),

  // RAW ESC/POS (replaces sendViaQZTray). data = base64 bytes.
  // target: { kind:'lan', host, port } | { kind:'os', printerName }
  printRaw: (job) => safeInvoke('native:printRaw', job),

  // Cash drawer pulse to a target (same target shape as printRaw).
  openDrawer: (target) => safeInvoke('native:openDrawer', target),

  diagnostics: () => ipcRenderer.invoke('native:diagnostics').catch((err) => ({
    platform: 'unknown',
    error: (err && err.message) || 'IPC_ERROR'
  }))
});

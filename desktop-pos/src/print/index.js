'use strict';

// Native print bridge — main-process side.
// Registers the ipcMain handlers backing window.__NATIVE_PRINT (design §4) and
// routes raw jobs to the right transport (LAN socket vs OS winspool).
//
// Contract (design §4): handlers NEVER throw — they always resolve to
// { ok, error? } (print/drawer) or a plain value (list/diagnostics). Printer
// name mismatch is an explicit failure; there is NO silent default fallback.

const { app, ipcMain, shell } = require('electron');
const printers = require('./printers');
const { printHtml, renderCheck, destroy: destroyHtmlPrinter } = require('./htmlPrinter');
const { printRawLan } = require('./rawLan');
const { printRawWindows } = require('./rawWindows');

// Standard cash-drawer kick: ESC p 0 100 100 (drawer #1, 100ms on / 100ms off).
// Matches billPrint's pulse bytes exactly ('\x1B\x70\x00\x64\x64').
const DRAWER_PULSE = Buffer.from([0x1b, 0x70, 0x00, 0x64, 0x64]);

// Route a raw byte buffer to a target: LAN socket or OS-registered printer.
function routeRaw(buffer, target) {
  if (!target || typeof target !== 'object') {
    return Promise.resolve({ ok: false, error: 'BAD_TARGET' });
  }
  if (target.kind === 'lan') {
    if (!target.host) return Promise.resolve({ ok: false, error: 'BAD_TARGET' });
    return printRawLan(buffer, target.host, target.port);
  }
  if (target.kind === 'os') {
    return printRawWindows(buffer, target.printerName || '');
  }
  return Promise.resolve({ ok: false, error: 'BAD_TARGET' });
}

function decodeBase64(data) {
  try {
    return Buffer.from(String(data || ''), 'base64');
  } catch (_) {
    return null;
  }
}

// Register the bridge. `getMainWebContents` supplies a webContents used only for
// OS printer enumeration (getPrintersAsync).
function register(getMainWebContents) {
  printers.setWebContentsProvider(getMainWebContents);

  // Synchronous version read for preload (so __NATIVE_PRINT.version is a string).
  ipcMain.on('native:versionSync', (event) => {
    event.returnValue = app.getVersion();
  });

  ipcMain.handle('native:listPrinters', () => printers.listPrinters());
  ipcMain.handle('native:getDefaultPrinter', () => printers.getDefaultPrinter());

  ipcMain.handle('native:printHtml', (_e, job) => {
    if (!job || typeof job.html !== 'string') {
      return { ok: false, error: 'BAD_JOB' };
    }
    return printHtml({
      html: job.html,
      printerName: job.printerName || '',
      widthMm: job.widthMm,
      copies: job.copies
    });
  });

  ipcMain.handle('native:printRaw', (_e, job) => {
    if (!job) return { ok: false, error: 'BAD_JOB' };
    const buffer = decodeBase64(job.data);
    if (!buffer) return { ok: false, error: 'BAD_DATA' };
    return routeRaw(buffer, job.target);
  });

  ipcMain.handle('native:openDrawer', (_e, target) => routeRaw(DRAWER_PULSE, target));

  // 0.1.7 diagnostics-only: run the real HTML render pipeline but save a PDF instead of
  // printing, then open it on screen — a zero-paper discriminator for blank-bill reports
  // (render problem vs printer-driver problem). Not used by any auto-print path.
  ipcMain.handle('native:renderCheck', async (_e, job) => {
    if (!job || typeof job.html !== 'string') {
      return { ok: false, error: 'BAD_JOB' };
    }
    const r = await renderCheck({ html: job.html });
    if (r && r.ok && r.path) {
      try { shell.openPath(r.path); } catch (_) { /* viewer optional */ }
    }
    return r;
  });

  ipcMain.handle('native:diagnostics', async () => {
    return {
      platform: process.platform,
      appVersion: app.getVersion(),
      electron: process.versions.electron,
      printers: await printers.listPrinters(),
      defaultPrinter: await printers.getDefaultPrinter()
    };
  });
}

module.exports = { register, destroyPrintWindow: destroyHtmlPrinter };

'use strict';

// §6-1 HTML pixel printing — replaces sendHTMLViaQZTray.
// A hidden BrowserWindow renders the ticket HTML (Chromium = correct Korean
// glyphs, same principle as QZ's HTML pixel mode) and prints it silently to the
// named OS printer. Jobs are serialized on the 'html' lane so call order is
// preserved (station tickets before the consolidated ticket).

const fs = require('fs');
const path = require('path');
const { app, BrowserWindow } = require('electron');
const { enqueue } = require('./serialQueue');
const printers = require('./printers');

const MICRONS_PER_PX = 264.583; // 25400 microns/inch / 96 CSS px/inch
const MICRONS_PER_MM = 1000;
const RENDER_TIMEOUT_MS = 20000;

let _win = null;

function getWindow() {
  if (_win && !_win.isDestroyed()) return _win;
  _win = new BrowserWindow({
    show: false,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      backgroundThrottling: false
    }
  });
  return _win;
}

function withTimeout(promise, ms, onTimeoutValue) {
  let timer;
  const timeout = new Promise((resolve) => {
    timer = setTimeout(() => resolve(onTimeoutValue), ms);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

async function doPrint({ html, printerName, widthMm, copies }) {
  // Enforce the explicit-failure contract before rendering anything.
  const resolved = await printers.resolveDeviceName(printerName || '');
  if (!resolved.ok) {
    return { ok: false, error: resolved.error };
  }
  const deviceName = resolved.deviceName;

  const win = getWindow();
  const wc = win.webContents;

  // Write to a temp file (robust for any ticket size / UTF-8) and load it.
  const tmpFile = path.join(
    app.getPath('temp'),
    `pp-ticket-${process.pid}-${Date.now()}.html`
  );

  try {
    fs.writeFileSync(tmpFile, html, 'utf8');

    const loaded = new Promise((resolve, reject) => {
      const onFinish = () => { cleanup(); resolve(); };
      const onFail = (_e, code, desc) => { cleanup(); reject(new Error(`load failed ${code} ${desc}`)); };
      function cleanup() {
        wc.removeListener('did-finish-load', onFinish);
        wc.removeListener('did-fail-load', onFail);
      }
      wc.once('did-finish-load', onFinish);
      wc.once('did-fail-load', onFail);
    });

    await wc.loadFile(tmpFile);
    await loaded;

    // Measure rendered content height for roll paper (no fixed page height).
    let heightPx = 0;
    try {
      heightPx = await wc.executeJavaScript(
        'Math.ceil(document.body.getBoundingClientRect().height)'
      );
    } catch (_) { /* fall through to a sane default */ }
    if (!heightPx || heightPx < 10) heightPx = 400;

    const widthMicrons = Math.round((widthMm || 80) * MICRONS_PER_MM);
    const heightMicrons = Math.round((heightPx + 16) * MICRONS_PER_PX);

    const printResult = await new Promise((resolve) => {
      wc.print(
        {
          silent: true,
          printBackground: true,
          deviceName,
          color: false,
          margins: { marginType: 'none' },
          pageSize: { width: widthMicrons, height: heightMicrons },
          copies: Math.max(1, copies || 1)
        },
        (success, failureReason) => resolve({ success, failureReason })
      );
    });

    if (!printResult.success) {
      return { ok: false, error: printResult.failureReason || 'PRINT_FAILED' };
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, error: (err && err.message) || 'PRINT_ERROR' };
  } finally {
    try { fs.unlinkSync(tmpFile); } catch (_) { /* best effort */ }
  }
}

function printHtml(job) {
  return enqueue('html', () =>
    withTimeout(doPrint(job), RENDER_TIMEOUT_MS, { ok: false, error: 'TIMEOUT' })
  );
}

// Tear down the cached hidden print window so it can't keep the process alive after
// the main window closes (single-instance-lock zombie → "app won't reopen"). Called on
// app 'will-quit'. app.quit() also closes it, but this is an explicit backstop.
function destroy() {
  try { if (_win && !_win.isDestroyed()) _win.destroy(); } catch (_) { /* best effort */ }
  _win = null;
}

module.exports = { printHtml, destroy };

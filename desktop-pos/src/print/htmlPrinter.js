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
const { printRawWindows } = require('./rawWindows');
const raster = require('./raster');

const RENDER_TIMEOUT_MS = 20000;

let _win = null;

function getWindow() {
  if (_win && !_win.isDestroyed()) return _win;
  _win = new BrowserWindow({
    // 2026-07-09 (Irene): the print window was `show:false` with no size. An offscreen/never-
    // shown Chromium window may never PAINT its content, so webContents.print() captured a
    // BLANK page → white paper (the print job fired fine, but the page was empty). Fix: give
    // it a real size, force painting even while hidden, and position it far offscreen so it
    // renders without ever being visible to the operator.
    show: false,
    x: -32000,
    y: -32000,
    width: 420,
    height: 900,
    paintWhenInitiallyHidden: true,
    // 0.1.7: once doPrint() calls showInactive() the window is technically "shown"
    // (far offscreen) — without these two flags Windows would list it in the taskbar
    // and Alt-Tab as a ghost second "Purple POS" the operator can never close.
    skipTaskbar: true,
    focusable: false,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      backgroundThrottling: false,
      offscreen: false
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

// Shared render pipeline: write HTML to tmpFile, load it in the hidden window and
// wait until it is actually PAINTED (images decoded + showInactive + 2×rAF). Used
// byte-identically by doPrint (real ticket) and doRenderCheck (diagnostics printToPDF)
// so the diagnostic exercises the exact pipeline a real bill goes through.
async function loadAndPaint(win, tmpFile, html) {
  const wc = win.webContents;
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

  // Insurance: wait for any <img> (logo) to fully decode before printing. did-finish-load
  // already waits for the window 'load' event (which includes images), but this double-
  // guards a slow logo decode on the hidden window. Non-fatal, capped.
  try {
    await withTimeout(
      wc.executeJavaScript(
        'Promise.all(Array.from(document.images).map(i => (i.decode ? i.decode().catch(()=>{}) : 0))).then(()=>true)'
      ),
      5000,
      true
    );
  } catch (_) { /* non-fatal */ }

  // Force the offscreen window to actually PAINT the ticket before printing. A never-shown
  // window can print a blank frame; showing it far offscreen (no focus, invisible) makes
  // Chromium composite the page, and waiting two animation frames guarantees a painted frame.
  try { if (!win.isVisible()) win.showInactive(); } catch (_) { /* non-fatal */ }
  try {
    await withTimeout(
      wc.executeJavaScript('new Promise(r => requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(r, 120))))'),
      3000,
      true
    );
  } catch (_) { /* non-fatal */ }
}

// Canonical print path (2026-07-15 — with MIN blank-bill): render the ticket in
// Chromium, then CAPTURE the painted pixels and encode them as ESC/POS raster so
// the bytes go out the proven RAW transport (winspool) instead of the Windows GDI
// print driver. Cheap POS-80 thermal drivers blank a silent GDI raster job but
// execute a GS v 0 raster command natively — the same reason the kitchen order
// ticket (raw ESC/POS) prints while the HTML bill did not. Returns a ready-to-send
// Buffer, or null if the page couldn't be captured (caller falls back to GDI).
const RAF_WAIT = 'new Promise(r => requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(r, 60))))';

async function captureRasterDocument(win, wc, widthMm) {
  // The real bill/ticket HTML lays out at `width:100%` under `@page 80mm`. On screen
  // capturePage() would otherwise use the WINDOW width (420px) as the layout width, so
  // text would come out ~70% of design size (Fable C1). Pin the CSS layout width to the
  // paper's printable width and render it up to the exact printer dot width via zoom, so
  // the captured pixels are 1:1 with what the printer prints — crisp, correct-size glyphs.
  const dots = raster.dotsForWidthMm(widthMm);                    // 80mm → 576, 58mm → 384
  const cssW = Math.max(120, Math.round((Number(widthMm) || 80) / 25.4 * 96)); // 80mm → 302 CSS px
  const zoom = dots / cssW;                                       // ~1.9 → renders cssW layout at `dots` device px

  try { wc.setZoomFactor(zoom); } catch (_) { /* non-fatal */ }
  // Width first (DIP = cssW*zoom = dots) so the page reflows at cssW CSS px, then measure
  // the reflowed content HEIGHT (CSS px, zoom-independent) to size the window for a full,
  // un-clipped capture. Over-measure a little — extra bottom whitespace is harmless (cut
  // follows a feed), a short window would clip the total line.
  try {
    win.setContentSize(dots, 1200);
    await withTimeout(wc.executeJavaScript(RAF_WAIT), 1500, true);
    const hCss = await withTimeout(
      wc.executeJavaScript('document.body ? Math.ceil(document.body.scrollHeight) : 0'), 1000, 0
    );
    const hDip = Math.min(Math.ceil((hCss || 1200) * zoom) + 24, 8000);
    win.setContentSize(dots, hDip);
    await withTimeout(wc.executeJavaScript(RAF_WAIT), 1500, true);
  } catch (_) { /* non-fatal — capture whatever is painted */ }

  const img = await wc.capturePage();
  if (!img || img.isEmpty()) return null;
  // Already rendered at `dots` wide; resize is a safety no-op that guarantees exact width.
  const sized = img.resize({ width: dots });
  const size = sized.getSize();
  const bmp = sized.getBitmap();                                 // tightly packed BGRA
  if (!bmp || !bmp.length || !size.width || !size.height) return null;
  return raster.buildRasterDocument(bmp, size.width, size.height);
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
    await loadAndPaint(win, tmpFile, html);

    // 0.1.8: what did the hidden window ACTUALLY paint? A blank ticket and a perfectly
    // rendered one are indistinguishable once the job is spooled — this is the only place
    // that can tell them apart. The web layer ships these numbers to the server print log,
    // so a blank receipt at the shop is diagnosable without anyone standing at the printer:
    //   txt≈0 / h≈0  → the render is blank        (app bug — fix the renderer)
    //   txt large    → the render is fine         (blame the spool/driver leg)
    //   imgErr > 0   → the logo failed to load    (image path, not a blank page)
    let render = null;
    try {
      render = await withTimeout(
        wc.executeJavaScript(
          '({h: document.body ? document.body.scrollHeight : 0,' +
          ' txt: document.body ? document.body.innerText.replace(/\\s/g, "").length : 0,' +
          ' imgs: document.images.length,' +
          ' imgErr: Array.from(document.images).filter(i => !i.complete || i.naturalWidth === 0).length})'
        ),
        500,
        null
      );
    } catch (_) { render = null; /* diagnostics must never block a print */ }

    // ── Canonical path: pixel raster over the proven RAW transport ──────────
    // Windows only (winspool). Render → capture → GS v 0 raster → printRawWindows,
    // the exact byte transport the kitchen order ticket prints on today. This is
    // what makes the design (logo + Korean) come out on the very driver that
    // blanked the old GDI silent-print path.
    if (process.platform === 'win32') {
      try {
        const doc = await captureRasterDocument(win, wc, widthMm);
        if (doc && doc.length) {
          const copiesN = Math.max(1, copies || 1);
          let sent = { ok: false, error: 'RASTER_NOT_SENT' };
          for (let i = 0; i < copiesN; i++) {
            sent = await printRawWindows(doc, deviceName);
            if (!sent || !sent.ok) break;
          }
          if (sent && sent.ok) {
            return { ok: true, render: Object.assign({ via: 'raster' }, render || {}) };
          }
          if (render) render.rasterErr = (sent && sent.error) || 'RASTER_FAIL';
        } else if (render) {
          render.rasterErr = 'RASTER_NO_CAPTURE';
        }
      } catch (rErr) {
        if (render) render.rasterErr = (rErr && rErr.message) || 'RASTER_EXC';
      }
      // raster failed to send → fall through to GDI silent print as a last resort.
    }

    // ── Fallback: Electron GDI silent print (0.1.8 behaviour) ───────────────
    // Reset any zoom the raster attempt applied so GDI print uses the normal layout.
    try { wc.setZoomFactor(1); } catch (_) { /* non-fatal */ }
    const printResult = await new Promise((resolve) => {
      wc.print(
        {
          silent: true,
          printBackground: true,
          deviceName,
          margins: { marginType: 'none' },
          // NO custom pageSize. 2026-07-09 (Fable diag): a custom micron paper form (derived
          // from a measured content height) is exactly what cheap POS-80 thermal drivers reject
          // with BLANK paper — the very reason with MIN's app printed blank while the Chrome
          // print dialog (same Chromium raster + same driver) rendered the full design fine.
          // Using the driver's DEFAULT paper form = identical to that proven browser path.
          // Ticket width is handled by the HTML itself (@page { size: 80mm auto; margin: 0 }).
          copies: Math.max(1, copies || 1)
        },
        (success, failureReason) => resolve({ success, failureReason })
      );
    });

    if (!printResult.success) {
      return { ok: false, error: printResult.failureReason || 'PRINT_FAILED', render: Object.assign({ via: 'gdi' }, render || {}) };
    }
    return { ok: true, render: Object.assign({ via: 'gdi' }, render || {}) };
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

// 0.1.7 diagnostics: render the SAME pipeline a real bill uses, but capture the painted
// page as a PDF on disk instead of spooling it. Purpose (with MIN blank-bill saga):
// discriminate ON SCREEN, with zero paper, between
//   • "hidden window rendered blank"  → PDF is empty  → render fix insufficient
//   • "render fine, driver blanks it" → PDF shows the ticket → blame the spool/driver leg
async function doRenderCheck({ html }) {
  const win = getWindow();
  const tmpFile = path.join(
    app.getPath('temp'),
    `pp-rendercheck-${process.pid}-${Date.now()}.html`
  );
  try {
    await loadAndPaint(win, tmpFile, html);
    const data = await win.webContents.printToPDF({ printBackground: true });
    const outPath = path.join(app.getPath('userData'), 'render-check.pdf');
    fs.writeFileSync(outPath, data);
    return { ok: true, bytes: data.length, path: outPath };
  } catch (err) {
    return { ok: false, error: (err && err.message) || 'RENDER_CHECK_ERROR' };
  } finally {
    try { fs.unlinkSync(tmpFile); } catch (_) { /* best effort */ }
  }
}

function renderCheck(job) {
  return enqueue('html', () =>
    withTimeout(doRenderCheck(job), RENDER_TIMEOUT_MS, { ok: false, error: 'TIMEOUT' })
  );
}

// Tear down the cached hidden print window so it can't keep the process alive after
// the main window closes (single-instance-lock zombie → "app won't reopen"). Called on
// app 'will-quit'. app.quit() also closes it, but this is an explicit backstop.
function destroy() {
  try { if (_win && !_win.isDestroyed()) _win.destroy(); } catch (_) { /* best effort */ }
  _win = null;
}

module.exports = { printHtml, renderCheck, destroy };

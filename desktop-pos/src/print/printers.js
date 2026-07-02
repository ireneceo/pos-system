'use strict';

// OS printer enumeration. Uses a webContents (the hidden HTML print window's)
// to call Electron's getPrintersAsync — the same list QZ's qz.printers.find()
// returned, so existing printer_settings.address (OS names) resolve identically.

let _getWC = null; // () => webContents  (injected by print/index.js)

function setWebContentsProvider(fn) {
  _getWC = fn;
}

async function listPrinters() {
  try {
    const wc = _getWC && _getWC();
    if (!wc) return [];
    const printers = await wc.getPrintersAsync();
    return printers.map((p) => p.name);
  } catch (err) {
    console.error('[printers] listPrinters failed:', err && err.message);
    return [];
  }
}

async function getDefaultPrinter() {
  try {
    const wc = _getWC && _getWC();
    if (!wc) return null;
    const printers = await wc.getPrintersAsync();
    const def = printers.find((p) => p.isDefault);
    return def ? def.name : null;
  } catch (err) {
    console.error('[printers] getDefaultPrinter failed:', err && err.message);
    return null;
  }
}

// Resolve a requested printer name against the live OS list.
// Contract (design §4): '' means "explicit OS default". A non-empty name that
// is NOT in the list is a hard failure (PRINTER_NOT_FOUND) — we NEVER silently
// fall back to the default (thefire BAR "success-looking non-print" lesson).
// Returns { ok:true, deviceName } or { ok:false, error }.
async function resolveDeviceName(printerName) {
  if (!printerName) {
    // Empty -> let the OS use its default. deviceName '' = default in print().
    return { ok: true, deviceName: '' };
  }
  const names = await listPrinters();
  if (names.includes(printerName)) {
    return { ok: true, deviceName: printerName };
  }
  return { ok: false, error: 'PRINTER_NOT_FOUND' };
}

module.exports = {
  setWebContentsProvider,
  listPrinters,
  getDefaultPrinter,
  resolveDeviceName
};

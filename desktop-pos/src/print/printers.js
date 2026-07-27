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

// Match a requested printer name against the live OS list — SINGLE SOURCE for
// every transport (htmlPrinter/raster via resolveDeviceName, rawWindows winspool).
// Pure function (no Electron) so it is unit-tested by test/print-units.js.
//
// 2026-07-27 (with MIN forensics): the old check was `names.includes(name)` —
// exact, case-sensitive, whitespace-sensitive. A driver reinstall that renames
// "POS-80C" to "POS-80C " (trailing space) or changes its case stops EVERY print
// silently, and the operator sees no reason why. So we allow two tolerant steps.
//
// ⛔ What we deliberately do NOT do: prefix / "starts-with" / fuzzy matching.
// This project really has printers named `KITCHEN` and `KITCHEN 2` (CLAUDE.md) —
// a prefix match would route the kitchen ticket to the WRONG station and nobody
// would notice. Printing to the wrong printer is worse than not printing, so the
// ladder stops at case/whitespace-insensitive equality and then fails loudly.
//
// Returns { ok:true, name, matchedBy:'exact'|'normalized' }
//      or { ok:false, error:'PRINTER_NOT_FOUND', requested, available }.
function normalizeName(s) {
  return String(s == null ? '' : s).trim().replace(/\s+/g, ' ').toLowerCase();
}

function matchPrinterName(names, requested) {
  const list = Array.isArray(names) ? names : [];
  const want = String(requested == null ? '' : requested);

  // 1) byte-exact — the overwhelmingly normal case, never changes behaviour.
  if (list.includes(want)) return { ok: true, name: want, matchedBy: 'exact' };

  // 2) case / whitespace insensitive equality. Still an EQUALITY test, so
  //    "KITCHEN" can never resolve to "KITCHEN 2".
  const wantN = normalizeName(want);
  if (wantN) {
    const hits = list.filter((n) => normalizeName(n) === wantN);
    // Exactly one candidate only. Two printers that normalize the same is an
    // ambiguous setup — refuse rather than guess which one the kitchen wants.
    if (hits.length === 1) return { ok: true, name: hits[0], matchedBy: 'normalized' };
  }

  return { ok: false, error: 'PRINTER_NOT_FOUND', requested: want, available: list.slice(0, 20) };
}

// Resolve a requested printer name against the live OS list.
// Contract (design §4): '' means "explicit OS default". A non-empty name that
// is NOT in the list is a hard failure (PRINTER_NOT_FOUND) — we NEVER silently
// fall back to the default (thefire BAR "success-looking non-print" lesson).
// Returns { ok:true, deviceName } or { ok:false, error, requested, available }.
async function resolveDeviceName(printerName) {
  if (!printerName) {
    // Empty -> let the OS use its default. deviceName '' = default in print().
    return { ok: true, deviceName: '' };
  }
  const names = await listPrinters();
  const m = matchPrinterName(names, printerName);
  if (m.ok) return { ok: true, deviceName: m.name, matchedBy: m.matchedBy };
  return { ok: false, error: m.error, requested: m.requested, available: m.available };
}

module.exports = {
  setWebContentsProvider,
  listPrinters,
  getDefaultPrinter,
  resolveDeviceName,
  matchPrinterName,
  normalizeName
};

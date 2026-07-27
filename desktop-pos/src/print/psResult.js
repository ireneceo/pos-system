'use strict';

// Pure parser for the winspool PowerShell helper's stdout (see rawWindows.js).
// Kept Electron-free so test/print-units.js can lock the contract.
//
//   "OK"                  → the spooler accepted the bytes
//   "OK\nWARN:NO_PAPER"   → accepted, and the device reports a physical condition
//
// A warning is NEVER a failure. Once bytes are spooled the job really does print
// when paper is refilled, so failing here would make the poller re-arm and produce
// a DUPLICATE — and CLAUDE.md forbids reintroducing a printer-availability gate
// (the qzHasPrinter incident blocked even manual printing).
function parsePsOutput(stdout) {
  const text = String(stdout == null ? '' : stdout);
  // A whole line must be exactly OK — "NOT OKAY" must not read as success.
  if (!/(^|\r|\n)[ \t]*OK[ \t]*(\r|\n|$)/.test(text)) return { ok: false, error: 'WINSPOOL_NO_OK' };
  const w = text.match(/WARN:([A-Z_]+)/);
  return w ? { ok: true, warn: w[1] } : { ok: true };
}

// Turn one execFile() callback into a print result.
//
// 2026-07-27 (Fable C1): the post-send condition probe runs inside the SAME
// execFile timeout as the write. On a slow POS box (cold Add-Type + a sluggish
// WMI service) the probe can push the process past the deadline and get it
// killed — even though "OK" was already on stdout and the ticket was already
// spooled. The old error branch ignored stdout entirely and returned TIMEOUT,
// the web layer read that as a failure, and the poller REPRINTED a ticket that
// had already come out. The probe must never be able to invent a duplicate.
//
// Rule: stdout wins. If the helper said OK, the bytes reached the spooler —
// whatever happened afterwards is at most a warning.
function interpretExec(err, stdout, stderr) {
  const detailLine = String(stderr == null ? '' : stderr)
    .split(/\r?\n/).map((s) => s.trim()).filter(Boolean)[0];
  const detail = detailLine ? detailLine.slice(0, 200) : undefined;

  const parsed = parsePsOutput(stdout);
  if (parsed.ok) {
    // Killed after a successful write = the probe (or teardown) ran long.
    if (err) return { ok: true, warn: parsed.warn || 'PROBE_TIMEOUT' };
    return parsed;
  }
  if (err) {
    return { ok: false, error: err.killed ? 'TIMEOUT' : 'WINSPOOL_ERROR', detail };
  }
  return detail ? Object.assign({}, parsed, { detail }) : parsed;
}

module.exports = { parsePsOutput, interpretExec };

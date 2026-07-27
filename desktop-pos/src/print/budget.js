'use strict';

// Pure print-job policy: time budgets and capture slicing.
//
// Deliberately free of Electron so test/print-units.js can prove the rules on any
// machine — htmlPrinter itself needs a GUI and therefore can never be unit-tested.
// Both defects these constants fix were invisible to every existing gate because
// the logic lived inside that untestable file (2026-07-27 with MIN forensics).

// One winspool send. PowerShell's first `Add-Type` cold-compiles a C# assembly,
// which on a slow POS box is genuinely several seconds.
const EXEC_TIMEOUT_MS = 15000;

// Render + capture allowance for one ticket.
const RENDER_BUDGET_MS = 30000;

// Allowance for EACH copy that has to be spooled.
const SEND_BUDGET_PER_COPY_MS = EXEC_TIMEOUT_MS + 5000;

// After the budget expires the shared hidden window is torn down; this is how
// long we then wait for the in-flight render to unwind before releasing the lane.
const ABORT_GRACE_MS = 4000;

// Chromium refuses very tall captures and printer line buffers are finite, so one
// capture is capped and taller documents are captured in slices.
//
// 8000 is deliberate (Fable C2): it is exactly where 0.1.9 clamped, so every
// ticket that used to print correctly still takes the SAME single-capture path —
// byte-identical behaviour, no scrolling, no seams. Slicing only engages beyond
// 8000 DIP (≈1 m of paper), which the old code could not print at all — it just
// cut the ticket off silently. New capability, zero regression surface.
const MAX_SLICE_DIP = 8000;
const MAX_TOTAL_DIP = 60000;

// Total time a print job may take before it is cancelled.
//
// The value this replaces was a flat 20 000 ms — SMALLER than the work it timed:
// a single copy is already allowed 15 000 ms in winspool alone, and that cost is
// per copy. A healthy 2-copy kitchen ticket could therefore blow the deadline,
// report TIMEOUT, and be reprinted — phantom failure, duplicated paper.
function jobBudgetMs(job) {
  const copies = Math.max(1, (job && job.copies) || 1);
  return RENDER_BUDGET_MS + copies * SEND_BUDGET_PER_COPY_MS;
}

// Plan how a document `totalDip` device px tall is captured.
// Returns [{ y, h }, …] covering EXACTLY [0, totalDip) with every slice <= maxSlice.
//
// Replaces a hard `Math.min(height, 8000)` clamp that silently CUT OFF anything
// taller: the paper looked fine, the order just stopped mid-list.
function planCaptureSlices(totalDip, maxSlice) {
  const total = Math.max(0, Math.ceil(Number(totalDip) || 0));
  const cap = Math.max(1, Math.floor(Number(maxSlice) || MAX_SLICE_DIP));
  const out = [];
  for (let y = 0; y < total; y += cap) {
    out.push({ y, h: Math.min(cap, total - y) });
  }
  return out;
}

// Whether a GDI reprint is allowed after the raster leg stopped early.
// Paper already produced cannot be taken back, so the fallback is only safe when
// NOTHING was printed. (Old behaviour reprinted the full count regardless, turning
// a 2-copy ticket that failed on copy 2 into three pieces of paper.)
function fallbackDecision(sentCopies, requestedCopies) {
  const sent = Math.max(0, Number(sentCopies) || 0);
  const want = Math.max(1, Number(requestedCopies) || 1);
  if (sent >= want) return 'done';
  if (sent > 0) return 'partial';   // report honestly, never reprint
  return 'fallback';                // nothing on paper → GDI is safe
}

module.exports = {
  EXEC_TIMEOUT_MS,
  RENDER_BUDGET_MS,
  SEND_BUDGET_PER_COPY_MS,
  ABORT_GRACE_MS,
  MAX_SLICE_DIP,
  MAX_TOTAL_DIP,
  jobBudgetMs,
  planCaptureSlices,
  fallbackDecision
};

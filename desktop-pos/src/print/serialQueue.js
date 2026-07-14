'use strict';

// Per-lane serial job queue.
//
// The QZ single-line-queue lesson (SW 4.34, design §4): dispatch order MUST
// preserve call order — station tickets go out before the consolidated ticket,
// and a slow consolidated print must not jump ahead of a station print.
//
// We keep one serial queue per "lane" so:
//   - all HTML jobs share lane 'html' -> strict call order (station -> consolidated)
//   - LAN jobs are keyed per host (lane 'lan:<host>')
//   - OS-raw jobs are keyed per printer (lane 'os:<name>')
// Different physical printers run concurrently; within a printer, order holds.

const _tails = new Map();

// Jobs queued or running across ALL lanes. The updater reads this: an update must never
// install while a ticket is mid-flight (0.1.8 — silent night install). Nothing else uses it.
let _inFlight = 0;

// Enqueue `fn` (a thunk returning a Promise) onto `lane`. Resolves with fn's
// result. A rejection in one job does not break the chain for the next job.
function enqueue(lane, fn) {
  const prev = _tails.get(lane) || Promise.resolve();

  _inFlight++;
  const run = prev.then(fn, fn); // run regardless of previous job's outcome
  const done = run.then(() => { _inFlight--; }, () => { _inFlight--; });

  // The tail must never reject (would poison the lane), so swallow here.
  _tails.set(lane, done);

  return run;
}

// True when no print job is queued or running.
function isIdle() {
  return _inFlight === 0;
}

module.exports = { enqueue, isIdle };

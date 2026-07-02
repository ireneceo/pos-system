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

// Enqueue `fn` (a thunk returning a Promise) onto `lane`. Resolves with fn's
// result. A rejection in one job does not break the chain for the next job.
function enqueue(lane, fn) {
  const prev = _tails.get(lane) || Promise.resolve();

  const run = prev.then(fn, fn); // run regardless of previous job's outcome

  // The tail must never reject (would poison the lane), so swallow here.
  _tails.set(lane, run.then(() => {}, () => {}));

  return run;
}

module.exports = { enqueue };

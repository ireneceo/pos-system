'use strict';
// Node-testable P1 units (no Electron needed): serialQueue ordering/isolation
// and rawLan real-socket send. Run: `npm test` (from desktop-pos/).
// The Electron-glue parts (htmlPrinter, printers, IPC, preload, winspool) require
// a GUI/Windows machine and are covered by the manual smoke checklist instead.
const net = require('net');
const path = require('path');
const DP = path.join(__dirname, '..', 'src', 'print');
const { enqueue } = require(path.join(DP, 'serialQueue'));
const { printRawLan } = require(path.join(DP, 'rawLan'));
const rasterMod = require(path.join(DP, 'raster'));

let pass = 0, fail = 0;
function ok(c, m) { if (c) { pass++; console.log('  OK  ' + m); } else { fail++; console.log(' FAIL ' + m); } }

// Build a BGRA bitmap buffer (Electron NativeImage.getBitmap() layout) from a
// row-major array of 0/1 (1 = black pixel).
function bgra(bits, w, h) {
  const buf = Buffer.alloc(w * h * 4);
  for (let i = 0; i < w * h; i++) {
    const black = bits[i] ? 0 : 255;             // black => RGB 0, white => 255
    buf[i * 4] = black;                          // B
    buf[i * 4 + 1] = black;                      // G
    buf[i * 4 + 2] = black;                      // R
    buf[i * 4 + 3] = 255;                        // A (opaque)
  }
  return buf;
}

function testRasterEncoder() {
  console.log('\n[raster] encodeRaster produces correct GS v 0 bytes');
  const { encodeRaster } = rasterMod;

  // 8x1 all black → 1 byte/row, 1 row, data 0xFF.
  const black = encodeRaster(bgra([1,1,1,1,1,1,1,1], 8, 1), 8, 1, {});
  ok(black.equals(Buffer.from([0x1d,0x76,0x30,0x00, 0x01,0x00, 0x01,0x00, 0xFF])),
     '8x1 all-black = GS v 0 header + 0xFF (' + black.toString('hex') + ')');

  // 8x1 all white → data 0x00.
  const white = encodeRaster(bgra([0,0,0,0,0,0,0,0], 8, 1), 8, 1, {});
  ok(white[white.length - 1] === 0x00, '8x1 all-white last byte = 0x00');

  // MSB-first bit packing: only leftmost pixel black → 0x80.
  const left = encodeRaster(bgra([1,0,0,0,0,0,0,0], 8, 1), 8, 1, {});
  ok(left[left.length - 1] === 0x80, 'leftmost-only pixel packs to 0x80 (MSB first)');

  // Width not a multiple of 8 → ceil to whole bytes; 10px → 2 bytes/row.
  const wide = encodeRaster(bgra(new Array(10).fill(1), 10, 1), 10, 1, {});
  ok(wide[4] === 0x02 && wide[5] === 0x00, '10px width → 2 bytes/row (xL=2)');
  ok(wide.length === 8 + 2, '10x1 total = 8 header + 2 data bytes');

  // Multi-row height field + data length.
  const two = encodeRaster(bgra(new Array(32).fill(0), 16, 2), 16, 2, {});
  ok(two[6] === 0x02 && two[7] === 0x00, '16x2 height field yL=2');
  ok(two.length === 8 + (2 * 2), '16x2 total = 8 header + 4 data bytes');

  // Banding: >BAND_ROWS rows split into multiple GS v 0 commands.
  const tall = encodeRaster(bgra(new Array(8 * (rasterMod.BAND_ROWS + 10)).fill(0), 8, rasterMod.BAND_ROWS + 10), 8, rasterMod.BAND_ROWS + 10, {});
  let cmds = 0;
  for (let i = 0; i + 2 < tall.length; i++) if (tall[i] === 0x1d && tall[i+1] === 0x76 && tall[i+2] === 0x30) cmds++;
  ok(cmds === 2, 'height ' + (rasterMod.BAND_ROWS + 10) + ' → 2 banded commands');
}

function testRasterDocument() {
  console.log('\n[raster] buildRasterDocument wraps init + raster + cut');
  const doc = rasterMod.buildRasterDocument(bgra([1,1,1,1,1,1,1,1], 8, 1), 8, 1, {});
  ok(doc[0] === 0x1b && doc[1] === 0x40, 'starts with ESC @ (init)');
  ok(doc[doc.length - 3] === 0x1d && doc[doc.length - 2] === 0x56 && doc[doc.length - 1] === 0x01, 'ends with GS V 1 (partial cut)');
  ok(rasterMod.dotsForWidthMm(80) === 576 && rasterMod.dotsForWidthMm(58) === 384, 'dotsForWidthMm: 80→576, 58→384');
}

async function testQueueOrder() {
  console.log('\n[serialQueue] preserves call order within a lane');
  const order = [];
  const mk = (id, delay) => () => new Promise((r) => setTimeout(() => { order.push(id); r(id); }, delay));
  const pA = enqueue('L', mk('A', 40));
  const pB = enqueue('L', mk('B', 5));
  const pC = enqueue('L', mk('C', 5));
  await Promise.all([pA, pB, pC]);
  ok(order.join(',') === 'A,B,C', 'order = ' + order.join(','));
}

async function testQueueIsolation() {
  console.log('\n[serialQueue] a rejecting job does not poison the lane');
  const seen = [];
  const good = () => Promise.resolve('ok');
  const bad = () => Promise.reject(new Error('boom'));
  const p1 = enqueue('M', good).then((v) => seen.push('g1:' + v));
  const p2 = enqueue('M', bad).catch((e) => seen.push('bad:' + e.message));
  const p3 = enqueue('M', good).then((v) => seen.push('g2:' + v));
  await Promise.all([p1, p2, p3]);
  ok(seen.includes('g1:ok') && seen.includes('bad:boom') && seen.includes('g2:ok'),
     'seen = ' + seen.join(' | '));
}

function startEcho() {
  return new Promise((resolve) => {
    const chunks = [];
    const server = net.createServer((sock) => { sock.on('data', (d) => chunks.push(d)); });
    server.listen(0, '127.0.0.1', () => resolve({ server, port: server.address().port, chunks }));
  });
}

async function testLanSend() {
  console.log('\n[rawLan] sends exact bytes to a TCP listener, returns {ok:true}');
  const { server, port, chunks } = await startEcho();
  const payload = Buffer.from('\x1B\x40Purple\nRAW-TEST\n', 'binary');
  const res = await printRawLan(payload, '127.0.0.1', port);
  await new Promise((r) => setTimeout(r, 50));
  const received = Buffer.concat(chunks);
  ok(res.ok === true, 'result ok=' + JSON.stringify(res));
  ok(received.equals(payload), 'bytes match (' + received.length + ' bytes)');
  server.close();
}

async function testLanOrder() {
  console.log('\n[rawLan] two sends to same host arrive in call order');
  const { server, port, chunks } = await startEcho();
  const p1 = printRawLan(Buffer.from('FIRST;'), '127.0.0.1', port);
  const p2 = printRawLan(Buffer.from('SECOND;'), '127.0.0.1', port);
  await Promise.all([p1, p2]);
  await new Promise((r) => setTimeout(r, 60));
  const s = Buffer.concat(chunks).toString();
  ok(s === 'FIRST;SECOND;', 'received = "' + s + '"');
  server.close();
}

async function testLanFail() {
  console.log('\n[rawLan] connect to a dead port fails gracefully (no throw)');
  const res = await printRawLan(Buffer.from('x'), '127.0.0.1', 1);
  ok(res.ok === false && typeof res.error === 'string', 'result = ' + JSON.stringify(res));
}

// ── 2026-07-27 regression lock: the six defects the with MIN forensics found ──
// Every one of them lived in code no gate could reach, so the pure policy was
// extracted into print/budget.js and print/printers.js precisely to be provable here.

const budget = require(path.join(DP, 'budget'));
const printersMod = require(path.join(DP, 'printers'));
const { parsePsOutput } = require(path.join(DP, 'psResult'));

function testDuplicateGuard() {
  console.log('\n[D1] partial raster send must NEVER fall back to GDI (duplicate paper)');
  const { fallbackDecision } = budget;
  ok(fallbackDecision(0, 1) === 'fallback', 'nothing printed → GDI fallback allowed');
  ok(fallbackDecision(0, 3) === 'fallback', 'nothing printed (3 copies) → fallback allowed');
  ok(fallbackDecision(1, 2) === 'partial', '1 of 2 already on paper → partial, no reprint');
  ok(fallbackDecision(2, 3) === 'partial', '2 of 3 already on paper → partial, no reprint');
  ok(fallbackDecision(1, 1) === 'done', 'all copies sent → done');
  ok(fallbackDecision(3, 3) === 'done', 'all 3 copies sent → done');
}

function testJobBudget() {
  console.log('\n[D2] job budget must exceed the work it times (phantom TIMEOUT → reprint)');
  const { jobBudgetMs, EXEC_TIMEOUT_MS } = budget;
  ok(jobBudgetMs({ copies: 1 }) > EXEC_TIMEOUT_MS,
     '1 copy budget (' + jobBudgetMs({ copies: 1 }) + 'ms) > one winspool send (' + EXEC_TIMEOUT_MS + 'ms)');
  ok(jobBudgetMs({ copies: 2 }) > 2 * EXEC_TIMEOUT_MS, '2 copies budget > 2 sends');
  ok(jobBudgetMs({ copies: 3 }) > jobBudgetMs({ copies: 2 }), 'budget grows with copies');
  ok(jobBudgetMs({}) === jobBudgetMs({ copies: 1 }), 'missing copies == 1 copy');
  ok(jobBudgetMs(null) === jobBudgetMs({ copies: 1 }), 'null job == 1 copy');
  ok(jobBudgetMs({ copies: 1 }) > 20000, 'budget is larger than the old flat 20s');
}

function testCaptureSlices() {
  console.log('\n[D6] tall tickets are sliced, never truncated');
  const { planCaptureSlices } = budget;
  const cover = (total, cap) => {
    const s = planCaptureSlices(total, cap);
    if (!s.length) return total === 0;
    if (s[0].y !== 0) return false;
    for (let i = 1; i < s.length; i++) if (s[i].y !== s[i - 1].y + s[i - 1].h) return false;
    const last = s[s.length - 1];
    return last.y + last.h === Math.ceil(total) && s.every((x) => x.h <= cap && x.h > 0);
  };
  ok(planCaptureSlices(1000, 4000).length === 1, 'short ticket = 1 slice');
  ok(cover(1000, 4000), '1000px covered exactly');
  ok(cover(4000, 4000), 'exact multiple covered exactly (no empty tail slice)');
  ok(cover(9000, 4000), '9000px covered exactly (old code truncated past 8000)');
  ok(planCaptureSlices(9000, 4000).length === 3, '9000px = 3 slices');
  ok(cover(20000, 4000), 'very long bill covered exactly');
  ok(planCaptureSlices(0, 4000).length === 0, 'empty document = no slices');
}

function testPrinterMatching() {
  console.log('\n[D4] printer name matching: tolerant of case/space, NEVER of prefix');
  const { matchPrinterName } = printersMod;
  const names = ['POS-80C', 'KITCHEN', 'KITCHEN 2', 'BAR'];
  ok(matchPrinterName(names, 'POS-80C').ok === true, 'exact name matches');
  ok(matchPrinterName(names, 'pos-80c').matchedBy === 'normalized', 'case-insensitive matches');
  ok(matchPrinterName(names, ' POS-80C ').matchedBy === 'normalized', 'trims whitespace');
  ok(matchPrinterName(names, 'KITCHEN').name === 'KITCHEN', 'KITCHEN resolves to KITCHEN');
  // The whole point: a prefix/fuzzy matcher would route KITCHEN → KITCHEN 2.
  ok(matchPrinterName(names, 'KITCHEN').name !== 'KITCHEN 2', 'KITCHEN never resolves to KITCHEN 2');
  ok(matchPrinterName(names, 'KITCH').ok === false, 'prefix does NOT match (would print to wrong station)');
  ok(matchPrinterName(names, 'POS').ok === false, 'partial name does NOT match');
  ok(matchPrinterName(names, 'GHOST').error === 'PRINTER_NOT_FOUND', 'unknown name = explicit failure');
  ok(Array.isArray(matchPrinterName(names, 'GHOST').available), 'failure reports available names (diagnosable)');
  // Ambiguity must refuse rather than guess.
  ok(matchPrinterName(['Pos-80', 'POS-80'], 'pos-80').ok === false, 'ambiguous normalized match refuses');
}

function testPsOutput() {
  console.log('\n[D3/D5] winspool result parsing: warn without failing, keep the reason');
  ok(parsePsOutput('OK\n').ok === true, 'OK = success');
  ok(parsePsOutput('OK\nWARN:NO_PAPER\n').ok === true, 'paper-out still reports success (job is spooled)');
  ok(parsePsOutput('OK\nWARN:NO_PAPER\n').warn === 'NO_PAPER', 'paper-out surfaces as a warning');
  ok(parsePsOutput('OK\r\nWARN:DOOR_OPEN\r\n').warn === 'DOOR_OPEN', 'CRLF output parsed');
  ok(parsePsOutput('').ok === false, 'empty output = failure');
  ok(parsePsOutput('something went wrong').ok === false, 'no OK line = failure');
  ok(parsePsOutput('NOT OKAY').ok === false, 'substring "OK" alone is not success');
}

// ── Fable gate follow-up (2026-07-27): the two defects the FIX itself introduced.
function testProbeCannotInventDuplicate() {
  console.log('\n[C1] a killed probe must NOT turn an already-spooled ticket into a failure');
  const { interpretExec } = require(path.join(DP, 'psResult'));
  const killed = { killed: true, message: 'timeout' };

  // The write succeeded ("OK" is on stdout) and the process was killed afterwards
  // while probing printer condition. Reporting failure here makes the poller
  // reprint a ticket that is already on paper.
  const r = interpretExec(killed, 'OK\n', '');
  ok(r.ok === true, 'killed AFTER "OK" = success, not TIMEOUT');
  ok(r.warn === 'PROBE_TIMEOUT', 'surfaces why: ' + JSON.stringify(r));

  const rw = interpretExec(killed, 'OK\nWARN:NO_PAPER\n', '');
  ok(rw.ok === true && rw.warn === 'NO_PAPER', 'real warning outranks PROBE_TIMEOUT');

  // Killed with no OK = the write never completed → genuine failure.
  const t = interpretExec(killed, '', '');
  ok(t.ok === false && t.error === 'TIMEOUT', 'killed BEFORE "OK" = real TIMEOUT');

  const e = interpretExec({ killed: false, message: 'x' }, '', 'OpenPrinter failed\nmore');
  ok(e.ok === false && e.error === 'WINSPOOL_ERROR', 'non-timeout error = WINSPOOL_ERROR');
  ok(e.detail === 'OpenPrinter failed', 'stderr reason preserved: ' + e.detail);

  ok(interpretExec(null, 'OK\n', '').ok === true, 'clean success unchanged');
}

function testSingleCapturePreserved() {
  console.log('\n[C2] tickets that printed fine before must still take the single-capture path');
  const { planCaptureSlices, MAX_SLICE_DIP } = budget;
  ok(MAX_SLICE_DIP === 8000, 'slice cap = 8000 = exactly where 0.1.9 clamped');
  // Everything 0.1.9 could print (<=8000) stays one capture: no scrolling, no seam.
  ok(planCaptureSlices(8000, MAX_SLICE_DIP).length === 1, '8000px = single capture (no seams)');
  ok(planCaptureSlices(4001, MAX_SLICE_DIP).length === 1, '4001px = single capture');
  // Beyond it, slicing engages — that range used to be silently truncated.
  ok(planCaptureSlices(8001, MAX_SLICE_DIP).length === 2, '8001px = 2 slices (was truncated)');
  // Seams must tile exactly: no gap (missing line) and no overlap (duplicated line).
  const s = planCaptureSlices(20000, MAX_SLICE_DIP);
  let tiled = s[0].y === 0;
  for (let i = 1; i < s.length; i++) if (s[i].y !== s[i - 1].y + s[i - 1].h) tiled = false;
  ok(tiled, 'slices tile exactly — no duplicated and no missing rows at the seams');
  ok(s[s.length - 1].y + s[s.length - 1].h === 20000, 'last slice ends exactly at the content end');
}

(async () => {
  await testQueueOrder();
  await testQueueIsolation();
  await testLanSend();
  await testLanOrder();
  await testLanFail();
  testRasterEncoder();
  testRasterDocument();
  testDuplicateGuard();
  testJobBudget();
  testCaptureSlices();
  testPrinterMatching();
  testPsOutput();
  testProbeCannotInventDuplicate();
  testSingleCapturePreserved();
  console.log(`\n==== ${pass} passed, ${fail} failed ====`);
  process.exit(fail ? 1 : 0);
})();

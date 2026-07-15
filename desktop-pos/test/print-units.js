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

(async () => {
  await testQueueOrder();
  await testQueueIsolation();
  await testLanSend();
  await testLanOrder();
  await testLanFail();
  testRasterEncoder();
  testRasterDocument();
  console.log(`\n==== ${pass} passed, ${fail} failed ====`);
  process.exit(fail ? 1 : 0);
})();

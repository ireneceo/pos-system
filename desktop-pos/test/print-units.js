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

let pass = 0, fail = 0;
function ok(c, m) { if (c) { pass++; console.log('  OK  ' + m); } else { fail++; console.log(' FAIL ' + m); } }

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
  console.log(`\n==== ${pass} passed, ${fail} failed ====`);
  process.exit(fail ? 1 : 0);
})();

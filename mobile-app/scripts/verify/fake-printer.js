'use strict';
// V3 fake ESC/POS printer (design §7-6). A bare TCP server that captures every
// byte the app sends and appends a hex record per connection — so we can assert
// the arriving bytes are byte-identical to what billPrint's QZ path would emit,
// WITHOUT any real hardware. The emulator reaches the dev host at 10.0.2.2.
//
//   node fake-printer.js [port] [outFile]
//     port    default 9100
//     outFile default /tmp/fake-printer-capture.jsonl
//
// Each captured job is written as one JSON line: { ts, bytes, hex, len }.
const net = require('net');

const PORT = parseInt(process.argv[2] || '9100', 10);
const OUT = process.argv[3] || '/tmp/fake-printer-capture.jsonl';
const fs = require('fs');

// Truncate on start so each run is clean.
fs.writeFileSync(OUT, '');

const server = net.createServer((sock) => {
  const chunks = [];
  sock.on('data', (d) => chunks.push(d));
  sock.on('close', () => {
    const buf = Buffer.concat(chunks);
    if (buf.length === 0) return;
    const rec = {
      ts: Date.now(),
      len: buf.length,
      hex: buf.toString('hex'),
      // first/last 16 bytes for quick eyeballing
      head: buf.subarray(0, 16).toString('hex'),
      tail: buf.subarray(Math.max(0, buf.length - 8)).toString('hex'),
    };
    fs.appendFileSync(OUT, JSON.stringify(rec) + '\n');
    console.log(`[fake-printer] job #${countLines(OUT)}  ${buf.length} bytes  head=${rec.head}`);
  });
  sock.on('error', () => {});
});

function countLines(f) {
  try { return fs.readFileSync(f, 'utf8').split('\n').filter(Boolean).length; } catch { return 0; }
}

server.listen(PORT, '0.0.0.0', () => {
  console.log(`[fake-printer] listening on 0.0.0.0:${PORT} -> ${OUT}`);
});

'use strict';
// Minimal Chrome DevTools Protocol client (no npm deps) to drive the live
// WebView in the emulator — V4 (design §7-6): prove window.__NATIVE_PRINT is
// injected on the real dev.purplehere.com/pos page and invoke the §4 contract,
// so bytes land at the fake printer with ZERO web-app changes.
//
//   node cdp-eval.js <devtoolsHttpPort> <exprFile>
//     exprFile = JSON array of { label, expression } evaluated in order,
//     each as an awaited promise, returnByValue. Prints a JSON result array.
const http = require('http');
const net = require('net');
const crypto = require('crypto');

const PORT = parseInt(process.argv[2] || '9222', 10);
const EXPR_FILE = process.argv[3];

function httpJson(path) {
  return new Promise((resolve, reject) => {
    http.get({ host: '127.0.0.1', port: PORT, path }, (res) => {
      let d = ''; res.on('data', (c) => (d += c));
      res.on('end', () => { try { resolve(JSON.parse(d)); } catch (e) { reject(e); } });
    }).on('error', reject);
  });
}

// --- tiny RFC6455 client over the already-open devtools ws URL --------------
function wsConnect(wsUrl) {
  return new Promise((resolve, reject) => {
    const u = new URL(wsUrl);
    const key = crypto.randomBytes(16).toString('base64');
    const sock = net.connect(parseInt(u.port, 10), u.hostname, () => {
      sock.write(
        `GET ${u.pathname}${u.search} HTTP/1.1\r\n` +
        `Host: ${u.host}\r\n` +
        `Upgrade: websocket\r\nConnection: Upgrade\r\n` +
        `Sec-WebSocket-Key: ${key}\r\nSec-WebSocket-Version: 13\r\n\r\n`
      );
    });
    let buf = Buffer.alloc(0);
    let handshaken = false;
    const listeners = [];
    sock.on('data', (chunk) => {
      buf = Buffer.concat([buf, chunk]);
      if (!handshaken) {
        const idx = buf.indexOf('\r\n\r\n');
        if (idx === -1) return;
        handshaken = true;
        buf = buf.subarray(idx + 4);
        resolve({ send, onMessage: (cb) => listeners.push(cb), close: () => sock.end() });
      }
      // parse frames (server->client, unmasked)
      while (buf.length >= 2) {
        const len0 = buf[1] & 0x7f;
        let off = 2, len = len0;
        if (len0 === 126) { if (buf.length < 4) break; len = buf.readUInt16BE(2); off = 4; }
        else if (len0 === 127) { if (buf.length < 10) break; len = Number(buf.readBigUInt64BE(2)); off = 10; }
        if (buf.length < off + len) break;
        const payload = buf.subarray(off, off + len).toString('utf8');
        buf = buf.subarray(off + len);
        listeners.forEach((cb) => cb(payload));
      }
    });
    sock.on('error', reject);

    function send(str) {
      const data = Buffer.from(str, 'utf8');
      const mask = crypto.randomBytes(4);
      const len = data.length;
      let header;
      if (len < 126) header = Buffer.from([0x81, 0x80 | len]);
      else if (len < 65536) { header = Buffer.alloc(4); header[0] = 0x81; header[1] = 0x80 | 126; header.writeUInt16BE(len, 2); }
      else { header = Buffer.alloc(10); header[0] = 0x81; header[1] = 0x80 | 127; header.writeBigUInt64BE(BigInt(len), 2); }
      const masked = Buffer.alloc(len);
      for (let i = 0; i < len; i++) masked[i] = data[i] ^ mask[i & 3];
      sock.write(Buffer.concat([header, mask, masked]));
    }
  });
}

async function main() {
  const exprs = JSON.parse(require('fs').readFileSync(EXPR_FILE, 'utf8'));
  const targets = await httpJson('/json');
  const page = targets.find((t) => t.type === 'page' && /purplehere\.com|\/pos/.test(t.url || '')) || targets.find((t) => t.type === 'page');
  if (!page) throw new Error('no page target found: ' + JSON.stringify(targets.map((t) => t.url)));
  const ws = await wsConnect(page.webSocketDebuggerUrl);

  let id = 0;
  const pending = new Map();
  ws.onMessage((msg) => {
    const m = JSON.parse(msg);
    if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
  });
  const cmd = (method, params) => new Promise((res) => { const myId = ++id; pending.set(myId, res); ws.send(JSON.stringify({ id: myId, method, params })); });

  await cmd('Runtime.enable', {});
  const out = [];
  for (const e of exprs) {
    const r = await cmd('Runtime.evaluate', { expression: e.expression, awaitPromise: true, returnByValue: true, allowUnsafeEvalBlockedByCSP: true });
    const val = r.result && r.result.result ? r.result.result.value : undefined;
    const exc = r.result && r.result.exceptionDetails ? (r.result.exceptionDetails.exception || {}).description : undefined;
    out.push({ label: e.label, value: val, error: exc });
    await new Promise((r) => setTimeout(r, 300)); // let the socket write land at the fake printer
  }
  ws.close();
  console.log(JSON.stringify(out, null, 2));
}
main().catch((e) => { console.error('CDP_ERROR', e.message); process.exit(1); });

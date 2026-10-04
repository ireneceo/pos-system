'use strict';
// 카드단말기 ECR 운반 (GHL, 2026-10-01 · /var/www/.claude/fable-design-20261001-ghl-ecr.md §3-5).
// 이 파일은 프로토콜을 모른다 — 서버가 만든 프레임 hex 를 단말기에 보내고 받은 바이트를 hex 로 돌려줄 뿐.
// 해석·판정은 서버(/api/terminal). Node 내장 모듈만 쓴다(네이티브 모듈 금지 원칙).
//
// 계약: 항상 { ok:true, responseHex } | { ok:false, error } 로 끝난다. throw 하지 않는다.
// 안전: 사설망 주소만 허용한다 — 웹 페이지가 이 다리로 인터넷 아무 곳에나 요청을 보내지 못하게.

const http = require('http');
const net = require('net');

const PRIVATE = [/^10\./, /^192\.168\./, /^172\.(1[6-9]|2\d|3[01])\./, /^127\./, /^169\.254\./];
const isPrivateHost = (h) => net.isIPv4(h) && PRIVATE.some((r) => r.test(h));
const HEX = /^[0-9A-Fa-f]+$/;

function validate(job) {
  if (!job || typeof job !== 'object') return 'BAD_JOB';
  if (!isPrivateHost(String(job.host || ''))) return 'HOST_NOT_ALLOWED';
  const port = Number(job.port);
  if (!Number.isInteger(port) || port < 1 || port > 65535) return 'BAD_PORT';
  const hex = String(job.payloadHex || '');
  if (!hex || hex.length % 2 !== 0 || hex.length > 20000 || !HEX.test(hex)) return 'BAD_PAYLOAD';
  if (!['http-hex', 'tcp-hex', 'tcp-bin'].includes(job.transport)) return 'BAD_TRANSPORT';
  return null;
}

const clampTimeout = (ms) => Math.max(1000, Math.min(Number(ms) || 120000, 180000));

// GHL Postman 캡처 모양: POST http://<단말기>:33898, 본문 = 프레임 hex 문자열, 응답 본문도 hex 로 본다.
// 연결 전 실패(CONNECT_*)와 연결 뒤 실패(TIMEOUT/NET_ERROR)를 구분한다 — 연결 전이면 요청이 단말기에 닿지 않았으므로
// 단말기를 다시 찾아 같은 요청을 보내도 이중 결제가 없다. 연결 뒤면 단말기가 처리했을 수 있어 다시 보내면 안 된다.
const CONNECT_MS = 3000;
function httpHex(job) {
  return new Promise((resolve) => {
    const body = String(job.payloadHex).toUpperCase();
    let done = false;
    let connected = false;
    const finish = (r) => { if (!done) { done = true; clearTimeout(connTimer); resolve(r); } };
    const req = http.request({
      host: job.host, port: Number(job.port), method: 'POST', path: '/',
      headers: { 'Content-Type': 'text/plain', 'Content-Length': Buffer.byteLength(body) },
      timeout: clampTimeout(job.timeoutMs),
    }, (res) => {
      let data = '';
      res.setEncoding('latin1');
      res.on('data', (c) => { data += c; if (data.length > 200000) req.destroy(new Error('TOO_LARGE')); });
      res.on('end', () => {
        const hex = data.replace(/\s+/g, '');
        if (HEX.test(hex) && hex.length % 2 === 0) finish({ ok: true, responseHex: hex.toUpperCase() });
        else if (data.length && data.charCodeAt(0) === 0x02) finish({ ok: true, responseHex: Buffer.from(data, 'latin1').toString('hex').toUpperCase() });
        else finish({ ok: false, error: 'BAD_RESPONSE' });
      });
    });
    const connTimer = setTimeout(() => { if (!connected) { req.destroy(); finish({ ok: false, error: 'CONNECT_TIMEOUT' }); } }, Math.min(CONNECT_MS, clampTimeout(job.timeoutMs)));
    req.on('socket', (sock) => {
      if (!sock.connecting) connected = true;
      else sock.once('connect', () => { connected = true; });
    });
    req.on('timeout', () => { req.destroy(); finish({ ok: false, error: connected ? 'TIMEOUT' : 'CONNECT_TIMEOUT' }); });
    req.on('error', (e) => {
      if (connected) return finish({ ok: false, error: 'NET_ERROR' });
      finish({ ok: false, error: e && e.code === 'ECONNREFUSED' ? 'CONNECT_REFUSED' : 'CONNECT_FAILED' });
    });
    req.end(body);
  });
}

// 원시 TCP: 프레임을 보내고 STX..ETX 프레임을 받는다. 데이터 길이 0 인 ACK 프레임이 먼저 오면 버리고 다음 것을 기다린다.
function tcp(job) {
  return new Promise((resolve) => {
    const out = job.transport === 'tcp-bin' ? Buffer.from(job.payloadHex, 'hex') : Buffer.from(String(job.payloadHex).toUpperCase(), 'ascii');
    let buf = Buffer.alloc(0);
    let done = false;
    const sock = net.createConnection({ host: job.host, port: Number(job.port) });
    const finish = (r) => { if (!done) { done = true; clearTimeout(timer); sock.destroy(); resolve(r); } };
    const timer = setTimeout(() => finish({ ok: false, error: 'TIMEOUT' }), clampTimeout(job.timeoutMs));
    sock.setTimeout(CONNECT_MS, () => { if (sock.connecting) finish({ ok: false, error: 'CONNECT_TIMEOUT' }); });
    sock.on('connect', () => { sock.setTimeout(0); sock.write(out); });
    sock.on('data', (chunk) => {
      buf = Buffer.concat([buf, chunk]);
      if (buf.length > 200000) return finish({ ok: false, error: 'TOO_LARGE' });
      const frames = job.transport === 'tcp-bin' ? buf : Buffer.from(buf.toString('ascii').replace(/\s+/g, ''), 'hex');
      // 완성된 프레임을 앞에서부터 꺼낸다
      let p = 0;
      while (p < frames.length) {
        const s = frames.indexOf(0x02, p);
        if (s < 0 || frames.length < s + 10) return;
        const len = frames.readUInt16BE(s + 8);
        const end = s + 10 + len + 2; // CRC 2 바이트 뒤가 ETX
        if (frames.length <= end) return;
        if (frames[end] !== 0x03) { p = s + 1; continue; }
        const frame = frames.subarray(s, end + 1);
        if (len === 0 && frame[7] === 0x00 && frame[6] !== 0xc3) { p = end + 1; continue; } // ACK — 결과 아님
        if (frame[6] === 0xc2) { p = end + 1; continue; } // Notify(PayHere Direct 진행 알림) — 결과 아님
        return finish({ ok: true, responseHex: frame.toString('hex').toUpperCase() });
      }
    });
    sock.on('error', (e) => finish({ ok: false, error: e && e.code === 'ECONNREFUSED' ? 'CONNECT_REFUSED' : (sock.connecting ? 'CONNECT_FAILED' : 'NET_ERROR') }));
    sock.on('close', () => finish({ ok: false, error: 'CLOSED' }));
  });
}

async function exchange(job) {
  const bad = validate(job);
  if (bad) return { ok: false, error: bad };
  try {
    return job.transport === 'http-hex' ? await httpHex(job) : await tcp(job);
  } catch (e) {
    return { ok: false, error: 'NET_ERROR' };
  }
}

// ── 단말기 자동 찾기 (Irene 2026-10-01 「바뀌면 자동으로 찾아야」) ─────────────────────────
// 이 PC 의 와이파이/랜 주소 대역(사설망, 최대 /22 = 1022 대)에서 단말기 포트가 열린 기기를 고르고,
// 서버가 준 Echo 프레임을 보내 GHL 형식(STX … 명령 C3 … ETX)으로 답하는 기기만 단말기로 본다.
const os = require('os');

function localHosts() {
  const out = new Set();
  for (const list of Object.values(os.networkInterfaces())) {
    for (const a of list || []) {
      if (a.family !== 'IPv4' || a.internal || !isPrivateHost(a.address)) continue;
      const ip = a.address.split('.').map(Number);
      const mask = String(a.netmask || '255.255.255.0').split('.').map(Number);
      let bits = mask.reduce((n, o) => n + (o >>> 0).toString(2).split('1').length - 1, 0);
      if (bits < 22) bits = 24; // 너무 큰 대역은 내 /24 만 (스캔 폭주 방지)
      const base = ((ip[0] << 24) | (ip[1] << 16) | (ip[2] << 8) | ip[3]) >>> 0;
      const net0 = (base & (~0 << (32 - bits))) >>> 0;
      const size = 2 ** (32 - bits);
      for (let i = 1; i < size - 1; i++) {
        const h = (net0 + i) >>> 0;
        if (h === base) continue;
        out.add([h >>> 24, (h >>> 16) & 255, (h >>> 8) & 255, h & 255].join('.'));
      }
    }
  }
  return [...out];
}

function portOpen(host, port, ms) {
  return new Promise((resolve) => {
    const s = net.createConnection({ host, port });
    const end = (v) => { s.destroy(); resolve(v); };
    s.setTimeout(ms, () => end(false));
    s.on('connect', () => end(true));
    s.on('error', () => end(false));
  });
}

const looksLikeEchoReply = (hex) => /^02[0-9A-F]{10}C3[0-9A-F]*03$/i.test(String(hex || ''));

async function discover(job) {
  const port = Number(job && job.port) || 33898;
  const probeHex = String((job && job.probeHex) || '');
  if (!probeHex || !HEX.test(probeHex)) return { ok: false, error: 'BAD_PROBE' };
  const transport = ['http-hex', 'tcp-hex', 'tcp-bin'].includes(job.transport) ? job.transport : 'http-hex';
  const hosts = (Array.isArray(job.hosts) && job.hosts.length ? job.hosts.filter(isPrivateHost) : localHosts()).slice(0, 1100);
  const open = [];
  let i = 0;
  const worker = async () => { while (i < hosts.length) { const h = hosts[i++]; if (await portOpen(h, port, 400)) open.push(h); } };
  await Promise.all(Array.from({ length: 96 }, worker));
  const found = [];
  for (const host of open) {
    const r = await exchange({ host, port, transport, payloadHex: probeHex, timeoutMs: 3000 });
    if (r.ok && looksLikeEchoReply(r.responseHex)) found.push(host);
  }
  return { ok: true, hosts: found.sort(), scanned: hosts.length };
}

module.exports = { exchange, discover, isPrivateHost, validate, localHosts, looksLikeEchoReply };

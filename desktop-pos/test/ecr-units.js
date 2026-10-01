'use strict';
// 카드단말기 ECR 운반 단위 테스트 (Electron 불필요). 실행: node test/ecr-units.js
// 목 단말기 = dev-backend/scripts/mock-ghl-terminal.respond (서버 코덱과 같은 프레임).
const http = require('http');
const net = require('net');
const path = require('path');
const { exchange, validate } = require(path.join(__dirname, '..', 'src', 'ecr', 'exchange'));
const ecr = require('/var/www/dev-backend/utils/ghlEcr');
const { respond } = require('/var/www/dev-backend/scripts/mock-ghl-terminal');

let pass = 0, fail = 0;
const ok = (c, m) => { if (c) { pass++; console.log('  OK  ' + m); } else { fail++; console.log(' FAIL ' + m); } };
const listen = (srv) => new Promise((r) => srv.listen(0, '127.0.0.1', () => r(srv.address().port)));

(async () => {
  const sale = ecr.bufToHex(ecr.saleRequest({ amount: '12.34', ecrInvoiceNo: 'PH38A1' }));

  // 1) HTTP hex — GHL Postman 모양
  const h = http.createServer((req, res) => { let b = ''; req.on('data', (c) => b += c); req.on('end', () => res.end(respond(b, 'approve'))); });
  const hp = await listen(h);
  const r1 = await exchange({ host: '127.0.0.1', port: hp, transport: 'http-hex', payloadHex: sale, timeoutMs: 5000 });
  ok(r1.ok && ecr.parseFrame(r1.responseHex).status === '00', 'http-hex 승인 응답 왕복');
  h.close();

  // 2) TCP — ACK 프레임 먼저, 결과 프레임 나중(분할 전송)
  const ack = Buffer.from('02000B010C01A1000000834F03', 'hex');
  const t = net.createServer((s) => s.on('data', (d) => {
    const reqHex = d.toString('hex').toUpperCase();
    const out = Buffer.from(respond(reqHex, 'approve'), 'hex');
    s.write(ack); s.write(out.subarray(0, 7)); setTimeout(() => s.write(out.subarray(7)), 30);
  }));
  const tp = await listen(t);
  const r2 = await exchange({ host: '127.0.0.1', port: tp, transport: 'tcp-bin', payloadHex: sale, timeoutMs: 5000 });
  ok(r2.ok && ecr.parseFrame(r2.responseHex).commandName === 'sale' && !ecr.parseFrame(r2.responseHex).isAck, 'tcp-bin ACK 건너뛰고 결과 프레임');
  t.close();

  // 3) 응답 없는 단말기 → TIMEOUT (throw 없음)
  const hang = http.createServer(() => { /* 응답 안 함 */ });
  const hgp = await listen(hang);
  const t0 = Date.now();
  const r3 = await exchange({ host: '127.0.0.1', port: hgp, transport: 'http-hex', payloadHex: sale, timeoutMs: 1200 });
  ok(!r3.ok && r3.error === 'TIMEOUT' && Date.now() - t0 < 4000, 'http 응답 없음 → TIMEOUT');
  hang.close();

  // 4) 연결 거부
  const r4 = await exchange({ host: '127.0.0.1', port: 1, transport: 'http-hex', payloadHex: sale, timeoutMs: 2000 });
  ok(!r4.ok && (r4.error === 'CONNECT_REFUSED' || r4.error === 'NET_ERROR'), '연결 거부 → 결과 객체');

  // 5) 사설망 아닌 주소·잘못된 입력은 보내지 않는다
  ok(validate({ host: '8.8.8.8', port: 33898, transport: 'http-hex', payloadHex: sale }) === 'HOST_NOT_ALLOWED', '공인 IP 차단');
  ok(validate({ host: 'evil.example.com', port: 33898, transport: 'http-hex', payloadHex: sale }) === 'HOST_NOT_ALLOWED', '도메인 차단');
  ok(validate({ host: '192.168.2.99', port: 33898, transport: 'http-hex', payloadHex: 'XYZ' }) === 'BAD_PAYLOAD', '비 hex 차단');
  ok(validate({ host: '192.168.2.99', port: 33898, transport: 'http-hex', payloadHex: sale }) === null, '사설망 허용');
  ok((await exchange(null)).error === 'BAD_JOB', 'null 작업 → BAD_JOB');

  console.log(`\n${pass} passed, ${fail} failed`);
  process.exit(fail ? 1 : 0);
})();

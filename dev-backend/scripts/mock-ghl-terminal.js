#!/usr/bin/env node
/**
 * 목 GHL 단말기 — 실단말기 없이 ECR 연동을 개발·검증한다 (Fable 설계 GHL ECR §4 Phase 1).
 *
 * GHL Postman 캡처와 같은 모양: `POST http://<host>:33898` 본문 = 프레임 전체 hex 문자열, 응답도 hex 문자열.
 * (실단말기의 응답 형식은 GHL 회신으로 확정 — 그때 여기와 브릿지 transport 를 맞춘다.)
 *
 * 실행:  node scripts/mock-ghl-terminal.js [--port 33898] [--scenario approve]
 * 시나리오 바꾸기:  curl -X POST http://localhost:33898/__scenario -d decline
 *   approve | approve-tng(손님 TnG QR) | decline(51) | cancel(C7) | unsupported(C1) | timeout(응답 없음) | pending(EA → 다음 E3 승인) | notfound(Reprint C3)
 * 코드에서 쓰기:  const { respond } = require('./mock-ghl-terminal'); respond(requestHex, 'approve') → 응답 hex | null(=타임아웃)
 */
const ecr = require('../utils/ghlEcr');

const ADDR_T = Buffer.from([0x0b, 0x01]);
const ADDR_E = Buffer.from([0x0c, 0x01]);
const ledger = new Map(); // ECR 송장 → 마지막 결과(Reprint·Check Status 용)
let invoiceSeq = 1000;

function responseFrame(command, status, tags) {
  // 응답은 요청과 같은 빌더를 쓰되 Source/Dest 를 뒤집고 6번째 바이트에 Status 를 싣는다
  return ecr.buildFrame({ command, tags, ackIndicator: parseInt(status, 16), source: ADDR_T, dest: ADDR_E });
}

function approvedTags(amountBuf, ecrInvoice, card = { code: '04', brand: 'VISA', pan: '411111******1111' }) {
  invoiceSeq += 1;
  return [
    [ecr.TAG.amount, amountBuf], [ecr.TAG.maskedPan, card.pan], [ecr.TAG.terminalId, '10000831'],
    [ecr.TAG.merchantId, '000000026620037'], [ecr.TAG.terminalInvoice, Buffer.from(String(invoiceSeq).padStart(6, '0'), 'hex')],
    [ecr.TAG.batchNo, '000142'], [ecr.TAG.approvalCode, 'A' + String(invoiceSeq).slice(-5)], [ecr.TAG.rrn, '0012' + String(invoiceSeq).padStart(8, '0')],
    [ecr.TAG.cardType, card.code], [ecr.TAG.productBrand, card.brand], [ecr.TAG.entryModeText, 'Wave'],
    [ecr.TAG.ecrInvoice, ecrInvoice], [ecr.TAG.txnRef, 'MOCK' + invoiceSeq],
  ];
}

/** @returns {string|null} 응답 hex, null = 응답 안 함(타임아웃 시뮬레이션) */
function respond(requestHex, scenario = 'approve') {
  const req = ecr.parseFrame(requestHex);
  const amount = req.tags[ecr.TAG.amount] || Buffer.alloc(6);
  const inv = req.tags[ecr.TAG.ecrInvoice] ? req.tags[ecr.TAG.ecrInvoice].toString('latin1') : '';
  const hex = (b) => ecr.bufToHex(b);

  switch (req.command) {
    case ecr.CMD.echo:
      return hex(responseFrame(ecr.CMD.echo, '00', []));
    case ecr.CMD.sale: {
      if (scenario === 'timeout') { ledger.set(inv, { status: '00', tags: approvedTags(amount, inv) }); return null; }
      if (scenario === 'decline') return hex(responseFrame(ecr.CMD.sale, '51', [[ecr.TAG.amount, amount], [ecr.TAG.ecrInvoice, inv]]));
      if (scenario === 'cancel') return hex(responseFrame(ecr.CMD.sale, 'C7', [[ecr.TAG.ecrInvoice, inv]]));
      if (scenario === 'unsupported') return hex(responseFrame(ecr.CMD.sale, 'C1', [[ecr.TAG.ecrInvoice, inv]]));
      if (scenario === 'pending') { ledger.set(inv, { status: '00', tags: approvedTags(amount, inv) }); return hex(responseFrame(ecr.CMD.sale, 'EA', [[ecr.TAG.amount, amount], [ecr.TAG.ecrInvoice, inv]])); }
      if (scenario === 'notfound') return null; // 단말기는 아무것도 안 했다 — 이어지는 Reprint 가 C3
      if (scenario === 'approve-tng') {
        // 손님이 TnG 앱 QR 을 보여 줌(규격 §9.4 seamless 응답 모양: D002 "19" · D018 TNGWALLET · D01A Scan)
        const tags = approvedTags(amount, inv, { code: '19', brand: 'TNGWALLET', pan: '' }).filter(([t]) => t !== ecr.TAG.maskedPan && t !== ecr.TAG.entryModeText);
        tags.push([ecr.TAG.entryModeText, 'Scan']);
        ledger.set(inv, { status: '00', tags });
        return hex(responseFrame(ecr.CMD.sale, '00', tags));
      }
      const tags = approvedTags(amount, inv);
      ledger.set(inv, { status: '00', tags });
      return hex(responseFrame(ecr.CMD.sale, '00', tags));
    }
    case ecr.CMD.reprint: {
      const last = ledger.get(inv);
      if (!last || scenario === 'notfound') return hex(responseFrame(ecr.CMD.reprint, 'C3', [[ecr.TAG.ecrInvoice, inv]]));
      return hex(responseFrame(ecr.CMD.reprint, last.status, last.tags));
    }
    case ecr.CMD.checkStatus: {
      const last = ledger.get(inv);
      if (!last) return hex(responseFrame(ecr.CMD.checkStatus, 'C3', []));
      return hex(responseFrame(ecr.CMD.checkStatus, '00', [...last.tags, [ecr.TAG.originalResponseCode, '00']]));
    }
    case ecr.CMD.void: {
      const last = ledger.get(inv);
      if (!last) return hex(responseFrame(ecr.CMD.void, 'C3', []));
      if (last.voided) return hex(responseFrame(ecr.CMD.void, 'C5', []));
      last.voided = true;
      return hex(responseFrame(ecr.CMD.void, '00', last.tags));
    }
    default:
      return hex(responseFrame(req.command, 'D3', []));
  }
}

module.exports = { respond, _ledger: ledger };

if (require.main === module) {
  const http = require('http');
  const arg = (k, d) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : d; };
  const port = Number(arg('--port', 33898));
  let scenario = arg('--scenario', 'approve');
  http.createServer((req, res) => {
    let body = '';
    req.on('data', (c) => { body += c; if (body.length > 100000) req.destroy(); });
    req.on('end', () => {
      if (req.url === '/__scenario') { scenario = body.trim() || 'approve'; res.end(scenario); return; }
      try {
        const out = respond(body.trim(), scenario);
        console.log(`[mock-ghl] ${scenario} ← ${body.trim().slice(0, 40)}… → ${out ? out.slice(0, 40) + '…' : '(no response)'}`);
        if (out === null) return; // 응답하지 않고 매달아 둔다 — 브릿지 타임아웃을 본다
        res.writeHead(200, { 'Content-Type': 'text/plain' }); res.end(out);
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'text/plain' }); res.end(String(e.message));
      }
    });
  }).listen(port, () => console.log(`[mock-ghl] listening :${port} scenario=${scenario}`));
}

/**
 * GHL(NTT DATA Payment Services) 카드단말기 ECR 코덱 — 단일 소스 (2026-10-01).
 *
 * 설계: .claude/fable-design-20261001-ghl-ecr.md §2-2 «코덱은 백엔드 한 곳, 프론트는 프로토콜을 모른다».
 *   서버가 요청 프레임을 만들어 주고, 계산대 앱 브릿지는 바이트를 운반만 하고, 받은 응답 hex 를
 *   서버가 다시 여기서 검증·해석한다. 캐셔 기기가 «승인됐다» 고 주장하는 JSON 을 믿지 않기 위해서다.
 *
 * 규격: POS/ECR Extended Device Interface v2.9.26 (기밀 문서 — 저장소에 두지 않는다. 필요한 사실만 여기 적는다).
 *   프레임 = STX(02) · Seq(1, 00) · Source(2) · Dest(2) · Command(1) · [요청 ACK표시 / 응답 Status](1)
 *            · DataLen(2, 첫 태그부터 CRC 전까지) · TLV… · CRC(2) · ETX(03)
 *   TLV   = Tag(2) · Len(2, 바이트 수) · Value
 *   CRC   = CRC-16/ARC(반사 0xA001, 초기값 0) — STX 다음부터 CRC 직전까지, **상위 바이트 먼저**.
 *   N 형식 = BCD(한 바이트 두 자리), 금액 C001 = N12 = 6바이트, 센트 단위.
 *
 * ⛔ 금액은 부동소수로 다루지 않는다 — 문자열/정수 센트로만 오간다.
 */

const STX = 0x02;
const ETX = 0x03;
const ADDR_ECR = Buffer.from([0x0c, 0x01]);
const ADDR_TERMINAL = Buffer.from([0x0b, 0x01]);

const CMD = Object.freeze({
  sale: 0xa1, void: 0xa2, settlement: 0xa3, refund: 0xb1, cancel: 0xc1,
  notify: 0xc2, echo: 0xc3, getLastSettlement: 0xc5, checkStatus: 0xe3, reprint: 0xe6,
});
const CMD_NAME = Object.freeze(Object.fromEntries(Object.entries(CMD).map(([k, v]) => [v, k])));

const TAG = Object.freeze({
  amount: 'C001', terminalId: 'C002', merchantId: 'C003', terminalInvoice: 'C004', batchNo: 'C005',
  txnDateTime: 'C006', maskedPan: 'C007', approvalCode: 'C00A', rrn: 'C00B', cvmMerchant: 'C010',
  cashierId: 'C012', ecrInvoice: 'C013', cvmCustomer: 'C017', productId: 'C01A',
  originalResponseCode: 'C01B', originalResponseMessage: 'C01C',
  cardType: 'D002', paymentType: 'D003', entryMode: 'D008', saleCount: 'D010', saleAmount: 'D011',
  refundCount: 'D012', refundAmount: 'D013', txnRef: 'D017', productBrand: 'D018',
  messagePrompt: 'D019', entryModeText: 'D01A',
});

/** 응답 Status 바이트 → 뜻. 우리 상태기계(§3-4)로의 분류는 classifyStatus 가 한다. */
const STATUS_TEXT = Object.freeze({
  '00': 'Approved', B0: 'Bank timed out', C0: 'Terminal timed out (no card presented)',
  C1: 'Card not supported', C2: 'Maximum amount exceeded', C3: 'No transaction found / invalid invoice number',
  C4: 'Card declined (EMV)', C5: 'Transaction already voided', C6: 'Terminal memory full',
  C7: 'Transaction cancelled', C8: 'Invalid card entry mode', C9: 'Settlement required first',
  CA: 'Communication error', CB: 'Batch empty', CC: 'Settlement failed', D1: 'CRC failed',
  D2: 'Invalid message format', D3: 'Invalid command', D4: 'Invalid source/destination',
  D5: 'Missing tag', D6: 'No acknowledgement for last transaction', EA: 'Transaction pending',
  EF: 'Out of paper',
});

/** 카드종류 코드(D002) → 우리 card_type 키(constants CARD_TYPE_OPTIONS: visa/master/amex/debit/other). */
const CARD_CODE = Object.freeze({
  '04': { brand: 'VISA', key: 'visa' }, '05': { brand: 'MasterCard', key: 'master' },
  '06': { brand: 'Diners', key: 'other' }, '07': { brand: 'Amex', key: 'amex' },
  '08': { brand: 'JCB', key: 'other' }, '09': { brand: 'MyDebit', key: 'debit' },
  '10': { brand: 'UnionPay', key: 'other' }, '11': { brand: 'TnG', key: 'other' },
  '12': { brand: 'NETS', key: 'other' }, '19': { brand: 'eWallet', key: 'other' },
});

/* ─────────────────────────── CRC ─────────────────────────── */
const CRC_TABLE = (() => {
  const t = new Uint16Array(256);
  for (let i = 0; i < 256; i++) {
    let crc = 0, c = i;
    for (let j = 0; j < 8; j++) {
      crc = ((crc ^ c) & 1) ? ((crc >>> 1) ^ 0xa001) : (crc >>> 1);
      c >>>= 1;
    }
    t[i] = crc;
  }
  return t;
})();

function crc16Arc(buf) {
  let crc = 0;
  for (const b of buf) crc = ((crc >>> 8) ^ CRC_TABLE[(crc ^ b) & 0xff]) & 0xffff;
  return crc;
}

/* ─────────────────────────── 금액 (BCD N12) ─────────────────────────── */
/** "12.34" | 12.34 → 센트 정수 문자열 "1234". 음수·소수 3자리 이상·12자리 초과는 거부. */
function toCents(amount) {
  const s = String(amount).trim();
  const m = /^(\d+)(?:\.(\d{1,2}))?$/.exec(s);
  if (!m) throw new Error(`Invalid amount: ${s}`);
  const cents = (m[1].replace(/^0+(?=\d)/, '') + (m[2] || '').padEnd(2, '0')).replace(/^0+(?=\d)/, '');
  if (cents.length > 12) throw new Error(`Amount too large: ${s}`);
  return cents;
}

function encodeAmount(amount) {
  return Buffer.from(toCents(amount).padStart(12, '0'), 'hex');
}

/** BCD 6바이트 → "12.34" (문자열, 2자리 고정). */
function decodeAmount(buf) {
  const digits = Buffer.from(buf).toString('hex');
  if (!/^\d+$/.test(digits)) throw new Error('Amount is not BCD');
  const n = digits.replace(/^0+(?=\d{3})/, '').padStart(3, '0');
  return `${n.slice(0, -2)}.${n.slice(-2)}`;
}

/* ─────────────────────────── 프레임 ─────────────────────────── */
function tlv(tag, value) {
  const v = Buffer.isBuffer(value) ? value : Buffer.from(String(value), 'ascii');
  if (v.length > 0xffff) throw new Error(`TLV ${tag} too long`);
  const len = Buffer.alloc(2); len.writeUInt16BE(v.length);
  return Buffer.concat([Buffer.from(tag, 'hex'), len, v]);
}

/**
 * 요청 프레임(Buffer). tags = [[TAG, Buffer|string], …] — 순서 유지.
 * ackIndicator 기본 0x00(ACK 없음 — 결과 프레임 1개, HTTP 1요청=1응답 구조에 맞음).
 */
function buildFrame({ command, tags = [], ackIndicator = 0x00, seq = 0x00, source = ADDR_ECR, dest = ADDR_TERMINAL }) {
  const data = Buffer.concat(tags.map(([t, v]) => tlv(t, v)));
  const head = Buffer.alloc(9);
  head[0] = seq; source.copy(head, 1); dest.copy(head, 3);
  head[5] = command; head[6] = ackIndicator; head.writeUInt16BE(data.length, 7);
  const body = Buffer.concat([head, data]);
  const crc = Buffer.alloc(2); crc.writeUInt16BE(crc16Arc(body));
  return Buffer.concat([Buffer.from([STX]), body, crc, Buffer.from([ETX])]);
}

/** hex 문자열 ↔ Buffer. 공백 허용, 대소문자 무관. 홀수 길이·비hex 는 거부. */
function hexToBuf(hex) {
  const s = String(hex || '').replace(/\s+/g, '');
  if (!s || s.length % 2 !== 0 || !/^[0-9a-fA-F]+$/.test(s)) throw new Error('Not a hex frame');
  return Buffer.from(s, 'hex');
}
const bufToHex = (buf) => Buffer.from(buf).toString('hex').toUpperCase();

/**
 * 프레임 해석. 검증 실패면 throw(코드 FRAME_*) — 호출부는 응답을 «받지 못한 것» 이 아니라 «위조/손상» 으로 다룬다.
 * @returns {{ seq, source, dest, command, commandName, statusOrAck, status, dataLength, tags: Object<string,Buffer>, tagOrder: string[], isAck }}
 */
function parseFrame(input) {
  const buf = Buffer.isBuffer(input) ? input : hexToBuf(input);
  const fail = (code, msg) => { const e = new Error(msg); e.code = code; throw e; };
  if (buf.length < 13) fail('FRAME_SHORT', 'Frame too short');
  if (buf[0] !== STX || buf[buf.length - 1] !== ETX) fail('FRAME_DELIMITER', 'Missing STX/ETX');
  const dataLength = buf.readUInt16BE(8);
  if (buf.length !== 1 + 9 + dataLength + 2 + 1) fail('FRAME_LENGTH', 'Length field does not match frame size');
  const body = buf.subarray(1, 10 + dataLength);
  const crcGot = buf.readUInt16BE(10 + dataLength);
  if (crc16Arc(body) !== crcGot) fail('FRAME_CRC', 'CRC mismatch');

  const tags = {}; const tagOrder = [];
  let p = 10; const end = 10 + dataLength;
  while (p < end) {
    if (p + 4 > end) fail('FRAME_TLV', 'Truncated TLV header');
    const tag = buf.subarray(p, p + 2).toString('hex').toUpperCase();
    const len = buf.readUInt16BE(p + 2);
    if (p + 4 + len > end) fail('FRAME_TLV', `TLV ${tag} overruns data`);
    tags[tag] = buf.subarray(p + 4, p + 4 + len); tagOrder.push(tag);
    p += 4 + len;
  }
  const statusOrAck = buf[7].toString(16).toUpperCase().padStart(2, '0');
  return {
    seq: buf[1], source: bufToHex(buf.subarray(2, 4)), dest: bufToHex(buf.subarray(4, 6)),
    command: buf[6], commandName: CMD_NAME[buf[6]] || null,
    statusOrAck, status: statusOrAck, dataLength, tags, tagOrder,
    // 응답이 ACK 프레임(데이터 0, 상태 00)이면 결과가 아니다 — 브릿지가 tcp 에서 버리고 다음 프레임을 기다린다
    isAck: dataLength === 0 && statusOrAck === '00' && buf[6] !== CMD.echo,
  };
}

/**
 * 응답 본문에서 결과 프레임 하나를 고른다(2026-10-04 — 매장 단말기가 «PayHere Direct» 로 확인됨).
 * 규격 §5.2: Direct 는 거래 중 Notify(C2, «카드 넣음·PIN 입력·처리 중»)를 먼저 보낸다. 같은 연결의 ACK 도 앞에 올 수 있다.
 * HTTP 본문이 «Notify… + 결과» 로 이어 붙어 오면 통째로는 길이 검사에 걸려 승인이 버려진다.
 * → STX..ETX 를 길이로 잘라 각각 검증(CRC 포함)하고, ACK·Notify 를 건너뛴 **마지막 결과 프레임**을 고른다.
 * 프레임이 하나뿐이면 지금과 똑같다. 손상된 조각이 하나라도 있으면 거부(throw) — 고르기로 위조를 덮지 않는다.
 */
function pickResultFrame(input) {
  const buf = Buffer.isBuffer(input) ? input : hexToBuf(input);
  const frames = [];
  let p = 0;
  while (p < buf.length) {
    if (buf[p] !== STX || p + 10 > buf.length) { const e = new Error('Unexpected bytes between frames'); e.code = 'FRAME_DELIMITER'; throw e; }
    const end = p + 10 + buf.readUInt16BE(p + 8) + 3;
    if (end > buf.length) { const e = new Error('Truncated frame'); e.code = 'FRAME_LENGTH'; throw e; }
    const piece = buf.subarray(p, end);
    frames.push(Object.assign(parseFrame(piece), { hex: bufToHex(piece) }));
    p = end;
  }
  const results = frames.filter((f) => !f.isAck && f.command !== CMD.notify);
  if (!results.length) {
    const e = new Error(frames.some((f) => f.isAck) ? 'Received an acknowledgement, not a result' : 'Only progress messages, no result');
    e.code = frames.some((f) => f.isAck) ? 'FRAME_ACK_ONLY' : 'FRAME_NOTIFY_ONLY'; throw e;
  }
  const frame = results[results.length - 1];
  return { frame, frameCount: frames.length };
}

/* ─────────────────────────── 태그 값 해석 ─────────────────────────── */
const ascii = (b) => (b ? Buffer.from(b).toString('latin1').replace(/\0+$/g, '').trim() : null);
const bcd = (b) => (b ? Buffer.from(b).toString('hex') : null);

/** D002: Payhere Direct = 바이너리 1바이트(0x04), Payhere ECR = ASCII 2~3자("04") — 둘 다 받는다. */
function cardTypeCode(b) {
  if (!b || !b.length) return null;
  const a = ascii(b);
  if (a && /^\d{2,3}$/.test(a)) return a.slice(-2);
  return Buffer.from(b).subarray(0, 1).toString('hex');
}

/** 상품 브랜드 문자열(D018)이 있으면 우선 — 단말기 실제 표기가 코드표보다 정확하다. */
function mapCardType(code, brandText) {
  const b = String(brandText || '').toUpperCase();
  if (b.includes('VISA')) return 'visa';
  if (b.includes('MASTER')) return 'master';
  if (b.includes('AMEX') || b.includes('AMERICAN')) return 'amex';
  if (b.includes('MYDEBIT') || b.includes('DEBIT')) return 'debit';
  if (code && CARD_CODE[code]) return CARD_CODE[code].key;
  return b || code ? 'other' : null;
}

/**
 * 결제 수단 분류(Fable 추가 판정 C-2) — 카드 판매와 손님 QR(지갑) 판매는 요청이 같고(금액만) 응답이 무엇이었는지 알려 준다.
 * 우선순위: D018 문자열 → D002 코드(11 TnG · 19 eWallet) → 입력방식 Scan(D008 0x08 / D01A "Scan").
 * ewallet_type 은 화면 EWALLET_TYPE_OPTIONS 키만(DB 저장값) — tng|grabpay|boost|shopeepay|duitnow|other.
 */
const WALLET_WORDS = /WALLET|TNG|TOUCH|DUITNOW|GRAB|BOOST|SHOPEE|QR/;
function tenderFromResult({ brand, code, entryText, entryCode }) {
  const b = String(brand || '').toUpperCase();
  const isWallet = WALLET_WORDS.test(b) || code === '11' || code === '19'
    || String(entryText || '').toUpperCase() === 'SCAN' || entryCode === '08';
  if (!isWallet) return { method: 'card', card_type: mapCardType(code, brand), ewallet_type: null };
  const ew = /TNG|TOUCH/.test(b) || code === '11' ? 'tng'
    : b.includes('DUITNOW') ? 'duitnow'
    : b.includes('GRAB') ? 'grabpay'
    : b.includes('BOOST') ? 'boost'
    : b.includes('SHOPEE') ? 'shopeepay'
    : 'other';
  return { method: 'ewallet', card_type: null, ewallet_type: ew };
}

/** 판매/취소/재출력/상태조회 응답 → 저장할 값. */
function readResult(frame) {
  const t = frame.tags;
  const code = cardTypeCode(t[TAG.cardType]);
  const brand = ascii(t[TAG.productBrand]);
  const entryText = ascii(t[TAG.entryModeText]);
  const entryCode = t[TAG.entryMode] ? bcd(t[TAG.entryMode]) : null;
  const tender = tenderFromResult({ brand, code, entryText, entryCode });
  return {
    tender_method: tender.method,
    ewallet_type: tender.ewallet_type,
    amount: t[TAG.amount] ? decodeAmount(t[TAG.amount]) : null,
    terminal_id: ascii(t[TAG.terminalId]),
    merchant_id: ascii(t[TAG.merchantId]),
    terminal_invoice_no: t[TAG.terminalInvoice] ? (/^\d+$/.test(bcd(t[TAG.terminalInvoice])) ? bcd(t[TAG.terminalInvoice]) : ascii(t[TAG.terminalInvoice])) : null,
    terminal_batch_no: t[TAG.batchNo] ? (/^\d+$/.test(ascii(t[TAG.batchNo]) || '') ? ascii(t[TAG.batchNo]) : bcd(t[TAG.batchNo])) : null,
    txn_datetime: t[TAG.txnDateTime] ? bcd(t[TAG.txnDateTime]) : null,
    masked_pan: ascii(t[TAG.maskedPan]),
    approval_code: ascii(t[TAG.approvalCode]),
    rrn: ascii(t[TAG.rrn]),
    card_type_code: code,
    card_brand: brand || (code && CARD_CODE[code] ? CARD_CODE[code].brand : null),
    card_type: tender.card_type,
    entry_mode: ascii(t[TAG.entryModeText]) || (t[TAG.entryMode] ? bcd(t[TAG.entryMode]) : null),
    txn_ref: ascii(t[TAG.txnRef]),
    ecr_invoice_no: ascii(t[TAG.ecrInvoice]),
    message_prompt: ascii(t[TAG.messagePrompt]),
    original_response_code: ascii(t[TAG.originalResponseCode]),
  };
}

/**
 * 응답 Status → 우리 상태(§3-4). 승인(00) 아니면 절대 approved 가 되지 않는다.
 * check_status 는 규격 5.11 의 4조를 따른다(Status 00 + 원래응답 "00" 만 승인).
 */
function classifyStatus(command, status, originalResponseCode) {
  if (command === CMD.checkStatus) {
    if (status !== '00') return 'pending';
    if (originalResponseCode === '00') return 'approved';
    if (originalResponseCode === 'EA') return 'pending';
    return 'declined';
  }
  if (status === '00') return 'approved';
  if (status === 'EA') return 'pending';
  if (status === 'C3') return 'not_found';
  if (status === 'C7') return 'cancelled';
  if (status === 'CA' || status === 'B0') return 'comm_error';
  return 'declined';
}

/* ─────────────────────────── 명령별 빌더 ─────────────────────────── */
const ecrInvoiceOk = (s) => /^[A-Za-z0-9]{1,40}$/.test(String(s || ''));

/**
 * paymentType(D003, 선택) — 기본은 보내지 않는다(규격 2.9.7 부터 Optional, 카드·손님 QR 을 단말기가 함께 받음).
 * 실단말기가 D003 없이는 QR 을 안 받는 것으로 드러나면 «QR (단말기)» 버튼만 'CD'(Scan-QR) 를 넘긴다(Fable D-5 분기).
 */
function saleRequest({ amount, ecrInvoiceNo, cashierId, paymentType }) {
  if (!ecrInvoiceOk(ecrInvoiceNo)) throw new Error('ECR invoice number must be 1-40 alphanumerics');
  const tags = [[TAG.amount, encodeAmount(amount)], [TAG.ecrInvoice, ecrInvoiceNo]];
  if (paymentType) {
    if (!/^[0-9A-Fa-f]{2}$/.test(paymentType)) throw new Error('Invalid payment type');
    tags.push([TAG.paymentType, Buffer.from(paymentType, 'hex')]);
  }
  if (cashierId) tags.push([TAG.cashierId, String(cashierId).replace(/[^\x20-\x7e]/g, '').slice(0, 40)]);
  return buildFrame({ command: CMD.sale, tags });
}
function reprintRequest({ amount, ecrInvoiceNo }) {
  return buildFrame({ command: CMD.reprint, tags: [[TAG.amount, encodeAmount(amount)], [TAG.ecrInvoice, ecrInvoiceNo]] });
}
function checkStatusRequest({ amount, ecrInvoiceNo }) {
  return buildFrame({ command: CMD.checkStatus, tags: [[TAG.amount, encodeAmount(amount)], [TAG.ecrInvoice, ecrInvoiceNo]] });
}
function voidRequest({ amount, ecrInvoiceNo, terminalInvoiceNo }) {
  const tags = [[TAG.amount, encodeAmount(amount)]];
  if (ecrInvoiceNo) tags.push([TAG.ecrInvoice, ecrInvoiceNo]);
  else if (terminalInvoiceNo) tags.push([TAG.terminalInvoice, Buffer.from(String(terminalInvoiceNo).padStart(6, '0'), 'hex')]);
  return buildFrame({ command: CMD.void, tags });
}
const echoRequest = () => buildFrame({ command: CMD.echo });

module.exports = {
  STX, ETX, CMD, CMD_NAME, TAG, STATUS_TEXT, CARD_CODE,
  crc16Arc, toCents, encodeAmount, decodeAmount, tlv, buildFrame, parseFrame, pickResultFrame, hexToBuf, bufToHex,
  cardTypeCode, mapCardType, tenderFromResult, readResult, classifyStatus,
  saleRequest, reprintRequest, checkStatusRequest, voidRequest, echoRequest,
};

/**
 * GHL ECR 코덱 — 규격 샘플 벡터 계약 (Fable 설계 .claude/fable-design-20261001-ghl-ecr.md §4 P1).
 * 벡터는 규격서 §9 샘플을 그대로 옮긴 것이다(문서 원본은 기밀이라 저장소에 두지 않는다).
 */
const ecr = require('../utils/ghlEcr');

// 규격 §9.1 Echo · §9.2 Sale ACK · §9.2 Sale 응답(줄바꿈만 이어 붙임)
const ECHO_REQ_ACK = '02000C010B01C3100000AF1103';
const ECHO_RES = '02000B010C01C30000003B5003';
const SALE_ACK = '02000B010C01A1000000834F03';
const SALE_RES = [
  '02000B010C01A1000121C0010006000000001000C0070010353',
  '3333334392A2A2A2A2A2A37313832C00600050226091857C002',
  '00083130303030383331C00300083236363230303337D0170013',
  '4D414830303030313333393032303031333534C0040003001354',
  'D00200023039C00B000C303031323639393632383534C00C000',
  'E4130303030303036313530303031C00F000A383030303030383',
  '03030C00D00074D794465626974D01800074D594445424954C0',
  '0A0006313236393936C00E001033313844463333334139393045',
  '313942C010001C4E4F2050494E204F52205349474E415455524',
  '5205245515549524544C0050003313432C017001C4E4F2050494',
  'E204F52205349474E4154555245205245515549524544D008000',
  '107D01A000457617665C008000202295BCC03',
].join('');

describe('CRC-16/ARC — 규격 샘플', () => {
  test.each([ECHO_REQ_ACK, ECHO_RES, SALE_ACK, SALE_RES])('%s 의 CRC 가 맞다', (hex) => {
    expect(() => ecr.parseFrame(hex)).not.toThrow();
  });

  test('Echo(ACK 요구) 요청을 바이트 단위로 재현', () => {
    expect(ecr.bufToHex(ecr.buildFrame({ command: ecr.CMD.echo, ackIndicator: 0x10 }))).toBe(ECHO_REQ_ACK);
  });

  test('응답 CRC 1바이트 변조 → FRAME_CRC', () => {
    const bad = SALE_RES.slice(0, 40) + (SALE_RES[40] === '0' ? '1' : '0') + SALE_RES.slice(41);
    expect(() => ecr.parseFrame(bad)).toThrow(expect.objectContaining({ code: 'FRAME_CRC' }));
  });

  test('길이·구분자 손상 거부', () => {
    expect(() => ecr.parseFrame(SALE_RES.slice(0, -2))).toThrow(expect.objectContaining({ code: 'FRAME_DELIMITER' }));
    expect(() => ecr.parseFrame('02000B010C01A1000001834F03')).toThrow(expect.objectContaining({ code: 'FRAME_LENGTH' }));
    expect(() => ecr.parseFrame('zz')).toThrow();
  });
});

describe('Sale 응답 해석 — 규격 §9.2', () => {
  const f = ecr.parseFrame(SALE_RES);
  const r = ecr.readResult(f);
  test('명령·상태', () => {
    expect(f.commandName).toBe('sale');
    expect(f.status).toBe('00');
    expect(ecr.classifyStatus(f.command, f.status)).toBe('approved');
  });
  test('값', () => {
    expect(r.amount).toBe('10.00');
    expect(r.masked_pan).toBe('533349******7182');
    expect(r.approval_code).toBe('126996');
    expect(r.terminal_invoice_no).toBe('001354');
    expect(r.card_type_code).toBe('09');
    expect(r.card_brand).toBe('MYDEBIT');
    expect(r.card_type).toBe('debit');
    expect(r.entry_mode).toBe('Wave');
    expect(r.txn_datetime).toBe('0226091857');
  });
  test('ACK 프레임은 결과가 아니다', () => {
    expect(ecr.parseFrame(SALE_ACK).isAck).toBe(true);
    expect(f.isAck).toBe(false);
  });
});

describe('금액 BCD', () => {
  test.each([['0.01', '000000000001'], ['12.34', '000000001234'], ['9999999999.99', '999999999999'], ['10', '000000001000'], ['1.5', '000000000150']])(
    '%s ↔ %s', (amt, hex) => {
      expect(ecr.encodeAmount(amt).toString('hex')).toBe(hex);
      expect(ecr.decodeAmount(Buffer.from(hex, 'hex'))).toBe(Number(amt).toFixed(2));
    });
  test.each(['-1', '1.234', 'abc', '99999999999.00'])('거부: %s', (amt) => {
    expect(() => ecr.encodeAmount(amt)).toThrow();
  });
});

describe('카드종류 — 프로파일 두 형식', () => {
  test('ASCII "09" → debit, 바이너리 0x04 → visa', () => {
    expect(ecr.mapCardType(ecr.cardTypeCode(Buffer.from('09', 'ascii')), null)).toBe('debit');
    expect(ecr.mapCardType(ecr.cardTypeCode(Buffer.from([0x04])), null)).toBe('visa');
    expect(ecr.mapCardType('05', 'MASTER')).toBe('master');
    expect(ecr.mapCardType('19', 'TNG')).toBe('other');
  });
});

describe('요청 빌더 왕복', () => {
  test('Sale 요청 → 다시 읽으면 금액·ECR 송장이 같다', () => {
    const f = ecr.parseFrame(ecr.saleRequest({ amount: '12.34', ecrInvoiceNo: 'PH38A1' }));
    expect(f.commandName).toBe('sale');
    expect(f.source).toBe('0C01');
    expect(ecr.decodeAmount(f.tags.C001)).toBe('12.34');
    expect(f.tags.C013.toString()).toBe('PH38A1');
  });
  test('ECR 송장은 영숫자만', () => {
    expect(() => ecr.saleRequest({ amount: '1', ecrInvoiceNo: 'PH-1' })).toThrow();
  });
  test('상태 분류 — 승인 아니면 approved 아님', () => {
    for (const s of ['01', '51', 'C0', 'C1', 'C4', 'C5', 'D1']) expect(ecr.classifyStatus(ecr.CMD.sale, s)).toBe('declined');
    expect(ecr.classifyStatus(ecr.CMD.sale, 'C7')).toBe('cancelled');
    expect(ecr.classifyStatus(ecr.CMD.sale, 'EA')).toBe('pending');
    expect(ecr.classifyStatus(ecr.CMD.reprint, 'C3')).toBe('not_found');
    expect(ecr.classifyStatus(ecr.CMD.checkStatus, '00', '00')).toBe('approved');
    expect(ecr.classifyStatus(ecr.CMD.checkStatus, '00', 'EA')).toBe('pending');
    expect(ecr.classifyStatus(ecr.CMD.checkStatus, '00', '51')).toBe('declined');
    expect(ecr.classifyStatus(ecr.CMD.checkStatus, 'C3', null)).toBe('pending');
  });
});

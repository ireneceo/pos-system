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

// 규격 §9.4 eWallet(Seamless) 응답 · §9.9 eWallet(Async, DuitNow) 응답 — 줄바꿈만 이어 붙임
const EWALLET_RES = [
  '02000B010C01A1000085C0', '010006000000001000C0020', '0083130303030383331C003', '00083236363230303337C00',
  '600050226092338D0180009', '544E4757414C4C4554D017', '000C4550413030303231323', '63934C01800183238313031',
  '31303233373339303734353', '238393235363532C0040003', '001356D008000108D01A000', '45363616EC0050003313432',
  'D0020002313918BE03',
].join('');
const DUITNOW_RES = [
  '02000B010C01A1EA006CC0010006000000001000C002', '00083130303030383331C00300083236363230303337C0',
  '0600050226094656D018000A447569744E6F77205152D', '017000E5250505152303030303132333931C0040003001',
  '361D008000108D01A00045363616EC0050003313432D0', '0200023139A46F03',
].join('');

describe('결제 수단 분류 — 카드 vs 손님 QR(지갑) (Fable 추가 판정 C-2)', () => {
  test('§9.4 TNGWALLET · D002 "19" · Scan → ewallet/tng', () => {
    const f = ecr.parseFrame(EWALLET_RES);
    const r = ecr.readResult(f);
    expect(f.status).toBe('00');
    expect(r.tender_method).toBe('ewallet');
    expect(r.ewallet_type).toBe('tng');
    expect(r.card_type).toBeNull();
    expect(r.amount).toBe('10.00');
  });
  test('§9.9 DuitNow QR(Async, EA) → ewallet/duitnow (분류만)', () => {
    const f = ecr.parseFrame(DUITNOW_RES);
    const r = ecr.readResult(f);
    expect(f.status).toBe('EA');
    expect(r.tender_method).toBe('ewallet');
    expect(r.ewallet_type).toBe('duitnow');
  });
  test('§9.2 MyDebit 카드 → card/debit · VISA 문자열 → card/visa', () => {
    const r = ecr.readResult(ecr.parseFrame(SALE_RES));
    expect(r.tender_method).toBe('card');
    expect(r.card_type).toBe('debit');
    expect(r.ewallet_type).toBeNull();
    expect(ecr.tenderFromResult({ brand: 'VISA', code: '04', entryText: 'Wave' })).toEqual({ method: 'card', card_type: 'visa', ewallet_type: null });
  });
  test('브랜드 문자열 없을 때 코드·입력방식으로 지갑 판정', () => {
    expect(ecr.tenderFromResult({ code: '11' }).ewallet_type).toBe('tng');
    expect(ecr.tenderFromResult({ code: '19' }).method).toBe('ewallet');
    expect(ecr.tenderFromResult({ code: '04', entryText: 'Scan' }).method).toBe('ewallet');
    expect(ecr.tenderFromResult({ brand: 'GRABPAY' }).ewallet_type).toBe('grabpay');
    expect(ecr.tenderFromResult({}).method).toBe('card');
  });
  test('D003 결제종류는 선택 — 넣으면 왕복, 기본은 없음', () => {
    expect(ecr.parseFrame(ecr.saleRequest({ amount: '1', ecrInvoiceNo: 'A1' })).tags.D003).toBeUndefined();
    const f = ecr.parseFrame(ecr.saleRequest({ amount: '1', ecrInvoiceNo: 'A1', paymentType: 'CD' }));
    expect(f.tags.D003.toString('hex').toUpperCase()).toBe('CD');
    expect(() => ecr.saleRequest({ amount: '1', ecrInvoiceNo: 'A1', paymentType: 'ZZ' })).toThrow();
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

// 2026-10-04 매장 단말기 = PayHere Direct — 결과 전에 Notify(C2)·ACK 가 같은 본문에 이어 올 수 있다(규격 §5.2)
describe('결과 프레임 고르기 — Notify·ACK 건너뜀', () => {
  const notify = (code) => ecr.bufToHex(ecr.buildFrame({ command: ecr.CMD.notify, source: Buffer.from([0x0b, 0x01]), dest: Buffer.from([0x0c, 0x01]), tags: [['D004', Buffer.from(code, 'hex')]] }));
  test('단일 프레임은 그대로', () => {
    const { frame, frameCount } = ecr.pickResultFrame(SALE_RES);
    expect(frameCount).toBe(1);
    expect(frame.commandName).toBe('sale');
    expect(frame.status).toBe('00');
  });
  test('Notify 둘 + ACK + 결과 → 결과만', () => {
    const { frame, frameCount } = ecr.pickResultFrame(notify('0001') + SALE_ACK + notify('0011') + SALE_RES);
    expect(frameCount).toBe(4);
    expect(frame.commandName).toBe('sale');
    expect(ecr.decodeAmount(frame.tags.C001)).toBe('10.00');
    expect(frame.hex).toBe(SALE_RES);
  });
  test('Notify 만 → 결과 없음으로 거부', () => {
    expect(() => ecr.pickResultFrame(notify('0011'))).toThrow(expect.objectContaining({ code: 'FRAME_NOTIFY_ONLY' }));
  });
  test('ACK 만 → FRAME_ACK_ONLY', () => {
    expect(() => ecr.pickResultFrame(SALE_ACK)).toThrow(expect.objectContaining({ code: 'FRAME_ACK_ONLY' }));
  });
  test('이어 붙인 조각 중 하나라도 CRC 손상 → 거부(고르기로 덮지 않음)', () => {
    const bad = notify('0011').slice(0, -6) + '0000' + '03';
    expect(() => ecr.pickResultFrame(bad + SALE_RES)).toThrow(expect.objectContaining({ code: 'FRAME_CRC' }));
  });
  test('프레임 사이 잡바이트 → 거부', () => {
    expect(() => ecr.pickResultFrame('FF' + SALE_RES)).toThrow(expect.objectContaining({ code: 'FRAME_DELIMITER' }));
  });
});

// 2026-10-04 Fable 설계(terminal-void-direct) §7-1 — Void 프레임 · B0/CA 분류 · HTTP 거절 해석
describe('Void(A2) · Direct 실패 분류', () => {
  test('Void 요청 = 규격 §9.7 샘플과 바이트 동일(CRC 9622)', () => {
    const f = ecr.buildFrame({ command: ecr.CMD.void, ackIndicator: 0x10, tags: [[ecr.TAG.amount, ecr.encodeAmount('10.00')], [ecr.TAG.ecrInvoice, 'ECR-202502060934']] });
    expect(ecr.bufToHex(f)).toBe('02000C010B01A210001EC0010006000000001000C01300104543522D323032353032303630393334962203');
  });
  test('voidRequest 는 C001 금액 + C013 ECR 송장', () => {
    const f = ecr.parseFrame(ecr.voidRequest({ amount: '1.06', ecrInvoiceNo: 'PH13A29' }));
    expect(f.commandName).toBe('void');
    expect(ecr.decodeAmount(f.tags.C001)).toBe('1.06');
    expect(f.tags.C013.toString()).toBe('PH13A29');
  });
  test('B0·CA 는 단말기가 답한 최종 결과 = declined (comm_error 아님)', () => {
    expect(ecr.classifyStatus(ecr.CMD.sale, 'B0')).toBe('declined');
    expect(ecr.classifyStatus(ecr.CMD.sale, 'CA')).toBe('declined');
    expect(ecr.classifyStatus(ecr.CMD.sale, 'C7')).toBe('cancelled');
    expect(ecr.classifyStatus(ecr.CMD.sale, 'EA')).toBe('pending');
    expect(ecr.classifyStatus(ecr.CMD.void, 'C5')).toBe('declined');
    expect(ecr.classifyStatus(ecr.CMD.void, 'C3')).toBe('not_found');
  });
  test('parseHttpRaw — 운영 tx30 꼴 «HTTP 400 BUSY»', () => {
    const raw = '485454502F312E3120343030204261642052657175657374200D0A436F6E74656E742D547970653A206170706C69636174696F6E2F6A736F6E0D0A446174653A2053756E2C2034204F637420323032362031353A33323A303920474D540D0A436F6E6E656374696F6E3A20636C6F73650D0A436F6E74656E742D4C656E6774683A20340D0A0D0A42555359';
    expect(ecr.parseHttpRaw(raw)).toEqual({ status: 400, body: 'BUSY' });
  });
  test('parseHttpRaw — 상태줄 없음·본문이 프레임이면 null', () => {
    expect(ecr.parseHttpRaw('02000B010C01C30000003B5003')).toBeNull();
    const framed = Buffer.from('HTTP/1.1 200 OK\r\nContent-Length: 26\r\n\r\n02000B010C01C30000003B5003', 'latin1').toString('hex');
    expect(ecr.parseHttpRaw(framed)).toBeNull();
    expect(ecr.parseHttpRaw('')).toBeNull();
  });
});

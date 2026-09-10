/**
 * 인보이스 매칭 계약 — 2026-09-10 Fable 판정. 자동 채움을 켜는 전제 조건이다.
 *
 * 픽스처는 **실제 운영 데이터**다: 발주 33(PO-R10-20260906-003)의 19줄과,
 * 그 발주에 올라온 인보이스(TAIYANG FRESH IV-26/09-02369)를 무료 OCR 로 읽은 텍스트 그대로.
 *
 * 고장주입으로 확인하는 법:
 *   ① 전역 1:1 배정을 없애고 «발주 줄 순서대로 각자 최선» 으로 되돌리면 (a) 가 실패해야 한다.
 *   ② 이름 사전(seller_invoice_name) 우선 단계를 지우면 (c) 가 실패해야 한다.
 */
import { parseInvoiceText, matchInvoiceToPo, shouldAutoFill, parseInvoiceHeader, PoLine } from './invoiceMatcher';

const OCR_HEADER = `
TAIYANG FRESH TRADING SDN BHD
(202201046768(1492465-X))
INVOICE :IV-26/09-02369
Persiaran Tropicana, Tropicana, 47410 Terms 30 DAYS
Date 8/9/2026
RINGGIT MALAYSIA : ONE HUNDRED EIGHTY SIX AND CENTS SIXTEEN ONLY Total (RM)| 186.16]
`;

const OCR_TEXT = `
1 BUNCIS #%& 0.20 KG 6.50 1.30
2 XXXXX BAWANG HOLLAND k#7% (KG) . 8.00 KG 3.50 8.00
3 BAWANG MERAH KECIL /M1% (KG) ADAKULIT / TAK ° 0.70 KG 5.30 3.71
4 BAWANG PUTIH KOPEK #5: . 5.00 PACK 7.00 35.00
5 CENDAWAN KAKI #6155 (PKT) . 3.00 PKT 2.80 8.40
6  CILIMERAH 4H 0.20 KG 17.00 3.40
7 CILIAPI HIJAU #1 (KG) 0.40 KG 14.00 5.60
8 CILI API MERAH £1 3##1 (KG) 0.20 KG 13.00 2.60
9 XXXXX CARROT 2.8 + KG ) 1.00 KG 4.00 4.00
10 CHERRY TOMATO X82 ) 0.50 KG 16.00 8.00
11 ENOKI £485 (PKT) : 2.00 PACK 0.80 1.60
12 KOBIS CHINA EAE (KG) . 2.00 KG 3.60 7.20
13 KANKONG Zi - 0.50 KG 4.30 2.15
14 XXXXX LEEK KOREA &iE#F (KG) X CANTIK CANTIK  - 5.00 KG 10.00 50.00
15 LOBAKPUTIHB% k AA a 0.50 KG 4.80 2.40
16 XXXXX UBIKENTANG / POTATO t= (KG) = 0.50 KG 3.60 1.80
17 TAUFU WF SAKURA ETE 5% ~ 6.00 PCS 1.50 9.00
18 TIMUN JEPUN BARE AA - 2.00 KG 4.80 9.60
19 ZUCCHINI HIJAU E@m(3) - 0.50 KG 4.80 2.40
`;

const po = (id: number, name: string, qty: number, price: number, alias?: string): PoLine => ({
  id, description: name, seller_product_name: name,
  quantity_ordered: qty, unit_price: price,
  ...(alias ? { seller_invoice_name: alias } : {}),
});

const PO_LINES: PoLine[] = [
  po(1,  'Green Chilli Padi(Cili Api Hijau)', 0.40, 12.00),
  po(2,  'Red Chilli Paddi (Small) Cili Api Merah', 0.20, 18.00),
  po(3,  'Red Chilli (Big) Cili Merah', 0.20, 14.00),
  po(4,  'Potato', 0.50, 3.50),
  po(5,  'Green Zucchini', 0.50, 5.80),
  po(6,  'Carrot', 1.00, 3.80),
  po(7,  'Radish', 0.50, 4.80),
  po(8,  'Japanese Cucumber(Timun Jepun)', 2.00, 4.80),
  po(9,  'KingOysterMushroom(Cendawan Kaki)', 3.00, 2.50),
  po(10, 'Cabbage(Kobis China)', 2.00, 3.30),
  po(11, 'Korean Leek', 5.00, 10.00),
  po(12, 'Peeled Garlic(Bawang Putih Kopek)', 5.00, 7.00),
  po(13, 'Yellow Onion', 8.00, 3.20),
  po(14, 'Tofu', 6.00, 1.50),
  po(15, 'Cherry Tomato', 0.50, 16.00),
  po(16, 'Enoki Mushroom', 2.00, 1.00),
  po(17, 'Shallot Unpeeled(Small) Bawang Merah Kecil', 0.70, 3.80),
  po(18, 'Green Beans (Buncis)', 0.20, 9.00),
  po(19, 'Water Spinach', 0.50, 4.80),
];

const parsed = parseInvoiceText(OCR_TEXT);
const byId = (rs: ReturnType<typeof matchInvoiceToPo>, id: number) => rs.find(r => r.poLineId === id)!;

describe('인보이스 매칭 — 자동 채움 전제 계약', () => {
  it('OCR 텍스트에서 19줄을 읽어낸다', () => {
    expect(parsed.length).toBe(19);
  });

  it('(a) 한 인보이스 줄이 두 발주 줄에 붙지 않는다 — 오매칭 0', () => {
    const rs = matchInvoiceToPo(PO_LINES, parsed);
    const used = rs.filter(r => r.parsed).map(r => r.parsed!.raw);
    expect(new Set(used).size).toBe(used.length);   // 중복 배정 없음

    // 청양고추(Cili Api Hijau)에 홍청양(CILI API MERAH) 값이 붙으면 안 된다
    const green = byId(rs, 1);
    expect(green.parsed?.unitPrice).not.toBe(13);
    if (green.parsed) expect(green.parsed.unitPrice).toBe(14);
  });

  it('(b) OCR 이 금액을 잘못 읽은 줄은 «확인 필요» 로 내려간다 (28.00→8.00)', () => {
    const rs = matchInvoiceToPo(
      [...PO_LINES.slice(0, 12), po(13, 'Yellow Onion', 8.00, 3.20, 'BAWANG HOLLAND'), ...PO_LINES.slice(13)],
      parsed);
    const onion = byId(rs, 13);
    expect(onion.parsed).not.toBeNull();
    expect(onion.state).toBe('needs_check');
    expect(onion.reason).toBe('amount_mismatch');
  });

  it('(c) 이름 사전을 넣으면 못 찾던 줄이 붙는다', () => {
    const before = matchInvoiceToPo(PO_LINES, parsed);
    const missing = [13, 14, 19];   // Yellow Onion · Tofu · Water Spinach
    for (const id of missing) expect(byId(before, id).state).toBe('unmatched');

    const withAlias = PO_LINES.map(l =>
      l.id === 14 ? po(14, 'Tofu', 6.00, 1.50, 'TAUFU WF SAKURA')
      : l.id === 19 ? po(19, 'Water Spinach', 0.50, 4.80, 'KANKONG')
      : l);
    const after = matchInvoiceToPo(withAlias, parsed);
    expect(byId(after, 14).state).toBe('matched');
    expect(byId(after, 19).state).toBe('matched');
  });

  it('사전으로 붙어도 금액이 안 맞으면 matched 가 아니다', () => {
    const rs = matchInvoiceToPo([po(13, 'Yellow Onion', 8.00, 3.20, 'BAWANG HOLLAND')], parsed);
    expect(byId(rs, 13).state).toBe('needs_check');
  });

  // ── 자동 채움의 마지막 문 (2026-09-10 Fable 게이트 재판정)
  it('(d) 발주 금액에서 20배 넘게 벗어난 줄은 자동으로 채우지 않는다', () => {
    const line = po(99, 'Peeled Garlic(Bawang Putih Kopek)', 5.00, 7.00);   // 발주 줄 금액 35
    const junk = { raw: 'MBB 5648 7456 6386', name: 'MBB', quantity: 5648, unitPrice: 7456, amount: 6386 };
    const ok = shouldAutoFill(
      { poLineId: 99, parsed: junk, state: 'needs_check', score: 0.4, reason: 'name_unsure' }, line);
    expect(ok).toBe(false);

    // 정상 범위(발주 35 · 청구 38.5)는 통과해야 한다
    const real = { raw: '', name: 'BAWANG PUTIH KOPEK', quantity: 5, unitPrice: 7.7, amount: 38.5 };
    expect(shouldAutoFill(
      { poLineId: 99, parsed: real, state: 'matched', score: 0.9, reason: 'ok' }, line)).toBe(true);
  });

  it('(e) 발주 단가가 0 인 줄에는 «확실한 줄» 만 채운다 — 원가 오염 경로를 막는다', () => {
    const zero = po(98, 'Water Spinach', 0.50, 0);          // 발주 줄 금액 0 → 20배 벽을 못 세운다
    const junk = { raw: '', name: 'MBB', quantity: 5648, unitPrice: 7456, amount: 6386 };
    expect(shouldAutoFill(
      { poLineId: 98, parsed: junk, state: 'needs_check', score: 0.4, reason: 'amount_mismatch' }, zero)).toBe(false);

    // 이름도 확실하고 수량×단가=금액 검산까지 통과한 줄만 들어간다
    const good = { raw: '', name: 'KANKONG', quantity: 0.5, unitPrice: 4.3, amount: 2.15 };
    expect(shouldAutoFill(
      { poLineId: 98, parsed: good, state: 'matched', score: 1, reason: 'ok' }, zero)).toBe(true);
  });

  it('못 찾은 줄은 어떤 경우에도 자동으로 채우지 않는다', () => {
    const line = po(97, 'Potato', 0.50, 3.50);
    expect(shouldAutoFill(
      { poLineId: 97, parsed: null, state: 'unmatched', score: 0, reason: 'no_candidate' }, line)).toBe(false);
  });

  // ── 머리 정보 (2026-09-10 Irene: 「토탈 금액이 여전히 자동으로 안 들어온다」)
  it('(f) 인보이스 번호·일자·총액을 읽어낸다', () => {
    const h = parseInvoiceHeader(OCR_HEADER);
    expect(h.number).toBe('IV-26/09-02369');
    expect(h.date).toBe('2026-09-08');      // 8/9/2026 = 일/월/년 (말레이시아 표기)
    expect(h.total).toBe(186.16);
  });

  it('머리 정보가 없으면 null 을 준다 — 없는 값을 지어내지 않는다', () => {
    const h = parseInvoiceHeader('아무 내용도 없는 줄\n그냥 글자');
    expect(h.number).toBeNull();
    expect(h.date).toBeNull();
    expect(h.total).toBeNull();
  });

  it('사업자등록번호를 인보이스 번호로 착각하지 않는다', () => {
    const h = parseInvoiceHeader('(202201046768(1492465-X))\nINVOICE :IV-26/09-02369');
    expect(h.number).toBe('IV-26/09-02369');
  });
});

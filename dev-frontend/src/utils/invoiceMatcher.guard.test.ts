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
import { parseInvoiceText, parseInvoiceLine, matchInvoiceToPo, shouldAutoFill, parseInvoiceHeader, aliasFor, aliasToRemember, inferNotInvoiced, PoLine } from './invoiceMatcher';

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
    // 2026-11-20 D3(b) — 가격·수량이 같고 양쪽 유일하면 사전 없이도 붙는다(Irene: 가격이 같으면 알아서).
    //   가격이 다른 13·19는 여전히 사전이 있어야 붙는다.
    const missing = [13, 19];   // Yellow Onion · Water Spinach
    for (const id of missing) expect(byId(before, id).state).toBe('unmatched');
    const tofu = byId(before, 14);
    expect(tofu.state).toBe('matched');
    expect(tofu.reason).toBe('same_price');
    expect(tofu.viaAlias).toBeFalsy();
    expect(tofu.parsed!.name).toMatch(/TAUFU WF SAKURA/);

    const withAlias = PO_LINES.map(l =>
      l.id === 14 ? po(14, 'Tofu', 6.00, 1.50, 'TAUFU WF SAKURA')
      : l.id === 19 ? po(19, 'Water Spinach', 0.50, 4.80, 'KANKONG')
      : l);
    const after = matchInvoiceToPo(withAlias, parsed);
    expect(byId(after, 14).state).toBe('matched');
    expect(byId(after, 14).viaAlias).toBe(true);   // 사전 단계가 가격 연결보다 먼저다(순서 계약)
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

// ── 파서 상식 검사 (2026-09-11 Fable 판정)
//   픽스처도 **실제 운영 데이터**다:
//   PO32_OCR   = 운영 발주 32(PO-R10-20260906-002)에 올라온 Guan Kee **손글씨** 인보이스를 같은 무료 OCR
//                (tesseract eng · PDF 144dpi → 긴 변 1800)로 읽은 비어있지 않은 줄 전부.
//   SEOUL_MART = Irene 이 채팅에 붙여 준 서울마트 **인쇄** 인보이스 13줄(마지막 줄 0원).
//   고장주입: parseInvoiceLine 의 상식 검사 블록을 지우면 (g) 가 실패해야 한다(전화번호 줄 1개가 살아난다).
const PO32_OCR = `
INvolck » 2575
Bow om BB
GUAN KEE POULTRY SUPPLIES
TS 81 Taman Tun Dr. Ismail Market. © Kua
Hand Phone: 019-3221326, 0122031628 EMI: quankeepauitry @gmai com
Ap aA SHBBRET i
ae BGH quae Hse vii
Item PARTICULARS ] RM RM
Cn Jal Pw a ay
LA
EE
TT
1
Chicken Wings # % 1 |
Fat Duck re I
eg 0e sep
CETL A
CS I
sen W226 ao
Village Chicken ZR J CO] —
| Chicken Meat & ps Es So ra
| Chicken Breast Meat wio Skin #1 ( Et) BENE
om Chicken Liver [TS To] ERD
b—— L
Toralr| [2 B=
`;

const SEOUL_MART = `
Item Description Qty UOM U/ Price Disc. Total
RM RM
1. +꿀생강차 Honey Ginger Tea -FL-1kg 1.00 Btl 32.00 32.00
2. +부침가루 PanCake Powder -cj- 1kg- 1.00 PKT 10.00 10.00
3. +동서보리차 Barly Tea - dong seo- 300g(30T) 1.00 Pkt 14.00 14.00
4. +고추장 Chili Paste - c j - 14kg 1.00 Tin 138.00 138.00
5. *모짜렐라치즈 Mozzarella Cheese -EMB-2kg 1.00 pkt 93.00 93.00
6. +삼시고운고추가루Fine Chili Powder-SAM--1kg 2.00 pkt 29.00 58.00
7. *월매막걸리 Mak Geol Ri-WM- 1btl 2.00 Btl 16.00 32.00
8. +삼시김치-BOX-SAM KIMCHI -HALAL-10KG 3.00 BOX 48.00 144.00
9. +삼시굵은고추가루Chili Flake-SAM-1kg 3.00 pkt 28.00 84.00
10. **핫이슈밀떡볶이 Hot Issue Rice Cake -1kg- 4.00 Pack 13.00 52.00
11. 마산땅콩캬라멜MASAN PEANUT CARAMEL-500G- 1.00 PACK 26.50 26.50
12. 굴리굴리볼스틱GOOLY GOOLY BALL STICK-500G- 1.00 PACK 18.50 18.50
13. 캔디 CANDY-FREE - 1.00 BILL 0.00 0.00
`;

describe('파서 상식 검사 — 품목 줄이 될 수 없는 숫자는 버린다', () => {
  it('(g) 손글씨 인보이스(운영 발주 32 · Guan Kee) OCR 전문 → 품목 줄 0', () => {
    expect(parseInvoiceText(PO32_OCR)).toEqual([]);
  });

  it('(h) 인쇄 인보이스(서울마트 13줄 · 0원 1줄) → 12줄 그대로', () => {
    expect(parseInvoiceText(SEOUL_MART).length).toBe(12);
  });

  it('전화번호 줄 — 음수 단가·백만 이상 금액은 품목이 아니다', () => {
    expect(parseInvoiceLine('Hand Phone: 019-3221326, 0122031628 EMI: quankeepauitry @gmai com')).toBeNull();
  });

  it('금액 한 자리 오독(3.5배)은 버리지 않는다 — 매칭기가 «확인 필요» 로 보여 줘야 한다', () => {
    const p = parseInvoiceLine('2 XXXXX BAWANG HOLLAND k#7% (KG) . 8.00 KG 3.50 8.00');
    expect(p).not.toBeNull();
    expect(p!.amount).toBe(8);
  });
});


/**
 * 이름 사전 계약 — 2026-09-24 Fable 판정.
 *
 * 고장주입으로 확인하는 법:
 *   ③ 1단계의 양방향 부분집합을 한 방향(사전⊂읽힌줄)으로 되돌리면 (e) 가 실패해야 한다.
 *   ④ `aliasToRemember` 의 viaAlias 분기를 지우면 (g) 가 실패해야 한다.
 *   ⑤ `tokens()` 의 숫자토큰 제거를 빼면 (d) 의 사전에 «2» 가 남아 (d) 가 실패해야 한다.
 */
describe('이름 사전 — 저장과 매칭이 같은 규칙을 본다', () => {
  const DIRTY = '2 XXXXX BAWANG HOLLAND k#7% (KG) .';
  const CLEAN_LINE = 'BAWANG HOLLAND (KG) 8.00 KG 3.50 28.00';

  it('(d) 잡음 줄을 정규화해 저장하면, 깨끗한 줄을 다음에 잡는다', () => {
    const alias = aliasFor(DIRTY);
    expect(alias).toBe('xxxxx bawang holland');   // 줄번호 «2» 가 빠진다

    // ⚠ 한 자리 줄번호는 기존 «길이 2 이상» 필터에 이미 걸린다 — 그래서 **두 자리**로 증명한다.
    //   (숫자토큰 제거를 빼면 여기서 «14»·«17» 이 남아 실패한다. 2026-09-24 고장주입으로 확인.)
    expect(aliasFor('14 XXXXX LEEK KOREA &iE#F (KG) X CANTIK CANTIK  -'))
      .toBe('xxxxx leek korea ie cantik cantik');
    expect(aliasFor('17 TAUFU WF SAKURA ETE 5% ~')).toBe('taufu wf sakura ete');
    const lines = [po(1, 'Yellow Onion', 8, 3.5, alias)];
    const parsed = parseInvoiceText(CLEAN_LINE);
    const m = matchInvoiceToPo(lines, parsed);
    expect(m[0].state).toBe('matched');
    expect(m[0].viaAlias).toBe(true);
  });

  it('(e) 반대 방향 — 사전이 깨끗하고 읽힌 줄이 지저분해도 잡는다', () => {
    const lines = [po(1, 'Yellow Onion', 8, 3.5, 'bawang holland')];
    const parsed = parseInvoiceText('2 XXXXX BAWANG HOLLAND k#7% (KG) . 8.00 KG 3.50 28.00');
    const m = matchInvoiceToPo(lines, parsed);
    expect(m[0].state).toBe('matched');
    expect(m[0].viaAlias).toBe(true);
  });

  it('(f) 다른 물건은 안 잡는다 — 어느 쪽도 부분집합이 아니다', () => {
    const lines = [po(1, 'Red Chilli Padi', 0.2, 13, 'cili api merah')];
    const parsed = parseInvoiceText('7 CILI API HIJAU #1 (KG) 0.40 KG 14.00 5.60');
    const m = matchInvoiceToPo(lines, parsed);
    expect(m[0].viaAlias).toBeFalsy();
  });

  it('(g) 사전으로 붙은 줄은 사전을 덮어쓰지 않는다 — 학습 퇴화 방지', () => {
    expect(aliasToRemember({ parsed: { name: DIRTY }, viaAlias: true })).toBeUndefined();
    // 사람이 직접 고르면 갱신한다(공급업체가 인쇄명을 바꾼 경우)
    expect(aliasToRemember({ parsed: { name: DIRTY }, viaAlias: true }, true)).toBe('xxxxx bawang holland');
    // 사전 없이 점수로 붙은 줄은 그대로 배운다
    expect(aliasToRemember({ parsed: { name: DIRTY }, viaAlias: false })).toBe('xxxxx bawang holland');
  });
});

/**
 * 운영 발주 93 (PO-R10-20261002-001 · LOW SEAT HOONG IV2610-1429) — 2026-11-04 Irene «매칭을 전혀 못해».
 * PDF 첫 장이 «2쪽 중 2쪽»(합계만)이라 첫 장만 읽던 화면이 품목 0줄 → 짝 0. 원인 수정은 `invoiceOcr.ts`(모든 쪽 읽기).
 * 여기서는 같이 드러난 파서 구멍 «- 1 Paket» 의 대시가 수량 −1 로 붙어 줄째 버려지던 것을 지킨다.
 * 고장주입: parseInvoiceLine 의 «음수 수량 부호 떼기» 블록을 지우면 아래 첫 테스트가 실패해야 한다.
 */
describe('발주 93 — 대시가 붙은 수량', () => {
  const LST_PAGE1_HEADER_ONLY = `with MIN Cafe & Dining Page :20f2
Re Ba 3 Gam 10. COpm
a | Total ~ 428.60`;

  it('«- 1 Paket» 이 수량 −1 로 읽혀도 줄이 살아남고 수량은 1 이다', () => {
    const p = parseInvoiceLine("10 1027-001 Black Fungus KE FREX A? DOUBLE DRAGON - 1kg/10pkt/ctn -1 ‘@Paket [] 16.5000 16.50");
    expect(p).not.toBeNull();
    expect(p!.quantity).toBe(1);
    expect(p!.unitPrice).toBe(16.5);
    expect(p!.amount).toBe(16.5);
  });

  it('금액이 음수인 줄(반품)은 여전히 품목 줄로 치지 않는다', () => {
    expect(parseInvoiceLine('Return Black Fungus -1 16.50 -16.50')).toBeNull();
  });

  it('합계만 있는 쪽 글자로는 품목 줄이 거의 없다 — 그래서 모든 쪽을 읽어야 한다', () => {
    const lines = [po(539, 'Black Fungus', 1, 16.5, 'Black Fungus')];
    const m = matchInvoiceToPo(lines, parseInvoiceText(LST_PAGE1_HEADER_ONLY));
    expect(m[0].state).toBe('unmatched');
  });
});

/**
 * 운영 발주 249 (2026-11-20 · LOW SEAT HOONG IV2611-3295 · 2쪽 CamScanner PDF · Fable 설계 D1~D5).
 * 브라우저와 같은 tesseract 자산으로 읽은 글자에서 표 머리줄·품목·합계·번호 줄만 옮겼다(전화·주소·이름 줄 제외).
 *   D1 단위 옆 빈 네모 «[]» 가 «[1» 로 읽혀 수량이 틀렸다(식용유 2→1 · 간장 10→3)
 *   D2 표 밖 «D/Order No. : DO2611-3570» 이 품목 줄로 고르기 목록에 섞였다
 *   D4 «Extra Charges» 는 품목이 아니라 배송비·추가 비용 · D5 후추는 인보이스에 없다
 */
const OCR_249 = `
INVOICE
Account No: 300-W117 Registration No: | Invoice Ne. :[Va611-3295
D/Order No. : DO2611-3570 Jruck No D004-VCQ8631
No. Item Code Description Qty uom U/ Price Total
RM RM
REMARK:
Sub Total | 355.00]
Total 355.00]
D/Order No. : DO2611-3570 | ruck No :D004-VCQ 8631
No. Item Code Description Qty UoM U/ Price Total
RM RM
Storage Met: Dry Goods (Cool Dry Place) F# (4:8 Bis FRA FI)
1 3001-017 Cooking Oil jill 32% ALL DAY - Skg/4tub/ctn . 2 #ETong [1 31.3000 62.60
2 1085-025 Fine Sugar %h#& CSR - 1kg/12pkt/bundle © 10 @Paket [] 2.9000 29.00
3 1024-008Botol Light Soy Sauce (Plastic/B&#8) #£Bk 44H 24710 LKK - 1.9Litre/6btl/ctn - 10  3XBotol [] 13.6000 136.00
4 1059-001 Chicken Stock Powder 3% #&#} 5 5 #% KNORR - 1kg/8pkt/ctn - 2 'Paket [] 19.8000 39.60
5 1022-005 Dark Soy Sauce (Bottle/X I) BS jf £12 CHEONG CHAN - -1 XBotol [] 12.5000 12.50
740ml/12btl/ctn
6 1010-027Paket Sliced Dried Mushroom ZX #542 J E#kE DOUBLE DRAGON - .1 'apPaket [] 40.5000 40.50
1kg/12pkt/ctn
7 1003-002 Monosodium Glutamate Bk¥§ 353X ALL DAY - 1.8kg/pkt - 1 paket [] 18.8000 18.80
8 1139-001 Heavy Duty Garbage Bag (L/32"x40") $f %% PLS-USE-ME - . 1 'dPaket [J 4.3000 4.30
8pcs/S0pkt/ctn
9 1150-003 Rubber Band $F - 500g/pkt - 1 @Paket [] 9.2000 9.20
storage Met: -
0 3011-001 Extra Charges 3i543E 3% 10 Units [1 0.2500 2.50
`;

const PO_249: PoLine[] = [
  po(1663, 'Rubber Band', 1, 9.20, 'Rubber Band'),
  po(1664, 'Heavy Duty Garbage Bag[L Size]', 1, 4.50),
  po(1665, 'Monosodium Glutamate Ajinomoto 1kg', 1, 18.80, 'Monosodium Glutamate Ajinomoto 1kg'),
  po(1666, 'Sliced Dried Mushroom(Shiitake) 1kg', 1, 43.00, 'Sliced Dried Mushroom(Shiitake) 1kg'),
  po(1667, 'Dark Soy Sauce_Cheong Chan 740ml 1022-005', 1, 12.50, 'Dark Soy Sauce_Cheong Chan 740ml 1022-005'),
  po(1668, 'Chicken Stock Powder 鸡精粉 家乐牌 KNORR - 1kg', 2, 19.80, 'Chicken Stock Powder 鸡精粉 家乐牌 KNORR - 1kg'),
  po(1669, 'Light Soy Sauce (Plastic/胶桶) 鲜味生抽 李锦记 LKK - 1.9Litre', 10, 13.60,
    ': 12 1024-008Botol Light Soy Sauce (Plastic/ B&H) GRA $l 2400 LKK - 1.9Litre/6btl/ctn 6'),
  po(1670, 'Fine Sugar CSR - 1kg', 10, 2.90, '13 1085-007 Fine Sugar ###& PRAI - 1kg/24pkt/bundle'),
  po(1671, 'Cooking Oil 清油 SAWIT EMAS - 5kg', 2, 31.00, '| 14 3001-017 Cooking Oil 53 23 ALL DAY - 5kg/4tub/ctn .'),
  po(1672, 'Black Pepper Powder_McCormick', 1, 82.00, 'Black Pepper Powder_McCormick'),
];

describe('발주 249 — 표 구역 · 수량 구제 · 가격 같음 · 추가 비용 · 인보이스에 없음', () => {
  const items = parseInvoiceText(OCR_249);
  const head = parseInvoiceHeader(OCR_249);
  const rs = matchInvoiceToPo(PO_249, items);

  it('D2 품목 9줄 · 표 밖 줄 0 · 9줄 모두 수량×단가=금액', () => {
    expect(items).toHaveLength(9);
    expect(items.some((p) => /D\/Order|Account/i.test(p.raw))).toBe(false);
    for (const p of items) expect(Math.abs(p.quantity! * p.unitPrice! - p.amount!)).toBeLessThanOrEqual(0.01);
  });

  it('D1 빈 네모를 수량으로 읽지 않는다 — 식용유 2 · 간장 10', () => {
    expect(items.find((p) => /Cooking Oil/.test(p.name))!.quantity).toBe(2);
    expect(items.find((p) => /Light Soy/.test(p.name))!.quantity).toBe(10);
  });

  it('D4 추가 비용 2.50 · 총액 355 · 번호에 계좌번호 없음', () => {
    expect(head.charges).toBe(2.5);
    expect(head.total).toBe(355);
    expect(head.number).not.toBe('300-W117');
    expect(items.some((p) => /Extra Charges/i.test(p.name))).toBe(false);
  });

  it('D3 MSG 는 이름이 달라도 가격이 같아 확실 · 식용유는 확인 필요 · 후추는 못 찾음', () => {
    expect(byId(rs, 1665)).toMatchObject({ state: 'matched', reason: 'same_price' });
    expect(byId(rs, 1671).state).toBe('needs_check');
    expect(byId(rs, 1672).state).toBe('unmatched');
    const matched = rs.filter((r) => r.state === 'matched').map((r) => r.poLineId);
    expect(matched).toHaveLength(8);
  });

  it('D5 산수가 맞으면 후추만 «인보이스에 없음» · 줄 합 352.50 + 2.50 = 355.00', () => {
    expect(inferNotInvoiced(rs, PO_249, head)).toEqual([1672]);
    const sum = rs.reduce((s, r) => s + (r.parsed?.amount ?? 0), 0);
    expect(Math.round(sum * 100) / 100).toBe(352.5);
  });

  it('D5 총액이 안 맞으면 아무것도 0 으로 채우지 않는다', () => {
    expect(inferNotInvoiced(rs, PO_249, { total: 400, charges: head.charges })).toEqual([]);
    expect(inferNotInvoiced(rs, PO_249, { total: null, charges: head.charges })).toEqual([]);
  });

  it('D3 같은 가격·수량 줄이 둘이면 어느 것인지 모르므로 붙이지 않는다', () => {
    const text = 'Qty Price Total\nAAA ONE 2 5.00 10.00\nBBB TWO 2 5.00 10.00';
    const lines = [po(1, 'Zeta Widget', 2, 5.00)];
    expect(matchInvoiceToPo(lines, parseInvoiceText(text))[0].state).toBe('unmatched');
    const two = [po(1, 'Zeta Widget', 2, 5.00), po(2, 'Omega Gadget', 2, 5.00)];
    const one = 'Qty Price Total\nAAA ONE 2 5.00 10.00';
    expect(matchInvoiceToPo(two, parseInvoiceText(one)).every((r) => r.state === 'unmatched')).toBe(true);
  });

  it('표 머리줄이 없는 붙여넣기 글은 예전과 같다', () => {
    const pasted = 'Australian Beef Rib 5 43.00 215.00\nExtra Charges 1 5.00 5.00';
    const got = parseInvoiceText(pasted);
    expect(got).toHaveLength(2);
    expect(parseInvoiceHeader(pasted).charges).toBeNull();
  });
});

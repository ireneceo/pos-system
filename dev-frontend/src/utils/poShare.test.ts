/**
 * 발주 공유(WhatsApp/이메일) 문자열 계약 — **공급업체를 향한 계약**이라 테스트로 고정한다.
 *
 * 이 문자열은 매장 밖(공급업체)으로 나간다. 받는 쪽이 자기 창고에서 대조하려면
 * 판매품목명 + SKU 가 주(主)여야 하고, 매핑이 없는 옛 발주도 빈칸이 되면 안 된다.
 * 실발송(window.open / mailto:)은 헤드리스로 관측 불가 → 문자열 계약으로 갈음한다.
 * (2026-08-27 Fable 게이트 지시 4번)
 *
 * ⚠ 2026-09-11 계약 변경 — 아래 기대값은 그때 안 맞춰져 **5건이 실패한 채로 남아 있었다**(2026-09-11 발견·정정).
 *   한 줄 모양: `- 이름  [SKU]  10 kg × 2 carton @ 48.00 = 96.00`
 *   ①수량 앞에 기본포장용량(«10 kg × »), ②가격 앞 기호 «@»(수량에 «×» 가 들어가서), ③줄별 소계 «= 합»,
 *   ④«x» 곱셈 표기·«(ref: 내부명)» 꼬리는 없어졌다(공급업체 문서에서 내부명을 빼기로 한 Irene 지시).
 *   화면 jest 는 verify-all 게이트에 들어 있지 않다 — 프론트 유틸을 고치면 이 파일을 직접 돌릴 것.
 */
import { poItemLines, poItemName, SharePO, groupItemsBySellerCategory, shareSellerOrderViaWhatsApp, shareSellerPackingListViaWhatsApp, sharePoViaWhatsApp, poShareText, sellerOrderShareText, sellerPackingListText } from './poShare';
import { returnShareText, shareReturnViaWhatsApp } from './returnShare';
import { shareTextViaApps } from './appShare';

const fmt = (q: any) => String(q);

describe('poItemLines — 공급업체에게 나가는 품목 줄', () => {
  it('매핑 있음: 판매품목명이 주, SKU 병기, 내부명은 ref 로', () => {
    const po: SharePO = {
      id: 1,
      items: [{
        product_name: 'Demo_Tomato',
        seller_product_name: 'Fresh Tomato',
        seller_product_sku: 'TMT-001',
        quantity_ordered: 3,
        unit_price: '12.00',
      }],
    };
    expect(poItemLines(po, fmt)).toBe('- Fresh Tomato  [TMT-001]  3 @ 12.00 = 36.00');
  });

  it('매핑 없음: 내부명으로 폴백하고 SKU·ref 는 붙지 않는다(옛 발주·외부 판매자)', () => {
    const po: SharePO = {
      id: 2,
      items: [{
        product_name: '돼지고기 목살',
        seller_product_name: null,
        seller_product_sku: null,
        quantity_ordered: 2,
        unit_price: '30.5',
      }],
    };
    expect(poItemLines(po, fmt)).toBe('- 돼지고기 목살  2 @ 30.50 = 61.00');
  });

  it('이름이 같으면 ref 를 생략한다(같은 이름 두 번 쓰지 않는다)', () => {
    const po: SharePO = {
      id: 3,
      items: [{
        product_name: 'Sesame Oil',
        seller_product_name: 'Sesame Oil',
        seller_product_sku: 'SESAME-1L',
        quantity_ordered: 1,
        unit_price: '18',
      }],
    };
    expect(poItemLines(po, fmt)).toBe('- Sesame Oil  [SESAME-1L]  1 @ 18.00 = 18.00');
  });

  it('이름이 아예 없으면 #id 로라도 식별된다', () => {
    const po: SharePO = {
      id: 4,
      items: [{ ingredient_id: 77, quantity_ordered: 1, unit_price: '1' }],
    };
    expect(poItemLines(po, fmt)).toBe('- Item #77  1 @ 1.00 = 1.00');
  });

  it('SKU 만 있고 판매품목명이 없으면 내부명 + SKU (SKU 를 버리지 않는다)', () => {
    const po: SharePO = {
      id: 5,
      items: [{
        product_name: 'Garlic',
        seller_product_name: null,
        seller_product_sku: 'GAR-001',
        quantity_ordered: 5,
        unit_price: '2',
      }],
    };
    expect(poItemLines(po, fmt)).toBe('- Garlic  [GAR-001]  5 @ 2.00 = 10.00');
  });
});

/**
 * 발주 내용의 줄 이름 규칙 — Irene 2026-09-11 「POs에서부터 발주내용이니까 공급업체 이름으로야」.
 * 고장주입: poItemName 이 우리 이름을 먼저 돌려주게 바꾸면 첫 테스트가 실패해야 한다.
 */
describe('poItemName — 발주 품목·입고·반품 줄 이름', () => {
  test('공급업체 상품 이름이 앞, 우리 이름은 뒤', () => {
    expect(poItemName({ seller_product_name: 'MTP 360 (12OZ) PP Plastic Cup', ingredient_name: 'MTP 360 (12OZ) PP Plastic Cup (플라스틱 투명컵)' }))
      .toEqual({ main: 'MTP 360 (12OZ) PP Plastic Cup', sub: 'MTP 360 (12OZ) PP Plastic Cup (플라스틱 투명컵)' });
  });
  test('판매 상품 연결이 없으면(옛 발주·브랜드 판매자) 우리 이름이 앞 · 뒷줄 없음', () => {
    expect(poItemName({ seller_product_name: null, ingredient_name: 'Kimchi (포기김치 10kg)' }))
      .toEqual({ main: 'Kimchi (포기김치 10kg)', sub: '' });
    expect(poItemName({ seller_product_name: '   ', description: 'Corn Syrup (물엿)' }))
      .toEqual({ main: 'Corn Syrup (물엿)', sub: '' });
  });
  test('두 이름이 같으면 뒷줄을 만들지 않는다', () => {
    expect(poItemName({ seller_product_name: 'Egg', ingredient_name: 'Egg' })).toEqual({ main: 'Egg', sub: '' });
  });
  test('빈 값·null 도 견딘다', () => {
    expect(poItemName(null)).toEqual({ main: '', sub: '' });
    expect(poItemName({})).toEqual({ main: '', sub: '' });
  });
});

describe('판매자 주문 — 카테고리 묶음 · 그룹챗 공유 (2026-09-29 Irene)', () => {
  const line = (id: number, name: string, cat: { id: number; name: string; sort_order?: number } | null) => ({
    id, seller_product_name: name, quantity_ordered: 1, unit_price: 10, seller_product_category: cat,
  });
  const MEAT = { id: 2, name: 'Meat', sort_order: 1 };
  const SAUCE = { id: 5, name: 'Sauce', sort_order: 0 };

  test('카테고리 sort_order 순, 없는 줄은 맨 뒤 한 묶음, 묶음 안은 주문 순서 유지', () => {
    const g = groupItemsBySellerCategory([line(1, 'Beef', MEAT), line(2, 'Mystery', null), line(3, 'Soy', SAUCE), line(4, 'Pork', MEAT)]);
    expect(g.map(x => x.name)).toEqual(['Sauce', 'Meat', null]);
    expect(g[1].items.map(i => i.id)).toEqual([1, 4]);
  });

  test('공유 문구: 번호 없이 대화 선택 화면으로, 카테고리 제목·구매처·합계 포함', () => {
    const open = jest.spyOn(window, 'open').mockImplementation(() => null);
    shareSellerOrderViaWhatsApp({
      id: 9, po_number: 'PO-1', currency: 'MYR', total_amount: 30, buyer: { name: 'K-DINE IPC Branch' },
      items: [line(1, 'Beef', MEAT), line(2, 'Mystery', null), line(3, 'Soy', SAUCE)] as any,
    }, fmt, 'Other');
    const url = String(open.mock.calls[0][0]);
    expect(url.startsWith('https://wa.me/?text=')).toBe(true);
    const text = decodeURIComponent(url.split('?text=')[1]);
    expect(text).toContain('*K-DINE IPC Branch*');
    expect(text.indexOf('*Sauce (1)*')).toBeLessThan(text.indexOf('*Meat (1)*'));
    expect(text.indexOf('*Meat (1)*')).toBeLessThan(text.indexOf('*Other (1)*'));
    expect(text).toContain('*Items: 3 · TOTAL: RM 30.00*');
    open.mockRestore();
  });
  // 2026-10-05 Irene 「가격말고 딱 일하게 배송준비해야하는 정보만」 「지금 보기가 너무 정신없어. 스탭에게는」
  test('배송 준비 목록: 가격·합계·SKU 없음 · 굵게는 머리글·카테고리만 · 품목은 «이름 — 수량»', () => {
    const open = jest.spyOn(window, 'open').mockImplementation(() => null);
    shareSellerPackingListViaWhatsApp({
      id: 9, po_number: 'PO-1', currency: 'MYR', total_amount: 30, buyer: { name: 'K-DINE IPC Branch' },
      delivery_address: '2, Jalan PJU 7/2',
      items: [{ ...line(1, 'Beef', MEAT), unit: 'kg', quantity_ordered: 2, seller_product_sku: 'PRD-020' }, line(3, 'Soy', SAUCE)] as any,
    }, fmt, 'Other');
    const text = decodeURIComponent(String(open.mock.calls[0][0]).split('?text=')[1]);
    expect(text).toContain('*PACKING* PO-1');
    expect(text).toContain('Deliver to: 2, Jalan PJU 7/2');
    expect(text).toContain('*Meat*');
    expect(text).toContain('- Beef — 2 kg');
    expect(text).not.toMatch(/RM|@|TOTAL|PRD-020|= /);
    expect(text).not.toContain('*Beef*');
    expect(text).toContain('Items: 2');
    open.mockRestore();
  });
});

// 2026-10-30 Irene «발주할 때 … 왓츠앱으로 보내기처럼 카톡으로 보내기도 가능해?» → «권고대로»(A: 공유하기 창·PC 는 복사)
describe('카톡·다른 앱 — 왓츠앱과 같은 글에서 굵게(*)만 뺀다', () => {
  const po: SharePO = {
    id: 7, po_number: 'PO-77', currency: 'MYR', total_amount: 36, seller: { name: 'Fresh Co', phone: '+60 12-345 6789' },
    items: [{ seller_product_name: 'Fresh Tomato', seller_product_sku: 'TMT-001', quantity_ordered: 3, unit_price: '12.00' }],
  };
  const unbold = (s: string) => s.replace(/\*/g, '');

  test('발주: 왓츠앱 글 = 카톡 글 + 굵게 · 왓츠앱은 업체 번호로', () => {
    const open = jest.spyOn(window, 'open').mockImplementation(() => null);
    sharePoViaWhatsApp(po, fmt);
    const url = String(open.mock.calls[0][0]);
    expect(url.startsWith('https://wa.me/60123456789?text=')).toBe(true);
    const wa = decodeURIComponent(url.split('?text=')[1]);
    const plain = poShareText(po, fmt);
    expect(wa).toContain('*PURCHASE ORDER*');
    expect(plain).not.toContain('*');
    expect(unbold(wa)).toBe(plain);
    expect(plain).toContain('- Fresh Tomato  [TMT-001]  3 @ 12.00 = 36.00');
    expect(plain).toContain('TOTAL: RM 36.00');
    open.mockRestore();
  });

  test('받은 주문·배송 준비: 굵게만 다르다', () => {
    const open = jest.spyOn(window, 'open').mockImplementation(() => null);
    const so = { ...po, buyer: { name: 'K-DINE' }, items: [{ ...po.items![0], seller_product_category: { id: 1, name: 'Veg' } }] };
    shareSellerOrderViaWhatsApp(so, fmt, 'Other');
    shareSellerPackingListViaWhatsApp(so, fmt, 'Other');
    const [a, b] = open.mock.calls.map(c => decodeURIComponent(String(c[0]).split('?text=')[1]));
    expect(unbold(a)).toBe(sellerOrderShareText(so, fmt, 'Other'));
    expect(unbold(b)).toBe(sellerPackingListText(so, fmt, 'Other'));
    expect(sellerOrderShareText(so, fmt, 'Other')).not.toContain('*');
    open.mockRestore();
  });

  test('반품: 굵게만 다르다', () => {
    const open = jest.spyOn(window, 'open').mockImplementation(() => null);
    const r = { po_number: 'PO-77', currency: 'MYR', seller: { name: 'Fresh Co', phone: '0123' }, lines: [{ name: 'Fresh Tomato', quantity: 1, unit: 'kg', unit_price: 12, reason: 'damaged' }] };
    shareReturnViaWhatsApp(r);
    const wa = decodeURIComponent(String(open.mock.calls[0][0]).split('?text=')[1]);
    expect(unbold(wa)).toBe(returnShareText(r));
    expect(returnShareText(r)).toContain('RETURN REQUEST');
    open.mockRestore();
  });
});

describe('shareTextViaApps — 휴대폰은 공유하기 창, PC 는 복사', () => {
  const setPointer = (coarse: boolean) => {
    (window as any).matchMedia = (q: string) => ({ matches: coarse && q.includes('coarse') });
  };
  afterEach(() => { delete (navigator as any).share; delete (navigator as any).clipboard; });

  test('휴대폰 + 공유하기 있음 → 공유하기 창에 글 그대로', async () => {
    setPointer(true);
    const share = jest.fn().mockResolvedValue(undefined);
    (navigator as any).share = share;
    expect(await shareTextViaApps('hello', 'PO-1')).toBe('shared');
    expect(share).toHaveBeenCalledWith({ title: 'PO-1', text: 'hello' });
  });

  test('휴대폰에서 취소 → cancelled (복사 안 함)', async () => {
    setPointer(true);
    (navigator as any).share = jest.fn().mockRejectedValue(Object.assign(new Error('x'), { name: 'AbortError' }));
    const writeText = jest.fn().mockResolvedValue(undefined);
    (navigator as any).clipboard = { writeText };
    expect(await shareTextViaApps('hello')).toBe('cancelled');
    expect(writeText).not.toHaveBeenCalled();
  });

  test('PC(공유하기 있어도) → 복사', async () => {
    setPointer(false);
    const share = jest.fn();
    (navigator as any).share = share;
    const writeText = jest.fn().mockResolvedValue(undefined);
    (navigator as any).clipboard = { writeText };
    expect(await shareTextViaApps('hello')).toBe('copied');
    expect(share).not.toHaveBeenCalled();
    expect(writeText).toHaveBeenCalledWith('hello');
  });

  test('복사도 못 하면 failed', async () => {
    setPointer(false);
    (navigator as any).clipboard = { writeText: jest.fn().mockRejectedValue(new Error('denied')) };
    (document as any).execCommand = () => false;
    expect(await shareTextViaApps('hello')).toBe('failed');
  });
});

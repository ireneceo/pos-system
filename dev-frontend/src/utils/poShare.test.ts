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
import { poItemLines, poItemName, SharePO } from './poShare';

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

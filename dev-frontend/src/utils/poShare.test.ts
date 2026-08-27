/**
 * 발주 공유(WhatsApp/이메일) 문자열 계약 — **공급업체를 향한 계약**이라 테스트로 고정한다.
 *
 * 이 문자열은 매장 밖(공급업체)으로 나간다. 받는 쪽이 자기 창고에서 대조하려면
 * 판매품목명 + SKU 가 주(主)여야 하고, 매핑이 없는 옛 발주도 빈칸이 되면 안 된다.
 * 실발송(window.open / mailto:)은 헤드리스로 관측 불가 → 문자열 계약으로 갈음한다.
 * (2026-08-27 Fable 게이트 지시 4번)
 */
import { poItemLines, SharePO } from './poShare';

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
    expect(poItemLines(po, fmt)).toBe('- Fresh Tomato [TMT-001] x 3 @ 12.00 (ref: Demo_Tomato)');
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
    expect(poItemLines(po, fmt)).toBe('- 돼지고기 목살 x 2 @ 30.50');
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
    expect(poItemLines(po, fmt)).toBe('- Sesame Oil [SESAME-1L] x 1 @ 18.00');
  });

  it('이름이 아예 없으면 #id 로라도 식별된다', () => {
    const po: SharePO = {
      id: 4,
      items: [{ ingredient_id: 77, quantity_ordered: 1, unit_price: '1' }],
    };
    expect(poItemLines(po, fmt)).toBe('- Item #77 x 1 @ 1.00');
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
    expect(poItemLines(po, fmt)).toBe('- Garlic [GAR-001] x 5 @ 2.00');
  });
});

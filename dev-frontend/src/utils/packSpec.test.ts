/**
 * 발주 «용량 · 포장단위 × 수량» 화면 규칙 (2026-09-11)
 *
 * Irene: 「발주할 때 기본용량 포장단위가 있고 거기에 수량이 올라가는 거잖아. 수량에 포장단위가 붙는거고.」
 * 서버 dev-backend/utils/poLineSpec.js 와 **같은 답**을 내야 한다 — 담는 화면이 보여준 것과
 * 발주 줄·PDF·WhatsApp 에 찍히는 것이 갈리면 공급업체가 다른 물건을 보낸다.
 */
import { sellerOrderUnitOf, sellerSpecText, lineSpecText, defaultLinkConversion } from './unitConversion';
import { poItemLines } from './poShare';

describe('판매 상품 → 수량 단위·용량 문구', () => {
  it('포장단위가 있으면 수량 단위는 포장단위, 용량은 «10 kg/BOX»', () => {
    const s = { seller_unit: 'kg', base_quantity: 10, seller_package_unit: 'BOX', order_mode: 'pack' };
    expect(sellerOrderUnitOf(s)).toBe('BOX');
    expect(sellerSpecText(s)).toBe('10 kg/BOX');
  });

  it('포장단위가 없고 용량이 1 이 아니면 pack', () => {
    const s = { seller_unit: 'kg', base_quantity: '10.00', seller_package_unit: null, order_mode: 'pack' };
    expect(sellerOrderUnitOf(s)).toBe('pack');
    expect(sellerSpecText(s)).toBe('10 kg/pack');
  });

  it('1 kg 단위 판매는 예전처럼 kg, 용량 문구 없음(9/7 «2 g» 재발 방지)', () => {
    const s = { seller_unit: 'kg', base_quantity: 1, seller_package_unit: null, order_mode: 'pack' };
    expect(sellerOrderUnitOf(s, 'g')).toBe('kg');
    expect(sellerSpecText(s, 'g')).toBe('');
  });

  it('포장단위 pack + 1 kg → «1 kg/pack»', () => {
    const s = { seller_unit: 'kg', base_quantity: 1, seller_package_unit: 'pack', order_mode: 'pack' };
    expect(sellerSpecText(s)).toBe('1 kg/pack');
  });

  it('무게로 주문(measure)은 kg 자체가 수량 단위, 용량 문구 없음', () => {
    const s = { seller_unit: 'kg', base_quantity: 10, seller_package_unit: 'BOX', order_mode: 'measure' };
    expect(sellerOrderUnitOf(s)).toBe('kg');
    expect(sellerSpecText(s)).toBe('');
  });

  it('판매자 단위가 없으면 우리 재고 단위로 폴백', () => {
    expect(sellerOrderUnitOf({}, 'g')).toBe('g');
    expect(sellerOrderUnitOf(null, 'g')).toBe('g');
  });
});

describe('확정 발주 줄 — 저장된 스냅샷만 읽는다', () => {
  it('«10 kg/BOX»', () => {
    expect(lineSpecText({ base_quantity: '10.00', base_unit: 'kg', unit: 'BOX' })).toBe('10 kg/BOX');
  });
  it('옛 줄(스냅샷 없음)은 빈 문자열', () => {
    expect(lineSpecText({ unit: 'kg' })).toBe('');
    expect(lineSpecText({ base_quantity: null, base_unit: 'kg', unit: 'BOX' })).toBe('');
  });
});

describe('WhatsApp/메일 줄 — 공급업체에게 나가는 문자열', () => {
  const fmt = (q: any) => String(Number(q));
  it('용량이 이름 뒤 괄호로 붙고 수량에 포장단위가 붙는다', () => {
    const line = poItemLines({ id: 1, items: [{
      seller_product_name: 'SAM KIMCHI', quantity_ordered: 3, unit: 'BOX', unit_price: '48',
      base_quantity: '10.00', base_unit: 'kg',
    }] }, fmt);
    expect(line).toBe('- SAM KIMCHI (10 kg/BOX)  3 BOX × 48.00 = 144.00');
  });
  it('스냅샷 없는 옛 줄은 괄호 없이 그대로', () => {
    const line = poItemLines({ id: 2, items: [{
      seller_product_name: 'Soju', quantity_ordered: 1, unit: 'bottle', unit_price: '17',
    }] }, fmt);
    expect(line).toBe('- Soju  1 bottle × 17.00 = 17.00');
  });
});

// 외부 공급업체 등록 창의 재고 환산 기본값 (2026-09-11 Fable 판정)
//   고장주입: defaultLinkConversion 이 늘 1 을 돌려주게 바꾸면 아래 앞의 두 건이 실패해야 한다
//   (= 예전 «unit_conversion: 1 고정» 으로 10 kg 박스 3개 입고가 재고 +3 이 되던 상태).
describe('외부 공급업체 연결 — 재고 환산 기본값', () => {
  it('같은 단위 → 용량 그대로 (10 kg BOX · 재고 kg → 10)', () => {
    expect(defaultLinkConversion(10, 'kg', 'kg')).toBe(10);
  });
  it('변환되는 단위 → 환산 (10 kg BOX · 재고 g → 10000)', () => {
    expect(defaultLinkConversion('10', 'kg', 'g')).toBe(10000);
  });
  it('변환할 수 없는 조합 → null (사람이 반드시 적는다)', () => {
    expect(defaultLinkConversion(1, 'tray', 'kg')).toBeNull();
    expect(defaultLinkConversion(1, 'bottle', 'ml')).toBeNull();
    expect(defaultLinkConversion(0, 'kg', 'kg')).toBeNull();
  });
});

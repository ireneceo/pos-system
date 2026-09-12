/**
 * 발주 «용량 · 포장단위 × 수량» 화면 규칙 (2026-09-11)
 *
 * Irene: 「발주할 때 기본용량 포장단위가 있고 거기에 수량이 올라가는 거잖아. 수량에 포장단위가 붙는거고.」
 * 서버 dev-backend/utils/poLineSpec.js 와 **같은 답**을 내야 한다 — 담는 화면이 보여준 것과
 * 발주 줄·PDF·WhatsApp 에 찍히는 것이 갈리면 공급업체가 다른 물건을 보낸다.
 */
import { sellerOrderUnitOf, sellerSpecText, sellerSpecLabel, stockSpecLabel, lineSpecText, lineQtyText, defaultLinkConversion, withCurrentUnit, CONTENT_UNIT_OPTIONS } from './unitConversion';
import { poItemLines, supplierFacingName } from './poShare';

// 2026-09-11 Irene 「붙여두고 알기 쉽게 좀 안돼? 1kg/pack 이런식으로」 · 「fable 권고대로」(공급업체 문서 영문만)
describe('상품 카드 규격 한 줄 · 공급업체 문서 이름', () => {
  it('용량 문구가 있으면 그것, 없으면 수량 단위 하나', () => {
    expect(sellerSpecLabel({ seller_unit: 'kg', base_quantity: 1, seller_package_unit: 'pack', order_mode: 'pack' })).toBe('1 kg/pack');
    expect(sellerSpecLabel({ seller_unit: 'pack', base_quantity: 1, seller_package_unit: 'pack', order_mode: 'pack' })).toBe('1 pack');
    expect(sellerSpecLabel({ seller_unit: 'kg', base_quantity: 1, seller_package_unit: null, order_mode: 'measure' })).toBe('kg');
  });
  // 2026-09-11 Fable — 용량 미상 개수 상품은 취급단위 piece · 용량 1 · 포장 이름. «1 piece/bottle» 이 아니라 «1 bottle».
  //   고장주입: sellerSpecText 의 `su === 'piece'` 접기를 지우면 아래 앞의 두 줄이 실패해야 한다.
  it('용량 1 · piece · 포장단위 → «1 bottle» 로 접는다', () => {
    const s = { seller_unit: 'piece', base_quantity: 1, seller_package_unit: 'bottle', order_mode: 'pack' };
    expect(sellerSpecText(s)).toBe('');
    expect(sellerSpecLabel(s)).toBe('1 bottle');
    expect(lineSpecText({ base_quantity: '1.00', base_unit: 'piece', unit: 'bottle' })).toBe('');
    // 개수 표기는 원래대로
    expect(sellerSpecText({ seller_unit: 'piece', base_quantity: 50, seller_package_unit: 'box', order_mode: 'pack' })).toBe('50 piece/box');
  });
  it('재료·재고아이템 자기 규격 — 옛 데이터 모양도 깨지지 않는다', () => {
    expect(stockSpecLabel({ unit: 'g', base_quantity: 2000, package_unit: 'pack', package_quantity: 1 })).toBe('2000 g/pack');
    expect(stockSpecLabel({ unit: 'g', base_quantity: '20.00', package_unit: 'pack', package_quantity: '1.00' })).toBe('20 g/pack');
    expect(stockSpecLabel({ unit: 'pack', base_quantity: 1, package_unit: 'pack', package_quantity: 1 })).toBe('1 pack');
    expect(stockSpecLabel({ unit: 'pack', base_quantity: 1, package_unit: null, package_quantity: null })).toBe('1 pack');
    expect(stockSpecLabel({ unit: 'kg', base_quantity: 1, package_unit: 'kg', package_quantity: 1 })).toBe('1 kg');
    expect(stockSpecLabel({ unit: 'ml', base_quantity: 1980, package_unit: 'bottle', package_quantity: 6 })).toBe('1980 ml/6 bottle');
    expect(stockSpecLabel({ unit: null })).toBe('');
  });
  it('옛 상품의 포장 이름 단위는 선택지에 남는다', () => {
    expect(withCurrentUnit(CONTENT_UNIT_OPTIONS, 'pack')).toEqual(['kg', 'g', 'L', 'ml', 'piece', 'pack']);
    expect(withCurrentUnit(CONTENT_UNIT_OPTIONS, 'kg')).toEqual(CONTENT_UNIT_OPTIONS);
  });
  // 서버 tests/supplier-facing-name.test.js 와 같은 사례
  it('끝의 한글 괄호만 뗀다', () => {
    expect(supplierFacingName('Carrot (당근)')).toBe('Carrot');
    expect(supplierFacingName('Green Chilli Padi(Cili Api Hijau) (청양고추(칠리파디))')).toBe('Green Chilli Padi(Cili Api Hijau)');
    expect(supplierFacingName('Chicken Chop L(260~280g)')).toBe('Chicken Chop L(260~280g)');
    expect(supplierFacingName('Gochujang_해찬들태양초알찬')).toBe('Gochujang_해찬들태양초알찬');
  });
  // Irene 2026-09-11 「원래 공급업체 아이템 이름이랑 우리 재고아이템 이름 달라」「New Seoul Mart 만 영어(한글) 그대로」
  it('WhatsApp 줄 — 판매 상품 이름은 저장된 그대로, 연결 없는 줄의 우리 재고 이름만 한글을 뗀다', () => {
    const fmt = (q: any) => String(Number(q));
    const nsm = poItemLines({ id: 3, items: [{
      seller_product_name: 'Kimchi (포기김치)', quantity_ordered: 2, unit: 'box', unit_price: '48',
      base_quantity: '10.00', base_unit: 'kg',
    }] }, fmt);
    expect(nsm).toBe('- Kimchi (포기김치)  10 kg × 2 box @ 48.00 = 96.00');
    const unlinked = poItemLines({ id: 4, items: [{
      seller_product_name: null, ingredient_name: 'Carrot (당근)', quantity_ordered: 1, unit: 'kg', unit_price: '4',
    }] }, fmt);
    expect(unlinked).toBe('- Carrot  1 kg @ 4.00 = 4.00');
  });
});

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
    expect(line).toBe('- SAM KIMCHI  10 kg × 3 BOX @ 48.00 = 144.00');
  });
  it('스냅샷 없는 옛 줄은 수량과 단위만', () => {
    const line = poItemLines({ id: 2, items: [{
      seller_product_name: 'Soju', quantity_ordered: 1, unit: 'bottle', unit_price: '17',
    }] }, fmt);
    expect(line).toBe('- Soju  1 bottle @ 17.00 = 17.00');
  });
  // Irene 2026-09-11 「1 kg X 2pack 발주할 때 내역은 이렇게 나오면 되지. 1kg/pack 이 표기는 아이템/상품 정보에」
  //   고장주입: lineBaseText 가 늘 '' 를 돌려주게 바꾸면 아래 첫 줄과 위 SAM KIMCHI 가 실패해야 한다.
  it('발주 내역 수량 «기본포장용량 × 수량 포장단위»', () => {
    expect(lineQtyText({ base_quantity: '10.00', base_unit: 'kg', unit: 'carton' }, '2.00')).toBe('10 kg × 2 carton');
    expect(lineQtyText({ base_quantity: '1.00', base_unit: 'kg', unit: 'pack' }, 2)).toBe('1 kg × 2 pack');
    expect(lineQtyText({ base_quantity: null, base_unit: null, unit: 'kg' }, '1.50')).toBe('1.5 kg');
    expect(lineQtyText({ base_quantity: '1.00', base_unit: 'piece', unit: 'bottle' }, 3)).toBe('3 bottle');
    expect(lineQtyText({ unit: null }, 2, 'g')).toBe('2 g');
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

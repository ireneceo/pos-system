/**
 * 발주 줄 «용량 · 포장단위» 서버 규칙 — 화면 dev-frontend/src/utils/packSpec.test.ts 와 같은 답 (2026-09-11)
 * Fable: 용량 미상 개수 상품은 취급단위 piece · 용량 1 · 포장 이름 → 스냅샷 없이 «× 2 bottle».
 * 고장주입: poLineSpec.js 의 `lower(sp.unit) === 'piece'` 접기를 지우면 두 번째 테스트가 실패해야 한다.
 */
const { sellerOrderLine, lineSpecText, lineQtyText } = require('../utils/poLineSpec');

// Irene 2026-09-11 「1 kg X 2pack 발주할 때 내역은 이렇게」 — 화면 packSpec.test.ts 와 같은 사례
describe('lineQtyText — 발주 내역 «기본포장용량 × 수량 포장단위»', () => {
  test('용량 스냅샷이 있으면 «10 kg × 2 carton»', () => {
    expect(lineQtyText({ base_quantity: '10.00', base_unit: 'kg', unit: 'carton' }, '2.00')).toBe('10 kg × 2 carton');
    expect(lineQtyText({ base_quantity: '1.00', base_unit: 'kg', unit: 'pack' }, 2)).toBe('1 kg × 2 pack');
  });
  test('옛 줄·무게 주문·«1 piece» 는 수량과 단위만', () => {
    expect(lineQtyText({ base_quantity: null, base_unit: null, unit: 'kg' }, '1.50')).toBe('1.5 kg');
    expect(lineQtyText({ base_quantity: '1.00', base_unit: 'piece', unit: 'bottle' }, 3)).toBe('3 bottle');
    expect(lineQtyText({ unit: null }, 2, 'g')).toBe('2 g');
  });
});

describe('poLineSpec', () => {
  test('10 kg/BOX 는 그대로 스냅샷', () => {
    expect(sellerOrderLine({ unit: 'kg', base_quantity: '10.00', package_unit: 'BOX', order_mode: 'pack' }, null))
      .toEqual({ unit: 'BOX', base_quantity: 10, base_unit: 'kg' });
    expect(lineSpecText({ base_quantity: '10.00', base_unit: 'kg', unit: 'BOX' })).toBe('10 kg/BOX');
  });
  test('용량 1 · piece · 포장단위 → 스냅샷 없음, 문구 없음', () => {
    expect(sellerOrderLine({ unit: 'piece', base_quantity: '1.00', package_unit: 'bottle', order_mode: 'pack' }, null))
      .toEqual({ unit: 'bottle', base_quantity: null, base_unit: null });
    expect(lineSpecText({ base_quantity: '1.00', base_unit: 'piece', unit: 'bottle' })).toBe('');
  });
  test('개수 표기(50 piece/box)는 원래대로', () => {
    expect(sellerOrderLine({ unit: 'piece', base_quantity: 50, package_unit: 'box', order_mode: 'pack' }, null))
      .toEqual({ unit: 'box', base_quantity: 50, base_unit: 'piece' });
  });
  test('무게 주문은 kg 자체', () => {
    expect(sellerOrderLine({ unit: 'kg', base_quantity: 1, package_unit: null, order_mode: 'measure' }, null))
      .toEqual({ unit: 'kg', base_quantity: null, base_unit: null });
  });
});

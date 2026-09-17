/**
 * 발주 총액 · 배송비 공식 (2026-09-17 Fable 판정 ⑦)
 *
 *   total_amount = subtotal + tax_amount + delivery_fee
 *
 * 경계 위주로 잠근다. 이 파일이 깨지면 발주 금액이 바뀐 것이다.
 */
const {
  computeDeliveryFee,
  computePurchaseOrderTotals,
  computeSubtotal,
  describeDeliveryTerms,
  amountToFreeDelivery
} = require('../utils/purchaseOrderTotals');

const items = (...pairs) => pairs.map(([q, p]) => ({ quantity_ordered: q, unit_price: p }));

describe('배송비 규칙 — 판매자 두 칸', () => {
  test('미설정(delivery_fee=null) 은 규칙 미적용 = 0 이고 «무료»가 아니다', () => {
    const r = computeDeliveryFee(250, { delivery_fee: null, min_order_amount: 300 });
    expect(r.fee).toBe(0);
    expect(r.basis.rule).toBe('unset');
    expect(describeDeliveryTerms({ delivery_fee: null }).kind).toBe('unset');
  });

  test('delivery_fee=0 은 «무료배송»', () => {
    const r = computeDeliveryFee(10, { delivery_fee: 0 });
    expect(r.fee).toBe(0);
    expect(r.basis.rule).toBe('free');
    expect(describeDeliveryTerms({ delivery_fee: 0 }).kind).toBe('free');
  });

  test('기준선이 없으면 항상 고정 배송비', () => {
    const r = computeDeliveryFee(1000, { delivery_fee: 15, min_order_amount: null });
    expect(r.fee).toBe(15);
    expect(r.basis.rule).toBe('always');
  });

  test('기준 미만이면 고정액, 기준 «이상»이면 무료 (경계 = 이상 무료)', () => {
    const terms = { delivery_fee: 15, min_order_amount: 300 };
    expect(computeDeliveryFee(299.99, terms).fee).toBe(15);
    expect(computeDeliveryFee(300, terms).fee).toBe(0);
    expect(computeDeliveryFee(300.01, terms).fee).toBe(0);
    expect(computeDeliveryFee(300, terms).basis.rule).toBe('free_threshold_met');
  });

  test('판매자 통화와 발주 통화가 다르면 규칙 미적용 + 근거에 기록', () => {
    const r = computeDeliveryFee(100, { delivery_fee: 15, min_order_amount: 300, currency: 'SGD' },
      { orderCurrency: 'MYR' });
    expect(r.fee).toBe(0);
    expect(r.basis.rule).toBe('currency_mismatch');
  });

  test('음수 배송비는 부과하지 않는다', () => {
    const r = computeDeliveryFee(100, { delivery_fee: -5 });
    expect(r.fee).toBe(0);
    expect(r.basis.rule).toBe('invalid_negative');
  });

  test('«얼마 더 담으면 무료» — 미달일 때만 숫자', () => {
    const terms = { delivery_fee: 15, min_order_amount: 300 };
    expect(amountToFreeDelivery(260, terms)).toBe(40);
    expect(amountToFreeDelivery(300, terms)).toBeNull();
    expect(amountToFreeDelivery(10, { delivery_fee: null })).toBeNull();
    expect(amountToFreeDelivery(10, { delivery_fee: 15 })).toBeNull(); // 기준선 없음 = 항상 부과
  });
});

describe('발주 총액', () => {
  test('품목 합계는 줄마다 반올림해 더한다', () => {
    expect(computeSubtotal(items([3, 4.005], [1, 2]))).toBe(14.02);
  });

  test('총액 = 품목합계 + 세금 + 배송비', () => {
    const t = computePurchaseOrderTotals(items([1, 250]), { delivery_fee: 15, tax_amount: 0 });
    expect(t.subtotal).toBe(250);
    expect(t.delivery_fee).toBe(15);
    expect(t.total_amount).toBe(265);
  });

  test('배송비가 없으면 총액은 품목 합계와 같다 (기존 발주 38건의 불변식)', () => {
    const t = computePurchaseOrderTotals(items([2, 12.5], [1, 3]));
    expect(t.subtotal).toBe(28);
    expect(t.delivery_fee).toBe(0);
    expect(t.total_amount).toBe(28);
  });

  test('Fable 이 정한 실호출 수치와 같다 (250→265 · 300→300 · 299.99→314.99)', () => {
    const terms = { delivery_fee: 15, min_order_amount: 300 };
    const cases = [[250, 265], [300, 300], [299.99, 314.99]];
    for (const [sub, expected] of cases) {
      const { fee } = computeDeliveryFee(sub, terms);
      expect(computePurchaseOrderTotals(items([1, sub]), { delivery_fee: fee }).total_amount).toBe(expected);
    }
  });

  test('품목이 없으면 0', () => {
    expect(computePurchaseOrderTotals([]).total_amount).toBe(0);
  });
});

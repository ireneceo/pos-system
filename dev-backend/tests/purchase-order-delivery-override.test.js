/**
 * 셀프픽업 · 판매자 배송비 면제 (2026-11-20 Fable 설계 D2·D3 · 검증 U1~U7)
 *
 * computeTotalsWithDelivery 한 곳에서만 0 처리한다. 판매자 조회는 가짜로 바꿔
 * «배송비 10 · 100 이상 무료» 판매자를 돌려준다.
 */
jest.mock('../utils/sellerNames', () => ({
  resolveSellers: async () => ({}),
  getSeller: () => ({ delivery_fee: 10, min_order_amount: 100, currency: 'MYR', delivery_zones: null })
}));

const { computeTotalsWithDelivery, resolveSellerDeliveryTerms } = require('../utils/purchaseOrderTotals');

const items = (...pairs) => pairs.map(([q, p]) => ({ quantity_ordered: q, unit_price: p }));
const SELLER = { seller_type: 'brand', seller_entity_id: 10, entity_type: 'restaurant', entity_id: 38 };
const OPTS = { orderCurrency: 'MYR' };

describe('배송비 덮어쓰기 — 셀프픽업 · 판매자 면제', () => {
  test('U1 기본(배송) 은 지금과 같다 — 51.60 + 10 = 61.60', async () => {
    const t = await computeTotalsWithDelivery(items([1, 51.6]), SELLER, OPTS);
    expect(t.subtotal).toBe(51.6);
    expect(t.delivery_fee).toBe(10);
    expect(t.total_amount).toBe(61.6);
    expect(t.delivery_fee_basis.rule).toBe('below_threshold');
  });

  test('U2 pickup → 0 · 근거 pickup · 원래 10', async () => {
    const t = await computeTotalsWithDelivery(items([1, 51.6]), SELLER, { ...OPTS, delivery_method: 'pickup' });
    expect(t.delivery_fee).toBe(0);
    expect(t.total_amount).toBe(51.6);
    expect(t.delivery_fee_basis.rule).toBe('pickup');
    expect(t.delivery_fee_basis.rule_without_override).toBe('below_threshold');
    expect(t.delivery_fee_basis.fee_without_override).toBe(10);
  });

  test('U3 waived → 0 · 근거 waived_by_seller', async () => {
    const t = await computeTotalsWithDelivery(items([1, 51.6]), SELLER, { ...OPTS, delivery_fee_waived: true });
    expect(t.delivery_fee).toBe(0);
    expect(t.delivery_fee_basis.rule).toBe('waived_by_seller');
    expect(t.delivery_fee_basis.fee_without_override).toBe(10);
  });

  test('U4 pickup + waived → 근거 pickup', async () => {
    const t = await computeTotalsWithDelivery(items([1, 51.6]), SELLER,
      { ...OPTS, delivery_method: 'pickup', delivery_fee_waived: true });
    expect(t.delivery_fee).toBe(0);
    expect(t.delivery_fee_basis.rule).toBe('pickup');
  });

  test('U5 po 형태 객체를 판매자 인자로 넘겨도 0 (DB 의 TINYINT 1 포함)', async () => {
    const a = await computeTotalsWithDelivery(items([1, 51.6]), { ...SELLER, delivery_method: 'pickup' }, OPTS);
    expect(a.delivery_fee).toBe(0);
    const b = await computeTotalsWithDelivery(items([1, 51.6]), { ...SELLER, delivery_fee_waived: 1 }, OPTS);
    expect(b.delivery_fee).toBe(0);
    expect(b.delivery_fee_basis.rule).toBe('waived_by_seller');
  });

  test('U6 opts 값이 po 값보다 우선', async () => {
    const po = { ...SELLER, delivery_method: 'pickup', delivery_fee_waived: true };
    const t = await computeTotalsWithDelivery(items([1, 51.6]), po,
      { ...OPTS, delivery_method: 'delivery', delivery_fee_waived: false });
    expect(t.delivery_fee).toBe(10);
    expect(t.total_amount).toBe(61.6);
  });

  test('U7 기준 이상(120) 에서 waived → 0 · 원래도 0', async () => {
    const t = await computeTotalsWithDelivery(items([1, 120]), SELLER, { ...OPTS, delivery_fee_waived: true });
    expect(t.delivery_fee).toBe(0);
    expect(t.delivery_fee_basis.fee_without_override).toBe(0);
    expect(t.delivery_fee_basis.rule_without_override).toBe('free_threshold_met');
  });

  test('이상한 값(문자열 «yes»·«PICKUP») 은 덮어쓰지 않는다', async () => {
    const t = await computeTotalsWithDelivery(items([1, 51.6]), SELLER,
      { ...OPTS, delivery_method: 'PICKUP', delivery_fee_waived: 'yes' });
    expect(t.delivery_fee).toBe(10);
  });

  test('system_admin 판매자는 조건 없음(null)', async () => {
    expect(await resolveSellerDeliveryTerms({ seller_type: 'system_admin', seller_entity_id: null })).toBeNull();
    const r = await resolveSellerDeliveryTerms(SELLER);
    expect(r.terms.delivery_fee).toBe(10);
  });
});

/**
 * 손님 주문 서버 재계산 — 순수 산술부 (2026-10-09 사전점검 S1 · Fable 판정 s1-repricing §6-A).
 * DB 를 쓰는 해석·합계는 health-check «사전점검 S1 재계산» 이 실호출로 지킨다.
 */
const { takeawayChargeFor, deliveryFeeFor, serviceChargeRateFor, roundCash } = require('../utils/guestOrderPricing');

const metas = [
  { qty: 2, product: { category: 'Food', takeaway_charge: null } },
  { qty: 1, product: { category: 'Beverage', takeaway_charge: 1.2 } },
];

describe('takeawayChargeFor — 화면 getTakeawayCharge 와 같은 규칙', () => {
  test('dine-in·꺼짐이면 0', () => {
    expect(takeawayChargeFor('dine_in', { enabled: true, pricingType: 'per-item', perItemCharge: 0.5 }, metas)).toBe(0);
    expect(takeawayChargeFor('takeaway', { enabled: false, pricingType: 'per-item', perItemCharge: 0.5 }, metas)).toBe(0);
  });
  test('per-item: 수량 × 일괄 요금 (pickup 도 적용)', () => {
    expect(takeawayChargeFor('takeaway', { enabled: true, pricingType: 'per-item', perItemCharge: 0.5 }, metas)).toBe(1.5);
    expect(takeawayChargeFor('pickup', { enabled: true, pricingType: 'per-item', perItemCharge: 0.5 }, metas)).toBe(1.5);
  });
  test('per-item-individual: 상품 값, 비면 기본값', () => {
    expect(takeawayChargeFor('takeaway', { enabled: true, pricingType: 'per-item-individual', defaultPerItemCharge: 0.3 }, metas)).toBe(1.8);
  });
  test('per-category: 분류 이름(소문자) 요금, 없으면 0', () => {
    expect(takeawayChargeFor('takeaway', { enabled: true, pricingType: 'per-category', categoryCharges: { food: 1, beverage: 0.5 } }, metas)).toBe(2.5);
    expect(takeawayChargeFor('takeaway', { enabled: true, pricingType: 'per-category', categoryCharges: { dessert: 1 } }, metas)).toBe(0);
  });
});

describe('deliveryFeeFor', () => {
  const dp = { zones: [{ id: 'z1', name: 'Near', fee: 5 }], freeAbove: 50 };
  test('배달 아니면 0 · 구역 없으면 0', () => {
    expect(deliveryFeeFor('takeaway', dp, null, 10)).toEqual({ ok: true, fee: 0 });
    expect(deliveryFeeFor('delivery', { zones: [] }, null, 10)).toEqual({ ok: true, fee: 0 });
  });
  test('구역 요금 · freeAbove 경계(이상이면 0)', () => {
    expect(deliveryFeeFor('delivery', dp, { zoneId: 'z1' }, 49.99).fee).toBe(5);
    expect(deliveryFeeFor('delivery', dp, { zoneId: 'z1' }, 50).fee).toBe(0);
    expect(deliveryFeeFor('delivery', dp, JSON.stringify({ zoneName: 'near' }), 10).fee).toBe(5);
  });
  test('구역이 있는데 안 고르면 거절', () => {
    expect(deliveryFeeFor('delivery', dp, {}, 10).code).toBe('DELIVERY_ZONE_REQUIRED');
  });
});

describe('serviceChargeRateFor — 화면 scApplies 와 같은 규칙', () => {
  test('꺼짐이면 0', () => expect(serviceChargeRateFor('dine_in', { serviceChargeEnabled: false, serviceChargeRate: 10 })).toBe(0));
  test('takeaway 는 기본 제외 · pickup 은 제외 안 함 · 토글 끄면 takeaway 도 적용', () => {
    const os = { serviceChargeEnabled: true, serviceChargeRate: 10 };
    expect(serviceChargeRateFor('takeaway', os)).toBe(0);
    expect(serviceChargeRateFor('pickup', os)).toBe(10);
    expect(serviceChargeRateFor('dine-in', os)).toBe(10);
    expect(serviceChargeRateFor('takeaway', { ...os, serviceChargeExcludeTakeaway: false })).toBe(10);
  });
});

describe('roundCash — all 일 때만', () => {
  test('cash_only 면 그대로', () => expect(roundCash(10.42, 0.05, 'cash_only')).toBe(10.42));
  test('all 이면 0.05 단위', () => {
    expect(roundCash(10.42, 0.05, 'all')).toBe(10.4);
    expect(roundCash(10.43, 0.05, 'all')).toBe(10.45);
  });
  test('반올림 단위 없으면 그대로', () => expect(roundCash(10.43, 0, 'all')).toBe(10.43));
});

// 주문 금액 재계산 공식 회귀 테스트 (순수 함수, DB 불필요).
//
// computeOrderTotals 는 주문 머지/추가/삭제/모바일머지 모든 경로가 공유하는
// 청구액 단일 공식이다 (utils/orderTotals.js). 프론트 POSTerminal calculateTotal 과
// 동일해야 하며, 어긋나면 손님 청구액이 틀어진다 — 매장 신뢰 직결.
//
// 여기서 고정하는 계약 (깨지면 즉시 빨간불):
//   1. 세금은 "할인 후 금액(afterDiscount)" 기준 (base 가 아님).
//   2. 세금/서비스차지는 원래 적용된 주문(old>0)에만 재계산 — 세금 없던 주문에 안 붙는다.
//   3. % 할인정책/% 쿠폰은 새 소계로 비례 재계산. 고정 할인/포인트는 유지.
//   4. round2 반올림 일관성.

const { round2, computeOrderTotals } = require('../utils/orderTotals');

describe('round2', () => {
  test('소수 둘째자리 반올림', () => {
    expect(round2(1.005)).toBe(1.01);
    expect(round2(2.344)).toBe(2.34);
    expect(round2(2.345)).toBe(2.35);
  });
  test('비수치 입력은 0', () => {
    expect(round2(null)).toBe(0);
    expect(round2(undefined)).toBe(0);
    expect(round2('x')).toBe(0);
  });
});

describe('computeOrderTotals — 세금 없던 주문', () => {
  test('세금/서비스차지 미적용 주문은 추가해도 세금이 안 붙는다', () => {
    // 소계 100 → 150 으로 증가. oldTax=0, oldServiceCharge=0.
    const r = computeOrderTotals({
      newSubtotal: 150, oldSubtotal: 100,
      taxRate: 6, serviceChargeRate: 10, // rate 는 박혀있지만 old=0 이므로 무시돼야 함
    });
    expect(r.tax).toBe(0);
    expect(r.serviceCharge).toBe(0);
    expect(r.total).toBe(150);
  });
});

describe('computeOrderTotals — 세금은 할인 후 기준', () => {
  test('세금 = afterDiscount × rate (base 아님)', () => {
    // 소계 100, 고정할인 20 → afterDiscount 80. 세금 6% = 4.8.
    const r = computeOrderTotals({
      newSubtotal: 100, oldSubtotal: 100,
      discount: 20,
      oldTax: 6, taxRate: 6,        // 원래 세금 적용됨
    });
    expect(r.afterDiscount).toBe(80);
    expect(r.tax).toBe(4.8);        // 80 × 6% — base(100)×6%=6 이 아님
    expect(r.total).toBe(84.8);     // 80 + 4.8
  });

  test('서비스차지도 afterDiscount 기준 + 세금과 합산', () => {
    // 소계 200, 할인 없음. SC 10% = 20, Tax 6% = 12.
    const r = computeOrderTotals({
      newSubtotal: 200, oldSubtotal: 200,
      oldTax: 12, taxRate: 6,
      oldServiceCharge: 20, serviceChargeRate: 10,
    });
    expect(r.serviceCharge).toBe(20);
    expect(r.tax).toBe(12);
    expect(r.total).toBe(232);
  });
});

describe('computeOrderTotals — 머지/추가 시 비례 재계산', () => {
  test('% 할인정책은 새 소계로 비례 재계산', () => {
    // 기존: 소계 100, 10% 할인정책 = 10. 추가 후 소계 200 → 정책 20 으로 재계산.
    const r = computeOrderTotals({
      newSubtotal: 200, oldSubtotal: 100,
      oldDiscountPolicyAmount: 10,
    });
    expect(r.discountPolicyAmount).toBe(20);
    expect(r.afterDiscount).toBe(180);
    expect(r.total).toBe(180);
  });

  test('% 쿠폰은 타입 알면 정확히 재계산 (maxDiscount 캡)', () => {
    // 15% 쿠폰, 소계 300 → 45. maxDiscount 30 캡 → 30.
    const r = computeOrderTotals({
      newSubtotal: 300, oldSubtotal: 200,
      oldCouponDiscount: 30,
      coupon: { type: 'percentage', value: 15, maxDiscount: 30 },
    });
    expect(r.couponDiscount).toBe(30);   // 45 가 아니라 캡 30
  });

  test('고정 쿠폰은 금액 유지 (주문금액 초과 불가)', () => {
    const r = computeOrderTotals({
      newSubtotal: 50, oldSubtotal: 100,
      oldCouponDiscount: 20,
      coupon: { type: 'fixed', value: 20 },
    });
    expect(r.couponDiscount).toBe(20);
    expect(r.afterDiscount).toBe(30);
  });

  test('고정 할인/포인트는 비례 재계산 없이 유지', () => {
    // 고정할인 15, 포인트 5. 소계 100→200 변해도 그대로.
    const r = computeOrderTotals({
      newSubtotal: 200, oldSubtotal: 100,
      discount: 15, pointDiscount: 5,
    });
    expect(r.afterDiscount).toBe(185);   // 200 - 15
    expect(r.total).toBe(180);           // 185 - 5(포인트)
  });
});

describe('computeOrderTotals — 삭제(소계 감소)', () => {
  test('아이템 삭제로 소계 줄면 세금도 비례 감소', () => {
    // 소계 200 → 100 (절반 삭제). 세금 6% 재계산: 12 → 6.
    const r = computeOrderTotals({
      newSubtotal: 100, oldSubtotal: 200,
      oldTax: 12, taxRate: 6,
    });
    expect(r.tax).toBe(6);
    expect(r.total).toBe(106);
  });
});

describe('computeOrderTotals — 포장요금/배달요금', () => {
  test('포장요금은 과세 base 에 포함, 배달요금은 비과세 가산', () => {
    // 소계 100 + 포장 10 = base 110. 세금 6% = 6.6. 배달 5 비과세 가산.
    const r = computeOrderTotals({
      newSubtotal: 100, oldSubtotal: 100,
      takeawayCharge: 10, deliveryFee: 5,
      oldTax: 6.6, taxRate: 6,
    });
    expect(r.tax).toBe(6.6);            // 110 × 6%
    expect(r.total).toBe(121.6);        // 110 + 6.6 + 5
  });
});

// #3 합본 빌(혼합차지) — 서비스차지는 dine-in 품목에만, 세금은 전체. 순수 주문은 기존과 동일.
const { mixedDineInSubtotal } = require('../utils/orderTotals');

describe('#3 혼합차지 (mixedDineInSubtotal + computeOrderTotals dineInSubtotal)', () => {
  test('순수 주문(전부 dine-in)은 null → 기존 동작', () => {
    expect(mixedDineInSubtotal([{ price: 10, quantity: 2 }], 'dine_in')).toBeNull();
  });
  test('순수 takeaway 주문도 null → 기존 동작(서비스차지 안 깎임)', () => {
    expect(mixedDineInSubtotal([{ item_order_type: 'takeaway', price: 10, quantity: 1 }], 'takeaway')).toBeNull();
  });
  test('혼합(다인인 30 + 테이크웨이 20) → dine-in 소계 30', () => {
    const items = [
      { price: 10, quantity: 3 }, // dine-in (태그 없음 = 주문타입)
      { item_order_type: 'takeaway', price: 10, quantity: 2 }
    ];
    expect(mixedDineInSubtotal(items, 'dine_in')).toBe(30);
  });

  test('dineInSubtotal=null 이면 서비스차지 전체 기준(기존)', () => {
    const r = computeOrderTotals({ newSubtotal: 100, oldSubtotal: 100, oldServiceCharge: 10, serviceChargeRate: 10, oldTax: 6, taxRate: 6 });
    expect(r.serviceCharge).toBe(10); // 100 × 10%
    expect(r.tax).toBe(6);            // 100 × 6%
  });

  test('혼합: 서비스차지는 dine-in 60%만(60), 세금은 전체(6)', () => {
    // 소계 100 (dine-in 60 + takeaway 40), 서비스차지율 10%, 세율 6%
    const r = computeOrderTotals({
      newSubtotal: 100, oldSubtotal: 100,
      oldServiceCharge: 10, serviceChargeRate: 10,
      oldTax: 6, taxRate: 6,
      dineInSubtotal: 60
    });
    expect(r.serviceCharge).toBe(6); // 100 × 10% × (60/100) = 6 (테이크웨이 40엔 서비스차지 없음)
    expect(r.tax).toBe(6);           // 세금은 전체 100 × 6% = 6
  });

  test('혼합 + 할인: 서비스차지 base 는 afterDiscount × dine-in 비율', () => {
    // 소계 100, 고정할인 20 → afterDiscount 80. dine-in 50%(50). 서비스차지 10%.
    const r = computeOrderTotals({
      newSubtotal: 100, oldSubtotal: 100, discount: 20,
      oldServiceCharge: 10, serviceChargeRate: 10,
      dineInSubtotal: 50
    });
    // afterDiscount 80 × 10% × 0.5 = 4
    expect(r.serviceCharge).toBe(4);
  });

  test('dineInSubtotal >= newSubtotal(전부 dine-in 취급) → 기존과 동일', () => {
    const r = computeOrderTotals({ newSubtotal: 100, oldSubtotal: 100, oldServiceCharge: 10, serviceChargeRate: 10, dineInSubtotal: 100 });
    expect(r.serviceCharge).toBe(10);
  });
});

describe('#3 합본 takeaway 포장비 (서비스차지는 dine-in만, 포장비/세금은 별개)', () => {
  test('dine-in 100 + takeaway 40 + 포장비 3: 서비스차지=10(dine-in만), 세금=8.58(전체+포장), 총=161.58', () => {
    const r = computeOrderTotals({ newSubtotal: 140, oldSubtotal: 140, takeawayCharge: 3,
      oldServiceCharge: 10, serviceChargeRate: 10, oldTax: 6, taxRate: 6, dineInSubtotal: 100 });
    expect(r.serviceCharge).toBe(10);   // 포장비는 서비스차지에 안 섞임
    expect(r.tax).toBe(8.58);           // (140+3)×6%
    expect(r.total).toBe(161.58);       // 140 + 3 + 10 + 8.58
  });
  test('포장비 있어도 순수 dine-in(dineInSubtotal=null)은 서비스차지 전체 기준', () => {
    const r = computeOrderTotals({ newSubtotal: 100, oldSubtotal: 100, takeawayCharge: 5, oldServiceCharge: 10, serviceChargeRate: 10 });
    expect(r.serviceCharge).toBe(10.5); // (100+5)×10% — 포장비 있는 순수주문은 기존대로 base 포함
  });
});

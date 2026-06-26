// utils/orderTotals.js
//
// 주문 금액 계산 단일 소스 (Single source of truth).
// 아이템이 바뀌는 모든 경로(머지/추가/삭제/bulk merge/모바일 머지)는 이 함수로
// 전체 금액을 재계산한다. 프론트엔드 POSTerminal `calculateTotal` 과 동일한
// 공식을 따른다 — 안 맞으면 청구액이 어긋난다.
//
// 정식 공식 (프론트 calculateTotal 기준):
//   base          = subtotal + takeaway              (할인은 이 금액에 적용)
//   afterDiscount = max(0, base - 고정할인 - 할인정책 - 쿠폰)
//   serviceCharge = afterDiscount × serviceChargeRate%   (원래 적용된 경우만)
//   tax           = afterDiscount × taxRate%             (원래 적용된 경우만)
//   total         = afterDiscount + serviceCharge + tax + deliveryFee - pointDiscount
//
// 매장 결정 (2026-05-29, Irene): 머지 시 % 기반 할인정책·% 쿠폰은 새 소계로
// **재계산**(Toast/Square 표준). 고정 할인·포인트·고정 쿠폰은 그대로 유지.
//
// 함정: tax_rate(기본 6)/service_charge_rate(기본 10) 컬럼은 세금을 한 번도 안
// 매긴 주문에도 박혀 있다. 그래서 "원래 적용된 금액(oldTax>0 / oldServiceCharge>0)"
// 일 때만 재계산한다. 안 그러면 세금 없던 주문에 세금이 잘못 붙는다.

function round2(n) {
  return Math.round(((Number(n) || 0) + Number.EPSILON) * 100) / 100;
}

/**
 * 주문 전체 금액을 정식 공식으로 재계산한다.
 *
 * @param {Object} p
 * @param {number}  p.newSubtotal              새 아이템 소계 (필수)
 * @param {number} [p.oldSubtotal]             변경 전 아이템 소계 (% 할인·실효세율 비율 도출용)
 * @param {number} [p.takeawayCharge]          포장 요금 (고정, base 에 포함되어 과세)
 * @param {number} [p.deliveryFee]             배달 요금 (고정, 비과세, 마지막에 가산)
 * @param {number} [p.discount]                수동 고정 할인 (유지)
 * @param {number} [p.oldDiscountPolicyAmount] 기존 % 할인정책 금액 (새 base 로 비례 재계산)
 * @param {number} [p.oldCouponDiscount]       기존 쿠폰 할인 금액
 * @param {Object} [p.coupon]                  쿠폰 메타 {type:'percentage'|'fixed', value, maxDiscount} (없으면 비례 재계산)
 * @param {number} [p.pointDiscount]           포인트 사용 할인 (고정 환산, 유지)
 * @param {number} [p.oldTax]                  기존 세금 금액 (>0 일 때만 재계산)
 * @param {number} [p.taxRate]                 세율 %
 * @param {number} [p.oldServiceCharge]        기존 서비스차지 금액 (>0 일 때만 재계산)
 * @param {number} [p.serviceChargeRate]       서비스차지율 %
 * @returns {{subtotal:number, discountPolicyAmount:number, couponDiscount:number, afterDiscount:number, tax:number, serviceCharge:number, total:number}}
 */
function computeOrderTotals({
  newSubtotal,
  oldSubtotal = 0,
  takeawayCharge = 0,
  deliveryFee = 0,
  discount = 0,
  oldDiscountPolicyAmount = 0,
  oldCouponDiscount = 0,
  coupon = null,
  pointDiscount = 0,
  oldTax = 0,
  taxRate = 0,
  oldServiceCharge = 0,
  serviceChargeRate = 0,
  // #3 합본 빌(혼합차지) — 서비스차지를 받는 dine-in 품목 소계. null/미지정/=newSubtotal 이면
  // 기존과 100% 동일(서비스차지=전체 afterDiscount 기준). dine-in 만 받게 하려면 그 소계를 넘긴다.
  // 세금은 전체 기준(분리 안 함), 포장요금(takeawayCharge)은 그대로.
  dineInSubtotal = null
} = {}) {
  const ns = Number(newSubtotal) || 0;
  const os = Number(oldSubtotal) || 0;
  const tw = Number(takeawayCharge) || 0;
  const dv = Number(deliveryFee) || 0;
  const fixedDiscount = Number(discount) || 0;
  const pts = Number(pointDiscount) || 0;

  const oldBase = os + tw;
  const newBase = ns + tw;

  // % 할인정책 — 새 base 로 비례 재계산
  let policy = Number(oldDiscountPolicyAmount) || 0;
  if (policy > 0 && oldBase > 0) {
    policy = round2((policy / oldBase) * newBase);
  }

  // 쿠폰 — 타입을 알면 정확히, 모르면 비례 재계산
  let couponDiscount = Number(oldCouponDiscount) || 0;
  if (couponDiscount > 0) {
    if (coupon && coupon.type === 'percentage') {
      let c = ns * ((Number(coupon.value) || 0) / 100);
      if (coupon.maxDiscount != null && Number(coupon.maxDiscount) > 0) {
        c = Math.min(c, Number(coupon.maxDiscount));
      }
      couponDiscount = round2(c);
    } else if (coupon && coupon.type === 'fixed') {
      // 고정 쿠폰 — 금액 유지 (단, 주문 금액 초과 불가)
      couponDiscount = round2(Math.min(Number(coupon.value) || couponDiscount, newBase));
    } else if (oldBase > 0) {
      // 타입 미상 (쿠폰 행 없음) → 비례 재계산 (% 재계산 정책에 맞춤)
      couponDiscount = round2((couponDiscount / oldBase) * newBase);
    }
  }

  // 할인 후 금액 (세금·서비스차지의 base)
  const oldAfterDiscount = Math.max(0, oldBase - fixedDiscount - (Number(oldDiscountPolicyAmount) || 0) - (Number(oldCouponDiscount) || 0));
  const afterDiscount = Math.max(0, newBase - fixedDiscount - policy - couponDiscount);

  // 서비스차지 — 원래 적용된 경우만, afterDiscount 기준
  // #3 혼합차지: dineInSubtotal 이 주어지고 전체 소계보다 작으면(=테이크웨이 품목 섞임),
  // 서비스차지는 dine-in 비율만큼만(테이크웨이 품목엔 서비스차지 안 붙음). 안 주어지면 전체 기준(기존).
  let serviceCharge = Number(oldServiceCharge) || 0;
  if (serviceCharge > 0) {
    const sr = Number(serviceChargeRate) || 0;
    const rate = sr > 0 ? sr / 100 : (oldAfterDiscount > 0 ? serviceCharge / oldAfterDiscount : 0);
    const di = (dineInSubtotal == null) ? ns : Math.max(0, Number(dineInSubtotal) || 0);
    // 비율 분모 = newBase(소계+포장비). afterDiscount × (di/newBase) = dine-in 품목 몫만 → 서비스차지가
    // 포장비/테이크웨이 품목엔 안 붙는다. di>=ns(전부 dine-in) 또는 newBase=0 → 1(기존 동작).
    const dineInFraction = (newBase > 0 && di < ns) ? (di / newBase) : 1;
    serviceCharge = round2(afterDiscount * rate * dineInFraction);
  }

  // 세금 — 원래 적용된 경우만, afterDiscount 기준
  let tax = Number(oldTax) || 0;
  if (tax > 0) {
    const tr = Number(taxRate) || 0;
    const rate = tr > 0 ? tr / 100 : (oldAfterDiscount > 0 ? tax / oldAfterDiscount : 0);
    tax = round2(afterDiscount * rate);
  }

  const total = round2(afterDiscount + serviceCharge + tax + dv - pts);

  return {
    subtotal: round2(ns),
    discountPolicyAmount: policy,
    couponDiscount,
    afterDiscount: round2(afterDiscount),
    tax,
    serviceCharge,
    total
  };
}

/**
 * #3 합본 빌 — 서비스차지 대상(dine-in) 소계를 구한다. **혼합 주문(다인인+테이크웨이 품목 공존)일 때만**
 * 그 dine-in 소계를 반환하고, 순수 주문(전부 같은 타입)이면 null 을 반환한다. computeOrderTotals 에
 * 그대로 넘기면 — null 이면 기존과 100% 동일, 값이 있으면 서비스차지가 dine-in 품목에만 붙는다.
 * 품목 타입 소스: item.item_order_type (머지 시 태깅). 태그 없으면 주문 order_type 으로 간주.
 * @returns {number|null}
 */
function mixedDineInSubtotal(items, orderType) {
  if (!Array.isArray(items) || !items.length) return null;
  const offTable = (t) => t === 'takeaway' || t === 'pickup' || t === 'delivery';
  let hasDineIn = false, hasOff = false, dineSum = 0;
  for (const it of items) {
    const t = it.item_order_type || orderType || 'dine_in';
    const amt = (parseFloat(it.price) || 0) * (parseInt(it.quantity) || 1);
    if (offTable(t)) hasOff = true;
    else { hasDineIn = true; dineSum += amt; }
  }
  return (hasDineIn && hasOff) ? round2(dineSum) : null; // 혼합일 때만 분리
}

module.exports = { round2, computeOrderTotals, mixedDineInSubtotal };

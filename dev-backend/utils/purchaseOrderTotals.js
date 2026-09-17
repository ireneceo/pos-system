/**
 * 발주 금액 공식 — 단일 소스 (2026-09-17 Fable 판정 ⑦ 배송비)
 *
 *   total_amount = subtotal + tax_amount + delivery_fee
 *
 * 왜 이 파일인가
 *   - `computeTotals` 가 purchase-orders-crud.js 와 purchase-orders-workflow.js 에 **두 벌로 복제**돼
 *     있었다. 배송비가 총액식에 들어가는 순간 두 벌은 반드시 갈라진다 → 한 곳으로 모은다.
 *   - 배송비 규칙은 «판매자별 두 숫자» 뿐이다: 무료배송 기준 금액(min_order_amount) · 기준 미만
 *     고정 배송비(delivery_fee). 사람이 발주마다 적는 값이 아니다(Irene 지정: 자동계산).
 *   - ⚠ 미설정(= delivery_fee 가 null)은 «무료»가 아니라 «규칙 미적용»이다. 운영 공급업체 42곳이
 *     전부 비어 있어, 미설정을 부과로 두면 전원이 배송비를 물게 된다.
 */

/** 소수점 2자리 반올림 (금액 공식 전용) */
function round2(n) {
  return Math.round((Number(n) || 0) * 100) / 100;
}

function num(v) {
  if (v === null || v === undefined || v === '') return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

/**
 * 판매자의 배송 조건으로 배송비를 계산한다.
 *
 * @param {number} subtotal 품목 합계(배송비 제외)
 * @param {object} terms { delivery_fee, min_order_amount, currency } — 판매자 행의 값
 * @param {object} opts  { orderCurrency } — 발주 통화. 판매자 통화와 다르면 규칙 미적용.
 * @returns {{fee: number, basis: object}} basis 는 «왜 이 배송비인가»를 나중에 설명하기 위한 스냅샷
 */
function computeDeliveryFee(subtotal, terms = {}, opts = {}) {
  const sub = round2(subtotal);
  const fee = num(terms.delivery_fee);
  const freeAbove = num(terms.min_order_amount);
  const sellerCurrency = terms.currency || null;
  const orderCurrency = opts.orderCurrency || null;

  const basis = {
    free_above: freeAbove,
    fee,
    subtotal_at_calc: sub,
    seller_currency: sellerCurrency,
    computed_at: new Date().toISOString()
  };

  // 판매자가 배송비를 정하지 않았다 = 규칙 미적용. 화면은 «배송비 미설정»으로 쓴다(«무료» 아님).
  if (fee === null) {
    return { fee: 0, basis: { ...basis, rule: 'unset' } };
  }
  if (fee < 0) {
    return { fee: 0, basis: { ...basis, rule: 'invalid_negative' } };
  }
  // 통화가 다르면 금액 비교 자체가 성립하지 않는다 — 규칙을 적용하지 않고 근거에 남긴다.
  if (sellerCurrency && orderCurrency && sellerCurrency !== orderCurrency) {
    return { fee: 0, basis: { ...basis, rule: 'currency_mismatch', order_currency: orderCurrency } };
  }
  if (fee === 0) {
    return { fee: 0, basis: { ...basis, rule: 'free' } };
  }
  // 기준선이 없으면 항상 고정 배송비.
  if (freeAbove === null || freeAbove <= 0) {
    return { fee: round2(fee), basis: { ...basis, rule: 'always' } };
  }
  // 경계 = «이상이면 무료».
  if (sub >= freeAbove) {
    return { fee: 0, basis: { ...basis, rule: 'free_threshold_met' } };
  }
  return { fee: round2(fee), basis: { ...basis, rule: 'below_threshold' } };
}

/**
 * 배송비 규칙을 사람이 읽는 한 문장으로. 화면(설정 미리보기·발주 담기 근거줄)이 같은 문장을 쓴다.
 * 금액 표기는 호출자가 통화기호를 붙인다 — 여기서는 숫자만 다룬다.
 */
function describeDeliveryTerms(terms = {}) {
  const fee = num(terms.delivery_fee);
  const freeAbove = num(terms.min_order_amount);
  if (fee === null) return { kind: 'unset', free_above: null, fee: null };
  if (fee === 0) return { kind: 'free', free_above: null, fee: 0 };
  if (freeAbove === null || freeAbove <= 0) return { kind: 'always', free_above: null, fee: round2(fee) };
  return { kind: 'threshold', free_above: round2(freeAbove), fee: round2(fee) };
}

/** 기준 미달일 때 «얼마 더 담으면 무료» — 미달이 아니거나 규칙이 없으면 null */
function amountToFreeDelivery(subtotal, terms = {}) {
  const d = describeDeliveryTerms(terms);
  if (d.kind !== 'threshold') return null;
  const gap = round2(d.free_above - round2(subtotal));
  return gap > 0 ? gap : null;
}

/** 품목 배열 → 품목 합계 */
function computeSubtotal(items = []) {
  let subtotal = 0;
  for (const it of items) {
    const qty = parseFloat(it.quantity_ordered) || 0;
    const price = parseFloat(it.unit_price) || 0;
    subtotal += round2(qty * price);
  }
  return round2(subtotal);
}

/**
 * 발주 총액 — **이 식이 단일 진실이다.**
 * @param {Array} items
 * @param {object} extra { delivery_fee, tax_amount }
 */
function computePurchaseOrderTotals(items = [], extra = {}) {
  const subtotal = computeSubtotal(items);
  const tax_amount = round2(extra.tax_amount || 0);
  const delivery_fee = round2(extra.delivery_fee || 0);
  return {
    subtotal,
    tax_amount,
    delivery_fee,
    total_amount: round2(subtotal + tax_amount + delivery_fee)
  };
}

/**
 * 판매자를 조회해 배송비까지 포함한 발주 총액을 낸다. **라우트는 이 함수만 부른다.**
 * @param {Array} items
 * @param {object} seller { seller_type, seller_entity_id }
 * @param {object} opts { orderCurrency, tax_amount }
 */
async function computeTotalsWithDelivery(items, seller = {}, opts = {}) {
  const subtotal = computeSubtotal(items);
  let fee = 0;
  let basis = { rule: 'no_seller', subtotal_at_calc: subtotal, computed_at: new Date().toISOString() };

  const type = seller.seller_type;
  const id = parseInt(seller.seller_entity_id, 10);
  // system_admin(POS 카탈로그)은 판매자 엔티티가 없어 규칙이 없다 = 0.
  if (type && type !== 'system_admin' && Number.isFinite(id)) {
    try {
      const { resolveSellers, getSeller } = require('./sellerNames');
      const map = await resolveSellers([{ seller_type: type, seller_entity_id: id }]);
      const row = getSeller(map, type, id);
      if (row) {
        const r = computeDeliveryFee(subtotal, row, { orderCurrency: opts.orderCurrency });
        fee = r.fee;
        basis = r.basis;
      } else {
        basis = { ...basis, rule: 'seller_not_found' };
      }
    } catch (e) {
      // 배송비를 못 읽었다고 발주를 막지 않는다 — 0 으로 두고 근거에 사유를 남긴다.
      console.error('[po-totals] 배송 조건 조회 실패:', e.message);
      basis = { ...basis, rule: 'lookup_failed', error: e.message };
    }
  }

  const totals = computePurchaseOrderTotals(items, { delivery_fee: fee, tax_amount: opts.tax_amount || 0 });
  return { ...totals, delivery_fee_basis: basis };
}

module.exports = {
  computeTotalsWithDelivery,
  computeDeliveryFee,
  computePurchaseOrderTotals,
  computeSubtotal,
  describeDeliveryTerms,
  amountToFreeDelivery,
  round2
};

/**
 * 배송비 규칙 — 화면 쪽 사본 (2026-09-17 Fable 판정 ⑦)
 *
 * 서버의 `dev-backend/utils/purchaseOrderTotals.js` 와 **같은 식**이다.
 * 담기 화면이 즉시 보여 주기 위한 것이고, **저장될 때 진실은 서버 계산값**이다.
 * 두 벌이 갈라지면 화면과 발주서의 금액이 달라지므로, 한쪽을 고치면 반드시 다른 쪽도 고친다.
 *
 * 규칙은 판매자별 두 숫자뿐:
 *   freeAbove(min_order_amount) = 이 금액 «이상» 주문하면 무료
 *   fee(delivery_fee)           = 그 미만일 때 붙는 고정액. null = 미설정(규칙 미적용, «무료» 아님)
 */

export interface DeliveryTerms {
  /** 무료배송 기준 금액. null = 기준 없음(항상 고정액) */
  min_order_amount?: number | null;
  /** 기준 미만일 때 고정 배송비. null = 미설정 */
  delivery_fee?: number | null;
  /** 판매자 통화. 발주 통화와 다르면 규칙을 적용하지 않는다(서버와 같은 분기) */
  currency?: string | null;
}

export type DeliveryRule =
  | 'unset'                 // 판매자가 안 정함 — 배송비 줄에 «미설정»
  | 'free'                  // 항상 무료
  | 'always'                // 기준 없이 항상 고정액
  | 'below_threshold'       // 기준 미만이라 고정액
  | 'free_threshold_met'    // 기준 이상이라 무료
  | 'currency_mismatch';    // 판매자 통화 ≠ 발주 통화 — 금액 비교가 성립하지 않는다

const round2 = (n: number) => Math.round((Number(n) || 0) * 100) / 100;

const num = (v: unknown): number | null => {
  if (v === null || v === undefined || v === '') return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
};

/** 품목 합계에 붙는 배송비와 그 이유 */
export function computeDeliveryFee(
  subtotal: number,
  terms: DeliveryTerms = {},
  opts: { orderCurrency?: string | null } = {}
): { fee: number; rule: DeliveryRule } {
  const sub = round2(subtotal);
  const fee = num(terms.delivery_fee);
  const freeAbove = num(terms.min_order_amount);

  if (fee === null) return { fee: 0, rule: 'unset' };
  if (fee < 0) return { fee: 0, rule: 'unset' };
  // 통화가 다르면 금액 비교 자체가 성립하지 않는다 — 서버가 0 을 저장하므로 화면도 0 으로 맞춘다.
  //   이 분기가 없으면 화면은 배송비를 보여 주는데 저장된 발주에는 없다.
  if (terms.currency && opts.orderCurrency && terms.currency !== opts.orderCurrency) {
    return { fee: 0, rule: 'currency_mismatch' };
  }
  if (fee === 0) return { fee: 0, rule: 'free' };
  if (freeAbove === null || freeAbove <= 0) return { fee: round2(fee), rule: 'always' };
  if (sub >= freeAbove) return { fee: 0, rule: 'free_threshold_met' };
  return { fee: round2(fee), rule: 'below_threshold' };
}

/** 기준 미달이면 «얼마 더 담으면 무료». 아니면 null */
export function amountToFreeDelivery(subtotal: number, terms: DeliveryTerms = {}): number | null {
  const fee = num(terms.delivery_fee);
  const freeAbove = num(terms.min_order_amount);
  if (fee === null || fee <= 0 || freeAbove === null || freeAbove <= 0) return null;
  const gap = round2(freeAbove - round2(subtotal));
  return gap > 0 ? gap : null;
}

/**
 * 판매자 배송 조건을 «무엇을 보여줄지» 로만 돌려준다. **문구는 만들지 않는다** —
 * 화면이 i18n 으로 문장을 만든다(components/Common/DeliveryTermsText). 여기서 한글을 박으면
 * 4개 언어 화면에서 한국어가 새어 나온다.
 */
export function describeDeliveryTerms(terms: DeliveryTerms = {}): {
  kind: 'unset' | 'free' | 'always' | 'threshold';
  free_above: number | null;
  fee: number | null;
} {
  const fee = num(terms.delivery_fee);
  const freeAbove = num(terms.min_order_amount);
  if (fee === null) return { kind: 'unset', free_above: null, fee: null };
  if (fee === 0) return { kind: 'free', free_above: null, fee: 0 };
  if (freeAbove === null || freeAbove <= 0) return { kind: 'always', free_above: null, fee: round2(fee) };
  return { kind: 'threshold', free_above: round2(freeAbove), fee: round2(fee) };
}

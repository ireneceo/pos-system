/**
 * 발주 지불 금액 규칙 — 계약 테스트 (2026-09-10 Fable 판정 · Irene 승인)
 *
 * 규칙: **외부 공급업체 발주를 대조까지 마쳤으면 공급업체 청구액(invoice_total)을 지불한다.**
 *       그 외에는 발주 금액(total_amount).
 *
 * 왜 계약인가: 이 값이 **현금 드로어에서 실제로 나가는 돈**이다. 조용히 발주액으로
 * 되돌아가면 매장이 종이와 다른 금액을 꺼내고, 마감 기대금액이 그만큼 어긋난다.
 *
 * 고장주입 확인법: services/purchaseOrderPayment.js 의 `payableFrom` 에서
 * `if (!isExternal) return fallback;` 앞의 분기들을 지우거나 항상 fallback 을 돌려주게 만들면
 * 아래 «대조 완료 · 외부» 케이스가 실패해야 한다. 실패하지 않으면 이 테스트가 고장난 것이다.
 */
const { payableFrom } = require('../services/purchaseOrderPayment');

const po = (total, invoiced, reconciled) => ({
  total_amount: total,
  invoice_total: invoiced,
  invoice_reconciled_at: reconciled ? new Date('2026-09-10T00:00:00Z') : null,
});

describe('payableFrom — 실제로 낼 금액', () => {
  test('외부 공급업체 + 대조 완료 → 공급업체 청구액을 낸다', () => {
    const r = payableFrom(po(500, 480, true), true);
    expect(r.amount).toBe(480);
    expect(r.basis).toBe('supplier_invoice');
    expect(r.ordered).toBe(500);
  });

  test('청구가 발주보다 클 때도 청구액을 낸다', () => {
    expect(payableFrom(po(500, 520, true), true).amount).toBe(520);
  });

  test('대조 전이면 발주 금액을 낸다', () => {
    const r = payableFrom(po(500, 480, false), true);
    expect(r.amount).toBe(500);
    expect(r.basis).toBe('purchase_order');
  });

  test('가입한 판매자는 대조했어도 발주 금액을 낸다 (우리 청구서가 원본)', () => {
    const r = payableFrom(po(500, 480, true), false);
    expect(r.amount).toBe(500);
    expect(r.basis).toBe('purchase_order');
  });

  test('대조는 했는데 총액을 안 적었으면 발주 금액을 낸다', () => {
    expect(payableFrom(po(500, null, true), true).amount).toBe(500);
  });

  test('응답에 칸이 아예 없어도 발주 금액으로 안전하게 떨어진다', () => {
    expect(payableFrom({ total_amount: 500 }, true).amount).toBe(500);
  });

  test('소수점은 2자리로 정리된다 (드로어 금액이라 반올림이 규칙이어야 한다)', () => {
    expect(payableFrom(po(500, 480.005, true), true).amount).toBe(480.01);
    expect(payableFrom(po(500.004, null, false), true).amount).toBe(500);
  });
});

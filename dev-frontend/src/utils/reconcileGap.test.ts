import { reconcileGap, formatGap, gapColor, isTotalOnly } from './reconcileGap';

describe('reconcileGap — 헤더 기준 갭', () => {
  test('대조 전이면 null', () => {
    expect(reconcileGap({ invoice_total: 110, total_amount: 100, invoice_reconciled_at: null })).toBeNull();
  });
  test('청구 총액이 없으면 null', () => {
    expect(reconcileGap({ invoice_total: null, total_amount: 100, invoice_reconciled_at: '2026-09-25' })).toBeNull();
  });
  test('더 청구되면 +, 덜 청구되면 −, 문자열 금액도', () => {
    expect(reconcileGap({ invoice_total: '115.00', total_amount: '100.00', invoice_reconciled_at: 'x' })).toBe(15);
    expect(reconcileGap({ invoice_total: 96.8, total_amount: 100, invoice_reconciled_at: 'x' })).toBe(-3.2);
    expect(reconcileGap({ invoice_total: 100, total_amount: 100, invoice_reconciled_at: 'x' })).toBe(0);
  });
  test('표기·색', () => {
    expect(formatGap(15, 'MYR')).toBe('+RM 15.00');
    expect(formatGap(-3.2, 'MYR')).toBe('−RM 3.20');
    expect(formatGap(0, 'MYR')).toBe('RM 0.00');
    expect(gapColor(1)).toBe('#B45309');
    expect(gapColor(-1)).toBe('#047857');
    expect(gapColor(0)).toBe('#6B7280');
  });
  test('총액만 판정 = 대조 시각 있음 AND 청구 줄 0', () => {
    expect(isTotalOnly({ invoice_reconciled_at: 'x', reconcile_invoiced_lines: 0 })).toBe(true);
    expect(isTotalOnly({ invoice_reconciled_at: 'x', reconcile_invoiced_lines: 3 })).toBe(false);
    expect(isTotalOnly({ invoice_reconciled_at: null, reconcile_invoiced_lines: 0 })).toBe(false);
  });
});

/**
 * 인보이스 대조 «갭» — 헤더 기준 한 곳 (docs/PURCHASE_ORDER_SYSTEM.md §8-6 A-4).
 *
 * 갭 = 공급업체 청구 총액(invoice_total) − 발주 총액(total_amount).
 * total_amount = 품목합 + 세금 + 배송비(purchase-orders-crud.js) 라 **같은 기준끼리의 비교**다.
 * 목록·상세·결제 창·대조 화면이 모두 이 함수를 쓴다 — 예전 목록 배지는 줄 단가 기준이라
 * 총액만 대조한 발주에서는 갭이 사라졌고, 배송비·세금 차이도 잡지 못했다.
 */
import { getCurrencySymbol } from './currency';

export interface GapSource {
  invoice_total?: string | number | null;
  total_amount?: string | number | null;
  invoice_reconciled_at?: string | null;
}

const r2 = (n: number) => Math.round(n * 100) / 100;

/** 대조를 마쳤고 청구 총액이 있으면 갭(부호 유지, 소수 2자리), 아니면 null. */
export function reconcileGap(po: GapSource | null | undefined): number | null {
  if (!po || !po.invoice_reconciled_at) return null;
  if (po.invoice_total === null || po.invoice_total === undefined || po.invoice_total === '') return null;
  const inv = Number(po.invoice_total);
  const ord = Number(po.total_amount || 0);
  if (!Number.isFinite(inv) || !Number.isFinite(ord)) return null;
  return r2(inv - ord);
}

/** 갭 색 — 더 청구됨(+) 주황 · 덜 청구됨(−) 초록 · 같음 회색. */
export function gapColor(gap: number): string {
  if (gap >= 0.005) return '#B45309';
  if (gap <= -0.005) return '#047857';
  return '#6B7280';
}

/**
 * «+RM 5.00» / «−RM 3.20» / «RM 0.00».
 * 두 번째 인자는 **통화 코드**(MYR) — 기호는 여기서 만든다(formatCurrency 와 같은 약속: 저장=코드 · 표시=기호).
 */
export function formatGap(gap: number, currencyCode: string | null | undefined): string {
  const sign = gap >= 0.005 ? '+' : gap <= -0.005 ? '−' : '';
  return `${sign}${getCurrencySymbol(currencyCode || 'MYR')} ${Math.abs(gap).toFixed(2)}`;
}

/**
 * «총액만» 대조였나 — 서버 isTotalOnlyReconcile 과 같은 판정을 목록 응답 칸으로 도출한다.
 * 대조 시각이 있고 청구 단가가 들어간 줄이 0 이면 총액만. (DB 칸 추가 없음)
 */
export function isTotalOnly(po: { invoice_reconciled_at?: string | null; reconcile_invoiced_lines?: number | null }): boolean {
  return !!po.invoice_reconciled_at && Number(po.reconcile_invoiced_lines || 0) === 0;
}

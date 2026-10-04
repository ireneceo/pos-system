/**
 * 주문 취소 = 단말기 카드도 함께 취소(Void A2) — LiveOrders·테이블 화면의 취소가 PATCH 앞에서 한 번 부른다.
 * 설계: .claude/fable-design-20261004-terminal-void-direct.md §3-3.
 *
 *   none      — 이 주문에 단말기 승인이 없다 → 오늘과 똑같이 취소
 *   voided    — 단말기에서 취소됐다(00 또는 이미 취소 C5) → 취소 진행
 *   no-bridge — 이 기기는 단말기에 못 닿는다(앱 아님·오프라인) → 취소는 진행, «단말기에서 Void 하세요» 안내
 *   failed    — 단말기가 거절/기록 없음 → 주문 취소를 진행하지 않는다
 *   unknown   — 단말기 응답이 없다 → 주문 취소를 진행하지 않는다(다시 누르면 이미 취소된 건 C5 로 이어진다)
 */
import { getAuthToken } from './auth';
import { getEcrBridge } from './nativeEcr';
import { voidTerminalTxn, TerminalTxn } from './terminalSale';

export type OrderVoidOutcome =
  | { kind: 'none' }
  | { kind: 'voided' | 'no-bridge'; amount: number }
  | { kind: 'failed' | 'unknown'; amount: number; message: string; code?: string };

/** 이 주문에 붙은 단말기 승인(승인·수동기록) — 취소 모달 안내 줄과 Void 대상. 읽기 실패면 빈 목록(오늘과 같은 취소). */
export async function getTerminalApprovals(restaurantId: number | string, orderId: number | string): Promise<TerminalTxn[]> {
  try {
    const q = new URLSearchParams({ restaurant_id: String(restaurantId), order_id: String(orderId), command: 'sale', status: 'approved,manual' });
    const res = await fetch(`/api/terminal/transactions?${q}`, { headers: { Authorization: `Bearer ${getAuthToken()}` } });
    if (!res.ok) return [];
    const j = await res.json().catch(() => null);
    return Array.isArray(j?.data) ? j.data : [];
  } catch {
    return [];
  }
}

export const approvalsTotal = (rows: TerminalTxn[]) => Math.round(rows.reduce((s, r) => s + (parseFloat(String(r.amount || 0)) || 0), 0) * 100) / 100;

export async function voidTerminalForOrder(opts: { restaurantId: number | string; orderId: number | string; voidPin?: string }): Promise<OrderVoidOutcome> {
  const rows = await getTerminalApprovals(opts.restaurantId, opts.orderId);
  if (!rows.length) return { kind: 'none' };
  const amount = approvalsTotal(rows);
  const online = typeof navigator === 'undefined' || navigator.onLine !== false;
  if (!getEcrBridge() || !online) return { kind: 'no-bridge', amount };
  for (const row of rows) {
    const r = await voidTerminalTxn(row.id, Number(opts.restaurantId), opts.voidPin);
    if (r.kind === 'voided') continue;
    if (r.kind === 'unknown') return { kind: 'unknown', amount, message: r.message };
    return { kind: 'failed', amount, message: r.message, code: r.kind === 'error' ? r.code : undefined };
  }
  return { kind: 'voided', amount };
}

/**
 * POS 신규 주문의 단말기 승인 «대기 연결» — 승인 순간엔 주문이 아직 없다(결제 확인 뒤 생성).
 * 결제 창이 승인을 받으면 여기에 두고, OrderContext.addOrder 가 서버 주문 id 를 받는 지점에서 꺼내 연결한다.
 * 설계: .claude/fable-design-20261001-ghl-ecr.md §2-3 (🔒 POSTerminalPage 무접촉 경로).
 * 2분이 지나면 버린다 — 다른 주문에 잘못 붙지 않게.
 */
let pending: { txnId: number; amount: number; at: number } | null = null;
const TTL_MS = 2 * 60 * 1000;

export function setPendingTerminalLink(txnId: number, amount: number) {
  pending = { txnId, amount, at: Date.now() };
}

export function takePendingTerminalLink(): { txnId: number; amount: number } | null {
  const p = pending;
  pending = null;
  if (!p || Date.now() - p.at > TTL_MS) return null;
  return { txnId: p.txnId, amount: p.amount };
}

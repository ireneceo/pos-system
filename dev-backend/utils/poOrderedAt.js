/**
 * 발주일 단일 소스 — 보낸 시각(Mark as Sent · Submit · 직접구매 · 승인).
 *   장바구니에 담긴 시각(created_at)이 아니다 (2026-09-21 Irene 「Submit 한 순서대로 나와야해. 발주일은 POs에서 Mark나 서브밋을 한 시점」).
 *   보내는 경로는 전부 utils/poOwnerApproval.applySubmitGate 또는 승인 라우트가 submitted_at 을 찍는다.
 *   옛 행은 submitted_at 이 비어 있을 수 있어 approved_at → created_at 으로 떨어진다(invoicePurchaseOrderAttach.ordered_at 과 같은 순서).
 * 구매자 발주 목록(purchase-orders-crud)과 판매자 받은 주문 목록(seller-orders)이 같이 쓴다.
 */
function orderedAtLiteral(sequelize, alias = 'PurchaseOrder') {
  return sequelize.literal(`COALESCE(\`${alias}\`.\`submitted_at\`, \`${alias}\`.\`approved_at\`, \`${alias}\`.\`created_at\`)`);
}

function orderedAtOf(po) {
  return (po && (po.submitted_at || po.approved_at || po.created_at)) || null;
}

module.exports = { orderedAtLiteral, orderedAtOf };

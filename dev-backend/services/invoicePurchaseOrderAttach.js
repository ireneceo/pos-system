/**
 * 청구서 ↔ 원본 발주 붙이기 — **단일 소스** (2026-09-11 · docs/PURCHASE_ORDER_SYSTEM.md §8-5 E-1)
 *
 * 받는 청구서 목록은 여러 곳이다 — 매장 목록(`GET /invoices/restaurant/:rid`) · `GET /invoices/to-pay`(브랜드·푸드코트·매장) ·
 * 오너 목록. 화면이 «외부 공급업체 청구서면 발주 결제 모달을 연다»를 하려면 연결 발주·낼 금액·발주일/수령일이 필요한데,
 * 매장 목록만 그걸 붙이고 있어서 브랜드 화면은 외부 공급업체 청구서도 전부 게이트웨이 «Pay» 로 보냈다.
 * 모든 목록이 이 함수 하나를 쓴다(복제 금지).
 *
 * 규칙
 *   - 연결은 `purchase_orders.trade_invoice_id`. 지워진 발주는 붙이지 않는다.
 *   - 외부 판정은 utils/sellerNames(발주 목록과 같은 규칙), 낼 금액은 purchaseOrderPayment.payableFrom(단일 소스).
 *   - 목록 1회에 쿼리 1개 — 청구서마다 조회하지 않는다.
 */
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const { resolveSellers, isExternalSeller } = require('../utils/sellerNames');

/**
 * @param {Array<number|string>} invoiceIds
 * @returns {Promise<Map<number, object>>} 청구서 id → 발주 행(+ is_external · payable_amount · payable_basis · ordered_at)
 */
async function attachPurchaseOrders(invoiceIds) {
  const ids = [...new Set((invoiceIds || []).map(Number).filter(Number.isFinite))];
  const map = new Map();
  if (!ids.length) return map;
  const rows = await sequelize.query(
    `SELECT id, po_number, trade_invoice_id, total_amount, external_invoice_url,
            external_invoice_filename, invoice_number, invoice_total, invoice_reconciled_at,
            status, seller_type, seller_entity_id, payment_status, entity_type, entity_id,
            submitted_at, approved_at, created_at, received_at, invoice_date
       FROM purchase_orders
      WHERE trade_invoice_id IN (:ids) AND deleted_at IS NULL`,
    { type: QueryTypes.SELECT, replacements: { ids } });
  if (!rows.length) return map;
  const { payableFrom } = require('./purchaseOrderPayment');
  const sellerMap = await resolveSellers(rows);
  for (const r of rows) {
    r.is_external = isExternalSeller(sellerMap, r.seller_type, r.seller_entity_id);
    const p = payableFrom(r, r.is_external);
    r.payable_amount = p.amount;
    r.payable_basis = p.basis;
    r.ordered_at = r.submitted_at || r.approved_at || r.created_at;
    map.set(Number(r.trade_invoice_id), r);
  }
  return map;
}

/** camelCase 응답(`/to-pay` 등)에 붙일 발주 필드. 연결 발주가 없으면 전부 null. */
function purchaseOrderFieldsCamel(po) {
  return {
    purchaseOrderId: po ? po.id : null,
    purchaseOrderNumber: po ? po.po_number : null,
    purchaseOrderTotal: po ? po.total_amount : null,
    purchaseOrderIsExternal: po ? !!po.is_external : false,
    purchaseOrderEntityType: po ? po.entity_type : null,
    purchaseOrderStatus: po ? po.status : null,
    purchaseOrderPaymentStatus: po ? po.payment_status : null,
    payableAmount: po ? po.payable_amount : null,
    payableBasis: po ? po.payable_basis : null,
    poOrderedAt: po ? po.ordered_at : null,
    poReceivedAt: po ? po.received_at : null,
    supplierInvoiceNumber: po ? po.invoice_number : null,
    supplierInvoiceDate: po ? po.invoice_date : null,
    supplierInvoiceTotal: po ? po.invoice_total : null,
    invoiceReconciledAt: po ? po.invoice_reconciled_at : null,
    uploadedInvoiceUrl: po ? po.external_invoice_url : null,
  };
}

module.exports = { attachPurchaseOrders, purchaseOrderFieldsCamel };

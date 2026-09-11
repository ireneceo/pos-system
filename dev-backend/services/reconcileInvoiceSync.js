/**
 * 대조 확정 → 우리 청구서를 업로드 인보이스 값으로 맞춘다
 * 설계: docs/PURCHASE_ORDER_SYSTEM.md §5-3 (2026-09-08)
 *
 * > Irene: "업로드된 인보이스가 진짜인거지 외부공급업체는."
 *
 * 외부(솔루션 미가입) 공급업체가 보낸 인보이스가 **원본**이고, 우리가 자동 발행한 거래 청구서는
 * 추정치다. 사람이 대조를 확정하면 그 추정치를 실제 청구값으로 정정한다.
 *
 * ## 지키는 선
 * 1. **외부 공급업체 발주만.** 가입 공급업체 청구서는 그쪽이 발행 주체라 우리가 못 고친다.
 * 2. **이미 결제된 청구서는 건드리지 않는다.** 돈이 오간 원장을 나중에 고치면 낸 금액과 총액이
 *    갈리고, SOA·정산이 그 위에 쌓여 있다. 대신 사유를 돌려주고 사람이 판단하게 둔다.
 * 3. 라인 금액은 **실효값** — 청구가가 있으면 그것, 없으면 발주가(`COALESCE`).
 * 4. 세금·배송·할인은 **라인에 섞지 않고** 청구서 헤더로 넣는다(§2 와 같은 규칙).
 * 5. 총액은 우리가 직접 쓰지 않는다 — `finalizeInvoice` 가 라인 합으로 다시 계산한다.
 *    (직접 쓰면 "총액 0, 낸 돈 30" 같은 갈린 청구서가 나온다 — 2026-09-07 실측)
 */
const { PurchaseOrder, PurchaseOrderItem, Invoice, InvoiceItem, SupplierCompany } = require('../models');
const { finalizeInvoice } = require('../utils/invoiceCalculation');
const { attachSellerProductIdentity } = require('../utils/sellerProductIdentity');

const num = (v) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
};
const round2 = (n) => Math.round((Number(n) || 0) * 100) / 100;

/** 대조 허용 차액 — 통화의 주 단위 1(RM 1 · ₩1 · $1). 이 안이면 «반올림 조정» 한 줄로 맞춘다 (§8-3 B-2). */
const RECONCILE_TOLERANCE = 1.00;

/**
 * 대조한 인보이스의 계산 총액 — **단일 소스** (2026-09-11 §8-3 B-1).
 * 저장 검증(`cost-reconciliation` POST)과 아래 청구서 라인 재작성이 **같은 함수**를 쓴다 — 두 곳이 다른 식이면
 * «저장은 통과했는데 청구서 총액은 다르다» 가 다시 생긴다.
 *   줄 금액 = round2(실효단가 × 실효수량), 실효 = 청구값이 있으면 그것, 없으면 발주값
 *   총액   = Σ줄 + 세금 + 배송 − 할인
 */
function computeReconciledTotal(items, header = {}) {
  const lines = (items || []).reduce((s, it) => {
    const price = it.invoiced_unit_price != null ? num(it.invoiced_unit_price) : num(it.unit_price);
    const qty = it.invoiced_quantity != null ? num(it.invoiced_quantity) : num(it.quantity_ordered);
    return s + round2(price * qty);
  }, 0);
  return round2(lines + num(header.tax) + num(header.delivery) - num(header.discount));
}

/**
 * @param {number} poId
 * @param {{actorId?: number|null}} [opts]
 * @returns {Promise<{synced:boolean, reason?:string, invoice_id?:number, lines?:number, total?:number}>}
 */
async function syncTradeInvoiceFromReconcile(poId, opts = {}) {
  const po = await PurchaseOrder.findByPk(poId, { include: [{ model: PurchaseOrderItem, as: 'items' }] });
  if (!po) return { synced: false, reason: '발주를 찾을 수 없습니다' };
  if (!po.trade_invoice_id) return { synced: false, reason: '이 발주에는 우리 청구서가 없습니다' };

  // ① 외부 공급업체만
  if (po.seller_type !== 'supplier' || !po.seller_entity_id) {
    return { synced: false, reason: '공급업체 발주가 아닙니다' };
  }
  const sc = await SupplierCompany.findByPk(po.seller_entity_id, { attributes: ['id', 'is_system_registered'] });
  if (!sc || sc.is_system_registered) {
    return { synced: false, reason: '가입 공급업체 청구서는 공급업체가 발행 주체라 고치지 않습니다' };
  }

  const invoice = await Invoice.findByPk(po.trade_invoice_id);
  if (!invoice) return { synced: false, reason: '청구서 행이 없습니다' };

  // ② 결제된 청구서는 건드리지 않는다
  if (invoice.status === 'paid' || num(invoice.paid_amount) > 0) {
    return { synced: false, reason: '이미 결제 처리된 청구서라 금액을 고치지 않았습니다 — 필요하면 별도로 정정하세요' };
  }

  // ③ 라인 재작성 — 실효값 기준
  const poItems = (po.items || []).map((i) => (typeof i.toJSON === 'function' ? i.toJSON() : i));
  try {
    await attachSellerProductIdentity({ items: poItems });
  } catch (e) {
    console.error('[reconcileInvoiceSync] seller identity attach failed:', e.message);
  }

  await InvoiceItem.destroy({ where: { invoice_id: invoice.id } });
  let lines = 0;
  for (const item of poItems) {
    const price = item.invoiced_unit_price != null ? num(item.invoiced_unit_price) : num(item.unit_price);
    const qty = item.invoiced_quantity != null ? num(item.invoiced_quantity) : num(item.quantity_ordered);
    const amount = Math.round(price * qty * 100) / 100;
    await InvoiceItem.create({
      invoice_id: invoice.id,
      description: item.seller_product_name || item.description || `Item #${item.id}`,
      quantity: qty,
      unit: item.unit || null,
      unit_price: price,
      calculated_amount: amount,
      total_amount: amount,
      tax_amount: 0,
      item_type: 'product',
      calculation_method: 'fixed'
    });
    lines += 1;
  }

  // ④ 세금·배송·할인은 헤더로 (라인 단가에 섞지 않는다)
  //    ⚠ 세금은 **`additional_charges` 한 곳에만** 산다 — 이 시스템의 정본 경로다
  //    (utils/invoiceCalculation "Path B": 라인 tax_amount 는 폐기, 총액 = 소계 − 할인 + Σ charges).
  //    `invoices` 테이블에는 tax_amount 칸 자체가 없어서, 거기 쓰면 조용히 사라진다(2026-09-08 실측).
  const charges = [];
  if (num(po.invoice_tax) > 0) charges.push({ name: 'Tax', amount: num(po.invoice_tax) });
  if (num(po.invoice_delivery) > 0) charges.push({ name: 'Delivery', amount: num(po.invoice_delivery) });
  // 반올림 조정 — **적은 인보이스 총액이 기준**이다(§8-3 B-2 · Irene 승인 ③). 허용 차액 안이면 한 줄로 맞춰
  //   청구서 총액 = 적은 총액 = 드로어에서 낼 금액이 한 숫자가 되게 한다(`finalizeInvoice` 는 음수 charge 를 허용한다).
  //   허용 밖은 저장 단계에서 이미 400 으로 막혔다. 여기서도 문을 두는 이유: 옛 데이터가 큰 조정줄을 만들지 않게.
  if (po.invoice_total != null) {
    const computed = computeReconciledTotal(poItems,
      { tax: po.invoice_tax, delivery: po.invoice_delivery, discount: po.invoice_discount });
    const diff = round2(num(po.invoice_total) - computed);
    if (diff !== 0 && Math.abs(diff) <= RECONCILE_TOLERANCE) {
      charges.push({ name: 'Rounding adjustment', amount: diff });
    }
  }
  const patch = {
    additional_charges: charges,
    notes: [invoice.notes || '', po.invoice_number ? `Supplier invoice: ${po.invoice_number}` : '']
      .filter(Boolean).join(' / ').slice(0, 1000)
  };
  if (num(po.invoice_discount) > 0) {
    patch.discount_type = 'fixed';
    patch.discount_value = num(po.invoice_discount);
  }
  await invoice.update(patch);

  // ⑤ 총액은 finalize 가 계산한다
  await finalizeInvoice(invoice.id);
  await invoice.reload();

  return {
    synced: true,
    invoice_id: invoice.id,
    lines,
    total: num(invoice.total_amount)
  };
}

module.exports = { syncTradeInvoiceFromReconcile, computeReconciledTotal, RECONCILE_TOLERANCE };

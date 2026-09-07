/**
 * Purchase Order Service (Sprint 4 — Supply Chain Design 4)
 *
 * Trade Invoice auto-issuance on PO receive.
 * Idempotent (skip if already invoiced).
 */
const {
  PurchaseOrder, PurchaseOrderItem, Invoice, InvoiceItem,
  SupplierContract, SupplierCompany, Brand, Foodcourt, Restaurant, User
} = require('../models');
const { finalizeInvoice } = require('../utils/invoiceCalculation');
// 공급업체 판매품목명 해석 단일 소스 — 화면·인쇄본·공유메시지·인보이스가 같은 이름을 써야 한다.
const { attachSellerProductIdentity } = require('../utils/sellerProductIdentity');

/**
 * Compute payer_type, payer_id, restaurant_id from PO buyer side.
 */
async function resolvePayer(po) {
  if (po.entity_type === 'restaurant') {
    return { payer_type: 'restaurant', payer_id: po.entity_id, restaurant_id: po.entity_id };
  }
  if (po.entity_type === 'brand') {
    const brand = await Brand.findByPk(po.entity_id);
    return { payer_type: 'brand_manager', payer_id: brand?.owner_id || null, restaurant_id: null };
  }
  if (po.entity_type === 'foodcourt') {
    const foodcourt = await Foodcourt.findByPk(po.entity_id);
    return { payer_type: 'foodcourt_manager', payer_id: foodcourt?.owner_id || null, restaurant_id: null };
  }
  return { payer_type: 'external', payer_id: null, restaurant_id: null };
}

/**
 * Compute due_date from payment terms.
 *  - Immediate / COD / NET_X → invoice date + N days (default 7)
 *  - Monthly SOA → next month's payment_due_day
 */
function computeDueDate(paymentTerms, invoiceDate = new Date()) {
  const terms = paymentTerms || {};
  const cycle = terms.invoice_cycle || 'immediate';

  if (cycle === 'monthly_soa') {
    const dueDay = parseInt(terms.payment_due_day, 10) || 15;
    const next = new Date(invoiceDate.getFullYear(), invoiceDate.getMonth() + 1, dueDay);
    return next;
  }

  // Immediate variants
  let netDays = 7;
  if (terms.terms === 'NET_15') netDays = 15;
  else if (terms.terms === 'NET_30') netDays = 30;
  else if (terms.terms === 'NET_60') netDays = 60;
  else if (terms.terms === 'COD') netDays = 0;

  const due = new Date(invoiceDate);
  due.setDate(due.getDate() + netDays);
  return due;
}

/**
 * Generate trade invoice number.
 *  TRD-{TYPE_PREFIX}{seller_id}-{YYYYMMDD}-{seq}
 */
async function generateTradeInvoiceNumber(po) {
  const prefix = po.seller_type === 'supplier' ? 'SUP'
    : po.seller_type === 'brand' ? 'BRD'
    : po.seller_type === 'foodcourt' ? 'FC'
    : 'SA';
  const sellerId = po.seller_entity_id || 0;
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const baseNumber = `TRD-${prefix}${sellerId}-${dateStr}`;

  // Find next seq
  const { Op } = require('sequelize');
  const existing = await Invoice.count({
    where: { invoice_number: { [Op.like]: `${baseNumber}-%` } }
  });
  const seq = String(existing + 1).padStart(3, '0');
  return `${baseNumber}-${seq}`;
}

/**
 * Get payment_terms from PO context.
 *  - supplier seller → SupplierContract.payment_terms
 *  - brand seller + restaurant buyer → Restaurant.brand_billing_terms
 *  - foodcourt seller + restaurant buyer → Restaurant.foodcourt_billing_terms
 *  - others (system_admin, BG/FG buyer with brand/foodcourt seller) → default Immediate
 *
 * BG/FG → Restaurant trade billing terms — see docs/BG_FG_TRADE_BILLING.md.
 * Restaurant.{brand,foodcourt}_billing_terms uses the same JSON schema as
 * SupplierContract.payment_terms, so it can be returned as-is.
 */
async function resolvePaymentTerms(po) {
  // Supplier seller — existing behavior
  if (po.seller_type === 'supplier' && po.contract_id) {
    const contract = await SupplierContract.findByPk(po.contract_id);
    if (contract?.payment_terms) return contract.payment_terms;
  }

  // Brand / Foodcourt seller → Restaurant buyer-only billing terms.
  // BG/FG buyers (BG buying from another brand) keep default — that scenario isn't a use case.
  if (po.entity_type === 'restaurant' && po.entity_id) {
    if (po.seller_type === 'brand' && po.seller_entity_id) {
      const r = await Restaurant.findByPk(po.entity_id, {
        attributes: ['id', 'brand_id', 'brand_billing_terms']
      });
      // Sanity: only honor terms if buyer's brand_id matches the seller brand
      if (r && r.brand_id === po.seller_entity_id && r.brand_billing_terms) {
        return r.brand_billing_terms;
      }
    } else if (po.seller_type === 'foodcourt' && po.seller_entity_id) {
      const r = await Restaurant.findByPk(po.entity_id, {
        attributes: ['id', 'foodcourt_id', 'foodcourt_billing_terms']
      });
      if (r && r.foodcourt_id === po.seller_entity_id && r.foodcourt_billing_terms) {
        return r.foodcourt_billing_terms;
      }
    }
  }

  return { terms: 'NET_15', invoice_cycle: 'immediate', currency: po.currency || 'MYR' };
}

/**
 * Create Trade Invoice for a received PO.
 * Idempotent: skip if po.trade_invoice_id is already set.
 */
async function createTradeInvoice(po) {
  // Reload with items to ensure freshness
  const fullPo = await PurchaseOrder.findByPk(po.id, {
    include: [{ model: PurchaseOrderItem, as: 'items' }]
  });
  if (!fullPo) return null;

  // Idempotency check
  if (fullPo.trade_invoice_id) {
    const existing = await Invoice.findByPk(fullPo.trade_invoice_id);
    if (existing) return existing;
  }

  const paymentTerms = await resolvePaymentTerms(fullPo);
  const payer = await resolvePayer(fullPo);
  const invoiceNumber = await generateTradeInvoiceNumber(fullPo);
  const invoiceDate = new Date();
  const dueDate = computeDueDate(paymentTerms, invoiceDate);

  // Resolve issued_by user (NOT NULL):
  //  - supplier seller → SupplierCompany.owner_id
  //  - brand seller → Brand.owner_id
  //  - foodcourt seller → Foodcourt.owner_id
  //  - system_admin → fallback to po.created_by_user_id (SA-issued via PO creator)
  let issuedBy = fullPo.created_by_user_id || 1;
  if (fullPo.seller_type === 'supplier' && fullPo.seller_entity_id) {
    const sc = await SupplierCompany.findByPk(fullPo.seller_entity_id);
    if (sc?.owner_id) issuedBy = sc.owner_id;
  } else if (fullPo.seller_type === 'brand' && fullPo.seller_entity_id) {
    const b = await Brand.findByPk(fullPo.seller_entity_id);
    if (b?.owner_id) issuedBy = b.owner_id;
  } else if (fullPo.seller_type === 'foodcourt' && fullPo.seller_entity_id) {
    const fc = await Foodcourt.findByPk(fullPo.seller_entity_id);
    if (fc?.owner_id) issuedBy = fc.owner_id;
  }

  // 발주가 이미 결제된 건이면(=`receive-and-pay` · `/pay`) 청구서도 **결제됨**으로 낸다.
  //   왜: 돈은 이미 서랍(cash_movement)에서 나갔다. 미수로 내면 그게 거짓이고,
  //   `soaScheduler.issueSoaForPair` 가 미결제 여부를 안 보므로 **다음 달 SOA 에 또 실린다**.
  //   원장 규칙(2026-09-07 Fable): 먼저 기록된 원장을 다른 원장이 거울처럼 따른다.
  //   여기서 1차 기록은 발주(`payment_status`)이고 청구서가 거울이다.
  const alreadyPaid = fullPo.payment_status === 'paid';

  // 수령일은 **매장 타임존** 기준이다. `toISOString()` 은 UTC 라, 말레이시아(+8)에서
  // 아침 8시 전에 받은 물건이 **전날 날짜**로 청구서 비고에 박힌다 — 배송 수령은 대개 오전이다.
  // (CLAUDE.md 타임존 절대규칙. 2026-09-07 Fable 게이트 적발.)
  let receivedOn = null;
  if (fullPo.received_at) {
    let tz = 'Asia/Kuala_Lumpur';                     // 구매자가 브랜드·푸드코트면 폴백
    if (fullPo.entity_type === 'restaurant' && fullPo.entity_id) {
      try {
        const { getRestaurantTimezone } = require('../utils/dateTimeHelper');
        const buyer = await Restaurant.findByPk(fullPo.entity_id, { attributes: ['id', 'operation_settings'] });
        if (buyer) tz = getRestaurantTimezone(buyer);
      } catch (e) { /* 타임존 조회 실패가 청구서 발행을 막지 않는다 — 폴백으로 간다 */ }
    }
    receivedOn = new Date(fullPo.received_at).toLocaleDateString('en-CA', { timeZone: tz });
  }

  // Create Invoice
  const invoice = await Invoice.create({
    invoice_number: invoiceNumber,
    type: 'automatic',
    invoice_category: 'trade',
    category_display_name: 'Purchase Order',
    issuer_type: fullPo.seller_type === 'system_admin' ? 'system_admin' : fullPo.seller_type,
    issuer_id: fullPo.seller_entity_id || 1, // SA defaults to 1
    issued_by: issuedBy,
    issued_at: new Date(),
    payer_type: payer.payer_type,
    payer_id: payer.payer_id,
    restaurant_id: payer.restaurant_id,
    contract_id: fullPo.contract_id || null,
    billing_period_start: invoiceDate,
    billing_period_end: invoiceDate,
    due_date: dueDate,
    subtotal: fullPo.subtotal || 0,
    tax_amount: fullPo.tax_amount || 0,
    discount_amount: 0,
    total_amount: fullPo.total_amount || 0,
    currency: fullPo.currency || 'MYR',
    status: alreadyPaid ? 'paid' : 'pending_payment',
    paid_amount: alreadyPaid ? (fullPo.total_amount || 0) : 0,
    paid_at: alreadyPaid ? (fullPo.paid_at || new Date()) : null,
    payment_method: alreadyPaid ? (fullPo.payment_method || null) : null,
    // 발행일은 **만드는 날**이다(소급 금지). 언제 받은 물건인지는 비고에 남긴다 —
    // 뒤늦게 채우는 청구서(백필)도 이 규칙을 그대로 따른다.
    notes: receivedOn
      ? `Purchase Order: ${fullPo.po_number} / received ${receivedOn}`
      : `Purchase Order: ${fullPo.po_number}`
  });

  // Create InvoiceItems from PO items
  //
  // 2026-08-31 Irene: "인보이스는 모두 공급업체에 보내는 건 모두 공급업체 상품표시" /
  //                   "공급업체에 보내는 건 우리 표시이름은 없어도 되지 않아?"
  // 그전까지 라인 이름이 `item.description` = **우리 내부 재고명 스냅샷**이라, 받는 공급업체가
  // 자기 창고 품목과 대조할 수 없었다. 실제로 이름이 다르다 —
  // 우리 `Cheddar Cheese` ↔ 공급업체 `Fresh Whole Milk` / 우리 `Beef Rib` ↔ `Australian Beef Rib`.
  // 판매품목명 해석은 단일 소스(utils/sellerProductIdentity) 경유 — 화면·인쇄본·메일과 같은 답을 내야 한다.
  // 매핑 없는 라인(외부 판매자·옛 발주)은 내부명으로 폴백해 빈칸이 되지 않게 한다.
  const poItems = (fullPo.items || []).map(i => (typeof i.toJSON === 'function' ? i.toJSON() : i));
  try {
    await attachSellerProductIdentity({ items: poItems });
  } catch (e) {
    // 이름 해석 실패가 인보이스 발행 자체를 막으면 안 된다 — 내부명 폴백으로 계속 간다.
    console.error('[purchaseOrderService] seller identity attach failed:', e.message);
  }
  for (const item of poItems) {
    await InvoiceItem.create({
      invoice_id: invoice.id,
      description: item.seller_product_name || item.description || `Item #${item.id}`,
      quantity: item.quantity_ordered,
      unit: item.unit || null,
      unit_price: item.unit_price,
      calculated_amount: item.line_total,
      total_amount: item.line_total,
      tax_amount: 0,
      item_type: 'product',
      calculation_method: 'fixed'
    });
  }

  // Finalize (recompute totals using existing helper)
  try { await finalizeInvoice(invoice.id); } catch (e) {
    console.error('[purchaseOrderService] finalizeInvoice error:', e.message);
  }

  // 🔴 낸 금액은 **청구서 자기 총액**을 따른다 (2026-09-07 Fable 게이트).
  //   `finalizeInvoice` 가 `total_amount` 를 **품목 합**으로 다시 계산한다. 발주 헤더 금액을
  //   `paid_amount` 에 넣으면 둘이 갈려 "총액 0, 낸 돈 30" 같은 청구서가 나온다
  //   (dev 백필 실측에서 실제로 나왔다). finalize 뒤 값을 읽어 맞춘다.
  if (alreadyPaid) {
    await invoice.reload();
    const finalTotal = Number(invoice.total_amount || 0);
    if (Number(invoice.paid_amount || 0) !== finalTotal) {
      await invoice.update({ paid_amount: finalTotal });
    }
  }

  // Link back to PO
  await fullPo.update({ trade_invoice_id: invoice.id });

  return invoice;
}

module.exports = {
  createTradeInvoice,
  resolvePayer,
  resolvePaymentTerms,
  computeDueDate,
  generateTradeInvoiceNumber
};

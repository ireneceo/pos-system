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
 *  - others → default Immediate
 */
async function resolvePaymentTerms(po) {
  if (po.seller_type === 'supplier' && po.contract_id) {
    const contract = await SupplierContract.findByPk(po.contract_id);
    if (contract?.payment_terms) return contract.payment_terms;
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
    status: 'pending_payment',
    notes: `Purchase Order: ${fullPo.po_number}`
  });

  // Create InvoiceItems from PO items
  for (const item of fullPo.items || []) {
    await InvoiceItem.create({
      invoice_id: invoice.id,
      description: item.description || `Item #${item.id}`,
      quantity: item.quantity_ordered,
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

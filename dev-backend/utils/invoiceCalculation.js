/**
 * Invoice header recalculation — single source of truth.
 *
 * Why: invoice header (subtotal/discount/total_amount) and invoice_items rows
 * were saved independently from frontend, leading to header total ≠ items sum
 * and emails showing arithmetic-inconsistent values (e.g. "subtotal 179 + tax 0
 * = total 189.74"). On audit, 17/79 dev invoices had the SAME tax amount
 * stored both in items.tax_amount AND header.additional_charges, so a naive
 * "sum both" rule double-counts tax. We pick one canonical storage path.
 *
 * Canonical model (single source of truth):
 *   items[i].calculated_amount  — line amount, pre-tax, pre-discount
 *   items[i].tax_amount         — DEPRECATED, force to 0 (Path A retired)
 *   items[i].total_amount       — = calculated_amount (no per-item tax)
 *   header.subtotal             — Σ items[i].calculated_amount
 *   header.additional_charges   — [{name, rate, amount}] all charges (SST etc.)
 *   header.discount_amount      — derived from discount_type/value
 *   header.total_amount         — subtotal − discount_amount + Σ charges
 *
 * Tax now lives exclusively in header.additional_charges (Path B). This was
 * already the dominant pattern in dev data (30/79) so the migration favors it.
 */
'use strict';

function round2(n) { return Math.round((Number(n) || 0) * 100) / 100; }

function normalizeItem(item) {
  const calc = round2(item.calculated_amount ?? item.unit_price ?? item.amount ?? 0);
  return {
    ...item,
    calculated_amount: calc,
    tax_amount: 0,
    total_amount: calc
  };
}

/**
 * @param {Object} header  - {subtotal, additional_charges, discount_type, discount_value, ...}
 * @param {Array}  items   - invoice_items rows
 * @returns {{header: Object, items: Array, breakdown: Object}}
 */
function recomputeInvoiceTotals(header, items) {
  const itemsArr = Array.isArray(items) ? items.map(normalizeItem) : [];

  const subtotal = round2(itemsArr.reduce((s, i) => s + i.calculated_amount, 0));

  const charges = Array.isArray(header.additional_charges) ? header.additional_charges : [];
  const chargesTotal = round2(charges.reduce((s, c) => s + (Number(c.amount) || 0), 0));

  const dt = header.discount_type || 'none';
  const dv = Number(header.discount_value) || 0;
  let discountAmount = 0;
  if (dt === 'percentage') discountAmount = round2(subtotal * (dv / 100));
  else if (dt === 'fixed') discountAmount = round2(dv);

  const total = round2(subtotal - discountAmount + chargesTotal);

  return {
    header: {
      ...header,
      subtotal,
      discount_amount: discountAmount,
      total_amount: total
    },
    items: itemsArr,
    breakdown: {
      subtotal,
      charges_total: chargesTotal,
      discount_amount: discountAmount,
      total_amount: total
    }
  };
}

/**
 * Convenience: load an invoice + items, recompute, persist. Call this at the
 * end of any code path that just created/edited an invoice manually (auto-
 * generation, scheduler, hardware/subscription routes) so the canonical
 * single-source-of-truth invariant is enforced even when the caller didn't
 * pre-compute totals consistently.
 */
async function finalizeInvoice(invoiceId, transaction) {
  const Invoice = require('../models/Invoice');
  const InvoiceItem = require('../models/InvoiceItem');
  const opts = transaction ? { transaction } : {};
  const inv = await Invoice.findByPk(invoiceId, {
    include: [{ model: InvoiceItem, as: 'items' }],
    ...opts
  });
  if (!inv) return null;
  const items = (inv.items || []).map(r => r.toJSON());
  const recomputed = recomputeInvoiceTotals(inv.toJSON(), items);
  await inv.update({
    subtotal: recomputed.header.subtotal,
    discount_amount: recomputed.header.discount_amount,
    total_amount: recomputed.header.total_amount
  }, opts);
  for (const it of recomputed.items) {
    if (it.id) await InvoiceItem.update(
      { calculated_amount: it.calculated_amount, tax_amount: it.tax_amount, total_amount: it.total_amount },
      { where: { id: it.id }, ...opts }
    );
  }
  return recomputed;
}

module.exports = { recomputeInvoiceTotals, normalizeItem, round2, finalizeInvoice };

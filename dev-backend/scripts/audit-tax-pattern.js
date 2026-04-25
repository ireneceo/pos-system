/**
 * Diagnose how `tax` is stored across invoices. We have two competing storage
 * paths for invoice tax, and some legacy rows write the same SST amount into
 * BOTH paths — meaning a "sum both" rule double-counts tax for those rows.
 *
 * Path A — items.tax_amount  (per-item tax)
 * Path B — header.additional_charges  (whole-invoice charges, e.g. SST 6%)
 *
 * Output: classify each invoice into which path it actually stores tax in,
 * and flag duplicates so we can pick a single source of truth.
 */
const m = require('../models');
const sequelize = m.User.sequelize;
const Invoice = m.Invoice;
const InvoiceItem = m.InvoiceItem;

(async () => {
  const invoices = await Invoice.findAll({ include: [{ model: InvoiceItem, as: 'items' }] });
  let onlyA = 0, onlyB = 0, both = 0, neither = 0, noTax = 0;
  const examples = { onlyA: [], onlyB: [], both: [], neither: [] };

  for (const inv of invoices) {
    const itemsTax = (inv.items || []).reduce((s, i) => s + parseFloat(i.tax_amount || 0), 0);
    const charges = Array.isArray(inv.additional_charges) ? inv.additional_charges : [];
    const taxLikeCharges = charges.filter(c => /tax|sst|gst|vat/i.test(c.name || ''));
    const chargesTax = taxLikeCharges.reduce((s, c) => s + parseFloat(c.amount || 0), 0);

    const hasA = itemsTax > 0;
    const hasB = chargesTax > 0;

    if (!hasA && !hasB) {
      const totalDiff = parseFloat(inv.total_amount || 0) - parseFloat(inv.subtotal || 0);
      if (Math.abs(totalDiff) < 0.01) noTax++;
      else { neither++; if (examples.neither.length < 3) examples.neither.push({ id: inv.id, n: inv.invoice_number, sub: inv.subtotal, total: inv.total_amount }); }
      continue;
    }
    if (hasA && hasB) {
      both++;
      if (examples.both.length < 5) examples.both.push({ id: inv.id, n: inv.invoice_number, itemsTax: itemsTax.toFixed(2), chargesTax: chargesTax.toFixed(2), total: inv.total_amount, subtotal: inv.subtotal });
      continue;
    }
    if (hasA) { onlyA++; if (examples.onlyA.length < 3) examples.onlyA.push({ id: inv.id, n: inv.invoice_number, itemsTax: itemsTax.toFixed(2) }); continue; }
    if (hasB) { onlyB++; if (examples.onlyB.length < 3) examples.onlyB.push({ id: inv.id, n: inv.invoice_number, chargesTax: chargesTax.toFixed(2) }); }
  }

  console.log(`Total invoices: ${invoices.length}`);
  console.log(`No tax at all: ${noTax}`);
  console.log(`Tax only in items.tax_amount (Path A): ${onlyA}`);
  console.log(`Tax only in additional_charges (Path B): ${onlyB}`);
  console.log(`Tax DUPLICATED in both (Path A+B): ${both}  ← double-count risk`);
  console.log(`Tax appears in neither but total > subtotal: ${neither}  ← orphan tax`);
  console.log('\nExamples (both):'); examples.both.forEach(e => console.log(' ', e));
  console.log('\nExamples (onlyA):'); examples.onlyA.forEach(e => console.log(' ', e));
  console.log('\nExamples (onlyB):'); examples.onlyB.forEach(e => console.log(' ', e));
  console.log('\nExamples (neither but total>sub):'); examples.neither.forEach(e => console.log(' ', e));

  await sequelize.close();
})().catch(e => { console.error(e.stack || e.message); process.exit(1); });

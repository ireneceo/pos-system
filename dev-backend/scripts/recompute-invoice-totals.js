/**
 * One-shot migration — recompute every invoice's header against its items
 * + additional_charges + discount, using the same `recomputeInvoiceTotals`
 * helper that POST/PUT now run on every write. Brings legacy rows into the
 * single-source-of-truth invariant.
 *
 * Usage:
 *   node scripts/recompute-invoice-totals.js --dry-run   # preview only
 *   node scripts/recompute-invoice-totals.js             # apply
 */
const m = require('../models');
const sequelize = m.User.sequelize;
const Invoice = m.Invoice;
const InvoiceItem = m.InvoiceItem;
const { recomputeInvoiceTotals } = require('../utils/invoiceCalculation');

const DRY = process.argv.includes('--dry-run');

(async () => {
  const invoices = await Invoice.findAll({ include: [{ model: InvoiceItem, as: 'items' }] });
  let touched = 0, unchanged = 0, errors = 0;
  for (const inv of invoices) {
    try {
      const items = (inv.items || []).map(r => r.toJSON());
      const recomputed = recomputeInvoiceTotals(inv.toJSON(), items);
      const before = {
        subtotal: parseFloat(inv.subtotal || 0),
        discount_amount: parseFloat(inv.discount_amount || 0),
        total_amount: parseFloat(inv.total_amount || 0)
      };
      const after = {
        subtotal: recomputed.header.subtotal,
        discount_amount: recomputed.header.discount_amount,
        total_amount: recomputed.header.total_amount
      };
      const drift = ['subtotal', 'discount_amount', 'total_amount'].some(k => Math.abs(before[k] - after[k]) > 0.01);
      const itemsDrift = recomputed.items.some(it => {
        const orig = (inv.items || []).find(r => r.id === it.id);
        if (!orig) return false;
        return Math.abs(parseFloat(orig.total_amount || 0) - it.total_amount) > 0.01;
      });
      if (!drift && !itemsDrift) { unchanged++; continue; }
      console.log(`#${inv.id} ${inv.invoice_number}`);
      if (drift) console.log(`  header: ${JSON.stringify(before)} → ${JSON.stringify(after)}`);
      if (itemsDrift) console.log(`  items: total_amount realigned to calculated_amount + tax_amount`);
      if (!DRY) {
        await sequelize.transaction(async (tx) => {
          await inv.update(after, { transaction: tx });
          for (const it of recomputed.items) {
            await InvoiceItem.update(
              { calculated_amount: it.calculated_amount, tax_amount: it.tax_amount, total_amount: it.total_amount },
              { where: { id: it.id }, transaction: tx }
            );
          }
        });
      }
      touched++;
    } catch (e) {
      errors++;
      console.error(`#${inv.id} ${inv.invoice_number} ERR: ${e.message}`);
    }
  }
  console.log(`\n${DRY ? '[DRY RUN] ' : ''}Touched: ${touched}, Unchanged: ${unchanged}, Errors: ${errors}, Total: ${invoices.length}`);
  await sequelize.close();
})().catch(e => { console.error(e.stack || e.message); process.exit(1); });

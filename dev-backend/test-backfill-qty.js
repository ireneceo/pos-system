// Backfill invoice_items.quantity + unit_price for hardware addon items
// where description was previously written as "Name x{N}".
require('dotenv').config();
const { sequelize } = require('./config/database');
const InvoiceItem = require('./models/InvoiceItem');

(async () => {
  const items = await InvoiceItem.findAll({
    where: { item_type: 'hardware_addon' },
    attributes: ['id', 'description', 'quantity', 'unit_price', 'fixed_amount', 'calculated_amount']
  });
  console.log(`Scanning ${items.length} hardware_addon items`);
  let fixed = 0;
  let skipped = 0;
  for (const it of items) {
    // Match trailing " x{number}" — captures qty
    const m = (it.description || '').match(/^(.*?)\s*x(\d+)\s*$/i);
    if (!m) { skipped++; continue; }
    const cleanDesc = m[1].trim();
    const qty = parseInt(m[2]) || 1;
    const lineTotal = parseFloat(it.fixed_amount || it.calculated_amount || 0);
    const unitPrice = qty > 0 ? Math.round((lineTotal / qty) * 100) / 100 : lineTotal;
    await it.update({
      description: cleanDesc,
      quantity: qty,
      unit_price: unitPrice
    });
    fixed++;
    if (fixed <= 10) console.log(`  fixed id=${it.id}: "${cleanDesc}" qty=${qty} unit=${unitPrice}`);
  }
  console.log(`\nDone: fixed=${fixed} skipped=${skipped}`);
  await sequelize.close();
})().catch(e => { console.error('FAIL:', e); process.exit(1); });

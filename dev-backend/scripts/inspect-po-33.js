require('../models');
const { sequelize } = require('../config/database');
const q = (s, r) => sequelize.query(s, { type: sequelize.QueryTypes.SELECT, replacements: r });
(async () => {
  const id = parseInt(process.argv[2], 10) || 33;
  const [po] = await q(`SELECT id, po_number, status, seller_type, seller_entity_id, entity_type, entity_id,
      external_invoice_url, external_invoice_filename, external_invoice_uploaded_at,
      invoice_number, invoice_reconciled_at, total_amount FROM purchase_orders WHERE id = :i`, { i: id });
  console.log(JSON.stringify(po, null, 1));
  const items = await q(`SELECT id, description, unit, quantity_ordered, unit_price, invoiced_unit_price, invoiced_quantity, ingredient_seller_product_id FROM purchase_order_items WHERE purchase_order_id = :i ORDER BY id`, { i: id });
  console.log(`라인 ${items.length}건`);
  for (const it of items) console.log(`  ${String(it.description||'').slice(0,40)} | ${it.quantity_ordered}${it.unit} @${it.unit_price} → 청구 ${it.invoiced_unit_price ?? '미대조'}`);
  process.exit(0);
})().catch(e => { console.error(e.message); process.exit(1); });

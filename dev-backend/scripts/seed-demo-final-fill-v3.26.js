// seed-demo-final-fill-v3.26.js
// C4 — R38 시계열 주문 보강 + demo restaurants 회사정보 일괄.
// idempotent: 시드 마커 'D38-' (R38 주문) / 그외는 COALESCE(NULLIF(...,''))
require('dotenv').config();
const { sequelize } = require('../db');

async function exec(sql, repl = {}) { await sequelize.query(sql, { replacements: repl }); }
async function q(sql, repl = {}) { const [r] = await sequelize.query(sql, { replacements: repl }); return r; }

(async () => {
  // 1. R38 company info
  console.log('[1] R38 company info');
  await exec(`UPDATE restaurants SET
    business_registration = COALESCE(NULLIF(business_registration, ''), 'BR-SEOUL-2024'),
    tax_id = COALESCE(NULLIF(tax_id, ''), 'TX-SEOUL-002'),
    phone = COALESCE(NULLIF(phone, ''), '+60-12-111-2222'),
    currency = COALESCE(currency, 'MYR')
    WHERE id=38`);

  // 2. R38 30-day orders
  console.log('[2] R38 30d orders (clear seeded then insert)');
  await exec(`DELETE FROM orders WHERE restaurant_id=38 AND order_number LIKE 'D38-%'`);
  const products = await q(`SELECT id, price FROM products WHERE restaurant_id=38 AND price > 0 LIMIT 12`);
  if (products.length === 0) {
    console.log('   no products on R38, skipping');
  } else {
    let seq = 0;
    for (let i = 0; i < 30; i++) {
      const daysAgo = Math.floor(Math.random() * 30);
      const hoursAgo = Math.floor(Math.random() * 14) + 8;
      const orderTime = new Date(Date.now() - daysAgo * 86400000 - hoursAgo * 3600000);
      const ts = orderTime.toISOString().slice(0,19).replace('T',' ');
      const itemCount = 1 + Math.floor(Math.random() * 3);
      const items = [];
      let subtotal = 0;
      for (let j = 0; j < itemCount; j++) {
        const p = products[Math.floor(Math.random() * products.length)];
        const qty = 1 + Math.floor(Math.random() * 2);
        const lineTotal = Number(p.price) * qty;
        items.push({ product_id: p.id, quantity: qty, unit_price: p.price, total_price: lineTotal });
        subtotal += lineTotal;
      }
      seq++;
      const orderNum = `D38-${ts.slice(0,10).replace(/-/g,'')}-${String(seq).padStart(3,'0')}`;
      const status = Math.random() < 0.9 ? 'completed' : 'cancelled';
      const orderType = ['dine_in','takeaway','dine_in','dine_in','pickup'][Math.floor(Math.random() * 5)];
      const tableNum = orderType === 'dine_in' ? `T${1 + Math.floor(Math.random() * 8)}` : null;
      await exec(`INSERT INTO orders (restaurant_id, order_number, customer_name, table_number, total_amount, subtotal, status, order_type, source, payment_method, payment_status, order_date, order_items, createdAt, updatedAt)
         VALUES (38, :on, 'Walk-in', :tn, :ta, :st, :s, :ot, 'pos', 'cash', 'completed', :t, :items, :t, :t)`,
        { on: orderNum, tn: tableNum, ta: subtotal, st: subtotal, s: status, ot: orderType, t: ts, items: JSON.stringify(items) });
    }
    console.log('   30 orders inserted');
  }

  // 3. demo_supplier company info safety
  console.log('[3] supplier_companies info safety');
  // Already populated; just log
  const sc = await q(`SELECT id, name, registration_no, tax_no, phone FROM supplier_companies WHERE id=20`);
  console.log(`   SC20 ${sc[0]?.name}: reg=${sc[0]?.registration_no || '(empty)'} tax=${sc[0]?.tax_no || '(empty)'}`);
  if (sc[0] && (!sc[0].registration_no || !sc[0].tax_no)) {
    await exec(`UPDATE supplier_companies SET
      registration_no = COALESCE(NULLIF(registration_no, ''), 'SUP-DEMO-2024'),
      tax_no = COALESCE(NULLIF(tax_no, ''), 'TX-SUP-DEMO'),
      phone = COALESCE(NULLIF(phone, ''), '+60-3-9999 8888')
      WHERE id=20`);
    console.log('   supplier company info filled');
  }

  // Final
  const r = await q(`SELECT
    (SELECT COUNT(*) FROM orders WHERE restaurant_id=38 AND createdAt >= DATE_SUB(NOW(), INTERVAL 30 DAY)) AS r38_30d,
    (SELECT business_registration FROM restaurants WHERE id=38) AS r38_reg,
    (SELECT tax_id FROM restaurants WHERE id=38) AS r38_tax`);
  console.log('\n=== final ===');
  console.log(`R38 orders30d=${r[0].r38_30d} reg=${r[0].r38_reg} tax=${r[0].r38_tax}`);

  await sequelize.close();
})().catch(e => { console.error('SEED FAIL', e); process.exit(1); });

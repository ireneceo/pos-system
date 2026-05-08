// seed-demo-owner-rich-v3.26.js
// Owner 의 비어있는 매장(R2, R3, R6, R7) 에 데모 카탈로그 + 30일 주문 시드.
// Owner dashboard / Reports 에서 다중 매장 비교가 의미를 가지도록.
//
// idempotent: 시드 마커 'SEED-V326-OWNER-DEMO' 를 categories.description / products.description 에 넣어 식별.
require('dotenv').config();
const { sequelize } = require('../db');
const SEED = 'SEED-V326-OWNER-DEMO';

async function exec(sql, repl = {}) { await sequelize.query(sql, { replacements: repl }); }
async function q(sql, repl = {}) { const [r] = await sequelize.query(sql, { replacements: repl }); return r; }

// 매장별 카탈로그 컨셉
const CATALOGS = {
  2: { // Downtown Pizza
    cats: [
      { name: 'Pizza',  items: [['Margherita', 28.00], ['Pepperoni', 32.00], ['Hawaiian', 30.00]] },
      { name: 'Sides',  items: [['Garlic Bread', 8.00], ['Caesar Salad', 14.00]] },
      { name: 'Drinks', items: [['Coke 330ml', 5.00], ['Iced Lemon Tea', 6.00], ['Mineral Water', 3.00]] }
    ]
  },
  3: { // Sunset Cafe
    cats: [
      { name: 'Coffee',     items: [['Americano', 10.00], ['Cappuccino', 13.00], ['Latte', 13.00]] },
      { name: 'Pastries',   items: [['Croissant', 7.00], ['Blueberry Muffin', 8.00], ['Cinnamon Roll', 9.00]] },
      { name: 'Sandwiches', items: [['Egg & Avocado', 18.00], ['Smoked Salmon', 24.00]] }
    ]
  },
  6: { // Sunway Pyramid Foodcourt (generic)
    cats: [
      { name: 'Mains',  items: [['Nasi Lemak', 12.00], ['Mee Goreng', 11.00], ['Chicken Rice', 13.00]] },
      { name: 'Snacks', items: [['Roti Canai', 4.00], ['Curry Puff', 3.50]] },
      { name: 'Drinks', items: [['Teh Tarik', 5.00], ['Iced Milo', 6.00], ['Sirap Bandung', 5.50]] }
    ]
  },
  7: { // KFC Sunway Pyramid (chicken theme)
    cats: [
      { name: 'Chicken', items: [['2-pc Chicken Set', 18.50], ['3-pc Chicken Combo', 24.00], ['Chicken Wrap', 12.00]] },
      { name: 'Sides',   items: [['Coleslaw', 5.50], ['Mashed Potato', 5.50], ['Whipped Potato', 6.00]] },
      { name: 'Drinks',  items: [['Pepsi', 5.50], ['Mountain Dew', 5.50]] }
    ]
  }
};

const OWNERS = [
  { user_id: 289, name: 'Demo Owner Sdn Bhd' },
  { user_id: 154, name: 'Test Owner Group' }
];

(async () => {
  // 1. company info on owner restaurants
  console.log('[1] company info on R2/R3/R6/R7');
  const compFill = [
    { id: 2, biz: 'PIZZA-2024-001', tax: 'TX-PIZZA-002', phone: '+60 3-2200 0202' },
    { id: 3, biz: 'CAFE-2024-001',  tax: 'TX-CAFE-003',  phone: '+60 3-2200 0303' },
    { id: 6, biz: 'SP-FC-2024-006', tax: 'TX-SPFC-006',  phone: '+60 3-2300 0606' },
    { id: 7, biz: 'KFC-2024-007',   tax: 'TX-KFC-007',   phone: '+60 3-2300 0707' }
  ];
  for (const c of compFill) {
    await exec(`UPDATE restaurants SET
      business_registration = COALESCE(NULLIF(business_registration,''), :biz),
      tax_id = COALESCE(NULLIF(tax_id,''), :tax),
      phone = COALESCE(NULLIF(phone,''), :phone),
      currency = COALESCE(currency, 'MYR')
      WHERE id=:id`, c);
  }

  // 2. clear seeded categories/products/orders → reseed
  for (const rid of Object.keys(CATALOGS)) {
    const restaurantId = Number(rid);
    console.log(`\n[R${restaurantId}] reseed catalog + 30d orders`);

    // clear seeded only (preserve existing non-seed data)
    await exec(`DELETE FROM orders WHERE restaurant_id=:r AND order_number LIKE 'D-%'`, { r: restaurantId });
    await exec(`DELETE FROM products WHERE restaurant_id=:r AND description=:s`, { r: restaurantId, s: SEED });
    await exec(`DELETE FROM categories WHERE restaurant_id=:r AND description=:s`, { r: restaurantId, s: SEED });

    // reseed categories
    const catBlocks = [];
    for (const cat of CATALOGS[restaurantId].cats) {
      await sequelize.query(
        `INSERT INTO categories (restaurant_id, name, description, createdAt, updatedAt) VALUES (:r, :n, :s, NOW(), NOW())`,
        { replacements: { r: restaurantId, n: cat.name, s: SEED } }
      );
      catBlocks.push({ name: cat.name, items: cat.items });
    }

    // reseed products — `category` is a string column, not FK
    const productIds = [];
    for (const c of catBlocks) {
      for (const [name, price] of c.items) {
        const [r] = await sequelize.query(
          `INSERT INTO products (restaurant_id, category, name, price, description, createdAt, updatedAt)
           VALUES (:r, :c, :n, :p, :s, NOW(), NOW())`,
          { replacements: { r: restaurantId, c: c.name, n: name, p: price, s: SEED } }
        );
        productIds.push({ id: r.insertId || r, price });
      }
    }
    console.log(`   ${catBlocks.length} cats, ${productIds.length} products`);

    // reseed orders (last 30 days, ~25 orders)
    const ORDER_COUNT = 25;
    let orderSeq = 0;
    for (let i = 0; i < ORDER_COUNT; i++) {
      const daysAgo = Math.floor(Math.random() * 30);
      const hoursAgo = Math.floor(Math.random() * 14) + 8; // 8am ~ 22pm
      const orderTime = new Date(Date.now() - daysAgo * 86400000 - hoursAgo * 3600000);
      const itemCount = 1 + Math.floor(Math.random() * 3);
      const items = [];
      let subtotal = 0;
      for (let j = 0; j < itemCount; j++) {
        const p = productIds[Math.floor(Math.random() * productIds.length)];
        const qty = 1 + Math.floor(Math.random() * 2);
        const lineTotal = Number(p.price) * qty;
        items.push({ product_id: p.id, qty, price: p.price, line_total: lineTotal });
        subtotal += lineTotal;
      }
      const ts = orderTime.toISOString().slice(0,19).replace('T',' ');
      orderSeq++;
      const orderNum = `D-${restaurantId}-${ts.slice(0,10).replace(/-/g,'')}-${String(orderSeq).padStart(3,'0')}`;
      const status = Math.random() < 0.85 ? 'completed' : 'cancelled';
      const orderType = ['dine_in','takeaway','dine_in','dine_in','pickup'][Math.floor(Math.random() * 5)];
      const tableNum = orderType === 'dine_in' ? `T${1 + Math.floor(Math.random() * 8)}` : null;

      const orderItemsJson = JSON.stringify(items.map(it => ({
        product_id: it.product_id, quantity: it.qty, unit_price: it.price, total_price: it.line_total
      })));
      await sequelize.query(
        `INSERT INTO orders (restaurant_id, order_number, customer_name, table_number, total_amount, subtotal, status, order_type, source, payment_method, payment_status, order_date, order_items, createdAt, updatedAt)
         VALUES (:r, :on, :cn, :tn, :ta, :st, :s, :ot, 'pos', 'cash', 'completed', :t, :items, :t, :t)`,
        { replacements: { r: restaurantId, on: orderNum, cn: 'Walk-in', tn: tableNum, ta: subtotal, st: subtotal, s: status, ot: orderType, t: ts, items: orderItemsJson } }
      );
    }
    console.log(`   ${ORDER_COUNT} orders inserted`);
  }

  // Final summary
  for (const rid of [1,2,3,6,7,8]) {
    const r = await q(`SELECT
      (SELECT COUNT(*) FROM categories WHERE restaurant_id=:r) AS cats,
      (SELECT COUNT(*) FROM products WHERE restaurant_id=:r) AS prods,
      (SELECT COUNT(*) FROM orders WHERE restaurant_id=:r) AS orders,
      (SELECT COUNT(*) FROM orders WHERE restaurant_id=:r AND createdAt >= DATE_SUB(NOW(), INTERVAL 30 DAY)) AS orders30,
      (SELECT name FROM restaurants WHERE id=:r) AS name`,
      { r: rid });
    console.log(`R${rid} ${r[0].name}: cats=${r[0].cats} prods=${r[0].prods} orders=${r[0].orders} (30d=${r[0].orders30})`);
  }

  await sequelize.close();
})().catch(e => { console.error('SEED FAIL', e); process.exit(1); });

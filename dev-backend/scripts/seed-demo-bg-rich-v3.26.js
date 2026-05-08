// seed-demo-bg-rich-v3.26.js
// Brand General 데모 보강 — B10 (demo_brand_general / owner=user 22) + B1 (test_brand_general / owner=user 6)
//   - brand company info (registration/tax/phone)
//   - brand_product_categories (owner_user_id 단위 격리)
//   - brand_products + brand_product_brands join
//
// idempotent: 시드 마커 'SEED-V326-BG' 사용 (description / sku 컬럼).
require('dotenv').config();
const { sequelize } = require('../db');
const SEED = 'SEED-V326-BG';

async function exec(sql, repl = {}) { await sequelize.query(sql, { replacements: repl }); }
async function q(sql, repl = {}) { const [r] = await sequelize.query(sql, { replacements: repl }); return r; }

const BRANDS = [
  {
    brand_id: 10, owner_user_id: 22,
    company: { reg: 'BR-KTASTE-2024', tax: 'TX-KTASTE-001', phone: '+60-12-345-6789' },
    cats: [
      { name: 'Korean Mains', emoji: '🍚', items: [
        ['Bibimbap', 14.50, 'pcs'],
        ['Bulgogi', 22.00, 'pcs'],
        ['Kimchi Stew', 16.00, 'pcs']
      ]},
      { name: 'Sides',        emoji: '🍱', items: [
        ['Banchan Set', 8.00, 'set'],
        ['Korean Pancake', 12.00, 'pcs']
      ]},
      { name: 'Drinks',       emoji: '🥤', items: [
        ['Soju 360ml', 18.00, 'btl'],
        ['Sikhye', 6.50, 'cup'],
        ['Korean Yuja Tea', 7.00, 'cup']
      ]}
    ]
  },
  {
    brand_id: 1, owner_user_id: 6,
    company: { reg: 'BR-KDINE-2024', tax: 'TX-KDINE-001', phone: '+60123456789' },
    cats: [
      { name: 'Chicken Mains', emoji: '🍗', items: [
        ['Grilled Chicken', 18.00, 'pcs'],
        ['Spicy Wings', 14.00, 'pcs'],
        ['Chicken Burger', 16.00, 'pcs']
      ]},
      { name: 'Sides',         emoji: '🍟', items: [
        ['French Fries', 7.00, 'pcs'],
        ['Coleslaw', 5.50, 'pcs']
      ]},
      { name: 'Drinks',        emoji: '🥤', items: [
        ['Iced Tea', 5.00, 'cup'],
        ['Coke 330ml', 5.50, 'can']
      ]}
    ]
  }
];

(async () => {
  for (const B of BRANDS) {
    const { brand_id, owner_user_id, company, cats } = B;
    console.log(`\n[B${brand_id} owner=u${owner_user_id}]`);

    // 1. brand company info (only fill if blank)
    await exec(`UPDATE brands SET
      registration_no = COALESCE(NULLIF(registration_no, ''), :reg),
      tax_no = COALESCE(NULLIF(tax_no, ''), :tax),
      phone = COALESCE(NULLIF(phone, ''), :phone)
      WHERE id=:b`, { ...company, b: brand_id });

    // 2. clear seeded categories/products of this owner
    const seededCats = await q(`SELECT id FROM brand_product_categories WHERE owner_user_id=:o AND description=:s`, { o: owner_user_id, s: SEED });
    const catIds = seededCats.map(r => r.id);
    if (catIds.length > 0) {
      const seededProds = await q(`SELECT id FROM brand_products WHERE category_id IN (${catIds.join(',')})`);
      const prodIds = seededProds.map(r => r.id);
      if (prodIds.length > 0) {
        await exec(`DELETE FROM brand_product_brands WHERE product_id IN (${prodIds.join(',')})`);
        await exec(`DELETE FROM brand_products WHERE id IN (${prodIds.join(',')})`);
      }
      await exec(`DELETE FROM brand_product_categories WHERE id IN (${catIds.join(',')})`);
    }

    // 3. reseed categories
    let sortOrder = 100;
    const insertedCats = [];
    for (const c of cats) {
      const [r] = await sequelize.query(
        `INSERT INTO brand_product_categories (name, description, emoji, sort_order, is_active, owner_user_id, created_at, updated_at)
         VALUES (:n, :d, :e, :so, 1, :o, NOW(), NOW())`,
        { replacements: { n: c.name, d: SEED, e: c.emoji, so: sortOrder++, o: owner_user_id } }
      );
      insertedCats.push({ id: r.insertId || r, items: c.items });
    }

    // 4. reseed products + brand_product_brands join
    let prodCount = 0;
    let prodSku = 1;
    for (const c of insertedCats) {
      for (const [name, price, unit] of c.items) {
        const sku = `${SEED}-${brand_id}-${String(prodSku++).padStart(3,'0')}`;
        const [r] = await sequelize.query(
          `INSERT INTO brand_products (category_id, owner_user_id, name, description, sku, unit, base_quantity, unit_price, min_order_quantity, is_active, sort_order, created_at, updated_at)
           VALUES (:c, :o, :n, :d, :sku, :u, 1, :p, 1, 1, :so, NOW(), NOW())`,
          { replacements: { c: c.id, o: owner_user_id, n: name, d: 'Demo product seeded by v3.26', sku, u: unit, p: price, so: prodCount * 10 } }
        );
        const productId = r.insertId || r;
        await exec(`INSERT INTO brand_product_brands (product_id, brand_id, created_at, updated_at) VALUES (:p, :b, NOW(), NOW())`,
          { p: productId, b: brand_id });
        prodCount++;
      }
    }
    console.log(`   ${insertedCats.length} cats, ${prodCount} products + brand_product_brands join`);
  }

  // Final summary
  console.log(`\n=== summary ===`);
  for (const B of BRANDS) {
    const r = await q(`SELECT
      (SELECT COUNT(*) FROM brand_product_categories WHERE owner_user_id=:o) AS cats,
      (SELECT COUNT(*) FROM brand_product_brands WHERE brand_id=:b) AS prods,
      (SELECT COUNT(*) FROM product_recipes WHERE brand_id=:b) AS recipes,
      (SELECT name FROM brands WHERE id=:b) AS name`,
      { o: B.owner_user_id, b: B.brand_id });
    console.log(`B${B.brand_id} ${r[0].name}: cats=${r[0].cats} brandProducts=${r[0].prods} recipes=${r[0].recipes}`);
  }

  await sequelize.close();
})().catch(e => { console.error('SEED FAIL', e); process.exit(1); });

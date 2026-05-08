// audit-demo-data-v3.26.js
// 모든 demo / test 계정의 데이터 현황을 한 표로 출력. 변경 없음.
// 사용: cd /var/www/dev-backend && node scripts/audit-demo-data-v3.26.js [--prod]
//
// --prod 플래그 사용 시 환경변수 DB_HOST=87.106.78.146 등 운영 자격으로 실행해야 함
// (이 스크립트 자체는 .env 만 본다)

require('dotenv').config();
const { sequelize } = require('../db');

const DEMO_KEYS = [
  // demo (showcase)
  { key: 'demo_restaurant_admin', email: 'demo-restaurant@purplehere.com', role: 'Restaurant Admin' },
  { key: 'demo_brand_general',    email: 'demo-brand@purplehere.com',      role: 'Brand General' },
  { key: 'demo_foodcourt_general',email: 'demo-foodcourt@purplehere.com',  role: 'Foodcourt General' },
  { key: 'demo_multi_owner',      email: 'demo-owner@purplehere.com',      role: 'Restaurant Owner' },
  { key: 'demo_supplier_admin',   email: 'demo-supplier@purplehere.com',   role: 'Supplier Admin' },
  // test (QA)
  { key: 'test_brand_general',    email: 'brand_general@orderhere.center',     role: 'Brand General' },
  { key: 'test_foodcourt_general',email: 'foodcourt_general@orderhere.center', role: 'Foodcourt General' },
  { key: 'test_restaurant_owner', email: 'owner@purplehere.com',                role: 'Restaurant Owner' },
  { key: 'test_restaurant_admin', email: 'admin@kdine.com',                    role: 'Restaurant Admin' },
  { key: 'test_staff',            email: 'staff@kdine.com',                    role: 'Staff' }
];

async function q(sql, repl = {}) {
  const [rows] = await sequelize.query(sql, { replacements: repl });
  return rows;
}
async function count(table, where = '1=1', repl = {}) {
  const r = await q(`SELECT COUNT(*) AS c FROM ${table} WHERE ${where}`, repl);
  return Number(r[0]?.c || 0);
}

(async () => {
  console.log(`\n=== Demo / Test data audit (DB: ${process.env.DB_NAME || 'unknown'}) ===\n`);

  for (const acc of DEMO_KEYS) {
    try {
    const users = await q(`SELECT id, role, restaurant_id, brand_id, foodcourt_id, supplier_company_id, is_demo, is_test FROM users WHERE LOWER(email)=LOWER(:e)`, { e: acc.email });
    if (users.length === 0) {
      console.log(`✗ MISSING  ${acc.key.padEnd(28)} ${acc.email}`);
      continue;
    }
    const u = users[0];
    const flags = [u.is_demo ? 'demo' : '', u.is_test ? 'test' : ''].filter(Boolean).join('+') || 'real';
    const scope = [
      u.restaurant_id ? `R${u.restaurant_id}` : '',
      u.brand_id ? `B${u.brand_id}` : '',
      u.foodcourt_id ? `FC${u.foodcourt_id}` : '',
      u.supplier_company_id ? `SC${u.supplier_company_id}` : ''
    ].filter(Boolean).join(' ');

    console.log(`\n● ${acc.key} — user#${u.id} (${flags}) ${scope || '(no scope)'}`);

    // Restaurant Admin / Staff
    if (u.restaurant_id) {
      const r = await q(`SELECT id, name FROM restaurants WHERE id=:id`, { id: u.restaurant_id });
      const rid = u.restaurant_id;
      const cats = await count('categories', 'restaurant_id=:rid', { rid });
      const products = await count('products', 'restaurant_id=:rid', { rid });
      const orders = await count('orders', 'restaurant_id=:rid', { rid });
      const orders30 = await count('orders', 'restaurant_id=:rid AND createdAt >= DATE_SUB(NOW(), INTERVAL 30 DAY)', { rid });
      const customers = await count('restaurant_customers', 'restaurant_id=:rid', { rid });
      const ingredients = await count('ingredients', 'restaurant_id=:rid', { rid });
      const recipes = await count('recipes', 'restaurant_id=:rid', { rid });
      const stations = await count('kitchen_stations', 'restaurant_id=:rid', { rid });
      const fp = await q(`SELECT COALESCE(JSON_LENGTH(JSON_EXTRACT(floor_plan,'$.tables')),0) AS tables FROM restaurants WHERE id=:rid`, { rid });
      const tableCount = Number(fp[0]?.tables || 0);
      console.log(`   restaurant: ${r[0]?.name || '?'}`);
      console.log(`   categories=${cats} products=${products} orders=${orders} (30d=${orders30}) customers=${customers} ingredients=${ingredients} recipes=${recipes} kitchenStations=${stations} tables=${tableCount}`);
    }

    // Brand General
    if (u.brand_id || acc.role === 'Brand General') {
      const bid = u.brand_id;
      // Brand General 은 다중 소유 가능 — brands.owner_id=user.id 로 lookup
      const owned = await q(`SELECT id, name FROM brands WHERE owner_id=:uid`, { uid: u.id });
      if (owned.length === 0 && bid) {
        // legacy fallback
        const b = await q(`SELECT id, name FROM brands WHERE id=:id`, { id: bid });
        if (b[0]) owned.push(b[0]);
      }
      if (owned.length === 0) {
        console.log(`   brand: (no owned brand)`);
      } else {
        for (const b of owned) {
          const linked = await count('restaurants', 'brand_id=:bid', { bid: b.id });
          const bps = await q(`SELECT COUNT(*) AS c FROM brand_product_brands WHERE brand_id=:bid`, { bid: b.id });
          const recs = await count('product_recipes', 'brand_id=:bid', { bid: b.id });
          const ingr = await count('ingredients', "brand_id=:bid AND restaurant_id IS NULL", { bid: b.id });
          console.log(`   brand B${b.id}: ${b.name}`);
          console.log(`     linkedRestaurants=${linked} brandProducts=${Number(bps[0]?.c||0)} brandRecipes=${recs} brandIngredients=${ingr}`);
        }
      }
    }

    // Foodcourt General
    if (u.foodcourt_id) {
      const fcid = u.foodcourt_id;
      const fc = await q(`SELECT id, name FROM foodcourts WHERE id=:id`, { id: fcid });
      const branches = await count('foodcourt_branches', 'foodcourt_id=:fcid', { fcid });
      const units = await q(`SELECT COUNT(*) AS c FROM foodcourt_units fu JOIN foodcourt_branches fb ON fb.id=fu.branch_id WHERE fb.foodcourt_id=:fcid`, { fcid });
      const fps = await q(`SELECT COUNT(*) AS c FROM foodcourt_floor_plans ffp JOIN foodcourt_branches fb ON fb.id=ffp.branch_id WHERE fb.foodcourt_id=:fcid`, { fcid });
      const tenants = await count('restaurants', 'foodcourt_id=:fcid', { fcid });
      const contracts = await count('contracts', 'entity_type=\'foodcourt\' AND entity_id=:fcid', { fcid });
      const fcInvoices = await count('invoices', "issuer_type='foodcourt' AND issuer_id=:fcid", { fcid });
      console.log(`   foodcourt: ${fc[0]?.name || '?'}`);
      console.log(`   branches=${branches} units=${units[0]?.c || 0} floorPlans=${fps[0]?.c || 0} tenantRestaurants=${tenants} contracts=${contracts} fcInvoices=${fcInvoices}`);
    }

    // Restaurant Owner
    if (acc.role === 'Restaurant Owner') {
      // owner=user.id 인 restaurants (RestaurantManager + ownership 모델)
      const owned = await q(`SELECT r.id, r.name FROM restaurants r JOIN restaurant_managers rm ON rm.restaurant_id=r.id WHERE rm.manager_id=:uid`, { uid: u.id });
      let totalOrders30 = 0, totalRevenue30 = 0;
      for (const r of owned) {
        const c = await q(`SELECT COUNT(*) AS o, COALESCE(SUM(total_amount),0) AS s FROM orders WHERE restaurant_id=:rid AND createdAt >= DATE_SUB(NOW(), INTERVAL 30 DAY)`, { rid: r.id });
        totalOrders30 += Number(c[0]?.o || 0);
        totalRevenue30 += Number(c[0]?.s || 0);
      }
      const tickets = await count('operation_tickets', 'requesterId=:uid', { uid: u.id });
      console.log(`   ownedRestaurants=${owned.length} ${owned.map(r => `R${r.id}:${r.name}`).slice(0,3).join(' ')}${owned.length>3?'...':''}`);
      console.log(`   totalOrders30d=${totalOrders30} totalRevenue30d=${totalRevenue30.toFixed(2)} operationTickets=${tickets}`);
    }

    // Supplier Admin
    if (acc.role === 'Supplier Admin' || u.supplier_company_id) {
      const sid = u.supplier_company_id;
      if (sid) {
        const s = await q(`SELECT id, name FROM supplier_companies WHERE id=:id`, { id: sid });
        const products = await count('supplier_products', 'supplier_company_id=:sid', { sid });
        const contracts = await count('supplier_contracts', 'supplier_company_id=:sid', { sid });
        const pos = await count('purchase_orders', "seller_type='supplier' AND seller_entity_id=:sid", { sid });
        const invoices = await count('invoices', "issuer_type='supplier' AND issuer_id=:sid", { sid });
        console.log(`   supplier: ${s[0]?.name || '?'}`);
        console.log(`   supplierProducts=${products} contracts=${contracts} purchaseOrders=${pos} tradeInvoices=${invoices}`);
      } else {
        console.log(`   supplier: (no supplier_company_id)`);
      }
    }

    // Setup checklist 충족도 (간단)
    const companyTable = u.foodcourt_id ? 'foodcourts' : u.brand_id ? 'brands' : u.restaurant_id ? 'restaurants' : null;
    if (companyTable) {
      try {
        const idCol = u.foodcourt_id ? `id=${u.foodcourt_id}` : u.brand_id ? `id=${u.brand_id}` : `id=${u.restaurant_id}`;
        // restaurants → business_registration / tax_id, brands+foodcourts → registration_no / tax_no
        const cols = companyTable === 'restaurants'
          ? 'business_registration AS reg, tax_id AS tax, phone'
          : 'registration_no AS reg, tax_no AS tax, phone';
        const c = await q(`SELECT ${cols} FROM ${companyTable} WHERE ${idCol}`);
        const hasCompany = !!(c[0]?.reg && c[0]?.tax && c[0]?.phone);
        console.log(`   companyInfoComplete=${hasCompany}`);
      } catch (e) { console.log(`   companyInfoComplete=? (${e.message})`); }
    }
    } catch (e) {
      console.log(`   ✗ AUDIT ERROR: ${e.message}`);
    }
  }

  console.log('\n=== summary keys to watch ===');
  console.log('- 0 카테고리/상품/주문 = 데모로서 빈약');
  console.log('- 0 branch / unit / floor plan = FG 화면 비어보임 (이번 sprint 의 EmptyState 가 이걸 보호하지만 데모 의미가 사라짐)');
  console.log('- 0 brand product / recipe / ingredient = BG 데모 빈약');
  console.log('- 0 supplier product / contract / PO = Supplier 데모 빈약');
  console.log('- companyInfoComplete=false = setup checklist 1 단계 미통과');
  await sequelize.close();
})().catch(e => { console.error('AUDIT FAIL', e); process.exit(1); });

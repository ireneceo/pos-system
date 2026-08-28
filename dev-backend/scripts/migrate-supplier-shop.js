/**
 * Migration: 공급업체 소비자 커머스 — 신규 표 6개 + supplier_products 소비자 판매 필드.
 *
 * 설계: docs/SUPPLIER_CONSUMER_COMMERCE_DESIGN.md §6-2 · §6-3 · §6-5
 *
 * 왜 sync-database 에 안 맡기나: sync 는 스키마 생성의 단일 경로가 아니다
 * ([[reference_deploy_schema_drift]]). ENUM·인덱스가 조용히 안 만들어지고 배포는 통과한 전례가 있다.
 *
 * 안전: CREATE TABLE IF NOT EXISTS · 컬럼/인덱스는 존재 확인 후 추가만. 드롭 0, 기존 행 미수정.
 *       ⛔ `orders` · `payment_subscriptions` 등 기존 표는 건드리지 않는다.
 *       process.exit 필수([[reference_deploy_migration_must_exit]]).
 */
require('dotenv').config();
const { sequelize } = require('../config/database');

const TABLES = [
  [`supplier_customers`, `
    id INT NOT NULL AUTO_INCREMENT,
    supplier_company_id INT NOT NULL,
    customer_id INT NOT NULL,
    first_order_at DATETIME NULL,
    last_order_at DATETIME NULL,
    total_orders INT NOT NULL DEFAULT 0,
    total_spent DECIMAL(12,2) NOT NULL DEFAULT 0,
    notes VARCHAR(500) NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY sc_supplier_customer (supplier_company_id, customer_id),
    KEY sc_customer (customer_id)`],
  [`supplier_delivery_zones`, `
    id INT NOT NULL AUTO_INCREMENT,
    supplier_company_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    postcode_prefixes JSON NULL,
    states JSON NULL,
    delivery_days JSON NULL,
    delivery_fee DECIMAL(10,2) NOT NULL DEFAULT 0,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    sort_order INT NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    PRIMARY KEY (id),
    KEY sdz_supplier_active (supplier_company_id, is_active)`],
  [`supplier_shop_orders`, `
    id INT NOT NULL AUTO_INCREMENT,
    order_no VARCHAR(40) NOT NULL,
    supplier_company_id INT NOT NULL,
    customer_id INT NOT NULL,
    zone_id INT NULL,
    status ENUM('pending','paid','packing','shipped','delivered','cancelled') NOT NULL DEFAULT 'pending',
    subtotal DECIMAL(12,2) NOT NULL DEFAULT 0,
    delivery_fee DECIMAL(10,2) NOT NULL DEFAULT 0,
    total_amount DECIMAL(12,2) NOT NULL DEFAULT 0,
    currency VARCHAR(3) NOT NULL DEFAULT 'MYR',
    payment_status ENUM('unpaid','paid','refund_pending','refunded') NOT NULL DEFAULT 'unpaid',
    payment_ref VARCHAR(191) NULL,
    delivery_address JSON NULL,
    delivery_date DATE NULL,
    notes VARCHAR(500) NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    deleted_at DATETIME NULL,
    PRIMARY KEY (id),
    UNIQUE KEY sso_order_no (order_no),
    KEY sso_supplier_status_date (supplier_company_id, status, delivery_date),
    KEY sso_customer_created (customer_id, created_at)`],
  [`supplier_shop_order_items`, `
    id INT NOT NULL AUTO_INCREMENT,
    order_id INT NOT NULL,
    supplier_product_id INT NOT NULL,
    product_name_snapshot VARCHAR(255) NOT NULL,
    options JSON NULL,
    quantity DECIMAL(10,2) NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    line_total DECIMAL(12,2) NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    PRIMARY KEY (id),
    KEY ssoi_order (order_id)`],
  [`supplier_subscriptions`, `
    id INT NOT NULL AUTO_INCREMENT,
    supplier_company_id INT NOT NULL,
    customer_id INT NOT NULL,
    supplier_product_id INT NOT NULL,
    zone_id INT NULL,
    cycle ENUM('weekly','biweekly','monthly') NOT NULL,
    cycles_total INT NOT NULL,
    cycles_delivered INT NOT NULL DEFAULT 0,
    unit_price DECIMAL(10,2) NOT NULL,
    total_paid DECIMAL(12,2) NOT NULL DEFAULT 0,
    currency VARCHAR(3) NOT NULL DEFAULT 'MYR',
    payment_status ENUM('unpaid','paid') NOT NULL DEFAULT 'unpaid',
    payment_ref VARCHAR(191) NULL,
    delivery_address JSON NULL,
    next_delivery_date DATE NULL,
    status ENUM('active','completed','cancelled') NOT NULL DEFAULT 'active',
    cancelled_at DATETIME NULL,
    refund_amount DECIMAL(12,2) NULL,
    refund_status ENUM('none','pending','done') NOT NULL DEFAULT 'none',
    refund_note VARCHAR(500) NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    PRIMARY KEY (id),
    KEY ssub_supplier_status_next (supplier_company_id, status, next_delivery_date),
    KEY ssub_customer (customer_id)`],
  [`supplier_subscription_deliveries`, `
    id INT NOT NULL AUTO_INCREMENT,
    subscription_id INT NOT NULL,
    cycle_no INT NOT NULL,
    zone_id INT NULL,
    scheduled_date DATE NOT NULL,
    status ENUM('pending','packing','shipped','delivered','cancelled') NOT NULL DEFAULT 'pending',
    shipped_at DATETIME NULL,
    delivered_at DATETIME NULL,
    notes VARCHAR(500) NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY ssd_sub_cycle (subscription_id, cycle_no),
    KEY ssd_zone_date_status (zone_id, scheduled_date, status)`]
];

// supplier_products 소비자 판매 필드 — ⛔ B2B `unit_price` 는 건드리지 않는다
const SP_COLUMNS = [
  ['shop_enabled', `TINYINT(1) NOT NULL DEFAULT 0`],
  ['shop_price', `DECIMAL(10,2) NULL`],
  ['shop_description', `TEXT NULL`],
  ['subscription_enabled', `TINYINT(1) NOT NULL DEFAULT 0`],
  ['subscription_cycle', `ENUM('weekly','biweekly','monthly') NULL`],
  ['subscription_cycles_default', `INT NULL`],
  ['subscription_price', `DECIMAL(10,2) NULL`]
];


// supplier_companies 가게 설정 (설계 §6-3 · §7-6 결정 1)
//  ⚠ shop_slug 는 공개 진입 키다 — **UNIQUE 를 DB 가 보장해야** 한다(앱 레벨 경합으로는 부족).
const SC_COLUMNS = [
  ['shop_slug', `VARCHAR(50) NULL`],
  ['shop_enabled', `TINYINT(1) NOT NULL DEFAULT 0`],
  ['shop_description', `TEXT NULL`]
];

async function tableExists(t) {
  const [r] = await sequelize.query(
    `SELECT COUNT(*) c FROM information_schema.TABLES WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME=:t`,
    { replacements: { t } });
  return Number(r[0].c) === 1;
}
async function columnExists(t, c) {
  const [r] = await sequelize.query(
    `SELECT COUNT(*) c FROM information_schema.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME=:t AND COLUMN_NAME=:c`,
    { replacements: { t, c } });
  return Number(r[0].c) === 1;
}


/** ENUM 에 값을 **추가만** 한다. 현재 값을 information_schema 에서 읽어 더한다(목록 하드코딩 금지 —
 *  하드코딩하면 다른 곳에서 늘어난 값을 지워버린다). */
async function addEnumValues(table, column, newValues) {
  const [rows] = await sequelize.query(
    `SELECT COLUMN_TYPE t, IS_NULLABLE n, COLUMN_DEFAULT d FROM information_schema.COLUMNS
      WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME=:t AND COLUMN_NAME=:c`,
    { replacements: { t: table, c: column } });
  if (!rows.length) throw new Error(`${table}.${column} not found`);
  const cur = rows[0].t.replace(/^enum\(/i, '').replace(/\)$/, '')
    .split(',').map(v => v.trim().replace(/^'/, '').replace(/'$/, '').replace(/''/g, "'"));
  const missing = newValues.filter(v => !cur.includes(v));
  if (!missing.length) return 0;
  const next = [...cur, ...missing];
  const list = next.map(v => `'${String(v).replace(/'/g, "''")}'`).join(',');
  const nullClause = rows[0].n === 'YES' ? 'NULL' : 'NOT NULL';
  const dflt = rows[0].d == null ? '' : ` DEFAULT '${String(rows[0].d).replace(/'/g, "''")}'`;
  await sequelize.query(`ALTER TABLE \`${table}\` MODIFY COLUMN \`${column}\` ENUM(${list}) ${nullClause}${dflt}`);
  // 값이 사라지지 않았는지 확인 — 추가만 해야 한다
  const [after] = await sequelize.query(
    `SELECT COLUMN_TYPE t FROM information_schema.COLUMNS
      WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME=:t AND COLUMN_NAME=:c`,
    { replacements: { t: table, c: column } });
  const lost = cur.filter(v => !after[0].t.includes(`'${v}'`));
  if (lost.length) throw new Error(`ENUM values lost on ${table}.${column}: ${lost.join(', ')}`);
  return missing.length;
}

(async () => {
  try {
    console.log('[migrate-supplier-shop] Starting...');
    let created = 0;
    for (const [name, body] of TABLES) {
      await sequelize.query(`CREATE TABLE IF NOT EXISTS \`${name}\` (${body}) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);
      if (!(await tableExists(name))) throw new Error(`${name} was not created`);
      created++;
    }
    console.log(`  ✓ tables ready: ${created}/${TABLES.length}`);

    if (!(await tableExists('supplier_products'))) throw new Error('supplier_products not found');
    let added = 0;
    for (const [col, ddl] of SP_COLUMNS) {
      if (await columnExists('supplier_products', col)) continue;
      await sequelize.query(`ALTER TABLE \`supplier_products\` ADD COLUMN \`${col}\` ${ddl}`);
      added++;
    }
    // 회귀 방지: B2B 가격 컬럼이 그대로 있어야 한다
    if (!(await columnExists('supplier_products', 'unit_price'))) {
      throw new Error('supplier_products.unit_price missing — B2B price column must stay untouched');
    }
    console.log(`  ✓ supplier_products shop columns added this run: ${added} (unit_price intact)`);

    // supplier_companies 가게 설정 컬럼 + slug UNIQUE
    if (!(await tableExists('supplier_companies'))) throw new Error('supplier_companies not found');
    let scAdded = 0;
    for (const [col, ddl] of SC_COLUMNS) {
      if (await columnExists('supplier_companies', col)) continue;
      await sequelize.query(`ALTER TABLE \`supplier_companies\` ADD COLUMN \`${col}\` ${ddl}`);
      scAdded++;
    }
    const [ix] = await sequelize.query(
      `SELECT COUNT(*) c FROM information_schema.STATISTICS
        WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='supplier_companies' AND INDEX_NAME='sc_shop_slug'`);
    if (Number(ix[0].c) === 0) {
      await sequelize.query('ALTER TABLE `supplier_companies` ADD UNIQUE INDEX `sc_shop_slug` (`shop_slug`)');
    }
    console.log(`  ✓ supplier_companies shop columns added this run: ${scAdded} (shop_slug UNIQUE ready)`);

    // 재고 원장 ENUM — 소비자 채널 값 추가 (B2B 값 무접촉)
    const e1 = await addEnumValues('supplier_inventory_transactions', 'transaction_type',
      ['shop_order', 'subscription_delivery', 'shop_restock']);
    const e2 = await addEnumValues('supplier_inventory_transactions', 'reference_type',
      ['supplier_shop_order', 'supplier_subscription_delivery']);
    console.log(`  ✓ ledger ENUM values added this run: transaction_type ${e1}, reference_type ${e2}`);
    process.exit(0);
  } catch (e) {
    console.error('  ✗ Migration failed:', e.message);
    process.exit(1);
  }
})();

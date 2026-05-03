// Migration: add Stripe Customer / auto-charge columns to restaurants/brands/foodcourts.
// Idempotent — checks existence before adding.

require('../models');
const { sequelize } = require('../config/database');

async function columnExists(table, column) {
  const [rows] = await sequelize.query(
    `SELECT COLUMN_NAME FROM information_schema.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND COLUMN_NAME = ?`,
    { replacements: [table, column] }
  );
  return rows.length > 0;
}

async function indexExists(table, name) {
  const [rows] = await sequelize.query(
    `SELECT INDEX_NAME FROM information_schema.STATISTICS
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND INDEX_NAME = ?`,
    { replacements: [table, name] }
  );
  return rows.length > 0;
}

async function addColumnIfMissing(table, column, definition) {
  if (await columnExists(table, column)) {
    console.log(`  ⏭  ${table}.${column} already exists`);
    return;
  }
  await sequelize.query(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`);
  console.log(`  ✓ ${table}.${column} added`);
}

async function addIndexIfMissing(table, name, definition) {
  if (await indexExists(table, name)) {
    console.log(`  ⏭  ${table} index ${name} already exists`);
    return;
  }
  await sequelize.query(`ALTER TABLE ${table} ADD INDEX ${name} ${definition}`);
  console.log(`  ✓ ${table} index ${name} added`);
}

(async () => {
  console.log('Migrating Stripe Customer / auto-charge columns...');

  for (const table of ['restaurants', 'brands', 'foodcourts']) {
    console.log(`\n[${table}]`);
    await addColumnIfMissing(table, 'stripe_customer_id', "VARCHAR(60) DEFAULT NULL COMMENT 'Stripe Customer ID (cus_...)'");
    await addColumnIfMissing(table, 'stripe_default_payment_method', "VARCHAR(60) DEFAULT NULL COMMENT 'Default Stripe PaymentMethod ID (pm_...)'");
    await addColumnIfMissing(table, 'auto_charge_enabled', 'BOOLEAN DEFAULT FALSE');
    await addColumnIfMissing(table, 'auto_charge_consent_at', "DATETIME DEFAULT NULL COMMENT 'Timestamp of explicit user consent for auto-charge'");
    await addIndexIfMissing(table, 'idx_stripe_customer', '(stripe_customer_id)');
  }

  console.log('\n✓ Migration complete');
  process.exit(0);
})().catch(err => {
  console.error('✗ Migration failed:', err);
  process.exit(1);
});

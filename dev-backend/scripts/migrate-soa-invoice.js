/**
 * Migration: SOA as Invoice Record (B1 — 2026-04-30 재설계)
 *
 * - ADD invoices.parent_soa_invoice_id INT NULL
 * - 멱등 (이미 존재하면 skip)
 *
 * 설계 문서: docs/INVOICE_SYSTEM.md "11. SOA 재설계"
 */
require('dotenv').config();
const { sequelize } = require('../config/database');

(async () => {
  try {
    const [cols] = await sequelize.query(`
      SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'invoices' AND COLUMN_NAME = 'parent_soa_invoice_id'
    `);
    if (cols.length > 0) {
      console.log('✓ invoices.parent_soa_invoice_id already exists — skipping');
    } else {
      console.log('→ Adding invoices.parent_soa_invoice_id ...');
      await sequelize.query(`
        ALTER TABLE invoices ADD COLUMN parent_soa_invoice_id INT NULL
      `);
      console.log('✓ Added invoices.parent_soa_invoice_id (no FK/index — invoices table has many keys; FK enforced at app layer)');
    }

    const [check] = await sequelize.query(`
      SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'invoices' AND COLUMN_NAME = 'parent_soa_invoice_id'
    `);
    console.log('Final state:', check[0]);

    process.exit(0);
  } catch (err) {
    console.error('✗ Migration failed:', err.message);
    process.exit(1);
  }
})();

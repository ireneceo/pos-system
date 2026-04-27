/**
 * Sprint 6 migration:
 *  - PurchaseOrder.status enum: add 'delivered' between 'shipped' and 'partial_received'
 *  - Create purchase_order_returns table
 * Idempotent.
 */
const { sequelize } = require('../config/database');
const { PurchaseOrderReturn } = require('../models');

(async () => {
  try {
    // 1. ALTER status enum
    try {
      await sequelize.query(`
        ALTER TABLE \`purchase_orders\`
        MODIFY COLUMN \`status\` ENUM('draft','submitted','confirmed','shipped','delivered','partial_received','received','cancelled','closed')
        NOT NULL DEFAULT 'draft'
      `);
      console.log('✓ purchase_orders.status enum extended with "delivered"');
    } catch (e) {
      if (String(e.message).includes('already')) console.log('· enum already extended');
      else console.log('  warning:', e.message);
    }

    // 1b. ALTER invoices.status enum to include 'credit' (Sprint 6 — Credit Notes)
    try {
      await sequelize.query(`
        ALTER TABLE \`invoices\`
        MODIFY COLUMN \`status\` ENUM('draft','pending_payment','payment_submitted','paid','overdue','cancelled','credit')
        DEFAULT 'draft'
      `);
      console.log('✓ invoices.status enum extended with "credit"');
    } catch (e) {
      if (String(e.message).includes('already')) console.log('· invoices enum already extended');
      else console.log('  warning:', e.message);
    }

    // 2. Create returns table
    if (PurchaseOrderReturn) {
      await PurchaseOrderReturn.sync();
      console.log('✓ purchase_order_returns table synced');
    }

    console.log('✓ Sprint 6 migration done');
    process.exit(0);
  } catch (err) {
    console.error('FATAL', err);
    process.exit(1);
  }
})();

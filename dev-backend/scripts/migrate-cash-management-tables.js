'use strict';
/**
 * Create cash management tables (cashier_shifts, cash_reconciliations).
 * Idempotent — model.sync() creates the table only if missing; never drops columns.
 * docs/CASH_MANAGEMENT_SHIFT_CLOSE.md.
 *
 * Usage: node scripts/migrate-cash-management-tables.js
 */
const db = require('../models');

(async () => {
  try {
    await db.CashierShift.sync();
    await db.CashReconciliation.sync();
    console.log('- cashier_shifts / cash_reconciliations ensured');
    console.log('✓ done');
  } catch (e) {
    console.log('ERROR', e.message);
    process.exit(1);
  }
  process.exit(0);
})();

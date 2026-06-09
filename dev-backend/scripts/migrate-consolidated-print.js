/**
 * Migration — add orders.consolidated_printed_at (2026-06-09).
 *
 * Independent print-state for the optional "Consolidated Order Ticket" feature
 * (whole order on one ticket to a chosen printer, e.g. a kitchen main printer).
 * NULL = not yet consolidated-printed. Stamped by PATCH /api/consolidated-print/:id/printed.
 *
 * Idempotent — safe to re-run. Added via an explicit migration (not sync --alter,
 * which would drop migration-only columns elsewhere).
 */
require('dotenv').config();
const { sequelize } = require('../config/database');

(async () => {
  try {
    const [cols] = await sequelize.query(
      "SHOW COLUMNS FROM orders LIKE 'consolidated_printed_at'"
    );
    if (cols.length > 0) {
      console.log('[migrate-consolidated-print] orders.consolidated_printed_at exists — skip');
    } else {
      await sequelize.query(
        'ALTER TABLE orders ADD COLUMN consolidated_printed_at DATETIME NULL'
      );
      console.log('[migrate-consolidated-print] ADD orders.consolidated_printed_at ✓');
    }
    console.log('[migrate-consolidated-print] done ✓');
    process.exit(0);
  } catch (e) {
    console.error('[migrate-consolidated-print] error:', e.message);
    process.exit(1);
  }
})();

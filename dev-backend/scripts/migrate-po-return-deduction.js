'use strict';
/**
 * 반품 금액 차감 (2026-11-17 · 설계 .claude/fable-design-20261117-po-returns-seller-and-deduct.md §6)
 *   purchase_order_returns.initiated_by / deducted_invoice_id / deducted_amount
 *   purchase_orders.returned_amount
 * 멱등: information_schema 로 있으면 건너뜀. 칸 추가뿐 · 값 쓰기 0행. registry `deploy`.
 *
 * Usage: node scripts/migrate-po-return-deduction.js
 */
const { sequelize } = require('../config/database');

const COLS = [
  ['purchase_order_returns', 'initiated_by', "VARCHAR(10) NOT NULL DEFAULT 'buyer'"],
  ['purchase_order_returns', 'deducted_invoice_id', 'INT NULL'],
  ['purchase_order_returns', 'deducted_amount', 'DECIMAL(12,2) NULL'],
  ['purchase_orders', 'returned_amount', 'DECIMAL(12,2) NOT NULL DEFAULT 0'],
];

(async () => {
  try {
    for (const [table, col, def] of COLS) {
      const [[r]] = await sequelize.query(
        `SELECT COUNT(*) c FROM information_schema.COLUMNS
          WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND COLUMN_NAME = ?`,
        { replacements: [table, col] }
      );
      if (Number(r.c)) { console.log(`- ${table}.${col} already exists (skip)`); continue; }
      await sequelize.query(`ALTER TABLE ${table} ADD COLUMN ${col} ${def}`);
      console.log(`- ${table}.${col} added`);
    }
    console.log('✓ done');
  } catch (e) {
    console.log('ERROR', e.message);
    process.exit(1);
  }
  process.exit(0);
})();

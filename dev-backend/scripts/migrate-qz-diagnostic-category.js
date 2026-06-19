'use strict';
/**
 * QZ Tray diagnostic tickets → admin-only 'diagnostic' category.
 *
 * 1. Extend support_tickets.category ENUM with 'diagnostic'.
 * 2. Recategorize existing "[QZ Tray] printing diagnostic" tickets to 'diagnostic'
 *    so they drop out of the merchant support inbox (no data loss — admin still sees them).
 *
 * Idempotent. Recategorize (not delete) per merchant request to declutter the inbox
 * (with MIN Cafe, 2026-06-18) while keeping the records for support history.
 *
 * Usage: node scripts/migrate-qz-diagnostic-category.js
 */
const { sequelize } = require('../config/database');

(async () => {
  try {
    await sequelize.query(
      "ALTER TABLE support_tickets MODIFY COLUMN category " +
      "ENUM('general','technical','billing','feature-request','bug-report','diagnostic') DEFAULT 'general'"
    );
    console.log("- category ENUM extended with 'diagnostic'");
  } catch (e) {
    console.log('- ENUM alter:', e.message);
  }

  const [[before]] = await sequelize.query(
    "SELECT COUNT(*) c FROM support_tickets WHERE subject LIKE '%[QZ Tray]%' AND category <> 'diagnostic'"
  );
  const [res] = await sequelize.query(
    "UPDATE support_tickets SET category = 'diagnostic' WHERE subject LIKE '%[QZ Tray]%' AND category <> 'diagnostic'"
  );
  console.log(`- recategorized ${res.affectedRows != null ? res.affectedRows : before.c} QZ ticket(s) → 'diagnostic'`);
  console.log('✓ done');
  process.exit(0);
})().catch(e => { console.error(e); process.exit(1); });

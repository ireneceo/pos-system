#!/usr/bin/env node
/**
 * Cleanup users.email_N / users.username_N duplicate UNIQUE indexes.
 *
 * Background: Sequelize sync without {alter:false} historically created a fresh
 * `email_2`, `username_2`, ... index every restart instead of recognising the
 * existing UNIQUE constraint. The table now has ~60 duplicate single-column
 * UNIQUE indexes against `email` and `username`, exhausting MySQL's 64-index
 * limit per table and blocking new index creation (e.g. referral_code).
 *
 * Safe to drop: the canonical `email` and `username` UNIQUE indexes are kept,
 * so uniqueness is fully preserved.
 *
 * Usage:
 *   node scripts/cleanup-users-duplicate-indexes.js --dry-run
 *   node scripts/cleanup-users-duplicate-indexes.js
 */

require('dotenv').config();
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');

const DRY = process.argv.includes('--dry-run');
const log = (m) => console.log(`[cleanup-users-idx]${DRY ? ' [DRY]' : ''} ${m}`);

async function listDuplicateIndexes() {
  const rows = await sequelize.query(
    `SELECT INDEX_NAME, COLUMN_NAME FROM information_schema.statistics
     WHERE table_schema = DATABASE() AND table_name = 'users'
       AND INDEX_NAME REGEXP '^(email|username)_[0-9]+$'
     ORDER BY INDEX_NAME`,
    { type: QueryTypes.SELECT }
  );
  return rows;
}

(async () => {
  try {
    const dups = await listDuplicateIndexes();
    log(`found ${dups.length} duplicate indexes`);
    for (const r of dups) {
      const sql = `ALTER TABLE users DROP INDEX \`${r.INDEX_NAME}\``;
      log(`drop ${r.INDEX_NAME} (${r.COLUMN_NAME})`);
      if (!DRY) await sequelize.query(sql);
    }
    log('done ✓');
    process.exit(0);
  } catch (err) {
    console.error('[cleanup-users-idx] error:', err.message);
    process.exit(1);
  }
})();

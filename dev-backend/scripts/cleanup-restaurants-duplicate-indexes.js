#!/usr/bin/env node
/**
 * Cleanup restaurants.slug_N duplicate UNIQUE indexes.
 *
 * Background: Same pathology as cleanup-users-duplicate-indexes.js — Sequelize
 * sync historically minted a fresh `slug_2`, `slug_3`, … on every restart
 * instead of recognising the canonical UNIQUE on `slug`. The table sits at
 * MySQL's 64-index ceiling and the next ALTER TABLE … CHANGE slug fails with
 * ER_TOO_MANY_KEYS, leaking a "Database sync failed" warning at boot and
 * blocking any future schema change that touches an index.
 *
 * Safe: the original `slug` UNIQUE index is preserved, so the uniqueness
 * invariant is intact. Only the duplicate `slug_<N>` indexes are dropped.
 *
 * Usage:
 *   node scripts/cleanup-restaurants-duplicate-indexes.js --dry-run
 *   node scripts/cleanup-restaurants-duplicate-indexes.js
 */

require('dotenv').config();
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');

const DRY = process.argv.includes('--dry-run');
const log = (m) => console.log(`[cleanup-restaurants-idx]${DRY ? ' [DRY]' : ''} ${m}`);

async function listDuplicateIndexes() {
  const rows = await sequelize.query(
    `SELECT INDEX_NAME, COLUMN_NAME FROM information_schema.statistics
     WHERE table_schema = DATABASE() AND table_name = 'restaurants'
       AND INDEX_NAME REGEXP '^slug_[0-9]+$'
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
      const sql = `ALTER TABLE restaurants DROP INDEX \`${r.INDEX_NAME}\``;
      log(`drop ${r.INDEX_NAME} (${r.COLUMN_NAME})`);
      if (!DRY) await sequelize.query(sql);
    }
    log('done');
    process.exit(0);
  } catch (err) {
    console.error('[cleanup-restaurants-idx] error:', err.message);
    process.exit(1);
  }
})();

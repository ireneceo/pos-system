#!/usr/bin/env node
/**
 * Cleanup Sequelize-generated duplicate UNIQUE indexes across all tables.
 *
 * Background: Years of `sequelize.sync()` runs minted a fresh `<col>_<N>`
 * UNIQUE index every restart instead of recognising the canonical UNIQUE on
 * `<col>`. ~14 tables sit at or near MySQL's 64-index ceiling, so the next
 * ALTER TABLE … CHANGE on those columns fails with ER_TOO_MANY_KEYS, leaking
 * "Database sync failed" warnings at boot and blocking any future schema
 * change touching those columns.
 *
 * Strategy: drop every index whose name matches `<colname>_<digits>` *iff* a
 * canonical `<colname>` index already exists on the same column. The
 * canonical one carries the uniqueness invariant, so duplicates are pure
 * dead weight.
 *
 * Safe: indices with names like `idx_foo_bar` are unaffected (the `_<digits>`
 * suffix must be purely numeric and the base name must match the column).
 *
 * Usage:
 *   node scripts/cleanup-sequelize-duplicate-indexes.js --dry-run
 *   node scripts/cleanup-sequelize-duplicate-indexes.js
 */

require('dotenv').config();
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');

const DRY = process.argv.includes('--dry-run');
const log = (m) => console.log(`[cleanup-seq-idx]${DRY ? ' [DRY]' : ''} ${m}`);

async function listAllIndexes() {
  return sequelize.query(
    `SELECT TABLE_NAME, INDEX_NAME, COLUMN_NAME
     FROM information_schema.statistics
     WHERE table_schema = DATABASE()
       AND SEQ_IN_INDEX = 1
     ORDER BY TABLE_NAME, INDEX_NAME`,
    { type: QueryTypes.SELECT }
  );
}

(async () => {
  try {
    const all = await listAllIndexes();

    // Build a set of (table, column) pairs that have a canonical base index
    // matching the column name exactly.
    const canonical = new Set();
    for (const row of all) {
      if (row.INDEX_NAME === row.COLUMN_NAME) {
        canonical.add(`${row.TABLE_NAME}::${row.COLUMN_NAME}`);
      }
    }

    // Find duplicates: INDEX_NAME = COLUMN_NAME + '_' + digits, AND canonical exists
    const dupRe = /^(.+)_(\d+)$/;
    const drops = [];
    for (const row of all) {
      const m = dupRe.exec(row.INDEX_NAME);
      if (!m) continue;
      const baseName = m[1];
      // Only treat as a sequelize-style duplicate if the base name matches the column name
      if (baseName !== row.COLUMN_NAME) continue;
      // Require the canonical base index on the same (table, column) to exist
      if (!canonical.has(`${row.TABLE_NAME}::${row.COLUMN_NAME}`)) continue;
      drops.push(row);
    }

    // Group by table for tidy output
    const byTable = {};
    for (const r of drops) {
      (byTable[r.TABLE_NAME] = byTable[r.TABLE_NAME] || []).push(r);
    }

    const totalTables = Object.keys(byTable).length;
    log(`found ${drops.length} duplicate indexes across ${totalTables} tables`);
    for (const [table, rows] of Object.entries(byTable)) {
      log(`  ${table}: ${rows.length} duplicates`);
    }

    let dropped = 0;
    for (const r of drops) {
      const sql = `ALTER TABLE \`${r.TABLE_NAME}\` DROP INDEX \`${r.INDEX_NAME}\``;
      if (!DRY) {
        await sequelize.query(sql);
      }
      dropped++;
      if (dropped % 50 === 0) log(`progress ${dropped}/${drops.length}`);
    }
    log(`done (${dropped} ${DRY ? 'would be' : ''}dropped)`);
    process.exit(0);
  } catch (err) {
    console.error('[cleanup-seq-idx] error:', err.message);
    process.exit(1);
  }
})();

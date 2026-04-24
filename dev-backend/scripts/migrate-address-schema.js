/**
 * Address Schema Unification — Additive Migration
 * See docs/ADDRESS_STANDARDIZATION.md §5.1
 *
 * Strategy:
 *   Step 1: Add missing columns (address_line_2 everywhere, full 6 fields on users/suppliers/hardware_quotes)
 *   Step 2: Normalize country values in place (Malaysia → MY) — leaves data fitting CHAR(2)
 *   Step 3: ALTER country column types to CHAR(2), lat/lng to DECIMAL(10,7) on restaurants
 *
 * Usage:
 *   node scripts/migrate-address-schema.js            # dry-run (default)
 *   node scripts/migrate-address-schema.js --apply    # execute
 */

require('dotenv').config();
const { sequelize } = require('../config/database');
const { normalizeCountry } = require('../utils/formatAddress');

const APPLY = process.argv.includes('--apply');

function log(...a) { console.log(...a); }
function warn(...a) { console.log('⚠ ', ...a); }
function ok(...a) { console.log('✓ ', ...a); }

async function columnExists(table, column) {
  const [rows] = await sequelize.query(
    `SELECT COUNT(*) AS cnt FROM INFORMATION_SCHEMA.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND COLUMN_NAME = ?`,
    { replacements: [table, column] }
  );
  return rows[0].cnt > 0;
}

async function getColumnInfo(table, column) {
  const [rows] = await sequelize.query(
    `SELECT COLUMN_TYPE, IS_NULLABLE, COLUMN_DEFAULT FROM INFORMATION_SCHEMA.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND COLUMN_NAME = ?`,
    { replacements: [table, column] }
  );
  return rows[0] || null;
}

async function execOrLog(label, sql) {
  if (APPLY) {
    await sequelize.query(sql);
    ok(`${label} — executed`);
  } else {
    log(`DRY: ${label}\n     ${sql}`);
  }
}

async function ensureColumn(table, column, type) {
  const exists = await columnExists(table, column);
  if (exists) { ok(`${table}.${column} exists — skip`); return false; }
  await execOrLog(`ADD ${table}.${column}`, `ALTER TABLE \`${table}\` ADD COLUMN \`${column}\` ${type}`);
  return true;
}

async function normalizeCountryColumn(table, column = 'country') {
  if (!await columnExists(table, column)) return;

  const [rows] = await sequelize.query(`SELECT DISTINCT \`${column}\` AS v FROM \`${table}\` WHERE \`${column}\` IS NOT NULL AND \`${column}\` != ''`);
  const mapping = [];
  for (const r of rows) {
    const v = r.v;
    const iso = normalizeCountry(v);
    if (iso && iso !== v) {
      mapping.push({ from: v, to: iso });
    } else if (!iso) {
      warn(`${table}.${column} — cannot normalize: "${v}"`);
    }
  }
  if (mapping.length === 0) { ok(`${table}.${column} already ISO (or empty)`); return; }
  log(`${table}.${column} — ${mapping.length} distinct values to normalize:`);
  mapping.forEach(m => log(`    "${m.from}" → "${m.to}"`));
  for (const m of mapping) {
    await execOrLog(
      `UPDATE ${table}.${column} "${m.from}"→"${m.to}"`,
      `UPDATE \`${table}\` SET \`${column}\` = ${sequelize.escape(m.to)} WHERE \`${column}\` = ${sequelize.escape(m.from)}`
    );
  }
}

async function alterColumnType(table, column, newType) {
  const info = await getColumnInfo(table, column);
  if (!info) { warn(`${table}.${column} not found — skip type alter`); return; }
  if (info.COLUMN_TYPE.toLowerCase() === newType.toLowerCase().split(' ')[0]) {
    ok(`${table}.${column} already ${newType}`); return;
  }
  await execOrLog(`ALTER ${table}.${column} TYPE → ${newType}`, `ALTER TABLE \`${table}\` MODIFY COLUMN \`${column}\` ${newType}`);
}

async function main() {
  log(`=== Address Schema Migration ${APPLY ? '(APPLY)' : '(DRY-RUN)'} ===\n`);

  // Step 1 — ADD columns
  log('\n-- Step 1: Add missing columns --\n');

  const STRUCTURED_TABLES = ['brands', 'foodcourts', 'foodcourt_branches', 'restaurants', 'company_settings'];
  for (const t of STRUCTURED_TABLES) {
    await ensureColumn(t, 'address_line_2', 'VARCHAR(255) NULL');
  }

  // users — only `address` currently, add the rest
  for (const t of ['users', 'suppliers']) {
    await ensureColumn(t, 'address_line_2', 'VARCHAR(255) NULL');
    await ensureColumn(t, 'city', 'VARCHAR(100) NULL');
    await ensureColumn(t, 'state', 'VARCHAR(100) NULL');
    await ensureColumn(t, 'postal_code', 'VARCHAR(20) NULL');
    await ensureColumn(t, 'country', 'CHAR(2) NULL');
  }

  // hardware_quotes — has company_address (text) + country_code (char(2)). Add structured fields.
  await ensureColumn('hardware_quotes', 'address_line_2', 'VARCHAR(255) NULL');
  await ensureColumn('hardware_quotes', 'city', 'VARCHAR(100) NULL');
  await ensureColumn('hardware_quotes', 'state', 'VARCHAR(100) NULL');
  await ensureColumn('hardware_quotes', 'postal_code', 'VARCHAR(20) NULL');
  // country_code already exists — no action

  // Step 2 — Normalize country values (so they fit CHAR(2) after type change)
  log('\n-- Step 2: Normalize country values to ISO 3166-1 alpha-2 --\n');
  for (const t of ['restaurants', 'company_settings', 'brands', 'foodcourts', 'foodcourt_branches', 'users', 'suppliers']) {
    await normalizeCountryColumn(t, 'country');
  }

  // Step 3 — Alter types to canonical (only on tables that still have non-canonical types)
  log('\n-- Step 3: Alter column types to canonical --\n');

  // restaurants: country VARCHAR(100) → CHAR(2)
  await alterColumnType('restaurants', 'country', 'CHAR(2) NULL DEFAULT NULL');
  // restaurants: latitude/longitude DOUBLE → DECIMAL(10,7)
  await alterColumnType('restaurants', 'latitude', 'DECIMAL(10,7) NULL DEFAULT NULL');
  await alterColumnType('restaurants', 'longitude', 'DECIMAL(10,7) NULL DEFAULT NULL');
  // company_settings: country VARCHAR(100) → CHAR(2)
  await alterColumnType('company_settings', 'country', 'CHAR(2) NULL DEFAULT NULL');
  // brands, foodcourts, foodcourt_branches: country VARCHAR(10) → CHAR(2) for schema uniformity
  // (data is already ISO codes in these tables; this is a type tightening.)
  for (const t of ['brands', 'foodcourts', 'foodcourt_branches']) {
    await alterColumnType(t, 'country', 'CHAR(2) NULL DEFAULT NULL');
  }

  log('\n=== Migration complete ===');
  if (!APPLY) log('Run with --apply to execute.');
  process.exit(0);
}

main().catch(e => { console.error(e); process.exit(1); });

/**
 * Address Data Audit — Read-only Report
 * See docs/ADDRESS_STANDARDIZATION.md §8 Step 16
 *
 * Run BEFORE production deploy to see the current state of address data.
 * No writes. Safe to run anytime.
 *
 * Usage:
 *   node scripts/audit-addresses.js
 *
 * Reports:
 *   - Per-table row count + rows with missing structured fields
 *   - Non-ISO country values that would be normalized by cleanup-addresses.js
 *   - Rows with \n/\t in address/address_line_2 fields
 *   - Restaurants with brand_id mismatch vs active franchise contracts (R1 violations)
 *   - Restaurants with foodcourt_id mismatch vs active tenancy contracts (R2 violations)
 *   - EntityPlanRestaurant cross-brand plan mismatches
 */

require('dotenv').config();
const { sequelize } = require('../config/database');
const { normalizeCountry } = require('../utils/formatAddress');

const TABLES = ['restaurants', 'brands', 'foodcourts', 'foodcourt_branches', 'company_settings', 'users', 'suppliers', 'hardware_quotes'];

function bar() { console.log('─'.repeat(60)); }

async function tableExists(t) {
  const [r] = await sequelize.query(
    `SELECT COUNT(*) AS cnt FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME=?`,
    { replacements: [t] }
  );
  return r[0].cnt > 0;
}

async function hasColumn(t, c) {
  const [r] = await sequelize.query(
    `SELECT COUNT(*) AS cnt FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME=? AND COLUMN_NAME=?`,
    { replacements: [t, c] }
  );
  return r[0].cnt > 0;
}

async function columnType(t, c) {
  const [r] = await sequelize.query(
    `SELECT COLUMN_TYPE FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME=? AND COLUMN_NAME=?`,
    { replacements: [t, c] }
  );
  return r[0]?.COLUMN_TYPE || null;
}

async function auditSchema() {
  console.log('\n=== Schema Audit ===\n');
  const addrCol = 'address';
  const l2 = 'address_line_2';
  console.log('Table                 | addr | l2   | city | state | postal | country    | lat/lng');
  bar();
  for (const t of TABLES) {
    if (!await tableExists(t)) { console.log(t.padEnd(21) + '| (missing table)'); continue; }
    const parts = [
      t.padEnd(21),
      (await hasColumn(t, 'address') || await hasColumn(t, 'company_address')) ? '✓   ' : '✗   ',
      (await hasColumn(t, l2)) ? '✓   ' : '✗   ',
      (await hasColumn(t, 'city')) ? '✓   ' : '—   ',
      (await hasColumn(t, 'state')) ? '✓    ' : '—    ',
      (await hasColumn(t, 'postal_code')) ? '✓     ' : '—     ',
      await hasColumn(t, 'country') ? (await columnType(t, 'country')).padEnd(11) : '—          ',
      await hasColumn(t, 'latitude') ? `${await columnType(t, 'latitude')}` : '—'
    ];
    console.log('| ' + parts.join('| '));
  }
}

async function auditCountries() {
  console.log('\n\n=== Country Normalization Audit ===\n');
  for (const t of TABLES) {
    if (!await hasColumn(t, 'country')) continue;
    const [rows] = await sequelize.query(`SELECT DISTINCT \`country\` AS v, COUNT(*) AS cnt FROM \`${t}\` WHERE \`country\` IS NOT NULL AND \`country\` != '' GROUP BY \`country\``);
    const nonIso = rows.filter(r => {
      if (r.v && r.v.length === 2 && /^[A-Z]{2}$/.test(r.v)) return false;
      return true;
    });
    if (nonIso.length > 0) {
      console.log(`⚠ ${t}: ${nonIso.length} non-ISO values detected:`);
      nonIso.forEach(r => {
        const iso = normalizeCountry(r.v);
        console.log(`    "${r.v}" (${r.cnt} rows) → ${iso ? iso + ' (mapped)' : '?? (no mapping — needs manual review)'}`);
      });
    } else {
      console.log(`✓ ${t}: all country values are ISO 3166-1 alpha-2`);
    }
  }
}

async function auditDirtyStrings() {
  console.log('\n\n=== Whitespace/Newline Audit ===\n');
  const TARGETS = [
    { table: 'restaurants', cols: ['address', 'address_line_2'] },
    { table: 'brands', cols: ['address', 'address_line_2'] },
    { table: 'foodcourts', cols: ['address', 'address_line_2'] },
    { table: 'foodcourt_branches', cols: ['address', 'address_line_2'] },
    { table: 'company_settings', cols: ['address', 'address_line_2'] },
    { table: 'users', cols: ['address', 'address_line_2'] },
    { table: 'suppliers', cols: ['address', 'address_line_2'] },
    { table: 'hardware_quotes', cols: ['company_address', 'address_line_2'] }
  ];
  for (const { table, cols } of TARGETS) {
    if (!await tableExists(table)) continue;
    for (const col of cols) {
      if (!await hasColumn(table, col)) continue;
      const [rows] = await sequelize.query(
        `SELECT id, \`${col}\` AS v FROM \`${table}\` WHERE \`${col}\` LIKE '%\\n%' OR \`${col}\` LIKE '%\\t%' OR \`${col}\` LIKE '%\\r%'`
      );
      if (rows.length > 0) {
        console.log(`⚠ ${table}.${col}: ${rows.length} row(s) contain \\n / \\t / \\r`);
        rows.slice(0, 3).forEach(r => console.log(`    id=${r.id}: "${String(r.v).replace(/\n/g, '\\n').slice(0, 80)}..."`));
        if (rows.length > 3) console.log(`    (+${rows.length - 3} more)`);
      }
    }
  }
}

async function auditIntegrity() {
  console.log('\n\n=== Data Integrity (R1, R2) Audit ===\n');
  // R1: restaurant.brand_id vs active franchise contract
  const [r1] = await sequelize.query(`
    SELECT r.id, r.name, r.brand_id, c.id AS contract_id, c.entity_id AS contract_brand_id, c.stage
    FROM restaurants r
    JOIN contracts c ON c.restaurant_id = r.id AND c.entity_type = 'brand'
    WHERE c.stage IN ('active','setup','contracting')
      AND COALESCE(r.brand_id, -1) != c.entity_id
  `);
  if (r1.length > 0) {
    console.log(`⚠ R1 violations — restaurant.brand_id ≠ active franchise contract.entity_id:`);
    r1.forEach(row => console.log(`    Restaurant #${row.id} "${row.name}" brand=${row.brand_id}, Contract #${row.contract_id} brand=${row.contract_brand_id} stage=${row.stage}`));
  } else {
    console.log('✓ R1: all restaurant.brand_id consistent with active franchise contracts');
  }

  // R2: restaurant.foodcourt_id vs active tenancy contract
  const [r2] = await sequelize.query(`
    SELECT r.id, r.name, r.foodcourt_id, c.id AS contract_id, c.entity_id AS contract_fc_id, c.stage
    FROM restaurants r
    JOIN contracts c ON c.restaurant_id = r.id AND c.entity_type = 'foodcourt'
    WHERE c.stage IN ('active','setup','contracting')
      AND COALESCE(r.foodcourt_id, -1) != c.entity_id
  `);
  if (r2.length > 0) {
    console.log(`⚠ R2 violations — restaurant.foodcourt_id ≠ active tenancy contract.entity_id:`);
    r2.forEach(row => console.log(`    Restaurant #${row.id} "${row.name}" fc=${row.foodcourt_id}, Contract #${row.contract_id} fc=${row.contract_fc_id} stage=${row.stage}`));
  } else {
    console.log('✓ R2: all restaurant.foodcourt_id consistent with active tenancy contracts');
  }

  // EPR mismatch (warn-only)
  const [epr] = await sequelize.query(`
    SELECT epr.id AS epr_id, r.id AS r_id, r.name,
           CASE ep.entity_type WHEN 'brand' THEN r.brand_id WHEN 'foodcourt' THEN r.foodcourt_id END AS r_entity,
           ep.entity_type, ep.entity_id AS plan_entity, ep.name AS plan_name
    FROM entity_plan_restaurants epr
    JOIN entity_plans ep ON ep.id = epr.entity_plan_id
    JOIN restaurants r ON r.id = epr.restaurant_id
    WHERE epr.is_active = 1
  `);
  const mismatches = epr.filter(row => Number(row.r_entity) !== Number(row.plan_entity));
  if (mismatches.length > 0) {
    console.log(`\n⚠ EntityPlanRestaurant mismatches — plan entity ≠ restaurant's entity:`);
    mismatches.forEach(m => console.log(`    EPR #${m.epr_id}: Restaurant #${m.r_id} "${m.name}" entity=${m.r_entity} vs plan "${m.plan_name}" owned by ${m.entity_type} ${m.plan_entity}`));
  } else {
    console.log('\n✓ EPR: all active plan links match restaurant entity ownership');
  }
}

async function auditRowCounts() {
  console.log('\n\n=== Row Counts & Address Completeness ===\n');
  for (const t of TABLES) {
    if (!await tableExists(t)) continue;
    const [r] = await sequelize.query(`SELECT COUNT(*) AS total FROM \`${t}\``);
    const total = r[0].total;
    const parts = [`${t}: ${total} rows`];
    if (await hasColumn(t, 'address') || await hasColumn(t, 'company_address')) {
      const addrCol = await hasColumn(t, 'address') ? 'address' : 'company_address';
      const [f] = await sequelize.query(`SELECT COUNT(*) AS cnt FROM \`${t}\` WHERE \`${addrCol}\` IS NOT NULL AND \`${addrCol}\` != ''`);
      parts.push(`${f[0].cnt} with address`);
    }
    if (await hasColumn(t, 'latitude')) {
      const [f] = await sequelize.query(`SELECT COUNT(*) AS cnt FROM \`${t}\` WHERE latitude IS NOT NULL AND longitude IS NOT NULL`);
      parts.push(`${f[0].cnt} geocoded`);
    }
    console.log('  ' + parts.join(', '));
  }
}

async function main() {
  console.log('╔══════════════════════════════════════════════════════════╗');
  console.log('║  Address Data Audit — READ-ONLY (no changes made)        ║');
  console.log(`║  DB: ${(process.env.DB_NAME || 'unknown').padEnd(52)}║`);
  console.log('╚══════════════════════════════════════════════════════════╝');

  await auditSchema();
  await auditRowCounts();
  await auditCountries();
  await auditDirtyStrings();
  await auditIntegrity();

  console.log('\n\nAudit complete. No changes written.');
  console.log('→ If warnings above: run `node scripts/cleanup-addresses.js` (dry-run first, then --apply).');
  process.exit(0);
}

main().catch(e => { console.error(e); process.exit(1); });

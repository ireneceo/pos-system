#!/usr/bin/env node
/**
 * sync-seed-data.js
 *
 * 시스템 설정 테이블(seed data)을 동기화합니다.
 * 배포 스크립트에서 DB 스키마 sync 후 자동으로 실행됩니다.
 *
 * 대상 테이블:
 * - addon_modules: 모듈 정의 (사이드바 라우트 결정)
 * - plan_templates: 구독 플랜 정의
 *
 * 동작 방식:
 * - 개발 DB에서 데이터를 읽어서 JSON으로 export (--export)
 * - JSON 파일을 읽어서 운영 DB에 upsert (--import)
 * - module_code / plan_code를 기준으로 INSERT OR UPDATE
 *
 * 사용법:
 *   node sync-seed-data.js --export --out seed-data.json   # 개발서버에서 실행
 *   node sync-seed-data.js --import --in seed-data.json    # 운영서버에서 실행
 */

const { Sequelize } = require('sequelize');
require('dotenv').config();

const args = process.argv.slice(2);
const isExport = args.includes('--export');
const isImport = args.includes('--import');
const outIdx = args.indexOf('--out');
const inIdx = args.indexOf('--in');
const outFile = outIdx !== -1 ? args[outIdx + 1] : null;
const inFile = inIdx !== -1 ? args[inIdx + 1] : null;

const fs = require('fs');

// Seed 대상 테이블 정의
// key_column: upsert 시 매칭 기준 컬럼
// exclude_columns: export/import에서 제외할 컬럼 (auto-increment id, timestamps 등)
const SEED_TABLES = [
  {
    table: 'addon_modules',
    key_column: 'module_code',
    exclude_columns: ['id', 'created_at', 'updated_at', 'createdAt', 'updatedAt']
  }
];

async function getSequelize() {
  const seq = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      dialect: 'mysql',
      logging: false
    }
  );
  await seq.authenticate();
  return seq;
}

async function exportSeedData() {
  if (!outFile) {
    console.error('Usage: --export --out <filename.json>');
    process.exit(1);
  }

  const seq = await getSequelize();
  const result = {};

  for (const config of SEED_TABLES) {
    try {
      const [rows] = await seq.query(`SELECT * FROM ${config.table}`);
      // Remove excluded columns
      const cleaned = rows.map(row => {
        const obj = { ...row };
        config.exclude_columns.forEach(col => delete obj[col]);
        return obj;
      });
      result[config.table] = {
        key_column: config.key_column,
        data: cleaned
      };
      console.log(`✅ ${config.table}: ${cleaned.length} records exported`);
    } catch (err) {
      console.log(`⚠️  ${config.table}: table not found or error (${err.message})`);
      result[config.table] = { key_column: config.key_column, data: [] };
    }
  }

  fs.writeFileSync(outFile, JSON.stringify(result, null, 2));
  console.log(`\n📦 Seed data exported to ${outFile}`);
  await seq.close();
  process.exit(0);
}

async function importSeedData() {
  if (!inFile) {
    console.error('Usage: --import --in <filename.json>');
    process.exit(1);
  }

  if (!fs.existsSync(inFile)) {
    console.error(`File not found: ${inFile}`);
    process.exit(1);
  }

  const seq = await getSequelize();
  const seedData = JSON.parse(fs.readFileSync(inFile, 'utf-8'));

  let totalInserted = 0;
  let totalUpdated = 0;
  let totalSkipped = 0;

  for (const [tableName, tableConfig] of Object.entries(seedData)) {
    const { key_column, data } = tableConfig;
    if (!data || data.length === 0) {
      console.log(`⏭️  ${tableName}: no data to import`);
      continue;
    }

    // Check if table exists
    try {
      await seq.query(`SELECT 1 FROM ${tableName} LIMIT 1`);
    } catch {
      console.log(`⚠️  ${tableName}: table does not exist, skipping`);
      continue;
    }

    // Check if key column exists in table
    try {
      await seq.query(`SELECT \`${key_column}\` FROM ${tableName} LIMIT 1`);
    } catch {
      console.log(`⚠️  ${tableName}: key column '${key_column}' does not exist, skipping`);
      continue;
    }

    // Get existing records by key
    const [existing] = await seq.query(`SELECT \`${key_column}\` FROM ${tableName}`);
    const existingKeys = new Set(existing.map(r => r[key_column]));

    // Get actual columns in target table to filter out non-existent columns
    const [tableColumns] = await seq.query(`SHOW COLUMNS FROM ${tableName}`);
    const actualColumns = new Set(tableColumns.map(c => c.Field));

    // Check if table uses created_at or createdAt
    const hasCreatedAt = actualColumns.has('created_at');
    const hasCreatedAtCamel = actualColumns.has('createdAt');

    let inserted = 0;
    let updated = 0;

    for (const row of data) {
      const keyValue = row[key_column];
      if (!keyValue) continue;

      // Filter columns to only those that exist in target table
      const columns = Object.keys(row).filter(col => actualColumns.has(col));
      const values = columns.map(col => {
        const val = row[col];
        if (val === null || val === undefined) return 'NULL';
        if (typeof val === 'object') return seq.escape(JSON.stringify(val));
        return seq.escape(val);
      });

      try {
        if (existingKeys.has(keyValue)) {
          // UPDATE existing record
          const setClauses = columns
            .filter(col => col !== key_column)
            .map(col => {
              const val = row[col];
              if (val === null || val === undefined) return `\`${col}\` = NULL`;
              if (typeof val === 'object') return `\`${col}\` = ${seq.escape(JSON.stringify(val))}`;
              return `\`${col}\` = ${seq.escape(val)}`;
            })
            .join(', ');

          if (setClauses) {
            await seq.query(
              `UPDATE ${tableName} SET ${setClauses} WHERE \`${key_column}\` = ${seq.escape(keyValue)}`
            );
          }
          updated++;
        } else {
          // INSERT new record (add timestamps)
          const insertColumns = [...columns];
          const insertValues = [...values];

          if (hasCreatedAt && !columns.includes('created_at')) {
            insertColumns.push('created_at');
            insertValues.push('NOW()');
          }
          if (actualColumns.has('updated_at') && !columns.includes('updated_at')) {
            insertColumns.push('updated_at');
            insertValues.push('NOW()');
          }
          if (hasCreatedAtCamel && !columns.includes('createdAt')) {
            insertColumns.push('createdAt');
            insertValues.push('NOW()');
          }
          if (actualColumns.has('updatedAt') && !columns.includes('updatedAt')) {
            insertColumns.push('updatedAt');
            insertValues.push('NOW()');
          }

          const colNames = insertColumns.map(c => `\`${c}\``).join(', ');
          await seq.query(
            `INSERT INTO ${tableName} (${colNames}) VALUES (${insertValues.join(', ')})`
          );
          inserted++;
        }
      } catch (rowErr) {
        console.log(`  ⚠️  ${tableName}/${keyValue}: ${rowErr.original?.sqlMessage || rowErr.message}`);
      }
    }

    console.log(`✅ ${tableName}: ${inserted} inserted, ${updated} updated (total: ${data.length})`);
    totalInserted += inserted;
    totalUpdated += updated;
  }

  console.log(`\n📊 Seed data sync complete: ${totalInserted} inserted, ${totalUpdated} updated`);
  await seq.close();
  process.exit(0);
}

// Main
if (isExport) {
  exportSeedData().catch(err => { console.error('Export failed:', err); process.exit(1); });
} else if (isImport) {
  importSeedData().catch(err => { console.error('Import failed:', err); process.exit(1); });
} else {
  console.log('Usage:');
  console.log('  node sync-seed-data.js --export --out seed-data.json');
  console.log('  node sync-seed-data.js --import --in seed-data.json');
  process.exit(1);
}

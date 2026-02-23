#!/usr/bin/env node
/**
 * DB Schema Comparison Tool
 *
 * dev DB와 prod DB 스키마를 비교하여 차이점을 출력합니다.
 * 배포 전에 실행하여 DB 마이그레이션이 필요한지 확인합니다.
 *
 * Usage:
 *   node compare-schema.js --export                       # 현재 DB 스키마를 JSON으로 stdout
 *   node compare-schema.js --export --out FILE            # 현재 DB 스키마를 파일에 저장
 *   node compare-schema.js --compare FILE                 # 현재 DB vs FILE(JSON) 비교
 *   node compare-schema.js --compare dev.json prod.json   # 두 JSON 파일 비교 (DB 연결 불필요)
 */

const fs = require('fs');

// Lazy-load and connect sequelize (suppresses config/database.js console noise)
async function connectDB() {
  const origLog = console.log;
  console.log = () => {};
  const { sequelize } = require('./config/database');
  await sequelize.authenticate();
  console.log = origLog;
  return sequelize;
}

// DB에서 현재 스키마 가져오기 (순수 SQL, 모델 로딩 없음)
async function exportSchema(sq) {
  const [tables] = await sq.query(
    "SELECT TABLE_NAME FROM information_schema.tables WHERE TABLE_SCHEMA = DATABASE() AND TABLE_TYPE = 'BASE TABLE' ORDER BY TABLE_NAME"
  );

  const schema = {};
  for (const { TABLE_NAME } of tables) {
    const [columns] = await sq.query(
      `SELECT COLUMN_NAME, COLUMN_TYPE, IS_NULLABLE, COLUMN_DEFAULT
       FROM information_schema.columns
       WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ?
       ORDER BY ORDINAL_POSITION`,
      { replacements: [TABLE_NAME] }
    );
    schema[TABLE_NAME] = columns.map(c => ({
      name: c.COLUMN_NAME,
      type: c.COLUMN_TYPE,
      nullable: c.IS_NULLABLE === 'YES',
      default: c.COLUMN_DEFAULT
    }));
  }
  return schema;
}

// 두 스키마 비교 (DB 컬럼 레벨)
function compareSchemas(devSchema, prodSchema) {
  const diffs = {
    newTables: [],
    droppedTables: [],
    newColumns: [],
    droppedColumns: [],
    typeChanges: []
  };

  const devTables = new Set(Object.keys(devSchema));
  const prodTables = new Set(Object.keys(prodSchema));

  for (const t of devTables) {
    if (!prodTables.has(t)) {
      diffs.newTables.push({ table: t, columns: devSchema[t].length });
    }
  }

  for (const t of prodTables) {
    if (!devTables.has(t)) {
      diffs.droppedTables.push(t);
    }
  }

  for (const table of devTables) {
    if (!prodTables.has(table)) continue;

    const devCols = new Map(devSchema[table].map(c => [c.name, c]));
    const prodCols = new Map(prodSchema[table].map(c => [c.name, c]));

    for (const [name, col] of devCols) {
      if (!prodCols.has(name)) {
        diffs.newColumns.push({ table, column: name, type: col.type });
      }
    }

    for (const [name, col] of prodCols) {
      if (!devCols.has(name)) {
        diffs.droppedColumns.push({ table, column: name, type: col.type });
      }
    }

    for (const [name, devCol] of devCols) {
      const prodCol = prodCols.get(name);
      if (!prodCol) continue;
      if (normalizeType(devCol.type) !== normalizeType(prodCol.type)) {
        diffs.typeChanges.push({
          table, column: name,
          devType: devCol.type, prodType: prodCol.type
        });
      }
    }
  }

  return diffs;
}

function normalizeType(t) {
  if (!t) return '';
  return t.toLowerCase()
    .replace(/int\(\d+\)/g, 'int')
    .replace(/bigint\(\d+\)/g, 'bigint')
    .replace(/tinyint\(1\)/g, 'tinyint(1)')
    .replace(/\s+/g, ' ')
    .trim();
}

function printDiffs(diffs) {
  let hasIssues = false;

  if (diffs.newTables.length > 0) {
    hasIssues = true;
    console.log('🆕 New tables (need sync):');
    diffs.newTables.forEach(t => console.log(`   + ${t.table} (${t.columns} columns)`));
    console.log('');
  }

  if (diffs.droppedTables.length > 0) {
    hasIssues = true;
    console.log('🗑️  Tables in prod but not in dev:');
    diffs.droppedTables.forEach(t => console.log(`   - ${t}`));
    console.log('');
  }

  if (diffs.newColumns.length > 0) {
    hasIssues = true;
    console.log('🆕 New columns (need sync):');
    diffs.newColumns.forEach(c => console.log(`   + ${c.table}.${c.column} (${c.type})`));
    console.log('');
  }

  if (diffs.droppedColumns.length > 0) {
    hasIssues = true;
    console.log('⚠️  Columns in prod but not in dev:');
    diffs.droppedColumns.forEach(c => console.log(`   - ${c.table}.${c.column} (${c.type})`));
    console.log('');
  }

  if (diffs.typeChanges.length > 0) {
    hasIssues = true;
    console.log('🔄 Type changes:');
    diffs.typeChanges.forEach(c =>
      console.log(`   ⚡ ${c.table}.${c.column}: dev=${c.devType} → prod=${c.prodType}`)
    );
    console.log('');
  }

  if (!hasIssues) {
    console.log('✅ Schemas are identical. No migration needed.');
  } else {
    console.log('───────────────────────────────────────────');
    console.log(`Total: ${diffs.newTables.length} new tables, ${diffs.newColumns.length} new columns, ${diffs.droppedColumns.length} extra prod columns, ${diffs.typeChanges.length} type changes`);
  }

  return hasIssues;
}

async function main() {
  const args = process.argv.slice(2);

  // --export
  if (args.includes('--export')) {
    try {
      const sq = await connectDB();
      const schema = await exportSchema(sq);

      const outIdx = args.indexOf('--out');
      if (outIdx >= 0 && args[outIdx + 1]) {
        fs.writeFileSync(args[outIdx + 1], JSON.stringify(schema));
        console.log(`✅ Schema exported to ${args[outIdx + 1]} (${Object.keys(schema).length} tables)`);
      } else {
        process.stdout.write(JSON.stringify(schema));
      }
      process.exit(0);
    } catch (e) {
      console.error('❌ Export failed:', e.message);
      process.exit(2);
    }
  }

  // --compare
  const compareIdx = args.indexOf('--compare');
  if (compareIdx >= 0) {
    const file1 = args[compareIdx + 1];
    const file2 = args[compareIdx + 2];

    let devSchema, prodSchema;

    if (file1 && file2) {
      // 두 파일 비교 (DB 연결 불필요)
      devSchema = JSON.parse(fs.readFileSync(file1, 'utf-8'));
      prodSchema = JSON.parse(fs.readFileSync(file2, 'utf-8'));
    } else if (file1) {
      // 현재 DB vs 파일 비교
      const sq = await connectDB();
      devSchema = await exportSchema(sq);
      prodSchema = JSON.parse(fs.readFileSync(file1, 'utf-8'));
    } else {
      console.error('Usage: node compare-schema.js --compare [prod-schema.json]');
      process.exit(1);
    }

    console.log('');
    console.log('═══════════════════════════════════════════');
    console.log('  DB Schema Comparison');
    console.log(`  Dev:  ${Object.keys(devSchema).length} tables`);
    console.log(`  Prod: ${Object.keys(prodSchema).length} tables`);
    console.log('═══════════════════════════════════════════');
    console.log('');

    const diffs = compareSchemas(devSchema, prodSchema);
    const hasIssues = printDiffs(diffs);
    process.exit(hasIssues ? 1 : 0);
  }

  // 기본: 사용법
  console.log('Usage:');
  console.log('  node compare-schema.js --export              # Export current DB schema as JSON');
  console.log('  node compare-schema.js --export --out FILE   # Export to file');
  console.log('  node compare-schema.js --compare FILE        # Compare current DB vs FILE');
  console.log('  node compare-schema.js --compare dev.json prod.json  # Compare two files');
  process.exit(0);
}

main();

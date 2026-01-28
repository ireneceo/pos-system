#!/usr/bin/env node
/**
 * DB Schema Comparison Script
 * 개발 DB와 운영 DB의 스키마 차이를 검사합니다.
 *
 * 사용법: cd /var/www/dev-backend && node ../scripts/check-schema-diff.js
 *
 * 배포 전 실행하여 누락된 컬럼/테이블을 확인합니다.
 */

// dev-backend의 node_modules 사용
const mysql = require('/var/www/dev-backend/node_modules/mysql2/promise');
const path = require('path');
const fs = require('fs');

// .env 파일 파싱
function parseEnvFile(envPath) {
  const content = fs.readFileSync(envPath, 'utf8');
  const env = {};
  content.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      env[match[1].trim()] = match[2].trim();
    }
  });
  return env;
}

async function getTableSchema(connection, tableName) {
  const [columns] = await connection.query(`DESCRIBE \`${tableName}\``);
  return columns.map(col => ({
    field: col.Field,
    type: col.Type,
    null: col.Null,
    key: col.Key,
    default: col.Default,
    extra: col.Extra
  }));
}

async function getAllTables(connection) {
  const [tables] = await connection.query('SHOW TABLES');
  return tables.map(t => Object.values(t)[0]);
}

async function compareSchemas() {
  console.log('========================================');
  console.log('  DB Schema Comparison Tool');
  console.log('========================================\n');

  // 환경변수 로드
  const devEnv = parseEnvFile('/var/www/dev-backend/.env');
  const prodEnv = parseEnvFile('/var/www/production-backend/.env');

  // 연결 생성
  const devConn = await mysql.createConnection({
    host: devEnv.DB_HOST,
    user: devEnv.DB_USER,
    password: devEnv.DB_PASSWORD,
    database: devEnv.DB_NAME
  });

  const prodConn = await mysql.createConnection({
    host: prodEnv.DB_HOST,
    user: prodEnv.DB_USER,
    password: prodEnv.DB_PASSWORD,
    database: prodEnv.DB_NAME
  });

  console.log(`Dev DB:  ${devEnv.DB_NAME}`);
  console.log(`Prod DB: ${prodEnv.DB_NAME}\n`);

  // 테이블 목록 가져오기
  const devTables = await getAllTables(devConn);
  const prodTables = await getAllTables(prodConn);

  const issues = {
    missingTables: [],
    missingColumns: [],
    typeChanges: []
  };

  // 1. 운영 DB에 없는 테이블 확인
  for (const table of devTables) {
    if (!prodTables.includes(table)) {
      issues.missingTables.push(table);
    }
  }

  // 2. 각 테이블의 컬럼 비교
  const commonTables = devTables.filter(t => prodTables.includes(t));

  for (const table of commonTables) {
    const devSchema = await getTableSchema(devConn, table);
    const prodSchema = await getTableSchema(prodConn, table);

    const prodFields = prodSchema.map(c => c.field);

    for (const devCol of devSchema) {
      if (!prodFields.includes(devCol.field)) {
        issues.missingColumns.push({
          table,
          column: devCol.field,
          type: devCol.type,
          default: devCol.default
        });
      } else {
        // 타입 변경 확인
        const prodCol = prodSchema.find(c => c.field === devCol.field);
        if (prodCol && devCol.type !== prodCol.type) {
          issues.typeChanges.push({
            table,
            column: devCol.field,
            devType: devCol.type,
            prodType: prodCol.type
          });
        }
      }
    }
  }

  // 결과 출력
  let hasIssues = false;

  if (issues.missingTables.length > 0) {
    hasIssues = true;
    console.log('\x1b[31m[ERROR] Missing Tables in Production:\x1b[0m');
    issues.missingTables.forEach(t => {
      console.log(`  - ${t}`);
    });
    console.log('');
  }

  if (issues.missingColumns.length > 0) {
    hasIssues = true;
    console.log('\x1b[31m[ERROR] Missing Columns in Production:\x1b[0m');
    issues.missingColumns.forEach(c => {
      const defaultVal = c.default !== null ? ` DEFAULT ${c.default}` : '';
      console.log(`  - ${c.table}.${c.column} (${c.type}${defaultVal})`);
    });
    console.log('');

    // ALTER TABLE 문 생성
    console.log('\x1b[33m[FIX] SQL statements to add missing columns:\x1b[0m');
    issues.missingColumns.forEach(c => {
      const defaultVal = c.default !== null ? ` DEFAULT '${c.default}'` : '';
      const nullVal = ' NULL';
      console.log(`  ALTER TABLE \`${c.table}\` ADD COLUMN \`${c.column}\` ${c.type}${nullVal}${defaultVal};`);
    });
    console.log('');
  }

  if (issues.typeChanges.length > 0) {
    console.log('\x1b[33m[WARNING] Column Type Differences:\x1b[0m');
    issues.typeChanges.forEach(c => {
      console.log(`  - ${c.table}.${c.column}: dev(${c.devType}) vs prod(${c.prodType})`);
    });
    console.log('');
  }

  if (!hasIssues) {
    console.log('\x1b[32m[OK] No schema differences found!\x1b[0m');
    console.log('     Production DB is in sync with Development DB.\n');
  }

  await devConn.end();
  await prodConn.end();

  // 종료 코드 반환
  process.exit(hasIssues ? 1 : 0);
}

compareSchemas().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});

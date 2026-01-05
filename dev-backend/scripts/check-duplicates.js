#!/usr/bin/env node
/**
 * 중복 라우트 검사 스크립트
 * 개발 중 실행하여 중복 라우트를 사전에 감지
 *
 * 사용법: node scripts/check-duplicates.js
 */

const fs = require('fs');
const path = require('path');

const routesDir = path.join(__dirname, '../routes');
const routes = new Map(); // method+path -> [files]
let hasErrors = false;

// 라우트 파일 읽기
const files = fs.readdirSync(routesDir).filter(f => f.endsWith('.js'));

files.forEach(file => {
  const filePath = path.join(routesDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    // router.get('/path', ...) 패턴 매칭
    const match = line.match(/router\.(get|post|put|delete|patch)\s*\(\s*['"`]([^'"`]+)['"`]/i);
    if (match) {
      const method = match[1].toUpperCase();
      const routePath = match[2];
      const key = `${method} ${routePath}`;

      if (!routes.has(key)) {
        routes.set(key, []);
      }
      routes.get(key).push({
        file: file,
        line: index + 1,
        code: line.trim()
      });
    }
  });
});

// 중복 검사
console.log('=== Checking for duplicate routes ===\n');

let duplicateCount = 0;
routes.forEach((locations, route) => {
  if (locations.length > 1) {
    duplicateCount++;
    hasErrors = true;
    console.log(`DUPLICATE: ${route}`);
    locations.forEach(loc => {
      console.log(`  - ${loc.file}:${loc.line}`);
    });
    console.log('');
  }
});

if (duplicateCount === 0) {
  console.log('No duplicate routes found.');
} else {
  console.log(`\nFound ${duplicateCount} duplicate route(s). Please fix before deployment.`);
}

process.exit(hasErrors ? 1 : 0);

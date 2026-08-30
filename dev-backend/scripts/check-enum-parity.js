#!/usr/bin/env node
/**
 * ENUM 값 소실 검사 — 배포 게이트용 (fail-closed).
 *
 * dev 스키마 ENUM 에 있는 값이 prod 스키마 ENUM 에 **없으면** 실패(exit 1).
 * 반대(prod 에만 있는 값)는 실패로 보지 않는다 — 옛 값이 아직 안 지워진 것은 무해하다.
 *
 * 왜 필요한가 (2026-08-30):
 *   배포의 post-sync 스키마 비교가 `purchase_orders.status` 의 'pending_approval' 누락을
 *   정확히 감지하고도 "usually harmless: datetime↔timestamp etc" 로 넘겼고, 그 값이
 *   **3번의 배포에서 연속으로** 빠진 채 통과했다. 근본 원인(sprint6 의 ENUM 목록 하드코딩)은
 *   따로 고쳤지만, 게이트가 물러선 것도 같이 고친다. 타입 차이 전체를 막으면 무해한
 *   datetime↔timestamp 까지 배포를 세우므로, **값 소실만** 골라 막는다.
 *
 * 사용: node scripts/check-enum-parity.js <dev_schema.json> <prod_schema.json>
 *   exit 0 = 소실 없음 / exit 1 = 소실 있음(목록 출력) / exit 2 = 입력 문제
 */

const fs = require('fs');

const [devPath, prodPath] = process.argv.slice(2);
if (!devPath || !prodPath) {
  console.error('usage: check-enum-parity.js <dev_schema.json> <prod_schema.json>');
  process.exit(2);
}

const load = (p) => {
  try {
    return JSON.parse(fs.readFileSync(p, 'utf8'));
  } catch (e) {
    console.error(`  ✗ 스키마 파일을 읽을 수 없다: ${p} (${e.message})`);
    process.exit(2);
  }
};

/** "enum('a','b')" → ['a','b'] · ENUM 이 아니면 null */
function enumValues(type) {
  if (typeof type !== 'string' || !/^enum\(/i.test(type)) return null;
  const inner = type.replace(/^enum\(/i, '').replace(/\)$/, '');
  // MySQL 은 ENUM 안의 홑따옴표를 '' 로 이스케이프한다
  return inner.split(',').map(v =>
    v.trim().replace(/^'/, '').replace(/'$/, '').replace(/''/g, "'"));
}

/** 테이블 → { 컬럼명: [값...] } (ENUM 컬럼만) */
function enumMap(schema, table) {
  const cols = schema[table];
  if (!Array.isArray(cols)) return {};
  const out = {};
  for (const c of cols) {
    const vals = enumValues(c && c.type);
    if (vals) out[c.name] = vals;
  }
  return out;
}

const dev = load(devPath);
const prod = load(prodPath);

const losses = [];
let enumColumnsChecked = 0;

for (const table of Object.keys(dev)) {
  if (!prod[table]) continue; // 테이블 자체가 없는 건 신규 테이블 검사가 따로 본다
  const devEnums = enumMap(dev, table);
  const prodEnums = enumMap(prod, table);
  for (const [col, devVals] of Object.entries(devEnums)) {
    const prodVals = prodEnums[col];
    if (!prodVals) continue; // 컬럼이 아직 없거나 ENUM 이 아님 — 다른 검사 소관
    enumColumnsChecked++;
    const missing = devVals.filter(v => !prodVals.includes(v));
    if (missing.length) losses.push({ table, col, missing, prodVals });
  }
}

if (!losses.length) {
  // 검사기가 아무것도 안 본 상태를 "통과"로 위장하지 않는다.
  if (enumColumnsChecked === 0) {
    console.error('  ✗ ENUM 컬럼을 하나도 검사하지 못했다 — 스키마 형식이 바뀌었을 수 있다(검사기 고장).');
    process.exit(2);
  }
  process.exit(0);
}

console.log('');
console.log('  🗄️ 운영 ENUM 에 dev 값이 빠져 있다 (값 소실):');
for (const l of losses) {
  console.log(`     ✗ ${l.table}.${l.col} — 없음: ${l.missing.map(v => `'${v}'`).join(', ')}`);
  console.log(`        prod 현재: ${l.prodVals.map(v => `'${v}'`).join(',')}`);
}
console.log(`  (ENUM 컬럼 ${enumColumnsChecked}개 검사, 소실 ${losses.length}건)`);
console.log('');
process.exit(1);

#!/usr/bin/env node
/**
 * 배포 마이그 «운영 기준» 순서 검사 — 운영에 아직 없는 칸을 쓰는 색인을, 그 칸을 더하는 마이그보다
 * 먼저 model.sync() 로 만들려는 순서를 배포 전에 잡는다.
 *
 * 왜 만들었나 (2026-10-17 정기 배포 4회차 실패 · Irene «이거 반복 안하게 조치 안돼?»):
 *   67b497a86 이 UserContextRequest 모델에 initiator 칸 + 그 칸을 쓰는 색인을 넣었다. 칸은
 *   migrate-user-context-requests-invite.js 가 더하는데, 레지스트리 순서상 옛 마이그
 *   migrate-user-context-requests.js(표가 있어도 model.sync() → 모델 색인 만들기)가 먼저 돌아
 *   운영에서 «Key column 'initiator' doesn't exist» 로 죽었다 → 배포 스크립트가 코드 자동 원복.
 *   게이트 4c(배포 마이그 실전 실행)는 **이미 칸이 있는 개발 DB** 에서 돌아 이 순서를 볼 수 없었다.
 *
 * 무엇을 보나 (운영 DB 는 읽기 전용 prod-query 로 information_schema 만 읽는다):
 *   1) 모든 모델의 색인(options.indexes) 칸 중 **운영 표에는 있는데 칸이 없는 것** 을 모은다.
 *   2) 그 모델 이름을 부르면서 .sync( 를 하는 배포 마이그(표 존재 확인 없이)가 있으면,
 *      그 칸을 더하는 배포 마이그(파일에 표 이름과 칸 이름이 둘 다 나옴)가 레지스트리에서 **더 앞에** 있어야 한다.
 *   운영에 표가 아예 없으면 sync 가 표를 통째로 만들므로 문제 없음.
 *
 * 한계(정직하게): 모델 이름 문자열로 «이 마이그가 그 모델을 sync 한다» 를 추정한다 — 반복문
 *   (`model.sync()`)으로 여러 모델을 부르는 마이그도 파일 안에 모델 이름이 나오면 잡힌다.
 *   운영에 못 닿으면(ssh·계정) fail-closed 로 멈춘다.
 *
 * 사용: node scripts/check-migration-prod-order.js      (exit 0 = 통과, 1 = 순서 결함, 2 = 운영 못 읽음)
 */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const SCRIPTS = path.join(ROOT, 'scripts');
const reg = JSON.parse(fs.readFileSync(path.join(SCRIPTS, 'migrations.registry.json'), 'utf8'));
const deploy = (reg.deploy || []).filter((f) => fs.existsSync(path.join(SCRIPTS, f)));
const src = Object.fromEntries(deploy.map((f) => [f, fs.readFileSync(path.join(SCRIPTS, f), 'utf8')]));

// 표 존재 확인 뒤에만 sync 하는 마이그는 «있는 표엔 손대지 않음» — 대상 아님
const GUARD = /information_schema\.TABLES|tableExists|showAllTables|describeTable/i;

const db = require('../models');
const models = Object.keys(db).filter((k) => db[k] && db[k].rawAttributes && db[k].getTableName);

// 모델 색인이 쓰는 칸(DB 칸 이름) — 표별
const want = {}; // table -> { model, cols:Set }
for (const name of models) {
  const M = db[name];
  const t = M.getTableName();
  const table = typeof t === 'string' ? t : t.tableName;
  const idx = (M.options && M.options.indexes) || [];
  const cols = new Set();
  for (const i of idx) {
    for (const f of i.fields || []) {
      const attr = typeof f === 'string' ? f : (f && (f.name || f.attribute));
      if (!attr) continue;
      const ra = M.rawAttributes[attr];
      cols.add((ra && ra.field) || attr);
    }
  }
  if (cols.size) want[table] = { model: name, cols };
}

const tables = Object.keys(want);
if (!tables.length) { console.log('✓ 색인 있는 모델 없음'); process.exit(0); }

// 운영 information_schema 읽기 (읽기 전용 계정 · 한 문장)
const sql = `SELECT TABLE_NAME t, COLUMN_NAME c FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME IN (${tables.map((t) => `'${t.replace(/'/g, '')}'`).join(',')})`;
let out;
try {
  out = execFileSync('node', [path.join(SCRIPTS, 'prod-query.js'), sql], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], timeout: 60000 });
} catch (e) {
  console.error('✗ 운영 칸 목록을 읽지 못했습니다(prod-query) — 순서 검사를 할 수 없어 멈춥니다.');
  console.error(String(e.stderr || e.message).slice(0, 500));
  process.exit(2);
}
const prod = {}; // table -> Set(cols)
for (const line of out.split('\n')) {
  const m = line.match(/^\|\s*(\S+)\s*\|\s*(\S+)\s*\|$/);
  if (!m || m[1] === 't') continue;
  (prod[m[1]] = prod[m[1]] || new Set()).add(m[2]);
}
if (!Object.keys(prod).length) {
  console.error('✗ 운영 칸 목록이 비었습니다 — 검사기 고장으로 보고 멈춥니다(0건 통과 금지).');
  process.exit(2);
}

const problems = [];
let checked = 0;
for (const table of tables) {
  if (!prod[table]) continue; // 운영에 표 없음 → sync 가 통째로 만듦
  const { model, cols } = want[table];
  const missing = [...cols].filter((c) => !prod[table].has(c));
  if (!missing.length) continue;
  const nameRe = new RegExp(`\\b${model}\\b`);
  deploy.forEach((f, i) => {
    const s = src[f];
    if (!/\.sync\(/.test(s) || GUARD.test(s) || !nameRe.test(s)) return;
    checked++;
    for (const col of missing) {
      const adder = deploy.findIndex((g) => src[g].includes(table) && new RegExp(`\\b${col}\\b`).test(src[g]) && g !== f && /ADD\s+COLUMN|addColumn/i.test(src[g]));
      if (adder === -1 || adder > i) {
        problems.push(`${f} (레지스트리 ${i + 1}번째) 가 ${model}.sync() 로 «${col}» 칸을 쓰는 색인을 만들려 하는데, 운영 ${table} 에는 그 칸이 없고` +
          (adder === -1 ? ' 그 칸을 더하는 배포 마이그도 찾지 못했습니다.' : ` 칸을 더하는 ${deploy[adder]} 는 ${adder + 1}번째(더 뒤)입니다.`));
      }
    }
  });
}

if (problems.length) {
  console.error('✗ 배포 마이그 순서 결함 — 운영에서 «Key column … doesn\'t exist» 로 죽습니다:');
  for (const p of problems) console.error('  - ' + p);
  console.error('  고치는 법: 칸을 더하는 마이그를 레지스트리에서 앞으로 옮기거나, sync 하는 마이그를 «표가 없을 때만 sync» 로 바꾸세요.');
  process.exit(1);
}
console.log(`✓ 배포 마이그 운영 순서 OK (운영에 없는 색인 칸 대상 sync 마이그 ${checked}건 검사 · 운영 표 ${Object.keys(prod).length}개 대조)`);
process.exit(0);

/**
 * scripts/inspection/run.js — Purple POS 인스펙션 하니스 러너.
 *
 * "빌드 통과 · API 200 · grep 통과"를 다 통과해도 유출되는 구조/완결성 결함을, 반복가능한
 * 불변식(invariant) 검사로 자동 감지한다. (PlanQ docs/qa/INSPECTION_PLAYBOOK.md 방법론 이식)
 *
 * 각 스위트 = 파일 1개, `{ name, run(ctx) => [{ name, pass, detail }] }` 를 export.
 * exit code ≠ 0 = 결함 감지 = /검증 실패 (health-check.js 동급 게이트).
 *
 *   node scripts/inspection/run.js [--suite supply-chain,...] [--json]
 */
require('dotenv/config');
const fs = require('fs');
const path = require('path');
const { sequelize } = require('../../config/database');

const arg = (k, d) => { const i = process.argv.indexOf('--' + k); return i > -1 ? process.argv[i + 1] : d; };
const wantJson = process.argv.includes('--json');
const only = (arg('suite', '') || '').split(',').map(s => s.trim()).filter(Boolean);

const SUITE_DIR = path.join(__dirname, 'suites');

async function main() {
  const files = fs.readdirSync(SUITE_DIR).filter(f => f.endsWith('.js'));
  const suites = files.map(f => require(path.join(SUITE_DIR, f))).filter(s => s && s.name && typeof s.run === 'function');
  const selected = only.length ? suites.filter(s => only.includes(s.name)) : suites;

  const ctx = { sequelize, q: async (sql, r) => (await sequelize.query(sql, r ? { replacements: r } : undefined))[0] };
  const report = [];
  let totalFail = 0;

  for (const suite of selected) {
    let checks = [];
    try { checks = await suite.run(ctx); }
    catch (e) { checks = [{ name: `${suite.name} (스위트 실행)`, pass: false, detail: 'ERROR: ' + e.message.slice(0, 160) }]; }
    report.push({ suite: suite.name, checks });
    totalFail += checks.filter(c => !c.pass).length;
  }

  if (wantJson) {
    console.log(JSON.stringify({ totalFail, report }, null, 2));
  } else {
    for (const { suite, checks } of report) {
      console.log(`\n── ${suite} ──`);
      for (const c of checks) {
        console.log(`  ${c.pass ? '✅' : '❌'} ${c.name}${c.detail ? `\n       └ ${c.detail}` : ''}`);
      }
    }
    const pass = report.reduce((n, r) => n + r.checks.filter(c => c.pass).length, 0);
    const total = report.reduce((n, r) => n + r.checks.length, 0);
    console.log(`\n=== ${pass}/${total} 통과 · 실패 ${totalFail} ===`);
  }
  await sequelize.close().catch(() => {});
  process.exit(totalFail > 0 ? 1 : 0);
}

main().catch(e => { console.error('FATAL', e.message); process.exit(2); });

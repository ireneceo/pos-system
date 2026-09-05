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
const bless = process.argv.includes('--bless');
const only = (arg('suite', '') || '').split(',').map(s => s.trim()).filter(Boolean);

const SUITE_DIR = path.join(__dirname, 'suites');
const BASELINE_FILE = path.join(__dirname, 'baseline.json');
// baseline = 기존 알려진 실패(환경별 데이터 부채) 추적. design-guard/timezone-check 와 동일 모델:
// baseline 에 있는 실패는 게이트에서 제외(known), 신규 실패만 exit≠0 으로 배포를 막는다.
// --bless 로 현재 실패를 baseline 으로 등록. 정식 수정 완료분은 baseline 에서 자동 제거된다.
const readBaseline = () => { try { return JSON.parse(fs.readFileSync(BASELINE_FILE, 'utf8')); } catch { return {}; } };

async function main() {
  const files = fs.readdirSync(SUITE_DIR).filter(f => f.endsWith('.js'));
  const suites = files.map(f => require(path.join(SUITE_DIR, f))).filter(s => s && s.name && typeof s.run === 'function');
  const selected = only.length ? suites.filter(s => only.includes(s.name)) : suites;

  const ctx = { sequelize, q: async (sql, r) => (await sequelize.query(sql, r ? { replacements: r } : undefined))[0] };
  const baseline = readBaseline();
  const report = [];
  let totalFail = 0, newFail = 0;
  const freshBaseline = {};

  for (const suite of selected) {
    let checks = [];
    try { checks = await suite.run(ctx); }
    catch (e) { checks = [{ name: `${suite.name} (스위트 실행)`, pass: false, detail: 'ERROR: ' + e.message.slice(0, 160) }]; }
    const known = new Set(baseline[suite.name] || []);
    checks.forEach(c => {
      if (!c.pass) {
        // `warn: true` = **보이되 막지 않는다.** baseline 과 다르다 —
        //   baseline 은 "추적 중인 부채" 를 파일에 적어 두는 것이라 목록에서 사라지기 쉽고
        //   `--bless` 한 번에 뜻이 지워진다. warn 은 **검사 코드 안에 분류가 박혀 있어**
        //   왜 안 막는지가 검사와 함께 읽힌다(2026-09-05 Fable: "새 부채는 차단, 옛 부채는 드러낸다").
        //   쓰는 곳: 옛 데이터 부채처럼 **지금 당장 못 고치지만 숫자가 줄어드는 걸 봐야 하는** 것.
        //   ⛔ 새로 생기는 위반에는 쓰지 말 것 — 그건 차단이어야 한다.
        if (c.warn) return;
        c.known = known.has(c.name);           // baseline 에 있으면 known(신규 아님)
        if (!c.known) newFail++;
        (freshBaseline[suite.name] = freshBaseline[suite.name] || []).push(c.name);
      }
    });
    report.push({ suite: suite.name, checks });
    totalFail += checks.filter(c => !c.pass && !c.warn).length;
  }

  if (bless) {
    // `_` 로 시작하는 최상위 키는 스위트가 아니라 **메타데이터**(상태 라벨·사유·필요값)다.
    // 이것을 보존하지 않으면 --bless 한 번에 "이 항목이 왜 baseline 에 있는가"가 통째로 사라져,
    // 다음 사람이 baseline 을 "옳다고 판정된 것"으로 오독한다(실제로는 '추적 중인 부채'다).
    // 스위트 이름은 `_` 로 시작하지 않으므로 충돌 없음.
    const preserved = Object.fromEntries(
      Object.entries(readBaseline()).filter(([k]) => k.startsWith('_'))
    );
    fs.writeFileSync(BASELINE_FILE, JSON.stringify({ ...freshBaseline, ...preserved }, null, 2) + '\n');
    console.log(`baseline 갱신: ${BASELINE_FILE} (실패 ${totalFail}건 등록)`);
    await sequelize.close().catch(() => {});
    process.exit(0);
  }

  if (wantJson) {
    console.log(JSON.stringify({ totalFail, newFail, report }, null, 2));
  } else {
    for (const { suite, checks } of report) {
      console.log(`\n── ${suite} ──`);
      for (const c of checks) {
        const mark = c.pass ? '✅' : c.warn ? '⚠' : (c.known ? '➖' : '❌');
        const tag = c.pass ? '' : c.warn ? ' (목록 · 차단 안 함)' : (c.known ? ' (baseline)' : '');
        console.log(`  ${mark} ${c.name}${tag}${c.detail ? `\n       └ ${c.detail}` : ''}`);
      }
    }
    const pass = report.reduce((n, r) => n + r.checks.filter(c => c.pass).length, 0);
    const total = report.reduce((n, r) => n + r.checks.length, 0);
    console.log(`\n=== ${pass}/${total} 통과 · 실패 ${totalFail} (신규 ${newFail}, baseline ${totalFail - newFail}) ===`);
  }
  await sequelize.close().catch(() => {});
  process.exit(newFail > 0 ? 1 : 0); // 게이트: 신규 실패만 차단(기존 baseline 부채는 통과)
}

main().catch(e => { console.error('FATAL', e.message); process.exit(2); });

#!/usr/bin/env node
/**
 * 타임존 일관성 가드 (2026-06-01) — 모든 날짜/시간 로직이 "매장 설정 타임존"
 * 기준으로 돌게 강제한다. Irene: "어떤 상황에서든 유저설정 타임존 기준."
 *
 * 잡는 위반 2종:
 *   1. [server-local today] `new Date()` + `.setHours(0,0,0,0)` / `.setHours(23,..)`
 *      = 서버 로컬 자정 기준. KL(UTC+8) 매장이면 floor-plan/통계/리포트가 어긋난다.
 *      → `getTodayBounds(restaurantTimezone)` (utils/dateTimeHelper) 를 써야 한다.
 *   2. [naive toLocale] `toLocaleString/DateString/TimeString(` 에 `timeZone` 옵션 없음.
 *      → 백엔드는 매장 tz, 프론트는 `formatDateTime/formatDate/formatTime`(utils/dateFormat) 사용.
 *
 * 사용:
 *   node scripts/timezone-check.js            # 위반 목록 + 요약 (exit 1 if any)
 *   node scripts/timezone-check.js --summary  # 카운트만
 *   ALLOW_BASELINE=1 node ...                 # 기존 baseline 은 통과, 신규만 실패(점진 적용)
 *
 * baseline: timezone-baseline.json (기존 위반 지문). 신규 위반만 fail-closed.
 */
const fs = require('fs');
const path = require('path');

const ROOTS = [
  { label: 'backend', dir: path.resolve(__dirname, '..'), exts: ['.js'], skip: ['node_modules', 'scripts/timezone-check.js', 'utils/dateTimeHelper.js', 'tests', 'migrations'] },
  { label: 'frontend', dir: path.resolve(__dirname, '../../dev-frontend/src'), exts: ['.ts', '.tsx', '.js'], skip: ['node_modules', 'utils/dateFormat', '__tests__', '.test.', '.spec.'] },
];

function walk(dir, exts, skip, out) {
  let ents = [];
  try { ents = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
  for (const e of ents) {
    const full = path.join(dir, e.name);
    if (skip.some(s => full.includes(s))) continue;
    if (e.isDirectory()) walk(full, exts, skip, out);
    else if (exts.some(x => e.name.endsWith(x))) out.push(full);
  }
}

const SETHOURS_TODAY = /\.setHours\(\s*0\s*,\s*0\s*,\s*0|\.setHours\(\s*23\s*,\s*59/;
const TOLOCALE = /\.toLocale(String|DateString|TimeString)\s*\(/;

const violations = [];
for (const root of ROOTS) {
  const files = [];
  walk(root.dir, root.exts, root.skip, files);
  for (const f of files) {
    let src; try { src = fs.readFileSync(f, 'utf8'); } catch { continue; }
    const lines = src.split('\n');
    lines.forEach((ln, i) => {
      if (SETHOURS_TODAY.test(ln)) violations.push({ kind: 'server-local-today', root: root.label, file: f.replace(/^.*\/dev-/, 'dev-'), line: i + 1, text: ln.trim().slice(0, 100) });
      if (TOLOCALE.test(ln) && !/timeZone|timezone/.test(ln)) {
        // 같은 statement 가 다음 줄로 이어지며 timeZone 을 줄 수 있으니 다음 2줄도 본다.
        const lookahead = (lines[i + 1] || '') + (lines[i + 2] || '');
        if (!/timeZone|timezone/.test(lookahead)) violations.push({ kind: 'naive-toLocale', root: root.label, file: f.replace(/^.*\/dev-/, 'dev-'), line: i + 1, text: ln.trim().slice(0, 100) });
      }
    });
  }
}

const baselineFile = path.resolve(__dirname, 'timezone-baseline.json');
let baseline = [];
try { baseline = JSON.parse(fs.readFileSync(baselineFile, 'utf8')); } catch {}
const fp = v => `${v.file}:${v.kind}`;
const baseSet = new Set(baseline);

const summary = violations.reduce((m, v) => { const k = `${v.root}/${v.kind}`; m[k] = (m[k] || 0) + 1; return m; }, {});
console.log('\n=== 타임존 일관성 가드 ===');
Object.entries(summary).forEach(([k, n]) => console.log(`  ${k}: ${n}건`));
console.log(`  합계: ${violations.length}건`);

const args = process.argv.slice(2);
if (args.includes('--bless')) {
  fs.writeFileSync(baselineFile, JSON.stringify([...new Set(violations.map(fp))], null, 0));
  console.log(`\nbaseline 등록: ${new Set(violations.map(fp)).size} 지문. 이후 신규 위반만 fail.`);
  process.exit(0);
}

const isNew = v => !baseSet.has(fp(v));
const newOnes = violations.filter(isNew);
const useBaseline = process.env.ALLOW_BASELINE === '1' || baseline.length > 0;

if (!args.includes('--summary')) {
  const show = useBaseline ? newOnes : violations;
  show.slice(0, 60).forEach(v => console.log(`  [${v.kind}] ${v.file}:${v.line}  ${v.text}`));
  if (show.length > 60) console.log(`  … 외 ${show.length - 60}건`);
}

if (useBaseline) {
  if (newOnes.length > 0) { console.log(`\n✗ 신규 타임존 위반 ${newOnes.length}건 (baseline 외). 매장TZ 헬퍼 사용 필수.`); process.exit(1); }
  console.log('\n✓ 신규 위반 0 (기존 baseline 은 점진 교체 대상).'); process.exit(0);
} else {
  console.log(`\n${violations.length === 0 ? '✓ 위반 0' : `✗ 위반 ${violations.length}건 — getTodayBounds(tz) / formatDateTime 로 교체. (--bless 로 baseline 등록 후 신규만 차단)`}`);
  process.exit(violations.length === 0 ? 0 : 1);
}

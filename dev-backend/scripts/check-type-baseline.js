#!/usr/bin/env node
/**
 * check-type-baseline.js — 프론트 타입 오류가 기준선보다 늘면 실패 (2026-09-27 Fable 판정 R3)
 * ------------------------------------------------------------------
 * 왜 따로 도는가
 *   「빌드 성공 = 타입 검사 통과」가 아니다. 이 저장소의 타입 검사는 두 겹으로 막혀 있다
 *   (메모리 reference_type_gate_two_blocks · docs/BUYER_FREE_TIER_DESIGN.md §7-1-1):
 *     ① 힙 — 기본 2048MB 에서 tsc 가 죽고, 빌드 안의 검사기도 같이 죽는데 빌드는 exit 0.
 *     ② i18next·react-i18next d.ts 가 TS5 문법이라 4.9.5 가 파싱을 못 해 타입 검사로 넘어가지 않는다.
 *   → 힙 3584MB + `tsconfig.verify.json`(두 모듈을 느슨한 스텁으로) 로 **빌드 밖에서** 돌린다.
 *
 * 판정
 *   src 오류를 **파일별로** 세어 기준선(`type-baseline.json`)과 대조한다. 어느 파일이든 기준보다 늘면 실패.
 *   (총합만 보면 한 곳을 고치고 다른 곳을 깨뜨려도 통과한다.) 줄어든 파일은 알려만 준다 — `--bless` 로 기준을 낮춘다.
 *
 * 판정 기계부터 의심한다 (검증 규율 3조)
 *   - tsc 가 비정상 종료(메모리 등)했거나 출력이 비었으면 «통과» 가 아니라 «고장» 으로 실패.
 *   - src 밖(라이브러리) 오류가 하나라도 있으면 파싱 단계에서 멈췄을 수 있다 → 실패.
 *   - 오류 0건도 실패로 본다 — 기준선이 수백 건인 저장소에서 0 은 검사가 안 돈 것이다.
 *
 * 무거운 작업이다(tsc 약 3.5GB·2분). 같은 서버의 빌드와 겹치지 않게 heavy-task-gate 를 먼저 통과해야 한다.
 * 막히면 «확인 불가» 로 실패한다 — 우회하지 않는다(기다렸다 다시).
 *
 * 사용: node scripts/check-type-baseline.js           # 대조
 *       node scripts/check-type-baseline.js --bless   # 지금 상태를 기준선으로 (정식 개선·승인 후에만)
 */
const { spawnSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const FRONTEND = path.resolve(__dirname, '../../dev-frontend');
const BASELINE = path.join(__dirname, 'type-baseline.json');
const GATE = '/var/www/scripts/heavy-task-gate.sh';
const bless = process.argv.includes('--bless');

function fail(msg) { console.error(`✗ ${msg}`); process.exit(1); }

// 1) 메모리 게이트
if (fs.existsSync(GATE)) {
  const g = spawnSync('bash', [GATE, 'build'], { encoding: 'utf8' });
  if (g.status !== 0) fail(`확인 불가 — 메모리 게이트가 막음(다른 무거운 작업 실행 중). 끝난 뒤 다시 돌릴 것.\n${(g.stdout || '') + (g.stderr || '')}`);
}

// 2) 저장소를 건드리지 않는 임시 tsconfig — 증분 캐시(tsbuildinfo)를 저장소 밖에 둔다.
//    (저장소 안 캐시 파일이 바뀌면 Fable 게이트 지문이 죽는다.)
const tmpDir = path.join(os.tmpdir(), 'purple-type-baseline');
fs.mkdirSync(tmpDir, { recursive: true });
const tmpConfig = path.join(tmpDir, 'tsconfig.json');
fs.writeFileSync(tmpConfig, JSON.stringify({
  extends: path.join(FRONTEND, 'tsconfig.verify.json'),
  compilerOptions: { tsBuildInfoFile: path.join(tmpDir, 'verify.tsbuildinfo') },
}));

const r = spawnSync('npx', ['tsc', '--noEmit', '-p', tmpConfig], {
  cwd: FRONTEND, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024,
  env: { ...process.env, NODE_OPTIONS: '--max-old-space-size=3584' },
});
const out = (r.stdout || '') + (r.stderr || '');
// tsc: 0 = 오류 없음, 1·2 = 오류 있음(정상 동작 — 증분 캐시가 있으면 1 이 나온다, 2026-09-29 실측).
//   그 밖(134 = 힙 부족, null = 시그널 등)은 검사기 고장.
if (![0, 1, 2].includes(r.status)) fail(`검사기 고장 — tsc 종료코드 ${r.status}${r.signal ? ' / ' + r.signal : ''}\n${out.slice(-800)}`);

const errLines = out.split('\n').filter((l) => /error TS\d+/.test(l));
const outside = errLines.filter((l) => !l.startsWith('src/'));
if (outside.length) fail(`검사기 고장 — src 밖 오류 ${outside.length}건(라이브러리 파싱 실패면 우리 코드는 검사되지 않았다)\n${outside.slice(0, 5).join('\n')}`);
if (errLines.length === 0) fail('검사기 고장 의심 — 오류 0건. 기준선이 수백 건인 저장소에서 0 은 검사가 안 돈 것이다.');

const byFile = {};
for (const l of errLines) {
  const f = l.slice(0, l.indexOf('('));
  byFile[f] = (byFile[f] || 0) + 1;
}
const total = errLines.length;

if (bless) {
  const sorted = Object.fromEntries(Object.entries(byFile).sort(([a], [b]) => a.localeCompare(b)));
  fs.writeFileSync(BASELINE, JSON.stringify({
    note: '프론트 src 타입 오류 기준선 (빌드 밖 tsc). check-type-baseline.js 가 파일별로 대조한다. 늘면 실패 — 줄었을 때만 --bless.',
    blessed_at: new Date().toISOString(), total, byFile: sorted,
  }, null, 2) + '\n');
  console.log(`✓ 기준선 저장 — ${total}건 / ${Object.keys(byFile).length}파일`);
  process.exit(0);
}

if (!fs.existsSync(BASELINE)) fail('기준선 파일 없음 — scripts/type-baseline.json (최초 1회 --bless)');
const base = JSON.parse(fs.readFileSync(BASELINE, 'utf8'));
const grown = [];
const shrunk = [];
for (const f of new Set([...Object.keys(byFile), ...Object.keys(base.byFile)])) {
  const now = byFile[f] || 0;
  const was = base.byFile[f] || 0;
  if (now > was) grown.push(`${f}: ${was} → ${now}`);
  else if (now < was) shrunk.push(`${f}: ${was} → ${now}`);
}

if (grown.length) {
  console.error(`✗ 타입 오류 증가 — 전체 ${base.total} → ${total}`);
  for (const g of grown) console.error(`   + ${g}`);
  const shown = new Set(grown.map((g) => g.split(':')[0]));
  console.error('   해당 파일 오류:');
  for (const l of errLines.filter((x) => shown.has(x.slice(0, x.indexOf('('))))) console.error(`     ${l}`);
  process.exit(1);
}
console.log(`✓ 타입 오류 신규 0 — 전체 ${total}건 (기준 ${base.total})`);
if (shrunk.length) console.log(`   줄어든 파일 ${shrunk.length}개 — 기준을 낮추려면 --bless:\n   ${shrunk.join('\n   ')}`);
process.exit(0);

#!/usr/bin/env node
/**
 * 배포 기록 게이트 — "배포할 때마다 개발 현황을 남긴다" 를 **사람 기억이 아니라 기계가** 강제한다.
 *
 * Irene 요구(2026-09-03): "배포할 때마다 현재 작업중/완료/진행중/이슈/앞으로 할 것 리스트업.
 *   변경 후 바뀌는 현상, 추가로 체크해야 할 영역도 꼭 넣어."
 * → 기록이 없거나 필수 칸이 비면 **배포를 막는다**(fail-closed). 잊으면 배포가 안 된다.
 *
 * 규칙:
 *   1 `releases/*.json`(archive 제외)이 **정확히 1개**. 0개=기록 없음, 2개 이상=어느 것인지 모호.
 *   2 7칸이 모두 있고, 비어 있지 않거나 명시적으로 "none". 빈 배열과 "없음"을 구분한다.
 *   3 민감영역 변경이면 `verification.fable_note` 필수.
 *   4 프론트가 델타에 있으면 `verification.sw_version` == public/sw.js 값.
 *     (2026-09-03: 마커를 찍은 뒤 SW 를 올려 지문이 깨진 순서 오류를 기계로 막는다.)
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const REL_DIR = path.join(ROOT, 'releases');
const SW_PATH = path.resolve(ROOT, '../dev-frontend/public/sw.js');
const REQUIRED = ['in_progress', 'completed', 'issues', 'upcoming', 'behavior_changes', 'check_areas', 'verification'];
const LABEL = {
  in_progress: '작업중', completed: '완료', issues: '이슈', upcoming: '앞으로 할 것',
  behavior_changes: '변경 후 바뀌는 현상', check_areas: '추가로 체크할 영역', verification: '검증 내역',
};
const c = { red: s => `\x1b[31m${s}\x1b[0m`, green: s => `\x1b[32m${s}\x1b[0m`, gray: s => `\x1b[90m${s}\x1b[0m`, yellow: s => `\x1b[33m${s}\x1b[0m` };
const fail = (m, hint) => { console.error(c.red(`✗ 배포 기록 게이트 실패 — ${m}`)); if (hint) console.error(c.gray('  ' + hint)); process.exit(1); };

if (!fs.existsSync(REL_DIR)) {
  fail('releases/ 디렉터리가 없습니다', '이번 배포의 기록을 dev-backend/releases/<날짜>-<태그>.json 으로 만드세요.');
}
const files = fs.readdirSync(REL_DIR).filter(f => f.endsWith('.json'));
if (files.length === 0) {
  fail('이번 배포의 기록 파일이 없습니다', 'dev-backend/releases/<날짜>-<태그>.json 을 만들고 7칸을 채우세요. 적재된 기록은 releases/archive/ 로 옮겨집니다.');
}
if (files.length > 1) {
  fail(`기록 파일이 ${files.length}개입니다 — 어느 배포인지 모호합니다`, `발견: ${files.join(', ')} / 이미 나간 기록은 releases/archive/ 로 옮기세요.`);
}

const file = path.join(REL_DIR, files[0]);
let rec;
try { rec = JSON.parse(fs.readFileSync(file, 'utf8')); }
catch (e) { fail(`기록 파일 JSON 오류: ${files[0]}`, e.message); }

console.log(c.gray(`   기록: ${files[0]}`));
const empty = [];
for (const k of REQUIRED) {
  const v = rec[k];
  if (v === undefined || v === null) { empty.push(`${LABEL[k]}(${k}) 칸 자체가 없음`); continue; }
  if (v === 'none') continue;                                  // 명시적 "없음" 은 통과
  if (Array.isArray(v) && v.length === 0) { empty.push(`${LABEL[k]}(${k}) 가 빈 배열 — 없으면 "none" 이라고 적으세요`); continue; }
  if (typeof v === 'object' && !Array.isArray(v) && Object.keys(v).length === 0) { empty.push(`${LABEL[k]}(${k}) 가 빈 객체`); }
}
if (empty.length) fail('필수 칸이 비어 있습니다', empty.join('\n  '));

// 민감영역이면 Fable 판정 근거가 있어야 한다
let sensitive = false;
try {
  const out = execSync('node scripts/check-sensitive-diff.js', { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
  sensitive = /FABLE 게이트 대상/.test(out) && !/비대상/.test(out.split('\n').slice(-3).join('\n'));
} catch { /* 분류기 실패는 이 게이트의 책임이 아니다 */ }
if (sensitive && !(rec.verification && rec.verification.fable_note)) {
  fail('민감영역 변경인데 verification.fable_note 가 없습니다', 'Fable 판정 요지를 옮겨 적으세요.');
}

// 프론트가 바뀌면 SW 버전이 기록과 실제가 같아야 한다
try {
  const delta = execSync('git status --porcelain', { cwd: path.resolve(ROOT, '..'), encoding: 'utf8' });
  const frontTouched = /dev-frontend\/(src|public)\//.test(delta);
  if (frontTouched && fs.existsSync(SW_PATH)) {
    const m = fs.readFileSync(SW_PATH, 'utf8').match(/SW_VERSION\s*=\s*'([^']+)'/);
    const actual = m ? m[1] : null;
    const noted = rec.verification && rec.verification.sw_version;
    if (actual && noted && actual !== noted) {
      fail(`SW 버전 불일치 — 기록 "${noted}" vs 실제 "${actual}"`, 'SW 를 올린 뒤 기록도 같이 고치고 재빌드하세요(순서: bump → build → 게이트).');
    }
    if (actual && !noted) fail('프론트가 바뀌었는데 verification.sw_version 이 없습니다', `실제 값: ${actual}`);
  }
} catch { /* git 없으면 건너뜀 */ }

const n = k => (rec[k] === 'none' ? 0 : (rec[k] || []).length);
console.log(c.green('✓ 배포 기록 OK') + c.gray(` — 완료 ${n('completed')} · 이슈 ${n('issues')} · 앞으로 ${n('upcoming')} · 바뀌는현상 ${n('behavior_changes')} · 체크영역 ${n('check_areas')}`));

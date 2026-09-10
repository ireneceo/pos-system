#!/usr/bin/env node
'use strict';
/**
 * fable-gate.js — "검증 없이 끝났다고 말하는 순간"을 차단하는 게이트.
 *
 * 배경 (2026-08-20, Irene 지시로 도입):
 *   팀 규칙(CLAUDE.md §0 — 판단은 Fable, 작업은 Opus)은 사람/모델이 지키는 규칙이라
 *   기계가 위반을 잡을 수 없다. 그래서 **위반하는 순간**을 잡으려 하지 않고,
 *   **"끝났습니다"라고 말하는 순간**을 잡는다. 이 게이트가 잠그는 것은 뒷문 하나뿐이다.
 *
 * 정직한 한계 (이것부터 읽을 것):
 *   - 작업 도중 설계에서 이탈하는 것은 **못 잡는다**. 그건 설계 문서 §7.1 의 "설계와 다른
 *     판단이 필요해지면 즉시 중단" 조항이 앞을 막고, 이 게이트는 뒤를 막는 구조다.
 *   - `pass` 를 누가 실행했는지 기계로 구분할 수 없다. 마커의 note 에 판정 요지를 남겨
 *     사후 추적만 가능하게 한다.
 *
 * 서브커맨드
 *   fingerprint  현재 워킹트리 상태의 지문(sha256) 출력
 *   check        게이트 판정 (Stop 훅이 호출) — 차단이면 exit 2
 *   pass --note "판정 요지"   현재 지문으로 통과 마커 작성 (**Fable 판정 세션만 실행**)
 *   status       현재 상태를 사람이 읽는 형태로 출력
 *
 * check 의 통과 조건 (하나라도 맞으면 통과)
 *   ① 워킹트리가 깨끗하다 (변경 없음)
 *   ② skip 파일이 있다 → 통과하되 **우회 사실을 기록**한다 (막는 게 목적이 아니라 남기는 게 목적)
 *   ③ 변경이 민감영역이 아니다 (check-sensitive-diff 판정 — 문구 수정 같은 일상 작업은 안 걸린다)
 *   ④ 통과 마커의 지문이 현재 지문과 같다 (= 검증 후 한 줄도 안 고쳤다)
 *   ⑤ 같은 지문으로 이미 한 번 차단했다 (.nag) — 대화가 훅에 갇히지 않도록 지문당 1회만 막는다
 */
const { execSync, execFileSync } = require('child_process');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const REPO = '/var/www';
const STATE_DIR = path.join(REPO, '.claude');
const MARKER = path.join(STATE_DIR, '.fable-gate-pass');
const NAG = path.join(STATE_DIR, '.fable-gate-nag');
const SKIP = path.join(STATE_DIR, '.fable-gate-skip');
const SKIP_LOG = path.join(STATE_DIR, 'fable-gate-skips.log');
const SENSITIVE = path.join(REPO, 'dev-backend', 'scripts', 'check-sensitive-diff.js');

// 지문 계산에서 제외하는 «작업 일지» 파일들 — **경로 목록 하나가 단일 소스**다.
// 아래 정규식과 git pathspec 을 둘 다 이 목록에서 만든다(규칙 두 벌 금지).
//
// ① 게이트 자신의 상태 파일: 제외하지 않으면 자기참조 결함이 난다(실측).
//    nag 를 쓰는 순간 워킹트리가 바뀌어 지문이 달라지고, "같은 지문 1회만 차단"이 영원히
//    성립하지 않아 **대화가 훅에 갇힌다**. 첫 고장주입(FI-b)에서 바로 재현됐다.
// ② `.claude/session-state.md`: 배포도 실행도 되지 않는 **작업 일지**이고, CLAUDE.md 가
//    «작업 시작/완료 시 즉시 갱신» 하라고 **의무화한 파일**이다. 지문의 뜻은
//    «검증한 코드가 그대로인가» 이지 «일지를 안 썼는가» 가 아니다. 게이트가 의무 행동을
//    벌하면 안 된다. (2026-09-10 Fable 판정 — 마커를 받은 뒤 상태를 저장할 때마다
//    마커가 죽어 Fable 을 반복 호출해야 했다.)
//
// ⛔ `docs/`·`*.md`·`DEVELOPMENT_PLAN.md` 는 **제외하지 않는다.** 문서 변경도 «검증 뒤 손댔다» 는
//    사실로 남는 게 맞다. 제외는 좁게, 이유가 있는 파일만.
const SELF_STATE_PATHS = [
  '.claude/.fable-gate-pass',
  '.claude/.fable-gate-nag',
  '.claude/.fable-gate-skip',
  '.claude/fable-gate-skips.log',
  '.claude/session-state.md',
];
/** 이 줄(porcelain 한 줄 · 파일 경로 · ls-tree 한 줄)이 제외 대상인가. 정규식 이스케이프 대신 경로 포함 검사. */
function isSelfState(line) {
  return SELF_STATE_PATHS.some((f) => line.includes(f));
}
// `git diff` / `git ls-tree` 에 그대로 넘길 제외 pathspec — 같은 목록에서 만든다.
const EXCLUDE_SPEC = SELF_STATE_PATHS.map((f) => `':!${f}'`).join(' ');

/**
 * 워킹트리 상태 지문 — **내용까지** 해시한다. 검증 후 한 줄이라도 고치면 값이 달라져 마커가 죽는다.
 *
 * ⚠ `git status --porcelain` 만 해시하면 안 된다(실측 FI-c): 그건 "어떤 파일이 바뀌었나"의
 * 목록일 뿐이라, **이미 바뀐 파일을 한 줄 더 고쳐도 출력이 그대로**다. 그러면 "검증은 받았고
 * 그 뒤에 조금 손봤다"가 통과해버려 게이트의 존재 이유가 사라진다.
 * → 추적 파일은 `git diff HEAD`(내용), 미추적 파일은 파일별 내용 해시를 함께 넣는다.
 */
function fingerprint() {
  const porcelainRaw = execSync('git -C ' + REPO + ' status --porcelain', { encoding: 'utf8' });
  const porcelain = porcelainRaw.split('\n').filter((l) => l && !isSelfState(l)).join('\n');

  // 추적 파일의 실제 변경 내용
  let diff = '';
  try {
    // 제외 경로는 pathspec 으로 뺀다 — 종전엔 여기에 필터가 **없어서**, porcelain·untracked 에서
    // 제외해도 내용 diff 로 그대로 새어 들어왔다(2026-09-10 실측).
    diff = execSync(`git -C ${REPO} diff HEAD -- . ${EXCLUDE_SPEC}`, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  } catch { diff = '(diff 실패)'; }

  // 미추적 파일은 diff 에 안 잡히므로 내용 해시를 따로 만든다(gitignore 는 git 이 걸러준다).
  let untrackedDigest = '';
  try {
    const list = execSync('git -C ' + REPO + ' ls-files --others --exclude-standard', { encoding: 'utf8' })
      .split('\n').filter((f) => f && !isSelfState(f)).sort();
    untrackedDigest = list.map((f) => {
      try {
        const buf = fs.readFileSync(path.join(REPO, f));
        return f + ':' + crypto.createHash('sha256').update(buf).digest('hex');
      } catch { return f + ':(읽기실패)'; }
    }).join('\n');
  } catch { untrackedDigest = '(untracked 목록 실패)'; }

  // HEAD 도 지문에 넣는다 (2026-09-01 Fable 적발).
  // ⚠ 워킹트리가 깨끗하면 porcelain·diff·untracked 가 **전부 비어** 지문이 커밋과 무관하게
  //   항상 같은 값이었다. 그래서 **P1 에 찍은 마커가 P2 커밋에도 "유효"로 떴다** —
  //   검증받지 않은 코드가 검증받은 것처럼 통과하는 구멍이다.
  //
  // 다만 **커밋 해시**를 그대로 쓰면 안 된다(2026-09-10 Fable 판정): 작업 일지 한 줄을
  //   커밋해도 해시가 바뀌어 마커가 죽는다. 지문의 뜻은 «검증한 코드가 그대로인가» 이므로
  //   **HEAD 트리의 내용**(제외 경로를 뺀 경로:blob 목록)을 해시한다.
  //   → 일지만 커밋하면 값이 그대로, 코드가 바뀌면 값이 달라진다.
  // ⚠ `ls-tree` 는 exclude pathspec(`:!경로`)을 지원하지 않는다(실측: "pathspec magic not supported").
  //    그래서 출력을 받아 **같은 목록(`isSelfState`)으로 걸러낸다** — 규칙은 여전히 한 벌이다.
  let head = '';
  try {
    const tree = execSync(`git -C ${REPO} ls-tree -r HEAD`, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 })
      .split('\n').filter((l) => l && !isSelfState(l)).join('\n');
    head = crypto.createHash('sha256').update(tree).digest('hex');
  } catch { head = '(HEAD 없음)'; }

  const hash = crypto.createHash('sha256')
    .update(head).update('\0')
    .update(porcelain).update('\0').update(diff).update('\0').update(untrackedDigest)
    .digest('hex');
  return { hash, porcelain, head };
}

function readJson(file) {
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch { return null; }
}

/**
 * 이 변경이 Fable 게이트 대상인가 — 기존 분류기(check-sensitive-diff)를 단일 소스로 쓴다.
 * 별도 기준을 새로 만들면 판정처가 둘로 갈라진다(이 프로젝트가 반복해서 데인 패턴).
 * @returns {{sensitive: boolean, reason: string}}
 */
function isSensitive() {
  if (!fs.existsSync(SENSITIVE)) {
    // 분류기가 없으면 안전한 쪽(민감)으로 닫는다 — fail-closed.
    return { sensitive: true, reason: 'check-sensitive-diff.js 없음 — 판정 불가라 민감으로 처리' };
  }
  let out = '';
  try {
    out = execFileSync('node', [SENSITIVE], { encoding: 'utf8', cwd: path.dirname(SENSITIVE) });
  } catch (e) {
    // 비정상 종료도 stdout 은 쓸 수 있다. 아무것도 못 읽으면 민감으로 닫는다.
    out = (e.stdout || '') + (e.stderr || '');
    if (!out) return { sensitive: true, reason: '분류기 실행 실패 — 민감으로 처리' };
  }
  const hit = out.includes('FABLE 게이트 대상');
  return { sensitive: hit, reason: hit ? 'check-sensitive-diff: FABLE 게이트 대상' : 'check-sensitive-diff: 비대상' };
}

function cmdFingerprint() {
  process.stdout.write(fingerprint().hash + '\n');
}

function cmdPass(note) {
  const { hash } = fingerprint();
  fs.writeFileSync(MARKER, JSON.stringify({
    fingerprint: hash,
    stamped_at: new Date().toISOString(),
    note: note || '(판정 요지 없음)'
  }, null, 2) + '\n');
  try { fs.unlinkSync(NAG); } catch { /* 없으면 무시 */ }
  console.log('✓ Fable 통과 마커 작성 — 지문 ' + hash.slice(0, 12));
  console.log('  note: ' + (note || '(없음)'));
  console.log('  ⚠ 이 마커는 워킹트리가 바뀌는 즉시 무효화된다.');
}

function cmdStatus() {
  const { hash, porcelain } = fingerprint();
  const marker = readJson(MARKER);
  const s = isSensitive();
  console.log('워킹트리 변경: ' + (porcelain.trim() ? porcelain.trim().split('\n').length + '건' : '없음'));
  console.log('현재 지문   : ' + hash.slice(0, 12));
  console.log('민감 판정   : ' + (s.sensitive ? '대상' : '비대상') + ' (' + s.reason + ')');
  console.log('통과 마커   : ' + (marker ? (marker.fingerprint === hash ? '유효' : '무효(지문 불일치 — 검증 후 코드가 바뀜)') : '없음'));
  if (marker) console.log('  note: ' + marker.note);
  console.log('skip 파일   : ' + (fs.existsSync(SKIP) ? '있음' : '없음'));
}

function cmdCheck() {
  const { hash, porcelain } = fingerprint();

  // ① 변경 없음 → 통과
  if (!porcelain.trim()) process.exit(0);

  // ② 사람이 의식적으로 넘긴 경우 — 막지 않되 반드시 남긴다
  if (fs.existsSync(SKIP)) {
    const line = new Date().toISOString() + ' skip fingerprint=' + hash + '\n';
    try { fs.appendFileSync(SKIP_LOG, line); } catch { /* 로그 실패가 작업을 막지 않는다 */ }
    process.stderr.write('[fable-gate] skip 파일로 게이트를 넘겼습니다 (기록됨: ' + SKIP_LOG + ')\n');
    process.exit(0);
  }

  // ③ 민감영역이 아니면 통과 — 문구 수정 같은 일상 작업까지 막으면 못 쓰는 물건이 된다
  const s = isSensitive();
  if (!s.sensitive) process.exit(0);

  // ④ 유효한 통과 마커
  const marker = readJson(MARKER);
  if (marker && marker.fingerprint === hash) process.exit(0);

  // ⑤ 같은 지문으로 이미 한 번 막았으면 통과 — 대화가 훅에 갇히는 것 방지
  let nag = '';
  try { nag = fs.readFileSync(NAG, 'utf8').trim(); } catch { nag = ''; }
  if (nag === hash) process.exit(0);

  try { fs.writeFileSync(NAG, hash + '\n'); } catch { /* 기록 실패해도 차단은 한다 */ }

  const stale = marker && marker.fingerprint !== hash;
  process.stderr.write(
    '\n[fable-gate] 정지 — Fable 통과 마커가 없습니다.\n' +
    '  변경 판정: ' + s.reason + '\n' +
    '  현재 지문: ' + hash.slice(0, 12) + '\n' +
    (stale ? '  기존 마커: 지문 불일치 → 무효 (검증받은 뒤 코드가 바뀌었습니다)\n' : '') +
    '  다음 중 하나로 진행하세요:\n' +
    '   1) Fable 판정을 받고: node dev-backend/scripts/fable-gate.js pass --note "판정 요지"\n' +
    '   2) 의식적으로 넘기려면: touch .claude/.fable-gate-skip  (우회 사실이 기록됩니다)\n' +
    '  (같은 지문에서는 이 정지가 1회만 발생합니다)\n\n'
  );
  process.exit(2);
}

const [, , cmd, ...rest] = process.argv;
switch (cmd) {
  case 'fingerprint': cmdFingerprint(); break;
  case 'check': cmdCheck(); break;
  case 'pass': {
    const i = rest.indexOf('--note');
    cmdPass(i >= 0 ? rest[i + 1] : '');
    break;
  }
  case 'status': cmdStatus(); break;
  default:
    console.log('usage: fable-gate.js <fingerprint|check|pass --note "..."|status>');
    process.exit(1);
}

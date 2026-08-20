#!/usr/bin/env node
/**
 * check-dead-handlers.js — "죽은 핸들러" 게이트 (2026-08-19 신설)
 * ==========================================================================
 * 왜 필요한가 (실제 운영 사고):
 *   with MIN Cafe #260819-010 에서 Live Orders 의 **Confirm Payment 버튼이 완전히 죽어 있었다**.
 *   원인은 `handleVerifyConfirm` 첫 줄의 `setAudioEnabled(false)` — 2026-06-05 알림음 단일화
 *   (a8272d06)에서 `audioEnabled` 가 useState → 파생 const 로 바뀌며 setter 는 사라졌는데
 *   호출만 남았다. 클릭 즉시 ReferenceError → **요청이 아예 전송되지 않음**. 2.5개월간 무증상.
 *
 *   왜 안 잡혔나: 이 프로젝트의 타입검사가 사실상 작동하지 않는다. typescript 4.9.5 인데
 *   node_modules/i18next 의 .d.ts 가 TS5 문법(const type parameter)을 써서 파서가 먼저 터지고,
 *   CRA 는 그 뒤 타입오류를 **warning 으로만** 내보낸다(빌드는 통과). 즉 TS2304(Cannot find name)
 *   가 게이트 역할을 못 한다. → 이 스캐너가 그 구멍을 가장 위험한 부분만 좁게 막는다.
 *
 * 무엇을 잡는가:
 *   파일 안에서 **선언되지 않은 `setXxx(` 호출**(React setter 관례). DOM/전역(setTimeout,
 *   setAttribute, setDate …)은 화이트리스트로 제외. 오탐이 나오면 화이트리스트에 추가할 것.
 *
 * 사용:
 *   node scripts/check-dead-handlers.js            # 위반 있으면 exit 1 (fail-closed)
 *   node scripts/check-dead-handlers.js --summary  # 요약만
 */
const fs = require('fs');
const path = require('path');

const FRONTEND_SRC = path.resolve(__dirname, '../../dev-frontend/src');

// DOM / 표준 전역 / 라이브러리 인스턴스 메서드 — setter 관례와 이름만 겹치는 것들
const ALLOW = new Set([
  'setTimeout', 'setInterval', 'setImmediate', 'setState',
  'setAttribute', 'setAttributeNS', 'setProperty', 'setItem', 'setRequestHeader',
  'setSelectionRange', 'setCustomValidity', 'setData', 'setDragImage', 'setPointerCapture',
  'setDate', 'setMonth', 'setFullYear', 'setYear', 'setHours', 'setMinutes', 'setSeconds',
  'setMilliseconds', 'setTime', 'setUTCHours', 'setUTCDate', 'setUTCMonth', 'setUTCFullYear',
  'setLineDash', 'setTransform', 'setPrototypeOf', 'setValueAtTime', 'setTargetAtTime',
]);

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.(ts|tsx)$/.test(e.name)) out.push(p);
  }
  return out;
}

// 파일 안에 그 식별자가 "쓸 수 있는 형태"로 존재하는지(선언/구조분해/prop/타입/import)
function isDeclared(src, name) {
  const n = name.replace(/[$]/g, '\\$');
  return (
    new RegExp(`(?:const|let|var|function)\\s+${n}\\b`).test(src) ||      // const setX = / function setX
    new RegExp(`,\\s*${n}\\s*\\]`).test(src) ||                          // const [x, setX] = useState
    new RegExp(`\\b${n}\\s*\\??\\s*:`).test(src) ||                       // props 타입/객체 키
    // 2026-08-20 (Fable 게이트 지적 #1): 예전엔 여기가 `\\{[^{}]*name[^{}]*\\}` 였는데, **죽은 호출 자신이
    // 자기를 가려버렸다** — `onClick={() => setGhost(true)}` 는 JSX 중괄호가, 중괄호 없는 짧은 함수 몸통
    // `() => { setGhost(true); }` 는 그 몸통 자체가 매치되어 "선언됨"으로 통과했다(Fable 이 레플리카로 실증).
    // 사고 클래스의 상당수(인라인 핸들러)가 그대로 새던 구멍이라 **선언 문맥 3종으로 한정**한다.
    new RegExp(`import\\s*(?:type\\s*)?\\{[^}]*\\b${n}\\b[^}]*\\}`).test(src) ||          // import { setX }
    new RegExp(`(?:const|let|var)\\s*\\{[^}]*\\b${n}\\b[^}]*\\}\\s*=`).test(src) ||       // const { setX } = ...
    new RegExp(`\\(\\s*\\{[^}]*\\b${n}\\b[^}]*\\}`).test(src)                          // ({ setX }) => 파라미터 구조분해
  );
}

const files = walk(FRONTEND_SRC);
const violations = [];
for (const f of files) {
  const src = fs.readFileSync(f, 'utf8');
  // 앞에 `.` 이나 단어문자가 없는 setXxx( 호출만 (obj.setX() 는 메서드라 제외)
  const called = new Set((src.match(/(?<![.\w])set[A-Z]\w*\s*\(/g) || []).map((m) => m.replace(/\s*\($/, '').trim()));
  for (const name of called) {
    if (ALLOW.has(name)) continue;
    if (isDeclared(src, name)) continue;
    // 줄 번호 (주석 줄은 제외 — 사고 기록용 주석에 이름이 남을 수 있다)
    const lines = src.split('\n');
    const hits = [];
    lines.forEach((ln, i) => {
      const t = ln.trim();
      if (t.startsWith('//') || t.startsWith('*') || t.startsWith('/*')) return;
      if (new RegExp(`(?<![.\\w])${name}\\s*\\(`).test(ln)) hits.push(i + 1);
    });
    if (hits.length) violations.push({ file: path.relative(path.resolve(__dirname, '../..'), f), name, lines: hits });
  }
}

const summary = process.argv.includes('--summary');
console.log('🧟 DEAD HANDLER GUARD — 선언되지 않은 setter 호출(클릭 즉시 ReferenceError) 검사');
console.log(`   대상: dev-frontend/src ${files.length}개 파일`);
if (violations.length === 0) {
  console.log('✓ 위반 0 — 죽은 핸들러 없음');
  process.exit(0);
}
for (const v of violations) {
  console.log(`  ✗ ${v.file}:${v.lines.join(',')} → ${v.name}() 선언 없음 = 클릭 시 ReferenceError`);
}
if (!summary) {
  console.log('\n   이 호출은 런타임에 즉시 터지고 그 뒤 로직이 전부 실행되지 않는다(버튼이 "안 눌림").');
  console.log('   → 오탐이면 ALLOW 화이트리스트에 추가, 진짜면 삭제하거나 올바른 setter 로 교체할 것.');
}
console.log(`\n✗ 위반 ${violations.length}건`);
process.exit(1);

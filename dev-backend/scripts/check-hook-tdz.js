#!/usr/bin/env node
/**
 * check-hook-tdz.js — "훅 안에서 나중에 선언된 값을 쓴다" 게이트 (2026-09-17 신설)
 * ==========================================================================
 * 왜 필요한가 (실제 운영 사고 · 이 스크립트를 만든 이유):
 *   2026-09-17 운영 `/pos/purchase-orders` 가 통째로 죽었다.
 *   `ReferenceError: Cannot access 'mn' before initialization`.
 *   원인은 `NewPurchaseOrderPage.tsx` 에서
 *       const groups = useMemo(() => { ... computeDeliveryFee(..., { orderCurrency: cartCurrency }) ... }, [cart]);
 *       const cartCurrency = useMemo(() => { ... }, [cart]);      // ← 아래에 선언
 *   `cartCurrency` 가 `groups` **아래**에 있었다.
 *
 *   왜 다른 게이트가 다 통과했나:
 *     · 빌드 통과 — TDZ 는 정적 분석으로 안 잡힌다(이 저장소는 타입검사도 사실상 죽어 있다).
 *     · 실브라우저 mount sweep 통과 — **장바구니가 비어 있으면 그 `.map` 콜백이 실행되지 않는다.**
 *       화면을 열어만 보는 검사로는 영원히 못 잡는다. 품목을 담는 순간 터진다.
 *   그래서 «열어보기» 가 아니라 «소스에서 순서» 를 보는 이 스캐너가 필요하다.
 *
 * 무엇을 잡는가 (좁게):
 *   같은 파일에서 `const A = useMemo|useCallback(...)` 의 **본문**이, 그 뒤에 선언된
 *   `const B = useMemo|useCallback|useState...` 의 이름 B 를 참조하는 경우.
 *   · 함수 선언(`function f(){}`)·훅이 아닌 값은 보지 않는다(호이스팅·오탐 회피).
 *   · 의존성 배열은 본문에서 제외하고 본다(배열에만 있는 건 TDZ 가 아니다 — 평가 시점이 다르다).
 *
 * ⚠ 이 검사가 잡으면 «선언을 위로 올려라» 가 답이다. 예외 처리로 덮지 말 것 —
 *    화면이 조건부로만 죽어서 한참 뒤에 매장에서 터진다.
 *
 * 사용:
 *   node scripts/check-hook-tdz.js            # 위반 있으면 exit 1 (fail-closed)
 *   node scripts/check-hook-tdz.js --summary
 */
const fs = require('fs');
const path = require('path');

const FRONTEND_SRC = path.resolve(__dirname, '../../dev-frontend/src');
// ⚠ **useMemo 만** 본다. useMemo 본문은 «그리는 도중» 즉시 실행되므로 아래에 선언된 const 를
//    참조하면 그 순간 TDZ 다. useCallback 본문은 나중(클릭·fetch 뒤)에 실행되므로 같은 모양이어도
//    안전하다 — 넣으면 오탐이 쏟아지고, 오탐이 쌓이면 게이트를 아무도 안 본다.
const HOOKS = ['useMemo'];
const DECL_HOOKS = ['useMemo', 'useCallback', 'useState', 'useRef', 'useContext'];

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (e.name !== 'node_modules') walk(p, out); }
    else if (/\.(tsx|ts|jsx|js)$/.test(e.name) && !/\.(test|spec)\./.test(e.name)) out.push(p);
  }
  return out;
}

/** `const NAME = useX(` 선언들을 순서대로 뽑는다 */
function declarations(src) {
  const out = [];
  const re = new RegExp(`\\bconst\\s+([A-Za-z_$][\\w$]*)\\s*=\\s*(?:React\\.)?(${DECL_HOOKS.join('|')})\\s*[(<]`, 'g');
  let m;
  while ((m = re.exec(src))) out.push({ name: m[1], hook: m[2], index: m.index });
  return out;
}

/** hookStart 위치에서 시작하는 훅 호출의 본문 범위 [start, end) — 괄호 균형으로 찾는다 */
function callRange(src, fromIndex) {
  const open = src.indexOf('(', fromIndex);
  if (open < 0) return null;
  let depth = 0;
  for (let i = open; i < src.length; i++) {
    const ch = src[i];
    if (ch === '(') depth++;
    else if (ch === ')') { depth--; if (depth === 0) return [open + 1, i]; }
  }
  return null;
}

/**
 * 주석을 지운다 — 주석에 적힌 이름 때문에 잡으면 게이트가 «양치기 소년»이 된다
 * (실측: buyerEntity 주석의 `fetchMine` 이 오탐으로 잡혔다).
 */
function stripComments(code) {
  return code
    .replace(/\/\*[\s\S]*?\*\//g, ' ')
    .replace(/(^|[^:\\])\/\/[^\n]*/g, '$1 ');
}

/** 본문에서 의존성 배열(마지막 `, [ ... ]`)을 떼어낸다 */
function stripDeps(body) {
  const lastComma = body.lastIndexOf('[');
  if (lastComma < 0) return body;
  const tail = body.slice(lastComma);
  if (/^\[[^[\]]*\]\s*$/.test(tail)) return body.slice(0, lastComma);
  return body;
}

function scan(file) {
  const src = fs.readFileSync(file, 'utf-8');
  if (!HOOKS.some(h => src.includes(h))) return [];
  const decls = declarations(src);
  if (decls.length < 2) return [];
  const violations = [];

  for (let i = 0; i < decls.length; i++) {
    const d = decls[i];
    if (!HOOKS.includes(d.hook)) continue;
    const range = callRange(src, d.index);
    if (!range) continue;
    const body = stripDeps(stripComments(src.slice(range[0], range[1])));
    // 이 선언보다 **뒤에** 선언된 이름만 본다
    for (const later of decls.slice(i + 1)) {
      if (later.name === d.name) continue;
      const used = new RegExp(`(?<![\\w$.'"\`])${later.name}(?![\\w$])`).test(body);
      if (!used) continue;
      // 본문 안에서 같은 이름을 **새로 만들었으면** 바깥 것을 가리는 것이라 TDZ 가 아니다
      //   (실측: 보고서 화면들이 useMemo 안에 지역 `const hourlyData = {}` 를 두고 있다).
      const shadowed = new RegExp(`\\b(?:const|let|var|function)\\s+${later.name}\\b`).test(body)
        || new RegExp(`\\(\\s*${later.name}\\s*(?:[,)])`).test(body);
      if (shadowed) continue;
      const line = src.slice(0, d.index).split('\n').length;
      const laterLine = src.slice(0, later.index).split('\n').length;
      violations.push({
        file: path.relative(path.resolve(__dirname, '../..'), file),
        line, name: d.name, uses: later.name, declaredAt: laterLine
      });
    }
  }
  return violations;
}

function main() {
  const summary = process.argv.includes('--summary');
  const files = walk(FRONTEND_SRC);
  const all = [];
  for (const f of files) all.push(...scan(f));

  if (!all.length) {
    console.log(`✓ 훅 TDZ 없음 — ${files.length}개 파일에서 «나중에 선언된 값을 먼저 쓰는» 훅 0건`);
    process.exit(0);
  }
  console.log(`✗ 훅 TDZ ${all.length}건 — 화면이 «조건이 맞는 순간» 통째로 죽습니다`);
  if (!summary) {
    for (const v of all) {
      console.log(`  ${v.file}:${v.line}  const ${v.name} = useMemo/useCallback(...) 안에서 «${v.uses}» 를 쓰는데`);
      console.log(`      «${v.uses}» 는 ${v.declaredAt}번째 줄에서 선언됩니다 → 선언을 위로 올리세요`);
    }
  }
  process.exit(1);
}

main();

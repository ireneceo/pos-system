#!/usr/bin/env node
/**
 * 🌐 I18N HARDCODED GUARD — 소스에 박힌 한글을 잡는다
 * ------------------------------------------------------------------
 * 왜 필요한가 (2026-09-03 실측): `npm run i18n:verify` 는 **번역 파일만** 본다
 * (키 동기화·빈값·보간·용어집). 그래서 `t()` 가 **0개**인 전면 한글 페이지
 * (DeployRecordsPage)가 i18n 게이트를 그대로 통과했다. 게이트가 없던 게 원인이지
 * 사람이 게을렀던 게 아니다 — design-guard / print-guard 와 같은 방식으로 막는다.
 *
 * 위반으로 세는 것:
 *   jsx-text   — JSX 텍스트 노드의 한글            <div>저장</div>
 *   jsx-attr   — 사용자가 보는 속성의 한글          title/placeholder/aria-label/label/alt
 *   ui-message  — 사용자에게 띄우는 문자열의 한글    alert/confirm/toast/setError/message
 *
 * 위반이 **아닌** 것 (중요):
 *   t('키', '한글')  — 두 번째 인자는 **폴백**이고 번역이 실제로 동작한다.
 *                      그래서 검사 전에 `t(...)` 호출 인자를 통째로 지운다.
 *   주석 · console.* · import · 테스트 · 번역 파일 · 데이터/용어집
 *
 * baseline: 파일별 위반 수. **증가 또는 baseline 에 없는 파일의 위반>0 = 실패.**
 * 기존 부채(2026-09-03 기준 고객대면 26·내부 53파일)는 더 늘지 못하게만 막고,
 * 지우는 것은 배치로 한다(결제·예약 화면 우선 — Irene 승인).
 *
 *   node scripts/check-i18n-hardcoded.js            # 검사 — 신규 위반 시 exit 1
 *   node scripts/check-i18n-hardcoded.js --bless    # 현재 상태를 baseline 으로 등록
 *   node scripts/check-i18n-hardcoded.js --file <경로>   # 한 파일의 위반 전부 출력
 */
const fs = require('fs');
const path = require('path');

const SRC = path.resolve(__dirname, '../../dev-frontend/src');
const BASELINE = path.join(__dirname, 'i18n-hardcoded.baseline.json');

// 면제 — 이유가 분명한 것만. 늘릴 때는 반드시 이유를 여기 적는다.
const EXEMPT = [
  // 크래시한 React 트리 **밖**에서 그려진다. 컨텍스트·i18n 이 이미 죽었을 수 있어
  // 문구를 하드코딩한 것이 의도다(2026-09-03 Fable 판정).
  'components/Common/CrashReportBox.tsx',
  // 크래시 화면에서 만드는 **문의 본문**이다. 읽는 사람은 우리(시스템 관리자)이고,
  // 이 모듈도 i18n 이 죽었을 수 있는 경로에서 돈다. CrashReportBox 와 한 세트.
  'utils/reportIssue.ts',
];
const SKIP_DIR = ['node_modules', '__tests__', '.test.', '.spec.', '/locales/'];
// 화면에 보이는 속성만. (name/id/key/className 등은 사용자가 안 본다)
const VISIBLE_ATTR = /^(title|placeholder|aria-label|alt|label|tooltip|emptyText|confirmText|cancelText)$/;
const UI_CALL = /\b(alert|confirm|setError|setFormError|setMessage|toast(?:\.\w+)?)\s*\(/;

const c = { red:s=>`\x1b[31m${s}\x1b[0m`, green:s=>`\x1b[32m${s}\x1b[0m`,
            gray:s=>`\x1b[90m${s}\x1b[0m`, yellow:s=>`\x1b[33m${s}\x1b[0m` };
const HANGUL = /[가-힣]/;

/** 주석·console·import 를 지운다. 줄 수는 보존해 위치가 어긋나지 않게 한다. */
function stripNoise(src) {
  // 블록주석은 공백으로(줄 수 보존), **줄 끝 주석도** 지운다.
  // 줄 끝 주석을 안 지우면 `setQty(max); // 기본 = 전량` 같은 개발자 메모가
  // 사용자 문구로 잡혀 숫자가 부풀려진다(2026-09-03 실측에서 실제로 그랬다).
  return src
    .replace(/\/\*[\s\S]*?\*\//g, m => m.replace(/[^\n]/g, ' '))
    .split('\n')
    .map((l) => {
      if (/^\s*(\/\/|\*)/.test(l) || /^\s*import\s/.test(l) || /console\.\w+\(/.test(l)) return '';
      return stripTrailingComment(l);
    })
    .join('\n');
}

/** 문자열 안의 `//` 는 주석이 아니므로(예: 'https://…') 따옴표 밖일 때만 자른다. */
function stripTrailingComment(line) {
  let q = null;
  for (let i = 0; i < line.length - 1; i++) {
    const ch = line[i];
    if (q) { if (ch === '\\') i++; else if (ch === q) q = null; continue; }
    if (ch === "'" || ch === '"' || ch === '`') { q = ch; continue; }
    if (ch === '/' && line[i + 1] === '/') return line.slice(0, i);
  }
  return line;
}

/**
 * `t(...)` 호출을 통째로 지운다 — 괄호 깊이를 세어 중첩 호출도 정확히 제거한다.
 * 이걸 안 하면 `t('nav.contactSupport', '문의하기')` 의 폴백이 위반으로 잡혀,
 * **번역이 정상 동작하는 코드를 고치라고 요구하는** 잘못된 게이트가 된다.
 */
function stripTCalls(src) {
  const out = src.split('');
  const re = /(?<![\w.$])t\s*\(/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    let i = m.index + m[0].length, depth = 1, q = null;
    while (i < src.length && depth > 0) {
      const ch = src[i];
      if (q) { if (ch === '\\') i++; else if (ch === q) q = null; }
      else if (ch === "'" || ch === '"' || ch === '`') q = ch;
      else if (ch === '(') depth++;
      else if (ch === ')') depth--;
      i++;
    }
    for (let k = m.index; k < i; k++) if (out[k] !== '\n') out[k] = ' ';
  }
  return out.join('');
}

let exemptLines = 0;

function scan(file) {
  const rel = path.relative(SRC, file).replace(/\\/g, '/');
  if (EXEMPT.includes(rel)) return null;
  const code = stripTCalls(stripNoise(fs.readFileSync(file, 'utf8')));
  const hits = [];
  const rawLines = fs.readFileSync(file, 'utf8').split('\n');
  code.split('\n').forEach((line, idx) => {
    if (!HANGUL.test(line)) return;
    // 줄 단위 예외 — 화면 문구가 아니라 **데이터**인 한글(매칭 키워드, 언어 이름 등).
    // 이유를 함께 적게 해서 "일단 끄기" 를 막는다:  /* i18n-ok: 왜 번역하면 안 되는가 */
    const okMark = /\/\*\s*i18n-ok\s*(:?)([^*]*)\*\//.exec(rawLines[idx] || '');
    if (okMark) {
      // 이유 없는 예외는 예외가 아니다 — 잡아서 실패시킨다.
      if (okMark[1] === ':' && okMark[2].trim().length >= 4) { exemptLines++; return; }
      hits.push({ n: idx + 1, kind: 'i18n-ok-no-reason', text: '이유 없는 i18n-ok — /* i18n-ok: 왜 번역하면 안 되는가 */' });
      return;
    }
    const n = idx + 1;
    // 규칙: **한글이 든 문자열 리터럴은 전부 위반**으로 본다.
    // 좁게(속성·JSX 텍스트만) 잡았더니 82파일 중 1개만 걸렸다 — 실제 문구는
    // 설정 객체(`label: '완료'`)나 프로젝트 헬퍼(`offlineNotice('오프라인 저장됨', …)`)
    // 안에 있었다. 화면에 나갈 수 있는 문자열은 다 잡고, 예외는 EXEMPT 로 관리한다.
    let mm;
    const lit = /(['"`])((?:[^'"`\\\n]|\\.)*[가-힣](?:[^'"`\\\n]|\\.)*)\1/g;
    while ((mm = lit.exec(line)) !== null) {
      hits.push({ n, kind: 'string', text: mm[2].trim().slice(0, 60) });
    }
    // JSX 텍스트 노드 — 따옴표가 없어 위 규칙에 안 걸린다
    const jsx = />\s*([^<>{}\n]*[가-힣][^<>{}\n]*)</g;
    while ((mm = jsx.exec(line)) !== null) {
      hits.push({ n, kind: 'jsx-text', text: mm[1].trim().slice(0, 60) });
    }
  });
  // 같은 줄 중복 제거
  const seen = new Set();
  const uniq = hits.filter(h => { const k = `${h.n}|${h.kind}|${h.text}`; if (seen.has(k)) return false; seen.add(k); return true; });
  return uniq.length ? { rel, hits: uniq } : null;
}

function walk(dir, out) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (SKIP_DIR.some(s => p.includes(s))) continue;
    if (e.isDirectory()) walk(p, out);
    else if (/\.tsx?$/.test(p)) { const r = scan(p); if (r) out.push(r); }
  }
}

const args = process.argv.slice(2);
const results = [];
walk(SRC, results);
results.sort((a, b) => b.hits.length - a.hits.length);

const one = args.indexOf('--file');
if (one >= 0) {
  const want = args[one + 1];
  const f = results.find(r => r.rel.includes(want));
  if (!f) { console.log(c.green(`✓ ${want} — 위반 0`)); process.exit(0); }
  console.log(c.yellow(`${f.rel} — ${f.hits.length}건`));
  f.hits.forEach(h => console.log(`  ${String(h.n).padStart(5)}: [${h.kind}] ${h.text}`));
  process.exit(0);
}

const current = Object.fromEntries(results.map(r => [r.rel, r.hits.length]));

if (args.includes('--bless')) {
  fs.writeFileSync(BASELINE, JSON.stringify({ blessed_at: new Date().toISOString(), counts: current }, null, 2) + '\n');
  const total = Object.values(current).reduce((a, b) => a + b, 0);
  console.log(c.green(`✓ baseline 등록 — ${Object.keys(current).length}파일 / ${total}건`));
  console.log(c.gray(`  ${BASELINE}`));
  process.exit(0);
}

let base = {};
if (fs.existsSync(BASELINE)) base = JSON.parse(fs.readFileSync(BASELINE, 'utf8')).counts || {};
else { console.error(c.red('✗ baseline 이 없습니다 — 먼저 --bless 로 등록하세요.')); process.exit(1); }

const grown = [], fresh = [];
for (const [rel, n] of Object.entries(current)) {
  if (!(rel in base)) fresh.push({ rel, n });
  else if (n > base[rel]) grown.push({ rel, n, was: base[rel] });
}

console.log(c.gray(`   대상 ${Object.keys(current).length}파일 / baseline ${Object.keys(base).length}파일 / i18n-ok 예외 ${exemptLines}건`));
if (!grown.length && !fresh.length) {
  const total = Object.values(current).reduce((a, b) => a + b, 0);
  console.log(c.green(`✓ 신규 하드코딩 0 — 기존 부채 ${total}건은 배치로 정리 중`));
  console.log(c.gray(`   i18n-ok 예외 ${exemptLines}건 (조용히 늘어나지 않게 항상 표시)`));
  process.exit(0);
}
console.log(c.red(`✗ 소스 하드코딩 신규 위반 (${fresh.length + grown.length}파일)`));
fresh.forEach(f => {
  console.log(c.red(`  [신규 파일] ${f.rel} — ${f.n}건`));
  results.find(r => r.rel === f.rel).hits.slice(0, 5).forEach(h => console.log(c.gray(`      ${h.n}: [${h.kind}] ${h.text}`)));
});
grown.forEach(g => console.log(c.red(`  [증가] ${g.rel} — ${g.was} → ${g.n}건`)));
console.log(c.yellow(`\n  → 화면 문구는 t('네임스페이스:키') 로. 4개 언어 파일에 키를 넣으세요.`));
console.log(c.gray(`  → t('키','한글폴백') 형태는 위반이 아닙니다(번역이 동작함).`));
console.log(c.gray(`  → 정식 정리 후 새 기준: node scripts/check-i18n-hardcoded.js --bless`));
process.exit(1);

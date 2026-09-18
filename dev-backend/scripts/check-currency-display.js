#!/usr/bin/env node
/**
 * 통화 표기 가드 — 규칙은 **둘**이다 (2026-09-18 Irene 지시로 확정)
 *
 *   ㉠ 실제 금액이 찍히는 자리      → 기호 RM     «Amount RM 220.00» · «Total (RM) | 123.00» · «Monthly Fee (RM)»
 *   ㉡ 어느 통화인지 안내하는 자리  → 코드 MYR    «payment methods for MYR yet» · «Currency mismatch: buyer uses MYR»
 *                                                 · 매장 상세 Currency 칸 · 통화 선택 목록 · «Refer customers in MYR, USD»
 *
 * Irene 원문:
 *   2026-09-17 «MYR을 안써. 다 RM으로 표시해. 파악 좀 제대로 해.» / «MYR 안쓴다니까. RM이라고»
 *   2026-09-18 «일단 이메일료. myr이 표시되어서 나와. 링깃은 모두 RM표시가 되어야 해»
 *              «모든 곳 찾아서 제대로 반영해. 통화는 제대로 통일해야 해»
 *              «통화를 안내할 때는 MYP, 실제 금액 표시는 RM»   ← 「MYP」는 없는 코드라 MYR 로 읽음
 *
 * 🔴 이 가드가 실제로 고장났던 방식 — 같은 구멍을 다시 파지 말 것:
 *   ① (2026-09-18) 제외 규칙의 `^\s*(const|let)` 가 `const amount = `${invoice.currency} …`` 을 건너뛰었다.
 *      그 한 줄이 Irene 이 받은 「New Invoice · MYR 220.00」 메일이고, 가드는 그때 「✅ 0건」이라 답했다.
 *      → 선언문이라고 건너뛰지 않는다. 제외는 import/type/interface 만.
 *   ② (2026-09-18) 「어느 통화인지 가리키는 문구는 코드가 정확하다」는 **문구 기반 예외**를 넣었다가,
 *      그 예외가 «Monthly Fee (MYR)» 처럼 금액에 붙은 것까지 통과시켰다.
 *      → 문구로 가르지 않는다. **숫자가 붙는가(금액 인접)** 로만 가른다. 기계가 같은 답을 내야 한다.
 *   ③ (2026-09-18) `fmtMoney(amount, currency)` 는 `const cur = currency||'MYR'` 로 받아
 *      **다음 줄에서** `${cur} ${n.toFixed(2)}` 를 찍는다. 한 줄만 보는 검사로는 안 잡힌다.
 *      → 파일 단위로 「금액에 붙어 쓰이는 축약 변수」를 찾아 그 **정의부**를 검사한다.
 *
 * 판정: 금액 인접 + 통화 코드 원형 → 위반(㉠ 위배) / 금액 없음 + 기호 감싸기 → 위반(㉡ 위배)
 */
const fs = require('fs');
const path = require('path');

const FRONT = '/var/www/dev-frontend/src';
const LOCALES = '/var/www/dev-frontend/public/locales';
const BACK = path.join(__dirname, '..');

// 이 파일들의 `currency` 변수는 **정의부에서 이미 기호**다 (getCurrencySymbol 로 담거나 'RM' 기본값).
// 새로 넣을 때는 정의부를 눈으로 확인하고 적는다 — 추측 금지.
const ALLOW_SYMBOL_VARS = new Set([
  'pages/POSTerminal/POSTerminalPage.tsx',              // 1837 setCurrency(getCurrencySymbol(...))
  'pages/BrandGeneral/BrandFranchiseMapPage.tsx',       // 579
  'pages/FoodcourtGeneral/FoodcourtFloorPlanPage.tsx',  // 652
  'pages/FoodcourtGeneral/FoodcourtTenancyMapPage.tsx', // 703
]);

// 🔒 인쇄 보호파일(CLAUDE.md) 안의 표시 자리 — Irene 명시 승인 없이는 손대지 않는다.
// 숨기지 않고 «보류»로 매번 찍어 잊히지 않게 한다. 승인 후 고치면 이 줄을 지운다.
// 2026-09-18: `orders-crud.js` 주문 활동기록 1줄은 Irene 「다 해결을 하고 말해」 지시로 처리 완료
//   (인쇄 로직 무접촉 · print-guard --bless + 인쇄 계약 재검사). 그래서 목록은 지금 비어 있다.
const DEFERRED = [];

// 구조적 제외 — 「사람이 안 읽는다」가 코드 모양으로 증명되는 자리. ⛔ 문구 내용으로 제외하지 말 것.
const NOT_DISPLAY = [
  /^\s*(import|export type|type |interface )/,
  /\bsetCurrency\(|useState|useRef|useMemo\(/,
  /currency=\{|value=\{|defaultValue=\{|onChange|key=\{|selectedCurrency=\{|isOpen=|getChargesForCurrency/,
  /`\/api\/|\/api\/|url\s*=|\?currency=|WHERE|SELECT|params\./,
  /console\.(log|error|warn|info)|systemLogger|logger\./,
  /normalizeCurrencyCode\(\s*[A-Za-z]/,
  /const\s+\w*[Kk]ey\s*=|\w+[Kk]ey\s*=\s*`/,
  /:\s*string\s*=\s*'[A-Z]{3}'|=\s*'[A-Z]{3}'\s*\)/,
  /CURRENCY_CONFIG|currencyConfig|currencyInfo\.|\.symbol\b|getCurrencyName/,
  /currencyWarning|currency_warning|currencyError/,  // 서버 안내문을 담은 변수
];

// 통화 «코드 원형»이 찍히는 모양 — 기호 변환을 거치지 않은 것.
// `{currencySymbol}` `{currencySym}` 처럼 **변수 이름이 이미 기호**인 것은 제외한다.
const CODE_RENDER = /(\{|\$\{)\s*[A-Za-z0-9_.?[\]]*[Cc]urrency[A-Za-z0-9_.?[\]]*(\s*\|\|\s*'[A-Z]{3}')?\s*\}/;
const IS_SYMBOL_IDENT = /[Cc]urrency(Symbol|Sym)/;
const HARD_MYR = /\bMYR\s+\$?\{|\(MYR\)|\bMYR\s+[0-9]/;

// 금액이 붙는가 — ㉠ 과 ㉡ 을 가르는 유일한 기준.
// 금액 쪽 어휘 — 2026-09-18 역방향 목록 38건을 손으로 분류하며 교정했다.
//   「Unit Cost (RM)」·「Silver Threshold (RM)」·「points = RM 1」·「Credit applied RM 50」·할인 금액은
//   전부 금액 자리라 기호가 정답이다. 이 목록이 그것들을 금액으로 집어낸다.
const MONEY_TOKEN = /toFixed\(|toLocaleString\(|amount|Amount|total|Total|balance|Balance|price|Price|credit_limit|\bfee\b|Fee\b|[Cc]ost|[Tt]hreshold|discount|[Cc]redit|points|[0-9]/;
// 금액이 **통화 표기 옆**에 있는지 — 앞 24자 / 뒤 40자 창만 본다.
// 「(단위)」 괄호 표기(«Monthly Fee (RM)» «Total (RM)»)는 앞 창에 Fee/Total 이 들어와 금액으로 잡힌다.
// PayPal 플랜명 «Plan X (MYR)» 은 창 안에 숫자·금액어가 없어 안내로 남는다 (Fable 판정과 일치).
function moneyAdjacent(line, idx, len) {
  const before = line.slice(Math.max(0, idx - 24), idx);
  const after = line.slice(idx + len, idx + len + 40);
  return MONEY_TOKEN.test(before) || MONEY_TOKEN.test(after);
}

// 기호로 감싼 모양 + 그게 «정의·대입·전달»이라 위반이 아닌 문맥
const SYMBOL_WRAP = /(getCurrencySymbol|currencySymbol)\s*\(/;
const SYMBOL_OK_CONTEXT = [
  /=\s*(getCurrencySymbol|currencySymbol)\(|return\s+`?\$?\{?(getCurrencySymbol|currencySymbol)\(/,
  /setCurrency\(|symbol:|currencySymbol:|currency:\s*(getCurrencySymbol|currencySymbol)\(/,
  /suffix=|prefix=|placeholder=|\.map\(/,
  /^\s*(function|const|let|module\.exports|exports\.)/,
];

function walk(dir, exts, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === 'node_modules' || e.name.startsWith('.')) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, exts, out);
    else if (exts.some(x => e.name.endsWith(x))) out.push(p);
  }
  return out;
}

const hits = [];      // ㉠ 위배: 금액 옆 코드
const reverse = [];   // ㉡ 위배: 안내 자리를 기호로
const deferred = [];
const isComment = l => /^\s*(\/\/|\*|\/\*|#)/.test(l);
const isDeferred = (file, line) => DEFERRED.some(d => d.file === file && d.line === line);

/** 한 줄 판정. rel = 보고용 경로, allowed = 변수가 이미 기호인 파일 */
function judge(line, rel, lineNo, allowed, bucketHits, bucketReverse) {
  if (isComment(line)) return;
  if (NOT_DISPLAY.some(re => re.test(line))) return;

  const m = line.match(CODE_RENDER);
  const hm = line.match(HARD_MYR);
  const codeRender = !!m && !IS_SYMBOL_IDENT.test(m[0]) && !allowed;
  const hardMyr = !!hm;
  const symbolWrap = SYMBOL_WRAP.test(line);
  // i18n 보간에 기호를 넘기는 자리 — `{{currency}}` 는 틀이고 값이 기호다
  if (/currency:\s*(getCurrencySymbol|currencySymbol|currencySym)/.test(line)) return;
  const anchor = codeRender ? m : (hardMyr ? hm : null);
  // ㉠(금액 자리에 코드)는 **인접 창**으로 본다 — 줄 끝의 딴 금액어에 속지 않기 위해.
  const moneyForCode = anchor ? moneyAdjacent(line, anchor.index, anchor[0].length) : false;
  // ㉡(안내 자리에 기호)는 **줄 전체**로 본다 — 「Unit Cost (RM) *」처럼 라벨과 단위가 떨어져 있다.
  const moneyForSymbol = MONEY_TOKEN.test(line);
  const money = moneyForCode;

  if (money && (codeRender || hardMyr) && !symbolWrap) {
    if (isDeferred(rel, lineNo)) { deferred.push(`${rel}:${lineNo}`); return; }
    bucketHits.push(`${rel}:${lineNo}: ${line.trim().slice(0, 130)}`);
    return;
  }
  // 금액이 없다 = 통화 «안내» 자리. 코드가 정답이므로 기호로 감싸면 그것이 위반이다.
  if (!moneyForSymbol && symbolWrap && !SYMBOL_OK_CONTEXT.some(re => re.test(line))) {
    bucketReverse.push(`${rel}:${lineNo}: ${line.trim().slice(0, 130)}`);
  }
}

/** 파일 단위: 금액에 붙어 쓰이는 축약 변수(`${cur} ${n.toFixed(2)}`)의 **정의부**를 검사 — 고장 ③ */
function judgeMoneyHelpers(text, rel, bucketHits) {
  const aliases = new Set();
  const re = /\$\{\s*([A-Za-z_$][\w$]*)\s*\}\s*[^`$\n]{0,4}\$\{[^}]*(?:toFixed|toLocaleString|money\()/g;
  const logLines = new Set();
  text.split('\n').forEach((l, i) => { if (/console\.(log|error|warn|info)|systemLogger|logger\./.test(l)) logLines.add(i); });
  let m;
  while ((m = re.exec(text))) {
    const lineNo = text.slice(0, m.index).split('\n').length - 1;
    if (logLines.has(lineNo)) continue;            // 로그는 코드가 정확하다
    if (/sym/i.test(m[1])) continue;               // 이름이 이미 기호
    aliases.add(m[1]);
  }
  if (!aliases.size) return;
  text.split('\n').forEach((line, i) => {
    if (isComment(line)) return;
    for (const a of aliases) {
      const def = new RegExp(`(const|let|var)\\s+${a.replace(/\$/g, '\\$')}\\s*=`);
      if (!def.test(line)) continue;
      // 정의가 통화에서 왔는데 기호 변환이 없으면 = 금액이 코드로 찍힌다
      // 기호 리터럴로 매핑하는 삼항식(`currency === 'MYR' ? 'RM' : currency`)은 이미 기호다
      if (/\?\s*'(RM|\$|₩|S\$|฿|¥|€|£)'/.test(line)) continue;
      if (/[Cc]urrency|'[A-Z]{3}'/.test(line) && !SYMBOL_WRAP.test(line)) {
        bucketHits.push(`${rel}:${i + 1}: ${line.trim().slice(0, 130)}  ← 금액 조립에 쓰이는 «${a}»`);
      }
    }
  });
}

// ── 프론트 (.tsx/.ts): JSX 텍스트 노드 + 템플릿 문자열
for (const f of walk(FRONT, ['.tsx', '.ts'])) {
  if (/utils\/currency\.ts$/.test(f)) continue;  // 기호 매핑 정의 자체
  const rel = path.relative(FRONT, f);
  const report = `dev-frontend/src/${rel}`;
  const text = fs.readFileSync(f, 'utf-8');
  const allowed = ALLOW_SYMBOL_VARS.has(rel);
  text.split('\n').forEach((line, i) => judge(line, report, i + 1, allowed, hits, reverse));
  if (!allowed && !/utils\/currency\.ts$/.test(f)) judgeMoneyHelpers(text, report, hits);
}

// ── 백엔드 (routes/services/utils): 메일·SOA·인보이스·발주 문서
for (const sub of ['routes', 'services', 'utils']) {
  for (const f of walk(path.join(BACK, sub), ['.js'])) {
    if (/utils\/currency\.js$/.test(f)) continue;  // 기호 매핑 정의 자체
    const report = `dev-backend/${sub}/${path.relative(path.join(BACK, sub), f)}`;
    const text = fs.readFileSync(f, 'utf-8');
    text.split('\n').forEach((line, i) => judge(line, report, i + 1, false, hits, reverse));
    judgeMoneyHelpers(text, report, hits);
  }
}

// ── 번역 파일 4개 언어: 금액이 바로 붙은 'MYR' 만 위반 («MYR {{amount}}» / «MYR 50»).
//    문장 속 통화 나열(«MYR, USD, KRW, SGD»)은 ㉡ 이라 정답이다.
for (const f of walk(LOCALES, ['.json'])) {
  fs.readFileSync(f, 'utf-8').split('\n').forEach((line, i) => {
    const m = line.match(/:\s*"((?:[^"\\]|\\.)*)"/);
    if (!m || !/\bMYR\s*(\{\{|[0-9])/.test(m[1])) return;
    hits.push(`locales/${path.relative(LOCALES, f)}:${i + 1}: ${line.trim().slice(0, 130)}`);
  });
}

if (deferred.length) {
  console.log(`⏸ 승인 대기 ${deferred.length}건 (🔒 보호파일 — 게이트 통과시킴):`);
  DEFERRED.forEach(d => console.log(`   ${d.file}:${d.line} — ${d.why}`));
}
if (hits.length) {
  console.log(`❌ ㉠ 위배 — 금액 옆에 통화 코드가 그대로 찍힘: ${hits.length}건`);
  hits.forEach(h => console.log('   ' + h));
  console.log('\n   → 금액 자리는 getCurrencySymbol(code) / currencySymbol(code) 로 감싼다.');
  console.log('   → 변수가 이미 기호면 정의부를 확인하고 ALLOW_SYMBOL_VARS 에 적는다.');
}
if (reverse.length) {
  // 2026-09-18: 38건을 손으로 분류해 28건(결제수단 라벨·결제수단 미설정 안내·브랜드/국가/플랜/지갑의
  //   통화 칸)을 코드로 되돌리고, 금액·정의부 10건은 금액어 목록으로 집어내 오탐 0 을 만든 뒤
  //   **차단으로 올렸다.** baseline 은 뜨지 않았다 — 부채가 0 이라 뜰 것이 없다.
  console.log(`❌ ㉡ 위배 — 통화를 «안내»하는 자리를 기호로 감쌈: ${reverse.length}건`);
  reverse.forEach(h => console.log('   ' + h));
  console.log('\n   → 지원 여부·불일치·선택목록·설정 칸·통화 나열은 코드(MYR)가 정답 (Irene 2026-09-18).');
  console.log('   → 금액에 붙는 단위 표기라면 금액어(Cost·Fee·Threshold·Total…)가 같은 줄에 있어야 한다.');
}
// 두 방향 모두 fail-closed. ⚠ 2026-09-18: 여기서 `reverse` 를 빼먹어 「출력만 하고 통과」했다 —
//   역방향 주입 3형태가 조용히 exit 0 으로 지나갔다. 출력과 종료코드는 반드시 같은 목록을 본다.
if (hits.length || reverse.length) process.exit(1);
console.log('✅ 통화 표기 양방향 0건 — ㉠ 금액 자리 코드 누출 0 · ㉡ 안내 자리 기호 오용 0');
console.log('   (화면 + 메일/문서 + 공유문자 + 번역 4개 언어 · 금액=RM / 통화 안내=MYR)');
process.exit(0);

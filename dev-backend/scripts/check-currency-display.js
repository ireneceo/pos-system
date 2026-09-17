#!/usr/bin/env node
/**
 * 통화 표시 가드 — 「저장·전송·비교 = ISO 코드(MYR), 사람이 보는 모든 자리 = 기호(RM)」
 *
 * 2026-09-17 Irene 지시(원문): «MYR을 안써. 다 RM으로 표시해. 파악 좀 제대로 해.»
 *                             «MYR 안쓴다니까. RM이라고»
 * 같은 지적을 두 번 받았다. 그 사이 내 검사는 템플릿 문자열만 보고 **JSX 텍스트 노드를 빼먹어**
 * 「0건」이라고 보고했다. 그래서 이 가드는 두 형태를 **같은 정규식**으로 본다.
 *
 * 잡는 것: 화면/메일/문서에 통화 **변수**가 기호 변환 없이 그대로 찍히는 자리.
 * 안 잡는 것: 변수 자체가 이미 기호인 파일(ALLOW_SYMBOL_VARS), 저장·비교·URL·로그·설정 식별 문구.
 */
const fs = require('fs');
const path = require('path');

const FRONT = '/var/www/dev-frontend/src';
const BACK = path.join(__dirname, '..');

// 이 파일들의 `currency` 변수는 **정의부에서 이미 기호**다 (getCurrencySymbol 로 담거나 'RM' 기본값).
// 새로 추가할 때는 반드시 정의부를 확인하고 여기 적는다 — 추측으로 넣지 말 것.
const ALLOW_SYMBOL_VARS = new Set([
  'pages/POSTerminal/POSTerminalPage.tsx',
  'pages/BrandGeneral/BrandFranchiseMapPage.tsx',
  'pages/FoodcourtGeneral/FoodcourtFloorPlanPage.tsx',
  'pages/FoodcourtGeneral/FoodcourtTenancyMapPage.tsx',
]);

// 사람이 읽는 돈 표시가 아니라 **어느 통화인지 가리키는** 자리 — 코드가 오히려 정확하다.
const NOT_DISPLAY = [
  /getCurrencySymbol|formatCurrency|currencySym|currencySymbol|getCurrencyName|CURRENCY_CONFIG/,
  /\bsetCurrency|useState|interface |^\s*(import|type|const|let) /,
  /currency=\{|value=\{|onChange|key=|selectedCurrency=\{|isOpen=|getChargesForCurrency/,
  /`\/api\/|url\s*=|\?currency=|WHERE|SELECT/,
  /currencyInfo\.symbol|currency\.symbol|\{currencyWarning\}/,
  /is not supported|no pricing|No pricing|not allowed|No payment methods|mismatch|Supported currencies/i,
  /console\.(log|error|warn)/,
  // 「게이트웨이 통화 ≠ 인보이스 통화」처럼 **어느 통화인지 대조**하는 자리는 코드가 맞다.
  /≠|!==|===/,
];

const RENDER = /(\{|\$\{)[A-Za-z0-9_.?]*[Cc]urrency[A-Za-z0-9_.?]*\}/;

function walk(dir, exts, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === 'node_modules' || e.name.startsWith('.')) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, exts, out);
    else if (exts.some(x => e.name.endsWith(x))) out.push(p);
  }
  return out;
}

const hits = [];

// ── 프론트: JSX 텍스트 노드 + 템플릿 문자열 (둘 다 같은 정규식으로)
for (const f of walk(FRONT, ['.tsx', '.ts'])) {
  const rel = path.relative(FRONT, f);
  if (ALLOW_SYMBOL_VARS.has(rel)) continue;
  const lines = fs.readFileSync(f, 'utf-8').split('\n');
  lines.forEach((line, i) => {
    if (!RENDER.test(line)) return;
    if (NOT_DISPLAY.some(re => re.test(line))) return;
    hits.push(`dev-frontend/src/${rel}:${i + 1}: ${line.trim().slice(0, 120)}`);
  });
}

// ── 백엔드: 메일·SOA·인보이스 문서에 들어가는 템플릿 문자열
for (const sub of ['routes', 'services', 'utils']) {
  const dir = path.join(BACK, sub);
  if (!fs.existsSync(dir)) continue;
  for (const f of walk(dir, ['.js'])) {
    const lines = fs.readFileSync(f, 'utf-8').split('\n');
    lines.forEach((line, i) => {
      if (!/\$\{[A-Za-z0-9_.]*[Cc]urrency[A-Za-z0-9_.]*\}/.test(line)) return;
      // 돈 숫자가 바로 옆에 붙는 자리만 = 사람이 읽는 금액 표시
      if (!/toFixed\(|amount|total|balance|price/i.test(line)) return;
      if (NOT_DISPLAY.some(re => re.test(line))) return;
      hits.push(`dev-backend/${sub}/${path.basename(f)}:${i + 1}: ${line.trim().slice(0, 120)}`);
    });
  }
}

if (hits.length) {
  console.log(`❌ 통화 코드가 사람 보는 자리에 그대로 찍힘: ${hits.length}건`);
  hits.forEach(h => console.log('   ' + h));
  console.log('\n   → 표시 자리는 getCurrencySymbol(code) / currencySymbol(code) 로 감싼다.');
  console.log('   → 변수 자체가 이미 기호라면 정의부를 확인하고 ALLOW_SYMBOL_VARS 에 적는다.');
  process.exit(1);
}
console.log('✅ 통화 표시: 코드 누출 0건 (화면 + 메일/문서)');
process.exit(0);

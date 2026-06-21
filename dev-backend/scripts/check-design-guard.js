#!/usr/bin/env node
/**
 * 🎨 DESIGN GUARD — 디자인 단일 기준(RA=표준) 자동 강제기
 * ------------------------------------------------------------------
 * CLAUDE.md "🎨 디자인 단일 기준" 을 코드로 강제한다. 가이드만으론 안 지켜진
 * (2026-06-21 교훈) 문제를 print-guard / timezone-check 와 동일한 baseline 방식으로
 * 막는다: 기존 위반은 baseline 으로 추적(점진 교체 대상), **신규 위반만 fail-closed**.
 *
 * 검사 항목(신규 추가 = 경고):
 *   local-styled-button  — 페이지/컴포넌트가 공용 Button 대신 styled.button 신설
 *   local-styled-table   — 공용 DataTable 대신 styled.table 신설
 *   local-statcard       — 공용 DashboardStatCard 대신 로컬 StatCard 신설
 *   decorative-emoji     — 장식 컬러 이모지(🔒🟢⚠📦🔍 등) JSX 렌더 (기하 글리프 ▦◐□◯● 은 허용)
 *   danger-ff6b6b        — 일반 danger 버튼에 #FF6B6B (정답: #EF4444. #FF6B6B 는 LiveOrders 전용)
 *
 * 사용법:
 *   node scripts/check-design-guard.js          # 검사 — 신규 위반 시 exit 1
 *   node scripts/check-design-guard.js --bless   # 현재 상태를 baseline 으로 등록
 *   node scripts/check-design-guard.js --summary # 요약만
 *
 * Exit: 0 = 신규 위반 0(안전), 1 = 신규 위반.
 */

const fs = require('fs');
const path = require('path');

const SRC = path.resolve(__dirname, '../../dev-frontend/src');

// 공용(정석) 컴포넌트 정의 파일 — 여기서 styled 정의는 허용(이것들이 표준 그 자체).
const CANONICAL = ['components/UI/', 'components/Button/', 'components/Theme/'];
// 기능/예외 — 이모지가 데이터·기능인 곳 + 인쇄 보호.
const EMOJI_SKIP_FILE = [
  'EmojiPicker', 'PhoneInput', 'LanguageSelector', 'phoneUtils',
  'AutoPrint', 'thermalPrinter', 'billPrint',
];
const SKIP_DIR = ['node_modules', '__tests__', '.test.', '.spec.'];

function walk(dir, out) {
  let ents = [];
  try { ents = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
  for (const e of ents) {
    const full = path.join(dir, e.name);
    if (SKIP_DIR.some(s => full.includes(s))) continue;
    if (e.isDirectory()) walk(full, out);
    else if (/\.(ts|tsx|js|jsx)$/.test(e.name)) out.push(full);
  }
}

const rel = f => f.replace(SRC + '/', '');
const isCanonical = f => CANONICAL.some(c => rel(f).startsWith(c));

// 장식 컬러 이모지: 픽토그래프 1F300–1FAFF + ⚠(26A0). 기하 글리프(25xx)·☰(2630)·★(2605) 제외.
const EMOJI_RE = /[\u{1F300}-\u{1FAFF}]|⚠/u;
const EMOJI_RE_G = /[\u{1F300}-\u{1FAFF}]|⚠/gu;

const violations = [];
const files = [];
walk(SRC, files);

for (const f of files) {
  let src; try { src = fs.readFileSync(f, 'utf8'); } catch { continue; }
  const r = rel(f);
  const lines = src.split('\n');

  // 1~3) 로컬 styled 정의 (공용 정의 파일 제외)
  if (!isCanonical(f)) {
    if (/styled\.button|styled\(button\)/.test(src) || /=\s*styled\.button/.test(src))
      violations.push({ kind: 'local-styled-button', file: r, sig: 'def', line: lineOf(lines, /styled\.button/) });
    if (/styled\.table/.test(src))
      violations.push({ kind: 'local-styled-table', file: r, sig: 'def', line: lineOf(lines, /styled\.table/) });
    if (/(StatCard|StatGrid|StatValue|StatLabel)\s*=\s*styled/.test(src) && !/Dashboard(StatCard|StatsGrid)/.test(src))
      violations.push({ kind: 'local-statcard', file: r, sig: 'def', line: lineOf(lines, /(StatCard|StatGrid|StatValue|StatLabel)\s*=\s*styled/) });
  }

  // 4) 장식 이모지 (JSX 렌더 추정 — 주석/콘솔/데이터/픽커 라인 제외)
  const emojiSkip = EMOJI_SKIP_FILE.some(s => r.includes(s));
  if (!emojiSkip) {
    lines.forEach((ln, i) => {
      const t = ln.trim();
      if (t.startsWith('//') || t.startsWith('*') || t.startsWith('/*')) return;
      if (/console\.|emoji:|\.emoji|placeholder=|EMOJI|🇲🇾/.test(ln)) return;
      const code = ln.split('//')[0]; // 인라인 주석(// 🔒 …) 뒤 이모지는 렌더 아님 → 제외
      const m = code.match(EMOJI_RE_G);
      if (!m) return;
      if (m.length >= 2) return; // 한 줄 2개 이상 = 이모지 피커 배열 추정 → 제외
      violations.push({ kind: 'decorative-emoji', file: r, sig: m[0], line: i + 1, text: t.slice(0, 80) });
    });
  }

  // 5) 일반 danger 버튼에 #FF6B6B (LiveOrders 전용 색을 일반 danger 에 오용)
  if (!r.startsWith('pages/LiveOrders/')) {
    lines.forEach((ln, i) => {
      if (/#FF6B6B/i.test(ln) && /danger/i.test(ln)) {
        violations.push({ kind: 'danger-ff6b6b', file: r, sig: 'FF6B6B', line: i + 1, text: ln.trim().slice(0, 80) });
      }
    });
  }
}

function lineOf(lines, re) { const i = lines.findIndex(l => re.test(l)); return i < 0 ? 0 : i + 1; }

const fp = v => `${v.file}:${v.kind}:${v.sig}`;
const baselineFile = path.resolve(__dirname, 'design-guard-baseline.json');
let baseline = [];
try { baseline = JSON.parse(fs.readFileSync(baselineFile, 'utf8')); } catch {}
const baseSet = new Set(baseline);

const summary = violations.reduce((m, v) => { m[v.kind] = (m[v.kind] || 0) + 1; return m; }, {});
console.log('\n🎨 DESIGN GUARD — 디자인 단일 기준(RA=표준) 강제');
Object.entries(summary).forEach(([k, n]) => console.log(`  ${k}: ${n}건`));
console.log(`  합계: ${violations.length}건 (baseline: ${baseline.length})`);

const args = process.argv.slice(2);
if (args.includes('--bless')) {
  fs.writeFileSync(baselineFile, JSON.stringify([...new Set(violations.map(fp))], null, 0));
  console.log(`\n✓ baseline 등록: ${new Set(violations.map(fp)).size} 지문. 이후 신규 위반만 fail.`);
  process.exit(0);
}

const newOnes = violations.filter(v => !baseSet.has(fp(v)));
const useBaseline = baseline.length > 0;

if (!args.includes('--summary')) {
  const show = useBaseline ? newOnes : violations;
  show.slice(0, 50).forEach(v => console.log(`  [${v.kind}] ${v.file}:${v.line}  ${v.text || ''}`));
  if (show.length > 50) console.log(`  … 외 ${show.length - 50}건`);
}

if (useBaseline) {
  if (newOnes.length > 0) {
    console.log(`\n✗ 신규 디자인 위반 ${newOnes.length}건 (baseline 외). CLAUDE.md "🎨 디자인 단일 기준" 위반 — 공용 컴포넌트/RA 기준 사용 필수. (정식이면 --bless)`);
    process.exit(1);
  }
  console.log('\n✓ 신규 위반 0 (기존 baseline 은 점진 교체 대상).');
  process.exit(0);
} else {
  console.log(`\n${violations.length === 0 ? '✓ 위반 0' : `위반 ${violations.length}건 — --bless 로 baseline 등록 후 신규만 차단.`}`);
  process.exit(0);
}

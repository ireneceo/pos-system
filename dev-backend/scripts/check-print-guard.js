#!/usr/bin/env node
/**
 * 🔒 PRINT GUARD — 인쇄/주문 생명선 파일 무결성 감시기
 * ------------------------------------------------------------------
 * 매장 인쇄는 영업 생명선이다 (CLAUDE.md 최우선 규칙). 이 스크립트는
 * CLAUDE.md "보호 대상" 으로 지정된 인쇄/주문 코드 파일들의 지문(sha256)을
 * 떠서, 누군가(사람이든 auto-save 커밋이든) 인쇄 무관 작업 중 실수로
 * 생명선 코드를 건드렸는지 즉시 감지한다.
 *
 * 사용법:
 *   node scripts/check-print-guard.js          # 검사 — 변경 감지 시 exit 1
 *   node scripts/check-print-guard.js --bless   # 현재 상태를 새 기준으로 승인 등록
 *   node scripts/check-print-guard.js --quiet    # 변경분만 출력
 *
 * health-check.js 의 `guard` 카테고리도 compareManifest() 를 재사용한다
 * (배포 의무 게이트가 자동으로 무결성까지 검사).
 *
 * 파일 분류:
 *   dedicated — 인쇄/주문 전용 파일. 어떤 변경이든 곧 인쇄 동작 변경 신호.
 *   shared    — 인쇄 블록 + 다른 코드가 섞인 큰 파일. 변경이 흔하므로(예: 사이드바
 *               메뉴 추가 → MainLayout) 떴을 때 "인쇄 블록을 건드렸는지" 사람이 확인.
 *
 * Exit code: 0 = 변경 없음(안전), 1 = 변경 감지 또는 파일 누락.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// 프로젝트 루트 (/var/www) 기준. CLAUDE.md 🔒 "보호 대상" 과 일치.
const ROOT = path.resolve(__dirname, '../..');
const MANIFEST = path.join(__dirname, 'print-guard.manifest.json');

// 🔒 보호 대상 — CLAUDE.md 와 동기화. 파일 추가/이동 시 여기도 갱신할 것.
const PROTECTED_FILES = [
  // dedicated: 인쇄/주문 전용 — 변경 = 곧 인쇄 동작 변경
  { rel: 'dev-frontend/src/utils/billPrint.js', tier: 'dedicated' },
  { rel: 'dev-frontend/src/hooks/useAutoPrintPoller.ts', tier: 'dedicated' },
  { rel: 'dev-backend/utils/stationEnrichment.js', tier: 'dedicated' },
  { rel: 'dev-backend/utils/orderTotals.js', tier: 'dedicated' },
  // shared: 인쇄 블록 + 다른 코드 혼재 — 변경 흔함, 인쇄 블록 건드렸는지 확인
  { rel: 'dev-frontend/src/components/Layout/MainLayout.tsx', tier: 'shared', block: '_printPollFn' },
  { rel: 'dev-frontend/src/pages/KitchenDisplay/KitchenDisplayPage.tsx', tier: 'shared', block: 'order-created / order-items-added 핸들러' },
  { rel: 'dev-frontend/src/pages/POSTerminal/POSTerminalPage.tsx', tier: 'shared', block: '직접 인쇄 블록' },
  { rel: 'dev-backend/routes/orders-crud.js', tier: 'shared', block: 'pending-print / printed / print-claim / kitchen_items' },
];

function hashFile(absPath) {
  return crypto.createHash('sha256').update(fs.readFileSync(absPath)).digest('hex');
}

function buildCurrent() {
  const map = {};
  const missing = [];
  for (const f of PROTECTED_FILES) {
    const abs = path.join(ROOT, f.rel);
    if (!fs.existsSync(abs)) { missing.push(f.rel); continue; }
    map[f.rel] = hashFile(abs);
  }
  return { map, missing };
}

function loadManifest() {
  if (!fs.existsSync(MANIFEST)) return null;
  try { return JSON.parse(fs.readFileSync(MANIFEST, 'utf8')); }
  catch { return null; }
}

/**
 * 현재 파일 상태를 기준(manifest)과 비교한다. CLI 와 health-check 가 공유.
 * @returns {{ok, changed:[], added:[], removed:[], missing:[], blessedAt, hasBaseline}}
 */
function compareManifest() {
  const manifest = loadManifest();
  if (!manifest || !manifest.files) {
    return { ok: false, hasBaseline: false, changed: [], added: [], removed: [], missing: [], blessedAt: null };
  }
  const { map, missing } = buildCurrent();
  const changed = [], added = [], removed = [];
  const tierOf = (rel) => (PROTECTED_FILES.find((f) => f.rel === rel) || {}).tier || '?';

  for (const f of PROTECTED_FILES) {
    const base = manifest.files[f.rel];
    const cur = map[f.rel];
    if (!cur) { removed.push({ rel: f.rel, tier: f.tier }); continue; }
    if (!base) { added.push({ rel: f.rel, tier: f.tier }); continue; }
    if (base !== cur) changed.push({ rel: f.rel, tier: f.tier, block: f.block });
  }
  const ok = changed.length + added.length + removed.length + missing.length === 0;
  return { ok, hasBaseline: true, changed, added, removed, missing: missing.map((rel) => ({ rel, tier: tierOf(rel) })), blessedAt: manifest.blessed_at };
}

module.exports = { PROTECTED_FILES, compareManifest, buildCurrent };

// ── CLI ──────────────────────────────────────────────────────────
if (require.main === module) {
  const args = process.argv.slice(2);
  const BLESS = args.includes('--bless');
  const QUIET = args.includes('--quiet');
  const c = {
    green: (s) => `\x1b[32m${s}\x1b[0m`, red: (s) => `\x1b[31m${s}\x1b[0m`,
    yellow: (s) => `\x1b[33m${s}\x1b[0m`, gray: (s) => `\x1b[90m${s}\x1b[0m`,
    bold: (s) => `\x1b[1m${s}\x1b[0m`,
  };

  if (BLESS) {
    const { map, missing } = buildCurrent();
    if (missing.length) {
      console.error(c.red('✗ 보호 대상 파일을 찾을 수 없어 bless 중단:'));
      missing.forEach((m) => console.error(c.red('  - ' + m)));
      process.exit(1);
    }
    const manifest = {
      note: '🔒 PRINT GUARD baseline — 인쇄/주문 생명선 파일 지문. 변경 승인 시에만 갱신.',
      blessed_at: new Date().toISOString(),
      files: map,
    };
    fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');
    console.log(c.green(c.bold(`✓ 기준 등록 완료 (${Object.keys(map).length}개 파일)`)));
    console.log(c.gray(`  ${MANIFEST}\n  blessed_at: ${manifest.blessed_at}`));
    process.exit(0);
  }

  const r = compareManifest();
  if (!r.hasBaseline) {
    console.error(c.yellow('⚠ 기준(manifest)이 없습니다. 먼저 현재 상태를 승인 등록하세요:'));
    console.error(c.gray('    node scripts/check-print-guard.js --bless'));
    process.exit(1);
  }
  if (!QUIET) {
    console.log(c.bold('\n🔒 PRINT GUARD — 인쇄/주문 생명선 무결성 검사'));
    console.log(c.gray(`   기준 등록: ${r.blessedAt || '(unknown)'}`));
    console.log(c.gray(`   대상: ${PROTECTED_FILES.length}개 (dedicated ${PROTECTED_FILES.filter(f=>f.tier==='dedicated').length} / shared ${PROTECTED_FILES.filter(f=>f.tier==='shared').length})\n`));
  }
  if (r.ok) {
    console.log(c.green(c.bold(`✓ 변경 없음 — 생명선 안전 (${PROTECTED_FILES.length}/${PROTECTED_FILES.length})`)));
    process.exit(0);
  }
  const drift = r.changed.length + r.added.length + r.removed.length + r.missing.length;
  console.log(c.red(c.bold(`✗ 인쇄/주문 보호 파일 변경 감지 (${drift}건)`)));
  r.changed.forEach((f) => {
    if (f.tier === 'dedicated') console.log(c.red(`  [변경·전용] ${f.rel}  ← 인쇄 동작 변경 신호. 의도한 것인가?`));
    else console.log(c.yellow(`  [변경·공유] ${f.rel}  ← '${f.block}' 블록을 건드렸는지 확인`));
  });
  r.added.forEach((f) => console.log(c.yellow(`  [신규] ${f.rel} (기준 미등록)`)));
  r.removed.forEach((f) => console.log(c.red(`  [삭제] ${f.rel}`)));
  r.missing.forEach((f) => console.log(c.red(`  [누락] ${f.rel} (파일 없음)`)));
  console.log('');
  console.log(c.yellow('  → 인쇄 작업이 아니었다면 사고입니다. 변경을 되돌리세요.'));
  console.log(c.yellow('  → Irene 승인 + 실프린터 확인 완료된 정식 변경이면:'));
  console.log(c.gray('       node scripts/check-print-guard.js --bless'));
  process.exit(1);
}

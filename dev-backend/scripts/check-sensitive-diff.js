#!/usr/bin/env node
/**
 * check-sensitive-diff.js — 민감영역 변경 분류기 = "Fable 검증 게이트" 기계 판정
 * ------------------------------------------------------------------
 * 문제: CLAUDE.md "Fable 검증 게이트" 5기준(보호영역/돈/마이그레이션/아키텍처/보안)의
 * 해당 여부 판단이 지금까지 작업 모델의 자기평가에 의존했다. 약한 모델은 놓친다.
 * 이 스크립트는 "무엇이 바뀌었나"를 기계로 수집·분류해 게이트 대상 여부를 자동 판정한다.
 *
 * 변경 수집 (둘 다 사용, 합집합):
 *   1) 운영 배포 스냅샷 대비 (deploy-manifest.js — 배포 델타의 단일 진실)
 *   2) git HEAD 대비 working tree (스냅샷 없거나 오래됐을 때의 보조)
 *
 * 사용법:
 *   node scripts/check-sensitive-diff.js           # 분류 + 판정 출력 (항상 exit 0 — 정보성)
 *   node scripts/check-sensitive-diff.js --json    # JSON 출력
 *   node scripts/check-sensitive-diff.js --gate    # Fable 대상이면 exit 1 (스크립트 게이트용)
 *
 * 판정 결과의 의미:
 *   대상   → 완료 보고에 "Fable 검증 대상 — Fable 세션 점검 후 진행/배포 권장" 명시 (CLAUDE.md 규칙)
 *   비대상 → 기계 기준으로는 미해당. 단 ④신규 시스템·아키텍처 변경은 기계로 못 잡으니 자기평가 유지.
 */
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.resolve(__dirname, '../..');
const { PROTECTED_FILES } = require('./check-print-guard.js');
const { diffAgainstLastDeploy } = require('./deploy-manifest.js');

// CLAUDE.md "Fable 검증 게이트" 기준 → 경로 패턴. 새 민감영역이 생기면 여기 1줄 추가 (피드백 1건 = 패턴 1개).
const CLASSES = [
  {
    id: 'protected', label: '① 🔒 보호영역 (인쇄 8파일 / KDS 단계로직)', fable: true,
    match: (f) => PROTECTED_FILES.some((p) => p.rel === f)
      || /desktop-pos\/.*print/i.test(f)
      || f === 'dev-frontend/src/utils/consolidatedTicket.ts',
  },
  {
    id: 'money', label: '② 💰 돈·주문 무결성 (결제/환불/주문금액/오프라인 동기화)', fable: true,
    match: (f) => /dev-backend\/(routes\/(orders|payments|invoices|subscriptions|billing)|services\/(billing|invoice|payment|subscription))/i.test(f)
      || /dev-backend\/utils\/(orderTotals|orderCharge)/i.test(f)
      || /dev-frontend\/src\/.*(offlineSync|offlineStore|offlineOverlay|Payment|Stripe|PayPal|Checkout)/i.test(f),
  },
  {
    id: 'migration', label: '③ 🗄️ DB 스키마·마이그레이션 (모델/ENUM/백필)', fable: true,
    match: (f) => /dev-backend\/models\/.*\.js$/.test(f)
      || /dev-backend\/scripts\/(migrate-|\d{8}_)/.test(f)
      || /dev-backend\/sync-database\.js$/.test(f),
  },
  {
    id: 'security', label: '⑤ 🔐 보안 경계 (인증/권한/라우터 마운트/공개 라우트)', fable: true,
    match: (f) => /dev-backend\/middleware\//.test(f)
      || f === 'dev-backend/server.js'
      || /dev-backend\/routes\/auth/.test(f)
      || /dev-backend\/(services\/authService|utils\/settingsGuard)/.test(f),
  },
  {
    id: 'guard-infra', label: '⚠ 안전망 자체 (가드/게이트/배포 스크립트) — 변경 시 근거 필수', fable: false,
    match: (f) => /scripts\/(check-|inspection\/|health-check|print-route-guard\/|verify-all|deploy-manifest|timezone-check|state-hydration-check|headless-page-sweep)/.test(f)
      || f === 'deploy-to-production.sh' || /\.claude\/hooks\//.test(f),
  },
];

function gitChanges() {
  try {
    const out = execSync('git status --porcelain', { cwd: ROOT, encoding: 'utf8', timeout: 20000 });
    return out.split('\n').filter(Boolean).map((l) => l.slice(3).trim()).filter(Boolean)
      .map((f) => (f.includes(' -> ') ? f.split(' -> ')[1] : f));
  } catch { return []; }
}

function collect() {
  const set = new Set();
  const d = diffAgainstLastDeploy();
  const sources = { manifest: null, git: 0 };
  if (d) {
    [...d.changed, ...d.added, ...d.removed].forEach((f) => set.add(f));
    sources.manifest = { at: d.snappedAt, count: d.changed.length + d.added.length + d.removed.length };
  }
  const g = gitChanges();
  g.forEach((f) => set.add(f));
  sources.git = g.length;
  return { files: [...set].sort(), sources };
}

if (require.main === module) {
  const argv = process.argv.slice(2);
  const { files, sources } = collect();

  const byClass = CLASSES.map((c) => ({ ...c, files: files.filter(c.match) }));
  const classified = new Set(byClass.flatMap((c) => c.files));
  const other = files.filter((f) => !classified.has(f));
  const fableHit = byClass.filter((c) => c.fable && c.files.length);
  const verdict = fableHit.length > 0;

  if (argv.includes('--json')) {
    console.log(JSON.stringify({ fableGateRequired: verdict, reasons: fableHit.map((c) => c.label), sources, classes: byClass.map((c) => ({ id: c.id, files: c.files })), otherCount: other.length }, null, 2));
    process.exit(argv.includes('--gate') && verdict ? 1 : 0);
  }

  console.log('🧭 민감영역 diff 분류 — Fable 검증 게이트 기계 판정');
  console.log(`   기준: ${sources.manifest ? `운영 배포 스냅샷(${sources.manifest.at}) ${sources.manifest.count}건` : '⚠ 배포 스냅샷 없음(다음 /배포 후 생성)'} + git working ${sources.git}건 → 합집합 ${files.length}건`);
  for (const c of byClass) {
    if (!c.files.length) continue;
    console.log(`\n  ${c.label} — ${c.files.length}건`);
    c.files.slice(0, 12).forEach((f) => console.log('    - ' + f));
    if (c.files.length > 12) console.log(`    … 외 ${c.files.length - 12}건`);
  }
  if (other.length) console.log(`\n  일반 변경: ${other.length}건`);
  console.log('');
  if (verdict) {
    console.log(`  ★ FABLE 게이트 대상 — 기준 ${fableHit.map((c) => c.label.slice(0, 1)).join('')} 접촉. 완료 보고에 "Fable 검증 대상" 명시, Fable 점검 후 배포.`);
  } else {
    console.log('  ○ 기계 기준 비대상 — 단 ④신규 시스템·아키텍처 변경 여부는 자기평가로 확인할 것.');
  }
  process.exit(argv.includes('--gate') && verdict ? 1 : 0);
}

#!/usr/bin/env node
/**
 * verify-all.js — 기계 검증 게이트 단일 러너 (model-agnostic 안전망)
 * ------------------------------------------------------------------
 * 목적: /검증 의 "기계로 검사 가능한" 게이트 전부를 명령 1개로 실행한다.
 * 어떤 모델/사람이 작업하든 "무엇을 돌려야 하는지"를 기억할 필요가 없게 하는 장치.
 * (판단이 필요한 검증 — 요구사항 대조·실제 API 왕복·UI 품질 — 은 여전히 /검증 절차를 따른다.)
 *
 * 사용법 (cd /var/www/dev-backend):
 *   node scripts/verify-all.js            # 표준: 정적 가드 + 회귀(health/inspection/인쇄루트/i18n)
 *   node scripts/verify-all.js --quick    # 정적 가드만 (수 초, 코드 저장 직후 습관용)
 *   node scripts/verify-all.js --full     # 표준 + mount sweep (실브라우저 크래시0, 수 분)
 *   node scripts/verify-all.js --only print-guard,health   # 특정 게이트만
 *   node scripts/verify-all.js --list     # 게이트 목록
 *
 * Exit code: 0 = 전부 통과, 1 = 하나라도 실패 (fail-closed).
 * 각 게이트는 기존 스크립트를 그대로 호출한다(단일 소스 유지 — 여기 로직 중복 금지).
 *
 * ⚠ mount sweep 은 "현재 dev 에 서빙된 번들"을 검사한다. 프론트 코드를 바꿨다면
 *    반드시 build:dev 후에 --full 을 돌려야 의미가 있다 (빌드는 이 러너가 하지 않음 —
 *    CLAUDE.md 규칙상 빌드는 run_in_background 로 별도 실행).
 */
const { spawnSync } = require('child_process');
const path = require('path');
const http = require('http');
// mount sweep 이 demo 계정 없는 역할(System Admin/Manager) 토큰을 직접 서명하므로 JWT_SECRET 필요.
try { require('dotenv').config({ path: path.resolve(__dirname, '../.env'), quiet: true }); } catch { /* optional */ }

const ROOT = path.resolve(__dirname, '../..');           // /var/www
const BACKEND = path.join(ROOT, 'dev-backend');
const FRONTEND = path.join(ROOT, 'dev-frontend');

const c = {
  green: (s) => `\x1b[32m${s}\x1b[0m`, red: (s) => `\x1b[31m${s}\x1b[0m`,
  yellow: (s) => `\x1b[33m${s}\x1b[0m`, gray: (s) => `\x1b[90m${s}\x1b[0m`,
  bold: (s) => `\x1b[1m${s}\x1b[0m`, cyan: (s) => `\x1b[36m${s}\x1b[0m`,
};

// ── 게이트 정의 (tier: static=코드만, runtime=dev 백엔드/DB 필요, mount=실브라우저) ──
const GATES = [
  { id: 'print-guard', tier: 'static', label: '🔒 인쇄 보호파일 무결성 (8파일 sha256)', cwd: BACKEND, cmd: ['node', 'scripts/check-print-guard.js', '--quiet'] },
  { id: 'print-field-contract', tier: 'static', label: '🧾 인쇄 필드 계약 (세트 구성품 누락 방지)', cwd: BACKEND, cmd: ['node', 'scripts/check-print-field-contract.js'] },
  { id: 'design-guard', tier: 'static', label: '🎨 디자인 단일 기준 (RA=표준, 신규 위반 0)', cwd: BACKEND, cmd: ['node', 'scripts/check-design-guard.js', '--summary'] },
  { id: 'route-guard', tier: 'static', label: '🛡️ IDOR 라우트 가드 (신규 무방비 0)', cwd: BACKEND, cmd: ['node', 'scripts/check-route-guard.js', '--summary'] },
  { id: 'migration-registry', tier: 'static', label: '🗄️ 마이그레이션 레지스트리 (배포목록 누락 = 스키마 드리프트 차단)', cwd: BACKEND, cmd: ['node', 'scripts/check-migration-registry.js'] },
  { id: 'timezone', tier: 'static', label: '🕐 타임존 가드 (신규 위반 0)', cwd: BACKEND, cmd: ['node', 'scripts/timezone-check.js'] },
  { id: 'desktop-feed', tier: 'static', label: '🖥️ 데스크탑 설치본 피드 (CTA·자동업데이트가 최신 exe 를 가리킴)', cwd: BACKEND, cmd: ['node', 'scripts/check-desktop-feed.js', '--quiet'] },
  { id: 'hydration', tier: 'static', label: '💧 state hydration 안전 (warning 0)', cwd: FRONTEND, cmd: ['node', 'scripts/state-hydration-check.js'] },
  // 2026-08-19 (with MIN #260819-010): 선언 안 된 setter 호출이 버튼을 통째로 죽였다(2.5개월 무증상).
  //   이 프로젝트는 TS 타입검사가 실질적으로 게이트 역할을 못 한다(typescript 4.9 vs i18next TS5 d.ts →
  //   파서가 먼저 터지고 CRA 가 타입오류를 warning 으로만 낸다) → 이 스캐너가 그 구멍을 좁게 막는다.
  { id: 'dead-handlers', tier: 'static', label: '🧟 죽은 핸들러 (선언 없는 setter 호출 = 클릭 즉시 ReferenceError)', cwd: BACKEND, cmd: ['node', 'scripts/check-dead-handlers.js', '--summary'] },
  { id: 'sensitive-diff', tier: 'static', label: '🧭 민감영역 diff 분류 (Fable 게이트 판정, 정보성)', cwd: BACKEND, cmd: ['node', 'scripts/check-sensitive-diff.js'], advisory: true },
  // 계약 테스트 — "사고를 박제한" jest 스위트. 개별 명령을 기억할 필요 없이 게이트가 돌린다.
  //   order-totals  = 금액 공식(돈)  /  settings-guard = 설정 wipe(thefire 무인쇄 사고)
  //   socket-auth   = 소켓 테넌트 경계(join + emit 양방향, 강제/모니터 두 모드)
  //   cashup-expected = 마감 기대금액(주문 행에만 기록된 결제도 잡히는지 + 취소 제외 + 이중계상 0)
  //   order-payment-ledger = 결제 원장 일원화(전이 1회만 기록·유령결제 방지·이중계상 0·staffMeal 제외)
  { id: 'contract-tests', tier: 'runtime', label: '📜 계약 테스트 (금액공식·설정wipe·소켓경계·마감기대금액·결제원장)', cwd: BACKEND, cmd: ['npx', 'jest', 'tests/order-totals.test.js', 'tests/settings-guard.test.js', 'tests/socket-auth.test.js', 'tests/cashup-expected.test.js', 'tests/order-payment-ledger.test.js', '--forceExit', '--silent'], timeout: 300000 },
  { id: 'inspection', tier: 'runtime', label: '🔎 인스펙션 하니스 (구조 불변식, 신규 위반 0)', cwd: BACKEND, cmd: ['node', 'scripts/inspection/run.js'] },
  { id: 'health', tier: 'runtime', label: '❤️ health-check 전체 회귀 (인쇄 계약+보안+API)', cwd: BACKEND, cmd: ['node', 'scripts/health-check.js', '--quiet'], timeout: 300000 },
  { id: 'print-routes', tier: 'runtime', label: '🖨️ 인쇄 라우트 가드 (자동인쇄 전 루트 실제 실행)', cwd: FRONTEND, cmd: ['node', 'scripts/print-route-guard/run.js', '--quiet'], timeout: 600000 },  // 300s→600s (2026-08-20): e2e·빌드와 겹치면 34/34 정상인데도 타임아웃으로 거짓 실패했다. 게이트를 느슨하게 한 게 아니라 부하 여유만 준 것.
  { id: 'i18n', tier: 'runtime', label: '🌐 i18n 4언어 키 일치', cwd: FRONTEND, cmd: ['node', 'scripts/verify-translations.js'] },
  { id: 'mount', tier: 'mount', label: '🖥️ 실브라우저 mount sweep (8역할 + /pos/manager/*, 크래시0)', cwd: FRONTEND, cmd: null /* 특수 처리: 토큰 자동조달 + 2개 sweep 병합 */, timeout: 1200000 },
];

function postJson(url, body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const u = new URL(url);
    const req = http.request({ hostname: u.hostname, port: u.port, path: u.pathname, method: 'POST', headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(data) } }, (res) => {
      let buf = '';
      res.on('data', (d) => (buf += d));
      res.on('end', () => { try { resolve(JSON.parse(buf)); } catch (e) { reject(new Error('bad json: ' + buf.slice(0, 120))); } });
    });
    req.on('error', reject);
    req.setTimeout(10000, () => req.destroy(new Error('timeout')));
    req.write(data); req.end();
  });
}

async function fetchDemoToken(key) {
  const r = await postJson('http://localhost:3001/api/auth/demo-login', { key });
  const token = r.token || (r.data && r.data.token);
  if (!token) throw new Error(`demo-login 실패 (${key}): ${JSON.stringify(r).slice(0, 120)}`);
  return token;
}

// demo-login 화이트리스트에 없는 역할(System Admin / Brand·Foodcourt Manager)의 mount 검증용 토큰.
// DB 의 실제 계정을 찾아 서명한다(비밀번호 불필요·계정 무변경). 해당 역할 계정이 없으면 null →
// roles-sweep 이 그 역할만 skip(나머지는 그대로 검사).
async function signRoleToken(role) {
  try {
    const jwt = require('jsonwebtoken');
    const { User } = require('../models');
    if (!process.env.JWT_SECRET) return null;
    const user = await User.findOne({ where: { role }, order: [['id', 'ASC']] });
    if (!user) return null;
    return jwt.sign({
      userId: user.id, email: user.email, role: user.role, username: user.username,
      brand_id: user.brand_id, foodcourt_id: user.foodcourt_id, restaurant_id: user.restaurant_id,
      manager_id: user.manager_id,
    }, process.env.JWT_SECRET, { expiresIn: '30m' });
  } catch {
    return null;
  }
}

function runGate(gate, extraEnv) {
  const started = Date.now();
  const r = spawnSync(gate.cmd[0], gate.cmd.slice(1), {
    cwd: gate.cwd,
    encoding: 'utf8',
    timeout: gate.timeout || 120000,
    env: { ...process.env, ...(extraEnv || {}) },
    maxBuffer: 20 * 1024 * 1024,
  });
  const out = (r.stdout || '') + (r.stderr || '');
  return { ok: r.status === 0, code: r.status, out, ms: Date.now() - started, timedOut: r.error && /ETIMEDOUT/.test(String(r.error)) };
}

(async () => {
  const argv = process.argv.slice(2);
  const has = (f) => argv.includes(f);
  const arg = (k) => { const i = argv.indexOf(k); return i > -1 ? argv[i + 1] : null; };

  if (has('--list')) {
    GATES.forEach((g) => console.log(`  ${g.id.padEnd(22)} [${g.tier}] ${g.label}`));
    process.exit(0);
  }

  const only = (arg('--only') || '').split(',').map((s) => s.trim()).filter(Boolean);
  let selected;
  if (only.length) selected = GATES.filter((g) => only.includes(g.id));
  else if (has('--quick')) selected = GATES.filter((g) => g.tier === 'static');
  else if (has('--full')) selected = GATES;
  else selected = GATES.filter((g) => g.tier !== 'mount');

  if (!selected.length) { console.error('선택된 게이트 없음 (--list 로 id 확인)'); process.exit(1); }

  console.log(c.bold(`\n=== VERIFY-ALL — 기계 검증 게이트 ${selected.length}개 실행 ===`));
  console.log(c.gray(`   모드: ${only.length ? 'only=' + only.join(',') : has('--quick') ? 'quick(정적만)' : has('--full') ? 'full(+mount)' : '표준(정적+회귀)'}\n`));

  const results = [];
  for (const gate of selected) {
    process.stdout.write(c.gray(`  … ${gate.label}`));
    let r;
    try {
      if (gate.id === 'mount') {
        // 토큰 자동조달 후 2개 sweep 병합 실행.
        //   page-sweep  = RA + BG
        //   roles-sweep = FG · Owner · Supplier · System Admin · Brand/Foodcourt Manager · /pos/manager/*
        // System Admin / Brand Manager / Foodcourt Manager 는 demo-login 화이트리스트에 없어 예전엔
        // graceful skip 됐다(커버리지 갭). 2026-07-11: DB 의 실제 계정으로 JWT 를 직접 발급해 커버.
        // — 이 갭 때문에 ManagerDashboard 의 Math.random 가짜 매출이 어떤 게이트에도 안 걸렸다.
        const [ra, bg, fg, owner, supplier] = await Promise.all([
          fetchDemoToken('test_restaurant_admin'), fetchDemoToken('test_brand_general'),
          fetchDemoToken('demo_foodcourt_general'), fetchDemoToken('test_restaurant_owner'),
          fetchDemoToken('demo_supplier_admin'),
        ]);
        const [admin, bm, fcm] = await Promise.all([
          signRoleToken('System Admin'), signRoleToken('Brand Manager'), signRoleToken('Foodcourt Manager'),
        ]);
        const started = Date.now();
        const pageR = runGate({ ...gate, cmd: ['node', 'scripts/headless-page-sweep.js'] }, { RA_TOKEN: ra, BG_TOKEN: bg });
        const rolesR = runGate({ ...gate, cmd: ['node', 'scripts/headless-roles-sweep.js'] },
          { FG_TOKEN: fg, OWNER_TOKEN: owner, SUPPLIER_TOKEN: supplier, BG_TOKEN: bg,
            ADMIN_TOKEN: admin || '', BM_TOKEN: bm || '', FCM_TOKEN: fcm || '' });
        r = {
          ok: pageR.ok && rolesR.ok, code: pageR.ok && rolesR.ok ? 0 : 1,
          out: '--- page-sweep (RA·BG) ---\n' + pageR.out + '\n--- roles-sweep (FG·Owner·Supplier·Admin·Manager) ---\n' + rolesR.out,
          ms: Date.now() - started,
        };
      } else {
        r = runGate(gate);
      }
    } catch (e) {
      r = { ok: false, code: -1, out: String(e.message || e), ms: 0 };
    }
    const effOk = r.ok || gate.advisory;                       // advisory 게이트는 실패해도 전체를 막지 않음(정보 출력)
    process.stdout.write('\r' + (effOk ? c.green('  ✓ ') : c.red('  ✗ ')) + gate.label + c.gray(` (${(r.ms / 1000).toFixed(1)}s)`) + '\n');
    if (gate.advisory) {
      // 정보성: 요약 줄만 노출 (Fable 게이트 판정 등)
      const lines = r.out.trim().split('\n').filter(Boolean);
      lines.slice(-6).forEach((l) => console.log(c.cyan('      ' + l)));
    } else if (!r.ok) {
      console.log(c.red(`      exit=${r.code}${r.timedOut ? ' (timeout)' : ''} — 출력 마지막 15줄:`));
      if (r.timedOut) {
        // 타임아웃은 "게이트 실패"가 아니라 **머신 부하**일 수 있다(2026-08-20 실측:
        // e2e 브라우저와 겹쳐 print-route-guard 가 300초를 넘겼는데 단독 실행은 34/34 통과).
        // 거짓 실패를 진짜 결함으로 오독하지 않도록 판단 힌트를 남긴다.
        console.log(c.yellow(`      ⏱ ${Math.round((gate.timeout || 0) / 1000)}초 초과 — 빌드·e2e·브라우저가 같이 돌고 있었는지 확인하고, 유휴 상태에서 단독 재실행해 볼 것.`));
      }
      r.out.trim().split('\n').slice(-15).forEach((l) => console.log(c.gray('      | ' + l)));
    }
    results.push({ gate, ...r, effOk });
  }

  const failed = results.filter((r) => !r.effOk);
  console.log('');
  if (failed.length) {
    console.log(c.red(c.bold(`✗ ${failed.length}/${results.length} 게이트 실패 — 완료 보고 금지, 수정 후 재실행`)));
    failed.forEach((f) => console.log(c.red(`   - ${f.gate.id}: ${f.gate.label}`)));
    console.log(c.gray('\n   각 게이트 단독 재실행: verify-all.js --only <id>  (--list 로 id 확인)'));
    process.exit(1);
  }
  console.log(c.green(c.bold(`✓ 전 게이트 통과 (${results.length}/${results.length})`)));
  const ranMount = selected.some((g) => g.id === 'mount');
  if (!ranMount) console.log(c.gray('   (프론트 변경 시: build:dev 후 --full 로 mount sweep 까지. 판단 검증(/검증 3·5·6단계)은 별도.)'));
  process.exit(0);
})();

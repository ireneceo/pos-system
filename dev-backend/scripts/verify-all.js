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
  { id: 'timezone', tier: 'static', label: '🕐 타임존 가드 (신규 위반 0)', cwd: BACKEND, cmd: ['node', 'scripts/timezone-check.js'] },
  { id: 'hydration', tier: 'static', label: '💧 state hydration 안전 (warning 0)', cwd: FRONTEND, cmd: ['node', 'scripts/state-hydration-check.js'] },
  { id: 'sensitive-diff', tier: 'static', label: '🧭 민감영역 diff 분류 (Fable 게이트 판정, 정보성)', cwd: BACKEND, cmd: ['node', 'scripts/check-sensitive-diff.js'], advisory: true },
  { id: 'inspection', tier: 'runtime', label: '🔎 인스펙션 하니스 (구조 불변식, 신규 위반 0)', cwd: BACKEND, cmd: ['node', 'scripts/inspection/run.js'] },
  { id: 'health', tier: 'runtime', label: '❤️ health-check 전체 회귀 (인쇄 계약+보안+API)', cwd: BACKEND, cmd: ['node', 'scripts/health-check.js', '--quiet'], timeout: 300000 },
  { id: 'print-routes', tier: 'runtime', label: '🖨️ 인쇄 라우트 가드 (자동인쇄 전 루트 실제 실행)', cwd: FRONTEND, cmd: ['node', 'scripts/print-route-guard/run.js', '--quiet'], timeout: 300000 },
  { id: 'i18n', tier: 'runtime', label: '🌐 i18n 4언어 키 일치', cwd: FRONTEND, cmd: ['node', 'scripts/verify-translations.js'] },
  { id: 'mount', tier: 'mount', label: '🖥️ 실브라우저 mount sweep (크래시0·console.error0)', cwd: FRONTEND, cmd: null /* 특수 처리: 토큰 자동조달 */, timeout: 600000 },
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
        const [ra, bg] = await Promise.all([fetchDemoToken('test_restaurant_admin'), fetchDemoToken('test_brand_general')]);
        r = runGate({ ...gate, cmd: ['node', 'scripts/headless-page-sweep.js'] }, { RA_TOKEN: ra, BG_TOKEN: bg });
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

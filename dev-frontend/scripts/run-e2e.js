#!/usr/bin/env node
/**
 * run-e2e.js — E2E 러너 래퍼 (demo 가드 강제 + 운영 도메인 차단)
 * 실행: cd /var/www/dev-frontend && node scripts/run-e2e.js [-- <playwright args>]
 *
 * `/검증 --e2e` 가 호출하는 진입점. Playwright 를 직접 부르기 전에:
 *   - baseURL 이 dev 인지 확인(운영이면 거부)
 *   - dev 백엔드 health 확인
 * 그 후 e2e/playwright.config.js 로 위임. E2E 는 opt-in(큰 변경 시)이며 배포 게이트가 아니다.
 */
const { spawnSync } = require('child_process');
const http = require('http');
const path = require('path');

const BASE = process.env.E2E_BASE_URL || 'https://dev.purplehere.com';
if (!BASE.includes('dev.purplehere.com')) {
  console.error(`✗ E2E 거부 — baseURL=${BASE} 이 dev 가 아님. 운영/기타 도메인 e2e 금지(CLAUDE.md).`);
  process.exit(1);
}

function devHealthy() {
  return new Promise((resolve) => {
    const req = http.get('http://localhost:3001/api/health', (res) => {
      let d = ''; res.on('data', (c) => (d += c)); res.on('end', () => resolve(d.includes('"status":"ok"')));
    });
    req.on('error', () => resolve(false));
    req.setTimeout(3000, () => req.destroy());
  });
}

(async () => {
  if (!(await devHealthy())) {
    console.error('✗ dev 백엔드(localhost:3001) 비정상 — e2e 중단. pm2 restart dev-backend 후 재시도.');
    process.exit(1);
  }
  const passthru = process.argv.slice(2);
  const cfg = path.join(__dirname, '..', 'e2e', 'playwright.config.js');
  console.log(`▶ E2E (demo id=38, sandbox only) — baseURL=${BASE}`);
  const r = spawnSync('npx', ['playwright', 'test', '-c', cfg, ...passthru], {
    cwd: path.join(__dirname, '..'), stdio: 'inherit',
    env: { ...process.env, E2E_BASE_URL: BASE },
  });
  process.exit(r.status == null ? 1 : r.status);
})();

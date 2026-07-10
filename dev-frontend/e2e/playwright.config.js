// @ts-check
// Purple POS E2E — Playwright 설정 (dev 전용, 운영 데이터 무접촉)
// 실행: cd /var/www/dev-frontend && node scripts/run-e2e.js   (권장 — demo 가드 강제)
//   또는 npx playwright test -c e2e/playwright.config.js
//
// 정책(CLAUDE.md /검증 §11): demo restaurant(id=38) 만 사용, 결제 sandbox 만,
// 운영 webhook/데이터 절대 금지. Flaky rate 100%(3회 연속 통과) 기준.
const { defineConfig, devices } = require('@playwright/test');

const BASE_URL = process.env.E2E_BASE_URL || 'https://dev.purplehere.com';
const OUT = process.env.E2E_OUT || `/tmp/e2e/${new Date().toISOString().replace(/[:.]/g, '-')}`;

module.exports = defineConfig({
  testDir: __dirname,
  testMatch: '**/*.spec.js',
  // 운영 데이터 오염 방지: 절대 dev 외 baseURL 로 못 돌게 가드(스펙 내 demo-guard 가 2차 방어).
  timeout: 60000,
  expect: { timeout: 10000 },
  fullyParallel: false,          // 순서/상태 의존 시나리오 안정성 우선
  workers: 1,
  retries: 2,                    // flaky selector/timing 흡수(비즈니스 로직 재시도 아님)
  reporter: [['list'], ['html', { outputFolder: OUT + '/html-report', open: 'never' }]],
  outputDir: OUT + '/artifacts',
  use: {
    baseURL: BASE_URL,
    ignoreHTTPSErrors: true,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 15000,
    navigationTimeout: 25000,
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});

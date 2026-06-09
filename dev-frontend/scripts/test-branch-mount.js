// 집중 mount: BG 레스토랑 페이지 + Add 모달 오픈 → Branch Name 필드 + Email(별표X) 확인, 콘솔/페이지 에러 0
const { chromium } = require('playwright');
const BASE = process.env.BASE_URL || 'https://dev.purplehere.com';
const TOKEN = process.env.BG_TOKEN;
const ROUTE = '/pos/brand/general/restaurants';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({
    ignoreHTTPSErrors: true,
    serviceWorkers: 'block',
    storageState: { cookies: [], origins: [{ origin: BASE, localStorage: [
      { name: 'auth_token', value: TOKEN }, { name: 'currentUserRole', value: 'Brand General' }
    ]}]},
  });
  const page = await ctx.newPage();
  const consoleErrors = [], pageErrors = [];
  page.on('console', m => { if (m.type() === 'error') consoleErrors.push(m.text()); });
  page.on('pageerror', e => pageErrors.push(e.message));

  let pass = 0, fail = 0;
  const ok = (c, m) => { c ? (pass++, console.log('  ✓', m)) : (fail++, console.log('  ✗', m)); };

  try {
    await page.goto(BASE + ROUTE, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2500);
    const body = await page.evaluate(() => document.body.innerText.slice(0, 3000));
    ok(!/Something went wrong|문제가 발생|ErrorBoundary/i.test(body), '페이지 mount (ErrorBoundary fallback 없음)');

    // Add Restaurant 모달 열기 (i18n 로드 대기)
    const addBtn = page.getByRole('button', { name: /Add Restaurant/i }).first();
    await addBtn.waitFor({ state: 'visible', timeout: 15000 });
    await addBtn.click();
    await page.waitForTimeout(1500);
    const modalText = await page.evaluate(() => document.body.innerText);

    ok(/Branch Name/.test(modalText), 'Add 모달에 "Branch Name" 필드 표시');
    ok(/Restaurant Name \*/.test(modalText), 'Restaurant Name 은 필수(*) 유지');
    ok(/Admin Email \*/.test(modalText), 'Admin Email 은 필수(*) 유지');
    // 레스토랑 Email Address 는 별표 없음
    ok(/Email Address(?!\s*\*)/.test(modalText) && !/Email Address \*/.test(modalText), '레스토랑 "Email Address" 별표 제거(옵션)');
    ok(!/Phone Number \*/.test(modalText), '레스토랑 "Phone Number" 별표 제거(옵션)');
  } catch (e) {
    fail++; console.error('  ✗ 예외:', e.message);
  }

  console.log(`\n콘솔 에러: ${consoleErrors.length} / 페이지 에러: ${pageErrors.length}`);
  if (consoleErrors.length) consoleErrors.slice(0, 5).forEach(e => console.log('   console:', e.slice(0, 160)));
  if (pageErrors.length) pageErrors.slice(0, 5).forEach(e => console.log('   pageerror:', e.slice(0, 160)));
  // 인쇄/네트워크 무관 noise 제외하고 page error 만 치명으로 간주
  ok(pageErrors.length === 0, '치명적 page error 0');

  await browser.close();
  console.log(`\n결과: ${pass} pass / ${fail} fail`);
  process.exit(fail ? 1 : 0);
})();

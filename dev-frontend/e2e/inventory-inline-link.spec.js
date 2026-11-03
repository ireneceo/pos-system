// 브랜드 재고 목록 «그 자리에서 공급처 연결» + 공급업체 필터 (2026-11-03 Irene «여기서 바로 바로 연결하게 해줘. 이동시키지 말고»)
// dev 전용, 읽기만 한다(연결 창을 열고 닫기만 · 저장 안 함).
const fs = require('fs');
const { test, expect } = require('@playwright/test');
const { storageStateFor } = require('./fixtures/demo-guard');

test('브랜드 재고 목록: Link 는 이동하지 않고 연결 창을 연다 · 공급업체 필터가 있다', async ({ browser, baseURL }) => {
  const f = process.env.INV_TOKEN_FILE;
  test.skip(!f, '토큰 파일 없음');
  const { token } = JSON.parse(fs.readFileSync(f, 'utf8'));
  const ctx = await browser.newContext({ storageState: storageStateFor(baseURL, token, 'Brand General'), ignoreHTTPSErrors: true });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push('pageerror: ' + e.message));

  await page.goto('/pos/brand-inventory?tab=list', { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => document.body.innerText.includes('No supplier linked'), null, { timeout: 30000 });
  await page.waitForTimeout(1000);

  // 공급업체 필터: «All Suppliers» + 연결 없음 개수
  const sel = page.locator('select[aria-label="Supplier"]');
  await expect(sel).toHaveCount(1);
  const opts = await sel.locator('option').allTextContents();
  console.log('[inline-link] supplier options:', JSON.stringify(opts));
  expect(opts[0]).toBe('All Suppliers');
  expect(opts.some(o => /^No supplier linked \(\d+\)$/.test(o))).toBe(true);

  // «연결 없음» 으로 좁히면 Order 버튼이 없고 Link 만 있다
  const noneOpt = opts.find(o => o.startsWith('No supplier linked'));
  await sel.selectOption({ label: noneOpt });
  await page.waitForTimeout(500);
  const linkBtns = page.locator('button', { hasText: /^Link$/ });
  const nLink = await linkBtns.count();
  const nOrder = await page.locator('button', { hasText: /^Order$/ }).count();
  console.log(`[inline-link] none-filter: Link ${nLink} · Order ${nOrder}`);
  expect(nLink).toBeGreaterThan(0);

  // Link → 주소 그대로 + 연결 창(카탈로그 검색) 뜸
  const before = page.url();
  await linkBtns.first().click();
  await page.waitForTimeout(1500);
  expect(page.url(), '다른 화면으로 이동하지 않음').toBe(before);
  const dialogText = await page.evaluate(() => document.body.innerText);
  const opened = /Connect|Link supplier|Search/i.test(dialogText);
  await page.screenshot({ path: process.env.SHOT || '/tmp/inline-link.png', fullPage: false });
  expect(opened).toBe(true);
  expect(errors, errors.join('\n')).toHaveLength(0);
  await ctx.close();
});

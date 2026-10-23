/**
 * 공급업체 상품 삭제 흐름 — 실제 클릭 (2026-10-23 · Fable 설계 supplier-product-delete §5 실브라우저)
 *   전체 상품 탭 → [확인용] 상품 Delete → 확인 → 교체 창 → 다른 상품 고르기 → Preview → Switch & delete → Done
 *   데모 매장 38 · TOKENS_FILE 의 ra 토큰 · 환경 PRODUCT / TARGET 이름
 */
const { chromium } = require('playwright');
const T = require(process.env.TOKENS_FILE);
const BASE = 'https://dev.purplehere.com';
const PRODUCT = process.env.PRODUCT;
const TARGET = process.env.TARGET;

(async () => {
  const b = await chromium.launch({ headless: true });
  const ctx = await b.newContext({ ignoreHTTPSErrors: true, serviceWorkers: 'block', viewport: { width: 1400, height: 900 },
    storageState: { cookies: [], origins: [{ origin: BASE, localStorage: [
      { name: 'auth_token', value: T.ra }, { name: 'currentUserRole', value: 'Restaurant Admin' }] }] } });
  const p = await ctx.newPage();
  const errors = [];
  p.on('pageerror', e => errors.push(e.message));
  p.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  const step = async (label, fn) => { try { await fn(); console.log(`✓ ${label}`); return true; } catch (e) { console.log(`✗ ${label}: ${e.message.split('\n')[0].slice(0, 120)}`); return false; } };
  let ok = true;
  await p.goto(`${BASE}/pos/suppliers?tab=products`, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await p.waitForTimeout(4000);
  ok = await step('검색', async () => { await p.getByPlaceholder(/search/i).first().fill(PRODUCT); await p.waitForTimeout(2500); }) && ok;
  const row = p.locator('tr', { hasText: PRODUCT }).first();
  ok = await step('행에 Delete 버튼', async () => { await row.getByRole('button', { name: 'Delete' }).click({ timeout: 8000 }); }) && ok;
  ok = await step('확인창 → Delete', async () => { await p.getByRole('button', { name: 'Delete' }).last().click({ timeout: 5000 }); await p.waitForTimeout(2000); }) && ok;
  ok = await step('교체 창이 뜸', async () => { await p.getByText(/Switch stock items to another product/).waitFor({ timeout: 6000 }); }) && ok;
  await p.screenshot({ path: process.env.SHOT_DIR + '/spdel-1-replace.png' });
  ok = await step('대신 쓸 상품 고르기', async () => {
    const inp = p.getByPlaceholder(/Search the product to use instead/);
    await inp.click(); await inp.fill(TARGET.slice(-6)); await p.waitForTimeout(800);
    await p.getByText(TARGET, { exact: true }).last().click({ timeout: 5000 });
  }) && ok;
  ok = await step('Preview', async () => { await p.getByRole('button', { name: 'Preview' }).click(); await p.getByText(/Preview — nothing is changed/).waitFor({ timeout: 6000 }); }) && ok;
  await p.screenshot({ path: process.env.SHOT_DIR + '/spdel-2-preview.png' });
  ok = await step('Switch & delete → Done', async () => { await p.getByRole('button', { name: 'Switch & delete' }).click(); await p.getByText(/Done — the product was deleted/).waitFor({ timeout: 8000 }); }) && ok;
  await p.screenshot({ path: process.env.SHOT_DIR + '/spdel-3-done.png' });
  ok = await step('닫으면 목록에서 사라짐', async () => {
    await p.getByRole('button', { name: 'Close' }).last().click(); await p.waitForTimeout(2500);
    const n = await p.locator('tr', { hasText: PRODUCT }).count(); if (n) throw new Error('still listed ' + n);
  }) && ok;
  const real = errors.filter(e => !/favicon|Failed to load resource.*(404|409)/i.test(e));
  console.log(`화면 오류 ${real.length}건${real.length ? ': ' + real.slice(0, 3).join(' | ') : ''}`);
  await b.close();
  process.exit(ok && real.length === 0 ? 0 : 1);
})();

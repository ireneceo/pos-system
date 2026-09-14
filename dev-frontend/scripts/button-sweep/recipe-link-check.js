/**
 * 레시피 태그를 «눌렀을 때» 그 레시피가 검색된 화면으로 가는지 — 실제 클릭으로 확인.
 * 개발서버엔 브랜드 메뉴가 0건이라 목록 응답만 가로챈다(데이터 무변경).
 */
const { chromium } = require('playwright');
const T = require(process.env.TOKENS_FILE);
const BASE = 'https://dev.purplehere.com';
const RECIPE = '불고기 양념육 레시피';
const FAKE = [{
  id: 9001, brand_id: 1, name: 'Bulgogi Set', description: null, image_url: null, emoji: null,
  recommended_price: 25.9, currency: 'MYR', version: 1, distribution_mode: 'manual', scope_mode: 'all',
  sort_order: 0, recipe_id: 77, is_set_menu: false, set_items: null,
  locks: { name: false, price: false, category: false, image: false, options: false },
  category: { id: 1, name: 'Meals', emoji: null },
  linkedRecipe: { id: 77, name: RECIPE },
  distribution: { in_sync: 1, pending_update: 0, unlinked: 0 },
}];

(async () => {
  const b = await chromium.launch({ headless: true });
  const ctx = await b.newContext({ ignoreHTTPSErrors: true, serviceWorkers: 'block',
    storageState: { cookies: [], origins: [{ origin: BASE, localStorage: [
      { name: 'auth_token', value: T.bg }, { name: 'currentUserRole', value: 'Brand General' }] }] } });
  const p = await ctx.newPage();
  await p.route('**/api/brand-menus?**', r => r.fulfill({ status: 200, contentType: 'application/json',
    body: JSON.stringify({ success: true, data: FAKE }) }));
  await p.goto(`${BASE}/pos/brand-menus`, { waitUntil: 'domcontentloaded', timeout: 25000 });
  await p.waitForTimeout(4500);

  const before = p.url();
  await p.getByRole('button', { name: new RegExp(RECIPE) }).first().click({ timeout: 5000 })
    .catch(e => console.log('   클릭 실패:', e.message.split('\n')[0].slice(0, 70)));
  await p.waitForTimeout(3500);
  const after = p.url();
  const moved = /\/pos\/recipes/.test(after);
  const hasSearch = decodeURIComponent(after).includes(`search=${RECIPE}`);
  // 화면의 검색칸에 실제로 그 값이 들어갔는지
  const inBox = await p.evaluate((q) => Array.from(document.querySelectorAll('input'))
    .some(i => (i.value || '').includes(q)), RECIPE).catch(() => false);
  console.log(`① 레시피 화면으로 이동   : ${moved ? '✓' : '✗'} (${after.replace(BASE, '')})`);
  console.log(`② 주소에 검색어 포함     : ${hasSearch ? '✓' : '✗'}`);
  console.log(`③ 검색칸에 값이 들어감   : ${inBox ? '✓' : '✗'}`);
  await b.close();
  process.exit(moved && hasSearch && inBox ? 0 : 1);
})();

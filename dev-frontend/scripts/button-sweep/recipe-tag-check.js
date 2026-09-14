/**
 * 브랜드 메뉴 카드에 «연결된 레시피» 가 실제로 그려지는지 — 개발서버엔 브랜드 메뉴가 0건이라
 * 목록 응답만 가로채 화면 렌더를 확인한다(데이터 무변경).
 *   ① 레시피가 연결된 메뉴 → 레시피 이름이 보여야 한다
 *   ② 연결이 없는 메뉴   → «레시피 없음» 이 보여야 한다 (음성 대조)
 */
const { chromium } = require('playwright');
const T = require(process.env.TOKENS_FILE);
const BASE = 'https://dev.purplehere.com';

const mk = (id, name, cat, recipe, price) => ({
  id, brand_id: 1, name, description: null, image_url: null, emoji: null,
  recommended_price: price, currency: 'MYR', version: 1, distribution_mode: 'manual', scope_mode: 'all',
  sort_order: id, recipe_id: recipe ? recipe.id : null, is_set_menu: false, set_items: null,
  locks: { name: false, price: false, category: false, image: false, options: false },
  category: { id: 1, name: cat, emoji: null },
  linkedRecipe: recipe,
  distribution: { in_sync: 2, pending_update: 0, unlinked: 0 },
});
const FAKE = [
  mk(9001, 'Bulgogi Set', 'Meals', { id: 77, name: '불고기 양념육 레시피' }, 25.9),
  mk(9002, 'Iced Americano', 'Drinks', null, 8),
];

(async () => {
  const b = await chromium.launch({ headless: true });
  const ctx = await b.newContext({ ignoreHTTPSErrors: true, serviceWorkers: 'block',
    storageState: { cookies: [], origins: [{ origin: BASE, localStorage: [
      { name: 'auth_token', value: T.bg }, { name: 'currentUserRole', value: 'Brand General' }] }] } });
  const p = await ctx.newPage();
  await p.route('**/api/brand-menus?**', r => r.fulfill({ status: 200, contentType: 'application/json',
    body: JSON.stringify({ success: true, data: FAKE }) }));
  await p.goto(`${BASE}/pos/brand-menus`, { waitUntil: 'domcontentloaded', timeout: 25000 });
  await p.waitForTimeout(5000);
  const text = await p.evaluate(() => (document.body.innerText || '').replace(/\s+/g, ' '));
  const hasName = text.includes('불고기 양념육 레시피');
  const hasNone = /레시피 없음|No recipe/.test(text);
  console.log(`① 연결된 메뉴에 레시피 이름 표시 : ${hasName ? '✓ 보임' : '✗ 안 보임'}`);
  console.log(`② 연결 없는 메뉴에 «레시피 없음» : ${hasNone ? '✓ 보임' : '✗ 안 보임'}`);
  if (!hasName || !hasNone) console.log('   화면글:', text.slice(0, 400));
  await b.close();
  process.exit(hasName && hasNone ? 0 : 1);
})();

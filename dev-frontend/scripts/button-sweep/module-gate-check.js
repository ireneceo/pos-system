/**
 * 요금제 모듈 문(門) 양방향 검증 — 데이터는 안 건드리고 «허용목록 응답»만 가로챈다.
 *  ① 브랜드 총괄 + 모듈에 recipe_management 없음 → /pos/recipes 가 **열려야** 한다 (2026-09-13 고침)
 *  ② 매장 관리자 + 모듈에 recipe_management 없음 → /pos/recipes 는 **막혀야** 한다 (무료 등급 차단 유지 = 반증)
 */
const { chromium } = require('playwright');
const T = require(process.env.TOKENS_FILE);
const BASE = 'https://dev.purplehere.com';

const MODULES_WITHOUT_RECIPE = [
  'brand_dashboard', 'brand_management', 'brand_reports', 'brand_menus',
  'brand_products', 'brand_product_recipes', 'brand_recipes', 'brand_inventory'
];
const ALLOWED_ROUTES = ['/pos/brand/general/dashboard', '/pos/recipes', '/pos/brand-menus', '/pos/brand-product-recipes',
                        '/pos/stock-ledger', '/restaurant/:restaurantId/dashboard'];

async function run(label, token, role, expectOpen) {
  const b = await chromium.launch({ headless: true });
  const ctx = await b.newContext({ ignoreHTTPSErrors: true, serviceWorkers: 'block',
    storageState: { cookies: [], origins: [{ origin: BASE, localStorage: [
      { name: 'auth_token', value: token }, { name: 'currentUserRole', value: role }] }] } });
  const page = await ctx.newPage();
  // 요금제 허용목록만 바꿔치기 — «요금제는 있는데 레시피 모듈은 없는» 상태를 만든다.
  await page.route('**/allowed-routes*', route => route.fulfill({
    status: 200, contentType: 'application/json',
    body: JSON.stringify({ entity_type: 'x', plan_type: 'Enterprise', subscription_status: 'active',
      included_modules: MODULES_WITHOUT_RECIPE, allowed_routes: ALLOWED_ROUTES }),
  }));
  await page.goto(`${BASE}/pos/recipes`, { waitUntil: 'domcontentloaded', timeout: 25000 });
  await page.waitForTimeout(4000);
  const url = await page.evaluate(() => location.pathname);
  const open = url === '/pos/recipes';
  const ok = open === expectOpen;
  console.log(`${ok ? '✓' : '✗'} ${label}: /pos/recipes → ${url} (${open ? '열림' : '튕김'}) · 기대 ${expectOpen ? '열림' : '튕김'}`);
  await b.close();
  return ok;
}

(async () => {
  const r1 = await run('브랜드 총괄(모듈 없음)', T.bg, 'Brand General', true);
  const r2 = await run('매장 관리자(모듈 없음)', T.ra_demo, 'Restaurant Admin', false);
  console.log(`\n판정: ${r1 && r2 ? '2/2 — 브랜드는 열리고, 무료 등급 매장 차단은 그대로' : '실패'}`);
  process.exit(r1 && r2 ? 0 : 1);
})();

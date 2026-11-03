// @ts-check
/**
 * recipe-list-speed.spec.js — 레시피 목록이 «느린 선택기 목록» 을 기다리지 않고 바로 뜨는가
 * -------------------------------------------------------------------------------
 * 2026-11-03 Irene «레시피 목록 로딩이 너무 느려 … 첫 페이지나 일부 나오게 해서 바로 바로 데이터 나오게».
 * Fable 설계(docs/RECIPE_MANAGEMENT_SYSTEM.md «레시피 목록 속도» · PERFORMANCE_OPTIMIZATION_PLAN.md §7):
 *   critical(레시피·분류) 만 첫 화면을 붙잡고, deferred(재료·재고아이템·브랜드 상품)는 뒤에 온다.
 *   deferred 가 오기 전 편집 창은 «Loading ingredients…» + 저장 잠금(원가 0 덮어쓰기 길 차단).
 *
 * 증명 방법: 브라우저에서 deferred 요청 둘(/api/product-ingredients · /api/brands/:id/products)을
 * 4초 붙잡아 둔 채로 ① 카드가 그 전에 보이는지 ② 그 사이 새 레시피 창의 저장이 잠기는지
 * ③ 풀린 뒤 잠금이 풀리는지 본다. 쓰기 없음(창만 열고 닫음) — 데모 브랜드 dev 전용.
 */
const { test, expect } = require('@playwright/test');
const { DEMO_KEYS, demoLogin, assertDevBaseURL, apiBase, injectAuth, authHeaders } = require('./fixtures/demo-guard');

const HOLD_MS = 4000;

test.describe('레시피 목록 — 첫 화면은 선택기 목록을 기다리지 않는다', () => {
  test('카드가 먼저 뜨고, 선택기 도착 전엔 저장이 잠긴다', async ({ page, context, request, baseURL }) => {
    assertDevBaseURL(baseURL);
    const API = apiBase(baseURL);
    let token, user;
    if (process.env.E2E_BG_TOKEN) {
      token = process.env.E2E_BG_TOKEN;
      user = { role: 'Brand General', brand_id: Number(process.env.E2E_BRAND_ID) };
    } else {
      ({ token, user } = await demoLogin(request, baseURL, DEMO_KEYS.brand));
    }
    const brandId = Number(user.brand_id);
    expect(brandId, 'BG 가 여는 브랜드가 있어야 한다').toBeTruthy();

    // 이 브랜드 레시피 중 첫 번째 이름 — 카드가 떴는지 볼 표지
    const rRes = await request.get(`${API}/brands/${brandId}/recipes`, { headers: authHeaders(token) });
    expect(rRes.ok()).toBeTruthy();
    const recipes = (await rRes.json()).data || [];
    test.skip(recipes.length === 0, '데모 브랜드에 레시피가 없어 증명할 수 없음');
    const firstName = recipes[0].name;

    // deferred 요청을 붙잡는다 — 풀린 시각을 기록해 «카드가 그 전에 보였는가» 를 판정한다
    let releasedAt = 0;
    const hold = async (route) => {
      await new Promise((r) => setTimeout(r, HOLD_MS));
      releasedAt = Date.now();
      await route.continue();
    };
    await page.route('**/api/product-ingredients', hold);
    await page.route(`**/api/brands/${brandId}/products`, hold);

    await injectAuth(context, token, user.role || 'Brand General');
    const t0 = Date.now();
    await page.goto(`/pos/recipes?tab=recipes&brandId=${brandId}`, { waitUntil: 'domcontentloaded' });

    // ① 카드가 deferred 풀리기 전에 보인다
    await expect(page.getByText(firstName, { exact: false }).first()).toBeVisible({ timeout: HOLD_MS - 500 });
    const cardAt = Date.now();
    expect(releasedAt, '카드가 보인 시점엔 선택기 목록이 아직 붙잡혀 있어야 한다').toBe(0);
    console.log(`      카드 보임 ${cardAt - t0}ms (선택기 목록은 ${HOLD_MS}ms 붙잡힘)`);

    // ② 그 사이 새 레시피 창 — 안내 문구 + 저장 잠금
    await page.getByRole('button', { name: 'New Recipe' }).click();
    const save = page.getByRole('button', { name: 'Create Recipe' });
    await expect(save).toBeVisible();
    expect(releasedAt, '창을 연 시점에도 선택기 목록은 아직 붙잡혀 있어야 한다').toBe(0);
    await expect(save).toBeDisabled();
    await expect(page.getByRole('status').filter({ hasText: /Loading ingredients|재료 목록을 불러오는 중/ })).toBeVisible();

    // ③ 풀린 뒤 — 문구 사라지고 저장 풀림
    await expect(save).toBeEnabled({ timeout: HOLD_MS + 5000 });
    expect(releasedAt).toBeGreaterThan(0);
    await expect(page.getByRole('status').filter({ hasText: /Loading ingredients|재료 목록을 불러오는 중/ })).toHaveCount(0);
  });
});

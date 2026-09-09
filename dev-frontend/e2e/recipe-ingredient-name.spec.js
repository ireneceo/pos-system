// @ts-check
/**
 * recipe-ingredient-name.spec.js — 브랜드 레시피의 재료명·줄 원가가 화면에 제대로 뜨는가
 * -------------------------------------------------------------------------------
 * 2026-09-09 Irene 신고: "브랜드레시피 넣을 때 재료 골라서 넣어도 레시피 보기에 재료명이
 * 제대로 안 나오고, 계산되는 개별 코스트도 제대로 저장 안 되고 제대로 안 보인다."
 *
 * 원인(운영 실측): 저장된 레시피 줄은 **거울 재료**를 가리키는데(브랜드 레시피 337줄 중 334줄),
 * 화면이 이름·원가를 «선택기 목록»에서 다시 찾았고 그 목록은 거울을 빼고 만든다 →
 * 이름이 «Ingredient #123», 줄 원가·합계가 0. 그 상태로 저장하면 원가가 0 으로 덮였다.
 *
 * 이 시나리오는 거울 재료를 쓰는 레시피를 실제로 만들고, 브라우저에서 열어
 *   ① 재료명이 «Ingredient #숫자» 가 아니라 진짜 이름으로 뜨는지
 *   ② 줄 원가가 0 이 아닌지
 * 를 본다. 데이터는 dev 브랜드에만 만들고 끝나면 지운다(운영 무접촉).
 */
const { test, expect } = require('@playwright/test');
const { DEMO_KEYS, demoLogin, assertDevBaseURL, apiBase, injectAuth, authHeaders } = require('./fixtures/demo-guard');
const { execFileSync } = require('child_process');

/**
 * «옛 레시피가 원가 0 으로 저장돼 있는» 상태를 만든다.
 * 2026-09-09 부터 저장 라우트가 서버에서 원가를 계산하므로 API 로는 이 상태를 만들 수 없다.
 * 못 만들면 «저장값이 0 이어도 화면은 제 값» 을 증명할 수 없어 헛테스트가 된다.
 * 스크립트에 dev DB · E2E-/TMP- 이름 두 겹의 안전 레일이 있다.
 */
function damageRecipeCost(recipeId) {
  const out = execFileSync('node', ['scripts/e2e-damage-recipe-cost.js', String(recipeId)],
    { cwd: '/var/www/dev-backend', encoding: 'utf8' });
  if (!/손상 주입 완료/.test(out)) throw new Error('손상 주입 실패: ' + out);
}

test.describe('브랜드 레시피 — 재료명·줄 원가 표시', () => {
  test('거울 재료를 쓰는 레시피도 이름과 원가가 제대로 보인다', async ({ page, context, request, baseURL }) => {
    assertDevBaseURL(baseURL);
    const API = apiBase(baseURL);
    // demo-login(test_brand_general)은 그 계정이 닿는 매장에 실매장이 섞여 있으면 403 이다
    // (공개 데모 로그인 게이트, 정상 동작). 그래서 **데모 브랜드 BG 토큰**을 밖에서 받아 쓴다.
    let token, user;
    if (process.env.E2E_BG_TOKEN) {
      token = process.env.E2E_BG_TOKEN;
      user = { role: 'Brand General', brand_id: Number(process.env.E2E_BRAND_ID) };
    } else {
      ({ token, user } = await demoLogin(request, baseURL, DEMO_KEYS.brand));
    }
    const H = authHeaders(token);

    // 대상 브랜드 — 이 BG 가 실제로 여는 브랜드
    const brandsRes = await request.get(`${API}/brands`, { headers: H });
    expect(brandsRes.ok()).toBeTruthy();
    const brandsBody = await brandsRes.json();
    const brands = brandsBody.data || brandsBody || [];
    const brandId = Number(user.brand_id) || Number(brands[0]?.id);
    expect(brandId, 'BG 가 여는 브랜드가 있어야 한다').toBeTruthy();

    // 재고아이템(Stock Item) 하나 — 선택기가 내놓는 «원본»
    const piRes = await request.get(`${API}/product-ingredients`, { headers: H });
    expect(piRes.ok()).toBeTruthy();
    // 원가가 0 인 아이템을 고르면 «원가가 보인다» 를 증명할 수 없다 — 0 초과인 것만 쓴다.
    const stock = ((await piRes.json()).data || [])
      .filter((i) => i.is_active && parseFloat(i.unit_cost) > 0)[0];
    expect(stock, '원가가 있는 재고아이템이 하나는 있어야 한다').toBeTruthy();

    // 선택기에서 재고아이템을 골라 저장한 것과 같은 요청(F4) — 서버가 거울을 만들어 붙인다
    const recipeName = `E2E-MIRROR-${Date.now()}`;
    const createRes = await request.post(`${API}/brands/${brandId}/recipes`, {
      headers: H,
      data: {
        name: recipeName,
        yield_amount: 1,
        yield_unit: 'portion',
        // 화면이 «0 을 보내는» 상황을 그대로 만든다 — 옛 화면·옛 캐시 번들이 하던 짓이고,
        // 운영에 zerocost 21줄을 남긴 경로다. 2026-09-09 부터 **서버가 재료 단가로 계산**하므로
        // 0 을 보내도 0 이 저장되지 않아야 한다(utils/recipeCost.js).
        ingredients: [{ product_ingredient_id: stock.id, quantity: 2, unit: stock.unit, cost: 0 }],
      },
    });
    expect(createRes.ok()).toBeTruthy();
    const recipeId = (await createRes.json()).data?.id;
    expect(recipeId).toBeTruthy();

    try {
      // 저장된 줄이 정말 «거울» 을 가리키는지 확인 — 이 전제가 깨지면 시나리오가 의미 없다
      const listRes = await request.get(`${API}/brands/${brandId}/recipes`, { headers: H });
      const saved = ((await listRes.json()).data || []).find((r) => r.id === recipeId);
      const line = saved?.recipeIngredients?.[0];
      expect(line, '저장된 재료 줄이 있어야 한다').toBeTruthy();
      const isMirror = !!(line.ingredient?.source_product_ingredient_id || line.ingredient?.source_brand_product_id);
      expect(isMirror, '이 줄은 거울 재료를 가리켜야 한다(신고 상황 재현)').toBeTruthy();
      const expectedCost = 2 * (parseFloat(stock.unit_cost) / (parseFloat(stock.base_quantity) || 1));
      // 서버가 계산해 넣었으므로 여기서는 제 값이다 — 그것부터 확인한다(새 계약).
      expect(Number(line.cost), '서버가 재료 단가로 계산한 값이 저장돼야 한다').toBeCloseTo(expectedCost, 2);

      // 이제 **옛 결함이 운영에 남긴 상태**(cost 0)를 그대로 만든다(운영 zerocost 21줄).
      damageRecipeCost(recipeId);
      const damagedRes = await request.get(`${API}/brands/${brandId}/recipes`, { headers: H });
      const damaged = ((await damagedRes.json()).data || []).find((r) => r.id === recipeId);
      expect(Number(damaged.recipeIngredients[0].cost), '손상 주입 후 저장값은 0 이어야 한다').toBe(0);
      expect(Number(damaged.total_ingredient_cost), '손상 주입 후 합계도 0 이어야 한다').toBe(0);

      // 화면에서 확인
      await injectAuth(context, token, user.role || 'Brand General');
      // 화면은 `?brandId=` 가 없으면 **이 사용자의 첫 브랜드**를 고른다(RecipeManagementPage:88).
      // 브랜드를 여러 개 가진 소유자면 시나리오가 만든 브랜드와 화면이 어긋나 «레시피가 없다» 로 실패한다
      // (2026-09-09 실측: 데모 BG 가 브랜드 2개 소유 → 화면은 다른 브랜드를 띄웠다).
      await page.goto(`/pos/recipes?brandId=${brandId}`, { waitUntil: 'domcontentloaded' });
      await expect(page.getByText(recipeName).first()).toBeVisible({ timeout: 20000 });

      // 카드를 열어 상세(보기)로 들어간다
      await page.getByText(recipeName).first().click();

      // 모달이 실제로 열렸는지부터 확인한다 — 안 열렸는데 통과하면 헛테스트다.
      const modal = page.locator('div').filter({ hasText: /^Ingredients/ }).last();
      await expect(page.getByText('Ingredients', { exact: false }).first())
        .toBeVisible({ timeout: 15000 });
      await page.waitForTimeout(800);

      const body = await page.locator('body').innerText();
      // ① 이름이 «Ingredient #숫자» 로 깨지지 않는다 (수정 전이면 여기서 걸린다)
      expect(body, '재료명이 «Ingredient #숫자» 로 뜨면 안 된다').not.toMatch(/Ingredient #\d+/);
      // ② 재료의 진짜 이름이 보인다
      expect(body, '재료의 진짜 이름이 보여야 한다').toContain(String(stock.name).trim());
      // ③ 저장값이 0 이어도 화면 원가는 재료 단가로 다시 더한 제 값이어야 한다
      const shown = expectedCost.toFixed(2);
      expect(Number(shown), '기대 줄 원가 자체가 0 이면 시나리오가 무의미하다').toBeGreaterThan(0);
      expect(body, `줄 원가 ${shown} 이 화면에 보여야 한다(저장값 0 이어도)`).toContain(shown);
    } finally {
      await request.delete(`${API}/brands/${brandId}/recipes/${recipeId}`, { headers: H }).catch(() => {});
    }
  });

  /**
   * 저장 경로 — «열어서 저장만 해도 원가가 0 으로 덮이던» 사고의 반대 방향 확인.
   * 원가가 0 으로 망가진 레시피를 화면에서 열어 그대로 저장하면, DB 의 줄 원가·합계가
   * **제 값으로 복구**돼야 한다(옛 코드에서는 0 이 그대로 다시 저장됐다).
   */
  test('망가진 레시피를 열어 저장하면 DB 원가가 복구된다', async ({ page, context, request, baseURL }) => {
    assertDevBaseURL(baseURL);
    const API = apiBase(baseURL);
    let token, user;
    if (process.env.E2E_BG_TOKEN) {
      token = process.env.E2E_BG_TOKEN;
      user = { role: 'Brand General', brand_id: Number(process.env.E2E_BRAND_ID) };
    } else {
      ({ token, user } = await demoLogin(request, baseURL, DEMO_KEYS.brand));
    }
    const H = authHeaders(token);
    const brandId = Number(user.brand_id);

    const piRes = await request.get(`${API}/product-ingredients`, { headers: H });
    const stock = ((await piRes.json()).data || [])
      .filter((i) => i.is_active && parseFloat(i.unit_cost) > 0)[0];
    expect(stock, '원가가 있는 재고아이템이 하나는 있어야 한다').toBeTruthy();

    const recipeName = `E2E-RESAVE-${Date.now()}`;
    const createRes = await request.post(`${API}/brands/${brandId}/recipes`, {
      headers: H,
      data: {
        name: recipeName, yield_amount: 1, yield_unit: 'portion',
        ingredients: [{ product_ingredient_id: stock.id, quantity: 2, unit: stock.unit, cost: 0 }],
      },
    });
    expect(createRes.ok()).toBeTruthy();
    const recipeId = (await createRes.json()).data?.id;

    try {
      // 저장 라우트가 서버 계산으로 바뀐 뒤로는 API 로 0 을 만들 수 없다 — 직접 박는다.
      damageRecipeCost(recipeId);
      await injectAuth(context, token, user.role || 'Brand General');
      // 화면은 `?brandId=` 가 없으면 **이 사용자의 첫 브랜드**를 고른다(RecipeManagementPage:88).
      // 브랜드를 여러 개 가진 소유자면 시나리오가 만든 브랜드와 화면이 어긋나 «레시피가 없다» 로 실패한다
      // (2026-09-09 실측: 데모 BG 가 브랜드 2개 소유 → 화면은 다른 브랜드를 띄웠다).
      await page.goto(`/pos/recipes?brandId=${brandId}`, { waitUntil: 'domcontentloaded' });
      await expect(page.getByText(recipeName).first()).toBeVisible({ timeout: 20000 });
      // 카드 = 이 레시피 제목과 Edit 버튼을 **둘 다** 품은 가장 안쪽 div
      const card = page.locator('div')
        .filter({ has: page.getByText(recipeName) })
        .filter({ has: page.getByRole('button', { name: 'Edit' }) })
        .last();

      // 편집 열기 → 아무것도 바꾸지 않고 저장
      await card.getByRole('button', { name: 'Edit' }).first().click();
      await expect(page.getByRole('button', { name: 'Update Recipe' })).toBeVisible({ timeout: 15000 });
      await page.getByRole('button', { name: 'Update Recipe' }).click();
      await expect(page.getByRole('button', { name: 'Update Recipe' })).toBeHidden({ timeout: 15000 });

      // DB 확인 — 0 이던 원가가 재료 단가 기준으로 복구돼야 한다
      const after = await request.get(`${API}/brands/${brandId}/recipes`, { headers: H });
      const saved = ((await after.json()).data || []).find((r) => r.id === recipeId);
      const expected = 2 * (parseFloat(stock.unit_cost) / (parseFloat(stock.base_quantity) || 1));
      expect(Number(saved.recipeIngredients?.[0]?.cost), '줄 원가가 DB 에 복구돼야 한다')
        .toBeCloseTo(expected, 2);
      expect(Number(saved.total_ingredient_cost), '합계도 DB 에 복구돼야 한다')
        .toBeCloseTo(expected, 2);
    } finally {
      await request.delete(`${API}/brands/${brandId}/recipes/${recipeId}`, { headers: H }).catch(() => {});
    }
  });

  /**
   * 프로덕트 레시피(/pos/brand-product-recipes) — 같은 결함의 다른 발현.
   * 여기선 거울이 아니라 **비활성 재료**가 선택기 목록에서 빠져 이름·원가가 깨졌다.
   * 운영 실측: 재고아이템 #307 #308 이 비활성인데 저장된 줄 원가는 10.50 · 3.75 였다.
   */
  test('비활성 재료를 쓰는 프로덕트 레시피도 이름과 원가가 제대로 보인다', async ({ page, context, request, baseURL }) => {
    assertDevBaseURL(baseURL);
    const API = apiBase(baseURL);
    let token, user;
    if (process.env.E2E_BG_TOKEN) {
      token = process.env.E2E_BG_TOKEN;
      user = { role: 'Brand General', brand_id: Number(process.env.E2E_BRAND_ID) };
    } else {
      ({ token, user } = await demoLogin(request, baseURL, DEMO_KEYS.brand));
    }
    const H = authHeaders(token);
    const brandId = Number(user.brand_id);

    const piRes = await request.get(`${API}/product-ingredients`, { headers: H });
    const ing = ((await piRes.json()).data || [])
      .filter((i) => i.is_active && parseFloat(i.unit_cost) > 0)[0];
    expect(ing, '원가가 있는 재료가 하나는 있어야 한다').toBeTruthy();

    const recipeName = `E2E-INACTIVE-${Date.now()}`;
    const lineCost = 2 * (parseFloat(ing.unit_cost) / (parseFloat(ing.base_quantity) || 1));
    const createRes = await request.post(`${API}/product-recipes`, {
      headers: H,
      data: {
        brand_id: brandId, name: recipeName, yield_amount: 1, yield_unit: 'portion',
        ingredients: [{ ingredient_id: ing.id, quantity: 2, unit: ing.unit, cost: lineCost }],
      },
    });
    expect(createRes.ok()).toBeTruthy();
    const recipeId = (await createRes.json()).data?.id;
    expect(recipeId).toBeTruthy();

    // 신고 상황 재현: 이 재료를 비활성으로 돌린다(선택기 목록에서 빠진다)
    const deact = await request.put(`${API}/product-ingredients/${ing.id}`, {
      headers: H, data: { ...ing, is_active: false },
    });
    expect(deact.ok(), '재료를 비활성으로 돌릴 수 있어야 한다').toBeTruthy();

    try {
      await injectAuth(context, token, user.role || 'Brand General');
      // 이 화면의 활성 브랜드는 localStorage('bg.selectedBrandId') 다(BrandProductRecipePage:35).
      // 심어 주지 않으면 브랜드 여러 개를 가진 소유자에서 다른 브랜드가 떠 시나리오가 어긋난다.
      await context.addInitScript((id) => localStorage.setItem('bg.selectedBrandId', String(id)), brandId);
      await page.goto('/pos/brand-product-recipes', { waitUntil: 'domcontentloaded' });
      await expect(page.getByText(recipeName).first()).toBeVisible({ timeout: 20000 });
      await page.getByText(recipeName).first().click();
      await expect(page.getByText('Ingredients', { exact: false }).first()).toBeVisible({ timeout: 15000 });
      await page.waitForTimeout(800);

      const body = await page.locator('body').innerText();
      expect(body, '재료명이 «Ingredient #숫자» 로 뜨면 안 된다').not.toMatch(/Ingredient #\d+/);
      expect(body, '비활성이어도 재료의 진짜 이름이 보여야 한다').toContain(String(ing.name).trim());
      expect(body, `줄 원가 ${lineCost.toFixed(2)} 가 보여야 한다`).toContain(lineCost.toFixed(2));
    } finally {
      // 원복 — 재료 활성 복구 + 시나리오가 만든 레시피 삭제
      await request.put(`${API}/product-ingredients/${ing.id}`, { headers: H, data: { ...ing, is_active: true } }).catch(() => {});
      await request.delete(`${API}/product-recipes/${recipeId}`, { headers: H }).catch(() => {});
    }
  });
});

// @ts-check
/**
 * 2026-11-28 맞춤 제작 루트 1단계 — 화면 확인 (docs/TRADE_STRUCTURE.md §2-6 · Fable 게이트 재검증 요구)
 *   공급업체(데모 공급업체 20 관리자): 등록 창 «주문제작» 이면 재고 칸 없음 · «고른 손님만» 이면 손님 목록 · 카드 «전용 · 1»
 *   매장(데모 매장 38 관리자): 발주 화면 카탈로그 카드 «FOR YOU»
 *   zh · ms 화면에 키 이름(products.audience…)이 그대로 나오지 않음
 * 확인용 상품(데모 공급업체 20 · 손님 = 매장 38): «Check - Custom Logo Cup (exclusive)» — 이 시험은 아무것도 저장하지 않는다(창만 열고 닫음).
 */
const { test, expect } = require('@playwright/test');
require('/var/www/dev-backend/node_modules/dotenv').config({ path: '/var/www/dev-backend/.env' });
const jwt = require('/var/www/dev-backend/node_modules/jsonwebtoken');
const { sequelize } = require('/var/www/dev-backend/config/database');

const Q = (sql, rep) => sequelize.query(sql, { replacements: rep, type: sequelize.QueryTypes.SELECT });
const NAME = 'Check - Custom Logo Cup (exclusive)';
let sa, ra, product, store;

test.beforeAll(async () => {
  [sa] = await Q("SELECT id FROM users WHERE role = 'Supplier Admin' AND supplier_company_id = 20 ORDER BY id LIMIT 1");
  [ra] = await Q("SELECT id FROM users WHERE role = 'Restaurant Admin' AND restaurant_id = 38 ORDER BY id LIMIT 1");
  [store] = await Q('SELECT name FROM restaurants WHERE id = 38');
  [product] = await Q(`SELECT sp.id FROM supplier_products sp JOIN supplier_product_buyers b ON b.supplier_product_id = sp.id
     WHERE sp.supplier_company_id = 20 AND sp.name = :n AND sp.audience_mode = 'selected' AND sp.product_kind = 'made_to_order'
       AND b.entity_type = 'restaurant' AND b.entity_id = 38 AND sp.deleted_at IS NULL ORDER BY sp.id DESC LIMIT 1`, { n: NAME });
});
test.afterAll(async () => { await sequelize.close().catch(() => {}); });

const login = async (page, userId, role, lang) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '15m' });
  await page.context().addInitScript((x) => {
    localStorage.setItem('auth_token', x.t); localStorage.setItem('currentUserRole', x.r);
    localStorage.setItem('i18nextLng', x.lang);
  }, { t: token, r: role, lang });
};
const dismiss = async (page) => {
  const notNow = page.getByRole('button', { name: 'Not now' });
  if (await notNow.isVisible().catch(() => false)) await notNow.click();
};

for (const vp of [{ w: 1440, h: 900 }, { w: 390, h: 844 }]) {
  test(`공급업체 등록 창 — 주문제작·전용 손님 (${vp.w})`, async ({ page }) => {
    expect(sa && product, '픽스처(공급업체 20 관리자 · 확인용 전용 상품)').toBeTruthy();
    await page.setViewportSize({ width: vp.w, height: vp.h });
    await login(page, sa.id, 'Supplier Admin', 'en');
    await page.goto('/pos/supplier/products', { waitUntil: 'networkidle' });
    await dismiss(page);
    const card = page.locator('div', { hasText: NAME }).filter({ hasText: /Exclusive · 1/ }).last();
    await expect(card).toBeVisible({ timeout: 20000 });
    await page.getByText(NAME, { exact: true }).first().click();
    const dialog = page.locator('form').filter({ has: page.locator('input[name=supplier_product_kind]') });
    await expect(dialog.getByRole('radio', { name: 'Made to order' })).toBeChecked({ timeout: 15000 });
    await expect(dialog.getByText('Low Stock Threshold')).toHaveCount(0);
    await expect(dialog.getByText('No stock is counted for this type')).toBeVisible();
    await expect(dialog.getByRole('radio', { name: /Only selected customers/ })).toBeChecked();
    // 손님 = 매장 38 — 같은 이름·같은 도시 매장(2)이 있어 «Store #38» 까지 맞춘다
    await expect(dialog.getByRole('checkbox', { name: new RegExp(`^${store.name} Store #38\\b`) })).toBeChecked();
    await expect(dialog.getByRole('checkbox', { name: new RegExp(`^${store.name} Store #2\\b`) })).not.toBeChecked();
    // 재고 상품으로 바꾸면 재고 칸이 돌아온다(저장 안 함)
    await dialog.getByRole('radio', { name: 'Stocked goods' }).check();
    await expect(dialog.getByText('Low Stock Threshold')).toBeVisible();
    await page.screenshot({ path: `test-results/supplier-custom-product-form-${vp.w}.png`, fullPage: false });
  });
}

for (const lang of ['zh', 'ms']) {
  test(`공급업체 등록 창 — ${lang} 글자에 키 이름 없음`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await login(page, sa.id, 'Supplier Admin', lang);
    await page.goto('/pos/supplier/products', { waitUntil: 'networkidle' });
    await dismiss(page);
    await page.getByText(NAME, { exact: true }).first().click();
    const dialog = page.locator('form').filter({ has: page.locator('input[name=supplier_product_kind]') });
    await expect(dialog.locator('input[name=supplier_audience_mode]').first()).toBeVisible({ timeout: 20000 });
    const text = await dialog.innerText();
    expect(text).not.toMatch(/products\.(audience|fields\.kind)/);
    expect(text).toContain(lang === 'zh' ? '接单制作' : 'Dibuat selepas pesanan');
  });
}

test('매장 발주 화면 — 전용 상품 카드에 FOR YOU', async ({ page }) => {
  expect(ra && product).toBeTruthy();
  await page.setViewportSize({ width: 1440, height: 900 });
  await login(page, ra.id, 'Restaurant Admin', 'en');
  await page.goto('/pos/purchase-orders/new?tab=catalog', { waitUntil: 'networkidle' });
  await dismiss(page);
  const search = page.getByPlaceholder(/search/i).first();
  if (await search.isVisible().catch(() => false)) await search.fill('Custom Logo Cup');
  const row = page.locator('div', { hasText: NAME }).filter({ hasText: 'FOR YOU' }).last();
  await expect(row).toBeVisible({ timeout: 20000 });
  await page.screenshot({ path: 'test-results/supplier-custom-product-po-1440.png', fullPage: false });
});

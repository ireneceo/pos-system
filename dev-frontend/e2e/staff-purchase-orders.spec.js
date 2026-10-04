// @ts-check
/**
 * 2026-10-04 Irene «직원 로그인에서 Purchase Order 안 뜬다» — 직원 발주 = «Stock Management»(inventory) 권한 직원.
 *   권한 있음 → Operations › Purchase Order 보임 · /pos/purchase-orders 에 머문다(예전엔 대시보드로 튕김)
 *   권한 없음 → 메뉴 없음
 * demo rid=38 직원 1명의 권한을 테스트 동안만 바꾸고 원래대로 되돌린다.
 */
const { test, expect } = require('@playwright/test');
require('/var/www/dev-backend/node_modules/dotenv').config({ path: '/var/www/dev-backend/.env' });
const jwt = require('/var/www/dev-backend/node_modules/jsonwebtoken');
const { sequelize } = require('/var/www/dev-backend/config/database');

let staff, original;
test.beforeAll(async () => {
  const [[row]] = await sequelize.query("SELECT id, permissions FROM users WHERE role = 'Staff' AND restaurant_id = 38 AND is_active = 1 ORDER BY id LIMIT 1");
  staff = row; original = row ? row.permissions : null;
});
test.afterAll(async () => {
  if (staff) await sequelize.query('UPDATE users SET permissions = :p WHERE id = :id', { replacements: { p: original, id: staff.id } });
  await sequelize.close().catch(() => {});
});

async function asStaff(page, perms) {
  await sequelize.query('UPDATE users SET permissions = :p WHERE id = :id', { replacements: { p: JSON.stringify(perms), id: staff.id } });
  const token = jwt.sign({ userId: staff.id }, process.env.JWT_SECRET, { expiresIn: '10m' });
  await page.context().addInitScript((t) => { localStorage.setItem('auth_token', t); localStorage.setItem('currentUserRole', 'Staff'); }, token);
}

test('권한 있음 — Operations › Purchase Order 보이고 발주 화면에 머문다', async ({ page }) => {
  test.skip(!staff, '데모 매장 직원 없음');
  await asStaff(page, ['access_pos', 'access_payment', 'inventory']);
  await page.goto('/restaurant/38/dashboard', { waitUntil: 'networkidle' });
  await page.getByText('Operations', { exact: true }).first().click();
  await expect(page.getByText('Purchase Order', { exact: true }).first()).toBeVisible();
  await page.goto('/pos/purchase-orders', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  expect(page.url()).toContain('/pos/purchase-orders');
});

test('권한 없음 — Purchase Order 메뉴 없음', async ({ page }) => {
  test.skip(!staff, '데모 매장 직원 없음');
  await asStaff(page, ['access_pos', 'access_payment', 'reports']);
  await page.goto('/restaurant/38/dashboard', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  await expect(page.getByText('Purchase Order', { exact: true })).toHaveCount(0);
});

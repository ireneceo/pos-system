// @ts-check
/**
 * 2026-10-05 Irene «미니멈오더는 강제하는 거 아니야? 장바구니에서도 그 이하로 내리는 건 안되어야지»
 *   (Fable 설계 .claude/fable-design-20261005-moq-product-form.md A)
 *   데모 매장 38 RA — 최소주문 2 인 품목을 담으면 2 로 시작 · 1 로 내려도 칸을 벗어나면 2 로 돌아온다 · «Min 2» 안내.
 *   발주를 만들지 않는다(장바구니까지만) — 운영·데모 데이터 무변경.
 */
const { test, expect } = require('@playwright/test');
require('/var/www/dev-backend/node_modules/dotenv').config({ path: '/var/www/dev-backend/.env' });
const jwt = require('/var/www/dev-backend/node_modules/jsonwebtoken');
const { sequelize } = require('/var/www/dev-backend/config/database');

const Q = (sql, rep) => sequelize.query(sql, { replacements: rep, type: sequelize.QueryTypes.SELECT });
let ra, item;
test.beforeAll(async () => {
  [ra] = await Q("SELECT id FROM users WHERE role = 'Restaurant Admin' AND restaurant_id = 38 AND is_active = 1 ORDER BY id LIMIT 1");
  [item] = await Q(`SELECT i.name, isp.min_order_quantity mq FROM ingredient_seller_products isp JOIN ingredients i ON i.id = isp.ingredient_id
    WHERE i.restaurant_id = 38 AND isp.seller_type = 'supplier' AND isp.is_active = 1 AND isp.min_order_quantity > 1 ORDER BY i.id LIMIT 1`);
});
test.afterAll(async () => { await sequelize.close().catch(() => {}); });

test('장바구니 — 최소주문 아래로 못 내린다', async ({ page }) => {
  test.skip(!ra || !item, '데모 매장 38 RA / 최소주문>1 품목 없음');
  const min = Number(item.mq);
  const token = jwt.sign({ userId: ra.id }, process.env.JWT_SECRET, { expiresIn: '10m' });
  await page.context().addInitScript((t) => {
    localStorage.setItem('auth_token', t); localStorage.setItem('currentUserRole', 'Restaurant Admin');
    try { Object.keys(localStorage).filter(k => k.startsWith('po-cart:')).forEach(k => localStorage.removeItem(k)); } catch { /* noop */ }
  }, token);
  await page.goto('/pos/purchase-orders', { waitUntil: 'networkidle' });
  await page.getByPlaceholder(/search/i).first().fill(item.name);
  await page.waitForTimeout(800);
  await page.getByText(item.name, { exact: true }).first().click();

  const qty = page.locator('input[type="number"]').filter({ hasNot: page.locator('[disabled]') }).last();
  await expect(qty).toHaveValue(String(min));
  await qty.fill('1');
  await qty.blur();
  await expect(qty, '칸을 벗어나면 최소로 되돌림').toHaveValue(String(min));
  await expect(page.getByText(new RegExp(`Min(imum)?\\s*${min}`, 'i')).first()).toBeVisible();
});

// @ts-check
/**
 * 2026-10-04 Fable 판정 owner-po-on-behalf ① — 오너가 소유 매장을 골라 그 매장 자격으로 발주한다.
 *   오너 사이드바 «Purchase Order» → 매장 선택이 먼저(다매장) → 품목 담기 → Create POs → 대기 화면 제출
 *   → 그 매장 발주(entity=매장) · 승인 생략(submitted + «Submitted by Owner») · 그 매장 RA 이력에 보임.
 * 데모 오너(demo-owner@, 데모 매장 2·3 소유)만 쓰고, 이 테스트가 만든 발주는 afterAll 에서 지운다.
 */
const { test, expect } = require('@playwright/test');
require('/var/www/dev-backend/node_modules/dotenv').config({ path: '/var/www/dev-backend/.env' });
const jwt = require('/var/www/dev-backend/node_modules/jsonwebtoken');
const { sequelize } = require('/var/www/dev-backend/config/database');

const Q = (sql, rep) => sequelize.query(sql, { replacements: rep, type: sequelize.QueryTypes.SELECT });
let owner, store, ra, startedAt;

test.beforeAll(async () => {
  [owner] = await Q("SELECT id FROM users WHERE email = 'demo-owner@purplehere.com' AND role = 'Restaurant Owner'");
  [store] = await Q(`SELECT r.id, r.name FROM restaurants r JOIN restaurant_managers rm ON rm.restaurant_id = r.id AND rm.relationship_type = 'ownership'
    WHERE rm.manager_id = :o AND r.is_demo = 1 AND EXISTS (SELECT 1 FROM ingredient_seller_products isp JOIN ingredients i ON i.id = isp.ingredient_id
      WHERE i.restaurant_id = r.id AND isp.seller_type = 'supplier' AND isp.is_active = 1) ORDER BY r.id LIMIT 1`, { o: owner ? owner.id : 0 });
  [ra] = store ? await Q("SELECT id FROM users WHERE role = 'Restaurant Admin' AND restaurant_id = :r AND is_active = 1 ORDER BY id LIMIT 1", { r: store.id }) : [];
  [{ t: startedAt }] = await Q('SELECT NOW() t');
});

test.afterAll(async () => {
  if (owner) {
    const rows = await Q('SELECT id FROM purchase_orders WHERE created_by_user_id = :o AND created_at >= :t', { o: owner.id, t: startedAt });
    const ids = rows.map(r => r.id);
    if (ids.length) {
      for (const tbl of ['purchase_order_items', 'purchase_order_returns', 'inventory_transactions', 'cash_movements', 'inventory_batches']) {
        try { await sequelize.query(`DELETE FROM \`${tbl}\` WHERE purchase_order_id IN (:ids)`, { replacements: { ids } }); } catch { /* 없는 테이블 */ }
      }
      await sequelize.query('DELETE FROM purchase_orders WHERE id IN (:ids)', { replacements: { ids } });
    }
  }
  await sequelize.close().catch(() => {});
});

test('오너 — 매장 선택 → 담기 → 만들기 → 제출 = 그 매장 발주·승인 생략·RA 이력에 보임', async ({ page, request }) => {
  test.skip(!owner || !store || !ra, '데모 오너/공급처 연결 재료 있는 소유 매장/RA 없음');
  const token = jwt.sign({ userId: owner.id }, process.env.JWT_SECRET, { expiresIn: '15m' });
  await page.context().addInitScript((t) => {
    localStorage.setItem('auth_token', t); localStorage.setItem('currentUserRole', 'Restaurant Owner');
    try { sessionStorage.removeItem('ownerPoRestaurantId'); } catch { /* noop */ }
  }, token);

  // ① 사이드바 메뉴로 들어간다 — 예전엔 Order History 로 튕겼다
  await page.goto('/pos/owner/dashboard', { waitUntil: 'networkidle' });
  await page.getByText('Operations', { exact: true }).first().click();
  await page.getByText('Purchase Order', { exact: true }).first().click();
  await page.waitForTimeout(1500);
  expect(new URL(page.url()).pathname).toBe('/pos/purchase-orders');

  // ② 매장 선택이 먼저
  await expect(page.getByText(/Choose which of your restaurants this order is for/)).toBeVisible();
  await page.getByPlaceholder('Select a restaurant').click();
  await page.getByText(store.name, { exact: true }).last().click();
  await expect(page.getByText(/Choose which of your restaurants this order is for/)).toHaveCount(0);
  // 오너에겐 카탈로그 탭이 없다
  await expect(page.getByText('Supplier Catalog', { exact: true })).toHaveCount(0);

  // ③ 공급처가 연결된 품목 하나 담기 → Create POs → 대기 화면
  const [ing] = await Q(`SELECT i.name FROM ingredient_seller_products isp JOIN ingredients i ON i.id = isp.ingredient_id
    WHERE i.restaurant_id = :r AND isp.seller_type = 'supplier' AND isp.is_active = 1 ORDER BY i.id LIMIT 1`, { r: store.id });
  await page.getByPlaceholder(/search/i).first().fill(ing.name);
  await page.waitForTimeout(800);
  await page.getByText(ing.name, { exact: true }).first().click();
  // 우측 하단 «Purple POS for Windows» 안내 배너가 카트 버튼을 가리면 닫는다
  const banner = page.getByText('Purple POS for Windows', { exact: true });
  if (await banner.isVisible().catch(() => false)) {
    await banner.locator('xpath=ancestor::*[.//button][1]').getByRole('button').first().click().catch(() => {});
  }
  await page.getByRole('button', { name: /Create POs/ }).click();
  await page.waitForURL('**/pos/purchase-orders/staging', { timeout: 15000 });

  const [draft] = await Q('SELECT id, po_number, entity_type, entity_id, status FROM purchase_orders WHERE created_by_user_id = :o AND created_at >= :t ORDER BY id DESC LIMIT 1', { o: owner.id, t: startedAt });
  expect(draft && draft.entity_type).toBe('restaurant');
  expect(Number(draft.entity_id)).toBe(store.id);
  expect(draft.status).toBe('draft');

  // ④ 대기 화면에서 그 카드 제출 (외부 = Mark as Sent, 가입 = Submit — 오너면 «Submit for approval» 이 아니어야 한다)
  await expect(page.getByText(draft.po_number).first()).toBeVisible({ timeout: 10000 });
  await expect(page.getByRole('button', { name: /Submit for approval/ })).toHaveCount(0);
  await expect(page.getByRole('button', { name: /Receive \+ pay/ })).toHaveCount(0);
  await page.getByRole('button', { name: /^(Mark as Sent|Submit)$/ }).first().click();
  await page.waitForTimeout(2500);

  const [after] = await Q('SELECT status, tracking_info FROM purchase_orders WHERE id = :i', { i: draft.id });
  expect(after.status).toBe('submitted');
  expect(JSON.stringify(after.tracking_info || '')).toContain('Submitted by Owner');

  // ⑤ 그 매장 RA 의 발주 이력에 보인다
  const raToken = jwt.sign({ userId: ra.id }, process.env.JWT_SECRET, { expiresIn: '5m' });
  const r = await request.get(`/api/purchase-orders/${draft.id}`, { headers: { Authorization: `Bearer ${raToken}` } });
  expect(r.status()).toBe(200);
});

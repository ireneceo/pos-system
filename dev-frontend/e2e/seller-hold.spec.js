// @ts-check
/**
 * 2026-11-17 Fable 설계 «seller hold» — 판매자가 이미 받은 주문이 오너 승인 대기로 가도 판매자 화면에 남는다.
 *   목록(«New» 탭): «Awaiting owner approval» + 원인 한 줄 · Confirm/Reject 없음 · 상세 안내 띠 · 보드 «New» 칸 잠긴 카드.
 * 데모 브랜드 판매자(demo-brand@) + 확인용 발주 PO-CHK-OWNER-HOLD([확인용], 데모 매장 38 → 데모 브랜드 17).
 * 시작할 때 그 발주를 «판매자 인상 → 승인 대기» 상태로 되돌린다 — 지우지 않는다(상황판 확인용 데이터).
 */
const { test, expect } = require('@playwright/test');
require('/var/www/dev-backend/node_modules/dotenv').config({ path: '/var/www/dev-backend/.env' });
const jwt = require('/var/www/dev-backend/node_modules/jsonwebtoken');
const { sequelize } = require('/var/www/dev-backend/config/database');

const Q = (sql, rep) => sequelize.query(sql, { replacements: rep, type: sequelize.QueryTypes.SELECT });
const PN = 'PO-CHK-OWNER-HOLD';
let seller, po;

test.beforeAll(async () => {
  [seller] = await Q("SELECT id FROM users WHERE email = 'demo-brand@purplehere.com'");
  [po] = await Q(`SELECT p.id FROM purchase_orders p JOIN restaurants r ON r.id = p.entity_id AND r.is_demo = 1
    WHERE p.po_number = :n AND p.entity_type = 'restaurant' LIMIT 1`, { n: PN });
  if (po) {
    const now = Date.now();
    const events = [
      { at: new Date(now - 3600e3).toISOString(), status: 'submitted', note: 'Order placed by buyer' },
      { at: new Date(now - 600e3).toISOString(), status: 'pending_approval', note: 'Awaiting Owner approval — seller raised the total 27.00 → 54.00',
        raised_by_seller: true, status_before: 'submitted', total_before: 27, total_after: 54 }
    ];
    await sequelize.query("UPDATE purchase_orders SET status = 'pending_approval', tracking_info = :t WHERE id = :i",
      { replacements: { i: po.id, t: JSON.stringify({ events }) } });
  }
});

test.afterAll(async () => { await sequelize.close().catch(() => {}); });

for (const vp of [{ w: 1440, h: 900 }, { w: 390, h: 844 }]) {
  test(`오너 승인 대기 주문이 판매자 목록·상세·보드에 잠긴 채 남는다 (${vp.w}px)`, async ({ page }) => {
    test.skip(!seller || !po, '데모 브랜드 판매자 또는 확인용 발주 없음');
    await page.setViewportSize({ width: vp.w, height: vp.h });
    const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    const token = jwt.sign({ userId: seller.id }, process.env.JWT_SECRET, { expiresIn: '15m' });
    await page.context().addInitScript((t) => {
      localStorage.setItem('auth_token', t); localStorage.setItem('currentUserRole', 'Brand General');
      try { localStorage.removeItem('incomingOrdersView'); } catch (_) {}
    }, token);

    await page.goto('/pos/brand/general/incoming-orders', { waitUntil: 'networkidle' });
    const notNow = page.getByRole('button', { name: 'Not now' });
    if (await notNow.isVisible().catch(() => false)) await notNow.click();
    const listBtn = page.getByRole('button', { name: 'List', exact: true });
    if (await listBtn.isVisible().catch(() => false)) await listBtn.click();

    // 목록 — 줄이 있고 칩·원인 줄, Confirm/Reject 없음
    const row = page.locator('tr', { hasText: PN });
    await expect(row).toBeVisible();
    await expect(row).toContainText('Awaiting owner approval');
    await expect(row).toContainText('You raised the total');
    await expect(row.getByRole('button', { name: 'Confirm', exact: true })).toHaveCount(0);
    await expect(row.getByRole('button', { name: 'Reject', exact: true })).toHaveCount(0);
    await page.screenshot({ path: `/tmp/e2e-seller-hold-list-${vp.w}.png`, fullPage: false });

    // 상세 — 안내 띠
    await row.getByRole('button', { name: 'View', exact: true }).click();
    await expect(page.getByRole('status').filter({ hasText: "Don't prepare or ship" })).toBeVisible();
    await page.screenshot({ path: `/tmp/e2e-seller-hold-detail-${vp.w}.png`, fullPage: false });
    await page.getByRole('button', { name: '×', exact: true }).last().click();
    await expect(page.getByRole('status').filter({ hasText: "Don't prepare or ship" })).toHaveCount(0);

    // 보드 — New 칸에 잠긴 카드(Confirm 없음)
    const boardBtn = page.getByRole('button', { name: 'Board', exact: true });
    if (await boardBtn.isVisible().catch(() => false)) {
      await boardBtn.click();
      const card = page.getByTestId(`board-card-${po.id}`);
      await expect(card).toBeVisible();
      await expect(card).toContainText('Awaiting owner approval');
      await expect(card.getByRole('button', { name: 'Confirm', exact: true })).toHaveCount(0);
      await page.screenshot({ path: `/tmp/e2e-seller-hold-board-${vp.w}.png`, fullPage: false });
      if (await listBtn.isVisible().catch(() => false)) await listBtn.click();
    }
    expect(errors).toEqual([]);
  });
}

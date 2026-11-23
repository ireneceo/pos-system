// @ts-check
/**
 * 2026-11-23 Fable 설계 .claude/fable-design-20261123-seller-order-cancel-edit-refund.md §8-20 — 화면 확인
 *   판매자(demo-brand@): 목록 «Cancel order»(결제 전 켜짐 · 결제됨 꺼짐+이유) · «Return requested»·«Refund due» 표시 ·
 *     취소 창 세 줄 안내 · 상세 환불 칸 «Mark refund sent» 창 · 한국어 화면 영어 0
 *   구매자(demo-restaurant@): 환불 카드 «Waiting for the seller» · 반품 신청 «Withdraw request»
 * 확인용 발주(데모 매장 38 → 데모 브랜드 17 · notes [확인용]) PO-R38-CHK-CANCEL/REFUND/RETREQ — 이 시험은 아무것도 저장하지 않는다(창만 열고 닫음).
 */
const { test, expect } = require('@playwright/test');
require('/var/www/dev-backend/node_modules/dotenv').config({ path: '/var/www/dev-backend/.env' });
const jwt = require('/var/www/dev-backend/node_modules/jsonwebtoken');
const { sequelize } = require('/var/www/dev-backend/config/database');

const Q = (sql, rep) => sequelize.query(sql, { replacements: rep, type: sequelize.QueryTypes.SELECT });
let seller, buyer, A, B, C;

test.beforeAll(async () => {
  [seller] = await Q("SELECT id FROM users WHERE email = 'demo-brand@purplehere.com'");
  [buyer] = await Q("SELECT id FROM users WHERE email = 'demo-restaurant@purplehere.com'");
  const pick = async (tag) => (await Q(`SELECT id, po_number FROM purchase_orders WHERE po_number LIKE :p AND entity_id = 38 AND notes LIKE '%[확인용]%' ORDER BY id DESC LIMIT 1`, { p: `PO-R38-CHK-${tag}-%` }))[0];
  A = await pick('CANCEL'); B = await pick('REFUND'); C = await pick('RETREQ');
});
test.afterAll(async () => { await sequelize.close().catch(() => {}); });

const login = async (page, userId, role, lang) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '15m' });
  await page.context().addInitScript((x) => {
    localStorage.setItem('auth_token', x.t); localStorage.setItem('currentUserRole', x.r);
    if (x.lang) localStorage.setItem('i18nextLng', x.lang);
  }, { t: token, r: role, lang });
};
const toList = async (page) => {
  await page.goto('/pos/brand/general/incoming-orders', { waitUntil: 'networkidle' });
  const notNow = page.getByRole('button', { name: 'Not now' });
  if (await notNow.isVisible().catch(() => false)) await notNow.click();
  const listBtn = page.getByRole('button', { name: /^(List|목록)$/ });
  if (await listBtn.isVisible().catch(() => false)) await listBtn.click();
};

for (const vp of [{ w: 1440, h: 900 }, { w: 390, h: 844 }]) {
  test(`판매자 — 취소 단추·표시·취소 창·환불 칸 (${vp.w}px)`, async ({ page }) => {
    test.skip(!seller || !A || !B || !C, '확인용 발주 없음');
    await page.setViewportSize({ width: vp.w, height: vp.h });
    const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await login(page, seller.id, 'Brand General');
    await toList(page);

    const rowA = page.locator('tr', { hasText: A.po_number });
    const rowB = page.locator('tr', { hasText: B.po_number });
    const rowC = page.locator('tr', { hasText: C.po_number });
    await expect(rowA).toBeVisible();
    await expect(rowA.getByRole('button', { name: 'Cancel order', exact: true })).toBeEnabled();
    await expect(rowB).toContainText('Refund due');
    await expect(rowB.getByRole('button', { name: 'Cancel order', exact: true })).toBeDisabled();
    await expect(rowC).toContainText('Return requested');
    await page.screenshot({ path: `/tmp/e2e-cancel-refund-list-${vp.w}.png` });

    // 취소 창 — 세 줄 안내(청구서 취소·재고 복귀) · 사유 없으면 저장 꺼짐 · 저장하지 않고 닫음
    await rowA.getByRole('button', { name: 'Cancel order', exact: true }).click();
    const modal = page.getByTestId('seller-cancel-modal');
    await expect(modal).toBeVisible();
    await expect(modal).toContainText('will be cancelled');
    await expect(modal).toContainText('go back into your stock');
    const noScroll = await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1);
    expect(noScroll).toBe(true);
    await page.screenshot({ path: `/tmp/e2e-cancel-modal-${vp.w}.png` });
    await page.getByRole('button', { name: 'Keep order', exact: true }).click();
    await expect(modal).toHaveCount(0);

    // 환불 칸 — 상세 B
    await rowB.getByRole('button', { name: 'View', exact: true }).click();
    const panel = page.getByTestId('seller-refund-panel');
    await expect(panel).toBeVisible();
    await expect(panel).toContainText('Refund due');
    await panel.getByRole('button', { name: 'Mark refund sent', exact: true }).click();
    await expect(page.getByText('How did you pay it back?')).toBeVisible();
    await page.screenshot({ path: `/tmp/e2e-refund-send-${vp.w}.png` });
    expect(errors).toEqual([]);
  });
}

test('판매자 — 한국어 화면: 취소·환불 문구가 한국어', async ({ page }) => {
  test.skip(!seller || !A || !B, '확인용 발주 없음');
  await page.setViewportSize({ width: 1440, height: 900 });
  await login(page, seller.id, 'Brand General', 'ko');
  await toList(page);
  const rowA = page.locator('tr', { hasText: A.po_number });
  const rowB = page.locator('tr', { hasText: B.po_number });
  await expect(rowA.getByRole('button', { name: '주문 취소', exact: true })).toBeVisible();
  await expect(rowB).toContainText('환불할 금액');
  await rowA.getByRole('button', { name: '주문 취소', exact: true }).click();
  const modal = page.getByTestId('seller-cancel-modal');
  await expect(modal).toContainText('취소됩니다');
  await expect(modal).not.toContainText('will be cancelled');
  await page.screenshot({ path: '/tmp/e2e-cancel-modal-ko.png' });
});

test('구매자 — 환불 카드 · 반품 신청 철회 단추', async ({ page }) => {
  test.skip(!buyer || !B || !C, '확인용 발주 없음');
  await page.setViewportSize({ width: 1440, height: 900 });
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await login(page, buyer.id, 'Restaurant Admin', 'en');
  await page.goto(`/pos/purchase-orders/${B.id}`, { waitUntil: 'networkidle' });
  const card = page.getByTestId('buyer-refund-card');
  await expect(card).toBeVisible();
  await expect(card).toContainText('Waiting for the seller');
  await page.screenshot({ path: '/tmp/e2e-buyer-refund-card.png' });
  await page.goto(`/pos/purchase-orders/${C.id}`, { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: /^Request return$/i }).first().click();
  await expect(page.getByRole('button', { name: 'Withdraw request', exact: true })).toBeVisible();
  await page.screenshot({ path: '/tmp/e2e-buyer-withdraw.png' });
  expect(errors).toEqual([]);
});

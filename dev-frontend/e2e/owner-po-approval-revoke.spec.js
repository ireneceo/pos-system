// @ts-check
/**
 * 2026-10-22 Fable 설계 owner-po-approval-revoke §4-11 — 오너 «승인 전 / 승인 완료» 탭 + 승인취소 클릭 흐름.
 *   PO Approvals(승인 전 탭) → 승인 → «승인 완료» 탭(= Order History, «승인 완료만» 켜짐)에 그 행 →
 *   «승인 취소» → 확인 → 행이 빠지고 «승인 전» 탭 수가 늘고 승인 화면에 다시 보임 · 상세(오너 보기)에도 버튼.
 * 데모 오너(demo-owner@, 데모 매장 2) + 확인용 발주 CHK-REVOKE-EXT([확인용], 데모 매장 2 외부 업체) 를 쓴다.
 * 시작할 때 그 발주를 «승인 대기» 로 되돌리고 끝도 «승인 대기» — 지우지 않는다(상황판 확인용 데이터).
 */
const { test, expect } = require('@playwright/test');
require('/var/www/dev-backend/node_modules/dotenv').config({ path: '/var/www/dev-backend/.env' });
const jwt = require('/var/www/dev-backend/node_modules/jsonwebtoken');
const { sequelize } = require('/var/www/dev-backend/config/database');

const Q = (sql, rep) => sequelize.query(sql, { replacements: rep, type: sequelize.QueryTypes.SELECT });
const PO = 'CHK-REVOKE-EXT';
let owner, po;

test.beforeAll(async () => {
  [owner] = await Q("SELECT id FROM users WHERE email = 'demo-owner@purplehere.com' AND role = 'Restaurant Owner'");
  [po] = await Q(`SELECT p.id, p.entity_id FROM purchase_orders p JOIN restaurants r ON r.id = p.entity_id AND r.is_demo = 1
    WHERE p.po_number = :n AND p.entity_type = 'restaurant' LIMIT 1`, { n: PO });
});

test.beforeEach(async () => {
  if (po) await sequelize.query(`UPDATE purchase_orders SET status = 'pending_approval', approved_at = NULL, approved_by_user_id = NULL,
    payment_status = 'unpaid' WHERE id = :i`, { replacements: { i: po.id } });
});

test.afterAll(async () => { await sequelize.close().catch(() => {}); });

for (const vp of [{ w: 1440, h: 900 }, { w: 390, h: 844 }]) {
  test(`오너 승인 → 승인 완료 탭 → 승인취소 → 승인 전으로 (${vp.w}px)`, async ({ page }) => {
    test.skip(!owner || !po, '데모 오너 또는 확인용 발주 CHK-REVOKE-EXT 없음');
    await page.setViewportSize({ width: vp.w, height: vp.h });
    const errors = [];
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
    page.on('pageerror', (e) => errors.push(e.message));
    const token = jwt.sign({ userId: owner.id }, process.env.JWT_SECRET, { expiresIn: '15m' });
    await page.context().addInitScript((t) => {
      localStorage.setItem('auth_token', t); localStorage.setItem('currentUserRole', 'Restaurant Owner');
    }, token);

    // ① 승인 전 탭 — 탭 띠 두 개, 확인용 발주 행
    await page.goto('/pos/owner/po-approvals', { waitUntil: 'networkidle' });
    // 우측 하단 «Purple POS for Windows» 설치 안내가 휴대폰 폭에서 행 버튼을 가린다 — 닫고 시작
    const notNow = page.getByRole('button', { name: 'Not now' });
    if (await notNow.isVisible().catch(() => false)) await notNow.click();
    const pendingTab = page.getByRole('button', { name: /^Awaiting approval/ }).first();
    await expect(pendingTab).toBeVisible();
    await expect(page.getByRole('button', { name: 'Approved', exact: true }).first()).toBeVisible();
    const row = page.locator('tr', { hasText: PO });
    await expect(row).toBeVisible();
    const nBefore = Number(((await pendingTab.textContent()) || '').match(/\((\d+)\)/)?.[1] || 0);

    // ② 승인
    await row.getByRole('button', { name: 'Approve', exact: true }).click();
    await page.getByRole('button', { name: 'Approve', exact: true }).last().click();
    await page.waitForTimeout(1200);
    const [afterApprove] = await Q('SELECT status, approved_at FROM purchase_orders WHERE id = :i', { i: po.id });
    expect(afterApprove.status).toBe('submitted');
    expect(afterApprove.approved_at).not.toBeNull();

    // ③ 승인 완료 탭 = Order History, «승인 완료만» 켜진 채 그 행
    await page.getByRole('button', { name: 'Approved', exact: true }).first().click();
    await page.waitForURL(/\/pos\/purchase-orders\/history\?approved=1/);
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('button', { name: 'Approved only' })).toBeVisible();
    const hRow = page.locator('tr', { hasText: PO });
    await expect(hRow).toBeVisible();
    const revokeBtn = hRow.getByRole('button', { name: 'Revoke approval' });
    await expect(revokeBtn).toBeVisible();

    // ④ 상세(오너 보기)에도 버튼
    await hRow.getByRole('button', { name: 'View', exact: true }).click();
    await expect(page.getByRole('button', { name: 'Revoke approval' }).nth(1)).toBeVisible();
    await page.keyboard.press('Escape');
    await page.waitForTimeout(600);
    await expect(page.getByRole('button', { name: 'Revoke approval' })).toHaveCount(1);

    // ⑤ 목록에서 승인 취소 → 확인
    await hRow.getByRole('button', { name: 'Revoke approval' }).click();
    await expect(page.getByText(/goes back to awaiting approval/)).toBeVisible();
    await page.getByRole('button', { name: 'Revoke approval' }).last().click();
    await expect(page.getByText(/Approval revoked/).first()).toBeVisible();
    await page.getByRole('button', { name: 'OK', exact: true }).click();
    await page.waitForTimeout(800);
    const [afterRevoke] = await Q('SELECT status, approved_at FROM purchase_orders WHERE id = :i', { i: po.id });
    expect(afterRevoke.status).toBe('pending_approval');
    expect(afterRevoke.approved_at).toBeNull();
    await expect(page.locator('tr', { hasText: PO })).toHaveCount(0);
    const tabNow = page.getByRole('button', { name: /^Awaiting approval/ }).first();
    await expect(tabNow).toHaveText(new RegExp(`\\(${nBefore}\\)`));

    // ⑥ 승인 전 탭 — 다시 보인다
    await tabNow.click();
    await page.waitForURL(/\/pos\/owner\/po-approvals/);
    await expect(page.locator('tr', { hasText: PO })).toBeVisible();

    // 가로 넘침 0 · 오류 0
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
    expect(errors.filter(e => !/favicon|ResizeObserver|net::ERR|Failed to load resource/i.test(e))).toEqual([]);
  });
}

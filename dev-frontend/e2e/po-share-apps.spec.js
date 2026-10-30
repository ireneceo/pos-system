// @ts-check
/**
 * 2026-10-30 Irene «발주할 때 … 왓츠앱으로 보내기처럼 카톡으로 보내기도 가능해?» → «권고대로»(A안)
 *   «카톡·다른 앱» 버튼: 휴대폰 = 공유하기 창(navigator.share)에 굵게(*) 없는 글 · PC = 글 복사 + «복사했습니다» 안내.
 * 데모 매장 38 · 외부 업체 발주 PO-R38-20261022-002 의 [확인용] 반품(요청 상태 — «Request return» 창에 보임)을 쓴다 — 지우지 않는다.
 */
const { test, expect } = require('@playwright/test');
require('/var/www/dev-backend/node_modules/dotenv').config({ path: '/var/www/dev-backend/.env' });
const jwt = require('/var/www/dev-backend/node_modules/jsonwebtoken');
const { sequelize } = require('/var/www/dev-backend/config/database');

const Q = (sql, rep) => sequelize.query(sql, { replacements: rep, type: sequelize.QueryTypes.SELECT });
let ra, po;

test.beforeAll(async () => {
  [ra] = await Q("SELECT id FROM users WHERE email = 'demo-restaurant@purplehere.com'");
  [po] = await Q(`SELECT p.id FROM purchase_orders p JOIN restaurants r ON r.id = p.entity_id AND r.is_demo = 1
    JOIN purchase_order_returns x ON x.purchase_order_id = p.id AND x.status = 'requested' AND x.reason LIKE '[확인용]%'
    WHERE p.po_number = 'PO-R38-20261022-002' AND p.entity_type = 'restaurant' LIMIT 1`);
});
test.afterAll(async () => { await sequelize.close().catch(() => {}); });

const open = async (page, { touch }) => {
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  const token = jwt.sign({ userId: ra.id }, process.env.JWT_SECRET, { expiresIn: '15m' });
  await page.context().addInitScript(([t, touchy]) => {
    localStorage.setItem('auth_token', t); localStorage.setItem('currentUserRole', 'Restaurant Admin');
    // @ts-ignore
    window.__shared = null;
    const mm = window.matchMedia.bind(window);
    // @ts-ignore
    window.matchMedia = (q) => (q.includes('pointer: coarse') ? { matches: touchy, media: q, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {} } : mm(q));
    // @ts-ignore
    navigator.share = async (d) => { window.__shared = d; };
  }, [token, touch]);
  await page.goto(`/pos/purchase-orders/${po.id}`, { waitUntil: 'domcontentloaded' });
  // 반품 보내기 버튼은 «Request return» 창 안 «Existing returns» 에 있다
  await page.getByRole('button', { name: 'Request return' }).first().click({ timeout: 30000 });
  await page.getByRole('button', { name: 'KakaoTalk / other apps' }).first().waitFor({ timeout: 15000 });
  return errors;
};

test('PC: «KakaoTalk / other apps» → 글 복사 + 안내, 공유하기 창은 안 씀', async ({ page, context }) => {
  test.skip(!ra || !po, '데모 RA 또는 [확인용] 반품 없음');
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  const errors = await open(page, { touch: false });
  const btn = page.getByRole('button', { name: 'KakaoTalk / other apps' }).first();
  await expect(btn).toBeVisible();
  await btn.click();
  await expect(page.getByText('Copied', { exact: true })).toBeVisible();
  const clip = await page.evaluate(() => navigator.clipboard.readText());
  expect(clip).toContain('RETURN REQUEST');
  expect(clip).toContain('PO-R38-20261022-002');
  expect(clip).not.toContain('*');
  expect(await page.evaluate(() => /** @type any */ (window).__shared)).toBeNull();
  expect(errors).toEqual([]);
});

test('휴대폰: «KakaoTalk / other apps» → 공유하기 창에 굵게 없는 글', async ({ page }) => {
  test.skip(!ra || !po, '데모 RA 또는 [확인용] 반품 없음');
  await page.setViewportSize({ width: 390, height: 844 });
  const errors = await open(page, { touch: true });
  await page.getByRole('button', { name: 'KakaoTalk / other apps' }).first().click();
  await expect.poll(() => page.evaluate(() => /** @type any */ (window).__shared)).not.toBeNull();
  const shared = await page.evaluate(() => /** @type any */ (window).__shared);
  expect(shared.text).toContain('RETURN REQUEST');
  expect(shared.text).not.toContain('*');
  expect(shared.title).toBe('PO-R38-20261022-002');
  await expect(page.getByText('Copied', { exact: true })).toHaveCount(0);
  const [row] = await Q("SELECT sent_channel FROM purchase_order_returns WHERE purchase_order_id = ? AND reason LIKE '[확인용]%' ORDER BY id DESC LIMIT 1", [po.id]);
  expect(row.sent_channel).toBe('share');
  expect(errors).toEqual([]);
});

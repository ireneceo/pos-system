// @ts-check
/**
 * 2026-11-24 .claude/fable-design-20261124-brand-manager-invite.md §5 — 화면 한 바퀴
 *   브랜드 주인(임시 BG): /pos/brand/manager «Invite existing account» → 이메일·브랜드 2개·메뉴 → 보냄 → «대기» 표 2줄
 *   받는 사람(임시 RA): /pos/select-context 초대 카드 2장(브랜드 매니저 문구) → 하나 수락
 *   주인: 연결 매니저 행 → «Remove from this brand» → 확인 → 행 사라짐
 *   «Add Manager» 에 기존 이메일 → «invite it instead» → 초대 창 이메일 고정
 * 데모 계정은 초대 금지라 임시 is_test 사용자·임시 브랜드를 만들고 끝에 지운다(실매장·실브랜드 무접촉).
 */
const { test, expect } = require('@playwright/test');
require('/var/www/dev-backend/node_modules/dotenv').config({ path: '/var/www/dev-backend/.env' });
const jwt = require('/var/www/dev-backend/node_modules/jsonwebtoken');
const { sequelize } = require('/var/www/dev-backend/config/database');

const TAG = 'zzbme' + Date.now().toString(36);
const Q = (sql, rep) => sequelize.query(sql, { replacements: rep });
let bg, tgt, brandA, brandB;

const mkUser = async (suffix, role, rid = null) => {
  const [id] = await Q(
    `INSERT INTO users (username, email, password, role, restaurant_id, full_name, is_active, email_verified, is_demo, is_test, createdAt, updatedAt)
     VALUES (?, ?, 'x', ?, ?, ?, 1, 1, 0, 1, NOW(), NOW())`,
    [`${TAG}${suffix}`, `${TAG}${suffix}@example.com`, role, rid, `ZZ E2E ${suffix}`]);
  return id;
};

test.describe.configure({ mode: 'serial' });

test.beforeAll(async () => {
  bg = await mkUser('bg', 'Brand General');
  tgt = await mkUser('tgt', 'Restaurant Admin', 27);
  [brandA] = await Q('INSERT INTO brands (name, owner_id, created_at, updated_at) VALUES (?, ?, NOW(), NOW())', [`ZZ E2E Alpha ${TAG}`, bg]);
  [brandB] = await Q('INSERT INTO brands (name, owner_id, created_at, updated_at) VALUES (?, ?, NOW(), NOW())', [`ZZ E2E Beta ${TAG}`, bg]);
  // 구독 없는 BG 는 «No Active Subscription» 화면에 막힌다 — 임시 주인만 active 로
  await Q("UPDATE users SET brand_id = ?, subscription_status = 'active' WHERE id = ?", [brandA, bg]);
});
test.afterAll(async () => {
  const us = [bg, tgt].filter(Boolean);
  const bs = [brandA, brandB].filter(Boolean);
  if (us.length) {
    await Q('DELETE FROM user_context_requests WHERE user_id IN (?) OR created_by IN (?)', [us, us]);
    await Q('DELETE FROM user_contexts WHERE user_id IN (?)', [us]);
    await Q('DELETE FROM activity_logs WHERE user_id IN (?)', [us]);
  }
  if (bs.length) {
    await Q("DELETE FROM user_context_requests WHERE entity_type='brand' AND entity_id IN (?)", [bs]);
    await Q("DELETE FROM user_contexts WHERE entity_type='brand' AND entity_id IN (?)", [bs]);
    await Q('DELETE FROM brands WHERE id IN (?)', [bs]);
  }
  await Q('DELETE FROM users WHERE username LIKE ?', [`${TAG}%`]);
  await sequelize.close().catch(() => {});
});

const login = async (page, userId, role) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '15m' });
  await page.context().addInitScript((x) => {
    localStorage.setItem('auth_token', x.t); localStorage.setItem('currentUserRole', x.r);
    localStorage.setItem('i18nextLng', 'en');
  }, { t: token, r: role });
};
const dismiss = async (page) => {
  const notNow = page.getByRole('button', { name: 'Not now' });
  if (await notNow.isVisible().catch(() => false)) await notNow.click();
};
const noHScroll = (page) => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1);

test('주인 — 기존 계정 초대 → 대기 2줄 (1440 · 390)', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await login(page, bg, 'Brand General');
  for (const vp of [{ w: 1440, h: 900 }, { w: 390, h: 844 }]) {
    await page.setViewportSize({ width: vp.w, height: vp.h });
    await page.goto('/pos/brand/manager', { waitUntil: 'networkidle' });
    await dismiss(page);
    await expect(page.getByRole('button', { name: 'Invite existing account' })).toBeVisible();
    if (vp.w === 390) {
      await page.getByRole('button', { name: 'Invite existing account' }).click();
      await expect(page.getByText('Email of the existing account')).toBeVisible();
      expect(await noHScroll(page)).toBe(true);
      await page.screenshot({ path: `/tmp/e2e-bm-invite-modal-${vp.w}.png` });
      await page.getByRole('button', { name: 'Cancel', exact: true }).click();
      continue;
    }
    await page.getByRole('button', { name: 'Invite existing account' }).click();
    await page.getByPlaceholder('name@example.com').fill(`${TAG}tgt@example.com`);
    // 브랜드 기본 = 전부 체크
    await expect(page.getByLabel(`ZZ E2E Alpha ${TAG}`)).toBeChecked();
    await expect(page.getByLabel(`ZZ E2E Beta ${TAG}`)).toBeChecked();
    await page.getByLabel(/^Products/).check();
    await page.screenshot({ path: `/tmp/e2e-bm-invite-modal-${vp.w}.png` });
    await page.getByRole('button', { name: 'Send invitation' }).click();
    await expect(page.getByText('Invited — waiting for acceptance')).toBeVisible();
    await expect(page.locator('tr', { hasText: `${TAG}tgt@example.com` })).toHaveCount(2);
    await page.screenshot({ path: `/tmp/e2e-bm-pending-${vp.w}.png`, fullPage: true });
  }
  expect(errors).toEqual([]);
});

test('받는 사람 — 초대 카드 2장 · 하나 수락', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.setViewportSize({ width: 1440, height: 900 });
  await login(page, tgt, 'Restaurant Admin');
  await page.goto('/pos/select-context', { waitUntil: 'networkidle' });
  await dismiss(page);
  const cardA = page.locator('div', { hasText: `ZZ E2E Alpha ${TAG}` }).filter({ has: page.getByRole('button', { name: 'Accept' }) }).last();
  await expect(page.getByText(`ZZ E2E Alpha ${TAG}`)).toBeVisible();
  await expect(page.getByText(`ZZ E2E Beta ${TAG}`)).toBeVisible();
  await expect(page.getByText(/Brand manager · invited by/).first()).toBeVisible();
  await page.screenshot({ path: '/tmp/e2e-bm-select-context.png', fullPage: true });
  await cardA.getByRole('button', { name: 'Accept' }).click();
  await expect.poll(async () => (await Q(
    "SELECT COUNT(*) c FROM user_contexts WHERE user_id = ? AND entity_type='brand' AND entity_id = ? AND role='Brand Manager'", [tgt, brandA]))[0][0].c).toBe(1);
  expect(errors).toEqual([]);
});

test('주인 — 연결 매니저 떼기 · 기존 이메일로 Add → 초대로 잇기', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.setViewportSize({ width: 1440, height: 900 });
  await login(page, bg, 'Brand General');
  await page.goto('/pos/brand/manager', { waitUntil: 'networkidle' });
  await dismiss(page);
  const linkedRow = page.locator('tr', { hasText: 'Linked account' }).filter({ hasText: `${TAG}tgt@example.com` });
  await expect(linkedRow).toHaveCount(1);
  await page.screenshot({ path: '/tmp/e2e-bm-linked.png', fullPage: true });
  await linkedRow.getByRole('button', { name: 'Remove from this brand' }).click();
  await expect(page.getByText(/only access to this brand ends/)).toBeVisible();
  await page.getByRole('button', { name: 'Remove from this brand' }).last().click();
  await expect(linkedRow).toHaveCount(0);

  await page.getByRole('button', { name: 'Add Manager' }).first().click();
  await page.getByPlaceholder('Enter unique username').fill(`${TAG}newuser`);
  await page.getByPlaceholder('Enter full name').fill('ZZ New');
  await page.getByPlaceholder('Enter email address').fill(`${TAG}tgt@example.com`);
  await page.getByRole('button', { name: 'Add Manager' }).last().click();
  await page.getByRole('button', { name: /invite it instead/ }).click();
  await expect(page.getByPlaceholder('name@example.com')).toHaveValue(`${TAG}tgt@example.com`);
  await expect(page.getByPlaceholder('name@example.com')).toBeDisabled();
  await page.screenshot({ path: '/tmp/e2e-bm-invite-instead.png' });
  expect(errors).toEqual([]);
});

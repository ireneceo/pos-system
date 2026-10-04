// @ts-check
/**
 * 브랜드 관리자 모자 (v1.2, 2026-10-04) — 실브라우저 클릭 흐름
 * Fable 지시서 .claude/fable-instruction-20261004-brand-manager.md §5-3:
 *   SA 가 Staff Management 에서 demo RA(23)에 «브랜드 · K-Dine(17) · Brand manager» 부여 →
 *   RA 23 이 선택 화면에서 ◐ K-Dine 카드로 전환 → 브랜드 메뉴 목록 표시 → 메뉴 1개 이름 수정·저장·원복(API) →
 *   헤더 스위처 제목 K-Dine → SA 가 회수. 1440·390 폭, console.error 0.
 * 쓰기: user_contexts 행 1개 + 브랜드 17 메뉴 이름 1회 수정·원복. 끝나면 부여 행 삭제.
 */
const { test, expect } = require('@playwright/test');
const { execFileSync } = require('child_process');
const { demoLogin, apiBase, authHeaders, bodyLooksCrashed, assertDevBaseURL } = require('./fixtures/demo-guard');

const BRAND = 17;
const RA_EMAIL = 'demo-restaurant@purplehere.com';
const saToken = () => execFileSync('node', ['-e', `
  require('dotenv').config({ path: '/var/www/dev-backend/.env', quiet: true });
  const { sequelize } = require('/var/www/dev-backend/config/database');
  const jwt = require('/var/www/dev-backend/node_modules/jsonwebtoken');
  sequelize.query("SELECT id FROM users WHERE role='System Admin' AND is_active=1 ORDER BY id LIMIT 1").then(([r]) => {
    process.stdout.write(jwt.sign({ userId: r[0].id, role: 'System Admin' }, process.env.JWT_SECRET, { expiresIn: '20m' }));
    process.exit(0);
  });`], { encoding: 'utf8', cwd: '/var/www/dev-backend' }).trim().split('\n').pop();

for (const vp of [{ w: 1440, h: 900 }, { w: 390, h: 844 }]) {
  test(`브랜드 관리자 모자 — 부여 → 전환 → 메뉴 편집·원복 → 회수 (${vp.w}px)`, async ({ browser, request, baseURL }) => {
    assertDevBaseURL(baseURL);
    const errors = [];
    const sa = saToken();
    const { token: raToken, user: ra } = await demoLogin(request, baseURL, 'demo_restaurant_admin');
    const api = apiBase(baseURL);
    // 사전 정리 — 이 스펙이 남긴 브랜드 모자가 있으면 지운다(자기 것만)
    const pre = await (await request.get(`${api}/users/${ra.id}/contexts`, { headers: authHeaders(sa) })).json();
    for (const c of (pre.data?.contexts || []).filter(c => c.entity_type === 'brand' && c.entity_id === BRAND)) {
      await request.delete(`${api}/users/${ra.id}/contexts/${c.id}`, { headers: authHeaders(sa) });
    }

    // ── SA: Staff Management 에서 부여 ──
    const saCtx = await browser.newContext({ viewport: { width: vp.w, height: vp.h } });
    const saPage = await saCtx.newPage();
    saPage.on('console', m => { if (m.type() === 'error') errors.push('SA ' + m.text()); });
    await saPage.addInitScript(([t]) => { localStorage.setItem('auth_token', t); localStorage.setItem('currentUserRole', 'System Admin'); localStorage.setItem('i18nextLng', 'en'); }, [sa]);
    await saPage.goto('/pos/admin/staff');
    await saPage.waitForLoadState('networkidle');
    // 우측 하단 설치 배너가 목록을 가리면 닫는다
    const bannerClose = saPage.locator('[aria-label*="lose"], [aria-label*="닫기"]').filter({ hasText: /✕|×/ });
    if (await bannerClose.count()) await bannerClose.first().click().catch(() => {});
    const search = saPage.getByPlaceholder(/search/i).first();
    if (await search.count()) { await search.fill('demo-restaurant'); await saPage.waitForTimeout(600); }
    // RA 계정의 부여 입구 = Edit 창 안의 «매장·브랜드 접근 권한»(StaffManagementPage F1)
    const btn = saPage.locator('tr, [role="row"], div').filter({ hasText: RA_EMAIL })
      .getByRole('button', { name: /^(Edit|수정)$/ }).first();
    await btn.scrollIntoViewIfNeeded();
    await btn.click();
    const modal = saPage.locator('body');
    const typeSel = saPage.locator('select:has(option[value="brand"])').first();
    await typeSel.scrollIntoViewIfNeeded();
    await typeSel.selectOption('brand');
    const targetSel = saPage.locator(`select:has(option[value="${BRAND}"])`).last();
    await targetSel.selectOption(String(BRAND));
    await typeSel.locator('xpath=..').getByRole('button').first().click();
    await expect(typeSel.locator('xpath=../..').getByText('K-Dine').first()).toBeVisible({ timeout: 10000 });
    expect(bodyLooksCrashed(await saPage.locator('body').innerText())).toBeFalsy();

    // ── RA 23: 선택 화면 → ◐ K-Dine → 브랜드 메뉴 ──
    const raCtx = await browser.newContext({ viewport: { width: vp.w, height: vp.h } });
    const page = await raCtx.newPage();
    page.on('console', m => { if (m.type() === 'error') errors.push('RA ' + m.text()); });
    await page.addInitScript(([t, r]) => { if (!localStorage.getItem('auth_token')) { localStorage.setItem('auth_token', t); localStorage.setItem('currentUserRole', r); localStorage.setItem('i18nextLng', 'en'); } }, [raToken, ra.role]);  // 새로고침 때 전환된 토큰을 덮지 않게
    await page.goto('/pos/select-context');
    await page.waitForLoadState('networkidle');
    const card = page.getByText('K-Dine').first();
    await expect(card).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('◐').first()).toBeVisible();
    await card.click();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(800);
    const bmToken = await page.evaluate(() => localStorage.getItem('auth_token'));
    const me = await (await request.get(`${api}/auth/me`, { headers: authHeaders(bmToken) })).json();
    expect(me.data.role).toBe('Brand Manager');
    expect(Number(me.data.brand_id)).toBe(BRAND);

    // 사이드바에 Dashboard · Brand Menus 가 보여야 한다 (Fable 2026-10-04 표적 판정 — 모자 permissions 결함)
    if (vp.w >= 1024) {
      await page.goto('/pos/brand/dashboard').catch(() => {});
      await page.waitForLoadState('networkidle');
      await expect(page.locator('text=Dashboard >> visible=true').first(), '사이드바 Dashboard').toBeVisible({ timeout: 10000 });
      // 2단 사이드바 — «Brands» 를 누르면 그 아래 Brand Menus 가 열린다
      await page.locator('text=Brands >> visible=true').first().click();
      await expect(page.locator('text=Brand Menus >> visible=true').first(), '사이드바 Brand Menus').toBeVisible({ timeout: 10000 });
    }

    // 브랜드 메뉴 화면 진입(사이드바 경로와 같은 주소)
    await page.goto('/pos/brand-menus');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(800);
    expect(bodyLooksCrashed(await page.locator('body').innerText()), '브랜드 메뉴 화면 크래시').toBeFalsy();
    // dev 브랜드 17 에는 브랜드 메뉴가 없다 — 관리자 모자로 임시 메뉴를 만들고(생성도 관리 권한) 수정·원복·삭제한다
    const NAME = `E2E-BM-${vp.w}-${Date.now()}`;
    const mk = await request.post(`${api}/brand-menus`, { headers: authHeaders(bmToken), data: { brand_id: BRAND, name: NAME, recommended_price: 1, distribution_mode: 'manual' } });  // manual — 매장에 상품이 생기지 않게
    expect(mk.ok(), 'BM 메뉴 생성').toBeTruthy();
    const mkBody = await mk.json();
    const m0 = mkBody.data?.menu || mkBody.data || mkBody;
    expect(Number(m0.id), '생성된 메뉴 id').toBeGreaterThan(0);
    try {
      await page.reload();
      await page.waitForLoadState('networkidle');
      await expect(page.getByText(NAME).first(), '브랜드 메뉴 목록에 표시').toBeVisible({ timeout: 10000 });
      const put = await request.put(`${api}/brand-menus/${m0.id}`, { headers: authHeaders(bmToken), data: { name: `${NAME} (BM)` } });
      expect(put.ok(), 'BM 메뉴 수정').toBeTruthy();
      const back = await request.put(`${api}/brand-menus/${m0.id}`, { headers: authHeaders(bmToken), data: { name: NAME } });
      expect(back.ok(), 'BM 메뉴 원복').toBeTruthy();
    } finally {
      // 브랜드 메뉴를 만들면 범위(scope) 매장에 상품이 생긴다 — 메뉴 삭제는 연결만 푼다. demo 매장 38 의 그 상품도 치운다.
      execFileSync('node', ['-e', `
        require('dotenv').config({ path: '/var/www/dev-backend/.env', quiet: true });
        const { sequelize } = require('/var/www/dev-backend/config/database');
        sequelize.query("DELETE FROM products WHERE restaurant_id = 38 AND name LIKE 'E2E-BM-%'").then(() => process.exit(0));`],
        { cwd: '/var/www/dev-backend' });
      const del = await request.delete(`${api}/brand-menus/${m0.id}`, { headers: authHeaders(bmToken) });
      expect(del.ok(), `BM 임시 메뉴 삭제 status=${del.status()} ${await del.text()}`).toBeTruthy();
    }

    // 헤더 스위처 제목 = K-Dine (데스크탑 폭에서만 사이드바가 펼쳐져 있다)
    if (vp.w >= 1024) await expect(page.locator('text=K-Dine >> visible=true').first(), '헤더 스위처 제목 K-Dine').toBeVisible();

    // ── SA 회수 ──
    const post = await (await request.get(`${api}/users/${ra.id}/contexts`, { headers: authHeaders(sa) })).json();
    for (const c of (post.data?.contexts || []).filter(c => c.entity_type === 'brand' && c.entity_id === BRAND)) {
      const d = await request.delete(`${api}/users/${ra.id}/contexts/${c.id}`, { headers: authHeaders(sa) });
      expect(d.ok()).toBeTruthy();
    }
    const after = await request.get(`${api}/brand-menus?brand_id=${BRAND}`, { headers: authHeaders(bmToken) });
    expect(after.status(), '회수 뒤 브랜드 메뉴 403').toBe(403);

    await saCtx.close(); await raCtx.close();
    expect(errors.filter(e => !/favicon|ERR_ABORTED|net::/.test(e)), 'console.error 0').toEqual([]);
  });
}

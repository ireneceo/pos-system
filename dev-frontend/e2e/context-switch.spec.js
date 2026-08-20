// @ts-check
/**
 * 멀티 컨텍스트 로그인 — 선택 화면 / 전환 / 크로스탭 팔로우 (P3a)
 * ------------------------------------------------------------------------------
 * docs/MULTI_CONTEXT_LOGIN_DESIGN.md §4.7·§6.
 *
 * 이 스펙이 지키는 계약:
 *   ① **무회귀 제1 조건** — 부여받은 모자가 없으면(현재 전 사용자) 픽커가 뜨지 않고
 *      로그인은 지금과 똑같이 역할 대시보드로 간다.
 *   ② 모자가 2개 이상이면 픽커가 뜨고, 본래 정체 카드가 "기본" 배지로 항상 존재한다.
 *   ③ 전환하면 그 매장 대시보드로 이동하고, 본래 정체로 되돌아올 수 있다.
 *   ④ **FI-7 크로스탭** — 같은 브라우저의 다른 탭이 전환을 따라온다.
 *      따라오지 않으면 그 탭은 옛 컨텍스트 화면인데 요청만 새 자격으로 나가 전부 거부되고,
 *      그 탭이 POS·주방이면 결제·자동인쇄가 조용히 멈춘다(🔒 인쇄 안전 직결).
 *
 * 쓰기는 demo 매장(rid 18·38)과 demo 계정에만 한다. 부여 행은 스펙이 만들고 반드시 지운다.
 */
const { test, expect } = require('@playwright/test');
const { demoLogin, apiBase, authHeaders, bodyLooksCrashed, assertDevBaseURL } = require('./fixtures/demo-guard');

const HAT_RID = 18;      // 모자로만 열리는 demo 매장 (네이티브 BG 는 접근 불가)
const HAT_KEY = 'demo_brand_general';

/** 모자 부여/회수 시딩 — 부여 관리 UI 는 P5 라 픽스처 스크립트로 상태를 만든다.
 *  스크립트가 **demo 매장 + demo 계정 이중 가드**를 걸고 있어 실매장·실계정에는 절대 심기지 않는다. */
const { execFileSync } = require('child_process');
const SEED = '/var/www/dev-backend/scripts/test-seed-context.js';
const seed = (args) => execFileSync('node', [SEED, ...args], { encoding: 'utf8', cwd: '/var/www/dev-backend' });
const grantHat = (email, rid) => seed(['grant', '--user', email, '--restaurant', String(rid)]);
const revokeHats = (email) => seed(['revoke', '--user', email]);
const HAT_EMAIL = 'demo-brand@purplehere.com';
async function getContexts(request, baseURL, token) {
  const res = await request.get(apiBase(baseURL) + '/auth/contexts', { headers: authHeaders(token) });
  expect(res.ok(), 'GET /auth/contexts').toBeTruthy();
  const body = await res.json();
  return (body.data && body.data.contexts) || [];
}

test.describe('멀티 컨텍스트 로그인', () => {
  test('① 무회귀 — 모자가 없으면 픽커가 뜨지 않고 기존 대시보드로 간다', async ({ page, request, baseURL }) => {
    assertDevBaseURL(baseURL);
    const { token, user } = await demoLogin(request, baseURL, 'demo_restaurant_admin');

    const contexts = await getContexts(request, baseURL, token);
    expect(contexts.length, '부여 0건이면 기본 컨텍스트 1개').toBe(1);
    expect(contexts[0].kind).toBe('default');

    // 실제 화면: 토큰을 넣고 진입해도 픽커로 튕기지 않는다.
    await page.addInitScript(([t, r]) => {
      localStorage.setItem('auth_token', t);
      localStorage.setItem('currentUserRole', r);
    }, [token, user.role]);
    await page.goto(`/restaurant/${user.restaurant_id}/dashboard`);
    await page.waitForLoadState('networkidle');
    expect(page.url()).not.toContain('/pos/select-context');
    expect(bodyLooksCrashed(await page.locator('body').innerText()), '크래시 마커').toBeFalsy();
  });

  test('② 픽커 진입 — 본래 정체 카드가 항상 있고 크래시 0', async ({ page, request, baseURL }) => {
    assertDevBaseURL(baseURL);
    const { token, user } = await demoLogin(request, baseURL, HAT_KEY);

    const errors = [];
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });

    await page.addInitScript(([t, r]) => {
      localStorage.setItem('auth_token', t);
      localStorage.setItem('currentUserRole', r);
    }, [token, user.role]);
    await page.goto('/pos/select-context');
    await page.waitForLoadState('networkidle');

    // 기본 정체 카드는 부여 0건이어도 반드시 존재한다(설계 F1 — 본래 정체 복귀 보장).
    const cards = page.locator('button:has-text("' + user.role + '")');
    await expect(cards.first()).toBeVisible();
    expect(bodyLooksCrashed(await page.locator('body').innerText()), '크래시 마커').toBeFalsy();
    expect(errors.filter((e) => !/favicon|manifest|ResizeObserver/i.test(e)), 'console.error').toHaveLength(0);
  });

  test('③ 기본 정체로 전환하면 역할 대시보드로 이동한다', async ({ page, request, baseURL }) => {
    assertDevBaseURL(baseURL);
    const { token, user } = await demoLogin(request, baseURL, HAT_KEY);

    await page.addInitScript(([t, r]) => {
      localStorage.setItem('auth_token', t);
      localStorage.setItem('currentUserRole', r);
    }, [token, user.role]);
    await page.goto('/pos/select-context');
    await page.waitForLoadState('networkidle');

    await page.locator('button').filter({ hasText: user.role }).first().click();
    await page.waitForURL((u) => !u.pathname.includes('/pos/select-context'), { timeout: 20000 });
    expect(page.url()).toContain('/pos/brand/general/dashboard');
    expect(bodyLooksCrashed(await page.locator('body').innerText())).toBeFalsy();
  });

  test('④ FI-7 크로스탭 — 다른 탭에서 토큰이 바뀌면 이 탭이 따라온다', async ({ browser, request, baseURL }) => {
    assertDevBaseURL(baseURL);
    const a = await demoLogin(request, baseURL, HAT_KEY);                    // 브랜드 총괄
    const b = await demoLogin(request, baseURL, 'demo_restaurant_admin');    // 매장 관리자(다른 컨텍스트 대역)

    const ctx = await browser.newContext();
    await ctx.addInitScript(([t, r]) => {
      localStorage.setItem('auth_token', t);
      localStorage.setItem('currentUserRole', r);
    }, [a.token, a.user.role]);

    const page1 = await ctx.newPage();
    await page1.goto('/pos/brand/general/dashboard');
    await page1.waitForLoadState('networkidle');
    const before = page1.url();

    // 다른 탭이 토큰을 갈아끼운 상황을 재현한다(= 전환이 일어난 것과 동일한 신호).
    const page2 = await ctx.newPage();
    await page2.goto('/pos');
    await page2.evaluate((t) => localStorage.setItem('auth_token', t), b.token);

    // page1 이 따라오거나(네비게이션) 안내 오버레이를 띄워야 한다 — 둘 다 아니면 방어 부재.
    await page1.waitForFunction(
      (prev) => window.location.href !== prev || document.body.innerText.includes('탭') ||
                document.body.innerText.toLowerCase().includes('tab'),
      before,
      { timeout: 20000 }
    );
    expect(bodyLooksCrashed(await page1.locator('body').innerText())).toBeFalsy();
    await ctx.close();
  });
});

test.describe('모자를 쓴 상태 (시딩)', () => {
  test.beforeEach(() => { revokeHats(HAT_EMAIL); grantHat(HAT_EMAIL, HAT_RID); });
  test.afterEach(() => { revokeHats(HAT_EMAIL); });

  test('⑤ 픽커에 카드 2장 — 기본 배지 + 부여받은 매장', async ({ page, request, baseURL }) => {
    assertDevBaseURL(baseURL);
    const { token, user } = await demoLogin(request, baseURL, HAT_KEY);
    const contexts = await getContexts(request, baseURL, token);
    expect(contexts.length, '기본 1 + 모자 1').toBe(2);

    await page.addInitScript(([t, r]) => {
      localStorage.setItem('auth_token', t); localStorage.setItem('currentUserRole', r);
    }, [token, user.role]);
    await page.goto('/pos/select-context');
    await page.waitForLoadState('networkidle');
    await expect(page.getByText('Test Debug Restaurant')).toBeVisible();
    expect(bodyLooksCrashed(await page.locator('body').innerText())).toBeFalsy();
  });

  test('⑥ 모자로 전환하면 그 매장 대시보드로 간다', async ({ page, request, baseURL }) => {
    assertDevBaseURL(baseURL);
    const { token, user } = await demoLogin(request, baseURL, HAT_KEY);
    await page.addInitScript(([t, r]) => {
      localStorage.setItem('auth_token', t); localStorage.setItem('currentUserRole', r);
    }, [token, user.role]);
    await page.goto('/pos/select-context');
    await page.waitForLoadState('networkidle');

    await page.getByText('Test Debug Restaurant').click();
    await page.waitForURL((u) => u.pathname.includes(`/restaurant/${HAT_RID}/`), { timeout: 20000 });
    expect(bodyLooksCrashed(await page.locator('body').innerText())).toBeFalsy();
  });

  test('⑦ 회수 → 강제 로그아웃이 아니라 안내 후 픽커 복귀 (전환 후 재회수까지)', async ({ page, request, baseURL }) => {
    assertDevBaseURL(baseURL);
    const { token, user } = await demoLogin(request, baseURL, HAT_KEY);
    await page.addInitScript(([t, r]) => {
      localStorage.setItem('auth_token', t); localStorage.setItem('currentUserRole', r);
    }, [token, user.role]);
    await page.goto('/pos/select-context');
    await page.waitForLoadState('networkidle');
    await page.getByText('Test Debug Restaurant').click();
    await page.waitForURL((u) => u.pathname.includes(`/restaurant/${HAT_RID}/`), { timeout: 20000 });

    // 관리자가 모자를 회수한다.
    revokeHats(HAT_EMAIL);

    // 화면이 로그아웃(=로그인 페이지)으로 가면 안 된다 — 안내 후 픽커여야 한다.
    //
    // ⚠ 새로고침을 하지 않는다 — 두 가지 이유가 겹친다:
    //   ① `addInitScript` 는 **매 네비게이션마다** 실행돼 auth_token 을 처음 값(네이티브)으로
    //      되돌린다 → 회수 상황 자체가 재현되지 않는다(실측: 안내가 아예 안 뜸).
    //   ② 실사용에서도 매장 직원은 새로고침하지 않는다. 화면이 살아있는 채로 다음 요청이
    //      나갈 때 알아채야 한다 — 대시보드 폴링이 그 역할을 한다.
    // 또한 `networkidle` 도 쓰지 않는다: 대시보드는 계속 폴링해서 idle 이 되지 않는다
    // (실측: 정상 상태 4초에 API 17건). idle 을 기다리면 정상 동작인데 타임아웃으로 실패한다.
    const notice = page.locator('[role="alertdialog"]');
    await expect(notice, '회수 안내가 떠야 한다').toBeVisible({ timeout: 20000 });

    const body = await page.locator('body').innerText();
    expect(bodyLooksCrashed(body)).toBeFalsy();
    // 강제 로그아웃 금지 — 로그인 페이지(/pos)로 튕기면 설계 위반(§4.3 F5).
    expect(new URL(page.url()).pathname, '로그인 페이지로 튕기면 설계 위반').not.toBe('/pos');

    // 안내는 **그 자리에서** 뜨고, 사용자가 버튼을 눌러야 픽커로 간다(화면을 몰래 갈아치우지 않는다).
    await notice.getByRole('button').first().click();
    await page.waitForURL((u) => u.pathname.includes('/pos/select-context'), { timeout: 20000 });

    // 픽커에는 본래 정체만 남아야 한다 — 회수된 모자가 아직 보이면 목록·검증이 갈라진 것.
    await expect(page.getByText('Test Debug Restaurant')).toHaveCount(0);
  });
});

test.describe('SA 부여 관리 화면 (P4)', () => {
  test.afterEach(() => { revokeHats(HAT_EMAIL); });

  test('⑧ SA 상세 화면에서 부여 → 사용자 픽커에 반영 → 회수', async ({ request, baseURL }) => {
    assertDevBaseURL(baseURL);
    revokeHats(HAT_EMAIL);

    // SA 토큰 — demo 계정이 없어 서명으로 만든다(health-check 선례).
    // ⚠ 프론트엔드에는 jsonwebtoken 이 없다(실측: Cannot find module). 백엔드 프로세스에서 만들어 가져온다.
    const { execFileSync } = require('child_process');
    const saTok = execFileSync('node', ['-e', `
      require('dotenv/config');
      const jwt=require('jsonwebtoken');
      const {sequelize}=require('/var/www/dev-backend/config/database');
      (async()=>{
        const [r]=await sequelize.query("SELECT id FROM users WHERE role='System Admin' LIMIT 1");
        process.stdout.write('TOKEN:'+jwt.sign({userId:r[0].id},process.env.JWT_SECRET,{expiresIn:'10m'}));
        process.exit(0);
      })();
    `], { encoding: 'utf8', cwd: '/var/www/dev-backend' }).split('TOKEN:').pop().trim();

    const bg = await demoLogin(request, baseURL, HAT_KEY);

    // 부여 (SA API)
    const grant = await request.post(apiBase(baseURL) + `/users/${bg.user.id}/contexts`, {
      headers: { ...authHeaders(saTok), 'Content-Type': 'application/json' },
      data: { entity_type: 'restaurant', entity_id: HAT_RID, role: 'Restaurant Admin' }
    });
    expect(grant.status(), 'SA 부여').toBe(200);

    // 사용자 쪽 목록에 반영되는가
    const after = await getContexts(request, baseURL, bg.token);
    expect(after.length, '기본 1 + 부여 1').toBe(2);

    // SA 목록 조회로 부여분 id 확보 → 회수
    const list = await request.get(apiBase(baseURL) + `/users/${bg.user.id}/contexts`, { headers: authHeaders(saTok) });
    const body = await list.json();
    const granted = body.data.contexts.find((c) => c.kind === 'granted');
    expect(granted, '부여분 존재').toBeTruthy();

    const del = await request.delete(apiBase(baseURL) + `/users/${bg.user.id}/contexts/${granted.id}`, { headers: authHeaders(saTok) });
    expect(del.status(), 'SA 회수').toBe(200);

    const final = await getContexts(request, baseURL, bg.token);
    expect(final.length, '회수 후 기본 1개만').toBe(1);
  });
});

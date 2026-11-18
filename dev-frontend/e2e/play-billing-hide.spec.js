// @ts-check
/**
 * 안드로이드 앱(Play) 안에서 디지털 서비스 결제 경로 숨기기 — 같은 빌드에서 «웹» 과 «앱 흉내» 를 나란히 (2026-11-18)
 * ---------------------------------------------------------------------------
 * 설계: /var/www/.claude/fable-design-20261118-play-billing-hide.md §7-1
 *   앱 흉내 = 브릿지가 넣는 window.__PURPLE_DESKTOP = {platform:'android'} 를 초기 스크립트로 넣는다.
 *   웹 열이 «있음» 인 것이 곧 양성 대조 — 웹에서 못 찾으면 검사기가 고장이다(통과 아님).
 *   PLAY_E2E_NO_APP=1 로 돌리면 앱 흉내를 빼고 돈다 → 앱 단언이 전부 실패해야 한다(고장주입 §7-3).
 *   PLAY_E2E_PLATFORM=win32 로 돌리면 윈도우 앱 흉내 → 앱 단언이 실패해야 한다(윈도우 앱은 웹과 같음).
 * 데모 계정·데모 매장만 · 쓰기 없음(화면 보기만).
 */
const { test, expect } = require('@playwright/test');
const { assertDevBaseURL, bodyLooksCrashed } = require('./fixtures/demo-guard');

const NO_APP = process.env.PLAY_E2E_NO_APP === '1';
const PLATFORM = process.env.PLAY_E2E_PLATFORM || 'android';

// 시험 계정 (개발 DB · CLAUDE.md «시험 역할»)
const U = {
  restaurant: { id: 23, role: 'Restaurant Admin', home: '/restaurant/38/dashboard' },   // 데모 매장 38
  brand: { id: 22, role: 'Brand General', home: '/pos/brand/general/dashboard' },        // 데모 브랜드 10
  foodcourt: { id: 288, role: 'Foodcourt General', home: '/pos/foodcourt/general/dashboard' }, // 데모 푸드코트 44 (is_test — 구독 탭 보임)
  owner: { id: 289, role: 'Restaurant Owner', home: '/pos/owner/dashboard' },          // 데모 오너 (사용자 자체 구독 없음)
};

// 매장 38 결제할 청구서 (개발 DB 실측 2026-11-18)
const INV_SUBSCRIPTION = 'INV-DEMO-001';           // pos_subscription · system_admin
const INV_ROYALTY = 'INV-DEMO-004';                // brand_royalty · brand 10
const INV_TRADE = 'TRD-SUP20-20260415-001';        // trade · supplier 20

const U2 = { owner: '/pos/owner/dashboard', brand: '/pos/brand/general/dashboard', foodcourt: '/pos/foodcourt/general/dashboard' };

function devToken(userId) {
  const path = require('path');
  require('dotenv').config({ path: '/var/www/dev-backend/.env', quiet: true });
  const jwt = require(path.join('/var/www/dev-backend/node_modules', 'jsonwebtoken'));
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '15m' });
}

async function open(browser, who, app) {
  const ctx = await browser.newContext({ viewport: { width: 1366, height: 900 } });
  const u = U[who];
  await ctx.addInitScript(([t, r, inApp, pf]) => {
    try { localStorage.setItem('auth_token', t); localStorage.setItem('currentUserRole', r); localStorage.setItem('i18nextLng', 'en'); } catch (e) { /* */ }
    if (inApp) window.__PURPLE_DESKTOP = { isDesktop: true, platform: pf };
  }, [devToken(u.id), u.role, app && !NO_APP, PLATFORM]);
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  return { ctx, page, errors };
}

async function visit(page, url) {
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1800);
  return page.evaluate(() => document.body?.innerText || '');
}

async function navHrefs(page) {
  return page.evaluate(() => [...document.querySelectorAll('nav a[href]')].map((a) => a.getAttribute('href')));
}

/** 그 청구서 줄의 결제 버튼(Pay · Pay All · Mark paid) 수 */
async function payButtonsInRow(page, invoiceNumber) {
  const row = page.locator('tr', { hasText: invoiceNumber }).first();
  if (!(await row.count())) return -1;
  return row.locator('button', { hasText: /^(Pay|Pay All|Mark paid|결제함)$/ }).count();
}

test.describe('앱 안 결제 경로 숨기기 — 웹 vs 앱', () => {
  test.beforeEach(({ baseURL }) => assertDevBaseURL(baseURL));

  test('브랜드·푸드코트 사이드바 Plans & Payments 3항목: 웹 있음 / 앱 없음', async ({ browser, baseURL }) => {
    for (const who of ['brand', 'foodcourt']) {
      const pre = who === 'brand' ? '/pos/brand' : '/pos/foodcourt';
      for (const app of [false, true]) {
        const { ctx, page, errors } = await open(browser, who, app);
        const body = await visit(page, baseURL + U[who].home);
        // 레일 «Plans & Payments» 를 눌러 펼친다(웹) — 앱은 없어야 한다
        const sec = page.locator('nav a[href^="' + pre + '/plans"], nav a[href="' + pre + '/general/subscriptions"], nav a[href="' + pre + '/payment-settings"]').first();
        if (await sec.count()) { await sec.click(); await page.waitForTimeout(1500); }
        const hrefs = await navHrefs(page);
        const hit = hrefs.filter((h) => [pre + '/plans', pre + '/general/subscriptions', pre + '/payment-settings'].includes(h));
        expect(bodyLooksCrashed(body), who + ' 크래시').toBeFalsy();
        expect(errors, who + ' pageerror').toHaveLength(0);
        if (app) expect(hit, `${who} 앱 사이드바에 결제 메뉴가 있으면 안 된다`).toEqual([]);
        else expect(hit.length, `${who} 웹 사이드바에는 결제 메뉴가 있어야 한다(양성 대조)`).toBeGreaterThan(0);
        await ctx.close();
      }
    }
  });

  test('막는 주소 직접 진입: 웹 원래 화면 / 앱 빈 안내(주소 그대로)', async ({ browser, baseURL }) => {
    test.setTimeout(6 * 60 * 1000); // 주소 12개 × 웹·앱 = 24번 연다
    const cases = [
      ['brand', '/pos/brand/plans'], ['brand', '/pos/brand/general/subscriptions'], ['brand', '/pos/brand/payment-settings'],
      ['foodcourt', '/pos/foodcourt/plans'], ['foodcourt', '/pos/foodcourt/general/subscriptions'], ['foodcourt', '/pos/foodcourt/payment-settings'],
      ['brand', '/pos/manager/plans'], ['brand', '/pos/manager/subscriptions'],
      ['restaurant', '/restaurant/38/upgrade'],
      ['restaurant', '/pricing'], ['restaurant', '/packages'], ['restaurant', '/signup'],
    ];
    for (const app of [false, true]) {
      for (const [who, url] of cases) {
        // 역할마다 토큰이 달라 컨텍스트를 바꾼다
        const c = await open(browser, who, app);
        const body = await visit(c.page, baseURL + url);
        const shown = await c.page.locator('[data-testid="play-unavailable"]').count();
        expect(bodyLooksCrashed(body), url + ' 크래시').toBeFalsy();
        expect(c.errors, url + ' pageerror').toHaveLength(0);
        if (app) {
          expect(shown, `앱 ${url} 은 빈 안내여야 한다`).toBe(1);
          expect(new URL(c.page.url()).pathname, `앱 ${url} 은 튕기지 않는다`).toBe(url);
          const card = await c.page.locator('[data-testid="play-unavailable"]').innerText();
          expect(card).toContain('Not available in the app');
          expect(card, `앱 ${url} 안내에 결제·웹 유도 글자가 없어야 한다`).not.toMatch(/pay|web|purplehere\.com|upgrade|pricing|plan/i);
        } else {
          expect(shown, `웹 ${url} 은 원래 화면`).toBe(0);
        }
        await c.ctx.close();
      }
    }
  });

  test('프로필 구독 탭: 웹 있음(Change Plan 화면) / 앱 탭 없음 · ?tab=subscription 안내', async ({ browser, baseURL }) => {
    for (const app of [false, true]) {
      const { ctx, page, errors } = await open(browser, 'foodcourt', app);
      await visit(page, baseURL + '/pos/profile');
      const tab = await page.getByText('Subscription', { exact: true }).count();
      const body = await visit(page, baseURL + '/pos/profile?tab=subscription');
      const shown = await page.locator('[data-testid="play-unavailable"]').count();
      expect(errors).toHaveLength(0);
      if (app) {
        expect(tab, '앱 프로필에 Subscription 탭이 없어야 한다').toBe(0);
        expect(shown).toBe(1);
        expect(body).not.toMatch(/Change Plan|upgrade to add more/i);
      } else {
        expect(tab, '웹 프로필에는 Subscription 탭(양성 대조)').toBeGreaterThan(0);
        expect(shown).toBe(0);
      }
      await ctx.close();
    }
  });

  test('매장 청구서: 구독·로열티 Pay 웹 있음/앱 없음 · 실물 발주 청구서 결제는 둘 다 있음', async ({ browser, baseURL }) => {
    for (const app of [false, true]) {
      const { ctx, page, errors } = await open(browser, 'restaurant', app);
      await visit(page, baseURL + '/restaurant/38/invoices?tab=to_pay');
      // 줄을 찾을 때까지 검색칸으로 좁힌다(목록이 길면 첫 쪽에 없을 수 있다)
      const counts = {};
      for (const n of [INV_SUBSCRIPTION, INV_ROYALTY, INV_TRADE]) {
        const search = page.locator('input[type="search"], input[placeholder*="earch"]').first();
        if (await search.count()) { await search.fill(n); await page.waitForTimeout(900); }
        counts[n] = await payButtonsInRow(page, n);
      }
      expect(errors).toHaveLength(0);
      for (const n of Object.keys(counts)) expect(counts[n], `${n} 줄을 찾아야 검사가 의미 있다`).toBeGreaterThanOrEqual(0);
      expect(counts[INV_TRADE], '실물 발주 청구서는 앱에서도 결제 버튼이 있어야 한다').toBeGreaterThan(0);
      if (app) {
        expect(counts[INV_SUBSCRIPTION], '앱: 우리 구독 청구서 결제 없음').toBe(0);
        expect(counts[INV_ROYALTY], '앱: 브랜드 로열티 청구서 결제 없음').toBe(0);
      } else {
        expect(counts[INV_SUBSCRIPTION], '웹: 구독 청구서 Pay 있음(양성 대조)').toBeGreaterThan(0);
        expect(counts[INV_ROYALTY], '웹: 로열티 청구서 Pay 있음(양성 대조)').toBeGreaterThan(0);
      }
      await ctx.close();
    }
  });

  test('청구서 상세 은행 안내: 구독 청구서 웹 있음/앱 없음 · 실물 청구서 둘 다 있음 (매장·오너)', async ({ browser, baseURL }) => {
    test.setTimeout(4 * 60 * 1000);
    // [역할, 주소, 구독류 청구서, 실물 청구서]
    const cases = [
      ['restaurant', '/restaurant/38/invoices?tab=to_pay', INV_SUBSCRIPTION, INV_TRADE],
      ['owner', '/pos/owner/invoices', null, null],
    ];
    for (const [who, url, subNo, tradeNo] of cases) {
      const tradeSeen = {};
      for (const app of [false, true]) {
        const { ctx, page, errors } = await open(browser, who, app);
        // 데모 청구서에는 발행자 은행 정보가 없어 웹 양성 대조가 안 된다(2026-11-18 실측) →
        //   청구서 응답에 시험용 은행 정보를 끼워 넣는다(DB 무변경 · 웹·앱 똑같이). 웹=보임 / 앱=구독류만 안 보임.
        await page.route(/\/api\/.*invoice/i, async (route) => {
          if (route.request().method() !== 'GET') return route.continue();
          const res = await route.fetch();
          let body = await res.text();
          try {
            const j = JSON.parse(body);
            const walk = (o) => {
              if (Array.isArray(o)) return o.forEach(walk);
              if (o && typeof o === 'object') {
                if (o.invoiceNumber || o.invoice_number) {
                  o.issuerInfo = { ...(o.issuerInfo || {}), bankName: o.issuerInfo?.bankName || 'E2E Test Bank', bankAccount: o.issuerInfo?.bankAccount || '0000', bankAccountName: o.issuerInfo?.bankAccountName || 'E2E' };
                }
                Object.values(o).forEach(walk);
              }
            };
            walk(j); body = JSON.stringify(j);
          } catch (e) { /* JSON 아님 */ }
          return route.fulfill({ response: res, body });
        });
        await visit(page, baseURL + url);
        // 오너: 데모 오너 화면에 보이는 첫 구독류·실물 청구서를 고른다(목록에서 번호로)
        let sNo = subNo; let tNo = tradeNo;
        if (!sNo || !tNo) {
          const rows = await page.locator('tr').allInnerTexts();
          sNo = sNo || (rows.find((r) => /INV-/.test(r)) || '').match(/INV-[\w-]+/)?.[0] || null;
          tNo = tNo || (rows.find((r) => /TRD-/.test(r)) || '').match(/TRD-[\w-]+/)?.[0] || null;
        }
        const bankOf = async (no) => {
          if (!no) return null;
          const row = page.locator('tr', { hasText: no }).first();
          if (!(await row.count())) return null;
          await row.locator('button', { hasText: /^View$/ }).first().click();
          await page.waitForTimeout(1200);
          // 목록 화면에는 «Account Number:» 글자가 없다 — 상세 창이 열린 뒤 화면 전체에서 찾는다
          const opened = await page.getByText(/Invoice Details/).count();
          const txt = await page.evaluate(() => document.body.innerText);
          const has = opened > 0 ? /Account Number:/.test(txt) : null;
          await page.keyboard.press('Escape'); await page.waitForTimeout(500);
          const close = page.locator('button', { hasText: /^Close$/ }).last();
          if (await close.count()) { await close.click().catch(() => {}); await page.waitForTimeout(400); }
          return has;
        };
        const sub = await bankOf(sNo);
        const trade = await bankOf(tNo);
        console.log(`[bank] ${who} ${app ? 'app' : 'web'} sub(${sNo})=${sub} trade(${tNo})=${trade}`);
        expect(errors).toHaveLength(0);
        if (app) {
          if (sub !== null) expect(sub, `앱 ${who}: 구독류 청구서 상세에 은행 안내가 없어야 한다`).toBe(false);
        }
        if (who === 'restaurant') {
          expect(sub, '매장 구독 청구서 줄을 찾아야 한다').not.toBeNull();
          if (!app) expect(sub, '웹 매장 구독 청구서 상세에 은행 안내(양성 대조)').toBe(true);
        }
        tradeSeen[app ? 'app' : 'web'] = trade;
        await ctx.close();
      }
      expect(tradeSeen.app, `${who}: 실물 청구서 상세 은행 안내는 앱과 웹이 같아야 한다`).toBe(tradeSeen.web);
    }
  });

  test('요금제 없음 화면: 웹 = 기존 오버레이 / 앱 = 빈 안내 · 요금제 있으면 앱도 안 뜸', async ({ browser, baseURL }) => {
    test.setTimeout(3 * 60 * 1000);
    for (const who of ['owner', 'brand', 'foodcourt']) {
      for (const noPlan of [false, true]) {
        for (const app of [false, true]) {
          const { ctx, page, errors } = await open(browser, who, app);
          if (noPlan) {
            // 서버 «허용 화면 목록» 응답만 «요금제 없음» 으로 바꿔치기(DB 무변경) — 화면 갈림 증명용
            await page.route(/\/api\/(owner|brands\/\d+|foodcourts\/\d+)\/allowed-routes/, (route) => route.fulfill({
              status: 200, contentType: 'application/json',
              body: JSON.stringify({ plan_type: null, subscription_status: null, included_modules: [], allowed_routes: [], modules: [] }),
            }));
          }
          const body = await visit(page, baseURL + U2[who]);
          const appCard = await page.locator('[data-testid="play-unavailable"]').count();
          const webOverlay = /check your invoices to activate/i.test(body);
          console.log(`[noplan] ${who} noPlan=${noPlan} ${app ? 'app' : 'web'} card=${appCard} overlay=${webOverlay}`);
          expect(errors).toHaveLength(0);
          const userHasOwnPlan = who !== 'owner'; // 데모 브랜드·푸드코트 계정은 사용자 자체 구독 active → 원래도 오버레이 없음
          if (!noPlan) {
            expect(appCard, `${who} 요금제 있음: 앱에서도 안내가 뜨면 안 된다`).toBe(0);
            expect(webOverlay).toBe(false);
          } else if (userHasOwnPlan) {
            expect(appCard, `${who} 사용자 자체 구독 active: 안내 안 뜸(MainLayout 조건과 같음)`).toBe(0);
            expect(webOverlay).toBe(false);
          } else if (app) {
            expect(appCard, '앱 오너 요금제 없음: 빈 안내').toBe(1);
            expect(body).toContain('No active plan');
            expect(webOverlay, '앱에는 «청구서 확인해 활성화» 글이 없어야 한다').toBe(false);
          } else {
            expect(webOverlay, '웹 오너 요금제 없음: 기존 오버레이 그대로(양성 대조)').toBe(true);
            expect(appCard).toBe(0);
          }
          await ctx.close();
        }
      }
    }
  });

  test('손님 음식값 결제(POS 계산대)는 앱에서도 열린다', async ({ browser, baseURL }) => {
    for (const app of [false, true]) {
      const { ctx, page, errors } = await open(browser, 'restaurant', app);
      // POS 는 실시간 연결로 네트워크가 조용해지지 않는다 — 화면 뼈대까지만 기다린다
      await page.goto(baseURL + '/restaurant/38/pos-terminal', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(6000);
      const body = await page.evaluate(() => document.body?.innerText || '');
      expect(bodyLooksCrashed(body)).toBeFalsy();
      expect(errors).toHaveLength(0);
      expect(await page.locator('[data-testid="play-unavailable"]').count(), 'POS 는 막히면 안 된다').toBe(0);
      expect(new URL(page.url()).pathname).toBe('/restaurant/38/pos-terminal');
      await ctx.close();
    }
  });
});

// @ts-check
/**
 * 플랜 가격 표시 계약 (2026-07-11 회귀 박제).
 *
 * 계약: **화면에 보이는 가격 = 서버(PlanTemplate + 통화별 PlanPrice)가 주는 가격.**
 * 2026-07-11 이전 `/pos/manager/plans` 는 플랜 목록·가격·비교표를 코드에 하드코딩하고 있었고
 * (basic 29 / professional 99 / enterprise 199), 실제 청구가(MYR 49 / 99 / 179)와 전부 달랐다.
 * 즉 매니저는 **틀린 가격을 보고 업그레이드를 결정**했다. 백엔드끼리의 대조로는 이걸 못 잡는다
 * (두 API 가 같은 DB 를 읽으므로 항상 일치) — 그래서 "브라우저에 렌더된 숫자"를 직접 본다.
 */
const { test, expect } = require('@playwright/test');
const { demoLogin, assertDevBaseURL } = require('./fixtures/demo-guard');

test.describe('플랜 가격 = 서버 단일 소스 (하드코딩 가격표 회귀)', () => {
  test('/pos/manager/plans 에 렌더된 가격이 /api/plans 통화별 가격과 일치', async ({ page, request, baseURL }) => {
    assertDevBaseURL(baseURL);
    const { token } = await demoLogin(request, baseURL, 'test_brand_general');

    // 서버가 말하는 진짜 가격 (레스토랑 플랜, MYR)
    const res = await request.get(`${baseURL}/api/plans`);
    expect(res.status(), '/api/plans').toBe(200);
    const body = await res.json();
    const rows = Array.isArray(body) ? body : (body.data || []);
    const plans = rows
      .filter((p) => p.plan_target === 'restaurant' && p.is_active)
      .map((p) => ({
        name: p.display_name || p.name,
        monthly: p.currency_prices?.MYR?.monthly ?? Number(p.base_price_monthly),
      }))
      .filter((p) => p.monthly > 0);
    expect(plans.length, '레스토랑 플랜이 최소 1개').toBeGreaterThan(0);

    await page.context().addInitScript((tok) => {
      localStorage.setItem('auth_token', tok);
      localStorage.setItem('currentUserRole', 'Brand General');
    }, token);

    const pageErrors = [];
    page.on('pageerror', (e) => pageErrors.push(String(e)));

    await page.goto('/pos/manager/plans', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2500);

    const text = await page.evaluate(() => document.body?.innerText || '');
    expect(text.includes('Something went wrong'), 'ErrorBoundary').toBeFalsy();
    expect(pageErrors, `pageerror: ${pageErrors.slice(0, 1)}`).toHaveLength(0);

    // 서버 가격이 화면에 그대로 있어야 한다
    for (const p of plans) {
      const shown = new RegExp(`\\b${Math.round(p.monthly)}(\\.00)?\\b`).test(text);
      expect(shown, `${p.name} 의 서버가격 ${p.monthly} 가 화면에 없음 — 하드코딩 의심`).toBeTruthy();
    }
  });
});

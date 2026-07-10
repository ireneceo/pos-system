// @ts-check
/**
 * 시나리오 d — Floor Plan: zone 필터 + 테이블 클릭 (CLAUDE.md /검증 §11 d)
 * ------------------------------------------------------------------
 * 읽기 전용(데이터 무변경). demo rid=38 은 zone 1개(Main) + 테이블 3개(S-T001~003).
 *   1) Floor Plan mount (crash 0) + 테이블 3개 렌더 + zone/뷰 칩(Main) 노출
 *   2) 테이블 클릭 → 상세 패널(빈 테이블이면 "New Order") 열림, 크래시 0
 */
const { test, expect } = require('@playwright/test');
const { demoLogin, bodyLooksCrashed } = require('./fixtures/demo-guard');

test.describe('d) Floor Plan — zone 칩 + 테이블 클릭', () => {
  test('Floor Plan mount + 테이블 렌더 + 테이블 클릭 패널 (crash 0)', async ({ page, request, baseURL }) => {
    const { token, user } = await demoLogin(request, baseURL, 'demo_restaurant_admin');
    await page.context().addInitScript(([t, r]) => {
      localStorage.setItem('auth_token', t); localStorage.setItem('currentUserRole', r);
    }, [token, 'Restaurant Admin']);
    const pageErrors = [];
    page.on('pageerror', (e) => pageErrors.push(String(e)));

    await page.goto(`/restaurant/${user.restaurant_id}/floor-plan`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1800);
    let body = (await page.evaluate(() => document.body?.innerText || '')).slice(0, 5000);
    expect(pageErrors, `pageerror: ${pageErrors.slice(0, 1)}`).toHaveLength(0);
    expect(bodyLooksCrashed(body), 'ErrorBoundary/크래시').toBeFalsy();
    expect(body).toContain('Floor Plan');
    // 테이블 3개 렌더(demo 고정 데이터)
    for (const t of ['S-T001', 'S-T002', 'S-T003']) expect(body, `테이블 ${t}`).toContain(t);
    // zone/뷰 칩 행(Main zone) — 칩으로 zone/뷰 전환 가능한 UI
    expect(body, 'zone 칩(Main)').toContain('Main');

    // 테이블 클릭 → 상세 패널
    const cell = page.getByText('S-T001', { exact: false }).first();
    await expect(cell, 'S-T001 셀 존재').toHaveCount(1);
    await cell.click();
    await page.waitForTimeout(1000);
    body = (await page.evaluate(() => document.body?.innerText || '')).slice(0, 5000);
    expect(pageErrors, `클릭 후 pageerror`).toHaveLength(0);
    // 빈 테이블 패널 = 테이블 라벨 + 새 주문 진입점
    expect(body, '패널에 테이블 라벨').toContain('Table S-T001');
    expect(body, '빈 테이블 New Order 진입점').toContain('New Order');
  });
});

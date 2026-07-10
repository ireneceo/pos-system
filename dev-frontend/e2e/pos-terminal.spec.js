// @ts-check
/**
 * 시나리오 c — POS Terminal: 주문 + 결제 + 영수증 (CLAUDE.md /검증 §11 c)
 * ------------------------------------------------------------------
 * 1) POS Terminal UI mount (crash 0) — 카운터 직원 화면(메뉴·결제 컨트롤 렌더)
 * 2) POS 주문(source:pos) 생애주기 API: 생성 → 결제(cash) → 영수증 데이터(품목+총액+결제) 확인 → 삭제
 * 결제는 sandbox/cash 만(운영 webhook 금지). demo rid=38 만.
 */
const { test, expect } = require('@playwright/test');
const { demoLogin, assertDemoContext, bodyLooksCrashed, DEMO_RESTAURANT_ID } = require('./fixtures/demo-guard');
const O = require('./fixtures/demo-orders');

test.describe('c) POS Terminal — 주문 + 결제 + 영수증', () => {
  test('POS Terminal mount (crash 0) — 메뉴·결제 컨트롤 렌더', async ({ page, request, baseURL }) => {
    const { token, user } = await demoLogin(request, baseURL, 'demo_restaurant_admin');
    await page.context().addInitScript(([t, r]) => {
      localStorage.setItem('auth_token', t); localStorage.setItem('currentUserRole', r);
    }, [token, 'Restaurant Admin']);
    const pageErrors = [];
    page.on('pageerror', (e) => pageErrors.push(String(e)));

    await page.goto(`/restaurant/${user.restaurant_id}/pos-terminal`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1800);
    const body = (await page.evaluate(() => document.body?.innerText || '')).slice(0, 5000);
    expect(pageErrors, `pageerror: ${pageErrors.slice(0, 1)}`).toHaveLength(0);
    expect(bodyLooksCrashed(body), 'ErrorBoundary/크래시').toBeFalsy();
    // 핵심 POS 컨트롤 — 결제/주문유형(터치 UI 고정 컨트롤)
    expect(body).toContain('POS Terminal');
    expect(body, '결제 버튼(Pay Now)').toContain('Pay Now');
    expect(body, '주문유형(Dine In)').toContain('Dine In');
    expect(body, '메뉴 가격(RM) 노출').toMatch(/RM\s?\d/);
  });

  test('POS 주문 → 결제 → 영수증 데이터 → 삭제 (API 결정적)', async ({ request, baseURL }) => {
    const { token, user } = await demoLogin(request, baseURL, 'demo_restaurant_admin');
    assertDemoContext(baseURL, user);

    let orderId = null;
    try {
      // POS 주문 생성(source:pos)
      const created = await O.createDemoOrder(request, baseURL, token, user, { source: 'pos', total_amount: 30 });
      orderId = created.id;
      expect([200, 201]).toContain(created.res.status());
      expect(orderId).toBeTruthy();

      // 결제(cash sandbox)
      expect([200, 201]).toContain(await O.addPayment(request, baseURL, token, orderId, { amount: 30, payment_method: 'cash', amount_received: 30, change_amount: 0 }));

      // 영수증 데이터: 품목 + 총액 + 결제완료 (빌/영수증 인쇄 소스)
      const receipt = await O.getOrder(request, baseURL, token, orderId);
      expect(receipt.payment_status, '결제완료').toBe('completed');
      expect(Array.isArray(receipt.order_items) && receipt.order_items.length >= 2, '영수증 품목').toBeTruthy();
      expect(Number(receipt.total_amount), '영수증 총액>0').toBeGreaterThan(0);

      // 삭제
      expect(await O.softDeleteOrder(request, baseURL, token, orderId)).toBe(200);
      orderId = null;
    } finally {
      if (orderId) await O.softDeleteOrder(request, baseURL, token, orderId).catch(() => {});
    }
  });
});

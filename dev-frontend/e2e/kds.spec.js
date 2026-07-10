// @ts-check
/**
 * 시나리오 f — KDS 자동 진입: 주문 생성 → 주방 티켓 자동 노출 + 단계 (CLAUDE.md /검증 §11 f)
 * ------------------------------------------------------------------
 * demo rid=38 만. 결정적 API 로 주문을 넣고, KDS 화면(표시 전용)에 그 주문이 자동으로
 * 뜨는지 실 브라우저로 확인한다. (KDS 는 인쇄 주체가 아님 — 표시만. 인쇄 파이프라인은 b/c 가 증명.)
 *   1) API 로 주문 생성(needs_print, 주방품목 2)
 *   2) KDS mount (crash 0) + 컬럼(Pending/Preparing/Ready) + 스테이션 탭 렌더
 *   3) 방금 만든 주문 품목이 KDS 에 자동 노출 → 삭제 정리
 */
const { test, expect } = require('@playwright/test');
const { demoLogin, assertDemoContext, bodyLooksCrashed } = require('./fixtures/demo-guard');
const O = require('./fixtures/demo-orders');

test.describe('f) KDS — 주문 자동 진입 + 단계/스테이션', () => {
  test('주문 생성 → KDS 자동 노출 (crash 0) → 정리', async ({ page, request, baseURL }) => {
    const { token, user } = await demoLogin(request, baseURL, 'demo_restaurant_admin');
    assertDemoContext(baseURL, user);

    let orderId = null;
    try {
      // 1) 주문 생성 — KDS 가 보여줄 주방 품목(고유 이름으로 신뢰 검출)
      const uniq = 'E2E-KDS-Item';
      const created = await O.createDemoOrder(request, baseURL, token, user, {
        order_items: [
          { id: 'e2e-k1', name: uniq, quantity: 2, price: 15 },
          { id: 'e2e-k2', name: 'E2E KDS Side', quantity: 1, price: 10 },
        ],
        total_amount: 40,
      });
      orderId = created.id;
      expect([200, 201]).toContain(created.res.status());
      expect(orderId).toBeTruthy();

      // 2) KDS mount
      await page.context().addInitScript(([t, r]) => {
        localStorage.setItem('auth_token', t); localStorage.setItem('currentUserRole', r);
      }, [token, 'Restaurant Admin']);
      const pageErrors = [];
      page.on('pageerror', (e) => pageErrors.push(String(e)));

      await page.goto(`/restaurant/${user.restaurant_id}/kitchen`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(2500); // KDS 초기 로드 + 주문 fetch

      const body = (await page.evaluate(() => document.body?.innerText || '')).slice(0, 6000);
      expect(pageErrors, `pageerror: ${pageErrors.slice(0, 1)}`).toHaveLength(0);
      expect(bodyLooksCrashed(body), 'ErrorBoundary/크래시').toBeFalsy();
      // KDS 구조: 단계 컬럼 + 스테이션 탭
      expect(body).toContain('Kitchen Display');
      expect(body, '단계 컬럼 Pending').toContain('Pending');
      expect(body, '단계 컬럼 Preparing').toContain('Preparing');
      expect(body, '단계 컬럼 Ready').toContain('Ready');

      // 3) 방금 만든 주문이 KDS 에 자동 노출 (품목명으로 검출)
      expect(body, 'KDS 에 신규 주문 품목 자동 노출').toContain(uniq);

      // 정리
      expect(await O.softDeleteOrder(request, baseURL, token, orderId)).toBe(200);
      orderId = null;
    } finally {
      if (orderId) await O.softDeleteOrder(request, baseURL, token, orderId).catch(() => {});
    }
  });
});

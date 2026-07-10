// @ts-check
/**
 * 시나리오 b — mobile order full flow: 메뉴 → 주문 생성 → 인쇄 → 단계 → 결제 (CLAUDE.md /검증 §11 b)
 * ------------------------------------------------------------------
 * 정책: demo restaurant(rid=38) 만, mutation 은 결정적인 API(request)로 태워 flaky 0.
 *   1) 모바일 고객 메뉴 UI mount (crash 0) — 손님이 QR 로 보는 화면
 *   2) 주문 생애주기 API 실증: 생성 → 주방인쇄 파이프라인(claim 경쟁 1/N·재인쇄 0·+Round 새것만)
 *      → 단계이동(pending→preparing→ready→served) → 결제(cash) → 정식 삭제
 * 실제 종이 출력만은 코드로 못 봄(with MIN 매장 1회 확인) — 여기선 인쇄 "파이프라인 계약"까지.
 */
const { test, expect } = require('@playwright/test');
const { demoLogin, assertDemoContext, injectAuth, bodyLooksCrashed, DEMO_RESTAURANT_ID } = require('./fixtures/demo-guard');
const O = require('./fixtures/demo-orders');

const DEMO_SLUG = 'demo-korean-bbq'; // rid=38 Seoul Garden BBQ

test.describe('b) mobile order full flow — 메뉴→주문→인쇄→단계→결제', () => {
  test('모바일 고객 메뉴 mount (crash 0)', async ({ page, baseURL }) => {
    const pageErrors = [];
    page.on('pageerror', (e) => pageErrors.push(String(e)));
    await page.goto(`/mobile/${DEMO_SLUG}/menu`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500);
    const body = (await page.evaluate(() => document.body?.innerText || '')).slice(0, 4000);
    expect(pageErrors, `pageerror: ${pageErrors.slice(0, 1)}`).toHaveLength(0);
    expect(bodyLooksCrashed(body), 'ErrorBoundary/크래시').toBeFalsy();
    // 메뉴가 실제로 렌더(가게명 + 최소 1개 품목 가격)
    expect(body, '가게명 노출').toContain('Seoul Garden BBQ');
    expect(body, '메뉴 가격(RM) 노출').toMatch(/RM\s?\d/);
  });

  test('주문 생애주기 — 생성→인쇄→+Round→단계→결제→삭제 (API 결정적)', async ({ request, baseURL }) => {
    const { token, user } = await demoLogin(request, baseURL, 'demo_restaurant_admin');
    assertDemoContext(baseURL, user);
    expect(user.restaurant_id).toBe(DEMO_RESTAURANT_ID);

    let orderId = null;
    try {
      // 1) 생성
      const created = await O.createDemoOrder(request, baseURL, token, user);
      orderId = created.id;
      expect([200, 201], `주문 생성 HTTP ${created.res.status()}`).toContain(created.res.status());
      expect(orderId, '생성 주문 id').toBeTruthy();

      // 2) pending-print 캐치 + kitchen_items 2개
      let pend = await O.getPendingPrint(request, baseURL, token);
      let mine = pend.find((o) => o.id === orderId);
      expect(mine, 'pending-print 에 잡힘').toBeTruthy();
      expect(mine.kitchen_items?.length, 'kitchen_items=2').toBe(2);

      // 3) 동시 print-claim ×5 → 정확히 1개만 claimed (티켓 중복 방지의 핵심)
      const claims = await Promise.all([1, 2, 3, 4, 5].map(() => O.claimPrint(request, baseURL, token, orderId)));
      expect(claims.filter((c) => c.claimed).length, '동시 claim ×5 → 정확히 1개').toBe(1);

      // 4) printed 도장 → pending-print 에서 사라짐(재인쇄 0)
      expect(await O.markPrinted(request, baseURL, token, orderId)).toBe(200);
      pend = await O.getPendingPrint(request, baseURL, token);
      expect(pend.some((o) => o.id === orderId), 'printed 후 pending 에서 사라짐').toBeFalsy();

      // 5) +Round: 새 품목만 주방행, 빌은 전체
      const cur = await O.getOrder(request, baseURL, token, orderId);
      const items = [...(cur.order_items || []), { id: 'e2e-r2', name: 'E2E Round2 NEW', quantity: 1, price: 15 }];
      expect(await O.patchOrder(request, baseURL, token, orderId, { order_items: items, needs_print: true, total_amount: 45 })).toBe(200);
      pend = await O.getPendingPrint(request, baseURL, token);
      mine = pend.find((o) => o.id === orderId);
      expect(mine?.kitchen_items?.length, '+Round 주방=새것만 1개').toBe(1);
      expect(mine?.kitchen_items?.[0]?.name).toBe('E2E Round2 NEW');
      expect(mine?.order_items?.length, '+Round 빌=전체 3개').toBe(3);
      await O.markPrinted(request, baseURL, token, orderId);

      // 6) 단계이동 pending→preparing→ready→served
      for (const st of ['preparing', 'ready', 'served']) {
        const r = await O.setStatus(request, baseURL, token, orderId, st);
        expect(r.status, `단계 → ${st}`).toBe(200);
        expect([st, 'completed'], `status=${r.order?.status}`).toContain(r.order?.status);
      }

      // 7) 결제(cash) → payment_status=completed
      expect([200, 201]).toContain(await O.addPayment(request, baseURL, token, orderId, { amount: 45, payment_method: 'cash', amount_received: 50, change_amount: 5 }));
      const fin = await O.getOrder(request, baseURL, token, orderId);
      expect(fin.payment_status, '결제완료').toBe('completed');

      // 8) 정식 삭제(soft) → live 뷰에서 사라짐
      expect(await O.softDeleteOrder(request, baseURL, token, orderId)).toBe(200);
      orderId = null;
    } finally {
      if (orderId) await O.softDeleteOrder(request, baseURL, token, orderId).catch(() => {});
    }
  });
});

// @ts-check
/**
 * 시나리오 b — mobile order full flow: 메뉴 → 장바구니 → 결제 → 주문 생성 (CLAUDE.md /검증 §11 b)
 * ------------------------------------------------------------------
 * ⚠ 현재 = 명세 스텁(test.skip). 이 시나리오는 DB 를 바꾸는(주문 생성) 유일한 시나리오라
 *   demo-guard(rid=38) + 결제 sandbox + 생성 주문 정리까지 갖춘 뒤에만 활성화한다.
 *   selector 는 실제 모바일 메뉴 DOM 대조 후 채운다(blind 작성 금지 — flaky 게이트 방지).
 *
 * 활성화 체크리스트(구현 시):
 *   1) assertDemoContext(baseURL, user)  — 반드시 demo_restaurant_admin(rid=38) 컨텍스트
 *   2) 모바일 메뉴 진입: /order/{demoSlug} 또는 QR 경로 → 카테고리/아이템 로드 대기
 *   3) 아이템 담기 → 스티키 카트바 → 체크아웃
 *   4) 결제 = Stripe test card 4242 4242 4242 4242 (sandbox), 운영 webhook 절대 금지
 *   5) 주문 생성 확인(주문번호 노출) → 생성된 주문 cleanup(취소/삭제 API)
 *   6) 3회 연속 통과(flaky 0) 확인 후 게이트 편입 검토
 */
const { test, expect } = require('@playwright/test');
const { demoLogin, assertDemoContext, DEMO_RESTAURANT_ID } = require('./fixtures/demo-guard');

test.describe('b) mobile order full flow — 메뉴→카트→결제→주문', () => {
  test.skip('메뉴 → 장바구니 → 결제(sandbox) → 주문 생성 (구현 대기)', async ({ request, baseURL }) => {
    // 전제 가드만 실동작으로 남겨둠: demo 컨텍스트가 아니면 여기서 이미 throw → 운영 오염 불가.
    const { user } = await demoLogin(request, baseURL, 'demo_restaurant_admin');
    assertDemoContext(baseURL, user);
    expect(user.restaurant_id).toBe(DEMO_RESTAURANT_ID);
    // TODO: 위 활성화 체크리스트 2~6 구현.
  });
});

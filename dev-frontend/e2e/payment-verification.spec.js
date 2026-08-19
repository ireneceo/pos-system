// @ts-check
/**
 * 결제 증빙 검증(Confirm Payment / Reject) — 실패가 화면에 드러나는지 + 버튼이 영구 잠기지 않는지
 * ------------------------------------------------------------------------------------
 * 2026-08-19 사고: with MIN #260819-010 에서 "Confirm Payment 버튼이 눌리지가 않아".
 * 운영 실측 결과 실패 구간에 이 주문의 PATCH 가 **서버에 한 건도 도달하지 않았고**, 같은 매장의
 * 다른 주문 PATCH 는 성공했다 → 백엔드가 아니라 클릭이 클라이언트에서 삼켜진 것.
 * 근본 = ①fetch 타임아웃 없음 → 공용 Button 의 async 가드(중복결제 방지)가 promise settle 을
 * 기다리며 버튼을 영구 비활성으로 잠금 ②res.ok 미확인 + catch 무음 → 실패가 아무 데도 안 보임.
 *
 * 이 스펙은 **고장주입**으로 그 방어를 증명한다(계약만 통과하는 헛테스트 금지):
 *   FI-1 서버 500  → 모달 유지 + 사유 표시 + 버튼 재클릭 가능 + DB 미변경
 *   FI-2 무응답(hang) → 타임아웃으로 반드시 settle → 사유 표시 + 버튼 재클릭 가능 + DB 미변경
 *   OK   정상       → 모달 닫힘 + DB payment_status=completed
 * 방어를 지우면(res.ok 확인 제거 / fetchWithTimeout → fetch) FI-1·FI-2 가 실패해야 한다.
 *
 * demo rid=38 전용(demo-guard), MARKER 주문 → 남아도 orphan sweep 이 정리.
 */
const { test, expect } = require('@playwright/test');
const { demoLogin, assertDemoContext, bodyLooksCrashed } = require('./fixtures/demo-guard');
const { createDemoOrder, patchOrder, getOrder, softDeleteOrder } = require('./fixtures/demo-orders');

const PROOF = {
  current: { reference: 'E2E-VERIFY-REF', file_name: 'e2e-proof.png', uploaded_at: '2026-08-19T08:45:00.000Z' },
  history: [],
};

/** 검증 대기 상태의 demo 주문 생성 */
async function makePendingVerifyOrder(request, baseURL, token, user) {
  const { id } = await createDemoOrder(request, baseURL, token, user, {
    status: 'outstanding', payment_method: 'bankTransfer', needs_print: false, total_amount: 30,
  });
  expect(id, '주문 생성').toBeTruthy();
  const st = await patchOrder(request, baseURL, token, id, {
    payment_status: 'payment_verification_pending', payment_proof: PROOF,
  });
  expect(st, 'payment_verification_pending 전이').toBe(200);
  return id;
}

/** LiveOrders 진입 + 대상 주문의 Confirm Payment 모달 열기 */
async function openVerifyModal(page, user, orderNumber, pageErrors) {
  // LiveOrders 는 상시 폴링(+소켓)이라 networkidle 이 절대 오지 않는다 → domcontentloaded + 실제 렌더 대기.
  await page.goto(`/restaurant/${user.restaurant_id}/live-orders`, { waitUntil: 'domcontentloaded' });
  await expect(page.getByText(orderNumber, { exact: false }).first(), `대상 주문 ${orderNumber} 노출`)
    .toBeVisible({ timeout: 30000 });
  const body = (await page.evaluate(() => document.body?.innerText || '')).slice(0, 8000);
  expect(bodyLooksCrashed(body), 'LiveOrders mount 크래시').toBeFalsy();
  expect(pageErrors, `mount pageerror: ${pageErrors.slice(0, 1)}`).toHaveLength(0);

  // 카드의 Confirm Payment(첫 번째) → 모달 오픈. 모달 footer 버튼은 portal 이라 DOM 뒤 = .last()
  await page.getByRole('button', { name: 'Confirm Payment' }).first().click();
  await expect(page.getByText('Payment Verification', { exact: true }), '모달 제목').toBeVisible();
  await expect(page.getByText('E2E-VERIFY-REF'), '증빙 reference 표시').toBeVisible();
}

const modalConfirm = (page) => page.getByRole('button', { name: 'Confirm Payment' }).last();

/**
 * DB 재조회 — 읽기 자체가 실패하면 "결제상태 유지 실패"로 위장되지 않게 분리해서 단정한다.
 * (2026-08-19: 다른 검증(verify-all)과 동시 실행 시 이 GET 이 한 번 실패해 결제 회귀처럼 보였다.)
 */
async function readOrderStrict(request, baseURL, token, id) {
  let o = await getOrder(request, baseURL, token, id);
  if (!o || !o.payment_status) {                 // 일시적 읽기 실패 → 1회 재시도
    await new Promise((r) => setTimeout(r, 1500));
    o = await getOrder(request, baseURL, token, id);
  }
  expect(o && o.payment_status, 'DB 재조회 자체가 성공해야 한다(실패면 테스트 환경 문제)').toBeTruthy();
  return o;
}

test.describe('결제 증빙 검증 — 실패 가시화 + 버튼 잠김 방지 (고장주입)', () => {
  let token, user, orderId, orderNumber;

  test.beforeAll(async ({ request, baseURL }) => {
    ({ token, user } = await demoLogin(request, baseURL, 'demo_restaurant_admin'));
    assertDemoContext(baseURL, user);           // rid=38 아니면 여기서 차단(운영 오염 불가)
  });

  test.beforeEach(async ({ request, baseURL }) => {
    orderId = await makePendingVerifyOrder(request, baseURL, token, user);
    const o = await getOrder(request, baseURL, token, orderId);
    orderNumber = o.order_number;
  });

  test.afterEach(async ({ request, baseURL }) => {
    if (orderId) await softDeleteOrder(request, baseURL, token, orderId);
    orderId = null;
  });

  test('FI-1 서버 500 → 모달 유지 + 사유 표시 + 재클릭 가능 + DB 미변경', async ({ page, request, baseURL }) => {
    const pageErrors = [];
    page.on('pageerror', (e) => pageErrors.push(String(e)));
    await page.context().addInitScript(([t, r]) => {
      localStorage.setItem('auth_token', t); localStorage.setItem('currentUserRole', r);
    }, [token, 'Restaurant Admin']);

    await openVerifyModal(page, user, orderNumber, pageErrors);

    // 고장주입: 이 주문의 PATCH 만 500 (다른 요청 무영향)
    await page.route(`**/api/orders/${orderId}`, async (route) => {
      if (route.request().method() === 'PATCH') {
        return route.fulfill({ status: 500, contentType: 'application/json',
          body: JSON.stringify({ success: false, error: 'E2E injected server failure' }) });
      }
      return route.fallback();
    });

    await modalConfirm(page).click();
    // 사유가 모달 안에 보인다(토스트는 모달 뒤로 갈 수 있음)
    // 모달 **안**에 사유가 뜨는지로 단정(토스트는 모달 오버레이 뒤로 갈 수 있어 매장에서 안 보인다)
    await expect(page.getByTestId('verify-error'), '모달 안 실패 사유 배너').toBeVisible({ timeout: 10000 });
    await expect(page.getByTestId('verify-error'), '사유 내용').toContainText(/E2E injected server failure|Server rejected the request/);
    // 모달 유지 + 버튼 재클릭 가능(영구 잠김 아님)
    await expect(page.getByText('Payment Verification', { exact: true }), '모달 유지').toBeVisible();
    await expect(modalConfirm(page), 'Confirm 버튼 재클릭 가능').toBeEnabled();
    // DB 미변경 — 실패했는데 결제로 기록되면 최악
    const after = await readOrderStrict(request, baseURL, token, orderId);
    expect(after.payment_status, '실패 시 결제상태 유지').toBe('payment_verification_pending');
  });

  test('FI-2 서버 무응답(hang) → 타임아웃 후 사유 표시 + 버튼 재클릭 가능 + DB 미변경', async ({ page, request, baseURL }) => {
    const pageErrors = [];
    page.on('pageerror', (e) => pageErrors.push(String(e)));
    await page.context().addInitScript(([t, r]) => {
      localStorage.setItem('auth_token', t); localStorage.setItem('currentUserRole', r);
    }, [token, 'Restaurant Admin']);

    await openVerifyModal(page, user, orderNumber, pageErrors);

    // 고장주입: PATCH 를 영원히 안 돌려준다(= 매장에서 버튼이 죽던 조건)
    await page.route(`**/api/orders/${orderId}`, async (route) => {
      if (route.request().method() === 'PATCH') return;   // 응답 없음(hang)
      return route.fallback();
    });

    await modalConfirm(page).click();
    // 15s 타임아웃 → promise settle → 사유 표시(방어 없으면 영구 비활성으로 아무 일도 안 일어남)
    await expect(page.getByTestId('verify-error'), '모달 안 타임아웃 배너').toBeVisible({ timeout: 25000 });
    await expect(page.getByTestId('verify-error'), '사유 내용').toContainText(/No response from the server/);
    await expect(modalConfirm(page), '타임아웃 후 버튼 재클릭 가능').toBeEnabled();
    const after = await readOrderStrict(request, baseURL, token, orderId);
    expect(after.payment_status, '타임아웃 시 결제상태 유지').toBe('payment_verification_pending');
  });

  test('OK 정상 확인 → 모달 닫힘 + 결제완료 + 주방 전송(pending)', async ({ page, request, baseURL }) => {
    const pageErrors = [];
    page.on('pageerror', (e) => pageErrors.push(String(e)));
    await page.context().addInitScript(([t, r]) => {
      localStorage.setItem('auth_token', t); localStorage.setItem('currentUserRole', r);
    }, [token, 'Restaurant Admin']);

    await openVerifyModal(page, user, orderNumber, pageErrors);
    await modalConfirm(page).click();
    await expect(page.getByText('Payment Verification', { exact: true }), '성공 시 모달 닫힘').toBeHidden({ timeout: 15000 });
    expect(pageErrors, `pageerror: ${pageErrors.slice(0, 1)}`).toHaveLength(0);

    const after = await readOrderStrict(request, baseURL, token, orderId);
    expect(after.payment_status, '결제완료 기록').toBe('completed');
    expect(after.status, 'outstanding → pending(주방 전송)').toBe('pending');
  });
});

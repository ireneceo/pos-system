// @ts-check
/**
 * demo-orders.js — 주문 생애주기 API 헬퍼 (b/c/f 시나리오 공용, 단일 소스)
 * ------------------------------------------------------------------
 * 모든 mutation 은 demo restaurant(rid=38) + MARKER 로만. Playwright `request`(APIRequestContext)
 * 로 실제 HTTP 엔드포인트를 태운다(= 결정적, flaky 0). 브라우저 UI 계층과 분리해
 * "주문 생성→인쇄 파이프라인→단계이동→결제→삭제" 데이터 흐름을 증명한다.
 *
 * MARKER 는 health-check 의 print orphan-sweep 가 하드-정리(자식행 cascade)하는 값과 동일 →
 * 스펙이 죽어 cleanup 을 못 해도 다음 verify-all/배포 게이트에서 누적분이 자동 청소된다.
 */
const { apiBase, authHeaders, assertDemoContext, DEMO_RESTAURANT_ID } = require('./demo-guard');

const MARKER = '__HC_PRINT_TEST__';
const TEST_TABLE = 'E2E-99';

const jsonOf = async (res) => { try { return await res.json(); } catch { return {}; } };
const idOf = (body) => body?.data?.id || body?.id || body?.order?.id;

/** demo(rid=38) dine-in 주문 생성. over 로 필드 오버라이드. { res, id, body } 반환. */
async function createDemoOrder(request, baseURL, token, user, over = {}) {
  assertDemoContext(baseURL, user); // rid=38 아니면 여기서 throw → 운영 오염 불가
  const data = {
    restaurant_id: DEMO_RESTAURANT_ID, customer_name: MARKER, table_number: TEST_TABLE,
    order_type: 'dine_in', source: 'pos', status: 'pending', needs_print: true, total_amount: 30,
    order_items: [
      { id: 'e2e-1', name: 'E2E Bulgogi', quantity: 1, price: 15 },
      { id: 'e2e-2', name: 'E2E Bibimbap', quantity: 1, price: 15 },
    ],
    ...over,
  };
  const res = await request.post(apiBase(baseURL) + '/orders', { headers: authHeaders(token), data });
  const body = await jsonOf(res);
  return { res, id: idOf(body), body };
}

/** rid=38 pending-print 큐(폴러가 보는 것) — 각 주문에 kitchen_items(미인쇄분만) 포함. */
async function getPendingPrint(request, baseURL, token) {
  const res = await request.get(apiBase(baseURL) + `/orders/restaurant/${DEMO_RESTAURANT_ID}/pending-print`, { headers: authHeaders(token) });
  const body = await jsonOf(res);
  return body?.data || [];
}

async function claimPrint(request, baseURL, token, id) {
  const res = await request.patch(apiBase(baseURL) + `/orders/${id}/print-claim`, { headers: authHeaders(token), data: {} });
  const body = await jsonOf(res);
  return { ok: res.status() === 200, claimed: body?.claimed === true || body?.data?.claimed === true };
}

async function markPrinted(request, baseURL, token, id) {
  const res = await request.patch(apiBase(baseURL) + `/orders/${id}/printed`, { headers: authHeaders(token), data: {} });
  return res.status();
}

async function getOrder(request, baseURL, token, id) {
  const res = await request.get(apiBase(baseURL) + `/orders/${id}`, { headers: authHeaders(token) });
  const body = await jsonOf(res);
  return body?.data || body;
}

/** 통짜 업데이트(+Round 추가 등) — PATCH /orders/:id */
async function patchOrder(request, baseURL, token, id, patch) {
  const res = await request.patch(apiBase(baseURL) + `/orders/${id}`, { headers: authHeaders(token), data: patch });
  return res.status();
}

/** 단계이동 — PATCH /orders/:id/status */
async function setStatus(request, baseURL, token, id, status) {
  const res = await request.patch(apiBase(baseURL) + `/orders/${id}/status`, { headers: authHeaders(token), data: { status } });
  const body = await jsonOf(res);
  return { status: res.status(), order: body?.data || body };
}

/** 결제 기록 — POST /orders/:id/payments */
async function addPayment(request, baseURL, token, id, payment) {
  const res = await request.post(apiBase(baseURL) + `/orders/${id}/payments`, { headers: authHeaders(token), data: payment });
  return res.status();
}

/** 정식 삭제(소프트) — DELETE /orders/:id. live 뷰에서 사라짐. */
async function softDeleteOrder(request, baseURL, token, id) {
  if (!id) return 0;
  const res = await request.delete(apiBase(baseURL) + `/orders/${id}`, { headers: authHeaders(token) });
  return res.status();
}

module.exports = {
  MARKER, TEST_TABLE,
  createDemoOrder, getPendingPrint, claimPrint, markPrinted, getOrder, patchOrder, setStatus, addPayment, softDeleteOrder,
};

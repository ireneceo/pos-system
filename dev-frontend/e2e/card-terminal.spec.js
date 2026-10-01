// @ts-check
/**
 * 카드단말기 ECR 자동연동(GHL) — 실브라우저 흐름 (Fable 설계 .claude/fable-design-20261001-ghl-ecr.md §4 P3)
 * ------------------------------------------------------------------------------------------
 * 계산대 앱 브릿지(window.__NATIVE_ECR)를 목으로 주입한다. 목은 Node 쪽 목 단말기
 * (dev-backend/scripts/mock-ghl-terminal.respond)를 불러 **서버 코덱과 같은 프레임**을 돌려준다.
 *   A 승인      → 결제 완료 · 주문 transaction_id = GHL:… · 단말기 거래 approved
 *   B 거절(51)  → 모달 유지 · «Card not approved» · 주문 미결제 그대로(기록 0)
 *   C 무응답    → 자동 Reprint 복구 → 승인으로 결제 완료
 *   D 브릿지 없음(브라우저) → 안내 문구만, 단말기 호출 0 (오늘 동작 그대로)
 * demo rid=38 전용(demo-guard). 매장 설정 card.terminal 은 테스트 동안만 켜고 원복한다.
 */
const { test, expect } = require('@playwright/test');
const { demoLogin, assertDemoContext, bodyLooksCrashed, apiBase, authHeaders } = require('./fixtures/demo-guard');
const { createDemoOrder, getOrder, softDeleteOrder } = require('./fixtures/demo-orders');
const { respond } = require('/var/www/dev-backend/scripts/mock-ghl-terminal');
// 매장 설정 토글은 dev DB 직접(설정 저장 API 의 wipe 잠금을 테스트가 우회하지 않게 — 켜고 원본 그대로 되돌린다)
require('/var/www/dev-backend/node_modules/dotenv').config({ path: '/var/www/dev-backend/.env' });
const { sequelize } = require('/var/www/dev-backend/config/database');

let token, user, originalPs;

async function setTerminal(enabled) {
  const [[row]] = await sequelize.query('SELECT payment_settings FROM restaurants WHERE id = 38');
  if (originalPs === undefined) originalPs = row.payment_settings;
  const ps = row.payment_settings ? JSON.parse(row.payment_settings) : {};
  ps.card = { ...(ps.card || {}), enabled: true, availableIn: ['pos'], acceptedTypes: [], requireType: false, requireCardType: false,
    terminal: { enabled, provider: 'ghl_ecr', host: '192.168.2.99', port: 33898, transport: 'http-hex' } };
  await sequelize.query('UPDATE restaurants SET payment_settings = :v WHERE id = 38', { replacements: { v: JSON.stringify(ps) } });
}

/** 목 브릿지 주입 — scenario 가 바뀌면 다음 호출부터 적용. calls 에 단말기로 간 명령을 쌓는다. */
async function installBridge(page, state) {
  await page.exposeFunction('__mockEcrExchange', async (job) => {
    // 단말기가 다른 주소로 옮겨간 상황: 옛 주소는 연결 거부, 실제 주소만 응답
    if (state.realHost && job.host !== state.realHost) return { ok: false, error: 'CONNECT_REFUSED' };
    const cmd = job.payloadHex.slice(12, 14);
    state.calls.push(cmd);
    const out = respond(job.payloadHex, state.scenario);
    if (cmd === 'A1' && state.scenario === 'timeout') state.scenario = 'approve'; // 이어지는 Reprint 는 정상 응답
    return out === null ? { ok: false, error: 'TIMEOUT' } : { ok: true, responseHex: out };
  });
  await page.exposeFunction('__mockEcrDiscover', async () => { state.discovered = (state.discovered || 0) + 1; return { ok: true, hosts: state.realHost ? [state.realHost] : [] }; });
  await page.addInitScript(() => {
    // @ts-ignore
    window.__NATIVE_ECR = { available: true, exchange: (job) => window.__mockEcrExchange(job), discover: (job) => window.__mockEcrDiscover(job) };
  });
}

async function openPayment(page, orderNumber, pageErrors) {
  await page.goto(`/restaurant/${user.restaurant_id}/live-orders`, { waitUntil: 'domcontentloaded' });
  await expect(page.getByText(orderNumber, { exact: false }).first(), `주문 ${orderNumber} 노출`).toBeVisible({ timeout: 30000 });
  const card = page.locator('div', { hasText: orderNumber }).filter({ has: page.getByRole('button', { name: 'Payment', exact: true }) }).last();
  await card.getByRole('button', { name: 'Payment', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Confirm Payment' }).last(), '결제 모달').toBeVisible();
  await page.getByText('Card', { exact: true }).last().click();
  const body = (await page.evaluate(() => document.body?.innerText || '')).slice(0, 8000);
  expect(bodyLooksCrashed(body), '모달 크래시').toBeFalsy();
  expect(pageErrors, `pageerror: ${pageErrors.slice(0, 1)}`).toHaveLength(0);
}

async function terminalRowsFor(request, baseURL, orderId) {
  const res = await request.get(apiBase(baseURL) + '/terminal/transactions?restaurant_id=38&limit=50', { headers: authHeaders(token) });
  const j = await res.json();
  return (j.data || []).filter((r) => Number(r.order_id) === Number(orderId));
}

test.describe('카드단말기 ECR — 결제 창 흐름(목 브릿지)', () => {
  let orderId, orderNumber;

  test.beforeAll(async ({ request, baseURL }) => {
    ({ token, user } = await demoLogin(request, baseURL, 'demo_restaurant_admin'));
    assertDemoContext(baseURL, user);
    await setTerminal(true);
  });
  test.afterAll(async () => {
    if (originalPs !== undefined) await sequelize.query('UPDATE restaurants SET payment_settings = :v WHERE id = 38', { replacements: { v: originalPs } });
    await sequelize.close();
  });
  test.beforeEach(async ({ request, baseURL, page }) => {
    const r = await createDemoOrder(request, baseURL, token, user, { needs_print: false, total_amount: 30, payment_status: 'pending', status: 'pending' });
    orderId = r.id;
    orderNumber = (await getOrder(request, baseURL, token, orderId)).order_number;
    await page.context().addInitScript(([t, ro]) => { localStorage.setItem('auth_token', t); localStorage.setItem('currentUserRole', ro); }, [token, 'Restaurant Admin']);
  });
  test.afterEach(async ({ request, baseURL }) => {
    if (orderId) await softDeleteOrder(request, baseURL, token, orderId);
    orderId = null;
  });

  test('A 승인 → 결제 완료 · 주문 transaction_id · 거래 approved', async ({ page, request, baseURL }) => {
    const pageErrors = []; page.on('pageerror', (e) => pageErrors.push(String(e)));
    const state = { scenario: 'approve', calls: [] };
    await installBridge(page, state);
    await openPayment(page, orderNumber, pageErrors);
    await expect(page.getByText('The amount will be sent to the card terminal automatically.')).toBeVisible();
    await page.getByRole('button', { name: 'Confirm Payment' }).last().click();
    await expect(page.getByRole('button', { name: 'Confirm Payment' }), '모달 닫힘').toHaveCount(0, { timeout: 20000 });
    const o = await getOrder(request, baseURL, token, orderId);
    expect(o.payment_status).toBe('completed');
    expect(o.payment_method).toBe('card');
    expect(String(o.transaction_id || '')).toMatch(/^GHL:/);
    const rows = await terminalRowsFor(request, baseURL, orderId);
    expect(rows.some((r) => r.status === 'approved' && r.card_type === 'visa' && Number(r.amount) === 30)).toBeTruthy();
    expect(state.calls).toEqual(['A1']);
    expect(pageErrors).toHaveLength(0);
  });

  test('B 거절 → 모달 유지 · 안내 · 결제 기록 0', async ({ page, request, baseURL }) => {
    const pageErrors = []; page.on('pageerror', (e) => pageErrors.push(String(e)));
    const state = { scenario: 'decline', calls: [] };
    await installBridge(page, state);
    await openPayment(page, orderNumber, pageErrors);
    await page.getByRole('button', { name: 'Confirm Payment' }).last().click();
    await expect(page.getByText('Card not approved')).toBeVisible({ timeout: 20000 });
    await expect(page.getByRole('button', { name: 'Confirm Payment' }).last(), '모달 유지').toBeVisible();
    const o = await getOrder(request, baseURL, token, orderId);
    expect(o.payment_status).toBe('pending');
    expect(o.transaction_id || null).toBeNull();
    expect(pageErrors).toHaveLength(0);
  });

  test('C 무응답 → 자동 Reprint 복구 → 결제 완료', async ({ page, request, baseURL }) => {
    const pageErrors = []; page.on('pageerror', (e) => pageErrors.push(String(e)));
    const state = { scenario: 'timeout', calls: [] };
    await installBridge(page, state);
    await openPayment(page, orderNumber, pageErrors);
    await page.getByRole('button', { name: 'Confirm Payment' }).last().click();
    await expect(page.getByRole('button', { name: 'Confirm Payment' }), '모달 닫힘').toHaveCount(0, { timeout: 30000 });
    expect(state.calls).toEqual(['A1', 'E6']);
    const o = await getOrder(request, baseURL, token, orderId);
    expect(o.payment_status).toBe('completed');
    expect(String(o.transaction_id || '')).toMatch(/^GHL:/);
    expect(pageErrors).toHaveLength(0);
  });

  test('E 단말기 주소가 바뀜 → 자동 찾기 → 새 주소 저장 → 같은 결제 이어서 완료', async ({ page, request, baseURL }) => {
    const pageErrors = []; page.on('pageerror', (e) => pageErrors.push(String(e)));
    const state = { scenario: 'approve', calls: [], realHost: '192.168.68.112' };
    await installBridge(page, state);
    await openPayment(page, orderNumber, pageErrors);
    await page.getByRole('button', { name: 'Confirm Payment' }).last().click();
    await expect(page.getByRole('button', { name: 'Confirm Payment' }), '모달 닫힘').toHaveCount(0, { timeout: 20000 });
    expect(state.discovered, '자동 찾기 1회').toBe(1);
    expect(state.calls, '판매 요청은 새 주소로 1번만').toEqual(['A1']);
    const o = await getOrder(request, baseURL, token, orderId);
    expect(o.payment_status).toBe('completed');
    const [[row]] = await sequelize.query('SELECT payment_settings FROM restaurants WHERE id = 38');
    expect(JSON.parse(row.payment_settings).card.terminal.host, '새 주소 저장').toBe('192.168.68.112');
    await setTerminal(true); // 다음 테스트를 위해 옛 주소로
    expect(pageErrors).toHaveLength(0);
  });

  test('D 브릿지 없음(브라우저) → 안내만 · 단말기 호출 0', async ({ page }) => {
    const pageErrors = []; page.on('pageerror', (e) => pageErrors.push(String(e)));
    await openPayment(page, orderNumber, pageErrors);
    await expect(page.getByText(/can't reach the card terminal/)).toBeVisible();
    await expect(page.getByRole('button', { name: 'Confirm Payment' }).last()).toBeEnabled();
    expect(pageErrors).toHaveLength(0);
  });
});

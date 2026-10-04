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
    // 다른 계산대가 같은 주문을 먼저 승인해 둔 상황(이중 승인 M) — 이 판매 응답 직전에 승인 1건을 끼워 넣는다
    if (cmd === 'A1' && state.injectOtherApproval) { await state.injectOtherApproval(); state.injectOtherApproval = null; }
    // Void 는 단말기에서 처리됐는데 답이 끊긴 상황(K) — 단말기 장부엔 취소로 남기고 응답만 버린다
    if (cmd === 'A2' && state.voidTimeoutOnce) { respond(job.payloadHex, 'approve'); state.voidTimeoutOnce = false; return { ok: false, error: 'TIMEOUT' }; }
    const out = respond(job.payloadHex, state.scenario);
    if (cmd === 'A1' && state.scenario === 'timeout') state.scenario = 'approve'; // 이어지는 Reprint 는 정상 응답
    return out === null ? { ok: false, error: 'TIMEOUT' } : { ok: true, responseHex: out };
  });
  await page.exposeFunction('__mockEcrDiscover', async () => { state.discovered = (state.discovered || 0) + 1; return { ok: true, hosts: state.realHost ? [state.realHost] : [] }; });
  await page.addInitScript(() => {
    // @ts-ignore
    window.__NATIVE_ECR = { available: true, exchange: (job) => window.__mockEcrExchange(job), discover: (job) => window.__mockEcrDiscover(job) };
    // 계산대 앱 안이라는 표시 — 실제 앱(preload/nativePrintBridge)도 세운다. 앱 설치 안내 배너가 결제 버튼을 가리지 않는다
    // @ts-ignore
    window.__PURPLE_DESKTOP = { isDesktop: true, platform: 'android' };
  });
}

async function openPayment(page, orderNumber, pageErrors) {
  await page.goto(`/restaurant/${user.restaurant_id}/live-orders`, { waitUntil: 'domcontentloaded' });
  await expect(page.getByText(orderNumber, { exact: false }).first(), `주문 ${orderNumber} 노출`).toBeVisible({ timeout: 30000 });
  const card = page.locator('div', { hasText: orderNumber }).filter({ has: page.getByRole('button', { name: 'Payment', exact: true }) }).last();
  await card.getByRole('button', { name: 'Payment', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Confirm Payment' }).last(), '결제 모달').toBeVisible();
  // 단말기 매장 + 앱(브릿지)이면 «Card / QR (Terminal)», 아니면 «Card»
  await page.getByText(/^Card( \/ QR \(Terminal\))?$/).last().click();
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
    await expect(page.getByText(/The amount goes to the terminal/)).toBeVisible();
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

  /** 결제 창에서 단말기 승인까지 끝낸다(A 와 같은 흐름) */
  async function payByTerminal(page, request, baseURL, state, pageErrors) {
    await installBridge(page, state);
    await openPayment(page, orderNumber, pageErrors);
    await page.getByRole('button', { name: 'Confirm Payment' }).last().click();
    await expect(page.getByRole('button', { name: 'Confirm Payment' }), '모달 닫힘').toHaveCount(0, { timeout: 20000 });
    expect((await getOrder(request, baseURL, token, orderId)).payment_status).toBe('completed');
  }
  async function cancelFromLiveOrders(page) {
    const card = page.locator('div', { hasText: orderNumber }).filter({ has: page.getByTitle('Cancel Order') }).last();
    await card.getByTitle('Cancel Order').click();
    await expect(page.getByText(/will also be cancelled on the card terminal/), '취소 모달 카드 안내 1줄').toBeVisible({ timeout: 10000 });
    await page.getByRole('button', { name: 'Order mistake' }).click();
  }

  test('J 결제된 주문 취소 → 단말기 Void(A2) 1회 → 주문 cancelled · 거래 voided', async ({ page, request, baseURL }) => {
    const pageErrors = []; page.on('pageerror', (e) => pageErrors.push(String(e)));
    const state = { scenario: 'approve', calls: [] };
    await payByTerminal(page, request, baseURL, state, pageErrors);
    await cancelFromLiveOrders(page);
    await expect.poll(async () => (await getOrder(request, baseURL, token, orderId)).status, { timeout: 30000 }).toBe('cancelled');
    expect(state.calls).toEqual(['A1', 'A2']);
    const rows = await terminalRowsFor(request, baseURL, orderId);
    expect(rows.find((r) => r.command === 'sale').status).toBe('voided');
    expect(pageErrors).toHaveLength(0);
  });

  test('K Void 무응답 → 주문 취소 안 됨 · 다시 취소 → 이미 취소(C5) → 취소 완료 · 단말기 Void 는 한 번만 처리', async ({ page, request, baseURL }) => {
    const pageErrors = []; page.on('pageerror', (e) => pageErrors.push(String(e)));
    const state = { scenario: 'approve', calls: [], voidTimeoutOnce: true };
    await payByTerminal(page, request, baseURL, state, pageErrors);
    await cancelFromLiveOrders(page);
    await expect(page.getByText(/No answer from the card terminal/), '무응답 안내').toBeVisible({ timeout: 30000 });
    expect((await getOrder(request, baseURL, token, orderId)).status, '주문은 그대로').not.toBe('cancelled');
    await cancelFromLiveOrders(page);
    await expect.poll(async () => (await getOrder(request, baseURL, token, orderId)).status, { timeout: 30000 }).toBe('cancelled');
    const rows = await terminalRowsFor(request, baseURL, orderId);
    expect(rows.find((r) => r.command === 'sale').status).toBe('voided');
    const voids = rows.filter((r) => r.command === 'void');
    expect(voids.some((r) => r.status_code === 'C5'), '두 번째 Void = 이미 취소(C5)').toBeTruthy();
    expect(pageErrors).toHaveLength(0);
  });

  test('L 은행 무응답(B0) → 모달 유지 · «은행이 응답하지 않아» · Reprint(E6) 0회 · 기록 0', async ({ page, request, baseURL }) => {
    const pageErrors = []; page.on('pageerror', (e) => pageErrors.push(String(e)));
    const state = { scenario: 'bank-timeout', calls: [] };
    await installBridge(page, state);
    await openPayment(page, orderNumber, pageErrors);
    await page.getByRole('button', { name: 'Confirm Payment' }).last().click();
    await expect(page.getByText(/The bank did not respond/)).toBeVisible({ timeout: 20000 });
    await expect(page.getByRole('button', { name: 'Confirm Payment' }).last(), '모달 유지').toBeVisible();
    expect(state.calls).toEqual(['A1']);
    const o = await getOrder(request, baseURL, token, orderId);
    expect(o.payment_status).not.toBe('completed');
    expect(pageErrors).toHaveLength(0);
  });

  test('M 이중 승인 → «이 결제를 단말기에서 취소» → A2 → 한 번만 청구 안내 · 원장은 첫 승인뿐', async ({ page, request, baseURL }) => {
    const pageErrors = []; page.on('pageerror', (e) => pageErrors.push(String(e)));
    const state = { scenario: 'approve', calls: [] };
    state.injectOtherApproval = async () => {
      await sequelize.query("INSERT INTO terminal_transactions (restaurant_id, order_id, command, amount, status, status_code, ecr_invoice_no, created_at, updated_at) VALUES (38, :oid, 'sale', 30.00, 'approved', '00', :inv, NOW(), NOW())",
        { replacements: { oid: orderId, inv: `E2EOTHER${orderId}` } });
    };
    await installBridge(page, state);
    await openPayment(page, orderNumber, pageErrors);
    await page.getByRole('button', { name: 'Confirm Payment' }).last().click();
    await expect(page.getByRole('button', { name: 'Cancel this payment on the terminal' }), '이중 승인 취소 버튼').toBeVisible({ timeout: 20000 });
    await page.getByRole('button', { name: 'Cancel this payment on the terminal' }).click();
    await expect(page.getByText(/charged only once/)).toBeVisible({ timeout: 20000 });
    expect(state.calls).toEqual(['A1', 'A2']);
    await expect(page.getByRole('button', { name: 'Confirm Payment' }).last(), 'Confirm 잠김 유지').toBeDisabled();
    const rows = await terminalRowsFor(request, baseURL, orderId);
    expect(rows.filter((r) => r.command === 'sale' && r.status === 'voided')).toHaveLength(1);
    await sequelize.query('DELETE FROM terminal_transactions WHERE ecr_invoice_no = :inv', { replacements: { inv: `E2EOTHER${orderId}` } });
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

  test('F 손님 TnG QR → 이월렛(tng)으로 기록 · 버튼 이름 Card / QR', async ({ page, request, baseURL }) => {
    const pageErrors = []; page.on('pageerror', (e) => pageErrors.push(String(e)));
    const state = { scenario: 'approve-tng', calls: [] };
    await installBridge(page, state);
    await openPayment(page, orderNumber, pageErrors);
    await expect(page.getByText('Card / QR (Terminal)')).toBeVisible();
    await page.getByRole('button', { name: 'Confirm Payment' }).last().click();
    await expect(page.getByRole('button', { name: 'Confirm Payment' }), '모달 닫힘').toHaveCount(0, { timeout: 20000 });
    const o = await getOrder(request, baseURL, token, orderId);
    expect(o.payment_status).toBe('completed');
    expect(o.payment_method, '지갑 QR 은 이월렛').toBe('ewallet');
    expect(o.ewallet_type).toBe('tng');
    expect(String(o.transaction_id || '')).toMatch(/^GHL:/);
    expect(pageErrors).toHaveLength(0);
  });

  test('G 결과 미확인 → 수단·사유 고르기 전엔 기록 불가 → 이월렛 수동 기록', async ({ page, request, baseURL }) => {
    const pageErrors = []; page.on('pageerror', (e) => pageErrors.push(String(e)));
    const state = { scenario: 'notfound', calls: [] };
    await installBridge(page, state);
    await openPayment(page, orderNumber, pageErrors);
    await page.getByRole('button', { name: 'Confirm Payment' }).last().click();
    await expect(page.getByText('Payment result unknown')).toBeVisible({ timeout: 20000 });
    const record = page.getByRole('button', { name: 'Record from receipt' });
    await expect(record, '아무것도 안 고르면 비활성').toBeDisabled();
    await page.getByPlaceholder('e.g. Approved, approval code 123456').fill('HC receipt approved');
    await expect(record, '사유만으로는 비활성(수단 필수)').toBeDisabled();
    await page.getByRole('button', { name: 'E-Wallet', exact: true }).last().click();
    await page.getByRole('button', { name: "Touch 'n Go" }).last().click();
    await expect(record).toBeEnabled();
    await record.click();
    await expect(page.getByRole('button', { name: 'Confirm Payment' }), '모달 닫힘').toHaveCount(0, { timeout: 20000 });
    const o = await getOrder(request, baseURL, token, orderId);
    expect(o.payment_status).toBe('completed');
    expect(o.payment_method).toBe('ewallet');
    const rows = await terminalRowsFor(request, baseURL, orderId);
    expect(rows.some((r) => r.status === 'manual' && r.tender_method === 'ewallet' && r.manual_override)).toBeTruthy();
    expect(pageErrors).toHaveLength(0);
  });

  test('I 분할 결제 + 거절 → Confirm 눌러도 원장 0 · 다시 시도 뒤에만 단말기 재전송', async ({ page, request, baseURL }) => {
    // Fable 게이트 2회차 R1 — 거절 뒤 하단 Confirm 이 승인 없이 카드 분할 결제를 기록하던 구멍
    const pageErrors = []; page.on('pageerror', (e) => pageErrors.push(String(e)));
    const state = { scenario: 'decline', calls: [] };
    await installBridge(page, state);
    await openPayment(page, orderNumber, pageErrors);
    await page.getByRole('switch').last().check();
    await page.locator('label', { hasText: 'E2E Bulgogi' }).locator('input[type="checkbox"]').check();
    const confirm = page.getByRole('button', { name: 'Confirm Payment' }).last();
    await expect(confirm).toBeEnabled();
    await confirm.click();
    await expect(page.getByText('Card not approved')).toBeVisible({ timeout: 20000 });
    await expect(confirm, '거절 뒤 Confirm 비활성').toBeDisabled();
    await confirm.click({ force: true }).catch(() => {});
    await page.waitForTimeout(1500);
    expect(state.calls, '단말기로 간 판매는 1번').toEqual(['A1']);
    let o = await getOrder(request, baseURL, token, orderId);
    expect(Number(o.amount_paid || 0), '원장 0').toBe(0);
    expect(o.payment_status).toBe('pending');
    // 다시 시도 → 패널 이슈가 지워지고 Confirm 이 단말기로 다시 보낸다(이번엔 승인)
    state.scenario = 'approve';
    await page.getByRole('button', { name: 'Try again' }).last().click();
    await expect(confirm).toBeEnabled();
    await confirm.click();
    await expect.poll(async () => Number((await getOrder(request, baseURL, token, orderId)).amount_paid || 0), { timeout: 20000 }).toBe(15);
    expect(state.calls).toEqual(['A1', 'A1']);
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

test.describe('카드단말기 ECR — POS 신규 주문(주문 생성 직후 연결)', () => {
  test.beforeAll(async ({ request, baseURL }) => {
    ({ token, user } = await demoLogin(request, baseURL, 'demo_restaurant_admin'));
    assertDemoContext(baseURL, user);
    await setTerminal(true);
  });
  test.afterAll(async () => {
    if (originalPs !== undefined) await sequelize.query('UPDATE restaurants SET payment_settings = :v WHERE id = 38', { replacements: { v: originalPs } });
  });

  test('H POS 메뉴 담기 → Pay Now → TnG QR 승인 → 새 주문이 이월렛(tng) · 단말기 거래가 그 주문에 연결', async ({ page, request, baseURL }) => {
    const pageErrors = []; page.on('pageerror', (e) => pageErrors.push(String(e)));
    await page.context().addInitScript(([t, ro]) => { localStorage.setItem('auth_token', t); localStorage.setItem('currentUserRole', ro); }, [token, 'Restaurant Admin']);
    const state = { scenario: 'approve-tng', calls: [] };
    await installBridge(page, state);
    await page.goto(`/restaurant/${user.restaurant_id}/pos-terminal`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500);
    // 첫 메뉴 카드(가격 RM 표시)를 담는다. 옵션 창이 뜨면 담기 버튼으로 닫는다.
    await page.getByText(/^RM\s?\d/).first().click();
    await page.waitForTimeout(600);
    // 옵션 창(세트·옵션 메뉴)이면 첫 선택지를 고르고 «Add · RM …» 로 담는다
    const addBtn = page.getByRole('button', { name: /^Add\b/ });
    if (await addBtn.count()) {
      const firstChoice = page.getByRole('button', { name: 'Small', exact: true });
      if (await firstChoice.count()) await firstChoice.first().click().catch(() => {});
      await addBtn.last().click();
    }
    await page.getByRole('button', { name: /Pay Now/ }).first().click();
    await expect(page.getByRole('button', { name: 'Confirm Payment' }).last(), '결제 모달').toBeVisible({ timeout: 15000 });
    await page.getByText(/^Card( \/ QR \(Terminal\))?$/).last().click();
    const before = await (await request.get(apiBase(baseURL) + '/terminal/transactions?restaurant_id=38&limit=1', { headers: authHeaders(token) })).json();
    const lastId = before.data && before.data[0] ? before.data[0].id : 0;
    await page.getByRole('button', { name: 'Confirm Payment' }).last().click();
    await expect.poll(async () => {
      const j = await (await request.get(apiBase(baseURL) + '/terminal/transactions?restaurant_id=38&limit=5', { headers: authHeaders(token) })).json();
      const row = (j.data || []).find((r) => r.id > lastId && r.command === 'sale');
      return row && row.order_id ? row : null;
    }, { timeout: 20000, message: '단말기 거래가 새 주문에 연결' }).not.toBeNull();
    const j = await (await request.get(apiBase(baseURL) + '/terminal/transactions?restaurant_id=38&limit=5', { headers: authHeaders(token) })).json();
    const row = (j.data || []).find((r) => r.id > lastId && r.command === 'sale');
    expect(row.tender_method).toBe('ewallet');
    const o = await getOrder(request, baseURL, token, row.order_id);
    expect(o.payment_method, 'POS 주문도 이월렛').toBe('ewallet');
    expect(o.ewallet_type).toBe('tng');
    expect(String(o.transaction_id || '')).toMatch(/^GHL:/);
    await softDeleteOrder(request, baseURL, token, row.order_id);
    expect(pageErrors).toHaveLength(0);
  });
});

test.afterAll(async () => { await sequelize.close().catch(() => {}); });

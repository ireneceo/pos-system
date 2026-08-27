// 발주서(인쇄본)에 **공급업체 자기 판매품목명 + SKU** 가 주(主)로 나가는가.
// (2026-08-27 Irene: "발주관리에서는 한글이름 들어간 우리 재고표시 말고 공급업체 상품 이름으로
//  표시해야 하는 거 아니야?" + "기존에 발주한 발주리스트에서도 바꿔줘")
// 설계 단일 진실: docs/STOCK_ITEM_VS_SUPPLIER_PRODUCT_DESIGN.md ③-4
// dev 전용. 인쇄본은 읽기 전용 화면이라 서버에 아무것도 쓰지 않는다.
const fs = require('fs');
const { test, expect } = require('@playwright/test');
const { storageStateFor } = require('./fixtures/demo-guard');

// 토큰은 서버에서 직접 발급해 파일로 넘긴다(PO_NAME_TOKEN_FILE) — 공개 demo-login 카드는
// v3.76 가드로 실매장에 닿지 못한다(그게 옳다). 하니스가 그 가드에 의존하지 않게 한다.
// [[reference_demo_login_store_gate]]

// dev 실측(2026-08-27): PO#170 = K-DINE(rid 5) → S4 Sup Co.(공급업체 14), submitted.
// 이 발주에만 **이름이 실제로 다른 라인**이 있다: 내부 "Demo_Tomato" ↔ 판매품목 "Fresh Tomato"(TMT-001).
// 옛 발주(2026-06-22 생성)라 "기존 발주리스트에도 적용된다"를 같이 증명한다.
const PO_ID = 170;
const CASE = { internal: 'Demo_Tomato', sellerName: 'Fresh Tomato', sku: 'TMT-001' };

test('인쇄본: 공급업체 판매품목명이 주, SKU 표기, 내부명은 참고 — 옛 발주에도 적용', async ({ browser, baseURL }) => {
  const f = process.env.PO_NAME_TOKEN_FILE;
  test.skip(!f, '토큰 파일 없음');
  const { token } = JSON.parse(fs.readFileSync(f, 'utf8')); // rid=5 Restaurant Admin, 읽기 전용
  const ctx = await browser.newContext({
    storageState: storageStateFor(baseURL, token, 'Restaurant Admin'),
    ignoreHTTPSErrors: true,
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', e => errors.push('pageerror: ' + e.message));

  await page.goto(`/pos/purchase-orders/${PO_ID}/print`, { waitUntil: 'domcontentloaded' });
  expect(page.url(), '로그인으로 튕기지 않음').not.toContain('/login');
  await page.waitForFunction(
    () => document.querySelectorAll('table tbody tr').length > 0,
    null, { timeout: 30000 }
  );

  // 표 헤더에 SKU 열이 생겼다
  const headers = await page.$$eval('table thead th', ths => ths.map(t => t.textContent.trim()));
  console.log('[po-supplier-name] 헤더:', JSON.stringify(headers));
  expect(headers, 'SKU 열 존재').toContain('SKU');

  // 문제의 라인을 찾는다
  const rows = await page.$$eval('table tbody tr', trs => trs.map(tr => {
    const tds = [...tr.querySelectorAll('td')];
    return { itemCell: (tds[0]?.innerText || '').trim(), sku: (tds[1]?.innerText || '').trim() };
  }));
  console.log('[po-supplier-name] 줄:', JSON.stringify(rows, null, 1));

  const row = rows.find(r => r.sku === CASE.sku);
  expect(row, `SKU ${CASE.sku} 라인이 인쇄본에 있다`).toBeTruthy();

  const firstLine = row.itemCell.split('\n')[0].trim();
  expect(firstLine, '주(主)는 공급업체 판매품목명').toBe(CASE.sellerName);
  expect(row.itemCell, '내부명은 참고(Buyer ref)로 병기').toContain(CASE.internal);
  expect(row.itemCell, '내부명이 첫 줄을 차지하지 않는다').not.toBe(CASE.internal);

  // 매핑 없는 라인도 빈칸이 되지 않는다(폴백)
  for (const r of rows) {
    expect(r.itemCell.length, '모든 라인에 이름이 있다(폴백 포함)').toBeGreaterThan(0);
  }

  expect(errors, 'console 에러 0').toEqual([]);
  await ctx.close();
});

// ── 잔여 확인 2건 (2026-08-27 Fable 게이트 지시 5번) ─────────────────────────

// dev 실측: PO#183 = K-DINE(rid 5) → **브랜드 판매자**(brand 1), submitted, 품목 2건.
// 판매품목 매핑(SKU)은 supplier 판매자에만 있으므로 여기는 **내부명 폴백 경로**다.
// 빈칸이 되지 않는 것 + SKU 열이 '—' 로 안전하게 비는 것을 실렌더로 확인한다.
test('브랜드 판매자 발주: 매핑 없는 폴백도 이름이 빈칸이 되지 않는다', async ({ browser, baseURL }) => {
  const f = process.env.PO_NAME_TOKEN_FILE;
  test.skip(!f, '토큰 파일 없음');
  const { token } = JSON.parse(fs.readFileSync(f, 'utf8'));
  const ctx = await browser.newContext({
    storageState: storageStateFor(baseURL, token, 'Restaurant Admin'),
    ignoreHTTPSErrors: true,
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', e => errors.push('pageerror: ' + e.message));

  await page.goto('/pos/purchase-orders/183/print', { waitUntil: 'domcontentloaded' });
  expect(page.url(), '로그인으로 튕기지 않음').not.toContain('/login');
  await page.waitForFunction(() => document.querySelectorAll('table tbody tr').length > 0, null, { timeout: 30000 });

  const rows = await page.$$eval('table tbody tr', trs => trs.map(tr => {
    const tds = [...tr.querySelectorAll('td')];
    return { itemCell: (tds[0]?.innerText || '').trim(), sku: (tds[1]?.innerText || '').trim() };
  }));
  console.log('[po-supplier-name/brand] 줄:', JSON.stringify(rows));
  expect(rows.length, '품목 줄이 있다').toBeGreaterThan(0);
  for (const r of rows) {
    expect(r.itemCell.length, '이름이 빈칸이 아니다(폴백)').toBeGreaterThan(0);
    expect(r.itemCell, 'ref 중복 표기 없음(주=내부명이므로)').not.toContain('Buyer ref');
    expect(r.sku, 'SKU 없으면 대시로 안전하게 비운다').toBe('—');
  }
  expect(errors, 'console 에러 0').toEqual([]);
  await ctx.close();
});

// 판매자 뷰(?as=seller → GET /api/seller-orders/:id). 구매자 뷰와 **같은 렌더 코드**지만
// 데이터원이 달라 확인한다. **실제 Supplier Admin** 토큰으로 돈다 — 2026-08-27 이전에는
// print 라우트 requiredRole 에 공급업체가 빠져 자기 Print 버튼이 막혀 있었다(App.tsx 수정).
test('판매자 뷰(?as=seller): 공급업체 본인이 자기 발주 인쇄본을 연다', async ({ browser, baseURL }) => {
  const f = process.env.PO_SELLER_TOKEN_FILE;
  test.skip(!f, '판매자 토큰 파일 없음');
  const { token } = JSON.parse(fs.readFileSync(f, 'utf8'));
  const ctx = await browser.newContext({
    storageState: storageStateFor(baseURL, token, 'Supplier Admin'),
    ignoreHTTPSErrors: true,
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', e => errors.push('pageerror: ' + e.message));

  await page.goto(`/pos/supplier/orders/${PO_ID}/print`, { waitUntil: 'domcontentloaded' });
  expect(page.url(), '로그인으로 튕기지 않음').not.toContain('/login');
  await page.waitForFunction(() => document.querySelectorAll('table tbody tr').length > 0, null, { timeout: 30000 });

  const headers = await page.$$eval('table thead th', ths => ths.map(t => t.textContent.trim()));
  expect(headers, 'SKU 열 존재').toContain('SKU');

  const rows = await page.$$eval('table tbody tr', trs => trs.map(tr => {
    const tds = [...tr.querySelectorAll('td')];
    return { itemCell: (tds[0]?.innerText || '').trim(), sku: (tds[1]?.innerText || '').trim() };
  }));
  console.log('[po-supplier-name/seller] 줄:', JSON.stringify(rows));
  const row = rows.find(r => r.sku === CASE.sku);
  expect(row, `SKU ${CASE.sku} 라인이 판매자 인쇄본에도 있다`).toBeTruthy();
  expect(row.itemCell.split('\n')[0].trim(), '주(主)는 판매품목명').toBe(CASE.sellerName);
  expect(realErrors(errors), '기존 잡음 외 console 에러 0').toEqual([]);
  await ctx.close();
});

// 프론트 가드를 넓힌 변경이라 **반증**이 필요하다: 공급업체가 남의 발주서 인쇄본에 닿으면 안 된다.
// 진짜 게이트는 서버(checkSellerOwnership) — 화면이 데이터를 흘리지 않는 것까지 확인한다.
// dev 실측: PO#181 은 공급업체 60(Demo Beverages) 소유, 토큰은 공급업체 14(S4 Sup Co.).
const OTHER_SUPPLIER_PO = 181;

/**
 * 공급업체 계정으로 `/pos/*` 를 열면 전역 프로바이더가 `GET /api/orders?limit=100` 을 부르고
 * 서버가 403 을 준다 — **기존 잡음**이다(실측: 이번 작업 이전부터 있는 `/pos/supplier/orders`
 * 화면에서도 동일하게 발생). 이번 변경과 무관하므로 계약에서 분리하되, 그 외 에러는 0 이어야 한다.
 * 별건 제보 대상.
 */
const SUPPLIER_KNOWN_NOISE = /Failed to load resource.*403/;
const realErrors = (errs) => errs.filter(e => !SUPPLIER_KNOWN_NOISE.test(e));


test('판매자 뷰 음성 케이스: 남의 발주서는 열리지 않고 아무것도 새지 않는다', async ({ browser, baseURL }) => {
  const f = process.env.PO_SELLER_TOKEN_FILE;
  test.skip(!f, '판매자 토큰 파일 없음');
  const { token } = JSON.parse(fs.readFileSync(f, 'utf8'));
  const ctx = await browser.newContext({
    storageState: storageStateFor(baseURL, token, 'Supplier Admin'),
    ignoreHTTPSErrors: true,
  });
  const page = await ctx.newPage();
  await page.goto(`/pos/supplier/orders/${OTHER_SUPPLIER_PO}/print`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2500);

  const body = (await page.innerText('body')).trim();
  console.log('[po-supplier-name/deny] 본문:', JSON.stringify(body.slice(0, 200)));
  expect(body, '품목 표가 그려지지 않는다').not.toContain('Line Total');
  const rows = await page.$$('table tbody tr');
  expect(rows.length, '품목 줄 0').toBe(0);
  // 타사 판매품목명·SKU 가 화면 어디에도 없다
  for (const leak of ['Sesame Oil', 'SESAME-1L', 'Demo_Tomato']) {
    expect(body, `타사 데이터 누출 없음: ${leak}`).not.toContain(leak);
  }
  await ctx.close();
});

// 수신함 Print 버튼 → 인쇄본 도달 흐름(버튼이 실제로 동작하는가). 이게 죽어 있던 결함이다.
test('공급업체 수신함의 Print 버튼이 실제로 인쇄본을 연다', async ({ browser, baseURL }) => {
  const f = process.env.PO_SELLER_TOKEN_FILE;
  test.skip(!f, '판매자 토큰 파일 없음');
  const { token } = JSON.parse(fs.readFileSync(f, 'utf8'));
  const ctx = await browser.newContext({
    storageState: storageStateFor(baseURL, token, 'Supplier Admin'),
    ignoreHTTPSErrors: true,
  });
  const page = await ctx.newPage();
  await page.goto('/pos/supplier/orders', { waitUntil: 'domcontentloaded' });
  expect(page.url(), '로그인으로 튕기지 않음').not.toContain('/login');
  await page.waitForFunction(() => document.body.innerText.includes('Print'), null, { timeout: 30000 });

  const [popup] = await Promise.all([
    ctx.waitForEvent('page'),
    page.getByRole('button', { name: /^Print$/ }).first().click(),
  ]);
  await popup.waitForLoadState('domcontentloaded');
  console.log('[po-supplier-name/flow] 팝업 URL:', popup.url());
  expect(popup.url(), '공급업체 전용 인쇄본 URL 로 간다').toContain('/pos/supplier/orders/');
  expect(popup.url(), '인쇄본 경로').toContain('/print');
  await popup.waitForFunction(() => document.querySelectorAll('table tbody tr').length > 0, null, { timeout: 30000 });

  const headers = await popup.$$eval('table thead th', ths => ths.map(t => t.textContent.trim()));
  console.log('[po-supplier-name/flow] 헤더:', JSON.stringify(headers));
  expect(headers, '목록으로 튕기지 않고 인쇄본이 떴다(SKU 열 존재)').toContain('SKU');
  await ctx.close();
});

// 음성 케이스 2 — **구매자쪽** 인쇄 경로는 공급업체에게 여전히 닫혀 있어야 한다.
// 갈래 A(구매자 발주 화면 전체를 공급업체에 개방)를 기각한 이유가 지켜지는지 증명한다.
// 이게 이 수정의 고장주입에 해당한다: 게이트가 살아 있지 않으면 이 테스트가 통과해 버린다.
test('공급업체는 구매자쪽 인쇄 경로에 여전히 들어가지 못한다', async ({ browser, baseURL }) => {
  const f = process.env.PO_SELLER_TOKEN_FILE;
  test.skip(!f, '판매자 토큰 파일 없음');
  const { token } = JSON.parse(fs.readFileSync(f, 'utf8'));
  const ctx = await browser.newContext({
    storageState: storageStateFor(baseURL, token, 'Supplier Admin'),
    ignoreHTTPSErrors: true,
  });
  const page = await ctx.newPage();
  await page.goto(`/pos/purchase-orders/${PO_ID}/print?as=seller`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2500);
  console.log('[po-supplier-name/buyer-path-denied] 최종 URL:', page.url());
  expect(page.url(), '구매자 인쇄 경로에 머물지 못한다').not.toContain('/pos/purchase-orders/');
  const headers = await page.$$eval('table thead th', ths => ths.map(t => t.textContent.trim())).catch(() => []);
  expect(headers, '인쇄본 표가 그려지지 않는다').not.toContain('Line Total');
  await ctx.close();
});

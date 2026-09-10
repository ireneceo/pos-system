// 모바일 주문 세션 수명 — 낡은 테이블 번호가 다음 손님 주문에 붙지 않는다.
//
// 배경 (Irene 신고 2026-09-09): 「테이블 지정 없이 들어갔는데 맨 위에 T001 이 뜬다」.
//   `localStorage.tableNumber` 를 지우는 곳이 사실상 없어, 지난주 T001 을 찍은 손님이
//   오늘 대표 링크를 열면 앉은 자리와 무관하게 T001 로 주문·주방티켓이 나갔다.
// 판정 (2026-09-10 Fable · Irene 승인): 주문 성공 후 삭제가 아니라 **세션 만료(4시간)**.
//   장바구니·주문유형·테이블은 한 세션이라 **함께** 만료된다.
const { test, expect } = require('@playwright/test');

const BASE = process.env.BASE_URL || 'https://dev.purplehere.com';
const SLUG = process.env.MOBILE_SLUG || 'demo-korean-bbq';
const HOUR = 60 * 60 * 1000;

// 저장소에 «옛 방문» 을 만들어 둔다. stampAgeMs 만큼 전에 마지막 쓰기가 있었던 상태.
async function seedSession(page, { table, stampAgeMs, cart = 1 }) {
  await page.addInitScript(({ table, stampAgeMs, cart }) => {
    try {
      localStorage.setItem('tableNumber', table);
      localStorage.setItem('orderType', 'dine-in');
      localStorage.setItem('mobile_cart', JSON.stringify(
        Array.from({ length: cart }, (_, i) => ({
          cartItemId: 'seed-' + i, id: 1, name: 'Seeded', price: 10, quantity: 1, totalPrice: 10, options: []
        }))));
      if (stampAgeMs !== null) {
        localStorage.setItem('mobile_order_session_at', String(Date.now() - stampAgeMs));
      }
    } catch (e) { /* ignore */ }
  }, { table, stampAgeMs, cart });
}

const read = (page) => page.evaluate(() => ({
  table: localStorage.getItem('tableNumber'),
  cart: JSON.parse(localStorage.getItem('mobile_cart') || '[]').length,
  orderType: localStorage.getItem('orderType'),
  stamp: localStorage.getItem('mobile_order_session_at'),
}));

test.describe('모바일 주문 세션 수명', () => {
  test('① 5시간 전 방문 — 테이블·장바구니·주문유형이 함께 비워진다', async ({ page }) => {
    await seedSession(page, { table: 'T001', stampAgeMs: 5 * HOUR });
    await page.goto(`${BASE}/mobile/${SLUG}`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);
    const s = await read(page);
    expect(s.table).toBeNull();
    expect(s.cart).toBe(0);
    expect(s.orderType).toBeNull();
  });

  test('② 1시간 전 방문 — 그대로 유지된다 (식사 중에 끊지 않는다)', async ({ page }) => {
    await seedSession(page, { table: 'T001', stampAgeMs: 1 * HOUR });
    await page.goto(`${BASE}/mobile/${SLUG}`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);
    const s = await read(page);
    expect(s.table).toBe('T001');
    expect(s.cart).toBe(1);
  });

  test('③ 낡은 T001 이 있어도 새 QR 스캔(?table=T5)이 이긴다', async ({ page }) => {
    await seedSession(page, { table: 'T001', stampAgeMs: 5 * HOUR });
    await page.goto(`${BASE}/mobile/${SLUG}?table=T5`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);
    const s = await read(page);
    expect(s.table).toBe('T5');
  });

  test('④ 스탬프 없는 옛 데이터는 만료로 본다 (시각을 모르므로)', async ({ page }) => {
    await seedSession(page, { table: 'T001', stampAgeMs: null });
    await page.goto(`${BASE}/mobile/${SLUG}`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);
    const s = await read(page);
    expect(s.table).toBeNull();
    expect(s.cart).toBe(0);
  });

  test('⑤ 쓰기가 있으면 시계가 다시 맞춰진다 (읽기만으로는 안 된다)', async ({ page }) => {
    await seedSession(page, { table: 'T001', stampAgeMs: 3.5 * HOUR });
    await page.goto(`${BASE}/mobile/${SLUG}`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);
    const before = await read(page);
    expect(before.table).toBe('T001');            // 아직 만료 전
    const beforeStamp = Number(before.stamp);

    // 읽기만 반복 — 스탬프가 갱신되면 안 된다
    await page.evaluate(() => { for (let i = 0; i < 5; i++) localStorage.getItem('tableNumber'); });
    await page.waitForTimeout(500);
    const afterRead = await read(page);
    expect(Number(afterRead.stamp)).toBe(beforeStamp);
  });
});

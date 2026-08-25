// 재고관리 "공급처 연결" 표시 — 연결 여부는 **실제 연결**이지 재고부족 제안이 아니다.
// (2026-08-25 Irene: 연결돼 있는데 "No supplier linked" 로 뜨고 주문 기능이 사라짐)
// dev 전용, 읽기만 한다.
const fs = require('fs');
const { test, expect } = require('@playwright/test');
const { storageStateFor } = require('./fixtures/demo-guard');

// dev 실측: BG(user 6) 재고추적 11건 중 공급처 연결 9건 / 미연결 2건.
// 연결 9건 중 재고부족(제안 대상)은 0건 — 옛 판정이었다면 11건 전부 "No supplier linked".
const EXPECT_LINKED = 9;
const EXPECT_UNLINKED = 2;

test('재고관리: 연결된 품목은 주문 가능, 미연결만 안내가 뜬다', async ({ browser, baseURL }) => {
  const f = process.env.INV_TOKEN_FILE;
  test.skip(!f, '토큰 파일 없음');
  const { token } = JSON.parse(fs.readFileSync(f, 'utf8'));
  const ctx = await browser.newContext({
    storageState: storageStateFor(baseURL, token, 'Brand General'),
    ignoreHTTPSErrors: true,
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', e => errors.push('pageerror: ' + e.message));

  // networkidle 은 소켓/폴링 때문에 안정되지 않는다 — 목록이 그려질 때까지 기다린다.
  await page.goto('/pos/brand-inventory?tab=list', { waitUntil: 'domcontentloaded' });
  expect(page.url(), '로그인으로 튕기지 않음').not.toContain('/login');
  await page.waitForFunction(() =>
    document.body.innerText.includes('Chicken Breast') || document.body.innerText.includes('No supplier linked'),
    null, { timeout: 30000 });
  await page.waitForTimeout(1500);

  // 페이지에는 General Stock 목록도 함께 있다 — **재료 행(PI- 코드가 있는 행)만** 센다.
  // 재료 행을 **행동 요소에서 거슬러** 찾는다: Order 버튼 / "No supplier linked" 안내에서
  // 위로 올라가 PI- 코드를 품은 행을 만나면 그 행이다. (General Stock 행에는 PI- 코드가 없다)
  const rows = await page.evaluate(() => {
    const found = new Map();
    const climb = (start, kind) => {
      let el = start;
      for (let i = 0; el && i < 12; i++, el = el.parentElement) {
        const m = (el.innerText || '').match(/\bPI-\d+/);
        if (m) {
          const cur = found.get(m[0]) || { code: m[0], noLink: false, canOrder: false };
          cur[kind] = true;
          found.set(m[0], cur);
          return;
        }
      }
    };
    document.querySelectorAll('button').forEach(b => {
      if ((b.textContent || '').trim() === 'Order') climb(b, 'canOrder');
    });
    document.querySelectorAll('span, div').forEach(el => {
      if (el.children.length === 0 && /^No supplier linked$/.test((el.textContent || '').trim())) climb(el, 'noLink');
    });
    return Array.from(found.values());
  });
  const unlinked = rows.filter(r => r.noLink).length;
  const orderable = rows.filter(r => r.canOrder).length;
  console.log(`[inv-link] 재료 행 ${rows.length}개 · 미연결 안내 ${unlinked}개 · 주문 가능 ${orderable}개`);
  console.log('[inv-link] 행별:', JSON.stringify(rows));

  expect(rows.length, '재료 행이 그려졌다').toBe(EXPECT_LINKED + EXPECT_UNLINKED);
  expect(unlinked, '미연결 안내는 실제 미연결 품목 수만큼만').toBe(EXPECT_UNLINKED);
  expect(orderable, '연결된 품목은 주문 가능').toBe(EXPECT_LINKED);

  // 빈 회색 네모(사진 없는 자리표시)를 더는 그리지 않는다
  const emptyThumbs = await page.evaluate(() => {
    let n = 0;
    document.querySelectorAll('div').forEach(d => {
      const cs = getComputedStyle(d);
      if (cs.width === '40px' && cs.height === '40px' && cs.backgroundColor === 'rgb(241, 244, 248)'
          && !d.querySelector('img')) n++;
    });
    return n;
  });
  console.log(`[inv-link] 빈 회색 자리표시: ${emptyThumbs}개`);
  expect(emptyThumbs, '사진 없으면 회색 네모를 그리지 않는다').toBe(0);

  const real = errors.filter(e => !/favicon|manifest|Failed to load resource|net::ERR/i.test(e));
  expect(real, 'console.error 0').toEqual([]);
  await ctx.close();
});

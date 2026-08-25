// 발주 카트 수량 증감 단위 — 단위가 step 을 정한다 (2026-08-25 Irene 보고)
// "화살표를 누르면 소수점 2자리부터 올라간다" → 팩/개는 1씩, kg/L 만 0.01.
// dev 전용. 장바구니는 브라우저 상태라 서버에 아무것도 안 쓴다.
const fs = require('fs');
const { test, expect } = require('@playwright/test');
const { storageStateFor } = require('./fixtures/demo-guard');

const TOKEN_FILE = process.env.PO_QTY_TOKEN_FILE;

test.describe('발주 카트 수량 step', () => {
  test('팩·개 단위는 1씩, kg 단위만 0.01', async ({ browser, baseURL }) => {
    const { token } = JSON.parse(fs.readFileSync(TOKEN_FILE, 'utf8'));
    const ctx = await browser.newContext({
      storageState: storageStateFor(baseURL, token, 'Brand General'),
      ignoreHTTPSErrors: true,
    });
    const page = await ctx.newPage();
    const errors = [];
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });

    await page.goto('/pos/purchase-orders/new', { waitUntil: 'networkidle' });
    expect(page.url(), '로그인으로 튕기지 않음').not.toContain('/login');

    // 공급처가 붙은 품목 행을 클릭해 카트에 담는다 (ItemBox 자체가 button)
    for (const name of ['Chicken Breast', 'Japanesse Cucumber']) {
      const row = page.locator(`button:has-text("${name}")`).first();
      if (await row.count() === 0) { console.log(`[po-qty-step] "${name}" 행 없음 — 건너뜀`); continue; }
      await row.click();
      await page.waitForTimeout(300);
    }

    const lines = await page.evaluate(() => {
      const out = [];
      document.querySelectorAll('input[type="number"]').forEach(inp => {
        const head = inp.parentElement;
        const nameEl = head && head.querySelector('div[title]');
        out.push({
          name: (nameEl ? nameEl.getAttribute('title') : (head ? head.textContent : '')) || '',
          step: inp.getAttribute('step'),
          value: inp.value,
        });
      });
      return out;
    });
    console.log('[po-qty-step] 카트 줄:', JSON.stringify(lines, null, 1));
    expect(lines.length, '카트에 담긴 줄이 있다').toBeGreaterThan(0);

    const kg = lines.find(l => /Chicken Breast/i.test(l.name));
    const pc = lines.find(l => /Cucumber/i.test(l.name));

    if (pc) {
      expect(pc.step, '개(piece) 단위 step 은 1').toBe('1');
      const inp = page.locator('input[type="number"]').nth(lines.indexOf(pc));
      const before = Number(await inp.inputValue());
      await inp.focus();
      await page.keyboard.press('ArrowUp');
      const after = Number(await inp.inputValue());
      console.log(`[po-qty-step] 개 단위 화살표: ${before} → ${after}`);
      expect(after - before, '화살표 1회 = 1 증가').toBe(1);
    } else {
      console.log('[po-qty-step] ⚠ piece 품목을 카트에 못 담음 — 확인 불가');
    }

    if (kg) {
      expect(kg.step, 'kg 단위는 소수 입력 유지(0.01)').toBe('0.01');
      console.log('[po-qty-step] kg 단위 step 유지 확인');
    } else {
      console.log('[po-qty-step] ⚠ kg 품목을 카트에 못 담음 — 확인 불가');
    }

    expect(errors.filter(e => !/favicon|manifest|Failed to load resource/i.test(e)), 'console.error 0').toEqual([]);
    await ctx.close();
  });
});

// 수령·반품 화면은 같은 헬퍼를 쓴다. dev 에 수령 완료 발주가 없어 화살표 클릭까지는
// 확인할 수 없으므로, 최소한 상세 페이지가 크래시 없이 뜨는지(= 변경이 렌더를 깨지 않았는지)만 본다.
test.describe('발주 상세 페이지 mount', () => {
  test('수량 step 변경 후에도 상세 페이지가 크래시 없이 뜬다', async ({ browser, baseURL }) => {
    const f = process.env.PO_DETAIL_TOKEN_FILE;
    test.skip(!f, '토큰 파일 없음');
    const { token, role } = JSON.parse(fs.readFileSync(f, 'utf8'));
    const ctx = await browser.newContext({
      storageState: storageStateFor(baseURL, token, role),
      ignoreHTTPSErrors: true,
    });
    const page = await ctx.newPage();
    const errors = [];
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
    page.on('pageerror', e => errors.push('pageerror: ' + e.message));

    await page.goto(`/pos/purchase-orders/${process.env.PO_DETAIL_ID || '183'}`, { waitUntil: 'networkidle' });
    expect(page.url(), '로그인으로 튕기지 않음').not.toContain('/login');

    const body = await page.locator('body').innerText();
    expect(body.length, '내용이 렌더됐다').toBeGreaterThan(50);
    expect(body, 'ErrorBoundary fallback 아님').not.toMatch(/Something went wrong|문제가 발생|Unexpected Application Error/i);

    const real = errors.filter(e => !/favicon|manifest|Failed to load resource|net::ERR/i.test(e));
    console.log('[po-detail] console.error:', real.length ? JSON.stringify(real) : '0건');
    expect(real, 'console.error 0').toEqual([]);
    await ctx.close();
  });
});

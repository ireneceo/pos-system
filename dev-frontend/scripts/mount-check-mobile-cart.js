// Mount + flow check for the mobile double-order UX change.
// Drives the real UI: order-type -> menu -> item detail -> Add to Cart.
// Asserts: no console.error, no pageerror, no ErrorBoundary fallback,
// sticky CartBar appears, and Add-to-Cart does not dead-end.
const { chromium } = require('playwright');
const BASE = process.env.BASE_URL || 'https://dev.purplehere.com';
const SLUG = process.env.SLUG || 'demo-korean-bbq';

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true });
  const page = await ctx.newPage();
  const errors = [];
  const itemIds = [];
  page.on('console', m => { if (m.type() === 'error') errors.push('console: ' + m.text().slice(0, 200)); });
  page.on('pageerror', e => errors.push('pageerror: ' + (e.message || e).slice(0, 200)));
  // Harvest real item ids from any menu/items API response.
  page.on('response', async (res) => {
    try {
      if (!/menu|items/i.test(res.url())) return;
      const ct = res.headers()['content-type'] || '';
      if (!ct.includes('json')) return;
      const j = await res.json();
      const arr = j?.data?.items || j?.items || [];
      (Array.isArray(arr) ? arr : []).forEach(it => { if (it && it.id && !itemIds.includes(it.id)) itemIds.push(it.id); });
    } catch {}
  });

  const log = (s) => console.log(s);
  const hasEB = async () => (await page.content()).match(/Something went wrong|문제가 발생|ErrorBoundary/i) ? 'EB-FALLBACK' : 'ok';

  try {
    // 1) Order-type page
    await page.goto(`${BASE}/mobile/${SLUG}`, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(1200);
    log(`[1] order-type mount: ${await hasEB()}`);

    // pick an order type (pickup/takeaway/dine-in) — click first enabled type button
    const typeBtn = page.locator('button', { hasText: /pickup|takeaway|dine|픽업|포장|매장|delivery/i }).first();
    if (await typeBtn.count()) { await typeBtn.click().catch(() => {}); await page.waitForTimeout(800); }

    // Some flows need a Continue/Confirm — try it
    const cont = page.locator('button', { hasText: /continue|confirm|start|다음|시작|주문/i }).first();
    if (await cont.count()) { await cont.click().catch(() => {}); await page.waitForTimeout(1000); }

    // 2) ensure on menu
    if (!page.url().includes('/menu')) {
      await page.goto(`${BASE}/mobile/${SLUG}/menu`, { waitUntil: 'networkidle', timeout: 30000 });
    }
    await page.waitForTimeout(1500);
    log(`[2] menu mount: ${await hasEB()}  url=${page.url().replace(BASE,'')}`);

    // 3) open a menu item -> detail (navigate directly using harvested id)
    let opened = false;
    if (itemIds.length) {
      await page.goto(`${BASE}/mobile/${SLUG}/item/${itemIds[0]}`, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(1500);
      opened = page.url().includes('/item/');
    }
    log(`[3] item detail open (id=${itemIds[0] || 'none'}): ${opened ? 'yes' : 'NO'}  mount=${await hasEB()}  (harvested ${itemIds.length} ids)`);

    // 4) Add to Cart
    if (opened) {
      const addBtn = page.locator('button', { hasText: /add to cart|장바구니|加入|tambah|added/i }).first();
      if (await addBtn.count()) {
        await addBtn.click().catch(() => {});
        await page.waitForTimeout(1400); // allow rec-sheet OR auto-return (~550ms)
        const url = page.url();
        const sheet = await page.locator('[role="dialog"]').count();
        const onList = url.includes('/menu');
        log(`[4] after Add: ${sheet ? 'rec-sheet shown' : onList ? 'auto-returned to menu' : 'stayed on detail(url='+url.replace(BASE,'')+')'}  mount=${await hasEB()}`);
        // 5) if sheet -> dismiss, expect return to menu
        if (sheet) {
          const noThanks = page.locator('button', { hasText: /no thanks|괜찮|不用|tidak/i }).first();
          if (await noThanks.count()) { await noThanks.click().catch(()=>{}); await page.waitForTimeout(1200); }
          log(`[5] after No thanks: ${page.url().includes('/menu') ? 'returned to menu' : 'url='+page.url().replace(BASE,'')}`);
        }
      } else { log('[4] Add-to-Cart button not found'); }
    }

    // 6) cart bar present on menu?
    if (page.url().includes('/menu')) {
      await page.waitForTimeout(800);
      const barCount = await page.locator('button', { hasText: /view cart|장바구니|查看购物车|lihat troli|troli/i }).count();
      log(`[6] sticky cart bar on menu: ${barCount > 0 ? 'present' : 'NOT FOUND'}`);
    }

    await page.screenshot({ path: '/tmp/mobile-cart-final.png', fullPage: false });
  } catch (e) {
    log('FLOW-ERROR: ' + (e.message || e));
  }

  log('--- console/page errors (excluding network/favicon/analytics noise) ---');
  const real = errors.filter(e => !/favicon|analytics|gtag|sw\.js|manifest|net::ERR|Failed to load resource|status of 4|status of 5/i.test(e));
  log(real.length ? real.join('\n') : 'NONE');
  await browser.close();
  process.exit(0);
})();

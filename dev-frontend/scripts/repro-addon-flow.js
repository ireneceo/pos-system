// Reproduce the add-on (cross-sell) inconsistency Irene reported:
// "first shows fine, click -> list disappears, re-enter same product -> nothing".
// Store kdine-korean (rid5): product 15 has rec links -> 279, 335.
const { chromium } = require('playwright');
const BASE = process.env.BASE_URL || 'https://dev.purplehere.com';
const SLUG = process.env.SLUG || 'kdine-korean';
const ITEM = process.env.ITEM || '15';
const TS = process.env.TS || 'run';

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true });
  const page = await ctx.newPage();
  const errors = [];
  page.on('console', m => { if (m.type() === 'error') errors.push('console: ' + m.text().slice(0, 160)); });
  page.on('pageerror', e => errors.push('pageerror: ' + (e.message || e).slice(0, 160)));
  const log = s => console.log(s);
  const url = () => page.url().replace(BASE, '');
  const sheetInfo = async () => {
    const dialog = page.locator('[role="dialog"]');
    if (!(await dialog.count())) return { open: false };
    const cards = dialog.locator('button[aria-label^="Add to Cart"], button[aria-label*="Tambah"], button[aria-label*="加入"], button[aria-label*="추가"]');
    const n = await cards.count();
    // detect blank thumbnails: a card whose thumb div has no background-image
    return { open: true, cards: n };
  };

  // establish session: order-type -> menu
  await page.goto(`${BASE}/mobile/${SLUG}`, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1000);
  const typeBtn = page.locator('button', { hasText: /pickup|takeaway|dine|픽업|포장|매장|delivery/i }).first();
  if (await typeBtn.count()) { await typeBtn.click().catch(()=>{}); await page.waitForTimeout(700); }
  const cont = page.locator('button', { hasText: /continue|confirm|start|다음|시작|주문/i }).first();
  if (await cont.count()) { await cont.click().catch(()=>{}); await page.waitForTimeout(900); }

  const cartCount = async () => page.evaluate(() => {
    try { const c = JSON.parse(localStorage.getItem('mobile_cart') || '[]'); return Array.isArray(c) ? c.reduce((s,i)=>s+(i.quantity||0),0) : 0; } catch { return -1; }
  });
  const selectRequiredOptions = async () => {
    // item 15 has 2 required option groups; pick the first option in each.
    for (const label of ['Option 1', 'Option A']) {
      const o = page.locator('button', { hasText: new RegExp('^' + label, 'i') }).first();
      if (await o.count()) { await o.click().catch(()=>{}); await page.waitForTimeout(200); }
    }
  };
  const clickAdd = async () => {
    await selectRequiredOptions();
    const btn = page.locator('button', { hasText: /add to cart|장바구니에 추가|加入购物车|tambah ke troli/i }).first();
    await btn.waitFor({ state: 'visible', timeout: 8000 }).catch(()=>{});
    await page.waitForTimeout(300);
    const disabled = await btn.isDisabled().catch(()=>true);
    if (disabled) { log('   (Add button still disabled — options not satisfied)'); return; }
    await btn.click().catch(()=>{});
  };
  const waitSheet = async (ms = 3000) => {
    const end = Date.now() + ms;
    while (Date.now() < end) { if (await page.locator('[role="dialog"]').count()) return true; if (url().includes('/menu')) return false; await page.waitForTimeout(150); }
    return false;
  };

  // STEP 1: open item detail directly
  await page.goto(`${BASE}/mobile/${SLUG}/item/${ITEM}`, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1500);
  const ls0 = await page.evaluate(() => Object.keys(localStorage).filter(k => /cart/i.test(k)));
  log(`[1] open item ${ITEM}: url=${url()}  cartKeys=${JSON.stringify(ls0)}`);

  // STEP 2: Add to cart -> expect sheet
  await clickAdd();
  await waitSheet(3500);
  let s = await sheetInfo();
  log(`[2] after FIRST Add: sheet=${s.open ? 'OPEN ('+s.cards+' cards)' : 'CLOSED'}  url=${url()}  cart=${await cartCount()}`);
  await page.screenshot({ path: `/tmp/addon-${TS}-step2.png` });

  if (s.open) {
    // STEP 3: tap first rec card
    const card = page.locator('[role="dialog"] button[aria-label^="Add to Cart"], [role="dialog"] button[aria-label*="추가"], [role="dialog"] button[aria-label*="Tambah"]').first();
    const hadCard = await card.count();
    if (hadCard) { await card.click().catch(()=>{}); await page.waitForTimeout(1200); }
    s = await sheetInfo();
    log(`[3] after tap rec card: sheet=${s.open ? 'OPEN ('+s.cards+' cards)' : 'CLOSED'}  url=${url()}  ${url().includes('/menu') ? '<-- jumped to MENU (list disappeared)' : ''}`);
    await page.screenshot({ path: `/tmp/addon-${TS}-step3.png` });

    // STEP 4: if still on detail with sheet, tap remaining card(s) to empty it
    if (s.open && s.cards > 0) {
      const c2 = page.locator('[role="dialog"] button[aria-label^="Add to Cart"], [role="dialog"] button[aria-label*="추가"]').first();
      if (await c2.count()) { await c2.click().catch(()=>{}); await page.waitForTimeout(1200); }
      log(`[4] after emptying sheet: url=${url()}  ${url().includes('/menu') ? '<-- jumped to MENU' : ''}`);
    }
  }

  // STEP 5: re-enter SAME item and Add again -> does sheet show?
  log(`[4b] cart now = ${await cartCount()} (expect 3: item15 + 279 + 335)`);
  await page.goto(`${BASE}/mobile/${SLUG}/item/${ITEM}`, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1200);
  await selectRequiredOptions();
  await page.waitForTimeout(300);
  const reBtn = page.locator('button', { hasText: /add to cart|장바구니에 추가|加入购物车|tambah ke troli/i }).first();
  const reDisabled = await reBtn.isDisabled().catch(()=>true);
  log(`[5a] re-enter Add button disabled? ${reDisabled}`);
  await reBtn.click().catch(()=>{});
  const got = await waitSheet(3500);
  s = await sheetInfo();
  log(`[5] RE-ENTER item ${ITEM} + Add: sheet=${s.open ? 'OPEN ('+s.cards+' un-added cards, total recs may show ✓)' : 'CLOSED -> '+(url().includes('/menu')?'bounced to MENU':'stayed url='+url())}  cart=${await cartCount()}`);
  await page.screenshot({ path: `/tmp/addon-${TS}-step5.png` });

  // STEP 6: re-enter expectation — recs should STILL show (with ✓ on added ones)
  s = await sheetInfo();
  log(`[6] RE-ENTER result: sheet=${s.open ? 'OPEN ('+s.cards+' cards) <-- recs persist on re-entry ✓' : 'CLOSED (recs vanished — BUG)'}`);

  // STEP 7: check API emoji field present
  const api = await page.evaluate(async (args) => {
    const r = await fetch(`/api/mobile/${args.slug}/products/${args.item}/recommendations`);
    const j = await r.json();
    return (j.data || []).map(d => ({ id: d.id, hasImage: !!d.image, emojiField: 'emoji' in d }));
  }, { slug: SLUG, item: ITEM });
  log(`[7] API emoji field present: ${JSON.stringify(api)}`);

  log('--- console/page errors ---');
  const real = errors.filter(e => !/favicon|analytics|gtag|sw\.js|manifest|net::ERR|Failed to load resource|status of 4|status of 5/i.test(e));
  log(real.length ? real.join('\n') : 'NONE');
  await browser.close();
  process.exit(0);
})();

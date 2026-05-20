// Captures Purple POS pages at 1280×800 and 1366×768 (10-13" POS monitors)
// Usage: TOKEN=... RID=5 node scripts/capture-responsive.js
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE = process.env.BASE_URL || 'https://dev.purplehere.com';
const TOKEN = process.env.TOKEN;
const RID = process.env.RID || '5';
const OUT_DIR = process.env.OUT_DIR || '/tmp/capture-responsive';

if (!TOKEN) { console.error('TOKEN required'); process.exit(1); }
fs.mkdirSync(OUT_DIR, { recursive: true });

const PAGES = [
  { name: 'landing', url: `${BASE}/`, requireAuth: false },
  { name: 'pos-dashboard', url: `${BASE}/restaurant/${RID}/dashboard` },
  { name: 'pos-settings-printer', url: `${BASE}/restaurant/${RID}/settings?tab=printer` },
  { name: 'pos-settings-store', url: `${BASE}/restaurant/${RID}/settings?tab=store` },
  { name: 'pos-terminal', url: `${BASE}/restaurant/${RID}/pos-terminal` },
  { name: 'pos-menu', url: `${BASE}/restaurant/${RID}/menu` },
];

const VIEWPORTS = [
  { name: '1280x800', width: 1280, height: 800 },
  { name: '1366x768', width: 1366, height: 768 },
  { name: '1920x1080', width: 1920, height: 1080 },
];

(async () => {
  const browser = await chromium.launch();
  const results = [];

  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1,
    });

    // Pre-inject auth token before any page load
    await ctx.addInitScript(token => {
      try { localStorage.setItem('auth_token', token); } catch {}
    }, TOKEN);

    const page = await ctx.newPage();
    const consoleErrors = [];
    page.on('console', m => { if (m.type() === 'error') consoleErrors.push(m.text()); });
    page.on('pageerror', e => consoleErrors.push(`PAGEERROR: ${e.message}`));

    for (const p of PAGES) {
      const errsBefore = consoleErrors.length;
      try {
        await page.goto(p.url, { waitUntil: 'domcontentloaded', timeout: 30000 });
        await page.waitForTimeout(2500); // let React render + i18n load
      } catch (e) {
        results.push({ viewport: vp.name, page: p.name, status: 'NAV_FAIL', error: e.message });
        continue;
      }

      // Check horizontal overflow at viewport width
      const overflow = await page.evaluate(() => {
        const doc = document.documentElement;
        const body = document.body;
        const docW = Math.max(doc.scrollWidth, body.scrollWidth);
        const winW = window.innerWidth;
        return { docW, winW, overflow: docW > winW + 2 };
      }).catch(() => null);

      const fname = `${p.name}_${vp.name}.png`;
      await page.screenshot({ path: path.join(OUT_DIR, fname), fullPage: false });
      const newErrs = consoleErrors.slice(errsBefore);
      results.push({
        viewport: vp.name,
        page: p.name,
        status: 'OK',
        overflow: overflow?.overflow ? `${overflow.docW}px > ${overflow.winW}px` : 'none',
        errors: newErrs.length,
        firstError: newErrs[0]?.slice(0, 120) || null,
      });
    }
    await ctx.close();
  }
  await browser.close();

  console.log(JSON.stringify(results, null, 2));
})();

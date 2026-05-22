const { chromium } = require('playwright');
const { execSync } = require('child_process');
const DEV_URL = 'https://dev.purplehere.com';
const Restaurant = require('/var/www/dev-backend/models/Restaurant');

(async () => {
  const r = await Restaurant.findOne({where:{slug:'demo-korean-bbq'}});
  const orig = r.getDataValue('payment_settings');
  const origObj = typeof orig === 'string' ? JSON.parse(orig) : orig;

  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 400, height: 800 }, ignoreHTTPSErrors: true });

  // T1: cash.enabled=true → 뱃지 안 보임
  await r.update({payment_settings: {...origObj, cash: {...origObj.cash, enabled: true, availableIn:['pos','mobile']}}});
  let page = await ctx.newPage();
  await page.goto(`${DEV_URL}/mobile/demo-korean-bbq/menu`, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(5000);
  const b1 = await page.locator('text=/Cashless|캐시리스|无现金|Tanpa Tunai/i').count();
  console.log(`[T1] cash.enabled=true → Cashless 뱃지: ${b1 === 0 ? '✓ none (expected)' : `❌ shown (${b1})`}`);
  await page.close();

  // T2: cash.enabled=false → 뱃지 보임
  await r.update({payment_settings: {...origObj, cash: {...origObj.cash, enabled: false, availableIn:[]}}});
  page = await ctx.newPage();
  await page.goto(`${DEV_URL}/mobile/demo-korean-bbq/menu`, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(5000);
  const b2 = await page.locator('text=/Cashless|캐시리스/i').count();
  console.log(`[T2] cash.enabled=false → Cashless 뱃지: ${b2 > 0 ? '✓ shown' : '❌ missing'}`);

  // Korean locale
  await page.evaluate(() => localStorage.setItem('i18nextLng', 'ko'));
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(5000);
  const ko = await page.locator('text="캐시리스"').count();
  console.log(`[T2-ko] 한국어 표시: ${ko > 0 ? '✓ 캐시리스' : '❌ 영어 잔존'}`);

  await page.close();
  await browser.close();

  // Restore
  await r.update({payment_settings: orig});
  console.log(`\nRestored payment_settings`);
  process.exit((b1 === 0 && b2 > 0) ? 0 : 1);
})().catch(e => { console.error(e.message); process.exit(1); });

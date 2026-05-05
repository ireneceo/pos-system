/**
 * Auto-capture screenshots for FeaturesPage feature_code_N.{webp,png}
 * Phase 7 — fix MySuppliersPage display + re-capture remaining "Coming soon" cards
 */
const { chromium } = require('@playwright/test');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const BASE_URL = process.env.BASE_URL || 'https://dev.purplehere.com';
const API_BASE = process.env.API_BASE || 'http://localhost:3001';
const OUT_DIR = '/var/www/dev-frontend/public/images/features/dashboard';

const TARGETS = [
  // After supplier_name display fix
  { code: 'buyer_supplier_contracts', index: 1, role: 'test_restaurant_admin', path: '/pos/suppliers/contracts' },
  // After brand_id=1 manual seed
  { code: 'brand_work_manuals',       index: 1, role: 'test_brand_general',    path: '/pos/brand/general/work-manuals' },
  // After demo_owner ownership + ticket seed
  { code: 'owner_operation_inquiry',  index: 1, role: 'demo_multi_owner',      path: '/pos/owner/operation-inquiry' },
  { code: 'owner_system_inquiry',     index: 1, role: 'demo_multi_owner',      path: '/pos/owner/system-inquiry' }
];

async function loginAndGetToken(role) {
  const res = await fetch(`${API_BASE}/api/auth/demo-login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ key: role })
  });
  if (!res.ok) throw new Error(`demo-login failed for ${role}: HTTP ${res.status}`);
  const j = await res.json();
  if (!j?.data?.token) throw new Error(`demo-login no token for ${role}`);
  return { token: j.data.token, user: j.data.user };
}

async function captureOne(browser, target) {
  const { code, index, role, path: urlPath } = target;
  const slot = `${code}_${index}`;
  const png = path.join(OUT_DIR, `${slot}.png`);
  const webp = path.join(OUT_DIR, `${slot}.webp`);

  console.log(`\n→ ${slot} (${role}) ${urlPath}`);

  const { token, user } = await loginAndGetToken(role);
  const finalPath = urlPath
    .replace('{restaurant_id}', String(user.restaurant_id || ''))
    .replace('{brand_id}', String(user.brand_id || ''))
    .replace('{foodcourt_id}', String(user.foodcourt_id || ''));

  const ctx = await browser.newContext({
    viewport: { width: 1480, height: 833 },
    deviceScaleFactor: 2,
    locale: 'en-US',
  });

  await ctx.addInitScript(`
    try {
      window.localStorage.setItem('auth_token', ${JSON.stringify(token)});
      window.localStorage.setItem('i18nextLng', 'en');
      window.localStorage.setItem('preferred_language', 'en');
      window.localStorage.setItem('welcome_modal_seen_${user.id}', 'true');
      window.localStorage.setItem('setup_guide_dismissed_${user.id}', 'true');
    } catch(e) {}
  `);

  const page = await ctx.newPage();
  page.setDefaultTimeout(30000);
  page.on('console', () => {});

  try {
    const url = `${BASE_URL}${finalPath}`;
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2500);

    await page.evaluate(() => {
      const dismissTexts = ['will explore', 'dismiss', 'skip', 'close', 'maybe later', '×', '✕'];
      const buttons = Array.from(document.querySelectorAll('button'));
      for (const b of buttons) {
        const t = (b.textContent || '').trim().toLowerCase();
        if (dismissTexts.some(d => t.includes(d))) { b.click(); break; }
      }
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', code: 'Escape', keyCode: 27, which: 27, bubbles: true }));
    });
    await page.waitForTimeout(600);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);

    const buffer = await page.screenshot({ type: 'png', fullPage: false });
    fs.writeFileSync(png, buffer);
    await sharp(buffer).webp({ quality: 82 }).toFile(webp);

    const sizePng = fs.statSync(png).size;
    const sizeWebp = fs.statSync(webp).size;
    console.log(`  ✓ ${slot}: png ${(sizePng/1024).toFixed(0)}KB, webp ${(sizeWebp/1024).toFixed(0)}KB`);
  } catch (e) {
    console.log(`  ✗ ${slot} failed: ${e.message.slice(0, 200)}`);
  } finally {
    await ctx.close();
  }
}

function syncToNginx() {
  const { execSync } = require('child_process');
  try {
    execSync(`sudo cp ${OUT_DIR}/*.webp ${OUT_DIR}/*.png /var/www/dev-frontend-build/images/features/dashboard/`, { stdio: 'inherit' });
    console.log('  ✓ synced to nginx serve dir');
  } catch (e) {
    console.warn(`  (sync warning: ${e.message.slice(0, 100)})`);
  }
}

(async () => {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  try {
    for (const t of TARGETS) {
      await captureOne(browser, t);
    }
  } finally {
    await browser.close();
  }
  console.log('\n→ syncing to nginx...');
  syncToNginx();
})().catch(e => { console.error('FATAL:', e.message); process.exit(1); });

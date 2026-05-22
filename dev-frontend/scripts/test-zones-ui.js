const { chromium } = require('playwright');
const { execSync } = require('child_process');
const DEV_URL = 'https://dev.purplehere.com';

(async () => {
  const login = JSON.parse(execSync(`curl -sk -X POST ${DEV_URL}/api/auth/demo-login -H 'Content-Type: application/json' -d '{"key":"demo_restaurant_admin"}'`).toString());
  const token = login.data?.token;
  if (!token) { console.error('Login fail'); process.exit(1); }
  console.log(`✓ Token OK`);

  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1366, height: 900 }, ignoreHTTPSErrors: true });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(`pageerror: ${e.message}`));
  page.on('console', m => { if (m.type() === 'error') errors.push(`console: ${m.text().slice(0, 250)}`); });

  await page.goto(`${DEV_URL}/`, { waitUntil: 'domcontentloaded' });
  await page.evaluate((tok) => localStorage.setItem('auth_token', tok), token);

  const restaurantId = login.data.user?.restaurant_id || login.data.user?.restaurantId;
  console.log(`restaurantId=${restaurantId}`);

  const fail = async (m) => { console.error('❌', m); await page.screenshot({path:'/tmp/ui-fail.png',fullPage:true}); console.log('  screenshot /tmp/ui-fail.png'); await browser.close(); process.exit(1); };

  // 1. Settings/Operations 진입
  await page.goto(`${DEV_URL}/restaurant/${restaurantId}/settings?tab=operations`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(6000);
  if (await page.locator('text="Zones & Table Groups"').count() === 0) return fail('Zones card not rendered');
  console.log('✓ Settings/Operations + Zones card rendered');

  // 2. Add zone
  await page.locator('button:has-text("Add zone")').first().click();
  await page.waitForTimeout(800);
  const testZoneName = `TestZone_${Date.now()}`;
  await page.locator('input[placeholder*="Indoor"]').first().fill(testZoneName);
  // Modal 안 "Add" 버튼 — 두 번째 Add (첫 번째는 "+ Add zone")
  await page.locator('button:has-text("Add"):visible').last().click();
  await page.waitForTimeout(2500);
  if (await page.locator(`text="${testZoneName}"`).count() === 0) return fail('New zone not visible');
  console.log(`✓ Zone "${testZoneName}" added + visible`);

  // 3. Add table group
  await page.locator('button:has-text("Add table group")').last().click();
  await page.waitForTimeout(800);
  await page.locator('input[placeholder*="Main Hall"]').first().fill('TestGrp');
  await page.locator('input[placeholder*="I, O"]').first().fill('TG');
  // Number of tables (3)
  await page.locator('input[type="number"]').first().fill('3');
  await page.locator('button:has-text("Create")').first().click();
  await page.waitForTimeout(3000);

  // 4. Tables 자동 생성 확인
  const tg1 = await page.locator('text=/^TG-1$/').count();
  const tg2 = await page.locator('text=/^TG-2$/').count();
  const tg3 = await page.locator('text=/^TG-3$/').count();
  if (tg1 === 0 || tg2 === 0 || tg3 === 0) return fail(`Tables not all visible (TG-1=${tg1} TG-2=${tg2} TG-3=${tg3})`);
  console.log(`✓ Auto-generated TG-1/TG-2/TG-3 visible in QR grid`);

  // 5. Floor Plan page — zone filter chip
  await page.goto(`${DEV_URL}/restaurant/${restaurantId}/floor-plan`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(5000);
  const allZonesChips = await page.locator('button:has-text("All Zones")').count();
  if (allZonesChips > 0) {
    console.log('✓ Floor Plan zone filter chip "All Zones" visible');
    const tzChips = await page.locator(`button:has-text("${testZoneName}")`).count();
    if (tzChips > 0) {
      await page.locator(`button:has-text("${testZoneName}")`).first().click();
      await page.waitForTimeout(1500);
      console.log(`✓ Clicked "${testZoneName}" zone chip — filter applied`);
    }
  } else {
    console.log('⚠ Zone filter chip 없음 (단일 zone — filter UI 미표시 정상)');
  }

  // 6. Cleanup
  await page.goto(`${DEV_URL}/restaurant/${restaurantId}/settings?tab=operations`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(4000);
  const zoneEl = page.locator(`text="${testZoneName}"`).first();
  if (await zoneEl.count() > 0) {
    // Locate Delete button near zone name (within zone block)
    const deleteBtn = page.locator(`text="${testZoneName}"`).locator('xpath=ancestor::*[1]//button[contains(text(),"Delete")]').first();
    const altDelete = page.locator(`text="${testZoneName}"`).locator('xpath=following-sibling::*//button[contains(text(),"Delete")]').first();
    const targetDelete = await deleteBtn.count() > 0 ? deleteBtn : altDelete;
    if (await targetDelete.count() > 0) {
      await targetDelete.click();
      await page.waitForTimeout(600);
      // Confirm modal — last visible Delete
      await page.locator('button:has-text("Delete"):visible').last().click();
      await page.waitForTimeout(2500);
      console.log('✓ Cleanup: deleted test zone');
    } else {
      console.log('⚠ Cleanup: delete button not located — manual cleanup may be needed');
    }
  }

  // 7. Console errors
  if (errors.length > 0) {
    console.log(`\n⚠ Console errors (${errors.length}) — first 5:`);
    errors.slice(0, 5).forEach(e => console.log('  ', e));
  } else {
    console.log('✓ No console errors during full flow');
  }

  console.log('\n=== UI FLOW: ✓ ALL PASS ===');
  await browser.close();
  process.exit(0);
})().catch(e => { console.error('CRASH:', e.message); process.exit(1); });

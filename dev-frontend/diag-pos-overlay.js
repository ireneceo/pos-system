/* Diagnose: POS overlay (from=floor-plan-overlay) stuck loading. Capture network + console + what renders. */
const { chromium } = require('playwright');
const BASE = 'https://dev.purplehere.com';
const TOKEN = process.env.TOKEN;
const RID = '38';
(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 1366, height: 900 } });
  const p = await ctx.newPage();
  const pending = new Map();   // url -> start time
  const finished = [];
  const errs = [];
  p.on('request', r => { if (/\/api\//.test(r.url())) pending.set(r.url(), Date.now()); });
  p.on('requestfinished', r => { if (pending.has(r.url())) { finished.push({ url: r.url(), ms: Date.now() - pending.get(r.url()), status: 'done' }); pending.delete(r.url()); } });
  p.on('requestfailed', r => { if (pending.has(r.url())) { finished.push({ url: r.url(), ms: Date.now() - pending.get(r.url()), status: 'FAILED:' + (r.failure()?.errorText || '?') }); pending.delete(r.url()); } });
  p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  p.on('pageerror', e => errs.push('PAGEERROR: ' + e.message));

  await p.addInitScript(t => { try { localStorage.setItem('auth_token', t); } catch {} }, TOKEN);
  const url = `${BASE}/restaurant/${RID}/pos-terminal?table=T001&tableId=ft-1773151103647-loq0&from=floor-plan-overlay`;
  console.log('Loading overlay POS URL...\n');
  await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 }).catch(e => console.log('goto err:', e.message));
  await p.waitForTimeout(15000);  // wait 15s — if still loading, capture state

  // What's on screen?
  const bodyText = (await p.locator('body').innerText().catch(() => '')).slice(0, 400);
  const hasLoadingSpinner = await p.locator('text=/loading|로딩|불러오는/i').count().catch(() => 0);
  const hasMenu = await p.locator('text=/menu|category|장바구니|cart|order/i').count().catch(() => 0);

  console.log('=== STILL-PENDING /api calls after 15s (these are the hang) ===');
  if (pending.size === 0) console.log('  (none — all API calls completed)');
  for (const [u, t] of pending) console.log(`  ⏳ ${Date.now() - t}ms  ${u.replace(BASE, '')}`);

  console.log('\n=== SLOWEST completed /api calls ===');
  finished.sort((a, b) => b.ms - a.ms).slice(0, 8).forEach(f => console.log(`  ${f.ms}ms ${f.status}  ${f.url.replace(BASE, '')}`));

  console.log('\n=== FAILED calls ===');
  const failed = finished.filter(f => f.status.startsWith('FAILED'));
  if (!failed.length) console.log('  (none)');
  failed.forEach(f => console.log(`  ${f.status}  ${f.url.replace(BASE, '')}`));

  console.log('\n=== console errors ===');
  if (!errs.length) console.log('  (none)');
  errs.slice(0, 8).forEach(e => console.log('  ' + e.slice(0, 200)));

  console.log('\n=== screen state ===');
  console.log('  loading spinner present:', hasLoadingSpinner, '| menu/cart present:', hasMenu);
  console.log('  body text (first 400):', JSON.stringify(bodyText));

  await b.close();
})().catch(e => { console.error('FATAL', e); process.exit(1); });

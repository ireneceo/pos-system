const { chromium } = require('/var/www/dev-frontend/node_modules/playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const logs = [];
  page.on('console', m => logs.push('[console] ' + m.text()));
  page.on('pageerror', e => logs.push('[pageerror] ' + e.message));
  page.on('request', r => { if (r.url().includes('/api/comments')) logs.push(`[req] ${r.method()} ${r.url().replace('https://dev.purplehere.com','')}`); });
  page.on('response', async r => { if (r.url().includes('/api/comments') && r.request().method()==='DELETE') logs.push(`[res] DELETE ${r.status()} ${r.url().replace('https://dev.purplehere.com','')}`); });

  const base = 'https://dev.purplehere.com';

  // get token via api
  const tokRes = await page.request.post('http://localhost:3001/api/auth/demo-login', {
    data: { key: 'demo_brand_general' }, headers: { 'content-type': 'application/json' }
  });
  const tok = (await tokRes.json()).data.token;

  await page.addInitScript((t) => { localStorage.setItem('auth_token', t); }, tok);

  // navigate to notices page (brand general)
  await page.goto(base + '/pos/brand/general/notices', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(4500);
  console.log('URL:', page.url());
  console.log('title text sample:', (await page.textContent('body')).slice(0, 200).replace(/\s+/g,' '));

  // click first notice title to open modal
  const clickable = page.locator('text=PurpleHere POS Update').first();
  console.log('notice title count:', await clickable.count());
  if (await clickable.count()) {
    await clickable.click();
  } else {
    await page.locator('tr').nth(1).click().catch(()=>{});
  }
  await page.waitForTimeout(2000);
  await page.screenshot({ path: '/tmp/claude-1000/-var-www/3d3968d1-8e3f-497e-93aa-7aee0ea31acf/scratchpad/modal.png' });
  console.log('textareas in modal:', await page.locator('textarea').count());
  console.log('Send buttons:', await page.locator('button:has-text("Send")').count());

  // Add comment in CommentSection textarea
  const ta = page.locator('textarea').first();
  await ta.fill('BROWSER_TEST_DELETE_ME');
  await page.locator('button:has-text("Send")').first().click();
  await page.waitForTimeout(2500);

  console.log('comment present after add:', await page.locator('text=BROWSER_TEST_DELETE_ME').count());

  // Click Delete button (in comment header)
  const del = page.locator('button:has-text("Delete")');
  const delCount = await del.count();
  console.log('Delete buttons found:', delCount);
  // The last Delete is likely our comment's (notice delete may also be "Delete")
  await del.last().click();
  await page.waitForTimeout(2500);

  console.log('comment items AFTER delete:', await page.locator('text=BROWSER_TEST_DELETE_ME').count());

  // Check via API whether comment(s) still in DB
  const check = await page.request.get('http://localhost:3001/api/comments/notice/95', { headers: { Authorization: 'Bearer ' + tok } });
  const cj = await check.json();
  const mine = cj.data.filter(c => c.content === 'BROWSER_TEST_DELETE_ME');
  console.log('DB comments matching test text:', mine.length, JSON.stringify(mine.map(c=>({id:c.id,author_id:c.author_id}))));

  console.log('--- logs ---');
  logs.forEach(l => console.log(l));

  // cleanup any leftover test comments
  for (const c of mine) {
    await page.request.delete('http://localhost:3001/api/comments/' + c.id, { headers: { Authorization: 'Bearer ' + tok } });
  }

  await browser.close();
})().catch(e => { console.error('FATAL', e); process.exit(1); });

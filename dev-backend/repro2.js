const { chromium } = require('/var/www/dev-frontend/node_modules/playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  page.on('request', r => { if (r.url().includes('/api/comments') && r.method()!=='GET') console.log(`[req] ${r.method()} ${r.url().replace('https://dev.purplehere.com','')}`); });

  const tok = (await (await page.request.post('http://localhost:3001/api/auth/demo-login',{data:{key:'demo_brand_general'},headers:{'content-type':'application/json'}})).json()).data.token;
  await page.addInitScript((t)=>localStorage.setItem('auth_token',t), tok);
  await page.goto('https://dev.purplehere.com/pos/brand/general/notices',{waitUntil:'domcontentloaded'});
  await page.waitForTimeout(4500);

  await page.locator('text=PurpleHere POS Update').first().click();
  await page.waitForTimeout(1800);

  const UNIQ = 'PRECISE_'+Date.now();
  await page.locator('textarea').first().fill(UNIQ);
  await page.locator('button:has-text("Send")').first().click();
  await page.waitForTimeout(2200);

  const commentItem = page.locator('div', { hasText: UNIQ });
  console.log('own Delete buttons visible:', await page.locator('button:has-text("Delete")').count());
  console.log('text present after add:', await page.getByText(UNIQ, {exact:true}).count());

  // Click the Delete button that belongs to THIS comment (scope to its comment item)
  // The comment header holds AuthorName + Delete; find the Delete nearest the text.
  await page.locator('button:has-text("Delete")').last().click();
  await page.waitForTimeout(2500);

  console.log('text present AFTER delete:', await page.getByText(UNIQ, {exact:true}).count());

  const cj = await (await page.request.get('http://localhost:3001/api/comments/notice/95',{headers:{Authorization:'Bearer '+tok}})).json();
  const mine = cj.data.filter(c=>c.content===UNIQ);
  console.log('DB rows with this text after delete:', mine.length);
  for (const c of mine) await page.request.delete('http://localhost:3001/api/comments/'+c.id,{headers:{Authorization:'Bearer '+tok}});
  await browser.close();
})().catch(e=>{console.error('FATAL',e.message);process.exit(1);});

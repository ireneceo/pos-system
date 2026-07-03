const { chromium } = require('/var/www/dev-frontend/node_modules/playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  page.on('response', async r => {
    if (r.url().includes('/api/comments/notice/95') && r.request().method()==='GET') {
      const fromCache = r.fromServiceWorker();
      let body=[]; try { body = (await r.json()).data.map(c=>c.id); } catch(e){}
      console.log(`[GET resp] status=${r.status()} sw=${fromCache} cache-control=${r.headers()['cache-control']||'(none)'} etag=${r.headers()['etag']||'(none)'} ids=${JSON.stringify(body)}`);
    }
  });
  const tok = (await (await page.request.post('http://localhost:3001/api/auth/demo-login',{data:{key:'demo_brand_general'},headers:{'content-type':'application/json'}})).json()).data.token;
  await page.addInitScript((t)=>localStorage.setItem('auth_token',t), tok);
  await page.goto('https://dev.purplehere.com/pos/brand/general/notices',{waitUntil:'domcontentloaded'});
  await page.waitForTimeout(4500);
  await page.locator('text=PurpleHere POS Update').first().click();
  await page.waitForTimeout(1800);
  console.log('--- adding comment ---');
  const UNIQ = 'CACHE_'+Date.now();
  await page.locator('textarea').first().fill(UNIQ);
  await page.locator('button:has-text("Send")').first().click();
  await page.waitForTimeout(3000);
  console.log('Section title after add:', await page.locator('h4:has-text("Comments")').first().textContent());

  const cj = await (await page.request.get('http://localhost:3001/api/comments/notice/95',{headers:{Authorization:'Bearer '+tok}})).json();
  console.log('DB ids now:', cj.data.map(c=>c.id));
  for (const c of cj.data.filter(c=>/^(CACHE_|DUMP_|PRECISE_|BROWSER_)/.test(c.content))) await page.request.delete('http://localhost:3001/api/comments/'+c.id,{headers:{Authorization:'Bearer '+tok}});
  await browser.close();
})().catch(e=>{console.error('FATAL',e.message);process.exit(1);});

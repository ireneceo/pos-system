const { chromium } = require('/var/www/dev-frontend/node_modules/playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  page.on('response', async r => {
    if (r.url().includes('/api/comments')) {
      const m = r.request().method();
      if (m==='GET' && !r.url().includes('unread')) console.log(`[GET ${r.url().split('/api/comments')[1]}] ${r.status()}`);
      if (m==='POST' && r.url().endsWith('/api/comments')) console.log(`[POST] status=${r.status()}`);
      if (m==='DELETE') console.log(`[DELETE ${r.url().split('/api/comments')[1]}] ${r.status()}`);
    }
  });
  const tok = (await (await page.request.post('http://localhost:3001/api/auth/demo-login',{data:{key:'demo_brand_general'},headers:{'content-type':'application/json'}})).json()).data.token;
  await page.addInitScript((t)=>localStorage.setItem('auth_token',t), tok);
  await page.goto('https://dev.purplehere.com/pos/brand/general/notices',{waitUntil:'domcontentloaded'});
  await page.waitForTimeout(4500);
  await page.locator('text=PurpleHere POS Update').first().click();
  await page.waitForTimeout(1800);
  console.log('=== ADD ===');
  const UNIQ = 'S5_'+Date.now();
  await page.locator('textarea').first().fill(UNIQ);
  await page.locator('button:has-text("Send")').first().click();
  await page.waitForTimeout(3000);
  console.log('title:', await page.locator('h4:has-text("Comments")').first().textContent());
  const cj = await (await page.request.get('http://localhost:3001/api/comments/notice/95',{headers:{Authorization:'Bearer '+tok}})).json();
  for (const c of cj.data.filter(c=>/^(S5_|CACHE_|DUMP_|PRECISE_|BROWSER_)/.test(c.content))) await page.request.delete('http://localhost:3001/api/comments/'+c.id,{headers:{Authorization:'Bearer '+tok}});
  await browser.close();
})().catch(e=>{console.error('FATAL',e.message);process.exit(1);});

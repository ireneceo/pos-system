const { chromium } = require('/var/www/dev-frontend/node_modules/playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const T0=Date.now(); const ts=()=>((Date.now()-T0)/1000).toFixed(2);
  const rel=u=>u.split('/api/comments')[1]||u;
  page.on('request', r=>{ if(r.url().includes('/api/comments')&&!r.url().includes('unread')) console.log(`${ts()} [REQ ${r.method()}] ${rel(r.url())}`);});

  const tok=(await(await page.request.post('http://localhost:3001/api/auth/demo-login',{data:{key:'demo_brand_general'},headers:{'content-type':'application/json'}})).json()).data.token;

  // PRE-SEED one comment via API so list is non-empty on open
  const seed=await(await page.request.post('http://localhost:3001/api/comments',{headers:{Authorization:'Bearer '+tok,'content-type':'application/json'},data:{entity_type:'notice',entity_id:'95',content:'SEED_KEEP'}})).json();
  console.log('seed id', seed.data.id);

  await page.addInitScript((t)=>localStorage.setItem('auth_token',t), tok);
  await page.goto('https://dev.purplehere.com/pos/brand/general/notices',{waitUntil:'domcontentloaded'});
  await page.waitForTimeout(4500);
  await page.locator('text=PurpleHere POS Update').first().click();
  await page.waitForTimeout(1800);
  console.log('title on open:', await page.locator('h4:has-text("Comments")').first().textContent());
  console.log('=== ADD (non-empty list) ===');
  await page.locator('textarea').first().fill('S7_ADD');
  await page.locator('button:has-text("Send")').first().click();
  await page.waitForTimeout(3000);
  console.log('title after add:', await page.locator('h4:has-text("Comments")').first().textContent());
  console.log('=== DELETE the added one ===');
  // delete last own comment
  const dels = page.locator('button:has-text("Delete")');
  console.log('delete buttons:', await dels.count());
  await dels.last().click();
  await page.waitForTimeout(3000);
  console.log('title after delete:', await page.locator('h4:has-text("Comments")').first().textContent());

  const cj=await(await page.request.get('http://localhost:3001/api/comments/notice/95',{headers:{Authorization:'Bearer '+tok}})).json();
  console.log('DB now:', cj.data.map(c=>({id:c.id,c:c.content})));
  for(const c of cj.data.filter(c=>/^(S\d_|SEED_|CACHE_|DUMP_|PRECISE_|BROWSER_)/.test(c.content))) await page.request.delete('http://localhost:3001/api/comments/'+c.id,{headers:{Authorization:'Bearer '+tok}});
  await browser.close();
})().catch(e=>{console.error('FATAL',e.message);process.exit(1);});

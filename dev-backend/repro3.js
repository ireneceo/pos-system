const { chromium } = require('/var/www/dev-frontend/node_modules/playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const tok = (await (await page.request.post('http://localhost:3001/api/auth/demo-login',{data:{key:'demo_brand_general'},headers:{'content-type':'application/json'}})).json()).data.token;
  await page.addInitScript((t)=>localStorage.setItem('auth_token',t), tok);
  await page.goto('https://dev.purplehere.com/pos/brand/general/notices',{waitUntil:'domcontentloaded'});
  await page.waitForTimeout(4500);
  await page.locator('text=PurpleHere POS Update').first().click();
  await page.waitForTimeout(1800);

  const UNIQ = 'DUMP_'+Date.now();
  await page.locator('textarea').first().fill(UNIQ);
  await page.locator('button:has-text("Send")').first().click();
  await page.waitForTimeout(2500);

  // Dump the Comments section header text and all comment items
  const secTitle = await page.locator('h4:has-text("Comments")').first().textContent().catch(()=>'(none)');
  console.log('Section title:', secTitle);
  const bodyHasUniq = (await page.content()).includes(UNIQ);
  console.log('page HTML contains UNIQ:', bodyHasUniq);

  // dump all Delete buttons and their surrounding author name
  const dels = await page.locator('button:has-text("Delete")').count();
  console.log('Delete buttons:', dels);

  // API state
  const cj = await (await page.request.get('http://localhost:3001/api/comments/notice/95',{headers:{Authorization:'Bearer '+tok}})).json();
  console.log('DB comments on notice 95:', cj.data.map(c=>({id:c.id,content:c.content.slice(0,20),author_id:c.author_id})));

  // cleanup
  for (const c of cj.data.filter(c=>c.content.startsWith('DUMP_')||c.content.startsWith('PRECISE_')||c.content.startsWith('BROWSER_'))) await page.request.delete('http://localhost:3001/api/comments/'+c.id,{headers:{Authorization:'Bearer '+tok}});
  await browser.close();
})().catch(e=>{console.error('FATAL',e.message);process.exit(1);});

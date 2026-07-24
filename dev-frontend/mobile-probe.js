const { chromium } = require('playwright');
(async()=>{
  const b=await chromium.launch();
  const c=await b.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
  const p=await c.newPage();
  await p.goto('https://dev.purplehere.com/demo-korean-bbq',{waitUntil:'domcontentloaded',timeout:45000});
  await p.waitForTimeout(7000);
  try { await p.getByRole('button',{name:/Accept All/i}).click({timeout:8000}); } catch {}
  await p.waitForTimeout(8000);
  console.log('URL:', p.url());
  console.log('TEXT:', JSON.stringify((await p.locator('body').innerText()).slice(0,400)));
  const btns=(await p.locator('button:visible').allInnerTexts()).filter(x=>x.trim());
  console.log('BUTTONS:', JSON.stringify(btns.slice(0,25)));
  console.log('HTML head:', (await p.content()).slice(0,300).replace(/\n/g,' '));
  await b.close();
})().catch(e=>{console.error('ERR',e.message);process.exit(1)});

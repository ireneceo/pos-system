const { chromium } = require('playwright');
(async()=>{
  const b=await chromium.launch();
  const c=await b.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,serviceWorkers:'block'});
  const p=await c.newPage();
  const errs=[], logs=[];
  p.on('pageerror',e=>errs.push('PAGEERROR: '+String(e).slice(0,300)));
  p.on('console',m=>{if(m.type()==='error') logs.push('CONSOLE: '+m.text().slice(0,300))});
  p.on('requestfailed',r=>logs.push('REQFAIL: '+r.url().slice(0,120)));
  await p.goto('https://dev.purplehere.com/demo-korean-bbq',{waitUntil:'domcontentloaded',timeout:45000});
  await p.waitForTimeout(6000);
  try { await p.getByRole('button',{name:/Accept All/i}).click({timeout:8000}); } catch {}
  await p.waitForTimeout(8000);
  if((await p.locator('#root').innerHTML().catch(()=>'')).length===0){ await p.reload({waitUntil:'domcontentloaded'}); await p.waitForTimeout(8000); }
  console.log('TEXT:', JSON.stringify((await p.locator('body').innerText().catch(()=>'')).slice(0,300)));
  console.log('root innerHTML len:', (await p.locator('#root').innerHTML().catch(()=>'')).length);
  console.log('errors:', errs.length); errs.slice(0,4).forEach(e=>console.log('  '+e));
  console.log('console errors:', logs.length); logs.slice(0,6).forEach(e=>console.log('  '+e));
  await b.close();
})().catch(e=>{console.error('ERR',e.message);process.exit(1)});

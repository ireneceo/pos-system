const { chromium } = require('playwright');
const BASE='https://dev.purplehere.com';
(async()=>{
 const b=await chromium.launch({headless:true});
 const ctx=await b.newContext({viewport:{width:1600,height:900},ignoreHTTPSErrors:true,serviceWorkers:'block',
  storageState:{cookies:[],origins:[{origin:BASE,localStorage:[
   {name:'auth_token',value:process.env.RA_TOKEN},{name:'currentUserRole',value:'Restaurant Admin'}]}]}});
 const p=await ctx.newPage();
 const blocked=[];
 p.on('console', m=>{ if(/refused to connect|X-Frame-Options|frame/i.test(m.text())) blocked.push(m.text()); });
 await p.goto(`${BASE}/pos/purchase-orders/170/reconcile`,{waitUntil:'domcontentloaded',timeout:25000});
 await p.waitForTimeout(5000);
 const r = await p.evaluate(() => {
   const f = document.querySelector('iframe');
   const img = document.querySelector('main img');
   return { iframeSrc: f?.getAttribute('src') || null, imgSrc: img?.getAttribute('src') || null,
            iframeCount: document.querySelectorAll('iframe').length };
 });
 console.log('iframe src :', r.iframeSrc);
 console.log('iframe 개수 :', r.iframeCount);
 // 실제로 프레임 내용이 로드됐는지
 const frames = p.frames().filter(f => f !== p.mainFrame());
 console.log('로드된 하위 프레임 :', frames.length, frames.map(f=>f.url().slice(0,90)));
 console.log('차단 콘솔 메시지 :', blocked.length ? blocked.slice(0,2) : '없음');
 await b.close();
})();

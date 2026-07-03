const { chromium } = require('/var/www/dev-frontend/node_modules/playwright');
(async () => {
  const browser = await chromium.launch();
  const tok=(await(await (await chromium.launch()).newPage()).request.post('http://localhost:3001/api/auth/demo-login',{data:{key:'demo_brand_general'},headers:{'content-type':'application/json'}}).catch(()=>null)) ? null : null;
})().catch(()=>{});

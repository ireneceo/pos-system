process.chdir('/var/www/dev-backend');
require('/var/www/dev-backend/node_modules/dotenv').config({ path: '/var/www/dev-backend/.env' });
const jwt = require('/var/www/dev-backend/node_modules/jsonwebtoken');
const { chromium } = require('/var/www/dev-frontend/node_modules/playwright');
const { sequelize } = require('/var/www/dev-backend/config/database');
const q=async(s,r=[])=>(await sequelize.query(s,{replacements:r}))[0];
const BASE='https://dev.purplehere.com';
const OUT=process.env.CLAUDE_JOB_DIR+'/tmp';
const res=[]; const ok=(n,c,d='')=>res.push([c?'PASS':'FAIL',n,d]);
async function ctxFor(browser, userId, role){
  const token=jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:'30m'});
  return browser.newContext({ viewport:{width:1366,height:900}, storageState:{cookies:[],origins:[{origin:BASE,localStorage:[{name:'auth_token',value:token},{name:'currentUserRole',value:role}]}]} });
}
(async()=>{
 const browser=await chromium.launch();
 const errs=[];
 try{
  // ── BG 설정
  const c1=await ctxFor(browser,22,'Brand General'); const p=await c1.newPage();
  p.on('console',m=>{ if(m.type()==='error') errs.push('BG: '+m.text().slice(0,160)); });
  p.on('pageerror',e=>errs.push('BG pageerror: '+e.message));
  await p.goto(BASE+'/pos/brand/payment-settings',{waitUntil:'networkidle',timeout:40000});
  const add=p.getByRole('button',{name:/Add delivery zone|배송 지역 추가/});
  ok('B1 «지역 추가» 버튼 보임', await add.count()>0);
  await add.first().click();
  await p.getByPlaceholder(/Klang Valley/).first().fill('Klang Valley');
  const feeInputs=p.locator('input[type=number][placeholder="10"]'); await feeInputs.first().fill('10');
  await p.getByLabel('Selangor').first().check();
  await p.getByLabel('Kuala Lumpur').first().check();
  await p.waitForTimeout(1500);
  // 둘째 지역 — Selangor 는 비활성이어야
  await add.first().click();
  const sel2=p.getByLabel('Selangor').nth(1);
  ok('B2 다른 지역이 가진 주는 체크 불가', await sel2.isDisabled());
  await p.getByPlaceholder(/Klang Valley/).nth(1).fill('South');
  await feeInputs.nth(1).fill('25');
  await p.getByLabel('Johor').nth(1).check();
  await p.waitForTimeout(1500);
  await p.screenshot({path:OUT+'/bg-zones.png',fullPage:true});
  const [b]=await q("SELECT delivery_zones z FROM brands WHERE id=10");
  const z=typeof b.z==='string'?JSON.parse(b.z):b.z;
  ok('B3 저장됨 (DB 2지역)', Array.isArray(z)&&z.length===2&&z[0].states.includes('Kuala Lumpur'), JSON.stringify(z));
  await p.reload({waitUntil:'networkidle'});
  const names=await p.getByPlaceholder(/Klang Valley/).evaluateAll(els=>els.map(e=>e.value));
  ok('B4 새로고침 후 유지', names.join('|')==='Klang Valley|South', names.join('|'));
  ok('B5 «그 외 지역» 줄', (await p.getByText(/Other areas|그 외 지역/).count())>0);
  await c1.close();
  // ── RA 담기 화면 (공급업체 20 에 지역, 매장 38 = Selangor)
  await q(`UPDATE supplier_companies SET delivery_zones=?, delivery_fee=15, min_order_amount=300 WHERE id=20`,[JSON.stringify([{id:'z1',name:'Klang Valley',fee:10,states:['Selangor','Kuala Lumpur']}])]);
  await q("UPDATE restaurants SET state='Selangor' WHERE id=38");
  const c2=await ctxFor(browser,23,'Restaurant Admin'); const r=await c2.newPage();
  r.on('console',m=>{ if(m.type()==='error') errs.push('RA: '+m.text().slice(0,160)); });
  r.on('pageerror',e=>errs.push('RA pageerror: '+e.message));
  await r.goto(BASE+'/pos/purchase-orders/new',{waitUntil:'networkidle',timeout:40000});
  await r.waitForTimeout(1500);
  await r.screenshot({path:OUT+'/ra-new-po-before.png',fullPage:true});
  // 품목 하나 담기 — 공급업체 20 의 재료 이름으로 찾아서 + 버튼
  const [ing]=await q("SELECT name FROM ingredients WHERE id=49");
  const rowAdd=r.locator(`text=${ing.name}`).first();
  ok('R0 재료 보임', await rowAdd.count()>0, ing.name);
  await rowAdd.click().catch(()=>{});
  await r.waitForTimeout(1500);
  await r.screenshot({path:OUT+'/ra-new-po.png',fullPage:true});
  const zoneText=await r.getByText(/Klang Valley/).count();
  ok('R1 담기 화면 배송비 줄에 지역 이름', zoneText>0);
  await c2.close();
 }catch(e){ ok('EXC',false,e.message.slice(0,300)); }
 finally{
  await q("UPDATE brands SET delivery_zones=NULL WHERE id IN (10,17)");
  await q("UPDATE supplier_companies SET delivery_zones=NULL, delivery_fee=NULL, min_order_amount=NULL WHERE id=20");
  await q("UPDATE restaurants SET state='', postal_code='' WHERE id=38");
  await browser.close();
  for(const x of res) console.log(x.join(' | '));
  console.log('콘솔 오류', errs.length, errs.slice(0,8).join('\n'));
  const [c]=await q("SELECT (SELECT COUNT(*) FROM brands WHERE id IN (10,17) AND delivery_zones IS NOT NULL) b,(SELECT delivery_zones IS NULL AND delivery_fee IS NULL FROM supplier_companies WHERE id=20) s,(SELECT state FROM restaurants WHERE id=38) st");
  console.log('원복',JSON.stringify(c)); process.exit(0);
 }
})();

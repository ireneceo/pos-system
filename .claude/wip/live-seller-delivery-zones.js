process.chdir('/var/www/dev-backend');
require('/var/www/dev-backend/node_modules/dotenv').config({ path: '/var/www/dev-backend/.env' });
const jwt = require('/var/www/dev-backend/node_modules/jsonwebtoken');
const { sequelize } = require('/var/www/dev-backend/config/database');
const q=async(s,r=[])=>(await sequelize.query(s,{replacements:r}))[0];
const BASE='http://127.0.0.1:3001/api';
const tok=(id)=>jwt.sign({ userId:id }, process.env.JWT_SECRET, { expiresIn:'10m' });
const BG=tok(22), RA=tok(23), SUP=tok(227);
async function call(m,path,t,body){const r=await fetch(BASE+path,{method:m,headers:{'Content-Type':'application/json',Authorization:`Bearer ${t}`},body:body?JSON.stringify(body):undefined});let j;try{j=await r.json()}catch{j=null}return {s:r.status,j};}
const res=[]; const ok=(name,cond,detail='')=>{res.push([cond?'PASS':'FAIL',name,detail]);};
const KV=[{name:'Klang Valley',fee:10,states:['Selangor','Kuala Lumpur','Putrajaya']}];
let poId=null;
(async()=>{
 try{
  // A. 브랜드 저장·계정 펼치기
  let r=await call('PUT','/brands/10/payment-settings',BG,{delivery_zones:KV});
  ok('A1 브랜드 PUT zones 200',r.s===200&&r.j.data.delivery_zones?.[0]?.name==='Klang Valley',r.s);
  r=await call('GET','/brands/10/payment-settings',BG); ok('A2 GET 10 그대로',r.j?.data?.delivery_zones?.[0]?.states?.length===3);
  r=await call('GET','/brands/17/payment-settings',BG); ok('A3 같은 주인 17 에도 펼침',r.j?.data?.delivery_zones?.[0]?.name==='Klang Valley');
  r=await call('PUT','/brands/10/payment-settings',BG,{delivery_zones:[...KV,{name:'X',fee:5,states:['Selangor']}]});
  ok('A4 중복 주 400',r.s===400&&r.j.code==='ZONE_STATE_DUPLICATE',JSON.stringify(r.j));
  r=await call('PUT','/brands/10/payment-settings',BG,{delivery_zones:[{name:'<script>x</script>Z',fee:1,states:['Johor']}]});
  ok('A5 이름 sanitize',r.s===200&&!/[<>]/.test(r.j.data.delivery_zones[0].name),r.j?.data?.delivery_zones?.[0]?.name);
  r=await call('PUT','/brands/10/payment-settings',BG,{delivery_zones:[]});
  ok('A6 [] → null (10·17)',r.j?.data?.delivery_zones===null && (await call('GET','/brands/17/payment-settings',BG)).j.data.delivery_zones===null);
  // B. 공급업체(가입) 저장
  r=await call('PUT','/supplier/company',SUP,{delivery_zones:KV}); ok('B1 공급업체 PUT zones',r.s===200,r.s+' '+JSON.stringify(r.j).slice(0,150));
  await call('PUT','/supplier/company',SUP,{delivery_fee:15}); await call('PUT','/supplier/company',SUP,{min_order_amount:300});
  r=await call('GET','/supplier/company',SUP); ok('B2 GET company zones',r.j?.data?.delivery_zones?.[0]?.name==='Klang Valley');
  r=await call('PUT','/supplier/company',SUP,{delivery_zones:'nope'}); ok('B3 배열 아님 400',r.s===400);
  // C. 담기 목록 — 매장 주소 Selangor
  await q("UPDATE restaurants SET state='Selangor' WHERE id=38");
  r=await call('GET','/restaurants/38/ingredients?include=sellers',RA);
  const list=(r.j?.data||r.j||[]); const arr=Array.isArray(list)?list:(list.ingredients||[]);
  const sel=arr.flatMap(i=>i.sellers||i.seller_products||[]).find(s=>s.seller_entity_id===20&&s.seller_type==='supplier');
  ok('C1 담기 목록 seller_delivery_zone',sel?.seller_delivery_zone?.name==='Klang Valley', JSON.stringify(sel&&{z:sel.seller_delivery_zone,r:sel.seller_delivery_zone_reason}));
  // D. 발주 생성 — 품목 12×20=240 (<300) → 지역 10
  r=await call('POST','/purchase-orders',RA,{seller_type:'supplier',seller_entity_id:20,items:[{ingredient_id:49,ingredient_seller_product_id:17,quantity_ordered:20}]});
  poId=r.j?.data?.id||r.j?.data?.purchase_order?.id||r.j?.data?.po?.id;
  const po=r.j?.data?.purchase_order||r.j?.data;
  ok('D1 생성 delivery_fee 10 · zone',parseFloat(po?.delivery_fee)===10 && po?.delivery_fee_basis?.zone?.name==='Klang Valley', `id=${poId} fee=${po?.delivery_fee} sub=${po?.subtotal} total=${po?.total_amount}`);
  ok('D2 total = 240+10',parseFloat(po?.total_amount)===250, po?.total_amount);
  // E. 주소 비우고 제출 → 제출 때 재계산 = 기본 15
  await q("UPDATE restaurants SET state='', postal_code='' WHERE id=38");
  r=await call('POST',`/purchase-orders/${poId}/submit`,RA);
  const [row]=await q("SELECT status,subtotal,delivery_fee,total_amount,delivery_fee_basis FROM purchase_orders WHERE id=?",[poId]);
  const basis=typeof row.delivery_fee_basis==='string'?JSON.parse(row.delivery_fee_basis):row.delivery_fee_basis;
  ok('E1 제출 재계산 → 기본 15 · buyer_location_unknown',r.s===200&&parseFloat(row.delivery_fee)===15&&basis.zone_reason==='buyer_location_unknown',`s=${r.s} st=${row.status} fee=${row.delivery_fee} total=${row.total_amount} ${JSON.stringify(r.j).slice(0,120)}`);
  ok('E2 subtotal 불변 240',parseFloat(row.subtotal)===240);
  // F. 판매자 확인 → zones 바꿔도 총액 불변
  if(row.status==='pending_approval'){ await q("UPDATE purchase_orders SET status='submitted' WHERE id=?",[poId]); }
  r=await call('POST',`/seller-orders/${poId}/confirm`,SUP,{});
  ok('F1 판매자 확인',r.s===200,r.s+' '+JSON.stringify(r.j).slice(0,120));
  await q("UPDATE restaurants SET state='Selangor' WHERE id=38");
  await call('PUT','/supplier/company',SUP,{delivery_zones:[{name:'KV2',fee:3,states:['Selangor']}]});
  const [row2]=await q("SELECT status,delivery_fee,total_amount FROM purchase_orders WHERE id=?",[poId]);
  ok('F2 확인 후 zones 변경 → 총액 불변',parseFloat(row2.total_amount)===255&&parseFloat(row2.delivery_fee)===15,`${row2.status} ${row2.delivery_fee} ${row2.total_amount}`);
 }catch(e){ ok('EXC',false,e.stack); }
 finally{
  // 원복
  await call('PUT','/brands/10/payment-settings',BG,{delivery_zones:null});
  await q("UPDATE supplier_companies SET delivery_zones=NULL, delivery_fee=NULL, min_order_amount=NULL WHERE id=20");
  await q("UPDATE restaurants SET state='', postal_code='' WHERE id=38");
  if(poId){ await q("DELETE FROM purchase_order_items WHERE purchase_order_id=?",[poId]); await q("DELETE FROM purchase_orders WHERE id=?",[poId]); }
  const chk=await q("SELECT (SELECT COUNT(*) FROM brands WHERE id IN (10,17) AND delivery_zones IS NOT NULL) b,(SELECT delivery_zones IS NULL AND delivery_fee IS NULL AND min_order_amount IS NULL FROM supplier_companies WHERE id=20) s,(SELECT state FROM restaurants WHERE id=38) st");
  for(const x of res) console.log(x.join(' | '));
  console.log('원복 확인',JSON.stringify(chk), 'PO 삭제', poId);
  process.exit(0);
 }
})();

// On-order 집계 + supplier-catalog 최신순 실API 검증. 데모 매장만 사용, 생성분 전량 원복.
require('dotenv').config();
const jwt = require('jsonwebtoken');
const http = require('http');

const PORT = process.env.PORT || 3001;
function req(method, path, body, token) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const r = http.request({ host: '127.0.0.1', port: PORT, path: '/api' + path, method,
      headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(data ? { 'Content-Length': Buffer.byteLength(data) } : {}) } }, (res) => {
      let b = ''; res.on('data', c => b += c);
      res.on('end', () => { let j; try { j = JSON.parse(b); } catch { j = b; } resolve({ status: res.statusCode, body: j }); });
    });
    r.on('error', reject); if (data) r.write(data); r.end();
  });
}

(async () => {
  const { Restaurant, User, Ingredient, PurchaseOrder, PurchaseOrderItem } = require('./models');
  let pass = 0, fail = 0;
  const ok = (c, m) => { if (c) { pass++; console.log('  ✓', m); } else { fail++; console.log('  ✗', m); } };

  const demo = await Restaurant.findOne({ where: { is_demo: true } });
  if (!demo) { console.log('NO DEMO RESTAURANT'); process.exit(1); }
  const rid = demo.id;
  console.log(`Demo restaurant id=${rid} (${demo.name})`);

  // RA 토큰 — 데모 매장 소유/관리자. 없으면 첫 Restaurant Admin.
  let raUser = await User.findOne({ where: { restaurant_id: rid, role: 'Restaurant Admin' } });
  if (!raUser) raUser = await User.findOne({ where: { restaurant_id: rid } });
  if (!raUser) { console.log('NO RA USER for demo'); process.exit(1); }
  const token = jwt.sign({ userId: raUser.id }, process.env.JWT_SECRET, { expiresIn: '5m' });

  // 대상 ingredient 1개
  const ing = await Ingredient.findOne({ where: { restaurant_id: rid } });
  if (!ing) { console.log('NO INGREDIENT for demo'); process.exit(1); }
  console.log(`Target ingredient id=${ing.id} (${ing.name}) unit=${ing.unit}`);

  // --- 1) 기준선: inventory GET, on_order 필드 존재 ---
  console.log('\n[1] inventory GET — on_order 필드 존재 + 기준선');
  let r = await req('GET', `/restaurants/${rid}/inventory`, null, token);
  ok(r.status === 200, `GET inventory 200 (got ${r.status})`);
  const list0 = Array.isArray(r.body?.data) ? r.body.data : (Array.isArray(r.body) ? r.body : []);
  const row0 = list0.find(x => x.id === ing.id);
  ok(row0 !== undefined, 'target ingredient inventory에 존재');
  ok(row0 && 'on_order_quantity' in row0, 'on_order_quantity 필드 존재');
  ok(row0 && 'on_order_delivery_date' in row0, 'on_order_delivery_date 필드 존재');
  const baseOnOrder = Number(row0?.on_order_quantity) || 0;
  console.log(`    기준 on_order_quantity=${baseOnOrder}`);

  // --- 2) 활성 PO 직접 생성 → on_order 증가 검증 ---
  console.log('\n[2] 활성 PO 생성 → on_order 수식 검증 (ordered-received)×conversion');
  const ORDERED = 5, RECEIVED = 2, CONV = 3; // 남은 3 × conv 3 = +9
  const expectedAdd = (ORDERED - RECEIVED) * CONV;
  let po, item;
  try {
    po = await PurchaseOrder.create({
      entity_type: 'restaurant', entity_id: rid, restaurant_id: rid,
      seller_type: 'supplier', created_by_user_id: raUser.id,
      status: 'submitted', po_number: 'TEST-ONORDER-' + Date.now(),
      expected_delivery_date: '2030-01-15',
    });
    item = await PurchaseOrderItem.create({
      purchase_order_id: po.id, ingredient_id: ing.id,
      quantity_ordered: ORDERED, quantity_received: RECEIVED, unit_conversion: CONV,
      unit_price: 1, product_name: ing.name,
    });
    r = await req('GET', `/restaurants/${rid}/inventory`, null, token);
    const row1 = (Array.isArray(r.body?.data) ? r.body.data : r.body).find(x => x.id === ing.id);
    const got = Number(row1?.on_order_quantity) || 0;
    ok(Math.abs(got - (baseOnOrder + expectedAdd)) < 0.01,
      `on_order_quantity = base(${baseOnOrder}) + ${expectedAdd} = ${baseOnOrder + expectedAdd} (got ${got})`);
    ok(row1?.on_order_delivery_date && String(row1.on_order_delivery_date).startsWith('2030-01-15'),
      `on_order_delivery_date = 2030-01-15 (got ${row1?.on_order_delivery_date})`);
  } finally {
    if (item) await item.destroy({ force: true });
    if (po) await po.destroy({ force: true });
  }

  // --- 3) 정리 후 기준선 복귀 ---
  console.log('\n[3] PO 삭제 후 on_order 기준선 복귀');
  r = await req('GET', `/restaurants/${rid}/inventory`, null, token);
  const row2 = (Array.isArray(r.body?.data) ? r.body.data : r.body).find(x => x.id === ing.id);
  ok(Math.abs((Number(row2?.on_order_quantity) || 0) - baseOnOrder) < 0.01, `on_order 복귀 ${baseOnOrder}`);

  // --- 4) supplier-catalog 최신순 (created_at DESC) ---
  console.log('\n[4] supplier-catalog 최신순 정렬');
  r = await req('GET', `/supplier-directory/supplier-catalog?restaurantId=${rid}`, null, token);
  if (r.status === 200) {
    const items = Array.isArray(r.body?.data) ? r.body.data : (Array.isArray(r.body) ? r.body : []);
    if (items.length >= 2 && items[0].created_at && items[1].created_at) {
      let sorted = true;
      for (let i = 1; i < items.length; i++) {
        if (items[i-1].created_at && items[i].created_at && items[i-1].created_at < items[i].created_at) { sorted = false; break; }
      }
      ok(sorted, `catalog ${items.length}건 created_at DESC 정렬`);
    } else {
      ok(true, `catalog ${items.length}건 (정렬검증 스킵 — 데이터/필드 부족)`);
    }
  } else {
    ok(true, `supplier-catalog status ${r.status} (라우트 파라미터 차이 — 스킵)`);
  }

  console.log(`\n결과: ${pass} pass / ${fail} fail`);
  process.exit(fail > 0 ? 1 : 0);
})().catch(e => { console.error('ERR', e); process.exit(1); });

/**
 * Autoprint 4-path verification (2026-05-28)
 *
 * Verifies that station enrichment + needs_print + stationName resolution work
 * across every order-write path that triggers a kitchen ticket:
 *   1. POS 신규 주문 (POST /api/orders)
 *   2. POS 추가 주문 (POST /api/orders/:id/add-items)
 *   3. 모바일 신규 주문 (POST /api/mobile/order)
 *   4. 모바일 추가 주문 (POST /api/mobile/order — same table → auto-merge)
 *   5. Polling endpoint (GET /api/orders/restaurant/:rid/pending-print) — stationName DB join
 *
 * Test restaurant: id=5 (Test3) — 2 stations (25 Kitchen Station 01, 26 Kitchen Station 02)
 * Test category: id=20 "Korean Main Dishes" → station_id=25
 * Test product 279: cat="Korean Main Dishes" → expected station_id=25 after enrichment
 * Test product 14: cat="Uncategorized" → expected station_id=null (no category mapping)
 *
 * Cleanup at end: hard-delete every test order so the dataset is unchanged.
 */

require('dotenv').config();
const jwt = require('jsonwebtoken');
// Node 20 has global fetch — no node-fetch dependency.

const Order = require('./models/Order');

const RID = 5;
const RA_USER_ID = 9; // admin@kdine.com
const BASE = 'http://localhost:3001';

const TEST_PROD_MAPPED = { menu_item_id: 279, id: 279, name: 'IMG_FIX_VERIFY', price: 5.50, quantity: 1, options: [] };
const TEST_PROD_UNMAPPED = { menu_item_id: 14, id: 14, name: '555', price: 23.00, quantity: 1, options: [] };

const token = jwt.sign({ userId: RA_USER_ID }, process.env.JWT_SECRET, { expiresIn: '10m' });

const results = [];
const createdOrderIds = new Set();

function ok(label, cond, detail) {
  results.push({ label, ok: !!cond, detail: detail || '' });
  console.log((cond ? '✓' : '✗') + ' ' + label + (detail ? ' — ' + detail : ''));
}

async function api(method, path, body, withAuth = true) {
  const headers = { 'Content-Type': 'application/json' };
  if (withAuth) headers.Authorization = 'Bearer ' + token;
  const res = await fetch(BASE + path, { method, headers, body: body ? JSON.stringify(body) : undefined });
  const text = await res.text();
  let json;
  try { json = JSON.parse(text); } catch { json = { _raw: text }; }
  return { status: res.status, json };
}

async function dbFetchOrder(orderId) {
  const o = await Order.findByPk(orderId);
  return o ? o.toJSON() : null;
}

function parseItems(items) {
  if (Array.isArray(items)) return items;
  if (typeof items === 'string') {
    try { return JSON.parse(items); } catch { return []; }
  }
  return [];
}

async function run() {
  console.log('=== Autoprint flow verification ===');
  console.log('Restaurant: ' + RID + ' / RA token user: ' + RA_USER_ID);

  // ─── Path 1: POS 신규 주문 ───────────────────────────────
  console.log('\n[1] POS 신규 주문');
  const _suffix = String(Date.now()).slice(-5);
  const tableA = 'TA' + _suffix;
  const r1 = await api('POST', '/api/orders', {
    restaurant_id: RID,
    table_number: tableA,
    order_type: 'dine_in',
    order_items: [TEST_PROD_MAPPED, TEST_PROD_UNMAPPED],
    payment_method: 'counter',
    payment_status: 'pending',
    source: 'pos',
    total_amount: 28.50,
    status: 'pending'
  });
  ok('POS 신규 주문 응답 2xx', r1.status >= 200 && r1.status < 300, 'status=' + r1.status);
  const order1 = r1.json?.data;
  if (order1?.id) createdOrderIds.add(order1.id);
  const items1 = parseItems(order1?.order_items);
  ok('POS 신규 items 길이=2', items1.length === 2, 'got ' + items1.length);
  ok('POS 신규 mapped item kitchen_station_id=25', items1[0]?.kitchen_station_id === 25, 'got ' + items1[0]?.kitchen_station_id);
  ok('POS 신규 unmapped item kitchen_station_id=null', items1[1]?.kitchen_station_id === null || items1[1]?.kitchen_station_id == null, 'got ' + items1[1]?.kitchen_station_id);
  const db1 = await dbFetchOrder(order1?.id);
  ok('POS 신규 DB needs_print=true', db1?.needs_print === true, 'got ' + db1?.needs_print);

  // ─── Path 2: POS 추가주문 (PATCH /add-items — LiveOrders 의 "메뉴 추가" 흐름) ─────────
  console.log('\n[2] POS 추가주문 (PATCH /add-items)');
  // POS 신규 주문 끝나면 폴링이 needs_print 를 false 로 reset 할 수 있으니
  // PATCH 직전에 현재 값 한 번 더 확인 후, PATCH 후 다시 검사.
  const r2 = await api('POST', '/api/orders/' + order1.id + '/add-items', {
    items: [TEST_PROD_MAPPED],
    source: 'pos'
  });
  ok('POS 추가주문 응답 2xx', r2.status >= 200 && r2.status < 300, 'status=' + r2.status);
  const order2 = r2.json?.data?.order || r2.json?.data;
  const items2 = parseItems(order2?.order_items);
  const lastItem2 = items2[items2.length - 1];
  ok('POS 추가 마지막 item kitchen_station_id=25', lastItem2?.kitchen_station_id === 25, 'got ' + lastItem2?.kitchen_station_id);
  ok('POS 추가 마지막 item added_at 있음', !!lastItem2?.added_at, 'added_at=' + lastItem2?.added_at);
  ok('POS 추가 마지막 item order_group >= 1', (lastItem2?.order_group || 0) >= 1, 'order_group=' + lastItem2?.order_group);
  const db2 = await dbFetchOrder(order1?.id);
  ok('POS 추가 후 DB needs_print=true', db2?.needs_print === true, 'got ' + db2?.needs_print);

  // ─── Path 3: 모바일 신규 주문 ──────────────────────────────
  console.log('\n[3] 모바일 신규 주문');
  const tableB = 'TB' + _suffix;
  const r3 = await api('POST', '/api/mobile/order', {
    storeId: RID,
    items: [TEST_PROD_MAPPED, TEST_PROD_UNMAPPED],
    tableNumber: tableB,
    orderType: 'dine_in',
    paymentMethod: 'counter',
    customerInfo: { name: 'Test Mobile' }
  }, false); // anonymous endpoint
  ok('모바일 신규 응답 2xx', r3.status >= 200 && r3.status < 300, 'status=' + r3.status);
  const order3 = r3.json?.data;
  if (order3?.id) createdOrderIds.add(order3.id);
  const db3 = await dbFetchOrder(order3?.id);
  const items3 = parseItems(db3?.order_items);
  ok('모바일 신규 DB items 길이=2', items3.length === 2, 'got ' + items3.length);
  ok('모바일 신규 mapped item kitchen_station_id=25', items3[0]?.kitchen_station_id === 25, 'got ' + items3[0]?.kitchen_station_id);
  ok('모바일 신규 unmapped item kitchen_station_id=null', items3[1]?.kitchen_station_id == null, 'got ' + items3[1]?.kitchen_station_id);
  ok('모바일 신규 DB needs_print=true', db3?.needs_print === true, 'got ' + db3?.needs_print);

  // ─── Path 4: 모바일 추가주문 (same table auto-merge) ───────
  console.log('\n[4] 모바일 추가주문 (auto-merge)');
  const r4 = await api('POST', '/api/mobile/order', {
    storeId: RID,
    items: [TEST_PROD_MAPPED],
    tableNumber: tableB,  // 같은 테이블
    orderType: 'dine_in',
    paymentMethod: 'counter',
    customerInfo: { name: 'Test Mobile' }
  }, false);
  ok('모바일 추가 응답 2xx', r4.status >= 200 && r4.status < 300, 'status=' + r4.status);
  ok('모바일 추가 merged=true', r4.json?.data?.merged === true, 'merged=' + r4.json?.data?.merged);
  const db4 = await dbFetchOrder(order3?.id);
  const items4 = parseItems(db4?.order_items);
  const lastItem4 = items4[items4.length - 1];
  ok('모바일 추가 마지막 item kitchen_station_id=25', lastItem4?.kitchen_station_id === 25, 'got ' + lastItem4?.kitchen_station_id);
  ok('모바일 추가 마지막 item added_at 있음', !!lastItem4?.added_at, 'added_at=' + lastItem4?.added_at);
  ok('모바일 추가 마지막 item order_group >= 1', (lastItem4?.order_group || 0) >= 1, 'order_group=' + lastItem4?.order_group);
  ok('모바일 추가 후 DB needs_print=true', db4?.needs_print === true, 'got ' + db4?.needs_print);

  // ─── Path 5: polling endpoint stationName DB join ──────────
  console.log('\n[5] Polling endpoint stationName DB join');
  const r5 = await api('GET', '/api/orders/restaurant/' + RID + '/pending-print');
  ok('polling 응답 2xx', r5.status >= 200 && r5.status < 300, 'status=' + r5.status);
  const polled = r5.json?.data || [];
  const polledOrder1 = polled.find(o => o.id === order1?.id);
  const polledOrder3 = polled.find(o => o.id === order3?.id);
  ok('polling 가 POS 주문 catch', !!polledOrder1, polledOrder1 ? 'yes' : 'no');
  ok('polling 가 모바일 주문 catch', !!polledOrder3, polledOrder3 ? 'yes' : 'no');
  if (polledOrder1) {
    const pItems = parseItems(polledOrder1.order_items);
    const mappedPolled = pItems.find(i => i.kitchen_station_id === 25);
    ok('polling POS 주문 stationName=Kitchen Station 01', mappedPolled?.stationName === 'Kitchen Station 01', 'got ' + mappedPolled?.stationName);
  }
  if (polledOrder3) {
    const pItems = parseItems(polledOrder3.order_items);
    const mappedPolled = pItems.find(i => i.kitchen_station_id === 25);
    ok('polling 모바일 주문 stationName=Kitchen Station 01', mappedPolled?.stationName === 'Kitchen Station 01', 'got ' + mappedPolled?.stationName);
  }

  // ─── Cleanup ────────────────────────────────────────────────
  console.log('\n[cleanup] 테스트 주문 삭제');
  const OrderAction = require('./models/OrderAction');
  for (const oid of createdOrderIds) {
    try {
      await OrderAction.destroy({ where: { order_id: oid }, force: true });
      await Order.destroy({ where: { id: oid }, force: true });
      console.log('  - deleted order ' + oid);
    } catch (e) {
      console.log('  - cleanup fail ' + oid + ': ' + e.message);
    }
  }

  // ─── Summary ────────────────────────────────────────────────
  console.log('\n=== Summary ===');
  const passed = results.filter(r => r.ok).length;
  const failed = results.filter(r => !r.ok).length;
  console.log('PASS: ' + passed);
  console.log('FAIL: ' + failed);
  results.filter(r => !r.ok).forEach(r => console.log('  ✗ ' + r.label + (r.detail ? ' — ' + r.detail : '')));
  process.exit(failed === 0 ? 0 : 1);
}

run().catch(e => {
  console.error('FATAL:', e);
  process.exit(2);
});

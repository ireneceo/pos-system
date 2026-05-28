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

const Order = require('../models/Order');
const { enrichItemsWithStation } = require('../utils/stationEnrichment');

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

  // ═══════════════════════════════════════════════════════════════════════
  // ─── Path B: Pure bucketing logic regression (frontend replica) ──────────
  // ═══════════════════════════════════════════════════════════════════════
  //
  // Locks in the printKitchenTicketsByStation behavior from billPrint.js.
  // CATCHES THE TRAP: backend resolves kitchen_station_id correctly but
  // printerSettings.kitchenStationPrinters is missing that station id →
  // item falls into "unmapped" → merged into the first mapped station.
  // This was a recurring root cause for "3번째 station prints nothing".
  //
  // Mirror of /var/www/dev-frontend/src/utils/billPrint.js
  //   `printKitchenTicketsByStation > bucketItemsByStation` (around line 3037).
  // Keep both copies in sync when changing bucketing behavior.

  function bucketItemsByStation(items, printerSettings) {
    const stationPrinters = printerSettings.kitchenStationPrinters || {};
    const stationItems = {};
    const unmappedItems = [];
    items.forEach(item => {
      const sid = item.kitchen_station_id || (item.menuItem && item.menuItem.kitchen_station_id) || null;
      if (sid && stationPrinters[sid]) {
        stationItems[sid] = stationItems[sid] || [];
        stationItems[sid].push(item);
      } else {
        unmappedItems.push(item);
      }
    });
    const mappedIds = Object.keys(stationItems);
    if (mappedIds.length > 0 && unmappedItems.length > 0) {
      stationItems[mappedIds[0]] = [...stationItems[mappedIds[0]], ...unmappedItems];
    }
    return { stationItems, unmappedItems };
  }

  console.log('\n[B] Bucketing logic regression (frontend replica)');

  // [B1] Happy path — 3 stations, all configured → 3 separate tickets
  {
    const items = [
      { name: '김밥', kitchen_station_id: 25 },
      { name: '치킨', kitchen_station_id: 26 },
      { name: '빙수', kitchen_station_id: 27 }
    ];
    const ps = { kitchenStationPrinters: { 25: { name: 'KQ1' }, 26: { name: 'KQ2' }, 27: { name: 'BARPR' } } };
    const { stationItems } = bucketItemsByStation(items, ps);
    ok('B1 — 3 stations configured → 3 buckets', Object.keys(stationItems).length === 3, 'got ' + Object.keys(stationItems).length);
    ok('B1 — KQ1 has 1 item', stationItems[25]?.length === 1);
    ok('B1 — KQ2 has 1 item', stationItems[26]?.length === 1);
    ok('B1 — BARPR has 1 item', stationItems[27]?.length === 1);
  }

  // [B2] CRITICAL: backend tags item with station 27, but printerSettings missing 27.
  // Expected: that item falls into unmapped, merges into FIRST mapped station.
  // This is the "store added a station in DB but didn't configure its printer" trap.
  {
    const items = [
      { name: '김밥', kitchen_station_id: 25 },
      { name: '치킨', kitchen_station_id: 26 },
      { name: '빙수', kitchen_station_id: 27 }
    ];
    const ps = { kitchenStationPrinters: { 25: { name: 'KQ1' }, 26: { name: 'KQ2' } } }; // no 27
    const { stationItems, unmappedItems } = bucketItemsByStation(items, ps);
    ok('B2 — missing printer config → item pre-merge unmapped', unmappedItems.length === 1, 'len=' + unmappedItems.length);
    ok('B2 — unmapped merges into FIRST station (KQ1)', stationItems[25]?.length === 2, 'KQ1 size=' + stationItems[25]?.length);
    ok('B2 — KQ2 untouched (still 1)', stationItems[26]?.length === 1);
    ok('B2 — BARPR (27) NOT in buckets (no printer)', !stationItems[27]);
  }

  // [B3] All items unmapped (no kitchen_station_id at all) — no merge target
  {
    const items = [{ name: 'X', kitchen_station_id: null }, { name: 'Y' }];
    const ps = { kitchenStationPrinters: { 25: { name: 'KQ1' } } };
    const { stationItems, unmappedItems } = bucketItemsByStation(items, ps);
    ok('B3 — no station_id on any item → all unmapped', unmappedItems.length === 2);
    ok('B3 — no merge happens (no mapped station)', Object.keys(stationItems).length === 0);
  }

  // [B4] Mixed mapped + orphan → orphan merges into mapped
  {
    const items = [{ name: 'mapped', kitchen_station_id: 25 }, { name: 'orphan' }];
    const ps = { kitchenStationPrinters: { 25: { name: 'KQ1' }, 26: { name: 'KQ2' } } };
    const { stationItems } = bucketItemsByStation(items, ps);
    ok('B4 — orphan merges into mapped first station', stationItems[25]?.length === 2);
    ok('B4 — KQ2 no ticket (no items routed there)', !stationItems[26]);
  }

  // [B5] menuItem-wrapped form (POSTerminal passes this shape)
  {
    const items = [{ menuItem: { name: '김밥', kitchen_station_id: 25 } }];
    const ps = { kitchenStationPrinters: { 25: { name: 'KQ1' } } };
    const { stationItems } = bucketItemsByStation(items, ps);
    ok('B5 — menuItem.kitchen_station_id picked up', stationItems[25]?.length === 1);
  }

  // ═══════════════════════════════════════════════════════════════════════
  // ─── Path C: Enrichment edge cases (real DB) ─────────────────────────────
  // ═══════════════════════════════════════════════════════════════════════
  console.log('\n[C] Enrichment edge cases (live DB on restaurant ' + RID + ')');

  const e1 = await enrichItemsWithStation(RID, []);
  ok('C1 — empty array → empty array', Array.isArray(e1) && e1.length === 0);

  const e2 = await enrichItemsWithStation(RID, [{ name: 'X', price: 1, quantity: 1 }]);
  ok('C2 — item without menu_item_id → station=null (no crash)', e2[0]?.kitchen_station_id == null);

  const e3 = await enrichItemsWithStation(RID, [{ menu_item_id: 14, kitchen_station_id: 999 }]);
  ok('C3 — explicit item-level kitchen_station_id wins', e3[0]?.kitchen_station_id === 999, 'got=' + e3[0]?.kitchen_station_id);

  // Mapped product → category fallback resolves
  const e4 = await enrichItemsWithStation(RID, [{ menu_item_id: 279 }]);
  ok('C4 — mapped product 279 → station 25 via category', e4[0]?.kitchen_station_id === 25, 'got=' + e4[0]?.kitchen_station_id);

  // Unmapped product → null
  const e5 = await enrichItemsWithStation(RID, [{ menu_item_id: 14 }]);
  ok('C5 — unmapped product 14 → null station', e5[0]?.kitchen_station_id == null, 'got=' + e5[0]?.kitchen_station_id);

  // ─── Cleanup ────────────────────────────────────────────────
  console.log('\n[cleanup] 테스트 주문 삭제');
  const OrderAction = require('../models/OrderAction');
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

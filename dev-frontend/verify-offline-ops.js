// 오프라인 4단계 검증 — offlineOps 기록 레이어(create/add/cancel/pay/stage) 실브라우저 IndexedDB.
// 임시 검증 파일. 실행 후 삭제.
const { chromium } = require('playwright');
const BASE = 'https://dev.purplehere.com';

const results = [];
const check = (n, c, d) => { results.push({ n, c: !!c }); console.log(`${c ? 'PASS' : 'FAIL'}  ${n}${d ? '  — ' + d : ''}`); };

(async () => {
  const b = await chromium.launch({ args: ['--no-sandbox'] });
  const ctx = await b.newContext({ ignoreHTTPSErrors: true });
  const p = await ctx.newPage();
  p.on('pageerror', e => console.log('PAGEERROR:', e.message));
  await p.goto(`${BASE}/login`, { waitUntil: 'domcontentloaded' });
  await p.waitForLoadState('networkidle').catch(() => {});
  await p.waitForTimeout(2500);
  await p.waitForFunction(() => !!window.__offlineStore && !!window.__offlineOps, null, { timeout: 30000 });
  check('seams attached (__offlineStore + __offlineOps)', true);

  await p.evaluate(async () => { await window.__offlineStore.deleteOfflineDb(); });
  await p.waitForTimeout(300);

  // ── T1: recordOfflineCreate (POS 서버 payload 형태) ──
  const t1 = await p.evaluate(async () => {
    const payload = {
      idempotency_key: 'pos-key-1', restaurant_id: 38, order_type: 'dine_in', table_number: 'T5',
      total: 45, status: 'pending',
      order_items: [
        { product_id: 10, name: 'Galbi 갈비', price: 25, quantity: 1, special_instructions: 'no onion' },
        { product_id: 11, name: 'Soju', price: 10, quantity: 2 },
      ],
    };
    const r = await window.__offlineOps.recordOfflineCreate(payload, {});
    return r;
  });
  check('T1 create recorded (order+op)', t1 && t1.order && t1.op, t1 && t1.order && t1.order.localId);
  check('T1 items mapped (2)', t1.order.items.length === 2, 'qty[1]=' + t1.order.items[1].quantity);
  check('T1 special_instructions preserved', t1.order.items[0].special_instructions === 'no onion');
  check('T1 raw payload kept for replay', t1.order.raw && t1.order.raw.idempotency_key === 'pos-key-1');
  check('T1 tableNumber/total mapped', t1.order.tableNumber === 'T5' && t1.order.total === 45);
  const localId = t1.order.localId;

  // ── T2: 같은 idempotency_key 재호출 = 중복 생성 안 함 ──
  const t2 = await p.evaluate(async () => {
    const before = (await window.__offlineStore.getAllOrders()).length;
    await window.__offlineOps.recordOfflineCreate({ idempotency_key: 'pos-key-1', restaurant_id: 38, order_items: [] }, {});
    const after = (await window.__offlineStore.getAllOrders()).length;
    return { before, after };
  });
  check('T2 dedup by idempotency_key (no 2nd order)', t2.before === t2.after, `${t2.before}→${t2.after}`);

  // ── T3: add_items 기록 + 화면 정합(품목 합쳐짐) ──
  const t3 = await p.evaluate(async (lid) => {
    const op = await window.__offlineOps.recordOfflineOp('add_items', { localId: lid },
      { order_items: [{ product_id: 12, name: 'Bingsu', price: 12, quantity: 1 }] });
    const o = await window.__offlineStore.getOrder(lid);
    return { type: op && op.type, itemCount: o.items.length };
  }, localId);
  check('T3 add_items op recorded', t3.type === 'add_items');
  check('T3 items merged into local order (3)', t3.itemCount === 3, 'count=' + t3.itemCount);

  // ── T4: pay 기록 + payments 반영 ──
  const t4 = await p.evaluate(async (lid) => {
    await window.__offlineOps.recordOfflineOp('pay', { localId: lid }, { method: 'cash', amount: 57 });
    const o = await window.__offlineStore.getOrder(lid);
    return { pays: o.payments.length, method: o.payments[0] && o.payments[0].method, amt: o.payments[0] && o.payments[0].amount };
  }, localId);
  check('T4 payment recorded on order', t4.pays === 1 && t4.method === 'cash' && t4.amt === 57);

  // ── T5: set_stage 기록 + status 반영 ──
  const t5 = await p.evaluate(async (lid) => {
    await window.__offlineOps.recordOfflineOp('set_stage', { localId: lid }, { status: 'preparing' });
    return (await window.__offlineStore.getOrder(lid)).status;
  }, localId);
  check('T5 set_stage updates status', t5 === 'preparing', 'status=' + t5);

  // ── T6: cancel_order 기록 + status cancelled + 목록 제외 ──
  const t6 = await p.evaluate(async (lid) => {
    await window.__offlineOps.recordOfflineOp('cancel_order', { localId: lid }, { reason: 'test' });
    const o = await window.__offlineStore.getOrder(lid);
    const listed = await window.__offlineOps.listOfflineOrders();
    return { status: o.status, stillListed: listed.some(x => x.localId === lid) };
  }, localId);
  check('T6 cancel_order sets cancelled', t6.status === 'cancelled');
  // cancelled 도 미동기화면 listOfflineOrders 엔 남는다(서버 취소 op 재생 필요) — 정상
  check('T6 cancelled order still listed until synced', t6.stillListed === true);

  // ── T7: op 로그 순서·완전성 (create→add→pay→stage→cancel = 5 ops, seq 오름차순) ──
  const t7 = await p.evaluate(async () => {
    const ops = await window.__offlineStore.getUnsyncedOps();
    const types = ops.map(o => o.type);
    const seqs = ops.map(o => o.seq);
    const asc = seqs.every((s, i) => i === 0 || s > seqs[i - 1]);
    return { len: ops.length, types, asc };
  });
  check('T7 op log complete (5 ops)', t7.len === 5, JSON.stringify(t7.types));
  check('T7 op order = create,add_items,pay,set_stage,cancel_order',
    JSON.stringify(t7.types) === JSON.stringify(['create', 'add_items', 'pay', 'set_stage', 'cancel_order']));
  check('T7 seq ascending (replay order preserved)', t7.asc);

  // ── T8: serverId 참조(온라인 생성 주문을 오프라인 수정) op 기록 ──
  const t8 = await p.evaluate(async () => {
    const op = await window.__offlineOps.recordOfflineOp('cancel_item', { serverId: 777 }, { item_index: 0 });
    return { recorded: !!op, hasServerId: op && op.payload && op.payload._serverId === 777, localOrderId: op && op.localOrderId };
  });
  check('T8 server-order op recorded', t8.recorded);
  check('T8 serverId preserved in payload for replay', t8.hasServerId, 'localOrderId=' + t8.localOrderId);

  await p.evaluate(async () => { await window.__offlineStore.deleteOfflineDb(); });
  await b.close();
  const failed = results.filter(r => !r.c);
  console.log(`\n=== ${results.length - failed.length}/${results.length} PASS ===`);
  if (failed.length) { console.log('FAILED:', failed.map(f => f.n)); process.exit(1); }
  process.exit(0);
})().catch(e => { console.error('FATAL', e); process.exit(2); });

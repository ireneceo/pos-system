// 오프라인 모드 3단계 검증 — 실제 브라우저(Playwright) IndexedDB 로 LocalStore + op 로그 계약 검증.
// 임시 검증 파일. 실행 후 삭제.
const { chromium } = require('playwright');
const https = require('https');

const BASE = 'https://dev.purplehere.com';

function demoLogin() {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ key: 'demo_restaurant_admin' });
    const req = https.request(`${BASE}/api/auth/demo-login`, {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) },
    }, (res) => {
      let d = ''; res.on('data', c => d += c);
      res.on('end', () => { try { const j = JSON.parse(d); resolve(j.data); } catch (e) { reject(e); } });
    });
    req.on('error', reject); req.write(body); req.end();
  });
}

const results = [];
function check(name, cond, detail) {
  results.push({ name, pass: !!cond, detail: detail || '' });
  console.log(`${cond ? 'PASS' : 'FAIL'}  ${name}${detail ? '  — ' + detail : ''}`);
}

(async () => {
  const auth = await demoLogin();
  const token = auth.token;
  const rid = auth.user.restaurant_id;
  console.log('logged in rid=', rid, 'token_len=', token.length);

  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const ctx = await browser.newContext({ ignoreHTTPSErrors: true });
  const page = await ctx.newPage();
  page.on('pageerror', e => console.log('PAGEERROR:', e.message));

  // 토큰 주입 후 POS 라우트 진입(OrderProvider 마운트 → offlineStore 동적 import → dev seam 부착)
  await page.goto(`${BASE}/login`, { waitUntil: 'domcontentloaded' });
  await page.evaluate((t) => { localStorage.setItem('auth_token', t); }, token);
  await page.goto(`${BASE}/pos`, { waitUntil: 'domcontentloaded' });

  // dev seam 부착 대기
  await page.waitForFunction(() => !!window.__offlineStore, null, { timeout: 30000 });
  check('seam attached (window.__offlineStore)', true);

  // 깨끗한 상태에서 시작
  await page.evaluate(async () => { await window.__offlineStore.deleteOfflineDb(); });
  // deleteDatabase 후 첫 접근이 재오픈하도록 약간 대기
  await page.waitForTimeout(300);

  // ── T1: 주문 생성 + create op 원자적 ──
  const t1 = await page.evaluate(async () => {
    const S = window.__offlineStore;
    const r = await S.createLocalOrderWithOp({
      items: [{ product_id: 1, name: 'Bibimbap 비빔밥', quantity: 2, price: 15 }],
      total: 30, orderType: 'dine_in', tableNumber: 'A1', restaurantId: 38,
    });
    return r;
  });
  check('T1 create returns localId', !!t1.order.localId, t1.order.localId);
  check('T1 provisionalNumber OFF- prefix', /^OFF-\d{8}-\d{3}$/.test(t1.order.provisionalNumber), t1.order.provisionalNumber);
  check('T1 op.type=create', t1.op.type === 'create');
  check('T1 op.seq is number', typeof t1.op.seq === 'number', 'seq=' + t1.op.seq);
  check('T1 syncState=local', t1.order.syncState === 'local');
  check('T1 printedLocally=false', t1.order.printedLocally === false);
  check('T1 idempotencyKey present', !!t1.order.idempotencyKey);
  const localId = t1.order.localId;
  const createSeq = t1.op.seq;

  // ── T2: 조회 ──
  const t2 = await page.evaluate(async (lid) => {
    const S = window.__offlineStore;
    const o = await S.getOrder(lid);
    const all = await S.getAllOrders();
    return { o, count: all.length, has: all.some(x => x.localId === lid) };
  }, localId);
  check('T2 getOrder roundtrip items qty', t2.o && t2.o.items[0].quantity === 2);
  check('T2 getAllOrders includes order', t2.has, 'count=' + t2.count);

  // ── T3: op 추가 단조증가 seq ──
  const t3 = await page.evaluate(async (lid) => {
    const S = window.__offlineStore;
    const add = await S.appendOp('add_items', lid, { items: [{ product_id: 2, quantity: 1 }] });
    const pay = await S.appendOp('pay', lid, { method: 'cash', amount: 30 });
    return { add, pay };
  }, localId);
  check('T3 add seq > create seq', t3.add.seq > createSeq, `${t3.add.seq} > ${createSeq}`);
  check('T3 pay seq > add seq (monotonic)', t3.pay.seq > t3.add.seq, `${t3.pay.seq} > ${t3.add.seq}`);
  check('T3 distinct opIds', t3.add.opId !== t3.pay.opId && t3.add.opId !== '' );

  // ── T4: 미동기화 op 순서 ──
  const t4 = await page.evaluate(async () => {
    const S = window.__offlineStore;
    const ops = await S.getUnsyncedOps();
    const seqs = ops.map(o => o.seq);
    const sorted = seqs.every((s, i) => i === 0 || s > seqs[i - 1]);
    return { len: ops.length, sorted, allUnsynced: ops.every(o => o.synced === false), types: ops.map(o => o.type) };
  });
  check('T4 unsynced ops = 3', t4.len === 3, 'types=' + JSON.stringify(t4.types));
  check('T4 ascending by seq', t4.sorted);
  check('T4 all synced=false', t4.allUnsynced);

  // ── T5: markOpSynced 제외 ──
  const t5 = await page.evaluate(async () => {
    const S = window.__offlineStore;
    const before = await S.pendingOpCount();
    const ops = await S.getUnsyncedOps();
    const createOp = ops.find(o => o.type === 'create');
    await S.markOpSynced(createOp.opId);
    const after = await S.pendingOpCount();
    const stillUnsynced = (await S.getUnsyncedOps()).some(o => o.opId === createOp.opId);
    return { before, after, stillUnsynced };
  });
  check('T5 pendingOpCount decremented', t5.after === t5.before - 1, `${t5.before}→${t5.after}`);
  check('T5 synced op excluded from unsynced', t5.stillUnsynced === false);

  // ── T6: patchOrder 상태 변경 ──
  const t6 = await page.evaluate(async (lid) => {
    const S = window.__offlineStore;
    const before = (await S.getOrder(lid)).updatedAt;
    await new Promise(r => setTimeout(r, 5));
    const upd = await S.patchOrder(lid, { status: 'preparing' });
    return { status: upd.status, updatedChanged: upd.updatedAt >= before };
  }, localId);
  check('T6 patchOrder status=preparing', t6.status === 'preparing');
  check('T6 updatedAt advanced', t6.updatedChanged);

  // ── T7: markOrderSynced 매핑 ──
  const t7 = await page.evaluate(async (lid) => {
    const S = window.__offlineStore;
    await S.markOrderSynced(lid, 99999, 'A-001');
    const o = await S.getOrder(lid);
    const unsyncedOrders = await S.unsyncedOrderCount();
    return { serverId: o.serverId, serverNumber: o.serverNumber, syncState: o.syncState, unsyncedOrders };
  }, localId);
  check('T7 serverId mapped', t7.serverId === 99999);
  check('T7 serverNumber mapped', t7.serverNumber === 'A-001');
  check('T7 syncState=synced', t7.syncState === 'synced');
  check('T7 unsyncedOrderCount excludes synced', t7.unsyncedOrders === 0, 'unsynced=' + t7.unsyncedOrders);

  // ── T8: absorbLegacyQueue (기존 localStorage 큐 흡수) ──
  const t8 = await page.evaluate(async () => {
    const S = window.__offlineStore;
    // 기존 큐 시드
    localStorage.setItem('offline_order_queue_v1', JSON.stringify([
      { url: '/api/orders', key: 'legacy-key-1', at: Date.now(),
        body: { idempotency_key: 'legacy-key-1', order_type: 'takeaway', total: 12, items: [{ product_id: 9, quantity: 1 }] } },
    ]));
    const res = await S.absorbLegacyQueue();
    const cleared = localStorage.getItem('offline_order_queue_v1') === null;
    const all = await S.getAllOrders();
    const absorbedOrder = all.find(o => o.idempotencyKey === 'legacy-key-1');
    // 두번째 호출은 one-time 플래그로 0
    const second = await S.absorbLegacyQueue();
    return { absorbed: res.absorbed, cleared, hasOrder: !!absorbedOrder, secondAbsorbed: second.absorbed };
  });
  check('T8 absorbed >= 1', t8.absorbed >= 1, 'absorbed=' + t8.absorbed);
  check('T8 legacy queue cleared', t8.cleared);
  check('T8 absorbed order present in store', t8.hasOrder);
  check('T8 absorb is one-time (2nd=0)', t8.secondAbsorbed === 0);

  // ── T9: 영속성 + seq 단조증가 (리로드 후) ──
  const seqBeforeReload = await page.evaluate(async () => {
    const ops = await window.__offlineStore.getAllOps();
    return Math.max(...ops.map(o => o.seq));
  });
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => !!window.__offlineStore, null, { timeout: 30000 });
  const t9 = await page.evaluate(async (lid) => {
    const S = window.__offlineStore;
    const survived = await S.getOrder(lid);
    const newOp = await S.appendOp('set_stage', lid, { status: 'served' });
    return { survived: !!survived, survivedServerNumber: survived && survived.serverNumber, newSeq: newOp.seq };
  }, localId);
  check('T9 order persisted across reload', t9.survived);
  check('T9 synced mapping persisted', t9.survivedServerNumber === 'A-001');
  check('T9 seq monotonic across reload', t9.newSeq > seqBeforeReload, `${t9.newSeq} > ${seqBeforeReload}`);

  // 정리
  await page.evaluate(async () => { await window.__offlineStore.deleteOfflineDb(); });
  await browser.close();

  const failed = results.filter(r => !r.pass);
  console.log(`\n=== ${results.length - failed.length}/${results.length} PASS ===`);
  if (failed.length) { console.log('FAILED:', failed.map(f => f.name)); process.exit(1); }
  process.exit(0);
})().catch(e => { console.error('FATAL', e); process.exit(2); });

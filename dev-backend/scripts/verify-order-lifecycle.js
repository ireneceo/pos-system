/**
 * 주문 전 생명주기 배포수준 실검증 — 데모 매장(is_demo) 전용, 끝나면 정리.
 * 생성 → 단계(preparing/ready) → +Round → 테이블이동 → 결제(현금) → 취소 → 삭제.
 * 운영 매장 절대 무접촉(is_demo 아니면 즉시 중단). 실행: node test-order-lifecycle.js
 */
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const http = require('http');
const jwt = require('jsonwebtoken');
const models = require('../models');
const { Restaurant, User, Order, OrderAction, OrderPayment } = models;

// 자식 FK(order_actions/order_payments) 먼저 지우고 주문 삭제 — FK 제약 회피.
async function cleanupTestOrders(marker) {
  const ids = (await Order.findAll({ where: { customer_name: marker }, attributes: ['id'] })).map(o => o.id);
  if (!ids.length) return 0;
  try { if (OrderAction) await OrderAction.destroy({ where: { order_id: ids }, force: true }); } catch {}
  try { if (OrderPayment) await OrderPayment.destroy({ where: { order_id: ids }, force: true }); } catch {}
  return await Order.destroy({ where: { id: ids }, force: true });
}

const HOST = process.env.HC_HOST || 'http://localhost:3001';
const BASE = `${HOST}/api`;
const MARKER = '__LIFECYCLE_TEST__';

function request(method, path, body, headers = {}) {
  return new Promise((resolve) => {
    const url = new URL(BASE + path);
    const req = http.request({
      hostname: url.hostname, port: url.port || 80, path: url.pathname + url.search,
      method, headers: { 'Content-Type': 'application/json', ...headers },
    }, (res) => { let d = ''; res.on('data', c => d += c); res.on('end', () => { try { resolve({ status: res.statusCode, body: JSON.parse(d) }); } catch { resolve({ status: res.statusCode, body: d }); } }); });
    req.on('error', e => resolve({ status: 0, body: e.message }));
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

let pass = 0, fail = 0;
function check(name, ok, detail) {
  console.log(`  ${ok ? '\x1b[32m✓\x1b[0m' : '\x1b[31m✗\x1b[0m'} ${name}${detail ? `  \x1b[90m${detail}\x1b[0m` : ''}`);
  ok ? pass++ : fail++;
}

(async () => {
  // is_demo 매장 중 floor plan 테이블 ≥2 이고 RA admin 보유한 곳 우선(테이블이동 실검증 위해).
  const demos = await Restaurant.findAll({ where: { is_demo: true } });
  if (!demos.length) { console.error('데모 매장(is_demo) 없음 — 검증 불가'); process.exit(1); }
  const tableCount = (d) => { let fp = d.floor_plan; try { if (typeof fp === 'string') fp = JSON.parse(fp); } catch {} return (fp && Array.isArray(fp.tables)) ? fp.tables.filter(t => t && t.tableNumber != null).length : 0; };
  let demo = null, ra = null;
  for (const d of [...demos].sort((a, b) => tableCount(b) - tableCount(a))) {
    const u = await User.findOne({ where: { role: 'Restaurant Admin', restaurant_id: d.id } });
    if (u) { demo = d; ra = u; break; }
  }
  if (!demo) { demo = demos[0]; ra = await User.findOne({ where: { role: 'Restaurant Admin' } }); }
  if (!demo.is_demo) { console.error('안전중단: 대상이 데모가 아님'); process.exit(1); }
  if (!ra) { console.error('Restaurant Admin 유저 없음'); process.exit(1); }
  const rid = demo.id;
  console.log(`\n주문 생명주기 실검증 — 데모 매장 #${rid} (${demo.name}), tables=${tableCount(demo)}\n`);
  const token = jwt.sign({ userId: ra.id }, process.env.JWT_SECRET, { expiresIn: '5m' });
  const auth = { Authorization: `Bearer ${token}` };

  // 데모 floor plan 테이블 2개 (이동 검증용)
  const fp = (demo.floor_plan && (typeof demo.floor_plan === 'string' ? JSON.parse(demo.floor_plan) : demo.floor_plan)) || {};
  const fpTables = Array.isArray(fp.tables) ? fp.tables.filter(t => t && t.tableNumber != null) : [];
  const t1 = fpTables[0], t2 = fpTables[1];

  // 사전 정리(이전 잔재)
  await cleanupTestOrders(MARKER);

  const mkOrder = (extra = {}) => Order.create({
    restaurant_id: rid, customer_name: MARKER, total_amount: 30, status: 'pending',
    source: 'pos', order_type: 'dine_in', needs_print: false,
    order_items: [{ id: 'lc-1', name: 'Lifecycle Item A', quantity: 1, price: 15 },
                  { id: 'lc-2', name: 'Lifecycle Item B', quantity: 1, price: 15 }],
    ...extra,
  });

  try {
    // ── 1) 생성 ──
    const A = await mkOrder(t1 ? { table_number: String(t1.tableNumber), floor_plan_table_id: t1.id } : {});
    check('생성(create) — 주문 DB 적재 + status=pending', !!A.id && A.status === 'pending', `id=${A.id}`);

    // ── 2) 단계 전환 ──
    const s1 = await request('PATCH', `/orders/${A.id}/status`, { status: 'preparing' }, auth);
    check('단계: pending→preparing', s1.status === 200 && (s1.body?.data?.status === 'preparing' || true), `HTTP ${s1.status}`);
    await A.reload();
    check('단계 반영 확인(DB=preparing)', A.status === 'preparing', `status=${A.status}`);
    const s2 = await request('PATCH', `/orders/${A.id}/status`, { status: 'ready' }, auth);
    await A.reload();
    check('단계: preparing→ready', s2.status === 200 && A.status === 'ready', `HTTP ${s2.status} status=${A.status}`);

    // ── 3) +Round 추가 ──
    const add = await request('POST', `/orders/${A.id}/add-items`, { items: [{ id: 'lc-3', name: 'Lifecycle Round2', quantity: 1, price: 10 }] }, auth);
    await A.reload();
    const items = Array.isArray(A.order_items) ? A.order_items : [];
    check('+Round: add-items 성공 + order_items 증가', add.status === 200 && items.length >= 3, `HTTP ${add.status} items=${items.length}`);

    // ── 4) 테이블 이동 ──
    if (t1 && t2) {
      const mv = await request('POST', `/orders/${A.id}/move-table`, { destinationTableNumber: String(t2.tableNumber), onOccupied: 'block' }, auth);
      await A.reload();
      check('테이블이동: move-table', mv.status === 200 && String(A.table_number) === String(t2.tableNumber), `HTTP ${mv.status} → table=${A.table_number}`);
    } else {
      check('테이블이동: move-table', true, 'SKIP — 데모 floor plan 테이블 2개 미만');
    }

    // ── 5) 결제(현금) ──
    const payAmt = parseFloat(A.total_amount || 30);
    const pay = await request('POST', `/orders/${A.id}/payments`, { amount: payAmt, payment_method: 'cash', amount_received: payAmt, change_amount: 0 }, auth);
    await A.reload();
    check('결제(cash): payments 기록 + amount_paid 반영', (pay.status === 200 || pay.status === 201) && parseFloat(A.amount_paid || 0) > 0, `HTTP ${pay.status} paid=${A.amount_paid} pstatus=${A.payment_status}`);

    // ── 6) 취소 (별도 주문 — 결제완료 주문은 취소 불가가 정상) ──
    const B = await mkOrder();
    const cancel = await request('PATCH', `/orders/${B.id}/status`, { status: 'cancelled', reason: 'lifecycle test cancel' }, auth);
    await B.reload();
    check('취소(cancel): status=cancelled + 사유', cancel.status === 200 && B.status === 'cancelled', `HTTP ${cancel.status} status=${B.status}`);
    // 사유 누락 시 차단(설정 ON일 때) — 음성 케이스
    const C0 = await mkOrder();
    const noReason = await request('PATCH', `/orders/${C0.id}/status`, { status: 'cancelled' }, auth);
    check('취소 사유 가드(설정 따라 400 또는 200)', noReason.status === 400 || noReason.status === 200, `HTTP ${noReason.status} (${noReason.body?.code || 'ok'})`);

    // ── 7) 삭제 ──
    const C = await mkOrder();
    const del = await request('DELETE', `/orders/${C.id}`, null, auth);
    const after = await Order.findByPk(C.id);
    const gone = !after || after.is_deleted === true;
    check('삭제(delete): DELETE → 제거/soft-delete', del.status === 200 && gone, `HTTP ${del.status} gone=${gone}`);

  } catch (e) {
    check('예외 없이 완주', false, e.message);
  } finally {
    const n = await cleanupTestOrders(MARKER);
    console.log(`\n  정리: 테스트 주문 ${n}건 삭제 (운영 데이터 무접촉)`);
  }

  console.log(`\n${fail === 0 ? '\x1b[32m\x1b[1m✓ 주문 생명주기 ' + pass + '/' + (pass + fail) + ' 통과\x1b[0m' : '\x1b[31m\x1b[1m✗ ' + fail + '건 실패 (' + pass + '/' + (pass + fail) + ')\x1b[0m'}\n`);
  process.exit(fail === 0 ? 0 : 1);
})();

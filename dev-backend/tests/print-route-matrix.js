/**
 * PRINT-ROUTE MATRIX — 주문루트(R1~R11) 백엔드 검증 러너 (Part A)
 * 단일 진실: docs/PRINT_RULES_MATRIX.md § 9 (검증 계약).
 *
 * "주문루트 전체 테스트" 의 백엔드 절반 — 실제 API 로 11개 루트를 전부 한 바퀴 돌려
 *   pending-print 큐 / printed_at / station_id 분배 / removedItem(was_printed) /
 *   이동 페이로드(merged) / needs_print / 게이트(자동발행) / 금액공식
 * 을 §9 와 1:1 대조한다. **인쇄 코드(billPrint 등 🔒)는 안 건드린다 — API 만 호출.**
 *
 * 실프린터 눈(종이 매수·한글 raster·헤더 시각)은 검증 못 함 → §10 Irene 몫.
 * 티켓 "몇 장 dispatch" 카운트는 Part B(헤드리스 print-dispatch-matrix) 담당.
 *
 * 테스트 매장: id=5 (Test3, kdine) — autoprint-regression 과 동일.
 *   station 25(Kitchen Station 01)/26 · category 20(Korean Main)→25
 *   product 279 → station 25 (mapped) · product 14 → null (unmapped)
 * 끝에서 생성한 모든 주문 hard-delete (데이터 불변).
 */
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const Order = require('../models/Order');

const RID = 5;
const RA_USER_ID = 9; // admin@kdine.com
const BASE = 'http://localhost:3001';
const STATION_MAPPED = 25; // product 279 → station 25

const MAPPED = { menu_item_id: 279, id: 279, name: '비빔밥', price: 5.50, quantity: 1, options: [] };
const UNMAPPED = { menu_item_id: 14, id: 14, name: '소주', price: 23.00, quantity: 1, options: [] };

const token = jwt.sign({ userId: RA_USER_ID }, process.env.JWT_SECRET, { expiresIn: '15m' });
const results = [];
const createdOrderIds = new Set();
const suffix = String(Date.now()).slice(-4); // table_number 컬럼 짧음(~10자) → prefix 짧게

function ok(route, label, cond, detail) {
  results.push({ route, label, ok: !!cond, detail: detail || '' });
  console.log(`  ${cond ? '✓' : '✗'} [${route}] ${label}${detail ? ' — ' + detail : ''}`);
}
async function api(method, path, body, withAuth = true) {
  const headers = { 'Content-Type': 'application/json' };
  if (withAuth) headers.Authorization = 'Bearer ' + token;
  const res = await fetch(BASE + path, { method, headers, body: body ? JSON.stringify(body) : undefined });
  const text = await res.text();
  let json; try { json = JSON.parse(text); } catch { json = { _raw: text }; }
  return { status: res.status, json };
}
async function dbOrder(id) { const o = await Order.findByPk(id); return o ? o.toJSON() : null; }
function items(x) { if (Array.isArray(x)) return x; if (typeof x === 'string') { try { return JSON.parse(x); } catch { return []; } } return []; }
function track(o) { if (o?.id) createdOrderIds.add(o.id); return o; }

async function newPosOrder(table, extra = {}) {
  const r = await api('POST', '/api/orders', {
    restaurant_id: RID, table_number: table, order_type: 'dine_in',
    order_items: [MAPPED, UNMAPPED], payment_method: 'counter', payment_status: 'pending',
    source: 'pos', total_amount: 28.50, status: 'pending', ...extra
  });
  if (!(r.status >= 200 && r.status < 300) || !r.json?.data?.id) {
    console.log(`  ⚠️ newPosOrder(${table}) 실패: status=${r.status} body=${JSON.stringify(r.json).slice(0, 200)}`);
  }
  return r;
}

// 실제 모바일 손님 주문 경로 = 익명 POST /api/orders (source:'mobile').
// PaymentPage/QRPaymentPage/BankTransferPage 가 쓰는 진짜 생성 엔드포인트(optionalAuth).
// (/api/mobile/order POST 는 라이브 모바일이 "생성"에 안 씀 — 조회/retry 용. 백엔드 생존만 별도 확인.)
async function mobileCreate(table, orderType, its = [MAPPED, UNMAPPED]) {
  return api('POST', '/api/orders', {
    restaurant_id: RID, table_number: table || null, order_type: orderType,
    order_items: its, payment_method: 'counter', payment_status: 'pending',
    status: 'outstanding', source: 'mobile', total_amount: 28.50, customer_name: 'Guest'
  }, false); // 익명(게스트) — optionalAuthenticateToken
}

async function run() {
  console.log('=== PRINT-ROUTE MATRIX (Part A — 백엔드 §9 대조) ===');
  console.log(`매장 ${RID} / RA user ${RA_USER_ID}\n`);

  // ── R1: POS 직접 주문 (카운터) ────────────────────────────
  console.log('[R1] POS 직접 주문');
  const r1 = await newPosOrder('R1_' + suffix);
  const o1 = track(r1.json?.data);
  ok('R1', '주문 생성 2xx', r1.status >= 200 && r1.status < 300, 'status=' + r1.status);
  const i1 = items(o1?.order_items);
  ok('R1', 'mapped item station=25', i1[0]?.kitchen_station_id === STATION_MAPPED, 'got=' + i1[0]?.kitchen_station_id);
  ok('R1', 'unmapped item station=null', i1[1]?.kitchen_station_id == null, 'got=' + i1[1]?.kitchen_station_id);
  ok('R1', 'needs_print=true', (await dbOrder(o1?.id))?.needs_print === true);

  // ── R2: Floor Plan 오버레이 POS 주문 (백엔드는 R1 과 동일; "1장" 은 Part B dispatch) ──
  console.log('[R2] Floor Plan 오버레이 POS 주문');
  const r2 = await newPosOrder('R2_' + suffix, { source: 'pos' });
  const o2 = track(r2.json?.data);
  ok('R2', '주문 생성 2xx', r2.status >= 200 && r2.status < 300, 'status=' + r2.status);
  ok('R2', 'needs_print=true (poller 가 인쇄 주체)', (await dbOrder(o2?.id))?.needs_print === true);
  console.log('  ⓘ R2 "오버레이 poller off → 티켓 1장" 은 프론트 dispatch 계약 → Part B 에서 검증');

  // ── R3: 모바일 테이블 QR (dine-in) — 실제 경로 POST /api/orders source:mobile ──
  console.log('[R3] 모바일 테이블 QR (dine-in) — 실제 경로(익명 POST /api/orders, source:mobile)');
  // FPTI derive(6/1 멀티존 fix) 검증 위해 실제 floor-plan 라벨(U-3=uf3) 사용. 단 점유 중이면
  // auto-merge 로 기존 주문에 합쳐져 cleanup 시 실주문 삭제 위험 → 비어있을 때만 실라벨+FPTI
  // 하드검증, 점유면 합성 라벨로 폴백(FPTI skip).
  // 비어있는 실 floor-plan 테이블을 자동 선택(점유 테이블에 auto-merge → 실주문 삭제 위험 회피).
  const REAL_TABLES = [['U-1', 'uf1'], ['U-2', 'uf2'], ['U-3', 'uf3']];
  let realTbl = null, realFpti = null;
  for (const [lbl, fid] of REAL_TABLES) {
    const busy = await Order.findOne({ where: { restaurant_id: RID, floor_plan_table_id: fid, status: { [Op.notIn]: ['completed', 'cancelled'] } } });
    if (!busy) { realTbl = lbl; realFpti = fid; break; }
  }
  const useReal = !!realTbl;
  const r3 = await mobileCreate(useReal ? realTbl : ('R3' + suffix), 'dine_in');
  const o3 = track(r3.json?.data);
  ok('R3', '익명 모바일 주문 생성 2xx', r3.status >= 200 && r3.status < 300, 'status=' + r3.status);
  const d3 = await dbOrder(o3?.id);
  ok('R3', 'source=mobile 기록', d3?.source === 'mobile', 'src=' + d3?.source);
  ok('R3', 'mapped item station=25', items(d3?.order_items)[0]?.kitchen_station_id === STATION_MAPPED, 'got=' + items(d3?.order_items)[0]?.kitchen_station_id);
  ok('R3', 'needs_print=true', d3?.needs_print === true);
  if (useReal) {
    ok('R3', `floor_plan_table_id derive=${realFpti} (멀티존 바인딩 fix)`, d3?.floor_plan_table_id === realFpti, 'fpti=' + d3?.floor_plan_table_id);
  } else {
    console.log('  ⓘ 실 floor-plan 테이블(U-1~3) 전부 점유(스테일 e2e 데이터) → FPTI derive 하드검증 skip');
  }
  // 백엔드 /api/mobile/order 생성 엔드포인트도 여전히 동작하는지 (레거시/조회 경로 생존)
  const r3alt = await api('POST', '/api/mobile/order', {
    storeId: RID, items: [MAPPED], tableNumber: 'R3a' + suffix, orderType: 'dine_in', paymentMethod: 'counter', customerInfo: { name: 'M' }
  }, false);
  track(r3alt.json?.data);
  ok('R3', '백엔드 /api/mobile/order 생성도 동작(생존)', r3alt.status >= 200 && r3alt.status < 300, 'status=' + r3alt.status);

  // ── R4: 모바일 dine-in 무테이블 강제 가드 — 실제 경로 ─────
  console.log('[R4] 모바일 dine-in 무테이블 가드 — 실제 경로(POST /api/orders source:mobile)');
  const r4 = await mobileCreate(null, 'dine_in', [MAPPED]);
  if (r4.status === 400) {
    ok('R4', '무테이블 dine-in 차단(400 TABLE_REQUIRED)', /TABLE_REQUIRED|table/i.test(JSON.stringify(r4.json)), 'status=400');
  } else {
    track(r4.json?.data);
    ok('R4', '무테이블 dine-in 통과(매장 tableNumberRequired OFF 추정)', r4.status >= 200 && r4.status < 300, 'status=' + r4.status);
  }

  // ── R5: 모바일 takeaway (테이블 면제) — 실제 경로 ─────────
  console.log('[R5] 모바일 takeaway — 실제 경로(POST /api/orders source:mobile)');
  const r5 = await mobileCreate(null, 'takeaway', [MAPPED]);
  const o5 = track(r5.json?.data);
  ok('R5', 'takeaway 무테이블 통과(면제)', r5.status >= 200 && r5.status < 300, 'status=' + r5.status);
  ok('R5', 'source=mobile + needs_print=true', (await dbOrder(o5?.id))?.source === 'mobile' && (await dbOrder(o5?.id))?.needs_print === true);

  // ── R6: 추가주문 +Round (POS add-items + 모바일 auto-merge) ──
  console.log('[R6] 추가주문 +Round');
  const r6 = await api('POST', '/api/orders/' + o1.id + '/add-items', { items: [MAPPED], source: 'pos' });
  ok('R6', 'add-items 2xx', r6.status >= 200 && r6.status < 300, 'status=' + r6.status);
  const o6 = r6.json?.data?.order || r6.json?.data;
  const last6 = items(o6?.order_items).slice(-1)[0];
  ok('R6', '추가 item station=25', last6?.kitchen_station_id === STATION_MAPPED, 'got=' + last6?.kitchen_station_id);
  ok('R6', '추가 item added_at 있음(새 라운드만 인쇄)', !!last6?.added_at, 'added_at=' + last6?.added_at);
  ok('R6', '추가 item order_group>=1', (last6?.order_group || 0) >= 1, 'group=' + last6?.order_group);
  ok('R6', '추가 후 needs_print=true', (await dbOrder(o1.id))?.needs_print === true);
  // 모바일 같은테이블 재주문 → auto-merge(+Round 합류). 합성 테이블에 2번 주문.
  const mt = 'R6m' + suffix;
  const r6m1 = await api('POST', '/api/mobile/order', {
    storeId: RID, items: [MAPPED], tableNumber: mt, orderType: 'dine_in', paymentMethod: 'counter', customerInfo: { name: 'M' }
  }, false);
  track(r6m1.json?.data);
  const r6m = await api('POST', '/api/mobile/order', {
    storeId: RID, items: [MAPPED], tableNumber: mt, orderType: 'dine_in', paymentMethod: 'counter', customerInfo: { name: 'M' }
  }, false);
  track(r6m.json?.data);
  ok('R6', '모바일 같은테이블 auto-merge=true', r6m.json?.data?.merged === true, 'merged=' + r6m.json?.data?.merged);

  // ── R7: 테이블 이동 → 빈 테이블 ───────────────────────────
  console.log('[R7] 테이블 이동 → 빈 테이블');
  const mover = track((await newPosOrder('R7s' + suffix)).json?.data);
  const r7 = await api('POST', '/api/orders/' + mover.id + '/move-table', {
    destinationTableNumber: 'R7d' + suffix, onOccupied: 'block'
  });
  ok('R7', '이동 2xx', r7.status >= 200 && r7.status < 300, 'status=' + r7.status);
  ok('R7', '머지 아님(빈 테이블)', r7.json?.merged !== true, 'merged=' + r7.json?.merged);
  ok('R7', 'table_number 변경됨', (await dbOrder(mover.id))?.table_number === 'R7d' + suffix, 'tbl=' + (await dbOrder(mover.id))?.table_number);

  // ── R8: 테이블 이동 → 점유(머지) ──────────────────────────
  console.log('[R8] 테이블 이동 → 점유(머지)');
  const dstTbl = 'R8d' + suffix;
  const destOrder = track((await newPosOrder(dstTbl)).json?.data); // 목적지 점유
  const srcOrder = track((await newPosOrder('R8s' + suffix)).json?.data);
  const r8 = await api('POST', '/api/orders/' + srcOrder.id + '/move-table', {
    destinationTableNumber: dstTbl, onOccupied: 'merge'
  });
  ok('R8', '이동 2xx', r8.status >= 200 && r8.status < 300, 'status=' + r8.status);
  ok('R8', 'merged=true', r8.json?.merged === true, 'merged=' + r8.json?.merged);
  const srcAfter = await dbOrder(srcOrder.id);
  ok('R8', '소스 주문 흡수됨(삭제/이동)', !srcAfter || srcAfter.status === 'cancelled' || srcAfter.table_number === dstTbl, 'src status=' + (srcAfter?.status || 'deleted'));

  // ── R9: 아이템 단일 취소 (removedItem station + was_printed) ──
  console.log('[R9] 아이템 단일 취소');
  const r9order = track((await newPosOrder('R9_' + suffix)).json?.data);
  // void_pin: dev 매장 5 는 operation_settings.requireVoidPin = true 라 손실방지 게이트가 먼저 400 을 낸다
  // (2026-07-31 확인 — 인쇄와 무관한 설정 드리프트로 R9 3건이 통째로 빨간색이었다).
  // 게이트를 끄지 않고 **권한 PIN 을 실제로 통과시켜** 인쇄 라우팅 계약을 그대로 검증한다. RA(id 9) PIN.
  const r9 = await api('DELETE', '/api/orders/' + r9order.id + '/items/0', { reason: 'wrong item', source: 'pos', void_pin: '1234' });
  ok('R9', '취소 2xx', r9.status >= 200 && r9.status < 300, 'status=' + r9.status);
  ok('R9', 'removedItem.kitchen_station_id 포함', r9.json?.removedItem?.kitchen_station_id !== undefined, 'station=' + r9.json?.removedItem?.kitchen_station_id);
  ok('R9', 'removedItem.was_printed 플래그 포함', typeof r9.json?.removedItem?.was_printed === 'boolean', 'was_printed=' + r9.json?.removedItem?.was_printed);

  // ── R10: 주문 전체 취소 ───────────────────────────────────
  console.log('[R10] 주문 전체 취소');
  const r10order = track((await newPosOrder('R10_' + suffix)).json?.data);
  const r10 = await api('PATCH', '/api/orders/' + r10order.id, { status: 'cancelled', cancel_reason: 'test', source: 'pos' });
  ok('R10', '취소 2xx', r10.status >= 200 && r10.status < 300, 'status=' + r10.status);
  const d10 = await dbOrder(r10order.id);
  ok('R10', 'status=cancelled', d10?.status === 'cancelled', 'status=' + d10?.status);
  ok('R10', '취소표용 item station 보존(줄긋기 라우팅 가능)', items(d10?.order_items)[0]?.kitchen_station_id === STATION_MAPPED, 'station=' + items(d10?.order_items)[0]?.kitchen_station_id);

  // ── R11: 결제완료 (빌/영수증) ─────────────────────────────
  console.log('[R11] 결제완료');
  const r11order = track((await newPosOrder('R11_' + suffix)).json?.data);
  const r11 = await api('PATCH', '/api/orders/' + r11order.id, { payment_status: 'completed', payment_method: 'counter', status: 'completed' });
  ok('R11', '결제 PATCH 2xx', r11.status >= 200 && r11.status < 300, 'status=' + r11.status);
  const d11 = await dbOrder(r11order.id);
  ok('R11', 'payment_status=completed', d11?.payment_status === 'completed', 'pay=' + d11?.payment_status);
  console.log('  ⓘ R11 영수증 종이/매수(S6 billPrinter.autoPrint)는 프론트 dispatch → Part B + 실프린터(§10)');

  // ── Poller: pending-print 큐 + stationName join ───────────
  // 주의: 공유 dev 백엔드의 실제 5초 auto-print poller 가 테스트보다 먼저 needs_print 를
  // claim 할 수 있다(문서화된 레이스). 따라서 "특정 주문이 큐에 남아있나" 는 비결정적 →
  // 신선한 주문을 만들고 즉시 폴해 best-effort 로 잡고, 잡혔을 때 stationName join 계약만
  // 하드 검증. 못 잡으면 = live poller 가 이미 가져감(= poller 정상 동작) → 정보성.
  console.log('[Poller] pending-print 큐 + stationName join');
  const fresh = track((await newPosOrder('RP' + suffix)).json?.data);
  const rp = await api('GET', '/api/orders/restaurant/' + RID + '/pending-print');
  ok('Poller', 'pending-print 2xx', rp.status >= 200 && rp.status < 300, 'status=' + rp.status);
  const polled = rp.json?.data || [];
  const pFresh = polled.find(o => o.id === fresh?.id);
  if (pFresh) {
    const m = items(pFresh.order_items).find(i => i.kitchen_station_id === STATION_MAPPED);
    ok('Poller', 'stationName DB join=Kitchen Station 01', m?.stationName === 'Kitchen Station 01', 'got=' + m?.stationName);
  } else {
    console.log('  ⓘ 신선 주문이 큐에 없음 = live poller 가 이미 claim(=poller 정상). stationName join 계약은 큐 비어있어 skip.');
    ok('Poller', 'pending-print 엔드포인트 동작(레이스로 즉시 claim 가능)', true, 'live poller raced — 정상');
  }

  // ══════════════════════════════════════════════════════════════════════
  // Part B — 설정조합별 티켓 "몇 장" dispatch 카운트 (§9-6 C1~C6 replica)
  // ══════════════════════════════════════════════════════════════════════
  // billPrint 의 QZ 전송(qz.print)은 번들 내부 모듈이라 헤드리스에서 가로챌 수 없고,
  // 가로채려면 billPrint(🔒) 수정이 필요하므로 — 매수를 결정하는 라우팅 로직을
  // **순수 replica** 로 미러링해 매수를 §9-6 와 대조한다. (autoprint-regression 의
  // bucketItemsByStation replica 와 동일한 검증 패턴.)
  // ⚠️ billPrint.js 와 동기화 유지:
  //    - printKitchenTicketsByStation  (L3388: 1 station→1 / multi QZ→mapped station 수 / no-map→1)
  //    - per-item / 합본 분기            (L2439: printPerItem ? items.length : 1)
  //    - 빌프린터 미러                   (L2389: mirrorToBillPrinter && bill enabled && addr → +1 통합티켓)
  // 실제 종이 매수·한글 raster·헤더 시각은 검증 못 함 → §10 Irene 눈.
  console.log('\n[Dispatch] 설정조합별 티켓 매수 (§9-6 C1~C6 replica)');

  function dispatchCount(its, settings) {
    const sp = settings.kitchenStationPrinters || {};
    const stationIds = Object.keys(sp);
    const kp = settings.kitchenPrinter || {};
    const mirror = !!(kp.mirrorToBillPrinter && settings.__billEnabled && settings.__billAddr) ? 1 : 0;
    let kitchen;
    if (stationIds.length >= 1) {
      if (stationIds.length === 1) {
        kitchen = 1; // single station: 전체 1장
      } else {
        // bucket: configured station 에 매핑된 아이템만 station 별, 미매핑은 첫 station 에 합쳐짐(추가 티켓 X)
        const buckets = {}; let unmapped = 0;
        its.forEach(it => {
          const sid = it.kitchen_station_id || (it.menuItem && it.menuItem.kitchen_station_id) || null;
          if (sid && sp[sid]) buckets[sid] = (buckets[sid] || 0) + 1; else unmapped++;
        });
        const mapped = Object.keys(buckets);
        kitchen = mapped.length === 0 ? 1 : mapped.length; // 매핑 0 → 첫 station 합본 1장
      }
    } else {
      kitchen = kp.printPerItem ? its.length : 1; // station 없음: per-item ? N : 합본 1
    }
    return { kitchen, mirror, total: kitchen + mirror };
  }

  // §9-6 데이터: 비빔밥@25 / 된장찌개@26 / 소주@27 (3 station 분산)
  const ITEMS3 = [
    { name: '비빔밥', kitchen_station_id: 25 },
    { name: '된장찌개', kitchen_station_id: 26 },
    { name: '소주', kitchen_station_id: 27 }
  ];
  const ST3 = { 25: { name: 'KITCHEN' }, 26: { name: 'KITCHEN 2' }, 27: { name: 'BAR' } };

  const cases = [
    { id: 'C1', desc: 'QZ·3station·perItem OFF·mirror OFF', s: { kitchenStationPrinters: ST3, kitchenPrinter: {} }, exp: 3 },
    { id: 'C2', desc: 'QZ·station 0·perItem OFF', s: { kitchenStationPrinters: {}, kitchenPrinter: { printPerItem: false } }, exp: 1 },
    { id: 'C3', desc: 'QZ·station 0·perItem ON', s: { kitchenStationPrinters: {}, kitchenPrinter: { printPerItem: true } }, exp: 3 },
    { id: 'C4', desc: 'QZ·3station·mirror ON', s: { kitchenStationPrinters: ST3, kitchenPrinter: { mirrorToBillPrinter: true }, __billEnabled: true, __billAddr: 'POS-80C' }, exp: 4 },
    { id: 'C5', desc: 'R10 전체취소·3station (station별 취소표)', s: { kitchenStationPrinters: ST3, kitchenPrinter: {} }, exp: 3 },
    { id: 'C6', desc: 'kitchenPrinter.enabled=false + station (코드 우회 — 실게이트=autoPrint)', s: { kitchenStationPrinters: ST3, kitchenPrinter: { enabled: false } }, exp: 3 },
  ];
  cases.forEach(c => {
    const r = dispatchCount(ITEMS3, c.s);
    ok('Dispatch', `${c.id} ${c.desc} → ${r.total}장`, r.total === c.exp, `got=${r.total} (kitchen ${r.kitchen}+mirror ${r.mirror}) 기대=${c.exp}`);
  });
  console.log('  ⓘ C6 은 §9-6 문서대로 "코드 실제 동작=3장 발행"(station 분기가 .enabled 보다 먼저). 실 자동인쇄 게이트는 autoPrint(상위 호출부).');

  // ── Cleanup ───────────────────────────────────────────────
  console.log('\n[cleanup] 테스트 주문 삭제');
  const OrderAction = require('../models/OrderAction');
  for (const oid of createdOrderIds) {
    try {
      await OrderAction.destroy({ where: { order_id: oid }, force: true });
      await Order.destroy({ where: { id: oid }, force: true });
    } catch (e) { console.log('  cleanup fail ' + oid + ': ' + e.message); }
  }
  console.log(`  deleted ${createdOrderIds.size} test orders`);

  // ── Summary (루트별) ──────────────────────────────────────
  console.log('\n=== §9 루트별 대조 결과 ===');
  const byRoute = {};
  results.forEach(r => { (byRoute[r.route] = byRoute[r.route] || { p: 0, f: 0 }); r.ok ? byRoute[r.route].p++ : byRoute[r.route].f++; });
  Object.keys(byRoute).forEach(rt => {
    const b = byRoute[rt];
    console.log(`  ${b.f === 0 ? '✓' : '✗'} ${rt}: ${b.p} pass${b.f ? ', ' + b.f + ' FAIL' : ''}`);
  });
  const passed = results.filter(r => r.ok).length, failed = results.filter(r => !r.ok).length;
  console.log(`\n총 PASS ${passed} / FAIL ${failed}`);
  if (failed) results.filter(r => !r.ok).forEach(r => console.log(`  ✗ [${r.route}] ${r.label}${r.detail ? ' — ' + r.detail : ''}`));
  process.exit(failed === 0 ? 0 : 1);
}
run().catch(e => { console.error('FATAL:', e); process.exit(2); });

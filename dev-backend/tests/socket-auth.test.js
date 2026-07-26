/**
 * socket-auth.test.js
 *
 * 회귀 박제 — 2026-07-26 소켓 emit 크로스테넌트 봉인.
 *
 * 사고 가능성: `socket.to(room)` 은 **그 룸에 가입했는지와 무관하게** 아무 룸에나 쏠 수 있다.
 * 그래서 join-restaurant 을 인증 신원으로 검증했어도, /checkout-display 의 emit 핸들러가
 * payload 의 restaurantId 를 그대로 신뢰해 아래가 가능했다:
 *   - 타 매장 고객화면에 **위조 장바구니** 표시 (cart-update)
 *   - 타 매장 고객화면 **강제 초기화** (cart-clear)
 *   - 타 매장 **진행 중 판매에 회원 붙이기** → 로열티 적립 (customer-checkin / pos-customer-update)
 *   - 서버 카트 캐시(cartCache) 오염 → 그 매장 화면이 재접속할 때 위조 카트를 **재생**
 * /kitchen · /display 는 `io.of(ns).emit()` = 네임스페이스 전체 브로드캐스트여서
 * 가짜 주문·픽업 이벤트를 전 매장에 뿌릴 수 있었다.
 *
 * 이 테스트가 통과하는 한 그 경로는 다시 열리지 않는다.
 *
 * 두 모드를 **둘 다** 검증한다 (docs/SOCKET_AUTH_HARDENING.md 무중단 롤아웃 모델):
 *   - 강제(SOCKET_AUTH_ENFORCE=true)  → 실제로 막히는지 (봉인 증명)
 *   - 모니터(false, 현재 운영)         → 동작 무변경 + 계측만 되는지 (회귀 0 증명)
 */
const http = require('http');
const jwt = require('jsonwebtoken');
const { io: ioClient } = require('socket.io-client');

process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-secret-socket-auth';

// dev DB 의 실제 계정 모양 (권한판정에 DB 조회가 필요없는 Restaurant Admin 사용)
const VICTIM = { userId: 23, role: 'Restaurant Admin', restaurant_id: 38 }; // demo 매장
const ATTACKER = { userId: 9, role: 'Restaurant Admin', restaurant_id: 5 };  // 다른 매장
const VICTIM_RID = 38;

const SILENCE_MS = 300; // "안 온다"를 판정하는 대기시간
const jest_ = jest;

function tokenFor(u) { return jwt.sign(u, process.env.JWT_SECRET, { expiresIn: '10m' }); }

/**
 * 모드별로 socketService 를 새로 로드해 서버를 띄운다.
 * SOCKET_AUTH_ENFORCE 는 모듈 로드 시점에 읽히므로 resetModules 가 필수.
 */
function bootServer(enforce) {
  return new Promise((resolve) => {
    jest_.resetModules();
    process.env.SOCKET_AUTH_ENFORCE = enforce ? 'true' : 'false';
    const svc = require('../services/socketService');
    const server = http.createServer();
    const io = svc.initSocketServer(server);
    server.listen(0, '127.0.0.1', () => {
      resolve({ server, io, svc, port: server.address().port });
    });
  });
}

function connect(port, ns, token) {
  return new Promise((resolve, reject) => {
    const sock = ioClient(`http://127.0.0.1:${port}${ns}`, {
      transports: ['websocket'],
      forceNew: true,
      reconnection: false,
      ...(token ? { auth: { token } } : {})
    });
    sock.on('connect', () => resolve(sock));
    sock.on('connect_error', (err) => reject(err));
  });
}

// 이벤트가 오면 payload, SILENCE_MS 안에 안 오면 null
function waitEvent(sock, event, ms = SILENCE_MS) {
  return new Promise((resolve) => {
    const timer = setTimeout(() => { sock.off(event, handler); resolve(null); }, ms);
    const handler = (payload) => { clearTimeout(timer); sock.off(event, handler); resolve(payload); };
    sock.on(event, handler);
  });
}

function joined(sock, rid) {
  sock.emit('join-restaurant', rid);
  return new Promise((r) => setTimeout(r, 120)); // join 은 async(권한판정) → 반영 대기
}

// ────────────────────────────────────────────────────────────────────────────
// 강제 모드 — 실제로 봉인되는지
// ────────────────────────────────────────────────────────────────────────────
describe('소켓 강제 모드(SOCKET_AUTH_ENFORCE=true) — 크로스테넌트 봉인', () => {
  let ctx, victim, attacker;

  beforeAll(async () => {
    ctx = await bootServer(true);
    victim = await connect(ctx.port, '/checkout-display', tokenFor(VICTIM));
    attacker = await connect(ctx.port, '/checkout-display', tokenFor(ATTACKER));
    await joined(victim, VICTIM_RID);
  }, 20000);

  afterAll(async () => {
    [victim, attacker].forEach((s) => { try { s?.close(); } catch (_) {} });
    await new Promise((r) => ctx.server.close(r));
  });

  test('토큰 없는 핸드셰이크는 거부된다', async () => {
    await expect(connect(ctx.port, '/checkout-display', null)).rejects.toThrow(/token missing/);
  });

  test('위조 토큰 핸드셰이크는 거부된다', async () => {
    const bad = jwt.sign(VICTIM, 'wrong-secret');
    await expect(connect(ctx.port, '/checkout-display', bad)).rejects.toThrow(/invalid token/);
  });

  test('자기 매장 cart-update 는 정상 전달된다 (기능 보존)', async () => {
    const pos = await connect(ctx.port, '/checkout-display', tokenFor(VICTIM));
    await joined(pos, VICTIM_RID);
    const got = waitEvent(victim, 'cart-update', 1000);
    pos.emit('cart-update', { restaurantId: VICTIM_RID, items: [{ name: 'legit' }] });
    const payload = await got;
    expect(payload).toBeTruthy();
    expect(payload.items[0].name).toBe('legit');
    pos.close();
  });

  // 결함의 핵심 — 5개 emit 핸들러 전부
  const CROSS_CASES = [
    ['cart-update', { items: [{ name: 'FORGED' }] }],
    ['cart-clear', {}],
    ['customer-checkin', { phone: '+60123456789' }],
    ['pos-customer-update', { customer: { id: 999, name: 'Forged Member' } }],
    ['checkout-complete', { orderId: 999 }],
  ];

  test.each(CROSS_CASES)('타 매장 %s emit 은 드랍된다', async (event, extra) => {
    const got = waitEvent(victim, event);
    attacker.emit(event, { restaurantId: VICTIM_RID, ...extra });
    expect(await got).toBeNull();
  });

  test('id 정규화 우회(3.8e1)로도 타 매장에 닿지 않는다', async () => {
    const got = waitEvent(victim, 'cart-update');
    attacker.emit('cart-update', { restaurantId: '3.8e1', items: [{ name: 'FORGED' }] });
    expect(await got).toBeNull();
  });

  test('타 매장 cart-update 는 서버 카트 캐시도 오염시키지 못한다 (재접속 재생 없음)', async () => {
    attacker.emit('cart-update', { restaurantId: VICTIM_RID, items: [{ name: 'FORGED' }] });
    await new Promise((r) => setTimeout(r, 150));
    const late = await connect(ctx.port, '/checkout-display', tokenFor(VICTIM));
    const replay = waitEvent(late, 'cart-update', 600);
    late.emit('join-restaurant', VICTIM_RID);
    const payload = await replay;
    // 캐시가 비었거나(null) 정상 카트만 남아 있어야 한다 — 위조 카트는 절대 아님
    if (payload) expect(JSON.stringify(payload)).not.toContain('FORGED');
    late.close();
  });

  test('/orders 타 매장 join 은 거부된다', async () => {
    const att = await connect(ctx.port, '/orders', tokenFor(ATTACKER));
    await joined(att, VICTIM_RID);
    const got = waitEvent(att, 'order-created');
    ctx.io.of('/orders').to(`restaurant_${VICTIM_RID}`).emit('order-created', { id: 1 });
    expect(await got).toBeNull();
    att.close();
  });

  test('/kitchen new-order 는 네임스페이스 전체가 아니라 해당 매장 룸에만 간다', async () => {
    const vKitchen = await connect(ctx.port, '/kitchen', tokenFor(VICTIM));
    await joined(vKitchen, VICTIM_RID);
    const aKitchen = await connect(ctx.port, '/kitchen', tokenFor(ATTACKER));
    await joined(aKitchen, ATTACKER.restaurant_id);

    // 공격자가 타 매장 주문을 주입 → 그 매장 주방에 안 뜬다
    const forged = waitEvent(vKitchen, 'new-order');
    aKitchen.emit('new-order', { restaurant_id: VICTIM_RID, id: 'FORGED' });
    expect(await forged).toBeNull();

    // 자기 매장 주문은 자기 룸 안에서만 (다른 매장은 못 받는다)
    const legitOther = waitEvent(vKitchen, 'new-order');
    aKitchen.emit('new-order', { restaurant_id: ATTACKER.restaurant_id, id: 'OWN' });
    expect(await legitOther).toBeNull();

    vKitchen.close();
    aKitchen.close();
  }, 15000);
});

// ────────────────────────────────────────────────────────────────────────────
// 모니터 모드 — 오늘 운영 상태. 동작 변화가 0이어야 한다.
// ────────────────────────────────────────────────────────────────────────────
describe('소켓 모니터 모드(기본) — 동작 무변경 + 계측만', () => {
  let ctx, victim;

  beforeAll(async () => {
    ctx = await bootServer(false);
    victim = await connect(ctx.port, '/checkout-display', tokenFor(VICTIM));
    await joined(victim, VICTIM_RID);
  }, 20000);

  afterAll(async () => {
    try { victim?.close(); } catch (_) {}
    await new Promise((r) => ctx.server.close(r));
  });

  test('토큰 없는 연결도 끊지 않는다 (매장 옛 번들 보호)', async () => {
    const anon = await connect(ctx.port, '/checkout-display', null);
    expect(anon.connected).toBe(true);
    anon.close();
  });

  test('정상 cart-update 는 그대로 전달된다', async () => {
    const pos = await connect(ctx.port, '/checkout-display', tokenFor(VICTIM));
    await joined(pos, VICTIM_RID);
    const got = waitEvent(victim, 'cart-update', 1000);
    pos.emit('cart-update', { restaurantId: VICTIM_RID, items: [{ name: 'legit' }] });
    expect(await got).toBeTruthy();
    pos.close();
  });

  test('타 매장 emit 은 (모니터라) 막지 않되 crossRestaurant 로 계측된다', async () => {
    const attacker = await connect(ctx.port, '/checkout-display', tokenFor(ATTACKER));
    const before = ctx.svc.getSocketAuthStats().total.crossRestaurant || 0;
    const got = waitEvent(victim, 'cart-update', 1000);
    attacker.emit('cart-update', { restaurantId: VICTIM_RID, items: [{ name: 'monitored' }] });
    const payload = await got;
    expect(payload).toBeTruthy(); // 모니터 모드 = 기존 동작 유지
    expect(ctx.svc.getSocketAuthStats().total.crossRestaurant).toBeGreaterThan(before);
    attacker.close();
  });
});

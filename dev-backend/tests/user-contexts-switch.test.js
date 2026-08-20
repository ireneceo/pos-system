/**
 * user-contexts-switch.test.js
 *
 * 계약 박제 — 멀티 컨텍스트 로그인 P2 (백엔드 전환).
 * docs/MULTI_CONTEXT_LOGIN_DESIGN.md §4.
 *
 * 이 테스트가 지키는 계약:
 *   ① **무회귀 제1 조건** — ctx claim 없는 토큰은 기존과 동일하게 동작한다.
 *   ② 본래 정체는 항상 목록에 있고 언제든 복귀 가능 (스칼라 NULL 유저 포함).
 *   ③ 전환 토큰은 "그 매장 RA 와 똑같은 모양"으로 투영된다 — 타 매장은 403.
 *   ④ **회수되면 401(강제 로그아웃)이 아니라 네이티브 정체로 폴백** + `X-Context-Fallback` 헤더.
 *      (프론트 httpClient 가 모든 401 을 전역 로그아웃 처리하므로 401 을 쓰면 픽커 복귀가 불가능)
 *   ⑤ 위조·비허용 조합·지수표기 id 는 전부 거부된다.
 *   ⑥ 소켓: 회수된 ctx 토큰은 **새 연결 거부**, ctx 없는 토큰(전 매장 함대)은 **기존과 동일 수용**(대조군).
 *
 * 쓰기는 demo 매장(rid 18·38)과 demo 계정에만 한다. 끝나면 부여 행을 전량 삭제한다.
 */
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env'), quiet: true });
const http_ = require('http');
const jwt = require('jsonwebtoken');
const { io: ioClient } = require('socket.io-client');
const { sequelize } = require('../config/database');
const { http } = require('./_helpers');

// socketService 는 모듈 로드 시점에 이 값을 읽는다 — require 보다 먼저 고정해야 한다.
// 현재 운영과 동일한 모니터 모드에서 검증한다(ctx 재검증은 모드와 무관하게 거부해야 함).
process.env.SOCKET_AUTH_ENFORCE = process.env.SOCKET_AUTH_ENFORCE || 'false';

// 모자 대상 = rid 18 "Test Debug Restaurant" (is_demo, 브랜드·푸드코트 무소속).
// 이 조합이 중요하다 — demo BG(user 22)는 브랜드 17(K-Dine) 소유라 **rid 38 은 네이티브로 접근되고
// rid 18 은 안 된다**(실측: 38→200 / 18→403). 그래서 두 매장을 쌍으로 쓰면
//   ① 모자를 쓰면 18 이 열리고 38 이 닫힌다 = 모자는 **추가가 아니라 교체**("한 번에 모자 하나")
//   ② 회수되면 정확히 네이티브 상태(18 닫힘 / 38 열림)로 되돌아온다 = 잔존 권한 0
// 두 방향을 모두 증명할 수 있다. 쓰기는 전부 demo 매장에만 일어난다.
const HAT_RID = 18;           // 모자로만 열리는 매장 (네이티브 BG 는 403)
const NATIVE_RID = 38;        // 네이티브 BG 가 원래 접근 가능한 매장 (모자를 쓰면 403 이어야 함)
const V1 = { entity_type: 'restaurant', role: 'Restaurant Admin' };

let hatUserId;      // 모자를 받을 demo BG 계정
let grantorId;      // System Admin
let nativeToken;    // ctx 없는 네이티브 토큰
let ctxToken;       // 모자 토큰

const q = async (s, r) => (await sequelize.query(s, r ? { replacements: r } : undefined))[0];
const grantHat = (rid) => q(
  `INSERT INTO user_contexts (user_id,entity_type,entity_id,role,granted_by,created_at,updated_at)
   VALUES (:u,:t,:e,:r,:g,NOW(),NOW())`,
  { u: hatUserId, t: V1.entity_type, e: rid, r: V1.role, g: grantorId }
);
const revokeHats = () => q('DELETE FROM user_contexts WHERE user_id = :u', { u: hatUserId });

beforeAll(async () => {
  const r = await http('post', '/api/auth/demo-login').send({ key: 'demo_brand_general' });
  expect(r.status).toBe(200);
  nativeToken = r.body.data.token;
  hatUserId = r.body.data.user.id;

  const [sa] = await q("SELECT id FROM users WHERE role='System Admin' LIMIT 1");
  grantorId = sa.id;
  await revokeHats();
});

afterAll(async () => {
  await revokeHats();
  await sequelize.close();
});

describe('① 무회귀 — ctx 없는 토큰', () => {
  test('/me 는 네이티브 정체 그대로, 폴백 헤더 없음', async () => {
    const r = await http('get', '/api/auth/me').set('Authorization', `Bearer ${nativeToken}`);
    expect(r.status).toBe(200);
    expect(r.body.data.role).toBe('Brand General');
    expect(r.headers['x-context-fallback']).toBeUndefined();
  });

  // 두 로그인 경로 **모두** contexts 를 싣는다 — 빠른 로그인은 데모 시연 경로라 픽커가 비면 안 된다
  // (P2 판정에서 확정). 한쪽만 검사하면 다른 쪽이 비어도 통과하므로 케이스를 나눠 둔다.
  test('로그인 응답에 contexts 가 덧붙지만 기존 user 필드는 그대로', async () => {
    const r = await http('post', '/api/auth/login')
      .send({ email: 'irene-ref1@purplehere.com', password: 'Test1234!' });
    expect(r.status).toBe(200);
    expect(Array.isArray(r.body.data.contexts)).toBe(true);
    expect(r.body.data.contexts.length).toBeGreaterThanOrEqual(1);
    expect(r.body.data.contexts[0].kind).toBe('default');
    // 기존 필드 무회귀
    expect(r.body.data.token).toBeTruthy();
    expect(r.body.data.user.role).toBeTruthy();
  });

  test('빠른 로그인(데모 카드) 응답에도 contexts 가 실린다', async () => {
    const r = await http('post', '/api/auth/demo-login').send({ key: 'demo_restaurant_admin' });
    expect(r.status).toBe(200);
    expect(Array.isArray(r.body.data.contexts)).toBe(true);
    expect(r.body.data.contexts[0].kind).toBe('default');
    // 기존 필드 무회귀
    expect(r.body.data.user.role).toBe('Restaurant Admin');
    expect(r.body.data.user.restaurant_id).toBe(NATIVE_RID);
  });
});

describe('② 목록 — 본래 정체는 항상 있다', () => {
  test('부여 0건이면 기본 컨텍스트 1개', async () => {
    const r = await http('get', '/api/auth/contexts').set('Authorization', `Bearer ${nativeToken}`);
    expect(r.status).toBe(200);
    expect(r.body.data.contexts).toHaveLength(1);
    expect(r.body.data.contexts[0].kind).toBe('default');
  });

  test('모자를 부여하면 2개가 되고, 목록에 뜬 모자는 전환도 된다 (list ⊆ detail)', async () => {
    await grantHat(HAT_RID);
    const r = await http('get', '/api/auth/contexts').set('Authorization', `Bearer ${nativeToken}`);
    expect(r.body.data.contexts).toHaveLength(2);
    const granted = r.body.data.contexts.find(c => c.kind === 'granted');
    expect(granted.entity_id).toBe(HAT_RID);

    const sw = await http('post', '/api/auth/switch-context')
      .set('Authorization', `Bearer ${nativeToken}`)
      .send({ entity_type: granted.entity_type, entity_id: granted.entity_id, role: granted.role });
    expect(sw.status).toBe(200);
    ctxToken = sw.body.data.token;
  });
});

describe('③ 투영 — 그 매장 RA 와 같은 모양', () => {
  test('/me 가 투영값을 반환 (role/매장 교체, 브랜드 스코프는 null)', async () => {
    const r = await http('get', '/api/auth/me').set('Authorization', `Bearer ${ctxToken}`);
    expect(r.status).toBe(200);
    expect(r.body.data.role).toBe('Restaurant Admin');
    expect(r.body.data.restaurant_id).toBe(HAT_RID);
    expect(r.body.data.brand_id).toBeNull();
    expect(r.body.data.foodcourt_id).toBeNull();
    expect(r.body.data.permissions).toEqual([]);
  });

  test('모자 매장은 200, 네이티브로 되던 매장은 403 (모자는 추가가 아니라 교체)', async () => {
    const ok = await http('get', `/api/restaurants/${HAT_RID}`).set('Authorization', `Bearer ${ctxToken}`);
    expect(ok.status).toBe(200);
    const denied = await http('get', `/api/restaurants/${NATIVE_RID}`).set('Authorization', `Bearer ${ctxToken}`);
    expect(denied.status).toBe(403);
  });

  test('본래 정체로 복귀하면 ctx 없는 토큰이 나오고 브랜드 정체가 돌아온다', async () => {
    const back = await http('post', '/api/auth/switch-context')
      .set('Authorization', `Bearer ${ctxToken}`)
      .send({ target: 'default' });
    expect(back.status).toBe(200);
    expect(jwt.decode(back.body.data.token).ctx).toBeUndefined();

    const me = await http('get', '/api/auth/me').set('Authorization', `Bearer ${back.body.data.token}`);
    expect(me.body.data.role).toBe('Brand General');
  });
});

describe('④ 회수 — 로그아웃이 아니라 폴백 (고장주입)', () => {
  test('모자를 뺏으면 그 토큰은 401 이 아니라 네이티브로 폴백 + 헤더', async () => {
    await revokeHats();
    const r = await http('get', '/api/auth/me').set('Authorization', `Bearer ${ctxToken}`);
    expect(r.status).toBe(200);                        // ⛔ 401 이면 전역 로그아웃 = 설계 위반
    expect(r.headers['x-context-fallback']).toBe('revoked');
    expect(r.body.data.role).toBe('Brand General');    // 진짜 정체로 내려감 = 권한 확대 없음
  });

  test('폴백 상태에서 그 매장 접근은 거부된다 (권한이 남지 않는다)', async () => {
    const r = await http('get', `/api/restaurants/${HAT_RID}`).set('Authorization', `Bearer ${ctxToken}`);
    expect(r.status).toBe(403);
  });
});

describe('⑤ 위조·비허용 입력 (고장주입)', () => {
  test('FI-1 서명은 유효하지만 부여받은 적 없는 ctx → 폴백(200+헤더), 401 아님', async () => {
    const forged = jwt.sign(
      { userId: hatUserId, role: 'Restaurant Admin', restaurant_id: NATIVE_RID,
        ctx: { v: 1, t: 'restaurant', id: NATIVE_RID, r: 'Restaurant Admin' } },
      process.env.JWT_SECRET, { expiresIn: '5m' }
    );
    const r = await http('get', '/api/auth/me').set('Authorization', `Bearer ${forged}`);
    expect(r.status).toBe(200);
    expect(r.headers['x-context-fallback']).toBe('revoked');
    expect(r.body.data.role).toBe('Brand General');
  });

  test('FI-2 지수표기 entity_id → 400 (parseInt 우회 차단)', async () => {
    const r = await http('post', '/api/auth/switch-context')
      .set('Authorization', `Bearer ${nativeToken}`)
      .send({ entity_type: 'restaurant', entity_id: '1.16e2', role: 'Restaurant Admin' });
    expect(r.status).toBe(400);
  });

  test('v1 비허용 조합(브랜드 모자) → 400', async () => {
    const r = await http('post', '/api/auth/switch-context')
      .set('Authorization', `Bearer ${nativeToken}`)
      .send({ entity_type: 'brand', entity_id: 1, role: 'Brand General' });
    expect(r.status).toBe(400);
  });

  test('부여 안 된 매장으로 전환 시도 → 403', async () => {
    const r = await http('post', '/api/auth/switch-context')
      .set('Authorization', `Bearer ${nativeToken}`)
      .send({ entity_type: 'restaurant', entity_id: NATIVE_RID, role: 'Restaurant Admin' });
    expect(r.status).toBe(403);
  });
});

describe('⑥ 소켓 — ctx 토큰만 재검증, 기존 함대는 무영향', () => {
  let server, port, io_;

  const connect = (token) => new Promise((resolve) => {
    const sock = ioClient(`http://127.0.0.1:${port}/orders`, {
      transports: ['websocket'], forceNew: true, reconnection: false, auth: { token }
    });
    sock.on('connect', () => resolve({ ok: true, sock }));
    sock.on('connect_error', (e) => resolve({ ok: false, message: e.message, sock }));
  });

  // ⚠ `jest.resetModules()` 를 쓰지 않는다. 모듈 그래프를 새로 만들면 socketService 가 끌고 오는
  // models/config-database 가 **두 번째 커넥션 풀**을 열고, 그 풀은 우리가 닫는 sequelize 와 다른
  // 인스턴스라 프로세스가 종료되지 않는다(실측: 테스트는 1.4초에 끝나는데 프로세스가 3분+ 매달림).
  // 게이트가 "느린 통과"가 아니라 "멈춤"이 되면 fail-closed 가 아니라 fail-stuck 이다.
  // 이 스위트는 모드를 바꿔가며 볼 필요가 없어(모니터 모드 1개) resetModules 가 애초에 불필요하다.
  const svc = require('../services/socketService');

  beforeAll(async () => {
    server = http_.createServer();
    io_ = svc.initSocketServer(server);
    await new Promise(r => server.listen(0, '127.0.0.1', r));
    port = server.address().port;
  });

  afterAll(async () => {
    if (io_) { try { io_.close(); } catch { /* 이미 닫힘 */ } }
    if (server) await new Promise(r => server.close(r));
  });

  test('FI-8 회수된 모자의 ctx 토큰 → 새 연결 거부 (모니터 모드에서도)', async () => {
    await revokeHats();
    const revoked = jwt.sign(
      { userId: hatUserId, role: 'Restaurant Admin', restaurant_id: HAT_RID,
        ctx: { v: 1, t: 'restaurant', id: HAT_RID, r: 'Restaurant Admin' } },
      process.env.JWT_SECRET, { expiresIn: '5m' }
    );
    const r = await connect(revoked);
    r.sock.close();
    expect(r.ok).toBe(false);
    expect(r.message).toMatch(/context revoked/);
  });

  test('대조군: ctx 없는 토큰은 기존과 동일하게 연결된다', async () => {
    const plain = jwt.sign(
      { userId: 23, role: 'Restaurant Admin', restaurant_id: NATIVE_RID },
      process.env.JWT_SECRET, { expiresIn: '5m' }
    );
    const r = await connect(plain);
    r.sock.close();
    expect(r.ok).toBe(true);
  });

  test('유효한 모자의 ctx 토큰은 연결된다 (방어가 정상 트래픽을 막지 않음)', async () => {
    await grantHat(HAT_RID);
    const valid = jwt.sign(
      { userId: hatUserId, role: 'Restaurant Admin', restaurant_id: HAT_RID,
        ctx: { v: 1, t: 'restaurant', id: HAT_RID, r: 'Restaurant Admin' } },
      process.env.JWT_SECRET, { expiresIn: '5m' }
    );
    const r = await connect(valid);
    r.sock.close();
    expect(r.ok).toBe(true);
    await revokeHats();
  });
});

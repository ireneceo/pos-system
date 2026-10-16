/**
 * context-live.test.js — 직원(Staff 모자) 승인 즉시 반영.
 * .claude/fable-design-20261016-staff-approval-live.md §6 L1~L8.
 *
 * 계약:
 *   · 상태 변화마다 /notifications 소켓으로 «다시 읽어라» 신호 — 당사자 user:{id} 에 context:changed(granted·rejected·revoked),
 *     매장 restaurant:{rid} 에 context:store-changed(모든 kind). 페이로드에 이름·이메일·user_id 없음.
 *   · 다른 매장 RA 는 아무것도 받지 않는다.
 *   · RA 직원 목록 GET /api/users?include_contexts=1 에 그 매장 Staff 모자 보유자가 «연결 계정» 행으로 실린다.
 *     플래그 없음·다른 매장·BG 는 종전 그대로.
 *
 * 고정물: 실행 중인 dev 서버(localhost:3001 — HTTP·소켓 모두). demo 매장만(rid 18 · 39 · 1).
 *   req = RA of 39 (요청자) · ra = RA of 18 (승인자) · other = RA of 1 (다른 매장). 전부 임시 is_test.
 * afterAll: 요청 행 · user_contexts · 활동 기록 · 임시 사용자 · staff_limit 원복.
 */
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env'), quiet: true });
const jwt = require('jsonwebtoken');
const { io: ioClient } = require('socket.io-client');
const { sequelize } = require('../config/database');
const { http, BASE } = require('./_helpers');

const STAFF_RID = 18;
const REQ_RID = 39;
const OTHER_RID = 1;
const TAG = 'zzctxlive' + Date.now().toString(36);
const QUIET_MS = 1200;

const q = async (s, r) => (await sequelize.query(s, r ? { replacements: r } : undefined))[0];
const bearer = (t) => ({ Authorization: `Bearer ${t}` });
// 실제 발급 토큰과 같은 모양(userId 키) — 소켓 룸은 토큰 신원에서만 나온다.
const sign = (id, extra = {}) => jwt.sign({ userId: id, ...extra }, process.env.JWT_SECRET, { expiresIn: '10m' });

let reqId, raId, otherId, saId, bgId;
let tReq, tRa, tOther, tSA, tBG;
let origLimit;
const sockets = [];

async function mkUser(suffix, rid) {
  const [id] = await sequelize.query(
    `INSERT INTO users (username, email, password, role, restaurant_id, full_name, is_active, email_verified, is_demo, is_test, createdAt, updatedAt)
     VALUES (?, ?, 'x', 'Restaurant Admin', ?, ?, 1, 1, 0, 1, NOW(), NOW())`,
    { replacements: [`${TAG}${suffix}`, `${TAG}${suffix}@example.com`, rid, `ZZ Live ${suffix}`] }
  );
  return id;
}

function connect(token) {
  return new Promise((resolve, reject) => {
    const sock = ioClient(`${BASE}/notifications`, {
      transports: ['websocket'], forceNew: true, reconnection: false, auth: { token }
    });
    sockets.push(sock);
    sock.on('connect', () => { sock.emit('join', {}); setTimeout(() => resolve(sock), 250); });
    sock.on('connect_error', (e) => reject(e));
  });
}

// 이벤트를 모아 두고 꺼내 쓴다(순서 무관 · 놓침 방지).
function collector(sock) {
  const got = { 'context:changed': [], 'context:store-changed': [] };
  for (const ev of Object.keys(got)) sock.on(ev, (d) => got[ev].push(d));
  return {
    got,
    clear() { for (const k of Object.keys(got)) got[k].length = 0; },
    async waitFor(ev, pred, ms = 3000) {
      const t0 = Date.now();
      while (Date.now() - t0 < ms) {
        const hit = got[ev].find(pred);
        if (hit) return hit;
        await new Promise(r => setTimeout(r, 50));
      }
      return null;
    }
  };
}

const PRIVATE_KEYS = ['email', 'full_name', 'user_id', 'username', 'phone'];

let cReq, cRa, cOther;
const api = (m, p) => http(m, `/api${p}`);

beforeAll(async () => {
  reqId = await mkUser('req', REQ_RID);
  raId = await mkUser('ra', STAFF_RID);
  otherId = await mkUser('oth', OTHER_RID);
  const [sa] = await q("SELECT id FROM users WHERE role='System Admin' AND is_active=1 ORDER BY id LIMIT 1");
  saId = sa.id;
  const [bg] = await q("SELECT id FROM users WHERE email='demo-brand@purplehere.com' LIMIT 1");
  bgId = bg.id;
  tReq = sign(reqId, { role: 'Restaurant Admin', restaurant_id: REQ_RID });
  tRa = sign(raId, { role: 'Restaurant Admin', restaurant_id: STAFF_RID });
  tOther = sign(otherId, { role: 'Restaurant Admin', restaurant_id: OTHER_RID });
  tSA = sign(saId, { role: 'System Admin' });
  tBG = sign(bgId, { role: 'Brand General' });
  const [r] = await q('SELECT staff_limit FROM restaurants WHERE id = :id', { id: STAFF_RID });
  origLimit = r.staff_limit;
  await q('UPDATE restaurants SET staff_limit = 999 WHERE id = :id', { id: STAFF_RID });
  cReq = collector(await connect(tReq));
  cRa = collector(await connect(tRa));
  cOther = collector(await connect(tOther));
});

afterAll(async () => {
  for (const s of sockets) s.disconnect();
  const us = [reqId, raId, otherId].filter(Boolean);
  if (us.length) {
    await q('DELETE FROM user_context_requests WHERE user_id IN (:us)', { us });
    await q('DELETE FROM user_contexts WHERE user_id IN (:us)', { us });
    await q('DELETE FROM activity_logs WHERE user_id IN (:us)', { us });
    await q('DELETE FROM activity_logs WHERE entity_type = :t AND entity_id IN (:us)', { t: 'user_context', us });
  }
  await q('UPDATE restaurants SET staff_limit = :l WHERE id = :id', { l: origLimit, id: STAFF_RID });
  await q('DELETE FROM users WHERE username LIKE :p', { p: `${TAG}%` });
  await sequelize.close();
});

const sendRequest = () => api('post', '/context-requests').set(bearer(tReq))
  .send({ entity_type: 'restaurant', entity_id: STAFF_RID, role: 'Staff', message: '[확인용] live test' });

let reqRowId, ctxId;

test('L1 요청 → 승인자 매장 룸에 request_created · 다른 매장·요청자 무수신', async () => {
  for (const c of [cReq, cRa, cOther]) c.clear();
  const r = await sendRequest();
  expect(r.status).toBe(201);
  reqRowId = r.body.data.id;
  const hit = await cRa.waitFor('context:store-changed', d => d.kind === 'request_created' && d.request_id === reqRowId);
  expect(hit).toBeTruthy();
  expect(hit.entity_id).toBe(STAFF_RID);
  await new Promise(res => setTimeout(res, QUIET_MS));
  expect(cOther.got['context:store-changed']).toHaveLength(0);
  expect(cOther.got['context:changed']).toHaveLength(0);
  expect(cReq.got['context:changed']).toHaveLength(0);
});

test('L2 승인 → 요청자 granted(label · 개인정보 없음) · 매장 store-changed · 다른 매장 무수신', async () => {
  for (const c of [cReq, cRa, cOther]) c.clear();
  const r = await api('post', `/context-requests/${reqRowId}/approve`).set(bearer(tRa)).send({ permissions: ['access_pos'] });
  expect(r.status).toBe(200);
  const mine = await cReq.waitFor('context:changed', d => d.kind === 'granted' && d.request_id === reqRowId);
  expect(mine).toBeTruthy();
  expect(mine.entity_type).toBe('restaurant');
  expect(mine.entity_id).toBe(STAFF_RID);
  expect(mine.role).toBe('Staff');
  const [rest] = await q('SELECT name FROM restaurants WHERE id = :id', { id: STAFF_RID });
  expect(mine.label).toBe(rest.name);
  for (const k of PRIVATE_KEYS) expect(mine).not.toHaveProperty(k);
  const store = await cRa.waitFor('context:store-changed', d => d.kind === 'granted');
  expect(store).toBeTruthy();
  for (const k of PRIVATE_KEYS) expect(store).not.toHaveProperty(k);
  expect(store).not.toHaveProperty('label');
  await new Promise(res => setTimeout(res, QUIET_MS));
  expect(cOther.got['context:store-changed']).toHaveLength(0);
  expect(cOther.got['context:changed']).toHaveLength(0);
  // 승인자 자신의 user 룸엔 안 간다(당사자만)
  expect(cRa.got['context:changed']).toHaveLength(0);
});

test('L3 승인 뒤 RA 목록 include_contexts=1 에 연결 계정 행', async () => {
  const r = await api('get', '/users?include_contexts=1').set(bearer(tRa));
  expect(r.status).toBe(200);
  const row = r.body.data.find(u => u.id === reqId);
  expect(row).toBeTruthy();
  expect(row.access_kind).toBe('context');
  expect(row.role).toBe('Staff');
  expect(row.restaurant_id).toBe(STAFF_RID);
  expect(row.permissions).toEqual(['access_pos']);
  expect(row.pin_code).toBeNull();
  expect(row.createdAt).toBeTruthy();
  expect(row).not.toHaveProperty('password');
  expect(typeof row.context_id).toBe('number');
  ctxId = row.context_id;
  // 네이티브 행엔 access_kind 를 붙이지 않는다(종전 shape)
  const native = r.body.data.find(u => u.id === raId);
  expect(native).toBeTruthy();
  expect(native).not.toHaveProperty('access_kind');
});

test('L4 플래그 없음 · 다른 매장 RA · BG 에는 그 행 없음 (BG 는 플래그 무시)', async () => {
  const plain = await api('get', '/users').set(bearer(tRa));
  expect(plain.status).toBe(200);
  expect(plain.body.data.find(u => u.id === reqId)).toBeFalsy();
  const oth = await api('get', '/users?include_contexts=1').set(bearer(tOther));
  expect(oth.status).toBe(200);
  expect(oth.body.data.find(u => u.id === reqId)).toBeFalsy();
  const bgA = await api('get', '/users').set(bearer(tBG));
  const bgB = await api('get', '/users?include_contexts=1').set(bearer(tBG));
  expect(bgB.status).toBe(bgA.status);
  expect(JSON.stringify(bgB.body)).toBe(JSON.stringify(bgA.body));
  // 역할 필터가 Staff 가 아니면 연결 계정 행도 빠진다
  const ra = await api('get', '/users?include_contexts=1&role=Restaurant%20Admin').set(bearer(tRa));
  expect(ra.body.data.find(u => u.id === reqId)).toBeFalsy();
});

test('L5 SA 회수 → 요청자 revoked · 매장 store-changed · 목록에서 빠짐', async () => {
  for (const c of [cReq, cRa, cOther]) c.clear();
  const r = await api('delete', `/users/${reqId}/contexts/${ctxId}`).set(bearer(tSA));
  expect(r.status).toBe(200);
  expect(await cReq.waitFor('context:changed', d => d.kind === 'revoked' && d.entity_id === STAFF_RID)).toBeTruthy();
  expect(await cRa.waitFor('context:store-changed', d => d.kind === 'revoked')).toBeTruthy();
  const list = await api('get', '/users?include_contexts=1').set(bearer(tRa));
  expect(list.body.data.find(u => u.id === reqId)).toBeFalsy();
  await new Promise(res => setTimeout(res, 300));
  expect(cOther.got['context:store-changed']).toHaveLength(0);
});

test('L6 거절 → 요청자 rejected + label · 매장 store-changed', async () => {
  const r = await sendRequest();
  expect(r.status).toBe(201);
  const id = r.body.data.id;
  for (const c of [cReq, cRa, cOther]) c.clear();
  const rj = await api('post', `/context-requests/${id}/reject`).set(bearer(tRa)).send({ note: 'no' });
  expect(rj.status).toBe(200);
  const hit = await cReq.waitFor('context:changed', d => d.kind === 'rejected' && d.request_id === id);
  expect(hit).toBeTruthy();
  expect(hit.label).toBeTruthy();
  expect(await cRa.waitFor('context:store-changed', d => d.kind === 'rejected' && d.request_id === id)).toBeTruthy();
});

test('L7 요청 취소 → 매장 request_cancelled · 없는 id 는 404 이고 신호 없음', async () => {
  const r = await sendRequest();
  expect(r.status).toBe(201);
  const id = r.body.data.id;
  for (const c of [cReq, cRa, cOther]) c.clear();
  const d = await api('delete', `/context-requests/${id}`).set(bearer(tReq));
  expect(d.status).toBe(200);
  expect(await cRa.waitFor('context:store-changed', x => x.kind === 'request_cancelled' && x.request_id === id)).toBeTruthy();
  cRa.clear();
  const d2 = await api('delete', `/context-requests/${id}`).set(bearer(tReq));
  expect(d2.status).toBe(404);
  await new Promise(res => setTimeout(res, 600));
  expect(cRa.got['context:store-changed']).toHaveLength(0);
});

test('L8 SA 직접 부여 → 요청자 granted', async () => {
  for (const c of [cReq, cRa, cOther]) c.clear();
  const r = await api('post', `/users/${reqId}/contexts`).set(bearer(tSA))
    .send({ entity_type: 'restaurant', entity_id: STAFF_RID, role: 'Staff', permissions: ['access_pos'] });
  expect(r.status).toBe(200);
  const hit = await cReq.waitFor('context:changed', d => d.kind === 'granted' && d.entity_id === STAFF_RID);
  expect(hit).toBeTruthy();
  expect(hit.label).toBeTruthy();
  expect(await cRa.waitFor('context:store-changed', d => d.kind === 'granted')).toBeTruthy();
});

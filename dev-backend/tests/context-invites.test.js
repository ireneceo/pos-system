/**
 * context-invites.test.js — 기존 계정을 매장 직원으로 «초대 → 본인 수락» (멀티 로그인 v1.4).
 * .claude/fable-design-20261016-link-existing-account-staff.md §8 ①~⑨.
 *
 * 계약:
 *   · POST /users 중복 400 은 기존 계정의 역할·매장 번호를 싣지 않는다 — code EMAIL_IN_USE(+RA 면 canInvite).
 *   · RA 초대 → 같은 표(initiator='grantor') · 응답에 대상 id/역할 없음 · 승인자 패널(받은 요청)엔 안 보임.
 *   · 수락은 본인만 · 초대자는 자기 초대를 «승인» 할 수 없다(셀프 부여 차단) · 좌석은 보낼 때·수락 때 둘 다.
 *   · RA 는 자기 매장 Staff 모자만 권한 수정·연결 해제(다른 매장 404).
 *
 * 고정물: 실행 중인 dev 서버(localhost:3001). demo 매장만(rid 7 · 6 — 다른 모자 시험과 겹치지 않게). 임시 is_test 사용자:
 *   r18 = RA of 7(초대자, 변수명은 그대로) · bm = Brand Manager brand 10(초대 대상 — Irene 사례 동형) · r39 = RA of 6(남의 매장).
 * afterAll: 요청 행 · user_contexts · 활동 기록 · 임시 사용자 · staff_limit 원복.
 */
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env'), quiet: true });
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { sequelize } = require('../config/database');
const { http } = require('./_helpers');

const RID = 7;   // KFC Sunway Pyramid (demo) — 다른 모자 시험(18·39·1)과 겹치지 않게(jest 병렬)
const OTHER_RID = 6; // Sunway Pyramid Foodcourt (demo)
const TAG = 'zzinv' + Date.now().toString(36);
const PW = 'Zz-inv-Test-9';

const q = async (s, r) => (await sequelize.query(s, r ? { replacements: r } : undefined))[0];
const bearer = (t) => ({ Authorization: `Bearer ${t}` });
const sign = (id, extra = {}) => jwt.sign({ userId: id, ...extra }, process.env.JWT_SECRET, { expiresIn: '10m' });
const api = (m, p) => http(m, `/api${p}`);

let r18, bm, r39, saId, bgId, demoRaId;
let tR18, tBm, tR39, tSA, tBG, tDemoRa;
let bmEmail, saEmail;
let origLimit, origLimit39;

async function mkUser(suffix, role, { rid = null, brandId = null, password = 'x' } = {}) {
  const [id] = await sequelize.query(
    `INSERT INTO users (username, email, password, role, restaurant_id, brand_id, full_name, is_active, email_verified, is_demo, is_test, createdAt, updatedAt)
     VALUES (?, ?, ?, ?, ?, ?, ?, 1, 1, 0, 1, NOW(), NOW())`,
    { replacements: [`${TAG}${suffix}`, `${TAG}${suffix}@example.com`, password, role, rid, brandId, `ZZ Inv ${suffix}`] }
  );
  return id;
}

const invite = (token, body) => api('post', '/context-requests/invite').set(bearer(token)).send(body);
const seats = async (rid) => Number((await q(
  `SELECT (SELECT COUNT(*) FROM users WHERE restaurant_id = :r AND role IN ('Staff','Restaurant Admin'))
        + (SELECT COUNT(*) FROM user_contexts WHERE entity_type='restaurant' AND entity_id = :r AND role IN ('Staff','Restaurant Admin')) AS s`,
  { r: rid }))[0].s);

beforeAll(async () => {
  r18 = await mkUser('r18', 'Restaurant Admin', { rid: RID });
  bm = await mkUser('bm', 'Brand Manager', { brandId: 10, password: await bcrypt.hash(PW, 10) });
  r39 = await mkUser('r39', 'Restaurant Admin', { rid: OTHER_RID });
  bmEmail = `${TAG}bm@example.com`;
  const [sa] = await q("SELECT id, email FROM users WHERE role='System Admin' AND is_active=1 ORDER BY id LIMIT 1");
  saId = sa.id; saEmail = sa.email;
  const [bg] = await q("SELECT id FROM users WHERE email='demo-brand@purplehere.com' LIMIT 1");
  bgId = bg.id;
  const [dra] = await q("SELECT id, restaurant_id FROM users WHERE email='demo-restaurant@purplehere.com' LIMIT 1");
  demoRaId = dra.id;
  tR18 = sign(r18, { role: 'Restaurant Admin', restaurant_id: RID });
  tBm = sign(bm, { role: 'Brand Manager' });
  tR39 = sign(r39, { role: 'Restaurant Admin', restaurant_id: OTHER_RID });
  tSA = sign(saId, { role: 'System Admin' });
  tBG = sign(bgId, { role: 'Brand General' });
  tDemoRa = sign(demoRaId, { role: 'Restaurant Admin', restaurant_id: dra.restaurant_id });
  [{ staff_limit: origLimit }] = await q('SELECT staff_limit FROM restaurants WHERE id = :id', { id: RID });
  [{ staff_limit: origLimit39 }] = await q('SELECT staff_limit FROM restaurants WHERE id = :id', { id: OTHER_RID });
  await q('UPDATE restaurants SET staff_limit = 999 WHERE id IN (:ids)', { ids: [RID, OTHER_RID] });
});

afterAll(async () => {
  const us = [r18, bm, r39].filter(Boolean);
  if (us.length) {
    await q('DELETE FROM user_context_requests WHERE user_id IN (:us) OR created_by IN (:us)', { us });
    await q('DELETE FROM user_contexts WHERE user_id IN (:us)', { us });
    await q('DELETE FROM activity_logs WHERE user_id IN (:us)', { us });
    await q('DELETE FROM activity_logs WHERE entity_type = :t AND entity_id IN (:us)', { t: 'user_context', us });
  }
  await q('UPDATE restaurants SET staff_limit = :l WHERE id = :id', { l: origLimit, id: RID });
  await q('UPDATE restaurants SET staff_limit = :l WHERE id = :id', { l: origLimit39, id: OTHER_RID });
  await q('DELETE FROM users WHERE username LIKE :p', { p: `${TAG}%` });
  await sequelize.close();
});

describe('① 중복 문구 — 역할·매장 번호 노출 없음', () => {
  test('RA 가 기존 BM 이메일로 Staff 생성 → 400 EMAIL_IN_USE + canInvite, 역할·매장 번호 없음', async () => {
    const r = await api('post', '/users').set(bearer(tR18))
      .send({ username: `${TAG}dup`, email: bmEmail, role: 'Staff', restaurant_id: RID, permissions: ['access_pos'] });
    expect(r.status).toBe(400);
    expect(r.body.code).toBe('EMAIL_IN_USE');
    expect(r.body.canInvite).toBe(true);
    const text = JSON.stringify(r.body);
    expect(text).not.toMatch(/Brand Manager/);
    expect(text).not.toMatch(/restaurant ID/i);
    expect(text).not.toMatch(/system user/i);
  });
  test('SA 가 RA 계정을 같은 이메일로 → EMAIL_IN_USE, canInvite 없음', async () => {
    const r = await api('post', '/users').set(bearer(tSA))
      .send({ username: `${TAG}dup2`, email: bmEmail, role: 'Restaurant Admin', restaurant_id: RID });
    expect(r.status).toBe(400);
    expect(r.body.code).toBe('EMAIL_IN_USE');
    expect(r.body.canInvite).toBeUndefined();
  });
  test('Staff ID 중복 → STAFF_ID_IN_USE, 매장 번호 없음', async () => {
    const id = `${TAG}sid`;
    const ok = await api('post', '/users').set(bearer(tR18))
      .send({ username: id, role: 'Staff', restaurant_id: RID, permissions: ['access_pos'] });
    expect(ok.status).toBe(201);
    const r = await api('post', '/users').set(bearer(tR18))
      .send({ username: id, role: 'Staff', restaurant_id: RID, permissions: ['access_pos'] });
    expect(r.status).toBe(400);
    expect(r.body.code).toBe('STAFF_ID_IN_USE');
    expect(JSON.stringify(r.body)).not.toMatch(/at restaurant ID/i);
    await q('DELETE FROM users WHERE username = :u', { u: `r${RID}:${id}` });
  });
});

let invId;
describe('② 초대 보내기', () => {
  test('RA → 201, 응답에 대상 id·역할 없음, 행은 grantor', async () => {
    const r = await invite(tR18, { email: bmEmail.toUpperCase(), permissions: ['access_pos'], message: '[확인용] invite' });
    expect(r.status).toBe(201);
    const keys = Object.keys(r.body.data);
    expect(keys).not.toContain('user_id');
    expect(keys).not.toContain('role');
    expect(JSON.stringify(r.body)).not.toMatch(/Brand Manager/);
    invId = r.body.data.id;
    const [row] = await q('SELECT * FROM user_context_requests WHERE id = :id', { id: invId });
    expect(row.initiator).toBe('grantor');
    expect(Number(row.created_by)).toBe(r18);
    expect(Number(row.user_id)).toBe(bm);
    expect(Number(row.entity_id)).toBe(RID);
    const perms = typeof row.permissions === 'string' ? JSON.parse(row.permissions) : row.permissions;
    expect(perms).toEqual(['access_pos']);
  });
  test('보낸 초대 1건 · 받은 요청 패널 0건 · 대기 수 0', async () => {
    const sent = await api('get', '/context-requests/sent').set(bearer(tR18));
    expect(sent.status).toBe(200);
    expect(sent.body.data.map(x => x.id)).toContain(invId);
    const recv = await api('get', '/context-requests').set(bearer(tR18));
    expect(recv.body.data.map(x => x.id)).not.toContain(invId);
    const cnt = await api('get', '/context-requests/pending-count').set(bearer(tR18));
    expect(cnt.body.data.count).toBe(0);
  });
});

describe('③ 거부 사유', () => {
  test('없는 이메일 404 · SA 400 · demo 400 · 본인 400 · 권한 0개 400 · 같은 대상 409', async () => {
    expect((await invite(tR18, { email: `${TAG}nobody@example.com`, permissions: ['access_pos'] })).status).toBe(404);
    expect((await invite(tR18, { email: saEmail, permissions: ['access_pos'] })).status).toBe(400);
    expect((await invite(tR18, { email: 'demo-brand@purplehere.com', permissions: ['access_pos'] })).status).toBe(400);
    expect((await invite(tR18, { email: `${TAG}r18@example.com`, permissions: ['access_pos'] })).status).toBe(400);
    expect((await invite(tR18, { email: bmEmail, permissions: [] })).status).toBe(400);
    expect((await invite(tR18, { email: bmEmail, permissions: ['access_pos'] })).status).toBe(409);
  });
  test('RA 는 body restaurant_id 를 무시하고 자기 매장으로', async () => {
    const r = await invite(tR39, { email: bmEmail, permissions: ['access_pos'], restaurant_id: RID });
    expect(r.status).toBe(201);
    const [row] = await q('SELECT entity_id FROM user_context_requests WHERE id = :id', { id: r.body.data.id });
    expect(Number(row.entity_id)).toBe(OTHER_RID);
    await q('DELETE FROM user_context_requests WHERE id = :id', { id: r.body.data.id });
  });
  test('demo RA 403 · BG 403 · 익명 401', async () => {
    expect((await invite(tDemoRa, { email: bmEmail, permissions: ['access_pos'] })).status).toBe(403);
    expect((await invite(tBG, { email: bmEmail, permissions: ['access_pos'] })).status).toBe(403);
    expect((await api('post', '/context-requests/invite').send({ email: bmEmail })).status).toBe(401);
  });
});

let ctxId;
describe('④ 수락', () => {
  test('로그인 응답·/auth/contexts 에 받은 초대 수 1', async () => {
    const login = await api('post', '/auth/login').send({ email: bmEmail, password: PW });
    expect(login.status).toBe(200);
    const body = login.body.data || login.body;
    expect(body.pending_invitations).toBe(1);
    const cx = await api('get', '/auth/contexts').set(bearer(tBm));
    expect(cx.body.data.pending_invitations).toBe(1);
  });
  test('/mine 의 meta.invitations 1건 · data 에는 없음', async () => {
    const r = await api('get', '/context-requests/mine').set(bearer(tBm));
    expect(r.status).toBe(200);
    expect(r.body.data.map(x => x.id)).not.toContain(invId);
    const inv = r.body.meta.invitations.find(x => x.id === invId);
    expect(inv).toBeTruthy();
    expect(inv.permissions).toEqual(['access_pos']);
    expect(inv.label).toBeTruthy();
  });
  test('받은 사람은 DELETE 로 초대를 지울 수 없다(거절은 /decline)', async () => {
    expect((await api('delete', `/context-requests/${invId}`).set(bearer(tBm))).status).toBe(404);
  });
  test('남의 매장 RA accept 404 · 초대자 approve 404(셀프 부여 차단)', async () => {
    expect((await api('post', `/context-requests/${invId}/accept`).set(bearer(tR39))).status).toBe(404);
    expect((await api('post', `/context-requests/${invId}/approve`).set(bearer(tR18)).send({ permissions: ['access_pos'] })).status).toBe(404);
    expect((await api('post', `/context-requests/${invId}/approve`).set(bearer(tSA)).send({ permissions: ['access_pos'] })).status).toBe(404);
  });
  test('본인 수락 → 200 · 모자 행(granted_by = 초대자) · 카드 · 초대 사라짐', async () => {
    const r = await api('post', `/context-requests/${invId}/accept`).set(bearer(tBm));
    expect(r.status).toBe(200);
    const [uc] = await q("SELECT * FROM user_contexts WHERE user_id = :u AND entity_type='restaurant' AND entity_id = :e AND role='Staff'", { u: bm, e: RID });
    expect(uc).toBeTruthy();
    expect(Number(uc.granted_by)).toBe(r18);
    ctxId = uc.id;
    const [row] = await q('SELECT status, decided_by FROM user_context_requests WHERE id = :id', { id: invId });
    expect(row.status).toBe('approved');
    expect(Number(row.decided_by)).toBe(bm);
    const cx = await api('get', '/auth/contexts').set(bearer(tBm));
    expect(cx.body.data.contexts.some(c => c.role === 'Staff' && Number(c.entity_id) === RID)).toBe(true);
    expect(cx.body.data.pending_invitations).toBe(0);
    expect((await api('post', `/context-requests/${invId}/accept`).set(bearer(tBm))).status).toBe(409);
  });
});

describe('⑤ 목록·관리', () => {
  test('RA include_contexts 에 연결 계정 · 플래그 없음/남의 매장엔 없음', async () => {
    const a = await api('get', '/users?include_contexts=1').set(bearer(tR18));
    const row = (a.body.data || a.body).find(u => Number(u.id) === bm);
    expect(row && row.access_kind).toBe('context');
    const b = await api('get', '/users').set(bearer(tR18));
    expect((b.body.data || b.body).some(u => Number(u.id) === bm)).toBe(false);
    const c = await api('get', '/users?include_contexts=1').set(bearer(tR39));
    expect((c.body.data || c.body).some(u => Number(u.id) === bm)).toBe(false);
  });
  test('RA 권한 수정 200 · 0개 400 · 남의 매장 RA 404 · BG 404', async () => {
    const ok = await api('put', `/users/${bm}/contexts/${ctxId}`).set(bearer(tR18)).send({ permissions: ['access_pos', 'access_kitchen'] });
    expect(ok.status).toBe(200);
    const [uc] = await q('SELECT permissions FROM user_contexts WHERE id = :id', { id: ctxId });
    const perms = typeof uc.permissions === 'string' ? JSON.parse(uc.permissions) : uc.permissions;
    expect(perms).toEqual(['access_pos', 'access_kitchen']);
    expect((await api('put', `/users/${bm}/contexts/${ctxId}`).set(bearer(tR18)).send({ permissions: [] })).status).toBe(400);
    expect((await api('put', `/users/${bm}/contexts/${ctxId}`).set(bearer(tR39)).send({ permissions: ['access_pos'] })).status).toBe(404);
    expect((await api('put', `/users/${bm}/contexts/${ctxId}`).set(bearer(tBG)).send({ permissions: ['access_pos'] })).status).toBe(404);
    expect((await api('put', `/users/${bm}/contexts/${ctxId}`).send({ permissions: ['access_pos'] })).status).toBe(401);
  });
  test('남의 매장 RA 해제 404 · RA 해제 200 → 다음 요청 폴백', async () => {
    expect((await api('delete', `/users/${bm}/contexts/${ctxId}`).set(bearer(tR39))).status).toBe(404);
    expect((await api('get', `/users/${bm}/contexts`).set(bearer(tR18))).status).toBe(403); // 조회는 SA 전용 그대로
    const sw = await api('post', '/auth/switch-context').set(bearer(tBm)).send({ entity_type: 'restaurant', entity_id: RID, role: 'Staff' });
    expect(sw.status).toBe(200);
    const hatToken = (sw.body.data || sw.body).token;
    const del = await api('delete', `/users/${bm}/contexts/${ctxId}`).set(bearer(tR18));
    expect(del.status).toBe(200);
    const after = await api('get', '/auth/contexts').set(bearer(hatToken));
    expect(after.headers['x-context-fallback']).toBe('revoked');
  });
});

describe('⑥ 거절·취소', () => {
  test('거절 → rejected · decided_by 본인 · 보낸 초대에서 사라짐', async () => {
    const r = await invite(tR18, { email: bmEmail, permissions: ['access_pos'] });
    expect(r.status).toBe(201);
    const d = await api('post', `/context-requests/${r.body.data.id}/decline`).set(bearer(tBm)).send({ note: 'not now' });
    expect(d.status).toBe(200);
    const [row] = await q('SELECT status, decided_by, decision_note FROM user_context_requests WHERE id = :id', { id: r.body.data.id });
    expect(row.status).toBe('rejected');
    expect(Number(row.decided_by)).toBe(bm);
    expect(row.decision_note).toBe('not now');
    const sent = await api('get', '/context-requests/sent').set(bearer(tR18));
    expect(sent.body.data.map(x => x.id)).not.toContain(r.body.data.id);
    const mine = await api('get', '/context-requests/mine').set(bearer(tBm));
    expect(mine.body.data.map(x => x.id)).not.toContain(r.body.data.id); // 거절한 초대는 «내 요청» 에 안 섞인다
  });
  test('취소 — 남의 매장 RA 404 · 초대자 200 · 받은 초대 0', async () => {
    const r = await invite(tR18, { email: bmEmail, permissions: ['access_pos'] });
    expect(r.status).toBe(201);
    expect((await api('delete', `/context-requests/${r.body.data.id}`).set(bearer(tR39))).status).toBe(404);
    expect((await api('delete', `/context-requests/${r.body.data.id}`).set(bearer(tR18))).status).toBe(200);
    const mine = await api('get', '/context-requests/mine').set(bearer(tBm));
    expect(mine.body.meta.invitations.length).toBe(0);
  });
});

describe('⑦ 방향 충돌', () => {
  test('요청이 와 있으면 초대 409 approve · 초대가 있으면 요청 409 accept', async () => {
    const req = await api('post', '/context-requests').set(bearer(tBm)).send({ entity_type: 'restaurant', entity_id: RID, role: 'Staff' });
    expect(req.status).toBe(201);
    const [rowReq] = await q('SELECT created_by, initiator FROM user_context_requests WHERE id = :id', { id: req.body.data.id });
    expect(Number(rowReq.created_by)).toBe(bm);
    expect(rowReq.initiator).toBe('requester');
    const inv = await invite(tR18, { email: bmEmail, permissions: ['access_pos'] });
    expect(inv.status).toBe(409);
    expect(inv.body.message).toMatch(/approve it instead/);
    await api('delete', `/context-requests/${req.body.data.id}`).set(bearer(tBm));

    const inv2 = await invite(tR18, { email: bmEmail, permissions: ['access_pos'] });
    expect(inv2.status).toBe(201);
    const req2 = await api('post', '/context-requests').set(bearer(tBm)).send({ entity_type: 'restaurant', entity_id: RID, role: 'Staff' });
    expect(req2.status).toBe(409);
    expect(req2.body.message).toMatch(/accept it instead/);
    await api('delete', `/context-requests/${inv2.body.data.id}`).set(bearer(tR18));
  });
});

describe('⑧ 좌석', () => {
  test('보낼 때 가득이면 403 · 수락 때 가득이면 403(본검사)', async () => {
    const full = await seats(RID);
    await q('UPDATE restaurants SET staff_limit = :l WHERE id = :id', { l: full, id: RID });
    const r1 = await invite(tR18, { email: bmEmail, permissions: ['access_pos'] });
    expect(r1.status).toBe(403);
    expect(r1.body.message).toMatch(/Staff limit reached/);

    await q('UPDATE restaurants SET staff_limit = 999 WHERE id = :id', { id: RID });
    const r2 = await invite(tR18, { email: bmEmail, permissions: ['access_pos'] });
    expect(r2.status).toBe(201);
    await q('UPDATE restaurants SET staff_limit = :l WHERE id = :id', { l: await seats(RID), id: RID });
    const a1 = await api('post', `/context-requests/${r2.body.data.id}/accept`).set(bearer(tBm));
    expect(a1.status).toBe(403);
    await q('UPDATE restaurants SET staff_limit = 999 WHERE id = :id', { id: RID });
    const a2 = await api('post', `/context-requests/${r2.body.data.id}/accept`).set(bearer(tBm));
    expect(a2.status).toBe(200);
  });
});

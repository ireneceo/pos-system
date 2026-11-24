/**
 * brand-manager-invite.test.js — 브랜드 주인(BG)이 기존 계정을 «연결된 브랜드 매니저» 로 초대 → 본인 수락 (2026-11-24).
 * .claude/fable-design-20261124-brand-manager-invite.md §5 사례 1~9 (10 = 기존 context-invites·context-requests 테스트).
 *
 * 고정물: 실행 중인 dev 서버(localhost:3001). 임시 is_test 사용자·임시 브랜드만(데모 계정은 초대 금지라 못 씀).
 *   bg = 임시 Brand General(브랜드 A·B 주인) · bg2 = 다른 임시 BG(브랜드 C 주인) · tgt = 초대 대상(RA of 27 — 다른 시험이 안 쓰는 데모 매장)
 *   · tgt2 = 두 번째 대상 · bmNative = 브랜드 A 소속 일반 BM.
 *   브랜드 S = id 24 로 만든다 — 같은 번호의 데모 매장 24 를 직원 한도 «가득» 으로 두고 좌석 가드(사례 6)를 본다.
 * afterAll: 요청 행 · user_contexts · 활동 기록 · 임시 브랜드 · 임시 사용자 · 매장 24 staff_limit 원복.
 */
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env'), quiet: true });
const jwt = require('jsonwebtoken');
const { sequelize } = require('../config/database');
const { http } = require('./_helpers');

const SEAT_RID = 24; // test under brandmanager (demo) — 브랜드 S 와 같은 번호
const OWN_RID = 27;  // Owner Test Restaurant (demo) — 다른 모자 시험(7·6·18·39·1)과 겹치지 않게(jest 병렬)
const TAG = 'zzbmi' + Date.now().toString(36);

const q = async (s, r) => (await sequelize.query(s, r ? { replacements: r } : undefined))[0];
const bearer = (t) => ({ Authorization: `Bearer ${t}` });
const sign = (id, extra = {}) => jwt.sign({ userId: id, ...extra }, process.env.JWT_SECRET, { expiresIn: '10m' });
const api = (m, p) => http(m, `/api${p}`);

let bg, bg2, tgt, tgt2, bmNative, raOther, saId;
let tBG, tBG2, tTgt, tTgt2, tBm, tRa, tSA;
let brandA, brandB, brandC, brandS, seatFiller = null;
let origSeatLimit, brandSCreated = false;
const tgtEmail = () => `${TAG}tgt@example.com`;
const tgt2Email = () => `${TAG}tgt2@example.com`;

async function mkUser(suffix, role, { rid = null, brandId = null } = {}) {
  const [id] = await sequelize.query(
    `INSERT INTO users (username, email, password, role, restaurant_id, brand_id, full_name, is_active, email_verified, is_demo, is_test, createdAt, updatedAt)
     VALUES (?, ?, 'x', ?, ?, ?, ?, 1, 1, 0, 1, NOW(), NOW())`,
    { replacements: [`${TAG}${suffix}`, `${TAG}${suffix}@example.com`, role, rid, brandId, `ZZ BMI ${suffix}`] }
  );
  return id;
}
async function mkBrand(name, ownerId, id = null) {
  const [newId] = await sequelize.query(
    `INSERT INTO brands (${id ? 'id, ' : ''}name, owner_id, created_at, updated_at) VALUES (${id ? '?, ' : ''}?, ?, NOW(), NOW())`,
    { replacements: id ? [id, name, ownerId] : [name, ownerId] }
  );
  return id || newId;
}
const inviteBM = (token, body) => api('post', '/context-requests/invite/brand-manager').set(bearer(token)).send(body);
const pending = async (uid, bid) => q(
  `SELECT id, permissions, created_by FROM user_context_requests
    WHERE user_id = :u AND entity_type = 'brand' AND entity_id = :b AND role = 'Brand Manager' AND status = 'pending'`,
  { u: uid, b: bid });
const hat = async (uid, bid) => (await q(
  `SELECT id, permissions FROM user_contexts WHERE user_id = :u AND entity_type = 'brand' AND entity_id = :b AND role = 'Brand Manager'`,
  { u: uid, b: bid }))[0] || null;
const parse = (v) => (typeof v === 'string' ? JSON.parse(v) : v);
const PERMS = ['products', 'operations', 'reports'];

beforeAll(async () => {
  bg = await mkUser('bg', 'Brand General');
  bg2 = await mkUser('bg2', 'Brand General');
  tgt = await mkUser('tgt', 'Restaurant Admin', { rid: OWN_RID });
  tgt2 = await mkUser('tgt2', 'Restaurant Admin', { rid: OWN_RID });
  raOther = await mkUser('ra', 'Restaurant Admin', { rid: OWN_RID });
  brandA = await mkBrand(`${TAG} Brand A`, bg);
  brandB = await mkBrand(`${TAG} Brand B`, bg);
  brandC = await mkBrand(`${TAG} Brand C`, bg2);
  // 브랜드 S = 매장 24 와 같은 번호(없을 때만 만든다 — 이미 있으면 사례 6 은 건너뛴다)
  const [exists] = await q('SELECT id FROM brands WHERE id = :id', { id: SEAT_RID });
  if (!exists) { brandS = await mkBrand(`${TAG} Brand S`, bg, SEAT_RID); brandSCreated = true; }
  await q('UPDATE brands SET owner_id = owner_id WHERE id = :a', { a: brandA });
  await q('UPDATE users SET brand_id = :b WHERE id IN (:ids)', { b: brandA, ids: [bg] });
  await q('UPDATE users SET brand_id = :b WHERE id = :id', { b: brandC, id: bg2 });
  bmNative = await mkUser('bm', 'Brand Manager', { brandId: brandA });
  const [sa] = await q("SELECT id FROM users WHERE role='System Admin' AND is_active=1 ORDER BY id LIMIT 1");
  saId = sa.id;
  tBG = sign(bg, { role: 'Brand General' });
  tBG2 = sign(bg2, { role: 'Brand General' });
  tTgt = sign(tgt, { role: 'Restaurant Admin', restaurant_id: OWN_RID });
  tTgt2 = sign(tgt2, { role: 'Restaurant Admin', restaurant_id: OWN_RID });
  tBm = sign(bmNative, { role: 'Brand Manager' });
  tRa = sign(raOther, { role: 'Restaurant Admin', restaurant_id: OWN_RID });
  tSA = sign(saId, { role: 'System Admin' });
  [{ staff_limit: origSeatLimit }] = await q('SELECT staff_limit FROM restaurants WHERE id = :id', { id: SEAT_RID });
});

afterAll(async () => {
  const us = [bg, bg2, tgt, tgt2, bmNative, raOther, seatFiller].filter(Boolean);
  const bs = [brandA, brandB, brandC, brandSCreated ? brandS : null].filter(Boolean);
  if (us.length) {
    await q('DELETE FROM user_context_requests WHERE user_id IN (:us) OR created_by IN (:us)', { us });
    await q('DELETE FROM user_contexts WHERE user_id IN (:us)', { us });
    await q('DELETE FROM activity_logs WHERE user_id IN (:us)', { us });
    await q('DELETE FROM activity_logs WHERE entity_type = :t AND entity_id IN (:us)', { t: 'user_context', us });
  }
  if (bs.length) {
    await q("DELETE FROM user_context_requests WHERE entity_type = 'brand' AND entity_id IN (:bs)", { bs });
    await q("DELETE FROM user_contexts WHERE entity_type = 'brand' AND entity_id IN (:bs)", { bs });
    await q('DELETE FROM manager_brand_scopes WHERE brand_id IN (:bs)', { bs }).catch(() => {});
    await q('DELETE FROM brands WHERE id IN (:bs)', { bs });
  }
  await q('UPDATE restaurants SET staff_limit = :l WHERE id = :id', { l: origSeatLimit, id: SEAT_RID });
  await q('DELETE FROM users WHERE username LIKE :p', { p: `${TAG}%` });
  await sequelize.close();
});

describe('① 주인이 브랜드 2개로 초대', () => {
  test('201 · 행 2 · 권한 정규화 저장 · 응답에 대상 id·역할 없음', async () => {
    const r = await inviteBM(tBG, { email: tgtEmail(), brand_ids: [brandA, brandB], permissions: PERMS, message: 'hi' });
    expect(r.body.message + " " + r.status).toBe("Invitation sent 201");
    expect(r.body.data.results.map(x => x.status)).toEqual(['invited', 'invited']);
    const text = JSON.stringify(r.body);
    expect(text).not.toMatch(new RegExp(`"user_id"|"role"|Restaurant Admin`));
    for (const b of [brandA, brandB]) {
      const rows = await pending(tgt, b);
      expect(rows).toHaveLength(1);
      expect(parse(rows[0].permissions)).toEqual(['dashboard', ...PERMS]);
      expect(Number(rows[0].created_by)).toBe(bg);
    }
  });
  test('보낸 초대(/sent) — 주인에겐 보이고 다른 BG 에겐 안 보임', async () => {
    const mine = await api('get', '/context-requests/sent').set(bearer(tBG));
    expect(mine.status).toBe(200);
    expect(mine.body.data.filter(x => x.email === tgtEmail()).map(x => x.entity_id).sort()).toEqual([brandA, brandB].sort());
    const other = await api('get', '/context-requests/sent').set(bearer(tBG2));
    expect(other.status).toBe(200);
    expect(other.body.data.filter(x => x.email === tgtEmail())).toHaveLength(0);
  });
  test('대상의 받은 초대 목록에 브랜드 2건', async () => {
    const r = await api('get', '/context-requests/mine').set(bearer(tTgt));
    expect(r.status).toBe(200);
    const inv = (r.body.meta && r.body.meta.invitations) || [];
    expect(inv.filter(x => x.entity_type === 'brand').length).toBe(2);
  });
});

describe('② 수락 → 모자 생성 · 고른 권한 · 주인 목록에 linked', () => {
  test('본인 수락 → user_contexts 행 · 권한 = 고른 값', async () => {
    const [row] = await pending(tgt, brandA);
    const r = await api('post', `/context-requests/${row.id}/accept`).set(bearer(tTgt));
    expect(r.status).toBe(200);
    const h = await hat(tgt, brandA);
    expect(h).not.toBeNull();
    expect(parse(h.permissions)).toEqual(['dashboard', ...PERMS]);
  });
  test('주인 매니저 목록에 linked 행', async () => {
    const r = await api('get', `/brands/${brandA}/staff`).set(bearer(tBG));
    expect(r.status).toBe(200);
    const linked = r.body.data.find(x => x.linked && x.id === tgt);
    expect(linked).toBeTruthy();
  });
  test('남이 수락 시도 → 404', async () => {
    const [row] = await pending(tgt, brandB);
    const r = await api('post', `/context-requests/${row.id}/accept`).set(bearer(tTgt2));
    expect(r.status).toBe(404);
  });
});

describe('③ 남의 브랜드가 섞이면 전체 404 · 행 0', () => {
  test('A + C(남의 것) → 404 · tgt2 행 0', async () => {
    const r = await inviteBM(tBG, { email: tgt2Email(), brand_ids: [brandA, brandC], permissions: PERMS });
    expect(r.status).toBe(404);
    expect(await pending(tgt2, brandA)).toHaveLength(0);
    expect(await pending(tgt2, brandC)).toHaveLength(0);
  });
  test('없는 브랜드 → 404', async () => {
    const r = await inviteBM(tBG, { email: tgt2Email(), brand_ids: [99999999], permissions: PERMS });
    expect(r.status).toBe(404);
  });
});

describe('④ 초대할 수 없는 사람', () => {
  test('일반 BM · RA → 403 · 익명 → 401', async () => {
    expect((await inviteBM(tBm, { email: tgt2Email(), brand_ids: [brandA], permissions: PERMS })).status).toBe(403);
    expect((await inviteBM(tRa, { email: tgt2Email(), brand_ids: [brandA], permissions: PERMS })).status).toBe(403);
    const anon = await api('post', '/context-requests/invite/brand-manager').send({});
    expect(anon.status).toBe(401);
  });
  test('권한 없음·잘못된 키 → 400 · 이메일 없음 → 404', async () => {
    expect((await inviteBM(tBG, { email: tgt2Email(), brand_ids: [brandA] })).status).toBe(400);
    expect((await inviteBM(tBG, { email: tgt2Email(), brand_ids: [brandA], permissions: ['plans_payments_x'] })).status).toBe(400);
    expect((await inviteBM(tBG, { email: `${TAG}none@example.com`, brand_ids: [brandA], permissions: PERMS })).status).toBe(404);
  });
});

describe('⑤ 주인이 자기 초대를 승인할 수 없다', () => {
  test('BG approve → 403/404 · 모자 안 생김', async () => {
    const [row] = await pending(tgt, brandB);
    const r = await api('post', `/context-requests/${row.id}/approve`).set(bearer(tBG));
    expect([403, 404]).toContain(r.status);
    expect(await hat(tgt, brandB)).toBeNull();
  });
});

describe('⑥ 같은 번호 매장이 직원 한도 가득이어도 브랜드 수락은 성공', () => {
  test('매장 24 가득 → 브랜드 24 초대 수락 200', async () => {
    if (!brandSCreated) return; // 브랜드 24 가 이미 있으면 이 사례는 건너뜀
    const cur = Number((await q(
      `SELECT (SELECT COUNT(*) FROM users WHERE restaurant_id = :r AND role IN ('Staff','Restaurant Admin'))
            + (SELECT COUNT(*) FROM user_contexts WHERE entity_type='restaurant' AND entity_id = :r AND role IN ('Staff','Restaurant Admin')) AS s`,
      { r: SEAT_RID }))[0].s);
    if (cur === 0) { seatFiller = await mkUser('seat', 'Staff', { rid: SEAT_RID }); }
    await q('UPDATE restaurants SET staff_limit = :l WHERE id = :id', { l: Math.max(cur, 1), id: SEAT_RID });
    const s = await inviteBM(tBG, { email: tgt2Email(), brand_ids: [brandS], permissions: PERMS });
    expect(s.status).toBe(201);
    const [row] = await pending(tgt2, brandS);
    const r = await api('post', `/context-requests/${row.id}/accept`).set(bearer(tTgt2));
    expect(r.status).toBe(200);
    expect(await hat(tgt2, brandS)).not.toBeNull();
  });
});

describe('⑦ 초대 뒤 주인이 바뀌면 수락 409', () => {
  test('브랜드 B 주인 → bg2 · 수락 409 · 모자 0 · 원복', async () => {
    const [row] = await pending(tgt, brandB);
    await q('UPDATE brands SET owner_id = :o WHERE id = :b', { o: bg2, b: brandB });
    try {
      const r = await api('post', `/context-requests/${row.id}/accept`).set(bearer(tTgt));
      expect(r.status).toBe(409);
      expect(await hat(tgt, brandB)).toBeNull();
      // 새 주인은 그 초대를 취소할 수 있다
      const c = await api('delete', `/context-requests/${row.id}`).set(bearer(tBG2));
      expect(c.status).toBe(200);
    } finally {
      await q('UPDATE brands SET owner_id = :o WHERE id = :b', { o: bg, b: brandB });
    }
  });
});

describe('⑧ 떼기 — 주인만 자기 브랜드 BM 모자', () => {
  test('다른 BG → 404 · 주인 → 200', async () => {
    const h = await hat(tgt, brandA);
    const other = await api('delete', `/users/${tgt}/contexts/${h.id}`).set(bearer(tBG2));
    expect(other.status).toBe(404);
    const own = await api('delete', `/users/${tgt}/contexts/${h.id}`).set(bearer(tBG));
    expect(own.status).toBe(200);
    expect(await hat(tgt, brandA)).toBeNull();
  });
  test('주인이 매장 모자(Staff) DELETE → 404', async () => {
    const [ins] = await sequelize.query(
      `INSERT INTO user_contexts (user_id, entity_type, entity_id, role, permissions, granted_by, created_at, updated_at)
       VALUES (?, 'restaurant', 7, 'Staff', '["access_pos"]', ?, NOW(), NOW())`, { replacements: [tgt2, saId] });
    const r = await api('delete', `/users/${tgt2}/contexts/${ins}`).set(bearer(tBG));
    expect(r.status).toBe(404);
    const [[still]] = await sequelize.query('SELECT id FROM user_contexts WHERE id = ?', { replacements: [ins] });
    expect(still).toBeTruthy();
  });
});

describe('⑨ 이미 가진·대기 중 브랜드는 건너뜀', () => {
  test('주인 본인 · 소속 BM · 대기 중 → 그 브랜드만 skipped', async () => {
    // bmNative 는 브랜드 A 소속 → A 건너뜀, B 는 초대
    const r = await inviteBM(tBG, { email: `${TAG}bm@example.com`, brand_ids: [brandA, brandB], permissions: PERMS });
    expect(r.status).toBe(201);
    expect(r.body.data.results.map(x => x.status)).toEqual(['skipped', 'invited']);
    // 같은 대상·브랜드 B 다시 → 전부 건너뜀 → 400
    const again = await inviteBM(tBG, { email: `${TAG}bm@example.com`, brand_ids: [brandB], permissions: PERMS });
    expect(again.status).toBe(400);
    // 자기 자신 → 400
    const self = await inviteBM(tBG, { email: `${TAG}bg@example.com`, brand_ids: [brandA], permissions: PERMS });
    expect(self.status).toBe(400);
  });
  test('브랜드 매니저 화면 새 계정 만들기 — 이메일 겹침이면 code EMAIL_IN_USE', async () => {
    const r = await api('post', `/brands/${brandA}/staff`).set(bearer(tBG))
      .send({ username: `${TAG}newbm`, email: tgtEmail(), full_name: 'x' });
    expect(r.status).toBe(400);
    expect(r.body.code).toBe('EMAIL_IN_USE');
    const u = await api('post', `/brands/${brandA}/staff`).set(bearer(tBG))
      .send({ username: `${TAG}tgt`, email: `${TAG}fresh@example.com`, full_name: 'x' });
    expect(u.status).toBe(400);
    expect(u.body.code).toBeUndefined();
  });
});

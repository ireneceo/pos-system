/**
 * context-requests.test.js — 역할 추가 요청 (멀티 로그인 v1.3).
 * .claude/fable-design-20261005-context-request.md §8 ①~⑫.
 *
 * 계약:
 *   · 요청은 부여가 아니다 — 승인만이 services/userContexts.grantContext 를 부른다.
 *   · 승인 주체: Staff 요청 = 그 매장 RA(+SA) · RA·오너·BM 요청 = SA 만. 범위 밖은 404(존재를 흘리지 않음).
 *   · Staff 모자 권한은 승인자가 고른다(1개 이상, 허용 키만) → 투영 req.user.permissions 로 나간다.
 *   · 같은 매장에 매장 모자(RA·Staff) 두 장 금지 · staff_limit 좌석 = 사용자 + 모자(생성 경로와 같은 함수).
 *
 * 고정물: demo 매장만(rid 18 · 39 · 브랜드 10·17). 요청자는 demo 면 403 이라 임시 is_test 사용자 2명을 만든다.
 *   u1 = RA of rid 39 (요청자) · u2 = RA of rid 18 (Staff 요청 승인자).
 * afterAll: 요청 행 · user_contexts · 소유행 · 임시 사용자 전량 삭제 · staff_limit 원복.
 */
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env'), quiet: true });
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const { sequelize } = require('../config/database');
const { http } = require('./_helpers');
const userContexts = require('../services/userContexts');

const STAFF_RID = 18;   // Test Debug Restaurant (demo)
const U1_RID = 39;      // Gangnam Noodle House (demo) — u1 의 네이티브 매장
const BRAND_A = 17;     // K-Dine (owner 22)
const BRAND_B = 10;     // K-Taste Group (owner 22)
const TAG = 'zzctxreq' + Date.now().toString(36);

const q = async (s, r) => (await sequelize.query(s, r ? { replacements: r } : undefined))[0];
const sign = (id) => jwt.sign({ userId: id }, process.env.JWT_SECRET, { expiresIn: '10m' });
const bearer = (t) => ({ Authorization: `Bearer ${t}` });

let u1, u2, saId, demoBgId, nativeOwnerId;
let t1, t2, tSA, tBG;
let origStaffLimit;
const ids = {};

async function mkUser(suffix, rid) {
  const [id] = await sequelize.query(
    `INSERT INTO users (username, email, password, role, restaurant_id, full_name, is_active, email_verified, is_demo, is_test, createdAt, updatedAt)
     VALUES (?, ?, 'x', 'Restaurant Admin', ?, ?, 1, 1, 0, 1, NOW(), NOW())`,
    { replacements: [`${TAG}${suffix}`, `${TAG}${suffix}@purplehere.com`, rid, `ZZ Ctx ${suffix}`] }
  );
  return id;
}

const post = (p, body, auth) => http('post', `/api/context-requests${p}`).set(auth).send(body || {});
const get = (p, auth) => http('get', `/api/context-requests${p}`).set(auth);
const del = (p, auth) => http('delete', `/api/context-requests${p}`).set(auth);

beforeAll(async () => {
  u1 = await mkUser('u1', U1_RID);
  u2 = await mkUser('u2', STAFF_RID);
  const [sa] = await q("SELECT id FROM users WHERE role='System Admin' AND is_active=1 ORDER BY id LIMIT 1");
  saId = sa.id;
  const [bg] = await q("SELECT id FROM users WHERE email='demo-brand@purplehere.com' LIMIT 1");
  demoBgId = bg.id;
  const [own] = await q("SELECT id FROM users WHERE email='owner@purplehere.com' AND role='Restaurant Owner' LIMIT 1");
  nativeOwnerId = own ? own.id : null;
  t1 = sign(u1); t2 = sign(u2); tSA = sign(saId); tBG = sign(demoBgId);
  const [r] = await q('SELECT staff_limit FROM restaurants WHERE id = :id', { id: STAFF_RID });
  origStaffLimit = r.staff_limit;
});

afterAll(async () => {
  const us = [u1, u2].filter(Boolean);
  if (us.length) {
    await q('DELETE FROM user_context_requests WHERE user_id IN (:us)', { us });
    await q('DELETE FROM user_contexts WHERE user_id IN (:us)', { us });
    await q("DELETE FROM restaurant_managers WHERE manager_id IN (:us)", { us });
  }
  if (nativeOwnerId) await q('DELETE FROM user_context_requests WHERE user_id = :u', { u: nativeOwnerId });
  await q('UPDATE restaurants SET staff_limit = :l WHERE id = :id', { l: origStaffLimit, id: STAFF_RID });
  // 임시 사용자가 행위자인 활동 기록(승인·생성 시도) — FK 라 사용자보다 먼저 지운다
  if (us.length) await q('DELETE FROM activity_logs WHERE user_id IN (:us)', { us });
  await q('DELETE FROM users WHERE username LIKE :p', { p: `${TAG}%` });
  await q('DELETE FROM users WHERE username LIKE :p', { p: `r${STAFF_RID}:${TAG}%` });
  await sequelize.close();
});

describe('① 요청 → SA 에게 보임', () => {
  test('u1 brand 17 × BM 요청 201 · /mine 1건 · SA 목록 · 대기수', async () => {
    const r = await post('', { entity_type: 'brand', entity_id: BRAND_A, role: 'Brand Manager', message: 'hi <b>x</b>' }, bearer(t1));
    expect(r.status).toBe(201);
    ids.bm = r.body.data.id;
    const mine = await get('/mine', bearer(t1));
    expect(mine.status).toBe(200);
    expect(mine.body.data.filter(x => x.id === ids.bm)).toHaveLength(1);
    expect(mine.body.data[0].label).toBe('K-Dine');
    expect(mine.body.data[0].message).toBe('hi bx/b'); // sanitizeString 은 <> 만 제거
    const list = await get('', bearer(tSA));
    expect(list.status).toBe(200);
    expect(list.body.data.some(x => x.id === ids.bm && x.requester.id === u1)).toBe(true);
    const pc = await get('/pending-count', bearer(tSA));
    expect(pc.body.data.count).toBeGreaterThanOrEqual(1);
  });
});

describe('② 거부 경로', () => {
  test('중복 409 · 비허용 조합 400 · 지수표기 400 · 없는 매장 404 · 6번째 pending 400', async () => {
    expect((await post('', { entity_type: 'brand', entity_id: BRAND_A, role: 'Brand Manager' }, bearer(t1))).status).toBe(409);
    expect((await post('', { entity_type: 'brand', entity_id: BRAND_A, role: 'Brand General' }, bearer(t1))).status).toBe(400);
    expect((await post('', { entity_type: 'restaurant', entity_id: '1.16e2', role: 'Restaurant Admin' }, bearer(t1))).status).toBe(400);
    expect((await post('', { entity_type: 'restaurant', entity_id: 99999999, role: 'Restaurant Admin' }, bearer(t1))).status).toBe(404);
    // 채우기 4건(직접 INSERT — 조합만 맞으면 된다) → pending 5 → 6번째 400
    for (const rid of [1, 2, 3, 4]) {
      await q(`INSERT INTO user_context_requests (user_id, entity_type, entity_id, role, status, created_at, updated_at)
               VALUES (:u, 'restaurant', :e, 'Restaurant Admin', 'pending', NOW(), NOW())`, { u: u1, e: rid });
    }
    const r6 = await post('', { entity_type: 'brand', entity_id: BRAND_B, role: 'Brand Manager' }, bearer(t1));
    expect(r6.status).toBe(400);
    await q(`DELETE FROM user_context_requests WHERE user_id = :u AND entity_type = 'restaurant' AND entity_id IN (1,2,3,4)`, { u: u1 });
  });
});

describe('③ 이미 가진 자격 · demo', () => {
  test('u1 자기 매장 RA 400 · demo BG 요청 403 · BG 22 의 자기 브랜드 BM 은 함수 레벨 400', async () => {
    const own = await post('', { entity_type: 'restaurant', entity_id: U1_RID, role: 'Restaurant Admin' }, bearer(t1));
    expect(own.status).toBe(400);
    expect(own.body.message).toBe('User already belongs to this restaurant');
    expect((await post('', { entity_type: 'brand', entity_id: BRAND_A, role: 'Brand Manager' }, bearer(tBG))).status).toBe(403);
    const [bgRow] = await q('SELECT * FROM users WHERE id = :id', { id: demoBgId });
    const brand = await userContexts.loadGrantEntity('brand', BRAND_B);
    const held = await userContexts.alreadyHoldsContext(bgRow, { entity_type: 'brand', entity_id: BRAND_B, role: 'Brand Manager' }, brand);
    expect(held && held.status).toBe(400);
  });
});

describe('④ SA 승인 → 카드', () => {
  test('approve 200 · user_contexts(permissions NULL) · 카드 · /mine 에서 사라짐', async () => {
    const r = await post(`/${ids.bm}/approve`, {}, bearer(tSA));
    expect(r.status).toBe(200);
    const [row] = await q("SELECT permissions FROM user_contexts WHERE user_id=:u AND entity_type='brand' AND entity_id=:e AND role='Brand Manager'", { u: u1, e: BRAND_A });
    expect(row).toBeTruthy();
    expect(row.permissions).toBeNull();
    const [req] = await q('SELECT status, decided_by, decided_at FROM user_context_requests WHERE id=:id', { id: ids.bm });
    expect(req.status).toBe('approved');
    expect(req.decided_by).toBe(saId);
    const ctx = await http('get', '/api/auth/contexts').set(bearer(t1));
    expect(ctx.body.data.contexts.some(c => c.entity_type === 'brand' && c.entity_id === BRAND_A && c.label === 'K-Dine')).toBe(true);
    const mine = await get('/mine', bearer(t1));
    expect(mine.body.data.some(x => x.id === ids.bm)).toBe(false);
  });
});

describe('⑤ 재승인 409 · 거절 · 취소', () => {
  test('approve 다시 409 · reject + note · DELETE 200 → 404 · 남의 행 404', async () => {
    expect((await post(`/${ids.bm}/approve`, {}, bearer(tSA))).status).toBe(409);
    const r = await post('', { entity_type: 'brand', entity_id: BRAND_B, role: 'Brand Manager' }, bearer(t1));
    expect(r.status).toBe(201);
    const rid = r.body.data.id;
    const rj = await post(`/${rid}/reject`, { note: 'not now' }, bearer(tSA));
    expect(rj.status).toBe(200);
    const mine = await get('/mine', bearer(t1));
    const row = mine.body.data.find(x => x.id === rid);
    expect(row.status).toBe('rejected');
    expect(row.decision_note).toBe('not now');
    expect((await del(`/${rid}`, bearer(t2))).status).toBe(404); // 남의 행
    expect((await del(`/${rid}`, bearer(t1))).status).toBe(200);
    expect((await del(`/${rid}`, bearer(t1))).status).toBe(404);
    expect((await del(`/${ids.bm}`, bearer(t1))).status).toBe(404); // approved 는 못 지운다
  });
});

describe('⑥ Staff 흐름 — 매장 RA 승인 · 권한 투영', () => {
  let staffToken;
  test('요청 201 · u2(그 매장 RA)·SA 에 보임 · 다른 매장 RA 엔 0건', async () => {
    const r = await post('', { entity_type: 'restaurant', entity_id: STAFF_RID, role: 'Staff', message: 'staff pls' }, bearer(t1));
    expect(r.status).toBe(201);
    ids.staff = r.body.data.id;
    const l2 = await get('', bearer(t2));
    expect(l2.status).toBe(200);
    expect(l2.body.data.map(x => x.id)).toEqual(expect.arrayContaining([ids.staff]));
    expect(l2.body.data.every(x => x.role === 'Staff' && x.entity_id === STAFF_RID)).toBe(true);
    expect((await get('/pending-count', bearer(t2))).body.data.count).toBe(1);
    const lsa = await get('', bearer(tSA));
    expect(lsa.body.data.some(x => x.id === ids.staff)).toBe(true);
    const l1 = await get('', bearer(t1)); // u1 = rid 39 의 RA
    expect(l1.status).toBe(200);
    expect(l1.body.data).toHaveLength(0);
  });

  test('권한 [] 400 · 모르는 키 400 · 두 키 200 · 행에 저장', async () => {
    expect((await post(`/${ids.staff}/approve`, { permissions: [] }, bearer(t2))).status).toBe(400);
    expect((await post(`/${ids.staff}/approve`, { permissions: ['access_pos', 'bogus'] }, bearer(t2))).status).toBe(400);
    const [still] = await q('SELECT status FROM user_context_requests WHERE id=:id', { id: ids.staff });
    expect(still.status).toBe('pending');
    const ok = await post(`/${ids.staff}/approve`, { permissions: ['access_pos', 'menu_management'] }, bearer(t2));
    expect(ok.status).toBe(200);
    const [row] = await q("SELECT permissions FROM user_contexts WHERE user_id=:u AND entity_type='restaurant' AND entity_id=:e AND role='Staff'", { u: u1, e: STAFF_RID });
    expect(userContexts.parsePermissions(row.permissions)).toEqual(['access_pos', 'menu_management']);
  });

  test('카드 ▦ Staff · switch-context permissions · /me · 매장 라우트 18 200 / 39 403', async () => {
    const ctx = await http('get', '/api/auth/contexts').set(bearer(t1));
    const card = ctx.body.data.contexts.find(c => c.entity_type === 'restaurant' && c.entity_id === STAFF_RID);
    expect(card).toBeTruthy();
    expect(card.role).toBe('Staff');
    expect(card.label).toBe('Test Debug Restaurant');
    const sw = await http('post', '/api/auth/switch-context').set(bearer(t1))
      .send({ entity_type: 'restaurant', entity_id: STAFF_RID, role: 'Staff' });
    expect(sw.status).toBe(200);
    expect(sw.body.data.user.permissions).toEqual(['access_pos', 'menu_management']);
    staffToken = sw.body.data.token;
    const me = await http('get', '/api/auth/me').set(bearer(staffToken));
    expect(me.status).toBe(200);
    expect(me.body.data.role).toBe('Staff');
    expect(Number(me.body.data.restaurant_id)).toBe(STAFF_RID);
    expect(me.body.data.permissions).toEqual(['access_pos', 'menu_management']);
    expect((await http('get', `/api/restaurants/${STAFF_RID}`).set(bearer(staffToken))).status).toBe(200);
    expect((await http('get', `/api/restaurants/${U1_RID}`).set(bearer(staffToken))).status).toBe(403);
  });

  test('권한 게이트 라우트 — access_payment 없으면 403, SA 직접 재부여로 키 추가 → 200', async () => {
    const cfg1 = await http('get', `/api/terminal/config?restaurant_id=${STAFF_RID}`).set(bearer(staffToken));
    expect(cfg1.status).toBe(403);
    const g = await http('post', `/api/users/${u1}/contexts`).set(bearer(tSA))
      .send({ entity_type: 'restaurant', entity_id: STAFF_RID, role: 'Staff', permissions: ['access_pos', 'access_payment', 'menu_management'] });
    expect(g.status).toBe(200);
    const cfg2 = await http('get', `/api/terminal/config?restaurant_id=${STAFF_RID}`).set(bearer(staffToken));
    expect(cfg2.status).toBe(200);
    const cfg3 = await http('get', `/api/terminal/config?restaurant_id=${U1_RID}`).set(bearer(staffToken));
    expect(cfg3.status).toBe(403);
    // SA 직접 부여도 Staff 면 권한 1개 이상 필수
    const g0 = await http('post', `/api/users/${u1}/contexts`).set(bearer(tSA))
      .send({ entity_type: 'restaurant', entity_id: STAFF_RID, role: 'Staff', permissions: [] });
    expect(g0.status).toBe(400);
  });
});

describe('⑦ 범위 · 역할 가드', () => {
  test('u2(RA) 가 RA·BM 요청 approve → 404 · BG 목록 403 · 익명 401 · SA 요청 403', async () => {
    const ra = await post('', { entity_type: 'restaurant', entity_id: 38, role: 'Restaurant Admin' }, bearer(t1));
    expect(ra.status).toBe(201);
    ids.ra38 = ra.body.data.id;
    expect((await post(`/${ids.ra38}/approve`, {}, bearer(t2))).status).toBe(404);
    expect((await post(`/${ids.ra38}/reject`, {}, bearer(t2))).status).toBe(404);
    const bm = await post('', { entity_type: 'brand', entity_id: BRAND_B, role: 'Brand Manager' }, bearer(t1));
    expect(bm.status).toBe(201);
    ids.bmB = bm.body.data.id;
    expect((await post(`/${ids.bmB}/approve`, {}, bearer(t2))).status).toBe(404);
    expect((await get('', bearer(tBG))).status).toBe(403);
    expect((await http('get', '/api/context-requests')).status).toBe(401);
    expect((await post('', { entity_type: 'brand', entity_id: BRAND_A, role: 'Brand Manager' }, bearer(tSA))).status).toBe(403);
    await del(`/${ids.ra38}`, bearer(t1));
    await del(`/${ids.bmB}`, bearer(t1));
  });
});

describe('⑧ RA↔Staff 겹침 금지', () => {
  test('Staff 모자 보유 중 RA 요청 400 → SA 회수 → RA 요청 201', async () => {
    const r = await post('', { entity_type: 'restaurant', entity_id: STAFF_RID, role: 'Restaurant Admin' }, bearer(t1));
    expect(r.status).toBe(400);
    expect(r.body.message).toBe('User already has access to this restaurant');
    const [hat] = await q("SELECT id FROM user_contexts WHERE user_id=:u AND entity_type='restaurant' AND entity_id=:e AND role='Staff'", { u: u1, e: STAFF_RID });
    const rv = await http('delete', `/api/users/${u1}/contexts/${hat.id}`).set(bearer(tSA));
    expect(rv.status).toBe(200);
    const r2 = await post('', { entity_type: 'restaurant', entity_id: STAFF_RID, role: 'Restaurant Admin' }, bearer(t1));
    expect(r2.status).toBe(201);
    ids.ra18 = r2.body.data.id;
  });
});

describe('⑨ staff_limit — 승인과 직원 생성이 같은 셈', () => {
  test('좌석 = 한도면 RA 모자 승인 403 · 원복 후 200 · 생성 경로도 모자를 센다', async () => {
    const seats = await userContexts.countRestaurantSeats(STAFF_RID);
    await q('UPDATE restaurants SET staff_limit = :l WHERE id = :id', { l: seats, id: STAFF_RID });
    const no = await post(`/${ids.ra18}/approve`, {}, bearer(tSA));
    expect(no.status).toBe(403);
    expect(no.body.message).toMatch(/^Staff limit reached/);
    const [p] = await q('SELECT status FROM user_context_requests WHERE id=:id', { id: ids.ra18 });
    expect(p.status).toBe('pending');
    await q('UPDATE restaurants SET staff_limit = :l WHERE id = :id', { l: seats + 1, id: STAFF_RID });
    const ok = await post(`/${ids.ra18}/approve`, {}, bearer(tSA));
    expect(ok.status).toBe(200);
    // 이제 좌석 = seats + 1(모자) = 한도 → 생성 경로(RA u2 가 Staff 생성)도 403
    expect(await userContexts.countRestaurantSeats(STAFF_RID)).toBe(seats + 1);
    const cr = await http('post', '/api/users').set(bearer(t2)).send({
      username: `${TAG}new`, email: `${TAG}new@purplehere.com`, password: 'Test1234!', role: 'Staff', full_name: 'ZZ New'
    });
    expect(cr.status).toBe(403);
    expect(cr.body.error).toMatch(/^Staff limit reached/);
    await q('UPDATE restaurants SET staff_limit = :l WHERE id = :id', { l: origStaffLimit, id: STAFF_RID });
  });
});

describe('⑩ 오너 요청', () => {
  test('u1 rid 18 오너 요청 → SA 승인 → 소유행 · 오너 카드 · 네이티브 오너 요청 400', async () => {
    const r = await post('', { entity_type: 'restaurant', entity_id: STAFF_RID, role: 'Restaurant Owner' }, bearer(t1));
    expect(r.status).toBe(201);
    const ok = await post(`/${r.body.data.id}/approve`, {}, bearer(tSA));
    expect(ok.status).toBe(200);
    const [own] = await q("SELECT id FROM restaurant_managers WHERE manager_id=:u AND restaurant_id=:r AND relationship_type='ownership'", { u: u1, r: STAFF_RID });
    expect(own).toBeTruthy();
    const ctx = await http('get', '/api/auth/contexts').set(bearer(t1));
    expect(ctx.body.data.contexts.some(c => c.entity_type === 'owner' && c.role === 'Restaurant Owner')).toBe(true);
    if (nativeOwnerId) {
      const n = await post('', { entity_type: 'restaurant', entity_id: STAFF_RID, role: 'Restaurant Owner' }, bearer(sign(nativeOwnerId)));
      expect(n.status).toBe(400);
    }
  });
});

describe('⑪ 상수 동형 — 서버 STAFF_PERMISSION_KEYS ↔ 프론트 StaffPermissionPicker', () => {
  test('키 집합이 같다', () => {
    const src = fs.readFileSync(path.resolve(__dirname, '../../dev-frontend/src/components/Staff/StaffPermissionPicker.tsx'), 'utf8');
    const block = (name) => {
      const m = src.match(new RegExp(`export const ${name}[^=]*=\\s*\\[([\\s\\S]*?)\\];`));
      if (!m) throw new Error(`${name} not found`);
      return [...m[1].matchAll(/key:\s*'([a-z_]+)'/g)].map(x => x[1]);
    };
    const fe = [...block('WORK_ACCESS'), ...block('MENU_GROUPS')].sort();
    expect(fe).toEqual([...userContexts.STAFF_PERMISSION_KEYS].sort());
  });
});

describe('⑫ 부여 메시지 — 바뀐 곳은 GRANTABLE_MESSAGE 한 줄', () => {
  test('비허용 조합 SA 직접 부여 → 새 메시지', async () => {
    const r = await http('post', `/api/users/${u2}/contexts`).set(bearer(tSA))
      .send({ entity_type: 'brand', entity_id: BRAND_A, role: 'Brand General' });
    expect(r.status).toBe(400);
    expect(r.body.message).toBe('Only (restaurant × Staff), (restaurant × Restaurant Admin), (restaurant × Restaurant Owner) or (brand × Brand Manager) can be granted');
  });
});

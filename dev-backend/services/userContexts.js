'use strict';
/**
 * 멀티 컨텍스트 로그인 — 컨텍스트("모자") 해석 단일 소스.
 * docs/MULTI_CONTEXT_LOGIN_DESIGN.md §3 (데이터 모델) / §5.2·§5.3 (정합·불변식).
 *
 * P1 범위: 이 모듈은 아직 **어디에서도 호출되지 않는다**. 토큰·투영·API 는 P2.
 *
 * 두 종류의 컨텍스트:
 *  1) 네이티브 정체(기본 컨텍스트) — `users.role`(+스칼라)에서 **파생**한다. 행이 없다.
 *     운영 BG/FG 3명이 스칼라 NULL 이라 행으로 복사하면 정작 대상자가 모자 0개가 되고(F1),
 *     강등해도 옛 모자 행이 남는다(F2). 파생이면 둘 다 구조적으로 소멸한다.
 *  2) 부여된 모자 — `user_contexts` 행. System Admin 이 명시적으로 부여한 것만 존재.
 *
 * ⚠ 불변식(§5.3): **목록(listContexts)과 검증(validateGrantedContext)은 같은 판정을 공유**한다.
 * 둘이 갈라지면 "목록엔 보이는데 고르면 거부"(list ⊄ detail)가 난다.
 */
const { sequelize } = require('../config/database');

// 역할 → 네이티브 정체의 엔티티 종류·스칼라 컬럼.
// entity_type 중 'system'·'owner'·'referral' 은 user_contexts ENUM 에 없다 — 의도된 것이다.
// 기본 컨텍스트는 **행으로 저장되지 않으므로** 표 ENUM 의 제약을 받지 않는다(부여 대상이 아님).
const DEFAULT_CONTEXT_BY_ROLE = {
  'System Admin':      { entity_type: 'system',     scalar: null },
  'Brand General':     { entity_type: 'brand',      scalar: 'brand_id' },
  'Brand Manager':     { entity_type: 'brand',      scalar: 'brand_id' },
  'Foodcourt General': { entity_type: 'foodcourt',  scalar: 'foodcourt_id' },
  'Foodcourt Manager': { entity_type: 'foodcourt',  scalar: 'foodcourt_id' },
  'Restaurant Admin':  { entity_type: 'restaurant', scalar: 'restaurant_id' },
  'Staff':             { entity_type: 'restaurant', scalar: 'restaurant_id' },
  'Restaurant Owner':  { entity_type: 'owner',      scalar: null },
  // ⚠ P2 노트: `supplier_company_id` 는 users 컬럼에는 있지만 `req.user`(middleware/auth.js:30-42)에는
  // 실리지 않는다. 즉 req.user 로 파생하면 supplier 의 entity_id 는 null 이 된다. supplier 는 v1 부여
  // 대상이 아니라 판정에 쓰이지 않으므로 P2 에서는 손대지 않고, 표시명 보강 때(P3a) 함께 해결한다.
  'Supplier Admin':    { entity_type: 'supplier',   scalar: 'supplier_company_id' },
  'Supplier Staff':    { entity_type: 'supplier',   scalar: 'supplier_company_id' },
  'Referral Partner':  { entity_type: 'referral',   scalar: null }
};

// v1 에서 **부여**가 허용되는 유일한 조합 (설계 §5.2 / 검증 F4).
// 이 조합만이 접근판정 4곳에서 규칙이 전부 일치하는 경로(RA 스칼라 비교)라 안전하다.
// 브랜드/푸드코트 모자는 권한이 소유 기록으로 판정되는 코드가 주류라 "반쪽만 열림"이 된다.
const V1_GRANTABLE = { entity_type: 'restaurant', role: 'Restaurant Admin' };

// 오너 모자 (v1.1, 설계 §5.4) — 부여 기록은 user_contexts 행이 아니라 **restaurant_managers 소유행**이다.
// 오너 권한 판정(middleware/auth.js:275·479, routes/owner.js 전부)이 이미 그 행 하나를 user.id 로 읽으므로
// 소유행을 만들어 주는 것이 곧 부여이고, 새 판정처는 생기지 않는다(§8-4 "5번째 판정처 금지" 준수).
// entity_id 는 **자기 user id** 다 — 오너는 사람 단위 정체라 매장 id 가 없고, 카드는 계정당 1장이다.
const OWNER_HAT = { entity_type: 'owner', role: 'Restaurant Owner' };

// 브랜드 관리자 모자 (v1.2, 2026-10-04 — 판정서 09-29 §6-10 ④, Irene 「권고대로 해」).
// 투영 = role 'Brand Manager' + brand_id = 브랜드 id. BM 판정은 스칼라(users.brand_id) 경로로 통일돼 있어
// (2026-09-06·09-08) 투영이 그대로 먹는다 — 설계 §5.2 가 막은 것은 **소유자(BG) 모자**이고 이것은 아니다.
// 부여는 SA 전용(§8-3). 결제 설정·브랜드 수정/삭제·스태프 관리는 소유자 판정이 BM 을 거부하므로 열리지 않는다.
const BRAND_MANAGER_HAT = { entity_type: 'brand', role: 'Brand Manager' };
function isBrandManagerHat(entityType, role) {
  return entityType === BRAND_MANAGER_HAT.entity_type && role === BRAND_MANAGER_HAT.role;
}
// 브랜드 관리자 모자의 **화면 표시 권한 키** (2026-10-04 Fable 표적 판정). 프론트 사이드바(hasManagerPermission)가
//   Brand Manager 에겐 user.permissions 를 요구한다 — 비어 있으면 Dashboard·Brand Menus 가 안 보였다(dev 실브라우저 재현).
//   서버 판정에는 쓰이지 않는 표시 전용 키다. 모자의 약속 범위(메뉴·레시피)만 — plans_payments(돈 경계)·운영·관리 키는 넣지 않는다.
const BRAND_MANAGER_HAT_PERMISSIONS = ['dashboard', 'products'];
// 부여 행이 가리키는 엔티티 표 — 목록·검증·전환이 같은 표를 JOIN 해야 list ⊆ detail 이 유지된다.
const GRANT_JOIN_TABLE = { restaurant: 'restaurants', brand: 'brands' };

// 매장 직원 모자 (v1.3, 2026-10-05 — .claude/fable-design-20261005-context-request.md §5.1).
// 투영 = role 'Staff' + restaurant_id = 매장 id + permissions = **그 모자 행의 permissions**.
// Staff 서버 판정은 restaurant_id 스칼라 + permissions 두 값만 읽으므로 RA 모자와 같은 일치 경로다.
const STAFF_HAT = { entity_type: 'restaurant', role: 'Staff' };
function isStaffHat(entityType, role) {
  return entityType === STAFF_HAT.entity_type && role === STAFF_HAT.role;
}
// 매장 모자(user_contexts 행이 매장을 가리키는 것) 의 역할 — 같은 매장에 두 장을 겹쳐 두지 않는다(UC-008).
const RESTAURANT_HAT_ROLES = Object.freeze(['Restaurant Admin', 'Staff']);
function isRestaurantHat(entityType, role) {
  return entityType === 'restaurant' && RESTAURANT_HAT_ROLES.includes(role);
}
// Staff 모자 권한 키 = 프론트 components/Staff/StaffPermissionPicker.tsx 의 WORK_ACCESS ∪ MENU_GROUPS.
// 두 목록이 같은지는 tests/context-requests.test.js ⑪ 가 소스를 읽어 대조한다.
const STAFF_PERMISSION_KEYS = Object.freeze([
  'access_pos', 'access_payment', 'access_void', 'access_serving', 'access_kitchen',
  'menu_management', 'inventory', 'marketing', 'reports', 'support', 'settings'
]);
/**
 * Staff 모자 권한 정규화 — 집합 밖 키·빈 배열은 거부, 중복 제거.
 * @returns {{permissions:string[]}|{error:string}}
 */
function normalizeStaffPermissions(arr) {
  if (!Array.isArray(arr)) return { error: 'permissions must be an array' };
  const out = [];
  for (const k of arr) {
    if (typeof k !== 'string' || !STAFF_PERMISSION_KEYS.includes(k)) {
      return { error: `Unknown permission: ${String(k).slice(0, 40)}` };
    }
    if (!out.includes(k)) out.push(k);
  }
  if (!out.length) return { error: 'Pick at least one permission' };
  return { permissions: out };
}
// JSON 칸 값 → 배열|null (드라이버가 문자열로 줄 수도, 파싱해 줄 수도 있다).
function parsePermissions(v) {
  if (v === null || v === undefined) return null;
  if (Array.isArray(v)) return v;
  if (typeof v === 'string') {
    try { const p = JSON.parse(v); return Array.isArray(p) ? p : null; } catch { return null; }
  }
  return null;
}

/**
 * id 정규화 — 권한 판정에 쓰는 값은 **순수 십진 정수 문자열만** 허용한다.
 * parseInt 는 '1.16e2' 를 1 로 읽고 MySQL 은 116 으로 캐스팅해 게이트가 통째로 우회됐던
 * 전례가 있다([[reference_id_normalization_bypass]]). 형태가 다르면 null.
 * @returns {number|null}
 */
function normalizeEntityId(value) {
  if (value === null || value === undefined) return null;
  const s = String(value).trim();
  if (!/^\d+$/.test(s)) return null;
  const n = Number(s);
  if (!Number.isSafeInteger(n) || n <= 0) return null;
  return n;
}

/**
 * v1 부여 허용 조합인가 — 목록·검증·(P2 의)부여가 공유하는 단일 판정.
 */
function isV1GrantableCombination(entityType, role) {
  return entityType === V1_GRANTABLE.entity_type && role === V1_GRANTABLE.role;
}

function isOwnerHat(entityType, role) {
  return entityType === OWNER_HAT.entity_type && role === OWNER_HAT.role;
}

/**
 * 이 사용자가 소유한 매장(이름 포함) — 오너 카드의 존재 판정·제목·회수 관리 화면이 공유한다.
 * 소유행 = restaurant_managers(relationship_type='ownership'). 매장 JOIN 이라 삭제된 매장은 빠진다(고아 방지).
 * @returns {Promise<Array<{id:number,name:string}>>}
 */
async function listOwnedRestaurants(userId) {
  const uid = normalizeEntityId(userId);
  if (!uid) return [];
  const [rows] = await sequelize.query(
    `SELECT r.id, r.name
       FROM restaurant_managers rm
       JOIN restaurants r ON r.id = rm.restaurant_id
      WHERE rm.manager_id = :uid AND rm.relationship_type = 'ownership'
      ORDER BY r.name ASC`,
    { replacements: { uid } }
  );
  return rows;
}

// 오너 카드 제목 — 1개면 그 매장 이름, 2개 이상이면 "첫 매장 +N" (카드 제목 = 들어갈 곳의 이름 규칙).
function ownerHatLabel(owned) {
  if (!owned.length) return OWNER_HAT.role;
  return owned.length === 1 ? owned[0].name : `${owned[0].name} +${owned.length - 1}`;
}

/**
 * 네이티브 정체(기본 컨텍스트)를 파생한다.
 * **스칼라가 NULL 이어도 반드시 반환**한다 — role 만으로 정체는 성립하며, 이것이
 * "본래 정체로 항상 돌아올 수 있다"는 보장의 근거다(검증 F1).
 * @param {{id:number, role:string, brand_id?:number, foodcourt_id?:number,
 *          restaurant_id?:number, supplier_company_id?:number}} user
 * @returns {{kind:'default', entity_type:string, entity_id:number|null, role:string, label:string}|null}
 */
function deriveDefaultContext(user) {
  if (!user || !user.role) return null;
  const spec = DEFAULT_CONTEXT_BY_ROLE[user.role];
  if (!spec) return null; // 미지의 역할 — 조용히 추측하지 않는다.

  const entityId = spec.scalar ? normalizeEntityId(user[spec.scalar]) : null;
  return {
    kind: 'default',
    entity_type: spec.entity_type,
    entity_id: entityId,
    role: user.role,
    // 표시명 기본값 = 역할명. 엔티티명 해석은 listContexts 가 채운다(아래 resolveEntityName).
    // 계정명(username)은 쓰지 않는다 — 카드 제목은 "들어갈 곳의 이름"이어야 하고,
    // 누구 계정인지는 로그인한 본인이 이미 아는 정보다.
    label: user.role
  };
}

// 기본 컨텍스트의 표시명 해석 — **표시 문자열만** 만든다(판정 로직 무접촉).
// 스칼라가 있으면 해당 테이블의 name 1쿼리, 없거나 못 찾으면 역할명 폴백.
const ENTITY_NAME_TABLE = { restaurant: 'restaurants', brand: 'brands', foodcourt: 'foodcourts' };

async function resolveEntityName(entityType, entityId) {
  const table = ENTITY_NAME_TABLE[entityType];
  const id = normalizeEntityId(entityId);
  if (!table || !id) return null;
  try {
    const [rows] = await sequelize.query(`SELECT name FROM ${table} WHERE id = :id LIMIT 1`, { replacements: { id } });
    return rows.length ? rows[0].name : null;
  } catch {
    return null; // 표시용이라 실패해도 역할명으로 그냥 보여준다
  }
}

/**
 * 이 사용자가 고를 수 있는 컨텍스트 전체 = [파생 기본 컨텍스트, ...부여된 모자].
 *
 * 부여 행은 **validateGrantedContext 와 동일한 조건**(v1 조합 + 엔티티 실존)으로 걸러진다.
 * INNER JOIN restaurants 가 "고아 모자"(삭제된 매장)를 목록에서 제외하므로 list ⊆ detail.
 * @returns {Promise<Array>}
 */
async function listContexts(user) {
  const contexts = [];
  const base = deriveDefaultContext(user);
  if (base) {
    // 기본 카드 제목 = **이 아이디의 프로필 이름** (2026-09-25 Irene 「브랜드이름이 왜 나와?
    // 이 아이디 프로필이름이 나와야지」). 계정 스칼라가 가리키는 엔티티 하나의 이름은 그 계정이
    // 가진 전부를 대표하지 못한다(BG 는 owner_id 기준 브랜드가 여럿일 수 있다).
    // 부여·오너 카드는 그대로 «들어갈 곳의 이름». 프로필 이름이 비면 예전처럼 엔티티명 → 역할명.
    const profileName = typeof user.full_name === 'string' ? user.full_name.trim() : '';
    const name = profileName || await resolveEntityName(base.entity_type, base.entity_id);
    if (name) base.label = name;
    contexts.push(base);
  }

  const userId = normalizeEntityId(user && user.id);
  if (!userId) return contexts;

  const [rows] = await sequelize.query(
    `SELECT uc.id, uc.entity_type, uc.entity_id, uc.role, uc.permissions, uc.last_used_at, r.name AS entity_name
       FROM user_contexts uc
       JOIN restaurants r ON r.id = uc.entity_id
      WHERE uc.user_id = :userId
        AND uc.entity_type = :entityType
        AND uc.role IN (:roles)
      ORDER BY uc.last_used_at IS NULL, uc.last_used_at DESC, r.name ASC`,
    { replacements: { userId, entityType: V1_GRANTABLE.entity_type, roles: [...RESTAURANT_HAT_ROLES] } }
  );

  for (const row of rows) {
    const card = {
      kind: 'granted',
      id: row.id,
      entity_type: row.entity_type,
      entity_id: row.entity_id,
      role: row.role,
      label: row.entity_name,
      last_used_at: row.last_used_at
    };
    // Staff 모자만 권한을 싣는다(관리 화면 표시용). RA 카드 모양은 종전과 바이트 동일.
    if (row.role === STAFF_HAT.role) card.permissions = parsePermissions(row.permissions);
    contexts.push(card);
  }

  // 브랜드 관리자 모자 (v1.2) — 브랜드 행은 brands 를 JOIN 한다(고아 모자는 목록에서 빠진다).
  const [brandRows] = await sequelize.query(
    `SELECT uc.id, uc.entity_type, uc.entity_id, uc.role, uc.last_used_at, b.name AS entity_name
       FROM user_contexts uc
       JOIN brands b ON b.id = uc.entity_id
      WHERE uc.user_id = :userId
        AND uc.entity_type = :entityType
        AND uc.role = :role
      ORDER BY uc.last_used_at IS NULL, uc.last_used_at DESC, b.name ASC`,
    { replacements: { userId, entityType: BRAND_MANAGER_HAT.entity_type, role: BRAND_MANAGER_HAT.role } }
  );
  for (const row of brandRows) {
    contexts.push({
      kind: 'granted',
      id: row.id,
      entity_type: row.entity_type,
      entity_id: row.entity_id,
      role: row.role,
      label: row.entity_name,
      last_used_at: row.last_used_at
    });
  }

  // 오너 모자 — 네이티브 오너에게는 붙이지 않는다(기본 카드와 중복). 소유행 0 이면 카드도 없다.
  if (user.role !== OWNER_HAT.role) {
    const owned = await listOwnedRestaurants(userId);
    if (owned.length) {
      contexts.push({
        kind: 'granted',
        id: null,
        entity_type: OWNER_HAT.entity_type,
        entity_id: userId,
        role: OWNER_HAT.role,
        label: ownerHatLabel(owned),
        owned_count: owned.length,
        last_used_at: null
      });
    }
  }

  return contexts;
}

/**
 * 부여된 모자가 지금도 유효한가 — 전환 시점과 매 요청 재검증(P2)이 함께 쓰는 판정.
 * 다음을 모두 만족해야 true:
 *   ① entity_id 가 순수 정수 (우회 차단)
 *   ② v1 허용 조합 (restaurant × Restaurant Admin)
 *   ③ 해당 부여 행이 실존
 *   ④ 대상 매장이 실존 (고아 모자 거부)
 * @returns {Promise<boolean>}
 */
async function validateGrantedContext(userId, ctx) {
  return (await resolveGrantedContext(userId, ctx)).ok;
}

/**
 * 검증 + 그 모자 행의 permissions — 투영(middleware/auth.js projectContext)이 쓴다.
 * validateGrantedContext 와 **같은 SQL 하나**(v1.3 에서 permissions 칸만 함께 읽는다).
 * @returns {Promise<{ok:boolean, permissions:string[]|null}>}
 */
async function resolveGrantedContext(userId, ctx) {
  const NO = { ok: false, permissions: null };
  if (!ctx) return NO;
  const uid = normalizeEntityId(userId);
  const entityId = normalizeEntityId(ctx.entity_id);
  if (!uid || !entityId) return NO;
  // 오너 모자 — 자기 id 이고 소유행이 1개 이상일 때만. user_contexts 는 보지 않는다(부여 기록이 소유행).
  if (isOwnerHat(ctx.entity_type, ctx.role)) {
    if (entityId !== uid) return NO;
    const owned = await listOwnedRestaurants(uid);
    return { ok: owned.length > 0, permissions: null };
  }
  if (!isV1GrantableCombination(ctx.entity_type, ctx.role) && !isBrandManagerHat(ctx.entity_type, ctx.role)
      && !isStaffHat(ctx.entity_type, ctx.role)) return NO;

  const [rows] = await sequelize.query(
    `SELECT uc.permissions
       FROM user_contexts uc
       JOIN ${GRANT_JOIN_TABLE[ctx.entity_type]} r ON r.id = uc.entity_id
      WHERE uc.user_id = :uid
        AND uc.entity_type = :entityType
        AND uc.entity_id = :entityId
        AND uc.role = :role
      LIMIT 1`,
    { replacements: { uid, entityType: ctx.entity_type, entityId, role: ctx.role } }
  );
  if (!rows.length) return NO;
  return { ok: true, permissions: parsePermissions(rows[0].permissions) };
}

/**
 * 전환 시점 조회 — 검증 + 전환 응답에 필요한 매장 정보(name/status)를 함께 돌려준다.
 *
 * **status 정책(설계 §4.2 ④ 확정)**: suspended 매장이어도 **전환을 차단하지 않는다.**
 * 네이티브 RA 도 suspended 매장에 로그인은 되고 프론트가 인보이스 화면으로 pin 하는 것이
 * 기존 정책이라([[reference_suspended_pin]]), 모자 경로만 더 엄격하면 오히려 비대칭이 된다.
 * 차단 사유는 "부여 행 없음 / 매장 없음" 둘 뿐이고, status 는 응답에 실어 프론트가 처리한다.
 *
 * @returns {Promise<{ok:true, entity_id:number, role:string, name:string, status:string}|{ok:false, reason:string}>}
 */
async function getGrantedContextForSwitch(userId, ctx) {
  if (!ctx) return { ok: false, reason: 'INVALID_CONTEXT' };
  const uid = normalizeEntityId(userId);
  const entityId = normalizeEntityId(ctx.entity_id);
  if (!uid || !entityId) return { ok: false, reason: 'INVALID_ENTITY_ID' };
  if (isOwnerHat(ctx.entity_type, ctx.role)) {
    if (entityId !== uid) return { ok: false, reason: 'CONTEXT_NOT_GRANTED' };
    const owned = await listOwnedRestaurants(uid);
    if (!owned.length) return { ok: false, reason: 'CONTEXT_NOT_GRANTED' };
    return { ok: true, id: null, entity_type: OWNER_HAT.entity_type, entity_id: uid, role: OWNER_HAT.role, name: ownerHatLabel(owned), status: null };
  }
  if (!isV1GrantableCombination(ctx.entity_type, ctx.role) && !isBrandManagerHat(ctx.entity_type, ctx.role)
      && !isStaffHat(ctx.entity_type, ctx.role)) {
    return { ok: false, reason: 'UNSUPPORTED_COMBINATION' };
  }

  const [rows] = await sequelize.query(
    `SELECT uc.id, uc.entity_id, uc.role, uc.permissions, r.name, r.status
       FROM user_contexts uc
       JOIN ${GRANT_JOIN_TABLE[ctx.entity_type]} r ON r.id = uc.entity_id
      WHERE uc.user_id = :uid
        AND uc.entity_type = :entityType
        AND uc.entity_id = :entityId
        AND uc.role = :role
      LIMIT 1`,
    { replacements: { uid, entityType: ctx.entity_type, entityId, role: ctx.role } }
  );
  if (!rows.length) return { ok: false, reason: 'CONTEXT_NOT_GRANTED' };

  const row = rows[0];
  return { ok: true, id: row.id, entity_type: ctx.entity_type, entity_id: row.entity_id, role: row.role, name: row.name, status: row.status,
    permissions: parsePermissions(row.permissions) };
}

// ────────────────────────────────────────────────────────────────────────────
// 부여 (v1.3 추출, 2026-10-04 — .claude/fable-design-20261004-context-request.md §5.1)
//
// 부여 가능한 조합은 **이 한 집합**이다. SA 직접 부여(routes/users.js POST /:id/contexts)·
// 자격 요청(routes/context-requests.js)·요청 화면의 유형 선택지가 전부 여기만 본다.
// ⛔ 쓰기(user_contexts INSERT · 소유행 INSERT)는 grantContext 한 곳뿐이다(설계 §8-3 봉인).
// ────────────────────────────────────────────────────────────────────────────
// approver = 요청 승인 주체(v1.3 §3): store_staff 는 그 매장 RA(+SA), 나머지는 SA 만.
const GRANTABLE_COMBINATIONS = Object.freeze([
  Object.freeze({ kind: 'store_staff', entity_type: 'restaurant', role: 'Staff', approver: 'restaurant_admin' }),
  Object.freeze({ kind: 'store_admin', entity_type: 'restaurant', role: 'Restaurant Admin', approver: 'system_admin' }),
  Object.freeze({ kind: 'store_owner', entity_type: 'restaurant', role: 'Restaurant Owner', approver: 'system_admin' }),
  Object.freeze({ kind: 'brand_manager', entity_type: 'brand', role: 'Brand Manager', approver: 'system_admin' })
]);
function findGrantableCombination(entityType, role) {
  return GRANTABLE_COMBINATIONS.find(c => c.entity_type === entityType && c.role === role) || null;
}

// 오너 **부여** 조합 — 부여는 매장 단위(restaurant × Restaurant Owner)이고, 결과로 생기는 카드는
// 사람 단위 오너 모자(OWNER_HAT: owner × Restaurant Owner)다. 둘을 섞지 않는다.
function isOwnerGrantCombination(entityType, role) {
  return entityType === 'restaurant' && role === OWNER_HAT.role;
}

function isGrantableCombination(entityType, role) {
  return isV1GrantableCombination(entityType, role)
    || isStaffHat(entityType, role)
    || isOwnerGrantCombination(entityType, role)
    || isBrandManagerHat(entityType, role);
}

const GRANTABLE_MESSAGE = 'Only (restaurant × Staff), (restaurant × Restaurant Admin), (restaurant × Restaurant Owner) or (brand × Brand Manager) can be granted';

// 부여 대상 엔티티 로드 — 부여와 요청이 같은 실존 판정을 쓴다.
async function loadGrantEntity(entityType, entityId) {
  if (entityType === 'brand') {
    const Brand = require('../models/Brand');
    const b = await Brand.findByPk(entityId, { attributes: ['id', 'name', 'owner_id'] });
    return b ? { id: b.id, name: b.name, owner_id: b.owner_id } : null;
  }
  const Restaurant = require('../models/Restaurant');
  const r = await Restaurant.findByPk(entityId, { attributes: ['id', 'name'] });
  return r ? { id: r.id, name: r.name } : null;
}

const NOT_FOUND_MESSAGE = { brand: 'Brand not found', restaurant: 'Restaurant not found' };

/**
 * 「이미 그 자격이 본래 정체에 있다」 판정 — 부여 함수와 요청 라우트가 **같은 조건**을 공유한다
 * ([[feedback_check_and_fix_same_sql]]). 메시지·상태코드는 기존 부여 라우트 문자열 그대로.
 * @returns {{status:number, message:string}|null}
 */
function nativeHoldConflict(target, entityType, entityId, role, entity) {
  if (isBrandManagerHat(entityType, role)) {
    if (entity && Number(entity.owner_id) === Number(target.id)) {
      return { status: 400, message: 'User already owns this brand' };
    }
    if (['Brand General', 'Brand Manager'].includes(target.role) && Number(target.brand_id) === entityId) {
      return { status: 400, message: 'User already belongs to this brand' };
    }
    return null;
  }
  if (isOwnerGrantCombination(entityType, role)) {
    if (target.role === 'Restaurant Owner') {
      return { status: 400, message: 'Native owners claim restaurants from the owner dashboard' };
    }
    return null;
  }
  // 자기 매장(네이티브 정체)과 같은 모자는 의미가 없다 — 중복 표시만 만든다.
  if (String(target.restaurant_id || '') === String(entityId)) {
    return { status: 400, message: 'User already belongs to this restaurant' };
  }
  return null;
}

/**
 * 요청 시점의 「이미 가진 자격인가」 — 네이티브 판정(nativeHoldConflict) + 부여 기록 실존.
 * 부여 함수는 부여 기록 실존을 멱등으로 넘기지만(ON DUPLICATE), 요청은 의미가 없으므로 400 이다.
 * @returns {Promise<{status:number, message:string}|null>}
 */
async function alreadyHoldsContext(user, { entity_type, entity_id, role }, entity) {
  const entityId = normalizeEntityId(entity_id);
  if (!user || !entityId) return null;
  const native = nativeHoldConflict(user, entity_type, entityId, role, entity);
  if (native) return native;
  if (isOwnerGrantCombination(entity_type, role)) {
    const [own] = await sequelize.query(
      `SELECT id FROM restaurant_managers
        WHERE restaurant_id = :e AND manager_id = :u AND relationship_type = 'ownership' LIMIT 1`,
      { replacements: { e: entityId, u: user.id } }
    );
    if (own.length) return { status: 400, message: 'User already owns this restaurant' };
    return null;
  }
  // 매장 모자(RA·Staff)는 역할 무관 — 같은 매장에 두 장을 겹쳐 두지 않는다(승급은 SA 가 회수 후 부여).
  if (isRestaurantHat(entity_type, role)) {
    if (await findRestaurantHat(user.id, entityId)) {
      return { status: 400, message: 'User already has access to this restaurant' };
    }
    return null;
  }
  const [rows] = await sequelize.query(
    `SELECT id FROM user_contexts
      WHERE user_id = :u AND entity_type = :t AND entity_id = :e AND role = :r LIMIT 1`,
    { replacements: { u: user.id, t: entity_type, e: entityId, r: role } }
  );
  if (rows.length) return { status: 400, message: 'User already has this context' };
  return null;
}

// 이 사람이 이 매장에 가진 매장 모자(RA·Staff) 1행 — 요청 판정과 부여 함수가 같은 SQL 을 쓴다.
async function findRestaurantHat(userId, entityId) {
  const [rows] = await sequelize.query(
    `SELECT id, role FROM user_contexts
      WHERE user_id = :u AND entity_type = 'restaurant' AND entity_id = :e AND role IN (:roles) LIMIT 1`,
    { replacements: { u: userId, e: entityId, roles: [...RESTAURANT_HAT_ROLES] } }
  );
  return rows[0] || null;
}

/**
 * 매장 좌석 수 = 그 매장 소속 사용자(Staff·RA) + 그 매장 모자(Staff·RA).
 * 요금제 staff_limit 판정의 **유일한 셈** — 직원 생성(routes/users.js POST /)과
 * 모자 승인(routes/context-requests.js)이 같이 쓴다([[feedback_check_and_fix_same_sql]]).
 * @returns {Promise<number>}
 */
async function countRestaurantSeats(restaurantId) {
  const rid = normalizeEntityId(restaurantId);
  if (!rid) return 0;
  const [[row]] = await sequelize.query(
    `SELECT
       (SELECT COUNT(*) FROM users WHERE restaurant_id = :rid AND role IN (:roles))
     + (SELECT COUNT(*) FROM user_contexts WHERE entity_type = 'restaurant' AND entity_id = :rid AND role IN (:roles)) AS seats`,
    { replacements: { rid, roles: [...RESTAURANT_HAT_ROLES] } }
  );
  return Number(row.seats) || 0;
}

/**
 * 모자 부여 — **유일한 쓰기 경로**. SA 직접 부여와 요청 승인이 같은 함수를 부른다.
 * (본문은 routes/users.js POST /:id/contexts 에서 그대로 옮겼다. 메시지·상태코드 바이트 동일.)
 * target 조회·비활성 검사는 호출자가 한다.
 * @returns {Promise<{ok:true, data:object, message:string, entityName:string, logDescription:string, restaurantId?:number}
 *                  |{ok:false, status:number, message:string}>}
 */
async function grantContext({ target, entity_type, entity_id, role, grantedBy, permissions }) {
  const fail = (status, message) => ({ ok: false, status, message });
  const entityId = normalizeEntityId(entity_id);
  if (!entityId) return fail(400, 'entity_id must be a positive integer');
  if (!isGrantableCombination(entity_type, role)) return fail(400, GRANTABLE_MESSAGE);

  const who = target.email || target.id;

  // 브랜드 관리자 모자(v1.2, 2026-10-04) — user_contexts 행. 소유자·이미 그 브랜드 소속이면 의미가 없다.
  if (isBrandManagerHat(entity_type, role)) {
    const brand = await loadGrantEntity('brand', entityId);
    if (!brand) return fail(404, NOT_FOUND_MESSAGE.brand);
    const conflict = nativeHoldConflict(target, entity_type, entityId, role, brand);
    if (conflict) return fail(conflict.status, conflict.message);
    await sequelize.query(
      `INSERT INTO user_contexts (user_id, entity_type, entity_id, role, granted_by, created_at, updated_at)
       VALUES (:u, 'brand', :e, :r, :by, NOW(), NOW()) ON DUPLICATE KEY UPDATE updated_at = NOW()`,
      { replacements: { u: target.id, e: entityId, r: role, by: grantedBy } }
    );
    return {
      ok: true, data: { user_id: target.id, entity_id: entityId, role }, message: 'Context granted',
      entityName: brand.name,
      logDescription: `Granted Brand Manager context for brand "${brand.name}" (#${entityId}) to ${who}`
    };
  }

  const restaurant = await loadGrantEntity('restaurant', entityId);
  if (!restaurant) return fail(404, NOT_FOUND_MESSAGE.restaurant);

  // 오너 모자 = 소유행 부여(설계 §5.4). 네이티브 오너는 자기 claim 경로(routes/owner.js)를 쓰므로 여기서 받지 않는다.
  if (isOwnerGrantCombination(entity_type, role)) {
    const conflict = nativeHoldConflict(target, entity_type, entityId, role, restaurant);
    if (conflict) return fail(conflict.status, conflict.message);
    const [existing] = await sequelize.query(
      'SELECT id, relationship_type FROM restaurant_managers WHERE restaurant_id = :e AND manager_id = :u LIMIT 1',
      { replacements: { e: entityId, u: target.id } }
    );
    if (existing.length && existing[0].relationship_type !== 'ownership') {
      // UNIQUE(restaurant_id, manager_id) — oversight 행을 조용히 ownership 으로 바꾸지 않는다.
      return fail(409, 'User is already assigned to this restaurant as a manager (oversight)');
    }
    if (!existing.length) {
      await sequelize.query(
        `INSERT INTO restaurant_managers (restaurant_id, manager_id, relationship_type, is_primary, assigned_at, createdAt, updatedAt)
         VALUES (:e, :u, 'ownership', 0, NOW(), NOW(), NOW())`,
        { replacements: { e: entityId, u: target.id } }
      );
    }
    return {
      ok: true, data: { user_id: target.id, entity_id: entityId, role }, message: 'Ownership granted',
      entityName: restaurant.name, restaurantId: entityId,
      logDescription: `Granted Restaurant Owner (ownership) of "${restaurant.name}" (#${entityId}) to ${who}`
    };
  }

  const conflict = nativeHoldConflict(target, entity_type, entityId, role, restaurant);
  if (conflict) return fail(conflict.status, conflict.message);

  // 같은 매장의 **다른** 매장 모자(RA↔Staff)가 이미 있으면 겹쳐 두지 않는다(UC-008). 같은 역할이면 멱등(아래).
  const otherHat = await findRestaurantHat(target.id, entityId);
  if (otherHat && otherHat.role !== role) return fail(400, 'User already has access to this restaurant');

  // Staff 모자 (v1.3) — 권한은 승인자가 고른 값(1개 이상)을 행에 싣는다.
  if (isStaffHat(entity_type, role)) {
    const norm = normalizeStaffPermissions(permissions);
    if (norm.error) return fail(400, norm.error);
    await sequelize.query(
      `INSERT INTO user_contexts (user_id, entity_type, entity_id, role, permissions, granted_by, created_at, updated_at)
       VALUES (:u, 'restaurant', :e, :r, :p, :by, NOW(), NOW())
       ON DUPLICATE KEY UPDATE permissions = VALUES(permissions), updated_at = NOW()`,
      { replacements: { u: target.id, e: entityId, r: role, p: JSON.stringify(norm.permissions), by: grantedBy } }
    );
    return {
      ok: true, data: { user_id: target.id, entity_id: entityId, role, permissions: norm.permissions }, message: 'Context granted',
      entityName: restaurant.name, restaurantId: entityId,
      logDescription: `Granted Staff context for restaurant "${restaurant.name}" (#${entityId}) to ${who} [${norm.permissions.join(', ')}]`
    };
  }

  // 멱등 — UNIQUE(user_id, entity_type, entity_id, role)
  await sequelize.query(
    `INSERT INTO user_contexts (user_id, entity_type, entity_id, role, granted_by, created_at, updated_at)
     VALUES (:u, :t, :e, :r, :by, NOW(), NOW())
     ON DUPLICATE KEY UPDATE updated_at = NOW()`,
    { replacements: { u: target.id, t: entity_type, e: entityId, r: role, by: grantedBy } }
  );
  return {
    ok: true, data: { user_id: target.id, entity_id: entityId, role }, message: 'Context granted',
    entityName: restaurant.name, restaurantId: entityId,
    logDescription: `Granted ${role} context for restaurant "${restaurant.name}" (#${entityId}) to ${who}`
  };
}

/**
 * 이 모자를 방금 썼다고 기록 — 픽커 정렬용. 실패해도 전환을 막지 않는다(부가 정보).
 */
async function touchContextUsage(contextRowId) {
  const id = normalizeEntityId(contextRowId);
  if (!id) return;
  try {
    await sequelize.query('UPDATE user_contexts SET last_used_at = NOW() WHERE id = :id', { replacements: { id } });
  } catch (e) {
    console.warn('[userContexts] last_used_at 갱신 실패(무시):', e.message);
  }
}

module.exports = {
  deriveDefaultContext,
  listContexts,
  validateGrantedContext,
  getGrantedContextForSwitch,
  touchContextUsage,
  // 테스트·인스펙션·P2 부여 라우트가 공유하는 내부 판정 (중복 구현 금지).
  normalizeEntityId,
  isV1GrantableCombination,
  resolveEntityName,
  DEFAULT_CONTEXT_BY_ROLE,
  V1_GRANTABLE,
  // 오너 모자(v1.1) — 목록·검증·부여 라우트·소켓이 공유한다.
  OWNER_HAT,
  isOwnerHat,
  listOwnedRestaurants,
  // 브랜드 관리자 모자(v1.2)
  BRAND_MANAGER_HAT,
  isBrandManagerHat,
  BRAND_MANAGER_HAT_PERMISSIONS,
  // 부여 (v1.3) — 부여 가능 집합 · 유일한 쓰기 경로 · 「이미 가진 자격」 판정
  GRANTABLE_COMBINATIONS,
  isGrantableCombination,
  isOwnerGrantCombination,
  loadGrantEntity,
  alreadyHoldsContext,
  grantContext,
  // 매장 직원 모자 · 요청(v1.3, 2026-10-05)
  STAFF_HAT,
  isStaffHat,
  RESTAURANT_HAT_ROLES,
  isRestaurantHat,
  STAFF_PERMISSION_KEYS,
  normalizeStaffPermissions,
  parsePermissions,
  findGrantableCombination,
  resolveGrantedContext,
  countRestaurantSeats,
  NOT_FOUND_MESSAGE
};

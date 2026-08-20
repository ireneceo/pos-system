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
    // 카드 제목을 "들어갈 곳의 이름"으로 통일 — 부여 카드는 매장명인데 기본 카드만
    // 다른 성격(역할명/계정명)이면 목록의 규칙이 갈라진다.
    const name = await resolveEntityName(base.entity_type, base.entity_id);
    if (name) base.label = name;
    contexts.push(base);
  }

  const userId = normalizeEntityId(user && user.id);
  if (!userId) return contexts;

  const [rows] = await sequelize.query(
    `SELECT uc.id, uc.entity_type, uc.entity_id, uc.role, uc.last_used_at, r.name AS entity_name
       FROM user_contexts uc
       JOIN restaurants r ON r.id = uc.entity_id
      WHERE uc.user_id = :userId
        AND uc.entity_type = :entityType
        AND uc.role = :role
      ORDER BY uc.last_used_at IS NULL, uc.last_used_at DESC, r.name ASC`,
    { replacements: { userId, entityType: V1_GRANTABLE.entity_type, role: V1_GRANTABLE.role } }
  );

  for (const row of rows) {
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
  if (!ctx) return false;
  const uid = normalizeEntityId(userId);
  const entityId = normalizeEntityId(ctx.entity_id);
  if (!uid || !entityId) return false;
  if (!isV1GrantableCombination(ctx.entity_type, ctx.role)) return false;

  const [rows] = await sequelize.query(
    `SELECT 1 AS ok
       FROM user_contexts uc
       JOIN restaurants r ON r.id = uc.entity_id
      WHERE uc.user_id = :uid
        AND uc.entity_type = :entityType
        AND uc.entity_id = :entityId
        AND uc.role = :role
      LIMIT 1`,
    { replacements: { uid, entityType: ctx.entity_type, entityId, role: ctx.role } }
  );
  return rows.length > 0;
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
  if (!isV1GrantableCombination(ctx.entity_type, ctx.role)) {
    return { ok: false, reason: 'UNSUPPORTED_COMBINATION' };
  }

  const [rows] = await sequelize.query(
    `SELECT uc.id, uc.entity_id, uc.role, r.name, r.status
       FROM user_contexts uc
       JOIN restaurants r ON r.id = uc.entity_id
      WHERE uc.user_id = :uid
        AND uc.entity_type = :entityType
        AND uc.entity_id = :entityId
        AND uc.role = :role
      LIMIT 1`,
    { replacements: { uid, entityType: ctx.entity_type, entityId, role: ctx.role } }
  );
  if (!rows.length) return { ok: false, reason: 'CONTEXT_NOT_GRANTED' };

  const row = rows[0];
  return { ok: true, id: row.id, entity_id: row.entity_id, role: row.role, name: row.name, status: row.status };
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
  V1_GRANTABLE
};

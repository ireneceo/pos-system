/**
 * storePin — 매장 PIN 의 유일한 조회 (2026-11-13 · Fable 설계 .claude/fable-design-20261113-hat-admin-pin.md §2.2).
 *
 * PIN 은 «사람 × 매장» 값이다. 본래 계정은 users.pin_code, 연결(모자) 계정은 user_contexts.pin_code.
 * 조회 순서: ① 본래 계정(users.restaurant_id = R) — 지금과 같은 조건·같은 결과 ② 없으면 매장 모자(Restaurant Admin·Staff)
 * ③ 둘 다 비활성 계정이면 null(D4). PIN 을 쓰는 곳(로그인·권한 PIN·취소·현금·출퇴근 관리자)은 이 함수만 부른다.
 */
const { QueryTypes } = require('sequelize');

const RESTAURANT_HAT_ROLES = ['Restaurant Admin', 'Staff'];

function parsePerms(v) {
  let p = v;
  for (let i = 0; i < 3 && typeof p === 'string'; i++) { try { p = JSON.parse(p); } catch { p = []; } }
  return Array.isArray(p) ? p : [];
}

/**
 * @param {number|string} restaurantId
 * @param {string} pin
 * @param {{ nativeRoles?: string[]|null, transaction?: any }} [opts]
 *   nativeRoles — 본래 계정 조건의 역할 목록(지금 각 호출처가 쓰던 조건 그대로 넘긴다 · null = 역할 조건 없음)
 * @returns {Promise<null | { user: object, role: string, permissions: string[], via: 'native'|'hat', context: null|{id:number, entity_id:number, role:string, permissions:any} }>}
 */
async function findStorePinHolder(restaurantId, pin, opts = {}) {
  const { User, UserContext } = require('../models');
  const { Op } = require('sequelize');
  const rid = parseInt(restaurantId, 10);
  const code = pin == null ? '' : String(pin);
  if (!rid || !code) return null;
  const nativeRoles = opts.nativeRoles === undefined ? null : opts.nativeRoles;
  const where = { restaurant_id: rid, pin_code: code };
  if (Array.isArray(nativeRoles)) where.role = nativeRoles;
  const native = await User.findOne({
    where,
    attributes: ['id', 'full_name', 'email', 'username', 'role', 'department', 'brand_id', 'foodcourt_id', 'restaurant_id', 'manager_id', 'permissions', 'is_active'],
    transaction: opts.transaction,
  });
  if (native) {
    if (native.is_active === false) return null;
    return { user: native, role: native.role, permissions: parsePerms(native.permissions), via: 'native', context: null };
  }
  const rows = await UserContext.findAll({
    where: { entity_type: 'restaurant', entity_id: rid, pin_code: code, role: { [Op.in]: RESTAURANT_HAT_ROLES } },
    order: [['id', 'ASC']],
    limit: 2,
    transaction: opts.transaction,
  });
  if (!rows.length) return null;
  const ctx = rows[0];
  const user = await User.findByPk(ctx.user_id, {
    attributes: ['id', 'full_name', 'email', 'username', 'role', 'department', 'brand_id', 'foodcourt_id', 'restaurant_id', 'manager_id', 'permissions', 'is_active'],
    transaction: opts.transaction,
  });
  if (!user || user.is_active === false) return null;
  const userContexts = require('../services/userContexts');
  return {
    user,
    role: ctx.role,
    permissions: userContexts.hatPermissions('restaurant', ctx.role, userContexts.parsePermissions(ctx.permissions)),
    via: 'hat',
    context: { id: ctx.id, entity_id: ctx.entity_id, role: ctx.role, permissions: ctx.permissions },
  };
}

/**
 * 같은 매장에서 이 PIN 을 이미 누가 쓰나 — 본래 계정 ∪ 모자. 쓰는 곳 3군데(직원 생성·수정·모자 PIN)가 이것만 부른다.
 * @param {{ exceptUserId?: number, exceptContextId?: number, transaction?: any }} [opts]
 */
async function isPinTaken(restaurantId, pin, opts = {}) {
  const { sequelize } = require('../config/database');
  const rid = parseInt(restaurantId, 10);
  const code = pin == null ? '' : String(pin);
  if (!rid || !code) return false;
  const exU = opts.exceptUserId ? parseInt(opts.exceptUserId, 10) : 0;
  const exC = opts.exceptContextId ? parseInt(opts.exceptContextId, 10) : 0;
  const rows = await sequelize.query(
    `SELECT 1 FROM users WHERE restaurant_id = :rid AND pin_code = :code AND id <> :exU
     UNION ALL
     SELECT 1 FROM user_contexts WHERE entity_type = 'restaurant' AND entity_id = :rid AND pin_code = :code AND id <> :exC
     LIMIT 1`,
    { replacements: { rid, code, exU, exC }, type: QueryTypes.SELECT, transaction: opts.transaction });
  return rows.length > 0;
}

module.exports = { findStorePinHolder, isPinTaken, RESTAURANT_HAT_ROLES };

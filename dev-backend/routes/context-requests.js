'use strict';
/**
 * 역할 추가 요청 — 멀티 로그인 v1.3 (.claude/fable-design-20261005-context-request.md §5.3).
 *
 * 흐름: 사용자가 기존 매장·브랜드의 역할을 **요청** → 그 역할을 줄 수 있는 사람이 **승인** →
 *       승인이 services/userContexts.grantContext(유일한 쓰기 경로, 설계 §8-3)를 부른다.
 *       이 파일은 user_contexts·restaurant_managers 에 **직접 쓰지 않는다.**
 *
 * 승인 주체(§3 · Irene 확정 D1): Staff 요청 = 그 매장 RA(+SA) · RA·오너·BM 요청 = SA 만.
 *   보이는 범위는 visibleRequestScope 한 함수 — 목록·대기수·승인·거절이 전부 그것으로 행을 찾는다.
 *
 * ⚠ router.use(authenticateToken) 금지(전역 가드가 /api 로 샌다) — 라우트마다 명시.
 * ⚠ 리터럴 경로(/mine · /targets · /pending-count)는 /:id 보다 먼저.
 */
const express = require('express');
const router = express.Router();
const { sequelize } = require('../config/database');
const { authenticateToken } = require('../middleware/auth');
const { sanitizeString } = require('../middleware/validation');
const { logActivity } = require('../utils/activityLogger');
const userContexts = require('../services/userContexts');
const { emitContextChanged } = require('../services/contextSignals');

const MAX_PENDING = 5;
const BASE_URL = process.env.FRONTEND_URL || (process.env.NODE_ENV === 'production' ? 'https://purplehere.com' : 'https://dev.purplehere.com');

const bad = (res, status, message) => res.status(status).json({ success: false, message });

// JSON 칸은 드라이버에 따라 문자열로 온다.
function parsePermissions(v) {
  if (Array.isArray(v)) return v;
  if (typeof v === 'string') { try { const a = JSON.parse(v); return Array.isArray(a) ? a : []; } catch (_) { return []; } }
  return [];
}

// 같은 (대상, 매장/브랜드, 역할) 의 pending 행 — **방향 무관**(요청·초대). 요청·초대 양쪽 중복 판정이 같이 쓴다.
async function findPendingAnyDirection(userId, entityType, entityId, role) {
  const [[row]] = await sequelize.query(
    `SELECT id, initiator FROM user_context_requests
      WHERE user_id = :u AND entity_type = :t AND entity_id = :e AND role = :r AND status = 'pending'
      ORDER BY id ASC LIMIT 1`,
    { replacements: { u: userId, t: entityType, e: entityId, r: role } }
  );
  return row || null;
}

function cleanText(v, max) {
  if (v === null || v === undefined) return null;
  const s = sanitizeString(String(v));
  if (!s) return null;
  return s.slice(0, max);
}

/**
 * 승인자에게 보이는 요청의 범위 — **유일한 범위 판정**.
 * SA: 전부 · RA: 자기 매장(req.user.restaurant_id — 투영된 RA 모자여도 같다)의 (restaurant × Staff) 요청만.
 * @returns {{sql:string, replacements:object}|null}  null = 승인자 아님(403)
 */
function visibleRequestScope(reqUser) {
  if (!reqUser) return null;
  // v1.4: 승인자 범위는 «받은 요청»(initiator='requester') 만 — 초대(grantor)는 본인만 수락한다.
  // 이 조건이 빠지면 초대한 RA 가 자기 초대를 «승인» 해 본인 동의 없이 부여된다(FI-19).
  if (reqUser.role === 'System Admin') return { sql: "ucr.initiator = 'requester'", replacements: {} };
  if (reqUser.role === 'Restaurant Admin') {
    const rid = userContexts.normalizeEntityId(reqUser.restaurant_id);
    if (!rid) return null;
    return {
      sql: "ucr.initiator = 'requester' AND ucr.entity_type = 'restaurant' AND ucr.role = 'Staff' AND ucr.entity_id = :scopeRid",
      replacements: { scopeRid: rid }
    };
  }
  return null;
}

// 요청 행 + 대상 이름 (삭제된 대상이면 label null)
const LABEL_SELECT = `
  CASE ucr.entity_type WHEN 'restaurant' THEN r.name WHEN 'brand' THEN b.name END AS label`;
const LABEL_JOIN = `
  LEFT JOIN restaurants r ON ucr.entity_type = 'restaurant' AND r.id = ucr.entity_id
  LEFT JOIN brands b ON ucr.entity_type = 'brand' AND b.id = ucr.entity_id`;

async function findScopedRequest(reqUser, id) {
  const scope = visibleRequestScope(reqUser);
  if (!scope) return { forbidden: true };
  const rid = userContexts.normalizeEntityId(id);
  if (!rid) return { row: null };
  const [rows] = await sequelize.query(
    `SELECT ucr.*, ${LABEL_SELECT}
       FROM user_context_requests ucr ${LABEL_JOIN}
      WHERE ucr.id = :id AND (${scope.sql}) LIMIT 1`,
    { replacements: { id: rid, ...scope.replacements } }
  );
  return { row: rows[0] || null };
}

function approverLink(approver, entityId) {
  return approver === 'restaurant_admin' ? `${BASE_URL}/restaurant/${entityId}/staff` : `${BASE_URL}/pos/admin/staff`;
}

// 요청 생성 알림 — 실패해도 요청은 성공(메일은 부가).
async function notifyReceived({ combo, entityId, targetName, requester, message }) {
  try {
    const ns = require('../utils/notificationService');
    const { contextRequestReceivedEmail } = require('../utils/notificationTemplates');
    const ids = combo.approver === 'restaurant_admin'
      ? await ns.getRestaurantAdminIds(entityId)
      : await ns.getSystemAdminIds();
    const args = {
      requesterName: requester.full_name || requester.username || null,
      requesterEmail: requester.email || null,
      role: combo.role,
      targetName,
      message,
      link: approverLink(combo.approver, entityId)
    };
    // 2026-10-22 notification-addressee: 승인자 자격(매장 관리자 = «{매장} · 매장» / SA = 플랫폼) + 할 일 «승인 또는 거절»
    const { goLink } = require('../utils/notificationLinks');
    const addressee = combo.approver === 'restaurant_admin'
      ? { kind: 'store', entity_type: 'restaurant', entity_id: Number(entityId), entity_name: targetName || '' }
      : { kind: 'admin', entity_type: 'system', entity_id: null, entity_name: 'PurpleHere' };
    await ns.sendNotificationBatch(ids, 'context_request_received',
      (user) => Object.assign(contextRequestReceivedEmail({ ...args, link: goLink(addressee, 'staff') }, user.preferred_language || 'en'),
        { _addressee: addressee, _action: { state: 'action', key: 'approve_or_reject_request' } }));
  } catch (e) {
    console.warn('[context-requests] received notification failed (ignored):', e.message);
  }
}

async function notifyResult({ userId, approved, role, targetName, note }) {
  try {
    const ns = require('../utils/notificationService');
    const { contextRequestResultEmail } = require('../utils/notificationTemplates');
    const args = { approved, role, targetName, note, link: `${BASE_URL}/pos/select-context` };
    await ns.sendNotification(userId, 'context_request_result',
      (user) => contextRequestResultEmail(args, user.preferred_language || 'en'));
  } catch (e) {
    console.warn('[context-requests] result notification failed (ignored):', e.message);
  }
}

// ── 사용자 ──────────────────────────────────────────────────────────────────

// 내 요청 (pending · rejected). 승인된 것은 카드가 되므로 여기 안 보인다.
router.get('/mine', authenticateToken, async (req, res) => {
  try {
    if (req.user.role === 'System Admin') return bad(res, 403, 'System Admin cannot request roles');
    const [rows] = await sequelize.query(
      `SELECT ucr.id, ucr.entity_type, ucr.entity_id, ucr.role, ucr.message, ucr.status,
              ucr.decision_note, ucr.created_at, ucr.decided_at, ${LABEL_SELECT}
         FROM user_context_requests ucr ${LABEL_JOIN}
        WHERE ucr.user_id = :uid AND ucr.initiator = 'requester' AND ucr.status IN ('pending', 'rejected')
        ORDER BY ucr.created_at DESC, ucr.id DESC`,
      { replacements: { uid: req.user.id } }
    );
    // v1.4 받은 초대(pending) — data 는 종전 배열 그대로(호환), 초대는 meta 로.
    const [inv] = await sequelize.query(
      `SELECT ucr.id, ucr.entity_type, ucr.entity_id, ucr.role, ucr.permissions, ucr.message, ucr.created_at, ${LABEL_SELECT},
              COALESCE(NULLIF(cb.full_name, ''), cb.username) AS invited_by_name
         FROM user_context_requests ucr ${LABEL_JOIN}
         LEFT JOIN users cb ON cb.id = ucr.created_by
        WHERE ucr.user_id = :uid AND ucr.initiator = 'grantor' AND ucr.status = 'pending'
        ORDER BY ucr.created_at DESC, ucr.id DESC`,
      { replacements: { uid: req.user.id } }
    );
    const invitations = inv.map(r => ({
      id: r.id, entity_type: r.entity_type, entity_id: r.entity_id, role: r.role,
      label: r.label ?? null, permissions: parsePermissions(r.permissions), message: r.message,
      invited_by_name: r.invited_by_name ? String(r.invited_by_name).replace(/^r\d+:/i, '') : null,
      created_at: r.created_at
    }));
    res.json({ success: true, data: rows.map(r => ({ ...r, label: r.label ?? null })), meta: { invitations } });
  } catch (error) {
    console.error('[context-requests] GET /mine error:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// 대상 검색 — 이름 LIKE · 2자 미만 [] · 10건 · {id, name} 만.
router.get('/targets', authenticateToken, async (req, res) => {
  try {
    if (req.user.role === 'System Admin') return bad(res, 403, 'System Admin cannot request roles');
    const type = req.query.type;
    if (type !== 'restaurant' && type !== 'brand') return bad(res, 400, 'type must be restaurant or brand');
    const q = typeof req.query.q === 'string' ? req.query.q.trim().slice(0, 100) : '';
    if (q.length < 2) return res.json({ success: true, data: [] });
    const like = '%' + q.replace(/[\\%_]/g, m => '\\' + m) + '%';
    const table = type === 'restaurant' ? 'restaurants' : 'brands';
    const [rows] = await sequelize.query(
      `SELECT id, name FROM ${table} WHERE name LIKE :like ORDER BY name ASC LIMIT 10`,
      { replacements: { like } }
    );
    res.json({ success: true, data: rows.map(r => ({ id: r.id, name: r.name })) });
  } catch (error) {
    console.error('[context-requests] GET /targets error:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// ── 초대 (v1.4 · .claude/fable-design-20261016-link-existing-account-staff.md §5.4) ──────────────
// RA 가 기존 계정을 자기 매장 직원(Staff 모자)으로 «초대» → 본인이 «수락» 해야 grantContext.
// 같은 표의 반대 방향(initiator='grantor'). 대상의 id·역할·소속은 응답에 싣지 않는다(계정 정보 노출 금지).
const MAX_PENDING_INVITES_PER_STORE = 20;

// 초대하는 사람의 매장 — RA 는 자기 매장 강제(body 무시) · SA 는 body.restaurant_id. 아니면 null(403).
function inviterRestaurantId(reqUser, body) {
  if (!reqUser) return null;
  if (reqUser.role === 'Restaurant Admin') return userContexts.normalizeEntityId(reqUser.restaurant_id);
  if (reqUser.role === 'System Admin') return userContexts.normalizeEntityId((body || {}).restaurant_id);
  return null;
}

// 요금제 직원 한도 — 직원 생성·요청 승인과 같은 함수(countRestaurantSeats). 가득이면 403 본문, 아니면 null.
async function seatLimitBody(restaurantId) {
  const Restaurant = require('../models/Restaurant');
  const restaurant = await Restaurant.findByPk(restaurantId, { attributes: ['id', 'staff_limit'] });
  if (!restaurant || !restaurant.staff_limit || restaurant.staff_limit <= 0) return null;
  const current = await userContexts.countRestaurantSeats(restaurantId);
  if (current < restaurant.staff_limit) return null;
  return {
    success: false,
    message: `Staff limit reached. Your plan allows up to ${restaurant.staff_limit} staff members (including Restaurant Admin). Currently: ${current}.`,
    limit: restaurant.staff_limit,
    current,
    upgradeRequired: true
  };
}

// 취소할 수 있는 초대 1행 — 보낸 사람 · 그 매장 RA · SA. 아니면 null(404 — 존재 여부 안 흘림).
async function findCancellableInvite(reqUser, id) {
  const [[row]] = await sequelize.query(
    `SELECT id, user_id, entity_type, entity_id, role, created_by FROM user_context_requests
      WHERE id = :id AND initiator = 'grantor' AND status = 'pending' LIMIT 1`,
    { replacements: { id } }
  );
  if (!row || !reqUser) return null;
  if (reqUser.role === 'System Admin') return row;
  if (Number(row.created_by) === Number(reqUser.id)) return row;
  if (reqUser.role === 'Restaurant Admin'
      && row.entity_type === 'restaurant'
      && Number(row.entity_id) === userContexts.normalizeEntityId(reqUser.restaurant_id)) return row;
  return null;
}

// 받은 초대 1행 — **초대받은 본인만**. 아니면 null(404).
async function findMyInvite(reqUser, id) {
  const rid = userContexts.normalizeEntityId(id);
  if (!rid || !reqUser) return null;
  const [[row]] = await sequelize.query(
    `SELECT ucr.*, ${LABEL_SELECT}
       FROM user_context_requests ucr ${LABEL_JOIN}
      WHERE ucr.id = :id AND ucr.user_id = :uid AND ucr.initiator = 'grantor' LIMIT 1`,
    { replacements: { id: rid, uid: reqUser.id } }
  );
  return row || null;
}

async function notifyInviteReceived({ userId, inviter, targetName, permissionCount, message, role }) {
  try {
    const ns = require('../utils/notificationService');
    const { contextInviteReceivedEmail } = require('../utils/notificationTemplates');
    const inviterName = inviter ? String(inviter.full_name || inviter.username || '').replace(/^r\d+:/i, '') || null : null;
    const args = { inviterName, targetName, permissionCount, message, role, link: `${BASE_URL}/pos/select-context` };
    await ns.sendNotification(userId, 'context_invite_received',
      (user) => contextInviteReceivedEmail(args, user.preferred_language || 'en'));
  } catch (e) {
    console.warn('[context-requests] invite notification failed (ignored):', e.message);
  }
}

async function notifyInviteResult({ inviterId, accepted, invitee, targetName, entityId, note }) {
  if (!inviterId) return;
  try {
    const ns = require('../utils/notificationService');
    const { contextInviteResultEmail } = require('../utils/notificationTemplates');
    const inviteeName = invitee ? (invitee.full_name || invitee.email || null) : null;
    const { goLink } = require('../utils/notificationLinks');
    const addressee = await ns.getUserAddressee(inviterId, 'restaurant', entityId);
    const args = { accepted, inviteeName, targetName, note, link: goLink(addressee, 'staff') };
    await ns.sendNotification(inviterId, 'context_invite_result',
      (user) => Object.assign(contextInviteResultEmail(args, user.preferred_language || 'en'),
        { _addressee: addressee, _action: { state: 'result', tone: accepted ? 'good' : 'bad', key: 'no_action' } }));
  } catch (e) {
    console.warn('[context-requests] invite result notification failed (ignored):', e.message);
  }
}

router.post('/invite', authenticateToken, async (req, res) => {
  try {
    const body = req.body || {};
    const rid = inviterRestaurantId(req.user, body);
    if (req.user.role !== 'Restaurant Admin' && req.user.role !== 'System Admin') return bad(res, 403, 'Not allowed');
    // demo = 공개 로그인 계정이라 스팸 경로(요청과 같은 이유). is_test 는 허용.
    if (req.user.is_demo) return bad(res, 403, 'Demo accounts cannot invite');
    if (!rid) return bad(res, req.user.role === 'System Admin' ? 400 : 403,
      req.user.role === 'System Admin' ? 'restaurant_id is required' : 'Your account is not assigned to a restaurant.');

    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase().slice(0, 255) : '';
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return bad(res, 400, 'A valid email is required');

    const norm = userContexts.normalizeStaffPermissions(body.permissions);
    if (norm.error) return bad(res, 400, norm.error);

    const restaurant = await userContexts.loadGrantEntity('restaurant', rid);
    if (!restaurant) return bad(res, 404, userContexts.NOT_FOUND_MESSAGE.restaurant);

    const User = require('../models/User');
    const target = await User.findOne({ where: { email } });
    if (!target) return bad(res, 404, 'No account with this email');
    if (Number(target.id) === Number(req.user.id)) return bad(res, 400, 'You cannot invite yourself');
    if (target.role === 'System Admin') return bad(res, 400, 'Cannot invite a system administrator');
    if (target.is_demo) return bad(res, 400, 'Demo accounts cannot be invited');
    if (target.is_active === false || target.is_active === 0) return bad(res, 400, 'Cannot grant to a deactivated account');

    const held = await userContexts.alreadyHoldsContext(target, { entity_type: 'restaurant', entity_id: rid, role: 'Staff' }, restaurant);
    if (held) return bad(res, held.status, held.message);

    const dup = await findPendingAnyDirection(target.id, 'restaurant', rid, 'Staff');
    if (dup) {
      return bad(res, 409, dup.initiator === 'requester'
        ? 'A request from this person is already waiting — approve it instead'
        : 'An invitation for this account is already pending');
    }

    const [[pend]] = await sequelize.query(
      `SELECT COUNT(*) AS c FROM user_context_requests
        WHERE entity_type = 'restaurant' AND entity_id = :e AND status = 'pending' AND initiator = 'grantor'`,
      { replacements: { e: rid } }
    );
    if (Number(pend.c) >= MAX_PENDING_INVITES_PER_STORE) {
      return bad(res, 400, `A store can have at most ${MAX_PENDING_INVITES_PER_STORE} pending invitations`);
    }

    // 좌석 미리 검사(보낼 때) — 수락 때 같은 함수로 다시 센다.
    const full = await seatLimitBody(rid);
    if (full) return res.status(403).json(full);

    const message = cleanText(body.message, 300);
    const UserContextRequest = require('../models/UserContextRequest');
    const created = await UserContextRequest.create({
      user_id: target.id, entity_type: 'restaurant', entity_id: rid, role: 'Staff', message, status: 'pending',
      initiator: 'grantor', created_by: req.user.id, permissions: norm.permissions
    });

    logActivity(req, {
      action_type: 'create',
      entity_type: 'user_context',
      entity_id: target.id,
      description: `Invited ${email} to restaurant "${restaurant.name}" (#${rid}) as Staff [${norm.permissions.join(', ')}] (invitation #${created.id})`,
      restaurant_id: rid
    });
    notifyInviteReceived({ userId: target.id, inviter: req.user, targetName: restaurant.name, permissionCount: norm.permissions.length, message });
    emitContextChanged({ kind: 'invited', userId: target.id, entityType: 'restaurant', entityId: rid, role: 'Staff', requestId: created.id, label: restaurant.name });

    // 대상의 id·역할·소속은 싣지 않는다.
    res.status(201).json({
      success: true,
      data: { id: created.id, email, status: 'pending', label: restaurant.name },
      message: 'Invitation sent'
    });
  } catch (error) {
    console.error('[context-requests] POST /invite error:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// 새 매장의 관리자로 «이미 다른 매장이 있는» 기존 계정을 붙이기 (2026-10-29 Fable 판정 · Irene «권고대로»).
//   계정 소속(users.restaurant_id)은 옮기지 않는다 — 매장 관리자 모자(restaurant × Restaurant Admin)를 준다.
//   System Admin = 바로 부여 · BG/FG/오너 = 초대(initiator='grantor') → 본인 수락(POST /:id/accept) 때 부여.
//   호출자(routes/restaurants-crud.js)가 매장 접근 판정을 끝낸 뒤 부른다.
// @returns {Promise<{ok:true, mode:'granted'|'invited', id?:number}|{ok:false, status:number, message:string}>}
async function attachRestaurantAdmin({ req, target, restaurantId }) {
  const fail = (status, message) => ({ ok: false, status, message });
  const rid = userContexts.normalizeEntityId(restaurantId);
  const restaurant = rid ? await userContexts.loadGrantEntity('restaurant', rid) : null;
  if (!restaurant) return fail(404, userContexts.NOT_FOUND_MESSAGE.restaurant);
  const role = 'Restaurant Admin';

  if (req.user.role === 'System Admin') {
    const result = await userContexts.grantContext({
      target, entity_type: 'restaurant', entity_id: rid, role, grantedBy: req.user.id
    });
    if (!result.ok) return fail(result.status, result.message);
    logActivity(req, {
      action_type: 'create', entity_type: 'user_context', entity_id: target.id,
      entity_name: target.full_name || target.username || target.email,
      description: result.logDescription, restaurant_id: rid
    });
    emitContextChanged({ kind: 'granted', userId: target.id, entityType: 'restaurant', entityId: rid, role, label: restaurant.name });
    return { ok: true, mode: 'granted' };
  }

  if (req.user.is_demo) return fail(403, 'Demo accounts cannot invite');
  const held = await userContexts.alreadyHoldsContext(target, { entity_type: 'restaurant', entity_id: rid, role }, restaurant);
  if (held) return fail(held.status, held.message);
  const dup = await findPendingAnyDirection(target.id, 'restaurant', rid, role);
  if (dup) return fail(409, 'An invitation for this account is already pending');
  const full = await seatLimitBody(rid);
  if (full) return fail(403, full.message);

  const UserContextRequest = require('../models/UserContextRequest');
  const created = await UserContextRequest.create({
    user_id: target.id, entity_type: 'restaurant', entity_id: rid, role, status: 'pending',
    initiator: 'grantor', created_by: req.user.id, permissions: null
  });
  logActivity(req, {
    action_type: 'create', entity_type: 'user_context', entity_id: target.id,
    description: `Invited ${target.email} to restaurant "${restaurant.name}" (#${rid}) as Restaurant Admin (invitation #${created.id})`,
    restaurant_id: rid
  });
  notifyInviteReceived({ userId: target.id, inviter: req.user, targetName: restaurant.name, permissionCount: 0, message: null, role });
  emitContextChanged({ kind: 'invited', userId: target.id, entityType: 'restaurant', entityId: rid, role, requestId: created.id, label: restaurant.name });
  return { ok: true, mode: 'invited', id: created.id };
}

// 보낸 초대(pending) — RA: 자기 매장 · SA: 전부.
router.get('/sent', authenticateToken, async (req, res) => {
  try {
    let where;
    const replacements = {};
    if (req.user.role === 'System Admin') {
      where = '1=1';
    } else if (req.user.role === 'Restaurant Admin') {
      const rid = userContexts.normalizeEntityId(req.user.restaurant_id);
      if (!rid) return bad(res, 403, 'Not allowed');
      where = "ucr.entity_type = 'restaurant' AND ucr.entity_id = :rid";
      replacements.rid = rid;
    } else {
      return bad(res, 403, 'Not allowed');
    }
    const [rows] = await sequelize.query(
      `SELECT ucr.id, ucr.entity_type, ucr.entity_id, ucr.role, ucr.permissions, ucr.message, ucr.created_at, ucr.created_by,
              ${LABEL_SELECT}, u.email, u.full_name
         FROM user_context_requests ucr ${LABEL_JOIN}
         JOIN users u ON u.id = ucr.user_id
        WHERE ucr.initiator = 'grantor' AND ucr.status = 'pending' AND (${where})
        ORDER BY ucr.created_at DESC, ucr.id DESC
        LIMIT 200`,
      { replacements }
    );
    res.json({
      success: true,
      data: rows.map(r => ({
        id: r.id, entity_type: r.entity_type, entity_id: r.entity_id, role: r.role, label: r.label ?? null,
        email: r.email, full_name: r.full_name, permissions: parsePermissions(r.permissions),
        message: r.message, created_at: r.created_at, created_by: r.created_by
      }))
    });
  } catch (error) {
    console.error('[context-requests] GET /sent error:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// ── 승인자 (SA · RA) — 리터럴 경로 ───────────────────────────────────────────

router.get('/pending-count', authenticateToken, async (req, res) => {
  try {
    const scope = visibleRequestScope(req.user);
    if (!scope) return bad(res, 403, 'Not allowed');
    const [[row]] = await sequelize.query(
      `SELECT COUNT(*) AS c FROM user_context_requests ucr
        WHERE ucr.status = 'pending' AND (${scope.sql})`,
      { replacements: scope.replacements }
    );
    res.json({ success: true, data: { count: Number(row.c) || 0 } });
  } catch (error) {
    console.error('[context-requests] GET /pending-count error:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

router.get('/', authenticateToken, async (req, res) => {
  try {
    const scope = visibleRequestScope(req.user);
    if (!scope) return bad(res, 403, 'Not allowed');
    const status = req.query.status || 'pending';
    if (!['pending', 'approved', 'rejected'].includes(status)) return bad(res, 400, 'Invalid status');
    const [rows] = await sequelize.query(
      `SELECT ucr.id, ucr.user_id, ucr.entity_type, ucr.entity_id, ucr.role, ucr.message, ucr.status,
              ucr.decision_note, ucr.decided_by, ucr.decided_at, ucr.created_at, ${LABEL_SELECT},
              u.full_name AS requester_full_name, u.email AS requester_email, u.role AS requester_role
         FROM user_context_requests ucr ${LABEL_JOIN}
         JOIN users u ON u.id = ucr.user_id
        WHERE ucr.status = :status AND (${scope.sql})
        ORDER BY ucr.created_at DESC, ucr.id DESC
        LIMIT 200`,
      { replacements: { status, ...scope.replacements } }
    );
    const data = rows.map(r => ({
      id: r.id,
      entity_type: r.entity_type,
      entity_id: r.entity_id,
      role: r.role,
      label: r.label ?? null,
      message: r.message,
      status: r.status,
      decision_note: r.decision_note,
      decided_by: r.decided_by,
      decided_at: r.decided_at,
      created_at: r.created_at,
      requester: { id: r.user_id, full_name: r.requester_full_name, email: r.requester_email, role: r.requester_role }
    }));
    res.json({ success: true, data });
  } catch (error) {
    console.error('[context-requests] GET / error:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// ── 사용자: 요청 보내기 ─────────────────────────────────────────────────────

router.post('/', authenticateToken, async (req, res) => {
  try {
    if (req.user.role === 'System Admin') return bad(res, 403, 'System Admin cannot request roles');
    // demo = 공개 로그인 계정이라 스팸 경로(D5). is_test 는 허용.
    if (req.user.is_demo) return bad(res, 403, 'Demo accounts cannot request');

    const { entity_type, entity_id, role } = req.body || {};
    const combo = userContexts.findGrantableCombination(entity_type, role);
    if (!combo) return bad(res, 400, 'This role cannot be requested');
    const entityId = userContexts.normalizeEntityId(entity_id);
    if (!entityId) return bad(res, 400, 'entity_id must be a positive integer');

    const entity = await userContexts.loadGrantEntity(entity_type, entityId);
    if (!entity) return bad(res, 404, userContexts.NOT_FOUND_MESSAGE[entity_type]);

    // 「이미 가진 자격」 판정은 **네이티브 원행** 기준(투영본 req.user 가 아니라).
    const User = require('../models/User');
    const native = await User.findByPk(req.user.id);
    if (!native) return bad(res, 401, 'User not found');
    const held = await userContexts.alreadyHoldsContext(native, { entity_type, entity_id: entityId, role }, entity);
    if (held) return bad(res, held.status, held.message);

    const dup = await findPendingAnyDirection(native.id, entity_type, entityId, role);
    if (dup) {
      return bad(res, 409, dup.initiator === 'grantor'
        ? 'You have an invitation for this role — accept it instead'
        : 'A request for this role is already pending');
    }

    const [[pend]] = await sequelize.query(
      `SELECT COUNT(*) AS c FROM user_context_requests WHERE user_id = :u AND status = 'pending' AND initiator = 'requester'`,
      { replacements: { u: native.id } }
    );
    if (Number(pend.c) >= MAX_PENDING) return bad(res, 400, `You can have at most ${MAX_PENDING} pending requests`);

    const message = cleanText(req.body.message, 500);
    const UserContextRequest = require('../models/UserContextRequest');
    const created = await UserContextRequest.create({
      user_id: native.id, entity_type, entity_id: entityId, role, message, status: 'pending',
      initiator: 'requester', created_by: native.id
    });

    notifyReceived({ combo, entityId, targetName: entity.name, requester: native, message });
    // 승인자 화면(요청 패널)을 새로고침 없이 갱신 — 데이터 없는 신호(contextSignals).
    emitContextChanged({ kind: 'request_created', userId: native.id, entityType: entity_type, entityId, role, requestId: created.id });

    res.status(201).json({
      success: true,
      data: { id: created.id, entity_type, entity_id: entityId, role, status: 'pending', label: entity.name },
      message: 'Request sent'
    });
  } catch (error) {
    console.error('[context-requests] POST / error:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// ── 승인자: 승인 · 거절 ─────────────────────────────────────────────────────

router.post('/:id/approve', authenticateToken, async (req, res) => {
  try {
    const found = await findScopedRequest(req.user, req.params.id);
    if (found.forbidden) return bad(res, 403, 'Not allowed');
    const row = found.row;
    if (!row) return bad(res, 404, 'Request not found');
    if (row.status !== 'pending') return bad(res, 409, 'Request is not pending');

    const User = require('../models/User');
    const requester = await User.findByPk(row.user_id);
    if (!requester) return bad(res, 404, 'Request not found');
    if (requester.is_active === false || requester.is_active === 0) {
      return bad(res, 400, 'Cannot grant to a deactivated account');
    }

    let permissions;
    if (userContexts.isStaffHat(row.entity_type, row.role)) {
      const norm = userContexts.normalizeStaffPermissions((req.body || {}).permissions);
      if (norm.error) return bad(res, 400, norm.error);
      permissions = norm.permissions;
    } else if (userContexts.isBrandManagerHat(row.entity_type, row.role) && Array.isArray((req.body || {}).permissions)) {
      // 브랜드 매니저 모자(2026-10-26) — 승인 때 메뉴 권한을 고르면 함께 저장(안 고르면 NULL = 기본 2키).
      const norm = userContexts.normalizeBrandManagerPermissions(req.body.permissions);
      if (norm.error) return bad(res, 400, norm.error);
      permissions = norm.permissions;
    }

    // 요금제 직원 한도(D3) — 매장 모자(RA·Staff) 승인은 좌석을 센다. 직원 생성 경로와 같은 함수.
    if (userContexts.isRestaurantHat(row.entity_type, row.role)) {
      const Restaurant = require('../models/Restaurant');
      const restaurant = await Restaurant.findByPk(row.entity_id, { attributes: ['id', 'staff_limit'] });
      if (restaurant && restaurant.staff_limit && restaurant.staff_limit > 0) {
        const current = await userContexts.countRestaurantSeats(row.entity_id);
        if (current >= restaurant.staff_limit) {
          return res.status(403).json({
            success: false,
            message: `Staff limit reached. Your plan allows up to ${restaurant.staff_limit} staff members (including Restaurant Admin). Currently: ${current}.`,
            limit: restaurant.staff_limit,
            current,
            upgradeRequired: true
          });
        }
      }
    }

    // 부여 = 유일한 쓰기 경로. 실패면 그 사유 그대로 · 요청 행은 pending 유지(거절로 닫는다).
    const result = await userContexts.grantContext({
      target: requester,
      entity_type: row.entity_type,
      entity_id: row.entity_id,
      role: row.role,
      permissions,
      grantedBy: req.user.id
    });
    if (!result.ok) return bad(res, result.status, result.message);

    const [, meta] = await sequelize.query(
      `UPDATE user_context_requests
          SET status = 'approved', decided_by = :by, decided_at = NOW(), updated_at = NOW()
        WHERE id = :id AND status = 'pending'`,
      { replacements: { by: req.user.id, id: row.id } }
    );
    const affected = meta && typeof meta.affectedRows === 'number' ? meta.affectedRows : 1;
    if (!affected) return bad(res, 409, 'Request is not pending');

    logActivity(req, {
      action_type: 'create',
      entity_type: 'user_context',
      entity_id: requester.id,
      entity_name: requester.full_name || requester.username || requester.email,
      description: `${result.logDescription} (approved request #${row.id})`,
      ...(result.restaurantId ? { restaurant_id: result.restaurantId } : {})
    });

    notifyResult({ userId: requester.id, approved: true, role: row.role, targetName: row.label });
    // 요청자 화면(카드·헤더 스위처)과 그 매장 직원 목록을 즉시 갱신.
    emitContextChanged({ kind: 'granted', userId: requester.id, entityType: row.entity_type, entityId: row.entity_id, role: row.role, requestId: row.id, label: row.label });

    res.json({ success: true, data: { id: row.id, status: 'approved', grant: result.data }, message: 'Request approved' });
  } catch (error) {
    console.error('[context-requests] POST /:id/approve error:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

router.post('/:id/reject', authenticateToken, async (req, res) => {
  try {
    const found = await findScopedRequest(req.user, req.params.id);
    if (found.forbidden) return bad(res, 403, 'Not allowed');
    const row = found.row;
    if (!row) return bad(res, 404, 'Request not found');
    if (row.status !== 'pending') return bad(res, 409, 'Request is not pending');

    const note = cleanText((req.body || {}).note, 300);
    const [, meta] = await sequelize.query(
      `UPDATE user_context_requests
          SET status = 'rejected', decided_by = :by, decided_at = NOW(), decision_note = :note, updated_at = NOW()
        WHERE id = :id AND status = 'pending'`,
      { replacements: { by: req.user.id, id: row.id, note } }
    );
    const affected = meta && typeof meta.affectedRows === 'number' ? meta.affectedRows : 1;
    if (!affected) return bad(res, 409, 'Request is not pending');

    logActivity(req, {
      action_type: 'update',
      entity_type: 'user_context',
      entity_id: row.user_id,
      entity_name: `request #${row.id}`,
      description: `Declined ${row.role} request for ${row.entity_type} "${row.label || '#' + row.entity_id}" (#${row.entity_id}) (request #${row.id})`,
      ...(row.entity_type === 'restaurant' ? { restaurant_id: row.entity_id } : {})
    });

    notifyResult({ userId: row.user_id, approved: false, role: row.role, targetName: row.label, note });
    emitContextChanged({ kind: 'rejected', userId: row.user_id, entityType: row.entity_type, entityId: row.entity_id, role: row.role, requestId: row.id, label: row.label });

    res.json({ success: true, data: { id: row.id, status: 'rejected' }, message: 'Request declined' });
  } catch (error) {
    console.error('[context-requests] POST /:id/reject error:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// ── 초대받은 본인: 수락 · 거절 ───────────────────────────────────────────────

router.post('/:id/accept', authenticateToken, async (req, res) => {
  try {
    const row = await findMyInvite(req.user, req.params.id);
    if (!row) return bad(res, 404, 'Request not found');
    if (row.status !== 'pending') return bad(res, 409, 'Request is not pending');

    // 수락은 네이티브 행 기준(투영본 아님) — 요청 라우트와 같은 규칙.
    const User = require('../models/User');
    const native = await User.findByPk(req.user.id);
    if (!native) return bad(res, 401, 'User not found');
    if (native.is_active === false || native.is_active === 0) return bad(res, 400, 'Cannot grant to a deactivated account');

    // 좌석 본검사(수락 순간) — 보낸 뒤 늘어난 직원이 새지 않게(FI-22).
    const full = await seatLimitBody(row.entity_id);
    if (full) return res.status(403).json(full);

    const result = await userContexts.grantContext({
      target: native,
      entity_type: row.entity_type,
      entity_id: row.entity_id,
      role: row.role,
      permissions: parsePermissions(row.permissions),
      grantedBy: row.created_by || native.id
    });
    if (!result.ok) return bad(res, result.status, result.message);

    const [, meta] = await sequelize.query(
      `UPDATE user_context_requests
          SET status = 'approved', decided_by = :by, decided_at = NOW(), updated_at = NOW()
        WHERE id = :id AND initiator = 'grantor' AND status = 'pending'`,
      { replacements: { by: native.id, id: row.id } }
    );
    const affected = meta && typeof meta.affectedRows === 'number' ? meta.affectedRows : 1;
    if (!affected) return bad(res, 409, 'Request is not pending');

    logActivity(req, {
      action_type: 'create',
      entity_type: 'user_context',
      entity_id: native.id,
      entity_name: native.full_name || native.username || native.email,
      description: `${result.logDescription} (accepted invitation #${row.id})`,
      ...(result.restaurantId ? { restaurant_id: result.restaurantId } : {})
    });
    notifyInviteResult({ inviterId: row.created_by, accepted: true, invitee: native, targetName: row.label, entityId: row.entity_id });
    emitContextChanged({ kind: 'granted', userId: native.id, entityType: row.entity_type, entityId: row.entity_id, role: row.role, requestId: row.id, label: row.label });

    res.json({ success: true, data: { id: row.id, status: 'approved', grant: result.data }, message: 'Invitation accepted' });
  } catch (error) {
    console.error('[context-requests] POST /:id/accept error:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

router.post('/:id/decline', authenticateToken, async (req, res) => {
  try {
    const row = await findMyInvite(req.user, req.params.id);
    if (!row) return bad(res, 404, 'Request not found');
    if (row.status !== 'pending') return bad(res, 409, 'Request is not pending');
    const note = cleanText((req.body || {}).note, 300);
    const [, meta] = await sequelize.query(
      `UPDATE user_context_requests
          SET status = 'rejected', decided_by = :by, decided_at = NOW(), decision_note = :note, updated_at = NOW()
        WHERE id = :id AND initiator = 'grantor' AND status = 'pending'`,
      { replacements: { by: req.user.id, note, id: row.id } }
    );
    const affected = meta && typeof meta.affectedRows === 'number' ? meta.affectedRows : 1;
    if (!affected) return bad(res, 409, 'Request is not pending');

    const User = require('../models/User');
    const native = await User.findByPk(req.user.id);
    notifyInviteResult({ inviterId: row.created_by, accepted: false, invitee: native, targetName: row.label, entityId: row.entity_id, note });
    emitContextChanged({ kind: 'invite_declined', userId: req.user.id, entityType: row.entity_type, entityId: row.entity_id, role: row.role, requestId: row.id });

    res.json({ success: true, data: { id: row.id, status: 'rejected' }, message: 'Invitation declined' });
  } catch (error) {
    console.error('[context-requests] POST /:id/decline error:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// ── 사용자: 내 요청 취소/지우기 ────────────────────────────────────────────

router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const id = userContexts.normalizeEntityId(req.params.id);
    if (!id) return bad(res, 404, 'Request not found');
    // ① 내 요청(requester) — 종전 그대로. 초대(grantor)는 받은 사람이 여기로 지울 수 없다(거절은 /decline).
    const [[before]] = await sequelize.query(
      `SELECT id, entity_type, entity_id, role, status FROM user_context_requests
        WHERE id = :id AND user_id = :uid AND initiator = 'requester' AND status IN ('pending', 'rejected')`,
      { replacements: { id, uid: req.user.id } }
    );
    if (before) {
      const [, meta] = await sequelize.query(
        `DELETE FROM user_context_requests
          WHERE id = :id AND user_id = :uid AND initiator = 'requester' AND status IN ('pending', 'rejected')`,
        { replacements: { id, uid: req.user.id } }
      );
      const affected = meta && typeof meta.affectedRows === 'number' ? meta.affectedRows : 0;
      if (!affected) return bad(res, 404, 'Request not found');
      if (before.status === 'pending') {
        emitContextChanged({ kind: 'request_cancelled', userId: req.user.id, entityType: before.entity_type, entityId: before.entity_id, role: before.role, requestId: before.id });
      }
      return res.json({ success: true, data: { id }, message: 'Request removed' });
    }

    // ② 보낸 초대 취소 — 보낸 사람 또는 그 매장 RA · SA. pending 만.
    const inv = await findCancellableInvite(req.user, id);
    if (!inv) return bad(res, 404, 'Request not found');
    const [, meta2] = await sequelize.query(
      `DELETE FROM user_context_requests WHERE id = :id AND initiator = 'grantor' AND status = 'pending'`,
      { replacements: { id } }
    );
    const affected2 = meta2 && typeof meta2.affectedRows === 'number' ? meta2.affectedRows : 0;
    if (!affected2) return bad(res, 404, 'Request not found');
    logActivity(req, {
      action_type: 'delete',
      entity_type: 'user_context',
      entity_id: inv.user_id,
      description: `Cancelled staff invitation #${inv.id} for restaurant #${inv.entity_id}`,
      restaurant_id: inv.entity_id
    });
    emitContextChanged({ kind: 'invite_cancelled', userId: inv.user_id, entityType: inv.entity_type, entityId: inv.entity_id, role: inv.role, requestId: inv.id });
    res.json({ success: true, data: { id }, message: 'Invitation cancelled' });
  } catch (error) {
    console.error('[context-requests] DELETE /:id error:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
module.exports.visibleRequestScope = visibleRequestScope;
module.exports.attachRestaurantAdmin = attachRestaurantAdmin;

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

const MAX_PENDING = 5;
const BASE_URL = process.env.FRONTEND_URL || (process.env.NODE_ENV === 'production' ? 'https://purplehere.com' : 'https://dev.purplehere.com');

const bad = (res, status, message) => res.status(status).json({ success: false, message });

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
  if (reqUser.role === 'System Admin') return { sql: '1=1', replacements: {} };
  if (reqUser.role === 'Restaurant Admin') {
    const rid = userContexts.normalizeEntityId(reqUser.restaurant_id);
    if (!rid) return null;
    return {
      sql: "ucr.entity_type = 'restaurant' AND ucr.role = 'Staff' AND ucr.entity_id = :scopeRid",
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
    await ns.sendNotificationBatch(ids, 'context_request_received',
      (user) => contextRequestReceivedEmail(args, user.preferred_language || 'en'));
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
        WHERE ucr.user_id = :uid AND ucr.status IN ('pending', 'rejected')
        ORDER BY ucr.created_at DESC, ucr.id DESC`,
      { replacements: { uid: req.user.id } }
    );
    res.json({ success: true, data: rows.map(r => ({ ...r, label: r.label ?? null })) });
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

    const [[dup]] = await sequelize.query(
      `SELECT COUNT(*) AS c FROM user_context_requests
        WHERE user_id = :u AND entity_type = :t AND entity_id = :e AND role = :r AND status = 'pending'`,
      { replacements: { u: native.id, t: entity_type, e: entityId, r: role } }
    );
    if (Number(dup.c) > 0) return bad(res, 409, 'A request for this role is already pending');

    const [[pend]] = await sequelize.query(
      `SELECT COUNT(*) AS c FROM user_context_requests WHERE user_id = :u AND status = 'pending'`,
      { replacements: { u: native.id } }
    );
    if (Number(pend.c) >= MAX_PENDING) return bad(res, 400, `You can have at most ${MAX_PENDING} pending requests`);

    const message = cleanText(req.body.message, 500);
    const UserContextRequest = require('../models/UserContextRequest');
    const created = await UserContextRequest.create({
      user_id: native.id, entity_type, entity_id: entityId, role, message, status: 'pending'
    });

    notifyReceived({ combo, entityId, targetName: entity.name, requester: native, message });

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

    res.json({ success: true, data: { id: row.id, status: 'rejected' }, message: 'Request declined' });
  } catch (error) {
    console.error('[context-requests] POST /:id/reject error:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// ── 사용자: 내 요청 취소/지우기 ────────────────────────────────────────────

router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const id = userContexts.normalizeEntityId(req.params.id);
    if (!id) return bad(res, 404, 'Request not found');
    const [, meta] = await sequelize.query(
      `DELETE FROM user_context_requests
        WHERE id = :id AND user_id = :uid AND status IN ('pending', 'rejected')`,
      { replacements: { id, uid: req.user.id } }
    );
    const affected = meta && typeof meta.affectedRows === 'number' ? meta.affectedRows : 0;
    if (!affected) return bad(res, 404, 'Request not found');
    res.json({ success: true, data: { id }, message: 'Request removed' });
  } catch (error) {
    console.error('[context-requests] DELETE /:id error:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
module.exports.visibleRequestScope = visibleRequestScope;

/**
 * routes/attendance.js — 직원 출퇴근·휴가·휴일 (/api/restaurants/:restaurantId/attendance/...)
 *
 * 설계: .claude/fable-design-20261016-staff-attendance.md (Fable 설계 · Irene «권고대로» 2026-10-16, Q1·Q2·Q3 = A).
 * 가드: 이 파일 안에서 건다(server.js 의 정확한 경로에 마운트 — 라우터 전역 가드가 /api 로 새지 않게).
 *   전부 authenticateToken + checkRestaurantAccess + requireRestaurantModule('staff_attendance').
 *   관리 API 는 + requireRole('Restaurant Admin','System Admin'). 직원 본인 API 는 req.user.id 로만 자기 것.
 * 시각은 UTC 저장, 하루 경계·표시 날짜는 매장 타임존. 기록은 지우지 않고 고친다(원래 값 보존).
 */
const express = require('express');
const router = express.Router({ mergeParams: true });
const path = require('path');
const fs = require('fs');
const rateLimit = require('express-rate-limit');
const { Op } = require('sequelize');

const { authenticateToken, checkRestaurantAccess, requireRole } = require('../middleware/auth');
const { requireRestaurantModule } = require('../middleware/requireModule');
const { sequelize } = require('../config/database');
const {
  Restaurant, User, AttendanceRecord, AttendanceNetwork, StaffWorkProfile,
  LeaveType, LeaveEntitlement, LeaveRequest, StoreHoliday,
} = require('../models');
const { clientIp } = require('../utils/clientIp');
const { networkKey, readSettings, DEFAULT_SETTINGS, findMatchingNetwork, registerNetwork } = require('../utils/attendanceNetwork');
const { computeLeaveDays, isValidDate } = require('../utils/leaveDays');
const { getRestaurantTimezone } = require('../utils/dateTimeHelper');

const ADMIN_ROLES = ['Restaurant Admin', 'System Admin'];
const STAFF_ROLES = ['Staff', 'Restaurant Admin'];
const IDEMPOTENT_MS = 60 * 1000;

const common = [authenticateToken, checkRestaurantAccess, requireRestaurantModule('staff_attendance', 'restaurantId')];
const admin = [...common, requireRole(...ADMIN_ROLES)];

// PIN 은 4자리 — 대입 공격을 세션 사용자·매장 단위로 막는다(태블릿 하나에서 1분 20회)
const pinLimiter = rateLimit({
  windowMs: 60 * 1000, max: 20,
  keyGenerator: (req) => `att-pin:u${req.user?.id || 0}:${req.params.restaurantId}`,
  skip: (req) => !(req.body && (req.body.pin_code || req.body.admin_pin)),
  message: { success: false, code: 'TOO_MANY_PIN_ATTEMPTS', message: 'Too many PIN attempts, wait a minute' },
});

// ───────────────────────── 헬퍼 ─────────────────────────

const rid = (req) => Number(req.params.restaurantId);
const fail = (res, status, code, message) => res.status(status).json({ success: false, code, message });
const isAdmin = (u) => ADMIN_ROLES.includes(u?.role);
const belongs = (u, restaurantId) => STAFF_ROLES.includes(u?.role) && Number(u.restaurant_id) === Number(restaurantId);
const isActiveUser = (u) => !(u.is_active === false || u.is_active === 0);

function serverError(res, e, where) {
  console.error(`[attendance] ${where}:`, e.message);
  return res.status(500).json({ success: false, message: 'Internal server error' });
}

async function loadStore(restaurantId, transaction) {
  const r = await Restaurant.findByPk(restaurantId, { attributes: ['id', 'name', 'operation_settings', 'country'], transaction });
  if (!r) return null;
  const raw = r.getDataValue('operation_settings');
  return { row: r, tz: getRestaurantTimezone(r), settings: readSettings(raw) };
}

const localDate = (date, tz) => new Date(date).toLocaleDateString('en-CA', { timeZone: tz });
const minutesBetween = (a, b) => Math.max(0, Math.round((new Date(b) - new Date(a)) / 60000));

function recordView(r, tz) {
  const j = r.toJSON ? r.toJSON() : r;
  const end = j.clock_out_at || new Date();
  return {
    id: j.id, user_id: j.user_id, user_name: j.user?.full_name || j.user?.username || null,
    work_date: j.work_date, clock_in_at: j.clock_in_at, clock_out_at: j.clock_out_at,
    minutes: minutesBetween(j.clock_in_at, end), is_open: !j.clock_out_at,
    clock_in_method: j.clock_in_method, clock_out_method: j.clock_out_method,
    clock_in_network: j.clock_in_network, clock_out_network: j.clock_out_network,
    status: j.status, corrected: j.status === 'corrected',
    original_clock_in_at: j.original_clock_in_at, original_clock_out_at: j.original_clock_out_at,
    correction_reason: j.correction_reason, corrected_at: j.corrected_at, note: j.note,
    clock_in_local_date: tz ? localDate(j.clock_in_at, tz) : undefined,
  };
}

/** 기간(YYYY-MM-DD) → work_date 조건. 기본 = 최근 31일 */
function dateRange(q, tz) {
  const today = localDate(new Date(), tz);
  const to = isValidDate(q.to) ? q.to : today;
  let from = q.from;
  if (!isValidDate(from)) {
    const d = new Date(`${to}T00:00:00Z`); d.setUTCDate(d.getUTCDate() - 30); from = d.toISOString().slice(0, 10);
  }
  return { from, to };
}

/** 이 매장의 출퇴근 대상 직원(활성) */
async function findStoreStaff(restaurantId, where = {}, transaction) {
  return User.findOne({
    where: { restaurant_id: restaurantId, role: STAFF_ROLES, ...where },
    attributes: ['id', 'full_name', 'username', 'role', 'restaurant_id', 'permissions', 'is_active', 'preferred_language'],
    transaction,
  });
}

// ───────────────────────── 출퇴근 찍기 ─────────────────────────

/**
 * 네트워크 검사 — 설정이 켜져 있으면 등록 주소와 비교, 안 맞으면 관리자 PIN 으로만 통과.
 * 반환 { network:'ok'|'off'|'override', overrideBy } 또는 { error:[status,code,message] }
 */
async function checkNetwork(req, store, restaurantId, adminPin, transaction) {
  if (!store.settings.network_restriction) return { network: 'off' };
  const ip = clientIp(req);
  const match = await findMatchingNetwork(restaurantId, ip, transaction);
  if (match) {
    await match.update({ last_matched_at: new Date() }, { transaction, silent: true });
    return { network: 'ok' };
  }
  if (adminPin) {
    if (!/^\d{4}$/.test(String(adminPin))) return { error: [401, 'INVALID_ADMIN_PIN', 'Invalid manager PIN'] };
    const ra = await User.findOne({
      where: { restaurant_id: restaurantId, role: 'Restaurant Admin', pin_code: String(adminPin) },
      attributes: ['id', 'is_active'], transaction,
    });
    if (!ra || !isActiveUser(ra)) return { error: [401, 'INVALID_ADMIN_PIN', 'Invalid manager PIN'] };
    if (store.settings.pin_override_registers_network) {
      await registerNetwork(restaurantId, ip, { source: 'pin_override', label: 'Auto (manager PIN)', userId: ra.id, transaction });
    }
    return { network: 'override', overrideBy: ra.id };
  }
  return { error: [409, 'NETWORK_MISMATCH', 'Not connected to the store network. Ask a manager to confirm with their PIN.'] };
}

router.post('/clock', ...common, pinLimiter, async (req, res) => {
  const restaurantId = rid(req);
  const { action, method = 'self', pin_code, admin_pin, note } = req.body || {};
  if (!['in', 'out'].includes(action)) return fail(res, 400, 'VALIDATION_ERROR', 'action must be in or out');
  if (!['self', 'pos_pin'].includes(method)) return fail(res, 400, 'VALIDATION_ERROR', 'method must be self or pos_pin');

  try {
    const store = await loadStore(restaurantId);
    if (!store) return fail(res, 404, 'NOT_FOUND', 'Restaurant not found');

    // 누구로 찍나
    let target;
    if (method === 'self') {
      if (!store.settings.allow_self_clock) return fail(res, 403, 'METHOD_DISABLED', 'Clocking from your own device is turned off for this store');
      if (!belongs(req.user, restaurantId)) return fail(res, 403, 'FORBIDDEN', 'Only staff of this store can clock in');
      target = await findStoreStaff(restaurantId, { id: req.user.id });
    } else {
      if (!store.settings.allow_pos_pin_clock) return fail(res, 403, 'METHOD_DISABLED', 'Time clock on the store tablet is turned off');
      const sessionOk = req.user.role === 'System Admin'
        || (belongs(req.user, restaurantId) && (req.user.role === 'Restaurant Admin' || (req.user.permissions || []).includes('access_pos')));
      if (!sessionOk) return fail(res, 403, 'FORBIDDEN', 'The time clock needs a POS session');
      if (!/^\d{4}$/.test(String(pin_code || ''))) return fail(res, 401, 'INVALID_PIN', 'Invalid PIN');
      target = await findStoreStaff(restaurantId, { pin_code: String(pin_code) });
      if (!target) return fail(res, 401, 'INVALID_PIN', 'Invalid PIN');
    }
    if (!target || !isActiveUser(target)) return fail(res, 403, 'FORBIDDEN', 'This account is not active');

    const net = await checkNetwork(req, store, restaurantId, admin_pin);
    if (net.error) return fail(res, ...net.error);

    const ip = clientIp(req);
    const now = new Date();
    const who = { id: target.id, name: target.full_name || target.username };

    if (action === 'in') {
      const open = await AttendanceRecord.findOne({ where: { open_user_id: target.id } });
      if (open) {
        if (now - new Date(open.clock_in_at) < IDEMPOTENT_MS) {
          return res.json({ success: true, data: { record: recordView(open, store.tz), user: who, repeated: true } });
        }
        return fail(res, 409, 'ALREADY_CLOCKED_IN', 'Already clocked in');
      }
      try {
        const rec = await AttendanceRecord.create({
          restaurant_id: restaurantId, user_id: target.id, open_user_id: target.id,
          work_date: localDate(now, store.tz), clock_in_at: now,
          clock_in_method: method, clock_in_ip: ip, clock_in_network: net.network,
          override_by: net.overrideBy || null, status: 'open',
          note: note ? String(note).slice(0, 255) : null,
        });
        return res.status(201).json({ success: true, data: { record: recordView(rec, store.tz), user: who } });
      } catch (e) {
        // 동시에 두 번 눌러 UNIQUE(open_user_id) 에 걸림 = 이미 출근
        if (e.name === 'SequelizeUniqueConstraintError') return fail(res, 409, 'ALREADY_CLOCKED_IN', 'Already clocked in');
        throw e;
      }
    }

    // out
    const result = await sequelize.transaction(async (transaction) => {
      const open = await AttendanceRecord.findOne({ where: { open_user_id: target.id }, transaction, lock: transaction.LOCK.UPDATE });
      if (!open) {
        const last = await AttendanceRecord.findOne({
          where: { user_id: target.id, clock_out_at: { [Op.ne]: null } }, order: [['clock_out_at', 'DESC']], transaction,
        });
        if (last && now - new Date(last.clock_out_at) < IDEMPOTENT_MS) return { record: last, repeated: true };
        return null;
      }
      await open.update({
        clock_out_at: now, open_user_id: null, clock_out_method: method, clock_out_ip: ip,
        clock_out_network: net.network,
        override_by: open.override_by || net.overrideBy || null,
        status: open.status === 'corrected' ? 'corrected' : 'closed',
      }, { transaction });
      return { record: open };
    });
    if (!result) return fail(res, 404, 'NO_OPEN_SESSION', 'Not clocked in');
    return res.json({ success: true, data: { record: recordView(result.record, store.tz), user: who, repeated: !!result.repeated } });
  } catch (e) {
    return serverError(res, e, 'clock');
  }
});

/** 공용 태블릿: PIN 으로 직원 이름·지금 상태만 확인(찍지 않음) */
router.post('/pin-lookup', ...common, pinLimiter, async (req, res) => {
  const restaurantId = rid(req);
  try {
    const sessionOk = req.user.role === 'System Admin'
      || (belongs(req.user, restaurantId) && (req.user.role === 'Restaurant Admin' || (req.user.permissions || []).includes('access_pos')));
    if (!sessionOk) return fail(res, 403, 'FORBIDDEN', 'The time clock needs a POS session');
    const pin = String(req.body?.pin_code || '');
    if (!/^\d{4}$/.test(pin)) return fail(res, 401, 'INVALID_PIN', 'Invalid PIN');
    const target = await findStoreStaff(restaurantId, { pin_code: pin });
    if (!target || !isActiveUser(target)) return fail(res, 401, 'INVALID_PIN', 'Invalid PIN');
    const store = await loadStore(restaurantId);
    const open = await AttendanceRecord.findOne({ where: { open_user_id: target.id } });
    return res.json({ success: true, data: {
      user: { id: target.id, name: target.full_name || target.username },
      open: open ? recordView(open, store.tz) : null,
    } });
  } catch (e) {
    return serverError(res, e, 'pin-lookup');
  }
});

// ───────────────────────── 내 기록 ─────────────────────────

function requireOwnStaff(req, res, next) {
  if (!belongs(req.user, rid(req))) return fail(res, 403, 'FORBIDDEN', 'Only staff of this store');
  return next();
}

router.get('/me/status', ...common, requireOwnStaff, async (req, res) => {
  try {
    const store = await loadStore(rid(req));
    const open = await AttendanceRecord.findOne({ where: { open_user_id: req.user.id } });
    return res.json({ success: true, data: {
      open: open ? recordView(open, store.tz) : null,
      settings: {
        network_restriction: store.settings.network_restriction,
        allow_self_clock: store.settings.allow_self_clock,
        allow_pos_pin_clock: store.settings.allow_pos_pin_clock,
      },
      time_zone: store.tz,
    } });
  } catch (e) { return serverError(res, e, 'me/status'); }
});

router.get(['/me', '/me/today'], ...common, requireOwnStaff, async (req, res) => {
  try {
    const store = await loadStore(rid(req));
    const today = req.path.endsWith('/today');
    const { from, to } = today ? { from: localDate(new Date(), store.tz), to: localDate(new Date(), store.tz) } : dateRange(req.query, store.tz);
    const rows = await AttendanceRecord.findAll({
      where: { restaurant_id: rid(req), user_id: req.user.id, work_date: { [Op.between]: [from, to] } },
      order: [['clock_in_at', 'DESC']],
    });
    const list = rows.map(r => recordView(r, store.tz));
    return res.json({ success: true, data: { from, to, records: list, total_minutes: list.reduce((s, r) => s + (r.is_open ? 0 : r.minutes), 0) } });
  } catch (e) { return serverError(res, e, 'me'); }
});

// ───────────────────────── 관리: 기록 ─────────────────────────

router.get('/live', ...admin, async (req, res) => {
  try {
    const store = await loadStore(rid(req));
    const rows = await AttendanceRecord.findAll({
      where: { restaurant_id: rid(req), clock_out_at: null },
      include: [{ model: User, as: 'user', attributes: ['id', 'full_name', 'username'] }],
      order: [['clock_in_at', 'ASC']],
    });
    const flagMs = Number(store.settings.open_session_flag_hours || DEFAULT_SETTINGS.open_session_flag_hours) * 3600 * 1000;
    const now = Date.now();
    const list = rows.map(r => ({ ...recordView(r, store.tz), overdue: now - new Date(r.clock_in_at).getTime() > flagMs }));
    // 오늘 휴가자(승인된 것)
    const today = localDate(new Date(), store.tz);
    const onLeave = await LeaveRequest.findAll({
      where: { restaurant_id: rid(req), status: 'approved', start_date: { [Op.lte]: today }, end_date: { [Op.gte]: today } },
      include: [{ model: User, as: 'user', attributes: ['id', 'full_name', 'username'] }, { model: LeaveType, as: 'leaveType', attributes: ['id', 'name', 'color'] }],
    });
    const pendingLeave = await LeaveRequest.count({ where: { restaurant_id: rid(req), status: 'pending' } });
    return res.json({ success: true, data: {
      today, working: list.filter(r => !r.overdue), overdue: list.filter(r => r.overdue),
      on_leave: onLeave.map(l => ({ id: l.id, user_id: l.user_id, user_name: l.user?.full_name || l.user?.username, type: l.leaveType?.name, color: l.leaveType?.color, half_day: l.half_day })),
      pending_leave: pendingLeave,
    } });
  } catch (e) { return serverError(res, e, 'live'); }
});

router.get('/records', ...admin, async (req, res) => {
  try {
    const store = await loadStore(rid(req));
    const { from, to } = dateRange(req.query, store.tz);
    const where = { restaurant_id: rid(req), work_date: { [Op.between]: [from, to] } };
    if (req.query.user_id) where.user_id = Number(req.query.user_id);
    if (req.query.status === 'open') where.clock_out_at = null;
    else if (['closed', 'corrected'].includes(req.query.status)) where.status = req.query.status;
    const rows = await AttendanceRecord.findAll({
      where, include: [{ model: User, as: 'user', attributes: ['id', 'full_name', 'username'] }],
      order: [['clock_in_at', 'DESC']], limit: 2000,
    });
    return res.json({ success: true, data: { from, to, records: rows.map(r => recordView(r, store.tz)) } });
  } catch (e) { return serverError(res, e, 'records'); }
});

/** 월별 직원 근무시간 합 — 근무시간은 저장하지 않고 기록에서 계산(급여 단계 대비 §9) */
router.get('/summary', ...admin, async (req, res) => {
  try {
    const store = await loadStore(rid(req));
    const month = /^\d{4}-\d{2}$/.test(req.query.month || '') ? req.query.month : localDate(new Date(), store.tz).slice(0, 7);
    const [y, m] = month.split('-').map(Number);
    const from = `${month}-01`;
    const to = new Date(Date.UTC(y, m, 0)).toISOString().slice(0, 10);
    const rows = await AttendanceRecord.findAll({
      where: { restaurant_id: rid(req), work_date: { [Op.between]: [from, to] } },
      include: [{ model: User, as: 'user', attributes: ['id', 'full_name', 'username'] }],
    });
    const flagMs = Number(store.settings.open_session_flag_hours || 16) * 3600 * 1000;
    const by = new Map();
    for (const r of rows) {
      const k = r.user_id;
      if (!by.has(k)) by.set(k, { user_id: k, user_name: r.user?.full_name || r.user?.username, minutes: 0, days: new Set(), records: 0, open: 0, overdue: 0 });
      const s = by.get(k);
      s.records++; s.days.add(r.work_date);
      if (r.clock_out_at) s.minutes += minutesBetween(r.clock_in_at, r.clock_out_at);
      else { s.open++; if (Date.now() - new Date(r.clock_in_at).getTime() > flagMs) s.overdue++; }
    }
    const list = [...by.values()].map(s => ({ ...s, days: s.days.size })).sort((a, b) => String(a.user_name).localeCompare(String(b.user_name)));
    return res.json({ success: true, data: { month, from, to, staff: list } });
  } catch (e) { return serverError(res, e, 'summary'); }
});

function parseInstant(v) {
  if (v == null || v === '') return null;
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? undefined : d;
}

/** 기록 고치기 — 사유 필수, 원래 값은 처음 고칠 때 한 번만 보존. 지우기 API 는 없다. */
router.patch('/records/:id', ...admin, async (req, res) => {
  try {
    const reason = String(req.body?.reason || '').trim();
    if (!reason) return fail(res, 400, 'REASON_REQUIRED', 'A reason is required to correct a record');
    const rec = await AttendanceRecord.findOne({ where: { id: Number(req.params.id), restaurant_id: rid(req) } });
    if (!rec) return fail(res, 404, 'NOT_FOUND', 'Record not found');
    const store = await loadStore(rid(req));

    const inAt = 'clock_in_at' in (req.body || {}) ? parseInstant(req.body.clock_in_at) : rec.clock_in_at;
    const outAt = 'clock_out_at' in (req.body || {}) ? parseInstant(req.body.clock_out_at) : rec.clock_out_at;
    if (inAt === undefined || outAt === undefined || !inAt) return fail(res, 400, 'VALIDATION_ERROR', 'Invalid time');
    if (outAt && outAt <= inAt) return fail(res, 400, 'VALIDATION_ERROR', 'Clock-out must be after clock-in');
    if (outAt && outAt > new Date(Date.now() + 60000)) return fail(res, 400, 'VALIDATION_ERROR', 'Clock-out cannot be in the future');

    const patch = {
      clock_in_at: inAt, clock_out_at: outAt, work_date: localDate(inAt, store.tz),
      status: 'corrected', corrected_by: req.user.id, corrected_at: new Date(), correction_reason: reason.slice(0, 500),
    };
    if (!rec.original_clock_in_at && rec.status !== 'corrected') {
      patch.original_clock_in_at = rec.clock_in_at;
      patch.original_clock_out_at = rec.clock_out_at;
    }
    if (outAt) { patch.open_user_id = null; if (!rec.clock_out_method) patch.clock_out_method = 'admin'; }
    else {
      // 다시 여는 것 — 그 직원에게 다른 열린 기록이 있으면 안 된다(UNIQUE 가 막음)
      patch.open_user_id = rec.user_id;
    }
    try {
      await rec.update(patch);
    } catch (e) {
      if (e.name === 'SequelizeUniqueConstraintError') return fail(res, 409, 'ALREADY_CLOCKED_IN', 'This staff member already has an open record');
      throw e;
    }
    return res.json({ success: true, data: recordView(rec, store.tz) });
  } catch (e) { return serverError(res, e, 'records patch'); }
});

/** 수동 추가(찍는 걸 잊은 날) */
router.post('/records', ...admin, async (req, res) => {
  try {
    const restaurantId = rid(req);
    const reason = String(req.body?.reason || '').trim();
    if (!reason) return fail(res, 400, 'REASON_REQUIRED', 'A reason is required');
    const target = await findStoreStaff(restaurantId, { id: Number(req.body?.user_id) || 0 });
    if (!target) return fail(res, 404, 'NOT_FOUND', 'Staff not found in this store');
    const inAt = parseInstant(req.body.clock_in_at);
    const outAt = parseInstant(req.body.clock_out_at);
    if (!inAt || outAt === undefined) return fail(res, 400, 'VALIDATION_ERROR', 'Invalid time');
    if (!outAt) return fail(res, 400, 'VALIDATION_ERROR', 'Clock-out time is required for a manual record');
    if (outAt <= inAt) return fail(res, 400, 'VALIDATION_ERROR', 'Clock-out must be after clock-in');
    if (outAt > new Date(Date.now() + 60000)) return fail(res, 400, 'VALIDATION_ERROR', 'Clock-out cannot be in the future');
    const store = await loadStore(restaurantId);
    const rec = await AttendanceRecord.create({
      restaurant_id: restaurantId, user_id: target.id, open_user_id: null,
      work_date: localDate(inAt, store.tz), clock_in_at: inAt, clock_out_at: outAt,
      clock_in_method: 'admin', clock_out_method: 'admin', status: 'corrected',
      corrected_by: req.user.id, corrected_at: new Date(), correction_reason: reason.slice(0, 500),
      clock_in_ip: clientIp(req),
    });
    return res.status(201).json({ success: true, data: recordView(rec, store.tz) });
  } catch (e) { return serverError(res, e, 'records post'); }
});

// ───────────────────────── 관리: 설정·네트워크 ─────────────────────────

const SETTING_BOOLS = ['network_restriction', 'allow_self_clock', 'allow_pos_pin_clock', 'pin_override_registers_network'];

router.get('/settings', ...admin, async (req, res) => {
  try {
    const store = await loadStore(rid(req));
    return res.json({ success: true, data: { ...store.settings, time_zone: store.tz, current_ip: networkKey(clientIp(req)) } });
  } catch (e) { return serverError(res, e, 'settings get'); }
});

/**
 * 설정 저장 — operation_settings 의 attendance 칸만 바꾼다. DB 원문을 행 잠금으로 읽고 그 칸만 바꿔 통째로 쓴다
 * (부분 저장이 다른 칸을 지우는 사고 [[reference_partial_save_overwrites_unsent]] 방지 · 다른 키는 바이트 그대로).
 * 설정 화면 저장이 이 칸을 지우지 않게 settingsGuard 허용 키에 'attendance' 를 넣었다.
 */
router.put('/settings', ...admin, async (req, res) => {
  try {
    const body = req.body || {};
    const next = {};
    for (const k of SETTING_BOOLS) if (k in body) {
      if (typeof body[k] !== 'boolean') return fail(res, 400, 'VALIDATION_ERROR', `${k} must be true/false`);
      next[k] = body[k];
    }
    if ('open_session_flag_hours' in body) {
      const h = Number(body.open_session_flag_hours);
      if (!Number.isInteger(h) || h < 4 || h > 48) return fail(res, 400, 'VALIDATION_ERROR', 'open_session_flag_hours must be 4–48');
      next.open_session_flag_hours = h;
    }
    const saved = await sequelize.transaction(async (transaction) => {
      const [[row]] = await sequelize.query('SELECT operation_settings FROM restaurants WHERE id = :id FOR UPDATE', { replacements: { id: rid(req) }, transaction });
      if (!row) return null;
      let os = {};
      if (row.operation_settings) {
        try { os = JSON.parse(row.operation_settings) || {}; } catch { throw new Error('operation_settings parse error — refusing to overwrite'); }
      }
      const merged = { ...readSettings(os), ...next };
      // 켜기 전에 등록 네트워크가 하나는 있어야 한다 — 없으면 아무도 못 찍는다
      if (merged.network_restriction && !readSettings(os).network_restriction) {
        const n = await AttendanceNetwork.count({ where: { restaurant_id: rid(req), is_active: true }, transaction });
        if (!n) { const err = new Error('NO_NETWORK'); err.code = 'NO_NETWORK'; throw err; }
      }
      os.attendance = merged;
      await sequelize.query('UPDATE restaurants SET operation_settings = :v WHERE id = :id', { replacements: { v: JSON.stringify(os), id: rid(req) }, transaction });
      return merged;
    });
    if (!saved) return fail(res, 404, 'NOT_FOUND', 'Restaurant not found');
    return res.json({ success: true, data: saved });
  } catch (e) {
    if (e.code === 'NO_NETWORK') return fail(res, 400, 'NO_NETWORK', 'Register the store network first');
    return serverError(res, e, 'settings put');
  }
});

router.get('/networks', ...admin, async (req, res) => {
  try {
    const rows = await AttendanceNetwork.findAll({ where: { restaurant_id: rid(req) }, order: [['is_active', 'DESC'], ['id', 'ASC']] });
    const current = networkKey(clientIp(req));
    return res.json({ success: true, data: { current_ip: current, networks: rows.map(r => ({ ...r.toJSON(), is_current: r.ip === current })) } });
  } catch (e) { return serverError(res, e, 'networks'); }
});

/** 지금 이 요청의 주소를 매장 네트워크로 등록 — 관리자가 매장 와이파이에서 누른다 */
router.post('/networks/register-current', ...admin, async (req, res) => {
  try {
    const ip = clientIp(req);
    if (!networkKey(ip)) return fail(res, 400, 'NO_ADDRESS', 'Could not read this device address');
    const label = req.body?.label ? String(req.body.label).slice(0, 60) : null;
    const row = await registerNetwork(rid(req), ip, { source: 'manual', label, userId: req.user.id });
    return res.status(201).json({ success: true, data: row });
  } catch (e) { return serverError(res, e, 'networks register'); }
});

router.patch('/networks/:id', ...admin, async (req, res) => {
  try {
    const row = await AttendanceNetwork.findOne({ where: { id: Number(req.params.id), restaurant_id: rid(req) } });
    if (!row) return fail(res, 404, 'NOT_FOUND', 'Network not found');
    const patch = {};
    if ('label' in (req.body || {})) patch.label = req.body.label ? String(req.body.label).slice(0, 60) : null;
    if ('is_active' in (req.body || {})) patch.is_active = !!req.body.is_active;
    await row.update(patch);
    return res.json({ success: true, data: row });
  } catch (e) { return serverError(res, e, 'networks patch'); }
});

router.delete('/networks/:id', ...admin, async (req, res) => {
  try {
    const n = await AttendanceNetwork.destroy({ where: { id: Number(req.params.id), restaurant_id: rid(req) } });
    if (!n) return fail(res, 404, 'NOT_FOUND', 'Network not found');
    return res.json({ success: true, data: { deleted: n } });
  } catch (e) { return serverError(res, e, 'networks delete'); }
});

// ───────────────────────── 관리: 직원 근무 기본 ─────────────────────────

/** 이 매장 직원 목록 + 쉬는 요일 (PIN 원문은 내보내지 않는다 — 있음/없음만) */
router.get('/profiles', ...admin, async (req, res) => {
  try {
    const staff = await User.findAll({
      where: { restaurant_id: rid(req), role: STAFF_ROLES },
      attributes: ['id', 'full_name', 'username', 'role', 'pin_code', 'is_active'], order: [['full_name', 'ASC']],
    });
    const profiles = await StaffWorkProfile.findAll({ where: { restaurant_id: rid(req) } });
    const pm = new Map(profiles.map(p => [p.user_id, p]));
    return res.json({ success: true, data: staff.filter(isActiveUser).map(u => ({
      user_id: u.id, name: u.full_name || u.username, role: u.role, has_pin: !!u.pin_code,
      rest_days: pm.get(u.id)?.rest_days || [], joined_at: pm.get(u.id)?.joined_at || null,
    })) });
  } catch (e) { return serverError(res, e, 'profiles'); }
});

router.get('/profiles/:userId', ...admin, async (req, res) => {
  try {
    const target = await findStoreStaff(rid(req), { id: Number(req.params.userId) });
    if (!target) return fail(res, 404, 'NOT_FOUND', 'Staff not found in this store');
    const p = await StaffWorkProfile.findByPk(target.id);
    return res.json({ success: true, data: { user_id: target.id, rest_days: p?.rest_days || [], joined_at: p?.joined_at || null } });
  } catch (e) { return serverError(res, e, 'profile get'); }
});

router.put('/profiles/:userId', ...admin, async (req, res) => {
  try {
    const target = await findStoreStaff(rid(req), { id: Number(req.params.userId) });
    if (!target) return fail(res, 404, 'NOT_FOUND', 'Staff not found in this store');
    const restDays = req.body?.rest_days;
    if (restDays !== undefined && (!Array.isArray(restDays) || restDays.some(d => !Number.isInteger(d) || d < 0 || d > 6) || restDays.length > 6)) {
      return fail(res, 400, 'VALIDATION_ERROR', 'rest_days must be weekday numbers 0–6 (at most 6)');
    }
    const joined = req.body?.joined_at;
    if (joined != null && joined !== '' && !isValidDate(joined)) return fail(res, 400, 'VALIDATION_ERROR', 'joined_at must be YYYY-MM-DD');
    const existing = await StaffWorkProfile.findByPk(target.id);
    const data = {
      user_id: target.id, restaurant_id: rid(req),
      rest_days: restDays !== undefined ? [...new Set(restDays)].sort() : (existing?.rest_days || []),
      joined_at: joined !== undefined ? (joined || null) : (existing?.joined_at || null),
    };
    if (existing) await existing.update(data); else await StaffWorkProfile.create(data);
    return res.json({ success: true, data });
  } catch (e) { return serverError(res, e, 'profile put'); }
});

// ───────────────────────── 휴가 종류·잔여 ─────────────────────────

// 말레이시아 고용법 1955 최소 기준 — 매장이 처음 열 때 한 번 만든다. 관리자가 바꿀 수 있다.
const DEFAULT_LEAVE_TYPES = [
  { code: 'annual', name: 'Annual Leave', is_paid: true, default_days: 8, color: '#635BFF', sort_order: 1 },
  { code: 'sick', name: 'Sick Leave', is_paid: true, default_days: 14, color: '#10B981', sort_order: 2 },
  { code: 'unpaid', name: 'Unpaid Leave', is_paid: false, default_days: null, color: '#9CA3AF', sort_order: 3 },
  { code: 'emergency', name: 'Emergency Leave', is_paid: true, default_days: null, color: '#F59E0B', sort_order: 4 },
];

async function ensureLeaveTypes(restaurantId) {
  const n = await LeaveType.count({ where: { restaurant_id: restaurantId } });
  if (n) return;
  for (const t of DEFAULT_LEAVE_TYPES) {
    await LeaveType.findOrCreate({ where: { restaurant_id: restaurantId, code: t.code }, defaults: { ...t, restaurant_id: restaurantId } });
  }
}

router.get('/leave/types', ...common, async (req, res) => {
  try {
    await ensureLeaveTypes(rid(req));
    const where = { restaurant_id: rid(req) };
    if (!isAdmin(req.user)) where.is_active = true;
    const rows = await LeaveType.findAll({ where, order: [['sort_order', 'ASC'], ['id', 'ASC']] });
    return res.json({ success: true, data: rows });
  } catch (e) { return serverError(res, e, 'leave types'); }
});

function leaveTypeFields(body, partial) {
  const out = {};
  if (!partial || 'name' in body) {
    const name = String(body.name || '').trim();
    if (!name) return { error: 'name is required' };
    out.name = name.slice(0, 60);
  }
  if ('is_paid' in body) out.is_paid = !!body.is_paid;
  if ('default_days' in body) {
    if (body.default_days === null || body.default_days === '') out.default_days = null;
    else {
      const d = Number(body.default_days);
      if (!Number.isFinite(d) || d < 0 || d > 366 || Math.round(d * 2) !== d * 2) return { error: 'default_days must be 0–366 in steps of 0.5' };
      out.default_days = d;
    }
  }
  if ('requires_approval' in body) out.requires_approval = !!body.requires_approval;
  if ('color' in body) out.color = /^#[0-9A-Fa-f]{6}$/.test(body.color || '') ? body.color : null;
  if ('is_active' in body) out.is_active = !!body.is_active;
  if ('sort_order' in body) out.sort_order = Number(body.sort_order) || 0;
  return { data: out };
}

router.post('/leave/types', ...admin, async (req, res) => {
  try {
    const f = leaveTypeFields(req.body || {}, false);
    if (f.error) return fail(res, 400, 'VALIDATION_ERROR', f.error);
    const code = String(req.body.code || f.data.name).toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '').slice(0, 30) || `type_${Date.now()}`;
    const exists = await LeaveType.findOne({ where: { restaurant_id: rid(req), code } });
    if (exists) return fail(res, 409, 'DUPLICATE', 'A leave type with this code already exists');
    const row = await LeaveType.create({ ...f.data, restaurant_id: rid(req), code });
    return res.status(201).json({ success: true, data: row });
  } catch (e) { return serverError(res, e, 'leave type create'); }
});

router.patch('/leave/types/:id', ...admin, async (req, res) => {
  try {
    const row = await LeaveType.findOne({ where: { id: Number(req.params.id), restaurant_id: rid(req) } });
    if (!row) return fail(res, 404, 'NOT_FOUND', 'Leave type not found');
    const f = leaveTypeFields(req.body || {}, true);
    if (f.error) return fail(res, 400, 'VALIDATION_ERROR', f.error);
    await row.update(f.data);
    return res.json({ success: true, data: row });
  } catch (e) { return serverError(res, e, 'leave type patch'); }
});

/** 쓰인 적 있는 종류는 지우지 않고 끈다(기록이 그 종류를 가리킴) */
router.delete('/leave/types/:id', ...admin, async (req, res) => {
  try {
    const row = await LeaveType.findOne({ where: { id: Number(req.params.id), restaurant_id: rid(req) } });
    if (!row) return fail(res, 404, 'NOT_FOUND', 'Leave type not found');
    const used = await LeaveRequest.count({ where: { leave_type_id: row.id } });
    if (used) { await row.update({ is_active: false }); return res.json({ success: true, data: { deactivated: true } }); }
    await LeaveEntitlement.destroy({ where: { leave_type_id: row.id, restaurant_id: rid(req) } });
    await row.destroy();
    return res.json({ success: true, data: { deleted: true } });
  } catch (e) { return serverError(res, e, 'leave type delete'); }
});

/**
 * 잔여일 — 일수 = 직원별 연간 일수(leave_entitlements) → 없으면 종류 기본 일수 → 그것도 없으면 «추적 안 함»(null).
 * 사용 = 그 해(시작일 기준) 승인된 신청 일수 합, 대기 = 대기 중 신청 일수 합. 저장하지 않고 계산한다.
 */
async function computeBalance(restaurantId, userId, year) {
  await ensureLeaveTypes(restaurantId);
  const types = await LeaveType.findAll({ where: { restaurant_id: restaurantId }, order: [['sort_order', 'ASC'], ['id', 'ASC']] });
  const ents = await LeaveEntitlement.findAll({ where: { restaurant_id: restaurantId, user_id: userId, year } });
  const em = new Map(ents.map(e => [e.leave_type_id, Number(e.days)]));
  const reqs = await LeaveRequest.findAll({
    where: { restaurant_id: restaurantId, user_id: userId, status: ['approved', 'pending'], start_date: { [Op.between]: [`${year}-01-01`, `${year}-12-31`] } },
    attributes: ['leave_type_id', 'status', 'days'],
  });
  return types.filter(t => t.is_active || em.has(t.id) || reqs.some(r => r.leave_type_id === t.id)).map(t => {
    const used = reqs.filter(r => r.leave_type_id === t.id && r.status === 'approved').reduce((s, r) => s + Number(r.days), 0);
    const pending = reqs.filter(r => r.leave_type_id === t.id && r.status === 'pending').reduce((s, r) => s + Number(r.days), 0);
    const entitled = em.has(t.id) ? em.get(t.id) : (t.default_days == null ? null : Number(t.default_days));
    return {
      leave_type_id: t.id, name: t.name, color: t.color, is_paid: t.is_paid, is_active: t.is_active,
      entitled, entitlement_source: em.has(t.id) ? 'staff' : (entitled == null ? 'untracked' : 'type_default'),
      used, pending, remaining: entitled == null ? null : Math.round((entitled - used) * 2) / 2,
    };
  });
}

router.get('/leave/balance', ...common, async (req, res) => {
  try {
    const store = await loadStore(rid(req));
    const year = Number(req.query.year) || Number(localDate(new Date(), store.tz).slice(0, 4));
    let userId = req.user.id;
    if (req.query.user_id && Number(req.query.user_id) !== req.user.id) {
      if (!isAdmin(req.user)) return fail(res, 403, 'FORBIDDEN', 'You can only see your own balance');
      userId = Number(req.query.user_id);
    }
    const target = await findStoreStaff(rid(req), { id: userId });
    if (!target) return fail(res, 404, 'NOT_FOUND', 'Staff not found in this store');
    return res.json({ success: true, data: { user_id: userId, year, balances: await computeBalance(rid(req), userId, year) } });
  } catch (e) { return serverError(res, e, 'leave balance'); }
});

/** 직원별 연간 일수 넣기 — days 가 null/'' 이면 행을 지워 종류 기본값으로 돌아간다 */
router.put('/leave/entitlements', ...admin, async (req, res) => {
  try {
    const { user_id, leave_type_id, year, days } = req.body || {};
    const target = await findStoreStaff(rid(req), { id: Number(user_id) || 0 });
    if (!target) return fail(res, 404, 'NOT_FOUND', 'Staff not found in this store');
    const type = await LeaveType.findOne({ where: { id: Number(leave_type_id) || 0, restaurant_id: rid(req) } });
    if (!type) return fail(res, 404, 'NOT_FOUND', 'Leave type not found');
    const y = Number(year);
    if (!Number.isInteger(y) || y < 2000 || y > 2100) return fail(res, 400, 'VALIDATION_ERROR', 'Invalid year');
    if (days === null || days === '' || days === undefined) {
      await LeaveEntitlement.destroy({ where: { user_id: target.id, leave_type_id: type.id, year: y } });
      return res.json({ success: true, data: { user_id: target.id, leave_type_id: type.id, year: y, days: null } });
    }
    const d = Number(days);
    if (!Number.isFinite(d) || d < 0 || d > 366 || Math.round(d * 2) !== d * 2) return fail(res, 400, 'VALIDATION_ERROR', 'days must be 0–366 in steps of 0.5');
    const [row] = await LeaveEntitlement.findOrCreate({
      where: { user_id: target.id, leave_type_id: type.id, year: y },
      defaults: { restaurant_id: rid(req), user_id: target.id, leave_type_id: type.id, year: y, days: d },
    });
    if (Number(row.days) !== d) await row.update({ days: d });
    return res.json({ success: true, data: row });
  } catch (e) { return serverError(res, e, 'leave entitlements'); }
});

// ───────────────────────── 휴가 신청·승인 ─────────────────────────

function requestView(r) {
  const j = r.toJSON ? r.toJSON() : r;
  return {
    id: j.id, user_id: j.user_id, user_name: j.user?.full_name || j.user?.username || null,
    leave_type_id: j.leave_type_id, leave_type: j.leaveType ? { id: j.leaveType.id, name: j.leaveType.name, color: j.leaveType.color, is_paid: j.leaveType.is_paid } : null,
    start_date: j.start_date, end_date: j.end_date, half_day: j.half_day, days: Number(j.days),
    reason: j.reason, status: j.status, decided_by: j.decided_by, decided_at: j.decided_at, decision_note: j.decision_note,
    cancelled_at: j.cancelled_at, created_at: j.created_at,
  };
}

const requestIncludes = [
  { model: User, as: 'user', attributes: ['id', 'full_name', 'username'] },
  { model: LeaveType, as: 'leaveType', attributes: ['id', 'name', 'color', 'is_paid'] },
];

async function holidayDates(restaurantId, from, to, transaction) {
  const rows = await StoreHoliday.findAll({ where: { restaurant_id: restaurantId, date: { [Op.between]: [from, to] } }, attributes: ['date'], transaction });
  return rows.map(h => h.date);
}

async function notifyLeaveRequested(restaurantId, request, staffName, typeName) {
  try {
    const { getRestaurantAdminIds, sendNotificationBatch } = require('../utils/notificationService');
    const { leaveRequestedEmail } = require('../utils/attendanceEmail');
    const ids = (await getRestaurantAdminIds(restaurantId)).filter(id => id !== request.user_id);
    if (!ids.length) return;
    await sendNotificationBatch(ids, 'staff_leave', (user) => leaveRequestedEmail({ staffName, typeName, request, restaurantId }, user.preferred_language || 'en'));
  } catch (e) { console.error('[attendance] notifyLeaveRequested:', e.message); }
}

async function notifyLeaveDecided(restaurantId, request, typeName) {
  try {
    const { sendNotificationBatch } = require('../utils/notificationService');
    const { leaveDecidedEmail } = require('../utils/attendanceEmail');
    await sendNotificationBatch([request.user_id], 'staff_leave', (user) => leaveDecidedEmail({ typeName, request, restaurantId }, user.preferred_language || 'en'));
  } catch (e) { console.error('[attendance] notifyLeaveDecided:', e.message); }
}

router.post('/leave/requests', ...common, async (req, res) => {
  try {
    const restaurantId = rid(req);
    const body = req.body || {};
    let userId = req.user.id;
    if (body.user_id && Number(body.user_id) !== req.user.id) {
      if (!isAdmin(req.user)) return fail(res, 403, 'FORBIDDEN', 'You can only request leave for yourself');
      userId = Number(body.user_id);
    } else if (!belongs(req.user, restaurantId)) {
      return fail(res, 403, 'FORBIDDEN', 'Only staff of this store can request leave');
    }
    const target = await findStoreStaff(restaurantId, { id: userId });
    if (!target || !isActiveUser(target)) return fail(res, 404, 'NOT_FOUND', 'Staff not found in this store');
    const type = await LeaveType.findOne({ where: { id: Number(body.leave_type_id) || 0, restaurant_id: restaurantId, is_active: true } });
    if (!type) return fail(res, 400, 'VALIDATION_ERROR', 'Choose a leave type');
    const halfDay = ['am', 'pm'].includes(body.half_day) ? body.half_day : null;
    const start = body.start_date; const end = body.end_date || body.start_date;

    const created = await sequelize.transaction(async (transaction) => {
      // 같은 직원의 신청을 순서대로 — 동시에 두 번 내도 겹침 검사가 서로를 본다
      await sequelize.query('SELECT id FROM users WHERE id = :id FOR UPDATE', { replacements: { id: target.id }, transaction });
      const profile = await StaffWorkProfile.findByPk(target.id, { transaction });
      const calc = computeLeaveDays({
        start, end, halfDay,
        holidays: isValidDate(start) && isValidDate(end) ? await holidayDates(restaurantId, start, end, transaction) : [],
        restDays: profile?.rest_days || [],
      });
      if (calc.error) { const e = new Error(calc.error); e.code = calc.error; e.status = 400; throw e; }
      const overlap = await LeaveRequest.findOne({
        where: { user_id: target.id, status: ['pending', 'approved'], start_date: { [Op.lte]: end }, end_date: { [Op.gte]: start } },
        transaction,
      });
      if (overlap) { const e = new Error('OVERLAP'); e.code = 'OVERLAP'; e.status = 400; throw e; }
      const autoApprove = !type.requires_approval;
      return LeaveRequest.create({
        restaurant_id: restaurantId, user_id: target.id, leave_type_id: type.id,
        start_date: start, end_date: end, half_day: halfDay, days: calc.days,
        reason: body.reason ? String(body.reason).slice(0, 500) : null,
        status: autoApprove ? 'approved' : 'pending',
        decided_at: autoApprove ? new Date() : null,
        created_by: req.user.id,
      }, { transaction });
    });
    if (created.status === 'pending') notifyLeaveRequested(restaurantId, created, target.full_name || target.username, type.name);
    const full = await LeaveRequest.findByPk(created.id, { include: requestIncludes });
    return res.status(201).json({ success: true, data: requestView(full) });
  } catch (e) {
    if (e.status === 400) {
      const msg = {
        INVALID_DATE: 'Invalid date', END_BEFORE_START: 'End date is before start date',
        HALF_DAY_SINGLE_DATE_ONLY: 'Half day is only for a single date', RANGE_TOO_LONG: 'Period is too long',
        NO_WORKING_DAYS: 'No working days in this period (holidays or rest days only)',
        OVERLAP: 'There is already a leave request in this period',
      }[e.code] || e.message;
      return fail(res, 400, e.code, msg);
    }
    return serverError(res, e, 'leave request create');
  }
});

router.get('/leave/requests', ...common, async (req, res) => {
  try {
    const where = { restaurant_id: rid(req) };
    if (!isAdmin(req.user)) {
      if (req.query.user_id && Number(req.query.user_id) !== req.user.id) return fail(res, 403, 'FORBIDDEN', 'You can only see your own requests');
      where.user_id = req.user.id;
    } else if (req.query.user_id) where.user_id = Number(req.query.user_id);
    if (['pending', 'approved', 'rejected', 'cancelled'].includes(req.query.status)) where.status = req.query.status;
    if (isValidDate(req.query.from)) where.end_date = { [Op.gte]: req.query.from };
    if (isValidDate(req.query.to)) where.start_date = { [Op.lte]: req.query.to };
    const rows = await LeaveRequest.findAll({ where, include: requestIncludes, order: [['start_date', 'DESC'], ['id', 'DESC']], limit: 500 });
    return res.json({ success: true, data: rows.map(requestView) });
  } catch (e) { return serverError(res, e, 'leave requests'); }
});

async function decide(req, res, status) {
  try {
    const note = req.body?.note ? String(req.body.note).slice(0, 500) : null;
    const updated = await sequelize.transaction(async (transaction) => {
      const r = await LeaveRequest.findOne({ where: { id: Number(req.params.id), restaurant_id: rid(req) }, transaction, lock: transaction.LOCK.UPDATE });
      if (!r) return { err: [404, 'NOT_FOUND', 'Request not found'] };
      if (r.status !== 'pending') return { err: [409, 'NOT_PENDING', 'This request was already decided'] };
      await r.update({ status, decided_by: req.user.id, decided_at: new Date(), decision_note: note }, { transaction });
      return { r };
    });
    if (updated.err) return fail(res, ...updated.err);
    const full = await LeaveRequest.findByPk(updated.r.id, { include: requestIncludes });
    notifyLeaveDecided(rid(req), full, full.leaveType?.name || '');
    return res.json({ success: true, data: requestView(full) });
  } catch (e) { return serverError(res, e, `leave ${status}`); }
}

router.post('/leave/requests/:id/approve', ...admin, (req, res) => decide(req, res, 'approved'));
router.post('/leave/requests/:id/reject', ...admin, (req, res) => decide(req, res, 'rejected'));

/** 취소 — 직원: 자기 대기 중만 · 관리자: 대기 중 또는 시작 전 승인 건 */
router.post('/leave/requests/:id/cancel', ...common, async (req, res) => {
  try {
    const r = await LeaveRequest.findOne({ where: { id: Number(req.params.id), restaurant_id: rid(req) } });
    if (!r) return fail(res, 404, 'NOT_FOUND', 'Request not found');
    const store = await loadStore(rid(req));
    const today = localDate(new Date(), store.tz);
    if (isAdmin(req.user)) {
      if (!(r.status === 'pending' || (r.status === 'approved' && r.start_date > today))) {
        return fail(res, 409, 'NOT_CANCELLABLE', 'Only pending requests or approved leave that has not started can be cancelled');
      }
    } else {
      if (r.user_id !== req.user.id) return fail(res, 403, 'FORBIDDEN', 'You can only cancel your own requests');
      if (r.status !== 'pending') return fail(res, 409, 'NOT_CANCELLABLE', 'Only pending requests can be cancelled. Ask your manager.');
    }
    await r.update({ status: 'cancelled', cancelled_by: req.user.id, cancelled_at: new Date() });
    const full = await LeaveRequest.findByPk(r.id, { include: requestIncludes });
    return res.json({ success: true, data: requestView(full) });
  } catch (e) { return serverError(res, e, 'leave cancel'); }
});

// ───────────────────────── 휴일·달력 ─────────────────────────

router.get('/holidays', ...common, async (req, res) => {
  try {
    const store = await loadStore(rid(req));
    const year = Number(req.query.year) || Number(localDate(new Date(), store.tz).slice(0, 4));
    const rows = await StoreHoliday.findAll({ where: { restaurant_id: rid(req), date: { [Op.between]: [`${year}-01-01`, `${year}-12-31`] } }, order: [['date', 'ASC']] });
    return res.json({ success: true, data: { year, holidays: rows, national_available: fs.existsSync(nationalFile(store.row.country, year)) } });
  } catch (e) { return serverError(res, e, 'holidays'); }
});

router.post('/holidays', ...admin, async (req, res) => {
  try {
    const { date, name, kind = 'public' } = req.body || {};
    if (!isValidDate(date)) return fail(res, 400, 'VALIDATION_ERROR', 'date must be YYYY-MM-DD');
    const n = String(name || '').trim();
    if (!n) return fail(res, 400, 'VALIDATION_ERROR', 'name is required');
    if (!['public', 'store_closed'].includes(kind)) return fail(res, 400, 'VALIDATION_ERROR', 'kind must be public or store_closed');
    const [row, created] = await StoreHoliday.findOrCreate({
      where: { restaurant_id: rid(req), date, kind },
      defaults: { restaurant_id: rid(req), date, kind, name: n.slice(0, 100), created_by: req.user.id },
    });
    if (!created) return fail(res, 409, 'DUPLICATE', 'This date is already a holiday');
    return res.status(201).json({ success: true, data: row });
  } catch (e) { return serverError(res, e, 'holiday create'); }
});

router.delete('/holidays/:id', ...admin, async (req, res) => {
  try {
    const n = await StoreHoliday.destroy({ where: { id: Number(req.params.id), restaurant_id: rid(req) } });
    if (!n) return fail(res, 404, 'NOT_FOUND', 'Holiday not found');
    return res.json({ success: true, data: { deleted: n } });
  } catch (e) { return serverError(res, e, 'holiday delete'); }
});

function nationalFile(country, year) {
  const c = /^[A-Z]{2}$/.test(String(country || '').toUpperCase()) ? String(country).toUpperCase() : 'MY';
  return path.join(__dirname, '..', 'data', 'holidays', `${c}-${Number(year)}.json`);
}

/** 국가 공휴일 한 번에 넣기 — 저장소의 정적 표(전국 공휴일만). 이미 있는 날짜는 건너뜀(멱등) */
router.post('/holidays/import-national', ...admin, async (req, res) => {
  try {
    const store = await loadStore(rid(req));
    const year = Number(req.body?.year);
    if (!Number.isInteger(year) || year < 2000 || year > 2100) return fail(res, 400, 'VALIDATION_ERROR', 'Invalid year');
    const file = nationalFile(store.row.country, year);
    if (!fs.existsSync(file)) return fail(res, 404, 'NO_HOLIDAY_DATA', `No national holiday list for ${year}`);
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    let added = 0;
    for (const h of data.holidays || []) {
      if (!isValidDate(h.date)) continue;
      const [, created] = await StoreHoliday.findOrCreate({
        where: { restaurant_id: rid(req), date: h.date, kind: 'public' },
        defaults: { restaurant_id: rid(req), date: h.date, kind: 'public', name: String(h.name).slice(0, 100), created_by: req.user.id },
      });
      if (created) added++;
    }
    return res.json({ success: true, data: { year, added, total: (data.holidays || []).length } });
  } catch (e) { return serverError(res, e, 'holiday import'); }
});

/** 달력 한 달 — 휴일 + 승인 휴가 + 쉬는 요일(관리자는 전체, 직원은 휴일과 자기 것) */
router.get('/calendar', ...common, async (req, res) => {
  try {
    const store = await loadStore(rid(req));
    const month = /^\d{4}-\d{2}$/.test(req.query.month || '') ? req.query.month : localDate(new Date(), store.tz).slice(0, 7);
    const [y, m] = month.split('-').map(Number);
    const from = `${month}-01`;
    const to = new Date(Date.UTC(y, m, 0)).toISOString().slice(0, 10);
    const admin_ = isAdmin(req.user);
    const holidays = await StoreHoliday.findAll({ where: { restaurant_id: rid(req), date: { [Op.between]: [from, to] } }, order: [['date', 'ASC']] });
    const lw = { restaurant_id: rid(req), status: 'approved', start_date: { [Op.lte]: to }, end_date: { [Op.gte]: from } };
    if (!admin_) lw.user_id = req.user.id;
    const leaves = await LeaveRequest.findAll({ where: lw, include: requestIncludes, order: [['start_date', 'ASC']] });
    const pw = { restaurant_id: rid(req) };
    if (!admin_) pw.user_id = req.user.id;
    const profiles = await StaffWorkProfile.findAll({ where: pw });
    const names = new Map((await User.findAll({ where: { id: profiles.map(p => p.user_id) }, attributes: ['id', 'full_name', 'username'] })).map(u => [u.id, u.full_name || u.username]));
    return res.json({ success: true, data: {
      month, from, to, holidays,
      leaves: leaves.map(requestView),
      rest_days: profiles.filter(p => (p.rest_days || []).length).map(p => ({ user_id: p.user_id, user_name: names.get(p.user_id) || null, rest_days: p.rest_days })),
    } });
  } catch (e) { return serverError(res, e, 'calendar'); }
});

module.exports = router;
module.exports._internals = { computeBalance, DEFAULT_LEAVE_TYPES };

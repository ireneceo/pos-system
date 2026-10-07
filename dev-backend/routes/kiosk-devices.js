/**
 * 키오스크 기기 등록·목록·해제 — /api/kiosk-devices
 * 설계: .claude/fable-verdict-20261007-kiosk-payment-split.md D2·D7 (Fable 판정 2026-10-07, Irene 승인).
 *
 * 등록은 매장 관리자가 **그 태블릿에서** 로그인한 채 누른다 → 서버가 기기 토큰을 만들어 이 응답에 한 번만 준다
 * (DB 에는 sha256 만). 화면은 토큰을 기기에 저장하고 직원 세션을 지운 뒤 키오스크 화면으로 간다.
 * 해제는 다른 기기에서도 된다(잃어버린 태블릿) — 해제된 기기는 다음 요청에 401 KIOSK_REVOKED.
 *
 * 권한: 매장 관리자(Restaurant Admin) · System Admin + 그 매장 접근(checkRestaurantAccess).
 * GET /me 만 기기 토큰으로 부른다(키오스크 화면이 시작할 때 «아직 등록돼 있나» 확인).
 */
const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const { authenticateToken, requireRole, checkRestaurantAccess } = require('../middleware/auth');
const { authenticateKioskDevice, hashToken, isKioskEnabled } = require('../middleware/kioskDevice');
const { KioskDevice, Restaurant } = require('../models');
const { logActivity } = require('../utils/activityLogger');

const ADMIN_ROLES = ['Restaurant Admin', 'System Admin'];

const publicDevice = (row) => {
  const d = row.get ? row.get({ plain: true }) : row;
  const { token_hash, ...rest } = d;
  return rest;
};

const cleanHost = (v) => {
  if (v == null || v === '') return null;
  const s = String(v).trim();
  // 매장 LAN 단말기 주소(IPv4 또는 호스트 이름)만 받는다
  if (!/^[A-Za-z0-9.-]{1,64}$/.test(s)) return undefined;
  return s;
};
const cleanPort = (v) => {
  if (v == null || v === '') return null;
  const n = parseInt(v, 10);
  return Number.isFinite(n) && n > 0 && n < 65536 ? n : undefined;
};

// 키오스크 화면 시작 확인 — 기기 토큰으로만. 등록이 없거나 해제됐으면 미들웨어가 401.
router.get('/me', authenticateKioskDevice, async (req, res) => {
  if (!req.kioskDevice) return res.status(401).json({ success: false, code: 'KIOSK_REVOKED', message: 'This kiosk is no longer registered' });
  try {
    const r = await Restaurant.findByPk(req.kioskDevice.restaurant_id, { attributes: ['id', 'slug', 'name', 'mobile_settings'] });
    res.json({ success: true, data: { id: req.kioskDevice.id, name: req.kioskDevice.name, restaurant_id: req.kioskDevice.restaurant_id, slug: r?.slug || null, restaurant_name: r?.name || null, kiosk_enabled: isKioskEnabled(r) } });
  } catch (e) {
    console.error('GET /kiosk-devices/me error:', e);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

router.get('/', authenticateToken, requireRole(...ADMIN_ROLES), checkRestaurantAccess, async (req, res) => {
  try {
    const rid = parseInt(req.query.restaurant_id || req.user.restaurant_id, 10);
    if (!Number.isFinite(rid)) return res.status(400).json({ success: false, message: 'restaurant_id is required' });
    const rows = await KioskDevice.findAll({ where: { restaurant_id: rid }, order: [['status', 'ASC'], ['id', 'DESC']] });
    res.json({ success: true, data: rows.map(publicDevice) });
  } catch (e) {
    console.error('GET /kiosk-devices error:', e);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

router.post('/', authenticateToken, requireRole(...ADMIN_ROLES), checkRestaurantAccess, async (req, res) => {
  try {
    const rid = parseInt(req.body?.restaurant_id, 10);
    if (!Number.isFinite(rid)) return res.status(400).json({ success: false, message: 'restaurant_id is required' });
    const name = String(req.body?.name || '').trim().slice(0, 80);
    if (!name) return res.status(400).json({ success: false, message: 'name is required' });
    const restaurant = await Restaurant.findByPk(rid, { attributes: ['id', 'slug', 'name', 'mobile_settings'] });
    if (!restaurant) return res.status(404).json({ success: false, message: 'Restaurant not found' });
    if (!isKioskEnabled(restaurant)) return res.status(409).json({ success: false, code: 'KIOSK_DISABLED', message: 'Turn on Kiosk in Settings › Kiosk before registering a tablet' });
    if (!restaurant.slug) return res.status(409).json({ success: false, code: 'NO_SLUG', message: 'Set the store link (slug) before registering a kiosk' });

    const token = crypto.randomBytes(32).toString('base64url'); // 43자 — 원문은 이 응답에만
    const row = await KioskDevice.create({ restaurant_id: rid, name, token_hash: hashToken(token), status: 'active', created_by: req.user.id, last_seen_at: new Date() });
    await logActivity(req, {
      action_type: 'create', entity_type: 'kiosk_device', entity_id: row.id, restaurant_id: rid,
      entity_name: name, description: `Kiosk device registered: ${name}`,
    });
    res.status(201).json({ success: true, data: { device: publicDevice(row), token, slug: restaurant.slug } });
  } catch (e) {
    console.error('POST /kiosk-devices error:', e);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

/** 기기 이름·옆 단말기 주소 바꾸기 */
router.patch('/:deviceId', authenticateToken, requireRole(...ADMIN_ROLES), async (req, res) => {
  try {
    const row = await loadOwned(req, res); if (!row) return;
    const patch = {};
    if (req.body?.name !== undefined) {
      const name = String(req.body.name || '').trim().slice(0, 80);
      if (!name) return res.status(400).json({ success: false, message: 'name is required' });
      patch.name = name;
    }
    if (req.body?.terminal_host !== undefined) {
      const h = cleanHost(req.body.terminal_host);
      if (h === undefined) return res.status(400).json({ success: false, message: 'Invalid terminal address' });
      patch.terminal_host = h;
    }
    if (req.body?.terminal_port !== undefined) {
      const p = cleanPort(req.body.terminal_port);
      if (p === undefined) return res.status(400).json({ success: false, message: 'Invalid terminal port' });
      patch.terminal_port = p;
    }
    const before = publicDevice(row);
    await row.update(patch);
    await logActivity(req, {
      action_type: 'update', entity_type: 'kiosk_device', entity_id: row.id, restaurant_id: row.restaurant_id,
      entity_name: row.name, changes: { before: { name: before.name, terminal_host: before.terminal_host, terminal_port: before.terminal_port }, after: patch },
      description: `Kiosk device updated: ${row.name}`,
    });
    res.json({ success: true, data: publicDevice(row) });
  } catch (e) {
    console.error('PATCH /kiosk-devices error:', e);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

router.post('/:deviceId/revoke', authenticateToken, requireRole(...ADMIN_ROLES), async (req, res) => {
  try {
    const row = await loadOwned(req, res); if (!row) return;
    if (row.status !== 'revoked') {
      await row.update({ status: 'revoked', revoked_at: new Date(), revoked_by: req.user.id });
      await logActivity(req, {
        action_type: 'update', entity_type: 'kiosk_device', entity_id: row.id, restaurant_id: row.restaurant_id,
        entity_name: row.name, changes: { status: 'revoked' }, description: `Kiosk device unregistered: ${row.name}`,
      });
    }
    res.json({ success: true, data: publicDevice(row) });
  } catch (e) {
    console.error('POST /kiosk-devices/revoke error:', e);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

/** :deviceId 기기를 읽고 그 매장 접근을 확인한다. 남의 매장 기기는 존재 여부도 알려주지 않는다(404). */
async function loadOwned(req, res) {
  const id = parseInt(req.params.deviceId, 10);
  const row = Number.isFinite(id) ? await KioskDevice.findByPk(id) : null;
  const ok = row && (req.user.role === 'System Admin' || Number(req.user.restaurant_id) === Number(row.restaurant_id));
  if (!ok) {
    res.status(404).json({ success: false, message: 'Kiosk device not found' });
    return null;
  }
  return row;
}

module.exports = router;

/**
 * Web Push API routes (v3.28+)
 *
 * GET    /api/push/vapid-public-key   — public, returns server's VAPID public key
 * POST   /api/push/subscribe          — auth, register a device endpoint
 * DELETE /api/push/subscribe          — auth, unregister a device endpoint
 * GET    /api/push/preferences        — auth, fetch per-user push settings
 * PUT    /api/push/preferences        — auth, update per-user push settings
 * POST   /api/push/test               — auth + rate-limit, send a test push to self
 * GET    /api/push/admin/stats        — System Admin, push delivery stats
 * GET    /api/push/admin/logs         — System Admin, push log paginated
 */
const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { ipKeyGenerator } = require('express-rate-limit');
const { Op, fn, col, literal } = require('sequelize');
const { authenticateToken, requireRole } = require('../middleware/auth');
const PushSubscription = require('../models/PushSubscription');
const PushLog = require('../models/PushLog');
const User = require('../models/User');
const pushService = require('../services/pushService');
const { listUserRestaurantIds } = require('../services/userContexts');

// 매장별 기기 알림 — 내가 속한 매장(소속 + RA·Staff 모자) 목록과 켜짐 여부.
// 2개 이상일 때만 화면에 목록이 보인다. 설계 .claude/fable-design-20261113-notification-store-scope.md (N4)
async function loadMyStores(userId, storeOff) {
  const ids = await listUserRestaurantIds(userId);
  if (!ids.length) return [];
  const Restaurant = require('../models/Restaurant');
  const rows = await Restaurant.findAll({ where: { id: { [Op.in]: ids } }, attributes: ['id', 'name'] });
  const nameById = new Map(rows.map(r => [Number(r.id), r.name]));
  const off = new Set((Array.isArray(storeOff) ? storeOff : []).map(Number));
  return ids.map(id => ({ id, name: nameById.get(id) || `#${id}`, on: !off.has(id) }));
}

// per-user rate limit on /test (5/min)
const testLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  keyGenerator: (req) => (req.user && req.user.id) ? `push-test-${req.user.id}` : ipKeyGenerator(req.ip),
  message: { success: false, message: 'Too many test pushes, max 5/min' },
  standardHeaders: true,
  legacyHeaders: false
});

// ────────────────────────────────────────────────────────────────────────────
// PUBLIC: VAPID public key — required by client to subscribe.
// Per W3C Web Push spec, this key is intentionally not authenticated.
// ────────────────────────────────────────────────────────────────────────────
router.get('/vapid-public-key', (req, res) => {
  const publicKey = process.env.VAPID_PUBLIC_KEY;
  if (!publicKey) {
    return res.status(500).json({ success: false, message: 'VAPID public key not configured' });
  }
  res.json({ success: true, data: { publicKey } });
});

// ────────────────────────────────────────────────────────────────────────────
// POST /api/push/subscribe
// ────────────────────────────────────────────────────────────────────────────
router.post('/subscribe', authenticateToken, async (req, res) => {
  try {
    const { endpoint, keys, user_agent } = req.body || {};
    if (!endpoint || !keys || !keys.p256dh || !keys.auth) {
      return res.status(400).json({ success: false, message: 'endpoint and keys.{p256dh,auth} are required' });
    }
    if (!pushService.isValidEndpoint(endpoint)) {
      return res.status(400).json({ success: false, message: 'Invalid push endpoint' });
    }

    // 기기(endpoint) 1개 = 줄 1개 — 표에 endpoint 고유 규칙(push_sub_endpoint_uniq)이 있고 지운 줄도 그 규칙에 걸린다.
    // 예전엔 «다른 계정 줄을 지움 표시 → 새 줄 만들기» 였는데 새 줄이 고유 규칙에 걸려 늘 500 이었다 → 기기가 처음 켠
    // 계정(예: K-DINE IPC)에서 영영 안 옮겨졌다(2026-11-14 Irene «죄다 K-DIND IPC로 나와»).
    // 이제 같은 줄을 지금 계정으로 옮긴다(지운 줄이면 되살린다). 구독 주소는 그 브라우저만 아는 값이라 옮기는 범위는 예전 의도와 같다.
    const ua = user_agent || req.get('User-Agent') || null;
    const existing = await PushSubscription.findOne({ where: { endpoint } });
    if (existing) {
      await existing.update({
        user_id: req.user.id,
        p256dh: keys.p256dh,
        auth: keys.auth,
        user_agent: ua,
        expired_at: null,
        deleted_at: null
      });
      return res.json({ success: true, data: { id: existing.id, created: false } });
    }
    const sub = await PushSubscription.create({
      user_id: req.user.id,
      endpoint,
      p256dh: keys.p256dh,
      auth: keys.auth,
      user_agent: ua
    });

    res.json({ success: true, data: { id: sub.id, created: true } });
  } catch (e) {
    console.error('[Push] subscribe error:', e);
    res.status(500).json({ success: false, message: 'Failed to register subscription' });
  }
});

// ────────────────────────────────────────────────────────────────────────────
// DELETE /api/push/subscribe
// ────────────────────────────────────────────────────────────────────────────
router.delete('/subscribe', authenticateToken, async (req, res) => {
  try {
    const { endpoint } = req.body || {};
    if (!endpoint) return res.status(400).json({ success: false, message: 'endpoint is required' });
    await PushSubscription.update(
      { deleted_at: new Date() },
      { where: { endpoint, user_id: req.user.id, deleted_at: null } }
    );
    res.json({ success: true });
  } catch (e) {
    console.error('[Push] unsubscribe error:', e);
    res.status(500).json({ success: false, message: 'Failed to unsubscribe' });
  }
});

// ────────────────────────────────────────────────────────────────────────────
// GET /api/push/preferences
// ────────────────────────────────────────────────────────────────────────────
router.get('/preferences', authenticateToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'push_enabled', 'push_muted_hours', 'push_store_off']
    });
    res.json({
      success: true,
      data: {
        push_enabled: user.push_enabled,
        muted_hours: user.push_muted_hours || { enabled: false, start: 22, end: 8, timezone: 'Asia/Kuala_Lumpur' },
        stores: await loadMyStores(user.id, user.push_store_off)
      }
    });
  } catch (e) {
    console.error('[Push] get preferences error:', e);
    res.status(500).json({ success: false, message: 'Failed to fetch preferences' });
  }
});

// ────────────────────────────────────────────────────────────────────────────
// PUT /api/push/preferences
// ────────────────────────────────────────────────────────────────────────────
router.put('/preferences', authenticateToken, async (req, res) => {
  try {
    const { push_enabled, muted_hours, store_off } = req.body || {};
    const user = await User.findByPk(req.user.id);
    const update = {};

    if (push_enabled !== undefined) update.push_enabled = !!push_enabled;
    if (muted_hours) {
      const start = Number(muted_hours.start);
      const end = Number(muted_hours.end);
      if (!Number.isFinite(start) || start < 0 || start > 23 || !Number.isFinite(end) || end < 0 || end > 23) {
        return res.status(400).json({ success: false, message: 'Invalid muted_hours range' });
      }
      update.push_muted_hours = {
        enabled: !!muted_hours.enabled,
        start, end,
        timezone: muted_hours.timezone || 'Asia/Kuala_Lumpur'
      };
    }

    if (store_off !== undefined) {
      if (!Array.isArray(store_off)) {
        return res.status(400).json({ success: false, message: 'store_off must be an array of store ids' });
      }
      // 내가 속한 매장 번호만 남긴다(남의 매장 번호는 조용히 버림 — 저장해도 효과가 없고, 모자가 막 회수된 경우도 안전).
      const mine = new Set(await listUserRestaurantIds(user.id));
      const kept = [...new Set(store_off.map(Number).filter(n => Number.isInteger(n) && mine.has(n)))].sort((a, b) => a - b);
      update.push_store_off = kept.length ? kept : null;
    }

    await user.update(update);
    res.json({
      success: true,
      data: {
        push_enabled: user.push_enabled,
        // GET 과 같은 기본값 — 화면이 이 응답으로 상태를 갈아 끼우므로(매장별 끄기) 빈 값이면 이어서 «조용한 시간» 저장이 400 난다.
        muted_hours: user.push_muted_hours || { enabled: false, start: 22, end: 8, timezone: 'Asia/Kuala_Lumpur' },
        stores: await loadMyStores(user.id, user.push_store_off)
      }
    });
  } catch (e) {
    console.error('[Push] update preferences error:', e);
    res.status(500).json({ success: false, message: 'Failed to update preferences' });
  }
});

// ────────────────────────────────────────────────────────────────────────────
// POST /api/push/test  (rate-limited per user, 5/min)
// ────────────────────────────────────────────────────────────────────────────
router.post('/test', authenticateToken, testLimiter, async (req, res) => {
  try {
    const result = await pushService.sendPushToUser(req.user.id, {
      title: 'Purple POS test notification',
      body: 'If you see this, web push is working on this device.',
      category: req.body?.category || 'system',
      url: '/'
    });
    res.json({ success: true, data: result });
  } catch (e) {
    console.error('[Push] test error:', e);
    res.status(500).json({ success: false, message: e.message });
  }
});

// ────────────────────────────────────────────────────────────────────────────
// GET /api/push/admin/stats  (System Admin)
// ────────────────────────────────────────────────────────────────────────────
router.get('/admin/stats', authenticateToken, requireRole('System Admin'), async (req, res) => {
  try {
    const since24h = new Date(Date.now() - 24 * 3600 * 1000);
    const [activeSubs, sent24h, failed24h, byBrowser, byRole] = await Promise.all([
      PushSubscription.count({ where: { expired_at: null, deleted_at: null } }),
      PushLog.count({ where: { status: 'sent', sent_at: { [Op.gte]: since24h } } }),
      PushLog.count({ where: { status: { [Op.in]: ['failed', 'expired_endpoint'] }, sent_at: { [Op.gte]: since24h } } }),
      PushSubscription.findAll({
        where: { expired_at: null, deleted_at: null },
        attributes: [
          [literal("CASE WHEN user_agent LIKE '%Chrome%' AND user_agent NOT LIKE '%Edg%' THEN 'Chrome' WHEN user_agent LIKE '%Edg%' THEN 'Edge' WHEN user_agent LIKE '%Safari%' AND user_agent NOT LIKE '%Chrome%' THEN 'Safari' WHEN user_agent LIKE '%Firefox%' THEN 'Firefox' ELSE 'Other' END"), 'browser'],
          [fn('COUNT', col('id')), 'count']
        ],
        group: ['browser'],
        raw: true
      }),
      User.findAll({
        attributes: ['role', [fn('COUNT', col('User.id')), 'count']],
        include: [{ model: PushSubscription, as: 'pushSubscriptions', attributes: [], required: true, where: { expired_at: null, deleted_at: null } }],
        group: ['role'],
        raw: true
      })
    ]);
    res.json({
      success: true,
      data: { active_subscriptions: activeSubs, sent_24h: sent24h, failed_24h: failed24h, by_browser: byBrowser, by_role: byRole }
    });
  } catch (e) {
    console.error('[Push] admin stats error:', e);
    res.status(500).json({ success: false, message: 'Failed to load stats' });
  }
});

// ────────────────────────────────────────────────────────────────────────────
// GET /api/push/admin/logs  (System Admin, paginated)
// ────────────────────────────────────────────────────────────────────────────
router.get('/admin/logs', authenticateToken, requireRole('System Admin'), async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 50, 200);
    const offset = parseInt(req.query.offset) || 0;
    const where = {};
    if (req.query.user_id) where.user_id = parseInt(req.query.user_id);
    if (req.query.status) where.status = req.query.status;
    if (req.query.from || req.query.to) {
      where.sent_at = {};
      if (req.query.from) where.sent_at[Op.gte] = new Date(req.query.from);
      if (req.query.to) where.sent_at[Op.lte] = new Date(req.query.to);
    }
    const { rows, count } = await PushLog.findAndCountAll({
      where, limit, offset, order: [['sent_at', 'DESC']]
    });
    res.json({ success: true, data: rows, pagination: { total: count, limit, offset } });
  } catch (e) {
    console.error('[Push] admin logs error:', e);
    res.status(500).json({ success: false, message: 'Failed to load logs' });
  }
});

module.exports = router;

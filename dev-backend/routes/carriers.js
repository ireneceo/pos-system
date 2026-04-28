/**
 * Carriers — Sprint 5 (2026-04-27)
 *
 * Public catalog endpoint (auth required) + System Admin CRUD.
 *   GET  /api/carriers              — active carriers list
 *   GET  /api/admin/carriers        — full list (admin)
 *   POST /api/admin/carriers
 *   PUT  /api/admin/carriers/:id
 *   DELETE /api/admin/carriers/:id  — soft via is_active=false
 */

const express = require('express');
const router = express.Router();
const { Carrier } = require('../models');
const { authenticateToken, requireRole } = require('../middleware/auth');
const { sanitizeString } = require('../middleware/validation');

// Public list — webhook 설정은 노출 안 함 (Sprint 7)
const PUBLIC_CARRIER_ATTRS = {
  exclude: ['webhook_secret', 'webhook_event_path', 'webhook_tracking_path', 'webhook_idempotency_path', 'webhook_status_map']
};

router.get('/carriers', authenticateToken, async (req, res) => {
  try {
    const items = await Carrier.findAll({
      where: { is_active: true },
      attributes: PUBLIC_CARRIER_ATTRS,
      order: [['sort_order', 'ASC'], ['name', 'ASC']]
    });
    res.json({ success: true, data: items });
  } catch (err) {
    console.error('GET /api/carriers error:', err);
    res.status(500).json({ success: false, message: 'Failed to load carriers' });
  }
});

// Sprint 7: helper to mask webhook_secret in responses
function maskCarrier(c) {
  const json = c.toJSON ? c.toJSON() : c;
  const { webhook_secret, ...rest } = json;
  return { ...rest, webhook_secret_set: !!webhook_secret };
}

router.get('/admin/carriers', authenticateToken, requireRole('System Admin'), async (req, res) => {
  try {
    const items = await Carrier.findAll({
      order: [['sort_order', 'ASC'], ['name', 'ASC']]
    });
    res.json({ success: true, data: items.map(maskCarrier) });
  } catch (err) {
    console.error('GET /api/admin/carriers error:', err);
    res.status(500).json({ success: false, message: 'Failed to load carriers' });
  }
});

function sanitizePayload(body) {
  return {
    code: body.code ? sanitizeString(String(body.code)).slice(0, 50).toLowerCase().replace(/[^a-z0-9_]/g, '_') : null,
    name: body.name ? sanitizeString(String(body.name)).slice(0, 100) : null,
    tracking_url_template: body.tracking_url_template ? sanitizeString(String(body.tracking_url_template)).slice(0, 500) : null,
    logo_url: body.logo_url ? String(body.logo_url).slice(0, 2000) : null,
    country: body.country ? String(body.country).toUpperCase().slice(0, 2) : null,
    is_active: body.is_active !== undefined ? !!body.is_active : true,
    sort_order: Number.isFinite(parseInt(body.sort_order, 10)) ? parseInt(body.sort_order, 10) : 0
  };
}

router.post('/admin/carriers', authenticateToken, requireRole('System Admin'), async (req, res) => {
  try {
    const data = sanitizePayload(req.body);
    if (!data.code || !data.name) {
      return res.status(400).json({ success: false, message: 'code and name are required' });
    }
    const created = await Carrier.create(data);
    res.status(201).json({ success: true, data: created });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ success: false, message: 'Carrier code already exists' });
    }
    console.error('POST /api/admin/carriers error:', err);
    res.status(500).json({ success: false, message: 'Failed to create carrier' });
  }
});

router.put('/admin/carriers/:id', authenticateToken, requireRole('System Admin'), async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (!Number.isFinite(id)) return res.status(404).json({ success: false, message: 'Carrier not found' });
    const carrier = await Carrier.findByPk(id);
    if (!carrier) return res.status(404).json({ success: false, message: 'Carrier not found' });
    const data = sanitizePayload(req.body);
    await carrier.update(data);
    res.json({ success: true, data: carrier });
  } catch (err) {
    console.error('PUT /api/admin/carriers/:id error:', err);
    res.status(500).json({ success: false, message: 'Failed to update carrier' });
  }
});

router.delete('/admin/carriers/:id', authenticateToken, requireRole('System Admin'), async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (!Number.isFinite(id)) return res.status(404).json({ success: false, message: 'Carrier not found' });
    const carrier = await Carrier.findByPk(id);
    if (!carrier) return res.status(404).json({ success: false, message: 'Carrier not found' });
    await carrier.update({ is_active: false });
    res.json({ success: true, message: 'Carrier deactivated' });
  } catch (err) {
    console.error('DELETE /api/admin/carriers/:id error:', err);
    res.status(500).json({ success: false, message: 'Failed to deactivate carrier' });
  }
});

// ─── Sprint 7 — Webhook configuration ──────────────────
const crypto = require('crypto');
const rateLimit = require('express-rate-limit');

// PO.status ENUM (in_transit / delivery_failed 포함)
const VALID_STATUS_TARGETS = new Set([
  'draft', 'submitted', 'confirmed', 'shipped',
  'in_transit', 'delivered', 'partial_received', 'received',
  'cancelled', 'closed', 'delivery_failed'
]);

// C1. PUT /api/admin/carriers/:id/webhook — 설정만 (secret는 별도 endpoint)
router.put('/admin/carriers/:id/webhook',
  authenticateToken, requireRole('System Admin'), async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (!Number.isFinite(id)) return res.status(404).json({ success: false, message: 'Carrier not found' });
    const carrier = await Carrier.findByPk(id);
    if (!carrier) return res.status(404).json({ success: false, message: 'Carrier not found' });

    const body = req.body || {};
    const updates = {};

    if (body.webhook_event_path !== undefined) {
      updates.webhook_event_path = body.webhook_event_path
        ? sanitizeString(String(body.webhook_event_path)).slice(0, 255) : null;
    }
    if (body.webhook_tracking_path !== undefined) {
      updates.webhook_tracking_path = body.webhook_tracking_path
        ? sanitizeString(String(body.webhook_tracking_path)).slice(0, 255) : null;
    }
    if (body.webhook_idempotency_path !== undefined) {
      updates.webhook_idempotency_path = body.webhook_idempotency_path
        ? sanitizeString(String(body.webhook_idempotency_path)).slice(0, 255) : null;
    }
    if (body.webhook_status_map !== undefined) {
      const map = body.webhook_status_map;
      if (map !== null && (typeof map !== 'object' || Array.isArray(map))) {
        return res.status(400).json({ success: false, message: 'webhook_status_map must be object or null' });
      }
      // Validate target ENUM
      if (map) {
        for (const [k, v] of Object.entries(map)) {
          if (typeof v !== 'string' || !VALID_STATUS_TARGETS.has(v)) {
            return res.status(400).json({
              success: false,
              message: `Invalid status_map target '${v}' for key '${k}'. Allowed: ${Array.from(VALID_STATUS_TARGETS).join(', ')}`
            });
          }
        }
      }
      updates.webhook_status_map = map;
    }

    await carrier.update(updates);
    res.json({ success: true, data: maskCarrier(carrier) });
  } catch (err) {
    console.error('[carriers] PUT webhook error:', err);
    res.status(500).json({ success: false, message: 'Failed to update webhook config' });
  }
});

// C2. POST /api/admin/carriers/:id/webhook/regenerate-secret
const regenLimiter = rateLimit({ windowMs: 60_000, max: 5, standardHeaders: true, legacyHeaders: false });
router.post('/admin/carriers/:id/webhook/regenerate-secret',
  authenticateToken, requireRole('System Admin'), regenLimiter, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (!Number.isFinite(id)) return res.status(404).json({ success: false, message: 'Carrier not found' });
    const carrier = await Carrier.findByPk(id);
    if (!carrier) return res.status(404).json({ success: false, message: 'Carrier not found' });

    // 64-byte random hex (= 128자)
    const secret = crypto.randomBytes(64).toString('hex');
    await carrier.update({ webhook_secret: secret });

    // 응답에 plain secret 한 번만 노출 (이후 GET에선 마스킹)
    res.json({
      success: true,
      data: {
        secret,
        warning: '이 secret은 다시 볼 수 없습니다. 지금 carrier 콘솔에 등록하세요.'
      }
    });
  } catch (err) {
    console.error('[carriers] regenerate-secret error:', err);
    res.status(500).json({ success: false, message: 'Failed to regenerate secret' });
  }
});

module.exports = router;

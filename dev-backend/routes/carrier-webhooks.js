/**
 * Carrier Webhooks — Sprint 7 (2026-04-28)
 *
 * Inbound webhook endpoint for delivery carriers (Lalamove, Grab, JNT, ...).
 *
 * Public + HMAC-SHA256 signed.
 * 2-stage processing:
 *   1. Synchronous (~50ms): HMAC + timestamp tolerance + payload_hash UNIQUE
 *      → CarrierWebhookEvent.create({status:'pending_apply'}) → 200 응답
 *   2. Asynchronous (setImmediate):
 *      tracking_number → PO 매칭 → status_map 적용 → status 진보 검사
 *      → PO.status 업데이트 + tracking_info.events 추가 + emit + (milestone) email
 *
 * Idempotency: payload_hash UNIQUE — same body twice = ignored_duplicate
 * Audit: raw_body MEDIUMTEXT preserved
 *
 * Admin endpoints:
 *   GET    /api/admin/carrier-webhook-events             — 모니터/필터
 *   POST   /api/admin/carrier-webhook-events/:id/retry   — 재처리
 *   POST   /api/admin/carrier-webhooks/:carrier_code/simulate — HMAC bypass 시뮬레이션
 */

const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const rateLimit = require('express-rate-limit');
const { Op } = require('sequelize');
const {
  Carrier, CarrierWebhookEvent, PurchaseOrder
} = require('../models');
const { authenticateToken, requireRole } = require('../middleware/auth');
const { emitPoEvent, appendTrackingEvent } = require('../services/poRealtimeService');

// ─── helpers ─────────────────────────────────────────

/**
 * Get nested value by dot-path. e.g. 'event.data.tracking' → obj.event.data.tracking
 */
function getByPath(obj, path) {
  if (!path || !obj) return undefined;
  return path.split('.').reduce((acc, key) => acc?.[key], obj);
}

/**
 * Status progression order — for out-of-order regression detection.
 * Branch states (cancelled, delivery_failed, returned) are accepted from anywhere.
 */
const STATUS_ORDER = {
  draft: 0, submitted: 1, confirmed: 2, shipped: 3,
  in_transit: 4, delivered: 5, partial_received: 6, received: 7, closed: 8
};
const BRANCH_STATES = new Set(['cancelled', 'delivery_failed', 'returned']);
const VALID_STATUSES = new Set(Object.keys(STATUS_ORDER).concat(Array.from(BRANCH_STATES)));

function isStatusProgression(currentStatus, newStatus) {
  if (BRANCH_STATES.has(newStatus)) return true; // 어디서나 적용
  if (!STATUS_ORDER[currentStatus] && STATUS_ORDER[currentStatus] !== 0) return true;
  if (!STATUS_ORDER[newStatus] && STATUS_ORDER[newStatus] !== 0) return false;
  return STATUS_ORDER[newStatus] > STATUS_ORDER[currentStatus];
}

/**
 * Verify HMAC-SHA256 signature.
 * Expected header: X-Webhook-Signature: sha256=<hex>
 * Body for HMAC = `${timestamp}.${rawBody}`
 */
function verifySignature(secret, timestamp, rawBody, headerSig) {
  if (!secret || !timestamp || !rawBody || !headerSig) return false;
  const expected = crypto.createHmac('sha256', secret).update(`${timestamp}.${rawBody}`).digest('hex');
  const provided = headerSig.replace(/^sha256=/, '');
  if (expected.length !== provided.length) return false;
  try {
    return crypto.timingSafeEqual(Buffer.from(expected, 'hex'), Buffer.from(provided, 'hex'));
  } catch {
    return false;
  }
}

/**
 * Apply a webhook event to its matched PO (2단계 비동기 처리).
 * Updates CarrierWebhookEvent.status + PO.status when applicable.
 */
async function applyWebhookEvent(eventId, req) {
  const event = await CarrierWebhookEvent.findByPk(eventId, { include: [{ model: Carrier, as: 'carrier' }] });
  if (!event || event.status !== 'pending_apply') return;

  const carrier = event.carrier;
  const payload = event.payload;

  try {
    // 1. Extract status & tracking
    const rawStatus = getByPath(payload, carrier.webhook_event_path);
    const trackingNumber = getByPath(payload, carrier.webhook_tracking_path);

    if (!trackingNumber) {
      await event.update({ status: 'failed', error: 'no_tracking_number_in_payload', applied_at: new Date() });
      return;
    }

    // 2. Map carrier status → PO status
    const statusMap = carrier.webhook_status_map || {};
    const mapped = statusMap[rawStatus];
    if (!mapped || !VALID_STATUSES.has(mapped)) {
      await event.update({
        status: 'failed',
        error: `invalid_mapping (raw='${rawStatus}', mapped='${mapped}')`,
        mapped_status: mapped || null,
        applied_at: new Date()
      });
      return;
    }

    // 3. Match PO — tracking_number + carrier_id within ship_at ±7d
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const candidates = await PurchaseOrder.findAll({
      where: {
        [Op.and]: [
          { ship_at: { [Op.gte]: sevenDaysAgo } } // narrow window
        ],
        // tracking_info JSON 안에 tracking_number 매칭 — JSON_EXTRACT
      },
      order: [['updated_at', 'DESC']],
      limit: 100
    }).catch(() => []);

    // Filter in-app (tracking_info.tracking_number 매칭)
    const matched = candidates.filter(po =>
      po.tracking_info?.tracking_number === trackingNumber &&
      po.tracking_info?.carrier_code === carrier.code
    );

    if (matched.length === 0) {
      // Fallback: 더 넓게 search (no time window) for resilience
      const wide = await PurchaseOrder.findAll({ order: [['updated_at', 'DESC']], limit: 500 }).catch(() => []);
      const wideMatched = wide.filter(po =>
        po.tracking_info?.tracking_number === trackingNumber &&
        po.tracking_info?.carrier_code === carrier.code
      );
      if (wideMatched.length === 0) {
        await event.update({ status: 'failed', error: 'no_match', mapped_status: mapped, applied_at: new Date() });
        return;
      }
      matched.push(wideMatched[0]);
    } else if (matched.length > 1) {
      // Multiple match — 가장 최근 1개만 적용 + log
      await event.update({ error: `multiple_match (${matched.length}) — applied latest` });
    }

    const po = matched[0];

    // 4. Status progression check
    if (!isStatusProgression(po.status, mapped)) {
      await event.update({
        status: 'ignored_regress',
        purchase_order_id: po.id,
        mapped_status: mapped,
        applied_at: new Date()
      });
      return;
    }

    // 5. Apply — update PO.status + tracking_info.events
    const newTracking = appendTrackingEvent(po, mapped, `via ${carrier.name}: ${rawStatus}`);
    // append source field
    if (Array.isArray(newTracking.events) && newTracking.events.length > 0) {
      newTracking.events[newTracking.events.length - 1].source = 'webhook';
      newTracking.events[newTracking.events.length - 1].carrier_event_id = event.carrier_event_id;
    }
    const updates = { status: mapped, tracking_info: newTracking };
    if (mapped === 'delivered') updates.actual_delivery_date = new Date();
    await po.update(updates);

    // 6. Emit + (milestone) email
    if (req) emitPoEvent(req, po, 'seller-order-updated');

    // Email throttle: only milestone (no in_transit / picked_up)
    const MILESTONE = new Set(['delivered', 'delivery_failed', 'returned']);
    if (MILESTONE.has(mapped)) {
      // TODO: send buyer notification email — leverage existing notification flow
      // (현재는 notify-from-deliver/handle-buyer 로직 재사용)
    }

    await event.update({
      status: 'applied',
      purchase_order_id: po.id,
      mapped_status: mapped,
      applied_at: new Date()
    });
  } catch (err) {
    console.error(`[carrier-webhook] applyWebhookEvent error (event ${eventId}):`, err.message);
    try {
      await event.update({
        status: 'failed',
        error: err.message.slice(0, 1000),
        applied_at: new Date(),
        retry_count: (event.retry_count || 0) + 1
      });
    } catch { /* best effort */ }
  }
}

// ─── Rate limiter ────────────────────────────────────
const webhookLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10, // per IP per minute (정상 carrier는 분당 1-2회 미만)
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many webhook requests' }
});

const adminRetryLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false
});

// ─── B1. POST /api/carrier-webhooks/:carrier_code ───
// Public + HMAC. raw body 필수 — server.js에서 express.raw 적용됨
router.post('/carrier-webhooks/:carrier_code', webhookLimiter, async (req, res) => {
  try {
    const code = String(req.params.carrier_code).toLowerCase();
    const carrier = await Carrier.findOne({ where: { code } });
    if (!carrier) {
      return res.status(404).json({ success: false, message: 'Carrier not found' });
    }
    if (!carrier.webhook_secret) {
      return res.status(503).json({ success: false, message: 'Webhook not configured for this carrier' });
    }

    // Raw body — server.js의 express.raw 미들웨어가 req.body를 Buffer로 채움
    const rawBody = (Buffer.isBuffer(req.body) ? req.body.toString('utf8') : '');
    if (!rawBody) {
      return res.status(400).json({ success: false, message: 'Empty body' });
    }

    // Body 200KB limit
    if (rawBody.length > 200 * 1024) {
      return res.status(413).json({ success: false, message: 'Body too large' });
    }

    const sigHeader = req.get('X-Webhook-Signature') || '';
    const tsHeader = req.get('X-Webhook-Timestamp') || '';
    const ts = parseInt(tsHeader, 10);

    // Timestamp tolerance ±5분 (replay 방지)
    if (!Number.isFinite(ts) || Math.abs(Date.now() - ts) > 5 * 60 * 1000) {
      return res.status(401).json({ success: false, message: 'Invalid or expired timestamp' });
    }

    const sigValid = verifySignature(carrier.webhook_secret, ts, rawBody, sigHeader);
    if (!sigValid) {
      return res.status(401).json({ success: false, message: 'Invalid signature' });
    }

    let payload;
    try { payload = JSON.parse(rawBody); }
    catch { return res.status(400).json({ success: false, message: 'Invalid JSON' }); }

    // payload_hash for idempotency
    const payloadHash = crypto.createHash('sha256').update(rawBody).digest('hex');

    // Idempotency check
    const existing = await CarrierWebhookEvent.findOne({ where: { payload_hash: payloadHash } });
    if (existing) {
      return res.status(200).json({
        success: true,
        event_id: existing.id,
        status: 'ignored_duplicate'
      });
    }

    const carrierEventId = carrier.webhook_idempotency_path
      ? String(getByPath(payload, carrier.webhook_idempotency_path) || '').slice(0, 255)
      : null;

    const event = await CarrierWebhookEvent.create({
      carrier_id: carrier.id,
      carrier_event_id: carrierEventId,
      payload_hash: payloadHash,
      signature_valid: true,
      payload,
      raw_body: rawBody,
      status: 'pending_apply',
      simulated: false,
      source_ip: req.ip || req.connection?.remoteAddress || null,
      received_at: new Date()
    });

    // 200 응답 즉시 + 비동기 적용
    res.status(200).json({ success: true, event_id: event.id });

    setImmediate(() => applyWebhookEvent(event.id, req).catch(e =>
      console.error(`[carrier-webhook] async apply failed:`, e.message)));
  } catch (err) {
    console.error('[carrier-webhook] inbound error:', err);
    return res.status(500).json({ success: false, message: 'Internal error' });
  }
});

// ─── Admin endpoints ─────────────────────────────────
router.use('/admin/carrier-webhook-events', authenticateToken, requireRole('System Admin'));
router.use('/admin/carrier-webhooks', authenticateToken, requireRole('System Admin'));

// B2. GET monitor
router.get('/admin/carrier-webhook-events', async (req, res) => {
  try {
    const where = {};
    if (req.query.carrier_id) where.carrier_id = parseInt(req.query.carrier_id, 10);
    if (req.query.status) where.status = req.query.status;
    if (req.query.simulated != null) where.simulated = req.query.simulated === 'true';
    if (req.query.signature_valid != null) where.signature_valid = req.query.signature_valid === 'true';
    if (req.query.from) where.received_at = { ...(where.received_at || {}), [Op.gte]: new Date(req.query.from) };
    if (req.query.to) where.received_at = { ...(where.received_at || {}), [Op.lte]: new Date(req.query.to) };

    const limit = Math.min(200, parseInt(req.query.limit, 10) || 50);
    const offset = parseInt(req.query.offset, 10) || 0;

    const { rows, count } = await CarrierWebhookEvent.findAndCountAll({
      where,
      include: [{ model: Carrier, as: 'carrier', attributes: ['id', 'code', 'name'] }],
      order: [['received_at', 'DESC']],
      limit, offset
    });

    res.json({ success: true, data: { events: rows, total: count } });
  } catch (err) {
    console.error('[carrier-webhook] list error:', err);
    res.status(500).json({ success: false, message: 'Failed' });
  }
});

// B3. POST retry
router.post('/admin/carrier-webhook-events/:id/retry', adminRetryLimiter, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (!Number.isFinite(id)) return res.status(404).json({ success: false, message: 'Not found' });
    const event = await CarrierWebhookEvent.findByPk(id);
    if (!event) return res.status(404).json({ success: false, message: 'Not found' });

    // Reset to pending_apply (retry)
    await event.update({ status: 'pending_apply', error: null, applied_at: null });
    setImmediate(() => applyWebhookEvent(event.id, req).catch(e =>
      console.error(`[carrier-webhook] retry async failed:`, e.message)));

    // Re-fetch after async kicked off
    res.json({ success: true, data: { event_id: event.id, message: 'Retry initiated' } });
  } catch (err) {
    console.error('[carrier-webhook] retry error:', err);
    res.status(500).json({ success: false, message: 'Failed' });
  }
});

// B4. POST simulate (HMAC bypass)
router.post('/admin/carrier-webhooks/:carrier_code/simulate', async (req, res) => {
  try {
    const code = String(req.params.carrier_code).toLowerCase();
    const carrier = await Carrier.findOne({ where: { code } });
    if (!carrier) return res.status(404).json({ success: false, message: 'Carrier not found' });

    const payload = req.body?.payload;
    if (!payload || typeof payload !== 'object') {
      return res.status(400).json({ success: false, message: 'payload object is required' });
    }

    const rawBody = JSON.stringify(payload);
    if (rawBody.length > 200 * 1024) {
      return res.status(413).json({ success: false, message: 'Body too large' });
    }

    const payloadHash = crypto.createHash('sha256').update(rawBody).digest('hex');

    // Idempotency — simulated은 unique 위반 방지 위해 timestamp 추가
    const uniqueHash = crypto.createHash('sha256')
      .update(rawBody + ':sim:' + Date.now()).digest('hex');

    const carrierEventId = carrier.webhook_idempotency_path
      ? String(getByPath(payload, carrier.webhook_idempotency_path) || '').slice(0, 255)
      : null;

    const event = await CarrierWebhookEvent.create({
      carrier_id: carrier.id,
      carrier_event_id: carrierEventId,
      payload_hash: uniqueHash, // simulated unique
      signature_valid: true, // bypass
      payload,
      raw_body: rawBody,
      status: 'pending_apply',
      simulated: true,
      source_ip: req.ip || null,
      received_at: new Date()
    });

    // Sync apply for immediate response (simulate는 동기 처리 — 운영자 즉시 확인 가능)
    await applyWebhookEvent(event.id, req);
    const refreshed = await CarrierWebhookEvent.findByPk(event.id);

    res.json({
      success: true,
      data: {
        event_id: event.id,
        status: refreshed.status,
        mapped_status: refreshed.mapped_status,
        purchase_order_id: refreshed.purchase_order_id,
        error: refreshed.error
      }
    });
  } catch (err) {
    console.error('[carrier-webhook] simulate error:', err);
    res.status(500).json({ success: false, message: 'Failed' });
  }
});

module.exports = router;

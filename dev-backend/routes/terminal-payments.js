/**
 * 카드단말기 ECR 연동 API — /api/terminal (Fable 설계 .claude/fable-design-20261001-ghl-ecr.md §3-2).
 *
 * 흐름: 계산대가 거래를 만들면 서버가 단말기 요청 hex 를 준다 → 계산대 앱 브릿지(window.__NATIVE_ECR)가
 *       단말기에 운반 → 받은 응답 hex 를 그대로 /response 로 올린다 → 서버가 해석·검증·기록.
 * 상태 전이는 services/terminalPayments.js 한 곳. 여기서는 권한·입력 확인만 한다.
 * 권한: 로그인 + 결제 권한(access_payment) + 그 매장 접근. restaurant_id 는 접근 판정을 거친 뒤에만 쓴다.
 */
const express = require('express');
const router = express.Router();
const { authenticateToken, requirePaymentAccess, userCanAccessRestaurant } = require('../middleware/auth');
const { TerminalTransaction } = require('../models');
const { Op } = require('sequelize');
const svc = require('../services/terminalPayments');
const { logActivity } = require('../utils/activityLogger');

router.use(authenticateToken, requirePaymentAccess);

const send = (res, e, where) => {
  if (e && e.status) return res.status(e.status).json({ success: false, code: e.code, message: e.message });
  console.error(`terminal-payments ${where} error:`, e);
  return res.status(500).json({ success: false, message: 'Internal server error' });
};

async function restaurantFrom(req, raw) {
  const rid = parseInt(raw, 10);
  if (!Number.isFinite(rid)) return { status: 400, message: 'restaurant_id is required' };
  if (!(await userCanAccessRestaurant(req.user, rid))) return { status: 403, message: 'Forbidden' };
  return { rid };
}

/** :id 거래를 읽고 매장 접근을 확인한다. 남의 매장 거래는 존재 여부도 알려주지 않는다(404). */
async function loadTxn(req, res) {
  const id = parseInt(req.params.id, 10);
  const row = Number.isFinite(id) ? await TerminalTransaction.findByPk(id) : null;
  if (!row || !(await userCanAccessRestaurant(req.user, row.restaurant_id))) {
    res.status(404).json({ success: false, message: 'Transaction not found' });
    return null;
  }
  return row;
}

router.get('/config', async (req, res) => {
  try {
    const r = await restaurantFrom(req, req.query.restaurant_id);
    if (!r.rid) return res.status(r.status).json({ success: false, message: r.message });
    const cfg = await svc.terminalConfig(r.rid);
    res.json({ success: true, data: { enabled: cfg.enabled, provider: cfg.provider, transport: cfg.transport } });
  } catch (e) { send(res, e, 'GET /config'); }
});

router.post('/transactions', async (req, res) => {
  try {
    const { restaurant_id, order_id, amount, cashier_name, device_label } = req.body || {};
    const r = await restaurantFrom(req, restaurant_id);
    if (!r.rid) return res.status(r.status).json({ success: false, message: r.message });
    const oid = order_id != null && order_id !== '' ? parseInt(order_id, 10) : null;
    if (order_id != null && order_id !== '' && !Number.isFinite(oid)) return res.status(400).json({ success: false, message: 'Invalid order_id' });
    const data = await svc.createSale({ restaurantId: r.rid, orderId: oid, amount, user: req.user, cashierName: cashier_name, deviceLabel: device_label });
    res.status(201).json({ success: true, data });
  } catch (e) { send(res, e, 'POST /transactions'); }
});

router.post('/transactions/:id/response', async (req, res) => {
  try {
    const row = await loadTxn(req, res); if (!row) return;
    const { response_hex, error } = req.body || {};
    if (!response_hex && !error) return res.status(400).json({ success: false, message: 'response_hex or error is required' });
    const out = await svc.applyResponse(row, { response_hex, error });
    res.json({ success: true, data: { ...svc.publicRow(out.row), parent: out.parent ? svc.publicRow(out.parent) : null, link_error: out.linkError || null }, ...(out.deduped ? { deduped: true } : {}) });
  } catch (e) { send(res, e, 'POST /response'); }
});

router.post('/transactions/:id/recover', async (req, res) => {
  try {
    const row = await loadTxn(req, res); if (!row) return;
    res.status(201).json({ success: true, data: await svc.recover(row) });
  } catch (e) { send(res, e, 'POST /recover'); }
});

router.post('/transactions/:id/check-status', async (req, res) => {
  try {
    const row = await loadTxn(req, res); if (!row) return;
    res.status(201).json({ success: true, data: await svc.checkStatus(row) });
  } catch (e) { send(res, e, 'POST /check-status'); }
});

router.post('/transactions/:id/link', async (req, res) => {
  try {
    const row = await loadTxn(req, res); if (!row) return;
    const oid = parseInt(req.body?.order_id, 10);
    if (!Number.isFinite(oid)) return res.status(400).json({ success: false, message: 'order_id is required' });
    const out = await svc.link(row, oid);
    res.json({ success: true, data: svc.publicRow(out) });
  } catch (e) { send(res, e, 'POST /link'); }
});

router.post('/transactions/:id/manual', async (req, res) => {
  try {
    const row = await loadTxn(req, res); if (!row) return;
    const out = await svc.markManual(row, req.body?.note);
    await logActivity(req, {
      action_type: 'update', entity_type: 'terminal_manual_override', entity_id: out.id, restaurant_id: out.restaurant_id,
      entity_name: `Card ${out.amount} (${out.ecr_invoice_no})`,
      changes: { status: 'manual', note: out.manual_note },
      description: `Card terminal result recorded manually — ${out.manual_note}`,
    });
    res.json({ success: true, data: svc.publicRow(out) });
  } catch (e) { send(res, e, 'POST /manual'); }
});

router.post('/echo', async (req, res) => {
  try {
    const r = await restaurantFrom(req, req.body?.restaurant_id);
    if (!r.rid) return res.status(r.status).json({ success: false, message: r.message });
    res.status(201).json({ success: true, data: await svc.createEcho({ restaurantId: r.rid, user: req.user }) });
  } catch (e) { send(res, e, 'POST /echo'); }
});

router.post('/config/host', async (req, res) => {
  try {
    const r = await restaurantFrom(req, req.body?.restaurant_id);
    if (!r.rid) return res.status(r.status).json({ success: false, message: r.message });
    const out = await svc.saveDiscoveredHost(r.rid, req.body?.host);
    if (out.changed) {
      await logActivity(req, {
        action_type: 'update', entity_type: 'settings', entity_id: r.rid, restaurant_id: r.rid,
        entity_name: 'Card terminal address', changes: { host: { before: out.previous, after: out.host } },
        description: `Card terminal found at ${out.host} (was ${out.previous || 'empty'})`,
      });
    }
    res.json({ success: true, data: out });
  } catch (e) { send(res, e, 'POST /config/host'); }
});

router.get('/transactions', async (req, res) => {
  try {
    const r = await restaurantFrom(req, req.query.restaurant_id);
    if (!r.rid) return res.status(r.status).json({ success: false, message: r.message });
    const where = { restaurant_id: r.rid, command: { [Op.ne]: 'echo' } };
    if (req.query.status) where.status = String(req.query.status).split(',');
    if (req.query.from || req.query.to) {
      where.created_at = {};
      if (req.query.from) where.created_at[Op.gte] = new Date(req.query.from);
      if (req.query.to) where.created_at[Op.lte] = new Date(req.query.to);
    }
    const rows = await TerminalTransaction.findAll({ where, order: [['id', 'DESC']], limit: Math.min(parseInt(req.query.limit, 10) || 200, 500) });
    res.json({ success: true, data: rows.map(svc.publicRow) });
  } catch (e) { send(res, e, 'GET /transactions'); }
});

module.exports = router;

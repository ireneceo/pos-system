/**
 * 카드단말기 ECR 연동 API — /api/terminal (Fable 설계 .claude/fable-design-20261001-ghl-ecr.md §3-2).
 *
 * 흐름: 계산대가 거래를 만들면 서버가 단말기 요청 hex 를 준다 → 계산대 앱 브릿지(window.__NATIVE_ECR)가
 *       단말기에 운반 → 받은 응답 hex 를 그대로 /response 로 올린다 → 서버가 해석·검증·기록.
 * 상태 전이는 services/terminalPayments.js 한 곳. 여기서는 권한·입력 확인만 한다.
 * 권한: 로그인 + 결제 권한(access_payment) + 그 매장 접근. restaurant_id 는 접근 판정을 거친 뒤에만 쓴다.
 *
 * 키오스크(등록된 매장 태블릿, req.kioskDevice — server.js 가 X-Kiosk-Token 으로 싣는다 · Fable 판정 2026-10-07 D5·D6):
 *   손님이 키오스크 자리에서 카드를 대는 데 필요한 5개만 — 설정 확인 · 판매 시작(키오스크 주문 필수) · 응답 올리기 ·
 *   복구(Reprint) · 상태조회. 수동 기록·Void·연결·찾기·주소 저장·목록은 직원 판단이라 403.
 *   자기 매장·자기 기기가 만든 거래만 다룬다(남의 것은 404).
 */
const express = require('express');
const router = express.Router();
const { authenticateToken, requirePaymentAccess, userCanAccessRestaurant } = require('../middleware/auth');
const { TerminalTransaction } = require('../models');
const { Op } = require('sequelize');
const { Order } = require('../models');
const svc = require('../services/terminalPayments');
const { logActivity } = require('../utils/activityLogger');

const KIOSK_ALLOWED = [
  ['GET', /^\/config$/], ['POST', /^\/transactions$/], ['POST', /^\/transactions\/\d+\/(response|recover|check-status)$/],
];
router.use((req, res, next) => {
  if (req.kioskDevice) {
    const ok = KIOSK_ALLOWED.some(([m, re]) => m === req.method && re.test(req.path));
    if (!ok) return res.status(403).json({ success: false, code: 'KIOSK_FORBIDDEN', message: 'Not available on a kiosk' });
    return next();
  }
  return authenticateToken(req, res, () => requirePaymentAccess(req, res, next));
});

const send = (res, e, where) => {
  if (e && e.status) return res.status(e.status).json({ success: false, code: e.code, message: e.message, ...(e.extra ? { data: e.extra } : {}) });
  console.error(`terminal-payments ${where} error:`, e);
  return res.status(500).json({ success: false, message: 'Internal server error' });
};

async function restaurantFrom(req, raw) {
  const rid = parseInt(raw, 10);
  if (!Number.isFinite(rid)) return { status: 400, message: 'restaurant_id is required' };
  if (req.kioskDevice) {
    if (Number(req.kioskDevice.restaurant_id) !== rid) return { status: 403, message: 'Forbidden' };
    return { rid };
  }
  if (!(await userCanAccessRestaurant(req.user, rid))) return { status: 403, message: 'Forbidden' };
  return { rid };
}

/** :id 거래를 읽고 매장 접근을 확인한다. 남의 매장 거래는 존재 여부도 알려주지 않는다(404). */
async function loadTxn(req, res) {
  const id = parseInt(req.params.id, 10);
  const row = Number.isFinite(id) ? await TerminalTransaction.findByPk(id) : null;
  const allowed = row && (req.kioskDevice
    ? Number(row.restaurant_id) === Number(req.kioskDevice.restaurant_id) && svc.isKioskTxnOf(row, req.kioskDevice)
    : await userCanAccessRestaurant(req.user, row.restaurant_id));
  if (!allowed) {
    res.status(404).json({ success: false, message: 'Transaction not found' });
    return null;
  }
  return row;
}

router.get('/config', async (req, res) => {
  try {
    const r = await restaurantFrom(req, req.query.restaurant_id);
    if (!r.rid) return res.status(r.status).json({ success: false, message: r.message });
    const cfg = await svc.terminalConfig(r.rid, req.kioskDevice || null);
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
    if (req.kioskDevice) {
      // 키오스크는 «자기 키오스크 주문» 의 남은 금액만 긁는다 — 주문 없는 판매·POS 주문 결제는 못 한다
      if (!oid) return res.status(400).json({ success: false, code: 'ORDER_REQUIRED', message: 'order_id is required on a kiosk' });
      const order = await Order.findByPk(oid, { attributes: ['id', 'restaurant_id', 'source'] });
      if (!order || Number(order.restaurant_id) !== r.rid || order.source !== 'kiosk') {
        return res.status(404).json({ success: false, message: 'Order not found' });
      }
      const data = await svc.createSale({ restaurantId: r.rid, orderId: oid, amount, user: null, cashierName: 'Kiosk', deviceLabel: svc.kioskLabel(req.kioskDevice), device: req.kioskDevice });
      return res.status(201).json({ success: true, data });
    }
    const data = await svc.createSale({ restaurantId: r.rid, orderId: oid, amount, user: req.user, cashierName: cashier_name, deviceLabel: device_label });
    res.status(201).json({ success: true, data });
  } catch (e) { send(res, e, 'POST /transactions'); }
});

router.post('/transactions/:id/response', async (req, res) => {
  try {
    const row = await loadTxn(req, res); if (!row) return;
    const { response_hex, error, raw_hex } = req.body || {};
    if (!response_hex && !error) return res.status(400).json({ success: false, message: 'response_hex or error is required' });
    const out = await svc.applyResponse(row, { response_hex, error, raw_hex });
    res.json({ success: true, data: { ...svc.publicRow(out.row), parent: out.parent ? svc.publicRow(out.parent) : null, link_error: out.linkError || null }, ...(out.deduped ? { deduped: true } : {}) });
  } catch (e) { send(res, e, 'POST /response'); }
});

router.post('/transactions/:id/recover', async (req, res) => {
  try {
    const row = await loadTxn(req, res); if (!row) return;
    res.status(201).json({ success: true, data: await svc.recover(row, req.kioskDevice || null) });
  } catch (e) { send(res, e, 'POST /recover'); }
});

// 단말기 카드 결제 취소(Void A2) — 주문 취소 흐름·결제창 «이 결제 취소» 가 부른다(Fable 설계 2026-10-04 §3)
router.post('/transactions/:id/void', async (req, res) => {
  try {
    const row = await loadTxn(req, res); if (!row) return;
    const out = await svc.createVoid(row, { user: req.user, voidPin: req.body?.void_pin });
    await logActivity(req, {
      action_type: 'update', entity_type: 'terminal_void', entity_id: row.id, restaurant_id: row.restaurant_id,
      entity_name: `Card ${row.amount} (${row.ecr_invoice_no})`,
      changes: { parent_id: row.id, counted: out.counted, approver: out.approver, order_id: row.order_id },
      description: `Card terminal void sent for ${row.ecr_invoice_no}${out.approver ? ` — approved by ${out.approver.name}` : ''}`,
    });
    res.status(201).json({ success: true, data: out.data });
  } catch (e) { send(res, e, 'POST /void'); }
});

router.post('/transactions/:id/check-status', async (req, res) => {
  try {
    const row = await loadTxn(req, res); if (!row) return;
    res.status(201).json({ success: true, data: await svc.checkStatus(row, req.kioskDevice || null) });
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
    const out = await svc.markManual(row, req.body?.note, { method: req.body?.tender_method, card_type: req.body?.card_type, ewallet_type: req.body?.ewallet_type });
    await logActivity(req, {
      action_type: 'update', entity_type: 'terminal_manual_override', entity_id: out.id, restaurant_id: out.restaurant_id,
      entity_name: `Card ${out.amount} (${out.ecr_invoice_no})`,
      changes: { status: 'manual', note: out.manual_note, tender_method: out.tender_method, card_type: out.card_type, ewallet_type: out.ewallet_type },
      description: `Card terminal result recorded manually — ${out.manual_note}`,
    });
    res.json({ success: true, data: { ...svc.publicRow(out), link_error: out.linkError || null } });
  } catch (e) { send(res, e, 'POST /manual'); }
});

router.post('/echo', async (req, res) => {
  try {
    const r = await restaurantFrom(req, req.body?.restaurant_id);
    if (!r.rid) return res.status(r.status).json({ success: false, message: r.message });
    res.status(201).json({ success: true, data: await svc.createEcho({ restaurantId: r.rid, user: req.user, probe: req.body?.probe === true }) });
  } catch (e) { send(res, e, 'POST /echo'); }
});

// 자동 찾기 실측 기록 — 판정에 안 쓰는 기록 전용(2026-10-04 Irene 「자동잡히는 문제를 해결하라」)
router.post('/discovery-report', async (req, res) => {
  try {
    const r = await restaurantFrom(req, req.body?.restaurant_id);
    if (!r.rid) return res.status(r.status).json({ success: false, message: r.message });
    const summary = svc.summarizeDiscovery(req.body);
    await logActivity(req, {
      // activity_logs.action_type ENUM 은 create/update/delete 뿐 — 검색 기록 1건 «생성» 으로 남긴다
      action_type: 'create', entity_type: 'settings', entity_id: r.rid, restaurant_id: r.rid,
      entity_name: 'Card terminal discovery', changes: summary,
      description: `Card terminal search: scanned ${summary.scanned ?? '?'} · found ${summary.hosts.join(', ') || 'none'} · answered ${summary.probed.length}`,
    });
    res.json({ success: true, data: summary });
  } catch (e) { send(res, e, 'POST /discovery-report'); }
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
    if (req.query.order_id) {
      const oid = parseInt(req.query.order_id, 10);
      if (!Number.isFinite(oid)) return res.status(400).json({ success: false, message: 'Invalid order_id' });
      where.order_id = oid;
    }
    if (req.query.command) where.command = String(req.query.command);
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

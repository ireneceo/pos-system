/**
 * Print Visibility & Diagnostics — 인쇄 가시성/진단 엔드포인트.
 *
 * 설계: docs/PRINT_VISIBILITY_DIAGNOSTICS.md
 *
 * 성격: 순수 신규·additive. 인쇄 동작(billPrint/poller)·orders-crud 생명선 블록은
 *   무접촉. 여기서는 (1) 클라가 보낸 인쇄 사유 로그를 적재(POST /),
 *   (2) 미인쇄 주문 + 사유를 표시용으로 반환(GET /restaurant/:id/status),
 *   (3) 사유 집계를 진단 화면에 반환(GET /restaurant/:id/summary) 만 한다.
 *
 *  - POST   /api/print-events                       클라 인쇄 이벤트 1건 기록
 *  - GET    /api/print-events/restaurant/:id/status 미인쇄 주문 + 사유(KDS/플로어플랜 폴링)
 *  - GET    /api/print-events/restaurant/:id/summary 사유별 집계(진단 화면)
 */
const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { authenticateToken } = require('../middleware/auth');
const PrintEvent = require('../models/PrintEvent');
const Order = require('../models/Order');

// orders-crud STALE_CLAIM_SEC 와 동일 — 죽은 claim 복구 대기 시간.
const STALE_CLAIM_SEC = 10;

const VALID_OUTCOMES = ['success', 'failed', 'skipped', 'fallback'];

// 미인쇄가 "정말 안 나간 것"으로 알릴 최소 경과(초). 정상 인쇄(~5초)에 false-alarm
// 안 나게 충분히 길게. ?staleSec= 로 조정 가능.
const DEFAULT_STALE_SEC = 45;

function parseItems(raw) {
  if (Array.isArray(raw)) return raw;
  if (typeof raw === 'string') { try { return JSON.parse(raw); } catch { return []; } }
  return [];
}

function ensureRestaurant(req, restaurantId) {
  return req.user.role === 'System Admin' || parseInt(req.user.restaurant_id) === restaurantId;
}

// ─── POST / — 클라 인쇄 이벤트 기록 ──────────────────────────────────
// 인쇄 전담 기기(poller)가 사유 분기를 탈 때 1건 append. 실패해도 인쇄엔 영향 없음.
router.post('/', authenticateToken, async (req, res) => {
  try {
    const restaurantId = parseInt(req.user.restaurant_id, 10);
    if (!restaurantId) return res.status(400).json({ success: false, message: 'No restaurant context' });

    const b = req.body || {};
    const outcome = String(b.outcome || '').toLowerCase();
    if (!VALID_OUTCOMES.includes(outcome)) {
      return res.status(400).json({ success: false, message: 'Invalid outcome' });
    }

    const ev = await PrintEvent.create({
      restaurant_id: restaurantId,
      order_id: b.order_id ? parseInt(b.order_id, 10) : null,
      order_number: b.order_number ? String(b.order_number).slice(0, 64) : null,
      station_id: b.station_id ? parseInt(b.station_id, 10) : null,
      station_name: b.station_name ? String(b.station_name).slice(0, 120) : null,
      outcome,
      reason_code: b.reason_code ? String(b.reason_code).slice(0, 48) : null,
      reason_detail: b.reason_detail ? String(b.reason_detail).slice(0, 2000) : null,
      intended_printer: b.intended_printer ? String(b.intended_printer).slice(0, 160) : null,
      actual_printer: b.actual_printer ? String(b.actual_printer).slice(0, 160) : null,
      workstation_id: b.workstation_id ? String(b.workstation_id).slice(0, 64) : null
    });
    res.json({ success: true, data: { id: ev.id } });
  } catch (e) {
    console.error('[print-events POST] error:', e.message);
    res.status(500).json({ success: false, message: e.message });
  }
});

// ─── GET /restaurant/:id/status — 미인쇄 주문 + 사유 (표시 전용) ───────
// needs_print=true 인데 staleSec 넘게 안 나간 주문 = "정말 안 됨". 각 주문에
// 최근 print_event 사유를 머지(없으면 서버추론 no_device). 가짜초록(fallback)도 함께.
router.get('/restaurant/:id/status', authenticateToken, async (req, res) => {
  try {
    const restaurantId = parseInt(req.params.id, 10);
    if (!restaurantId) return res.status(400).json({ success: false, message: 'restaurantId required' });
    if (!ensureRestaurant(req, restaurantId)) return res.status(403).json({ success: false, message: 'Access denied' });

    const staleSec = Math.min(Math.max(parseInt(req.query.staleSec || DEFAULT_STALE_SEC, 10) || DEFAULT_STALE_SEC, 10), 600);
    const cutoff = new Date(Date.now() - staleSec * 1000);

    // 미인쇄 = needs_print, 삭제 안 됨, staleSec 보다 오래됨(정상 인쇄 대기 제외).
    const orders = await Order.findAll({
      where: {
        restaurant_id: restaurantId,
        is_deleted: false,
        needs_print: true,
        createdAt: { [Op.lt]: cutoff }
      },
      order: [['createdAt', 'ASC']],
      limit: 50
    });

    // 최근 사유 이벤트(이 주문들 + 최근 fallback). order_id → 최근 이벤트.
    const orderIds = orders.map(o => o.id);
    const recentEvents = await PrintEvent.findAll({
      where: {
        restaurant_id: restaurantId,
        created_at: { [Op.gt]: new Date(Date.now() - 30 * 60 * 1000) },
        [Op.or]: [
          orderIds.length ? { order_id: { [Op.in]: orderIds } } : null,
          { outcome: 'fallback' }
        ].filter(Boolean)
      },
      order: [['created_at', 'DESC']],
      limit: 300
    });
    const latestByOrder = new Map();
    for (const ev of recentEvents) {
      if (ev.order_id != null && !latestByOrder.has(ev.order_id)) latestByOrder.set(ev.order_id, ev);
    }

    const REASON_TEXT = {
      master_off: 'Auto-print is OFF — turn it on or print manually',
      no_device: 'No print device picked it up — check the printing POS is on/online',
      qz_error: 'Printer did not respond — check connection / paper',
      dead_claim: 'A device claimed it but failed — retrying',
      backlog: 'Order from before auto-print was on — print manually',
      printer_unreachable_fallback: 'Printed to a DIFFERENT printer (intended station unreachable)'
    };

    const unprinted = orders.map(o => {
      const ord = o.toJSON();
      const items = parseItems(ord.order_items).filter(it => !it.printed_at && !it.printed);
      const ev = latestByOrder.get(ord.id);
      let reasonCode = ev && ev.reason_code ? ev.reason_code : 'no_device';
      // claim 흔적이 stale 하게 남아있으면 죽은 claim
      if (!ev && ord.print_claimed_at) {
        const claimAgeSec = (Date.now() - new Date(ord.print_claimed_at).getTime()) / 1000;
        if (claimAgeSec > STALE_CLAIM_SEC) reasonCode = 'dead_claim';
      }
      const stationIds = [...new Set(items.map(it => it.kitchen_station_id).filter(Boolean))];
      return {
        orderId: ord.id,
        orderNumber: ord.order_number,
        tableNumber: ord.table_number || null,
        ageSec: Math.round((Date.now() - new Date(ord.createdAt).getTime()) / 1000),
        reasonCode,
        reasonText: REASON_TEXT[reasonCode] || 'Not printed',
        stationIds,
        items: items.slice(0, 12).map(it => ({
          name: it.menu_item_name || it.name || (it.menuItem && it.menuItem.name) || 'Item',
          quantity: it.quantity || 1,
          stationId: it.kitchen_station_id || null
        }))
      };
    });

    // 가짜초록: 최근 fallback 이벤트(이미 printed_at 찍혔지만 다른 프린터로 나간 것).
    const fallbacks = recentEvents
      .filter(ev => ev.outcome === 'fallback')
      .slice(0, 20)
      .map(ev => ({
        orderId: ev.order_id,
        orderNumber: ev.order_number,
        stationName: ev.station_name,
        intended: ev.intended_printer,
        actual: ev.actual_printer,
        reasonText: REASON_TEXT.printer_unreachable_fallback,
        at: ev.created_at
      }));

    res.json({ success: true, data: { unprinted, fallbacks, staleSec } });
  } catch (e) {
    console.error('[print-events status] error:', e.message);
    res.status(500).json({ success: false, message: e.message });
  }
});

// ─── GET /restaurant/:id/summary — 사유별 집계 (진단 화면) ─────────────
router.get('/restaurant/:id/summary', authenticateToken, async (req, res) => {
  try {
    const restaurantId = parseInt(req.params.id, 10);
    if (!restaurantId) return res.status(400).json({ success: false, message: 'restaurantId required' });
    if (!ensureRestaurant(req, restaurantId)) return res.status(403).json({ success: false, message: 'Access denied' });

    const days = Math.min(Math.max(parseInt(req.query.days || 7, 10) || 7, 1), 90);
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    const events = await PrintEvent.findAll({
      where: { restaurant_id: restaurantId, created_at: { [Op.gt]: since } },
      attributes: ['outcome', 'reason_code', 'station_name', 'intended_printer', 'created_at'],
      order: [['created_at', 'DESC']],
      limit: 5000
    });

    const byReason = {};
    const byOutcome = {};
    const byStation = {};
    for (const ev of events) {
      const rc = ev.reason_code || ev.outcome;
      byReason[rc] = (byReason[rc] || 0) + 1;
      byOutcome[ev.outcome] = (byOutcome[ev.outcome] || 0) + 1;
      if (ev.station_name) byStation[ev.station_name] = (byStation[ev.station_name] || 0) + 1;
    }

    res.json({
      success: true,
      data: {
        days,
        total: events.length,
        byReason,
        byOutcome,
        byStation,
        recent: events.slice(0, 50).map(ev => ({
          outcome: ev.outcome,
          reasonCode: ev.reason_code,
          stationName: ev.station_name,
          intended: ev.intended_printer,
          at: ev.created_at
        }))
      }
    });
  } catch (e) {
    console.error('[print-events summary] error:', e.message);
    res.status(500).json({ success: false, message: e.message });
  }
});

module.exports = router;

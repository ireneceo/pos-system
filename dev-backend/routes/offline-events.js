/**
 * 기기 오프라인 판정 기록 받기 — docs/OFFLINE_MODE_DESIGN.md §16-5.
 * 기기(OfflineContext)가 오프라인 → 복구 뒤 «왜·언제» 를 올린다. system_logs(service='offline-detect', warning)에 한 건씩.
 * 인증: server.js 마운트에서 offlineEventsLimiter + authenticateToken. 매장 데이터에 닿지 않아 checkRestaurantAccess 없음
 * (storeId 는 기기가 주장한 값 — details 에만 적는다). 읽기는 System Admin 전용 /api/system-logs.
 */
const express = require('express');
const router = express.Router();
const SystemLog = require('../models/SystemLog');
const systemLogger = require('../utils/systemLogger');
const { clientIp } = require('../utils/clientIp');

const SERVICE = 'offline-detect';
const MAX_EVENTS = 20;
const MAX_PROBES = 3;
const MAX_EVENT_BYTES = 3000;
const TRIGGERS = ['probe', 'navigator_offline', 'offline_event'];
const RECOVERED_BY = ['ping', 'reload'];
const PROBE_KINDS = ['timeout', 'http', 'network'];
const VISIBILITY = ['visible', 'hidden'];

const str = (v, max = 300) => (typeof v === 'string' ? v.slice(0, max) : undefined);
const num = (v) => (typeof v === 'number' && Number.isFinite(v) ? v : undefined);
const bool = (v) => (typeof v === 'boolean' ? v : undefined);
const pick = (v, list) => (list.includes(v) ? v : undefined);

// 화이트리스트 키만 골라 담는다(미지 키는 버림). 필수 키가 없으면 null.
function sanitizeEvent(raw) {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;
  const ev = {
    id: str(raw.id, 100),
    startedAt: str(raw.startedAt, 40),
    recoveredAt: str(raw.recoveredAt, 40),
    durationMs: num(raw.durationMs),
    recoveredBy: pick(raw.recoveredBy, RECOVERED_BY),
    trigger: pick(raw.trigger, TRIGGERS),
    probes: [],
    navigatorOnLine: bool(raw.navigatorOnLine),
    path: str(raw.path, 120),
    mainPos: bool(raw.mainPos),
    swVersion: str(raw.swVersion, 60) ?? null,
    ua: str(raw.ua, 200),
    storeId: num(raw.storeId),
    // 회선·화면 사정(§16-3 보완) — 전부 선택
    sinceLoadMs: num(raw.sinceLoadMs),
    visibility: pick(raw.visibility, VISIBILITY),
    conn: undefined,
    tz: str(raw.tz, 40),
    role: str(raw.role, 40),
    slowRes: undefined,
  };
  if (raw.conn && typeof raw.conn === 'object' && !Array.isArray(raw.conn)) {
    ev.conn = { type: str(raw.conn.type, 20), rtt: num(raw.conn.rtt), downlink: num(raw.conn.downlink) };
  }
  if (raw.slowRes && typeof raw.slowRes === 'object' && !Array.isArray(raw.slowRes)) {
    ev.slowRes = { n: num(raw.slowRes.n), maxMs: num(raw.slowRes.maxMs), maxName: str(raw.slowRes.maxName, 80) };
  }
  if (!ev.id || !ev.startedAt || !ev.trigger) return null;
  if (Array.isArray(raw.probes)) {
    for (const p of raw.probes.slice(0, MAX_PROBES)) {
      if (!p || typeof p !== 'object') continue;
      const kind = pick(p.kind, PROBE_KINDS);
      if (!kind) continue;
      ev.probes.push({
        at: str(p.at, 40),
        kind,
        status: num(p.status),
        ms: num(p.ms),
        retryAfter: str(p.retryAfter, 40),
        rlRemaining: str(p.rlRemaining, 40),
      });
    }
  }
  if (JSON.stringify(ev).length > MAX_EVENT_BYTES) return null;
  return ev;
}

router.post('/', async (req, res) => {
  try {
    const events = req.body && req.body.events;
    if (!Array.isArray(events) || events.length === 0 || events.length > MAX_EVENTS) {
      return res.status(400).json({ success: false, message: `events must be an array of 1-${MAX_EVENTS}` });
    }
    let accepted = 0;
    let skipped = 0;
    let rejected = 0;
    for (const raw of events) {
      const ev = sanitizeEvent(raw);
      if (!ev) { rejected += 1; continue; }
      // 응답이 유실돼 기기가 다시 보낸 건 — 한 번만 남긴다.
      const dup = await SystemLog.findOne({ where: { service: SERVICE, request_id: ev.id }, attributes: ['id'] });
      if (dup) { skipped += 1; continue; }
      const first = ev.probes[0];
      const message = `Device offline ${Math.round((ev.durationMs || 0) / 1000)}s · trigger=${ev.trigger} · first=${first ? first.kind : '-'}${first && first.status ? '/' + first.status : ''} · ${ev.mainPos ? 'main' : 'sub'} · ${ev.path || '-'}`;
      // warning — error 면 시간당 알림 메일이 나간다(외부 발송은 범위 밖).
      await systemLogger.warn('system', SERVICE, message, { ...ev, receivedAt: new Date().toISOString() }, {
        userId: req.user && req.user.id,
        userName: req.user && (req.user.name || req.user.email),
        ipAddress: clientIp(req),
        userAgent: ev.ua,
        requestId: ev.id,
        duration: ev.durationMs != null ? Math.round(ev.durationMs) : null,
        statusCode: first && first.status,
      });
      accepted += 1;
    }
    if (accepted === 0 && skipped === 0) {
      return res.status(400).json({ success: false, message: 'No valid events', data: { accepted, skipped, rejected } });
    }
    res.json({ success: true, data: { accepted, skipped, rejected } });
  } catch (err) {
    console.error('[offline-events] save failed:', err.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;

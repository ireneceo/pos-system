/**
 * printTraceTee — 앱이 보낸 «인쇄 실패» 보고를 print_events 에도 한 줄 남긴다 (2026-11-13 · 인쇄 지킴이 §2-1).
 *
 * 왜: 앱(billPrint _printTrace · 통합 티켓 _rep)이 POST /api/orders/print-debug 로 결과를 보내지만,
 *   그 라우트(🔒 routes/orders-crud.js)는 텍스트 로그만 남긴다 → print_events 0행 → Print Health·진단 S7 이 «실패 0».
 * 어떻게: server.js 의 pollerObserver 와 같은 «관측만» 방식. 🔒 파일은 한 줄도 안 건드리고, 요청·응답을 바꾸지 않는다.
 *   응답이 끝난 뒤(finish) statusCode 200 · req.user.restaurant_id 있음 · body.ok === false(정확히) 일 때만 fire-and-forget.
 *   ok 가 true·없음(경로 관찰 줄)이면 안 쓴다. 기록 실패는 삼킨다. 매장당 하루 200행 상한(메모리 · 재시작 시 0부터).
 */
const DAILY_CAP = 200;
const counters = new Map(); // `${rid}|${YYYY-MM-DD}` → n

function underCap(rid) {
  const day = new Date().toISOString().slice(0, 10);
  const key = `${rid}|${day}`;
  const n = counters.get(key) || 0;
  if (n >= DAILY_CAP) return false;
  counters.set(key, n + 1);
  if (counters.size > 5000) { for (const k of counters.keys()) { if (!k.endsWith(day)) counters.delete(k); } }
  return true;
}

function buildRow(req) {
  const b = req.body || {};
  const info = typeof b.info === 'string' ? b.info : '';
  const m = info.match(/err=(\S+)/);
  const s = (v, n) => (v === undefined || v === null || v === '' ? null : String(v).slice(0, n));
  return {
    restaurant_id: parseInt(req.user.restaurant_id, 10),
    order_number: s(b.orderNumber || b.orderId, 64),
    outcome: 'failed',
    reason_code: (m ? m[1] : 'client_failed').slice(0, 48),
    reason_detail: `uid=${req.user.id ?? req.user.userId ?? '-'} type=${s(b.type, 40) || '-'} ${info}`.slice(0, 2000),
    intended_printer: s(b.printer, 160),
  };
}

function printTraceTee(req, res, next) {
  try {
    if (req.method === 'POST' && req.path === '/api/orders/print-debug') {
      res.on('finish', () => {
        try {
          if (res.statusCode !== 200) return;
          if (!req.user || !req.user.restaurant_id) return;
          if (!req.body || req.body.ok !== false) return;
          const row = buildRow(req);
          if (!row.restaurant_id || !underCap(row.restaurant_id)) return;
          const { PrintEvent } = require('../models');
          Promise.resolve().then(() => PrintEvent.create(row)).catch((e) => {
            console.warn('[printTraceTee] record failed:', e && e.message);
          });
        } catch (e) { console.warn('[printTraceTee] observe failed:', e && e.message); }
      });
    }
  } catch (_) { /* 관측 실패는 요청에 닿지 않는다 */ }
  next();
}

module.exports = { printTraceTee, buildRow, _counters: counters, DAILY_CAP };

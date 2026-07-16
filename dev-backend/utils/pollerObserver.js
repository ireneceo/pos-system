/**
 * pollerObserver — 자동인쇄 폴러 "생존"의 물증 (인쇄 자가진단 S2).
 *
 * 자동인쇄 담당 기기는 GET /api/orders/restaurant/:id/pending-print 를 5초마다 친다
 * (useAutoPrintPoller / MainLayout _printPollFn). server.js 의 app-level 미들웨어가 이
 * 경로 호출을 관측해 매장별 마지막 폴 시각을 in-memory 로 기록한다.
 *
 * 왜 이렇게: orders-crud.js(🔒 인쇄 보호파일)를 한 줄도 안 건드리고 "이 매장에서 폴링
 * 중"을 안다. 추론이 아니라 실제 요청 관측 = 물증. in-memory 라 서버 재시작 시 리셋되나
 * (5초 폴이라 수 초 내 다시 채워짐) 진단엔 충분. 저장·이력은 print_device_status/print_events.
 *
 * 인쇄 동작 무접촉 — 관측만(요청을 막거나 바꾸지 않음).
 */

// restaurant_id -> { lastSeen: ms, count: 최근 관측 수(간이) }
const seen = new Map();

function record(restaurantId) {
  const rid = Number(restaurantId);
  if (!Number.isFinite(rid)) return;
  const now = Date.now();
  const prev = seen.get(rid);
  seen.set(rid, { lastSeen: now, count: (prev?.count || 0) + 1 });
}

/** 마지막 폴 이후 경과(ms). 관측 없으면 null. */
function sinceLastPoll(restaurantId) {
  const e = seen.get(Number(restaurantId));
  if (!e) return null;
  return Date.now() - e.lastSeen;
}

module.exports = { record, sinceLastPoll };

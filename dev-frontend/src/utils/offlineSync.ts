/**
 * offlineSync — 오프라인 5단계: 복구 시 LocalStore op 로그를 seq 순서대로 서버에 재생.
 *
 * 설계: docs/OFFLINE_MODE_DESIGN.md §4·§8·§9.
 * - 무손실·무중복(구조 보장):
 *   · create = idempotency_key (서버가 기존 멱등: 같은 key→기존 주문 반환. POST /orders).
 *   · 후속 op(add/cancel/pay/stage/move) = opId 멱등(서버 op_id 가드 §15-3) — 재생 = 온라인 요청과
 *     동일 엔드포인트·body(+op_id). serverId 는 create 동기화 매핑 or payload._serverId(서버주문 op).
 * - 순서 보존: create 실패 시 STOP(다음 트리거에서 backoff 재시도). 한 주문 체인 원자 순서.
 * - 단일 실행 락(_syncing): 다중 탭/중복 트리거 방지.
 * - 401(토큰 만료): STOP + 'offline-sync-needs-login' 이벤트(재로그인 후 재생). §9.
 *
 * 인쇄 무관 — 데이터 동기화 계층. billPrint 무접촉.
 */
import {
  getUnsyncedOps, markOpSynced, markOpSyncedKeepError, markOpFailed, getAllOrders, markOrderSynced, getOrder,
  OfflineOp,
} from './offlineStore';
import { absorbLegacyQueue } from './offlineStore';
import { getAuthToken } from './auth';

// 후속 op(비-create) 전송 게이트. 서버 opId 멱등 가드(§8) 적용 완료(add_items·pay 가드,
// set_stage/move_table/cancel_order/cancel_item 은 본질 멱등) → 활성화.
const SYNC_NONCREATE_ENABLED = true;

let _syncing = false;
let _lastResult: { synced: number; remaining: number; stopped?: string } = { synced: 0, remaining: 0 };

function authHeaders(): Record<string, string> {
  const t = getAuthToken();
  return { 'Content-Type': 'application/json', ...(t ? { Authorization: `Bearer ${t}` } : {}) };
}

interface Req { method: string; url: string; body?: any; }

// op → 서버 엔드포인트. serverId 는 create 동기화 후 매핑된 값.
function endpointFor(op: OfflineOp, serverId: number | undefined): Req | null {
  switch (op.type) {
    case 'create':
      return { method: 'POST', url: '/api/orders', body: op.payload };
    case 'add_items':
      return serverId ? { method: 'POST', url: `/api/orders/${serverId}/add-items`, body: { ...op.payload, op_id: op.opId } } : null;
    case 'pay':
      return serverId ? { method: 'POST', url: `/api/orders/${serverId}/payments`, body: { ...op.payload, op_id: op.opId } } : null;
    case 'set_stage':
      // Backend route is PATCH /:id/status (not PUT). Spread payload so status +
      // kitchen_ready?/served_at? pass through (§15-2). Matched to orders-crud.js:1527.
      return serverId ? { method: 'PATCH', url: `/api/orders/${serverId}/status`, body: { ...op.payload, op_id: op.opId } } : null;
    case 'move_table':
      // Backend route is POST /:id/move-table (not PUT). Matched to
      // routes/orders-crud.js:1119 (2026-07-08 audit).
      return serverId ? { method: 'POST', url: `/api/orders/${serverId}/move-table`, body: { ...op.payload, op_id: op.opId } } : null;
    case 'cancel_order':
      // Cancel replays through the SAME path as an online cancel — PATCH status to
      // 'cancelled' (permission/PIN/cancel-ticket logic identical). DELETE mapping
      // dropped; DELETE /:id is never used by replay (§15-2, 2026-07-08 Fable).
      return serverId ? { method: 'PATCH', url: `/api/orders/${serverId}/status`, body: { status: 'cancelled', ...op.payload, op_id: op.opId } } : null;
    case 'cancel_item':
      // Full-array replace: base_updated_at travels in op.payload so a server-side
      // drift during the outage is caught by the 409 STALE_WRITE guard (§15-2).
      return serverId ? { method: 'PATCH', url: `/api/orders/${serverId}/items`, body: { ...op.payload, op_id: op.opId } } : null;
    default:
      return null;
  }
}

async function buildServerIdMap(): Promise<Map<string, number>> {
  const map = new Map<string, number>();
  try {
    for (const o of await getAllOrders()) if (o.serverId != null) map.set(o.localId, o.serverId);
  } catch { /* ignore */ }
  return map;
}

/**
 * op 로그 재생. 복구 시(OfflineContext) + 앱 진입 시 호출. 단일 실행.
 * @returns { synced, remaining, stopped? }
 */
export async function runSync(): Promise<{ synced: number; remaining: number; stopped?: string }> {
  if (_syncing) return _lastResult;
  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    return { synced: 0, remaining: (await getUnsyncedOps()).length };
  }
  _syncing = true;
  let synced = 0;
  let stopped: string | undefined;
  try {
    // 기존 localStorage 큐(offlineOrderQueue) 흡수 — 단일 소스(op 로그)로. one-time.
    try { await absorbLegacyQueue(); } catch { /* ignore */ }

    const ops = await getUnsyncedOps(); // seq 오름차순
    const serverMap = await buildServerIdMap();

    for (const op of ops) {
      // 비-create 는 서버 opId 가드 전까지 전송 보류(현재 기록되지 않음 — 안전 디폴트).
      if (op.type !== 'create' && !SYNC_NONCREATE_ENABLED) { continue; }

      // §15-1 defect 1: server-order ops are recorded as localOrderId='srv-{id}' with
      // payload._serverId. serverMap only knows locally-created orders, so without the
      // _serverId fallback every server-order op resolved to undefined and permanently
      // wedged the whole replay loop ('awaiting-create' break).
      const serverId = op.type === 'create'
        ? undefined
        : (serverMap.get(op.localOrderId) ?? (Number(op.payload?._serverId) || undefined));
      if (op.type !== 'create' && serverId == null) {
        // 서버주문 op('srv-*')인데 serverId 를 끝내 못 구함 = create 가 채워줄 게 아님(잘못 기록된 ref).
        // 큐 전체를 영원히 막지(wedge) 말고 방어적으로 스킵 + 표면화(Fable edge). P3 호출부는 항상 serverId 전달.
        if (String(op.localOrderId).startsWith('srv-')) {
          await markOpFailed(op.opId, 'unresolved-server-ref');
          await markOpSyncedKeepError(op.opId);
          continue;
        }
        // 로컬 생성 주문인데 그 create 가 아직 동기화 안 됨 → 체인 보류(순서 보존). 다음 트리거에서.
        stopped = 'awaiting-create';
        break;
      }
      const req = endpointFor(op, serverId);
      if (!req) { await markOpSynced(op.opId); continue; } // 매핑 불가 op = 스킵(무해)

      // create: 오프라인에서 로컬 주방인쇄가 됐으면 printed_offline 전달 → 서버가 printed_at 스탬프
      // + needs_print=false → 폴러/자동인쇄 재인쇄 0(6단계 중복방지). 미인쇄(프린터 없었음)면 서버가 정상 인쇄.
      let body = req.body;
      // Never send the internal _serverId reference to the server (it's only a
      // client-side routing hint on server-order ops).
      if (body && typeof body === 'object' && '_serverId' in body) {
        const { _serverId, ...rest } = body as any;
        body = rest;
      }
      if (op.type === 'create') {
        try { const lo = await getOrder(op.localOrderId); if (lo && lo.printedLocally) body = { ...body, printed_offline: true }; } catch { /* ignore */ }
      }

      let res: Response;
      try {
        res = await fetch(req.url, { method: req.method, headers: authHeaders(), credentials: 'include', body: body ? JSON.stringify(body) : undefined });
      } catch {
        stopped = 'network'; break; // 네트워크 실패 → 멈춤(backoff 재시도)
      }

      if (res.status === 401) { // 토큰 만료 → 재로그인 후 재생
        stopped = 'unauthorized';
        try { window.dispatchEvent(new CustomEvent('offline-sync-needs-login')); } catch { /* ignore */ }
        break;
      }
      if (res.ok) {
        const j = await res.json().catch(() => null);
        const data = j && (j.data || j);
        if (op.type === 'create' && data && data.id != null) {
          serverMap.set(op.localOrderId, Number(data.id));
          await markOrderSynced(op.localOrderId, Number(data.id), data.order_number);
        }
        // Server-side conflict during the outage (order already terminal / paid via
        // another channel) → server returns { skipped } instead of applying. The op is
        // resolved (not retried) but its note is PRESERVED for surfacing (§15-6, P4).
        if (j && j.skipped) {
          await markOpSyncedKeepError(op.opId, 'skipped:' + j.skipped);
          try { window.dispatchEvent(new CustomEvent('offline-op-skipped', { detail: { opId: op.opId, reason: j.skipped } })); } catch { /* ignore */ }
        } else {
          await markOpSynced(op.opId);
        }
        synced++;
      } else if (res.status >= 400 && res.status < 500 && res.status !== 408 && res.status !== 429) {
        // 영구 검증 실패(4xx) → 재시도 안 하되(블록 안 함) syncError 를 보존해 표면화(§15-6, Fable —
        // 예전 markOpSynced 가 syncError 를 지워 충돌이 조용히 사라지던 버그 수정).
        await markOpFailed(op.opId, `http_${res.status}`);
        await markOpSyncedKeepError(op.opId);
      } else {
        stopped = `http_${res.status}`; break; // 5xx/408/429 → 멈춤·재시도
      }
    }

    const remaining = (await getUnsyncedOps()).length;
    _lastResult = { synced, remaining, stopped };
    // Replay changed server state → let the optimistic overlay recompute and the
    // shared orders store refetch (§15-4 step 5). Only when something actually synced.
    if (synced > 0) { try { window.dispatchEvent(new CustomEvent('offline-ops-changed')); } catch { /* ignore */ } }
    return _lastResult;
  } finally {
    _syncing = false;
  }
}

let _inited = false;
/** 앱 진입 1회 — online 복귀/주기 재시도에 runSync 등록. OfflineContext 복구도 호출. */
export function initOfflineSync() {
  if (_inited || typeof window === 'undefined') return;
  _inited = true;
  const trigger = () => { runSync().catch(() => {}); };
  window.addEventListener('online', trigger);
  import('./offlineStore').then(({ pruneSyncedOps }) => pruneSyncedOps().catch(() => {})).catch(() => {}); // 하우스키핑 1회
  setTimeout(trigger, 2500);          // 진입 직후(이전 세션 미동기화분)
  setInterval(trigger, 20000);        // 주기 재시도(online 이벤트 놓침 안전망)
}

// dev seam (offlineStore 와 동일 게이트)
try {
  if (typeof window !== 'undefined') {
    const h = (window.location && window.location.hostname) || '';
    if (/^(dev\.|localhost$|127\.|87\.106\.|192\.168\.|10\.)/.test(h)) {
      (window as any).__offlineSync = { runSync };
    }
  }
} catch { /* ignore */ }

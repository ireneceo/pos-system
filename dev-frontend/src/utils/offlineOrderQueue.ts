// #9 오프라인 주문 큐 — 매장/손님 연결이 끊긴 중 생성된 주문을 잃지 않게 localStorage 에 큐잉하고,
// 재연결 시 자동 재전송한다. 서버는 idempotency_key 로 중복생성을 막으므로(같은 key → 기존 주문 반환),
// 원본과 재전송이 겹쳐도 주문은 정확히 1개만 만들어진다(routes/orders-crud.js POST /).
//
// 설계: docs/THEFIRE_REMAINING_WORK_PLAN.md §9 + [[reference_prod_server_resource_constraint]]
// 인쇄 무관 — 주문 생성(POST /api/orders) 안전망일 뿐 billPrint 무접촉.

const QUEUE_KEY = 'offline_order_queue_v1';

export interface QueuedOrder {
  url: string;
  body: any;            // 주문 payload (idempotency_key 포함)
  key: string;          // idempotency_key (큐 식별자)
  at: number;           // 큐 적재 시각(ms)
  authToken?: string | null;
}

// RFC4122 v4 유사 — crypto 가용하면 사용, 아니면 폴백.
export function genIdempotencyKey(): string {
  try {
    if (typeof crypto !== 'undefined' && (crypto as any).randomUUID) return (crypto as any).randomUUID();
  } catch { /* ignore */ }
  return 'oq-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 10) + Math.random().toString(36).slice(2, 6);
}

// payload 에 idempotency_key 보장(없으면 생성). 같은 객체를 그대로 반환.
export function ensureIdempotencyKey(body: any): any {
  if (body && typeof body === 'object' && !body.idempotency_key) {
    body.idempotency_key = genIdempotencyKey();
  }
  return body;
}

export function getQueue(): QueuedOrder[] {
  try {
    const raw = localStorage.getItem(QUEUE_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function saveQueue(q: QueuedOrder[]) {
  try { localStorage.setItem(QUEUE_KEY, JSON.stringify(q.slice(0, 100))); } catch { /* quota */ }
}

export function enqueueOrder(url: string, body: any, authToken?: string | null): string {
  ensureIdempotencyKey(body);
  const q = getQueue();
  // 같은 key 가 이미 큐에 있으면 중복 적재 금지.
  if (!q.some(o => o.key === body.idempotency_key)) {
    q.push({ url, body, key: body.idempotency_key, at: Date.now(), authToken: authToken || null });
    saveQueue(q);
  }
  return body.idempotency_key;
}

export function removeFromQueue(key: string) {
  saveQueue(getQueue().filter(o => o.key !== key));
}

export function queuedCount(): number {
  return getQueue().length;
}

let _flushing = false;

// 큐를 재전송. 성공(2xx) 또는 서버 idempotent 응답이면 큐에서 제거. 네트워크 실패면 남겨둔다.
export async function flushOfflineOrders(): Promise<{ flushed: number; remaining: number }> {
  if (_flushing) return { flushed: 0, remaining: getQueue().length };
  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    return { flushed: 0, remaining: getQueue().length };
  }
  _flushing = true;
  let flushed = 0;
  try {
    for (const item of getQueue()) {
      try {
        const headers: Record<string, string> = { 'Content-Type': 'application/json' };
        if (item.authToken) headers.Authorization = `Bearer ${item.authToken}`;
        const res = await fetch(item.url, { method: 'POST', headers, body: JSON.stringify(item.body) });
        // 2xx = 생성됐거나 idempotent 재생(서버가 기존 주문 반환). 둘 다 큐에서 제거.
        if (res.ok) {
          removeFromQueue(item.key);
          flushed++;
        } else if (res.status >= 400 && res.status < 500 && res.status !== 408 && res.status !== 429) {
          // 4xx(검증 실패 등)는 재시도해도 안 됨 → 큐에서 제거(무한 재시도 방지). 408/429 는 일시적이라 유지.
          removeFromQueue(item.key);
        }
        // 5xx/네트워크 → 유지(다음 flush 재시도)
      } catch {
        // 네트워크 실패 → 유지하고 중단(여전히 오프라인일 가능성).
        break;
      }
    }
  } finally {
    _flushing = false;
  }
  return { flushed, remaining: getQueue().length };
}

// 주문 제출 — 정상 시 서버 응답을 그대로, 네트워크 실패 시 큐잉 후 { queued:true } 반환.
export async function submitOrderResilient(
  url: string,
  body: any,
  authToken?: string | null
): Promise<{ ok: boolean; status: number; data: any; queued: boolean }> {
  ensureIdempotencyKey(body);
  try {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (authToken) headers.Authorization = `Bearer ${authToken}`;
    const res = await fetch(url, { method: 'POST', headers, body: JSON.stringify(body) });
    const data = await res.json().catch(() => ({}));
    return { ok: res.ok, status: res.status, data, queued: false };
  } catch (e) {
    // 네트워크 자체 실패(오프라인/타임아웃) → 큐잉. 같은 key 라 재전송돼도 중복 0.
    enqueueOrder(url, body, authToken);
    return { ok: false, status: 0, data: null, queued: true };
  }
}

let _inited = false;
// 앱 진입 시 1회 호출 — online 복귀/주기적으로 큐 flush.
export function initOfflineOrderFlush() {
  if (_inited || typeof window === 'undefined') return;
  _inited = true;
  const tryFlush = () => { flushOfflineOrders().catch(() => {}); };
  window.addEventListener('online', tryFlush);
  // 진입 직후 + 30초마다 (online 이벤트를 놓친 경우의 안전망).
  setTimeout(tryFlush, 2000);
  setInterval(tryFlush, 30000);
}

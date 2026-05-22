/**
 * Fetch dedupe core — Promise-level + short TTL cache.
 *
 * 문제 — 페이지들의 여러 useEffect 가 진입 직후 같은 endpoint
 * (/api/restaurants/:id, /api/site-settings, /api/store/settings 등) 를 중복
 * 호출한다. POS Terminal mount 측정 결과 16건 중 9건이 중복이었다.
 *
 * 해결 — httpClient (단일 fetch wrap) 안에서 GET 요청에 한해 in-flight Promise
 * 공유 + 짧은 TTL cache. 페이지별 코드 변경 0.
 *
 * 안전성:
 *   - GET 만 (mutation 절대 dedupe X)
 *   - /api/* 만 (정적 파일/외부 URL 영향 X)
 *   - NON_DEDUPED_PATTERNS 매칭 시 skip (라이브 데이터 — 주문/알림 등)
 *   - 4xx/5xx 응답은 cache 안 함 (재시도 가능)
 *
 * 메모리 — TTL 지난 entry 10초 주기 cleanup.
 */

const TTL_MS = 2000;

const inflight = new Map<string, Promise<Response>>();
const cache = new Map<string, { res: Response; expires: number }>();

// 라이브 데이터 — 항상 최신을 받아야 하므로 dedupe 제외.
const NON_DEDUPED_PATTERNS: RegExp[] = [
  /\/orders(?:\?|\b)/,             // 주문 리스트 / 단일 주문 / 주문 polling
  /\/orders\/\d+\/actions/,        // Order audit log
  /\/notifications/,               // 알림
  /\/badge/,                       // badge count
  /\/dashboard/,                   // 실시간 dashboard stats
  /\/inbox/,                       // 메시지
  /\/socket\.io/,                  // websocket
  /\/auth\/me/,                    // 세션 검증
  /_t=\d+/,                        // 명시적 cache-bust
];

export function shouldDedupe(url: string): boolean {
  if (!url.includes('/api/')) return false;
  for (const p of NON_DEDUPED_PATTERNS) {
    if (p.test(url)) return false;
  }
  return true;
}

export function buildDedupeKey(url: string, authHeader: string): string {
  // auth tail 16 자만 — 메모리 절약 + 충돌 가능성 사실상 0.
  return url + '|' + authHeader.slice(-16);
}

/**
 * 같은 key 의 in-flight Promise 또는 TTL cache 가 있으면 fresh Response clone 반환.
 * 없으면 null — 호출자가 실제 fetch 실행.
 */
export function tryReuse(key: string): Promise<Response> | null {
  const pending = inflight.get(key);
  if (pending) return pending.then(r => r.clone());

  const cached = cache.get(key);
  if (cached && cached.expires > Date.now()) {
    return Promise.resolve(cached.res.clone());
  }
  return null;
}

/**
 * fetch 실행 직전 — in-flight 등록. 실패 시 정리.
 */
export function trackInflight(key: string, promise: Promise<Response>): void {
  inflight.set(key, promise);
  promise
    .then(res => {
      if (res.ok) {
        cache.set(key, { res: res.clone(), expires: Date.now() + TTL_MS });
      }
    })
    .catch(() => { /* swallow — handled by caller */ })
    .finally(() => { inflight.delete(key); });
}

// TTL 지난 entry cleanup (1회 등록).
if (typeof window !== 'undefined') {
  const w = window as any;
  if (!w.__purpleFetchDedupeCleanup) {
    w.__purpleFetchDedupeCleanup = setInterval(() => {
      const now = Date.now();
      for (const [k, v] of cache) {
        if (v.expires <= now) cache.delete(k);
      }
    }, 10000);
  }
}

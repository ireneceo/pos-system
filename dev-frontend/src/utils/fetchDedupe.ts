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

/**
 * in-flight 엔트리 — 공유 fetch 1개 + 구독자 참조계수.
 *
 * 2026-08-30: 예전에는 **리더의 signal 이 공유 fetch 에 그대로 실렸다.** 그래서
 * 리더가 abort(언마운트·StrictMode cleanup)하면 공유 fetch 가 죽고,
 * **abort 하지 않은 팔로워 전원이 AbortError** 를 받았다(실측: signal 을 아예
 * 주지 않은 호출자까지 AbortError). 반대로 팔로워의 signal 은 어디에도 안 붙어
 * abort 가 무시됐다.
 *
 * 이제 실제 네트워크 fetch 는 **호출자 signal 이 아니라 controller.signal** 로 나가고,
 * 구독자가 전원 빠졌을 때(active === 0)에만 공유 fetch 를 abort 한다.
 */
type InflightEntry = {
  promise: Promise<Response>;
  controller: AbortController;
  active: number;
};

const inflight = new Map<string, InflightEntry>();
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
  /\/auth\/contexts/,              // 컨텍스트("모자") 목록 — 권한 데이터라 항상 최신이어야 한다.
                                   // 2초 TTL 캐시를 타면 **회수된 모자가 픽커에 남는다**(실측:
                                   // 전환 직후 회수 → 픽커가 캐시된 옛 목록 2건을 그대로 표시).
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

// fetch 네이티브 계약과 같은 형태의 abort 오류.
function makeAbortError(): Error {
  if (typeof DOMException === 'function') {
    return new DOMException('The user aborted a request.', 'AbortError');
  }
  const e = new Error('The user aborted a request.');
  e.name = 'AbortError';
  return e;
}

/**
 * 공유 fetch 의 구독자로 등록한다.
 *
 * - signal 이 없는 구독자는 **영구 구독**(감소 이벤트가 없으므로 공유 fetch 는 절대 abort 되지 않는다).
 * - signal 이 abort 되면 그 구독자만 AbortError 로 reject 하고 참조계수를 줄인다.
 * - 참조계수가 0 이 될 때만 공유 fetch 를 abort 한다.
 */
function subscribe(entry: InflightEntry, callerSignal?: AbortSignal): Promise<Response> {
  if (callerSignal?.aborted) return Promise.reject(makeAbortError());

  entry.active += 1;

  return new Promise<Response>((resolve, reject) => {
    let settled = false;
    let onAbort: (() => void) | null = null;

    const cleanup = () => {
      // 리스너 누수 방지 — settle 시 반드시 제거한다.
      if (onAbort && callerSignal) callerSignal.removeEventListener('abort', onAbort);
      onAbort = null;
    };

    if (callerSignal) {
      onAbort = () => {
        if (settled) return;
        settled = true;
        cleanup();
        entry.active -= 1;
        if (entry.active <= 0) entry.controller.abort();
        reject(makeAbortError());
      };
      callerSignal.addEventListener('abort', onAbort);
    }

    entry.promise.then(
      (res) => {
        if (settled) return;
        settled = true;
        cleanup();
        resolve(res.clone());
      },
      (err) => {
        if (settled) return;
        settled = true;
        cleanup();
        reject(err);
      }
    );
  });
}

/**
 * dedupe 단일 진입점.
 *
 * 같은 key 의 in-flight 공유 fetch 나 TTL 캐시가 있으면 그것을 쓰고, 없으면 `run` 으로
 * 실제 fetch 를 시작한다. **`run` 에는 호출자 signal 이 아니라 공유 controller 의 signal 을 준다.**
 * 반환 Response 는 구독자별 clone 이라 호출부에서 추가 clone 이 필요 없다.
 */
export function dedupedFetch(
  key: string,
  callerSignal: AbortSignal | undefined,
  run: (sharedSignal: AbortSignal) => Promise<Response>
): Promise<Response> {
  const existing = inflight.get(key);
  if (existing) return subscribe(existing, callerSignal);

  const cached = cache.get(key);
  if (cached && cached.expires > Date.now()) {
    // 캐시 히트도 fetch 계약을 지킨다 — 이미 abort 된 signal 이면 응답을 주지 않는다.
    if (callerSignal?.aborted) return Promise.reject(makeAbortError());
    return Promise.resolve(cached.res.clone());
  }

  const controller = new AbortController();
  const promise = run(controller.signal);
  const entry: InflightEntry = { promise, controller, active: 0 };
  inflight.set(key, entry);

  promise
    .then((res) => {
      if (res.ok) {
        cache.set(key, { res: res.clone(), expires: Date.now() + TTL_MS });
      }
    })
    .catch(() => { /* swallow — 구독자별로 전달된다 */ })
    .finally(() => { inflight.delete(key); });

  return subscribe(entry, callerSignal);
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

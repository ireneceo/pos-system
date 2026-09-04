/**
 * Purple POS Service Worker (v3.28+)
 *
 * Responsibilities:
 *  - Receive web push messages and display notifications.
 *  - Handle notification clicks: focus existing tab on same-origin URL, otherwise open new window.
 *  - Maintain App Badging API count (when payload.badge is a number).
 *  - 오프라인 캐싱 (2026-06-28, OFFLINE_MODE_DESIGN §2단계): **network-first + 오프라인일 때만 cache-fallback**.
 *    온라인은 항상 네트워크 우선이라 신선도/stale-chunk 무회귀(기존 철학 유지), 끊겼을 때만 캐시로 셸·메뉴 로드.
 *    캐시는 SW_VERSION 네임스페이스 → 새 배포(install)가 옛 캐시 전체 삭제로 stale-chunk 차단.
 */

const SW_VERSION = '4.79-direct-stock-link-20260904';
const RUNTIME_CACHE = `pos-runtime-${SW_VERSION}`;
// 오프라인에 캐시할 API GET (메뉴/설정/플로어플랜 — 끊겨도 주문화면이 뜨게). 그 외 API 는 캐시 안 함.
const API_CACHE_PATTERNS = [/\/api\/menu(\b|\/|\?)/, /\/api\/mobile\/.*menu/, /\/restaurants\/\d+\/floor-plan/, /\/api\/.*\/operation-settings/, /\/api\/.*\/store/];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    // 2026-05-27: any cache populated by a previous SW version is suspect —
    // it can hand out stale lazy-chunks that don't match the freshly deployed
    // main.js, causing ChunkLoadError. Wipe everything on every SW install.
    try {
      const names = await caches.keys();
      await Promise.all(names.map((n) => caches.delete(n)));
    } catch (_) { /* non-fatal */ }
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    await self.clients.claim();
    // Force every open tab to reload so it picks up the fresh main.js +
    // matching chunks via the network (now that caches are cleared). The guard
    // on the client side (sessionStorage __chunk_reload_done) prevents loops.
    try {
      const wins = await self.clients.matchAll({ type: 'window' });
      for (const w of wins) {
        try { w.navigate(w.url); } catch (_) { /* some browsers disallow cross-origin nav */ }
      }
    } catch (_) { /* non-fatal */ }
  })());
});

// network-first + 오프라인 cache-fallback.
// 온라인: 항상 네트워크 먼저 → 신선도 유지(기존 동작 무회귀, stale-chunk 트랩 회피).
// 성공 응답은 SW_VERSION 캐시에 적재. 네트워크 실패(오프라인)일 때만 캐시로 응답.
async function networkFirst(req, fallbackKey) {
  let cache;
  try { cache = await caches.open(RUNTIME_CACHE); } catch (_) { cache = null; }
  try {
    const res = await fetch(req);
    if (cache && res && res.ok && res.type === 'basic') {
      try { await cache.put(req, res.clone()); } catch (_) { /* quota/opaque */ }
    }
    return res;
  } catch (_) {
    // 오프라인 — 캐시에서 (네비게이션은 캐시된 index '/' 로 폴백 → 앱 셸 부팅).
    if (cache) {
      const hit = await cache.match(req) || (fallbackKey ? await cache.match(fallbackKey) : null);
      if (hit) return hit;
    }
    return Response.error();
  }
}

// 해시된 정적 자산(/static/*.[hash].js|css)은 immutable(내용-해시 파일명) → cache-first(즉시, 네트워크 왕복 0).
// 새 빌드는 새 해시=새 URL 이라 stale 없음(옛 URL=옛 내용 항상 일치). 새 SW_VERSION 활성화 시 옛 캐시 삭제.
// 2026-07-01 (Irene "뒤로가기 느림"): 오프라인 모드 도입 때 정적 자산까지 network-first 로 바꾼 것이
// 매 청크/네비마다 네트워크 왕복을 유발(느린 매장 wifi 에서 체감 큼) → immutable 자산은 cache-first 로 환원.
async function cacheFirst(req) {
  let cache;
  try { cache = await caches.open(RUNTIME_CACHE); } catch (_) { cache = null; }
  if (cache) {
    const hit = await cache.match(req);
    if (hit) return hit;                       // 즉시 응답(네트워크 대기 없음)
  }
  try {
    const res = await fetch(req);
    if (cache && res && res.ok && res.type === 'basic') {
      try { await cache.put(req, res.clone()); } catch (_) { /* quota */ }
    }
    return res;
  } catch (_) {
    if (cache) { const hit = await cache.match(req); if (hit) return hit; }
    return Response.error();
  }
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  let url;
  try { url = new URL(req.url); } catch (_) { return; }
  if (url.origin !== self.location.origin) return;

  const isNav = req.mode === 'navigate' || url.pathname === '/' || url.pathname.endsWith('.html');
  const isStatic = url.pathname.startsWith('/static/');
  const isApiCacheable = url.pathname.startsWith('/api/') && API_CACHE_PATTERNS.some((re) => re.test(url.pathname + url.search));

  if (isNav) {
    // 네비게이션(HTML): network-first — 새 빌드의 새 해시 참조를 항상 받도록(신선도). 오프라인=캐시된 '/'(셸).
    event.respondWith(networkFirst(req, '/'));
  } else if (isStatic) {
    // immutable 해시 자산: cache-first(즉시) → 뒤로가기·라우트 전환 빠름.
    event.respondWith(cacheFirst(req));
  } else if (isApiCacheable) {
    // 캐시가능 API(메뉴·설정): network-first(신선도), 오프라인만 캐시.
    event.respondWith(networkFirst(req));
  }
  // 그 외(쓰기·기타 API)는 가로채지 않음 — 평소대로 네트워크.
});

/**
 * Push event — display OS-level notification.
 * payload schema (server-controlled, see services/pushService.js):
 *   { title, body, category, icon, badge, tag, url, data }
 */
self.addEventListener('push', (event) => {
  let payload = {};
  try {
    payload = event.data ? event.data.json() : {};
  } catch (_) {
    try {
      payload = { title: 'Purple POS', body: event.data ? event.data.text() : '' };
    } catch {
      payload = { title: 'Purple POS', body: '' };
    }
  }

  const title = payload.title || 'Purple POS';
  const options = {
    body: payload.body || '',
    icon: payload.icon || '/logo192.png',
    badge: payload.badge || '/logo192.png',
    tag: payload.tag || payload.category || 'default',
    renotify: true,
    requireInteraction: payload.category === 'kitchen_alert' || payload.category === 'order_new',
    data: {
      url: payload.url || '/',
      category: payload.category,
      ...(payload.data || {})
    }
  };

  const tasks = [self.registration.showNotification(title, options)];

  // Update App Badge count if numeric badge is provided.
  if (typeof payload.badge_count === 'number' && self.navigator && self.navigator.setAppBadge) {
    tasks.push(self.navigator.setAppBadge(payload.badge_count).catch(() => {}));
  }

  event.waitUntil(Promise.all(tasks));
});

/**
 * Notification click — focus existing same-origin tab if found, otherwise open a new window.
 * Cross-origin URLs always open in a new window (defends against open-redirect chains).
 */
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const rawUrl = (event.notification.data && event.notification.data.url) || '/';
  let target;
  try {
    target = new URL(rawUrl, self.location.origin);
  } catch {
    target = new URL('/', self.location.origin);
  }

  const isSameOrigin = target.origin === self.location.origin;

  event.waitUntil((async () => {
    const allClients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });

    if (isSameOrigin) {
      const existing = allClients.find((c) => {
        try { return new URL(c.url).origin === self.location.origin; } catch { return false; }
      });
      if (existing) {
        await existing.focus();
        if ('navigate' in existing) {
          try { await existing.navigate(target.href); } catch {}
        }
        return;
      }
    }
    await self.clients.openWindow(target.href);
  })());
});

self.addEventListener('pushsubscriptionchange', (event) => {
  // Browser refreshed the subscription. Server must re-register from the client side
  // on next visit; we cannot re-subscribe here without VAPID key access.
  // Mark the client to reconcile on next page load.
  event.waitUntil((async () => {
    const clients = await self.clients.matchAll();
    for (const c of clients) c.postMessage({ type: 'pushsubscriptionchange' });
  })());
});

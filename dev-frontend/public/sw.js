/**
 * Purple POS Service Worker (v3.28+)
 *
 * Responsibilities:
 *  - Receive web push messages and display notifications.
 *  - Handle notification clicks: focus existing tab on same-origin URL, otherwise open new window.
 *  - Maintain App Badging API count (when payload.badge is a number).
 *
 * Caching is intentionally NOT done here — POS pages are auth-gated, deferred chunks update via BUILD_ID,
 * caching SPA shell would conflict. If future offline support is needed, layer Workbox separately.
 */

const SW_VERSION = '3.55-print-claim-dedup-20260609';

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

// Network-first fetch for the SPA shell + bundled JS/CSS — Chrome's "stale
// disk cache 404" trap can't bite if we never hit the cache. We don't add
// anything to caches.* here, just let the network handle it.
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  try {
    const url = new URL(req.url);
    if (url.origin !== self.location.origin) return;
    if (url.pathname.startsWith('/static/') || url.pathname === '/' || url.pathname.endsWith('.html')) {
      event.respondWith(fetch(req).catch(() => Response.error()));
    }
  } catch (_) { /* non-fatal */ }
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

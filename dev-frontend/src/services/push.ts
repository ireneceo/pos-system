/**
 * Web Push subscription helper (v3.28+)
 *
 * Responsibilities:
 *  - Register the service worker.
 *  - Fetch VAPID public key from backend.
 *  - Subscribe via PushManager and POST the subscription to /api/push/subscribe.
 *  - Unsubscribe (DELETE /api/push/subscribe).
 *  - Detect permission revocation on focus and silently unsubscribe — improvement
 *    over PlanQ which leaves zombie endpoints when the user toggles permission off
 *    in browser settings.
 */
import { getAuthToken } from '../utils/auth';

const SW_PATH = '/sw.js';

export function isPushSupported(): boolean {
  return (
    typeof window !== 'undefined' &&
    'serviceWorker' in navigator &&
    'PushManager' in window &&
    'Notification' in window
  );
}

export async function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (!isPushSupported()) return null;
  try {
    const reg = await navigator.serviceWorker.register(SW_PATH, { scope: '/' });
    await navigator.serviceWorker.ready;
    return reg;
  } catch (err) {
    console.warn('[Push] SW register failed', err);
    return null;
  }
}

async function getVapidPublicKey(): Promise<string | null> {
  try {
    const r = await fetch('/api/push/vapid-public-key');
    const j = await r.json();
    return j?.data?.publicKey ?? null;
  } catch {
    return null;
  }
}

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const raw = atob(base64);
  const out = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; ++i) out[i] = raw.charCodeAt(i);
  return out;
}

function authHeaders(): HeadersInit {
  const token = getAuthToken();
  return token ? { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } : { 'Content-Type': 'application/json' };
}

export async function subscribeToPush(): Promise<{ ok: boolean; reason?: string }> {
  if (!isPushSupported()) return { ok: false, reason: 'unsupported' };

  const reg = await registerServiceWorker();
  if (!reg) return { ok: false, reason: 'sw_failed' };

  if (Notification.permission === 'denied') return { ok: false, reason: 'denied' };
  if (Notification.permission === 'default') {
    const result = await Notification.requestPermission();
    if (result !== 'granted') return { ok: false, reason: 'denied' };
  }

  const publicKey = await getVapidPublicKey();
  if (!publicKey) return { ok: false, reason: 'vapid_unavailable' };

  let sub = await reg.pushManager.getSubscription();
  if (!sub) {
    try {
      sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey)
      });
    } catch (err) {
      console.warn('[Push] subscribe failed', err);
      return { ok: false, reason: 'subscribe_error' };
    }
  }

  const json = sub.toJSON();
  const r = await fetch('/api/push/subscribe', {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({
      endpoint: json.endpoint,
      keys: json.keys,
      user_agent: navigator.userAgent
    })
  });
  if (!r.ok) return { ok: false, reason: 'server_reject' };
  return { ok: true };
}

export async function unsubscribeFromPush(): Promise<void> {
  if (!isPushSupported()) return;
  const reg = await navigator.serviceWorker.getRegistration();
  if (!reg) return;
  const sub = await reg.pushManager.getSubscription();
  if (!sub) return;
  const json = sub.toJSON();
  await fetch('/api/push/subscribe', {
    method: 'DELETE',
    headers: authHeaders(),
    body: JSON.stringify({ endpoint: json.endpoint })
  }).catch(() => {});
  await sub.unsubscribe().catch(() => {});
}

/**
 * Reconcile state: if the browser permission is revoked, drop server-side subscription.
 * Call from a focus listener so we catch revocations made in browser settings.
 */
export async function reconcilePermissionState(): Promise<void> {
  if (!isPushSupported()) return;
  if (Notification.permission === 'denied') {
    await unsubscribeFromPush();
  }
}

export async function getPreferences() {
  const r = await fetch('/api/push/preferences', { headers: authHeaders() });
  if (!r.ok) throw new Error('Failed to fetch preferences');
  const j = await r.json();
  return j.data;
}

export async function updatePreferences(patch: { push_enabled?: boolean; categories?: Record<string, boolean>; muted_hours?: { enabled: boolean; start: number; end: number; timezone?: string } }) {
  const r = await fetch('/api/push/preferences', {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(patch)
  });
  if (!r.ok) throw new Error('Failed to update preferences');
  return (await r.json()).data;
}

export async function sendTestPush(): Promise<{ ok: boolean; result?: any; reason?: string }> {
  const r = await fetch('/api/push/test', { method: 'POST', headers: authHeaders(), body: JSON.stringify({}) });
  if (r.status === 429) return { ok: false, reason: 'rate_limited' };
  if (!r.ok) return { ok: false, reason: 'server_error' };
  return { ok: true, result: (await r.json()).data };
}

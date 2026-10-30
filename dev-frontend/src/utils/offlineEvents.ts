/**
 * offlineEvents — 기기가 오프라인으로 판정된 «왜·언제» 를 기기에 남겼다가 복구 때 서버로 올린다.
 *
 * 설계: docs/OFFLINE_MODE_DESIGN.md §16-3. OfflineContext 가 부른다. 판정 로직을 깨면 안 되므로
 * 이 파일의 함수는 **절대 throw 하지 않는다**. 받는 곳 = POST /api/offline-events → system_logs(offline-detect).
 */
import { getAuthToken } from './auth';
import { isOfflineMainPos } from './offlineMainPos';

export interface ProbeFail {
  at: string;
  kind: 'timeout' | 'http' | 'network';
  status?: number;
  ms: number;
  retryAfter?: string;
  rlRemaining?: string;
}

export type OfflineTrigger = 'probe' | 'navigator_offline' | 'offline_event';

interface OfflineEvent {
  id: string;
  startedAt: string;
  recoveredAt?: string;
  durationMs?: number;
  recoveredBy?: 'ping' | 'reload';
  trigger: OfflineTrigger;
  probes: ProbeFail[];
  navigatorOnLine: boolean;
  path: string;
  mainPos: boolean;
  swVersion: string | null;
  ua: string;
  storeId?: number;
  // 회선·화면 사정 — «화면 여는 순간의 큰 내려받기에 핑이 묻혔나» 와 «어디·어떤 회선인가» 를 가른다(§16-3 보완). 전부 선택.
  sinceLoadMs?: number;
  visibility?: 'visible' | 'hidden';
  conn?: { type?: string; rtt?: number; downlink?: number };
  tz?: string;
  role?: string;
  slowRes?: { n: number; maxMs: number; maxName: string };
}

const STORAGE_KEY = 'offline_events_v1';
const MAX_EVENTS = 30;
const MAX_BYTES = 32 * 1024;
const SEND_BATCH = 20;
const MAX_RECENT_PROBES = 3;

let recentProbes: ProbeFail[] = [];
let flushing = false;

function load(): OfflineEvent[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const list = raw ? JSON.parse(raw) : [];
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

function save(list: OfflineEvent[]): void {
  try {
    let trimmed = list.slice(-MAX_EVENTS);
    let json = JSON.stringify(trimmed);
    while (trimmed.length > 0 && json.length > MAX_BYTES) {
      trimmed = trimmed.slice(1);
      json = JSON.stringify(trimmed);
    }
    if (trimmed.length === 0) localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, json);
  } catch {
    /* 저장 불가(용량·사생활 모드) — 기록 없이 넘어간다 */
  }
}

function newId(): string {
  try {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return crypto.randomUUID();
  } catch { /* ignore */ }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function storeIdFromUser(): number | undefined {
  try {
    const u = JSON.parse(localStorage.getItem('user') || 'null');
    const id = Number(u?.restaurant_id);
    return Number.isFinite(id) && id > 0 ? id : undefined;
  } catch {
    return undefined;
  }
}

// 각 칸은 따로 try — 하나가 안 되는 브라우저여도 나머지는 채운다.
function contextFields(): Partial<OfflineEvent> {
  const out: Partial<OfflineEvent> = {};
  try { out.sinceLoadMs = Math.round(performance.now()); } catch { /* ignore */ }
  try { const v = document.visibilityState; if (v === 'visible' || v === 'hidden') out.visibility = v; } catch { /* ignore */ }
  try {
    const c = (navigator as any).connection;
    if (c) {
      out.conn = {
        type: typeof c.effectiveType === 'string' ? c.effectiveType.slice(0, 20) : undefined,
        rtt: typeof c.rtt === 'number' ? c.rtt : undefined,
        downlink: typeof c.downlink === 'number' ? c.downlink : undefined,
      };
    }
  } catch { /* ignore */ }
  try { out.tz = (Intl.DateTimeFormat().resolvedOptions().timeZone || '').slice(0, 40) || undefined; } catch { /* ignore */ }
  try {
    const u = JSON.parse(localStorage.getItem('user') || 'null');
    if (typeof u?.role === 'string') out.role = u.role.slice(0, 40);
  } catch { /* ignore */ }
  try {
    // 판정 직전 30초 안에 시작돼 3초 넘게 걸린 내려받기 — 번들·이미지가 핑을 가렸는지
    const now = performance.now();
    const slow = (performance.getEntriesByType('resource') as PerformanceResourceTiming[])
      .filter((r) => r.startTime >= now - 30000 && r.duration > 3000 && !r.name.includes('/api/health')); // 시간 초과된 연결 확인 자체는 빼야 신호가 남는다
    let max: PerformanceResourceTiming | null = null;
    for (const r of slow) if (!max || r.duration > max.duration) max = r;
    out.slowRes = {
      n: slow.length,
      maxMs: max ? Math.round(max.duration) : 0,
      maxName: max ? (max.name.split('?')[0].split('/').pop() || '').slice(0, 80) : '',
    };
  } catch { /* ignore */ }
  return out;
}

export function noteProbeFailure(f: ProbeFail): void {
  try {
    recentProbes = [...recentProbes, f].slice(-MAX_RECENT_PROBES);
  } catch { /* ignore */ }
}

export function clearProbeFailures(): void {
  recentProbes = [];
}

export function hasOpenOfflineEvent(): boolean {
  return load().some((e) => !e.recoveredAt);
}

export function recordOfflineStart(trigger: OfflineTrigger): void {
  try {
    const list = load();
    if (list.some((e) => !e.recoveredAt)) return; // 열린 건이 있으면 새로 만들지 않는다
    list.push({
      id: newId(),
      startedAt: new Date().toISOString(),
      trigger,
      probes: trigger === 'probe' ? recentProbes.slice(-MAX_RECENT_PROBES) : [],
      navigatorOnLine: typeof navigator !== 'undefined' ? navigator.onLine !== false : true,
      path: (typeof location !== 'undefined' ? location.pathname : '').slice(0, 120),
      mainPos: isOfflineMainPos(),
      swVersion: null,
      ua: (typeof navigator !== 'undefined' ? navigator.userAgent : '').slice(0, 200),
      storeId: storeIdFromUser(),
      ...contextFields(),
    });
    save(list);
  } catch { /* ignore */ }
}

export function recordOfflineEnd(by: 'ping' | 'reload'): void {
  try {
    const list = load();
    const now = Date.now();
    let changed = false;
    for (const e of list) {
      if (e.recoveredAt) continue;
      e.recoveredAt = new Date(now).toISOString();
      e.durationMs = Math.max(0, now - Date.parse(e.startedAt));
      e.recoveredBy = by;
      changed = true;
    }
    if (changed) save(list);
  } catch { /* ignore */ }
}

export async function flushOfflineEvents(): Promise<void> {
  if (flushing) return;
  flushing = true;
  try {
    // 토큰 없이 보내면 401 → 자동 로그아웃 경로를 건드린다 — 로그인된 기기만 보낸다.
    if (!getAuthToken()) return;
    const ready = load().filter((e) => !!e.recoveredAt).slice(0, SEND_BATCH);
    if (ready.length === 0) return;
    const res = await fetch('/api/offline-events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ events: ready }),
    });
    // 2xx 면 서버가 받았거나(accepted) 이미 있거나(skipped) 형식 탈락(rejected) — 다시 보낼 이유가 없다. 그 밖은 남겨 다음에 다시.
    if (res.ok) {
      const sent = new Set(ready.map((e) => e.id));
      save(load().filter((e) => !sent.has(e.id)));
    }
  } catch {
    /* 다음 복구·다음 앱 시작에 다시 */
  } finally {
    flushing = false;
  }
}

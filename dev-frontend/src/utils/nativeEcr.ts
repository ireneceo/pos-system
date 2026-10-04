/**
 * 카드단말기 브릿지 감지·호출 — 계산대 앱(Windows 데스크탑앱 / 안드로이드)이 노출하는 window.__NATIVE_ECR.
 * 설계: .claude/fable-design-20261001-ghl-ecr.md §3-3·§3-5. 브라우저(앱 아님)에는 없다 → 오늘처럼 수동 기록.
 * 브릿지는 바이트 운반만 한다. 프로토콜 해석·판정은 서버(/api/terminal) 한 곳.
 * 🔒 인쇄 계약 window.__NATIVE_PRINT 와 별개 — 섞지 않는다.
 */
export type EcrTransport = 'http-hex' | 'tcp-hex' | 'tcp-bin';
export interface EcrJob { host: string; port: number; transport: EcrTransport; payloadHex: string; timeoutMs: number }
export type EcrResult = { ok: true; responseHex: string } | { ok: false; error: string; rawHex?: string };
interface EcrBridge {
  available: boolean;
  exchange: (job: EcrJob) => Promise<EcrResult>;
  discover?: (job: { port: number; transport: EcrTransport; probeHex: string }) => Promise<{ ok: boolean; hosts?: string[]; error?: string }>;
}

export function getEcrBridge(): EcrBridge | null {
  const b = (window as any).__NATIVE_ECR;
  return b && b.available === true && typeof b.exchange === 'function' ? b as EcrBridge : null;
}

/** 브릿지가 throw 해도 결과 객체로 바꾼다 — 호출부는 항상 {ok,…} 만 다룬다. */
export async function ecrExchange(job: EcrJob): Promise<EcrResult> {
  const b = getEcrBridge();
  if (!b) return { ok: false, error: 'BRIDGE_UNAVAILABLE' };
  try {
    const r = await b.exchange(job);
    if (r && r.ok === true && typeof (r as any).responseHex === 'string') return r;
    return { ok: false, error: String((r as any)?.error || 'NET_ERROR'), ...(typeof (r as any)?.rawHex === 'string' ? { rawHex: (r as any).rawHex } : {}) };
  } catch (e: any) {
    return { ok: false, error: String(e?.message || 'NET_ERROR').slice(0, 60) };
  }
}

/** 실패 결과를 서버로 보낼 본문 — 앱이 받은 원본 바이트가 있으면 함께(진단 기록용). */
export const ecrErrorBody = (r: { error: string; rawHex?: string }) => ({ error: r.error, ...(r.rawHex ? { raw_hex: r.rawHex } : {}) });

/** 연결 자체가 안 된 실패 — 요청이 단말기에 닿지 않았다. 단말기를 다시 찾아 같은 요청을 보내도 이중 결제가 없다. */
export const isConnectFailure = (error: string) => /^CONNECT_/.test(error);

/** 같은 와이파이에서 GHL 단말기 찾기(Irene 2026-10-01 「바뀌면 자동으로 찾아야」). 옛 앱(찾기 없음)이면 빈 목록. */
/**
 * 자동 찾기 + 실측 기록(2026-10-04). 앱 0.3.2+ 는 연결된 기기마다 돌아온 것(probed)을 준다 — 서버에 기록해 원인을 잰다.
 * 기록 실패는 찾기 결과에 영향이 없다(fire-and-forget).
 */
export async function ecrDiscoverAndReport(restaurantId: number | string | undefined, job: { port: number; transport: EcrTransport; probeHex: string }): Promise<string[]> {
  const b = getEcrBridge();
  if (!b || typeof b.discover !== 'function') return [];
  let r: any = null;
  try { r = await b.discover(job); } catch { r = null; }
  const hosts: string[] = r && r.ok && Array.isArray(r.hosts) ? r.hosts : [];
  try {
    const { getAuthToken } = await import('./auth');
    fetch('/api/terminal/discovery-report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getAuthToken()}` },
      body: JSON.stringify({ restaurant_id: restaurantId, hosts, scanned: r?.scanned ?? null, probed: Array.isArray(r?.probed) ? r.probed : [], error: r?.error || null }),
    }).catch(() => { /* 기록 실패 무시 */ });
  } catch { /* 기록 실패 무시 */ }
  return hosts;
}

export async function ecrDiscover(job: { port: number; transport: EcrTransport; probeHex: string }): Promise<string[]> {
  const b = getEcrBridge();
  if (!b || typeof b.discover !== 'function') return [];
  try {
    const r = await b.discover(job);
    return r && r.ok && Array.isArray(r.hosts) ? r.hosts : [];
  } catch {
    return [];
  }
}

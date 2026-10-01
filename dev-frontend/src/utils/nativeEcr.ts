/**
 * 카드단말기 브릿지 감지·호출 — 계산대 앱(Windows 데스크탑앱 / 안드로이드)이 노출하는 window.__NATIVE_ECR.
 * 설계: .claude/fable-design-20261001-ghl-ecr.md §3-3·§3-5. 브라우저(앱 아님)에는 없다 → 오늘처럼 수동 기록.
 * 브릿지는 바이트 운반만 한다. 프로토콜 해석·판정은 서버(/api/terminal) 한 곳.
 * 🔒 인쇄 계약 window.__NATIVE_PRINT 와 별개 — 섞지 않는다.
 */
export type EcrTransport = 'http-hex' | 'tcp-hex' | 'tcp-bin';
export interface EcrJob { host: string; port: number; transport: EcrTransport; payloadHex: string; timeoutMs: number }
export type EcrResult = { ok: true; responseHex: string } | { ok: false; error: string };
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
    return { ok: false, error: String((r as any)?.error || 'NET_ERROR') };
  } catch (e: any) {
    return { ok: false, error: String(e?.message || 'NET_ERROR').slice(0, 60) };
  }
}

/** 연결 자체가 안 된 실패 — 요청이 단말기에 닿지 않았다. 단말기를 다시 찾아 같은 요청을 보내도 이중 결제가 없다. */
export const isConnectFailure = (error: string) => /^CONNECT_/.test(error);

/** 같은 와이파이에서 GHL 단말기 찾기(Irene 2026-10-01 「바뀌면 자동으로 찾아야」). 옛 앱(찾기 없음)이면 빈 목록. */
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

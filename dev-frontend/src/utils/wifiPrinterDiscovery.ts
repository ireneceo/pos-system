/**
 * 와이파이 프린터 자동 찾기 (2026-11-02 Irene «와이파이 프린터가 자동으로 잡히는 게 있으면 다 제대로 하고»).
 * 이미 깔린 안드로이드 앱(0.3.2+)의 단말기 찾기(__NATIVE_ECR.discover)를 프린터 포트(9100)로 돌린다 — 새 앱 설치·심사 불필요.
 * 보내는 바이트 = DLE EOT 1(10 04 01, ESC/POS «상태 알려 줘») — 종이에 찍히지 않는 표준 상태 질의.
 * 🔒 인쇄 경로(billPrint)와 무관 — 찾은 주소는 설정 화면에서 태블릿 등록부(__NATIVE_PRINT_SETUP)에만 넣는다.
 */
import { getEcrBridge } from './nativeEcr';

export const PRINTER_PORT = 9100;
/** ESC/POS DLE EOT 1 — 프린터 상태 질의. 종이에 찍히지 않는다. */
const STATUS_PROBE_HEX = '100401';

/** 같은 와이파이에서 9100 포트가 열린 기기(=네트워크 프린터)를 찾는다. 앱이 찾기를 못 하면 supported=false. */
export async function findWifiPrinters(): Promise<{ supported: boolean; hosts: string[]; scanned: number | null }> {
  const b: any = getEcrBridge();
  if (!b || typeof b.discover !== 'function') return { supported: false, hosts: [], scanned: null };
  let r: any = null;
  try { r = await b.discover({ port: PRINTER_PORT, transport: 'tcp-bin', probeHex: STATUS_PROBE_HEX }); } catch { r = null; }
  if (!r || r.ok !== true) return { supported: true, hosts: [], scanned: null };
  // probed = 포트가 열려 연결된 기기 전부(앱 0.3.2+). 프린터는 단말기 응답 형식이 아니라 hosts 엔 안 들어온다.
  const probed: any[] = Array.isArray(r.probed) ? r.probed : [];
  const hosts = Array.from(new Set(probed.map((p) => String(p && p.host || '')).filter(Boolean)));
  hosts.sort((a, b) => a.split('.').map(Number).reduce((x, n, i) => x || n - Number(b.split('.')[i]), 0));
  return { supported: true, hosts, scanned: typeof r.scanned === 'number' ? r.scanned : null };
}


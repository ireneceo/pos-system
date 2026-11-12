/**
 * printerSetupGaps — «프린터가 안 정해져서 종이가 안 나올 곳» 찾기 (2026-11-12 · 표시 전용).
 *
 * Irene «설정 안된 거 있으면 정확히 알려줘서 미싱 못하게 해야 하고» (K-DINE Noodles 매장 28:
 * Noodles 주방 칸이 빈 채로 저장돼 그 주방 티켓이 PRINTER_NOT_FOUND 로 실패).
 *
 * 판정은 인쇄 코드(🔒 utils/billPrint.js — 읽기만, 손대지 않음)와 같은 규칙이다:
 *  - 방식 결정 getPrinterMethod('station:<id>') = 주방칸 method → 주방 기본 method → printerMode
 *  - 주방칸 인쇄 sendToRawBTPrinter: 방식이 qztray(= «프린터 이름·IP», 앱도 이 방식)면
 *    주소 = 주방칸 address || 주방 기본 address, **둘 다 비면 return false = 안 나옴**
 *  - 주방칸이 하나도 없으면 주방 기본 프린터(kitchenPrinter) 하나로 — qztray 인데 주소 비면 안 나옴
 * RawBT·브라우저 방식은 주소 없이도(기기 기본 프린터로) 나가므로 «빠짐» 으로 보지 않는다.
 * 인쇄 규칙이 바뀌면 이 함수도 같이 바꾼다(tests: printerSetupGaps.test.ts).
 */

export type PrinterGap =
  | { kind: 'station'; stationId: string; name: string }
  | { kind: 'kitchen' };

interface MinimalPrinter { enabled?: boolean; method?: string; address?: string; stationName?: string }
export interface MinimalPrinterSettings {
  printerMode?: string;
  kitchenPrinter?: MinimalPrinter;
  kitchenStationPrinters?: Record<string, MinimalPrinter | null | undefined>;
}

const trim = (v: unknown) => (typeof v === 'string' ? v.trim() : '');

/**
 * @param settings  매장 printer_settings (서버 원본 또는 기기 사본 localStorage.printerSettings)
 * @param printerMode 기기 사본의 printerMode(없으면 settings.printerMode → 'rawbt' — billPrint getPrinterMode 와 같은 기본값)
 * @param activeStations 켜진 주방 목록(있으면 이 목록에 있는 주방만 본다 · 이름도 여기서)
 */
export function findPrinterSetupGaps(
  settings: MinimalPrinterSettings | null | undefined,
  printerMode?: string | null,
  activeStations?: Array<{ id: number | string; name?: string }> | null,
): PrinterGap[] {
  if (!settings || typeof settings !== 'object') return [];
  const kp = settings.kitchenPrinter || {};
  if (kp.enabled === false) return []; // 주방 인쇄를 끈 매장 — 빠진 게 아니라 안 쓰는 것
  const rawMode = trim(printerMode) || trim(settings.printerMode);
  const mode = rawMode === 'browser' || rawMode === 'qztray' ? rawMode : 'rawbt'; // billPrint getPrinterMode 와 같음
  const kpMethod = trim(kp.method) || mode;
  const kpAddr = trim(kp.address);
  const sp = settings.kitchenStationPrinters && typeof settings.kitchenStationPrinters === 'object'
    ? settings.kitchenStationPrinters : {};
  const keys = Object.keys(sp).filter((k) => sp[k]);

  if (keys.length === 0) {
    return kpMethod === 'qztray' && !kpAddr ? [{ kind: 'kitchen' }] : [];
  }

  const activeById = activeStations ? new Map(activeStations.map((s) => [String(s.id), s])) : null;
  const gaps: PrinterGap[] = [];
  for (const id of keys) {
    if (activeById && !activeById.has(id)) continue; // 꺼진·지운 주방
    const s = sp[id] || {};
    const method = trim(s.method) || kpMethod;
    if (method !== 'qztray') continue;
    if (trim(s.address) || kpAddr) continue;
    const name = trim(activeById?.get(id)?.name) || trim(s.stationName) || `#${id}`;
    gaps.push({ kind: 'station', stationId: id, name });
  }
  return gaps;
}

/**
 * printerSetupGaps (서버판) — «프린터가 안 정해져서 종이가 안 나올 주방» 판정 (2026-11-13 · 인쇄 지킴이 setup_gap).
 *
 * 화면판 dev-frontend/src/utils/printerSetupGaps.ts 와 **같은 규칙**이다(설계 .claude/fable-design-20261113-print-monitoring.md §3).
 * 두 벌이 어긋나지 않게 양쪽 테스트가 같은 입력·기대값 tests/fixtures/printer-setup-gaps.json 을 읽는다.
 * 규칙 근거(🔒 billPrint.js — 읽기만): 주방칸 방식 = 주방칸 → 주방 기본 → printerMode(browser/qztray 외엔 rawbt) ·
 * qztray 면 주소 = 주방칸 || 주방 기본, 둘 다 비면 안 나감 · 주방칸이 없으면 주방 기본 하나.
 * 서버는 매장 설정의 printerMode 만 안다(기기 사본이 다르면 다를 수 있음 — 부르는 쪽이 basis 로 적는다).
 */
const trim = (v) => (typeof v === 'string' ? v.trim() : '');

function findPrinterSetupGaps(settings, printerMode, activeStations) {
  if (!settings || typeof settings !== 'object') return [];
  const kp = settings.kitchenPrinter || {};
  if (kp.enabled === false) return [];
  const rawMode = trim(printerMode) || trim(settings.printerMode);
  const mode = rawMode === 'browser' || rawMode === 'qztray' ? rawMode : 'rawbt';
  const kpMethod = trim(kp.method) || mode;
  const kpAddr = trim(kp.address);
  const sp = settings.kitchenStationPrinters && typeof settings.kitchenStationPrinters === 'object'
    ? settings.kitchenStationPrinters : {};
  const keys = Object.keys(sp).filter((k) => sp[k]);
  if (keys.length === 0) {
    return kpMethod === 'qztray' && !kpAddr ? [{ kind: 'kitchen' }] : [];
  }
  const activeById = activeStations ? new Map(activeStations.map((s) => [String(s.id), s])) : null;
  const gaps = [];
  for (const id of keys) {
    if (activeById && !activeById.has(id)) continue;
    const s = sp[id] || {};
    const method = trim(s.method) || kpMethod;
    if (method !== 'qztray') continue;
    if (trim(s.address) || kpAddr) continue;
    const name = trim(activeById && activeById.get(id) && activeById.get(id).name) || trim(s.stationName) || `#${id}`;
    gaps.push({ kind: 'station', stationId: id, name });
  }
  return gaps;
}

module.exports = { findPrinterSetupGaps };

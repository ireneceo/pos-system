/**
 * settings-guard.test.js
 *
 * 회귀 박제 — 2026-06-24 thefire kitchenPrinter wipe 사고.
 *
 * 사고: 설정 페이지가 프린터 설정을 DB 에서 다 불러오기 전에 무관한 AutoSaveField(결제 토글 등)가
 * 저장을 발동 → 화면 "초기 기본값"(올-off kitchenPrinter + 빈 workstations + 빈 stations)이 그대로
 * PUT 됨. 빈 workstations/stations 는 가드가 보존했지만, "값은 있는데 전부 꺼진" kitchenPrinter 는
 * 비어있지 않아 통과 → 운영 주방 자동인쇄가 조용히 꺼짐(매장 무인쇄).
 *
 * 이 테스트가 통과하는 한 그 사고는 다시 조용히 일어날 수 없다.
 */
const { guardPrinterSettings } = require('../utils/settingsGuard');

// 운영 thefire(rid=16) 의 실제 설정 모양 — 주방 자동인쇄 켜짐 + 스테이션 3개 + 워크스테이션 2개
const CONFIGURED_EXISTING = {
  printerMode: 'qztray',
  billPrinter: { enabled: true, name: '', autoPrint: true, address: 'POS-80C' },
  kitchenPrinter: { enabled: true, name: '', autoPrint: true, printPerItem: false, address: '', mirrorToBillPrinter: true, printCancellationTicket: true, method: 'qztray' },
  kitchenStationPrinters: {
    12: { name: '', method: 'qztray', address: 'KITCHEN', autoPrint: true, stationName: 'KQ1' },
    13: { name: '', method: 'qztray', address: 'KITCHEN 2', autoPrint: true, stationName: 'KQ2' },
    14: { name: '', method: 'qztray', address: 'BAR', autoPrint: true, stationName: 'BARPR' },
  },
  workstations: [
    { id: 'ws_1', name: 'POS 1', billPrinter: { enabled: true, name: '', autoPrint: true, method: 'qztray', address: 'POS-80C' } },
    { id: 'ws_2', name: 'POS 2', billPrinter: { enabled: true, name: '', autoPrint: false, method: 'qztray', address: 'KitBar' } },
  ],
};

// 설정 페이지 SettingsPage.tsx:737 의 "초기 useState 기본값" — 사고를 일으킨 정확한 payload 모양.
const UNLOADED_DEFAULT_PAYLOAD = {
  printerMode: 'rawbt',
  billPrinter: { enabled: false, name: '', autoPrint: false, address: '', method: 'browser' },
  kitchenPrinter: { enabled: false, name: '', autoPrint: false, printPerItem: false, address: '', mirrorToBillPrinter: false, printCancellationTicket: true, method: 'qztray' },
  kitchenStationPrinters: {},
  workstations: [],
};

describe('settingsGuard: printer wipe 방어 (thefire 2026-06-24 회귀)', () => {
  test('미로드 기본값 저장이 들어와도 켜져 있던 kitchenPrinter 가 보존된다', () => {
    const r = guardPrinterSettings(UNLOADED_DEFAULT_PAYLOAD, CONFIGURED_EXISTING, 16);
    expect(r.action).not.toBe('reject'); // 다른 정상 설정은 통과해야 하므로 reject 가 아니라 merged
    expect(r.value.kitchenPrinter.enabled).toBe(true);   // ← 사고의 핵심: 꺼지면 무인쇄
    expect(r.value.kitchenPrinter.autoPrint).toBe(true);
  });

  test('미로드 저장에서 workstations/stations 도 함께 보존된다', () => {
    const r = guardPrinterSettings(UNLOADED_DEFAULT_PAYLOAD, CONFIGURED_EXISTING, 16);
    expect(Array.isArray(r.value.workstations)).toBe(true);
    expect(r.value.workstations.length).toBe(2);
    expect(Object.keys(r.value.kitchenStationPrinters)).toEqual(expect.arrayContaining(['12', '13', '14']));
  });

  test('billPrinter 도 미로드 기본값으로 덮이지 않는다', () => {
    const r = guardPrinterSettings(UNLOADED_DEFAULT_PAYLOAD, CONFIGURED_EXISTING, 16);
    expect(r.value.billPrinter.address).toBe('POS-80C');
    expect(r.value.billPrinter.enabled).toBe(true);
  });

  test('정상(로드 완료) 저장은 오탐 없이 통과 — RA 가 실제로 주방 프린터를 끄면 꺼진다', () => {
    // 로드된 저장은 workstations/stations 를 그대로 실어 온다 → 미로드 신호 아님.
    const loadedDisable = {
      ...CONFIGURED_EXISTING,
      kitchenPrinter: { ...CONFIGURED_EXISTING.kitchenPrinter, enabled: false, autoPrint: false },
    };
    const r = guardPrinterSettings(loadedDisable, CONFIGURED_EXISTING, 16);
    expect(r.value.kitchenPrinter.enabled).toBe(false); // 의도적 해제는 정상 저장
    expect(r.value.workstations.length).toBe(2);        // 나머지는 그대로
  });

  test('완전 빈 payload({}) 는 기존대로 reject', () => {
    const r = guardPrinterSettings({}, CONFIGURED_EXISTING, 16);
    expect(r.action).toBe('reject');
  });
});

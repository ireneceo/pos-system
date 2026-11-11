/**
 * printer-setup-device.test.js — «프린터 설정 기기» 판정 (2026-11-10 · Fable 설계 §3-1 · §7 V1)
 *
 * Irene «레스토랑 프린터 설정을 한 디바이스에서 다른 곳에서 안하게. 하려면 확인을 하고 바꾸게»
 * 이 테스트가 통과하는 한: 다른 기기가 확인 없이 보낸 저장은 프린터 설정을 못 바꾸고,
 * 설정 저장이 꼬리표를 지우거나 바꾸지 못하며, 직원은 비상 두 칸만 바꾼다.
 */
const {
  resolvePrinterWrite, mergeEmergencyOnly, keepSetupDevice, seedMissingStations,
  applyPrinterWrite, normalizeDevice,
} = require('../utils/printerSetupDevice');
const { guardPrinterSettings } = require('../utils/settingsGuard');

const TAG = { id: 'dev-A', kind: 'android-app', name: 'Android app · POS 1', at: '2026-11-10T00:00:00.000Z', byId: 1, byName: 'admin' };
const BASE = {
  printerMode: 'qztray',
  kitchenPrinter: { enabled: true, autoPrint: true, method: 'qztray', address: 'KITCHEN' },
  kitchenStationPrinters: { 12: { name: '', method: 'qztray', address: 'KITCHEN', autoPrint: true, stationName: 'KQ1' } },
  workstations: [{ id: 'ws_1', name: 'POS 1', billPrinter: { enabled: true, name: '', autoPrint: true, method: 'qztray', address: 'COUNTER' } }],
  emergencyMode: false,
};
const TAGGED = { ...BASE, setupDevice: TAG };
const RA = 'Restaurant Admin';
const devA = { id: 'dev-A', kind: 'android-app', name: 'x' };
const devB = { id: 'dev-B', kind: 'pc-browser', name: 'PC' };

describe('resolvePrinterWrite — 설계 §3-1 표 6행', () => {
  test('1. 관리자·SA 아님 → emergency', () => {
    expect(resolvePrinterWrite({ role: 'Staff', device: devA, existingPs: TAGGED }).mode).toBe('emergency');
    expect(resolvePrinterWrite({ role: 'Brand General', device: null, existingPs: BASE }).mode).toBe('emergency');
  });
  test('2. 관리자 · 꼬리표 없음 → full (지금과 같음)', () => {
    expect(resolvePrinterWrite({ role: RA, device: undefined, existingPs: BASE })).toMatchObject({ mode: 'full', reason: 'no_setup_device' });
    expect(resolvePrinterWrite({ role: 'System Admin', device: devB, existingPs: BASE }).mode).toBe('full');
  });
  test('3. 관리자 · 꼬리표 있음 · 기기 정보 없음(옛 번들) → full', () => {
    expect(resolvePrinterWrite({ role: RA, device: undefined, existingPs: TAGGED })).toMatchObject({ mode: 'full', reason: 'no_device_info' });
  });
  test('4. 관리자 · 같은 기기 → full', () => {
    expect(resolvePrinterWrite({ role: RA, device: devA, existingPs: JSON.stringify(TAGGED) })).toMatchObject({ mode: 'full', reason: 'setup_device' });
  });
  test('5. 관리자 · 다른 기기 + confirm → full + 다른 기기 기록', () => {
    const r = resolvePrinterWrite({ role: RA, device: { ...devB, confirm: true }, existingPs: TAGGED });
    expect(r).toMatchObject({ mode: 'full', reason: 'other_device_confirmed' });
    expect(r.otherDevice).toMatchObject({ kind: 'pc-browser', name: 'PC' });
  });
  test('6. 관리자 · 다른 기기 · confirm 없음 → emergency', () => {
    expect(resolvePrinterWrite({ role: RA, device: devB, existingPs: TAGGED })).toMatchObject({ mode: 'emergency', reason: 'other_device' });
    expect(resolvePrinterWrite({ role: RA, device: { ...devB, confirm: 'yes' }, existingPs: TAGGED }).mode).toBe('emergency');
    // 기기 번호 없는 브라우저(dev-ephemeral)도 설정 기기가 아니다
    expect(resolvePrinterWrite({ role: RA, device: { id: 'dev-ephemeral', kind: 'pc-browser' }, existingPs: TAGGED }).mode).toBe('emergency');
  });
});

describe('mergeEmergencyOnly — store.js 옛 직원 분기와 같은 결과', () => {
  // 옮기기 전 store.js:223-242 로직 그대로(비교 기준)
  function legacy(existingRaw, incomingRaw) {
    const existingPs = existingRaw ? (typeof existingRaw === 'string' ? JSON.parse(existingRaw) : { ...existingRaw }) : {};
    const incomingPs = typeof incomingRaw === 'string' ? JSON.parse(incomingRaw) : (incomingRaw || {});
    if (typeof incomingPs.emergencyMode === 'boolean' && incomingPs.emergencyMode !== existingPs.emergencyMode) {
      existingPs.emergencyMode = incomingPs.emergencyMode;
      existingPs.emergencyEnabledAt = incomingPs.emergencyMode ? (incomingPs.emergencyEnabledAt || 'NOW') : null;
      return existingPs;
    }
    return null; // skipped
  }
  const cases = [
    [BASE, { ...BASE, emergencyMode: true, emergencyEnabledAt: '2026-11-10T01:00:00Z', kitchenPrinter: { enabled: false } }],
    [{ ...BASE, emergencyMode: true, emergencyEnabledAt: 'x' }, { emergencyMode: false }],
    [BASE, { ...BASE, kitchenPrinter: { enabled: false } }],
    [BASE, {}],
    [JSON.stringify(BASE), JSON.stringify({ emergencyMode: true, emergencyEnabledAt: 'T' })],
  ];
  test.each(cases.map((c, i) => [i, ...c]))('case %i', (_i, ex, inc) => {
    const want = legacy(ex, inc);
    const got = mergeEmergencyOnly(ex, inc);
    expect(got.changed).toBe(want !== null);
    if (want) {
      const g = { ...got.value };
      if (want.emergencyEnabledAt === 'NOW') { expect(typeof g.emergencyEnabledAt).toBe('string'); g.emergencyEnabledAt = 'NOW'; }
      expect(g).toEqual(want);
    } else {
      expect(got.value).toEqual(typeof ex === 'string' ? JSON.parse(ex) : ex);
    }
  });
  test('나머지 칸은 바이트 그대로', () => {
    const got = mergeEmergencyOnly(BASE, { emergencyMode: true, kitchenPrinter: { enabled: false }, workstations: [] });
    expect(got.value.kitchenPrinter).toEqual(BASE.kitchenPrinter);
    expect(got.value.workstations).toEqual(BASE.workstations);
  });
});

describe('keepSetupDevice — 꼬리표는 DB 값', () => {
  test('본문에 없음 → DB 꼬리표 보존', () => {
    expect(keepSetupDevice({ ...BASE }, TAGGED).setupDevice).toEqual(TAG);
  });
  test('다른 값 실어 옴 → DB 값으로', () => {
    expect(keepSetupDevice({ ...BASE, setupDevice: { id: 'evil' } }, TAGGED).setupDevice).toEqual(TAG);
  });
  test('DB 에 없는데 실어 옴 → 지움', () => {
    expect(keepSetupDevice({ ...BASE, setupDevice: { id: 'evil' } }, BASE).setupDevice).toBeUndefined();
  });
});

describe('seedMissingStations — 빠진 칸만', () => {
  const stations = [{ id: 12, name: 'KQ1' }, { id: 13, name: 'KQ2' }];
  test('빠진 것만 더하고 있는 칸은 그대로', () => {
    const { value, added } = seedMissingStations(BASE, stations);
    expect(added).toBe(1);
    expect(value.kitchenStationPrinters[12]).toBe(BASE.kitchenStationPrinters[12]);
    expect(value.kitchenStationPrinters[13]).toEqual({ name: '', autoPrint: true, address: '', method: 'qztray', stationName: 'KQ2' });
    expect(value.workstations).toBe(BASE.workstations);
  });
  test('두 번째 호출은 0', () => {
    const first = seedMissingStations(BASE, stations).value;
    expect(seedMissingStations(first, stations).added).toBe(0);
  });
  test('빠진 게 없으면 원본 칸 그대로', () => {
    const { added } = seedMissingStations(BASE, [{ id: 12, name: 'KQ1' }]);
    expect(added).toBe(0);
  });
});

describe('applyPrinterWrite — 두 라우트 공용', () => {
  const user = { id: 9, role: RA, name: 'Admin B' };
  const changed = { ...BASE, kitchenPrinter: { ...BASE.kitchenPrinter, address: 'OTHER' } };
  test('다른 기기 · 확인 없음 → 프린터 설정 무변경 + skipped', () => {
    const r = applyPrinterWrite({ user, body: { printer_settings: changed, printer_device: devB }, existingRaw: TAGGED, guard: guardPrinterSettings, restaurantId: 't' });
    expect(r.action).toBe('skip');
    expect(r.skipped).toBe('other_device');
  });
  test('다른 기기 · 확인 없음 · 비상만 바뀜 → 비상 두 칸만 저장 + skipped', () => {
    const r = applyPrinterWrite({ user, body: { printer_settings: { ...changed, emergencyMode: true }, printer_device: devB }, existingRaw: TAGGED, guard: guardPrinterSettings, restaurantId: 't' });
    expect(r.action).toBe('save');
    expect(r.value.kitchenPrinter).toEqual(BASE.kitchenPrinter);
    expect(r.value.emergencyMode).toBe(true);
    expect(r.value.setupDevice).toEqual(TAG);
    expect(r.skipped).toBe('other_device');
  });
  test('다른 기기 · 확인 → 반영 + otherEdit · 꼬리표 id 그대로', () => {
    const r = applyPrinterWrite({ user, body: { printer_settings: changed, printer_device: { ...devB, confirm: true } }, existingRaw: TAGGED, guard: guardPrinterSettings, restaurantId: 't' });
    expect(r.action).toBe('save');
    expect(r.value.kitchenPrinter.address).toBe('OTHER');
    expect(r.value.setupDevice.id).toBe('dev-A');
    expect(r.value.setupDevice.otherEdit).toMatchObject({ kind: 'pc-browser', name: 'PC', byName: 'Admin B' });
  });
  test('다른 기기 · 확인 · 실제 변화 없음 → otherEdit 안 남김', () => {
    const r = applyPrinterWrite({ user, body: { printer_settings: { ...BASE }, printer_device: { ...devB, confirm: true } }, existingRaw: TAGGED, guard: guardPrinterSettings, restaurantId: 't' });
    expect(r.value.setupDevice).toEqual(TAG);
  });
  test('설정 기기 → 반영 · 꼬리표 그대로', () => {
    const r = applyPrinterWrite({ user, body: { printer_settings: changed, printer_device: devA }, existingRaw: TAGGED, guard: guardPrinterSettings, restaurantId: 't' });
    expect(r.value.kitchenPrinter.address).toBe('OTHER');
    expect(r.value.setupDevice).toEqual(TAG);
  });
  test('옛 번들(기기 정보 없음) + 꼬리표 지움 시도 → 반영하되 꼬리표 보존', () => {
    const r = applyPrinterWrite({ user, body: { printer_settings: { ...changed, setupDevice: null } }, existingRaw: TAGGED, guard: guardPrinterSettings, restaurantId: 't' });
    expect(r.value.kitchenPrinter.address).toBe('OTHER');
    expect(r.value.setupDevice).toEqual(TAG);
  });
  test('직원 → 비상 외 무변경', () => {
    const r = applyPrinterWrite({ user: { id: 3, role: 'Staff' }, body: { printer_settings: changed }, existingRaw: BASE, guard: guardPrinterSettings, restaurantId: 't' });
    expect(r.action).toBe('skip');
    expect(r.skipped).toBeUndefined();
  });
});

describe('normalizeDevice', () => {
  test('빈 값·dev-ephemeral → null · 이름 40자', () => {
    expect(normalizeDevice(null)).toBeNull();
    expect(normalizeDevice({ id: 'dev-ephemeral' })).toBeNull();
    expect(normalizeDevice({ id: 'd', kind: 'weird', name: 'x'.repeat(60) })).toMatchObject({ kind: 'pc-browser', name: 'x'.repeat(40) });
  });
});

// 인쇄 지킴이 판정 (2026-11-13 · .claude/fable-design-20261113-print-monitoring.md §6-4)
const fs = require('fs');
const path = require('path');
const { findPrinterSetupGaps } = require('../utils/printerSetupGaps');
const { judge, cmpVersion } = require('../services/printWatch');
const { buildRow } = require('../middleware/printTraceTee');

const { cases } = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures/printer-setup-gaps.json'), 'utf8'));
describe('setup_gap 판정 — 화면판과 같은 fixture', () => {
  for (const c of cases) test(c.name, () => expect(findPrinterSetupGaps(c.settings, c.mode, c.active || null)).toEqual(c.expect));
});

const autoOn = { kitchenPrinter: { enabled: true, autoPrint: true, method: 'rawbt' } };
const autoOff = { kitchenPrinter: { enabled: true, autoPrint: false, method: 'rawbt' } };
const codes = (f) => f.map((x) => x.code);

describe('규칙 6개 — 걸림 / 안 걸림', () => {
  test('setup_gap 걸림·안 걸림', () => {
    const ps = { ...autoOn, kitchenStationPrinters: { 24: { address: '', method: 'qztray', stationName: 'Noodles' } } };
    expect(judge({ ps, activeStations: [{ id: 24, name: 'Noodles' }] })[0]).toMatchObject({ code: 'setup_gap', severity: 'critical', evidence: { kitchens: ['Noodles'] } });
    expect(codes(judge({ ps: autoOn, activeStations: [] }))).not.toContain('setup_gap');
  });
  test('print_failures 1~4 warn · 5 이상 critical · 0 없음', () => {
    expect(judge({ ps: autoOn, failures: [{ reason_code: 'PRINTER_NOT_FOUND', intended_printer: '(default)', n: 2 }] })[0]).toMatchObject({ code: 'print_failures', severity: 'warn' });
    expect(judge({ ps: autoOn, failures: [{ reason_code: 'X', n: 3 }, { reason_code: 'Y', n: 2 }] })[0]).toMatchObject({ code: 'print_failures', severity: 'critical', evidence: { count: 5 } });
    expect(codes(judge({ ps: autoOn, failures: [] }))).not.toContain('print_failures');
  });
  test('unprinted_orders — 자동 인쇄 켜짐에서만 (수동 인쇄 매장은 안 걸림)', () => {
    const unprinted = { count: 2, orders: ['A-1', 'A-2'] };
    expect(codes(judge({ ps: autoOn, unprinted }))).toContain('unprinted_orders');
    expect(codes(judge({ ps: autoOff, unprinted }))).not.toContain('unprinted_orders');
    expect(codes(judge({ ps: autoOn, unprinted: { count: 0 } }))).not.toContain('unprinted_orders');
  });
  test('multi_auto_print 2대 이상만', () => {
    expect(codes(judge({ ps: autoOn, autoDevices: [{ label: 'a' }, { label: 'b' }] }))).toContain('multi_auto_print');
    expect(codes(judge({ ps: autoOn, autoDevices: [{ label: 'a' }] }))).not.toContain('multi_auto_print');
  });
  test('old_app — 안드로이드 앱 0.4.1 미만만', () => {
    expect(codes(judge({ ps: autoOn, appDevices: [{ platform: 'android-app', app_version: '0.3.4' }] }))).toContain('old_app');
    expect(codes(judge({ ps: autoOn, appDevices: [{ platform: 'android-app', app_version: '0.4.1' }, { platform: 'android-app', app_version: '0.10.0' }] }))).not.toContain('old_app');
    expect(codes(judge({ ps: autoOn, appDevices: [{ platform: 'windows-app', app_version: '0.1.0' }] }))).not.toContain('old_app');
  });
  test('settings_blocked 3회 이상만 · info', () => {
    expect(judge({ ps: autoOn, blocked: 3 })[0]).toMatchObject({ code: 'settings_blocked', severity: 'info' });
    expect(codes(judge({ ps: autoOn, blocked: 2 }))).not.toContain('settings_blocked');
  });
  test('버전 비교', () => {
    expect(cmpVersion('0.3.4', '0.4.1')).toBe(-1);
    expect(cmpVersion('0.10.0', '0.4.1')).toBe(1);
    expect(cmpVersion('0.4.1', '0.4.1')).toBe(0);
  });
});

describe('printTraceTee 기록 줄', () => {
  test('err= 에서 사유를 뽑고, 없으면 client_failed', () => {
    const req = { user: { id: 19, restaurant_id: 28 }, body: { type: 'raw', printer: '(default)', ok: false, info: 'ver=0.3.4 fmt=auto def= printer=(default) ok=false err=PRINTER_NOT_FOUND bytes=122' } };
    expect(buildRow(req)).toMatchObject({ restaurant_id: 28, outcome: 'failed', reason_code: 'PRINTER_NOT_FOUND', intended_printer: '(default)' });
    expect(buildRow({ user: { id: 1, restaurant_id: 5 }, body: { ok: false, type: 'consolidated', orderNumber: 'X-1' } })).toMatchObject({ reason_code: 'client_failed', order_number: 'X-1' });
  });
});

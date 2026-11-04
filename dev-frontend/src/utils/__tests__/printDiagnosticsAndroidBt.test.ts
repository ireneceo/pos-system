// «전체 점검» 의 블루투스 권한 줄 — 2026-11-04 Irene «전체 테스트하면 왜 굳이 블루투스 문제 있는 거 안내와?»
// 골라 둔 프린터 중 블루투스일 수 있는 것(이 태블릿의 와이파이·랜 등록 이름이 아니고 IP 도 아닌 이름)이 있을 때만 나온다.
let mockSettings: any = {};
let mockDiag: any = {};
jest.mock('../billPrint', () => ({
  getPrinterSettings: () => mockSettings,
  getPrinterMode: () => null,
  getActiveWorkstationId: () => null,
  getActiveBillPrinter: () => null,
  runQZDiagnostic: async () => mockDiag,
}));
jest.mock('../auth', () => ({ getAuthToken: () => null }));

// eslint-disable-next-line import/first
import { runDeviceChecks } from '../printDiagnostics';

const ANDROID_UA = 'Mozilla/5.0 (Linux; Android 13; SM-T220) AppleWebKit/537.36 Chrome/120 Mobile Safari/537.36';
const setUA = (ua: string) => Object.defineProperty(window.navigator, 'userAgent', { value: ua, configurable: true });
const nativeOk = (names: string[]) => ({
  ok: true,
  steps: [{ key: 'printers', status: names.length ? 'ok' : 'failed', detail: names.join(', ') || 'none found' }],
  summary: {},
});
const byId = (checks: any[], id: string) => checks.find((c) => c.id === id);

describe('printDiagnostics — 안드로이드 블루투스 권한 줄', () => {
  beforeEach(() => {
    setUA(ANDROID_UA);
    (window as any).__NATIVE_PRINT = { available: true };
    mockSettings = { kitchenPrinter: { enabled: true, address: 'KITCHEN' }, billPrinter: { enabled: true, address: 'COUNTER' } };
  });
  afterEach(() => { delete (window as any).__NATIVE_PRINT; delete (window as any).__NATIVE_PRINT_SETUP; });

  test('골라 둔 프린터가 전부 와이파이·랜 등록 이름이면 블루투스 줄이 아예 없다(권한이 꺼져 있어도)', async () => {
    (window as any).__NATIVE_PRINT_SETUP = { getState: async () => ({ net: [{ name: 'KITCHEN' }, { name: 'counter' }], bonded: [], btPermission: 'denied' }) };
    mockDiag = nativeOk(['KITCHEN', 'COUNTER']);
    const checks = await runDeviceChecks();
    expect(byId(checks, 'bt_permission')).toBeUndefined();
    expect(byId(checks, 'printers_visible').status).toBe('pass');
  });

  test('IP 주소로 고른 프린터는 블루투스가 아니다', async () => {
    mockSettings = { kitchenPrinter: { enabled: true, address: '192.168.1.50' } };
    (window as any).__NATIVE_PRINT_SETUP = { getState: async () => ({ net: [], bonded: [], btPermission: 'denied' }) };
    mockDiag = nativeOk([]);
    expect(byId(await runDeviceChecks(), 'bt_permission')).toBeUndefined();
  });

  test('와이파이 등록 이름이 아닌 프린터가 있고 권한이 꺼져 있으면 → 그 이름을 짚어 경고', async () => {
    (window as any).__NATIVE_PRINT_SETUP = { getState: async () => ({ net: [{ name: 'KITCHEN' }], bonded: [], btPermission: 'denied' }) };
    mockDiag = nativeOk(['KITCHEN']);
    const bt = byId(await runDeviceChecks(), 'bt_permission');
    expect(bt.status).toBe('warn');
    expect(bt.evidence.btList).toBe('COUNTER');
  });

  test('블루투스 프린터를 쓰고 권한이 있으면 통과 줄', async () => {
    (window as any).__NATIVE_PRINT_SETUP = { getState: async () => ({ net: [{ name: 'KITCHEN' }], bonded: [{ name: 'COUNTER' }], btPermission: 'granted' }) };
    mockDiag = nativeOk(['KITCHEN', 'COUNTER']);
    expect(byId(await runDeviceChecks(), 'bt_permission').status).toBe('pass');
  });

  test('등록 목록을 못 읽으면 블루투스 줄을 숨기지 않는다(원인을 감추지 않게)', async () => {
    (window as any).__NATIVE_PRINT_SETUP = { getState: async () => ({ error: 'ERR' }) };
    mockDiag = nativeOk(['KITCHEN', 'COUNTER']);
    expect(byId(await runDeviceChecks(), 'bt_permission')).toBeDefined();
  });

  test('이 태블릿에 프린터가 하나도 없으면 «목록을 못 읽음» 이 아니라 «없음» 으로 실패 + 안드로이드 안내', async () => {
    (window as any).__NATIVE_PRINT_SETUP = { getState: async () => ({ net: [], bonded: [], btPermission: 'granted' }) };
    mockDiag = nativeOk([]);
    const pv = byId(await runDeviceChecks(), 'printers_visible');
    expect(pv.status).toBe('fail');
    expect(pv.cause).toBe('diag.check.printers_visible.noneAndroid');
    expect(pv.guide).toEqual(['diag.check.printers_visible.guideAndroid']);
  });

  test('앱 인쇄 연결이 안 되면 «인쇄 앱 설치» 가 아니라 «앱 다시 열기» 안내', async () => {
    (window as any).__NATIVE_PRINT_SETUP = { getState: async () => ({ net: [], bonded: [], btPermission: 'granted' }) };
    mockDiag = { ok: false, steps: [], summary: { lastError: 'x' } };
    expect(byId(await runDeviceChecks(), 'bridge_or_qz').guide).toEqual(['diag.check.bridge_or_qz.guideNative']);
  });

  test('윈도우 앱에는 블루투스 줄이 없고 안내도 그대로', async () => {
    setUA('Mozilla/5.0 (Windows NT 10.0; Win64; x64) Electron/30');
    mockDiag = nativeOk(['KITCHEN']);
    const checks = await runDeviceChecks();
    expect(byId(checks, 'bt_permission')).toBeUndefined();
    expect(byId(checks, 'printers_visible').guide).toEqual(['diag.check.printers_visible.guide']);
  });
});

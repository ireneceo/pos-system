/**
 * playApp — 안드로이드 앱(Play) 판별 · 막는 주소 목록 · 청구서 결제 판정 (2026-11-18 · Fable 설계 §6-3)
 */
import { isPlayApp, isPlayBlockedRoute, PLAY_BLOCKED_ROUTES, invoicePayableInApp, canPayInvoiceHere } from '../playApp';

const w = window as any;

beforeEach(() => {
  delete w.__PURPLE_DESKTOP;
  delete w.Capacitor;
  localStorage.clear();
});

describe('isPlayApp — 판별', () => {
  test('신호 없음 → 웹(false), 걸쇠도 안 생김', () => {
    expect(isPlayApp()).toBe(false);
    expect(localStorage.getItem('ph_android_app')).toBeNull();
  });
  test('브릿지 android → 앱 + 걸쇠 기록', () => {
    w.__PURPLE_DESKTOP = { isDesktop: true, platform: 'android' };
    expect(isPlayApp()).toBe(true);
    expect(localStorage.getItem('ph_android_app')).toBe('1');
  });
  test('Capacitor android → 앱', () => {
    w.Capacitor = { getPlatform: () => 'android' };
    expect(isPlayApp()).toBe(true);
  });
  test('Capacitor web(일반 브라우저에 런타임이 있어도) → 웹', () => {
    w.Capacitor = { getPlatform: () => 'web' };
    expect(isPlayApp()).toBe(false);
  });
  test('윈도우 앱(platform win32) → 웹과 같음 · 걸쇠 안 씀', () => {
    w.__PURPLE_DESKTOP = { isDesktop: true, platform: 'win32' };
    expect(isPlayApp()).toBe(false);
    expect(localStorage.getItem('ph_android_app')).toBeNull();
  });
  test('걸쇠만 있음(브릿지 붙기 전 두 번째 실행) → 앱', () => {
    localStorage.setItem('ph_android_app', '1');
    expect(isPlayApp()).toBe(true);
  });
});

describe('isPlayBlockedRoute — 막는 주소', () => {
  test.each([...PLAY_BLOCKED_ROUTES])('%s 와 그 하위 주소는 막힘', (r) => {
    expect(isPlayBlockedRoute(r)).toBe(true);
    expect(isPlayBlockedRoute(r + '/123')).toBe(true);
    expect(isPlayBlockedRoute(r + '?x=1')).toBe(true);
  });
  test('목록 12개 전부(11 + 매장 upgrade) 있음', () => {
    for (const r of ['/pos/brand/plans', '/pos/brand/general/subscriptions', '/pos/brand/payment-settings',
      '/pos/foodcourt/plans', '/pos/foodcourt/general/subscriptions', '/pos/foodcourt/payment-settings',
      '/pos/manager/plans', '/pos/manager/subscriptions', '/pricing', '/packages', '/signup']) {
      expect(isPlayBlockedRoute(r)).toBe(true);
    }
    expect(isPlayBlockedRoute('/restaurant/38/upgrade')).toBe(true);
    expect(isPlayBlockedRoute('/restaurant/:restaurantId/upgrade')).toBe(true);
  });
  test('비슷하지만 다른 주소·결제 본기능은 안 막힘', () => {
    for (const r of ['/pos/brand/plans-x', '/restaurant/38/upgradeX', '/restaurant/38/invoices', '/restaurant/38/pos-terminal',
      '/pos/brand/invoices', '/pos/owner/invoices', '/pos/supplier/payment-settings', '/pos/profile', '/pos/admin/plans',
      '/mobile/demo/menu', '/signup-x', '/', '']) {
      expect(isPlayBlockedRoute(r)).toBe(false);
    }
  });
});

describe('invoicePayableInApp — 앱에서 결제해도 되는 청구서', () => {
  test('실물 발주 청구서·정산서만', () => {
    expect(invoicePayableInApp({ invoiceCategory: 'trade' })).toBe(true);
    expect(invoicePayableInApp({ invoiceCategory: 'soa' })).toBe(true);
    for (const c of ['subscription', 'service', 'consulting', 'others', '']) {
      expect(invoicePayableInApp({ invoiceCategory: c })).toBe(false);
    }
  });
  test('칸 이름 셋 다 읽음 · 값 없으면 닫힘', () => {
    expect(invoicePayableInApp({ invoice_category: 'trade' })).toBe(true);
    expect(invoicePayableInApp({ category: 'soa' })).toBe(true);
    expect(invoicePayableInApp({})).toBe(false);
    expect(invoicePayableInApp(null)).toBe(false);
  });
  test('웹에서는 늘 결제 가능(지금 그대로)', () => {
    expect(canPayInvoiceHere(false, { invoiceCategory: 'subscription' })).toBe(true);
    expect(canPayInvoiceHere(false, null)).toBe(true);
    expect(canPayInvoiceHere(true, { invoiceCategory: 'subscription' })).toBe(false);
    expect(canPayInvoiceHere(true, { invoiceCategory: 'trade' })).toBe(true);
  });
});

describe('페이지 감시 — 브릿지가 늦게 붙어도 걸쇠·알림 (2026-11-18 에뮬 실측 보강)', () => {
  test('읽힌 뒤 1초 늦게 브릿지가 붙으면 걸쇠 기록 + ph-play-app 알림', async () => {
    let fired = 0;
    const on = () => { fired++; };
    window.addEventListener('ph-play-app', on);
    jest.isolateModules(() => { require('../playApp'); }); // 새로 읽힘 = 감시 시작(브릿지 없음)
    await new Promise((r) => setTimeout(r, 1000));
    expect(localStorage.getItem('ph_android_app')).toBeNull();
    w.__PURPLE_DESKTOP = { isDesktop: true, platform: 'android' };
    await new Promise((r) => setTimeout(r, 1200));
    expect(localStorage.getItem('ph_android_app')).toBe('1');
    expect(fired).toBeGreaterThanOrEqual(1);
    window.removeEventListener('ph-play-app', on);
  });
  test('윈도우 앱 브릿지는 감시가 무시', async () => {
    jest.isolateModules(() => { require('../playApp'); });
    w.__PURPLE_DESKTOP = { isDesktop: true, platform: 'win32' };
    await new Promise((r) => setTimeout(r, 1200));
    expect(localStorage.getItem('ph_android_app')).toBeNull();
  });
});

import { detectSetupDevice, SETUP_DEVICE_KEY } from './printDiagnostics';

// 2026-11-17 Irene 맥 크롬에서 «안드로이드 태블릿 · 웹브라우저» — 예전에 고른 값이 남아 있던 것
const setUA = (ua: string, touch = 0) => {
  Object.defineProperty(window.navigator, 'userAgent', { value: ua, configurable: true });
  Object.defineProperty(window.navigator, 'maxTouchPoints', { value: touch, configurable: true });
};
const MAC = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36';
const WIN = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36';
const LINUX = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36';

describe('detectSetupDevice — 골라 둔 기기', () => {
  beforeEach(() => localStorage.clear());
  it('맥(터치 없음)은 옛 «안드로이드» 선택을 버리고 PC 로 본다', () => {
    setUA(MAC); localStorage.setItem(SETUP_DEVICE_KEY, 'android-browser');
    const r = detectSetupDevice();
    expect(r.device).toBe('pc-browser'); expect(r.os).toBe('mac'); expect(r.overridable).toBe(false);
    expect(localStorage.getItem(SETUP_DEVICE_KEY)).toBeNull();
  });
  it('윈도우도 같다', () => {
    setUA(WIN); localStorage.setItem(SETUP_DEVICE_KEY, 'ipad-browser');
    expect(detectSetupDevice().device).toBe('pc-browser');
  });
  it('터치 있는 Mac(=아이패드)은 아이패드로 판정', () => {
    setUA(MAC, 5);
    expect(detectSetupDevice().device).toBe('ipad-browser');
  });
  it('Linux(데스크톱 모드 안드로이드일 수 있음)는 고른 값을 그대로 쓴다', () => {
    setUA(LINUX); localStorage.setItem(SETUP_DEVICE_KEY, 'android-browser');
    const r = detectSetupDevice();
    expect(r.device).toBe('android-browser'); expect(r.overridable).toBe(true);
  });
});

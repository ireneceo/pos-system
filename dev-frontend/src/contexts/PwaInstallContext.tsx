import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { isNativeDesktop } from '../utils/nativeDesktop';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface PwaInstallState {
  canInstall: boolean;            // beforeinstallprompt available (Android/Desktop Chromium)
  isStandalone: boolean;          // already running as installed PWA
  isIOS: boolean;
  iosVersion: number | null;
  isWindowsDesktop: boolean;      // Windows browser, NOT already inside the native app
  desktopAppUrl: string;          // native Windows installer download (same-origin)
  isAndroidBrowser: boolean;      // Android browser, NOT already inside the native app
  androidAppUrl: string;          // native Android APK download (same-origin, sideload)
  promptInstall: () => Promise<'accepted' | 'dismissed' | 'unavailable'>;
  dismissBanner: (days?: number) => void;
  shouldShowBanner: boolean;
  // ── 아래가 판정 단일 소스. 새 코드는 `platform` 만 본다(위 boolean 들은 호환용). ──
  platform: InstallPlatform;      // windows / android / ios / mac / other
  safariMajor: number | null;     // Mac 사파리 17+ = `파일 › Dock에 추가` 가능
  installGuideOpen: boolean;
  openInstallGuide: () => void;
  closeInstallGuide: () => void;
}

// The native Windows desktop app (Electron) replaces QZ Tray. On a Windows
// browser we offer it; when already running inside it, the preload sets
// window.__PURPLE_DESKTOP so we don't offer it again. Same-origin paths so they
// resolve on whichever host (dev/prod) is serving them.
//
// The installer version is NOT written here. It is read at runtime from
// /desktop/latest.yml — the same feed electron-updater consumes, so the CTA and
// the auto-updater can never disagree about which build is current. A hardcoded
// constant drifted before: it still said 0.1.6 after 0.1.7 shipped, so every new
// shop downloaded a superseded installer (2026-07-13).
const DESKTOP_FEED_URL = '/desktop/latest.yml';
// Always-latest alias (byte-identical copy of the newest installer, published
// alongside the versioned files). Used when the feed can't be read, so the button
// still serves the current build instead of 404ing or going stale.
const DESKTOP_APP_FALLBACK_URL = '/desktop/PurplePOS-Setup.exe';

// Versioned filename so the downloaded file itself shows the version
// (PurplePOS-Setup-0.1.7.exe) — the shop can verify which version they're
// installing before running it. (Irene 2026-07-09)
async function resolveDesktopAppUrl(): Promise<string | null> {
  try {
    const res = await fetch(DESKTOP_FEED_URL, { cache: 'no-store' });
    if (!res.ok) return null;
    const feed = await res.text();
    const file = feed.match(/^path:\s*(\S+)\s*$/m)?.[1];
    // Only ever hand the browser a filename the feed itself names, and only if it
    // looks like our installer — never build a URL out of unvalidated feed text.
    if (!file || !/^PurplePOS-Setup[\w.-]*\.exe$/.test(file)) return null;
    return `/desktop/${file}`;
  } catch {
    return null;
  }
}


// The native Android app (Capacitor) replaces the browser+QZ path on tablets:
// it injects window.__NATIVE_PRINT for LAN/Bluetooth printing that a plain Android
// browser can't do. A PWA on Android has no printer access → blank kitchen tickets,
// exactly like a Windows PWA — so an Android POS browser is steered to the native
// APK, never to the PWA. The APK's own bridge sets window.__PURPLE_DESKTOP
// (platform:'android'), so once installed isNativeDesktop() is true and we stop
// offering it. Sideload install (like Windows SmartScreen: "unknown source" once).
const ANDROID_APP_URL = '/desktop/PurplePOS.apk';


const PwaInstallContext = createContext<PwaInstallState | null>(null);

const DISMISS_KEY = 'pos.pwa-install.dismissed_until';

// ── 설치 플랫폼 판정 = **단일 소스** ─────────────────────────────────────────
// Irene 확정 정책(2026-09-03): 윈도우=데스크탑앱 / 안드로이드=APK / iPad·Mac=PWA.
//
// 왜 한 곳으로 모으나: 예전엔 `isIOS`·`isAndroidBrowser`·`isWindowsDesktop` 이 따로
// 계산돼, iPad 판정을 한 곳에서 틀리면 배너·사이드바·모달이 **서로 다르게** 굴었다.
// 실제 사고: iPadOS 13+ 사파리는 기본 UA 가 `Macintosh` 라 `/iPad/` 정규식이 false →
// 설치 버튼이 사라지거나 눌러도 아무 일이 없었다(2026-09-03 Irene 보고).
export type InstallPlatform = 'windows' | 'android' | 'ios' | 'mac' | 'other';

function detectPlatform(): InstallPlatform {
  if (typeof navigator === 'undefined' || typeof window === 'undefined') return 'other';
  if (isNativeDesktop()) return 'other';            // 이미 네이티브 앱 안 — 다시 권하지 않는다
  const ua = navigator.userAgent || '';
  const touch = (navigator as any).maxTouchPoints || 0;

  if (/Windows NT/.test(ua) && !/Windows Phone/.test(ua)) return 'windows';
  if (/Android/.test(ua) && !/Windows Phone/.test(ua)) return 'android';
  // iPhone/iPod 은 UA 에 그대로 나온다. **iPad 는 안 나올 수 있다** — 데스크톱 UA 를
  // 쓰면서 터치가 있는 Macintosh 는 iPad 다(맥은 maxTouchPoints 가 0).
  if (/iPhone|iPod/.test(ua) && !(window as any).MSStream) return 'ios';
  if (/iPad/.test(ua) && !(window as any).MSStream) return 'ios';
  if (/Macintosh/.test(ua) && touch > 1) return 'ios';
  if (/Macintosh|Mac OS X/.test(ua)) return 'mac';
  return 'other';
}

/** iOS 메이저 버전(푸시 지원 안내용). 데스크톱 UA 인 iPad 에서는 못 읽어 null. */
function detectIOSVersion(): number | null {
  if (typeof navigator === 'undefined') return null;
  const m = (navigator.userAgent || '').match(/OS (\d+)_/);
  return m ? parseInt(m[1], 10) : null;
}

/** Safari 메이저 버전. macOS 14(Sonoma)+ 의 사파리 17 부터 `파일 › Dock에 추가` 가 있다.
 *  macOS 버전은 UA 가 `10_15_7` 로 고정돼 못 쓰므로 **사파리 버전**으로 가른다. */
function detectSafariMajor(): number | null {
  if (typeof navigator === 'undefined') return null;
  const ua = navigator.userAgent || '';
  if (!/Safari/.test(ua) || /Chrome|Chromium|Edg\//.test(ua)) return null;   // 크로미움 계열 제외
  const m = ua.match(/Version\/(\d+)/);
  return m ? parseInt(m[1], 10) : null;
}

function isStandaloneNow(): boolean {
  if (typeof window === 'undefined') return false;
  const mq = window.matchMedia('(display-mode: standalone)').matches;
  // iOS Safari uses navigator.standalone
  return mq || (navigator as any).standalone === true;
}

export const PwaInstallProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = useState<boolean>(isStandaloneNow());
  // 판정은 한 번, 나머지는 전부 여기서 파생 — 세 곳이 따로 계산하다 갈라진 것이 사고 원인이었다.
  const [platform] = useState<InstallPlatform>(detectPlatform());
  const [safariMajor] = useState<number | null>(detectSafariMajor());
  const [iosVersion] = useState<number | null>(detectIOSVersion());
  const [installGuideOpen, setInstallGuideOpen] = useState(false);
  const isIOS = platform === 'ios';
  const isWindowsDesktop = platform === 'windows';
  const isAndroidBrowser = platform === 'android';
  // Starts on the always-latest alias so the button works on first paint, then
  // upgrades to the versioned filename the feed names.
  const [desktopAppUrl, setDesktopAppUrl] = useState<string>(DESKTOP_APP_FALLBACK_URL);

  useEffect(() => {
    if (!isWindowsDesktop) return;
    let cancelled = false;
    resolveDesktopAppUrl().then((url) => {
      if (!cancelled && url) setDesktopAppUrl(url);
    });
    return () => { cancelled = true; };
  }, [isWindowsDesktop]);

  useEffect(() => {
    const onBefore = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
    };
    const onInstalled = () => {
      setDeferred(null);
      setIsStandalone(true);
    };
    window.addEventListener('beforeinstallprompt', onBefore);
    window.addEventListener('appinstalled', onInstalled);
    const mq = window.matchMedia('(display-mode: standalone)');
    const onMq = () => setIsStandalone(mq.matches);
    mq.addEventListener?.('change', onMq);
    return () => {
      window.removeEventListener('beforeinstallprompt', onBefore);
      window.removeEventListener('appinstalled', onInstalled);
      mq.removeEventListener?.('change', onMq);
    };
  }, []);

  const promptInstall = useCallback(async (): Promise<'accepted' | 'dismissed' | 'unavailable'> => {
    // Windows browser (not already inside the native app): the CORRECT install is the
    // native Windows desktop app (.exe) — it has the print bridge. A PWA on Windows has
    // no printer access → blank tickets, so never steer a Windows POS to the PWA.
    // Download the installer instead of firing the browser's PWA prompt.
    // Android POS browser: same reasoning as Windows — the PWA can't reach the
    // kitchen printer, only the native APK can. Download the APK, don't fire the
    // browser's PWA prompt.
    if (isWindowsDesktop || isAndroidBrowser) {
      try {
        const a = document.createElement('a');
        a.href = isWindowsDesktop ? desktopAppUrl : ANDROID_APP_URL;
        a.download = '';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        return 'accepted';
      } catch { return 'unavailable'; }
    }
    if (!deferred) return 'unavailable';
    await deferred.prompt();
    const choice = await deferred.userChoice;
    setDeferred(null);
    return choice.outcome;
  }, [deferred, isWindowsDesktop, isAndroidBrowser, desktopAppUrl]);

  const [dismissedUntil, setDismissedUntil] = useState<number>(() => {
    try {
      const v = localStorage.getItem(DISMISS_KEY);
      return v ? parseInt(v, 10) : 0;
    } catch { return 0; }
  });

  const dismissBanner = useCallback((days = 3) => {
    const until = Date.now() + days * 24 * 3600 * 1000;
    try { localStorage.setItem(DISMISS_KEY, String(until)); } catch {}
    setDismissedUntil(until);
  }, []);

  const isDismissed = Date.now() < dismissedUntil;
  // Inside the native Windows desktop app (Electron sets __PURPLE_DESKTOP) the shop
  // already HAS the app — never offer a PWA install. Electron's Chromium still fires
  // beforeinstallprompt (and the window isn't display-mode:standalone), so without this
  // the "Install App" sidebar button + banner would wrongly appear and install a second,
  // print-bridge-less PWA copy (with MIN, 2026-07-08).
  const nativeApp = isNativeDesktop();
  // 설치 가능한 플랫폼이면 전부 — 예전엔 iOS 만 `/pos` 경로로 좁혀져 매장 화면에서 안 보였다.
  const shouldShowBanner = !isStandalone && !isDismissed && !nativeApp && (Boolean(deferred) || platform !== 'other');

  return (
    <PwaInstallContext.Provider value={{
      // Windows browser → offer the native app even if the PWA prompt never fired;
      // never inside the native app (already installed). Other OSes → PWA prompt.
      canInstall: !nativeApp && (Boolean(deferred) || isWindowsDesktop || isAndroidBrowser),
      isStandalone,
      isIOS,
      iosVersion,
      isWindowsDesktop,
      desktopAppUrl,
      isAndroidBrowser,
      androidAppUrl: ANDROID_APP_URL,
      promptInstall,
      dismissBanner,
      shouldShowBanner,
      platform,
      safariMajor,
      installGuideOpen,
      openInstallGuide: () => setInstallGuideOpen(true),
      closeInstallGuide: () => setInstallGuideOpen(false)
    }}>
      {children}
    </PwaInstallContext.Provider>
  );
};

export const usePwaInstall = () => {
  const ctx = useContext(PwaInstallContext);
  if (!ctx) throw new Error('usePwaInstall must be used inside PwaInstallProvider');
  return ctx;
};

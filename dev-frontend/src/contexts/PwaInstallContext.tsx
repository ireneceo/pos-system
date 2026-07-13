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
  promptInstall: () => Promise<'accepted' | 'dismissed' | 'unavailable'>;
  dismissBanner: (days?: number) => void;
  shouldShowBanner: boolean;
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

function detectWindowsDesktop(): boolean {
  if (typeof navigator === 'undefined' || typeof window === 'undefined') return false;
  const ua = navigator.userAgent || '';
  const isWin = /Windows NT/.test(ua) && !/Windows Phone/.test(ua);
  // Already inside the native app (preload sets window.__PURPLE_DESKTOP) →
  // never offer the installer again.
  return isWin && !isNativeDesktop();
}

const PwaInstallContext = createContext<PwaInstallState | null>(null);

const DISMISS_KEY = 'pos.pwa-install.dismissed_until';

function detectIOS(): { isIOS: boolean; version: number | null } {
  if (typeof navigator === 'undefined') return { isIOS: false, version: null };
  const ua = navigator.userAgent || '';
  const isIOS = /iPad|iPhone|iPod/.test(ua) && !(window as any).MSStream;
  if (!isIOS) return { isIOS: false, version: null };
  const m = ua.match(/OS (\d+)_/);
  return { isIOS: true, version: m ? parseInt(m[1], 10) : null };
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
  const [{ isIOS, version: iosVersion }] = useState(detectIOS());
  const [isWindowsDesktop] = useState(detectWindowsDesktop());
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
    if (isWindowsDesktop) {
      try {
        const a = document.createElement('a');
        a.href = desktopAppUrl;
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
  }, [deferred, isWindowsDesktop, desktopAppUrl]);

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
  const shouldShowBanner = !isStandalone && !isDismissed && !nativeApp && (Boolean(deferred) || isIOS || isWindowsDesktop);

  return (
    <PwaInstallContext.Provider value={{
      // Windows browser → offer the native app even if the PWA prompt never fired;
      // never inside the native app (already installed). Other OSes → PWA prompt.
      canInstall: !nativeApp && (Boolean(deferred) || isWindowsDesktop),
      isStandalone,
      isIOS,
      iosVersion,
      isWindowsDesktop,
      desktopAppUrl,
      promptInstall,
      dismissBanner,
      shouldShowBanner
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

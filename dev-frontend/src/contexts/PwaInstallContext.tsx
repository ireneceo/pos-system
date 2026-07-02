import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

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
// window.__PURPLE_DESKTOP so we don't offer it again. Same-origin path so it
// resolves on whichever host (dev/prod) is serving it.
const DESKTOP_APP_URL = '/desktop/PurplePOS-Setup.exe';

function detectWindowsDesktop(): boolean {
  if (typeof navigator === 'undefined' || typeof window === 'undefined') return false;
  const ua = navigator.userAgent || '';
  const isWin = /Windows NT/.test(ua) && !/Windows Phone/.test(ua);
  const insideNativeApp = Boolean((window as any).__PURPLE_DESKTOP);
  return isWin && !insideNativeApp;
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
    if (!deferred) return 'unavailable';
    await deferred.prompt();
    const choice = await deferred.userChoice;
    setDeferred(null);
    return choice.outcome;
  }, [deferred]);

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
  const shouldShowBanner = !isStandalone && !isDismissed && (Boolean(deferred) || isIOS || isWindowsDesktop);

  return (
    <PwaInstallContext.Provider value={{
      canInstall: Boolean(deferred),
      isStandalone,
      isIOS,
      iosVersion,
      isWindowsDesktop,
      desktopAppUrl: DESKTOP_APP_URL,
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

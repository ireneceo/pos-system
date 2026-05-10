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
  promptInstall: () => Promise<'accepted' | 'dismissed' | 'unavailable'>;
  dismissBanner: (days?: number) => void;
  shouldShowBanner: boolean;
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

  const dismissBanner = useCallback((days = 7) => {
    const until = Date.now() + days * 24 * 3600 * 1000;
    try { localStorage.setItem(DISMISS_KEY, String(until)); } catch {}
  }, []);

  const isDismissed = (() => {
    try {
      const v = localStorage.getItem(DISMISS_KEY);
      if (!v) return false;
      return Date.now() < parseInt(v, 10);
    } catch { return false; }
  })();

  const shouldShowBanner = !isStandalone && !isDismissed && (Boolean(deferred) || isIOS);

  return (
    <PwaInstallContext.Provider value={{
      canInstall: Boolean(deferred),
      isStandalone,
      isIOS,
      iosVersion,
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

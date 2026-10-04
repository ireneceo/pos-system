/**
 * 안드로이드 앱 업데이트 상태 훅 (Fable 설계 .claude/fable-design-20261004-android-update.md §4-2)
 * 배너와 설정 화면 줄이 같이 쓴다 — 모듈 스코프 메모로 피드는 60분에 한 번만 읽는다(Provider 추가 없음).
 * 앱 밖(브라우저)에서는 아무것도 하지 않는다(fetch 0회).
 */
import { useCallback, useEffect, useState } from 'react';
import {
  AndroidFeed, fetchAndroidFeed, isNewer, currentNativeVersion, isAndroidNativeApp,
  externalHandoffUrl, writeDismiss, isDismissed,
} from '../utils/nativeAppUpdate';

export type NativeUpdateStatus = 'idle' | 'checking' | 'up_to_date' | 'available' | 'installing' | 'handoff' | 'permission' | 'error';

let memo: { at: number; feed: AndroidFeed | null } | null = null;
let inflight: Promise<AndroidFeed | null> | null = null;
const TTL = 60 * 60 * 1000;

async function getFeed(force = false): Promise<AndroidFeed | null> {
  if (!force && memo && Date.now() - memo.at < TTL) return memo.feed;
  if (!inflight) {
    inflight = fetchAndroidFeed().then((f) => { memo = { at: Date.now(), feed: f }; return f; }).finally(() => { inflight = null; });
  }
  return inflight;
}

/** 브릿지가 버전을 비동기로 채운다 — 500ms × 10 회까지 기다린다 */
async function readCurrent(): Promise<{ versionName: string | null; versionCode: number | null }> {
  for (let i = 0; i < 10; i++) {
    const cur = currentNativeVersion();
    if (cur.versionName) return cur;
    await new Promise((r) => setTimeout(r, 500));
  }
  return currentNativeVersion();
}

export function useNativeAppUpdate() {
  const [feed, setFeed] = useState<AndroidFeed | null>(null);
  const [current, setCurrent] = useState<{ versionName: string | null; versionCode: number | null }>({ versionName: null, versionCode: null });
  const [status, setStatus] = useState<NativeUpdateStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const [dismissedTick, setDismissedTick] = useState(0);
  // 계산대 앱은 브릿지(__PURPLE_DESKTOP 등)를 «페이지가 다 열린 뒤» 끼워 넣는다(MainActivity onPageLoaded).
  //   화면이 그보다 먼저 그려지면 «앱 아님» 이 굳어 카드가 영영 안 뜬다 — 단말기 설정 화면과 같은 결함
  //   (2026-10-04 Irene 「업데이트 배너 안뜨는데」). 처음 10초는 다시 확인한다.
  const [inApp, setInApp] = useState<boolean>(() => isAndroidNativeApp());
  useEffect(() => {
    if (inApp) return;
    let tries = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      if (isAndroidNativeApp()) { setInApp(true); window.clearInterval(timer); }
      else if (tries >= 20) window.clearInterval(timer);   // 0.5초 × 20 = 10초
    }, 500);
    return () => window.clearInterval(timer);
  }, [inApp]);

  const check = useCallback(async (force = false) => {
    if (!isAndroidNativeApp()) return;
    setStatus((s) => (s === 'idle' ? 'checking' : s));
    const [f, cur] = await Promise.all([getFeed(force), readCurrent()]);
    setFeed(f);
    setCurrent(cur);
    setStatus((s) => (s === 'installing' || s === 'handoff' || s === 'permission' || s === 'error') ? s
      : (!f ? 'idle' : (isNewer(f, cur) ? 'available' : 'up_to_date')));
  }, []);

  useEffect(() => {
    if (!inApp) return;
    check();
    const timer = window.setInterval(() => check(true), TTL);
    const onVis = () => { if (document.visibilityState === 'visible') check(); };
    document.addEventListener('visibilitychange', onVis);
    return () => { window.clearInterval(timer); document.removeEventListener('visibilitychange', onVis); };
  }, [inApp, check]);

  const install = useCallback(async () => {
    if (!feed) return;
    setError(null);
    const native = (window as any).__NATIVE_UPDATE;
    if (native && typeof native.install === 'function') {
      // (A) 0.3.1 이후 — 앱이 직접 받아 sha256 확인 뒤 설치 시트
      setStatus('installing');
      try {
        const r = await native.install({ url: `${window.location.origin}/desktop/${feed.file}`, sha256: feed.sha256, size: feed.size });
        if (r && r.ok) { setStatus('available'); return; }
        if (r && r.error === 'NEEDS_INSTALL_PERMISSION') { setStatus('permission'); return; }
        setError(String(r?.error || 'INSTALL_FAILED')); setStatus('error');
      } catch (e: any) {
        setError(String(e?.message || 'INSTALL_FAILED')); setStatus('error');
      }
      return;
    }
    // (B) 0.2.0 / 0.3.0 — 앱 안 설치 코드가 없다. 시스템 브라우저로 넘긴다(딱 한 번)
    setStatus('handoff');
    window.location.assign(externalHandoffUrl(feed.file));
  }, [feed]);

  const dismiss = useCallback(() => {
    if (feed) writeDismiss(feed.versionName);
    setDismissedTick((n) => n + 1);
  }, [feed]);

  const dismissed = !!feed && isDismissed(feed) && dismissedTick >= 0;
  return { inApp, feed, current, status, error, install, dismiss, dismissed, recheck: () => check(true) };
}

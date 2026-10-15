/**
 * 안드로이드 앱 업데이트 상태 훅 (Fable 설계 .claude/fable-design-20261004-android-update.md §4-2)
 * 배너와 설정 화면 줄이 같이 쓴다 — 모듈 스코프 메모로 피드는 60분에 한 번만 읽는다(Provider 추가 없음).
 * 앱 밖(브라우저)에서는 아무것도 하지 않는다(fetch 0회).
 */
import { useCallback, useEffect, useState } from 'react';
import { useIsNativeShell } from './useNativeShell';
import {
  AndroidFeed, fetchAndroidFeed, isNewer, currentNativeVersion, isAndroidNativeApp,
  externalHandoffUrl, writeDismiss, isDismissed, installedFromPlay, PLAY_STORE_URL,
} from '../utils/nativeAppUpdate';

export type NativeUpdateStatus = 'idle' | 'checking' | 'up_to_date' | 'available' | 'installing' | 'handoff' | 'store' | 'permission' | 'error';

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
  // 계산대 앱은 브릿지를 «페이지가 다 열린 뒤» 끼워 넣는다 — 처음 10초 재확인은 useIsNativeShell 한 곳(2026-10-12 이동)
  //   (2026-10-04 Irene 「업데이트 배너 안뜨는데」 — 단말기 설정 화면과 같은 결함)
  const inApp = useIsNativeShell('android');

  const check = useCallback(async (force = false) => {
    if (!isAndroidNativeApp()) return;
    setStatus((s) => (s === 'idle' ? 'checking' : s));
    const [f, cur] = await Promise.all([getFeed(force), readCurrent()]);
    setFeed(f);
    setCurrent(cur);
    setStatus((s) => (s === 'installing' || s === 'handoff' || s === 'store' || s === 'permission' || s === 'error') ? s
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
    // (P) 0.4.0+ Play 설치본 — Play 정책상 Play 로만 업데이트(APK 를 받게 하지 않는다). 다른 host 라 Capacitor 가 Play 앱으로 넘긴다
    //     (Play 등록 설계 D3). Play 의 자동 업데이트가 보통 먼저 올리고, 이 카드는 «지금 올리기» 길.
    if (installedFromPlay()) {
      setStatus('store');
      window.location.assign(PLAY_STORE_URL);
      return;
    }
    const native = (window as any).__NATIVE_UPDATE;
    if (native && typeof native.install === 'function') {
      // (A) 0.3.1~0.3.4 사이드로드본 — 앱이 직접 받아 sha256 확인 뒤 설치 시트(0.4.0 에서 삭제된 플러그인 — 옛 앱만 탄다)
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
    // (B) 0.2.0 / 0.3.0 · 0.4.0+ 사이드로드본 — 앱 안 설치 코드가 없다. 시스템 브라우저로 넘긴다(딱 한 번)
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

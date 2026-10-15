/**
 * 계산대 앱(안드로이드·윈도우) 안인가 — 상태 훅 (2026-10-12 Play 등록 설계 §5)
 * 앱은 브릿지(__PURPLE_DESKTOP)를 «페이지가 다 열린 뒤» 끼워 넣는다(안드로이드 MainActivity onPageLoaded).
 * 화면이 그보다 먼저 그려지면 «앱 아님» 이 굳는다 → 처음 10초(0.5초 × 20회)는 다시 확인한다.
 * useNativeAppUpdate 의 같은 폴링을 여기로 옮겼다 — 두 벌 두지 않는다.
 */
import { useEffect, useState } from 'react';

export function isNativeShell(platform?: string): boolean {
  const desk = (window as any).__PURPLE_DESKTOP;
  if (!desk) return false;
  return platform ? desk.platform === platform : true;
}

export function useIsNativeShell(platform?: string): boolean {
  const [inApp, setInApp] = useState<boolean>(() => isNativeShell(platform));
  useEffect(() => {
    if (inApp) return;
    let tries = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      if (isNativeShell(platform)) { setInApp(true); window.clearInterval(timer); }
      else if (tries >= 20) window.clearInterval(timer);
    }, 500);
    return () => window.clearInterval(timer);
  }, [inApp, platform]);
  return inApp;
}

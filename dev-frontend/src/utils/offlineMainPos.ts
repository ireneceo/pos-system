/**
 * offlineMainPos — 오프라인 "메인 POS(허브) 1대" 기기 지정.
 *
 * 설계(Irene 확정 2026-06-29):
 * - 오프라인(인터넷 끊김) 동안에는 **매장이 설정에서 지정한 1대(메인 POS)에서만** 주문 접수·로컬 인쇄가 된다.
 * - 나머지 기기(보조 POS/태블릿)는 전체 잠금 안내로 막아 "되는 줄 알고 받았다가 어긋나는" 사고를 차단한다.
 * - 인쇄는 메인 POS 1대로 모두 모인다(= 기존 비상모드 라우팅 재사용). 인쇄 동작은 변경하지 않는다.
 *
 * 지정은 **기기(브라우저) 단위**라 localStorage 에 저장한다(DB 아님 — 같은 매장이라도 물리 기기마다 다름).
 * 토글은 매장 설정 화면에서 "이 기기를 오프라인 메인 POS로" 로 켠다(SettingsPage).
 */
import { useEffect, useState } from 'react';

const KEY = 'offline_main_pos';
const EVT = 'offline-main-pos-changed';

/** 이 기기가 오프라인 메인 POS(허브)로 지정돼 있나. */
export function isOfflineMainPos(): boolean {
  try {
    return localStorage.getItem(KEY) === '1';
  } catch {
    return false;
  }
}

/** 이 기기의 메인 POS 지정 on/off. 같은 탭 내 구독자에게 즉시 알림(이벤트). */
export function setOfflineMainPos(on: boolean): void {
  try {
    if (on) localStorage.setItem(KEY, '1');
    else localStorage.removeItem(KEY);
    window.dispatchEvent(new Event(EVT));
  } catch {
    /* localStorage 불가 환경 — 무시 */
  }
}

/** React 훅 — 메인 POS 지정 여부를 반응형으로 읽는다(같은 탭 이벤트 + 다른 탭 storage). */
export function useOfflineMainPos(): boolean {
  const [val, setVal] = useState<boolean>(() => isOfflineMainPos());
  useEffect(() => {
    const update = () => setVal(isOfflineMainPos());
    window.addEventListener(EVT, update);
    window.addEventListener('storage', update);
    return () => {
      window.removeEventListener(EVT, update);
      window.removeEventListener('storage', update);
    };
  }, []);
  return val;
}

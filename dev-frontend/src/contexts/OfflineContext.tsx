/**
 * OfflineContext — 오프라인 모드 1단계: 연결 상태 단일 판정.
 *
 * 설계: docs/OFFLINE_MODE_DESIGN.md §5 (감지). navigator.onLine 은 "라우터엔 붙었는데
 * 인터넷은 死" 인 경우 true 라 신뢰 불가 → /api/health 핑으로 서버 실제 도달을 판정한다.
 * 플래핑(깜빡임) 방지를 위해 연속 N회 실패해야 offline 으로 전환(히스테리시스).
 *
 * 1단계 범위 = 감지 + 상태 제공 + 배너. 큐/동기화/로컬인쇄는 다음 단계에서 이 컨텍스트 위에 얹는다.
 */
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import {
  noteProbeFailure, clearProbeFailures, hasOpenOfflineEvent, recordOfflineStart, recordOfflineEnd,
  flushOfflineEvents, type OfflineTrigger,
} from '../utils/offlineEvents';
import { msSinceServerSeen } from '../utils/serverSeen';
// 상대 '/api/*' 는 설치된 fetch 인터셉터(utils/httpClient)가 API_BASE_URL 로 자동 prefix 한다.

interface OfflineState {
  isOffline: boolean;       // 서버 도달 불가(오프라인)
  isReconnecting: boolean;  // 오프라인이었다가 복구 감지 → 동기화 단계(5단계에서 의미 확장)
  lastOnlineAt: number | null;
}

const OfflineCtx = createContext<OfflineState>({ isOffline: false, isReconnecting: false, lastOnlineAt: null });

export function useOffline(): OfflineState {
  return useContext(OfflineCtx);
}

const PING_PATH = '/api/health';
const PING_INTERVAL_MS = 8000;   // 8초마다 핑
// 2026-07-01 (Irene "온라인인데 갑자기 오프라인 배너+주문 가림"): degrade(기기잠금·주문가림)는 큰 동작이라
// 보수적으로. 짧은 wifi 블립/느린 health 응답에 넘어가지 않게 타임아웃·연속실패 기준을 늘린다.
// 2026-11-04 (§16-11, Irene «자꾸 오프라인이라고 끄는»): 운영 12건 판독 — 핑만 늦고 다른 응답은 오던 것·
// 깨어난 노트북이 핑 3개를 한꺼번에 보낸 것·화면 연 직후 내려받기에 묻힌 것을 «끊김» 으로 봤다.
// 새 규칙: 보이는 화면 · 화면 연 지 30초 지남 · 최근 40초 안 핑 3번 실패 · 서버 응답이 30초 넘게 하나도 없음 → 오프라인.
// 진짜 끊김 감지는 ~30초. 브라우저 offline 이벤트·navigator.onLine=false 는 지금처럼 즉시.
const PING_TIMEOUT_MS = 6000;    // 6초 내 응답 없으면 실패 (부하 시 느린 health 오탐 방지)
const FAIL_THRESHOLD = 3;        // 최근 FAIL_WINDOW_MS 안 실패 3번 → 오프라인 후보
const FAIL_WINDOW_MS = 40000;    // 실패는 시각으로 센다 — 잠들었다 깬 기기의 묵은 실패는 저절로 빠진다
const SERVER_SILENCE_MS = 30000; // 다른 API 응답이 이 안에 왔으면 끊긴 게 아니다
const STARTUP_GRACE_MS = 30000;  // 화면 연 직후 큰 내려받기가 핑을 밀어내는 동안은 판정 안 함

export const OfflineProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOffline, setIsOffline] = useState(false);
  const [isReconnecting, setIsReconnecting] = useState(false);
  const offlineRef = useRef(false);          // 콜백 내 최신값 참조용(effect 재생성 방지)
  const failAtRef = useRef<number[]>([]);    // 핑 실패 시각들(FAIL_WINDOW_MS 안만)
  const inFlightRef = useRef(false);         // 핑은 한 번에 하나 — interval·online·visibilitychange 가 겹쳐도
  const lastOnlineRef = useRef<number | null>(Date.now());

  useEffect(() => {
    let alive = true;
    // 마운트 뒤 첫 성공 핑: 오프라인 중 새로고침돼 열린 채 남은 기록을 'reload' 로 닫고, 못 보낸 기록을 다시 보낸다(§16-3·4).
    let openAtMount = hasOpenOfflineEvent();
    let firstOk = true;

    const goOffline = (trigger: OfflineTrigger) => {
      if (!alive || offlineRef.current) return;
      offlineRef.current = true;
      setIsOffline(true);
      recordOfflineStart(trigger);
    };
    const goOnline = () => {
      if (!alive) return;
      const was = offlineRef.current;
      offlineRef.current = false;
      failAtRef.current = [];
      lastOnlineRef.current = Date.now();
      if (was) {
        // 복구 순간(설계 §4-1) — SyncEngine 이 op 로그를 순서대로 서버에 재생(무손실·무중복).
        setIsReconnecting(true);
        import('../utils/offlineSync')
          .then(({ runSync }) => runSync())
          .catch(() => {})
          .finally(() => { if (alive) setIsReconnecting(false); });
        // 오프라인 «왜·언제» 기록을 닫아 서버로 — runSync 와 독립(기다리지 않는다).
        recordOfflineEnd('ping');
        flushOfflineEvents().catch(() => {});
      }
      setIsOffline(false);
    };

    // 화면이 숨어 있을 때(다른 탭·창 최소화·노트북 잠듦)는 핑 실패를 세기만 하고 잠그지 않는다 —
    // 브라우저가 숨은 탭의 타이머·네트워크를 늦춰 «시간 초과» 가 나는 것이지 서버가 끊긴 게 아니다
    // (2026-11-02 19:52 UTC 운영 기록: visibility=hidden · 3번 모두 timeout · 5초 뒤 저절로 복구).
    // 다시 보이면 곧바로 한 번 핑 — 실제로 끊겼으면(세어 둔 실패 + 이번 실패) 즉시 오프라인, 아니면 0으로.
    const isHidden = () => typeof document !== 'undefined' && document.visibilityState === 'hidden';
    const noteFail = () => {
      const now = Date.now();
      failAtRef.current = [...failAtRef.current, now].filter((t) => now - t <= FAIL_WINDOW_MS);
    };
    const maybeGoOffline = () => {
      if (failAtRef.current.length < FAIL_THRESHOLD) return;
      if (isHidden()) return;                                   // §16-10 숨은 화면은 못 믿는다
      if (performance.now() < STARTUP_GRACE_MS) return;         // 화면 연 직후 내려받기 유예
      if (msSinceServerSeen() < SERVER_SILENCE_MS) return;      // 다른 응답이 오고 있으면 끊긴 게 아니다
      goOffline('probe');
    };

    const ping = async () => {
      // 브라우저가 확실히 오프라인이라고 하면 핑 생략하고 즉시 오프라인.
      if (typeof navigator !== 'undefined' && navigator.onLine === false) {
        goOffline('navigator_offline');
        return;
      }
      if (inFlightRef.current) return;
      inFlightRef.current = true;
      const t0 = performance.now();
      try {
        const ctrl = new AbortController();
        const timer = setTimeout(() => ctrl.abort(), PING_TIMEOUT_MS);
        const res = await fetch(`${PING_PATH}?t=${Date.now()}`, {
          method: 'GET', signal: ctrl.signal, cache: 'no-store',
        });
        clearTimeout(timer);
        if (res.ok) {
          clearProbeFailures();
          if (firstOk) {
            firstOk = false;
            if (openAtMount) recordOfflineEnd('reload');
            flushOfflineEvents().catch(() => {}); // 보낼 것이 없으면 요청하지 않는다
          }
          failAtRef.current = []; goOnline();
        } else {
          noteProbeFailure({
            at: new Date().toISOString(), kind: 'http', status: res.status, ms: Math.round(performance.now() - t0),
            retryAfter: res.headers.get('Retry-After') ?? undefined,
            rlRemaining: res.headers.get('RateLimit-Remaining') ?? undefined,
          });
          noteFail(); maybeGoOffline();
        }
      } catch (e) {
        noteProbeFailure({
          at: new Date().toISOString(), kind: (e as Error)?.name === 'AbortError' ? 'timeout' : 'network',
          ms: Math.round(performance.now() - t0),
        });
        noteFail();
        maybeGoOffline();
      } finally {
        inFlightRef.current = false;
      }
    };

    ping();
    const iv = setInterval(ping, PING_INTERVAL_MS);
    const onOnlineEvt = () => ping();
    const onOfflineEvt = () => { goOffline('offline_event'); };
    window.addEventListener('online', onOnlineEvt);
    window.addEventListener('offline', onOfflineEvt);
    const onVisible = () => { if (!isHidden()) ping(); };
    document.addEventListener('visibilitychange', onVisible);

    return () => {
      alive = false;
      clearInterval(iv);
      window.removeEventListener('online', onOnlineEvt);
      window.removeEventListener('offline', onOfflineEvt);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, []);

  return (
    <OfflineCtx.Provider value={{ isOffline, isReconnecting, lastOnlineAt: lastOnlineRef.current }}>
      {children}
    </OfflineCtx.Provider>
  );
};

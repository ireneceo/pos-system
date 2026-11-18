/**
 * playApp — 안드로이드 계산대 앱(Purple POS · Google Play) 안인가, 그리고 앱 안에서 막을 «디지털 서비스 결제» 경로.
 *
 * 왜 있나 (2026-11-18 Irene 지시 · Fable 설계 /var/www/.claude/fable-design-20261118-play-billing-hide.md):
 *   앱은 Capacitor 로 웹(/pos)을 그대로 띄운다. Google Play 결제 정책상 앱 안에서 디지털 서비스(우리 구독 ·
 *   브랜드/푸드코트 플랜)를 Play 결제가 아닌 수단으로 팔거나, 그쪽으로 이끄는 버튼·링크·글을 두면 반려·정지 위험.
 *   → 앱 안에서는 그런 화면·버튼·글이 하나도 없다. 실물(손님 음식값 · 공급업체 발주 청구서)은 그대로.
 *
 * ⛔ 판별·목록·청구서 판정은 이 파일 한 곳. 복사하지 않는다(메뉴 숨김과 직접 주소 막기가 같이 읽는다).
 * ⛔ 모를 때는 «웹» — 웹 브라우저·윈도우 앱은 지금 그대로여야 한다.
 */
import { useEffect, useState } from 'react';
import { useIsNativeShell } from '../hooks/useNativeShell';

const LATCH_KEY = 'ph_android_app';

function liveSignal(): boolean {
  if (typeof window === 'undefined') return false;
  const w = window as any;
  if (w.__PURPLE_DESKTOP?.platform === 'android') return true;
  try {
    if (typeof w.Capacitor?.getPlatform === 'function' && w.Capacitor.getPlatform() === 'android') return true;
  } catch { /* 판정 못 함 = 아님 */ }
  return false;
}

function writeLatch(): void {
  try { localStorage.setItem(LATCH_KEY, '1'); } catch { /* 저장 불가 = 걸쇠 없이 */ }
}

/**
 * 동기 판정. 신호 셋 중 하나라도 참:
 *   ① 앱 브릿지 __PURPLE_DESKTOP.platform === 'android' (페이지가 다 뜬 뒤 붙는다)
 *   ② Capacitor 런타임 getPlatform() === 'android' (2026-11-18 에뮬 실측: 원격 페이지에는 window.Capacitor 가 없다 — 지금은 안 켜짐.
 *      앞으로 앱이 런타임을 넣으면 그때부터 쓰인다. 해 없음)
 *   ③ 걸쇠 localStorage ph_android_app — ①② 를 본 순간에만 쓴다. 앱 WebView 저장소는 브라우저와 따로라
 *      일반 브라우저에는 생길 수 없다. 두 번째 실행부터 첫 그림에서도 앱으로 안다.
 * Play 설치본·사이드로드본을 가르지 않는다(디버그 APK 로 검증한 것이 Play 판과 같게).
 */
export function isPlayApp(): boolean {
  if (liveSignal()) { writeLatch(); return true; }
  try { return localStorage.getItem(LATCH_KEY) === '1'; } catch { return false; }
}

/**
 * 페이지 감시 — 이 파일이 처음 읽힐 때(앱 첫 화면 = 로그인 화면 포함) 한 번 켠다.
 *   2026-11-18 에뮬 실측: 브릿지는 페이지가 다 뜬 뒤(약 13초) 붙는다. 화면 훅의 재확인(useIsNativeShell 10초)은
 *   화면이 일찍 그려지면 그 전에 끝나 «앱 아님» 이 굳을 수 있고, 로그인 화면에는 이 훅이 없어 첫 실행 걸쇠가 안 써졌다.
 *   → 2분까지 0.5초마다 보고, 보이면 걸쇠를 쓰고 'ph-play-app' 이벤트로 화면 훅에 알린다. 웹에서는 아무것도 안 쓴다.
 */
const PLAY_EVENT = 'ph-play-app';
if (typeof window !== 'undefined') {
  let tries = 0;
  const watch = () => {
    if (liveSignal()) { writeLatch(); try { window.dispatchEvent(new Event(PLAY_EVENT)); } catch { /* */ } return; }
    if (++tries < 240) window.setTimeout(watch, 500);
  };
  watch();
}

/** 화면용 — 브릿지가 늦게 붙어도 따라잡는다(위 페이지 감시의 알림 + useIsNativeShell 재확인). */
export function usePlayApp(): boolean {
  const shell = useIsNativeShell('android');
  const [signaled, setSignaled] = useState<boolean>(() => isPlayApp());
  useEffect(() => {
    if (signaled) return;
    const on = () => setSignaled(true);
    window.addEventListener(PLAY_EVENT, on);
    if (isPlayApp()) setSignaled(true); // 등록 전에 이미 붙었으면
    return () => window.removeEventListener(PLAY_EVENT, on);
  }, [signaled]);
  useEffect(() => { if (shell) writeLatch(); }, [shell]);
  return signaled || shell;
}

/**
 * 앱 안에서 통째로 막는 주소 (메뉴 숨김 = useAllowedRoutes · 직접 주소 = ProtectedRoute/PlayGate 가 같이 읽는다).
 * 접두 매칭 — 하위 주소 포함. `/pos/brand/plans-x` 같은 비슷한 주소는 안 막는다.
 */
export const PLAY_BLOCKED_ROUTES: readonly string[] = Object.freeze([
  '/pos/brand/plans',
  '/pos/brand/general/subscriptions',
  '/pos/brand/payment-settings',
  '/pos/foodcourt/plans',
  '/pos/foodcourt/general/subscriptions',
  '/pos/foodcourt/payment-settings',
  '/pos/manager/plans',
  '/pos/manager/subscriptions',
  '/pricing',
  '/packages',
  '/signup',
]);
const UPGRADE_RE = /^\/restaurant\/[^/]+\/upgrade(\/|$)/;

export function isPlayBlockedRoute(pathname: string): boolean {
  if (!pathname) return false;
  const p = pathname.split(/[?#]/)[0];
  if (UPGRADE_RE.test(p)) return true;
  return PLAY_BLOCKED_ROUTES.some((r) => p === r || p.startsWith(r + '/'));
}

/**
 * 앱 안에서 이 청구서를 결제해도 되는가 — 실물 발주 청구서(trade)·그 정산서(soa)만.
 * 우리 구독·서비스·컨설팅·브랜드 로열티 등은 화면이 실물인지 가를 수 없어 닫는다. 값이 없으면 닫는다.
 */
export function invoicePayableInApp(inv: { invoiceCategory?: string | null; invoice_category?: string | null; category?: string | null } | null | undefined): boolean {
  // 화면마다 칸 이름이 다르다 — 매장·오너 invoiceCategory · 서버 원본 invoice_category · services/invoiceService category
  const c = inv?.invoiceCategory ?? inv?.invoice_category ?? inv?.category ?? null;
  return c === 'trade' || c === 'soa';
}

/** 화면 판정 한 줄 — 웹이면 늘 참, 앱이면 invoicePayableInApp. */
export function canPayInvoiceHere(playApp: boolean, inv: Parameters<typeof invoicePayableInApp>[0]): boolean {
  return !playApp || invoicePayableInApp(inv);
}

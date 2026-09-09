// 키오스크 모드 — 매장에 놓인 태블릿에서 손님이 스스로 주문하는 형태.
//
// 설계 원칙: **주문 흐름을 두 벌 만들지 않는다.**
// 키오스크는 새 경로·새 페이지가 아니라 기존 모바일오더의 **표시 모드**다.
// (같은 개념에 새 경로를 만들면 갈라진다 — CLAUDE.md «기존 개념에 새 목록·경로를 만들지 않는다»)
// 따라서 주문 생성·결제·장바구니 로직은 무접촉이고, 바뀌는 것은 폭·터치타깃·세션 수명뿐이다.
//
// 켜는 법: 매장 태블릿 브라우저를 `/mobile/<slug>?kiosk=1` 로 한 번 열어두면
// 그 탭에서는 계속 유지된다(sessionStorage). 손님 폰(QR 스캔)은 영향 없음.
// 끄는 법: `?kiosk=0` 으로 열거나 탭을 닫는다.

const SS_KEY = 'mobile_kiosk_mode';

/** 이 탭이 키오스크인가. URL 플래그가 우선, 없으면 이 탭에 저장된 값. */
export function isKioskMode(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const p = new URLSearchParams(window.location.search).get('kiosk');
    if (p === '1' || p === 'true') { sessionStorage.setItem(SS_KEY, '1'); return true; }
    if (p === '0' || p === 'false') { sessionStorage.removeItem(SS_KEY); return false; }
    return sessionStorage.getItem(SS_KEY) === '1';
  } catch {
    return false;
  }
}

/**
 * 손님이 자리를 뜬 뒤 다음 손님이 앞사람 장바구니를 물려받지 않도록 하는 유휴 시간(ms).
 * 90초 = 메뉴를 훑는 손님은 안 끊기고, 떠난 자리는 다음 손님 전에 정리되는 실무 기준.
 */
export const KIOSK_IDLE_MS = 90_000;

/** 유휴 감시. 손님 조작이 없으면 onIdle 을 부른다. 정리 함수를 돌려준다. */
export function watchKioskIdle(onIdle: () => void, ms: number = KIOSK_IDLE_MS): () => void {
  if (typeof window === 'undefined') return () => {};
  let timer: ReturnType<typeof setTimeout>;
  const reset = () => {
    clearTimeout(timer);
    timer = setTimeout(onIdle, ms);
  };
  const events: (keyof WindowEventMap)[] = ['pointerdown', 'keydown', 'touchstart', 'wheel'];
  events.forEach(e => window.addEventListener(e, reset, { passive: true }));
  reset();
  return () => {
    clearTimeout(timer);
    events.forEach(e => window.removeEventListener(e, reset));
  };
}

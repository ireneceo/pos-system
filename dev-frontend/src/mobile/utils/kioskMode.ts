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

/**
 * 유휴 감시. 손님 조작이 없으면 onIdle 을 부른다. 정리 함수를 돌려준다.
 *
 * `onIdle` 이 **`false` 를 돌려주면 «지금은 안 된다»** 로 보고 타이머를 다시 건다.
 * (2026-09-10 Fable 게이트 F2) 그냥 건너뛰면 **다시는 울리지 않는다** — 결제 요청 중에 5분이 되어
 * 한 번 연기된 뒤 카드가 거절되고 손님이 떠나면, 앞사람 장바구니가 영구히 남는다.
 * 이번에 고치려던 바로 그 증상이다.
 */
export function watchKioskIdle(onIdle: () => void | boolean, ms: number = KIOSK_IDLE_MS): () => void {
  if (typeof window === 'undefined') return () => {};
  let timer: ReturnType<typeof setTimeout>;
  const fire = () => {
    if (onIdle() === false) reset();   // 연기 — 같은 간격으로 다시 건다
  };
  const reset = () => {
    clearTimeout(timer);
    timer = setTimeout(fire, ms);
  };
  const events: (keyof WindowEventMap)[] = ['pointerdown', 'keydown', 'touchstart', 'wheel'];
  events.forEach(e => window.addEventListener(e, reset, { passive: true }));
  reset();
  return () => {
    clearTimeout(timer);
    events.forEach(e => window.removeEventListener(e, reset));
  };
}

/**
 * 결제 화면의 유휴 시간(ms). 메뉴 화면(90초)보다 길다 — 카드를 꺼내고 지갑을 뒤지는 시간이다.
 *
 * 왜 결제 화면에도 감시가 필요한가 (2026-09-10 Fable):
 *   종전에는 `/payment` 에서 감시를 **아예 껐다**. 그래서 손님이 결제 직전에 마음을 바꿔 자리를 뜨면
 *   앞사람 장바구니가 결제 화면에 **영구히** 남고, 다음 손님이 그대로 결제할 수 있었다.
 */
export const KIOSK_PAYMENT_IDLE_MS = 5 * 60_000;

// 결제 요청이 이미 나갔는가 — 나갔으면 유휴 리셋을 하지 않는다(낸 돈의 주문을 잃지 않게).
const PAY_KEY = 'mobile_payment_in_flight';

export function setPaymentInFlight(inFlight: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    if (inFlight) sessionStorage.setItem(PAY_KEY, '1');
    else sessionStorage.removeItem(PAY_KEY);
  } catch { /* ignore */ }
}

export function isPaymentInFlight(): boolean {
  if (typeof window === 'undefined') return false;
  try { return sessionStorage.getItem(PAY_KEY) === '1'; } catch { return false; }
}

// ─────────────────────────────────────────────────────────────────────────────
// 메뉴판 모드 (2026-09-10 Irene) — **보여주기 전용**.
//
// Irene 원문: 「온라인메뉴 페이지 생성하게 해줘. 주문은 안되고 아무것도 데이터 정보 없고
//   메뉴판으로 보는 거야. 여기 저기 홍보할 때 쓰기 좋은 메뉴 보여주기. 그대로 주문만 빼도 되지.
//   옵션도 클릭만 안되고 뭐 있는지 나오면 되는 거니까.」
//
// 키오스크와 **같은 원칙**: 새 경로·새 페이지를 만들지 않는다. 기존 모바일오더의 표시 모드다.
//   (CLAUDE.md 「기존 개념에 새 목록·경로를 만들지 않는다」)
// 따라서 메뉴 조회 로직은 무접촉이고, 빠지는 것은 **담기·장바구니·주문·계정** 뿐이다.
//
// 켜는 법: `/mobile/<slug>?menu=1` — 홍보용으로 그대로 공유하는 주소다.
//   URL 로만 판정한다(탭에 저장하지 않는다) — 손님이 그 링크를 눌렀을 때만 메뉴판이고,
//   같은 브라우저로 나중에 QR 을 찍으면 **정상 주문 화면**이어야 하기 때문이다.
// ─────────────────────────────────────────────────────────────────────────────

/** 이 화면이 «보여주기 전용 메뉴판» 인가. */
export function isMenuBoardMode(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const p = new URLSearchParams(window.location.search).get('menu');
    return p === '1' || p === 'true';
  } catch {
    return false;
  }
}

/** 메뉴판 링크를 만든다 — 설정 화면이 홍보용으로 보여 준다. */
export function menuBoardUrl(origin: string, slug: string): string {
  return `${origin.replace(/\/$/, '')}/mobile/${slug}?menu=1`;
}

/**
 * 메뉴판 모드에서 화면을 옮길 때 **URL 표시를 이어 준다.**
 *
 * 왜: 모드는 URL(`?menu=1`)로만 판정한다(탭에 저장하지 않는다 — 나중에 QR 을 찍으면 정상 주문이어야
 * 하므로). 그래서 이동할 때 쿼리를 떨어뜨리면 **다음 화면이 일반 주문 화면으로 열린다.**
 * 2026-09-10 Fable 게이트가 실브라우저로 재현: 메뉴판에서 품목을 누르자 상세에 담기 버튼과
 * 장바구니·계정이 되살아났다. 홍보용 메뉴판에서 주문까지 갈 수 있었다.
 */
export function withMenuBoardQuery(path: string): string {
  if (!isMenuBoardMode()) return path;
  return path.includes('?') ? `${path}&menu=1` : `${path}?menu=1`;
}

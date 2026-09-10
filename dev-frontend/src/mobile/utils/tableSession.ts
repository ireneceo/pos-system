// Table-number session authority for mobile QR ordering.
//
// Problem (2026-06-29): the scanned table number lives in a SHARED localStorage
// key ('tableNumber'). A stale OrderTypePage tab (old table) can clobber it, so a
// fresh scan of table B sometimes submits as the old table A → wrong kitchen ticket.
//
// Fix = "scan is the absolute source":
//   - localStorage.tableNumber  → DURABLE store. Survives tab eviction so a resumed
//     checkout still has the table (keeps the 2026-06-12 fix: never submit null).
//   - sessionStorage.qrScanTable → PER-TAB authority. Holds THIS tab's actual scan;
//     another tab cannot overwrite it. Read with priority over localStorage so a
//     cross-tab clobber of localStorage can never change what THIS tab submits.
//
// Read order: sessionStorage (this tab's scan) → localStorage (durable fallback).
// See memory [[project_mobile_qr_table_reset]] / [[reference_mobile_order_session_storage]].

const LS_KEY = 'tableNumber';
const SS_KEY = 'qrScanTable';

// ⛔ 여기서 만료를 판단하지 않는다 (2026-09-10 Fable 게이트 F1).
//   읽기 도중 만료가 일어나면 localStorage 의 장바구니는 지워지는데 **React 상태 `cartItems` 는 살아 있다.**
//   4시간 넘게 열어 둔 탭에서 결제를 누르면 테이블은 null 인데 상태의 장바구니로 주문이 나가
//   테이블 없는 «pickup N» 이 된다 — 2026-06-12 결함이 그 경계에서 재현된다.
//   만료 판단은 **페이지 로드 시 provider 의 1회 sweep** 하나뿐이다(상태 초기화 전이라 셋이 함께 죽는다).
export function getActiveTable(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    const perTab = sessionStorage.getItem(SS_KEY);
    if (perTab) return perTab;
  } catch { /* sessionStorage unavailable — fall through */ }
  try {
    return localStorage.getItem(LS_KEY);
  } catch {
    return null;
  }
}

// Set the active table for THIS tab (scan or explicit pick). Writes both the durable
// localStorage value and the per-tab session authority so they stay in sync.
export function setActiveTable(value: string): void {
  if (typeof window === 'undefined' || !value) return;
  try { localStorage.setItem(LS_KEY, value); } catch { /* ignore */ }
  try { sessionStorage.setItem(SS_KEY, value); } catch { /* ignore */ }
  touchOrderSession();   // 쓰기 — 세션 시계를 다시 맞춘다
}

export function clearActiveTable(): void {
  if (typeof window === 'undefined') return;
  try { localStorage.removeItem(LS_KEY); } catch { /* ignore */ }
  try { sessionStorage.removeItem(SS_KEY); } catch { /* ignore */ }
}

// ─────────────────────────────────────────────────────────────────────────────
// 주문 세션 수명 (2026-09-10 Fable 판정 · Irene 승인)
//
// 문제 (Irene 신고): 「/mobile/with-min-cafe 에 테이블 지정 없이 들어갔는데 맨 위에 T001 이 뜬다」.
//   `localStorage.tableNumber` 를 지우는 곳이 사실상 없었다 — 주문을 마쳐도, 탭을 닫아도,
//   시간이 지나도 남는다. 표시만의 문제가 아니다: 대표 QR(테이블 없는 링크)로 들어온 손님에게
//   강제 테이블 선택이 **낡은 값으로 우회**되고, 결제 화면이 그 값으로 주문을 낸다
//   → 앉은 자리와 무관한 테이블로 주방티켓이 나간다.
//
// 왜 «주문 성공 후 삭제»가 아니라 시간인가:
//   - 삭제하면 +Round(추가 주문) 때 매번 다시 찍어야 하고, 2026-06-12 「탭이 날아가도
//     결제를 재개하면 테이블을 잃지 않는다」 규칙이 깨진다.
//   - 그 규칙의 진짜 결함은 «재개»에 **시간 제한이 없던 것**이다. 제한만 세운다.
//
// 규칙:
//   - 스탬프는 **쓰기에만** 갱신한다(테이블 지정 · 장바구니 변경 · 주문유형 변경).
//     읽기로는 갱신하지 않는다 — 낡은 방문이 스스로를 되살리지 못하게.
//   - 만료는 마지막 쓰기로부터 4시간. 만료되면 **테이블 · 장바구니 · 주문유형을 함께** 지운다.
//     셋을 따로 지우면 MobileOrderContext 의 불변식 «장바구니 살아있음 ⇒ 테이블 살아있음»이 깨진다.
//   - QR 스캔과 탭별 권위(`qrScanTable`)의 우선순위는 **그대로**다. 스캔은 언제나 이긴다.
//
// ⚠ 스탬프가 아예 없는 데이터(이 코드 이전에 저장된 것)는 마지막 쓰기 시각을 알 수 없다.
//    몇 달 전 것일 수도 있으므로 **만료로 본다** — 배포 직후 한 번 비워진다.
const STAMP_KEY = 'mobile_order_session_at';
const CART_KEY = 'mobile_cart';
const ORDER_TYPE_KEY = 'orderType';
export const ORDER_SESSION_TTL_MS = 4 * 60 * 60 * 1000;   // 4시간 — 한 끼 식사 최대치

/** 쓰기가 일어났다 — 세션 시계를 다시 맞춘다. */
export function touchOrderSession(): void {
  if (typeof window === 'undefined') return;
  try { localStorage.setItem(STAMP_KEY, String(Date.now())); } catch { /* ignore */ }
}

/** 마지막 쓰기로부터 TTL 이 지났는가. 남길 것이 아무것도 없으면 만료가 아니다(지울 게 없다). */
export function isOrderSessionExpired(now: number = Date.now()): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const hasData = !!(localStorage.getItem(LS_KEY) || localStorage.getItem(CART_KEY) || localStorage.getItem(ORDER_TYPE_KEY));
    if (!hasData) return false;
    const raw = localStorage.getItem(STAMP_KEY);
    if (!raw) return true;                       // 시각을 모르는 옛 데이터 → 만료로 본다
    const at = parseInt(raw, 10);
    if (!Number.isFinite(at)) return true;
    return now - at > ORDER_SESSION_TTL_MS;
  } catch {
    return false;                                // 저장소를 못 읽으면 지우지도 않는다
  }
}

/** 만료됐으면 테이블·장바구니·주문유형을 **함께** 지운다. 지웠으면 true. */
export function expireOrderSessionIfStale(now: number = Date.now()): boolean {
  if (!isOrderSessionExpired(now)) return false;
  clearActiveTable();
  try {
    localStorage.removeItem(CART_KEY);
    localStorage.removeItem(ORDER_TYPE_KEY);
    localStorage.removeItem(STAMP_KEY);
  } catch { /* ignore */ }
  return true;
}

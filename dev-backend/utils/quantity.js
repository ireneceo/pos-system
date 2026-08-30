/**
 * 수량 파싱 단일 유틸.
 *
 * 왜 있나 (2026-08-30):
 *   `min_order_quantity` 를 INT → DECIMAL(10,2) 로 넓혔다(measure 모드의 "최소 0.5kg").
 *   그런데 쓰기 경로 9곳이 전부 `parseInt(v, 10) || 1` 이었다 —
 *   **0.5 가 0 으로 잘리고 `|| 1` 이 1 로 되살려, 판매자가 0.5 로 등록해도 DB 에는 1 이 들어갔다.**
 *   컬럼만 넓히고 쓰기가 자르면 확폭은 장식이다. 실호출 왕복으로 재현·수정 확인했다
 *   (수정 전 0.5 → 1 저장 / 수정 후 0.5 → 0.5 저장).
 *
 *   ⛔ 새 쓰기 경로를 만들 때 `parseInt` 를 쓰지 말고 이 함수를 쓸 것.
 *      15곳이 각자 삼항식을 복붙하면 다음 사람이 16번째를 또 잘라 넣는다.
 *      전수 목록은 docs/PURCHASE_ORDER_SYSTEM.md §2-⑥.
 */

/**
 * 최소 주문 수량을 파싱한다. 소수를 보존하고, 값이 없거나 유효하지 않으면 fallback.
 *
 * 경계 (1-5 왕복 증명과 동일):
 *   '0.5' → 0.5 · '0.01' → 0.01 · '5' → 5
 *   '0' → fallback · '-1' → fallback · null/undefined/''/NaN/'abc' → fallback
 *
 * @param {*} v            원시 입력 (문자열·숫자·null 무엇이든)
 * @param {number} fallback 유효하지 않을 때 쓸 값 (기본 1 — 종전 `|| 1` 과 같은 의미)
 * @returns {number}
 */
function parseMinOrderQty(v, fallback = 1) {
  const n = parseFloat(v);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

module.exports = { parseMinOrderQty };

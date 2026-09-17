/**
 * 「무엇을 매출로 세는가」 — 단일 정의 (2026-09-17)
 *
 * 왜 한 파일인가
 *   같은 「매출」이라는 말로 화면마다 다른 숫자를 보여주고 있었다(운영 실측, 최근 60일):
 *     · 브랜드 퍼포먼스 : 완료+서빙                 2,936건 77,064.87
 *     · 브랜드 리포트   : 결제완료 OR 대기·준비중   3,112건 82,261.27  ← 취소 176건 5,196.40 포함
 *     · 구독 화면(BG·FG): 완료만                    2,934건 76,957.81
 *   정본은 이미 코드 여러 곳에 있었다 — `status IN ('completed','served')` + 삭제 제외
 *   (brands-core 프랜차이즈 지도 · foodcourts-core · restaurants-crud 대시보드 ·
 *    manager-sales · contracts). 어긋난 두 곳을 여기에 맞춘다.
 *
 * ⚠ 삭제된 주문을 반드시 뺀다 — 주문 삭제는 소프트 삭제라 'completed' 상태가 그대로 남는다.
 *    빼지 않으면 지운 주문이 계속 매출을 부풀린다.
 *
 * ⛔ 「진행중(pending·preparing·ready)」은 매출이 아니다. 「취소」도 아니다 —
 *    결제가 잡혔다가 취소된 주문이 운영에 실제로 있다(결제상태만 보면 매출로 샌다).
 */
const { Op } = require('sequelize');

/** 매출로 세는 주문 상태 */
const REVENUE_STATUSES = ['completed', 'served'];

/** 삭제되지 않은 주문 — is_deleted 가 NULL 인 옛 행도 살아 있는 것으로 본다 */
const NOT_DELETED = { [Op.or]: [{ is_deleted: false }, { is_deleted: null }] };

/** Sequelize where 조각 — `{ ...revenueOrderWhere() }` 로 펼쳐 쓴다 */
function revenueOrderWhere() {
  return { status: { [Op.in]: REVENUE_STATUSES }, ...NOT_DELETED };
}

/** 이미 읽어 온 주문 한 건이 매출인가 (목록을 손에 들고 거를 때) */
function isRevenueOrder(order) {
  if (!order) return false;
  const deleted = order.is_deleted === true || order.is_deleted === 1;
  return !deleted && REVENUE_STATUSES.includes(order.status);
}

module.exports = { REVENUE_STATUSES, NOT_DELETED, revenueOrderWhere, isRevenueOrder };

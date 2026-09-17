/**
 * 「무엇을 매출로 세는가」 — 화면 쪽 단일 정의 (2026-09-17)
 *
 * 서버 정의(`dev-backend/utils/revenueOrders.js`)와 **같은 값**이어야 한다.
 *   매출 = status 가 completed 또는 served · 삭제되지 않은 주문.
 *
 * 왜 생겼나 (운영 실측, 최근 60일)
 *   같은 「매출」을 화면마다 다르게 세고 있었다:
 *     · 브랜드 퍼포먼스 : 완료+서빙                2,936건 77,064.87
 *     · 브랜드 리포트   : 결제완료 OR 진행중       3,112건 82,261.27  ← **취소 176건 5,196.40 이 섞임**
 *     · 구독 화면       : 완료만                   2,934건 76,957.81
 *   취소된 주문에 결제상태가 completed 로 남는 경우가 실제로 있어서, 「결제됐으면 매출」로 세면 샌다.
 *
 * ⚠ 주문 수·이행률·시간대 같은 **활동** 지표는 매출 주문만 보면 안 된다
 *    (이행률 = 끝난 것 ÷ 전체 인데 분모가 매출 주문이면 늘 100% 가 된다).
 *    돈은 `isRevenueOrder`, 활동은 기간 안의 주문 전체를 쓴다.
 */

export interface RevenueOrderLike {
  status?: string | null;
  is_deleted?: boolean | number | null;
}

/** 매출로 세는 주문 상태 — 서버 REVENUE_STATUSES 와 같아야 한다 */
export const REVENUE_STATUSES = ['completed', 'served'] as const;

/** 소프트 삭제된 주문인가 — 삭제해도 상태는 'completed' 로 남는다 */
export const isDeletedOrder = (o: RevenueOrderLike): boolean =>
  o?.is_deleted === true || o?.is_deleted === 1;

/** 이 주문을 매출로 세는가 */
export const isRevenueOrder = (o: RevenueOrderLike): boolean =>
  !!o && !isDeletedOrder(o) && REVENUE_STATUSES.includes((o.status || '') as any);

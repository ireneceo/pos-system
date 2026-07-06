/**
 * suites/order-integrity.js — 주문·돈 무결성 불변식 (돈이 새는 클래스를 박제).
 *
 * "빌드 통과·API 200"을 다 지나도 유출되는 금액/결제/멱등 결함을 DB 불변식으로 감지한다.
 * 배경: 2026-07-06 모바일 중복주문(같은 카트 2회 저장) 수리 — 멱등키 유니크 + ER_DUP_ENTRY
 * catch 로 "1주문=1레코드"를 강제했다. 그 계약이 실제 데이터에서 유지되는지, 그리고 저장된
 * total 이 컴포넌트(소계/할인/세금/서비스차지)와 재구성 일치하는지를 여기서 상시 감시한다.
 *
 * 금액 공식(utils/orderTotals.js 와 동형):
 *   total = subtotal + takeaway - (discount + policyAmount + coupon)
 *           + serviceCharge + tax + deliveryFee - pointDiscount
 *
 * 창(window) 원칙: 소계/세금 컬럼이 뒤늦게 도입돼 과거 시드/임포트 배치는 컴포넌트가
 * 비어 total 과 재구성이 안 맞는다(예: 2026-06-02 데모배치 6% 세금이 total 엔 있고 tax 컬럼=0).
 * per-check baseline 은 실패한 체크를 통째로 뮤트하므로, 금액 재구성 검사는 과거 부채를
 * baseline 으로 삼는 대신 **최근 창(RECENT_CUTOFF 이후)만 검사**해 살아있는 게이트로 둔다.
 * 신규 주문은 항상 재구성 일치해야 하고(현재 최근 0건 불일치), 어긋나면 즉시 잡힌다.
 */

// 금액 재구성 검사 창: 이 날짜 이후 생성 주문만 검사(과거 데모/임포트 배치 제외).
// 롤링이 아닌 고정 컷오프 — 결정론적 실행(어느 시점에 돌려도 같은 결과) 보장.
const RECENT_CUTOFF = '2026-06-06';

// 저장 total 과 컴포넌트 재구성의 허용 오차: max(0.10, total 의 1%).
// 세금/서비스차지의 반올림 순서 차이(±0.05)를 흡수하되, 세금 누락(수 % 단위)은 잡는다.
const RECON_EXPR = `(o.subtotal + COALESCE(o.takeaway_charge,0) - COALESCE(o.discount,0)
  - COALESCE(o.discount_policy_amount,0) - COALESCE(o.coupon_discount,0)
  + COALESCE(o.service_charge,0) + COALESCE(o.tax,0) + COALESCE(o.delivery_fee,0)
  - COALESCE(o.point_discount,0))`;
const LIVE = `(o.is_deleted = 0 OR o.is_deleted IS NULL)`;

module.exports = {
  name: 'order-integrity',
  async run({ q }) {
    const checks = [];
    const add = (name, pass, detail) => checks.push({ name, pass, detail });
    const cnt = async (sql) => Number((await q(sql))[0].c);

    // O-INT-001: 최근 주문 금액 재구성 일치 (subtotal 이 실제 채워진 주문만, 최근 창).
    // 저장 total 이 컴포넌트 합과 어긋나면 = 세금/할인 누락·total 오염(돈 새는 근원).
    const reconMiss = await cnt(`SELECT COUNT(*) c FROM orders o
      WHERE ${LIVE} AND o.subtotal > 0 AND o.createdAt >= '${RECENT_CUTOFF}'
        AND ABS(o.total_amount - ${RECON_EXPR}) > GREATEST(0.10, o.total_amount * 0.01)`);
    add(`O-INT-001 최근 주문 금액 재구성 일치 (>=${RECENT_CUTOFF})`,
      reconMiss === 0, reconMiss ? `${reconMiss}건 total≠컴포넌트합 (세금/할인 누락 의심)` : '');

    // O-INT-002: 음수 금액 없음 — total/subtotal 이 음수면 환불/할인 계산 오류.
    const neg = await cnt(`SELECT COUNT(*) c FROM orders o WHERE ${LIVE}
      AND (o.total_amount < 0 OR o.subtotal < 0)`);
    add('O-INT-002 음수 금액 없음 (total/subtotal)',
      neg === 0, neg ? `${neg}건 음수` : '');

    // O-INT-003: 중복 idempotency_key 없음 — 멱등 유니크 인덱스의 실데이터 계약.
    // 2026-07-06 모바일 중복주문 수리의 핵심(같은 키 = 1주문). 2 이상이면 멱등 붕괴.
    const dupIdem = await cnt(`SELECT COUNT(*) c FROM (
      SELECT idempotency_key FROM orders WHERE idempotency_key IS NOT NULL
      GROUP BY idempotency_key HAVING COUNT(*) > 1) x`);
    add('O-INT-003 중복 idempotency_key 없음 (멱등 계약)',
      dupIdem === 0, dupIdem ? `${dupIdem}개 키가 2건+ 주문 (중복생성=멱등붕괴)` : '');

    // O-INT-004: 고아 결제 없음 — 존재하지 않는 주문을 가리키는 OrderPayment.
    const orphanPay = await cnt(`SELECT COUNT(*) c FROM order_payments op
      WHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.id = op.order_id)`);
    add('O-INT-004 고아 결제 없음 (삭제/부재 주문 참조)',
      orphanPay === 0, orphanPay ? `${orphanPay}건 대롱 결제` : '');

    // O-INT-005: 결제합 = total (비취소 주문). 결제기록이 있는데 합이 total 과 다르면
    // 미수/과수. 취소·환불은 부분결제가 정상이라 제외.
    const payMismatch = await cnt(`SELECT COUNT(*) c FROM (
      SELECT o.id FROM orders o JOIN order_payments op ON op.order_id = o.id
      WHERE ${LIVE} AND o.status NOT IN ('cancelled','voided','refunded')
      GROUP BY o.id, o.total_amount
      HAVING ABS(COALESCE(SUM(op.amount),0) - COALESCE(o.total_amount,0)) > 0.02) x`);
    add('O-INT-005 결제합 = total (비취소, 결제기록 있는 주문)',
      payMismatch === 0, payMismatch ? `${payMismatch}건 결제합≠total` : '');

    // O-INT-006: 완료/served 주문에 품목 존재 — 금액은 있는데 order_items 가 비면
    // 주방/영수증/정산에서 유령 매출.
    // 라이브 게이트화(Fable 지적): baseline 뮤트 대신 최근 창 + 테스트픽스처 제외로 신규만 감시.
    // 과거 부채 14건 = SEED-(rest5 시드스크립트 5) + IMP-(rest38 임포트 9, 전부 컷오프 이전).
    // per-check baseline 은 카운트 무관 뮤트라, 이 도메인도 O-INT-001 처럼 창으로 살려둔다.
    const emptyItems = await cnt(`SELECT COUNT(*) c FROM orders o WHERE ${LIVE}
      AND o.status IN ('completed','served') AND o.total_amount > 0
      AND (o.order_items IS NULL OR JSON_LENGTH(o.order_items) = 0)
      AND o.createdAt >= '${RECENT_CUTOFF}'
      AND (o.order_number IS NULL OR (o.order_number NOT LIKE 'SEED-%' AND o.order_number NOT LIKE 'IMP-%'))`);
    add(`O-INT-006 완료주문에 품목 존재 (매출=품목 무결, >=${RECENT_CUTOFF})`,
      emptyItems === 0, emptyItems ? `${emptyItems}건 품목없이 total>0 (유령매출)` : '');

    return checks;
  },
};

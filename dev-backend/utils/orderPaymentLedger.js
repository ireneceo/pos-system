// ════════════════════════════════════════════════════════════════════════════
// 결제 원장 일원화 (2026-07-31)
// ════════════════════════════════════════════════════════════════════════════
//
// **왜 있는가** — 결제 완료 경로가 4개인데 원장(`order_payments`)을 쓰는 건 1개뿐이었다.
//   ① POST /orders/:id/payments        → 원장 ✅ (분할·부분결제, 오프라인 재생. 이 파일 안 씀)
//   ② PATCH /orders/:id {payment_status:'completed'} → 원장 ❌ ← **매장 POS 의 지배적 경로**
//   ③ PayPal capture                    → 원장 ❌
//   ④ Stripe confirm                    → 원장 ❌
//   운영 실측(2026-07-31): 결제완료 3개월 5,904건인데 원장은 **전 기간 5행**, `amount_paid` 도 8개월 5건.
//
// **무엇이 문제였나** — 셋 다 "결제 시각"을 아무 데도 안 남긴다. ②는 감사로그마저 `actionType:'updated'`
//   라 `payment_received` 를 안 남기고, `orders.updatedAt` 은 이후 어떤 편집이든 덮어쓴다.
//   → 교대 마감(Cash-up)이 결제를 **접수 시각(order_date)** 으로 폴백 집계할 수밖에 없어,
//     교대 경계를 넘겨 수납한 돈이 접수한 교대로 잡힌다(운영 교대는 24~37일씩 열려 있다).
//
// **설계** — 호출부 3곳을 각각 패치하지 않고 **이 헬퍼 하나**를 부른다.
//   금액 = `total_amount − 기존 원장합` 이므로 부분수납 후 완납도 정확하고 이중 계상이 0이다.
//   `paid_at = now` 가 이 설계의 산출물(현재 어디에도 없는 값).
//
// **이중 계상이 왜 안 나는가** — 원장을 읽는 3곳이 전부 이미 "원장 있으면 원장, 없으면 주문" 폴백이다:
//   `cash-management.computeExpected`(원장 있는 주문은 폴백에서 제외) · `dashboard.js:936` ·
//   `mallSalesService:166`(행 합계 = total_amount 이므로 IOI Mall tender 값 **불변**).
//
// **백필 안 함** — 옛 주문엔 결제 시각이 존재하지 않아 `paid_at` 을 채우면 날조가 되고,
//   그 주문이 폴백→원장으로 옮겨가며 집계 값이 바뀐다. 쓰기 시작 + 자연 이관.
//
// 설계 전문: `docs/CASH_MANAGEMENT_SHIFT_CLOSE.md` §7 "📐 후속 설계 — 결제 원장 일원화"
// ════════════════════════════════════════════════════════════════════════════

const OrderPayment = require('../models/OrderPayment');
const { round2 } = require('./orderTotals');
const { isRetryableError } = require('./queryWrapper');

// 직원 계정 네임스페이스(r{rid}:username) 제거 — 영수증/원장에 내부 접두사가 새지 않게.
function stripNs(name) {
  const s = (name || '').toString().trim();
  const m = s.match(/^r\d+:(.+)$/);
  return (m ? m[1] : s) || null;
}

/**
 * 결제 완료 전이(→ payment_status='completed') 시 원장 1행을 남기고 amount_paid 를 채운다.
 *
 * **멱등** — `prevPaymentStatus` 가 이미 'completed' 면 아무것도 안 한다.
 *   중복 PATCH·재시도·소켓 재전송이 행을 늘리지 않는다.
 * **비치명** — 원장 기록이 실패해도 결제 자체를 막지 않는다(집계는 폴백이 그대로 커버).
 *   던지면 결제 트랜잭션이 통째로 롤백돼 "돈은 받았는데 주문은 미결제" 가 된다.
 *
 * @param {object} order   갱신이 끝난 Order 인스턴스 (payment_method/card_type 최종값 필요)
 * @param {object} ctx     { prevPaymentStatus, cashierId, cashierName, transactionId, source }
 * @param {object} [t]     같은 트랜잭션 (없으면 단독 커밋)
 * @returns {Promise<object|null>} 생성된 원장 행 (기록 안 했으면 null)
 */
async function recordOrderPayment(order, ctx = {}, t = null) {
  try {
    if (!order || String(order.payment_status) !== 'completed') return null;
    // 전이일 때만. 이미 completed 였던 주문에 대한 재호출은 no-op.
    if (String(ctx.prevPaymentStatus || '') === 'completed') return null;

    const total = round2(parseFloat(order.total_amount || 0));
    if (!(total > 0)) return null;

    const opts = t ? { transaction: t } : {};

    // 기존 원장합(분할결제로 이미 일부가 기록된 경우) → 잔액만 기록해 이중 계상 0.
    const existing = await OrderPayment.findAll({
      where: { order_id: order.id },
      attributes: ['amount'],
      raw: true,
      ...opts
    });
    const already = round2(existing.reduce((s, r) => s + (parseFloat(r.amount) || 0), 0));
    const amount = round2(total - already);
    if (amount <= 0.005) return null; // 이미 원장이 총액을 덮고 있음

    const receiptNumber = `${order.order_number || `ORD${order.id}`}-P${existing.length + 1}`;

    const row = await OrderPayment.create({
      order_id: order.id,
      restaurant_id: order.restaurant_id,
      amount,
      payment_method: order.payment_method || 'unknown',
      card_type: order.card_type || null,
      ewallet_type: order.ewallet_type || null,
      transaction_id: ctx.transactionId || order.transaction_id || null,
      items_paid: null,
      amount_received: null,   // 이 경로는 수납액/거스름을 받지 않는다(카운터 분할결제 경로만 기록)
      change_amount: null,
      receipt_number: receiptNumber,
      cashier_id: ctx.cashierId || null,
      cashier_name: stripNs(ctx.cashierName) || null,
      paid_at: new Date()      // ← 이 설계의 핵심 산출물
    }, opts);

    // amount_paid 동기화 — 지금까지 이 경로에선 결제완료여도 0 이라 서버가 잔액을 몰랐다.
    // payment_status 는 호출부가 이미 'completed' 로 만들었으므로 여기서 건드리지 않는다.
    const newPaid = round2(already + amount);
    if (round2(parseFloat(order.amount_paid || 0)) !== newPaid) {
      await order.update({ amount_paid: newPaid }, opts);
    }

    return row;
  } catch (e) {
    // ⚠️ 2026-07-31 (Fable P2) — 트랜잭션 안에서 **재시도 가능한** 에러(데드락·락타임아웃)를 삼키면
    //   tx 는 이미 죽어 있는데 호출부가 계속 진행하고, commit 이 "Transaction cannot be committed" 로
    //   터진다. 그 메시지는 isRetryableError 패턴에 안 걸려 `executeTransaction(maxRetries:3)` 이
    //   **무력화**되고 결제 PATCH 가 그냥 실패한다. → 다시 던져서 폐쇄 전체를 재시도시킨다.
    //   (재시도 시 롤백으로 원장도 초기화되므로 멱등은 유지된다.)
    if (t && isRetryableError(e)) throw e;
    // 그 외에는 비치명 — 결제를 막지 않는다. 집계는 주문 레벨 폴백이 그대로 커버한다.
    console.error('[orderPaymentLedger] 원장 기록 실패 (결제는 정상 처리됨):', e.message);
    return null;
  }
}

module.exports = { recordOrderPayment };

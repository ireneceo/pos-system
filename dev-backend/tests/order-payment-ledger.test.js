/**
 * order-payment-ledger.test.js
 *
 * 계약 박제 — 2026-07-31 "결제 원장 일원화".
 *
 * 배경: 결제 완료 경로 4개 중 원장(`order_payments`)을 쓰는 건 `POST /orders/:id/payments` 하나뿐이었다.
 * 매장 POS 의 지배적 경로(`PATCH /orders/:id {payment_status:'completed'}`)와 온라인결제 2경로가
 * 원장을 안 써서 **결제 시각이 어디에도 남지 않았다**(운영 실측: 결제완료 3개월 5,904건 vs 원장 전 기간 5행).
 *
 * 이 테스트가 지키는 계약:
 *   ① 결제 완료 "전이" 때만 원장 1행 (중복 PATCH 가 행을 늘리지 않는다)
 *   ② 금액 = total − 기존 원장합 (부분수납 후 완납도 정확)
 *   ③ **이중 계상 0** — 원장이 생겨도 마감 기대금액이 변하지 않는다(폴백↔원장 전환일 뿐)
 *   ④ staffMeal 은 원장 행이 생겨도 기대금액에 안 잡힌다(가짜 부족 = 직원 횡령 누명 방지)
 *   ⑤ 원장 기록 실패는 결제를 막지 않는다(비치명)
 */
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env'), quiet: true });
const { Order, OrderPayment } = require('../models');
const { Op } = require('sequelize');
const { sequelize } = require('../config/database');
const { recordOrderPayment } = require('../utils/orderPaymentLedger');
const { computeExpected } = require('../routes/cash-management')._internal;

// ⚠️ rid 38 을 쓰지 않는다 — `cashup-expected.test.js` 가 38 에서 `computeExpected` 의 before/after
//    **델타**를 재는데, jest 는 파일을 병렬로 돌린다. 같은 매장·같은 시간창에 주문을 만들면
//    서로의 델타를 오염시켜 **양쪽이 번갈아 실패하는 flaky 게이트**가 된다(2026-07-31 실제 발생).
//    집계 델타를 재는 스위트끼리는 매장으로 격리한다.
const RID = 39;              // dev 전용 매장 (cashup-expected 의 38 과 분리)
const TABLE = 'JLD';         // table_number 는 짧은 컬럼
const created = [];

async function makeOrder({ method = 'cash', amount = 100, paymentStatus = 'completed', cardType = null }) {
  const o = await Order.create({
    restaurant_id: RID,
    order_number: `JLDG-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    order_type: 'dine_in',
    table_number: TABLE,
    order_date: new Date(),
    status: 'completed',
    payment_status: paymentStatus,
    payment_method: method,
    card_type: cardType,
    subtotal: amount,
    total_amount: amount,
    is_deleted: false,
    order_items: JSON.stringify([{ name: 'jest', quantity: 1, price: amount, total_price: amount }]),
  });
  created.push(o.id);
  return o;
}

const rows = (orderId) => OrderPayment.findAll({ where: { order_id: orderId }, raw: true });

describe('결제 원장 일원화 (2026-07-31)', () => {
  let start;
  beforeAll(() => { start = new Date(Date.now() - 60 * 1000); });

  afterAll(async () => {
    for (const id of created) {
      await OrderPayment.destroy({ where: { order_id: id } }).catch(() => {});
      await sequelize.query('DELETE FROM orders WHERE id = :id', { replacements: { id } }).catch(() => {});
    }
    const left = await Order.count({ where: { table_number: TABLE } });
    expect(left).toBe(0); // 테스트가 데이터를 남기지 않는다
  });

  test('① 결제 완료 전이 → 원장 1행 + amount_paid + paid_at(결제 시각)', async () => {
    const o = await makeOrder({ method: 'cash', amount: 80 });
    const t0 = Date.now();
    await recordOrderPayment(o, { prevPaymentStatus: 'pending', cashierId: null, cashierName: 'r38:jest' });

    const r = await rows(o.id);
    expect(r).toHaveLength(1);
    expect(Number(r[0].amount)).toBe(80);
    expect(r[0].payment_method).toBe('cash');
    expect(r[0].cashier_name).toBe('jest');           // r38: 네임스페이스 제거
    expect(new Date(r[0].paid_at).getTime()).toBeGreaterThanOrEqual(t0 - 5000);
    await o.reload();
    expect(Number(o.amount_paid)).toBe(80);
  });

  test('② 이미 completed 였으면 no-op — 중복 PATCH 가 행을 늘리지 않는다 (멱등)', async () => {
    const o = await makeOrder({ method: 'card', cardType: 'visa', amount: 50 });
    await recordOrderPayment(o, { prevPaymentStatus: 'pending' });
    expect(await rows(o.id)).toHaveLength(1);

    // 같은 주문에 재호출 3회 (재시도·소켓 재전송·중복 PATCH 시뮬)
    await recordOrderPayment(o, { prevPaymentStatus: 'completed' });
    await recordOrderPayment(o, { prevPaymentStatus: 'completed' });
    await recordOrderPayment(o, { prevPaymentStatus: 'completed' });
    expect(await rows(o.id)).toHaveLength(1);
  });

  test('②-b 🔴 결제완료 주문의 총액이 나중에 커져도 유령 결제를 만들지 않는다', async () => {
    // 실제 위험: 이미 결제완료된 주문에 품목이 추가돼 total 이 오른 뒤 아무 PATCH 나 들어오면,
    // 전이 가드가 없으면 "차액만큼 받은 것처럼" 원장 행이 생긴다 = **아무도 받지 않은 돈**이
    // 마감 기대금액에 잡혀 직원에게 부족(횡령 누명)이 난다.
    // (금액 상한만으로는 이걸 못 막는다 — 차액이 양수라서. 전이 가드가 유일한 방어다.)
    const o = await makeOrder({ method: 'cash', amount: 100 });
    await recordOrderPayment(o, { prevPaymentStatus: 'pending' });
    expect(await rows(o.id)).toHaveLength(1);

    await o.update({ total_amount: 150 });               // 라운드 추가로 총액 상승
    await recordOrderPayment(o, { prevPaymentStatus: 'completed' });  // 이미 completed → no-op 이어야

    const r = await rows(o.id);
    expect(r).toHaveLength(1);
    expect(r.reduce((s, x) => s + Number(x.amount), 0)).toBe(100);   // 유령 50 없음
  });

  test('③ 부분수납 후 완납 → 잔액만 기록 (원장합 = 총액, 초과 기록 0)', async () => {
    const o = await makeOrder({ method: 'cash', amount: 100, paymentStatus: 'partial' });
    // 분할결제 경로가 이미 60 을 남긴 상태
    await OrderPayment.create({ order_id: o.id, restaurant_id: RID, amount: 60, payment_method: 'cash', paid_at: new Date() });
    await o.update({ payment_status: 'completed', amount_paid: 60 });

    await recordOrderPayment(o, { prevPaymentStatus: 'partial' });
    const r = await rows(o.id);
    expect(r).toHaveLength(2);
    const sum = r.reduce((s, x) => s + Number(x.amount), 0);
    expect(Math.round(sum * 100) / 100).toBe(100);   // 총액 초과 기록 없음
    await o.reload();
    expect(Number(o.amount_paid)).toBe(100);
  });

  test('③-b 원장이 이미 총액을 덮고 있으면 기록하지 않는다', async () => {
    const o = await makeOrder({ method: 'cash', amount: 40 });
    await OrderPayment.create({ order_id: o.id, restaurant_id: RID, amount: 40, payment_method: 'cash', paid_at: new Date() });
    const res = await recordOrderPayment(o, { prevPaymentStatus: 'partial' });
    expect(res).toBeNull();
    expect(await rows(o.id)).toHaveLength(1);
  });

  test('④ 미결제 주문에는 기록하지 않는다', async () => {
    const o = await makeOrder({ method: 'cash', amount: 70, paymentStatus: 'pending' });
    const res = await recordOrderPayment(o, { prevPaymentStatus: 'pending' });
    expect(res).toBeNull();
    expect(await rows(o.id)).toHaveLength(0);
  });

  test('⑤ 🔴 이중 계상 반증 — 원장이 생겨도 마감 기대금액이 변하지 않는다', async () => {
    const o = await makeOrder({ method: 'cash', amount: 123.45 });
    // 원장 없이 = 주문 폴백으로 잡히는 상태
    const before = await computeExpected(RID, start, new Date());

    await recordOrderPayment(o, { prevPaymentStatus: 'pending' });
    // 원장이 생기면 폴백에서 빠지고 원장으로 잡힌다 → 합계는 동일해야 한다
    const after = await computeExpected(RID, start, new Date());

    expect(Math.round(after.cash * 100) / 100).toBe(Math.round(before.cash * 100) / 100);
  });

  test('⑥ staffMeal 은 원장 행이 생겨도 기대금액에 안 잡힌다 (가짜 부족 방지)', async () => {
    const before = await computeExpected(RID, start, new Date());
    const o = await makeOrder({ method: 'staffMeal', amount: 55 });
    await recordOrderPayment(o, { prevPaymentStatus: 'pending' });
    expect(await rows(o.id)).toHaveLength(1);          // 원장에는 남는다(실제 일어난 일)

    const after = await computeExpected(RID, start, new Date());
    expect(after.other.staffmeal).toBeUndefined();
    expect(after.other.staffMeal).toBeUndefined();
    expect(Math.round(after.cash * 100) / 100).toBe(Math.round(before.cash * 100) / 100);
  });

  test('⑧ 🔴 온라인 결제 동시 이중 호출 → 원장 1행 (Fable P1 회귀)', async () => {
    // PayPal capture / Stripe confirm 의 진입부 가드(`payment_status === 'completed'` → 400)는
    // 두 요청이 **동시에** 통과할 수 있다. 게이트웨이 API 왕복(수백 ms)이 가드~기록 사이에 있어
    // 창이 넓고, 둘 다 prev='pending' 을 읽으면 전액 원장이 2행 생긴다(= 매출·마감 2배 오집계).
    // 방어 = DB 조건부 UPDATE 로 승자를 1명만 만드는 원자적 claim. 아래는 라우트와 동일한 패턴.
    const o = await makeOrder({ method: 'online', amount: 90, paymentStatus: 'pending' });

    // ⚠️ 두 호출은 **서로 다른 transaction_id** 를 들고 온다 — 실제 재시도/이중 capture 가 그렇다.
    //    이게 결정적이다: 같은 값이면 MySQL 이 "변경 0행"을 돌려줘 우연히 막히지만,
    //    값이 다르면 조건 없는 UPDATE 는 둘 다 1행을 바꿔 **원장 2행**이 된다.
    //    (2026-07-31: 이 구분을 안 하면 고장주입이 통과해 테스트가 claim 을 검증하지 못한다.)
    const claimAndRecord = async (txid) => {
      const [claimed] = await Order.update(
        { payment_status: 'completed', payment_method: 'online', transaction_id: txid },
        { where: { id: o.id, payment_status: { [Op.ne]: 'completed' } } }
      );
      if (claimed !== 1) return 'lost';
      const fresh = await Order.findByPk(o.id);
      await recordOrderPayment(fresh, { prevPaymentStatus: 'pending', cashierName: 'Customer', transactionId: txid });
      return 'won';
    };

    const results = await Promise.all([claimAndRecord('CAP_A'), claimAndRecord('CAP_B')]);
    expect(results.filter(r => r === 'won')).toHaveLength(1);   // 승자 정확히 1명

    const r = await rows(o.id);
    expect(r).toHaveLength(1);
    expect(Number(r[0].amount)).toBe(90);                        // 전액 ×2 아님
  });

  test('⑦ 원장 기록 실패는 결제를 막지 않는다 (비치명)', async () => {
    const broken = { id: -1, restaurant_id: RID, payment_status: 'completed', total_amount: 10, order_number: 'X',
      update: async () => { throw new Error('should not reach'); } };
    // order_id = -1 → FK 위반. 던지지 않고 null 을 돌려줘야 한다.
    await expect(recordOrderPayment(broken, { prevPaymentStatus: 'pending' })).resolves.toBeNull();
  });
});

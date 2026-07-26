/**
 * cashup-expected.test.js
 *
 * 회귀 박제 — 2026-07-26 "마감 기대금액이 항상 0" 결함.
 *
 * 사고 경로: 교대 마감(Cash-up)의 기대현금·기대카드·기대이월렛은 `computeExpected` 가 만든다.
 * 예전 구현은 **OrderPayment(결제 원장)만** 합산했는데, 매장 POS 의 실제 결제 완료는
 * `PATCH /api/orders/:id {payment_status:'completed'}` 로 **주문 행에만** 기록되고 원장을 남기지 않는다.
 * 운영 실측(2026-07-26): 최근 7일 결제완료 408건 중 원장 **0행**(전 기간 5행).
 * → 마감을 닫는 순간 기대금액이 전부 0 → 세어 넣은 현금 전액이 "초과"로 표시된다.
 * (운영에서 아직 마감을 닫은 매장이 없어 사고는 나지 않았다 — cash_reconciliations 0건)
 *
 * 이 테스트가 통과하는 한, 주문 행에만 기록된 결제도 기대금액에 반드시 잡힌다.
 */
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env'), quiet: true });
const { Order, OrderPayment } = require('../models');
const { sequelize } = require('../config/database');
const { computeExpected } = require('../routes/cash-management')._internal;

const RID = 38;                    // dev 데모 매장
const TABLE = 'JCU';   // table_number 는 짧은 컬럼(길면 'Data too long')
const created = [];

async function makeOrder({ method, cardType = null, amount, status = 'completed', cancelled = false, deleted = false }) {
  const o = await Order.create({
    restaurant_id: RID,
    order_number: `JEST-${Date.now()}-${Math.floor(amount * 100)}`,
    order_type: 'dine_in',
    table_number: TABLE,
    order_date: new Date(),
    status: cancelled ? 'cancelled' : 'completed',
    payment_status: status,
    payment_method: method,
    card_type: cardType,
    subtotal: amount,
    total_amount: amount,
    is_deleted: deleted,
    order_items: JSON.stringify([{ name: 'jest', quantity: 1, price: amount, total_price: amount }]),
  });
  created.push(o.id);
  return o;
}

describe('마감 기대금액 — 주문 행에만 기록된 결제도 잡힌다 (2026-07-26 회귀)', () => {
  let start;

  beforeAll(async () => {
    start = new Date(Date.now() - 60 * 1000); // 창 시작 = 1분 전
  });

  afterAll(async () => {
    for (const id of created) {
      await OrderPayment.destroy({ where: { order_id: id } }).catch(() => {});
      await sequelize.query('DELETE FROM orders WHERE id = :id', { replacements: { id } }).catch(() => {});
    }
    const left = await Order.count({ where: { table_number: TABLE } });
    expect(left).toBe(0); // 테스트가 데이터를 남기지 않는다
  });

  test('현금·카드·이월렛이 결제수단별로 집계된다 (원장 행 없이)', async () => {
    await makeOrder({ method: 'cash', amount: 30 });
    await makeOrder({ method: 'card', cardType: 'visa', amount: 20 });
    await makeOrder({ method: 'ewallet', amount: 10 });

    const e = await computeExpected(RID, start, new Date());
    expect(e.cash).toBeGreaterThanOrEqual(30);
    expect(e.card.visa).toBeGreaterThanOrEqual(20);
    expect(e.other.ewallet).toBeGreaterThanOrEqual(10);
  });

  test('취소·삭제 주문은 제외된다 (가짜 부족 = 직원 횡령 누명 방지)', async () => {
    const before = await computeExpected(RID, start, new Date());
    await makeOrder({ method: 'cash', amount: 500, cancelled: true });
    await makeOrder({ method: 'cash', amount: 700, deleted: true });
    const after = await computeExpected(RID, start, new Date());
    expect(after.cash).toBe(before.cash);
  });

  test('미결제(pending) 주문은 잡히지 않는다', async () => {
    const before = await computeExpected(RID, start, new Date());
    await makeOrder({ method: 'cash', amount: 900, status: 'pending' });
    const after = await computeExpected(RID, start, new Date());
    expect(after.cash).toBe(before.cash);
  });

  test('staffMeal(직원식)은 제외된다 — 받은 돈이 아니라 가짜 부족을 만든다', async () => {
    const before = await computeExpected(RID, start, new Date());
    await makeOrder({ method: 'staffMeal', amount: 45 });
    const after = await computeExpected(RID, start, new Date());
    expect(after.other.staffmeal).toBeUndefined();
    expect(after.cash).toBe(before.cash);
  });

  test('원장(OrderPayment)이 있는 주문은 원장 기준 — 이중 계상 없음', async () => {
    const before = await computeExpected(RID, start, new Date());
    // 분할결제처럼 원장이 있는 주문: 주문 총액 100, 원장은 현금 60 + 카드 40
    const o = await makeOrder({ method: 'cash', amount: 100 });
    await OrderPayment.create({ order_id: o.id, restaurant_id: RID, amount: 60, payment_method: 'cash', paid_at: new Date() });
    await OrderPayment.create({ order_id: o.id, restaurant_id: RID, amount: 40, payment_method: 'card', card_type: 'master', paid_at: new Date() });

    const after = await computeExpected(RID, start, new Date());
    // 현금은 +60 만 (주문 총액 100 이 아니라) — 주문 폴백이 원장 있는 주문을 다시 세면 +100 이 된다
    expect(Math.round((after.cash - before.cash) * 100) / 100).toBe(60);
    expect(Math.round(((after.card.master || 0) - (before.card.master || 0)) * 100) / 100).toBe(40);
  });
});

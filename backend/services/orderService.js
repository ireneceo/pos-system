const db = require('../db');
const inventoryService = require('./inventoryService');
const paymentService = require('./paymentService');
const pickupService = require('./pickupService');

async function createOrder(orderData, transaction) {
  // 1. 재고 차감
  await inventoryService.reduceStock(orderData.items, transaction);

  // 2. 주문 생성
  const order = await db.orders.create(orderData, transaction);

  // 3. 결제 처리
  const payment = await paymentService.process(orderData.payment, transaction);

  // 4. 픽업 번호 발급
  const pickupNumber = await pickupService.generate(order.id, transaction);

  return { order, payment, pickupNumber };
}

module.exports = { createOrder };
const Order = require('../models/Order');

async function createOrder(orderData, transaction) {
  try {
    // 주문 생성
    const order = await Order.create(orderData, { transaction });

    // 픽업 번호 생성 (간단한 구현)
    const pickupNumber = String(Date.now()).slice(-4);

    return {
      order,
      pickupNumber,
      payment: { status: 'pending' }
    };
  } catch (error) {
    console.error('Order creation failed:', error);
    throw error;
  }
}

module.exports = { createOrder };
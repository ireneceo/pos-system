const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

// Split bill / partial payment 추적.
// 1 order → N payments. Toast/Square POS 표준 모델.
// 영수증 단위 = 1 OrderPayment.
const OrderPayment = sequelize.define('OrderPayment', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  order_id: {
    type: DataTypes.INTEGER, allowNull: false,
    references: { model: 'orders', key: 'id' }
  },
  restaurant_id: {
    type: DataTypes.INTEGER, allowNull: false,
    references: { model: 'restaurants', key: 'id' }
  },
  // 이번 결제로 받은 금액 (split 의 일부분).
  amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  payment_method: { type: DataTypes.STRING(50), allowNull: false }, // cash, card, mobile, qrpay, etc.
  card_type: { type: DataTypes.STRING(50), allowNull: true },        // visa, master, amex
  ewallet_type: { type: DataTypes.STRING(20), allowNull: true },     // tng, grabpay, boost, shopeepay, duitnow, other (2026-07-23 IOI Mall)
  transaction_id: { type: DataTypes.STRING(255), allowNull: true },  // Stripe PI / PayPal capture id
  // Split bill — 어떤 아이템을 이 결제로 처리했는지 추적 (영수증/audit).
  // null = 전체 주문 결제. 배열 = items 단위 split.
  items_paid: { type: DataTypes.JSON, allowNull: true },
  // 현금 결제: 받은 금액 + 거스름돈
  amount_received: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
  change_amount: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
  // 영수증 번호 (split 시 separate receipt)
  receipt_number: { type: DataTypes.STRING(50), allowNull: true },
  // 결제 처리자
  cashier_id: { type: DataTypes.INTEGER, allowNull: true },
  cashier_name: { type: DataTypes.STRING(150), allowNull: true },
  paid_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, allowNull: false }
}, {
  tableName: 'order_payments',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  underscored: true,
  indexes: [
    { fields: ['order_id', 'paid_at'] },
    { fields: ['restaurant_id', 'paid_at'] }
  ]
});

module.exports = OrderPayment;

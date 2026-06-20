const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

// 결제수단 사전등록(Cash-up 편의) — 매장이 마감 대조에 항상 노출할 수단을 미리 정의.
// 미설정 시 order_payments 의 실제 사용 수단을 동적 집계(기존 동작). 사전등록이 있으면
// 매출 0인 수단도 카운트 항목으로 노출(예: 아직 카드 결제 없어도 'Card · Visa' 표시).
// docs/CASH_MANAGEMENT_SHIFT_CLOSE.md §3 PaymentMethodSetting.
const PaymentMethodSetting = sequelize.define('PaymentMethodSetting', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  restaurant_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'restaurants', key: 'id' } },
  // 집계 키 — cash 는 'cash', 카드는 'card:visa' 식, 기타는 'other:ewallet' 식 (reconcile 키와 일치).
  method_key: { type: DataTypes.STRING(64), allowNull: false },
  label: { type: DataTypes.STRING(100), allowNull: false },
  type: { type: DataTypes.ENUM('cash', 'card', 'ewallet', 'other'), allowNull: false, defaultValue: 'other' },
  sort_order: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  enabled: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true }
}, {
  tableName: 'payment_method_settings',
  timestamps: true,
  underscored: true,
  indexes: [
    { fields: ['restaurant_id', 'method_key'], unique: true, name: 'pms_restaurant_method' }
  ]
});

module.exports = PaymentMethodSetting;

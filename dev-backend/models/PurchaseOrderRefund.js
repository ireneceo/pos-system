const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

/**
 * 발주 환불 기록 (2026-11-23 · 설계 .claude/fable-design-20261123-seller-order-cancel-edit-refund.md §4-3)
 *   결제된 주문의 반품을 승인하면 «돌려줄 돈» 이 생긴다. 낸 청구서·정산서는 건드리지 않고 여기 한 줄로 적는다.
 *   status: pending(판매자가 줘야 함) → sent(판매자가 보냈다고 적음) → confirmed(구매자가 받았다고 적음).
 *   구매자 «못 받았음» = pending 으로 되돌리고 history 에 남긴다. 돈은 시스템 밖에서 오간다(기록만).
 */
const PurchaseOrderRefund = sequelize.define('PurchaseOrderRefund', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  purchase_order_id: { type: DataTypes.INTEGER, allowNull: false },
  amount: { type: DataTypes.DECIMAL(12, 2), allowNull: false, defaultValue: 0 },
  currency: { type: DataTypes.STRING(10), allowNull: true },
  status: { type: DataTypes.STRING(16), allowNull: false, defaultValue: 'pending', comment: "'pending' | 'sent' | 'confirmed'" },
  method: { type: DataTypes.STRING(20), allowNull: true, comment: '판매자가 보낸 방법 bank_transfer | cash | other' },
  reference: { type: DataTypes.STRING(100), allowNull: true },
  note: { type: DataTypes.TEXT, allowNull: true },
  sent_at: { type: DataTypes.DATE, allowNull: true },
  sent_by_user_id: { type: DataTypes.INTEGER, allowNull: true },
  confirmed_at: { type: DataTypes.DATE, allowNull: true },
  confirmed_by_user_id: { type: DataTypes.INTEGER, allowNull: true },
  received_method: { type: DataTypes.STRING(20), allowNull: true, comment: '구매자가 받은 방법 bank_transfer | cash | other' },
  cash_movement_id: { type: DataTypes.INTEGER, allowNull: true, comment: '현금으로 받아 드로어에 넣은 줄' },
  history: { type: DataTypes.JSON, allowNull: true }
}, {
  tableName: 'purchase_order_refunds',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [{ fields: ['purchase_order_id', 'status'] }]
});

module.exports = PurchaseOrderRefund;

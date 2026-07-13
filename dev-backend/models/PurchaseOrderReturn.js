const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const PurchaseOrderReturn = sequelize.define('PurchaseOrderReturn', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  purchase_order_id: { type: DataTypes.INTEGER, allowNull: false },
  purchase_order_item_id: { type: DataTypes.INTEGER, allowNull: false },
  // 발주 라인은 두 모양이다: 매장/푸드코트 = ingredient_id · BG 본사 = product_ingredient_id.
  // 예전엔 ingredient_id 가 NOT NULL 이라 BG 구매자 반품이 500 으로 죽었다. (Fable 2026-07-13)
  ingredient_id: { type: DataTypes.INTEGER, allowNull: true },
  product_ingredient_id: { type: DataTypes.INTEGER, allowNull: true, comment: 'BG 재고아이템 라인 반품 (ingredient_id 와 둘 중 하나)' },
  quantity: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  unit: { type: DataTypes.STRING(50), allowNull: true },
  unit_price: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
  reason: { type: DataTypes.TEXT, allowNull: true },
  status: {
    type: DataTypes.ENUM('requested', 'approved', 'rejected'),
    allowNull: false, defaultValue: 'requested'
  },
  requested_by_user_id: { type: DataTypes.INTEGER, allowNull: false },
  approved_by_user_id: { type: DataTypes.INTEGER, allowNull: true },
  rejected_by_user_id: { type: DataTypes.INTEGER, allowNull: true },
  resolved_at: { type: DataTypes.DATE, allowNull: true },
  rejection_reason: { type: DataTypes.TEXT, allowNull: true },
  credit_invoice_id: { type: DataTypes.INTEGER, allowNull: true, comment: 'Auto-issued Credit Note Invoice on approve' },

  // Sprint 7
  auto_generated: {
    type: DataTypes.BOOLEAN,
    allowNull: false, defaultValue: false,
    comment: 'Sprint 7: receive 시 damaged/wrong_item으로 자동 생성된 returns'
  },
  source_event: {
    type: DataTypes.ENUM('manual', 'receive_damage', 'receive_wrong_item'),
    allowNull: false, defaultValue: 'manual',
    comment: 'Sprint 7: 어떤 이벤트로 생성되었는가'
  }
}, {
  tableName: 'purchase_order_returns',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    { fields: ['purchase_order_id'] },
    { fields: ['status'] },
    { fields: ['purchase_order_id', 'status'] }
  ]
});

module.exports = PurchaseOrderReturn;

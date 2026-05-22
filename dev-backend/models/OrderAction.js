const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

// Order Action History — 모든 주문 단계 이동 + 액션 audit trail.
// 특히 주문 취소 시 어느 단계에서 누가 했는지 추적 (operational/legal accountability).
// 자세한 사양은 docs/ORDER_MANAGEMENT_IMPROVEMENTS.md § 7 참조.
const OrderAction = sequelize.define('OrderAction', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  order_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'orders', key: 'id' }
  },
  restaurant_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'restaurants', key: 'id' }
  },
  action_type: {
    type: DataTypes.ENUM(
      'created', 'status_change',
      'item_added', 'item_removed', 'item_modified',
      'payment_received', 'payment_method_changed', 'payment_refunded',
      'discount_applied', 'discount_removed',
      'coupon_applied', 'coupon_removed',
      'cancelled', 'printed', 'reprinted',
      'merged', 'note_added'
    ),
    allowNull: false
  },
  from_status: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  to_status: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  performed_by_id: {
    type: DataTypes.INTEGER,
    allowNull: true,            // customer / system 액션은 null
    references: { model: 'users', key: 'id' }
  },
  performed_by_name: {
    type: DataTypes.STRING(150),
    allowNull: false,           // snapshot — 직원 삭제 후에도 보존
    defaultValue: 'System'
  },
  performed_by_role: {
    type: DataTypes.ENUM('admin', 'staff', 'customer', 'system'),
    allowNull: false,
    defaultValue: 'system'
  },
  source: {
    type: DataTypes.ENUM('pos', 'kds', 'mobile', 'admin', 'api', 'auto', 'scheduler'),
    allowNull: false,
    defaultValue: 'api'
  },
  reason: {
    type: DataTypes.TEXT,
    allowNull: true              // cancelled 시 필수 (service layer 가드)
  },
  metadata: {
    type: DataTypes.JSON,
    allowNull: true
  }
}, {
  tableName: 'order_actions',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,              // immutable audit log — update 금지
  underscored: true,
  indexes: [
    { fields: ['order_id', 'created_at'] },
    { fields: ['restaurant_id', 'created_at'] },
    { fields: ['action_type', 'created_at'] },
    { fields: ['performed_by_id'] }
  ]
});

module.exports = OrderAction;

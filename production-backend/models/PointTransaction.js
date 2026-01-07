const { DataTypes, Model } = require('sequelize');
const database = require('../config/database');

class PointTransaction extends Model {}

PointTransaction.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  restaurant_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '레스토랑 ID'
  },
  customer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '고객 ID'
  },
  order_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: '연결된 주문 ID (적립/사용 시)'
  },

  type: {
    type: DataTypes.ENUM('earn', 'use', 'expire', 'adjust', 'welcome', 'refund'),
    allowNull: false,
    comment: '거래 유형'
  },
  points: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '변동 포인트 (+적립/-사용)'
  },
  balance_after: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '거래 후 잔액'
  },

  description: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: '거래 설명'
  },
  bonus_rate: {
    type: DataTypes.DECIMAL(3, 2),
    defaultValue: 1.00,
    comment: '적용된 보너스 배수'
  },

  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'created_at'
  }
}, {
  sequelize: database.sequelize,
  modelName: 'PointTransaction',
  tableName: 'point_transactions',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
  indexes: [
    {
      fields: ['restaurant_id', 'customer_id'],
      name: 'idx_restaurant_customer'
    },
    {
      fields: ['customer_id'],
      name: 'idx_customer'
    },
    {
      fields: ['order_id'],
      name: 'idx_order'
    },
    {
      fields: ['type'],
      name: 'idx_type'
    },
    {
      fields: ['created_at'],
      name: 'idx_created'
    }
  ]
});

module.exports = PointTransaction;

const { DataTypes, Model } = require('sequelize');
const database = require('../config/database');

class RestaurantCustomer extends Model {}

RestaurantCustomer.init({
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
  points: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    comment: '레스토랑별 포인트'
  },
  total_orders: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    comment: '레스토랑별 총 주문 횟수'
  },
  total_spent: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00,
    comment: '레스토랑별 총 지출 금액'
  },
  loyalty_tier: {
    type: DataTypes.ENUM('Bronze', 'Silver', 'Gold', 'VIP'),
    defaultValue: 'Bronze',
    comment: '로열티 등급'
  },
  first_order_at: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: '첫 주문 일시'
  },
  last_order_at: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: '마지막 주문 일시'
  },
  points_expiring: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    comment: '곧 만료될 포인트'
  },
  points_expiry_date: {
    type: DataTypes.DATEONLY,
    allowNull: true,
    comment: '포인트 만료 예정일'
  },
  reservation_count: { type: DataTypes.INTEGER, defaultValue: 0, comment: '누적 예약 수' },
  no_show_count: { type: DataTypes.INTEGER, defaultValue: 0, comment: '누적 노쇼 수 — block_after_count 정책 기준' },
  last_reservation_at: { type: DataTypes.DATE, allowNull: true },
  allergies: { type: DataTypes.TEXT, allowNull: true, comment: '알레르기 정보 (예약 시 매장에 공유)' },
  birthday: { type: DataTypes.DATEONLY, allowNull: true },
  vip_notes: { type: DataTypes.TEXT, allowNull: true, comment: '매장이 작성하는 VIP 메모' },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'created_at'
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'updated_at'
  }
}, {
  sequelize: database.sequelize,
  modelName: 'RestaurantCustomer',
  tableName: 'restaurant_customers',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      unique: true,
      fields: ['restaurant_id', 'customer_id'],
      name: 'unique_restaurant_customer'
    },
    {
      fields: ['restaurant_id']
    },
    {
      fields: ['customer_id']
    },
    {
      fields: ['loyalty_tier']
    }
  ]
});

module.exports = RestaurantCustomer;

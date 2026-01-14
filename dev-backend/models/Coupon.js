const { DataTypes, Model } = require('sequelize');
const database = require('../config/database');

class Coupon extends Model {}

Coupon.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  restaurant_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: 'Restaurant this coupon belongs to'
  },
  code: {
    type: DataTypes.STRING(50),
    allowNull: false,
    comment: 'Coupon code (e.g., SAVE10, WELCOME)'
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: true,
    comment: 'Display name for the coupon'
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: 'Description of the coupon'
  },
  type: {
    type: DataTypes.ENUM('percentage', 'fixed'),
    allowNull: false,
    comment: 'Discount type: percentage (%) or fixed amount'
  },
  value: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    comment: 'Discount value (percentage or fixed amount)'
  },
  min_order: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    defaultValue: 0,
    comment: 'Minimum order amount required'
  },
  max_discount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    comment: 'Maximum discount amount (for percentage type)'
  },
  usage_limit: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Total usage limit (null = unlimited)'
  },
  usage_count: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: 'Current usage count'
  },
  per_user_limit: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Usage limit per customer (null = unlimited)'
  },
  valid_from: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'Start date of validity'
  },
  valid_until: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'End date of validity'
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
    comment: 'Whether the coupon is active'
  },
  applicable_order_types: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'JSON array of applicable order types (dine_in, takeaway, delivery, pickup)',
    get() {
      const value = this.getDataValue('applicable_order_types');
      return value ? JSON.parse(value) : null;
    },
    set(value) {
      this.setDataValue('applicable_order_types', value ? JSON.stringify(value) : null);
    }
  }
}, {
  sequelize: database.sequelize,
  modelName: 'Coupon',
  tableName: 'coupons',
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['restaurant_id', 'code']
    }
  ]
});

module.exports = Coupon;

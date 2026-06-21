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
  },
  target_type: {
    type: DataTypes.ENUM('all', 'customers', 'tiers'),
    allowNull: false,
    defaultValue: 'all',
    comment: 'Target audience: all customers, specific customers, or loyalty tiers'
  },
  target_customer_ids: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'JSON array of specific customer IDs (for target_type=customers)',
    get() {
      const value = this.getDataValue('target_customer_ids');
      return value ? JSON.parse(value) : null;
    },
    set(value) {
      this.setDataValue('target_customer_ids', value ? JSON.stringify(value) : null);
    }
  },
  target_loyalty_tiers: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'JSON array of loyalty tier names (for target_type=tiers)',
    get() {
      const value = this.getDataValue('target_loyalty_tiers');
      return value ? JSON.parse(value) : null;
    },
    set(value) {
      this.setDataValue('target_loyalty_tiers', value ? JSON.stringify(value) : null);
    }
  },
  // 다매장 타게팅(scope) — FG/BG "전 매장 / 선택 매장" 발행. 쿠폰은 매장당 1행으로 materialize 되고
  // 아래 컬럼은 형제 행 묶음 관리용. NULL = 매장관리자가 만든 단일매장 쿠폰(영향 없음). migrate-coupon-scope.js
  scope_group_id: {
    type: DataTypes.STRING(40),
    allowNull: true,
    comment: 'Groups sibling coupon rows created together for multi-restaurant targeting'
  },
  scope_owner_type: {
    type: DataTypes.ENUM('brand', 'foodcourt'),
    allowNull: true,
    comment: 'Issuer scope owner type (Brand General / Foodcourt General)'
  },
  scope_owner_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'brand_id or foodcourt_id of the issuer'
  },
  scope_mode: {
    type: DataTypes.ENUM('all', 'selected'),
    allowNull: true,
    comment: 'Targeting mode at issue time: all restaurants under the owner, or a selected subset'
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

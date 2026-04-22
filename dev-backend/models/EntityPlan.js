const { DataTypes, Model } = require('sequelize');
const database = require('../config/database');

class EntityPlan extends Model {}

EntityPlan.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  entity_type: {
    type: DataTypes.ENUM('brand', 'foodcourt'),
    allowNull: false,
    comment: 'Plan owner type: brand or foodcourt'
  },
  entity_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: 'Brand ID or Foodcourt ID'
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    comment: 'Plan name (e.g., "Standard Franchise Plan")'
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  auto_generate: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    comment: 'Auto-generate invoices on billing cycle'
  },
  currency: {
    type: DataTypes.STRING(10),
    defaultValue: 'MYR'
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  category: {
    type: DataTypes.ENUM('basic', 'custom'),
    defaultValue: 'custom',
    comment: 'Plan category: basic (with limits/modules) or custom'
  },
  is_popular: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    comment: 'Mark as most popular plan'
  },
  features: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'JSON array of feature strings',
    get() {
      const v = this.getDataValue('features');
      if (!v) return [];
      try { return JSON.parse(v); } catch { return []; }
    },
    set(v) {
      this.setDataValue('features', v ? JSON.stringify(v) : null);
    }
  },
  included_modules: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'JSON array of module codes',
    get() {
      const v = this.getDataValue('included_modules');
      if (!v) return [];
      try { return JSON.parse(v); } catch { return []; }
    },
    set(v) {
      this.setDataValue('included_modules', v ? JSON.stringify(v) : null);
    }
  },
  menu_item_limit: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: -1,
    comment: 'Menu item limit (-1 for unlimited)'
  },
  order_limit: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: -1,
    comment: 'Monthly order limit (-1 for unlimited)'
  },
  staff_limit: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: -1,
    comment: 'Staff account limit (-1 for unlimited)'
  },
  charge_type: {
    type: DataTypes.ENUM('fixed', 'percentage', 'combined', 'additive'),
    defaultValue: 'fixed',
    comment: 'fixed / percentage / combined=MAX(fixed, pct*rev) / additive=fixed+pct*rev'
  },
  percentage_value: {
    type: DataTypes.DECIMAL(5, 2),
    defaultValue: 0,
    comment: 'Revenue percentage rate (only when charge_type=percentage)'
  },
  revenue_base: {
    type: DataTypes.ENUM('previous_month', 'previous_year', 'up_to_billing_day'),
    defaultValue: 'previous_month',
    comment: 'Revenue calculation period for percentage type'
  },
  billing_day: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Monthly billing day (1-28) or -1 for end of month. NULL = subscription start date based'
  },
  created_by: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'User ID who created this plan'
  }
}, {
  sequelize: database.sequelize,
  modelName: 'EntityPlan',
  tableName: 'entity_plans',
  timestamps: true
});

module.exports = EntityPlan;

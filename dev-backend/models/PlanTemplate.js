const { DataTypes, Model } = require('sequelize');
const database = require('../config/database');

class PlanTemplate extends Model {}

PlanTemplate.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  display_name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  base_price_monthly: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  base_price_annual: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  order_limit: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1000,
    comment: '-1 for unlimited'
  },
  menu_item_limit: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 50,
    comment: '-1 for unlimited'
  },
  staff_limit: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 5,
    comment: '-1 for unlimited'
  },
  category: {
    type: DataTypes.ENUM('basic', 'custom'),
    allowNull: false,
    defaultValue: 'basic',
    comment: 'Plan category: basic for standard plans, custom for custom plans'
  },
  plan_target: {
    type: DataTypes.ENUM('restaurant', 'manager'),
    allowNull: false,
    defaultValue: 'restaurant',
    comment: 'Target user type: restaurant for restaurant owners, manager for brand/foodcourt managers'
  },
  features: {
    type: DataTypes.TEXT,
    allowNull: true,
    get() {
      const rawValue = this.getDataValue('features');
      return rawValue ? JSON.parse(rawValue) : [];
    },
    set(value) {
      this.setDataValue('features', JSON.stringify(value));
    }
  },
  included_modules: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: null,
    comment: 'Array of included addon module codes',
    get() {
      const rawValue = this.getDataValue('included_modules');
      return rawValue ? (typeof rawValue === 'string' ? JSON.parse(rawValue) : rawValue) : [];
    }
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  sort_order: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  sequelize: database.sequelize,
  modelName: 'PlanTemplate',
  tableName: 'plan_templates',
  timestamps: true
});

module.exports = PlanTemplate;
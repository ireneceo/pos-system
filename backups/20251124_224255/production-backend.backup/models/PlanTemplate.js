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
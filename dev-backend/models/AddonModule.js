const { DataTypes, Model } = require('sequelize');
const database = require('../config/database');

class AddonModule extends Model {}

AddonModule.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  module_code: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  category: {
    type: DataTypes.ENUM('basic', 'advanced', 'revenue', 'operation', 'analytics'),
    allowNull: false
  },
  target_user_type: {
    type: DataTypes.ENUM('restaurant', 'manager', 'both'),
    allowNull: false,
    defaultValue: 'restaurant'
  },
  base_price_monthly: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.00
  },
  base_price_annual: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.00
  },
  ui_routes: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: null,
    comment: 'Array of allowed UI routes',
    get() {
      const rawValue = this.getDataValue('ui_routes');
      return rawValue ? (typeof rawValue === 'string' ? JSON.parse(rawValue) : rawValue) : [];
    }
  },
  features: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: null,
    comment: 'Feature descriptions for display',
    get() {
      const rawValue = this.getDataValue('features');
      return rawValue ? (typeof rawValue === 'string' ? JSON.parse(rawValue) : rawValue) : [];
    }
  },
  dependencies: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: null,
    comment: 'Required module codes',
    get() {
      const rawValue = this.getDataValue('dependencies');
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
  modelName: 'AddonModule',
  tableName: 'addon_modules',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = AddonModule;

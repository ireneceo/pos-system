const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const SystemProductOptionGroup = sequelize.define('SystemProductOptionGroup', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  is_required: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  min_selections: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  max_selections: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  sort_order: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'system_product_option_groups',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = SystemProductOptionGroup;

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const FoodcourtProductOption = sequelize.define('FoodcourtProductOption', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  option_group_id: { type: DataTypes.INTEGER, allowNull: false },
  name: { type: DataTypes.STRING(100), allowNull: false },
  price_adjustment: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
  sort_order: { type: DataTypes.INTEGER, defaultValue: 0 },
  is_active: { type: DataTypes.BOOLEAN, defaultValue: true }
}, {
  tableName: 'foodcourt_product_options',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [{ fields: ['option_group_id'] }]
});

module.exports = FoodcourtProductOption;

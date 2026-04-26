const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const FoodcourtProductOptionGroup = sequelize.define('FoodcourtProductOptionGroup', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  foodcourt_id: { type: DataTypes.INTEGER, allowNull: false },
  name: { type: DataTypes.STRING(100), allowNull: false },
  is_required: { type: DataTypes.BOOLEAN, defaultValue: false },
  min_selections: { type: DataTypes.INTEGER, defaultValue: 0 },
  max_selections: { type: DataTypes.INTEGER, defaultValue: 1 },
  sort_order: { type: DataTypes.INTEGER, defaultValue: 0 }
}, {
  tableName: 'foodcourt_product_option_groups',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [{ fields: ['foodcourt_id'] }]
});

module.exports = FoodcourtProductOptionGroup;

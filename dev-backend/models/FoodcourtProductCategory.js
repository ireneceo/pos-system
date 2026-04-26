const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const FoodcourtProductCategory = sequelize.define('FoodcourtProductCategory', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  foodcourt_id: { type: DataTypes.INTEGER, allowNull: false },
  name: { type: DataTypes.STRING(100), allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: true },
  emoji: { type: DataTypes.STRING(10), allowNull: true },
  sort_order: { type: DataTypes.INTEGER, defaultValue: 0 },
  is_active: { type: DataTypes.BOOLEAN, defaultValue: true }
}, {
  tableName: 'foodcourt_product_categories',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    { fields: ['foodcourt_id'] },
    { fields: ['foodcourt_id', 'is_active'] }
  ]
});

module.exports = FoodcourtProductCategory;

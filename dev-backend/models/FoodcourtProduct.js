const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const FoodcourtProduct = sequelize.define('FoodcourtProduct', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  foodcourt_id: { type: DataTypes.INTEGER, allowNull: false },
  category_id: { type: DataTypes.INTEGER, allowNull: true },
  name: { type: DataTypes.STRING(255), allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: true },
  sku: { type: DataTypes.STRING(100), allowNull: true },
  unit: { type: DataTypes.STRING(50), allowNull: true },
  base_quantity: { type: DataTypes.DECIMAL(10, 2), defaultValue: 1 },
  unit_price: { type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0 },
  min_order_quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
  image_url: { type: DataTypes.TEXT('medium'), allowNull: true },
  image_thumbnail: { type: DataTypes.TEXT, allowNull: true },
  is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
  after_meal: { type: DataTypes.BOOLEAN, defaultValue: false, comment: 'Serve after the main meal (e.g. dessert). Registration flag only.' },
  distribution_mode: {
    type: DataTypes.ENUM('all', 'specific_restaurants'),
    allowNull: false,
    defaultValue: 'all',
    comment: 'all=foodcourt 모든 입점 매장 노출, specific_restaurants=foodcourt_product_restaurants 매핑된 지점만'
  },
  sort_order: { type: DataTypes.INTEGER, defaultValue: 0 },
  current_stock: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
  low_stock_threshold: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
  lead_time_days: { type: DataTypes.INTEGER, defaultValue: 0 },
  emoji: { type: DataTypes.STRING(10), allowNull: true },
  sync_to_ingredients: { type: DataTypes.BOOLEAN, defaultValue: true }
}, {
  tableName: 'foodcourt_products',
  timestamps: true,
  underscored: true,
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  indexes: [
    { fields: ['foodcourt_id'] },
    { fields: ['foodcourt_id', 'is_active'] },
    { fields: ['category_id'] }
  ]
});

module.exports = FoodcourtProduct;

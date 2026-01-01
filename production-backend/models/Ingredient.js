const { DataTypes, Model } = require('sequelize');
const database = require('../config/database');

class Ingredient extends Model {}

Ingredient.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  // Owner type (brand or restaurant)
  owner_type: {
    type: DataTypes.ENUM('brand', 'restaurant'),
    allowNull: false,
    defaultValue: 'restaurant',
    comment: 'Owner type: brand (shared) or restaurant (location-specific)'
  },
  // Owner
  brand_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  restaurant_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  // Ingredient category
  ingredient_category_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Ingredient category FK'
  },
  // Brand product link
  brand_product_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Brand product FK - links to brand_products table'
  },
  // Ingredient info
  code: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  image_url: {
    type: DataTypes.TEXT('medium'),
    allowNull: true
  },
  category: {
    type: DataTypes.ENUM('produce', 'meat', 'seafood', 'dairy', 'dry_goods', 'spices', 'beverages', 'other'),
    defaultValue: 'other'
  },
  // Stock unit
  unit: {
    type: DataTypes.ENUM('kg', 'g', 'L', 'ml', 'piece', 'pack', 'can', 'bottle'),
    allowNull: false
  },
  base_quantity: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 1,
    comment: 'Base quantity per unit'
  },
  // Price
  unit_cost: {
    type: DataTypes.DECIMAL(10, 4),
    allowNull: false,
    defaultValue: 0.0000,
    comment: 'Cost per unit'
  },
  supplier_name: {
    type: DataTypes.STRING(100),
    allowNull: true,
    comment: 'Supplier name (deprecated - use supplier_id)'
  },
  supplier_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Supplier FK'
  },
  // Stock management
  min_stock: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
    comment: 'Minimum stock level'
  },
  min_order: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
    comment: 'Minimum order quantity from supplier'
  },
  current_stock: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
    comment: 'Current stock level'
  },
  // PAR Level calculation fields
  lead_time_days: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    comment: 'Supplier lead time in days'
  },
  safety_stock_percent: {
    type: DataTypes.DECIMAL(5, 2),
    defaultValue: 20.00,
    comment: 'Safety stock as percentage of lead time usage'
  },
  manual_daily_usage: {
    type: DataTypes.DECIMAL(10, 4),
    allowNull: true,
    comment: 'Manually set daily usage when prediction is not available'
  },
  avg_daily_usage: {
    type: DataTypes.DECIMAL(10, 4),
    defaultValue: 0,
    comment: 'Calculated average daily usage from history'
  },
  prediction_confidence: {
    type: DataTypes.ENUM('high', 'medium', 'low', 'none'),
    defaultValue: 'none',
    comment: 'Confidence level of usage prediction'
  },
  last_actual_stock: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
    comment: 'Last confirmed stock from stock take'
  },
  last_stock_take_at: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'Last stock take date'
  },
  track_stock: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    comment: 'Whether to track this ingredient in inventory stock list'
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  sequelize: database.sequelize,
  modelName: 'Ingredient',
  tableName: 'ingredients',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Ingredient;

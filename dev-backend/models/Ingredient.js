const { DataTypes, Model } = require('sequelize');
const database = require('../config/database');

class Ingredient extends Model {}

Ingredient.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  // Owner type (brand / restaurant / foodcourt)
  owner_type: {
    type: DataTypes.ENUM('brand', 'restaurant', 'foodcourt'),
    allowNull: false,
    defaultValue: 'restaurant',
    comment: 'Owner type: brand / restaurant / foodcourt (각자 발주 가능)'
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
  foodcourt_id: {
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
    defaultValue: false,
    // 기본값 **꺼짐**. 예전 기본값은 켜짐이었고, 아무도 끄지 않아 만들어진 것이 전부
    // 재고 관리 대상이 됐다 — 운영 실측(2026-08-22): 매입자재 289개 전부 켜져 있는데
    // 실제로 수량이 들어 있는 건 3개, 매장 재료도 364/365 켜짐에 수량은 28개뿐이었다.
    // 그 결과 목록은 수백 줄인데 관리되는 건 몇 개고, 수량 0인 것들이 알림을 채웠다.
    // 재고를 세겠다고 **사람이 정한 것만** 켠다. 화면의 토글로 언제든 켤 수 있다.
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

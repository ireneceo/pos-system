const { DataTypes, Model } = require('sequelize');
const database = require('../config/database');

class Ingredient extends Model {}

Ingredient.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  // 소유권
  brand_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  restaurant_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  // 재료 정보
  code: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  category: {
    type: DataTypes.ENUM('produce', 'meat', 'seafood', 'dairy', 'dry_goods', 'spices', 'beverages', 'other'),
    defaultValue: 'other'
  },
  // 재고 단위
  unit: {
    type: DataTypes.ENUM('kg', 'g', 'L', 'ml', 'piece', 'pack', 'can', 'bottle'),
    allowNull: false
  },
  // 가격
  unit_cost: {
    type: DataTypes.DECIMAL(10, 4),
    allowNull: false,
    defaultValue: 0.0000,
    comment: '단위당 원가'
  },
  supplier_name: {
    type: DataTypes.STRING(100),
    allowNull: true,
    comment: '공급업체명'
  },
  // 재고 관련
  min_stock: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
    comment: '최소 재고량'
  },
  current_stock: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
    comment: '현재 재고량'
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

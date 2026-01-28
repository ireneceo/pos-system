const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const GeneralStockCategory = sequelize.define('GeneralStockCategory', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  // 소유권 타입 (brand 또는 restaurant)
  owner_type: {
    type: DataTypes.ENUM('brand', 'restaurant'),
    allowNull: false,
    defaultValue: 'restaurant',
    comment: '소유권 타입: brand(브랜드 공통) 또는 restaurant(지점 전용)'
  },
  // Brand General User ID for company-wide categories
  owner_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Brand General User ID for company-wide categories'
  },
  // 브랜드 또는 레스토랑 소유
  brand_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: '브랜드 소유 카테고리'
  },
  restaurant_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: '독립 레스토랑 소유 카테고리'
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  emoji: {
    type: DataTypes.STRING(10),
    allowNull: true
  },
  display_order: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'general_stock_categories',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    { fields: ['brand_id'] },
    { fields: ['restaurant_id'] },
    { fields: ['display_order'] }
  ]
});

module.exports = GeneralStockCategory;

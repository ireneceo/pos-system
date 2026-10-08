const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const IngredientCategory = sequelize.define('IngredientCategory', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  // 소유권 타입 (brand 또는 restaurant)
  owner_type: {
    type: DataTypes.ENUM('brand', 'restaurant', 'foodcourt'),
    allowNull: false,
    defaultValue: 'restaurant',
    comment: '소유권 타입: brand / restaurant / foodcourt'
  },
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
  foodcourt_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: '푸드코트 소유 카테고리'
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
  },
  // 직원식(비용) 분류 — 이 분류 재료의 발주는 직원식 비용으로 집계 (2026-10-07 Fable 판정 ⑪ · TRADE_STRUCTURE ⑪)
  //   칸 추가·기존 분류 표시는 scripts/migrate-staff-meal-category-flag.js
  is_staff_meal: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    comment: '직원식(비용) 분류 — 이 분류 재료의 발주는 직원식 비용으로 집계. 매장 소유 분류만 뜻 있음'
  }
}, {
  tableName: 'ingredient_categories',
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

module.exports = IngredientCategory;

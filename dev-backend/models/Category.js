const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  restaurant_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
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
  displayOrder: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  kitchen_station_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Kitchen station assignment (category mode)'
  },
  // 2단 카테고리 (2026-10-11 Fable 판정 · docs/MENU_CATEGORY_TWO_LEVEL.md). NULL = 1단(지금과 같음).
  // 규칙(utils/menuCategoryTree): 2단까지 · 하위가 있는 카테고리 = «묶음 칸»(메뉴를 직접 담지 않음).
  parent_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null,
    comment: 'Parent category id (2-level menu categories). NULL = top level'
  },
  // #11c 모바일 크로스셀: NULL=이름 자동감지 / true=강제 추천 카테고리 / false=강제 제외
  is_recommendation_source: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: null,
    comment: 'Cross-sell recommendation source override (null=auto by name)'
  }
}, {
  tableName: 'categories',
  timestamps: true,
  indexes: [
    { fields: ['name'] },
    { fields: ['displayOrder'] }
  ]
});

module.exports = Category;

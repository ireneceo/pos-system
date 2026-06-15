const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

// Brand menu 의 적용범위 allowlist — scope_mode='selected' 일 때만 사용.
// 설계: docs/BRAND_MENU_SYSTEM.md §14. FoodcourtProductRestaurant 와 동일 패턴(반대 의미:
// 푸드코트=제외 default-all, 브랜드=연결 opt-in).
const BrandMenuRestaurant = sequelize.define('BrandMenuRestaurant', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  brand_menu_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'brand_menus', key: 'id' }
  },
  restaurant_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'restaurants', key: 'id' }
  }
}, {
  tableName: 'brand_menu_restaurants',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    { unique: true, fields: ['brand_menu_id', 'restaurant_id'] },
    { fields: ['restaurant_id'] }
  ]
});

module.exports = BrandMenuRestaurant;

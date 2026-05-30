const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

/**
 * BrandMenu — Brand 측 메뉴 템플릿.
 *
 * 산하 Restaurant 의 Product 로 sync 됨 (Product.brand_menu_id FK).
 * version 은 수정 시 ++ 되며 산하 Product 의 link_status='pending_update' 트리거.
 * 잠금 5종 (name/price/category/image/options) 은 RA 가 못 바꿀 필드를 지정.
 *
 * distribution_mode:
 *   auto   — 생성/수정 시 산하 모든 Restaurant 에 즉시 push
 *   manual — BG 가 명시적으로 Push 버튼 클릭해야 push
 */
const BrandMenu = sequelize.define('BrandMenu', {
  id:                { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  brand_id:          { type: DataTypes.INTEGER, allowNull: false, references: { model: 'brands', key: 'id' } },
  category_id:       { type: DataTypes.INTEGER, allowNull: true, references: { model: 'brand_menu_categories', key: 'id' } },
  product_recipe_id: { type: DataTypes.INTEGER, allowNull: true, references: { model: 'product_recipes', key: 'id' }, comment: 'Recipe used to produce this menu' },
  name:              { type: DataTypes.STRING(255), allowNull: false },
  description:       { type: DataTypes.TEXT, allowNull: true },
  image_url:         { type: DataTypes.TEXT, allowNull: true },
  emoji:             { type: DataTypes.STRING(10), allowNull: true },
  recommended_price: { type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0 },
  currency:          { type: DataTypes.STRING(3), defaultValue: 'MYR' },
  is_active:         { type: DataTypes.BOOLEAN, defaultValue: true },
  after_meal:        { type: DataTypes.BOOLEAN, defaultValue: false, comment: 'Serve after the main meal (e.g. dessert). Registration flag only.' },
  sort_order:        { type: DataTypes.INTEGER, defaultValue: 0 },
  version:           { type: DataTypes.INTEGER, defaultValue: 1, comment: 'Bumps on every edit; Restaurants compare to detect pending updates' },
  distribution_mode: { type: DataTypes.ENUM('auto', 'manual'), defaultValue: 'manual' },
  lock_name:         { type: DataTypes.BOOLEAN, defaultValue: false },
  lock_price:        { type: DataTypes.BOOLEAN, defaultValue: false },
  lock_category:     { type: DataTypes.BOOLEAN, defaultValue: false },
  lock_image:        { type: DataTypes.BOOLEAN, defaultValue: false },
  lock_options:      { type: DataTypes.BOOLEAN, defaultValue: false },
  lock_sort_order:   { type: DataTypes.BOOLEAN, defaultValue: false },
  // Set menu support — mirrors Restaurant.Product (is_set_menu / set_items JSON list).
  is_set_menu:       { type: DataTypes.BOOLEAN, defaultValue: false },
  set_items:         { type: DataTypes.JSON, allowNull: true, defaultValue: null, comment: 'JSON array of sub-item descriptors (name, qty, etc.) mirrored to Product.set_items' },
  set_groups:        { type: DataTypes.JSON, allowNull: true, defaultValue: null, comment: 'v2 set slots [{id,label,type:fixed|choice,min,max,items:[{product_id(=brand_menu_id),qty,upcharge}]}] — mirrored→Product.set_groups with id translation on push' },
  lock_set_items:    { type: DataTypes.BOOLEAN, defaultValue: false }
}, {
  tableName: 'brand_menus',
  indexes: [
    { fields: ['brand_id'] },
    { fields: ['brand_id', 'category_id'] }
  ]
});

module.exports = BrandMenu;

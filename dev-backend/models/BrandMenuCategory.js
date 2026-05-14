const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const BrandMenuCategory = sequelize.define('BrandMenuCategory', {
  id:         { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  brand_id:   { type: DataTypes.INTEGER, allowNull: false, references: { model: 'brands', key: 'id' } },
  name:       { type: DataTypes.STRING(100), allowNull: false },
  emoji:      { type: DataTypes.STRING(10), allowNull: true },
  image_url:  { type: DataTypes.TEXT, allowNull: true },
  color:      { type: DataTypes.STRING(20), allowNull: true },
  sort_order: { type: DataTypes.INTEGER, defaultValue: 0 },
  is_active:  { type: DataTypes.BOOLEAN, defaultValue: true }
}, {
  tableName: 'brand_menu_categories',
  indexes: [{ fields: ['brand_id'] }]
});

module.exports = BrandMenuCategory;

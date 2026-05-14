const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

/**
 * N:M 메뉴 ↔ 옵션 그룹 매핑 + 메뉴별 옵션 그룹 순서.
 */
const BrandMenuOptionGroupLink = sequelize.define('BrandMenuOptionGroupLink', {
  id:              { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  brand_menu_id:   { type: DataTypes.INTEGER, allowNull: false, references: { model: 'brand_menus', key: 'id' } },
  option_group_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'brand_menu_option_groups', key: 'id' } },
  sort_order:      { type: DataTypes.INTEGER, defaultValue: 0 }
}, {
  tableName: 'brand_menu_option_group_links',
  indexes: [
    { unique: true, fields: ['brand_menu_id', 'option_group_id'] },
    { fields: ['brand_menu_id'] },
    { fields: ['option_group_id'] }
  ]
});

module.exports = BrandMenuOptionGroupLink;

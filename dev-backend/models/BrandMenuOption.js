const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const BrandMenuOption = sequelize.define('BrandMenuOption', {
  id:          { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  group_id:    { type: DataTypes.INTEGER, allowNull: false, references: { model: 'brand_menu_option_groups', key: 'id' } },
  name:        { type: DataTypes.STRING(100), allowNull: false },
  extra_price: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
  sort_order:  { type: DataTypes.INTEGER, defaultValue: 0 },
  is_active:   { type: DataTypes.BOOLEAN, defaultValue: true }
}, {
  tableName: 'brand_menu_options',
  indexes: [{ fields: ['group_id'] }]
});

module.exports = BrandMenuOption;

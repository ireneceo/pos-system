const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const BrandMenuOptionGroup = sequelize.define('BrandMenuOptionGroup', {
  id:          { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  brand_id:    { type: DataTypes.INTEGER, allowNull: false, references: { model: 'brands', key: 'id' } },
  name:        { type: DataTypes.STRING(100), allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: true },
  min_select:  { type: DataTypes.INTEGER, defaultValue: 0, comment: 'Minimum options to select (0 = optional)' },
  max_select:  { type: DataTypes.INTEGER, defaultValue: 1, comment: 'Maximum options selectable' },
  is_required: { type: DataTypes.BOOLEAN, defaultValue: false },
  is_active:   { type: DataTypes.BOOLEAN, defaultValue: true },
  version:     { type: DataTypes.INTEGER, defaultValue: 1, comment: 'Bumps on edit; consuming BrandMenus repropagate pending_update' }
}, {
  tableName: 'brand_menu_option_groups',
  indexes: [{ fields: ['brand_id'] }]
});

module.exports = BrandMenuOptionGroup;

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const SupplierProductOptionGroup = sequelize.define('SupplierProductOptionGroup', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  supplier_company_id: { type: DataTypes.INTEGER, allowNull: false },
  name: { type: DataTypes.STRING(100), allowNull: false },
  is_required: { type: DataTypes.BOOLEAN, defaultValue: false },
  min_selections: { type: DataTypes.INTEGER, defaultValue: 0 },
  max_selections: { type: DataTypes.INTEGER, defaultValue: 1 },
  sort_order: { type: DataTypes.INTEGER, defaultValue: 0 }
}, {
  tableName: 'supplier_product_option_groups',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [{ fields: ['supplier_company_id'] }]
});

module.exports = SupplierProductOptionGroup;

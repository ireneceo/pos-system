const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const SupplierProductCategory = sequelize.define('SupplierProductCategory', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  supplier_company_id: { type: DataTypes.INTEGER, allowNull: false },
  name: { type: DataTypes.STRING(100), allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: true },
  emoji: { type: DataTypes.STRING(10), allowNull: true },
  sort_order: { type: DataTypes.INTEGER, defaultValue: 0 },
  is_active: { type: DataTypes.BOOLEAN, defaultValue: true }
}, {
  tableName: 'supplier_product_categories',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    { fields: ['supplier_company_id'] },
    { fields: ['supplier_company_id', 'is_active'] }
  ]
});

module.exports = SupplierProductCategory;

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const SupplierCategory = sequelize.define('SupplierCategory', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  // Owner type (brand or restaurant)
  owner_type: {
    type: DataTypes.ENUM('brand', 'restaurant'),
    allowNull: false,
    defaultValue: 'restaurant',
    comment: 'Owner type: brand (shared) or restaurant (location-specific)'
  },
  // Brand or restaurant owner
  brand_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Brand-owned category'
  },
  restaurant_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Restaurant-owned category'
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  color: {
    type: DataTypes.STRING(20),
    allowNull: true,
    comment: 'Display color (hex code)'
  },
  display_order: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'supplier_categories',
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

module.exports = SupplierCategory;

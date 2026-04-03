const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const SystemProductAddon = sequelize.define('SystemProductAddon', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  set_product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'system_products',
      key: 'id'
    },
    comment: 'The set product (is_set=true)'
  },
  addon_product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'system_products',
      key: 'id'
    },
    comment: 'The individual product that can be added'
  },
  addon_label: {
    type: DataTypes.STRING(100),
    allowNull: true,
    comment: 'Display label: "POS 추가", "프린터" etc.'
  },
  max_quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    comment: '0 = unlimited'
  },
  is_inquiry_only: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    comment: 'true = show "별도 문의" instead of quantity selector'
  },
  sort_order: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'system_product_addons',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = SystemProductAddon;

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const BrandProductOption = sequelize.define('BrandProductOption', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  owner_user_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Brand General user id (scope owner)'
  },
  option_group_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'brand_product_option_groups',
      key: 'id'
    }
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    comment: '옵션명 (예: 1kg, 5kg, 프리미엄)'
  },
  price_adjustment: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
    comment: '추가 금액'
  },
  sort_order: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'brand_product_options',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = BrandProductOption;

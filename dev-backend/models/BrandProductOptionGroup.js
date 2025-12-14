const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const BrandProductOptionGroup = sequelize.define('BrandProductOptionGroup', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'brand_products',
      key: 'id'
    }
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    comment: '옵션 그룹명 (예: 포장 단위, 등급)'
  },
  is_required: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    comment: '필수 선택 여부'
  },
  min_selections: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    comment: '최소 선택 수'
  },
  max_selections: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    comment: '최대 선택 수'
  },
  sort_order: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'brand_product_option_groups',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = BrandProductOptionGroup;

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

// 제품-옵션그룹 연결 중간 테이블 (N:M)
const BrandProductOptionGroupProduct = sequelize.define('BrandProductOptionGroupProduct', {
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
  option_group_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'brand_product_option_groups',
      key: 'id'
    }
  }
}, {
  tableName: 'brand_product_option_group_products',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      name: 'bp_og_product_unique',
      unique: true,
      fields: ['product_id', 'option_group_id']
    }
  ]
});

module.exports = BrandProductOptionGroupProduct;

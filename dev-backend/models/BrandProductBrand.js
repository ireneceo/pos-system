const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

// 제품-브랜드 연결 중간 테이블 (N:M)
const BrandProductBrand = sequelize.define('BrandProductBrand', {
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
  brand_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'brands',
      key: 'id'
    }
  }
}, {
  tableName: 'brand_product_brands',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      unique: true,
      fields: ['product_id', 'brand_id']
    }
  ]
});

module.exports = BrandProductBrand;

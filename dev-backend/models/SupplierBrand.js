const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

// 공급업체-브랜드 연결 중간 테이블 (N:M)
const SupplierBrand = sequelize.define('SupplierBrand', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  supplier_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'suppliers',
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
  tableName: 'supplier_brands',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      unique: true,
      fields: ['supplier_id', 'brand_id']
    }
  ]
});

module.exports = SupplierBrand;

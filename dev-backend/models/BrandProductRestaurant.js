const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

// Brand product 의 특정 지점 (Restaurant) 노출 매핑 — distribution_mode='specific_restaurants' 시 사용.
const BrandProductRestaurant = sequelize.define('BrandProductRestaurant', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'brand_products', key: 'id' }
  },
  restaurant_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'restaurants', key: 'id' }
  }
}, {
  tableName: 'brand_product_restaurants',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    { unique: true, fields: ['product_id', 'restaurant_id'] }
  ]
});

module.exports = BrandProductRestaurant;

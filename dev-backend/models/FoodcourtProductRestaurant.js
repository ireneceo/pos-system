const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

// Foodcourt product 의 특정 지점 (Restaurant) 노출 매핑 — distribution_mode='specific_restaurants' 시 사용.
const FoodcourtProductRestaurant = sequelize.define('FoodcourtProductRestaurant', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'foodcourt_products', key: 'id' }
  },
  restaurant_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'restaurants', key: 'id' }
  }
}, {
  tableName: 'foodcourt_product_restaurants',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    { unique: true, fields: ['product_id', 'restaurant_id'] }
  ]
});

module.exports = FoodcourtProductRestaurant;

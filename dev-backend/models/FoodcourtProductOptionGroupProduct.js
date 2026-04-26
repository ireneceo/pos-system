const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const FoodcourtProductOptionGroupProduct = sequelize.define('FoodcourtProductOptionGroupProduct', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  product_id: { type: DataTypes.INTEGER, allowNull: false },
  option_group_id: { type: DataTypes.INTEGER, allowNull: false },
  sort_order: { type: DataTypes.INTEGER, defaultValue: 0 }
}, {
  tableName: 'foodcourt_product_option_group_products',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    { fields: ['product_id'] },
    { fields: ['option_group_id'] },
    { unique: true, fields: ['product_id', 'option_group_id'], name: 'uniq_fc_prod_group' }
  ]
});

module.exports = FoodcourtProductOptionGroupProduct;

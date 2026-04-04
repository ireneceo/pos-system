const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const SystemProductOptionGroupProduct = sequelize.define('SystemProductOptionGroupProduct', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'system_products',
      key: 'id'
    }
  },
  option_group_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'system_product_option_groups',
      key: 'id'
    }
  }
}, {
  tableName: 'system_product_option_group_products',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      unique: true,
      fields: ['product_id', 'option_group_id']
    }
  ]
});

module.exports = SystemProductOptionGroupProduct;

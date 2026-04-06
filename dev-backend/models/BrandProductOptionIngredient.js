const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const BrandProductOptionIngredient = sequelize.define('BrandProductOptionIngredient', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  option_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'brand_product_options',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  ingredient_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'product_ingredients',
      key: 'id'
    }
  },
  quantity: {
    type: DataTypes.DECIMAL(10, 4),
    allowNull: false,
    defaultValue: 1
  }
}, {
  tableName: 'brand_product_option_ingredients',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = BrandProductOptionIngredient;

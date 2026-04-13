const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const ProductRecipeCategory = sequelize.define('ProductRecipeCategory', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  brand_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Brand FK — recipe categories are brand-scoped'
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  emoji: {
    type: DataTypes.STRING(10),
    allowNull: true
  },
  display_order: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'product_recipe_categories',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    { fields: ['display_order'] }
  ]
});

module.exports = ProductRecipeCategory;

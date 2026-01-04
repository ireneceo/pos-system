const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const BrandProduct = sequelize.define('BrandProduct', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'brand_product_categories',
      key: 'id'
    }
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  sku: {
    type: DataTypes.STRING(100),
    allowNull: true,
    comment: '제품 코드'
  },
  unit: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: 'Base unit (kg, L, piece, etc.)'
  },
  base_quantity: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 1,
    comment: 'Base quantity per unit'
  },
  unit_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
    comment: '단가'
  },
  min_order_quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    comment: '최소 주문 수량'
  },
  image_url: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  sync_to_ingredients: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    comment: 'Whether to sync to ingredients table for recipes'
  },
  sort_order: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  recipe_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'recipes',
      key: 'id'
    },
    comment: 'Linked recipe for ingredient cost tracking'
  }
}, {
  tableName: 'brand_products',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = BrandProduct;

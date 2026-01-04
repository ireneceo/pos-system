const { DataTypes, Model } = require('sequelize');
const database = require('../config/database');

class ProductRecipeIngredient extends Model {}

ProductRecipeIngredient.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  recipe_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: 'ProductRecipe FK'
  },
  ingredient_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: 'ProductIngredient FK'
  },
  // 사용량
  quantity: {
    type: DataTypes.DECIMAL(10, 4),
    allowNull: false
  },
  unit: {
    type: DataTypes.ENUM('kg', 'g', 'L', 'ml', 'piece', 'pack', 'can', 'bottle'),
    allowNull: false
  },
  // 원가
  cost: {
    type: DataTypes.DECIMAL(10, 4),
    defaultValue: 0.0000,
    comment: '해당 재료의 원가'
  },
  // 메모
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: '준비 방법이나 팁'
  }
}, {
  sequelize: database.sequelize,
  modelName: 'ProductRecipeIngredient',
  tableName: 'product_recipe_ingredients',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = ProductRecipeIngredient;

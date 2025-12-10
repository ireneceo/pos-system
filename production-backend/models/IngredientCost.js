const { DataTypes, Model } = require('sequelize');
const database = require('../config/database');

class IngredientCost extends Model {}

IngredientCost.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  ingredient_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  currency: {
    type: DataTypes.STRING(3),
    allowNull: false
  },
  unit_cost: {
    type: DataTypes.DECIMAL(10, 4),
    allowNull: false,
    defaultValue: 0
  }
}, {
  sequelize: database.sequelize,
  modelName: 'IngredientCost',
  tableName: 'ingredient_costs',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = IngredientCost;

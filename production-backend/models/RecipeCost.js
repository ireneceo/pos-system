const { DataTypes, Model } = require('sequelize');
const database = require('../config/database');

class RecipeCost extends Model {}

RecipeCost.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  recipe_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  currency: {
    type: DataTypes.STRING(3),
    allowNull: false
  },
  total_ingredient_cost: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
    comment: '자동계산'
  },
  suggested_price: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
    comment: '권장판매가'
  }
}, {
  sequelize: database.sequelize,
  modelName: 'RecipeCost',
  tableName: 'recipe_costs',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = RecipeCost;

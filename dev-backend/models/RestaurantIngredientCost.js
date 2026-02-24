const { DataTypes, Model } = require('sequelize');
const database = require('../config/database');

class RestaurantIngredientCost extends Model {}

RestaurantIngredientCost.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  restaurant_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: 'Restaurant FK'
  },
  ingredient_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: 'Brand Ingredient FK'
  },
  unit_cost: {
    type: DataTypes.DECIMAL(10, 4),
    allowNull: false,
    comment: 'Restaurant-specific unit cost (overrides brand cost)'
  },
  notes: {
    type: DataTypes.STRING(500),
    allowNull: true,
    comment: 'Notes (supplier name, reason for change, etc.)'
  },
  updated_by: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'User who last updated this cost'
  }
}, {
  sequelize: database.sequelize,
  modelName: 'RestaurantIngredientCost',
  tableName: 'restaurant_ingredient_costs',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      unique: true,
      fields: ['restaurant_id', 'ingredient_id'],
      name: 'uq_restaurant_ingredient_cost'
    }
  ]
});

module.exports = RestaurantIngredientCost;

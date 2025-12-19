const { DataTypes, Model } = require('sequelize');
const database = require('../config/database');

class StockTakeItem extends Model {}

StockTakeItem.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  stock_take_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  ingredient_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  theoretical_stock: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  actual_stock: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  variance: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    comment: '이론 - 실사'
  },
  unit_cost: {
    type: DataTypes.DECIMAL(10, 4),
    allowNull: false
  },
  variance_value: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  variance_reason: {
    type: DataTypes.ENUM('waste', 'breakage', 'recipe_variance', 'unrecorded', 'measurement', 'other'),
    allowNull: true
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  counted_at: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize: database.sequelize,
  modelName: 'StockTakeItem',
  tableName: 'stock_take_items',
  timestamps: false,
  underscored: true
});

module.exports = StockTakeItem;

const { DataTypes, Model } = require('sequelize');
const database = require('../config/database');

class StockTake extends Model {}

StockTake.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  restaurant_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  stock_take_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('in_progress', 'completed', 'cancelled'),
    defaultValue: 'in_progress'
  },
  total_items: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  items_with_variance: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  total_variance_value: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: true,
    comment: 'Loss 총 금액'
  },
  variance_percentage: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true,
    comment: 'Loss 비율(%)'
  },
  completed_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  created_by: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize: database.sequelize,
  modelName: 'StockTake',
  tableName: 'stock_takes',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: false
});

module.exports = StockTake;

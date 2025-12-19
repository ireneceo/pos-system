const { DataTypes, Model } = require('sequelize');
const database = require('../config/database');

class StockAlert extends Model {}

StockAlert.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  restaurant_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  ingredient_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  alert_type: {
    type: DataTypes.ENUM('low_stock', 'out_of_stock'),
    allowNull: false
  },
  current_stock: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  min_stock: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  suggested_order_qty: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  is_resolved: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  resolved_at: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize: database.sequelize,
  modelName: 'StockAlert',
  tableName: 'stock_alerts',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: false
});

module.exports = StockAlert;

const { DataTypes, Model } = require('sequelize');
const database = require('../config/database');

class Order extends Model {}

Order.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  table_number: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  total_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'completed', 'cancelled'),
    defaultValue: 'pending'
  },
  order_items: {
    type: DataTypes.JSON,
    allowNull: false
  }
}, {
  sequelize: database.sequelize,
  modelName: 'Order',
  tableName: 'orders',
  timestamps: true
});

module.exports = Order;

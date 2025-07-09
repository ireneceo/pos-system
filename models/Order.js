const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Product = require('./Product');

const Order = sequelize.define('Order', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  total: {
    type: Sequelize.DECIMAL(10,2),
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('pending', 'processing', 'completed', 'cancelled'),
    defaultValue: 'pending'
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE
});

Order.belongsTo(User);
Order.belongsToMany(Product, { through: 'OrderItem' });

module.exports = Order;
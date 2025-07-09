const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  },
  price: {
    type: Sequelize.DECIMAL(10,2),
    allowNull: false
  },
  stock: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE
});

module.exports = Product;
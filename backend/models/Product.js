const { DataTypes, Model } = require('sequelize');
const database = require('../config/database');

class Product extends Model {}

Product.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  category: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  }
}, {
  sequelize: database.sequelize,
  modelName: 'Product',
  tableName: 'products',
  timestamps: true
});

module.exports = Product;

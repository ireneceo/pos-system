const { DataTypes, Model } = require('sequelize');
const database = require('../config/database');

class Product extends Model {}

Product.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  restaurant_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  code: {
    type: DataTypes.STRING(20),
    allowNull: true
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
  },
  optionGroups: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  },
  image: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  emoji: {
    type: DataTypes.STRING(10),
    allowNull: true
  },
  soldOut: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  is_set_menu: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  set_items: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: null
  },
  set_display_order: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  recipe_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: '연결된 레시피 ID'
  }
}, {
  sequelize: database.sequelize,
  modelName: 'Product',
  tableName: 'products',
  timestamps: true
});

module.exports = Product;

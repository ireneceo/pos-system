const { DataTypes } = require('sequelize');
const database = require('../config/database');

const GeneralStock = database.sequelize.define('GeneralStock', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  restaurant_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  code: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: 'SKU or item code'
  },
  category: {
    type: DataTypes.STRING(50),
    defaultValue: 'Supplies',
    comment: 'Category: Supplies, Packaging, Cleaning, Equipment, Other'
  },
  unit: {
    type: DataTypes.STRING(20),
    defaultValue: 'piece',
    comment: 'Stock unit (piece, box, pack, roll, bag, set, etc)'
  },
  unit_cost: {
    type: DataTypes.DECIMAL(10, 4),
    defaultValue: 0,
    comment: 'Cost per unit'
  },
  current_stock: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
    comment: 'Current stock quantity'
  },
  min_stock: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
    comment: 'Minimum stock level for alerts'
  },
  supplier_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Supplier FK'
  },
  last_stock_take_at: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'Last stock take date'
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  sequelize: database.sequelize,
  modelName: 'GeneralStock',
  tableName: 'general_stock',
  timestamps: true
});

module.exports = GeneralStock;

const { DataTypes } = require('sequelize');
const database = require('../config/database');

const GeneralStockTransaction = database.sequelize.define('GeneralStockTransaction', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  owner_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Brand General User ID - for company-wide transactions'
  },
  restaurant_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Restaurant ID - for restaurant-specific transactions'
  },
  general_stock_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: 'FK to general_stock'
  },
  transaction_type: {
    type: DataTypes.ENUM('initial', 'receive', 'adjustment', 'waste', 'transfer'),
    allowNull: false
  },
  quantity_change: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    comment: 'Positive for receive, negative for deduct'
  },
  unit: {
    type: DataTypes.STRING(20),
    defaultValue: 'piece'
  },
  stock_after: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    comment: 'Stock level after transaction'
  },
  unit_cost: {
    type: DataTypes.DECIMAL(10, 4),
    defaultValue: 0,
    comment: 'Unit cost at time of transaction'
  },
  total_cost: {
    type: DataTypes.DECIMAL(12, 2),
    defaultValue: 0,
    comment: 'Total cost of transaction'
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  batch_number: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: 'Batch/Lot number'
  },
  manufacture_date: {
    type: DataTypes.DATEONLY,
    allowNull: true,
    comment: 'Manufacture date'
  },
  expiry_date: {
    type: DataTypes.DATEONLY,
    allowNull: true,
    comment: 'Expiry date'
  },
  created_by: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'User who created the transaction'
  }
}, {
  sequelize: database.sequelize,
  modelName: 'GeneralStockTransaction',
  tableName: 'general_stock_transactions',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = GeneralStockTransaction;

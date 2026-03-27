const { DataTypes, Model } = require('sequelize');
const database = require('../config/database');

class InventoryTransaction extends Model {}

InventoryTransaction.init({
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
  transaction_type: {
    type: DataTypes.ENUM('initial', 'purchase', 'order_deduct', 'stock_take', 'waste', 'adjustment'),
    allowNull: false
  },
  quantity_change: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    comment: '양수: 증가, 음수: 감소'
  },
  unit: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  stock_after: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    comment: '거래 후 재고'
  },
  order_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  stock_take_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  created_by: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  sequelize: database.sequelize,
  modelName: 'InventoryTransaction',
  tableName: 'inventory_transactions',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: false
});

module.exports = InventoryTransaction;

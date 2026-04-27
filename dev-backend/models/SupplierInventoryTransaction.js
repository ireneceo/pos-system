const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const SupplierInventoryTransaction = sequelize.define('SupplierInventoryTransaction', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  supplier_company_id: { type: DataTypes.INTEGER, allowNull: false },
  supplier_product_id: { type: DataTypes.INTEGER, allowNull: false },
  transaction_type: {
    type: DataTypes.ENUM('initial', 'manual_receive', 'manual_adjust', 'po_shipped', 'sale', 'waste'),
    allowNull: false
  },
  quantity_change: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
    comment: '양수: 증가, 음수: 감소'
  },
  unit: { type: DataTypes.STRING(20), allowNull: true },
  stock_after: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
    comment: '거래 후 재고'
  },
  reason: {
    type: DataTypes.STRING(40),
    allowNull: true,
    comment: 'adjustment 시: lost/damaged/correction/other 등'
  },
  reference_type: {
    type: DataTypes.ENUM('manual', 'purchase_order', 'sales_order'),
    allowNull: false,
    defaultValue: 'manual'
  },
  reference_id: { type: DataTypes.INTEGER, allowNull: true },
  unit_cost: { type: DataTypes.DECIMAL(12, 2), allowNull: true },
  batch_no: { type: DataTypes.STRING(60), allowNull: true },
  notes: { type: DataTypes.TEXT, allowNull: true },
  created_by: { type: DataTypes.INTEGER, allowNull: true },
  created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
}, {
  tableName: 'supplier_inventory_transactions',
  timestamps: false,
  indexes: [
    { fields: ['supplier_company_id'] },
    { fields: ['supplier_product_id'] },
    { fields: ['created_at'] }
  ]
});

module.exports = SupplierInventoryTransaction;

const { DataTypes, Model } = require('sequelize');
const database = require('../config/database');

class InvoiceItem extends Model {}

InvoiceItem.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  invoice_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  item_type: {
    type: DataTypes.STRING(50),
    allowNull: false,
    comment: 'Item type code from invoice_categories table'
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  calculation_method: {
    type: DataTypes.ENUM('fixed', 'percentage', 'combined'),
    defaultValue: 'fixed'
  },
  fixed_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  percentage_rate: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true
  },
  base_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    comment: 'For percentage calculation (e.g., monthly sales)'
  },
  minimum_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    comment: 'For combined calculation (fixed minimum or percentage, whichever is higher)'
  },
  calculated_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  tax_rate: {
    type: DataTypes.DECIMAL(5, 2),
    defaultValue: 0
  },
  tax_amount: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
  total_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  sequelize: database.sequelize,
  modelName: 'InvoiceItem',
  tableName: 'invoice_items',
  timestamps: true
});

module.exports = InvoiceItem;
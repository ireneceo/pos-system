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
    type: DataTypes.ENUM('subscription', 'solution_fee', 'rent_fixed', 'rent_percentage', 'rent_combined', 'management_fee', 'utility', 'other'),
    allowNull: false
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
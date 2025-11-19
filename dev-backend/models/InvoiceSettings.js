const { DataTypes, Model } = require('sequelize');
const database = require('../config/database');

class InvoiceSettings extends Model {}

InvoiceSettings.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  restaurant_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  },
  auto_generate: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  generation_day: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Day of month to generate invoice (1-28)'
  },
  payment_terms: {
    type: DataTypes.INTEGER,
    defaultValue: 30,
    comment: 'Payment terms in days'
  },
  solution_fee_enabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  solution_fee_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  rent_enabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  rent_type: {
    type: DataTypes.ENUM('fixed', 'percentage', 'combined'),
    allowNull: true
  },
  rent_fixed_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  rent_percentage_rate: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true
  },
  rent_minimum_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    comment: 'For combined type: minimum fixed amount'
  },
  additional_fees: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'JSON array of additional fee configurations',
    get() {
      const value = this.getDataValue('additional_fees');
      return value ? JSON.parse(value) : null;
    },
    set(value) {
      this.setDataValue('additional_fees', value ? JSON.stringify(value) : null);
    }
  },
  tax_rate: {
    type: DataTypes.DECIMAL(5, 2),
    defaultValue: 10,
    comment: 'Default tax rate percentage'
  },
  invoice_prefix: {
    type: DataTypes.STRING,
    defaultValue: 'INV',
    comment: 'Prefix for invoice numbers'
  },
  notes_template: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Default notes for invoices'
  }
}, {
  sequelize: database.sequelize,
  modelName: 'InvoiceSettings',
  tableName: 'invoice_settings',
  timestamps: true
});

module.exports = InvoiceSettings;
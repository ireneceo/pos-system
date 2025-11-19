const { DataTypes, Model } = require('sequelize');
const database = require('../config/database');

class Invoice extends Model {}

Invoice.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  restaurant_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  invoice_number: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('automatic', 'manual'),
    defaultValue: 'manual'
  },
  billing_period_start: {
    type: DataTypes.DATE,
    allowNull: false
  },
  billing_period_end: {
    type: DataTypes.DATE,
    allowNull: false
  },
  due_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  total_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  paid_amount: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
  status: {
    type: DataTypes.ENUM('draft', 'pending_payment', 'payment_submitted', 'paid', 'overdue', 'cancelled'),
    defaultValue: 'draft'
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  issued_by: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  issued_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  paid_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  payment_method: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  transaction_id: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  payment_notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  receipt_url: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  payer_type: {
    type: DataTypes.ENUM('restaurant', 'foodcourt_manager', 'brand_manager'),
    defaultValue: 'restaurant',
    comment: 'Who is responsible for payment'
  },
  payer_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'ID of the payer (manager_id if payer_type is manager)'
  },
  invoice_category: {
    type: DataTypes.ENUM('subscription', 'service', 'consulting', 'others'),
    defaultValue: 'subscription',
    comment: 'Invoice category type'
  },
  custom_description: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: 'Custom description for others category'
  },
  service_description: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Detailed service or consulting description'
  }
}, {
  sequelize: database.sequelize,
  modelName: 'Invoice',
  tableName: 'invoices',
  timestamps: true
});

module.exports = Invoice;
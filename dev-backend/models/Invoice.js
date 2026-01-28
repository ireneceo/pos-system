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
    allowNull: true,
    comment: 'Null when invoice is for brand_manager or foodcourt_manager'
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
    allowNull: true,
    comment: 'Null for manual invoices without billing period'
  },
  billing_period_end: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'Null for manual invoices without billing period'
  },
  due_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  total_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  currency: {
    type: DataTypes.STRING(10),
    defaultValue: 'MYR',
    comment: 'Invoice currency code'
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
    type: DataTypes.TEXT('long'),
    allowNull: true,
    comment: 'Payment receipt image URL or base64 data'
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
    type: DataTypes.STRING(50),
    defaultValue: 'service',
    comment: 'Invoice category code from invoice_categories table'
  },
  category_display_name: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: 'Display name for the invoice category (e.g., Subscription - Professional)'
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
  },
  // Issuer Information (Who issued this invoice)
  issuer_type: {
    type: DataTypes.ENUM('system_admin', 'brand', 'foodcourt'),
    defaultValue: 'system_admin',
    comment: 'Who issued this invoice'
  },
  issuer_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Brand ID or Foodcourt ID (null for system admin)'
  },
  // Payment Gateway Information
  payment_provider: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: 'stripe, paypal, bank_transfer, qr_payment'
  },
  payment_intent_id: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: 'Stripe PaymentIntent ID or PayPal Order ID'
  },
  // Payment Confirmation (by issuer)
  confirmed_by: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'User ID who confirmed payment'
  },
  confirmed_at: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'When payment was confirmed'
  },
  rejection_reason: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Reason for payment rejection'
  },
  // Payment Submission Date (when payer submitted receipt)
  payment_submitted_at: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'When payment receipt was submitted'
  },
  // Additional Charges (Tax, Service Charge, etc.)
  additional_charges: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: [],
    comment: 'Array of additional charges: [{name: "Tax", rate: 6, amount: 6.00}, ...]'
  }
}, {
  sequelize: database.sequelize,
  modelName: 'Invoice',
  tableName: 'invoices',
  timestamps: true
});

module.exports = Invoice;
const { DataTypes, Model } = require('sequelize');
const database = require('../config/database');

class Foodcourt extends Model {}

Foodcourt.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: 'Foodcourt name'
  },
  code: {
    type: DataTypes.STRING(50),
    allowNull: true,
    unique: true,
    comment: 'Foodcourt code for identification'
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  logo_url: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Foodcourt logo image URL or base64'
  },
  owner_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Foodcourt General user ID who owns this foodcourt'
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active'
  },
  // Company Information
  company_name: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: 'Legal company name'
  },
  registration_no: {
    type: DataTypes.STRING(100),
    allowNull: true,
    comment: 'Business registration number'
  },
  trade_name: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: 'Trading name'
  },
  tax_no: {
    type: DataTypes.STRING(100),
    allowNull: true,
    comment: 'Tax registration number (SST/GST)'
  },
  // Contact Information
  email: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  address_line_2: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  city: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  state: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  postal_code: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  country: {
    type: DataTypes.CHAR(2),
    defaultValue: 'MY',
    allowNull: true
  },
  website: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  // Banking Information
  bank_name: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  bank_account: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  bank_account_name: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  currency: {
    type: DataTypes.STRING(10),
    defaultValue: 'MYR',
    allowNull: false,
    comment: 'Default currency for foodcourt restaurants (MYR, USD, SGD, KRW, THB)'
  },
  // Operation Settings
  operation_settings: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'JSON settings for foodcourt operations (timezone, opening hours)',
    get() {
      const rawValue = this.getDataValue('operation_settings');
      const defaultSettings = {
        openingTime: '09:00',
        closingTime: '22:00',
        timeZone: 'Asia/Kuala_Lumpur'
      };
      if (!rawValue) {
        return defaultSettings;
      }
      try {
        return { ...defaultSettings, ...JSON.parse(rawValue) };
      } catch (e) {
        return defaultSettings;
      }
    },
    set(value) {
      if (!value) {
        this.setDataValue('operation_settings', null);
      } else {
        this.setDataValue('operation_settings', typeof value === 'string' ? value : JSON.stringify(value));
      }
    }
  },
  // Payment Settings for Invoice (B2B)
  payment_settings: {
    type: DataTypes.TEXT('medium'),
    allowNull: true,
    comment: 'JSON settings for payment methods (Stripe, PayPal, Bank Transfer, QR)',
    get() {
      const rawValue = this.getDataValue('payment_settings');
      if (!rawValue) {
        return {
          currencies: ['MYR'],
          defaultCurrency: 'MYR',
          stripe: { enabled: false },
          paypal: { enabled: false },
          bankTransfer: {},
          qrPayment: {}
        };
      }
      try {
        return JSON.parse(rawValue);
      } catch (e) {
        return {
          currencies: ['MYR'],
          defaultCurrency: 'MYR',
          stripe: { enabled: false },
          paypal: { enabled: false },
          bankTransfer: {},
          qrPayment: {}
        };
      }
    },
    set(value) {
      if (!value) {
        this.setDataValue('payment_settings', null);
      } else {
        this.setDataValue('payment_settings', typeof value === 'string' ? value : JSON.stringify(value));
      }
    }
  },
  // Invoice Settings
  invoice_settings: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'JSON settings for invoice generation (prefix, terms, tax)',
    get() {
      const rawValue = this.getDataValue('invoice_settings');
      const defaultSettings = {
        invoicePrefix: 'INV',
        paymentTerms: 30,
        taxRate: 6,
        autoGenerate: false,
        autoSendEmail: false
      };
      if (!rawValue) {
        return defaultSettings;
      }
      try {
        return { ...defaultSettings, ...JSON.parse(rawValue) };
      } catch (e) {
        return defaultSettings;
      }
    },
    set(value) {
      if (!value) {
        this.setDataValue('invoice_settings', null);
      } else {
        this.setDataValue('invoice_settings', typeof value === 'string' ? value : JSON.stringify(value));
      }
    }
  },
  // Supported Currencies
  supported_currencies: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'JSON array of supported currency codes',
    get() {
      const rawValue = this.getDataValue('supported_currencies');
      if (!rawValue) {
        return ['MYR'];
      }
      try {
        return JSON.parse(rawValue);
      } catch (e) {
        return ['MYR'];
      }
    },
    set(value) {
      this.setDataValue('supported_currencies', value ? JSON.stringify(value) : null);
    }
  },
  // Subscription Info (System Admin이 발행한 Invoice 결제용)
  subscription_status: {
    type: DataTypes.ENUM('active', 'trial', 'overdue', 'expired', 'suspended', 'cancelled'),
    defaultValue: 'trial',
    comment: 'Foodcourt subscription status'
  },
  subscription_start: {
    type: DataTypes.DATE,
    allowNull: true
  },
  subscription_end: {
    type: DataTypes.DATE,
    allowNull: true
  },
  trial_end_date: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'Trial period end date'
  },
  grace_period_start: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'Grace period start date (when overdue begins)'
  },
  last_trial_reminder_day: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Last threshold (3/0/-1) at which trial-expiry reminder was sent.'
  },
  plan_type: {
    type: DataTypes.STRING(100),
    allowNull: true,
    comment: 'Foodcourt plan type (e.g., Foodcourt Basic, Foodcourt Professional)'
  },
  plan_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    comment: 'Current subscription plan amount'
  },
  billing_cycle: {
    type: DataTypes.ENUM('monthly', 'annual'),
    defaultValue: 'monthly',
    comment: 'Billing cycle for subscription'
  },
  is_demo: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
    comment: 'Demo foodcourt flag - excluded from real revenue statistics'
  },
  is_test: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
    comment: 'Test foodcourt flag - excluded from statistics, shown with TEST badge'
  }
}, {
  sequelize: database.sequelize,
  modelName: 'Foodcourt',
  tableName: 'foodcourts',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Foodcourt;

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
    type: DataTypes.STRING(10),
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
    defaultValue: 'RM',
    allowNull: false,
    comment: 'Default currency for foodcourt restaurants (RM, USD, SGD, JPY, THB, KRW)'
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
      this.setDataValue('operation_settings', value ? JSON.stringify(value) : null);
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
      this.setDataValue('payment_settings', value ? JSON.stringify(value) : null);
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
      this.setDataValue('invoice_settings', value ? JSON.stringify(value) : null);
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
    type: DataTypes.ENUM('active', 'trial', 'expired', 'suspended', 'cancelled'),
    defaultValue: 'active',
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
  plan_type: {
    type: DataTypes.STRING(100),
    allowNull: true,
    comment: 'Foodcourt plan type (e.g., Foodcourt Basic, Foodcourt Professional)'
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

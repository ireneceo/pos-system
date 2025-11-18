const { DataTypes, Model } = require('sequelize');
const database = require('../config/database');

class Restaurant extends Model {}

Restaurant.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  slug: {
    type: DataTypes.STRING(255),
    allowNull: true,
    unique: true,
    comment: 'URL-friendly restaurant identifier'
  },
  manager_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  manager_name: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
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
    type: DataTypes.STRING(100),
    defaultValue: 'Malaysia',
    allowNull: true
  },
  business_registration: {
    type: DataTypes.STRING(100),
    allowNull: true,
    comment: 'Business registration number'
  },
  trade_name: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: 'Trading name or brand name'
  },
  tax_id: {
    type: DataTypes.STRING(100),
    allowNull: true,
    comment: 'Tax identification number (SST/GST)'
  },
  website: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  bank_name: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  bank_account: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  bank_account_name: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  logo_url: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'URL or base64 encoded logo image'
  },
  plan_type: {
    type: DataTypes.ENUM('Basic Plan', 'Professional Plan', 'Enterprise Plan'),
    defaultValue: 'Basic Plan'
  },
  plan_amount: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 29.00
  },
  billing_cycle: {
    type: DataTypes.ENUM('monthly', 'annual'),
    defaultValue: 'monthly'
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active'
  },
  subscription_start: {
    type: DataTypes.DATE,
    allowNull: true
  },
  subscription_end: {
    type: DataTypes.DATE,
    allowNull: true
  },
  created_by: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  subscription_snapshot: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'JSON snapshot of plan details at subscription time',
    get() {
      const rawValue = this.getDataValue('subscription_snapshot');
      return rawValue ? JSON.parse(rawValue) : null;
    },
    set(value) {
      this.setDataValue('subscription_snapshot', value ? JSON.stringify(value) : null);
    }
  },
  order_limit: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 1000,
    comment: 'Monthly order limit from subscription plan'
  },
  menu_item_limit: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 50,
    comment: 'Menu item limit from subscription plan'
  },
  staff_limit: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 5,
    comment: 'Staff account limit from subscription plan'
  },
  payment_settings: {
    type: DataTypes.TEXT('medium'),  // MEDIUMTEXT to support large base64 images
    allowNull: true,
    comment: 'JSON settings for payment methods',
    get() {
      const rawValue = this.getDataValue('payment_settings');
      if (!rawValue) {
        // Default payment settings with detailed configuration
        return {
          cash: {
            enabled: true,
            label: 'Cash',
            availableIn: ['pos']
          },
          card: {
            enabled: true,
            label: 'Credit/Debit Card',
            availableIn: ['pos', 'mobile'],
            provider: '', // 'ipay88', 'molpay', '2c2p', 'stripe', 'paypal'
            config: {
              // iPay88
              ipay88MerchantCode: '',
              ipay88MerchantKey: '',
              // MOLPay
              molpayMerchantId: '',
              molpayVerifyKey: '',
              molpaySecretKey: '',
              // 2C2P
              '2c2pMerchantId': '',
              '2c2pSecretKey': '',
              // Stripe
              stripePublicKey: '',
              stripeSecretKey: '',
              // PayPal
              paypalClientId: '',
              paypalClientSecret: ''
            }
          },
          ewallet: {
            enabled: true,
            label: 'E-Wallet',
            availableIn: ['pos', 'mobile'],
            provider: '', // 'tng', 'grabpay', 'boost', 'shopeepay'
            config: {
              // Touch 'n Go eWallet
              tngMerchantId: '',
              tngApiKey: '',
              // GrabPay
              grabpayMerchantId: '',
              grabpayClientId: '',
              grabpayClientSecret: '',
              // Boost
              boostMerchantId: '',
              boostApiKey: '',
              // ShopeePay
              shopeePayMerchantId: '',
              shopeePayApiKey: ''
            }
          },
          bankTransfer: {
            enabled: true,
            label: 'Bank Transfer',
            availableIn: ['pos', 'mobile'],
            bankName: '',
            accountNumber: '',
            accountName: ''
          },
          qr: {
            enabled: true,
            label: 'QR Payment',
            availableIn: ['mobile'],
            qrImage: ''
          },
          counter: {
            enabled: true,
            label: 'Pay at Counter',
            availableIn: ['mobile']
          },
          online: {
            enabled: false,
            label: 'Online Payment',
            availableIn: ['mobile'],
            provider: '', // 'stripe', 'paypal', 'both'
            config: {
              // Stripe
              stripePublicKey: '',
              stripeSecretKey: '',
              // PayPal
              paypalClientId: '',
              paypalClientSecret: ''
            }
          },
          fpx: {
            enabled: true,
            label: 'FPX Online Banking',
            availableIn: ['mobile'],
            provider: '', // 'ipay88', 'molpay', '2c2p'
            config: {
              // iPay88 FPX
              ipay88MerchantCode: '',
              ipay88MerchantKey: '',
              // MOLPay FPX
              molpayMerchantId: '',
              molpayVerifyKey: '',
              molpaySecretKey: '',
              // 2C2P FPX
              '2c2pMerchantId': '',
              '2c2pSecretKey': ''
            }
          }
        };
      }
      return JSON.parse(rawValue);
    },
    set(value) {
      this.setDataValue('payment_settings', value ? JSON.stringify(value) : null);
    }
  },
  operation_settings: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'JSON settings for restaurant operations (timezone, opening hours, tax, service charge, etc.)',
    get() {
      const rawValue = this.getDataValue('operation_settings');
      const defaultSettings = {
        openingTime: '09:00',
        closingTime: '22:00',
        timeZone: 'Asia/Kuala_Lumpur',
        orderNumberReset: 'daily',
        defaultPreparationTime: 15,
        taxEnabled: true,
        taxRate: 6,
        serviceChargeEnabled: false,
        serviceChargeRate: 10,
        pagerSystem: {
          enabled: false,
          totalPagers: 50
        },
        takeawayPricing: {
          enabled: false,
          pricingType: 'per-item',
          perItemCharge: 0.50,
          categoryCharges: {
            food: 1.00,
            beverage: 0.50,
            dessert: 0.50,
            other: 0.50
          }
        },
        loyaltyTiers: {
          enabled: true,
          bronze: {
            minOrders: 0,
            minSpent: 0
          },
          silver: {
            minOrders: 5,
            minSpent: 500
          },
          gold: {
            minOrders: 15,
            minSpent: 1500
          },
          vip: {
            minOrders: 30,
            minSpent: 3000
          }
        }
      };

      if (!rawValue) {
        return defaultSettings;
      }
      try {
        const parsed = JSON.parse(rawValue);
        // Merge defaults with parsed values, ensuring nested objects are properly merged
        return {
          ...defaultSettings,
          ...parsed,
          pagerSystem: {
            ...defaultSettings.pagerSystem,
            ...(parsed.pagerSystem || {})
          },
          takeawayPricing: {
            ...defaultSettings.takeawayPricing,
            ...(parsed.takeawayPricing || {}),
            categoryCharges: {
              ...defaultSettings.takeawayPricing.categoryCharges,
              ...((parsed.takeawayPricing && parsed.takeawayPricing.categoryCharges) || {})
            }
          },
          loyaltyTiers: {
            ...defaultSettings.loyaltyTiers,
            ...(parsed.loyaltyTiers || {}),
            bronze: {
              ...defaultSettings.loyaltyTiers.bronze,
              ...((parsed.loyaltyTiers && parsed.loyaltyTiers.bronze) || {})
            },
            silver: {
              ...defaultSettings.loyaltyTiers.silver,
              ...((parsed.loyaltyTiers && parsed.loyaltyTiers.silver) || {})
            },
            gold: {
              ...defaultSettings.loyaltyTiers.gold,
              ...((parsed.loyaltyTiers && parsed.loyaltyTiers.gold) || {})
            },
            vip: {
              ...defaultSettings.loyaltyTiers.vip,
              ...((parsed.loyaltyTiers && parsed.loyaltyTiers.vip) || {})
            }
          }
        };
      } catch (e) {
        return defaultSettings;
      }
    },
    set(value) {
      this.setDataValue('operation_settings', value ? JSON.stringify(value) : null);
    }
  },
  currency: {
    type: DataTypes.STRING(10),
    defaultValue: 'RM',
    allowNull: false,
    comment: 'Currency code (RM, USD, SGD, JPY, THB)'
  },
  cash_rounding: {
    type: DataTypes.DECIMAL(4, 2),
    allowNull: true,
    comment: 'Cash rounding precision (0.05, 0.10, 1.00, or NULL for disabled)'
  },
  rounding_apply_to: {
    type: DataTypes.ENUM('cash_only', 'all'),
    defaultValue: 'cash_only',
    comment: 'Apply rounding to cash only or all payments'
  }
}, {
  sequelize: database.sequelize,
  modelName: 'Restaurant',
  tableName: 'restaurants',
  timestamps: true
});

module.exports = Restaurant;
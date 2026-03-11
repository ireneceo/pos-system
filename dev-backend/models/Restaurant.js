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
  admin_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Restaurant Admin user ID (1:1 relationship)'
  },
  admin_name: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: 'Restaurant Admin display name'
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
    type: DataTypes.STRING(100),
    defaultValue: 'Basic Plan',
    comment: 'Subscription plan name (Basic Plan, Professional Plan, Enterprise Plan, or custom)'
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
    type: DataTypes.ENUM('active', 'inactive', 'trial', 'overdue', 'suspended', 'expired', 'cancelled'),
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
  auto_renew: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    comment: 'Whether subscription auto-renews at expiry'
  },
  grace_period_start: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'When the grace period started (for overdue status tracking)'
  },
  trial_end_date: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'When the trial period ends'
  },
  last_payment_date: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'Last successful payment date'
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
        },
        // Order Type Settings
        orderTypes: {
          dineIn: true,
          takeaway: true,
          pickup: false,
          delivery: false
        },
        // Break Times (array of {start, end} objects)
        breakTimes: []
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
          },
          orderTypes: {
            ...defaultSettings.orderTypes,
            ...(parsed.orderTypes || {})
          },
          breakTimes: parsed.breakTimes || defaultSettings.breakTimes
        };
      } catch (e) {
        return defaultSettings;
      }
    },
    set(value) {
      this.setDataValue('operation_settings', value ? JSON.stringify(value) : null);
    }
  },
  table_settings: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'JSON settings for table numbers and QR codes',
    get() {
      const rawValue = this.getDataValue('table_settings');
      if (!rawValue) {
        return {
          enableTableNumbers: true,
          tableNumberRequired: false,
          tablePrefix: 'T',
          totalTables: 20,
          qrCodeBaseUrl: ''
        };
      }
      try {
        return JSON.parse(rawValue);
      } catch (e) {
        return {
          enableTableNumbers: true,
          tableNumberRequired: false,
          tablePrefix: 'T',
          totalTables: 20,
          qrCodeBaseUrl: ''
        };
      }
    },
    set(value) {
      this.setDataValue('table_settings', value ? JSON.stringify(value) : null);
    }
  },
  floor_plan: {
    type: DataTypes.TEXT('medium'),
    allowNull: true,
    comment: 'JSON floor plan layout data (table positions, shapes, sizes)',
    get() {
      const rawValue = this.getDataValue('floor_plan');
      if (!rawValue) return null;
      try { return JSON.parse(rawValue); } catch (e) { return null; }
    },
    set(value) {
      this.setDataValue('floor_plan', value ? JSON.stringify(value) : null);
    }
  },
  printer_settings: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'JSON settings for printers (bill printer, kitchen printer, printer mode)',
    get() {
      const rawValue = this.getDataValue('printer_settings');
      const defaultSettings = {
        printerMode: 'rawbt',
        billPrinter: {
          enabled: true,
          name: '',
          autoPrint: false
        },
        kitchenPrinter: {
          enabled: true,
          name: '',
          autoPrint: true
        }
      };
      if (!rawValue) {
        return defaultSettings;
      }
      try {
        const parsed = JSON.parse(rawValue);
        return {
          ...defaultSettings,
          ...parsed,
          billPrinter: { ...defaultSettings.billPrinter, ...(parsed.billPrinter || {}) },
          kitchenPrinter: { ...defaultSettings.kitchenPrinter, ...(parsed.kitchenPrinter || {}) }
        };
      } catch (e) {
        return defaultSettings;
      }
    },
    set(value) {
      this.setDataValue('printer_settings', value ? JSON.stringify(value) : null);
    }
  },
  currency: {
    type: DataTypes.STRING(10),
    defaultValue: 'MYR',
    allowNull: false,
    comment: 'Currency code (MYR, USD, SGD, KRW, THB)'
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
  },
  brand_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Brand ID if restaurant belongs to a franchise brand'
  },
  payment_model: {
    type: DataTypes.ENUM('restaurant', 'brand_manager', 'foodcourt_manager', 'restaurant_owner'),
    defaultValue: 'restaurant',
    allowNull: false,
    comment: 'Who pays invoices: restaurant (Restaurant Admin), brand_manager (Brand General), foodcourt_manager (Foodcourt General), restaurant_owner (Restaurant Owner)'
  },
  foodcourt_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Foodcourt ID if restaurant is a tenant in a foodcourt'
  },
  // Subscription Discount (applied by System Admin)
  discount_type: {
    type: DataTypes.ENUM('none', 'percentage', 'fixed'),
    defaultValue: 'none',
    comment: 'Subscription discount type'
  },
  discount_value: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
    comment: 'Discount value (percentage rate or fixed amount)'
  },
  discount_reason: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: 'Reason for discount'
  },
  is_demo: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
    comment: 'Demo restaurant flag - excluded from real revenue statistics'
  }
}, {
  sequelize: database.sequelize,
  modelName: 'Restaurant',
  tableName: 'restaurants',
  timestamps: true,
  hooks: {
    beforeCreate: async (restaurant) => {
      // Auto-generate slug if not provided
      if (!restaurant.slug && restaurant.name) {
        restaurant.slug = generateSlug(restaurant.name);

        // Ensure unique slug
        let counter = 1;
        let baseSlug = restaurant.slug;
        while (await Restaurant.findOne({ where: { slug: restaurant.slug } })) {
          restaurant.slug = `${baseSlug}-${counter}`;
          counter++;
        }
      }
    },
    beforeUpdate: async (restaurant) => {
      // Auto-generate slug if name changed and slug is null
      if (restaurant.changed('name') && !restaurant.slug && restaurant.name) {
        restaurant.slug = generateSlug(restaurant.name);

        // Ensure unique slug
        let counter = 1;
        let baseSlug = restaurant.slug;
        while (await Restaurant.findOne({ where: { slug: restaurant.slug, id: { [database.Sequelize.Op.ne]: restaurant.id } } })) {
          restaurant.slug = `${baseSlug}-${counter}`;
          counter++;
        }
      }
    }
  }
});

// Helper function to generate URL-friendly slug
function generateSlug(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-')          // Replace spaces with hyphens
    .replace(/-+/g, '-')           // Replace multiple hyphens with single hyphen
    .substring(0, 100);            // Limit length
}

module.exports = Restaurant;
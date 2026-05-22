const { DataTypes, Model } = require('sequelize');
const database = require('../config/database');

/**
 * Floor plan v1 → v2 lazy migration.
 * v1: { version: 1, canvasWidth, canvasHeight, gridSize, showGrid, tables: [{id, tableNumber, label, ...}] }
 * v2: v1 fields + zones[] + table_groups[] + tables 에 group_id 추가.
 * 옛 매장은 default zone "Main" + default group (prefix=table_settings.tablePrefix||'T') 자동 생성.
 * @param {object} v1 — parsed v1 floor_plan
 * @param {string|null} rawTableSettings — raw table_settings JSON string (옛 prefix 추출용)
 * @returns {object} v2 floor_plan (in-memory, DB 저장은 다음 update 때 자동)
 */
function migrateFloorPlanV1ToV2(v1, rawTableSettings) {
  if (!v1 || typeof v1 !== 'object') return v1;
  // Extract legacy prefix from table_settings for default group.
  let defaultPrefix = 'T';
  try {
    if (rawTableSettings) {
      const ts = typeof rawTableSettings === 'string' ? JSON.parse(rawTableSettings) : rawTableSettings;
      if (ts && typeof ts.tablePrefix === 'string' && ts.tablePrefix.trim()) {
        defaultPrefix = ts.tablePrefix.trim();
      }
    }
  } catch (e) { /* keep default */ }

  const zoneId = 'z_main';
  const groupId = 'g_main';
  const oldTables = Array.isArray(v1.tables) ? v1.tables : [];

  return {
    version: 2,
    canvasWidth: v1.canvasWidth || 1200,
    canvasHeight: v1.canvasHeight || 800,
    gridSize: v1.gridSize || 20,
    showGrid: v1.showGrid !== false,
    zones: [{
      id: zoneId,
      name: 'Main',
      sort_order: 1,
      manager_user_ids: []
    }],
    table_groups: [{
      id: groupId,
      zone_id: zoneId,
      name: 'Tables',
      prefix: defaultPrefix,
      sort_order: 1
    }],
    tables: oldTables.map(t => ({
      ...t,
      group_id: t.group_id || groupId
    })),
    // Preserve any extra v1 keys (fixtures, etc.) for safety
    ...(v1.fixtures ? { fixtures: v1.fixtures } : {})
  };
}

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
  branch_name: {
    type: DataTypes.STRING(100),
    allowNull: true,
    comment: 'Branch/location name (e.g. Bukit Bintang, Sunway Pyramid)'
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
  address_line_2: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  // 별도 배송지 (NULL = 매장 주소 사용)
  delivery_address: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: '배송지가 매장 주소와 다를 때만 채움. NULL이면 매장 address 사용.'
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
    allowNull: true
  },
  latitude: {
    type: DataTypes.DECIMAL(10, 7),
    allowNull: true
  },
  longitude: {
    type: DataTypes.DECIMAL(10, 7),
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
  last_trial_reminder_day: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Last threshold (3/0/-1) at which trial-expiry reminder was sent. Reset when trial_end_date changes.'
  },
  last_payment_date: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'Last successful payment date'
  },
  pending_plan_type: {
    type: DataTypes.STRING(100),
    allowNull: true,
    comment: 'Scheduled plan change - new plan name'
  },
  pending_plan_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    comment: 'Scheduled plan change - new plan amount'
  },
  pending_billing_cycle: {
    type: DataTypes.ENUM('monthly', 'annual'),
    allowNull: true,
    comment: 'Scheduled plan change - new billing cycle'
  },
  plan_change_date: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'Date when pending plan change takes effect'
  },
  plan_change_type: {
    type: DataTypes.ENUM('downgrade', 'cycle_change'),
    allowNull: true,
    comment: 'Type of scheduled plan change'
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
            label: 'Card',
            availableIn: ['pos']
          },
          ewallet: {
            enabled: true,
            label: 'E-Wallet',
            availableIn: ['pos', 'mobile'],
            qrImage: '' // QR code image for customer scanning
          },
          bankTransfer: {
            enabled: true,
            label: 'Bank Transfer',
            availableIn: ['pos', 'mobile'],
            bankName: '',
            accountNumber: '',
            accountName: ''
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
              stripePublicKey: '',
              stripeSecretKey: '',
              paypalClientId: '',
              paypalClientSecret: ''
            }
          },
          staffMeal: {
            enabled: false,
            label: 'Staff Meal',
            availableIn: ['pos']
          }
        };
      }
      return JSON.parse(rawValue);
    },
    set(value) {
      if (!value) {
        this.setDataValue('payment_settings', null);
      } else {
        this.setDataValue('payment_settings', typeof value === 'string' ? value : JSON.stringify(value));
      }
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
      if (!value) {
        this.setDataValue('operation_settings', null);
      } else {
        this.setDataValue('operation_settings', typeof value === 'string' ? value : JSON.stringify(value));
      }
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
      if (!value) {
        this.setDataValue('table_settings', null);
      } else {
        this.setDataValue('table_settings', typeof value === 'string' ? value : JSON.stringify(value));
      }
    }
  },
  reservation_settings: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'JSON settings for reservations (slot, deposit, cancellation, no-show policy, closed dates)',
    get() {
      const rawValue = this.getDataValue('reservation_settings');
      if (!rawValue) {
        return {
          enabled: false,
          auto_confirm: false,
          slot: { duration_minutes: 30, turn_time_minutes: 90, advance_booking_days: 60, min_advance_hours: 1, min_party: 1, max_party: 20, max_covers_per_slot: 40 },
          deposit: { enabled: false, type: 'fixed', amount: 0, min_party_for_deposit: 6 },
          cancellation_policy: { free_until_hours: 24, partial_refund_pct: 50, no_refund_after_hours: 2 },
          no_show_policy: { grace_minutes: 15, auto_cancel_after_minutes: 30, block_after_count: 3 },
          closed_dates: []
        };
      }
      try { return JSON.parse(rawValue); } catch (e) { return null; }
    },
    set(value) {
      if (!value) { this.setDataValue('reservation_settings', null); }
      else { this.setDataValue('reservation_settings', typeof value === 'string' ? value : JSON.stringify(value)); }
    }
  },
  floor_plan: {
    type: DataTypes.TEXT('medium'),
    allowNull: true,
    comment: 'JSON floor plan layout data v2 (zones, table_groups, tables). v1 lazy migrate on read.',
    get() {
      const rawValue = this.getDataValue('floor_plan');
      if (!rawValue) return null;
      try {
        const parsed = JSON.parse(rawValue);
        // Lazy migrate v1 → v2 — 옛 매장 read 시 자동 변환. DB save 는 다음 update 때 자동 (UI 가 갱신 시).
        if (!parsed || parsed.version === 2) return parsed;
        return migrateFloorPlanV1ToV2(parsed, this.getDataValue('table_settings'));
      } catch (e) { return null; }
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
  // Trade billing terms (BG/FG → Restaurant) — see docs/BG_FG_TRADE_BILLING.md
  // Schema mirrors SupplierContract.payment_terms:
  //   { terms, invoice_cycle: 'immediate'|'monthly_soa', payment_due_day, credit_limit, currency, notes }
  // NULL = immediate (default). Set by Brand General / Foodcourt General per restaurant.
  brand_billing_terms: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: null,
    comment: 'Brand → Restaurant trade billing terms. NULL = immediate (default).'
  },
  foodcourt_billing_terms: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: null,
    comment: 'Foodcourt → Restaurant trade billing terms. NULL = immediate (default).'
  },
  branch_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'FoodcourtBranch ID — specific branch within the foodcourt this restaurant occupies'
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
  },
  is_test: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
    comment: 'Test restaurant flag - excluded from statistics, shown with TEST badge'
  },
  kitchen_assignment_mode: {
    type: DataTypes.STRING(20),
    defaultValue: 'category',
    allowNull: false,
    comment: 'Kitchen station assignment mode: category or menu_item'
  },
  kitchen_item_merge: {
    type: DataTypes.TEXT,
    allowNull: true,
    get() {
      const value = this.getDataValue('kitchen_item_merge');
      if (!value) return { time_limit: 0, max_count: 0 };
      try { return JSON.parse(value); } catch { return { time_limit: 0, max_count: 0 }; }
    },
    set(value) {
      this.setDataValue('kitchen_item_merge', typeof value === 'string' ? value : JSON.stringify(value));
    },
    comment: 'Item merge settings for Kitchen Display Item View: {time_limit: minutes, max_count: number}'
  },
  mobile_settings: {
    type: DataTypes.TEXT,
    allowNull: true,
    get() {
      const value = this.getDataValue('mobile_settings');
      if (!value) return { show_featured: true, show_popular: true };
      try { return JSON.parse(value); } catch { return { show_featured: true, show_popular: true }; }
    },
    set(value) {
      this.setDataValue('mobile_settings', value ? JSON.stringify(value) : null);
    },
    comment: 'Mobile order display settings (JSON)'
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
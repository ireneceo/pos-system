const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const SupplierCompany = sequelize.define('SupplierCompany', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(255), allowNull: false, comment: 'Supplier company name' },
  code: { type: DataTypes.STRING(50), allowNull: true, unique: true },
  description: { type: DataTypes.TEXT, allowNull: true },
  logo_url: { type: DataTypes.TEXT, allowNull: true },
  owner_id: { type: DataTypes.INTEGER, allowNull: true, comment: 'Supplier Admin user id (null for external)' },
  status: { type: DataTypes.ENUM('active', 'inactive', 'suspended'), defaultValue: 'active' },

  // 시스템 가입 여부 — false 면 buyer 가 직접 등록한 외부 공급업체.
  // 외부면 자동 발주 알림 안 보냄 (PDF/WhatsApp 직접 발송).
  is_system_registered: {
    type: DataTypes.BOOLEAN, defaultValue: true, allowNull: false,
    comment: 'true=시스템 가입 supplier, false=buyer 가 등록한 외부 supplier'
  },
  // 외부 supplier 인 경우 어느 buyer 가 만들었는지 (entity_type, entity_id)
  registered_by_entity_type: {
    type: DataTypes.ENUM('restaurant', 'brand', 'foodcourt'),
    allowNull: true, comment: '외부 supplier 등록한 buyer 타입'
  },
  registered_by_entity_id: {
    type: DataTypes.INTEGER, allowNull: true,
    comment: '외부 supplier 등록한 buyer id'
  },
  min_order_amount: {
    type: DataTypes.DECIMAL(10, 2), allowNull: true,
    comment: '최소 주문 금액 (RM 등 currency 단위)'
  },
  delivery_policy: {
    type: DataTypes.TEXT, allowNull: true,
    comment: '배송 정책 (배송일, 배송료, 지역 등 자유 텍스트)'
  },

  // Company info
  company_name: { type: DataTypes.STRING(255), allowNull: true },
  registration_no: { type: DataTypes.STRING(100), allowNull: true },
  trade_name: { type: DataTypes.STRING(255), allowNull: true },
  tax_no: { type: DataTypes.STRING(100), allowNull: true },

  // Contact / Address (formatAddress 표준)
  email: { type: DataTypes.STRING(100), allowNull: true },
  phone: { type: DataTypes.STRING(20), allowNull: true },
  address: { type: DataTypes.TEXT, allowNull: true },
  address_line_2: { type: DataTypes.STRING(255), allowNull: true },
  city: { type: DataTypes.STRING(100), allowNull: true },
  state: { type: DataTypes.STRING(100), allowNull: true },
  postal_code: { type: DataTypes.STRING(20), allowNull: true },
  country: { type: DataTypes.CHAR(2), defaultValue: 'MY', allowNull: true },
  website: { type: DataTypes.STRING(255), allowNull: true },
  latitude: { type: DataTypes.DECIMAL(10, 7), allowNull: true },
  longitude: { type: DataTypes.DECIMAL(10, 7), allowNull: true },

  // Banking
  bank_name: { type: DataTypes.STRING(100), allowNull: true },
  bank_account: { type: DataTypes.STRING(50), allowNull: true },
  bank_account_name: { type: DataTypes.STRING(255), allowNull: true },
  currency: { type: DataTypes.STRING(10), defaultValue: 'MYR', allowNull: false },

  // Settings (Brand 패턴 동일 JSON)
  operation_settings: {
    type: DataTypes.TEXT, allowNull: true,
    get() {
      const raw = this.getDataValue('operation_settings');
      const def = { openingTime: '09:00', closingTime: '22:00', timeZone: 'Asia/Kuala_Lumpur' };
      if (!raw) return def;
      try { return { ...def, ...JSON.parse(raw) }; } catch { return def; }
    },
    set(value) { this.setDataValue('operation_settings', !value ? null : (typeof value === 'string' ? value : JSON.stringify(value))); }
  },
  payment_settings: {
    type: DataTypes.TEXT('medium'), allowNull: true,
    get() {
      const raw = this.getDataValue('payment_settings');
      const def = { currencies: ['MYR'], defaultCurrency: 'MYR', stripe: { enabled: false }, paypal: { enabled: false }, bankTransfer: {}, qrPayment: {} };
      if (!raw) return def;
      try { return JSON.parse(raw); } catch { return def; }
    },
    set(value) { this.setDataValue('payment_settings', !value ? null : (typeof value === 'string' ? value : JSON.stringify(value))); }
  },
  invoice_settings: {
    type: DataTypes.TEXT, allowNull: true,
    get() {
      const raw = this.getDataValue('invoice_settings');
      const def = { invoicePrefix: 'INV', paymentTerms: 30, taxRate: 6, autoGenerate: false, autoSendEmail: false };
      if (!raw) return def;
      try { return { ...def, ...JSON.parse(raw) }; } catch { return def; }
    },
    set(value) { this.setDataValue('invoice_settings', !value ? null : (typeof value === 'string' ? value : JSON.stringify(value))); }
  },
  supported_currencies: {
    type: DataTypes.TEXT, allowNull: true,
    get() {
      const raw = this.getDataValue('supported_currencies');
      if (!raw) return ['MYR'];
      try { return JSON.parse(raw); } catch { return ['MYR']; }
    },
    set(value) { this.setDataValue('supported_currencies', value ? JSON.stringify(value) : null); }
  },

  // Subscription (Brand/Foodcourt 패턴 동일)
  subscription_status: {
    type: DataTypes.ENUM('active', 'trial', 'overdue', 'expired', 'suspended', 'cancelled'),
    defaultValue: 'trial'
  },
  subscription_start: { type: DataTypes.DATE, allowNull: true },
  subscription_end: { type: DataTypes.DATE, allowNull: true },
  trial_end_date: { type: DataTypes.DATE, allowNull: true },
  grace_period_start: { type: DataTypes.DATE, allowNull: true },
  last_trial_reminder_day: { type: DataTypes.INTEGER, allowNull: true },
  plan_id: { type: DataTypes.INTEGER, allowNull: true, comment: 'FK to plan_templates' },
  plan_type: { type: DataTypes.STRING(100), allowNull: true },
  plan_amount: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
  billing_cycle: { type: DataTypes.ENUM('monthly', 'annual'), defaultValue: 'monthly' },

  // Flags
  is_demo: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false },
  is_test: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false }
}, {
  tableName: 'supplier_companies',
  timestamps: true,
  underscored: true,
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  indexes: [
    { fields: ['owner_id'] },
    { fields: ['status'] },
    { fields: ['subscription_status'] }
  ]
});

module.exports = SupplierCompany;

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
  // 'owner' = 오너 계정(users.id)이 등록한 업체 — 소유 매장들이 같이 쓴다(상속, 2026-09-24 §H-3)
  registered_by_entity_type: {
    type: DataTypes.ENUM('restaurant', 'brand', 'foodcourt', 'owner'),
    allowNull: true, comment: '외부 supplier 등록한 buyer 타입'
  },
  registered_by_entity_id: {
    type: DataTypes.INTEGER, allowNull: true,
    comment: '외부 supplier 등록한 buyer id'
  },
  // 브랜드가 등록한 외부 공급업체를 산하 매장이 물려받는가 (2026-09-22 Irene
  //   「공급업체는 브랜드제너럴에서 브랜드에 공유해주고 싶으면 해주고 대신 수정 등록 모두 독립적으로 각각 운영」).
  //   기존 행은 true(종전 자동 상속 유지 — 매장이 지금 쓰는 발주가 끊기지 않게). BG 가 새로 등록·이관하는 업체는 false.
  //   상속 판정 3곳이 이 칸을 본다: supplierAccess.findEffectiveContract · GET /external-suppliers · loadVisibleExternalSupplier.
  shared_with_stores: {
    type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true,
    comment: '브랜드 등록 외부 업체를 산하 매장이 상속하는가'
  },
  // 브랜드 → 매장 «공유» = 복사본의 출처 (2026-09-24 Fable ⑥ · docs/SUPPLIER_CONTRACT_SYSTEM.md §H). 추적용, 동기화 아님.
  //   ⚠ DB 에는 생성 칸 copy_live_key 와 UNIQUE(registered_by_entity_type, registered_by_entity_id, copy_live_key) 가 더 있다
  //     (scripts/migrate-add-supplier-copy-columns.js). 모델에 없으므로 `sync-database.js --alter` 를 돌리면 지워진다 — 쓰지 말 것.
  copied_from_supplier_company_id: { type: DataTypes.INTEGER, allowNull: true, comment: '복사본의 출처 업체' },
  copied_at: { type: DataTypes.DATE, allowNull: true },
  copied_by_user_id: { type: DataTypes.INTEGER, allowNull: true },
  // 배송 조건 두 칸 (2026-09-17 Fable 판정 ⑦) — 계산에 쓰는 값은 이 둘뿐이다.
  //   min_order_amount = 이 금액 «이상» 주문하면 무료배송 (경계는 무료)
  //   delivery_fee     = 그 미만일 때 붙는 고정 배송비. null = 규칙 미적용(«미설정», 무료 아님)
  //   단일 해석 자리: utils/purchaseOrderTotals.js computeDeliveryFee
  min_order_amount: {
    type: DataTypes.DECIMAL(10, 2), allowNull: true,
    comment: '무료배송 기준 금액 — 이 금액 이상이면 배송비 0 (currency 단위)'
  },
  delivery_fee: {
    type: DataTypes.DECIMAL(10, 2), allowNull: true,
    comment: '기준 미만일 때 고정 배송비. null = 미설정(규칙 미적용)'
  },
  delivery_policy: {
    type: DataTypes.TEXT, allowNull: true,
    comment: '배송 메모 (배송 요일·지역 등 자유 텍스트) — 계산에는 쓰지 않는다'
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

  // 주문용 상품 링크의 열쇠 (docs/BUYER_FREE_TIER_DESIGN.md §5-6).
  // 공급업체·브랜드가 **같은 칸 이름·같은 규칙**을 쓴다 — 판매자 종류마다 다른 개념을 만들지 않는다.
  // 링크는 `/shop/:slug` 하나이므로 두 표를 가로질러 유일해야 한다(utils/shopSlug.js 가 보장).
  shop_slug: {
    type: DataTypes.STRING(50),
    allowNull: true,
    unique: true,
    comment: '주문용 상품 링크 slug (/shop/:slug). 비면 링크 없음'
  },
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

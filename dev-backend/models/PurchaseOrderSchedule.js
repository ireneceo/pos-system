const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

/**
 * 정기 발주 틀 (Standing order) — 2026-10-22 Fable 설계 .claude/fable-design-20261022-recurring-po.md §2-1.
 * 같은 품목·같은 수량을 정해진 주기에 서버가 발주로 만든다(services/recurringPoScheduler.js).
 * line_items = createPurchaseOrderCore 가 받는 raw items 그대로 — 단가는 저장하지 않는다(생성 시점 판매자 현재가).
 */
const PurchaseOrderSchedule = sequelize.define('PurchaseOrderSchedule', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  entity_type: { type: DataTypes.ENUM('restaurant', 'brand', 'foodcourt'), allowNull: false },
  entity_id: { type: DataTypes.INTEGER, allowNull: false },
  seller_type: { type: DataTypes.ENUM('system_admin', 'brand', 'foodcourt', 'supplier'), allowNull: false },
  seller_entity_id: { type: DataTypes.INTEGER, allowNull: true },
  name: { type: DataTypes.STRING(100), allowNull: true },
  line_items: { type: DataTypes.JSON, allowNull: false, comment: 'createPurchaseOrderCore raw items (단가 없음)' },
  frequency: { type: DataTypes.ENUM('weekly', 'biweekly', 'monthly'), allowNull: false },
  weekday: { type: DataTypes.TINYINT, allowNull: true, comment: '0=Sun … 6=Sat (weekly/biweekly)' },
  day_of_month: { type: DataTypes.TINYINT, allowNull: true, comment: '1~28 (monthly)' },
  next_run_date: { type: DataTypes.DATEONLY, allowNull: true, comment: '구매자 시간대 날짜 — 이 날 07:00 이후 생성' },
  last_run_date: { type: DataTypes.DATEONLY, allowNull: true },
  last_po_id: { type: DataTypes.INTEGER, allowNull: true, comment: '느슨한 참조(FK 없음)' },
  status: {
    type: DataTypes.ENUM('pending_approval', 'active', 'paused', 'ended'),
    allowNull: false, defaultValue: 'active'
  },
  paused_reason: { type: DataTypes.STRING(255), allowNull: true },
  ends_on: { type: DataTypes.DATEONLY, allowNull: true },
  approval_required: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  approved_by_user_id: { type: DataTypes.INTEGER, allowNull: true },
  approved_at: { type: DataTypes.DATE, allowNull: true },
  approved_total: { type: DataTypes.DECIMAL(12, 2), allowNull: true, comment: '오너가 마지막으로 본 총액(허용폭 기준선)' },
  rejected_by_user_id: { type: DataTypes.INTEGER, allowNull: true },
  rejected_at: { type: DataTypes.DATE, allowNull: true },
  rejected_reason: { type: DataTypes.TEXT, allowNull: true },
  price_tolerance_pct: { type: DataTypes.DECIMAL(5, 2), allowNull: false, defaultValue: 10 },
  source_po_id: { type: DataTypes.INTEGER, allowNull: true },
  created_by_user_id: { type: DataTypes.INTEGER, allowNull: false },
  consecutive_failures: { type: DataTypes.TINYINT, allowNull: false, defaultValue: 0 },
  last_error: { type: DataTypes.STRING(500), allowNull: true }
}, {
  tableName: 'purchase_order_schedules',
  timestamps: true,
  underscored: true,
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  indexes: [
    { fields: ['status', 'next_run_date'] },
    { fields: ['entity_type', 'entity_id'] }
  ]
});

module.exports = PurchaseOrderSchedule;

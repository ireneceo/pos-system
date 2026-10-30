const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

// 매장 운영비 규칙·월 실적 — 수익성 분석 설계 §4-2 (.claude/fable-design-20261029-brand-profitability.md).
//   rule: fixed = 월 금액 · pct = 순매출 % · max = 둘 중 큰 값(«RM6,000 과 매출 13 % 중 높은 금액»).
//   period_month NULL = 반복 규칙 · 'YYYY-MM-01' = 그 달 실적(그 달엔 규칙 대신 이 값).
//   지우지 않고 effective_to 로 닫는다 — 지난 달 손익이 흔들리지 않게.
const dateOnly = (key) => ({
  type: DataTypes.DATEONLY,
  allowNull: true,
  get() { const v = this.getDataValue(key); return v instanceof Date ? v.toISOString().slice(0, 10) : v; },
});

const RestaurantCostEntry = sequelize.define('RestaurantCostEntry', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  restaurant_id: { type: DataTypes.INTEGER, allowNull: false },
  category: { type: DataTypes.ENUM('rent', 'royalty', 'marketing_fund', 'utilities', 'other_fixed', 'external_channel'), allowNull: false },
  label: { type: DataTypes.STRING(60), allowNull: true },
  rule: { type: DataTypes.ENUM('fixed', 'pct', 'max'), allowNull: false, defaultValue: 'fixed' },
  fixed_amount: { type: DataTypes.DECIMAL(12, 2), allowNull: true },
  pct: { type: DataTypes.DECIMAL(5, 2), allowNull: true },
  period_month: dateOnly('period_month'),
  external_sales: { type: DataTypes.DECIMAL(12, 2), allowNull: true },
  effective_from: dateOnly('effective_from'),
  effective_to: dateOnly('effective_to'),
  note: { type: DataTypes.STRING(255), allowNull: true },
  created_by: { type: DataTypes.INTEGER, allowNull: true },
}, {
  tableName: 'restaurant_cost_entries',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  underscored: true,
});

module.exports = RestaurantCostEntry;

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

// 캐셔 교대(Shift) — 현금관리/마감(Cash-up·Z-Report)의 단위.
// open(개시현금 입력) → 영업 → close → reconcile(대조). docs/CASH_MANAGEMENT_SHIFT_CLOSE.md.
const CashierShift = sequelize.define('CashierShift', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  restaurant_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'restaurants', key: 'id' }
  },
  cashier_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  cashier_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  // 매장 타임존 기준 영업일 (YYYY-MM-DD). 마감/통계 집계 기준.
  business_date: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  opened_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  closed_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  // 개시현금 — 직전 교대 마감현금(closing_balance)을 자동 제시.
  opening_float: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0
  },
  status: {
    type: DataTypes.ENUM('open', 'closed', 'reconciled'),
    allowNull: false,
    defaultValue: 'open'
  },
  timezone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'cashier_shifts',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  underscored: true,
  indexes: [
    { fields: ['restaurant_id', 'status'] },
    { fields: ['restaurant_id', 'business_date'] }
  ]
});

module.exports = CashierShift;

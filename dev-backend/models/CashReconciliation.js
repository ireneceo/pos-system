const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

// 교대 마감 대조(Cash Reconciliation) — 예상(order_payments 집계) vs 실제(캐셔 입력) 차이.
// 현금 closing_balance 가 다음 교대 개시현금. docs/CASH_MANAGEMENT_SHIFT_CLOSE.md.
const CashReconciliation = sequelize.define('CashReconciliation', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  shift_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'cashier_shifts', key: 'id' }
  },
  restaurant_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'restaurants', key: 'id' }
  },
  // { cash: number, card: { visa, master, ... }, other: { ewallet, ... } }
  expected: {
    type: DataTypes.JSON,
    allowNull: true
  },
  actual: {
    type: DataTypes.JSON,
    allowNull: true
  },
  // actual - expected, 같은 구조 (양수=초과 / 음수=부족)
  variance: {
    type: DataTypes.JSON,
    allowNull: true
  },
  cash_counted: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  // 다음 교대 개시현금 (= opening_float + 현금매출 - 인출 등, MVP=현금 카운트)
  closing_balance: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  reconciled_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  reconciled_by_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  reconciled_by_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('pending', 'matched', 'variance', 'approved'),
    allowNull: false,
    defaultValue: 'pending'
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'cash_reconciliations',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  underscored: true,
  indexes: [
    { fields: ['shift_id'] },
    { fields: ['restaurant_id'] }
  ]
});

module.exports = CashReconciliation;

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

// 교대 중 현금 인출/입금(paid in / paid out) — 영업 중 드로어에서 빼거나(거스름돈 보충,
// 경비 지출, 은행 입금) 넣는(잔돈 보충) 금액. 마감 현금 예상치에 반영된다:
//   현금예상 = 개시현금 + 현금매출 + Σ입금 − Σ출금
// docs/CASH_MANAGEMENT_SHIFT_CLOSE.md §6 Phase 2.
const CashMovement = sequelize.define('CashMovement', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  shift_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'cashier_shifts', key: 'id' } },
  restaurant_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'restaurants', key: 'id' } },
  type: { type: DataTypes.ENUM('in', 'out'), allowNull: false },
  amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  reason: { type: DataTypes.STRING(255), allowNull: true },
  // manual = 직원이 직접 넣은 입출금 / settlement = 파이널 마감 확정 시 현금 차이(over/short) 자동 조정.
  // settlement 행은 시스템 감사기록 → 수정/삭제 불가, 원장에서 구분 표시.
  source: { type: DataTypes.ENUM('manual', 'settlement'), allowNull: false, defaultValue: 'manual' },
  created_by_id: { type: DataTypes.INTEGER, allowNull: true },
  created_by_name: { type: DataTypes.STRING, allowNull: true }
}, {
  tableName: 'cash_movements',
  timestamps: true,
  underscored: true,
  indexes: [
    { fields: ['shift_id'], name: 'cash_movement_shift' },
    { fields: ['restaurant_id'], name: 'cash_movement_restaurant' }
  ]
});

module.exports = CashMovement;

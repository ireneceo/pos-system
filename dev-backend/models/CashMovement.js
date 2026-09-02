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
  // purchase_order = 발주 결제(현금)로 드로어에서 나간 돈 / 취소·환불이면 반대 방향 in 이동으로 되돌린다.
  //   ⚠ ENUM 값 추가는 반드시 expandEnum 경유(migrate-po-payment.js). 여기 목록을 고칠 때
  //     마이그도 같이 손대지 않으면 dev 에만 있는 값이 되어 배포 게이트(check-enum-parity)가 막는다.
  source: { type: DataTypes.ENUM('manual', 'settlement', 'purchase_order'), allowNull: false, defaultValue: 'manual' },
  // 발주 결제로 생긴 이동이 어느 발주 것인지. 되돌리기가 원본을 찾는 자리(범용 reference_id 는 이 테이블에 없다).
  purchase_order_id: { type: DataTypes.INTEGER, allowNull: true },
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

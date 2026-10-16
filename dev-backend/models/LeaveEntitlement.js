const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

// 직원별 연간 휴가 일수 — 설계 §2-4. 잔여 = days − 그 해 승인된 신청 일수 합(저장하지 않고 계산).
const LeaveEntitlement = sequelize.define('LeaveEntitlement', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  restaurant_id: { type: DataTypes.INTEGER, allowNull: false },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  leave_type_id: { type: DataTypes.INTEGER, allowNull: false },
  year: { type: DataTypes.SMALLINT, allowNull: false },
  days: { type: DataTypes.DECIMAL(5, 1), allowNull: false },
}, {
  tableName: 'leave_entitlements',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  underscored: true,
});

module.exports = LeaveEntitlement;

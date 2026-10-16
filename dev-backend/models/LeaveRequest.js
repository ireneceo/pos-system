const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

// 휴가 신청 — 설계 §2-5. days 는 제출 때 utils/leaveDays 로 계산해 저장한다.
// DATE 칸은 연결 타임존 UTC(+00:00) 로 Date 가 되어 온다 — 화면·비교는 'YYYY-MM-DD' 문자열(get)로 쓴다(휴일 비교 실측 결함 2026-10-16).
const LeaveRequest = sequelize.define('LeaveRequest', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  restaurant_id: { type: DataTypes.INTEGER, allowNull: false },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  leave_type_id: { type: DataTypes.INTEGER, allowNull: false },
  start_date: { type: DataTypes.DATEONLY, allowNull: false, get() { const v = this.getDataValue('start_date'); return v instanceof Date ? v.toISOString().slice(0, 10) : v; } },
  end_date: { type: DataTypes.DATEONLY, allowNull: false, get() { const v = this.getDataValue('end_date'); return v instanceof Date ? v.toISOString().slice(0, 10) : v; } },
  half_day: { type: DataTypes.ENUM('am', 'pm'), allowNull: true },
  days: { type: DataTypes.DECIMAL(5, 1), allowNull: false },
  reason: { type: DataTypes.STRING(500), allowNull: true },
  status: { type: DataTypes.ENUM('pending', 'approved', 'rejected', 'cancelled'), allowNull: false, defaultValue: 'pending' },
  decided_by: { type: DataTypes.INTEGER, allowNull: true },
  decided_at: { type: DataTypes.DATE, allowNull: true },
  decision_note: { type: DataTypes.STRING(500), allowNull: true },
  cancelled_by: { type: DataTypes.INTEGER, allowNull: true },
  cancelled_at: { type: DataTypes.DATE, allowNull: true },
  created_by: { type: DataTypes.INTEGER, allowNull: true },
}, {
  tableName: 'leave_requests',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  underscored: true,
});

module.exports = LeaveRequest;

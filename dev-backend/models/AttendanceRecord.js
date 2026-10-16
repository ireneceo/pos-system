const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

// 직원 출퇴근 1회 = 1행 — 설계 .claude/fable-design-20261016-staff-attendance.md §2-1.
// open_user_id 는 열려 있는 동안만 user_id 를 담는 UNIQUE 칸 → «직원당 열린 출근 1개» 를 DB 가 보장한다.
// 시각은 UTC, work_date 는 출근 시각을 매장 타임존으로 본 날짜(집계 키). 표는 scripts/migrate-create-staff-attendance.js.
// DATE 칸은 연결 타임존 UTC(+00:00) 로 Date 가 되어 온다 — 화면·비교는 'YYYY-MM-DD' 문자열(get)로 쓴다(휴일 비교 실측 결함 2026-10-16).
const AttendanceRecord = sequelize.define('AttendanceRecord', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  restaurant_id: { type: DataTypes.INTEGER, allowNull: false },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  work_date: { type: DataTypes.DATEONLY, allowNull: false, get() { const v = this.getDataValue('work_date'); return v instanceof Date ? v.toISOString().slice(0, 10) : v; } },
  clock_in_at: { type: DataTypes.DATE, allowNull: false },
  clock_out_at: { type: DataTypes.DATE, allowNull: true },
  open_user_id: { type: DataTypes.INTEGER, allowNull: true },
  clock_in_method: { type: DataTypes.ENUM('self', 'pos_pin', 'admin'), allowNull: false },
  clock_out_method: { type: DataTypes.ENUM('self', 'pos_pin', 'admin'), allowNull: true },
  clock_in_ip: { type: DataTypes.STRING(45), allowNull: true },
  clock_out_ip: { type: DataTypes.STRING(45), allowNull: true },
  clock_in_network: { type: DataTypes.ENUM('ok', 'off', 'override'), allowNull: true },
  clock_out_network: { type: DataTypes.ENUM('ok', 'off', 'override'), allowNull: true },
  override_by: { type: DataTypes.INTEGER, allowNull: true },
  status: { type: DataTypes.ENUM('open', 'closed', 'corrected'), allowNull: false, defaultValue: 'open' },
  original_clock_in_at: { type: DataTypes.DATE, allowNull: true },
  original_clock_out_at: { type: DataTypes.DATE, allowNull: true },
  corrected_by: { type: DataTypes.INTEGER, allowNull: true },
  corrected_at: { type: DataTypes.DATE, allowNull: true },
  correction_reason: { type: DataTypes.STRING(500), allowNull: true },
  note: { type: DataTypes.STRING(255), allowNull: true },
}, {
  tableName: 'attendance_records',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  underscored: true,
});

module.exports = AttendanceRecord;

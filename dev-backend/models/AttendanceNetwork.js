const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

// 출퇴근을 허용하는 매장 네트워크(공인 주소) — 설계 §2-8. 여러 개 가능.
// source: manual(관리자가 «지금 네트워크 등록») · pin_override(관리자 PIN 으로 통과시키며 자동 등록) · kiosk_auto(등록 키오스크가 따라감).
const AttendanceNetwork = sequelize.define('AttendanceNetwork', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  restaurant_id: { type: DataTypes.INTEGER, allowNull: false },
  label: { type: DataTypes.STRING(60), allowNull: true },
  ip: { type: DataTypes.STRING(45), allowNull: false },
  source: { type: DataTypes.ENUM('manual', 'pin_override', 'kiosk_auto'), allowNull: false, defaultValue: 'manual' },
  registered_by: { type: DataTypes.INTEGER, allowNull: true },
  last_matched_at: { type: DataTypes.DATE, allowNull: true },
  is_active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
}, {
  tableName: 'attendance_networks',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  underscored: true,
});

module.exports = AttendanceNetwork;

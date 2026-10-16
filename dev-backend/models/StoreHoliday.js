const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

// 매장 휴일(공휴일·매장 휴무일) — 설계 §2-6. 휴가 일수 계산에서 빠진다.
// DATE 칸은 연결 타임존 UTC(+00:00) 로 Date 가 되어 온다 — 화면·비교는 'YYYY-MM-DD' 문자열(get)로 쓴다(휴일 비교 실측 결함 2026-10-16).
const StoreHoliday = sequelize.define('StoreHoliday', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  restaurant_id: { type: DataTypes.INTEGER, allowNull: false },
  date: { type: DataTypes.DATEONLY, allowNull: false, get() { const v = this.getDataValue('date'); return v instanceof Date ? v.toISOString().slice(0, 10) : v; } },
  name: { type: DataTypes.STRING(100), allowNull: false },
  kind: { type: DataTypes.ENUM('public', 'store_closed'), allowNull: false, defaultValue: 'public' },
  created_by: { type: DataTypes.INTEGER, allowNull: true },
}, {
  tableName: 'store_holidays',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  underscored: true,
});

module.exports = StoreHoliday;

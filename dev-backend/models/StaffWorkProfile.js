const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

// 직원 근무 기본(users 표에 칸을 늘리지 않는다) — 설계 §2-2. 급여 단계의 시급·국가 규칙 칸이 여기 붙는다(§9).
// rest_days = 쉬는 요일 배열(0=일 … 6=토).
// DATE 칸은 연결 타임존 UTC(+00:00) 로 Date 가 되어 온다 — 화면·비교는 'YYYY-MM-DD' 문자열(get)로 쓴다(휴일 비교 실측 결함 2026-10-16).
const StaffWorkProfile = sequelize.define('StaffWorkProfile', {
  user_id: { type: DataTypes.INTEGER, primaryKey: true },
  restaurant_id: { type: DataTypes.INTEGER, allowNull: false },
  rest_days: {
    type: DataTypes.TEXT,
    allowNull: true,
    get() {
      const raw = this.getDataValue('rest_days');
      if (!raw) return [];
      try { const v = JSON.parse(raw); return Array.isArray(v) ? v : []; } catch { return []; }
    },
    set(v) { this.setDataValue('rest_days', JSON.stringify(Array.isArray(v) ? v : [])); },
  },
  joined_at: { type: DataTypes.DATEONLY, allowNull: true, get() { const v = this.getDataValue('joined_at'); return v instanceof Date ? v.toISOString().slice(0, 10) : v; } },
}, {
  tableName: 'staff_work_profiles',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  underscored: true,
});

module.exports = StaffWorkProfile;

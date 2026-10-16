const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

// 매장별 휴가 종류 — 설계 §2-3. default_days NULL = 잔여일 «추적 안 함».
const LeaveType = sequelize.define('LeaveType', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  restaurant_id: { type: DataTypes.INTEGER, allowNull: false },
  code: { type: DataTypes.STRING(30), allowNull: false },
  name: { type: DataTypes.STRING(60), allowNull: false },
  is_paid: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  default_days: { type: DataTypes.DECIMAL(5, 1), allowNull: true },
  requires_approval: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  color: { type: DataTypes.CHAR(7), allowNull: true },
  is_active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  sort_order: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
}, {
  tableName: 'leave_types',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  underscored: true,
});

module.exports = LeaveType;

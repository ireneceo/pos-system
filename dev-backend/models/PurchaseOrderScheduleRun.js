const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

/** 정기 발주 실행 기록 — UNIQUE(schedule_id, run_date) 가 «하루 1건» 을 DB 에서 보장한다 (Fable 설계 §2-2). */
const PurchaseOrderScheduleRun = sequelize.define('PurchaseOrderScheduleRun', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  schedule_id: { type: DataTypes.INTEGER, allowNull: false },
  run_date: { type: DataTypes.DATEONLY, allowNull: false },
  po_id: { type: DataTypes.INTEGER, allowNull: true },
  outcome: {
    type: DataTypes.ENUM('submitted', 'pending_approval', 'skipped', 'failed'),
    allowNull: true
  },
  reason: { type: DataTypes.STRING(500), allowNull: true },
  total_amount: { type: DataTypes.DECIMAL(12, 2), allowNull: true },
  drift_pct: { type: DataTypes.DECIMAL(8, 2), allowNull: true }
}, {
  tableName: 'purchase_order_schedule_runs',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: false,
  indexes: [
    { unique: true, fields: ['schedule_id', 'run_date'], name: 'uq_po_schedule_run_date' }
  ]
});

module.exports = PurchaseOrderScheduleRun;

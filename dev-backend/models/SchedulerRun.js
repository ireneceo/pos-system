const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/database');

/**
 * SchedulerRun — one row per cron-job execution.
 *
 * Created at job start with status='running', updated at end with results +
 * status. Lets the System Admin monitoring page show "did the daily
 * subscription scheduler actually run yesterday, and what did it do?".
 */
class SchedulerRun extends Model {}

SchedulerRun.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  job_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    comment: 'Logical job key (e.g. subscription_daily, invoice_generation_daily)'
  },
  started_at: {
    type: DataTypes.DATE,
    allowNull: false
  },
  finished_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  duration_ms: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('success', 'partial', 'error', 'running'),
    allowNull: false,
    defaultValue: 'running'
  },
  results: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Per-subjob counts (trial_expired, overdue, etc.)'
  },
  error_message: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'SchedulerRun',
  tableName: 'scheduler_runs',
  timestamps: true,
  indexes: [
    { fields: ['job_name'] },
    { fields: ['started_at'] }
  ]
});

module.exports = SchedulerRun;

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const PushLog = sequelize.define('PushLog', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: 'users', key: 'id' }
  },
  subscription_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: 'push_subscriptions', key: 'id' }
  },
  category: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('sent', 'failed', 'expired_endpoint', 'category_off', 'muted', 'no_subscription'),
    allowNull: false
  },
  error_code: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: 'HTTP status code from push service (e.g., 410 Gone, 404 Not Found)'
  },
  error_message: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  sent_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'push_logs',
  timestamps: true,
  underscored: true,
  updatedAt: false,
  indexes: [
    { fields: ['user_id', 'sent_at'], name: 'push_log_user_time' },
    { fields: ['status', 'sent_at'], name: 'push_log_status_time' },
    { fields: ['category', 'sent_at'], name: 'push_log_category_time' }
  ]
});

module.exports = PushLog;

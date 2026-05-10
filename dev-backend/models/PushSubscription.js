const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const PushSubscription = sequelize.define('PushSubscription', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' }
  },
  endpoint: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  p256dh: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  auth: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  user_agent: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  expired_at: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'Marked when push service returns 410/404'
  },
  deleted_at: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'Soft delete: set when endpoint is reassigned to another user'
  }
}, {
  tableName: 'push_subscriptions',
  timestamps: true,
  underscored: true,
  indexes: [
    { fields: ['endpoint'], unique: true, length: 255, name: 'push_sub_endpoint_uniq' },
    { fields: ['user_id', 'expired_at', 'deleted_at'], name: 'push_sub_active_lookup' }
  ]
});

module.exports = PushSubscription;

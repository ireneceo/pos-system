const { DataTypes } = require('sequelize');
const database = require('../config/database');

const WebhookEvent = database.sequelize.define('WebhookEvent', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  gateway: {
    type: DataTypes.ENUM('stripe', 'paypal'),
    allowNull: false
  },
  event_id: {
    type: DataTypes.STRING(80),
    allowNull: false,
    comment: 'Stripe evt_xxx / PayPal event id (for idempotency)'
  },
  event_type: {
    type: DataTypes.STRING(80),
    allowNull: false
  },
  payload_hash: {
    type: DataTypes.STRING(64),
    allowNull: false
  },
  payload: {
    type: DataTypes.TEXT('long'),
    allowNull: false,
    get() {
      const v = this.getDataValue('payload');
      try { return v ? JSON.parse(v) : null; } catch { return null; }
    },
    set(value) {
      this.setDataValue('payload', value ? JSON.stringify(value) : null);
    }
  },
  status: {
    type: DataTypes.ENUM('received', 'processed', 'failed'),
    allowNull: false,
    defaultValue: 'received'
  },
  error: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  processed_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  received_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'webhook_events',
  timestamps: true,
  underscored: true,
  indexes: [
    {
      unique: true,
      name: 'uniq_webhook_event_id',
      fields: ['gateway', 'event_id']
    },
    {
      name: 'idx_webhook_event_type_status',
      fields: ['event_type', 'status']
    }
  ]
});

module.exports = WebhookEvent;

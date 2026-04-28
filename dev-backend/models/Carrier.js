const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Carrier = sequelize.define('Carrier', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  code: { type: DataTypes.STRING(50), allowNull: false, unique: true },
  name: { type: DataTypes.STRING(100), allowNull: false },
  tracking_url_template: {
    type: DataTypes.STRING(500), allowNull: true,
    comment: 'Use {tracking_number} placeholder, e.g. https://example.com/track/{tracking_number}'
  },
  logo_url: { type: DataTypes.TEXT, allowNull: true },
  country: { type: DataTypes.CHAR(2), allowNull: true, comment: 'ISO 3166-1 alpha-2 (null = global)' },
  is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
  sort_order: { type: DataTypes.INTEGER, defaultValue: 0 },

  // Sprint 7 — Webhook integration
  webhook_secret: {
    type: DataTypes.STRING(128), allowNull: true,
    comment: 'Sprint 7: HMAC-SHA256 secret (64-byte hex). null = webhook off'
  },
  webhook_event_path: {
    type: DataTypes.STRING(255), allowNull: true,
    comment: 'JSON path (lodash.get) for raw status, e.g. "event.type"'
  },
  webhook_tracking_path: {
    type: DataTypes.STRING(255), allowNull: true,
    comment: 'JSON path for tracking_number'
  },
  webhook_idempotency_path: {
    type: DataTypes.STRING(255), allowNull: true,
    comment: 'JSON path for carrier-side event id (보조 dedup)'
  },
  webhook_status_map: {
    type: DataTypes.JSON, allowNull: true,
    comment: '{"PICKED_UP":"in_transit","DELIVERED":"delivered","FAILED":"delivery_failed"}'
  }
}, {
  tableName: 'carriers',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    { fields: ['is_active', 'sort_order'] },
    { fields: ['country'] }
  ]
});

module.exports = Carrier;

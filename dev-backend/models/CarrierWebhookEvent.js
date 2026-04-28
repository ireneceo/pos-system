const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

/**
 * CarrierWebhookEvent — Sprint 7 (2026-04-28)
 *
 * Audit + dedup + retry queue for inbound carrier webhook events.
 * Every webhook call lands here first (HMAC-validated and signature_valid recorded),
 * then a setImmediate handler attempts to apply it to a PO.
 *
 * Idempotency: payload_hash UNIQUE → same body twice = ignored_duplicate.
 * Audit: raw_body MEDIUMTEXT preserved for re-verification / forensic.
 * Retention: applied=true 90일 archive (cron) / failed = 영구 (operator must inspect).
 */
const CarrierWebhookEvent = sequelize.define('CarrierWebhookEvent', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  carrier_id: { type: DataTypes.INTEGER, allowNull: false },
  carrier_event_id: {
    type: DataTypes.STRING(255), allowNull: true,
    comment: 'webhook_idempotency_path 추출값 (carrier-side ID)'
  },
  payload_hash: {
    type: DataTypes.CHAR(64), allowNull: false, unique: true,
    comment: 'sha256(raw_body) — 주 dedup'
  },
  signature_valid: { type: DataTypes.BOOLEAN, allowNull: false },

  payload: { type: DataTypes.JSON, allowNull: false },
  raw_body: {
    type: DataTypes.TEXT('medium'), allowNull: false,
    comment: 'HMAC 재검증/감사용 원문'
  },

  // Mapping
  purchase_order_id: { type: DataTypes.INTEGER, allowNull: true },
  mapped_status: {
    type: DataTypes.STRING(40), allowNull: true,
    comment: 'webhook_status_map 적용 후 PO.status 값'
  },

  // Processing state
  status: {
    type: DataTypes.ENUM(
      'pending_apply', 'applied', 'ignored_duplicate', 'ignored_regress', 'failed'
    ),
    allowNull: false, defaultValue: 'pending_apply'
  },
  applied_at: { type: DataTypes.DATE, allowNull: true },
  error: {
    type: DataTypes.TEXT, allowNull: true,
    comment: 'no_match / multiple_match / invalid_mapping / etc'
  },
  retry_count: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },

  // Audit
  simulated: {
    type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false,
    comment: 'true = simulate endpoint 호출'
  },
  source_ip: { type: DataTypes.STRING(45), allowNull: true },
  received_at: { type: DataTypes.DATE, allowNull: false }
}, {
  tableName: 'carrier_webhook_events',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    { unique: true, fields: ['payload_hash'], name: 'uk_payload_hash' },
    { fields: ['carrier_id', 'received_at'], name: 'idx_carrier_received' },
    { fields: ['purchase_order_id'], name: 'idx_po' },
    { fields: ['status', 'received_at'], name: 'idx_status_received' },
    { fields: ['simulated'], name: 'idx_simulated' }
  ]
});

module.exports = CarrierWebhookEvent;

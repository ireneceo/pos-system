const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

// 카드단말기 ECR 거래 — 시도 1건 = 1행 (승인·거절·타임아웃·복구·수동 기록까지).
// 설계: .claude/fable-design-20261001-ghl-ecr.md §3-1 · 표는 scripts/migrate-create-terminal-transactions.js 가 만든다.
// 상태 전이는 services/terminalPayments.js 한 곳에서만 한다 — 승인(approved)이 아니면 결제를 자동 기록하지 않는다.
const TerminalTransaction = sequelize.define('TerminalTransaction', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  restaurant_id: { type: DataTypes.INTEGER, allowNull: false },
  order_id: { type: DataTypes.INTEGER, allowNull: true },
  order_payment_id: { type: DataTypes.INTEGER, allowNull: true },
  parent_id: { type: DataTypes.INTEGER, allowNull: true }, // reprint/check_status/void 가 가리키는 원 거래
  provider: { type: DataTypes.ENUM('ghl_ecr'), allowNull: false, defaultValue: 'ghl_ecr' },
  command: { type: DataTypes.ENUM('sale', 'void', 'refund', 'reprint', 'check_status', 'settlement', 'echo'), allowNull: false },
  ecr_invoice_no: { type: DataTypes.STRING(40), allowNull: true, unique: true },
  amount: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
  currency: { type: DataTypes.CHAR(3), allowNull: false, defaultValue: 'MYR' },
  status: {
    type: DataTypes.ENUM('created', 'sent', 'approved', 'declined', 'cancelled', 'pending', 'timeout', 'comm_error', 'recovering', 'not_found', 'voided', 'manual'),
    allowNull: false, defaultValue: 'created',
  },
  status_code: { type: DataTypes.STRING(4), allowNull: true },
  status_message: { type: DataTypes.STRING(200), allowNull: true },
  request_hex: { type: DataTypes.TEXT, allowNull: true },
  response_hex: { type: DataTypes.TEXT, allowNull: true },
  terminal_invoice_no: { type: DataTypes.STRING(20), allowNull: true },
  terminal_batch_no: { type: DataTypes.STRING(12), allowNull: true },
  approval_code: { type: DataTypes.STRING(12), allowNull: true },
  rrn: { type: DataTypes.STRING(20), allowNull: true },
  masked_pan: { type: DataTypes.STRING(24), allowNull: true },
  card_type_code: { type: DataTypes.STRING(4), allowNull: true },
  card_brand: { type: DataTypes.STRING(40), allowNull: true },
  card_type: { type: DataTypes.STRING(20), allowNull: true },
  entry_mode: { type: DataTypes.STRING(20), allowNull: true },
  terminal_id: { type: DataTypes.STRING(16), allowNull: true },
  merchant_id: { type: DataTypes.STRING(20), allowNull: true },
  txn_ref: { type: DataTypes.STRING(48), allowNull: true },
  txn_datetime: { type: DataTypes.STRING(12), allowNull: true },
  message_prompt: { type: DataTypes.STRING(80), allowNull: true },
  cashier_id: { type: DataTypes.INTEGER, allowNull: true },
  cashier_name: { type: DataTypes.STRING(150), allowNull: true },
  device_label: { type: DataTypes.STRING(80), allowNull: true },
  manual_override: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  manual_note: { type: DataTypes.STRING(300), allowNull: true },
  sent_at: { type: DataTypes.DATE, allowNull: true },
  responded_at: { type: DataTypes.DATE, allowNull: true },
}, {
  tableName: 'terminal_transactions',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  underscored: true,
  indexes: [
    { unique: true, fields: ['ecr_invoice_no'], name: 'terminal_txn_ecr_invoice' },
    { fields: ['restaurant_id', 'created_at'], name: 'terminal_txn_rest_time' },
    { fields: ['order_id'], name: 'terminal_txn_order' },
    { fields: ['parent_id'], name: 'terminal_txn_parent' },
  ],
});

module.exports = TerminalTransaction;

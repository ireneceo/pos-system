const { DataTypes, Model } = require('sequelize');
const database = require('../config/database');

class ReferralWalletTransaction extends Model {}

ReferralWalletTransaction.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  wallet_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('commission', 'credit_used', 'payout', 'adjustment'),
    allowNull: false
  },
  amount: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
    comment: '+ for inflow (commission), - for outflow (credit_used / payout)'
  },
  balance_after: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
    comment: 'Wallet balance immediately after this transaction (audit trail)'
  },
  reference_type: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: 'commission / invoice / payout — links this transaction to its source row'
  },
  reference_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
}, {
  sequelize: database.sequelize,
  modelName: 'ReferralWalletTransaction',
  tableName: 'referral_wallet_transactions',
  timestamps: true,
  indexes: [
    { fields: ['wallet_id', 'createdAt'], name: 'idx_referral_wallet_tx_wallet_created' },
    { fields: ['type'], name: 'idx_referral_wallet_tx_type' },
    { fields: ['reference_type', 'reference_id'], name: 'idx_referral_wallet_tx_reference' }
  ]
});

module.exports = ReferralWalletTransaction;

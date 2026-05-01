const { DataTypes, Model } = require('sequelize');
const database = require('../config/database');

class ReferralWallet extends Model {}

ReferralWallet.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  currency: {
    type: DataTypes.STRING(10),
    allowNull: false,
    defaultValue: 'MYR'
  },
  balance: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
    defaultValue: 0
  },
  total_earned: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
    defaultValue: 0
  },
  total_withdrawn: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
    defaultValue: 0
  },
  total_credited: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
    defaultValue: 0,
    comment: 'Sum of credit_used transactions (applied to invoices)'
  }
}, {
  sequelize: database.sequelize,
  modelName: 'ReferralWallet',
  tableName: 'referral_wallets',
  timestamps: true,
  indexes: [
    { unique: true, fields: ['user_id', 'currency'], name: 'uniq_referral_wallet_user_currency' },
    { fields: ['user_id'], name: 'idx_referral_wallet_user' }
  ]
});

module.exports = ReferralWallet;

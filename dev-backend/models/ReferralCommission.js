const { DataTypes, Model } = require('sequelize');
const database = require('../config/database');

class ReferralCommission extends Model {}

ReferralCommission.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  referrer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: 'User who owns the referral_code that brought referred_id in'
  },
  referred_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: 'User whose paid invoice triggered this commission'
  },
  invoice_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  invoice_amount: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
    comment: 'Final paid amount after discount (reference snapshot)'
  },
  commission_rate: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false,
    comment: 'Rate applied to this commission (snapshot, not retroactively changed)'
  },
  commission_amount: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false
  },
  currency: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('credited', 'cancelled'),
    allowNull: false,
    defaultValue: 'credited'
  },
  cancelled_reason: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
}, {
  sequelize: database.sequelize,
  modelName: 'ReferralCommission',
  tableName: 'referral_commissions',
  timestamps: true,
  indexes: [
    { unique: true, fields: ['invoice_id', 'referrer_id'], name: 'uniq_referral_commission_invoice_referrer' },
    { fields: ['referrer_id', 'status'], name: 'idx_referral_commission_referrer_status' },
    { fields: ['referred_id'], name: 'idx_referral_commission_referred' },
    { fields: ['invoice_id'], name: 'idx_referral_commission_invoice' }
  ]
});

module.exports = ReferralCommission;

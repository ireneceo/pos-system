const { DataTypes, Model } = require('sequelize');
const database = require('../config/database');

class ReferralPayout extends Model {}

ReferralPayout.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  amount: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false
  },
  currency: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  bank_name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  bank_account_number: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  bank_account_holder: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('requested', 'approved', 'paid', 'rejected'),
    allowNull: false,
    defaultValue: 'requested'
  },
  reviewed_by: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'System Admin who approved/rejected'
  },
  reviewed_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  paid_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  reject_reason: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  transaction_reference: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: 'Bank transfer reference recorded by admin upon Mark as Paid'
  }
}, {
  sequelize: database.sequelize,
  modelName: 'ReferralPayout',
  tableName: 'referral_payouts',
  timestamps: true,
  indexes: [
    { fields: ['user_id', 'status'], name: 'idx_referral_payout_user_status' },
    { fields: ['status', 'createdAt'], name: 'idx_referral_payout_status_created' }
  ]
});

module.exports = ReferralPayout;

const { DataTypes, Model } = require('sequelize');
const database = require('../config/database');

class ReferralSettings extends Model {}

ReferralSettings.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: 'Singleton: only id=1 row should exist'
  },
  commission_rate: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false,
    defaultValue: 15.00,
    comment: 'Percentage commission on each paid POS subscription invoice'
  },
  first_month_discount: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false,
    defaultValue: 20.00,
    comment: 'Percentage discount applied to referred user first paid POS subscription invoice'
  },
  min_payout_amounts: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: { MYR: 50, USD: 20, KRW: 50000, SGD: 30 },
    comment: 'Minimum payout per currency'
  },
  program_active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
}, {
  sequelize: database.sequelize,
  modelName: 'ReferralSettings',
  tableName: 'referral_settings',
  timestamps: true
});

module.exports = ReferralSettings;

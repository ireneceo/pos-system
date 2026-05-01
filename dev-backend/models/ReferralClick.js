const { DataTypes, Model } = require('sequelize');
const database = require('../config/database');

class ReferralClick extends Model {}

ReferralClick.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  referral_code: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  ip_address: {
    type: DataTypes.STRING(45),
    allowNull: true,
    comment: 'IPv4 or IPv6'
  },
  user_agent: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  source: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: 'utm_source style — e.g. whatsapp, twitter, direct'
  },
  converted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  converted_at: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize: database.sequelize,
  modelName: 'ReferralClick',
  tableName: 'referral_clicks',
  timestamps: true,
  indexes: [
    { fields: ['referral_code', 'createdAt'], name: 'idx_referral_click_code_created' },
    { fields: ['ip_address', 'createdAt'], name: 'idx_referral_click_ip_created' },
    { fields: ['converted'], name: 'idx_referral_click_converted' }
  ]
});

module.exports = ReferralClick;

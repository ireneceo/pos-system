const { DataTypes } = require('sequelize');
const database = require('../config/database');

const PaymentCustomer = database.sequelize.define('PaymentCustomer', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  gateway: {
    type: DataTypes.ENUM('stripe', 'paypal'),
    allowNull: false
  },
  issuer_type: {
    type: DataTypes.ENUM('system', 'brand', 'foodcourt', 'supplier'),
    allowNull: false
  },
  issuer_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'NULL for system issuer'
  },
  payer_type: {
    type: DataTypes.ENUM('restaurant', 'brand', 'foodcourt'),
    allowNull: false
  },
  payer_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  gateway_customer_id: {
    type: DataTypes.STRING(60),
    allowNull: false
  }
}, {
  tableName: 'payment_customers',
  timestamps: true,
  underscored: true,
  indexes: [
    {
      unique: true,
      name: 'uniq_payment_customer_pair',
      fields: ['gateway', 'issuer_type', 'issuer_id', 'payer_type', 'payer_id']
    },
    {
      name: 'idx_payment_customer_gateway_id',
      fields: ['gateway_customer_id']
    }
  ]
});

module.exports = PaymentCustomer;

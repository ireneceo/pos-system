const { DataTypes } = require('sequelize');
const database = require('../config/database');

const Subscription = database.sequelize.define('Subscription', {
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
    allowNull: true
  },
  payer_type: {
    type: DataTypes.ENUM('restaurant', 'brand', 'foodcourt'),
    allowNull: false
  },
  payer_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  plan_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Plan FK if subscription tied to a Plan'
  },
  gateway_subscription_id: {
    type: DataTypes.STRING(60),
    allowNull: false
  },
  gateway_customer_id: {
    type: DataTypes.STRING(60),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('incomplete', 'active', 'past_due', 'canceled', 'paused', 'trialing'),
    allowNull: false,
    defaultValue: 'incomplete'
  },
  current_period_start: {
    type: DataTypes.DATE,
    allowNull: true
  },
  current_period_end: {
    type: DataTypes.DATE,
    allowNull: true
  },
  cancel_at_period_end: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  canceled_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  metadata: {
    type: DataTypes.TEXT,
    allowNull: true,
    get() {
      const v = this.getDataValue('metadata');
      try { return v ? JSON.parse(v) : {}; } catch { return {}; }
    },
    set(value) {
      this.setDataValue('metadata', value ? JSON.stringify(value) : null);
    }
  }
}, {
  tableName: 'payment_subscriptions',
  timestamps: true,
  underscored: true,
  indexes: [
    {
      unique: true,
      name: 'uniq_subscription_gateway_id',
      fields: ['gateway', 'gateway_subscription_id']
    },
    {
      name: 'idx_subscription_payer_status',
      fields: ['payer_type', 'payer_id', 'status']
    },
    {
      name: 'idx_subscription_issuer',
      fields: ['issuer_type', 'issuer_id']
    }
  ]
});

module.exports = Subscription;

const { DataTypes, Model } = require('sequelize');
const database = require('../config/database');

class EntityPlan extends Model {}

EntityPlan.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  entity_type: {
    type: DataTypes.ENUM('brand', 'foodcourt'),
    allowNull: false,
    comment: 'Plan owner type: brand or foodcourt'
  },
  entity_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: 'Brand ID or Foodcourt ID'
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    comment: 'Plan name (e.g., "Standard Franchise Plan")'
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  // Fixed fee (subscription fee)
  subscription_fee: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
    comment: 'Monthly fixed subscription fee'
  },
  // Revenue percentage (royalty)
  revenue_percentage: {
    type: DataTypes.DECIMAL(5, 2),
    defaultValue: 0,
    comment: 'Revenue percentage (e.g., 5.00 = 5%)'
  },
  // Rent configuration
  rent_type: {
    type: DataTypes.ENUM('none', 'fixed', 'percentage', 'combined'),
    defaultValue: 'none',
    comment: 'none=no rent, fixed=fixed amount, percentage=revenue%, combined=MAX(fixed,percentage)'
  },
  rent_fixed: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
    comment: 'Fixed rent amount (for fixed/combined)'
  },
  rent_percentage: {
    type: DataTypes.DECIMAL(5, 2),
    defaultValue: 0,
    comment: 'Rent as revenue percentage (for percentage/combined)'
  },
  // Billing
  billing_cycle: {
    type: DataTypes.ENUM('monthly', 'annual'),
    defaultValue: 'monthly'
  },
  auto_generate: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    comment: 'Auto-generate invoices on billing cycle'
  },
  tax_rate: {
    type: DataTypes.DECIMAL(5, 2),
    defaultValue: 0,
    comment: 'Tax rate percentage (e.g., 6.00 = SST 6%)'
  },
  currency: {
    type: DataTypes.STRING(10),
    defaultValue: 'MYR'
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  created_by: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'User ID who created this plan'
  }
}, {
  sequelize: database.sequelize,
  modelName: 'EntityPlan',
  tableName: 'entity_plans',
  timestamps: true
});

module.exports = EntityPlan;

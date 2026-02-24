const { DataTypes, Model } = require('sequelize');
const database = require('../config/database');

class EntityPlanPrice extends Model {}

EntityPlanPrice.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  entity_plan_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: 'Reference to entity_plans.id'
  },
  currency: {
    type: DataTypes.STRING(3),
    allowNull: false,
    comment: 'Currency code (MYR, USD, KRW, etc.)'
  },
  monthly_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0
  },
  annual_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  sequelize: database.sequelize,
  modelName: 'EntityPlanPrice',
  tableName: 'entity_plan_prices',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = EntityPlanPrice;

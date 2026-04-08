const { DataTypes, Model } = require('sequelize');
const database = require('../config/database');

class ContractPlan extends Model {}

ContractPlan.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  contract_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  entity_plan_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  assigned_at: {
    type: DataTypes.DATEONLY,
    allowNull: true
  }
}, {
  sequelize: database.sequelize,
  tableName: 'contract_plans',
  timestamps: true,
  underscored: true
});

module.exports = ContractPlan;

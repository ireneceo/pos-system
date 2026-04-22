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
  },
  end_at: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'When this plan attachment ended. Auto-set on Contract.stage → expired/terminated/renewed.'
  }
}, {
  sequelize: database.sequelize,
  tableName: 'contract_plans',
  timestamps: true,
  underscored: true
});

module.exports = ContractPlan;

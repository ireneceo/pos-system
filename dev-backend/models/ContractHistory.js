const { DataTypes, Model } = require('sequelize');
const database = require('../config/database');

class ContractHistory extends Model {}

ContractHistory.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  contract_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  action: {
    type: DataTypes.ENUM('created', 'stage_changed', 'terms_updated', 'document_uploaded', 'task_completed', 'restaurant_linked', 'plan_assigned', 'terminated', 'renewed'),
    allowNull: false
  },
  from_value: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  to_value: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  details: {
    type: DataTypes.JSON,
    allowNull: true
  },
  changed_by: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  sequelize: database.sequelize,
  tableName: 'contract_history',
  timestamps: true,
  underscored: true
});

module.exports = ContractHistory;

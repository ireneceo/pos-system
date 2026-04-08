const { DataTypes, Model } = require('sequelize');
const database = require('../config/database');

class ContractTask extends Model {}

ContractTask.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  contract_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING(300),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  is_completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  completed_by: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  completed_at: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  sort_order: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  sequelize: database.sequelize,
  tableName: 'contract_tasks',
  timestamps: true,
  underscored: true
});

module.exports = ContractTask;

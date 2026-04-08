const { DataTypes, Model } = require('sequelize');
const database = require('../config/database');

class ContractNote extends Model {}

ContractNote.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  contract_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  created_by: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  sequelize: database.sequelize,
  tableName: 'contract_notes',
  timestamps: true,
  underscored: true
});

module.exports = ContractNote;

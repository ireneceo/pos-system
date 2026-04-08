const { DataTypes, Model } = require('sequelize');
const database = require('../config/database');

class ContractDocument extends Model {}

ContractDocument.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  contract_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  file_name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  file_url: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  file_size: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  file_type: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  document_type: {
    type: DataTypes.ENUM('contract', 'appendix', 'amendment', 'other'),
    defaultValue: 'contract'
  },
  uploaded_by: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  sequelize: database.sequelize,
  tableName: 'contract_documents',
  timestamps: true,
  underscored: true
});

module.exports = ContractDocument;

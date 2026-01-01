const { DataTypes, Model } = require('sequelize');
const database = require('../config/database');

class Foodcourt extends Model {}

Foodcourt.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: 'Foodcourt name'
  },
  code: {
    type: DataTypes.STRING(50),
    allowNull: true,
    unique: true,
    comment: 'Foodcourt code for identification'
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  logo_url: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Foodcourt logo image URL or base64'
  },
  owner_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Foodcourt General user ID who owns this foodcourt'
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active'
  },
  // Company Information
  company_name: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: 'Legal company name'
  },
  registration_no: {
    type: DataTypes.STRING(100),
    allowNull: true,
    comment: 'Business registration number'
  },
  trade_name: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: 'Trading name'
  },
  tax_no: {
    type: DataTypes.STRING(100),
    allowNull: true,
    comment: 'Tax registration number (SST/GST)'
  },
  // Contact Information
  email: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  city: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  state: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  postal_code: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  country: {
    type: DataTypes.STRING(10),
    defaultValue: 'MY',
    allowNull: true
  },
  website: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  // Banking Information
  bank_name: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  bank_account: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  bank_account_name: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  currency: {
    type: DataTypes.STRING(10),
    defaultValue: 'RM',
    allowNull: false,
    comment: 'Default currency for foodcourt restaurants (RM, USD, SGD, JPY, THB, KRW)'
  }
}, {
  sequelize: database.sequelize,
  modelName: 'Foodcourt',
  tableName: 'foodcourts',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Foodcourt;

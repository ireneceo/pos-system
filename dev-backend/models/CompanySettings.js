const { DataTypes, Model } = require('sequelize');
const database = require('../config/database');

class CompanySettings extends Model {}

CompanySettings.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  company_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: 'OrderHere POS System'
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
    type: DataTypes.STRING(100),
    defaultValue: 'Malaysia'
  },
  phone: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  website: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  tax_number: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  registration_number: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  logo: {
    type: DataTypes.TEXT('long'),
    allowNull: true,
    comment: 'Base64 encoded logo image (legacy)'
  },
  brand_logo: {
    type: DataTypes.TEXT('long'),
    allowNull: true,
    comment: 'Base64 encoded brand logo for navigation/header'
  },
  company_logo: {
    type: DataTypes.TEXT('long'),
    allowNull: true,
    comment: 'Base64 encoded company logo for invoices/documents'
  }
}, {
  sequelize: database.sequelize,
  modelName: 'CompanySettings',
  tableName: 'company_settings',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = CompanySettings;

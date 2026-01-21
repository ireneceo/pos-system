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
  },
  site_name: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: 'OrderHere POS'
  },
  favicon_url: {
    type: DataTypes.TEXT('long'),
    allowNull: true,
    comment: 'Base64 encoded favicon'
  },
  seo_title: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  seo_description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  seo_keywords: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  og_image_url: {
    type: DataTypes.TEXT('long'),
    allowNull: true,
    comment: 'Base64 encoded Open Graph image'
  },
  bank_name: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: 'Bank name for invoice payments'
  },
  bank_account: {
    type: DataTypes.STRING(100),
    allowNull: true,
    comment: 'Bank account number'
  },
  bank_account_name: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: 'Bank account holder name'
  },
  swift_code: {
    type: DataTypes.STRING(20),
    allowNull: true,
    comment: 'SWIFT/BIC code for international transfers'
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

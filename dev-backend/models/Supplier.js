const { DataTypes, Model } = require('sequelize');
const database = require('../config/database');

class Supplier extends Model {}

Supplier.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  // Owner type (brand or restaurant)
  owner_type: {
    type: DataTypes.ENUM('brand', 'restaurant'),
    allowNull: false,
    defaultValue: 'restaurant',
    comment: 'Owner type: brand (shared) or restaurant (location-specific)'
  },
  // Owner
  brand_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  restaurant_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  // Supplier info
  code: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: 'Supplier code for internal reference'
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    comment: 'Company name'
  },
  contact_name: {
    type: DataTypes.STRING(100),
    allowNull: true,
    comment: 'Contact person name'
  },
  phone: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  business_number: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: 'Business registration number'
  },
  bank_info: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Bank account information'
  },
  payment_terms: {
    type: DataTypes.STRING(100),
    allowNull: true,
    comment: 'Payment terms (e.g., Net 30, COD)'
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  sequelize: database.sequelize,
  modelName: 'Supplier',
  tableName: 'suppliers',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Supplier;

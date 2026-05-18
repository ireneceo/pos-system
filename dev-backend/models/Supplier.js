const { DataTypes, Model } = require('sequelize');
const database = require('../config/database');

class Supplier extends Model {}

Supplier.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  // Owner type (brand, restaurant, or foodcourt)
  owner_type: {
    type: DataTypes.ENUM('brand', 'restaurant', 'foodcourt'),
    allowNull: false,
    defaultValue: 'restaurant',
    comment: 'Owner type: brand (BG-shared) / restaurant (location-specific) / foodcourt (FG-shared)'
  },
  owner_user_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Brand/Foodcourt General user id — scope owner for owner_type=brand or foodcourt'
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
  foodcourt_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Foodcourt id for owner_type=foodcourt (kept for indexability; main scope via owner_user_id)'
  },
  // Category
  supplier_category_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Supplier category ID'
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
  address_line_2: {
    type: DataTypes.STRING(255),
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
    type: DataTypes.CHAR(2),
    allowNull: true
  },
  business_number: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: 'Business registration number'
  },
  bank_name: {
    type: DataTypes.STRING(100),
    allowNull: true,
    comment: 'Bank name'
  },
  bank_account: {
    type: DataTypes.STRING(100),
    allowNull: true,
    comment: 'Bank account number'
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

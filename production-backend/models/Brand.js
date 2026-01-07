const { DataTypes, Model } = require('sequelize');
const database = require('../config/database');

class Brand extends Model {}

Brand.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: 'Brand name'
  },
  code: {
    type: DataTypes.STRING(50),
    allowNull: true,
    unique: true,
    comment: 'Brand code for identification'
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  logo_url: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Brand logo image URL or base64'
  },
  owner_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Brand General user ID who owns this brand'
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active'
  },
  // 회사 정보
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
  // 연락처 정보
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
  // 은행 정보
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
    comment: 'Default currency for brand restaurants (RM, USD, SGD, JPY, THB, KRW)'
  },
  // Operation Settings
  operation_settings: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'JSON settings for brand operations (timezone, opening hours)',
    get() {
      const rawValue = this.getDataValue('operation_settings');
      const defaultSettings = {
        openingTime: '09:00',
        closingTime: '22:00',
        timeZone: 'Asia/Kuala_Lumpur'
      };
      if (!rawValue) {
        return defaultSettings;
      }
      try {
        return { ...defaultSettings, ...JSON.parse(rawValue) };
      } catch (e) {
        return defaultSettings;
      }
    },
    set(value) {
      this.setDataValue('operation_settings', value ? JSON.stringify(value) : null);
    }
  }
}, {
  sequelize: database.sequelize,
  modelName: 'Brand',
  tableName: 'brands',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Brand;

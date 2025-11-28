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
  website: {
    type: DataTypes.STRING(255),
    allowNull: true
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

const { DataTypes, Model } = require('sequelize');
const database = require('../config/database');

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('System Admin', 'Foodcourt General', 'Brand General', 'Foodcourt Manager', 'Brand Manager', 'Restaurant Admin', 'Staff'),
    defaultValue: 'Staff'
  },
  full_name: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  company_name: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  position: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  department: {
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
  restaurant_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  manager_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  brand_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  foodcourt_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  permissions: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: '[]',
    get() {
      const rawValue = this.getDataValue('permissions');
      return rawValue ? JSON.parse(rawValue) : [];
    },
    set(value) {
      this.setDataValue('permissions', JSON.stringify(value || []));
    }
  }
}, {
  sequelize: database.sequelize,
  modelName: 'User',
  tableName: 'users',
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['username'],
      name: 'username'
    },
    {
      unique: true,
      fields: ['email'],
      name: 'email'
    }
  ]
});

module.exports = User;

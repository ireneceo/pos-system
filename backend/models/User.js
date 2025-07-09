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
    type: DataTypes.ENUM('admin', 'staff'),
    defaultValue: 'staff'
  }
}, {
  sequelize: database.sequelize,
  modelName: 'User',
  tableName: 'users',
  timestamps: true
});

module.exports = User;

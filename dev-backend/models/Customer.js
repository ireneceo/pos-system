const { DataTypes, Model } = require('sequelize');
const database = require('../config/database');

class Customer extends Model {}

Customer.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
    comment: '전화번호 (고유 식별자, 변경 불가)'
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: '고객 이름'
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: true,
    unique: true,
    comment: '이메일 (고유, 비밀번호 찾기용)'
  },
  password_hash: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: '비밀번호 해시 (회원만, 게스트는 NULL)'
  },
  type: {
    type: DataTypes.ENUM('guest', 'member'),
    defaultValue: 'guest',
    comment: '고객 타입'
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'created_at'
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'updated_at'
  }
}, {
  sequelize: database.sequelize,
  modelName: 'Customer',
  tableName: 'customers',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      unique: true,
      fields: ['phone']
    },
    {
      unique: true,
      fields: ['email']
    },
    {
      fields: ['type']
    }
  ]
});

module.exports = Customer;

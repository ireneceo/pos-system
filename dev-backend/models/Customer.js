const { DataTypes, Model } = require('sequelize');
const database = require('../config/database');

class Customer extends Model {
  // 재설정 링크 칸은 어떤 응답에도 싣지 않는다(2026-11-02). 기존 칸은 그대로.
  toJSON() {
    const v = { ...this.get() };
    delete v.reset_token_hash; delete v.reset_token_expires; delete v.reset_token_slug;
    return v;
  }
}

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
  // 비밀번호 찾기 링크(2026-11-02) — 예전엔 서버 메모리에만 있어 재시작(배포)마다 보낸 링크가 깨졌다.
  //   원문 토큰은 저장하지 않는다(sha256). 새로 요청하면 덮어써 옛 링크는 무효. 마이그 migrate-customer-reset-token.js
  reset_token_hash: { type: DataTypes.CHAR(64), allowNull: true },
  reset_token_expires: { type: DataTypes.DATE, allowNull: true },
  reset_token_slug: { type: DataTypes.STRING(255), allowNull: true },
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

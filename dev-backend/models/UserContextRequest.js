const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

// 역할 추가 요청 — 멀티 로그인 v1.3 (.claude/fable-design-20261005-context-request.md §4.1).
//
// ⚠ 의미 경계: 이 표는 「요청」만 기록한다. 부여는 여기 없다 — 승인이 services/userContexts.grantContext
// (유일한 쓰기 경로, 설계 §8-3)를 부를 때만 user_contexts 행·소유행이 생긴다.
// user_contexts 에 status 를 넣지 않는 이유: 그 표는 「행 있음 = 부여됨」을 목록·검증·전환·소켓·인스펙션이 읽는다.
// 승인·거절 행은 지우지 않는다(감사). 같은 대상 pending 중복은 앱 레벨에서 막는다(UNIQUE 면 두 번째 거절이 막힘).
const UserContextRequest = sequelize.define('UserContextRequest', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' }
  },
  // 오너 요청도 entity 는 매장(restaurant × Restaurant Owner) — 부여 조합과 같다.
  entity_type: {
    type: DataTypes.ENUM('restaurant', 'brand'),
    allowNull: false
  },
  // 폴리모픽 — FK 없음
  entity_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  // users.role 11값 동형 (models/User.js·models/UserContext.js 와 같게 유지)
  role: {
    type: DataTypes.ENUM(
      'System Admin', 'Foodcourt General', 'Brand General',
      'Foodcourt Manager', 'Brand Manager', 'Restaurant Owner',
      'Restaurant Admin', 'Staff',
      'Supplier Admin', 'Supplier Staff',
      'Referral Partner'
    ),
    allowNull: false
  },
  message: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected'),
    allowNull: false,
    defaultValue: 'pending'
  },
  decided_by: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: 'users', key: 'id' }
  },
  decided_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  decision_note: {
    type: DataTypes.STRING(300),
    allowNull: true
  }
}, {
  tableName: 'user_context_requests',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  underscored: true,
  indexes: [
    { fields: ['user_id', 'status'] },
    { fields: ['status', 'created_at'] },
    { fields: ['entity_type', 'entity_id', 'status'] }
  ]
});

module.exports = UserContextRequest;

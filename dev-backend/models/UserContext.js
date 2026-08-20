const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

// 부여된 "모자"(추가 자격) 전용 테이블 — docs/MULTI_CONTEXT_LOGIN_DESIGN.md §3.2.
//
// ⚠ 의미 경계: 이 표는 "부여받은 모자가 있는가"에만 답한다. "그 모자로 어느 자원까지"는
// 기존 4개 접근판정처(checkRestaurantAccess / userCanAccessRestaurant / 목록 WHERE /
// requireRestaurantScope)가 계속 답한다. 5번째 판정처가 아니다 (설계 §3.2·§8-4).
//
// 네이티브 정체(기본 컨텍스트)는 여기에 행으로 저장하지 않는다 — users.role 에서 파생한다
// (services/userContexts.js: deriveDefaultContext). 운영 BG/FG 3명이 스칼라 NULL 이라
// 정체를 행으로 복사하면 정작 대상자에게서 모자 0개가 되고(검증 F1), 강등 시 유령 모자가
// 남기 때문(검증 F2). 파생이면 users.role 변경이 즉시·구조적으로 반영된다.
const UserContext = sequelize.define('UserContext', {
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
  // ENUM 은 미래 확장 대비. v1 에서 부여 허용은 'restaurant' 뿐 (앱 레벨 정합 검사 — 설계 §5.2/F4).
  entity_type: {
    type: DataTypes.ENUM('restaurant', 'brand', 'foodcourt', 'supplier'),
    allowNull: false
  },
  entity_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  // users.role 과 동일 ENUM 11값 (models/User.js 의 role 정의와 반드시 동형 유지).
  // v1 에서 부여 허용은 'Restaurant Admin' 뿐 (Staff 모자는 permissions 모델 미비로 제외 — 설계 §4.3).
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
  // 부여자 — 출처·감사 추적용. NULL 금지(인스펙션 UC-001 불변식).
  granted_by: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' }
  },
  // 픽커 정렬용 (최근 쓴 모자 우선). P1 에서는 아무도 쓰지 않는다.
  last_used_at: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'user_contexts',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  underscored: true,
  indexes: [
    { unique: true, fields: ['user_id', 'entity_type', 'entity_id', 'role'] },
    { fields: ['user_id'] }
  ]
});

module.exports = UserContext;

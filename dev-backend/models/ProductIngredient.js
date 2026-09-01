const { DataTypes, Model } = require('sequelize');
const database = require('../config/database');

class ProductIngredient extends Model {}

ProductIngredient.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  owner_user_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Brand General user id (scope owner)'
  },
  // 카테고리
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'ProductIngredientCategory FK'
  },
  // 재료 정보
  code: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: '재료 코드'
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  image_url: {
    type: DataTypes.TEXT('medium'),
    allowNull: true
  },
  // 단위
  unit: {
    type: DataTypes.ENUM('kg', 'g', 'L', 'ml', 'piece', 'pack', 'can', 'bottle'),
    allowNull: false
  },
  base_quantity: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 1,
    comment: '기본 수량'
  },
  // 가격
  unit_cost: {
    type: DataTypes.DECIMAL(10, 4),
    allowNull: false,
    defaultValue: 0.0000,
    comment: '단가'
  },
  // 공급처
  supplier_name: {
    type: DataTypes.STRING(100),
    allowNull: true,
    comment: '공급처명 (레거시)'
  },
  supplier_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: '공급처 FK'
  },
  // 재고 관리
  min_stock: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
    comment: '최소 재고 수준'
  },
  min_order: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
    comment: '최소 주문량'
  },
  current_stock: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
    comment: '현재 재고'
  },
  // PAR Level 계산
  lead_time_days: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    comment: '공급 리드타임 (일)'
  },
  safety_stock_percent: {
    type: DataTypes.DECIMAL(5, 2),
    defaultValue: 20.00,
    comment: '안전재고 비율 (%)'
  },
  manual_daily_usage: {
    type: DataTypes.DECIMAL(10, 4),
    allowNull: true,
    comment: '수동 일일 사용량'
  },
  avg_daily_usage: {
    type: DataTypes.DECIMAL(10, 4),
    defaultValue: 0,
    comment: '평균 일일 사용량'
  },
  prediction_confidence: {
    type: DataTypes.ENUM('high', 'medium', 'low', 'none'),
    defaultValue: 'none',
    comment: '예측 신뢰도'
  },
  last_actual_stock: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
    comment: '마지막 실사 재고'
  },
  last_stock_take_at: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: '마지막 실사일'
  },
  track_stock: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    // Q5(2026-09-01): **로직에서 읽지 않는 컬럼.** 호환용으로만 남긴다 — 게이트로 재사용 금지.
    // 예전에는 이 값이 꺼져 있으면 판매 차감·입고를 건너뛰었고, 그게 GIT 포장재가
    // 팔려도 재고가 안 빠진 직접 원인이었다(포장재 6개 전부 꺼짐). 스위치 자체를 없앴다.
    // 안 쓰는 품목은 `is_active=false` 로 끈다(원래 그 용도). 저재고 알림은 min_stock>0 만 뜬다.
    comment: '재고 추적 여부'
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  // 같은 물건인 판매 계층 재료(ingredients.id) 로의 **소프트 링크**.
  // ── 통합이 아니다 ────────────────────────────────────────────────────────
  // 매입 자재(product_ingredients)와 판매 재료(ingredients)는 계층이 다르다:
  // 전자는 "무엇을 사오는가", 후자는 "무엇으로 만드는가"이고, 매장 실재고의 진실은
  // 또 다른 곳(restaurant_ingredient_stocks)에 있다. 셋을 합치면 매입 단위와 소비 단위가
  // 뒤섞여 재고가 틀어진다. 그래서 **합치지 않고 잇기만** 한다 — 이 컬럼은 "이 자재는
  // 저 재료와 같은 물건"이라는 표시일 뿐이며, current_stock 계산에는 영향을 주지 않는다.
  // 값은 사람이 확인해 채운다(scripts/link-product-ingredients.js). 외래키 제약은 걸지
  // 않는다 — 판매 재료가 비활성/삭제돼도 매입 자재는 살아야 한다.
  linked_ingredient_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: '같은 물건인 ingredients.id (소프트 링크)'
  }
}, {
  sequelize: database.sequelize,
  modelName: 'ProductIngredient',
  tableName: 'product_ingredients',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = ProductIngredient;

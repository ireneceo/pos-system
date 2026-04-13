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
    comment: '재고 추적 여부'
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
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

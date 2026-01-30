const { DataTypes, Model } = require('sequelize');
const database = require('../config/database');

class Recipe extends Model {}

Recipe.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  // 소유권 타입 (brand 또는 restaurant)
  owner_type: {
    type: DataTypes.ENUM('brand', 'restaurant'),
    allowNull: false,
    defaultValue: 'restaurant',
    comment: '소유권 타입: brand(브랜드 공통) 또는 restaurant(지점 전용)'
  },
  brand_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Brand General이 생성한 레시피'
  },
  restaurant_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Restaurant Admin이 생성한 레시피'
  },
  // 기본 정보
  code: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  category: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: '레거시 카테고리명 (recipe_category_id 사용 권장)'
  },
  recipe_category_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: '레시피 카테고리 FK'
  },
  // 이미지/이모지
  image: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  emoji: {
    type: DataTypes.STRING(10),
    allowNull: true
  },
  // 옵션 (Products와 동일)
  option_groups: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: null,
    field: 'option_groups',
    get() {
      const rawValue = this.getDataValue('option_groups');
      return rawValue ? (typeof rawValue === 'string' ? JSON.parse(rawValue) : rawValue) : [];
    }
  },
  // 세트 메뉴
  is_set_menu: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  set_items: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: null,
    get() {
      const rawValue = this.getDataValue('set_items');
      return rawValue ? (typeof rawValue === 'string' ? JSON.parse(rawValue) : rawValue) : null;
    }
  },
  set_display_order: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  // 생산량 정보
  yield_amount: {
    type: DataTypes.DECIMAL(10, 4),
    defaultValue: 1.0000,
    comment: '생산량 (예: 10kg, 5 portion)'
  },
  yield_unit: {
    type: DataTypes.STRING(20),
    defaultValue: 'portion',
    comment: '생산 단위 (kg, g, L, ml, portion 등)'
  },
  // 원가 정보
  total_ingredient_cost: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00,
    comment: '재료 원가 합계'
  },
  suggested_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    comment: '권장 판매가'
  },
  // 조리 정보
  prep_time: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: '준비 시간 (분)'
  },
  cook_time: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: '조리 시간 (분)'
  },
  instructions: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: '조리 방법 (레거시, instructions_summary/detail 사용 권장)'
  },
  instructions_summary: {
    type: DataTypes.STRING(500),
    allowNull: true,
    comment: '레시피 요약 (리스트 표시용)'
  },
  instructions_detail: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: '상세 레시피 (Step-by-step)'
  },
  // 상태
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  version: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    comment: '레시피 버전'
  }
}, {
  sequelize: database.sequelize,
  modelName: 'Recipe',
  tableName: 'recipes',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Recipe;

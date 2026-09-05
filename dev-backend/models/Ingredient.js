const { DataTypes, Model } = require('sequelize');
const database = require('../config/database');

class Ingredient extends Model {}

Ingredient.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  // Owner type (brand / restaurant / foodcourt)
  owner_type: {
    type: DataTypes.ENUM('brand', 'restaurant', 'foodcourt'),
    allowNull: false,
    defaultValue: 'restaurant',
    comment: 'Owner type: brand / restaurant / foodcourt (각자 발주 가능)'
  },
  // Owner
  brand_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  restaurant_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  foodcourt_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  // Ingredient category
  ingredient_category_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Ingredient category FK'
  },
  // Brand product link
  brand_product_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Brand product FK - links to brand_products table'
  },
  // 재료 목록 통합(2026-09-04, docs/INGREDIENT_UNIFICATION_DESIGN.md):
  //   재료의 유일한 입력처는 Stock Items(product_ingredients) 이고,
  //   이 테이블의 브랜드 행은 그 **거울**이다. 열쇠는 거울 쪽에 둔다 —
  //   한 Stock Item 이 여러 브랜드에 공유되면 거울이 여럿이므로 거울 N → Stock Item 1.
  //   ⛔ 이 열쇠가 채워진 행의 이름·단위·카테고리는 사람이 고치지 않는다(API 403).
  //      Stock Item 을 고치면 동기화가 따라온다. 방향은 Stock Item → 거울 한 방향뿐.
  //   (구 `product_ingredients.linked_ingredient_id` 는 1:1 이라 못 쓴다 — 폐기, 데이터 0건.)
  source_product_ingredient_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: '이 행이 거울인 Stock Item(product_ingredients.id). null 이면 거울이 아님'
  },
  // 출처는 **둘 중 정확히 하나**다 (2026-09-04 Fable 판정):
  //   GIT 이 **사서 쓰는 것**(원재료·소모품) → 출처 = Stock Item(위 컬럼)
  //   GIT 이 **파는 것**(프로덕트: K-소스 완제품·포장재·굿즈) → 출처 = **브랜드 프로덕트**(이 컬럼)
  // 근거: 2026-09-01 `migrate-git-merge-packaging` 결정 — "레시피 없는 프로덕트는 그 자체가 재고아이템"
  //   (수량이 프로덕트에 산다). 파는 물건에 Stock Item 을 또 만들면 그때 합쳐 놓은 것이 다시 갈라진다.
  //   실측(2026-09-04): 활성 브랜드 재료 143건 중 **25건**이 소유 브랜드의 활성 프로덕트와 같은 물건이었다.
  // ⛔ 둘 다 채워진 행은 결함이다 — 인스펙션 ING-UNI-003 이 잡는다.
  source_brand_product_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: '이 행이 거울인 브랜드 프로덕트(brand_products.id). Stock Item 출처와 둘 중 하나만'
  },
  // Ingredient info
  code: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  image_url: {
    type: DataTypes.TEXT('medium'),
    allowNull: true
  },
  category: {
    type: DataTypes.ENUM('produce', 'meat', 'seafood', 'dairy', 'dry_goods', 'spices', 'beverages', 'other'),
    defaultValue: 'other'
  },
  // Stock unit
  unit: {
    type: DataTypes.ENUM('kg', 'g', 'L', 'ml', 'piece', 'pack', 'can', 'bottle'),
    allowNull: false
  },
  // ── 단위 모델 다섯 칸 — 재고아이템(product_ingredients)과 **같은 표**.
  //   docs/TRADE_STRUCTURE.md §2-2. 거울 행은 아이템에서 다섯 칸 그대로 복사된다(한 방향).
  base_quantity: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 1,
    comment: '취급 기준숫자 — 기준양 전체에 든 취급단위 양 = 가격이 사는 양'
  },
  package_unit: {
    type: DataTypes.ENUM('kg', 'g', 'L', 'ml', 'piece', 'pack', 'can', 'bottle'),
    allowNull: true,
    comment: '기준단위(포장) — 포장·발주 단위. 비면 취급단위와 같다'
  },
  package_quantity: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 1,
    comment: '기준양 — 가격이 가리키는 포장 수(보통 1)'
  },
  // Price
  unit_cost: {
    type: DataTypes.DECIMAL(10, 4),
    allowNull: false,
    defaultValue: 0.0000,
    comment: 'Cost per unit'
  },
  supplier_name: {
    type: DataTypes.STRING(100),
    allowNull: true,
    comment: 'Supplier name (deprecated - use supplier_id)'
  },
  supplier_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Supplier FK'
  },
  // Stock management
  min_stock: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
    comment: 'Minimum stock level'
  },
  min_order: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
    comment: 'Minimum order quantity from supplier'
  },
  current_stock: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
    comment: 'Current stock level'
  },
  // PAR Level calculation fields
  lead_time_days: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    comment: 'Supplier lead time in days'
  },
  safety_stock_percent: {
    type: DataTypes.DECIMAL(5, 2),
    defaultValue: 20.00,
    comment: 'Safety stock as percentage of lead time usage'
  },
  manual_daily_usage: {
    type: DataTypes.DECIMAL(10, 4),
    allowNull: true,
    comment: 'Manually set daily usage when prediction is not available'
  },
  avg_daily_usage: {
    type: DataTypes.DECIMAL(10, 4),
    defaultValue: 0,
    comment: 'Calculated average daily usage from history'
  },
  prediction_confidence: {
    type: DataTypes.ENUM('high', 'medium', 'low', 'none'),
    defaultValue: 'none',
    comment: 'Confidence level of usage prediction'
  },
  last_actual_stock: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
    comment: 'Last confirmed stock from stock take'
  },
  last_stock_take_at: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'Last stock take date'
  },
  track_stock: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    // Q5(2026-09-01): **로직에서 읽지 않는 컬럼.** 호환용으로만 남긴다 — 게이트로 재사용 금지.
    // 예전에는 이 값이 꺼져 있으면 판매 차감·입고를 건너뛰었고, 그게 GIT 포장재가
    // 팔려도 재고가 안 빠진 직접 원인이었다(포장재 6개 전부 꺼짐). 스위치 자체를 없앴다.
    // 안 쓰는 품목은 `is_active=false` 로 끈다(원래 그 용도). 저재고 알림은 min_stock>0 만 뜬다.
    comment: 'Whether to track this ingredient in inventory stock list'
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  sequelize: database.sequelize,
  modelName: 'Ingredient',
  tableName: 'ingredients',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    { fields: ['source_product_ingredient_id'] },
    { fields: ['source_brand_product_id'] }
  ]
});

module.exports = Ingredient;

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const BrandProduct = sequelize.define('BrandProduct', {
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
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'brand_product_categories',
      key: 'id'
    }
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  sku: {
    type: DataTypes.STRING(100),
    allowNull: true,
    comment: '제품 코드'
  },
  unit: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: 'Base unit (kg, L, piece, etc.)'
  },
  base_quantity: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 1,
    comment: 'Base quantity per unit'
  },
  unit_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
    comment: '단가'
  },
  min_order_quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    comment: '최소 주문 수량'
  },
  image_url: {
    type: DataTypes.TEXT('medium'),
    allowNull: true
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  // ── 레시피 없는 프로덕트의 자체 재고 (2026-08-22) ─────────────────────────
  // 상품은 둘 중 하나다: 레시피 있으면 매입자재가 빠지고, 없으면 **이 상품이 재고 단위**다.
  // 매장 메뉴(`products`)와 완전히 같은 규칙 — 브랜드는 프로덕트를 매장에 판다.
  track_stock: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    comment: '재고 추적 여부(기본 꺼짐 — 재고를 세겠다고 정한 상품만 켠다)'
  },
  current_stock: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
    comment: '레시피 없는 상품의 자체 재고'
  },
  min_stock: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
    comment: '부족 알림 임계치(0 = 알림 없음)'
  },
  stock_unit: {
    type: DataTypes.STRING(20),
    allowNull: true,
    comment: '재고 단위(판매 단위와 다를 수 있다)'
  },
  distribution_mode: {
    type: DataTypes.ENUM('all', 'specific_brands', 'specific_restaurants'),
    allowNull: false,
    defaultValue: 'specific_brands',
    comment: 'all=BG 소유 모든 brand 가맹점 노출, specific_brands=brand_product_brands, specific_restaurants=brand_product_restaurants'
  },
  sync_to_ingredients: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    comment: 'Whether to sync to ingredients table for recipes'
  },
  emoji: {
    type: DataTypes.STRING(10),
    allowNull: true,
    comment: 'Product emoji icon'
  },
  is_set_menu: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    comment: 'Whether this product is a set/combo'
  },
  set_items: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'JSON array of set items: [{productId, name, quantity}]',
    get() {
      const rawValue = this.getDataValue('set_items');
      if (!rawValue) return null;
      try {
        return JSON.parse(rawValue);
      } catch (e) {
        return null;
      }
    },
    set(value) {
      this.setDataValue('set_items', value ? JSON.stringify(value) : null);
    }
  },
  set_display_order: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    comment: 'Display order for set menus within category'
  },
  sort_order: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  recipe_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'recipes',
      key: 'id'
    },
    comment: 'Linked recipe for ingredient cost tracking (legacy)'
  },
  product_recipe_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'product_recipes',
      key: 'id'
    },
    comment: 'Linked product recipe (new system)'
  }
}, {
  tableName: 'brand_products',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = BrandProduct;

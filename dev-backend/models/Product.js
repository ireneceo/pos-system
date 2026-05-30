const { DataTypes, Model } = require('sequelize');
const database = require('../config/database');

class Product extends Model {}

Product.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  restaurant_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  code: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  category: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT('medium')
  },
  optionGroups: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  },
  image: {
    type: DataTypes.TEXT('medium'),
    allowNull: true,
    comment: '원본 이미지 URL (/uploads/products/xxx.jpg)'
  },
  image_thumbnail: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: '썸네일 이미지 URL (/uploads/products/thumbnails/xxx.jpg)'
  },
  emoji: {
    type: DataTypes.STRING(10),
    allowNull: true
  },
  soldOut: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    comment: 'Whether the menu item is active (visible to customers)'
  },
  // Stock management fields
  track_stock: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    comment: 'Whether to track stock for this product'
  },
  current_stock: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
    comment: 'Current stock quantity'
  },
  min_stock: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
    comment: 'Minimum stock level for alerts'
  },
  stock_unit: {
    type: DataTypes.STRING(20),
    defaultValue: 'piece',
    comment: 'Stock unit (piece, box, pack, etc)'
  },
  supplier_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Supplier FK'
  },
  unit_cost: {
    type: DataTypes.DECIMAL(10, 4),
    defaultValue: 0,
    comment: 'Cost per unit for inventory valuation'
  },
  last_stock_take_at: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'Last stock take date'
  },
  is_set_menu: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  set_items: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: null
  },
  // 세트메뉴 v2 — OR(택1) 슬롯 + 구성품 live 참조 + 옵션 상속 (SET_MENU_REDESIGN.md §8).
  // shape: [{ id, label, type:'fixed'|'choice', min, max, items:[{product_id, qty, upcharge}] }]
  // set_items 는 레거시 폴백용으로 유지 (resolveSetGroups 가 런타임 변환).
  set_groups: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: null
  },
  set_display_order: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  recipe_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: '연결된 레시피 ID'
  },
  product_recipe_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: '연결된 제품 레시피 ID'
  },
  kitchen_station_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Kitchen station assignment (menu item mode or override)'
  },
  is_featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    comment: 'Featured item for mobile order display'
  },
  // Brand Menu System (v3.32+) — linkage with a BG-owned BrandMenu template.
  brand_menu_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'FK → brand_menus.id. NULL means standalone (not linked).'
  },
  brand_menu_synced_version: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'BrandMenu.version at last sync.'
  },
  brand_menu_synced_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  brand_menu_locks_snapshot: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Snapshot of BrandMenu lock flags at sync time — {name,price,category,image,options}.'
  },
  brand_menu_link_status: {
    type: DataTypes.ENUM('in_sync', 'pending_update', 'unlinked'),
    allowNull: true,
    comment: 'Current sync state with the linked BrandMenu. NULL = never synced.'
  },
  takeaway_charge: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    defaultValue: null,
    comment: 'Per-item packaging fee override for pricingType=per-item-individual. NULL = use defaultPerItemCharge; number (incl. 0) = explicit override.'
  }
}, {
  sequelize: database.sequelize,
  modelName: 'Product',
  tableName: 'products',
  timestamps: true
});

module.exports = Product;

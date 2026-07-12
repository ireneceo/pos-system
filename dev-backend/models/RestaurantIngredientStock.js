const { DataTypes, Model } = require('sequelize');
const database = require('../config/database');

/**
 * RestaurantIngredientStock — 브랜드 소유 재료(ingredients.owner_type='brand')에 대한
 * 매장별 실재고.
 *
 * 브랜드 재료 행은 소속 매장이 공유하므로, 입고/폐기/조정으로 ingredients.current_stock 을
 * 직접 갱신하면 형제 매장 재고까지 뒤섞인다. 단가가 이미 RestaurantIngredientCost 로
 * 매장별 분리돼 있는 것과 대칭으로, 재고도 매장별 오버레이로 분리한다.
 *
 * 매장 소유 재료(owner_type='restaurant')는 이 테이블을 쓰지 않는다 —
 * 기존대로 ingredients.current_stock 이 단일 소스.
 */
class RestaurantIngredientStock extends Model {}

RestaurantIngredientStock.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  restaurant_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: 'Restaurant FK'
  },
  ingredient_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: 'Brand Ingredient FK (owner_type=brand only)'
  },
  current_stock: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
    comment: 'This restaurant stock on hand for the brand ingredient'
  },
  last_stock_take_at: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize: database.sequelize,
  modelName: 'RestaurantIngredientStock',
  tableName: 'restaurant_ingredient_stocks',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      unique: true,
      fields: ['restaurant_id', 'ingredient_id'],
      name: 'uq_restaurant_ingredient_stock'
    }
  ]
});

module.exports = RestaurantIngredientStock;

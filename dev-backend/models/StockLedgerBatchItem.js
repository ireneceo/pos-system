const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

/**
 * StockLedgerBatchItem — 재고 장부 이관·일괄링크의 **쓰기 1건 = 1행** 이력.
 *
 * 설계: docs/STOCK_LEDGER_UNIFICATION_DESIGN.md §10-1
 * 이 표 하나로 멱등 재실행·롤백·감사를 전부 처리한다(배치 헤더 표는 만들지 않는다 — batch_id 그룹핑).
 * 이력 표라 soft delete 없음. 되돌린 행도 지우지 않고 status='reverted' 로만 표시한다.
 */
const StockLedgerBatchItem = sequelize.define('StockLedgerBatchItem', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  batch_id: { type: DataTypes.CHAR(36), allowNull: false, comment: 'UUID. 한 번의 제출 = 한 batch' },
  // ⚠ v1 코드는 'foodcourt' 값을 절대 쓰지 않는다(쓰기 경로 없음).
  //    나중에 ENUM 을 늘리면 운영 ALTER 가 한 번 더 필요하므로 값만 미리 둔다.
  entity_type: { type: DataTypes.ENUM('brand', 'restaurant', 'foodcourt'), allowNull: false },
  entity_id: { type: DataTypes.INTEGER, allowNull: false, comment: '구매자 스코프 — 서버가 확정, 클라이언트 값 불신' },
  action: {
    type: DataTypes.ENUM('create_ingredient', 'link_seller', 'update_cost', 'skip', 'hold'),
    allowNull: false
  },
  target_table: { type: DataTypes.STRING(64), allowNull: false, comment: 'ingredients | ingredient_seller_products' },
  target_id: { type: DataTypes.INTEGER, allowNull: true, comment: '생성·수정된 행 id. skip/hold 면 null' },
  source_ref: { type: DataTypes.STRING(64), allowNull: true, comment: 'product_ingredient:288 / supplier_product:41 등 출처' },
  payload_before: { type: DataTypes.JSON, allowNull: true, comment: '신규 생성이면 null' },
  payload_after: { type: DataTypes.JSON, allowNull: true },
  status: { type: DataTypes.ENUM('applied', 'failed', 'reverted'), allowNull: false, defaultValue: 'applied' },
  error: { type: DataTypes.STRING(255), allowNull: true },
  created_by_user_id: { type: DataTypes.INTEGER, allowNull: false }
}, {
  tableName: 'stock_ledger_batch_items',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
  indexes: [
    { fields: ['batch_id'] },
    { fields: ['entity_type', 'entity_id', 'created_at'] },
    { fields: ['target_table', 'target_id'] }
  ]
});

module.exports = StockLedgerBatchItem;

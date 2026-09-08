const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

/**
 * 원가 변경 이력 (2026-09-08 · 발주↔인보이스 원가 대조 설계 §2)
 *
 * "누가 언제 이 원가를 바꿨나"의 단일 소스. `activity_logs` 를 쓰지 않는 이유 3가지:
 *   ① activity_logs.restaurant_id 가 FK 라 BG·푸드코트 구매자가 못 쓴다
 *   ② changes 가 JSON 이라 그래프·평균의 소스가 못 된다
 *   ③ "이 대상의 마지막 변경"을 1쿼리로 못 뽑는다
 *
 * ⛔ 시장 가격 변동(얼마에 사 왔나)은 여기가 아니라 **발주/청구 라인**에서 읽는다.
 *    여기는 *우리 원가 기준이 언제 어떻게 바뀌었나* 만 담는다.
 *
 * 쓰는 지점은 services/costSync.js 안 한 곳(recomputeUnitCost 의 UPDATE 순간).
 * 호출부마다 로그를 쓰지 않는다 — 쓰는 곳이 늘면 반드시 빠지는 곳이 생긴다.
 */
const CostChangeLog = sequelize.define('CostChangeLog', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

  subject_type: {
    type: DataTypes.ENUM('seller_product', 'ingredient', 'product_ingredient', 'po_item'),
    allowNull: false,
    comment: '무엇의 원가가 바뀌었나'
  },
  subject_id: { type: DataTypes.INTEGER, allowNull: false },

  // 구매자 — 누가 샀느냐 = 누구 원가가 바뀌느냐 (설계 §3 범위 규칙)
  entity_type: { type: DataTypes.ENUM('restaurant', 'brand', 'foodcourt'), allowNull: true },
  entity_id: { type: DataTypes.INTEGER, allowNull: true },

  // 판매자 — 어느 공급처의 가격이 근거였나
  seller_type: { type: DataTypes.ENUM('system_admin', 'brand', 'foodcourt', 'supplier'), allowNull: true },
  seller_entity_id: { type: DataTypes.INTEGER, allowNull: true },

  old_value: { type: DataTypes.DECIMAL(12, 4), allowNull: true, comment: '바뀌기 전 단가. 최초 설정이면 null' },
  new_value: { type: DataTypes.DECIMAL(12, 4), allowNull: false },
  unit: { type: DataTypes.STRING(50), allowNull: true },

  source: {
    type: DataTypes.ENUM('invoice_reconcile', 'seller_edit', 'manual', 'backfill', 'retro_apply'),
    allowNull: false,
    comment: '무엇이 이 변경을 일으켰나'
  },
  purchase_order_id: {
    type: DataTypes.INTEGER, allowNull: true,
    comment: '근거가 된 인보이스가 붙은 발주. 대조에서 나온 변경이면 채워진다'
  },
  batch_id: {
    type: DataTypes.STRING(64), allowNull: true,
    comment: '소급 적용 묶음. 되돌리기는 이 값 역순 적용'
  },

  changed_by_user_id: { type: DataTypes.INTEGER, allowNull: true },
  changed_by_name: {
    type: DataTypes.STRING(255), allowNull: true,
    comment: '표시용 스냅샷 — 계정이 지워져도 "누가"가 남아야 한다'
  },
  note: { type: DataTypes.STRING(500), allowNull: true },
  changed_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
}, {
  tableName: 'cost_change_logs',
  timestamps: false,
  underscored: true,
  indexes: [
    // "이 대상의 마지막 변경" 1쿼리 — 표시 동기화 API(§7)가 이 인덱스로 돈다
    { name: 'idx_ccl_subject', fields: ['subject_type', 'subject_id', 'changed_at'] },
    { name: 'idx_ccl_buyer', fields: ['entity_type', 'entity_id', 'changed_at'] },
    { name: 'idx_ccl_po', fields: ['purchase_order_id'] },
    { name: 'idx_ccl_batch', fields: ['batch_id'] }
  ]
});

module.exports = CostChangeLog;

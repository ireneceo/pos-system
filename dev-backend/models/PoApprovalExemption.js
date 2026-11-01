const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

/**
 * 오너 발주 승인 예외 규칙 — 2026-11-01 Fable 설계 docs/PURCHASE_ORDER_SYSTEM.md §G-7-3.
 * 오너가 «이건 나한테 묻지 말고 바로 보내» 라고 지정한 공급업체·재료 카테고리·품목.
 * 판정은 utils/poOwnerApproval.evaluateApproval 하나. 타깃 FK 없음(느슨한 참조) · 하드 삭제 · 감사는 activity log.
 */
const PoApprovalExemption = sequelize.define('PoApprovalExemption', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  restaurant_id: { type: DataTypes.INTEGER, allowNull: false },
  scope: { type: DataTypes.ENUM('seller', 'ingredient_category', 'ingredient', 'product'), allowNull: false },
  seller_type: {
    type: DataTypes.ENUM('none', 'system_admin', 'brand', 'foodcourt', 'supplier'),
    allowNull: false, defaultValue: 'none',
    comment: "scope='seller' 일 때만 실제 값 — UNIQUE 가 NULL 을 못 거르므로 'none'"
  },
  target_id: { type: DataTypes.INTEGER, allowNull: false, comment: 'seller → seller_entity_id(system_admin=0) · 그 외 카테고리/재료/프로덕트 id' },
  note: { type: DataTypes.STRING(255), allowNull: true },
  created_by_user_id: { type: DataTypes.INTEGER, allowNull: false }
}, {
  tableName: 'po_approval_exemptions',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    { fields: ['restaurant_id'] },
    { unique: true, name: 'uq_po_approval_exemption', fields: ['restaurant_id', 'scope', 'seller_type', 'target_id'] }
  ]
});

module.exports = PoApprovalExemption;

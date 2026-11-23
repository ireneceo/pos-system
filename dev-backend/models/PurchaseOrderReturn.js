const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const PurchaseOrderReturn = sequelize.define('PurchaseOrderReturn', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  purchase_order_id: { type: DataTypes.INTEGER, allowNull: false },
  purchase_order_item_id: { type: DataTypes.INTEGER, allowNull: false },
  // 발주 라인은 두 모양이다: 매장/푸드코트 = ingredient_id · BG 본사 = product_ingredient_id.
  // 예전엔 ingredient_id 가 NOT NULL 이라 BG 구매자 반품이 500 으로 죽었다. (Fable 2026-07-13)
  ingredient_id: { type: DataTypes.INTEGER, allowNull: true },
  product_ingredient_id: { type: DataTypes.INTEGER, allowNull: true, comment: 'BG 재고아이템 라인 반품 (ingredient_id 와 둘 중 하나)' },
  quantity: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  unit: { type: DataTypes.STRING(50), allowNull: true },
  unit_price: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
  reason: { type: DataTypes.TEXT, allowNull: true },
  status: {
    type: DataTypes.ENUM('requested', 'approved', 'rejected', 'withdrawn'),   // withdrawn = 구매자 신청 철회 (2026-11-23)
    allowNull: false, defaultValue: 'requested'
  },
  requested_by_user_id: { type: DataTypes.INTEGER, allowNull: false },
  approved_by_user_id: { type: DataTypes.INTEGER, allowNull: true },
  rejected_by_user_id: { type: DataTypes.INTEGER, allowNull: true },
  resolved_at: { type: DataTypes.DATE, allowNull: true },
  rejection_reason: { type: DataTypes.TEXT, allowNull: true },
  credit_invoice_id: { type: DataTypes.INTEGER, allowNull: true, comment: '옛 승인 때 만든 Credit Note. 2026-11-17 부터 안 만든다(청구서에서 바로 뺌)' },
  // 반품 금액 차감 (2026-11-17 · services/poReturnDeduction)
  initiated_by: { type: DataTypes.STRING(10), allowNull: false, defaultValue: 'buyer', comment: "'buyer' | 'seller'" },
  deducted_invoice_id: { type: DataTypes.INTEGER, allowNull: true, comment: '금액을 뺀 거래 청구서. null = 안 뺌' },
  deducted_amount: { type: DataTypes.DECIMAL(12, 2), allowNull: true, comment: '뺀 금액' },
  // 결제된 주문의 반품 = 청구서에서 못 빼고 환불로 (2026-11-23 · services/poRefund)
  refund_id: { type: DataTypes.INTEGER, allowNull: true, comment: '환불로 처리한 반품 — purchase_order_refunds.id' },

  // 외부(솔루션 미가입) 공급업체에 반품서를 보낸 기록 (2026-09-08).
  //   그쪽은 로그인이 없어 시스템 안에서 승인할 사람이 없다 → 발주와 같이 왓츠앱·메일·PDF 로 보낸다.
  sent_to_seller_at: { type: DataTypes.DATE, allowNull: true, comment: '반품서를 보낸 시각. null = 아직 안 보냄' },
  sent_channel: { type: DataTypes.STRING(20), allowNull: true, comment: 'whatsapp | email | pdf | manual' },
  sent_by_user_id: { type: DataTypes.INTEGER, allowNull: true },

  // Sprint 7
  auto_generated: {
    type: DataTypes.BOOLEAN,
    allowNull: false, defaultValue: false,
    comment: 'Sprint 7: receive 시 damaged/wrong_item으로 자동 생성된 returns'
  },
  source_event: {
    type: DataTypes.ENUM('manual', 'receive_damage', 'receive_wrong_item'),
    allowNull: false, defaultValue: 'manual',
    comment: 'Sprint 7: 어떤 이벤트로 생성되었는가'
  }
}, {
  tableName: 'purchase_order_returns',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    { fields: ['purchase_order_id'] },
    { fields: ['status'] },
    { fields: ['purchase_order_id', 'status'] }
  ]
});

module.exports = PurchaseOrderReturn;

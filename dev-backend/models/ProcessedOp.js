const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/database');

/**
 * ProcessedOp — 오프라인 5단계(§8) opId 멱등 가드.
 *
 * 복구 시 SyncEngine 이 op 로그를 서버에 재생하는데, 응답 유실(적용 후 네트워크 끊김) 시 같은 op 를
 * 재전송할 수 있다. 각 변경 op 는 고유 opId 를 갖고, 처리 시 여기 1행 기록 → 재전송돼도 한 번만 적용.
 *
 * 핵심 안전: op_id 는 **SyncEngine 재생 요청만** 보낸다(온라인 일반 요청엔 없음) → 가드는 op_id 가
 * 있을 때만 작동, 온라인 동작은 100% 그대로.
 */
class ProcessedOp extends Model {}

ProcessedOp.init({
  op_id: {
    type: DataTypes.STRING(64),
    primaryKey: true,
    comment: 'Client-generated uuid for the offline operation (idempotency unit)'
  },
  order_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  type: {
    type: DataTypes.STRING(32),
    allowNull: true,
    comment: 'op type: add_items / cancel_item / cancel_order / move_table / set_stage / pay'
  },
  restaurant_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'ProcessedOp',
  tableName: 'processed_ops',
  timestamps: true,
  indexes: [
    { fields: ['order_id'] }
  ]
});

module.exports = ProcessedOp;

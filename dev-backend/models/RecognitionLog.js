const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/database');

/**
 * RecognitionLog — 모든 인식 시도 기록 (텍스트만, 원본 사진 무보존 — 결정 #1).
 * 설계: docs/AI_FOOD_RECOGNITION_DESIGN.md §3.2 / §B-3.
 * INSERT = recognize 응답 직전, decision/chosen_* = outcome API 로 나중 UPDATE.
 * abandoned = decision NULL AND created_at < NOW()-5min (조회시 파생, 별도 배치 없음).
 */
class RecognitionLog extends Model {}

RecognitionLog.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  restaurant_id: { type: DataTypes.INTEGER, allowNull: false },
  staff_user_id: { type: DataTypes.INTEGER, allowNull: true },
  query_embedding: { type: DataTypes.JSON, allowNull: true, comment: '선택·기본 OFF(retainEvalVectors=false). 벡터만, 원본 사진 절대 없음' },
  candidates: { type: DataTypes.JSON, allowNull: false },
  top_product_id: { type: DataTypes.INTEGER, allowNull: true },
  top_confidence: { type: DataTypes.DECIMAL(5, 4), allowNull: true },
  mode: { type: DataTypes.ENUM('auto', 'recommend', 'pick', 'reshoot', 'fallback', 'no_candidates'), allowNull: false },
  decision: { type: DataTypes.ENUM('auto_confirmed', 'recommend_confirmed', 'picked_other', 'manual', 'reshoot', 'abandoned'), allowNull: true },
  chosen_order_id: { type: DataTypes.INTEGER, allowNull: true },
  chosen_item_index: { type: DataTypes.SMALLINT, allowNull: true },
  chosen_product_id: { type: DataTypes.INTEGER, allowNull: true },
  was_top1_correct: { type: DataTypes.BOOLEAN, allowNull: true },
  provider: { type: DataTypes.STRING(30), allowNull: false },
  latency_ms: { type: DataTypes.SMALLINT.UNSIGNED, allowNull: true },
}, {
  sequelize,
  modelName: 'RecognitionLog',
  tableName: 'recognition_logs',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
  indexes: [
    { fields: ['restaurant_id', 'created_at'] },
  ],
});

module.exports = RecognitionLog;

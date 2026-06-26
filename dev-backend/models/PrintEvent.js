const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

/**
 * PrintEvent — 인쇄 가시성/진단 이력 (Print Visibility & Diagnostics)
 *
 * 목적: 매장 인쇄가 "안 됐을 때" 사유를 누적 기록 → 직원 표시(미인쇄 팝업) +
 *   환경/인터넷 문제 패턴 추적(진단 화면). 설계 = docs/PRINT_VISIBILITY_DIAGNOSTICS.md.
 *
 * 성격: 순수 신규·additive 로그 테이블. 인쇄 동작(billPrint 라우팅/타이밍/방식)은
 *   한 줄도 안 바뀐다 — "지켜보고 기록"만. 주문의 현재 미인쇄 여부는
 *   orders.needs_print/printed_at 에서 파생(이 테이블은 이력/진단 전용).
 */
const PrintEvent = sequelize.define('PrintEvent', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  restaurant_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'restaurants', key: 'id' }
  },
  order_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  order_number: {
    type: DataTypes.STRING(64),
    allowNull: true
  },
  station_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  station_name: {
    type: DataTypes.STRING(120),
    allowNull: true
  },
  // success = 정상 인쇄, failed = QZ/연결 실패, skipped = 게이트로 건너뜀,
  // fallback = 의도 프린터 미도달 → 기본 프린터로 나감(가짜 초록)
  outcome: {
    type: DataTypes.ENUM('success', 'failed', 'skipped', 'fallback'),
    allowNull: false
  },
  // master_off / no_device / qz_error / dead_claim / backlog /
  // printer_unreachable_fallback (docs §1 카탈로그)
  reason_code: {
    type: DataTypes.STRING(48),
    allowNull: true
  },
  reason_detail: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  intended_printer: {
    type: DataTypes.STRING(160),
    allowNull: true
  },
  actual_printer: {
    type: DataTypes.STRING(160),
    allowNull: true
  },
  workstation_id: {
    type: DataTypes.STRING(64),
    allowNull: true
  }
}, {
  tableName: 'print_events',
  timestamps: true,
  underscored: true,
  updatedAt: false,  // append-only 로그
  indexes: [
    { fields: ['restaurant_id', 'created_at'], name: 'print_event_rest_time' },
    { fields: ['order_id'], name: 'print_event_order' },
    { fields: ['reason_code', 'created_at'], name: 'print_event_reason_time' }
  ]
});

module.exports = PrintEvent;

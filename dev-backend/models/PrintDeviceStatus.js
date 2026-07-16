const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

/**
 * PrintDeviceStatus — 인쇄 자가진단: 기기별 최신 상태 스냅샷.
 *
 * 목적: 각 POS 기기(브라우저/데스크탑앱/안드로이드앱)가 90초마다 + 진단 실행 직후
 *   자기 상태(브릿지·프린터모드·앱버전·자동인쇄 담당 여부·프린터목록 요약)를 서버에
 *   올린다. 자가진단 패널·원격뷰(Admin Print Health)가 "다른 기기가 지금 어떤가"를
 *   알 수 있는 유일한 채널. 설계 = docs/PRINT_SELF_DIAGNOSE_DESIGN.md §2·§4.
 *
 * 성격: 기기당 1행 upsert(로그 아님, 무한증가 없음). 인쇄 동작 무관 — 리포터는 상태를
 *   읽어 보내기만 하고, 인쇄 경로(billPrint/폴러/claim)는 한 줄도 안 건드린다.
 */
const PrintDeviceStatus = sequelize.define('PrintDeviceStatus', {
  id:             { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  restaurant_id:  { type: DataTypes.INTEGER, allowNull: false, references: { model: 'restaurants', key: 'id' } },
  // 기기 자체 발급 uuid(localStorage 영속). (restaurant_id, device_id) 로 기기당 1행.
  device_id:      { type: DataTypes.STRING(64), allowNull: false },
  workstation_id: { type: DataTypes.STRING(64), allowNull: true },
  label:          { type: DataTypes.STRING(120), allowNull: true, comment: '표시명 예: "POS1 (Windows 앱)"' },
  platform:       { type: DataTypes.STRING(32), allowNull: true, comment: 'windows-app / android-app / web-qz / web-rawbt / web' },
  app_version:    { type: DataTypes.STRING(32), allowNull: true, comment: '네이티브 앱 버전(있을 때)' },
  printer_mode:   { type: DataTypes.STRING(16), allowNull: true, comment: 'qztray/rawbt/browser' },
  is_auto_print:  { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false, comment: '이 기기가 자동인쇄 담당 설정인가' },
  qz_active:      { type: DataTypes.BOOLEAN, allowNull: true, comment: 'QZ websocket isActive (상태 읽기만)' },
  snapshot:       { type: DataTypes.JSON, allowNull: true, comment: '프린터 목록·설정 요약·마지막 기기 진단 결과' },
  last_report_at: { type: DataTypes.DATE, allowNull: true },
  last_diag_at:   { type: DataTypes.DATE, allowNull: true }
}, {
  tableName: 'print_device_status',
  indexes: [
    { unique: true, fields: ['restaurant_id', 'device_id'], name: 'uq_pds_restaurant_device' },
    { fields: ['restaurant_id'] },
    { fields: ['last_report_at'] }
  ]
});

module.exports = PrintDeviceStatus;

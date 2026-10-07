const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

// 매장이 등록한 키오스크 태블릿 — 1대 = 1행 (Fable 판정 .claude/fable-verdict-20261007-kiosk-payment-split.md D2).
// «키오스크» 는 URL 이 아니라 이 행이다: 서버가 발급한 기기 토큰이 있어야 키오스크 결제 채널·단말기 결제가 열린다.
// 토큰 원문은 등록 응답에 한 번만 나가고 DB 에는 sha256 만 남는다. 표는 scripts/migrate-create-kiosk-devices.js 가 만든다.
const KioskDevice = sequelize.define('KioskDevice', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  restaurant_id: { type: DataTypes.INTEGER, allowNull: false },
  name: { type: DataTypes.STRING(80), allowNull: false },
  token_hash: { type: DataTypes.CHAR(64), allowNull: false, unique: true },
  status: { type: DataTypes.ENUM('active', 'revoked'), allowNull: false, defaultValue: 'active' },
  // 이 기기 옆 단말기 — 비면 매장 결제 설정(card.terminal)의 주소를 쓴다
  terminal_host: { type: DataTypes.STRING(64), allowNull: true },
  terminal_port: { type: DataTypes.INTEGER, allowNull: true },
  last_seen_at: { type: DataTypes.DATE, allowNull: true },
  created_by: { type: DataTypes.INTEGER, allowNull: true },
  revoked_at: { type: DataTypes.DATE, allowNull: true },
  revoked_by: { type: DataTypes.INTEGER, allowNull: true },
}, {
  tableName: 'kiosk_devices',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  underscored: true,
  indexes: [
    { unique: true, fields: ['token_hash'], name: 'kiosk_device_token' },
    { fields: ['restaurant_id', 'status'], name: 'kiosk_device_rest_status' },
  ],
});

module.exports = KioskDevice;

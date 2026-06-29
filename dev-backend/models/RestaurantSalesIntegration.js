const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

/**
 * RestaurantSalesIntegration — 입점몰(쇼핑몰) 매출보고 API 연동 설정.
 *
 * 첫 사례: thefire01 @ IOI Mall Damansara (Tangent/Synthesis "POS SalesHourly").
 * 입점 매장이 몰 측에 시간별 매출(하루 24레코드)을 매일 업로드하는 표준 요구.
 * `provider` 필드로 다른 몰/벤더 재사용. 자격증명(password)은 AES-256 암호화 저장.
 *
 * 계약·매핑·결정의 단일 진실: docs/MALL_SALES_API_INTEGRATION.md
 */
const RestaurantSalesIntegration = sequelize.define('RestaurantSalesIntegration', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  restaurant_id: {
    type: DataTypes.INTEGER, allowNull: false,
    references: { model: 'restaurants', key: 'id' }
  },
  // 몰 API 벤더 종류 — 타 입점몰 재사용 시 분기 키.
  provider: {
    type: DataTypes.STRING(50), allowNull: false, defaultValue: 'tangent_synthesis',
    comment: "API vendor key, e.g. 'tangent_synthesis' (IOI Mall)"
  },
  mall_name: { type: DataTypes.STRING(150), allowNull: true },      // 'IOI Mall Damansara'
  mall_operator: { type: DataTypes.STRING(150), allowNull: true },  // 'IOI'
  environment: {
    type: DataTypes.ENUM('staging', 'production'), allowNull: false, defaultValue: 'staging'
  },
  // OAuth2 token endpoint + SalesHourly endpoint (환경별 다름).
  token_url: { type: DataTypes.STRING(255), allowNull: true },
  sales_url: { type: DataTypes.STRING(255), allowNull: true },
  // 자격증명 — machine_id/user_id 는 평문, password 는 암호화(password_enc).
  machine_id: { type: DataTypes.STRING(100), allowNull: true },
  user_id: { type: DataTypes.STRING(150), allowNull: true },
  password_enc: { type: DataTypes.TEXT, allowNull: true, comment: 'AES-256 encrypted (utils/encryption)' },
  // 몰 필드 gstregistered — 'Y'/'N' enum (말레이시아 SST/GST 등록 여부).
  gst_registered: {
    type: DataTypes.ENUM('Y', 'N'), allowNull: false, defaultValue: 'N'
  },
  cadence: {
    type: DataTypes.ENUM('daily'), allowNull: false, defaultValue: 'daily',
    comment: 'Mall requires daily upload of 24 hourly records'
  },
  // 매일 전송 시 최근 N일을 함께 upsert 재전송(몰 측 update/create). 기본 7.
  send_window_days: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 7 },
  enabled: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  // 모니터링 — 마지막 실행/상태/에러.
  last_run_at: { type: DataTypes.DATE, allowNull: true },
  last_status: { type: DataTypes.STRING(20), allowNull: true },     // success | partial | error
  last_error: { type: DataTypes.TEXT, allowNull: true }
}, {
  tableName: 'restaurant_sales_integrations',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  underscored: true,
  indexes: [
    { fields: ['restaurant_id'] },
    { fields: ['provider'] }
  ]
});

module.exports = RestaurantSalesIntegration;

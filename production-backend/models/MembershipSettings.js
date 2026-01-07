const { DataTypes, Model } = require('sequelize');
const database = require('../config/database');

class MembershipSettings extends Model {}

MembershipSettings.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  restaurant_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    comment: '레스토랑 ID'
  },

  // 포인트 활성화
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    comment: '멤버십 활성화 여부'
  },

  // 포인트 적립 설정
  points_per_currency: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 1.00,
    comment: '통화 1단위당 적립 포인트 (예: RM1 = 1포인트)'
  },
  points_to_currency: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 100.00,
    comment: '포인트 사용 비율 (예: 100포인트 = RM1)'
  },
  min_points_to_use: {
    type: DataTypes.INTEGER,
    defaultValue: 100,
    comment: '최소 사용 가능 포인트'
  },
  max_points_per_order_percent: {
    type: DataTypes.DECIMAL(5, 2),
    defaultValue: 50.00,
    comment: '주문당 최대 포인트 사용률 (%)'
  },

  // 등급 기준 (총 지출액 기준)
  silver_threshold: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 500.00,
    comment: 'Silver 승급 기준 금액'
  },
  gold_threshold: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 2000.00,
    comment: 'Gold 승급 기준 금액'
  },
  vip_threshold: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 5000.00,
    comment: 'VIP 승급 기준 금액'
  },

  // 등급별 보너스 적립률 (배수)
  bronze_bonus_rate: {
    type: DataTypes.DECIMAL(3, 2),
    defaultValue: 1.00,
    comment: 'Bronze 적립 배수 (1.0x)'
  },
  silver_bonus_rate: {
    type: DataTypes.DECIMAL(3, 2),
    defaultValue: 1.20,
    comment: 'Silver 적립 배수 (1.2x)'
  },
  gold_bonus_rate: {
    type: DataTypes.DECIMAL(3, 2),
    defaultValue: 1.50,
    comment: 'Gold 적립 배수 (1.5x)'
  },
  vip_bonus_rate: {
    type: DataTypes.DECIMAL(3, 2),
    defaultValue: 2.00,
    comment: 'VIP 적립 배수 (2.0x)'
  },

  // 등급별 할인율 (%)
  bronze_discount_percent: {
    type: DataTypes.DECIMAL(5, 2),
    defaultValue: 0.00,
    comment: 'Bronze 할인율'
  },
  silver_discount_percent: {
    type: DataTypes.DECIMAL(5, 2),
    defaultValue: 0.00,
    comment: 'Silver 할인율'
  },
  gold_discount_percent: {
    type: DataTypes.DECIMAL(5, 2),
    defaultValue: 5.00,
    comment: 'Gold 할인율'
  },
  vip_discount_percent: {
    type: DataTypes.DECIMAL(5, 2),
    defaultValue: 10.00,
    comment: 'VIP 할인율'
  },

  // 포인트 유효 기간
  points_expiry_days: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    comment: '포인트 유효 기간 (일), 0=무제한'
  },

  // 환영 포인트
  welcome_points: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    comment: '회원가입 시 지급 포인트'
  },

  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'created_at'
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'updated_at'
  }
}, {
  sequelize: database.sequelize,
  modelName: 'MembershipSettings',
  tableName: 'membership_settings',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = MembershipSettings;

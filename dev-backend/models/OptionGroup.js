const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const OptionGroup = sequelize.define('OptionGroup', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  required: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  multiple: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  restaurant_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'restaurants',
      key: 'id'
    }
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  // 브랜드메뉴 미러 동기화 버전 (DB 엔 있었으나 모델에 없어 Sequelize 가 저장 시 버려서
  // 버전 추적이 깨지고 옵션 재동기화가 안 되던 버그 — BG 옵션 전파 문제). brand_menu_option_group_id
  // 는 index.js belongsTo FK 로 자동 추가됨.
  brand_menu_synced_version: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  tableName: 'option_groups',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

// Define association
OptionGroup.associate = (models) => {
  OptionGroup.hasMany(models.Option, {
    foreignKey: 'option_group_id',
    as: 'options'
  });
};

module.exports = OptionGroup;

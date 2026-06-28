const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Option = sequelize.define('Option', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  option_group_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'option_groups',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00
  },
  displayOrder: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  // 2026-06-28 (2-1): 옵션 품절(sold-out). 상품 soldOut(Product.soldOut)과 동일 개념 —
  // 운영 자율(직원 토글 허용), is_active(메뉴 노출)와 별개. 품절이면 주문화면에서 선택 불가.
  sold_out: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  tableName: 'options',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

// Define association
Option.associate = (models) => {
  Option.belongsTo(models.OptionGroup, {
    foreignKey: 'option_group_id',
    as: 'optionGroup'
  });
};

module.exports = Option;

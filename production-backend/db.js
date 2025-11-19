const { sequelize } = require('./config/database');

// models/index.js에서 모든 모델과 연관관계를 가져옴
const {
  User,
  Restaurant,
  Order,
  Product,
  Category,
  Invoice,
  InvoiceItem,
  InvoiceSettings,
  PlanTemplate,
  SupportTicket,
  OperationTicket,
  OptionGroup,
  Option,
  RestaurantManager,
  Customer,
  RestaurantCustomer
} = require('./models/index');

// models/index.js에서 이미 모든 연관관계가 설정되어 있음

// 데이터베이스 동기화
const syncDatabase = async () => {
  try {
    // alter: false로 설정하여 기존 테이블 구조를 변경하지 않음 (중복 인덱스 방지)
    // 스키마 변경이 필요한 경우 별도의 마이그레이션 스크립트 사용
    await sequelize.sync({ alter: false });
    console.log('✅ 모든 모델이 동기화되었습니다.');
  } catch (error) {
    console.error('❌ 데이터베이스 동기화 실패:', error);
    throw error;
  }
};

module.exports = {
  sequelize,
  User,
  Restaurant,
  Order,
  Product,
  Category,
  Invoice,
  InvoiceItem,
  InvoiceSettings,
  PlanTemplate,
  SupportTicket,
  OperationTicket,
  OptionGroup,
  Option,
  RestaurantManager,
  Customer,
  RestaurantCustomer,
  syncDatabase
};
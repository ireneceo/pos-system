const { QueryInterface, DataTypes } = require('sequelize');
const database = require('./config/database');

async function addInvoiceCategoryFields() {
  const queryInterface = database.sequelize.getQueryInterface();

  try {
    console.log('인보이스 테이블에 카테고리 필드 추가 중...');

    // invoice_category 필드 추가 (subscription, service, consulting, others)
    await queryInterface.addColumn('invoices', 'invoice_category', {
      type: DataTypes.ENUM('subscription', 'service', 'consulting', 'others'),
      defaultValue: 'subscription',
      comment: 'Invoice category type'
    });
    console.log('✅ invoice_category 필드 추가 완료');

    // custom_description 필드 추가 (others 선택시 사용)
    await queryInterface.addColumn('invoices', 'custom_description', {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: 'Custom description for others category'
    });
    console.log('✅ custom_description 필드 추가 완료');

    // service_description 필드 추가 (서비스/컨설팅 상세 설명)
    await queryInterface.addColumn('invoices', 'service_description', {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'Detailed service or consulting description'
    });
    console.log('✅ service_description 필드 추가 완료');

    console.log('✅ 모든 카테고리 필드 추가 완료!');

  } catch (error) {
    console.error('❌ 에러 발생:', error);
  } finally {
    await database.sequelize.close();
  }
}

addInvoiceCategoryFields();
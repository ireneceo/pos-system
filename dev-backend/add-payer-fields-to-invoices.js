const { QueryInterface, DataTypes } = require('sequelize');
const database = require('./config/database');

async function addPayerFieldsToInvoices() {
  const queryInterface = database.sequelize.getQueryInterface();

  try {
    console.log('인보이스 테이블에 결제 주체 필드 추가 중...');

    // payer_type 필드 추가
    await queryInterface.addColumn('invoices', 'payer_type', {
      type: DataTypes.ENUM('restaurant', 'foodcourt_manager', 'brand_manager'),
      defaultValue: 'restaurant',
      comment: 'Who is responsible for payment'
    });
    console.log('✓ payer_type 필드 추가 완료');

    // payer_id 필드 추가
    await queryInterface.addColumn('invoices', 'payer_id', {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: 'ID of the payer (manager_id if payer_type is manager)'
    });
    console.log('✓ payer_id 필드 추가 완료');

    console.log('✓ 모든 필드 추가 완료!');

  } catch (error) {
    console.error('✗ 에러 발생:', error);
  } finally {
    await database.sequelize.close();
  }
}

addPayerFieldsToInvoices();
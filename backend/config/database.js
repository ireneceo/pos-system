const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('pos_orderhere_db', 'pos_admin', 'DG$Rvvdxw04^4zsp', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',
  logging: console.log,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ MySQL 데이터베이스 연결 성공!');
  } catch (error) {
    console.error('❌ MySQL 연결 실패:', error);
  }
};

module.exports = {
  sequelize,
  testConnection
};

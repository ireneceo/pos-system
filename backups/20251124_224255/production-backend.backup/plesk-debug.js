// Plesk 서버 전용 디버그 스크립트
const { getDatabaseConfig } = require('./config/database');

// 강제로 환경 설정
process.env.DOMAIN = 'pos.orderhere.center';

console.log('🔍 Plesk 서버 DB 설정 디버그');
console.log('=====================================');

// database.js의 설정 함수 복사
const getDatabaseConfigDebug = () => {
  const hostname = process.env.HOSTNAME || '';

  console.log(`Hostname: "${hostname}"`);
  console.log(`DOMAIN: "${process.env.DOMAIN}"`);
  console.log(`CODESPACE_NAME: "${process.env.CODESPACE_NAME}"`);

  // GitHub Codespace 환경 (개발환경)
  if (hostname.includes('codespace') || process.env.CODESPACE_NAME) {
    console.log('📍 환경: GitHub Codespace (개발환경)');
    return {
      host: process.env.DB_HOST || '49.247.215.102',
      port: process.env.DB_PORT || 3306,
      database: process.env.DB_NAME || 'pos_orderhere_center_db',
      username: process.env.DB_USER || 'pos_order_admin',
      password: process.env.DB_PASSWORD || '1Bh76aj~8',
      nodeEnv: 'development'
    };
  }

  // pos.orderhere.center (개발서버)
  if (hostname.includes('pos.orderhere.center') || process.env.DOMAIN === 'pos.orderhere.center') {
    console.log('📍 환경: pos.orderhere.center (개발서버)');
    return {
      host: '49.247.215.102',  // 실제 MySQL 서버 IP
      port: 3306,
      database: 'pos_orderhere_center_db',
      username: 'pos_order_admin',
      password: '1Bh76aj~8',
      nodeEnv: 'development'
    };
  }

  console.log('📍 환경: 기본 설정');
  return {
    host: '49.247.215.102',  // 기본값도 외부 서버로
    port: 3306,
    database: 'pos_orderhere_center_db',
    username: 'pos_order_admin',
    password: '1Bh76aj~8',
    nodeEnv: 'development'
  };
};

const config = getDatabaseConfigDebug();
console.log('\n최종 DB 설정:');
console.log(`Host: ${config.host}`);
console.log(`Database: ${config.database}`);
console.log(`Username: ${config.username}`);

// 실제 연결 테스트
const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: config.host,
  user: config.username,
  password: config.password,
  database: config.database,
  port: config.port
});

connection.connect((err) => {
  if (err) {
    console.log(`\n❌ 연결 실패: ${err.message}`);
  } else {
    console.log('\n✅ 연결 성공!');

    connection.query('SELECT COUNT(*) as count FROM users', (err, results) => {
      if (!err) {
        console.log(`Users 테이블: ${results[0].count}개 레코드`);
      }
      connection.end();
    });
  }
});
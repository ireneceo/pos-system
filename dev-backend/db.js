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
    console.log('✓ 모든 모델이 동기화되었습니다.');

    // sync({alter:false}) 도 일부 Sequelize 버전에서 unique 인덱스를 누적 추가하므로
    // 매 startup 후 중복 (`username_2`/`email_3`/...) 을 일괄 정리. 64-key 한도 방지.
    await purgeDuplicateIndexes();
  } catch (error) {
    console.error('✗ 데이터베이스 동기화 실패:', error);
    throw error;
  }
};

async function purgeDuplicateIndexes() {
  try {
    const [rows] = await sequelize.query(`
      SELECT TABLE_NAME, INDEX_NAME, NON_UNIQUE,
             GROUP_CONCAT(COLUMN_NAME ORDER BY SEQ_IN_INDEX) AS cols
      FROM information_schema.STATISTICS
      WHERE TABLE_SCHEMA = DATABASE() AND INDEX_NAME <> 'PRIMARY'
      GROUP BY TABLE_NAME, INDEX_NAME, NON_UNIQUE
    `);
    const groups = new Map();
    for (const r of rows) {
      const key = `${r.TABLE_NAME}::${r.cols}::${r.NON_UNIQUE}`;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(r);
    }
    const dropsByTable = {};
    for (const indexes of groups.values()) {
      if (indexes.length <= 1) continue;
      indexes.sort((a, b) => {
        const aN = /_\d+$/.test(a.INDEX_NAME);
        const bN = /_\d+$/.test(b.INDEX_NAME);
        if (aN !== bN) return aN ? 1 : -1;
        return a.INDEX_NAME.length - b.INDEX_NAME.length;
      });
      const [, ...dupes] = indexes;
      for (const d of dupes) {
        if (!dropsByTable[d.TABLE_NAME]) dropsByTable[d.TABLE_NAME] = [];
        dropsByTable[d.TABLE_NAME].push(d.INDEX_NAME);
      }
    }
    if (Object.keys(dropsByTable).length === 0) return;
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    let total = 0;
    for (const [table, indexes] of Object.entries(dropsByTable)) {
      const clauses = indexes.map(i => `DROP INDEX \`${i}\``).join(', ');
      try {
        await sequelize.query(`ALTER TABLE \`${table}\` ${clauses}`);
        total += indexes.length;
      } catch (_) { /* 개별 실패는 무시 */ }
    }
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    if (total > 0) console.log(`✓ 중복 인덱스 ${total}개 자동 정리`);
  } catch (e) {
    console.warn('⚠️ 중복 인덱스 정리 스킵:', e.message);
  }
}

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
/**
 * Sequelize 모델 → DB 스키마 동기화.
 *
 * Sequelize `alter:true` 는 매 실행마다 중복 unique index (`username_2`,
 * `username_3`, ...) 를 누적해서 결국 MySQL max 64 keys 한도를 터뜨린다.
 * 그래서 기본은 alter:false 안전 모드로 동작하고, --alter 플래그로 명시
 * 적용 후에는 즉시 cleanup-duplicate-indexes 를 돌려 중복을 정리한다.
 *
 * 사용:
 *   node sync-database.js           # 안전 모드 — 모델 로드만 검증
 *   node sync-database.js --alter   # ALTER 실행 + 중복 인덱스 자동 정리
 */

const path = require('path');
const fs = require('fs');
const { sequelize } = require('./config/database');

const APPLY_ALTER = process.argv.includes('--alter');

async function cleanupDuplicateIndexes() {
  const [rows] = await sequelize.query(`
    SELECT TABLE_NAME, INDEX_NAME, NON_UNIQUE,
           GROUP_CONCAT(COLUMN_NAME ORDER BY SEQ_IN_INDEX) AS cols
    FROM information_schema.STATISTICS
    WHERE TABLE_SCHEMA = DATABASE() AND INDEX_NAME <> 'PRIMARY'
    GROUP BY TABLE_NAME, INDEX_NAME, NON_UNIQUE
  `);

  const groups = new Map();
  for (const row of rows) {
    const key = `${row.TABLE_NAME}::${row.cols}::${row.NON_UNIQUE}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(row);
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
    for (const dup of dupes) {
      if (!dropsByTable[dup.TABLE_NAME]) dropsByTable[dup.TABLE_NAME] = [];
      dropsByTable[dup.TABLE_NAME].push(dup.INDEX_NAME);
    }
  }

  if (Object.keys(dropsByTable).length === 0) {
    console.log('✓ 중복 인덱스 없음');
    return 0;
  }

  await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
  let total = 0;
  for (const [table, indexes] of Object.entries(dropsByTable)) {
    const clauses = indexes.map(i => `DROP INDEX \`${i}\``).join(', ');
    try {
      await sequelize.query(`ALTER TABLE \`${table}\` ${clauses}`);
      total += indexes.length;
      console.log(`   -${indexes.length} ${table}`);
    } catch (err) {
      console.warn(`   ✗ ${table}: ${err.message.substring(0, 80)}`);
    }
  }
  await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
  console.log(`✓ 중복 인덱스 ${total}개 정리`);
  return total;
}

async function syncDatabase() {
  try {
    await sequelize.authenticate();
    console.log('✓ Database connection established successfully.');

    const modelsDir = path.join(__dirname, 'models');
    const modelFiles = fs.readdirSync(modelsDir)
      .filter(f => f.endsWith('.js') && f !== 'index.js');

    const models = {};
    for (const file of modelFiles) {
      const model = require(path.join(modelsDir, file));
      if (model && model.name) {
        models[model.name] = model;
      }
    }
    console.log(`✓ ${Object.keys(models).length} models loaded`);

    if (!APPLY_ALTER) {
      console.log('\n안전 모드 — 모델 로드만 검증 (스키마 변경 없음).');
      console.log('실제 ALTER 가 필요하면: node sync-database.js --alter');
      return process.exit(0);
    }

    console.log('\n⚠️  ALTER 모드 — 컬럼/인덱스를 동기화합니다.');
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');

    const failed = [];
    const succeeded = [];
    for (const [name, model] of Object.entries(models)) {
      try {
        await model.sync({ alter: true });
        succeeded.push(name);
      } catch (err) {
        failed.push({ name, error: err.message });
        console.warn(`⚠️  ${name}: ${err.message.substring(0, 120)}`);
      }
    }
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

    console.log(`\n✓ ${succeeded.length} models synchronized.`);
    if (failed.length > 0) {
      console.log(`⚠️  ${failed.length} models 실패 (수동 마이그레이션 필요)`);
    }

    console.log('\n🧹 중복 인덱스 자동 정리...');
    await cleanupDuplicateIndexes();

    process.exit(failed.length > 0 ? 2 : 0);
  } catch (error) {
    console.error('✗ Unable to sync database:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  syncDatabase();
}

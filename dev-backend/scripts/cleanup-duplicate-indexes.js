/**
 * Sequelize sync({alter:true}) 가 매 재시작마다 추가하는 중복 unique index 청소.
 *
 * 패턴: `username`, `username_2`, ..., `username_N` (모두 동일 컬럼/uniqueness)
 *   → canonical 1개 유지, `_N` 들은 DROP.
 *
 * 사용:
 *   node scripts/cleanup-duplicate-indexes.js          # dry-run
 *   node scripts/cleanup-duplicate-indexes.js --apply  # 실제 실행
 */

const { sequelize } = require('../config/database');

const DRY_RUN = !process.argv.includes('--apply');

async function main() {
  await sequelize.authenticate();
  console.log(DRY_RUN ? '🔍 DRY RUN' : '✏️  APPLY MODE');

  // 모든 인덱스 조회 (PRIMARY 제외)
  const [rows] = await sequelize.query(`
    SELECT
      TABLE_NAME,
      INDEX_NAME,
      NON_UNIQUE,
      GROUP_CONCAT(COLUMN_NAME ORDER BY SEQ_IN_INDEX) AS cols
    FROM information_schema.STATISTICS
    WHERE TABLE_SCHEMA = DATABASE()
      AND INDEX_NAME <> 'PRIMARY'
    GROUP BY TABLE_NAME, INDEX_NAME, NON_UNIQUE
    ORDER BY TABLE_NAME, INDEX_NAME
  `);

  // 같은 (table, cols, NON_UNIQUE) 조합을 그룹화
  const groups = new Map(); // key → indexes[]
  for (const row of rows) {
    const key = `${row.TABLE_NAME}::${row.cols}::${row.NON_UNIQUE}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(row);
  }

  const drops = [];
  for (const [key, indexes] of groups) {
    if (indexes.length <= 1) continue;

    // canonical 선택: `_N` 접미사 없는 가장 짧은 이름 우선
    indexes.sort((a, b) => {
      const aN = /_\d+$/.test(a.INDEX_NAME);
      const bN = /_\d+$/.test(b.INDEX_NAME);
      if (aN !== bN) return aN ? 1 : -1;
      return a.INDEX_NAME.length - b.INDEX_NAME.length;
    });

    const [keep, ...dupes] = indexes;
    for (const dup of dupes) {
      drops.push({ table: dup.TABLE_NAME, index: dup.INDEX_NAME, cols: dup.cols, keep: keep.INDEX_NAME });
    }
  }

  // 테이블별 요약
  const byTable = {};
  for (const d of drops) {
    byTable[d.table] = (byTable[d.table] || 0) + 1;
  }
  console.log('\n📊 테이블별 중복 인덱스:');
  for (const [t, n] of Object.entries(byTable).sort((a, b) => b[1] - a[1])) {
    console.log(`   ${t.padEnd(30)} ${n} 개`);
  }
  console.log(`\n총 ${drops.length} 개 인덱스 DROP 예정`);

  if (DRY_RUN) {
    console.log('\n--apply 플래그로 다시 실행하여 적용하세요.');
    return process.exit(0);
  }

  // 실행 — 테이블별로 한 번에 ALTER (DROP INDEX 여러 개 한꺼번에)
  const dropsByTable = {};
  for (const d of drops) {
    if (!dropsByTable[d.table]) dropsByTable[d.table] = [];
    dropsByTable[d.table].push(d.index);
  }

  await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
  let success = 0;
  let failed = 0;
  for (const [table, indexes] of Object.entries(dropsByTable)) {
    const dropClauses = indexes.map(i => `DROP INDEX \`${i}\``).join(', ');
    const sql = `ALTER TABLE \`${table}\` ${dropClauses}`;
    try {
      await sequelize.query(sql);
      success += indexes.length;
      console.log(`✓ ${table}: -${indexes.length}`);
    } catch (err) {
      failed += indexes.length;
      console.error(`✗ ${table}: ${err.message.substring(0, 100)}`);
    }
  }
  await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

  console.log(`\n결과: 성공 ${success}, 실패 ${failed}`);
  process.exit(failed > 0 ? 1 : 0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

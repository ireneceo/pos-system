/**
 * ENUM 확장 단일 유틸 — expand-only.
 *
 * 원칙: **현재 정의를 읽어 부족한 값만 더한다. 목록 교체(MODIFY ... ENUM(하드코딩)) 금지.**
 *
 * 왜 이 파일이 생겼나 (2026-08-30 근본원인 확정):
 *   `purchase_orders.status` 의 'pending_approval' 이 3번의 배포에서 연속으로 사라졌다.
 *   `migrate-po-status-pending-approval.js` 는 매번 정상 실행돼 값을 넣고 자기검증까지 통과했는데,
 *   30초 뒤 같은 배포의 `sprint6-migration.js` 가 **9개짜리 하드코딩 목록으로 통째 교체**하면서
 *   그 값을 지웠다(레지스트리 실행 순서가 파일명 정렬이라 sprint6 이 뒤에 온다).
 *   `sprint7-migration.js` 도 같은 하드코딩이었고, 가드 덕에 발현만 안 했을 뿐 같은 지뢰였다.
 *   마이그·레지스트리·배포 루프는 전부 정상이었다 — 결함은 "목록 하드코딩" 하나였다.
 *
 * 그래서 ENUM 을 건드리는 마이그는 전부 이 함수를 쓴다. 새 마이그도 마찬가지.
 */

/**
 * ENUM 컬럼에 값을 **추가만** 한다. 기존 값·순서·NULL 허용·기본값을 보존한다.
 *
 * @param {import('sequelize').Sequelize} sequelize
 * @param {string} table
 * @param {string} column
 * @param {string[]} ensureValues  이 값들이 있어야 한다(이미 있으면 건너뜀)
 * @returns {Promise<{added: string[], current: string[]}>}
 */
async function expandEnum(sequelize, table, column, ensureValues) {
  const read = async () => {
    const [rows] = await sequelize.query(
      `SELECT COLUMN_TYPE t, IS_NULLABLE n, COLUMN_DEFAULT d
         FROM information_schema.COLUMNS
        WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = :t AND COLUMN_NAME = :c`,
      { replacements: { t: table, c: column } }
    );
    if (!rows.length) throw new Error(`${table}.${column} not found`);
    const inner = String(rows[0].t).replace(/^enum\(/i, '').replace(/\)$/, '');
    // MySQL 은 ENUM 안의 홑따옴표를 '' 로 이스케이프한다
    const values = inner.split(',').map(v =>
      v.trim().replace(/^'/, '').replace(/'$/, '').replace(/''/g, "'"));
    return { values, nullable: rows[0].n === 'YES', dflt: rows[0].d };
  };

  const before = await read();
  const missing = ensureValues.filter(v => !before.values.includes(v));
  if (!missing.length) return { added: [], current: before.values };

  const next = [...before.values, ...missing];
  const list = next.map(v => `'${String(v).replace(/'/g, "''")}'`).join(',');
  const nullClause = before.nullable ? 'NULL' : 'NOT NULL';
  const dfltClause = before.dflt == null
    ? '' : ` DEFAULT '${String(before.dflt).replace(/'/g, "''")}'`;

  await sequelize.query(
    `ALTER TABLE \`${table}\` MODIFY COLUMN \`${column}\` ENUM(${list}) ${nullClause}${dfltClause}`
  );

  // 추가만 했는지 증명 — 하나라도 사라졌으면 즉시 실패시킨다(조용한 소거 금지)
  const after = await read();
  const lost = before.values.filter(v => !after.values.includes(v));
  if (lost.length) throw new Error(`ENUM values lost on ${table}.${column}: ${lost.join(', ')}`);
  const stillMissing = ensureValues.filter(v => !after.values.includes(v));
  if (stillMissing.length) {
    throw new Error(`ALTER ran but ${table}.${column} still missing: ${stillMissing.join(', ')}`);
  }
  return { added: missing, current: after.values };
}

module.exports = { expandEnum };

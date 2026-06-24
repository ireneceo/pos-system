// 2026-06-24 (Irene "SERVER1 인데 r16:server1 로 보임"): 기존 데이터의 cashier_name 에 박힌
// 매장 네임스페이스 prefix(`r{rid}:`)를 1회 제거한다. 신규는 AuthContext(프론트)·orders-payment/
// cash-management(백엔드 폴백)에서 이미 깨끗하게 저장되므로, 이건 과거 행만 정리.
// 인쇄 코드(billPrint.js 등)는 건드리지 않고 "데이터"를 정리해 영수증/Z리포트도 깨끗해진다.
// 멱등: 이미 깎인 값은 WHERE 조건(^r{digits}:)에 안 걸려 재실행 안전.
const { sequelize } = require('../config/database');

const TARGETS = [
  { table: 'orders',         col: 'cashier_name' },
  { table: 'order_payments', col: 'cashier_name' },
  { table: 'cashier_shifts', col: 'cashier_name' },
];

(async () => {
  let total = 0;
  for (const { table, col } of TARGETS) {
    try {
      const [before] = await sequelize.query(
        `SELECT COUNT(*) c FROM ${table} WHERE ${col} REGEXP '^r[0-9]+:'`
      );
      const n = before[0].c;
      if (n > 0) {
        // SUBSTRING(... LOCATE(':')+1): r{digits}: 패턴의 첫 콜론까지 잘라낸다 (REGEXP_REPLACE 미사용 = 5.7 호환).
        await sequelize.query(
          `UPDATE ${table}
             SET ${col} = SUBSTRING(${col}, LOCATE(':', ${col}) + 1)
           WHERE ${col} REGEXP '^r[0-9]+:'`
        );
      }
      const [after] = await sequelize.query(
        `SELECT COUNT(*) c FROM ${table} WHERE ${col} REGEXP '^r[0-9]+:'`
      );
      console.log(`  ${table}.${col}: stripped ${n} rows (remaining prefixed: ${after[0].c})`);
      total += n;
    } catch (e) {
      console.log(`  ${table}.${col}: SKIP (${e.message})`);
    }
  }
  console.log(`DONE — total ${total} rows cleaned.`);
  await sequelize.close();
  process.exit(0); // 배포 SSH 가 종료를 기다리며 멈추지 않도록 명시적 exit (sequelize 핸들 잔류 방지)
})().catch((e) => { console.error('migrate-strip-cashier-namespace error:', e.message); process.exit(1); });

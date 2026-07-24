/**
 * 2026-07-24 — pending-print 신선도 경계 기준 교정: orders.print_needed_at 신설.
 *
 * 왜:
 *   2026-07-23 도입한 신선도 경계(24h)가 주문의 createdAt 을 기준으로 판정해서, 24h 넘게 열려 있던
 *   주문에 +Round(품목 추가/머지)를 하면 needs_print 가 "지금" 켜지는데도 창에서 탈락 →
 *   그 라운드 주방티켓이 무음으로 유실됐다(25h 주문 add-items 실호출로 실증).
 *   판정해야 할 대상은 "주문이 태어난 시각"이 아니라 "인쇄 필요가 발생한 시각"이다.
 *
 * 설계:
 *   창 판정 = COALESCE(print_needed_at, createdAt) >= now-24h.
 *   기존 행은 NULL → createdAt 폴백 = 2026-07-23 동작과 비트 단위로 동일. **백필하지 않는 것이 설계다**
 *   (createdAt 백필은 폴백과 결과가 같고, 마이그↔코드 배포 사이에 생성된 NULL 행이 탈락하는 갭만 만든다.
 *    COALESCE 가 그 갭까지 봉인한다).
 *
 * 멱등: 컬럼이 이미 있으면 스킵. 매 배포 재실행 안전(registry deploy).
 */
require('dotenv').config();
const { sequelize } = require('../config/database');

async function run() {
  await sequelize.authenticate();
  const [col] = await sequelize.query("SHOW COLUMNS FROM orders LIKE 'print_needed_at'");
  if (col.length) {
    console.log('✓ print_needed_at 컬럼 이미 있음 — 스킵. migrated');
    await sequelize.close();
    process.exit(0);
  }
  await sequelize.query(
    'ALTER TABLE orders ADD COLUMN print_needed_at DATETIME NULL DEFAULT NULL AFTER print_claimed_at'
  );
  console.log('✓ migrate-print-needed-at complete: orders.print_needed_at 추가 (백필 없음 = 설계). migrated');
  await sequelize.close();
  process.exit(0);
}

run().catch(e => { console.error('마이그레이션 실패:', e.message); process.exit(1); });

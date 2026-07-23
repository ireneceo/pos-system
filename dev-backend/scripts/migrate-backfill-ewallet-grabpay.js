/**
 * Backfill: 기존 이월렛 주문의 ewallet_type 을 'grabpay' 로 채운다 (Irene 지시 2026-07-23).
 *
 * 배경:
 *   ewallet_type 컬럼 신설(migrate-add-ewallet-type) 전의 이월렛 결제는 하위종류가 없다(NULL).
 *   Irene 지시로 이 기존분을 모두 'grabpay' 로 채운다(매장 이월렛 기본값). 신규 주문은 POS 가
 *   설정(acceptedTypes)에 따라 태깅하므로 이 백필은 과거 NULL 분만 대상.
 *
 * 안전/멱등:
 *   - `payment_method='ewallet' AND ewallet_type IS NULL` 만 UPDATE → 이미 태깅된 건(tng 등) 무접촉.
 *   - 여러 번 돌려도 NULL 만 잡으므로 이중 태깅 없음(멱등). 단 신규 NULL 이 생기면 재실행 시 grabpay 로
 *     바뀌므로 **manual(일회성)** 로 등록 — 매 배포 재실행 금지.
 *   - orders + order_payments 양쪽. process.exit 필수.
 *   - 전제: ewallet_type 컬럼 존재(migrate-add-ewallet-type 선행). 없으면 안내 후 종료.
 *
 * 사용: node scripts/migrate-backfill-ewallet-grabpay.js
 */
require('dotenv').config();
const { sequelize } = require('../config/database');

(async () => {
  try {
    console.log('[backfill-ewallet-grabpay] Starting...');
    for (const table of ['orders', 'order_payments']) {
      const [cols] = await sequelize.query(`SHOW COLUMNS FROM ${table} LIKE 'ewallet_type'`);
      if (cols.length === 0) {
        console.log(`  ⚠ ${table}.ewallet_type 컬럼 없음 — migrate-add-ewallet-type 를 먼저 실행하세요. 중단.`);
        process.exit(1);
      }
      const [r] = await sequelize.query(
        `UPDATE ${table} SET ewallet_type = 'grabpay' WHERE payment_method = 'ewallet' AND ewallet_type IS NULL`
      );
      console.log(`  ✓ ${table}: ${r.affectedRows} 건 → grabpay`);
    }
    process.exit(0);
  } catch (e) {
    console.error('  ✗ Backfill failed:', e.message);
    process.exit(1);
  }
})();

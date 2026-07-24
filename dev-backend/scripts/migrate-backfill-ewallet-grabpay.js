/**
 * ⛔⛔ 미실행 확정 — 운영에서 실행하지 말 것 (2026-07-24 Fable 판정, Irene 위임 결정).
 *
 *   되살리려면 Irene 명시 지시가 필요하다. 실행하지 않기로 한 이유:
 *   1) ewallet_type 을 읽는 코드는 services/mallSalesService.js 의 addToBucket() 한 곳뿐이고,
 *      몰 스펙의 이월렛 필드는 tng 하나라 NULL 도 grabpay 도 똑같이 othersamount 로 간다
 *      → 이 백필은 어떤 화면·보고서 출력도 바꾸지 않는 기능적 no-op.
 *   2) 몰 보고는 최근 7일 롤링 upsert 로 과거를 소급 전송하지 않는다. rid=16(The Fire IOI)은
 *      최근 7일 이월렛 주문 0건(마지막 2026-06-30) → 몰이 볼 수 있는 창 안에 대상 행이 없다.
 *   3) 운영 영향 12,906건 중 97.3%(rid=8 K-DINE 12,556)가 몰과 무관한 매장이고, 어느 매장도
 *      설정·card_type 어디에도 서브타입 단서가 없다 → 전량 grabpay 스탬프는 사실관계상 오태깅.
 *      NULL(= 서브타입 미기록)이 이 행들의 정직하고 올바른 값이다.
 *   4) 전 매장 acceptedTypes 미설정이라 신규 이월렛도 계속 NULL 로 쌓인다 → 이 스크립트가 살아
 *      있으면 나중에 재실행 시 "진짜 미상"인 신규 행까지 grabpay 로 덮는 footgun.
 *
 *   TnG 분리라는 원래 목적의 실효 경로 = rid=16 설정에 payment_settings.ewallet.acceptedTypes
 *   등록 → 그 시점 이후 신규 주문부터 POS 가 태깅 → 몰 tng 버킷 분리. 과거분은 백필해도 결과 동일.
 *
 * ---- 이하 원래 설계(참고용, Irene 지시 2026-07-23) ----
 * Backfill: 기존 이월렛 주문의 ewallet_type 을 'grabpay' 로 채운다.
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

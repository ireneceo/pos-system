/**
 * Migration: 데모 계정(`users.is_demo = 1`)의 `email_verified` 를 0 으로 되돌린다.
 *
 * 배경 (2026-09-06 실측, Irene 신고 "Address not found — demo-brand@purplehere.com"):
 *   `demo-brand@purplehere.com` 으로 알림이 계속 나가 Gmail 반송이 Irene 에게 반복 도착했다.
 *   발송 관문 자체는 멀쩡했다 — `notificationService.sendNotification` 도
 *   `emailService.screenRecipients` 도 `email_verified` 를 보고 막는다.
 *   **문제는 플래그가 거짓말을 한 것**이다: 이 계정은 메일함이 없어 인증 링크를 누를 수 없고
 *   인증 토큰 이력도 없는데 `email_verified = 1` 이 박혀 있었다(2026-06-01 인증 정책 이전 계정).
 *   데모 시드는 이 값을 세우지도 내리지도 않아, 한 번 들어온 거짓 1 이 영구히 살아남았다.
 *
 *   ⛔ 거짓 플래그 위에 "데모 계정 차단" 관문을 하나 더 얹는 방식은 기각됐다(증상 패치).
 *      기준은 하나다 — **인증 안 했으면 발송 안 한다**(Irene). 이 마이그는 그 기준이
 *      배신당하지 않도록 **데이터를 진실로 되돌린다**.
 *
 * 범위 (좁게 — 넓은 복원 금지):
 *   - `is_demo = 1` 인 계정만. DemoPage 전용 계정이라 실재하는 메일함이 있을 이유가 없고,
 *     `scripts/mark-demo-accounts.js` 가 매 배포마다 그 플래그를 보증한다.
 *   - `is_test = 1` 계정과 정책 이전 실계정의 `verified = 1` 은 **건드리지 않는다** —
 *     실사용자가 섞여 있어 넓게 되돌리면 실사용자 알림이 끊긴다([[reference_real_customer_flag]]).
 *     `is_test` 계정은 발송 관문 1-a2 가 이미 막고 있어 메일 관점에선 무의미하기도 하다.
 *
 * 안전:
 *   - 멱등: 이미 0 이면 UPDATE 대상이 아니다. 재배포마다 재실행돼도 2회차부터 0건.
 *   - 미인증이어도 **로그인은 된다**(백엔드에 EMAIL_NOT_VERIFIED 를 던지는 코드 없음)
 *     → 데모 로그인은 깨지지 않는다.
 *   - 인쇄/주문/KDS 무관. 스키마 변경 없음(행 값 1개 컬럼만).
 *   - process.exit 필수([[reference_deploy_migration_must_exit]]).
 *
 * 사용: node scripts/migrate-demo-accounts-unverified.js
 */
require('dotenv').config();
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');

(async () => {
  try {
    console.log('[demo-unverified] 데모 계정 email_verified 진실화 시작');

    const before = await sequelize.query(
      `SELECT id, email, role FROM users
        WHERE is_demo = 1 AND email_verified = 1
        ORDER BY id`,
      { type: QueryTypes.SELECT }
    );

    if (before.length === 0) {
      console.log('  ✓ 대상 0건 — 이미 전부 미인증(멱등 skip)');
      process.exit(0);
    }

    console.log(`  대상 ${before.length}건:`);
    for (const u of before) console.log(`    - id=${u.id} ${u.email} (${u.role})`);

    await sequelize.query(
      `UPDATE users SET email_verified = 0 WHERE is_demo = 1 AND email_verified = 1`
    );

    // 증명 — 적용 뒤 남은 것이 0 이어야 한다.
    const after = await sequelize.query(
      `SELECT COUNT(*) AS n FROM users WHERE is_demo = 1 AND email_verified = 1`,
      { type: QueryTypes.SELECT }
    );
    const left = Number(after[0]?.n || 0);
    if (left !== 0) throw new Error(`UPDATE 후에도 is_demo=1 AND email_verified=1 이 ${left}건 남음`);

    console.log(`  ✓ ${before.length}건 미인증으로 되돌림 (남은 0건)`);
    process.exit(0);
  } catch (e) {
    console.error('  ✗ Migration failed:', e.message);
    process.exit(1);
  }
})();

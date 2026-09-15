#!/usr/bin/env node
/**
 * help@withmin.info → help@k-dine.com 일괄 교체 (2026-09-15 Irene 지시)
 *
 * 왜: withmin.info 도메인이 없어져 메일이 실제로 반송된다
 *     ("withmin.info 도메인을 찾지 못하여 … 전송하지 못했습니다").
 *
 * 규율
 *   - 기본은 **미리보기**다. `--apply` 를 줘야 실제로 바꾼다.
 *   - 바꾸기 전 대상 행을 JSON 으로 떠 둔다(되돌리기용).
 *   - **손대지 않는 칸**: `notification_settings.smtp_user` — 그건 메일 서버 로그인 계정이라
 *     비밀번호가 함께 맞지 않으면 발송이 통째로 멈춘다. 바꾸려면 `--include-smtp-user` 를 의식적으로 준다.
 *   - 손님이 남긴 주소(customers·reservations·contact_inquiries 등)는 **대상 아님** — 우리 주소만 바꾼다.
 *   - 멱등: 이미 바뀐 행은 0건으로 잡힌다. 여러 번 돌려도 같은 결과.
 */
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { sequelize } = require('../config/database');

const OLD = 'help@withmin.info';
const NEW = 'help@k-dine.com';

// [표, 칸] — **우리 쪽 주소만**. 손님이 남긴 주소는 넣지 않는다.
const TARGETS = [
  ['users', 'email'],
  ['restaurants', 'email'],
  ['restaurants', 'legal_email'],
  ['brands', 'email'],
  ['foodcourts', 'email'],
  ['foodcourt_branches', 'email'],
  ['company_settings', 'email'],
  ['supplier_companies', 'email'],
  ['suppliers', 'email'],
  ['notification_settings', 'from_email'],
  ['notification_settings', 'reply_to_email'],
];
const SMTP_TARGET = ['notification_settings', 'smtp_user'];

(async () => {
  const apply = process.argv.includes('--apply');
  const includeSmtp = process.argv.includes('--include-smtp-user');
  const targets = includeSmtp ? [...TARGETS, SMTP_TARGET] : TARGETS;

  const q = async (sql, replacements) =>
    await sequelize.query(sql, { replacements, type: sequelize.QueryTypes.SELECT });

  const snapshot = {};
  let total = 0;
  for (const [table, col] of targets) {
    let rows;
    try {
      rows = await q(`SELECT id, \`${col}\` AS val FROM \`${table}\` WHERE \`${col}\` = :old`, { old: OLD });
    } catch (e) {
      console.log(`  (건너뜀) ${table}.${col} — ${e.message.split('\n')[0]}`);
      continue;
    }
    if (rows.length) {
      snapshot[`${table}.${col}`] = rows;
      total += rows.length;
    }
    console.log(`  ${table}.${col}: ${rows.length}건`);
  }

  console.log(`\n대상 합계: ${total}건  (${OLD} → ${NEW})`);
  if (!includeSmtp) {
    const smtp = await q(
      `SELECT COUNT(*) n FROM \`${SMTP_TARGET[0]}\` WHERE \`${SMTP_TARGET[1]}\` = :old`, { old: OLD }
    ).catch(() => [{ n: 0 }]);
    if (Number(smtp[0].n) > 0) {
      console.log(`⚠ notification_settings.smtp_user 에도 ${smtp[0].n}건 있습니다 — 메일 서버 로그인 계정이라 건드리지 않았습니다.`);
      console.log('   함께 바꾸려면 --include-smtp-user (비밀번호도 새 계정 것으로 맞춰져 있어야 합니다).');
    }
  }

  if (!apply) {
    console.log('\n미리보기입니다. 실제로 바꾸려면 --apply 를 주세요.');
    process.exit(0);
  }
  if (total === 0) {
    console.log('바꿀 것이 없습니다(이미 적용됨).');
    process.exit(0);
  }

  const dir = path.join(__dirname, '..', 'backups');
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, `email-replace-${Date.now()}.json`);
  fs.writeFileSync(file, JSON.stringify({ old: OLD, new: NEW, rows: snapshot }, null, 2));
  console.log(`되돌리기용 스냅샷: ${file}`);

  const t = await sequelize.transaction();
  try {
    for (const [table, col] of targets) {
      const [, meta] = await sequelize.query(
        `UPDATE \`${table}\` SET \`${col}\` = :neu WHERE \`${col}\` = :old`,
        { replacements: { neu: NEW, old: OLD }, transaction: t }
      );
      if (meta && meta.affectedRows) console.log(`  ✓ ${table}.${col}: ${meta.affectedRows}건`);
    }
    // 새 주소를 쓰는 계정은 **인증받은 것으로** 처리 (2026-09-15 Irene 「인증받은 걸로 처리해주고」)
    const [, vm] = await sequelize.query(
      `UPDATE users SET email_verified = 1, email_verification_token = NULL WHERE email = :neu`,
      { replacements: { neu: NEW }, transaction: t }
    );
    if (vm && vm.affectedRows) console.log(`  ✓ users.email_verified: ${vm.affectedRows}건 인증 처리`);
    await t.commit();
  } catch (e) {
    await t.rollback();
    console.error('실패 — 아무것도 바꾸지 않았습니다:', e.message);
    process.exit(1);
  }

  // 재조회로 증명
  let left = 0;
  for (const [table, col] of targets) {
    const r = await q(`SELECT COUNT(*) n FROM \`${table}\` WHERE \`${col}\` = :old`, { old: OLD }).catch(() => [{ n: 0 }]);
    left += Number(r[0].n);
  }
  console.log(`\n남은 ${OLD}: ${left}건 (0 이어야 정상)`);
  process.exit(left === 0 ? 0 : 1);
})().catch((e) => { console.error('ERR', e.message); process.exit(1); });

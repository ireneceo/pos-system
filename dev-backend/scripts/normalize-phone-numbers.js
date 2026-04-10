/**
 * 전화번호 정규화 스크립트
 *
 * 목표 형식: +[국가코드][숫자] (예: +60123456789)
 * - 하이픈, 공백, 괄호 제거
 * - 국가코드 없으면 말레이시아(+60) 기본 적용
 * - 한국 번호(010, 02 등)는 +82로 변환
 */

const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false
  }
);

/**
 * 전화번호를 정규화된 국제 형식으로 변환
 * @param {string} phone - 원본 전화번호
 * @returns {string} - 정규화된 전화번호
 */
function normalizePhone(phone) {
  if (!phone || phone.trim() === '') return null;

  // 숫자와 + 기호만 남김
  let cleaned = phone.replace(/[^0-9+]/g, '');

  // 이미 + 로 시작하면 하이픈만 제거된 상태로 반환
  if (cleaned.startsWith('+')) {
    return cleaned;
  }

  // 말레이시아 휴대폰 번호 패턴 (01로 시작, 9-10자리)
  // 010, 011, 012, 013, 014, 015, 016, 017, 018, 019
  // 말레이시아 휴대폰은 총 9-10자리 (0 포함)
  if (/^01[0-9]/.test(cleaned) && cleaned.length >= 9 && cleaned.length <= 11) {
    return '+60' + cleaned.substring(1); // 앞의 0 제거하고 +60 추가
  }

  // 말레이시아 유선전화 (03, 04, 05, 06, 07, 08, 09로 시작)
  if (/^0[3-9]/.test(cleaned) && cleaned.length >= 9 && cleaned.length <= 11) {
    return '+60' + cleaned.substring(1);
  }

  // 한국 서울 지역번호 (02로 시작, 9-10자리)
  if (cleaned.startsWith('02') && cleaned.length >= 9 && cleaned.length <= 11) {
    return '+82' + cleaned.substring(1); // 앞의 0 제거
  }

  // 한국 기타 지역번호 (031~064로 시작)
  if (/^0[3-6][1-4]/.test(cleaned) && cleaned.length >= 10 && cleaned.length <= 12) {
    return '+82' + cleaned.substring(1);
  }

  // 그 외 0으로 시작하는 번호는 말레이시아로 가정
  if (cleaned.startsWith('0')) {
    return '+60' + cleaned.substring(1);
  }

  // 그 외 짧은 번호는 말레이시아로 가정
  if (cleaned.length >= 7 && cleaned.length <= 12) {
    return '+60' + cleaned;
  }

  // 기타 경우 그대로 반환 (수동 확인 필요)
  return cleaned.length > 0 ? '+' + cleaned : null;
}

/**
 * 전화번호를 사용자에게 보여줄 형식으로 포맷팅
 * @param {string} phone - 정규화된 전화번호 (+60123456789)
 * @returns {string} - 포맷팅된 전화번호 (+60 12-345 6789)
 */
function formatPhoneForDisplay(phone) {
  if (!phone) return '';

  // 말레이시아 (+60)
  if (phone.startsWith('+60')) {
    const local = phone.substring(3);
    if (local.length === 9 || local.length === 10) {
      // +60 12-345 6789 또는 +60 12-3456 7890
      const part1 = local.substring(0, 2);
      const part2 = local.substring(2, local.length - 4);
      const part3 = local.substring(local.length - 4);
      return `+60 ${part1}-${part2} ${part3}`;
    }
    return `+60 ${local}`;
  }

  // 한국 (+82)
  if (phone.startsWith('+82')) {
    const local = phone.substring(3);
    if (local.startsWith('10') && local.length === 10) {
      // +82 10-1234-5678
      return `+82 ${local.substring(0, 2)}-${local.substring(2, 6)}-${local.substring(6)}`;
    }
    if (local.startsWith('2') && local.length >= 9) {
      // 서울: +82 2-1234-5678
      return `+82 ${local.substring(0, 1)}-${local.substring(1, 5)}-${local.substring(5)}`;
    }
    return `+82 ${local}`;
  }

  // 싱가포르 (+65)
  if (phone.startsWith('+65')) {
    const local = phone.substring(3);
    if (local.length === 8) {
      return `+65 ${local.substring(0, 4)} ${local.substring(4)}`;
    }
    return `+65 ${local}`;
  }

  return phone;
}

async function updateTable(tableName, idColumn = 'id') {
  console.log(`\n📋 ${tableName} 테이블 처리 중...`);

  const [rows] = await sequelize.query(
    `SELECT ${idColumn}, phone FROM ${tableName} WHERE phone IS NOT NULL AND phone != ''`
  );

  console.log(`   총 ${rows.length}개 레코드 발견`);

  let updated = 0;
  let skipped = 0;

  for (const row of rows) {
    const originalPhone = row.phone;
    const normalizedPhone = normalizePhone(originalPhone);

    if (normalizedPhone !== originalPhone) {
      console.log(`   ${row[idColumn]}: "${originalPhone}" → "${normalizedPhone}"`);

      await sequelize.query(
        `UPDATE ${tableName} SET phone = ? WHERE ${idColumn} = ?`,
        { replacements: [normalizedPhone, row[idColumn]] }
      );
      updated++;
    } else {
      skipped++;
    }
  }

  console.log(`   ✓ 업데이트: ${updated}개, 변경없음: ${skipped}개`);
  return { updated, skipped };
}

async function main() {
  console.log('🚀 전화번호 정규화 시작\n');
  console.log('목표 형식: +[국가코드][숫자] (예: +60123456789)');
  console.log('='.repeat(50));

  try {
    await sequelize.authenticate();
    console.log('✓ 데이터베이스 연결 성공\n');

    // 각 테이블 처리
    const results = {
      users: await updateTable('users'),
      restaurants: await updateTable('restaurants'),
      customers: await updateTable('customers')
    };

    // 요약
    console.log('\n' + '='.repeat(50));
    console.log('📊 처리 결과 요약:');
    let totalUpdated = 0;
    for (const [table, result] of Object.entries(results)) {
      console.log(`   ${table}: ${result.updated}개 업데이트`);
      totalUpdated += result.updated;
    }
    console.log(`\n✓ 총 ${totalUpdated}개 전화번호 정규화 완료`);

  } catch (error) {
    console.error('✗ 오류 발생:', error.message);
    process.exit(1);
  } finally {
    await sequelize.close();
  }
}

// 테스트 모드
if (process.argv.includes('--test')) {
  console.log('🧪 테스트 모드\n');
  const testCases = [
    '010-1234-5678',
    '02-1234-5678',
    '+60-12-3456789',
    '+60 12-345 6789',
    '0123456789',
    '+82-10-1234-5678',
    '017-2083359',
    '+60172083359',
    '12345',
    ''
  ];

  for (const phone of testCases) {
    const normalized = normalizePhone(phone);
    const display = formatPhoneForDisplay(normalized);
    console.log(`"${phone}" → "${normalized}" (표시: "${display}")`);
  }
} else {
  main();
}

module.exports = { normalizePhone, formatPhoneForDisplay };

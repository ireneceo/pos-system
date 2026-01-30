/**
 * 로고 이미지 마이그레이션 스크립트
 *
 * company_settings와 brands 테이블의 Base64 이미지를 파일 서버로 이전합니다.
 * - company_settings의 logo, brand_logo, company_logo
 * - brands의 logo_url
 *
 * 사용법:
 *   node scripts/migrate-logo-images.js [--dry-run]
 *
 * 옵션:
 *   --dry-run   실제 저장 없이 미리보기만
 */

const path = require('path');
const fs = require('fs').promises;
const sharp = require('sharp');

// 환경 설정 로드
require('../config/env-loader')();

const { sequelize } = require('../config/database');

// 설정
const UPLOAD_DIR = '/var/www/uploads/logos';

// 커맨드라인 옵션 파싱
const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');

/**
 * Base64 이미지를 파일로 저장
 */
async function saveBase64ToFile(base64Data, filename) {
  // Base64 데이터 추출
  const matches = base64Data.match(/^data:image\/(\w+);base64,(.+)$/);
  if (!matches) {
    throw new Error('Invalid base64 format');
  }

  const ext = matches[1] === 'svg+xml' ? 'svg' : matches[1];
  const buffer = Buffer.from(matches[2], 'base64');
  const fullFilename = `${filename}.${ext}`;
  const filePath = path.join(UPLOAD_DIR, fullFilename);

  // SVG는 그대로 저장, 그 외는 최적화
  if (ext === 'svg') {
    await fs.writeFile(filePath, buffer);
  } else {
    // 로고는 원본 품질 유지하되 적당한 크기로 리사이즈
    try {
      await sharp(buffer, { failOn: 'none' })
        .resize(800, 800, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .toFile(filePath);
    } catch (sharpError) {
      // Sharp 실패 시 원본 그대로 저장
      console.log(`  Sharp failed, saving original buffer...`);
      await fs.writeFile(filePath, buffer);
    }
  }

  return `/uploads/logos/${fullFilename}`;
}

/**
 * 메인 마이그레이션 함수
 */
async function migrate() {
  console.log('='.repeat(60));
  console.log('로고 이미지 마이그레이션 시작');
  console.log('='.repeat(60));
  console.log(`모드: ${DRY_RUN ? 'DRY RUN (미리보기)' : '실제 마이그레이션'}`);
  console.log('');

  // 디렉토리 확인/생성
  try {
    await fs.access(UPLOAD_DIR);
  } catch {
    console.log(`업로드 디렉토리 생성: ${UPLOAD_DIR}`);
    if (!DRY_RUN) {
      await fs.mkdir(UPLOAD_DIR, { recursive: true });
    }
  }

  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  // 1. company_settings 마이그레이션
  console.log('\n--- company_settings 테이블 ---');
  try {
    const [settings] = await sequelize.query(
      `SELECT id, logo, brand_logo, company_logo FROM company_settings WHERE id = 1`
    );

    if (settings.length > 0) {
      const setting = settings[0];
      const fieldsToMigrate = ['logo', 'brand_logo', 'company_logo'];

      for (const field of fieldsToMigrate) {
        const value = setting[field];
        if (!value) {
          console.log(`[SKIP] ${field}: 값 없음`);
          skipCount++;
          continue;
        }

        if (value.startsWith('/uploads/')) {
          console.log(`[SKIP] ${field}: 이미 URL 형식`);
          skipCount++;
          continue;
        }

        if (!value.startsWith('data:image/')) {
          console.log(`[SKIP] ${field}: 알 수 없는 형식`);
          skipCount++;
          continue;
        }

        const sizeKB = Math.round(value.length / 1024);
        console.log(`[PROCESS] ${field}: ${sizeKB}KB`);

        if (DRY_RUN) {
          console.log(`  [DRY] Would save to: /uploads/logos/company_${field}_${Date.now()}.xxx`);
          successCount++;
        } else {
          try {
            const filename = `company_${field}_${Date.now()}`;
            const url = await saveBase64ToFile(value, filename);

            await sequelize.query(
              `UPDATE company_settings SET ${field} = ? WHERE id = 1`,
              { replacements: [url] }
            );

            console.log(`  [OK] Saved to: ${url}`);
            successCount++;
          } catch (err) {
            console.error(`  [ERROR] ${err.message}`);
            errorCount++;
          }
        }
      }
    }
  } catch (err) {
    console.error('company_settings 처리 오류:', err.message);
    errorCount++;
  }

  // 2. brands 테이블 마이그레이션
  console.log('\n--- brands 테이블 ---');
  try {
    const [brands] = await sequelize.query(
      `SELECT id, name, logo_url FROM brands WHERE logo_url IS NOT NULL AND logo_url != ''`
    );

    for (const brand of brands) {
      const value = brand.logo_url;

      if (value.startsWith('/uploads/')) {
        console.log(`[SKIP] Brand ${brand.id} (${brand.name}): 이미 URL 형식`);
        skipCount++;
        continue;
      }

      if (!value.startsWith('data:image/')) {
        console.log(`[SKIP] Brand ${brand.id} (${brand.name}): 알 수 없는 형식`);
        skipCount++;
        continue;
      }

      const sizeKB = Math.round(value.length / 1024);
      console.log(`[PROCESS] Brand ${brand.id} (${brand.name}): ${sizeKB}KB`);

      if (DRY_RUN) {
        console.log(`  [DRY] Would save to: /uploads/logos/brand_${brand.id}_${Date.now()}.xxx`);
        successCount++;
      } else {
        try {
          const filename = `brand_${brand.id}_${Date.now()}`;
          const url = await saveBase64ToFile(value, filename);

          await sequelize.query(
            `UPDATE brands SET logo_url = ? WHERE id = ?`,
            { replacements: [url, brand.id] }
          );

          console.log(`  [OK] Saved to: ${url}`);
          successCount++;
        } catch (err) {
          console.error(`  [ERROR] ${err.message}`);
          errorCount++;
        }
      }
    }
  } catch (err) {
    console.error('brands 처리 오류:', err.message);
    errorCount++;
  }

  console.log('\n' + '='.repeat(60));
  console.log('마이그레이션 완료');
  console.log('='.repeat(60));
  console.log(`성공: ${successCount}`);
  console.log(`스킵: ${skipCount}`);
  console.log(`오류: ${errorCount}`);

  if (DRY_RUN) {
    console.log('\n실제 마이그레이션을 수행하려면 --dry-run 옵션을 제거하세요.');
  }
}

// 실행
migrate()
  .then(() => {
    console.log('');
    process.exit(0);
  })
  .catch(error => {
    console.error('마이그레이션 실패:', error);
    process.exit(1);
  });

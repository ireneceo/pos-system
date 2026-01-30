/**
 * 이미지 마이그레이션 스크립트
 *
 * 기존 Base64/JSON 형식의 이미지를 파일 서버로 이전합니다.
 * - products 테이블의 image 컬럼을 URL 형식으로 변환
 * - 원본 및 썸네일 파일 생성
 *
 * 사용법:
 *   node scripts/migrate-images.js [--dry-run] [--limit N]
 *
 * 옵션:
 *   --dry-run   실제 저장 없이 미리보기만
 *   --limit N   처리할 최대 개수
 */

const path = require('path');
const fs = require('fs').promises;
const sharp = require('sharp');

// 환경 설정 로드
require('../config/env-loader')();

const Product = require('../models/Product');
const { sequelize } = require('../config/database');

// 설정
const UPLOAD_DIR = '/var/www/uploads/products';
const THUMBNAIL_DIR = '/var/www/uploads/products/thumbnails';
const IMAGE_SIZES = {
  original: { width: 1200, height: 1200, quality: 85 },
  thumbnail: { width: 300, height: 300, quality: 70 }
};

// 커맨드라인 옵션 파싱
const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const limitIndex = args.indexOf('--limit');
const LIMIT = limitIndex !== -1 ? parseInt(args[limitIndex + 1]) : null;

/**
 * Base64 이미지를 파일로 저장
 * 손상된 이미지도 처리 가능하도록 PNG 폴백 추가
 */
async function saveBase64ToFile(base64Data, productId) {
  const filename = `product_${productId}_${Date.now()}`;

  // Base64 데이터 추출
  const matches = base64Data.match(/^data:image\/(\w+);base64,(.+)$/);
  if (!matches) {
    throw new Error('Invalid base64 format');
  }

  const buffer = Buffer.from(matches[2], 'base64');

  // 원본 저장 (손상된 JPEG는 PNG로 시도)
  const originalPath = path.join(UPLOAD_DIR, `${filename}.jpg`);
  try {
    await sharp(buffer, { failOn: 'none' })  // 손상된 이미지도 처리 시도
      .resize(IMAGE_SIZES.original.width, IMAGE_SIZES.original.height, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .jpeg({ quality: IMAGE_SIZES.original.quality })
      .toFile(originalPath);
  } catch (jpegError) {
    // JPEG 실패 시 PNG로 시도
    console.log(`  JPEG failed, trying PNG conversion...`);
    await sharp(buffer, { failOn: 'none' })
      .resize(IMAGE_SIZES.original.width, IMAGE_SIZES.original.height, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .png({ quality: IMAGE_SIZES.original.quality })
      .toFile(originalPath.replace('.jpg', '.png'));
  }

  // 썸네일 저장
  const thumbnailPath = path.join(THUMBNAIL_DIR, `${filename}.jpg`);
  try {
    await sharp(buffer, { failOn: 'none' })
      .resize(IMAGE_SIZES.thumbnail.width, IMAGE_SIZES.thumbnail.height, {
        fit: 'cover',
        position: 'centre'
      })
      .jpeg({ quality: IMAGE_SIZES.thumbnail.quality })
      .toFile(thumbnailPath);
  } catch (thumbError) {
    await sharp(buffer, { failOn: 'none' })
      .resize(IMAGE_SIZES.thumbnail.width, IMAGE_SIZES.thumbnail.height, {
        fit: 'cover',
        position: 'centre'
      })
      .png({ quality: IMAGE_SIZES.thumbnail.quality })
      .toFile(thumbnailPath.replace('.jpg', '.png'));
  }

  return {
    original: `/uploads/products/${filename}.jpg`,
    thumbnail: `/uploads/products/thumbnails/${filename}.jpg`
  };
}

/**
 * 이미지 데이터 파싱
 */
function parseImageData(imageStr) {
  if (!imageStr) return null;

  // 이미 URL 형식이면 스킵
  if (imageStr.startsWith('/uploads/')) {
    return { type: 'url', data: imageStr };
  }

  // JSON 형식 (썸네일/미디엄/오리지널)
  if (imageStr.startsWith('{')) {
    try {
      const parsed = JSON.parse(imageStr);
      // medium 또는 original에서 base64 추출
      const base64 = parsed.original || parsed.medium || parsed.thumbnail;
      if (base64 && base64.startsWith('data:image/')) {
        return { type: 'json_base64', data: base64 };
      }
    } catch {
      // 파싱 실패
    }
  }

  // 직접 base64 형식
  if (imageStr.startsWith('data:image/')) {
    return { type: 'base64', data: imageStr };
  }

  return { type: 'unknown', data: imageStr };
}

/**
 * 메인 마이그레이션 함수
 */
async function migrate() {
  console.log('='.repeat(60));
  console.log('이미지 마이그레이션 시작');
  console.log('='.repeat(60));
  console.log(`모드: ${DRY_RUN ? 'DRY RUN (미리보기)' : '실제 마이그레이션'}`);
  if (LIMIT) console.log(`제한: ${LIMIT}개`);
  console.log('');

  // 디렉토리 확인
  try {
    await fs.access(UPLOAD_DIR);
    await fs.access(THUMBNAIL_DIR);
  } catch {
    console.error('업로드 디렉토리가 없습니다. 먼저 생성해주세요:');
    console.error(`  mkdir -p ${UPLOAD_DIR}`);
    console.error(`  mkdir -p ${THUMBNAIL_DIR}`);
    process.exit(1);
  }

  // 이미지가 있는 상품 조회
  const queryOptions = {
    where: sequelize.literal("image IS NOT NULL AND image != '' AND image NOT LIKE '/uploads/%'"),
    order: [['id', 'ASC']]
  };

  if (LIMIT) {
    queryOptions.limit = LIMIT;
  }

  const products = await Product.findAll(queryOptions);
  console.log(`마이그레이션 대상: ${products.length}개 상품`);
  console.log('');

  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;
  const errors = [];

  for (const product of products) {
    const parsed = parseImageData(product.image);

    if (!parsed) {
      skipCount++;
      continue;
    }

    if (parsed.type === 'url') {
      console.log(`[SKIP] ID ${product.id}: 이미 URL 형식`);
      skipCount++;
      continue;
    }

    if (parsed.type === 'unknown') {
      console.log(`[SKIP] ID ${product.id}: 알 수 없는 형식`);
      skipCount++;
      continue;
    }

    try {
      const base64Data = parsed.data;
      const sizeKB = Math.round(base64Data.length / 1024);

      if (DRY_RUN) {
        console.log(`[DRY] ID ${product.id} (${product.name}): ${parsed.type}, ${sizeKB}KB`);
        successCount++;
      } else {
        try {
          // 파일 저장
          const urls = await saveBase64ToFile(base64Data, product.id);

          // DB 업데이트
          await product.update({
            image: urls.original,
            image_thumbnail: urls.thumbnail
          });

          console.log(`[OK] ID ${product.id} (${product.name}): ${sizeKB}KB → ${urls.original}`);
          successCount++;
        } catch (saveError) {
          // 손상된 이미지는 null로 처리 (사용자가 다시 업로드하도록)
          console.log(`[WARN] ID ${product.id} (${product.name}): 손상된 이미지 - null로 설정`);
          await product.update({
            image: null,
            image_thumbnail: null
          });
          skipCount++;
        }
      }
    } catch (error) {
      console.error(`[ERROR] ID ${product.id}: ${error.message}`);
      errors.push({ id: product.id, name: product.name, error: error.message });
      errorCount++;
    }
  }

  console.log('');
  console.log('='.repeat(60));
  console.log('마이그레이션 완료');
  console.log('='.repeat(60));
  console.log(`성공: ${successCount}`);
  console.log(`스킵: ${skipCount}`);
  console.log(`오류: ${errorCount}`);

  if (errors.length > 0) {
    console.log('');
    console.log('오류 목록:');
    errors.forEach(e => {
      console.log(`  - ID ${e.id} (${e.name}): ${e.error}`);
    });
  }

  if (DRY_RUN) {
    console.log('');
    console.log('실제 마이그레이션을 수행하려면 --dry-run 옵션을 제거하세요.');
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

/**
 * Image Processor Utility
 *
 * 이미지 업로드 시 자동으로 썸네일과 중간 크기 이미지를 생성합니다.
 * - thumbnail: 300x300 (리스트, 그리드 표시용)
 * - medium: 600x600 (상세 페이지용)
 * - original: 원본 유지 (최대 1200x1200로 제한)
 */

const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

// 파일 저장 위치
const PRODUCTS_DIR = '/var/www/uploads/products';
const PRODUCTS_THUMB_DIR = '/var/www/uploads/products/thumbnails';

// 이미지 크기 설정
const IMAGE_SIZES = {
  thumbnail: { width: 300, height: 300 },
  medium: { width: 600, height: 600 },
  original: { width: 1200, height: 1200 }
};

// JPEG 품질 설정
const QUALITY_SETTINGS = {
  thumbnail: 70,
  medium: 80,
  original: 85
};

/**
 * 항목명을 영어(ASCII) 슬러그로 변환. 한글/한자 등 비ASCII 문자는 제거.
 * - 소문자, 공백/특수문자는 하이픈, 연속 하이픈 축약, 최대 40자
 * - 변환 후 남는 ASCII 가 없으면(예: 순수 한글명) null 반환 → 호출부가 fallback 사용
 *   (Irene 2026-06-18 지시: 모든 업로드 파일명은 영어)
 */
function slugifyName(name) {
  if (!name || typeof name !== 'string') return null;
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')   // ASCII 영숫자 외 전부 하이픈 (한글 등 비ASCII 포함)
    .replace(/^-+|-+$/g, '')        // 앞뒤 하이픈 제거
    .replace(/-+/g, '-')            // 연속 하이픈 축약
    .slice(0, 40)
    .replace(/-+$/g, '');           // slice 후 끝 하이픈 정리
  return slug || null;
}

/**
 * 영어 파일명 생성: `{slug}_{shortRandom}` 또는 fallback 사용.
 * 슬러그로 사람이 알아보되, 짧은 랜덤으로 충돌/유니크 보장.
 * @param {string} [nameHint] 항목명(상품명 등) — ASCII 슬러그로 변환
 * @param {string} [fallback] 슬러그 불가 시 영어 접두사 (예: 'product')
 */
function generateImageFilename(nameHint, fallback = 'image') {
  const slug = slugifyName(nameHint) || fallback;
  return `${slug}_${crypto.randomBytes(4).toString('hex')}`;
}

/**
 * Base64 이미지를 파일로 저장하고 URL 경로를 반환
 *
 * Input:
 *   - base64 data URI (data:image/...)
 *   - 이미 URL 경로면 그대로 반환
 * Output:
 *   - { original, thumbnail, medium } — 모두 URL 문자열 (/uploads/products/xxx.jpg)
 *   - 실패 시 null (호출부가 null 처리)
 *
 * 변환 내용:
 *   - 원본: 최대 1200x1200, quality 85
 *   - 썸네일: 300x300 cover crop, quality 70
 *   - medium: 호환용, original URL과 동일 (별도 파일 생성 안 함)
 *
 * 포맷 분기:
 *   - SVG: 원본 그대로 저장 (리사이즈 없음)
 *   - PNG: 투명도 보존, .png 확장자 유지
 *   - 그 외 (JPEG 등): .jpg로 통일
 */
async function processImage(base64Image, nameHint) {
  if (!base64Image || typeof base64Image !== 'string') {
    return null;
  }

  // 이미 URL 경로이면 그대로 반환 (idempotent)
  if (base64Image.startsWith('/uploads/') || base64Image.startsWith('http://') || base64Image.startsWith('https://')) {
    const thumb = base64Image.replace('/products/', '/products/thumbnails/');
    return {
      original: base64Image,
      thumbnail: thumb,
      medium: base64Image
    };
  }

  // data:image/...;base64, 형식 아니면 처리 불가
  if (!base64Image.startsWith('data:image/')) {
    return null;
  }

  const matches = base64Image.match(/^data:image\/([\w+.-]+);base64,(.+)$/);
  if (!matches) {
    console.error('processImage: invalid base64 format');
    return null;
  }

  const mimeSubtype = matches[1].toLowerCase();
  const buffer = Buffer.from(matches[2], 'base64');

  try {
    // 디렉토리 존재 보장
    await fs.mkdir(PRODUCTS_DIR, { recursive: true });
    await fs.mkdir(PRODUCTS_THUMB_DIR, { recursive: true });

    const filename = generateImageFilename(nameHint, 'product');

    // SVG: 원본 그대로 저장 (리사이즈 불필요, 썸네일도 SVG 자체 사용)
    if (mimeSubtype === 'svg+xml') {
      const filepath = path.join(PRODUCTS_DIR, `${filename}.svg`);
      await fs.writeFile(filepath, buffer);
      const url = `/uploads/products/${filename}.svg`;
      console.log(`processImage: SVG saved ${Math.round(buffer.length / 1024)}KB → ${url}`);
      return { original: url, thumbnail: url, medium: url };
    }

    // PNG: 투명도 보존
    if (mimeSubtype === 'png') {
      const originalPath = path.join(PRODUCTS_DIR, `${filename}.png`);
      const thumbnailPath = path.join(PRODUCTS_THUMB_DIR, `${filename}.png`);

      await sharp(buffer, { failOn: 'none' })
        .resize(IMAGE_SIZES.original.width, IMAGE_SIZES.original.height, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .png({ quality: QUALITY_SETTINGS.original })
        .toFile(originalPath);

      await sharp(buffer, { failOn: 'none' })
        .resize(IMAGE_SIZES.thumbnail.width, IMAGE_SIZES.thumbnail.height, {
          fit: 'cover',
          position: 'centre'
        })
        .png({ quality: QUALITY_SETTINGS.thumbnail })
        .toFile(thumbnailPath);

      const originalUrl = `/uploads/products/${filename}.png`;
      const thumbnailUrl = `/uploads/products/thumbnails/${filename}.png`;

      const origStats = await fs.stat(originalPath);
      const thumbStats = await fs.stat(thumbnailPath);
      console.log(`processImage: PNG ${Math.round(origStats.size / 1024)}KB + ${Math.round(thumbStats.size / 1024)}KB thumb → ${originalUrl}`);

      return { original: originalUrl, thumbnail: thumbnailUrl, medium: originalUrl };
    }

    // JPEG 및 기타 (webp, gif → jpeg로 통일)
    const originalPath = path.join(PRODUCTS_DIR, `${filename}.jpg`);
    const thumbnailPath = path.join(PRODUCTS_THUMB_DIR, `${filename}.jpg`);

    await sharp(buffer, { failOn: 'none' })
      .resize(IMAGE_SIZES.original.width, IMAGE_SIZES.original.height, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .jpeg({ quality: QUALITY_SETTINGS.original })
      .toFile(originalPath);

    await sharp(buffer, { failOn: 'none' })
      .resize(IMAGE_SIZES.thumbnail.width, IMAGE_SIZES.thumbnail.height, {
        fit: 'cover',
        position: 'centre'
      })
      .jpeg({ quality: QUALITY_SETTINGS.thumbnail })
      .toFile(thumbnailPath);

    const originalUrl = `/uploads/products/${filename}.jpg`;
    const thumbnailUrl = `/uploads/products/thumbnails/${filename}.jpg`;

    const origStats = await fs.stat(originalPath);
    const thumbStats = await fs.stat(thumbnailPath);
    console.log(`processImage: JPEG ${Math.round(origStats.size / 1024)}KB + ${Math.round(thumbStats.size / 1024)}KB thumb → ${originalUrl}`);

    return { original: originalUrl, thumbnail: thumbnailUrl, medium: originalUrl };

  } catch (error) {
    console.error('processImage error:', error.message);
    return null;
  }
}

/**
 * 단일 썸네일만 생성 (빠른 처리용)
 * @param {string} base64Image - data:image/... 형식의 base64 이미지
 * @param {number} width - 목표 너비 (기본 300)
 * @param {number} height - 목표 높이 (기본 300)
 * @returns {Promise<string | null>}
 */
async function createThumbnail(base64Image, width = 300, height = 300) {
  if (!base64Image || typeof base64Image !== 'string') {
    return null;
  }

  if (!base64Image.startsWith('data:image/')) {
    return base64Image; // URL인 경우 그대로 반환
  }

  try {
    const matches = base64Image.match(/^data:image\/(\w+);base64,(.+)$/);
    if (!matches) return null;

    const base64Data = matches[2];
    const buffer = Buffer.from(base64Data, 'base64');

    const processedBuffer = await sharp(buffer)
      .resize(width, height, {
        fit: 'cover',
        position: 'centre'
      })
      .jpeg({ quality: 70 })
      .toBuffer();

    return `data:image/jpeg;base64,${processedBuffer.toString('base64')}`;
  } catch (error) {
    console.error('Thumbnail creation error:', error);
    return null;
  }
}

/**
 * 이미지 최적화 (원본 크기 유지, 품질만 조정)
 * @param {string} base64Image - data:image/... 형식의 base64 이미지
 * @param {number} quality - JPEG 품질 (기본 80)
 * @param {number} maxWidth - 최대 너비 (기본 1200)
 * @param {number} maxHeight - 최대 높이 (기본 1200)
 * @returns {Promise<string | null>}
 */
async function optimizeImage(base64Image, quality = 80, maxWidth = 1200, maxHeight = 1200) {
  if (!base64Image || typeof base64Image !== 'string') {
    return null;
  }

  if (!base64Image.startsWith('data:image/')) {
    return base64Image;
  }

  try {
    const matches = base64Image.match(/^data:image\/(\w+);base64,(.+)$/);
    if (!matches) return null;

    const base64Data = matches[2];
    const buffer = Buffer.from(base64Data, 'base64');

    const processedBuffer = await sharp(buffer)
      .resize(maxWidth, maxHeight, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .jpeg({ quality })
      .toBuffer();

    return `data:image/jpeg;base64,${processedBuffer.toString('base64')}`;
  } catch (error) {
    console.error('Image optimization error:', error);
    return base64Image; // 실패 시 원본 반환
  }
}

/**
 * 이미지 데이터에서 썸네일 URL 추출 또는 생성
 * DB에 저장된 이미지 데이터를 분석하여 적절한 크기 반환
 * @param {string | object} imageData - 이미지 데이터 (string 또는 {thumbnail, medium, original})
 * @param {string} size - 'thumbnail' | 'medium' | 'original'
 * @returns {string | null}
 */
function getImageUrl(imageData, size = 'thumbnail') {
  if (!imageData) return null;

  // 객체 형태인 경우 (새 형식)
  if (typeof imageData === 'object' && imageData !== null) {
    return imageData[size] || imageData.thumbnail || imageData.original || null;
  }

  // 문자열인 경우 (기존 형식 - 호환성)
  if (typeof imageData === 'string') {
    return imageData;
  }

  return null;
}

/**
 * 이전 이미지 파일 삭제 (재업로드 시 호출)
 * /uploads/ 경로의 파일만 삭제. Base64는 DB 덮어쓰기로 처리되므로 무시.
 * @param {string|string[]} oldUrls - 이전 이미지 URL (단일 또는 배열)
 */
async function deleteOldImages(oldUrls) {
  if (!oldUrls) return;

  const urls = Array.isArray(oldUrls) ? oldUrls : [oldUrls];

  for (const url of urls) {
    if (!url || typeof url !== 'string' || !url.startsWith('/uploads/')) continue;

    // 2026-06-12 (thefire02 이미지 소실 사고): /uploads/brand-menus/ 파일은 BG 소유 공유
    // 자산 — 여러 매장의 푸시된 Product 가 같은 파일을 참조한다. 매장 제품 이미지 교체가
    // 이 파일을 지우면 다른 매장 전부가 깨진다. 브랜드 파일은 절대 여기서 지우지 않는다
    // (브랜드메뉴 자체 수정 시 교체는 brand-menus 라우트가 관리).
    if (url.includes('/brand-menus/')) continue;

    const filePath = path.join('/var/www', url);
    try {
      await fs.unlink(filePath);
      console.log(`Deleted old image: ${url}`);
    } catch (e) {
      // File doesn't exist — OK
    }

    // 썸네일도 삭제 (products 이미지인 경우)
    if (url.includes('/products/') && !url.includes('/thumbnails/')) {
      const thumbnailPath = filePath.replace('/products/', '/products/thumbnails/');
      try {
        await fs.unlink(thumbnailPath);
        console.log(`Deleted old thumbnail: ${url.replace('/products/', '/products/thumbnails/')}`);
      } catch (e) {
        // File doesn't exist — OK
      }
    }
  }
}

/**
 * Base64 이미지를 고정 파일명으로 저장
 * 브랜드 로고, 파비콘 등 사이트 전역 이미지에 사용
 * @param {string} base64Image - data:image/... 형식의 base64 이미지
 * @param {string} fixedFilename - 저장할 파일명 (확장자 제외, 예: 'brand-logo')
 * @param {object} options - { maxWidth, maxHeight, quality }
 * @returns {Promise<string|null>} 저장된 파일의 URL 경로 (예: '/uploads/logos/brand-logo.png')
 */
/**
 * 기존 /uploads/ 파일을 새 소유 경로로 복사 (2026-06-12, thefire02 이미지 소실 사고 재발 방지).
 * 브랜드메뉴가 매장 제품 이미지 URL 을 "참조만" 하면, 원본 제품이 이미지를 교체할 때 옛 파일이
 * 삭제돼 브랜드메뉴와 푸시된 전 매장 이미지가 한꺼번에 깨진다. 등록/수정 시 자기 파일로 복사해
 * 소유권을 가져온다. 원본이 이미 없으면 null 반환(죽은 참조를 저장하지 않음).
 * @returns {Promise<string|null>} 새 URL 또는 null
 */
async function copyImageToOwnedFile(url, { subdir, filename } = {}) {
  if (!url || typeof url !== 'string' || !url.startsWith('/uploads/')) return null;
  try {
    const srcPath = path.join('/var/www', url);
    const ext = (path.extname(srcPath) || '.jpg').toLowerCase();
    const dir = path.join('/var/www/uploads', subdir || 'misc');
    await fs.mkdir(dir, { recursive: true });
    const destName = `${filename || 'copy_' + Date.now()}${ext}`;
    const destPath = path.join(dir, destName);
    await fs.copyFile(srcPath, destPath);
    return `/uploads/${subdir || 'misc'}/${destName}`;
  } catch (e) {
    // 원본 소실 등 — 죽은 참조를 만들지 않도록 null
    return null;
  }
}

async function saveImageToFile(base64Image, fixedFilename, options = {}) {
  if (!base64Image || typeof base64Image !== 'string') return null;

  if (base64Image.startsWith('/uploads/')) return base64Image;

  if (!base64Image.startsWith('data:image/')) return null;

  try {
    const matches = base64Image.match(/^data:image\/([a-zA-Z0-9.+-]+);base64,(.+)$/);
    if (!matches) return null;

    const mimeSubtype = matches[1].toLowerCase();
    const base64Data = matches[2];
    const buffer = Buffer.from(base64Data, 'base64');

    const { subdir = 'logos', maxWidth = 400, maxHeight = 400, quality = 90 } = options;
    const dir = `/var/www/uploads/${subdir}`;
    await fs.mkdir(dir, { recursive: true });

    if (mimeSubtype === 'svg+xml' || mimeSubtype === 'svg') {
      const filePath = path.join(dir, `${fixedFilename}.svg`);
      await fs.writeFile(filePath, buffer);
      return `/uploads/${subdir}/${fixedFilename}.svg`;
    }

    const processedBuffer = await sharp(buffer)
      .resize(maxWidth, maxHeight, { fit: 'inside', withoutEnlargement: true })
      .png({ quality })
      .toBuffer();

    const filePath = path.join(dir, `${fixedFilename}.png`);
    await fs.writeFile(filePath, processedBuffer);
    return `/uploads/${subdir}/${fixedFilename}.png`;
  } catch (error) {
    console.error('saveImageToFile error:', error);
    return null;
  }
}

/**
 * Normalize an incoming image field value for routes that store a URL.
 *
 * - `data:image/...` base64 → written to disk via saveImageToFile, URL returned.
 * - `/uploads/...` → returned as-is (no-op, allows passthrough on update).
 * - `undefined` → returned as-is so callers can detect "field not present".
 * - Empty string / null → returns null so callers can clear the column.
 *
 * Routes should call this for every image-bearing field on POST/PUT to keep
 * base64 from being persisted into TEXT/MEDIUMTEXT columns (v3.30 perf incident
 * guard — see base64ImageSweep for the detection backstop).
 */
async function normalizeImageField(value, { subdir, filename, maxWidth, maxHeight, quality } = {}) {
  if (value === undefined) return undefined;
  if (value === null) return null;
  if (typeof value !== 'string') return value;
  const trimmed = value.trim();
  if (trimmed === '') return null;
  if (trimmed.startsWith('/uploads/')) return trimmed;
  if (trimmed.startsWith('data:image/')) {
    const url = await saveImageToFile(trimmed, filename, { subdir, maxWidth, maxHeight, quality });
    return url || null;
  }
  return trimmed;
}

module.exports = {
  copyImageToOwnedFile,
  slugifyName,
  generateImageFilename,
  processImage,
  createThumbnail,
  optimizeImage,
  getImageUrl,
  deleteOldImages,
  saveImageToFile,
  normalizeImageField,
  IMAGE_SIZES,
  QUALITY_SETTINGS
};

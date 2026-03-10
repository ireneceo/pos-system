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
 * Base64 이미지를 처리하여 여러 크기로 변환
 * @param {string} base64Image - data:image/... 형식의 base64 이미지
 * @returns {Promise<{thumbnail: string, medium: string, original: string} | null>}
 */
async function processImage(base64Image) {
  if (!base64Image || typeof base64Image !== 'string') {
    return null;
  }

  // data:image/xxx;base64, 형식 체크
  if (!base64Image.startsWith('data:image/')) {
    // 이미 URL인 경우 그대로 반환
    if (base64Image.startsWith('http://') || base64Image.startsWith('https://') || base64Image.startsWith('/')) {
      return {
        thumbnail: base64Image,
        medium: base64Image,
        original: base64Image
      };
    }
    return null;
  }

  try {
    // base64 데이터 추출
    const matches = base64Image.match(/^data:image\/(\w+);base64,(.+)$/);
    if (!matches) {
      console.error('Invalid base64 image format');
      return null;
    }

    const imageFormat = matches[1].toLowerCase();
    const base64Data = matches[2];
    const buffer = Buffer.from(base64Data, 'base64');

    // 이미지 메타데이터 확인
    const metadata = await sharp(buffer).metadata();
    console.log(`Processing image: ${metadata.width}x${metadata.height}, format: ${imageFormat}`);

    // 각 크기별로 이미지 생성
    const results = {};

    for (const [sizeName, dimensions] of Object.entries(IMAGE_SIZES)) {
      const quality = QUALITY_SETTINGS[sizeName];

      let processedBuffer;

      // 원본이 목표 크기보다 작으면 리사이즈하지 않음
      if (metadata.width <= dimensions.width && metadata.height <= dimensions.height && sizeName !== 'thumbnail') {
        // 품질만 조정
        processedBuffer = await sharp(buffer)
          .jpeg({ quality })
          .toBuffer();
      } else {
        // 리사이즈 (비율 유지, 내부 맞춤)
        processedBuffer = await sharp(buffer)
          .resize(dimensions.width, dimensions.height, {
            fit: 'inside',
            withoutEnlargement: true
          })
          .jpeg({ quality })
          .toBuffer();
      }

      results[sizeName] = `data:image/jpeg;base64,${processedBuffer.toString('base64')}`;
    }

    // 로그 출력
    const originalSize = Math.round(base64Data.length / 1024);
    const thumbnailSize = Math.round((results.thumbnail.length - 23) / 1024); // 23 = 'data:image/jpeg;base64,' length
    const mediumSize = Math.round((results.medium.length - 23) / 1024);
    const newOriginalSize = Math.round((results.original.length - 23) / 1024);

    console.log(`Image processed: Original ${originalSize}KB -> Thumbnail ${thumbnailSize}KB, Medium ${mediumSize}KB, Optimized ${newOriginalSize}KB`);

    return results;
  } catch (error) {
    console.error('Image processing error:', error);
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
async function saveImageToFile(base64Image, fixedFilename, options = {}) {
  if (!base64Image || typeof base64Image !== 'string') return null;

  // 이미 파일 경로인 경우 그대로 반환
  if (base64Image.startsWith('/uploads/')) return base64Image;

  // base64가 아닌 경우 무시
  if (!base64Image.startsWith('data:image/')) return null;

  try {
    const matches = base64Image.match(/^data:image\/(\w+);base64,(.+)$/);
    if (!matches) return null;

    const base64Data = matches[2];
    const buffer = Buffer.from(base64Data, 'base64');

    const { maxWidth = 400, maxHeight = 400, quality = 90 } = options;

    const processedBuffer = await sharp(buffer)
      .resize(maxWidth, maxHeight, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .png({ quality })
      .toBuffer();

    const dir = '/var/www/uploads/logos';
    await fs.mkdir(dir, { recursive: true });

    const filePath = path.join(dir, `${fixedFilename}.png`);
    await fs.writeFile(filePath, processedBuffer);

    const urlPath = `/uploads/logos/${fixedFilename}.png`;
    console.log(`Saved image to ${filePath} (${Math.round(processedBuffer.length / 1024)}KB)`);
    return urlPath;
  } catch (error) {
    console.error('saveImageToFile error:', error);
    return null;
  }
}

module.exports = {
  processImage,
  createThumbnail,
  optimizeImage,
  getImageUrl,
  deleteOldImages,
  saveImageToFile,
  IMAGE_SIZES,
  QUALITY_SETTINGS
};

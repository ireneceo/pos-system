/**
 * 이미지 업로드 API
 *
 * 이미지를 파일 서버에 저장하고 URL을 반환합니다.
 * - 원본: /uploads/products/{id}.jpg
 * - 썸네일: /uploads/products/thumbnails/{id}.jpg
 */

const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs').promises;
const sharp = require('sharp');
const { authenticateToken } = require('../middleware/auth');
const crypto = require('crypto');

// 업로드 디렉토리 설정
const UPLOAD_DIR = '/var/www/uploads/products';
const THUMBNAIL_DIR = '/var/www/uploads/products/thumbnails';

// 이미지 크기 설정
const IMAGE_SIZES = {
  original: { width: 1200, height: 1200, quality: 85 },
  thumbnail: { width: 300, height: 300, quality: 70 }
};

/**
 * 고유 파일명 생성
 */
function generateFilename() {
  const timestamp = Date.now();
  const random = crypto.randomBytes(8).toString('hex');
  return `${timestamp}_${random}`;
}

/**
 * Base64 이미지를 파일로 저장
 */
async function saveImageFromBase64(base64Image, filename) {
  // data:image/xxx;base64, 형식 체크
  const matches = base64Image.match(/^data:image\/(\w+);base64,(.+)$/);
  if (!matches) {
    throw new Error('Invalid base64 image format');
  }

  const base64Data = matches[2];
  const buffer = Buffer.from(base64Data, 'base64');

  // 원본 이미지 저장 (최대 크기 제한 + 품질 조정)
  const originalPath = path.join(UPLOAD_DIR, `${filename}.jpg`);
  await sharp(buffer)
    .resize(IMAGE_SIZES.original.width, IMAGE_SIZES.original.height, {
      fit: 'inside',
      withoutEnlargement: true
    })
    .jpeg({ quality: IMAGE_SIZES.original.quality })
    .toFile(originalPath);

  // 썸네일 생성
  const thumbnailPath = path.join(THUMBNAIL_DIR, `${filename}.jpg`);
  await sharp(buffer)
    .resize(IMAGE_SIZES.thumbnail.width, IMAGE_SIZES.thumbnail.height, {
      fit: 'cover',
      position: 'centre'
    })
    .jpeg({ quality: IMAGE_SIZES.thumbnail.quality })
    .toFile(thumbnailPath);

  // 파일 크기 로깅
  const originalStats = await fs.stat(originalPath);
  const thumbnailStats = await fs.stat(thumbnailPath);
  console.log(`Image saved: Original ${Math.round(originalStats.size / 1024)}KB, Thumbnail ${Math.round(thumbnailStats.size / 1024)}KB`);

  return {
    original: `/uploads/products/${filename}.jpg`,
    thumbnail: `/uploads/products/thumbnails/${filename}.jpg`
  };
}

/**
 * POST /api/upload/image
 * 이미지 업로드 (Base64 → 파일)
 */
router.post('/image', authenticateToken, async (req, res) => {
  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({
        success: false,
        message: 'Image data is required'
      });
    }

    // Base64 이미지인지 확인
    if (!image.startsWith('data:image/')) {
      // 이미 URL인 경우 그대로 반환
      if (image.startsWith('/uploads/') || image.startsWith('http')) {
        return res.json({
          success: true,
          data: {
            original: image,
            thumbnail: image.replace('/products/', '/products/thumbnails/')
          }
        });
      }
      return res.status(400).json({
        success: false,
        message: 'Invalid image format. Expected base64 or URL.'
      });
    }

    // 파일명 생성 및 저장
    const filename = generateFilename();
    const urls = await saveImageFromBase64(image, filename);

    res.json({
      success: true,
      data: urls
    });

  } catch (error) {
    console.error('Image upload error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to upload image'
    });
  }
});

/**
 * DELETE /api/upload/image
 * 이미지 삭제
 */
router.delete('/image', authenticateToken, async (req, res) => {
  try {
    const { url } = req.body;

    if (!url || !url.startsWith('/uploads/products/')) {
      return res.status(400).json({
        success: false,
        message: 'Invalid image URL'
      });
    }

    // 파일명 추출
    const filename = path.basename(url);
    const originalPath = path.join(UPLOAD_DIR, filename);
    const thumbnailPath = path.join(THUMBNAIL_DIR, filename);

    // 파일 삭제 (존재하는 경우에만)
    try {
      await fs.unlink(originalPath);
    } catch (e) {
      // 파일이 없으면 무시
    }

    try {
      await fs.unlink(thumbnailPath);
    } catch (e) {
      // 파일이 없으면 무시
    }

    res.json({
      success: true,
      message: 'Image deleted'
    });

  } catch (error) {
    console.error('Image delete error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete image'
    });
  }
});

module.exports = router;

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
const multer = require('multer');
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

// ========== 범용 파일 첨부 업로드 ==========

const ATTACHMENTS_BASE = '/var/www/uploads/attachments';

const ALLOWED_EXTENSIONS = [
  '.jpg', '.jpeg', '.png', '.gif', '.webp',
  '.pdf', '.doc', '.docx', '.xls', '.xlsx',
  '.zip'
];

const attachmentStorage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const yearMonth = new Date().toISOString().slice(0, 7); // YYYY-MM
    const dir = path.join(ATTACHMENTS_BASE, yearMonth);
    try {
      await fs.mkdir(dir, { recursive: true });
    } catch (e) { /* ignore */ }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const random = crypto.randomBytes(8).toString('hex');
    const ext = path.extname(file.originalname).toLowerCase();
    const safeName = file.originalname
      .replace(ext, '')
      .replace(/[^a-zA-Z0-9가-힣_-]/g, '_')
      .slice(0, 50);
    cb(null, `${timestamp}_${random}_${safeName}${ext}`);
  }
});

const attachmentUpload = multer({
  storage: attachmentStorage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB per file
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ALLOWED_EXTENSIONS.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error(`File type not allowed: ${ext}`));
    }
  }
});

/**
 * POST /api/upload/files
 * 범용 파일 첨부 업로드 (최대 5개)
 */
router.post('/files', authenticateToken, (req, res) => {
  attachmentUpload.array('files', 5)(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({ success: false, message: 'File too large. Max 10MB per file.' });
        }
        if (err.code === 'LIMIT_FILE_COUNT') {
          return res.status(400).json({ success: false, message: 'Too many files. Max 5 files.' });
        }
      }
      return res.status(400).json({ success: false, message: err.message || 'Upload failed' });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: 'No files uploaded' });
    }

    const data = req.files.map(file => {
      const relativePath = file.path.replace('/var/www', '');
      return {
        url: relativePath,
        originalName: file.originalname,
        size: file.size,
        mimeType: file.mimetype
      };
    });

    res.json({ success: true, data });
  });
});

/**
 * DELETE /api/upload/file
 * 첨부파일 삭제
 */
router.delete('/file', authenticateToken, async (req, res) => {
  try {
    const { url } = req.body;

    if (!url || !url.startsWith('/uploads/attachments/')) {
      return res.status(400).json({ success: false, message: 'Invalid file URL' });
    }

    const filePath = path.join('/var/www', url);

    try {
      await fs.unlink(filePath);
    } catch (e) {
      // File doesn't exist — OK
    }

    res.json({ success: true, message: 'File deleted' });
  } catch (error) {
    console.error('File delete error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete file' });
  }
});

module.exports = router;

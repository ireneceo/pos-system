/**
 * 청구서 결제 영수증 정규화 (2026-10-05)
 *
 * Irene 「Payment Receipt Image 여기 왜 드래그는 안들어가? 그리고 왜 pdf는 안들어가?
 *         은행이 주는 영수증은 pdf도 있는데?」
 *
 * 화면은 영수증을 data URL 로 보낸다. 예전엔 그 base64 를 invoices.receipt_url 에 그대로
 * 넣었다(DB 비대 — v3.30 base64 사고와 같은 종류). 이제 여기서 파일로 저장하고 URL 만 남긴다.
 *
 *   data:image/(jpeg|png|webp);base64,…  → saveImageToFile(subdir 'receipts') → /uploads/receipts/<name>.png
 *   data:application/pdf;base64,…        → `%PDF-` 확인 후 /var/www/uploads/receipts/<uuid>.pdf
 *   /uploads/… · http(s)://…             → 그대로 (이미 저장된 것 / 외부 링크)
 *   '' · null · undefined                → null
 *   그 밖(svg·html·text 등)               → 400 (ReceiptError)
 *
 * SVG 는 받지 않는다 — /uploads 는 같은 출처에서 그대로 서빙되므로 스크립트가 든 SVG 는 XSS 가 된다.
 */
const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');
const { saveImageToFile } = require('./imageProcessor');

const RECEIPT_MAX_BYTES = 5 * 1024 * 1024;
const RECEIPTS_SUBDIR = 'receipts';
const RECEIPTS_DIR = path.join('/var/www/uploads', RECEIPTS_SUBDIR);

class ReceiptError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
    this.statusCode = 400;
  }
}

const decodedSize = (b64) => {
  const clean = b64.replace(/\s/g, '');
  const pad = clean.endsWith('==') ? 2 : clean.endsWith('=') ? 1 : 0;
  return Math.floor((clean.length * 3) / 4) - pad;
};

/**
 * @param {*} value  req.body.receipt_url
 * @param {{ prefix?: string }} opts  파일 이름 앞부분(예: 'inv123')
 * @returns {Promise<string|null>} 저장할 receipt_url
 * @throws {ReceiptError}
 */
async function normalizeReceiptUrl(value, { prefix = 'receipt' } = {}) {
  if (value === undefined || value === null) return null;
  if (typeof value !== 'string') throw new ReceiptError('INVALID_RECEIPT', 'Invalid receipt');
  const v = value.trim();
  if (v === '') return null;

  if (v.startsWith('/uploads/')) {
    if (v.includes('..')) throw new ReceiptError('INVALID_RECEIPT', 'Invalid receipt path');
    return v;
  }
  if (/^https?:\/\//i.test(v)) return v;

  const safePrefix = String(prefix).replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 40) || 'receipt';
  const name = `${safePrefix}-${Date.now()}-${crypto.randomBytes(8).toString('hex')}`;

  const pdf = v.match(/^data:application\/pdf;base64,([A-Za-z0-9+/=\s]+)$/);
  if (pdf) {
    if (decodedSize(pdf[1]) > RECEIPT_MAX_BYTES) throw new ReceiptError('RECEIPT_TOO_LARGE', 'Receipt must be 5MB or smaller');
    const buf = Buffer.from(pdf[1], 'base64');
    if (buf.length > RECEIPT_MAX_BYTES) throw new ReceiptError('RECEIPT_TOO_LARGE', 'Receipt must be 5MB or smaller');
    if (buf.subarray(0, 5).toString('latin1') !== '%PDF-') throw new ReceiptError('INVALID_RECEIPT', 'File is not a valid PDF');
    await fs.mkdir(RECEIPTS_DIR, { recursive: true });
    await fs.writeFile(path.join(RECEIPTS_DIR, `${name}.pdf`), buf);
    return `/uploads/${RECEIPTS_SUBDIR}/${name}.pdf`;
  }

  const img = v.match(/^data:image\/(jpeg|jpg|png|webp);base64,([A-Za-z0-9+/=\s]+)$/i);
  if (img) {
    if (decodedSize(img[2]) > RECEIPT_MAX_BYTES) throw new ReceiptError('RECEIPT_TOO_LARGE', 'Receipt must be 5MB or smaller');
    // 영수증은 글씨를 읽어야 하므로 로고 기본값(400px)이 아니라 2000px 까지 둔다
    const url = await saveImageToFile(v, name, { subdir: RECEIPTS_SUBDIR, maxWidth: 2000, maxHeight: 2000, quality: 90 });
    if (!url) throw new ReceiptError('INVALID_RECEIPT', 'Could not read the receipt image');
    return url;
  }

  throw new ReceiptError('INVALID_RECEIPT', 'Receipt must be a JPG, PNG, WEBP image or a PDF');
}

module.exports = { normalizeReceiptUrl, ReceiptError, RECEIPT_MAX_BYTES };

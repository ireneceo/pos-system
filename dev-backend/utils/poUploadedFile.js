/**
 * 발주에 붙인 파일(공급업체 인보이스 · 영수증) 치우기 (2026-10-30)
 *
 * Irene 「영수증이나 인보이스를 업로드하면 재업로드 기능이 나와야 해. 그래서 재업로드하면 이전 거
 *         그냥 삭제하면 될 것 같아. 삭제도 가능해야 하지 않아?」
 *
 * 다시 올리거나 지우면 발주 칸이 더는 옛 파일을 가리키지 않는다 → 디스크에서도 지운다.
 * 지우는 조건(셋 다):
 *   ① `/api/upload/files` 가 만든 첨부 폴더(/uploads/attachments/) 안 — 정규화한 실제 경로로 확인('..' 탈출 차단)
 *   ② 다른 발주의 인보이스·영수증 칸이 같은 주소를 쓰지 않음
 *   ③ 청구서 결제 영수증(invoices.receipt_url)이 같은 주소를 쓰지 않음
 * 하나라도 아니면 남겨 둔다(보수적). 실패해도 요청은 성공 — 파일 치우기는 덤이다.
 * DB 칸을 바꾼 **뒤에** 부른다(지금 발주는 이미 옛 주소를 안 가리킨다).
 */
const fs = require('fs').promises;
const path = require('path');
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const UPLOAD_ROOT = '/var/www';
const ATTACHMENTS_BASE = path.join(UPLOAD_ROOT, 'uploads', 'attachments');

/** 지워도 되는 첨부 경로면 실제 경로, 아니면 null */
function attachmentPathOf(url) {
  if (!url || typeof url !== 'string' || !url.startsWith('/uploads/attachments/')) return null;
  const filePath = path.resolve(UPLOAD_ROOT, '.' + url);
  return filePath.startsWith(ATTACHMENTS_BASE + path.sep) ? filePath : null;
}

async function stillReferenced(url) {
  const [row] = await sequelize.query(
    `SELECT
       (SELECT COUNT(*) FROM purchase_orders WHERE external_invoice_url = :url OR receipt_url = :url) AS po_refs,
       (SELECT COUNT(*) FROM invoices WHERE receipt_url = :url) AS inv_refs`,
    { replacements: { url }, type: QueryTypes.SELECT }
  );
  return Number(row.po_refs) + Number(row.inv_refs) > 0;
}

/**
 * @returns {Promise<'deleted'|'kept'|'missing'|'skipped'>}
 */
async function removePoFileIfUnused(url) {
  const filePath = attachmentPathOf(url);
  if (!filePath) return 'skipped';
  try {
    if (await stillReferenced(url)) return 'kept';
    await fs.unlink(filePath);
    return 'deleted';
  } catch (e) {
    if (e && e.code === 'ENOENT') return 'missing';
    console.error('removePoFileIfUnused error:', e.message);
    return 'kept';
  }
}

module.exports = { removePoFileIfUnused, attachmentPathOf };

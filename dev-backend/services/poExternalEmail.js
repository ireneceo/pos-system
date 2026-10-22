/**
 * 계정 없는 외부 공급업체에게 발주서 메일 보내기 — 한 함수 (2026-10-22 Fable 설계 recurring-po §5).
 * `POST /purchase-orders/:id/send-external-email`(사람이 누름)과 정기 발주 스케줄러·오너 승인(자동)이 같은 길을 쓴다.
 * 언어 'en' 고정 — 계정이 없어 수신자 언어 축이 없다. 발송은 sendPlatformEmail(placeholder/미인증·바운스 가드 그대로).
 *
 * @returns {Promise<{sent:boolean, to?:string, reason?:string, code?:string}>}
 *   code: NOT_SUPPLIER · SUPPLIER_NOT_FOUND · HAS_ACCOUNT · NO_EMAIL · GUARD(가드가 막음 — reason)
 *   보내졌으면 po.tracking_info 에 기록을 남기고 저장한다.
 */
async function sendExternalPoEmail(po) {
  const { appendTrackingEvent } = require('./poRealtimeService');
  if (po.seller_type !== 'supplier' || !po.seller_entity_id) {
    return { sent: false, code: 'NOT_SUPPLIER', reason: 'External email is only for supplier orders' };
  }
  const SupplierCompany = require('../models/SupplierCompany');
  const sc = await SupplierCompany.findByPk(po.seller_entity_id);
  if (!sc) return { sent: false, code: 'SUPPLIER_NOT_FOUND', reason: 'Supplier not found' };
  if (sc.owner_id) {
    return { sent: false, code: 'HAS_ACCOUNT', reason: 'This supplier has an account — they are notified in the app' };
  }
  if (!sc.email) return { sent: false, code: 'NO_EMAIL', reason: 'Supplier has no email address on file' };

  // 구매자 표시명 — 판매자/구매자 신원 단일 소스 규칙과 같은 계열
  let buyerName = 'A buyer';
  try {
    const { resolveBuyerName } = require('./poNotifications');
    if (typeof resolveBuyerName === 'function') buyerName = await resolveBuyerName(po);
  } catch (_) { /* keep default */ }

  const { poExternalSendEmail } = require('../utils/notificationTemplates');
  const { loadPoEmailItems } = require('../utils/poEmailItems');
  const mail = poExternalSendEmail({
    buyerName,
    poNumber: po.po_number,
    total: po.total_amount,
    currency: po.currency || 'MYR',
    items: await loadPoEmailItems(po.id)
  }, 'en');

  const { sendPlatformEmail } = require('../utils/emailService');
  const result = await sendPlatformEmail({ to: sc.email, subject: mail.subject, html: mail.html, text: mail.text });

  // 가드에 걸려 안 나갔으면 그대로 알린다 — "보냈다" 고 거짓말하지 않는다.
  // (바운스 차단은 skipped 가 아니라 blocked/success:false 로 온다 — 옛 라우트는 이걸 «보냄» 으로 셌다)
  if (!result || result.skipped || result.blocked || result.success === false) {
    return { sent: false, code: 'GUARD', reason: (result && (result.reason || result.message)) || 'not sent', to: sc.email };
  }

  // (옛 라우트는 appendTrackingEvent 반환값을 버려 기록이 안 남았다 — 이벤트 칸으로 남긴다)
  po.tracking_info = appendTrackingEvent(po, po.status, `Purchase order emailed to ${sc.email}`, null, { source: 'system_email' });
  await po.save();
  return { sent: true, to: sc.email };
}

module.exports = { sendExternalPoEmail };

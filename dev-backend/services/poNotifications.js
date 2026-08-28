/**
 * 발주(PO) 알림 — submit/승인/반려 단일 소스 (2026-06-21 추출)
 *
 * 기존 purchase-orders-workflow.js 인라인 함수를 공유 모듈로 옮겨
 * 승인 라우터(purchase-orders-approval.js)와 재사용. 모든 함수는 throw 하지 않음
 * (알림 실패가 PO 상태전이를 막지 않음).
 */
const FRONTEND_URL = process.env.FRONTEND_URL || (process.env.NODE_ENV === 'production' ? 'https://purplehere.com' : 'https://dev.purplehere.com');
const {
  sendNotificationBatch,
  getSupplierAdminIds, getBrandManagerIds, getFoodcourtManagerIds, getRestaurantOwnerIds
} = require('../utils/notificationService');

async function resolveBuyerName(po) {
  let buyerName = 'A buyer';
  try {
    const Restaurant = require('../models/Restaurant');
    const Brand = require('../models/Brand');
    const Foodcourt = require('../models/Foodcourt');
    if (po.entity_type === 'restaurant') {
      const r = await Restaurant.findByPk(po.entity_id, { attributes: ['name'] });
      if (r?.name) buyerName = r.name;
    } else if (po.entity_type === 'brand') {
      const b = await Brand.findByPk(po.entity_id, { attributes: ['name'] });
      if (b?.name) buyerName = b.name;
    } else if (po.entity_type === 'foodcourt') {
      const f = await Foodcourt.findByPk(po.entity_id, { attributes: ['name'] });
      if (f?.name) buyerName = f.name;
    }
  } catch (_) { /* keep default */ }
  return buyerName;
}

/** 새 발주가 판매자에게 제출됨 — 판매자(Supplier/Brand/Foodcourt) 통지. */
async function fireSellerSubmittedNotification(po) {
  try {
    let userIds = [];
    if (po.seller_type === 'supplier' && po.seller_entity_id) {
      userIds = await getSupplierAdminIds(po.seller_entity_id);
    } else if (po.seller_type === 'brand' && po.seller_entity_id) {
      userIds = await getBrandManagerIds(po.seller_entity_id);
    } else if (po.seller_type === 'foodcourt' && po.seller_entity_id) {
      userIds = await getFoodcourtManagerIds(po.seller_entity_id);
    }
    if (userIds.length === 0) return;
    const buyerName = await resolveBuyerName(po);
    const { sellerOrderReceivedEmail } = require('../utils/notificationTemplates');
    const { loadPoEmailItems } = require('../utils/poEmailItems');
    const mail = sellerOrderReceivedEmail({
      buyerName,
      poNumber: po.po_number,
      total: po.total_amount,
      currency: po.currency || 'MYR',
      link: `${FRONTEND_URL}/pos/seller-orders`,
      items: await loadPoEmailItems(po.id)
    });
    await sendNotificationBatch(userIds, 'seller_order_received', mail);
  } catch (e) {
    console.error('[poNotifications] fireSellerSubmittedNotification error:', e.message);
  }
}

/** 레스토랑 발주가 오너 승인 대기 — 연결된 오너 통지. */
async function fireOwnerApprovalPendingNotification(po) {
  try {
    if (po.entity_type !== 'restaurant') return;
    const ownerIds = await getRestaurantOwnerIds(po.entity_id);
    if (!ownerIds.length) return;
    const buyerName = await resolveBuyerName(po);
    const { poApprovalPendingEmail } = require('../utils/notificationTemplates');
    const { loadPoEmailItems } = require('../utils/poEmailItems');
    const mail = poApprovalPendingEmail({
      buyerName,
      poNumber: po.po_number,
      total: po.total_amount,
      currency: po.currency || 'MYR',
      link: `${FRONTEND_URL}/pos/owner/po-approvals`,
      items: await loadPoEmailItems(po.id)
    });
    await sendNotificationBatch(ownerIds, 'po_approval_pending', mail);
  } catch (e) {
    console.error('[poNotifications] fireOwnerApprovalPendingNotification error:', e.message);
  }
}

/** 오너가 발주를 승인/반려 — 발주 작성자에게 결과 통지. */
async function fireOwnerApprovalResultNotification(po, { approved, reason }) {
  try {
    if (!po.created_by_user_id) return;
    const { poApprovalResultEmail } = require('../utils/notificationTemplates');
    const mail = poApprovalResultEmail({
      poNumber: po.po_number,
      approved: !!approved,
      reason: reason || '',
      currency: po.currency || 'MYR',
      total: po.total_amount,
      link: `${FRONTEND_URL}/pos/purchase-orders/history`
    });
    await sendNotificationBatch([po.created_by_user_id], 'po_approval_result', mail);
  } catch (e) {
    console.error('[poNotifications] fireOwnerApprovalResultNotification error:', e.message);
  }
}

module.exports = {
  fireSellerSubmittedNotification,
  fireOwnerApprovalPendingNotification,
  fireOwnerApprovalResultNotification
};

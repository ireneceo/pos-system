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
    const items = await loadPoEmailItems(po.id);
    const args = {
      buyerName,
      poNumber: po.po_number,
      total: po.total_amount,
      currency: po.currency || 'MYR',
      link: `${FRONTEND_URL}/pos/seller-orders`,
      items
    };
    // 팩토리 전달 — 수신자마다 자기 언어로 렌더된다(2026-08-30).
    // 예전엔 본문을 수신자 모른 채 1개 만들어 N명에게 그대로 보냈다 → 언어 고정이었다.
    await sendNotificationBatch(userIds, 'seller_order_received',
      (user) => sellerOrderReceivedEmail(args, user.preferred_language || 'en'));
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
    const args = {
      buyerName,
      poNumber: po.po_number,
      total: po.total_amount,
      currency: po.currency || 'MYR',
      link: `${FRONTEND_URL}/pos/owner/po-approvals`,
      items: await loadPoEmailItems(po.id)
    };
    await sendNotificationBatch(ownerIds, 'po_approval_pending',
      (user) => poApprovalPendingEmail(args, user.preferred_language || 'en'));
  } catch (e) {
    console.error('[poNotifications] fireOwnerApprovalPendingNotification error:', e.message);
  }
}

/** 오너가 발주를 승인/반려 — 발주 작성자에게 결과 통지. */
async function fireOwnerApprovalResultNotification(po, { approved, reason }) {
  try {
    if (!po.created_by_user_id) return;
    const { poApprovalResultEmail } = require('../utils/notificationTemplates');
    const { loadPoEmailItems } = require('../utils/poEmailItems');
    const args = {
      poNumber: po.po_number,
      approved: !!approved,
      reason: reason || '',
      currency: po.currency || 'MYR',
      total: po.total_amount,
      link: `${FRONTEND_URL}/pos/purchase-orders/history`,
      items: await loadPoEmailItems(po.id)   // 2026-08-30: 같은 가족 중 여기만 품목표가 없었다
    };
    await sendNotificationBatch([po.created_by_user_id], 'po_approval_result',
      (user) => poApprovalResultEmail(args, user.preferred_language || 'en'));
  } catch (e) {
    console.error('[poNotifications] fireOwnerApprovalResultNotification error:', e.message);
  }
}

/**
 * 구매자에게 "발주가 나갔습니다" 확인 통지 (2026-08-30 신설).
 * 그전까지 구매자는 자기 발주에 대해 **아무 메일도 받지 못했다** — 판매자·오너만 받았다.
 */
async function fireBuyerConfirmNotification(po) {
  try {
    if (!po.created_by_user_id) return;
    const { poBuyerConfirmEmail } = require('../utils/notificationTemplates');
    const { loadPoEmailItems } = require('../utils/poEmailItems');
    // 판매자 표시명은 단일 소스 경유 — 라우트가 Brand.name 을 직접 읽으면 회사명 대신 브랜드명이 뜬다.
    let sellerName = '—';
    try {
      const { resolveSellers, getSellerName } = require('../utils/sellerNames');
      const map = await resolveSellers([{ seller_type: po.seller_type, seller_entity_id: po.seller_entity_id }]);
      sellerName = getSellerName(map, po.seller_type, po.seller_entity_id) || '—';
    } catch (_) { /* keep default */ }
    const args = {
      sellerName,
      poNumber: po.po_number,
      total: po.total_amount,
      currency: po.currency || 'MYR',
      link: `${FRONTEND_URL}/pos/purchase-orders/history`,
      items: await loadPoEmailItems(po.id)
    };
    await sendNotificationBatch([po.created_by_user_id], 'po_buyer_confirm',
      (user) => poBuyerConfirmEmail(args, user.preferred_language || 'en'));
  } catch (e) {
    console.error('[poNotifications] fireBuyerConfirmNotification error:', e.message);
  }
}

module.exports = {
  resolveBuyerName,
  fireSellerSubmittedNotification,
  fireBuyerConfirmNotification,
  fireOwnerApprovalPendingNotification,
  fireOwnerApprovalResultNotification
};

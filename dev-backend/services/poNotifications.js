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

/**
 * 구매자가 수령을 확인했다 — **판매자**에게 통지 (2026-09-01 · Q6).
 * fireSellerSubmittedNotification 의 판매자 방향 미러. 계정이 없는 외부 공급업체는 건너뛴다
 * (userIds 가 비면 조용히 종료 — 그쪽은 왓츠앱/메일 수동 경로다).
 */
async function fireBuyerReceivedNotification(po) {
  try {
    let userIds = [];
    if (po.seller_type === 'supplier' && po.seller_entity_id) {
      userIds = await getSupplierAdminIds(po.seller_entity_id);
    } else if (po.seller_type === 'brand' && po.seller_entity_id) {
      userIds = await getBrandManagerIds(po.seller_entity_id);
    } else if (po.seller_type === 'foodcourt' && po.seller_entity_id) {
      userIds = await getFoodcourtManagerIds(po.seller_entity_id);
    }
    if (userIds.length === 0) {
      // 계정 없는 외부 공급업체 — 조용히 끝내되 "왜 안 갔는지"는 남긴다
      console.log(`[notify] buyer_received po=${po.po_number} seller=${po.seller_type}:${po.seller_entity_id} recipients=none`);
      return;
    }
    const buyerName = await resolveBuyerName(po);
    const { buyerReceivedEmail } = require('../utils/notificationTemplates');
    const { loadPoEmailItems } = require('../utils/poEmailItems');
    const items = await loadPoEmailItems(po.id);
    const args = {
      buyerName,
      poNumber: po.po_number,
      total: po.total_amount,
      currency: po.currency || 'MYR',
      link: `${FRONTEND_URL}/pos/seller-orders`,
      items,
      alreadyShipped: !!po.shipped_at,
    };
    // 발송 추적 로그 — 이 시스템은 알림 행을 남기지 않고 메일만 보낸다(알림 테이블 없음).
    // 어느 발주가 누구에게 나갔는지 사후에 확인할 방법이 아예 없어서 한 줄 남긴다.
    // 개인정보는 넣지 않는다(사용자 id 만).
    console.log(`[notify] buyer_received po=${po.po_number} seller=${po.seller_type}:${po.seller_entity_id} recipients=${userIds.length ? userIds.join(',') : 'none'}`);
    await sendNotificationBatch(userIds, 'buyer_received',
      (user) => buyerReceivedEmail(args, user.preferred_language || 'en'));
  } catch (e) {
    console.error('[poNotifications] fireBuyerReceivedNotification error:', e.message);
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
  fireOwnerApprovalResultNotification,
  fireBuyerReceivedNotification,
};

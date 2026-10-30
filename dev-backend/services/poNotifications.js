/**
 * 발주(PO) 알림 — submit/승인/반려 단일 소스 (2026-06-21 추출)
 *
 * 기존 purchase-orders-workflow.js 인라인 함수를 공유 모듈로 옮겨
 * 승인 라우터(purchase-orders-approval.js)와 재사용. 모든 함수는 throw 하지 않음
 * (알림 실패가 PO 상태전이를 막지 않음).
 */
const {
  sendNotificationBatch,
  getEntityAddressees, getRestaurantAddressees, getUserAddressee
} = require('../utils/notificationService');
const { mailFor } = require('../utils/notificationAddressee');
const { goLink } = require('../utils/notificationLinks');

/**
 * 판매자 자리 수신자 + 자격 (2026-10-22 notification-addressee) — 집합은 예전 getter 와 같다
 * (공급업체 → getSupplierAdminIds · 브랜드 → getBrandManagerIds · 푸드코트 → getFoodcourtManagerIds).
 */
async function sellerAddressees(po) {
  if (!po || !po.seller_entity_id) return [];
  if (!['supplier', 'brand', 'foodcourt'].includes(po.seller_type)) return [];
  return getEntityAddressees(po.seller_type, po.seller_entity_id);
}

/**
 * 이 메일의 머리글을 **누구 이름으로** 낼지 (2026-09-15 Irene 「이메일 위에 브랜드명 바꿔」).
 *
 * 판매자에게 가는 메일은 **그 거래의 판매자 자리**가 주인공이다. 수신자의 `users.brand_id`
 * 한 축으로 잡으면 브랜드를 여러 개 가진 사람에게 엉뚱한 브랜드 이름이 붙는다
 * (운영 실측: PO-R8-20260914-001 은 양쪽 다 브랜드 2 인데 머리글은 브랜드 1 「with MIN」).
 * `supplier`·`system_admin` 은 머리글 자료가 없으므로 넘기지 않는다 → 기존 규칙 그대로.
 */
function sellerBrandingEntity(po) {
  if (!po || !po.seller_entity_id) return undefined;
  if (po.seller_type === 'brand' || po.seller_type === 'foodcourt') {
    return { type: po.seller_type, id: parseInt(po.seller_entity_id, 10) };
  }
  return undefined;
}

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
    const list = await sellerAddressees(po);
    const userIds = list.map(r => r.id);
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
      items
    };
    // 팩토리 전달 — 수신자마다 자기 언어로 렌더된다(2026-08-30).
    // 2026-10-22: 수신자마다 자격(브랜드/브랜드 담당자/공급업체)과 그 자격 화면 버튼.
    //   spread 대신 Object.assign — spread 는 재렌더 메타(_title/_body, 비열거)를 지운다.
    const _brandingEntity = sellerBrandingEntity(po);
    await sendNotificationBatch(userIds, 'seller_order_received', mailFor(list, (a, user) =>
      Object.assign(sellerOrderReceivedEmail({ ...args, link: goLink(a, 'seller_orders') }, user.preferred_language || 'en'), { _brandingEntity })));
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
    const list = await sellerAddressees(po);
    const userIds = list.map(r => r.id);
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
      items,
      alreadyShipped: !!po.shipped_at,
    };
    // 발송 추적 로그 — 이 시스템은 알림 행을 남기지 않고 메일만 보낸다(알림 테이블 없음).
    // 어느 발주가 누구에게 나갔는지 사후에 확인할 방법이 아예 없어서 한 줄 남긴다.
    // 개인정보는 넣지 않는다(사용자 id 만).
    console.log(`[notify] buyer_received po=${po.po_number} seller=${po.seller_type}:${po.seller_entity_id} recipients=${userIds.length ? userIds.join(',') : 'none'}`);
    const _brandingEntity = sellerBrandingEntity(po);
    await sendNotificationBatch(userIds, 'buyer_received', mailFor(list, (a, user) =>
      Object.assign(buyerReceivedEmail({ ...args, link: goLink(a, 'seller_orders') }, user.preferred_language || 'en'), { _brandingEntity })));
  } catch (e) {
    console.error('[poNotifications] fireBuyerReceivedNotification error:', e.message);
  }
}

/** 레스토랑 발주가 오너 승인 대기 — 연결된 오너 통지. */
async function fireOwnerApprovalPendingNotification(po) {
  try {
    if (po.entity_type !== 'restaurant') return;
    // 오너 전원(집합 = getRestaurantOwnerIds) · 자격 «{매장} · 오너»
    const list = (await getRestaurantAddressees(po.entity_id)).filter(r => r.addressee.kind === 'owner');
    const ownerIds = list.map(r => r.id);
    if (!ownerIds.length) return;
    const buyerName = await resolveBuyerName(po);
    const { poApprovalPendingEmail } = require('../utils/notificationTemplates');
    const { loadPoEmailItems } = require('../utils/poEmailItems');
    const args = {
      buyerName,
      poNumber: po.po_number,
      total: po.total_amount,
      currency: po.currency || 'MYR',
      items: await loadPoEmailItems(po.id)
    };
    await sendNotificationBatch(ownerIds, 'po_approval_pending', mailFor(list, (a, user) =>
      poApprovalPendingEmail({ ...args, link: goLink(a, 'po_approvals') }, user.preferred_language || 'en')));
  } catch (e) {
    console.error('[poNotifications] fireOwnerApprovalPendingNotification error:', e.message);
  }
}

/** 오너가 발주를 승인/반려 — 발주 작성자에게 결과 통지. */
async function fireOwnerApprovalResultNotification(po, { approved, revoked = false, reason }) {
  try {
    if (!po.created_by_user_id) return;
    const { poApprovalResultEmail } = require('../utils/notificationTemplates');
    const { loadPoEmailItems } = require('../utils/poEmailItems');
    // 승인됐어도 외부 공급업체에는 시스템이 보내지 않는다 — «판매자에게 전달됨» 거짓 문구 방지
    let isExternal = false;
    if (approved || revoked) {
      try {
        const { resolveSellers, isExternalSeller } = require('../utils/sellerNames');
        const map = await resolveSellers([{ seller_type: po.seller_type, seller_entity_id: po.seller_entity_id }]);
        isExternal = isExternalSeller(map, po.seller_type, po.seller_entity_id);
      } catch (_) { /* keep default */ }
    }
    const args = {
      poNumber: po.po_number,
      approved: !!approved,
      revoked: !!revoked,
      isExternal,
      reason: reason || '',
      currency: po.currency || 'MYR',
      total: po.total_amount,
      items: await loadPoEmailItems(po.id)   // 2026-08-30: 같은 가족 중 여기만 품목표가 없었다
    };
    // 작성자 자격 = 그 발주의 구매자 자리 + 작성자 역할(매장 관리자/직원/브랜드…)
    const a = await getUserAddressee(po.created_by_user_id, po.entity_type, po.entity_id);
    await sendNotificationBatch([po.created_by_user_id], 'po_approval_result', mailFor([{ id: po.created_by_user_id, addressee: a }], (ad, user) =>
      poApprovalResultEmail({ ...args, link: goLink(ad, 'po_detail', { poId: po.id }) }, user.preferred_language || 'en')));
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
    let isExternal = false;
    try {
      const { resolveSellers, getSellerName, isExternalSeller } = require('../utils/sellerNames');
      const map = await resolveSellers([{ seller_type: po.seller_type, seller_entity_id: po.seller_entity_id }]);
      sellerName = getSellerName(map, po.seller_type, po.seller_entity_id) || '—';
      isExternal = isExternalSeller(map, po.seller_type, po.seller_entity_id);
    } catch (_) { /* keep default */ }
    const args = {
      sellerName,
      isExternal,
      poNumber: po.po_number,
      total: po.total_amount,
      currency: po.currency || 'MYR',
      items: await loadPoEmailItems(po.id)
    };
    const a = await getUserAddressee(po.created_by_user_id, po.entity_type, po.entity_id);
    await sendNotificationBatch([po.created_by_user_id], 'po_buyer_confirm', mailFor([{ id: po.created_by_user_id, addressee: a }], (ad, user) =>
      poBuyerConfirmEmail({ ...args, link: goLink(ad, 'po_detail', { poId: po.id }) }, user.preferred_language || 'en')));
  } catch (e) {
    console.error('[poNotifications] fireBuyerConfirmNotification error:', e.message);
  }
}

/**
 * 구매자(매장)가 보낸 뒤 발주 품목을 고쳤다 — **판매자**에게 통지 (2026-10-15 Fable 설계 buyer-po-edit §6).
 * 판매자 → 구매자 amend 메일(routes/seller-orders.js)과 같은 표(품목·변경·전·후) · 'en' 고정(그 메일과 같은 수준).
 * 승인 대기로 들어간 수정은 호출하지 않는다(판매자에게 아직 없는 주문 — 승인 뒤 approve 라우트가 통지).
 * 계정 없는 외부 공급업체는 수신자 0 → 조용히 끝(화면이 WhatsApp/Email 수동 재전송을 안내).
 */
async function fireSellerAmendedByBuyerNotification(po, { changes = [], reason = null, totalBefore = 0, totalAfter = 0 } = {}) {
  try {
    const list = await sellerAddressees(po);
    const userIds = list.map(r => r.id);
    if (userIds.length === 0) {
      console.log(`[notify] buyer_amended po=${po.po_number} seller=${po.seller_type}:${po.seller_entity_id} recipients=none`);
      return;
    }
    const { wrapTemplate, withRenderMeta, ctaButton } = require('../utils/notificationTemplates');
    const { currencySymbol } = require('../utils/currency');
    const esc = (v) => String(v == null ? '' : v).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const buyerName = await resolveBuyerName(po);
    const sym = currencySymbol(po.currency);
    const money = (n) => `${sym} ${(parseFloat(n) || 0).toFixed(2)}`;
    const label = { added: 'Added', removed: 'Removed', changed: 'Changed' };
    const rows = changes.map((c) => {
      const name = (c.after || c.before || {}).name || '-';
      const was = c.before ? `${c.before.quantity} ${c.before.unit || ''} × ${money(c.before.unit_price)}` : '—';
      const now = c.after ? `${c.after.quantity} ${c.after.unit || ''} × ${money(c.after.unit_price)}` : '—';
      return `<tr>
        <td style="padding:8px 10px;border-bottom:1px solid #E5E7EB;font-size:13px;color:#374151;">${esc(name)}</td>
        <td style="padding:8px 10px;border-bottom:1px solid #E5E7EB;font-size:12px;color:#6B7280;">${label[c.type] || esc(c.type)}</td>
        <td style="padding:8px 10px;border-bottom:1px solid #E5E7EB;font-size:13px;color:#9CA3AF;">${esc(was)}</td>
        <td style="padding:8px 10px;border-bottom:1px solid #E5E7EB;font-size:13px;color:#111827;font-weight:600;">${esc(now)}</td>
      </tr>`;
    }).join('');
    const title = 'Order Edited by Buyer';
    const bodyFor = (link) => `<p style="color:#374151;font-size:16px;margin:0 0 16px;"><strong>${esc(buyerName || 'The buyer')}</strong> edited purchase order <strong>${esc(po.po_number)}</strong> before you confirmed it.</p>
       <table style="width:100%;border-collapse:collapse;margin:0 0 20px;">
         <thead><tr>
           <th style="text-align:left;padding:8px 10px;border-bottom:2px solid #D1D5DB;font-size:12px;color:#6B7280;">Item</th>
           <th style="text-align:left;padding:8px 10px;border-bottom:2px solid #D1D5DB;font-size:12px;color:#6B7280;">Change</th>
           <th style="text-align:left;padding:8px 10px;border-bottom:2px solid #D1D5DB;font-size:12px;color:#6B7280;">Before</th>
           <th style="text-align:left;padding:8px 10px;border-bottom:2px solid #D1D5DB;font-size:12px;color:#6B7280;">After</th>
         </tr></thead>
         <tbody>${rows}</tbody>
       </table>
       <p style="color:#374151;font-size:14px;margin:0 0 20px;">Order total: <span style="color:#9CA3AF;">${money(totalBefore)}</span> → <strong>${money(totalAfter)}</strong></p>
       ${reason ? `<div style="background:#F9FAFB;border-left:4px solid #635BFF;padding:16px;margin:0 0 24px;border-radius:0 8px 8px 0;">
         <p style="color:#4B5563;font-size:13px;font-weight:600;margin:0 0 6px;">Reason</p>
         <p style="color:#374151;font-size:14px;margin:0;">${esc(String(reason).slice(0, 600))}</p>
       </div>` : ''}
       ${ctaButton('Review Order', link)}`;
    const _brandingEntity = sellerBrandingEntity(po);
    await sendNotificationBatch(userIds, 'seller_order_received', mailFor(list, (a) => {
      const body = bodyFor(goLink(a, 'seller_orders'));
      return Object.assign(withRenderMeta({
        subject: `Review changes: ${po.po_number} · edited by ${buyerName || 'the buyer'}`,
        html: wrapTemplate(title, body, 'en'),
        text: `${buyerName || 'The buyer'} edited purchase order ${po.po_number}. Total ${money(totalBefore)} → ${money(totalAfter)}.${reason ? ` Reason: ${reason}` : ''}`
      }, title, body, 'en', { action: { state: 'action', key: 'review_changes' } }), { _brandingEntity });
    }));
  } catch (e) {
    console.error('[poNotifications] fireSellerAmendedByBuyerNotification error:', e.message);
  }
}

/**
 * 오너가 승인을 취소했다 — **가입 판매자**에게 «이 주문은 다시 승인 대기, 처리하지 말 것» 통지
 * (2026-10-22 Fable 설계 owner-po-approval-revoke §1-2). 수신자 해석·'en' 고정은 위 buyer-amended 메일과 같다.
 * 외부 공급업체는 호출부가 부르지 않는다(계정 없음).
 */
async function fireSellerApprovalRevokedNotification(po) {
  try {
    const list = await sellerAddressees(po);
    const userIds = list.map(r => r.id);
    if (userIds.length === 0) {
      console.log(`[notify] approval_revoked po=${po.po_number} seller=${po.seller_type}:${po.seller_entity_id} recipients=none`);
      return;
    }
    const { wrapTemplate, withRenderMeta, ctaButton } = require('../utils/notificationTemplates');
    const esc = (v) => String(v == null ? '' : v).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const buyerName = await resolveBuyerName(po);
    const title = 'Order Withdrawn for Re-approval';
    const _brandingEntity = sellerBrandingEntity(po);
    await sendNotificationBatch(userIds, 'seller_order_received', mailFor(list, (a) => {
      const body = `<p style="color:#374151;font-size:16px;margin:0 0 16px;"><strong>${esc(buyerName || 'The buyer')}</strong> withdrew purchase order <strong>${esc(po.po_number)}</strong> pending owner re-approval.</p>
       ${ctaButton('View Orders', goLink(a, 'seller_orders'))}`;
      return Object.assign(withRenderMeta({
        subject: `On hold: ${po.po_number} · withdrawn for re-approval`,
        html: wrapTemplate(title, body, 'en'),
        text: `${buyerName || 'The buyer'} withdrew purchase order ${po.po_number} pending owner re-approval — do not fulfil it until it is re-sent.`
      }, title, body, 'en', { action: { state: 'action', key: 'do_not_fulfil_on_hold' } }), { _brandingEntity });
    }));
  } catch (e) {
    console.error('[poNotifications] fireSellerApprovalRevokedNotification error:', e.message);
  }
}

/**
 * 배송 완료 뒤 3일 안에 «받았어요» 가 없어 서버가 완료했다 (2026-10-30 po-auto-complete §2-4).
 *   판매자: 기존 «구매자 수령» 메일에 auto 표시(카테고리 buyer_received 그대로).
 *   구매자: 자동 완료·재고 반영 안내(카테고리 seller_order_received — 구매자 쪽 발주 알림).
 * 계정 없는 외부 공급업체는 판매자 수신자 0 → 조용히 건너뜀. throw 하지 않는다.
 */
async function fireAutoReceivedNotifications(po) {
  const { loadPoEmailItems } = require('../utils/poEmailItems');
  let items = [];
  try { items = await loadPoEmailItems(po.id); } catch (_) { /* 품목 표 없이 */ }
  // 판매자
  try {
    const list = await sellerAddressees(po);
    const userIds = list.map(r => r.id);
    console.log(`[notify] buyer_received(auto) po=${po.po_number} seller=${po.seller_type}:${po.seller_entity_id} recipients=${userIds.length ? userIds.join(',') : 'none'}`);
    if (userIds.length) {
      const buyerName = await resolveBuyerName(po);
      const { buyerReceivedEmail } = require('../utils/notificationTemplates');
      const args = { buyerName, poNumber: po.po_number, total: po.total_amount, currency: po.currency || 'MYR', items, alreadyShipped: true, auto: true };
      const _brandingEntity = sellerBrandingEntity(po);
      await sendNotificationBatch(userIds, 'buyer_received', mailFor(list, (a, user) =>
        Object.assign(buyerReceivedEmail({ ...args, link: goLink(a, 'seller_orders') }, user.preferred_language || 'en'), { _brandingEntity })));
    }
  } catch (e) {
    console.error('[poNotifications] fireAutoReceivedNotifications(seller) error:', e.message);
  }
  // 구매자
  try {
    let list = [];
    if (po.entity_type === 'restaurant') list = await getRestaurantAddressees(po.entity_id);
    else if (po.entity_type === 'brand' || po.entity_type === 'foodcourt') list = await getEntityAddressees(po.entity_type, po.entity_id);
    const userIds = list.map(r => r.id);
    console.log(`[notify] po_auto_completed po=${po.po_number} buyer=${po.entity_type}:${po.entity_id} recipients=${userIds.length ? userIds.join(',') : 'none'}`);
    if (!userIds.length) return;
    let sellerName = '—';
    try {
      const { resolveSellers, getSellerName } = require('../utils/sellerNames');
      const map = await resolveSellers([{ seller_type: po.seller_type, seller_entity_id: po.seller_entity_id }]);
      sellerName = getSellerName(map, po.seller_type, po.seller_entity_id) || '—';
    } catch (_) { /* keep default */ }
    const { autoReceiveLabel } = require('./poAutoReceiveService');
    const completedAt = await autoReceiveLabel(po, po.received_at ? new Date(po.received_at) : new Date());
    const { poAutoCompletedEmail } = require('../utils/notificationTemplates');
    const args = { sellerName, poNumber: po.po_number, total: po.total_amount, currency: po.currency || 'MYR', items, completedAt };
    await sendNotificationBatch(userIds, 'seller_order_received', mailFor(list, (a, user) =>
      poAutoCompletedEmail({ ...args, link: goLink(a, 'po_detail', { poId: po.id }) }, user.preferred_language || 'en')));
  } catch (e) {
    console.error('[poNotifications] fireAutoReceivedNotifications(buyer) error:', e.message);
  }
}

module.exports = {
  fireAutoReceivedNotifications,
  fireSellerApprovalRevokedNotification,
  fireSellerAmendedByBuyerNotification,
  resolveBuyerName,
  fireSellerSubmittedNotification,
  fireBuyerConfirmNotification,
  fireOwnerApprovalPendingNotification,
  fireOwnerApprovalResultNotification,
  fireBuyerReceivedNotification,
};

/**
 * 판매자에게 이 발주가 보이는가 — 단일 판정 (2026-11-17 Fable 설계 «seller hold»,
 * docs/SELLER_ORDER_MANAGEMENT_SYSTEM.md «오너 승인 대기 중에도 판매자에게 남는 주문»).
 *
 * 계약: 판매자가 **한 번도 받은 적 없는** 승인 전 주문(draft · 첫 승인 대기)은 판매자에게 존재하지 않는다.
 *       이미 받은 주문이 다시 승인 대기로 간 것(판매자 인상 · 매장이 보낸 뒤 수정 · 오너 승인취소)은
 *       «오너 승인 대기» 로 보이되 판매자는 아무 동작도 못 한다(409 AWAITING_OWNER_APPROVAL).
 *
 * 판정은 tracking_info 이력에서 계산한다 — 새 컬럼·ENUM 없음. 쓰는 쪽(게이트 3개·승인 라우트)은 바뀌지 않는다.
 * 숨김 목록은 이 파일 하나(seller-orders · poRealtimeService · supplier 대시보드가 같이 읽는다).
 */
const SELLER_HIDDEN = ['draft', 'pending_approval'];

// purchase_orders.status ENUM 값(models/PurchaseOrder.js) — 이 밖의 이벤트 이름(amended·corrected 등)은 상태 변화가 아니다.
const PO_STATUSES = [
  'draft', 'pending_approval', 'submitted', 'confirmed', 'shipped', 'in_transit',
  'delivered', 'partial_received', 'received', 'cancelled', 'closed', 'delivery_failed'
];

function eventsOf(po) {
  let t = po && po.tracking_info;
  if (typeof t === 'string') { try { t = JSON.parse(t); } catch (_) { t = null; } }
  return (t && typeof t === 'object' && Array.isArray(t.events)) ? t.events : [];
}

/**
 * 이번 승인 대기가 «판매자에게 보이던 상태» 에서 시작했는가.
 * @returns {null | { cause, since, status_before, total_before, total_after }}
 */
function sellerHoldOf(po) {
  if (!po || po.status !== 'pending_approval') return null;
  const events = eventsOf(po);
  let start = null;
  for (let i = events.length - 1; i >= 0; i--) {
    const ev = events[i];
    if (!ev || !PO_STATUSES.includes(ev.status)) continue;      // amended 등 — 건너뜀
    if (ev.status === 'pending_approval') { start = ev; continue; } // 모으며 더 거슬러 감
    break;                                                         // 다른 상태 = 이번 대기의 앞
  }
  if (!start) return null;
  const before = start.status_before;
  if (!before || SELLER_HIDDEN.includes(before) || !PO_STATUSES.includes(before)) return null;
  const cause = start.raised_by_seller ? 'seller_raise'
    : start.edited_by_buyer ? 'buyer_edit'
      : start.approval_revoked ? 'owner_revoke'
        : 'other';
  return {
    cause,
    since: start.at || null,
    status_before: before,
    total_before: start.total_before != null ? Number(start.total_before) : null,
    total_after: start.total_after != null ? Number(start.total_after) : null
  };
}

function isVisibleToSeller(po) {
  if (!po) return false;
  return !SELLER_HIDDEN.includes(po.status) || !!sellerHoldOf(po);
}

/**
 * 판매자 동작 라우트 공용 가드. 주문을 읽은 직후(소유권 확인 뒤) 부른다.
 *   숨김이고 hold 아님 → 404 · hold → 409 AWAITING_OWNER_APPROVAL · 그 밖 → null(라우트의 기존 상태 검사)
 */
function sellerActionBlock(po) {
  if (!po || !SELLER_HIDDEN.includes(po.status)) return null;
  if (sellerHoldOf(po)) {
    return { http: 409, code: 'AWAITING_OWNER_APPROVAL', message: "This order is waiting for the buyer's owner to approve the change" };
  }
  return { http: 404, code: 'NOT_FOUND', message: 'Order not found' };
}

/** 가드를 Error 로 — 트랜잭션 안에서 throw 하고 catch 에서 sendSellerBlock 으로 응답한다. */
function sellerBlockError(po) {
  const b = sellerActionBlock(po);
  if (!b) return null;
  const e = new Error(b.message);
  e.code = b.code; e.http = b.http; e.sellerBlock = true;
  return e;
}

/** catch 맨 위에서: 가드 오류면 응답하고 true. */
function sendSellerBlock(res, err) {
  if (!err || !err.sellerBlock) return false;
  res.status(err.http).json({ success: false, code: err.code, message: err.message });
  return true;
}

/**
 * 목록·대시보드 where. 이 판매자의 승인 대기 주문만 읽어(소수) hold id 를 고르고 SQL 조건으로 넣는다
 * — 쪽수·건수가 SQL 로 정해지게(JS 뒤거르기 금지).
 * @param {object} baseWhere - 판매자 범위 where (seller_type·seller_entity_id)
 * @param {string|undefined} statusParam - 화면이 고른 상태 탭
 * @returns {Promise<{ where: object, holdIds: number[] }>}
 */
async function sellerVisibleWhere(baseWhere, statusParam) {
  const { Op } = require('sequelize');
  const { PurchaseOrder } = require('../models');
  const base = { ...(baseWhere || {}) };
  const waiting = await PurchaseOrder.findAll({
    where: { ...base, status: 'pending_approval' },
    attributes: ['id', 'status', 'tracking_info']
  });
  const holdIds = waiting.filter(p => sellerHoldOf(p)).map(p => p.id);
  const status = (statusParam && !SELLER_HIDDEN.includes(statusParam)) ? statusParam : null;
  let statusCond;
  if (!status) {
    statusCond = holdIds.length
      ? { [Op.or]: [{ status: { [Op.notIn]: SELLER_HIDDEN } }, { id: { [Op.in]: holdIds } }] }
      : { status: { [Op.notIn]: SELLER_HIDDEN } };
  } else if (status === 'submitted') {
    // hold 는 «새 주문» 자리 — 승인되면 어디서 왔든 submitted 로 돌아와 판매자가 다시 확인한다
    statusCond = holdIds.length
      ? { [Op.or]: [{ status: 'submitted' }, { id: { [Op.in]: holdIds } }] }
      : { status: 'submitted' };
  } else {
    statusCond = { status };
  }
  return { where: { [Op.and]: [base, statusCond] }, holdIds };
}

module.exports = {
  SELLER_HIDDEN, sellerHoldOf, isVisibleToSeller, sellerActionBlock,
  sellerBlockError, sendSellerBlock, sellerVisibleWhere
};

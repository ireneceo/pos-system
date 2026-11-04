/**
 * 발주 오너 승인 헬퍼 (2026-06-21, with MIN Cafe 발주관리 추가요청 #2)
 *
 * 레스토랑 발주를 연결된 Owner(restaurant_managers.relationship_type='ownership')가
 * 승인/반려한다. 오너 연결 시 기본 ON, operation_settings.requirePoOwnerApproval === false 면 OFF.
 *
 * ⚠ **발주가 판매자에게 나가는 경로는 세 곳**이다 — submit / bulk auto_submit /
 *   mark-sent-external(외부업체 수동전송). 셋 다 이 파일의 `applySubmitGate` 를 타야 한다.
 *   게이트를 라우트에 복붙하면 새 경로가 생길 때 조용히 우회된다(실제로 bulk·external 두 경로가
 *   승인 없이 발주를 내보내고 있었다 — Fable 2026-07-13).
 *   + 판매자가 총액을 **올리는** 수정(amend)도 같은 승인을 다시 받는다 — `applyAmendRaiseGate`
 *   (2026-10-15 Fable 설계 · 판매자 대리 주문 추가와 같은 길).
 */
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../config/database');

/** 이 유저가 ownership 관계로 소유한 restaurant_id 배열. */
//   t(선택) — 발주 트랜잭션 안에서 부를 때는 **반드시 넘긴다.** 안 넘기면 트랜잭션 연결을 쥔 채 풀에서
//   연결을 하나 더 달라고 해, 동시 제출이 풀 크기 이상이면 서로 기다리다 1분 뒤 전부 실패한다(2026-11-02 운영 멈춤).
async function resolveOwnerRestaurantIds(user, t) {
  if (!user) return [];
  const ids = new Set();
  const rows = await sequelize.query(
    `SELECT restaurant_id FROM restaurant_managers
     WHERE manager_id = :uid AND relationship_type = 'ownership'`,
    { replacements: { uid: user.id }, type: QueryTypes.SELECT, transaction: t });
  rows.forEach(r => ids.add(parseInt(r.restaurant_id, 10)));
  // 레거시 단일 할당
  if (user.role === 'Restaurant Owner' && user.restaurant_id) {
    ids.add(parseInt(user.restaurant_id, 10));
  }
  return [...ids];
}

/**
 * 이 요청자가 이 발주 매장의 오너(또는 System Admin)인가 — 매장 수정 차단(poAmend.buyerAmendBlock actorIsOwner)과
 * 수정 승인 게이트(applyBuyerAmendGate)가 같은 판정을 쓴다. 오너 «소유 매장으로 행동»(req.buyerIsOwnerView)도 오너.
 */
async function isOwnerActorForPo(po, req, t) {
  const user = req && req.user;
  if (!user || !po) return false;
  if (user.role === 'System Admin') return true;
  if (req.buyerIsOwnerView) return true;
  if (po.entity_type !== 'restaurant') return false;
  const owned = await resolveOwnerRestaurantIds(user, t);
  return owned.includes(parseInt(po.entity_id, 10));
}

/** 이 레스토랑에 연결된 오너(ownership)가 있는가. */
async function restaurantHasOwner(restaurantId, t) {
  const rows = await sequelize.query(
    `SELECT 1 AS x FROM restaurant_managers
     WHERE restaurant_id = :rid AND relationship_type = 'ownership' LIMIT 1`,
    { replacements: { rid: restaurantId }, type: QueryTypes.SELECT, transaction: t });
  return rows.length > 0;
}

/**
 * 이 레스토랑 발주에 오너 승인이 필요한가.
 * 오너 연결 AND operation_settings.requirePoOwnerApproval !== false (기본 ON).
 * @param {object} restaurant - operation_settings 포함 Restaurant 인스턴스
 */
async function isApprovalRequiredForRestaurant(restaurant) {
  if (!restaurant || !restaurant.id) return false;
  const hasOwner = await restaurantHasOwner(restaurant.id);
  if (!hasOwner) return false;
  const setting = restaurant.operation_settings && restaurant.operation_settings.requirePoOwnerApproval;
  return setting !== false; // 오너 연결 시 기본 ON, 명시적 false 만 OFF
}

/* ───────────── 승인 예외 규칙 (2026-11-01 Fable 설계 docs/PURCHASE_ORDER_SYSTEM.md §G-7) ─────────────
 * 오너가 «이건 묻지 말고 바로 보내» 라고 지정한 공급업체·재료 카테고리·품목.
 * 판정 순서: 판매자 규칙 → (아니면) **모든 줄**이 품목 규칙 또는 (재료 줄이면) 카테고리 규칙에 맞아야 예외.
 * 한 줄이라도 아니면 발주 전체 승인 대상(섞인 발주는 승인 쪽 · 자동 분할 없음 — §G-7-2).
 * 규칙 0개면 예전과 100% 같다.
 */
const TARGET_KEYS_FOR_RULE = ['ingredient_id', 'product_ingredient_id', 'product_id', 'brand_product_id'];

/** 줄 하나의 타깃 {key,id} — 넷 중 정확히 하나. 없고 ingredient_seller_product_id 만 있으면 매핑으로 푼다. 못 풀면 null. */
async function lineTarget(line, ispMap) {
  const hit = TARGET_KEYS_FOR_RULE.filter(k => line && line[k] != null && line[k] !== '' && Number(line[k]) > 0);
  if (hit.length === 1) return { key: hit[0], id: Number(line[hit[0]]) };
  if (hit.length === 0 && line && line.ingredient_seller_product_id) {
    const m = ispMap.get(Number(line.ingredient_seller_product_id));
    if (m) {
      const h2 = TARGET_KEYS_FOR_RULE.filter(k => m[k] != null && Number(m[k]) > 0);
      if (h2.length === 1) return { key: h2[0], id: Number(m[h2[0]]) };
    }
  }
  return null;
}

/**
 * 발주(또는 정기 발주 틀) 승인 판정 — 단일 소스.
 * @param {{restaurant:object|null, seller_type:string, seller_entity_id:number|null, lines:Array}} input
 *        restaurant = id·operation_settings 를 가진 Restaurant(레스토랑 구매자가 아니면 null)
 *        lines = 발주 줄(PurchaseOrderItem 또는 정기 발주 raw 줄). 줄 id 가 있으면 blocking_line_ids 에 담긴다.
 * @returns {Promise<{required:boolean, reason:string, blocking_line_ids:number[], blocking_lines:Array}>}
 */
async function evaluateApproval({ restaurant, seller_type, seller_entity_id, lines }, t) {
  const out = (required, reason, blocking = []) => ({
    required, reason,
    blocking_line_ids: blocking.map(b => b.id).filter(x => x != null),
    blocking_lines: blocking
  });
  if (!restaurant || !restaurant.id) return out(false, 'not_restaurant');
  if (!(await restaurantHasOwner(restaurant.id, t))) return out(false, 'no_owner');
  const master = restaurant.operation_settings && restaurant.operation_settings.requirePoOwnerApproval;
  if (master === false) return out(false, 'master_off');

  const PoApprovalExemption = require('../models/PoApprovalExemption');
  const rules = await PoApprovalExemption.findAll({
    where: { restaurant_id: restaurant.id },
    attributes: ['scope', 'seller_type', 'target_id'], raw: true, transaction: t
  });
  if (!rules.length) return out(true, 'required', (lines || []).map(l => ({ id: l.id ?? null, description: l.description || null })));

  // ① 판매자 규칙 — 발주 1건 = 판매자 1곳
  const sellerTarget = seller_entity_id == null ? 0 : Number(seller_entity_id);
  if (rules.some(r => r.scope === 'seller' && r.seller_type === seller_type && Number(r.target_id) === sellerTarget)) {
    return out(false, 'exempt_seller');
  }

  // ② 줄 규칙 — 모든 줄
  const list = Array.isArray(lines) ? lines : [];
  if (!list.length) return out(true, 'required');
  const ruleSet = (scope) => new Set(rules.filter(r => r.scope === scope).map(r => Number(r.target_id)));
  const catRules = ruleSet('ingredient_category');
  const ingRules = ruleSet('ingredient');
  const prodRules = ruleSet('product');

  const ispIds = list.filter(l => l && l.ingredient_seller_product_id && !TARGET_KEYS_FOR_RULE.some(k => l[k])).map(l => Number(l.ingredient_seller_product_id));
  const ispMap = new Map();
  if (ispIds.length) {
    const IngredientSellerProduct = require('../models/IngredientSellerProduct');
    const rows = await IngredientSellerProduct.findAll({ where: { id: ispIds }, attributes: ['id', ...TARGET_KEYS_FOR_RULE], raw: true, transaction: t });
    rows.forEach(r => ispMap.set(Number(r.id), r));
  }
  const targets = [];
  for (const l of list) targets.push(await lineTarget(l, ispMap));
  const ingIds = [...new Set(targets.filter(x => x && x.key === 'ingredient_id').map(x => x.id))];
  const catByIng = new Map();
  if (ingIds.length && catRules.size) {
    const Ingredient = require('../models/Ingredient');
    const rows = await Ingredient.findAll({ where: { id: ingIds }, attributes: ['id', 'ingredient_category_id'], raw: true, transaction: t, paranoid: false });
    rows.forEach(r => catByIng.set(Number(r.id), r.ingredient_category_id == null ? null : Number(r.ingredient_category_id)));
  }
  const blocking = [];
  list.forEach((l, i) => {
    const tg = targets[i];
    let exempt = false;
    if (tg && tg.key === 'ingredient_id') {
      const cat = catByIng.get(tg.id);
      exempt = ingRules.has(tg.id) || (cat != null && catRules.has(cat));
    } else if (tg && tg.key === 'product_id') {
      exempt = prodRules.has(tg.id);
    } // product_ingredient_id·brand_product_id·타깃 없음 → 예외 아님(fail-closed)
    if (!exempt) blocking.push({ id: l.id ?? null, description: l.description || null });
  });
  if (!blocking.length) return out(false, 'exempt_lines');
  return out(true, 'required', blocking);
}

/** 저장된 발주의 판정 — 줄을 **직접** 읽는다(호출부 중 po.items 를 안 싣는 곳이 있다 · §G-7-4 ①). */
async function evaluatePoApproval(po, t) {
  if (!po || po.entity_type !== 'restaurant') return { required: false, reason: 'not_restaurant', blocking_line_ids: [], blocking_lines: [] };
  const Restaurant = require('../models/Restaurant');
  const PurchaseOrderItem = require('../models/PurchaseOrderItem');
  const restaurant = await Restaurant.findByPk(po.entity_id, { attributes: ['id', 'operation_settings'], transaction: t });
  const lines = await PurchaseOrderItem.findAll({
    where: { purchase_order_id: po.id },
    attributes: ['id', 'description', ...TARGET_KEYS_FOR_RULE, 'ingredient_seller_product_id'],
    raw: true, transaction: t
  });
  return evaluateApproval({ restaurant, seller_type: po.seller_type, seller_entity_id: po.seller_entity_id, lines }, t);
}

/**
 * 발주를 판매자에게 내보내기 직전의 **단일 승인 게이트**.
 * 승인이 필요하면 PO 를 `pending_approval` 로, 아니면 `submitted` 로 확정한다.
 *
 * @param {object} po - PurchaseOrder 인스턴스(트랜잭션 안에서 잠근 것)
 * @param {object} t  - transaction
 * @param {function} appendTrackingEvent - 라우트가 쓰는 tracking 헬퍼(순환 require 회피용 주입)
 * @param {object} [actor] - 제출한 사람(req.user). **그 매장의 ownership 오너**면 승인 생략 — 승인자가 작성자다
 *          (2026-10-04 Fable 판정 owner-po-on-behalf ① §2-2). 구매자 쪽 경로만 넘긴다(판매자 대리 추가는 안 넘김).
 * @param {object} [opts] - { preApproved: { scheduleId, approvedByUserId, approvedAt } } — 정기 발주 틀을 오너가 이미 승인했고
 *          스케줄러가 허용폭 안이라고 판정한 경우(2026-10-22 Fable 설계 recurring-po §3-2). 승인이 필요한 매장이어도
 *          «승인을 거친 발주»(approval_required·approved_by·approved_at)로 기록하고 통과한다. 넘길지 말지는 호출부가 정한다.
 * @returns {Promise<boolean>} needsApproval — true 면 호출부는 **판매자 통지·seller-order-created 를
 *          내보내면 안 되고**, 대신 오너 승인 대기 통지를 보내야 한다.
 */
const { expectedDeliveryPatch } = require('./orderSchedule');

async function applySubmitGate(po, t, appendTrackingEvent, actor, opts = {}) {
  const Restaurant = require('../models/Restaurant');

  let needsApproval = false;
  let byOwner = false;
  let exemptKind = null;   // 'seller' | 'lines' — 예외 규칙으로 승인 생략(§G-7)
  if (po.entity_type === 'restaurant') {
    const verdict = await evaluatePoApproval(po, t);
    needsApproval = verdict.required;
    if (verdict.reason === 'exempt_seller') exemptKind = 'seller';
    else if (verdict.reason === 'exempt_lines') exemptKind = 'lines';
    if (needsApproval && actor) {
      const owned = await resolveOwnerRestaurantIds(actor, t);
      byOwner = owned.includes(parseInt(po.entity_id, 10));
      if (byOwner) needsApproval = false;
    }
  }

  const pre = opts && opts.preApproved;
  if (needsApproval && pre && pre.approvedByUserId) {
    const when = pre.approvedAt ? new Date(pre.approvedAt).toISOString().slice(0, 10) : '';
    const tracking = appendTrackingEvent(po, 'submitted',
      `Pre-approved by Owner via standing order #${pre.scheduleId}${when ? ` (approved ${when})` : ''}`,
      null, { owner_signed: true });
    await po.update({
      status: 'submitted',
      submitted_at: new Date(),
      // 예상 배송일 — 판매자에게 실제로 보내는 순간에만, 비어 있을 때만 (2026-10-27 Fable M-3 ④ · utils/orderSchedule.js)
      ...(await expectedDeliveryPatch(po)),
      approval_required: true,
      approved_by_user_id: pre.approvedByUserId,
      approved_at: new Date(),
      tracking_info: tracking
    }, { transaction: t });
    return false;
  }

  if (needsApproval) {
    const tracking = appendTrackingEvent(po, 'pending_approval', 'Awaiting Owner approval');
    await po.update({
      status: 'pending_approval',
      approval_required: true,
      tracking_info: tracking
    }, { transaction: t });
  } else {
    const tracking = byOwner
      ? appendTrackingEvent(po, 'submitted', 'Submitted by Owner (approval skipped)', null, { owner_signed: true })
      : exemptKind
        ? appendTrackingEvent(po, 'submitted',
          `Submitted (Owner approval skipped — ${exemptKind === 'seller' ? 'exempt supplier' : 'all items exempt'})`,
          null, { approval_exempt: exemptKind })
        : appendTrackingEvent(po, 'submitted');
    await po.update({
      status: 'submitted',
      submitted_at: new Date(),
      ...(await expectedDeliveryPatch(po)),
      tracking_info: tracking
    }, { transaction: t });
  }
  return needsApproval;
}

/** 이 발주의 구매 매장이 오너 승인을 요구하는가 (판매자 화면 안내·인상 수정 게이트가 같은 판정을 본다). */
async function isApprovalRequiredForPo(po, t) {
  if (!po || po.entity_type !== 'restaurant') return false;
  return (await evaluatePoApproval(po, t)).required;   // 예외 규칙 반영(§G-7-4 ①)
}

/**
 * 판매자가 총액을 올린 수정 뒤의 승인 게이트 (2026-10-15 Fable 설계 §2-2).
 * 오너 승인이 켜진 매장이면 `pending_approval` 로 되돌리고 true. 아니면 **상태를 건드리지 않고** false.
 * (`applySubmitGate` 를 쓰지 않는 이유: 그 함수는 승인이 필요 없을 때 submitted·submitted_at 을 다시 쓴다.)
 * 행위자 예외(오너가 작성자면 생략)는 없다 — 판매자 대리 주문 추가와 같다.
 */
async function applyAmendRaiseGate(po, t, appendTrackingEvent, { totalBefore, totalAfter, byUserId } = {}) {
  if (!(await isApprovalRequiredForPo(po, t))) return false;
  const tracking = appendTrackingEvent(
    po, 'pending_approval',
    `Awaiting Owner approval — seller raised the total ${(+totalBefore || 0).toFixed(2)} → ${(+totalAfter || 0).toFixed(2)}`,
    null,
    {
      raised_by_seller: true,
      status_before: po.status,
      total_before: totalBefore,
      total_after: totalAfter,
      by_user_id: byUserId || null
    }
  );
  await po.update({
    status: 'pending_approval',
    approval_required: true,
    tracking_info: tracking
  }, { transaction: t });
  return true;
}

/**
 * 구매자가 보낸 뒤 발주를 고쳤을 때의 승인 게이트 (2026-10-15 Fable 설계 buyer-po-edit §3-4).
 * 오너 승인 매장이면 인상·감량 불문 pending_approval(Irene «수정도 승인하게»). 행위자가 그 매장 ownership 오너면 생략
 * (applySubmitGate 와 같은 예외 — 승인자가 작성자). 아니면 상태를 건드리지 않고 false.
 * applyAmendRaiseGate(판매자·인상만) 와 다른 함수인 이유: 조건(전부 vs 인상)·행위자 예외(있음 vs 없음)가 다르다.
 */
async function applyBuyerAmendGate(po, t, appendTrackingEvent, { actor, totalBefore, totalAfter } = {}) {
  if (!(await isApprovalRequiredForPo(po, t))) return false;
  if (actor) {
    const owned = await resolveOwnerRestaurantIds(actor, t);
    if (owned.includes(parseInt(po.entity_id, 10))) return false;
  }
  const tracking = appendTrackingEvent(
    po, 'pending_approval',
    `Awaiting Owner approval — buyer edited the order ${(+totalBefore || 0).toFixed(2)} → ${(+totalAfter || 0).toFixed(2)}`,
    null,
    {
      edited_by_buyer: true,
      status_before: po.status,
      total_before: totalBefore,
      total_after: totalAfter,
      by_user_id: (actor && actor.id) || null
    }
  );
  await po.update({
    status: 'pending_approval',
    approval_required: true,
    tracking_info: tracking
  }, { transaction: t });
  return true;
}

/**
 * 오너 승인취소(승인 → 다시 승인 대기) 가능 판정 (2026-10-22 Fable 설계 owner-po-approval-revoke §1-1).
 * revoke 라우트와 목록·상세의 `approval_revocable` 플래그가 **같은 함수**를 본다(검사와 수정은 같은 조건).
 * 외부 공급업체 = 받기 전 전부 · 가입 공급업체 = 판매자 확인 전(submitted)만 · 결제된 발주는 불가(돈 무접촉).
 * @param {object} po - status·approved_at·payment_status 를 가진 발주(인스턴스 또는 평범한 객체)
 * @param {boolean} isExternal - utils/sellerNames.isExternalSeller 결과
 * @returns {{ok:true}|{ok:false, code:'NOT_APPROVED'|'PAID'|'RECEIVED'|'SELLER_CONFIRMED'|'BAD_STATUS'}}
 */
const REVOKABLE_EXTERNAL = ['submitted', 'confirmed', 'shipped', 'in_transit', 'delivered'];
const REVOKABLE_REGISTERED = ['submitted'];
function canRevokeApproval(po, isExternal) {
  if (!po || !po.approved_at) return { ok: false, code: 'NOT_APPROVED' };
  if (po.payment_status === 'paid') return { ok: false, code: 'PAID' };
  if (['received', 'partial_received', 'closed'].includes(po.status)) return { ok: false, code: 'RECEIVED' };
  const allowed = isExternal ? REVOKABLE_EXTERNAL : REVOKABLE_REGISTERED;
  if (!allowed.includes(po.status)) return { ok: false, code: isExternal ? 'BAD_STATUS' : 'SELLER_CONFIRMED' };
  return { ok: true };
}

/**
 * 발주 오너 승인 스위치(operation_settings.requirePoOwnerApproval) 잠금 — 2026-11-01 Irene «권고대로» · Fable §G-7-8 A안.
 * 오너가 연결된 매장이면 그 매장 ownership 오너·System Admin 만 바꾼다. 그 밖의 저장(매장 관리자 등)은 이 키만 기존 값으로 되돌린다.
 * 오너 미연결 매장은 스위치가 무효라 그대로 둔다. 설정을 쓰는 라우트 두 곳(store.js PUT /settings · restaurants-crud PUT /:id)이 같이 부른다.
 * @param {object} valueToSave - 가드를 통과한 저장할 operation_settings(제자리 수정)
 * @param {object|string} existingVal - DB 의 현재 operation_settings
 * @returns {Promise<boolean>} 되돌렸으면 true
 */
/** 이 사용자의 저장에서 스위치가 잠기는가 — 오너 연결 매장 ∧ SA 아님 ∧ 그 매장 ownership 오너 아님. */
async function isPoMasterLocked(user, restaurantId) {
  if (!user || user.role === 'System Admin') return false;
  const rid = parseInt(restaurantId, 10);
  if (!(await restaurantHasOwner(rid))) return false;
  return !(await resolveOwnerRestaurantIds(user)).includes(rid);
}
/** 잠겼으면 저장할 값의 스위치를 기존 값으로 되돌린다(제자리). 되돌렸으면 true. */
function applyPoMasterKeep(valueToSave, existingVal) {
  if (!valueToSave || typeof valueToSave !== 'object') return false;
  let ex = existingVal;
  if (typeof ex === 'string') { try { ex = JSON.parse(ex); } catch (_) { ex = {}; } }
  const prev = ex && typeof ex === 'object' ? ex.requirePoOwnerApproval : undefined;
  if (valueToSave.requirePoOwnerApproval === prev) return false;
  if (prev === undefined) delete valueToSave.requirePoOwnerApproval;
  else valueToSave.requirePoOwnerApproval = prev;
  return true;
}
async function keepPoMasterUnlessOwner(valueToSave, existingVal, user, restaurantId) {
  if (!(await isPoMasterLocked(user, restaurantId))) return false;
  return applyPoMasterKeep(valueToSave, existingVal);
}

module.exports = {
  keepPoMasterUnlessOwner,
  isPoMasterLocked,
  applyPoMasterKeep,
  evaluateApproval,
  evaluatePoApproval,
  canRevokeApproval,
  applyBuyerAmendGate,
  resolveOwnerRestaurantIds,
  isOwnerActorForPo,
  restaurantHasOwner,
  isApprovalRequiredForRestaurant,
  isApprovalRequiredForPo,
  applySubmitGate,
  applyAmendRaiseGate
};

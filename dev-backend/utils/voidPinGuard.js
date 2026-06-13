/**
 * Void / Cancel PIN Gate — 손실방지(anti-theft) 권한 게이트 공용 유틸.
 *
 * 목적: 매장 설정 operation_settings.requireVoidPin 이 켜진 매장에서
 *   아이템 삭제(void) / 주문 취소(cancel) 전에 권한 있는 스탭의 PIN 을 강제한다.
 *   직원이 (현금 결제된) 주문을 단독으로 지워 매출에서 빼는 횡령을 차단·추적.
 *
 * 설계: docs/VOID_PIN_GATE_DESIGN.md §4.4
 *   - 프론트 게이트(UX) 우회를 막는 백엔드 진짜 enforcement.
 *   - 할인 승인 PIN(POST /staff/verify-pin-permission)과 동일한 권한 판정 규칙 재사용.
 *   - 세션/계정은 바뀌지 않음 — PIN 은 신원·권한 확인용일 뿐.
 *
 * 🔒 인쇄 무관: 이 모듈은 권한 판정만 한다. 인쇄/취소표 로직과 무관.
 */

const User = require('../models/User');
const Restaurant = require('../models/Restaurant');

// 할인 PIN(routes/staff.js)과 동일한 권한 그룹 — Admin/Owner/Manager 는 자동 허용.
const PRIVILEGED_ROLES = ['Restaurant Admin', 'Restaurant Owner', 'Restaurant Manager', 'Manager', 'System Admin'];

/** 이 스탭이 void/cancel 을 승인할 권한이 있는가. */
function staffHasVoidAuthority(staff) {
  if (!staff) return false;
  if (PRIVILEGED_ROLES.includes(staff.role)) return true;
  let perms = staff.permissions;
  if (typeof perms === 'string') { try { perms = JSON.parse(perms); } catch { perms = []; } }
  return Array.isArray(perms) && perms.includes('void_authorize');
}

/** 매장이 삭제/취소 PIN 게이트를 켰는가. */
async function isVoidPinRequired(restaurantId) {
  try {
    const r = await Restaurant.findByPk(restaurantId, { attributes: ['operation_settings'] });
    if (!r) return false;
    const ops = r.operation_settings; // 모델 getter 가 JSON 파싱 + 기본값 머지
    return !!(ops && ops.requireVoidPin);
  } catch (e) {
    console.warn('[voidPinGuard] isVoidPinRequired error:', e && e.message);
    return false; // fail-open 은 위험하지만, 설정 읽기 실패로 정상 매장의 삭제/취소를 막는 게 더 위험.
  }
}

/**
 * 삭제/취소 PIN 게이트 enforcement.
 *
 * @param {number|string} restaurantId
 * @param {string} [voidPin]  — req.body.void_pin
 * @returns {Promise<{ ok:boolean, required:boolean, approver:?object, status?:number, code?:string, message?:string }>}
 *   - ok:true,  required:false → 게이트 OFF (기존 동작 그대로 진행)
 *   - ok:true,  required:true, approver:{id,name,role} → 권한 PIN 통과
 *   - ok:false, status/code/message → 차단 (호출 측이 그대로 응답)
 */
async function enforceVoidPin(restaurantId, voidPin) {
  const required = await isVoidPinRequired(restaurantId);
  if (!required) return { ok: true, required: false, approver: null };

  if (!voidPin) {
    return { ok: false, status: 400, code: 'VOID_PIN_REQUIRED', message: 'A manager PIN is required to void or cancel.' };
  }

  const staff = await User.findOne({
    where: { restaurant_id: restaurantId, pin_code: String(voidPin) },
    attributes: ['id', 'full_name', 'email', 'role', 'permissions']
  });

  if (!staffHasVoidAuthority(staff)) {
    return { ok: false, status: 403, code: 'VOID_PIN_INVALID', message: 'This PIN is not authorized to void or cancel.' };
  }

  return {
    ok: true,
    required: true,
    approver: { id: staff.id, name: staff.full_name || staff.email, role: staff.role }
  };
}

module.exports = { enforceVoidPin, isVoidPinRequired, staffHasVoidAuthority, PRIVILEGED_ROLES };

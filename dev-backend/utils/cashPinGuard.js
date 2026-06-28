/**
 * Cash Management PIN Gate — 현금관리 권한 게이트 공용 유틸 (2026-06-28, 3-1).
 *
 * 목적: 매장 설정 operation_settings.requirePinForCashMgmt 가 켜진 매장에서
 *   현금관리 쓰기(시재 개시/마감/입출금/조정 등) 전에 결제권한 스탭의 PIN 을 강제한다.
 *   직원 단독 현금 조작(횡령)을 차단·추적. 삭제/할인 PIN 게이트와 동일 모델.
 *
 * 설계: voidPinGuard.js 미러. 차이점은 권한 = 결제권한(access_payment) 직원.
 *   - 프론트 게이트(UX) 우회를 막는 백엔드 진짜 enforcement.
 *   - staff/verify-pin-permission 과 동일한 권한 판정 규칙(역할 자동허용 + permissions).
 *   - 세션/계정은 바뀌지 않음 — PIN 은 신원·권한 확인용일 뿐.
 *
 * 🔒 인쇄 무관: 권한 판정만. 인쇄/주문 로직과 무관.
 */

const User = require('../models/User');
const Restaurant = require('../models/Restaurant');

// 결제권한 자동 허용 역할 — middleware/auth.js PAYMENT_VOID_ROLES 와 동일 그룹.
const PRIVILEGED_ROLES = ['System Admin', 'Restaurant Admin', 'Restaurant Owner', 'Restaurant Manager', 'Manager'];

/** 이 스탭이 현금관리(결제권한) 를 수행할 권한이 있는가. */
function staffHasPaymentAuthority(staff) {
  if (!staff) return false;
  if (PRIVILEGED_ROLES.includes(staff.role)) return true;
  let perms = staff.permissions;
  if (typeof perms === 'string') { try { perms = JSON.parse(perms); } catch { perms = []; } }
  return Array.isArray(perms) && perms.includes('access_payment');
}

/** 매장이 현금관리 PIN 게이트를 켰는가. */
async function isCashPinRequired(restaurantId) {
  try {
    const r = await Restaurant.findByPk(restaurantId, { attributes: ['operation_settings'] });
    if (!r) return false;
    const ops = r.operation_settings; // 모델 getter 가 JSON 파싱 + 기본값 머지
    return !!(ops && ops.requirePinForCashMgmt);
  } catch (e) {
    console.warn('[cashPinGuard] isCashPinRequired error:', e && e.message);
    return false; // 설정 읽기 실패로 정상 매장의 현금관리를 막는 게 더 위험 → fail-open.
  }
}

/**
 * 현금관리 PIN 게이트 enforcement.
 *
 * @param {number|string} restaurantId
 * @param {string} [cashPin]  — req.body.cash_pin
 * @returns {Promise<{ ok:boolean, required:boolean, approver:?object, status?:number, code?:string, message?:string }>}
 *   - ok:true,  required:false → 게이트 OFF (기존 동작 그대로 진행)
 *   - ok:true,  required:true, approver:{id,name,role} → 권한 PIN 통과
 *   - ok:false, status/code/message → 차단 (호출 측이 그대로 응답)
 */
async function enforceCashPin(restaurantId, cashPin) {
  const required = await isCashPinRequired(restaurantId);
  if (!required) return { ok: true, required: false, approver: null };

  if (!cashPin) {
    return { ok: false, status: 400, code: 'CASH_PIN_REQUIRED', message: 'A payment-authorized PIN is required for cash management.' };
  }

  const staff = await User.findOne({
    where: { restaurant_id: restaurantId, pin_code: String(cashPin) },
    attributes: ['id', 'full_name', 'email', 'role', 'permissions']
  });

  if (!staffHasPaymentAuthority(staff)) {
    return { ok: false, status: 403, code: 'CASH_PIN_INVALID', message: 'This PIN is not authorized for cash management.' };
  }

  return {
    ok: true,
    required: true,
    approver: { id: staff.id, name: staff.full_name || staff.email, role: staff.role }
  };
}

module.exports = { enforceCashPin, isCashPinRequired, staffHasPaymentAuthority, PRIVILEGED_ROLES };

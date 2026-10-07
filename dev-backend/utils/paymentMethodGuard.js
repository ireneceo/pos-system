/**
 * Centralised guard for payment_method × order_type validity.
 *
 * Server-side defence: the mobile frontend filters out disallowed methods,
 * but the backend must also enforce so a crafted POST cannot bypass the rule
 * (e.g. delivery + payAtCounter when the operator disabled that combo).
 *
 * Rules:
 *   - If the chosen method's `allowed_order_types` is missing/null/[] → all order types allowed.
 *   - If it's a non-empty array → order_type MUST be a member.
 *   - Unknown method key → caller's responsibility (we return ok:true here; the
 *     downstream code rejects unknown methods elsewhere).
 *
 * Returns: { ok: boolean, code?: string, message?: string }.
 */
// 'reservation' is a virtual order-type used for reservation deposit eligibility configuration.
// The mobile order POST flow never sends order_type='reservation' (reservations use a separate route)
// so the guard naturally passes through; storing it in allowed_order_types is forward-compatible
// for when the deposit flow is wired.
const VALID_ORDER_TYPES = ['dine-in', 'takeaway', 'pickup', 'delivery', 'dine_in', 'reservation'];

// Frontend uses `dine-in`; some legacy paths persist `dine_in`. Treat them as equivalent.
function canonicalOrderType(t) {
  if (!t) return null;
  if (t === 'dine_in') return 'dine-in';
  return t;
}

// ── 결제 채널 (2026-10-07 Fable 판정 .claude/fable-verdict-20261007-kiosk-payment-split.md D3) ──
// 채널 3개: pos · mobile(손님 폰) · kiosk(등록된 매장 태블릿). 화면 쪽 같은 규칙 = dev-frontend/src/utils/paymentChannel.ts.
// 키오스크 열은 매장이 한 번이라도 만지기 전까지 모바일과 같다(`_kioskSplit` 표시 없음 → mobile 값을 따른다).
// 그래서 기존 매장은 데이터 변경 없이 오늘과 똑같다. 현금·직원식·송금 증빙은 공용 기기에서 받지 않는다.
const KIOSK_HIDDEN_METHODS = ['cash', 'staffMeal', 'bankTransfer'];

function parseSettings(raw) {
  if (!raw) return {};
  if (typeof raw === 'string') { try { return JSON.parse(raw) || {}; } catch { return {}; } }
  return raw;
}

/** 이 수단이 이 채널에서 열려 있나. 수단 정의가 없으면 null(«모름» — 호출부가 판단). */
function methodOpenIn(paymentSettings, key, channel) {
  const ps = parseSettings(paymentSettings);
  const m = ps[key];
  if (!m || typeof m !== 'object' || !Array.isArray(m.availableIn)) return null;
  if (channel === 'kiosk') {
    if (KIOSK_HIDDEN_METHODS.includes(key)) return false;
    if (ps._kioskSplit === true) return m.availableIn.includes('kiosk');
    // 미분리: 모바일 값을 따르되 온라인 결제(카드번호 입력)는 공용 기기라 기본 OFF — 매장이 Kiosk 토글로 켠다(Fable D3·F2)
    if (key === 'online') return false;
    return m.availableIn.includes('mobile');
  }
  return m.availableIn.includes(channel);
}

/**
 * @param channel 'mobile' | 'kiosk' | undefined — 주면 그 채널에 열린 수단인지도 본다(손님 주문 경로).
 *                POS 직원 주문은 채널 없이 부른다(오늘처럼 무검사).
 */
function checkPaymentMethodAllowed({ paymentSettings, paymentMethod, orderType, channel }) {
  if (!paymentMethod) return { ok: true };  // upstream may treat as default; not our job to reject here
  const ps = paymentSettings || {};  // 문자열로 온 옛 값은 오늘처럼 «모름» 으로 통과(아래 method 없음)
  const method = ps[paymentMethod];
  if (!method) return { ok: true };  // unknown — handled elsewhere
  if (channel && methodOpenIn(ps, paymentMethod, channel) === false) {
    return {
      ok: false,
      code: 'PAYMENT_METHOD_NOT_OPEN_IN_CHANNEL',
      message: `Payment method "${paymentMethod}" is not available on ${channel === 'kiosk' ? 'this kiosk' : 'mobile ordering'}.`
    };
  }
  const allowed = method.allowed_order_types;
  if (!Array.isArray(allowed) || allowed.length === 0) return { ok: true };

  const requested = canonicalOrderType(orderType);
  const normalizedAllowed = allowed.map(canonicalOrderType);
  if (requested && normalizedAllowed.includes(requested)) return { ok: true };

  return {
    ok: false,
    code: 'PAYMENT_METHOD_NOT_ALLOWED_FOR_ORDER_TYPE',
    message: `Payment method "${paymentMethod}" is not allowed for ${requested || 'this'} orders.`
  };
}

/**
 * Defence: the chosen order_type must be enabled on the restaurant's operation_settings.
 * Prevents a stale QR (saved offline) from creating an order in a type the operator disabled.
 *
 * Channel-scoped: only applied for mobile orders. POS staff can still create any type.
 *
 * Rules:
 *   - operation_settings.orderTypes missing → all allowed (back-compat for fresh restaurants).
 *   - Specific flag missing → treated as the model default (dine-in/takeaway = true, pickup/delivery = false).
 *
 * Returns: { ok: boolean, code?: string, message?: string }.
 */
function checkOrderTypeEnabled({ operationSettings, orderType }) {
  const requested = canonicalOrderType(orderType);
  if (!requested) return { ok: true };  // upstream defaults to dine_in elsewhere
  const op = operationSettings || {};
  const ot = op.orderTypes;
  if (!ot || typeof ot !== 'object') return { ok: true };  // no config → no restriction

  const keyMap = { 'dine-in': 'dineIn', 'takeaway': 'takeaway', 'pickup': 'pickup', 'delivery': 'delivery' };
  const flagKey = keyMap[requested];
  if (!flagKey) return { ok: true };  // unknown order_type — let other validation handle

  // Honour explicit false; missing key uses model defaults (dine-in/takeaway default ON; pickup/delivery OFF).
  const defaultEnabled = { dineIn: true, takeaway: true, pickup: false, delivery: false };
  const enabled = (flagKey in ot) ? !!ot[flagKey] : defaultEnabled[flagKey];

  if (!enabled) {
    return {
      ok: false,
      code: 'ORDER_TYPE_NOT_ENABLED',
      message: `Order type "${requested}" is not currently accepted by this restaurant.`
    };
  }
  return { ok: true };
}

module.exports = { checkPaymentMethodAllowed, checkOrderTypeEnabled, canonicalOrderType, methodOpenIn, VALID_ORDER_TYPES, KIOSK_HIDDEN_METHODS };

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

function checkPaymentMethodAllowed({ paymentSettings, paymentMethod, orderType }) {
  if (!paymentMethod) return { ok: true };  // upstream may treat as default; not our job to reject here
  const ps = paymentSettings || {};
  const method = ps[paymentMethod];
  if (!method) return { ok: true };  // unknown — handled elsewhere
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

module.exports = { checkPaymentMethodAllowed, checkOrderTypeEnabled, canonicalOrderType, VALID_ORDER_TYPES };

/**
 * Order Audit Log Service
 *
 * 모든 주문 액션을 OrderAction 테이블에 정규화 audit trail 로 기록.
 * 특히 cancellation 은 reason 필수 가드.
 *
 * 자세한 사양: docs/ORDER_MANAGEMENT_IMPROVEMENTS.md § 7
 */

const OrderAction = require('../models/OrderAction');
const User = require('../models/User');

/**
 * @param {object} opts
 * @param {number} opts.orderId        REQUIRED
 * @param {number} opts.restaurantId   REQUIRED
 * @param {string} opts.actionType     REQUIRED — enum from OrderAction
 * @param {string} [opts.fromStatus]
 * @param {string} [opts.toStatus]
 * @param {number} [opts.performedByUserId]
 * @param {string} [opts.performedByName]
 * @param {string} [opts.performedByRole]  — admin/staff/customer/system (default 'system')
 * @param {string} [opts.source]            — pos/kds/mobile/admin/api/auto/scheduler (default 'api')
 * @param {string} [opts.reason]
 * @param {object} [opts.metadata]
 * @param {object} [opts.transaction]      — sequelize tx
 */
async function logOrderAction(opts) {
  const {
    orderId, restaurantId, actionType,
    fromStatus, toStatus,
    performedByUserId, performedByName, performedByRole,
    source, reason, metadata,
    transaction
  } = opts || {};

  if (!orderId || !restaurantId || !actionType) {
    throw new Error('logOrderAction: orderId / restaurantId / actionType required');
  }

  // Cancellation 은 reason 필수 (legal/operational accountability)
  if (actionType === 'cancelled' && !(reason && String(reason).trim())) {
    throw new Error('Cancellation reason is required');
  }

  // performed_by_name snapshot — 직원 삭제 후에도 history 보존
  let name = performedByName;
  if (!name && performedByUserId) {
    try {
      const user = await User.findByPk(performedByUserId, { attributes: ['full_name', 'username', 'email'] });
      name = user ? (user.full_name || user.username || user.email || 'Unknown') : 'Unknown';
    } catch (e) {
      name = 'Unknown';
    }
  }
  if (!name) {
    // 명시 안 됨 + user id 도 없음 → role 따라 fallback
    if (performedByRole === 'customer') name = 'Customer';
    else if (performedByRole === 'system') name = 'System';
    else name = 'Unknown';
  }

  return OrderAction.create({
    order_id: orderId,
    restaurant_id: restaurantId,
    action_type: actionType,
    from_status: fromStatus || null,
    to_status: toStatus || null,
    performed_by_id: performedByUserId || null,
    performed_by_name: name,
    performed_by_role: performedByRole || 'system',
    source: source || 'api',
    reason: reason || null,
    metadata: metadata || null
  }, transaction ? { transaction } : undefined);
}

/**
 * Best-effort log — 실패해도 메인 흐름 영향 0 (audit log fail 시 silent).
 * 사용 시점: 메인 로직 성공 후 보조 audit. 메인 트랜잭션과 분리.
 */
async function logOrderActionSafe(opts) {
  try {
    return await logOrderAction(opts);
  } catch (e) {
    console.warn('[orderAuditLog] silent fail:', e && e.message, 'action:', opts && opts.actionType);
    return null;
  }
}

module.exports = { logOrderAction, logOrderActionSafe };

const ActivityLog = require('../models/ActivityLog');

/**
 * Log an activity to the activity_logs table.
 * Silently fails — logging should never break main functionality.
 *
 * @param {Object} req - Express request object (for user info, IP, user-agent)
 * @param {Object} options
 * @param {string} options.action_type - 'create' | 'update' | 'delete'
 * @param {string} options.entity_type - e.g. 'menu_item', 'category', 'staff', 'settings', 'invoice', 'table', 'promotion'
 * @param {string|number} [options.entity_id] - ID of affected entity
 * @param {string} [options.entity_name] - Display name of affected entity
 * @param {Object} [options.changes] - Before/after values
 * @param {string} options.description - Human-readable description
 * @param {number} [options.restaurant_id] - Override restaurant_id (defaults to req.user.restaurantId)
 */
async function logActivity(req, options) {
  try {
    const user = req.user || {};
    const restaurantId = options.restaurant_id || user.restaurantId || user.restaurant_id;

    if (!restaurantId || !user.id) return null;

    return await ActivityLog.createLog({
      restaurant_id: restaurantId,
      user_id: user.id,
      username: user.username || user.email || 'unknown',
      full_name: user.name || user.full_name || null,
      action_type: options.action_type,
      entity_type: options.entity_type,
      entity_id: options.entity_id ? String(options.entity_id) : null,
      entity_name: options.entity_name || null,
      changes: options.changes || null,
      description: options.description,
      ip_address: req.ip || req.socket?.remoteAddress || null,
      user_agent: req.get('User-Agent') || null
    });
  } catch (error) {
    console.error('Activity logging failed:', error.message);
    return null;
  }
}

module.exports = { logActivity };

/**
 * System Logger Utility
 * Used by schedulers, services, and middleware to write structured logs.
 * Never throws - all errors are caught internally.
 */

const SystemLog = require('../models/SystemLog');

async function log(level, category, service, message, details = null, meta = {}) {
  try {
    await SystemLog.createLog({
      level,
      category,
      service,
      message,
      details,
      user_id: meta.userId || null,
      user_name: meta.userName || null,
      ip_address: meta.ipAddress || null,
      user_agent: meta.userAgent || null,
      request_id: meta.requestId || null,
      duration: meta.duration || null,
      status_code: meta.statusCode || null
    });
  } catch (error) {
    console.error(`[systemLogger] Failed to write log: ${error.message}`);
  }
}

async function info(category, service, message, details, meta) {
  return log('info', category, service, message, details, meta);
}

async function warn(category, service, message, details, meta) {
  return log('warning', category, service, message, details, meta);
}

async function error(category, service, message, details, meta) {
  return log('error', category, service, message, details, meta);
}

async function critical(category, service, message, details, meta) {
  return log('critical', category, service, message, details, meta);
}

async function debug(category, service, message, details, meta) {
  return log('debug', category, service, message, details, meta);
}

module.exports = { log, info, warn, error, critical, debug };

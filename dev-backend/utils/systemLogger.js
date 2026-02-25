/**
 * System Logger Utility
 * Used by schedulers, services, and middleware to write structured logs.
 * Never throws - all errors are caught internally.
 * Sends email alerts for error/critical logs with 1-hour deduplication.
 */

const SystemLog = require('../models/SystemLog');

// Email deduplication: Map of "service:level" -> last send timestamp
const emailCooldowns = new Map();
const EMAIL_COOLDOWN_MS = 60 * 60 * 1000; // 1 hour

/**
 * Send email alert for error/critical logs (non-blocking, fire-and-forget)
 */
async function sendAlertEmail(level, service, message, details) {
  try {
    // Dedup check
    const key = `${service}:${level}`;
    const lastSent = emailCooldowns.get(key) || 0;
    if (Date.now() - lastSent < EMAIL_COOLDOWN_MS) return;
    emailCooldowns.set(key, Date.now());

    // Lazy require to avoid circular dependency
    const { sendPlatformEmail, getPlatformEmailSettings } = require('./emailService');
    const settings = await getPlatformEmailSettings();
    const recipient = settings.from_email; // Admin SMTP = admin's own email

    const levelColor = level === 'critical' ? '#DC2626' : '#D97706';
    const levelLabel = level.toUpperCase();
    const detailsHtml = details ? `<pre style="background:#F8FAFC;border:1px solid #E6EBF1;border-radius:4px;padding:12px;font-size:12px;overflow-x:auto;max-height:300px;">${JSON.stringify(details, null, 2)}</pre>` : '';
    const logsUrl = 'https://dev.purplehere.com/pos/admin/logs';

    await sendPlatformEmail({
      to: recipient,
      subject: `[${levelLabel}] ${service}: ${message.substring(0, 80)}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:${levelColor};color:white;padding:16px 20px;border-radius:8px 8px 0 0;">
            <h2 style="margin:0;font-size:18px;">${levelLabel} Alert: ${service}</h2>
          </div>
          <div style="border:1px solid #E6EBF1;border-top:none;padding:20px;border-radius:0 0 8px 8px;">
            <p style="font-size:15px;color:#1F2937;margin:0 0 12px;"><strong>Message:</strong> ${message}</p>
            <p style="font-size:13px;color:#6B7280;margin:0 0 12px;"><strong>Service:</strong> ${service} &middot; <strong>Level:</strong> ${level} &middot; <strong>Time:</strong> ${new Date().toISOString()}</p>
            ${detailsHtml}
            <div style="margin-top:16px;">
              <a href="${logsUrl}" style="display:inline-block;padding:10px 20px;background:#635BFF;color:white;text-decoration:none;border-radius:6px;font-weight:600;font-size:14px;">View System Logs</a>
            </div>
            <p style="font-size:11px;color:#9CA3AF;margin-top:16px;">This alert is sent once per hour per service/level combination.</p>
          </div>
        </div>
      `
    });
  } catch (err) {
    // Silent fail - email alert is best-effort
    console.error(`[systemLogger] Alert email failed: ${err.message}`);
  }
}

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

    // Fire-and-forget email alert for error/critical
    if (level === 'error' || level === 'critical') {
      sendAlertEmail(level, service, message, details).catch(() => {});
    }
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

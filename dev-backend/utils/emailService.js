const nodemailer = require('nodemailer');
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');
const { decrypt } = require('./encryption');
const { getLogoAttachment } = require('./emailTemplates');

/**
 * 바운스 처리: 발송 실패한 이메일의 bounce_count 증가
 * bounce_count >= 3이면 해당 이메일로는 발송 차단
 */
async function handleBounce(toEmail) {
  try {
    await sequelize.query(
      `UPDATE users SET email_bounce_count = COALESCE(email_bounce_count, 0) + 1 WHERE email = :email`,
      { replacements: { email: toEmail }, type: QueryTypes.UPDATE }
    );
  } catch (e) {
    console.error('Bounce count update failed:', e.message);
  }
}

/**
 * 발송 전 바운스 체크: bounce_count >= 3이면 발송 차단
 */
async function isEmailBlocked(toEmail) {
  try {
    const [result] = await sequelize.query(
      `SELECT email_bounce_count FROM users WHERE email = :email`,
      { replacements: { email: toEmail }, type: QueryTypes.SELECT }
    );
    return result && result.email_bounce_count >= 3;
  } catch (e) {
    return false;
  }
}

/**
 * Get email settings for a specific entity
 */
async function getEmailSettings(entityType, entityId) {
  try {
    const settings = await sequelize.query(
      `SELECT * FROM notification_settings
       WHERE entity_type = :entityType AND entity_id = :entityId AND email_enabled = 1`,
      {
        replacements: { entityType, entityId },
        type: QueryTypes.SELECT
      }
    );

    const setting = settings[0];

    if (setting && setting.smtp_host && setting.smtp_user && setting.smtp_password) {
      return setting;
    }

    const labels = { admin: 'the platform', brand: 'this brand', foodcourt: 'this foodcourt', restaurant: 'this restaurant', manager: 'this manager' };
    const entityLabel = labels[entityType] || entityType;
    throw new Error(`Email notifications are not configured for ${entityLabel}. Please configure SMTP settings in Notification Settings.`);
  } catch (error) {
    throw error;
  }
}

/**
 * Get platform-level email settings (entity_type='admin')
 */
async function getPlatformEmailSettings() {
  try {
    const settings = await sequelize.query(
      `SELECT * FROM notification_settings
       WHERE entity_type = 'admin' AND email_enabled = 1
       LIMIT 1`,
      { type: QueryTypes.SELECT }
    );

    const setting = settings[0];

    if (setting && setting.smtp_host && setting.smtp_user && setting.smtp_password) {
      return setting;
    }

    throw new Error('Platform email is not configured. Please configure SMTP settings in Admin > Notification Settings.');
  } catch (error) {
    throw error;
  }
}

/**
 * Create nodemailer transporter with SMTP settings
 */
function createTransporter(settings) {
  return nodemailer.createTransport({
    host: settings.smtp_host,
    port: settings.smtp_port || 587,
    secure: settings.smtp_secure || false,
    auth: {
      user: settings.smtp_user,
      pass: decrypt(settings.smtp_password)
    },
    tls: {
      rejectUnauthorized: false
    }
  });
}

const isDev = process.env.NODE_ENV !== 'production';

/**
 * Send email for a specific entity
 */
async function sendEmail(entityType, entityId, mailOptions) {
  try {
    // 개발서버: 같은 dev-block 정책 적용. entity-level 이메일도 실수로 운영
    // 고객/레스토랑 메일함에 발송되지 않도록 SMTP 호출 자체를 skip.
    // DEV_SEND_ENTITY_EMAILS=true 인 경우에만 실제 발송 (이메일 흐름 디버깅용).
    if (isDev && process.env.DEV_SEND_ENTITY_EMAILS !== 'true') {
      const subj = mailOptions.subject || '(no subject)';
      const to = Array.isArray(mailOptions.to) ? mailOptions.to.join(', ') : mailOptions.to;
      console.log(`[dev-email-blocked] Entity email skipped (${entityType}/${entityId}): subject="${subj}" to="${to}". Set DEV_SEND_ENTITY_EMAILS=true to enable.`);
      return { success: true, skipped: true, reason: 'dev-environment' };
    }

    if (mailOptions.to && await isEmailBlocked(mailOptions.to)) {
      console.log(`Email blocked (bounce count >= 3): ${mailOptions.to}`);
      return { success: false, blocked: true };
    }
    const settings = await getEmailSettings(entityType, entityId);
    const transporter = createTransporter(settings);

    const fromAddress = settings.from_email || settings.smtp_user;
    const fromFormatted = settings.from_name
      ? `"${settings.from_name}" <${fromAddress}>`
      : fromAddress;

    if (!mailOptions.from) {
      mailOptions.from = fromFormatted;
    }

    if (settings.reply_to_email && !mailOptions.replyTo) {
      mailOptions.replyTo = settings.reply_to_email;
    }

    // 개발서버: 제목에 [DEV] 표시
    if (isDev && mailOptions.subject) {
      mailOptions.subject = `[DEV] ${mailOptions.subject}`;
    }

    // 로고 CID 첨부 자동 추가
    if (mailOptions.html && mailOptions.html.includes('cid:purplehere-logo')) {
      mailOptions.attachments = [...(mailOptions.attachments || []), ...getLogoAttachment()];
    }

    const info = await transporter.sendMail(mailOptions);

    return {
      success: true,
      messageId: info.messageId,
      response: info.response
    };
  } catch (error) {
    console.error('Email sending error:', error);
    if (mailOptions.to) await handleBounce(mailOptions.to);
    throw error;
  }
}

/**
 * Send platform-level email (Welcome, Invoice, etc.)
 * Uses notification_settings with entity_type='admin'
 */
async function sendPlatformEmail(mailOptions) {
  try {
    // 개발서버: 운영 admin에게 실제 발송 차단 (test signup이 production admin 메일함을 폭격하는 것 방지).
    // 환경변수 DEV_SEND_PLATFORM_EMAILS=true 인 경우에만 실제 발송 (이메일 흐름 디버깅용).
    // 기본 동작: dev에서는 콘솔에 로그만 남기고 SMTP 호출 자체를 skip.
    if (isDev && process.env.DEV_SEND_PLATFORM_EMAILS !== 'true') {
      const subj = mailOptions.subject || '(no subject)';
      const to = Array.isArray(mailOptions.to) ? mailOptions.to.join(', ') : mailOptions.to;
      console.log(`[dev-email-blocked] Platform email skipped: subject="${subj}" to="${to}". Set DEV_SEND_PLATFORM_EMAILS=true to enable.`);
      return { success: true, skipped: true, reason: 'dev-environment' };
    }

    // 바운스 체크: 3회 이상 실패한 이메일은 발송 차단
    if (mailOptions.to && await isEmailBlocked(mailOptions.to)) {
      console.log(`Email blocked (bounce count >= 3): ${mailOptions.to}`);
      return { success: false, blocked: true, message: 'Email address blocked due to repeated delivery failures' };
    }

    const settings = await getPlatformEmailSettings();
    const transporter = createTransporter(settings);

    const fromAddress = settings.from_email || settings.smtp_user;
    const fromFormatted = settings.from_name
      ? `"${settings.from_name}" <${fromAddress}>`
      : fromAddress;

    if (!mailOptions.from) {
      mailOptions.from = fromFormatted;
    }

    if (settings.reply_to_email && !mailOptions.replyTo) {
      mailOptions.replyTo = settings.reply_to_email;
    }

    // 개발서버: 제목에 [DEV] 표시
    if (isDev && mailOptions.subject) {
      mailOptions.subject = `[DEV] ${mailOptions.subject}`;
    }

    // 로고 CID 첨부 자동 추가
    if (mailOptions.html && mailOptions.html.includes('cid:purplehere-logo')) {
      mailOptions.attachments = [...(mailOptions.attachments || []), ...getLogoAttachment()];
    }

    const info = await transporter.sendMail(mailOptions);

    return {
      success: true,
      messageId: info.messageId,
      response: info.response
    };
  } catch (error) {
    console.error('Platform email sending error:', error);
    // 바운스 카운트 증가
    if (mailOptions.to) {
      await handleBounce(mailOptions.to);
    }
    throw error;
  }
}

/**
 * Send test email
 */
async function sendTestEmail(entityType, entityId, testEmail) {
  const { emailLayout } = require('./emailTemplates');

  const bodyContent = `
    <h2 style="color:#0A2540;font-size:20px;font-weight:600;margin:0 0 16px;">SMTP Configuration Test</h2>
    <p style="color:#374151;font-size:14px;line-height:1.6;margin:0 0 20px;">This is a test email from your PurpleHere notification system.</p>
    <div style="background:#ECFDF5;padding:16px;border-radius:8px;margin:0 0 20px;border-left:4px solid #10B981;">
      <p style="color:#059669;font-size:14px;margin:0;font-weight:600;">SMTP configuration is working correctly!</p>
    </div>
    <p style="color:#9CA3AF;font-size:12px;margin:0;">Entity: ${entityType} / ID: ${entityId}</p>`;

  const mailOptions = {
    to: testEmail,
    subject: 'Test Email from PurpleHere',
    html: emailLayout(bodyContent),
    text: `SMTP Configuration Test\n\nThis is a test email from your PurpleHere notification system.\nSMTP configuration is working correctly!\n\nEntity: ${entityType} / ID: ${entityId}`
  };

  return await sendEmail(entityType, entityId, mailOptions);
}

/**
 * Get email settings for an invoice issuer
 * Maps issuer_type to the correct notification_settings entity_type
 * - system_admin → entity_type='admin' (any admin user)
 * - brand → entity_type='brand', entity_id=brandId
 * - foodcourt → entity_type='foodcourt', entity_id=foodcourtId
 */
async function getIssuerEmailSettings(issuerType, issuerId) {
  let entityType;
  let entityId;

  switch (issuerType) {
    case 'system_admin':
      entityType = 'admin';
      entityId = null;
      break;
    case 'brand':
      entityType = 'brand';
      entityId = issuerId;
      break;
    case 'foodcourt':
      entityType = 'foodcourt';
      entityId = issuerId;
      break;
    default:
      throw new Error(`Unknown issuer type: ${issuerType}`);
  }

  // For system_admin, find any admin setting (no specific entity_id)
  if (entityType === 'admin') {
    return await getPlatformEmailSettings();
  }

  return await getEmailSettings(entityType, entityId);
}

/**
 * Send email as a specific issuer (system_admin, brand, or foodcourt)
 * Automatically selects the correct SMTP settings based on issuer type
 *
 * @param {string} issuerType - 'system_admin', 'brand', or 'foodcourt'
 * @param {number|null} issuerId - Brand ID or Foodcourt ID (null for system_admin)
 * @param {object} mailOptions - nodemailer mail options (to, subject, html, text, etc.)
 */
async function sendIssuerEmail(issuerType, issuerId, mailOptions) {
  try {
    // 개발서버: 같은 dev-block 정책. issuer(brand/foodcourt) SMTP 통한
    // 고객 인보이스/주문 알림 메일이 운영 받는사람 메일함에 가는 것 방지.
    if (isDev && process.env.DEV_SEND_ENTITY_EMAILS !== 'true') {
      const subj = mailOptions.subject || '(no subject)';
      const to = Array.isArray(mailOptions.to) ? mailOptions.to.join(', ') : mailOptions.to;
      console.log(`[dev-email-blocked] Issuer email skipped (${issuerType}/${issuerId}): subject="${subj}" to="${to}". Set DEV_SEND_ENTITY_EMAILS=true to enable.`);
      return { success: true, skipped: true, reason: 'dev-environment' };
    }

    if (mailOptions.to && await isEmailBlocked(mailOptions.to)) {
      console.log(`Email blocked (bounce count >= 3): ${mailOptions.to}`);
      return { success: false, blocked: true };
    }
    const settings = await getIssuerEmailSettings(issuerType, issuerId);
    const transporter = createTransporter(settings);

    if (!mailOptions.from) {
      mailOptions.from = settings.from_name
        ? `"${settings.from_name}" <${settings.from_email}>`
        : settings.from_email;
    }

    if (settings.reply_to_email && !mailOptions.replyTo) {
      mailOptions.replyTo = settings.reply_to_email;
    }

    // 로고 CID 첨부 자동 추가
    if (mailOptions.html && mailOptions.html.includes('cid:purplehere-logo')) {
      mailOptions.attachments = [...(mailOptions.attachments || []), ...getLogoAttachment()];
    }

    const info = await transporter.sendMail(mailOptions);

    return {
      success: true,
      messageId: info.messageId,
      response: info.response
    };
  } catch (error) {
    console.error(`Issuer email sending error (${issuerType}/${issuerId}):`, error);
    if (mailOptions.to) await handleBounce(mailOptions.to);
    throw error;
  }
}

/**
 * Verify SMTP connection
 */
async function verifyConnection(settings) {
  try {
    const transporter = createTransporter(settings);
    await transporter.verify();
    return { success: true, message: 'SMTP connection verified successfully' };
  } catch (error) {
    console.error('SMTP verification error:', error);
    return { success: false, message: error.message };
  }
}

/**
 * Try entity SMTP first; on "not configured", transparently fall back to platform SMTP.
 * Other errors (network, auth failure, etc.) are re-thrown.
 *
 * 사용처 예: 고객 비밀번호 리셋 — 레스토랑 SMTP 있으면 그걸, 없으면 플랫폼 help@purplehere.com.
 *
 * @param {string} entityType - 'restaurant' | 'brand' | 'foodcourt' | ...
 * @param {number} entityId
 * @param {object} mailOptions - nodemailer options (to, subject, html, text, attachments)
 * @returns {Promise<{success, via:'entity'|'platform', ...}>}
 */
async function sendEntityOrPlatformEmail(entityType, entityId, mailOptions) {
  try {
    const result = await sendEmail(entityType, entityId, mailOptions);
    return { ...result, via: 'entity' };
  } catch (err) {
    const msg = String(err && err.message || '');
    const notConfigured = /not configured/i.test(msg);
    if (!notConfigured) {
      throw err;
    }
    console.log(`[EmailFallback] ${entityType}#${entityId} SMTP not configured → platform fallback`);
    const result = await sendPlatformEmail(mailOptions);
    return { ...result, via: 'platform' };
  }
}

module.exports = {
  getEmailSettings,
  getPlatformEmailSettings,
  getIssuerEmailSettings,
  createTransporter,
  sendEmail,
  sendPlatformEmail,
  sendEntityOrPlatformEmail,
  sendIssuerEmail,
  sendTestEmail,
  verifyConnection
};

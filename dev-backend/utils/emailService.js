const nodemailer = require('nodemailer');
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');
const { decrypt } = require('./encryption');
const { getLogoAttachment } = require('./emailTemplates');

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
    throw error;
  }
}

/**
 * Send platform-level email (Welcome, Invoice, etc.)
 * Uses notification_settings with entity_type='admin'
 */
async function sendPlatformEmail(mailOptions) {
  try {
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
    throw error;
  }
}

/**
 * Send test email
 */
async function sendTestEmail(entityType, entityId, testEmail) {
  const mailOptions = {
    to: testEmail,
    subject: 'Test Email from PurpleHere',
    html: `<!DOCTYPE html><html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#F6F9FC;font-family:'Inter',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F6F9FC;padding:40px 20px;"><tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:white;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
  <tr><td style="background:linear-gradient(135deg,#635BFF,#4B45C6);padding:24px 32px;"><a href="https://purplehere.com" style="text-decoration:none;"><h1 style="margin:0;color:white;font-size:22px;font-weight:600;">PurpleHere</h1></a></td></tr>
  <tr><td style="padding:32px;">
    <h2 style="color:#0A2540;font-size:20px;margin:0 0 16px;">SMTP Test</h2>
    <p style="color:#374151;font-size:14px;line-height:1.6;">This is a test email from your PurpleHere notification system.</p>
    <div style="background:#ECFDF5;padding:16px;border-radius:8px;margin:20px 0;border-left:4px solid #10B981;">
      <p style="color:#059669;font-size:14px;margin:0;font-weight:600;">SMTP configuration is working correctly!</p>
    </div>
    <p style="color:#9CA3AF;font-size:12px;">Entity: ${entityType} / ID: ${entityId}</p>
  </td></tr>
  <tr><td style="background:#F8FAFC;padding:20px 32px;border-top:1px solid #E6EBF1;"><p style="margin:0;color:#6B7C93;font-size:12px;text-align:center;"><a href="https://purplehere.com" style="color:#635BFF;text-decoration:none;">purplehere.com</a></p></td></tr>
</table></td></tr></table></body></html>`,
    text: `Test Email\n\nThis is a test email from your Purple POS notification system.\nIf you received this email, your SMTP configuration is working correctly!\n\nEntity Type: ${entityType}\nEntity ID: ${entityId}`
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

module.exports = {
  getEmailSettings,
  getPlatformEmailSettings,
  getIssuerEmailSettings,
  createTransporter,
  sendEmail,
  sendPlatformEmail,
  sendIssuerEmail,
  sendTestEmail,
  verifyConnection
};

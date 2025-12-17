const nodemailer = require('nodemailer');
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');

/**
 * Get email settings for a specific entity (restaurant)
 * Each restaurant must configure their own SMTP settings
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

    // settings는 배열이므로 첫 번째 항목 사용
    const setting = settings[0];

    if (setting && setting.smtp_host && setting.smtp_user && setting.smtp_password) {
      return setting;
    }

    throw new Error('Email notifications are not configured for this restaurant. Please configure SMTP settings in Restaurant Settings > Notifications.');
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
    secure: settings.smtp_secure || false, // true for 465, false for other ports
    auth: {
      user: settings.smtp_user,
      pass: settings.smtp_password
    },
    tls: {
      rejectUnauthorized: false // Allow self-signed certificates
    }
  });
}

/**
 * Send email
 */
async function sendEmail(entityType, entityId, mailOptions) {
  try {
    // Get email settings
    const settings = await getEmailSettings(entityType, entityId);

    // Create transporter
    const transporter = createTransporter(settings);

    // Set from address if not provided
    if (!mailOptions.from) {
      mailOptions.from = settings.from_name
        ? `"${settings.from_name}" <${settings.from_email}>`
        : settings.from_email;
    }

    // Set reply-to if configured
    if (settings.reply_to_email && !mailOptions.replyTo) {
      mailOptions.replyTo = settings.reply_to_email;
    }

    // Send email
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
 * Send test email
 */
async function sendTestEmail(entityType, entityId, testEmail) {
  const mailOptions = {
    to: testEmail,
    subject: 'Test Email from Purple POS',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #635BFF;">Test Email</h2>
        <p>This is a test email from your Purple POS notification system.</p>
        <p>If you received this email, your SMTP configuration is working correctly!</p>
        <hr style="border: none; border-top: 1px solid #E6EBF1; margin: 20px 0;">
        <p style="color: #6B7C93; font-size: 12px;">
          Sent from Purple POS Notification System<br>
          Entity Type: ${entityType}<br>
          Entity ID: ${entityId}
        </p>
      </div>
    `,
    text: `Test Email\n\nThis is a test email from your Purple POS notification system.\nIf you received this email, your SMTP configuration is working correctly!\n\nEntity Type: ${entityType}\nEntity ID: ${entityId}`
  };

  return await sendEmail(entityType, entityId, mailOptions);
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
  createTransporter,
  sendEmail,
  sendTestEmail,
  verifyConnection
};

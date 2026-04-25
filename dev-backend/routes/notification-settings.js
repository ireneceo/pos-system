const express = require('express');
const router = express.Router();
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');
const { authenticateToken } = require('../middleware/auth');
const { encrypt, decrypt } = require('../utils/encryption');
const User = require('../models/User');

// Notification categories with role-based visibility
const NOTIFICATION_CATEGORIES = [
  { key: 'invoice_created', label: 'New Invoice Issued', description: 'When a new invoice is issued to your restaurant', section: 'Invoices', roles: ['Restaurant Admin', 'Restaurant Owner'] },
  { key: 'invoice_overdue', label: 'Invoice Overdue Reminder', description: 'Reminders for overdue invoice payments', section: 'Invoices', roles: ['Restaurant Admin', 'Restaurant Owner'] },
  { key: 'invoice_paid', label: 'Invoice Payment Confirmed', description: 'When an invoice payment is confirmed', section: 'Invoices', roles: ['Brand General', 'Foodcourt General', 'System Admin'] },
  { key: 'notice_received', label: 'New Notice Received', description: 'When a new notice or announcement is posted', section: 'Communication', roles: ['all'] },
  { key: 'comment_received', label: 'New Comment', description: 'When someone comments on your notice or ticket', section: 'Communication', roles: ['all'] },
  { key: 'inquiry_received', label: 'New Inquiry Received', description: 'When a new support inquiry is submitted', section: 'Inquiries & Tickets', roles: ['Brand General', 'Foodcourt General', 'System Admin'] },
  { key: 'inquiry_replied', label: 'Inquiry Reply', description: 'When your inquiry receives a reply', section: 'Inquiries & Tickets', roles: ['Restaurant Admin', 'Restaurant Owner'] },
  { key: 'ticket_status_changed', label: 'Ticket Status Changed', description: 'When a ticket status is updated', section: 'Inquiries & Tickets', roles: ['all'] },
  { key: 'hardware_quote', label: 'Hardware Quote Request', description: 'When a new hardware package quote is submitted', section: 'Inquiries & Tickets', roles: ['System Admin'] },
  { key: 'trial_expiry_reminder', label: 'Trial Expiry Reminder', description: 'Reminders before and after your trial period ends', section: 'Subscription', roles: ['Restaurant Admin', 'Restaurant Owner', 'Brand General', 'Foodcourt General'] }
];

// GET - User notification preferences
router.get('/preferences', authenticateToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'role', 'notification_preferences']
    });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Filter categories by user role
    const userRole = user.role;
    const categories = NOTIFICATION_CATEGORIES.filter(c =>
      c.roles.includes('all') || c.roles.includes(userRole)
    );

    // Build preferences with defaults (null = all enabled)
    const saved = user.notification_preferences || {};
    const preferences = {};
    categories.forEach(c => {
      preferences[c.key] = saved[c.key] !== undefined ? saved[c.key] : true;
    });

    res.json({
      success: true,
      data: {
        preferences,
        categories: categories.map(c => ({
          key: c.key,
          label: c.label,
          description: c.description,
          section: c.section
        }))
      }
    });
  } catch (error) {
    console.error('Notification preferences fetch error:', error);
    res.status(500).json({ success: false, message: 'Failed to load notification preferences' });
  }
});

// PUT - Update user notification preferences
router.put('/preferences', authenticateToken, async (req, res) => {
  try {
    const { preferences } = req.body;
    if (!preferences || typeof preferences !== 'object') {
      return res.status(400).json({ success: false, message: 'Invalid preferences format' });
    }

    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Validate keys - only allow known category keys
    const validKeys = NOTIFICATION_CATEGORIES.map(c => c.key);
    const filtered = {};
    for (const [key, value] of Object.entries(preferences)) {
      if (validKeys.includes(key) && typeof value === 'boolean') {
        filtered[key] = value;
      }
    }

    // If all values are true, store null (default = all enabled)
    const allEnabled = Object.values(filtered).every(v => v === true);
    user.notification_preferences = allEnabled ? null : filtered;
    await user.save();

    res.json({ success: true, message: 'Notification preferences saved' });
  } catch (error) {
    console.error('Notification preferences save error:', error);
    res.status(500).json({ success: false, message: 'Failed to save notification preferences' });
  }
});

// GET - 알림 설정 조회 (SMTP)
router.get('/:entityType/:entityId', authenticateToken, async (req, res) => {
  try {
    const { entityType, entityId } = req.params;

    const settings = await sequelize.query(
      `SELECT * FROM notification_settings
       WHERE entity_type = :entityType AND entity_id = :entityId`,
      {
        replacements: { entityType, entityId },
        type: QueryTypes.SELECT
      }
    );

    if (settings.length === 0) {
      // 설정이 없으면 기본값 반환
      return res.json({
        entity_type: entityType,
        entity_id: parseInt(entityId),
        email_enabled: false,
        smtp_host: '',
        smtp_port: 587,
        smtp_secure: false,
        smtp_user: '',
        smtp_password: '',
        from_email: '',
        from_name: '',
        reply_to_email: '',
        sms_enabled: false,
        whatsapp_enabled: false
      });
    }

    // 비밀번호는 마스킹해서 반환
    const result = settings[0];
    if (result.smtp_password) {
      result.smtp_password = '********';
    }

    res.json(result);
  } catch (error) {
    console.error('알림 설정 조회 에러:', error);
    res.status(500).json({ error: '알림 설정을 조회할 수 없습니다.' });
  }
});

// POST/PUT - 알림 설정 저장
router.post('/:entityType/:entityId', authenticateToken, async (req, res) => {
  try {
    const { entityType, entityId } = req.params;
    const {
      email_enabled,
      smtp_host,
      smtp_port,
      smtp_secure,
      smtp_user,
      smtp_password,
      from_email,
      from_name,
      reply_to_email,
      sms_enabled,
      whatsapp_enabled
    } = req.body;

    // 기존 설정 확인
    const existing = await sequelize.query(
      `SELECT id FROM notification_settings
       WHERE entity_type = :entityType AND entity_id = :entityId`,
      {
        replacements: { entityType, entityId },
        type: QueryTypes.SELECT
      }
    );

    let query, replacements;

    if (existing.length > 0) {
      // 업데이트
      query = `
        UPDATE notification_settings SET
          email_enabled = :email_enabled,
          smtp_host = :smtp_host,
          smtp_port = :smtp_port,
          smtp_secure = :smtp_secure,
          smtp_user = :smtp_user,
          ${smtp_password && smtp_password !== '********' ? 'smtp_password = :smtp_password,' : ''}
          from_email = :from_email,
          from_name = :from_name,
          reply_to_email = :reply_to_email,
          sms_enabled = :sms_enabled,
          whatsapp_enabled = :whatsapp_enabled,
          updated_at = NOW()
        WHERE entity_type = :entityType AND entity_id = :entityId
      `;

      replacements = {
        entityType,
        entityId,
        email_enabled: email_enabled || false,
        smtp_host: smtp_host || '',
        smtp_port: smtp_port || 587,
        smtp_secure: smtp_secure || false,
        smtp_user: smtp_user || '',
        from_email: from_email || '',
        from_name: from_name || '',
        reply_to_email: reply_to_email || '',
        sms_enabled: sms_enabled || false,
        whatsapp_enabled: whatsapp_enabled || false
      };

      // 비밀번호가 마스킹되지 않았으면 암호화해서 업데이트
      if (smtp_password && smtp_password !== '********') {
        replacements.smtp_password = encrypt(smtp_password);
      }
    } else {
      // 새로 생성
      query = `
        INSERT INTO notification_settings (
          entity_type, entity_id,
          email_enabled, smtp_host, smtp_port, smtp_secure,
          smtp_user, smtp_password, from_email, from_name, reply_to_email,
          sms_enabled, whatsapp_enabled
        ) VALUES (
          :entityType, :entityId,
          :email_enabled, :smtp_host, :smtp_port, :smtp_secure,
          :smtp_user, :smtp_password, :from_email, :from_name, :reply_to_email,
          :sms_enabled, :whatsapp_enabled
        )
      `;

      replacements = {
        entityType,
        entityId,
        email_enabled: email_enabled || false,
        smtp_host: smtp_host || '',
        smtp_port: smtp_port || 587,
        smtp_secure: smtp_secure || false,
        smtp_user: smtp_user || '',
        smtp_password: smtp_password ? encrypt(smtp_password) : '',
        from_email: from_email || '',
        from_name: from_name || '',
        reply_to_email: reply_to_email || '',
        sms_enabled: sms_enabled || false,
        whatsapp_enabled: whatsapp_enabled || false
      };
    }

    if (existing.length > 0) {
      await sequelize.query(query, {
        replacements,
        type: QueryTypes.UPDATE
      });
    } else {
      await sequelize.query(query, {
        replacements,
        type: QueryTypes.INSERT
      });
    }

    res.json({ success: true, message: '알림 설정이 저장되었습니다.' });
  } catch (error) {
    console.error('알림 설정 저장 에러:', error);
    res.status(500).json({ error: '알림 설정을 저장할 수 없습니다.' });
  }
});

// POST - 테스트 이메일 발송
router.post('/:entityType/:entityId/test-email', authenticateToken, async (req, res) => {
  try {
    const { entityType, entityId } = req.params;
    const { testEmail } = req.body;

    if (!testEmail) {
      return res.status(400).json({ error: 'Test email address is required' });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(testEmail)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Import email service
    const emailService = require('../utils/emailService');

    // Send test email
    const result = await emailService.sendTestEmail(entityType, entityId, testEmail);

    res.json({
      success: true,
      message: `Test email sent successfully to ${testEmail}`,
      messageId: result.messageId
    });
  } catch (error) {
    console.error('Test email sending error:', error);

    // Provide user-friendly error messages
    let errorMessage = 'Failed to send test email';
    if (error.message.includes('not enabled')) {
      errorMessage = 'Email notifications are not enabled. Please enable them first.';
    } else if (error.message.includes('incomplete')) {
      errorMessage = 'SMTP settings are incomplete. Please fill in all required fields.';
    } else if (error.code === 'EAUTH') {
      errorMessage = 'SMTP authentication failed. Please check your username and password.';
    } else if (error.code === 'ECONNECTION') {
      errorMessage = 'Cannot connect to SMTP server. Please check your server and port settings.';
    }

    res.status(500).json({
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;

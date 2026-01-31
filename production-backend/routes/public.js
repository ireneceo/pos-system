// What and Why: 공개 API 라우트 및 Contact Inquiry 관리
// - 인증 없이 접근 가능한 공개 엔드포인트들 (랜딩 페이지용)
// - 인증 필요한 관리자용 Contact Inquiry 관리 엔드포인트들

const express = require('express');
const router = express.Router();
const ContactInquiry = require('../models/ContactInquiry');
const PlanTemplate = require('../models/PlanTemplate');
const { authenticateToken } = require('../middleware/auth');
const nodemailer = require('nodemailer');
const { Op } = require('sequelize');
const { decrypt } = require('../utils/encryption');

// ==============================================
// 이메일 설정 (시스템 설정에서 가져오기)
// ==============================================
async function getEmailTransporter() {
  try {
    const SystemSettings = require('../models/SystemSettings');
    const emailSettings = await SystemSettings.findOne({
      where: { setting_key: 'email_settings' }
    });

    if (emailSettings && emailSettings.setting_value) {
      const config = emailSettings.setting_value;
      return nodemailer.createTransport({
        host: config.smtp_host,
        port: config.smtp_port,
        secure: config.smtp_port === 465,
        auth: {
          user: config.smtp_user,
          pass: decrypt(config.smtp_password)
        }
      });
    }
  } catch (error) {
    console.error('Failed to get email settings:', error);
  }
  return null;
}

// ==============================================
// Public Contact Form API (인증 불필요)
// ==============================================

// POST /api/public/contact - 문의 제출
router.post('/contact', async (req, res) => {
  try {
    const { name, email, phone, company_name, interested_plan, message } = req.body;

    // 필수 필드 검증
    if (!name || !email || !message) {
      return res.status(400).json({
        error: 'Name, email, and message are required'
      });
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Invalid email format'
      });
    }

    // DB 저장
    const inquiry = await ContactInquiry.create({
      name,
      email,
      phone: phone || null,
      company_name: company_name || null,
      interested_plan: interested_plan || null,
      message,
      status: 'new'
    });


    res.status(201).json({
      success: true,
      message: 'Your inquiry has been submitted successfully',
      inquiry_id: inquiry.id
    });

  } catch (error) {
    console.error('Error submitting contact inquiry:', error);
    res.status(500).json({
      error: 'Failed to submit inquiry. Please try again.'
    });
  }
});

// ==============================================
// Public Plans API (인증 불필요)
// ==============================================

// GET /api/public/plans - 공개 플랜 목록 조회
router.get('/plans', async (req, res) => {
  try {
    const plans = await PlanTemplate.findAll({
      where: {
        is_active: true
      },
      attributes: [
        'id',
        'name',
        'display_name',
        'base_price_monthly',
        'base_price_annual',
        'features',
        'plan_target',
        'order_limit',
        'menu_item_limit',
        'staff_limit',
        'included_modules'
      ],
      order: [
        ['plan_target', 'ASC'],
        ['sort_order', 'ASC'],
        ['base_price_monthly', 'ASC']
      ]
    });

    res.json(plans);

  } catch (error) {
    console.error('Error fetching public plans:', error);
    res.status(500).json({
      error: 'Failed to load plans'
    });
  }
});

// ==============================================
// Admin Contact Inquiry Management (인증 필요)
// ==============================================

// GET /api/public/admin/inquiries - 문의 목록 조회 (System Admin 전용)
router.get('/admin/inquiries', authenticateToken, async (req, res) => {
  try {
    // System Admin 권한 확인
    if (req.user.role !== 'System Admin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    const { status, search } = req.query;

    const where = {};
    if (status && status !== 'all') {
      where.status = status;
    }

    if (search) {
      where[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } },
        { company_name: { [Op.like]: `%${search}%` } },
        { message: { [Op.like]: `%${search}%` } }
      ];
    }

    const inquiries = await ContactInquiry.findAll({
      where,
      order: [['createdAt', 'DESC']]
    });

    res.json(inquiries);

  } catch (error) {
    console.error('Error fetching contact inquiries:', error);
    res.status(500).json({ error: 'Failed to fetch inquiries' });
  }
});

// GET /api/public/admin/inquiries/:id - 문의 상세 조회
router.get('/admin/inquiries/:id', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'System Admin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    const inquiry = await ContactInquiry.findByPk(req.params.id);

    if (!inquiry) {
      return res.status(404).json({ error: 'Inquiry not found' });
    }

    res.json(inquiry);

  } catch (error) {
    console.error('Error fetching inquiry:', error);
    res.status(500).json({ error: 'Failed to fetch inquiry' });
  }
});

// PATCH /api/public/admin/inquiries/:id - 문의 상태 업데이트
router.patch('/admin/inquiries/:id', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'System Admin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    const inquiry = await ContactInquiry.findByPk(req.params.id);

    if (!inquiry) {
      return res.status(404).json({ error: 'Inquiry not found' });
    }

    const { status, notes, assigned_to } = req.body;

    const updateData = {};
    if (status) updateData.status = status;
    if (notes !== undefined) updateData.notes = notes;
    if (assigned_to !== undefined) updateData.assigned_to = assigned_to;

    if (status === 'resolved' || status === 'closed') {
      updateData.resolved_at = new Date();
    }

    await inquiry.update(updateData);

    res.json(inquiry);

  } catch (error) {
    console.error('Error updating inquiry:', error);
    res.status(500).json({ error: 'Failed to update inquiry' });
  }
});

// POST /api/public/admin/inquiries/:id/reply - 문의 답변 및 이메일 발송
router.post('/admin/inquiries/:id/reply', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'System Admin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    const inquiry = await ContactInquiry.findByPk(req.params.id);

    if (!inquiry) {
      return res.status(404).json({ error: 'Inquiry not found' });
    }

    const { reply_message, send_email } = req.body;

    if (!reply_message || reply_message.trim() === '') {
      return res.status(400).json({ error: 'Reply message is required' });
    }

    // 답변 저장
    await inquiry.update({
      reply_message,
      replied_by: req.user.id,
      replied_by_name: req.user.full_name || req.user.email,
      replied_at: new Date(),
      status: 'resolved'
    });

    // 이메일 발송
    if (send_email) {
      try {
        const transporter = await getEmailTransporter();

        if (transporter) {
          const CompanySettings = require('../models/CompanySettings');
          const company = await CompanySettings.findOne({ where: { id: 1 } });
          const companyName = company?.company_name || 'PurpleHere';

          await transporter.sendMail({
            from: `"${companyName} Support" <noreply@purplehere.com>`,
            to: inquiry.email,
            subject: `Re: Your inquiry to ${companyName}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #635BFF;">Thank you for contacting us</h2>
                <p>Dear ${inquiry.name},</p>
                <p>Thank you for your inquiry. Here is our response:</p>
                <div style="background: #F8FAFC; padding: 20px; border-left: 4px solid #635BFF; margin: 20px 0;">
                  ${reply_message.replace(/\n/g, '<br>')}
                </div>
                <hr style="border: none; border-top: 1px solid #E6EBF1; margin: 20px 0;">
                <p style="color: #6B7280; font-size: 14px;">
                  <strong>Your original message:</strong><br>
                  ${inquiry.message.replace(/\n/g, '<br>')}
                </p>
                <hr style="border: none; border-top: 1px solid #E6EBF1; margin: 20px 0;">
                <p style="color: #6B7280; font-size: 12px;">
                  Best regards,<br>
                  ${companyName} Team
                </p>
              </div>
            `
          });

          await inquiry.update({
            email_sent: true,
            email_sent_at: new Date()
          });

        } else {
        }
      } catch (emailError) {
        console.error('Failed to send reply email:', emailError);
        // 이메일 실패해도 답변은 저장됨
      }
    }

    res.json({
      success: true,
      message: send_email ? 'Reply saved and email sent' : 'Reply saved',
      inquiry
    });

  } catch (error) {
    console.error('Error replying to inquiry:', error);
    res.status(500).json({ error: 'Failed to send reply' });
  }
});

// DELETE /api/public/admin/inquiries/:id - 문의 삭제
router.delete('/admin/inquiries/:id', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'System Admin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    const inquiry = await ContactInquiry.findByPk(req.params.id);

    if (!inquiry) {
      return res.status(404).json({ error: 'Inquiry not found' });
    }

    await inquiry.destroy();

    res.json({ success: true, message: 'Inquiry deleted' });

  } catch (error) {
    console.error('Error deleting inquiry:', error);
    res.status(500).json({ error: 'Failed to delete inquiry' });
  }
});

// GET /api/public/admin/inquiries/stats - 문의 통계
router.get('/admin/inquiries-stats', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'System Admin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    const [total, newCount, inProgress, resolved] = await Promise.all([
      ContactInquiry.count(),
      ContactInquiry.count({ where: { status: 'new' } }),
      ContactInquiry.count({ where: { status: 'in_progress' } }),
      ContactInquiry.count({ where: { status: { [Op.in]: ['resolved', 'closed'] } } })
    ]);

    res.json({
      total,
      new: newCount,
      in_progress: inProgress,
      resolved
    });

  } catch (error) {
    console.error('Error fetching inquiry stats:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

module.exports = router;

// What and Why: 공개 API 라우트 및 Contact Inquiry 관리
// - 인증 없이 접근 가능한 공개 엔드포인트들 (랜딩 페이지용)
// - 인증 필요한 관리자용 Contact Inquiry 관리 엔드포인트들

const express = require('express');
const router = express.Router();
const ContactInquiry = require('../models/ContactInquiry');
const PlanTemplate = require('../models/PlanTemplate');
const PlanPrice = require('../models/PlanPrice');
const { authenticateToken } = require('../middleware/auth');
const { Op } = require('sequelize');
const { sendPlatformEmail } = require('../utils/emailService');

// ==============================================
// Public Contact Form API (인증 불필요)
// ==============================================

// POST /api/public/contact - 문의 제출
router.post('/contact', async (req, res) => {
  try {
    const { name, email, phone, company_name, inquiry_type, interested_plan, preferred_username, message } = req.body;

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

    // Free Trial 신청 시 필수 필드 검증
    if (inquiry_type === 'free_trial') {
      if (!interested_plan) {
        return res.status(400).json({
          error: 'Please select a plan for free trial'
        });
      }
      if (!preferred_username) {
        return res.status(400).json({
          error: 'Preferred username is required for free trial'
        });
      }
      // username 형식 검증
      const usernameRegex = /^[a-zA-Z0-9_]+$/;
      if (!usernameRegex.test(preferred_username)) {
        return res.status(400).json({
          error: 'Username can only contain letters, numbers, and underscores'
        });
      }
    }

    // DB 저장
    const inquiry = await ContactInquiry.create({
      name,
      email,
      phone: phone || null,
      company_name: company_name || null,
      inquiry_type: inquiry_type || 'other',
      interested_plan: interested_plan || null,
      preferred_username: preferred_username || null,
      message,
      status: 'new'
    });

    console.log(`📬 New contact inquiry received: ${name} (${email}) - Type: ${inquiry_type || 'other'}`);

    // Send confirmation email to customer (non-blocking)
    try {
      const CompanySettings = require('../models/CompanySettings');
      const company = await CompanySettings.findOne({ where: { id: 1 } });
      const companyName = company?.company_name || 'PurpleHere';

      await sendPlatformEmail({
        to: email,
        subject: `Thank you for contacting ${companyName}`,
        html: `<!DOCTYPE html><html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#F6F9FC;font-family:'Inter',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F6F9FC;padding:40px 20px;"><tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:white;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
  <tr><td style="background:linear-gradient(135deg,#635BFF,#4B45C6);padding:24px 32px;"><a href="https://purplehere.com" style="text-decoration:none;"><h1 style="margin:0;color:white;font-size:22px;font-weight:600;">PurpleHere</h1></a></td></tr>
  <tr><td style="padding:32px;">
    <h2 style="color:#0A2540;font-size:20px;margin:0 0 16px;">We've received your inquiry</h2>
    <p style="color:#374151;font-size:14px;line-height:1.6;">Dear ${name},</p>
    <p style="color:#374151;font-size:14px;line-height:1.6;">Thank you for reaching out. We have received your message and will review it shortly.</p>
    <p style="color:#374151;font-size:14px;line-height:1.6;"><strong>We typically respond within 24 hours during business days.</strong></p>
    <div style="background:#F8FAFC;padding:16px;border-radius:8px;margin:20px 0;border-left:4px solid #635BFF;">
      <p style="color:#6B7280;font-size:13px;margin:0 0 8px;"><strong>Your message:</strong></p>
      <p style="color:#374151;font-size:14px;margin:0;white-space:pre-wrap;">${message.length > 500 ? message.substring(0, 500) + '...' : message}</p>
    </div>${inquiry_type === 'free_trial' ? '<div style="background:#EEF2FF;padding:16px;border-radius:8px;margin:20px 0;"><p style="color:#4338CA;font-size:14px;margin:0;"><strong>Free Trial Request</strong> — We will set up your account and get back to you with login details.</p></div>' : ''}
  </td></tr>
  <tr><td style="background:#F8FAFC;padding:20px 32px;border-top:1px solid #E6EBF1;"><p style="margin:0;color:#6B7C93;font-size:12px;text-align:center;">This is an automated message from <a href="https://purplehere.com" style="color:#635BFF;text-decoration:none;">PurpleHere</a>. No-reply email.<br><span style="color:#9CA3AF;">help@purplehere.com</span></p></td></tr>
</table></td></tr></table></body></html>`
      });
    } catch (emailError) {
      // Email failure should not block the inquiry submission
      console.error('Failed to send confirmation email:', emailError.message);
    }

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
router.get('/plans', async (_req, res) => {
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
        'restaurant_limit',
        'manager_limit',
        'included_modules'
      ],
      order: [
        ['plan_target', 'ASC'],
        ['sort_order', 'ASC'],
        ['base_price_monthly', 'ASC']
      ]
    });

    // 각 플랜의 통화별 가격 정보 가져오기
    const plansWithPrices = await Promise.all(plans.map(async (plan) => {
      const prices = await PlanPrice.findAll({
        where: {
          plan_id: plan.id,
          is_active: true
        },
        attributes: ['currency', 'monthly_price', 'annual_price']
      });

      const planData = plan.toJSON();
      // features/included_modules가 문자열인 경우 배열로 파싱
      let features = planData.features;
      if (typeof features === 'string') {
        try { features = JSON.parse(features); } catch { features = []; }
      }
      let included_modules = planData.included_modules;
      if (typeof included_modules === 'string') {
        try { included_modules = JSON.parse(included_modules); } catch { included_modules = []; }
      }

      return {
        ...planData,
        features: Array.isArray(features) ? features : [],
        included_modules: Array.isArray(included_modules) ? included_modules : [],
        currency_prices: prices.reduce((acc, p) => {
          acc[p.currency] = {
            monthly: parseFloat(p.monthly_price),
            annual: parseFloat(p.annual_price)
          };
          return acc;
        }, {})
      };
    }));

    res.json(plansWithPrices);

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

    // 이메일 발송 (Admin의 notification_settings SMTP 사용)
    if (send_email) {
      try {
        const CompanySettings = require('../models/CompanySettings');
        const company = await CompanySettings.findOne({ where: { id: 1 } });
        const companyName = company?.company_name || 'PurpleHere';

        await sendPlatformEmail({
          to: inquiry.email,
          subject: `Re: Your inquiry to ${companyName}`,
          html: `<!DOCTYPE html><html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#F6F9FC;font-family:'Inter',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F6F9FC;padding:40px 20px;"><tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:white;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
  <tr><td style="background:linear-gradient(135deg,#635BFF,#4B45C6);padding:24px 32px;"><a href="https://purplehere.com" style="text-decoration:none;"><h1 style="margin:0;color:white;font-size:22px;font-weight:600;">PurpleHere</h1></a></td></tr>
  <tr><td style="padding:32px;">
    <h2 style="color:#0A2540;font-size:20px;margin:0 0 16px;">Response to Your Inquiry</h2>
    <p style="color:#374151;font-size:14px;line-height:1.6;">Dear ${inquiry.name},</p>
    <p style="color:#374151;font-size:14px;line-height:1.6;">Thank you for your inquiry. Here is our response:</p>
    <div style="background:#F8FAFC;padding:16px 20px;border-left:4px solid #635BFF;border-radius:0 8px 8px 0;margin:20px 0;">
      <p style="color:#374151;font-size:14px;margin:0;line-height:1.6;">${reply_message.replace(/\n/g, '<br>')}</p>
    </div>
    <div style="margin:20px 0;padding-top:16px;border-top:1px solid #E6EBF1;">
      <p style="color:#6B7280;font-size:13px;margin:0 0 8px;"><strong>Your original message:</strong></p>
      <p style="color:#9CA3AF;font-size:13px;margin:0;line-height:1.5;">${inquiry.message.replace(/\n/g, '<br>')}</p>
    </div>
  </td></tr>
  <tr><td style="background:#F8FAFC;padding:20px 32px;border-top:1px solid #E6EBF1;"><p style="margin:0;color:#6B7C93;font-size:12px;text-align:center;">Best regards, ${companyName} Team<br>This is a no-reply email. <a href="https://purplehere.com" style="color:#635BFF;text-decoration:none;">purplehere.com</a></p></td></tr>
</table></td></tr></table></body></html>`
        });

        await inquiry.update({
          email_sent: true,
          email_sent_at: new Date()
        });

        console.log(`📧 Reply email sent to ${inquiry.email}`);
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

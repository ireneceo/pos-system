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
const { sendNotificationBatch, getSystemAdminIds } = require('../utils/notificationService');
const { emailLayout, getLogoAttachment } = require('../utils/emailTemplates');

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

      const confirmBody = `
        <h2 style="color:#0A2540;font-size:20px;font-weight:600;margin:0 0 16px;">We've received your inquiry</h2>
        <p style="color:#374151;font-size:14px;line-height:1.6;">Dear ${name},</p>
        <p style="color:#374151;font-size:14px;line-height:1.6;">Thank you for reaching out. We have received your message and will review it shortly.</p>
        <p style="color:#374151;font-size:14px;line-height:1.6;"><strong>We typically respond within 24 hours during business days.</strong></p>
        <div style="background:#F8FAFC;padding:16px;border-radius:8px;margin:20px 0;border-left:4px solid #635BFF;">
          <p style="color:#6B7280;font-size:13px;margin:0 0 8px;"><strong>Your message:</strong></p>
          <p style="color:#374151;font-size:14px;margin:0;white-space:pre-wrap;">${message.length > 500 ? message.substring(0, 500) + '...' : message}</p>
        </div>${inquiry_type === 'free_trial' ? '<div style="background:#EEF2FF;padding:16px;border-radius:8px;margin:20px 0;"><p style="color:#4338CA;font-size:14px;margin:0;"><strong>Free Trial Request</strong> — We will set up your account and get back to you with login details.</p></div>' : ''}`;

      await sendPlatformEmail({
        to: email,
        subject: `Thank you for contacting ${companyName}`,
        html: emailLayout(confirmBody),
        attachments: getLogoAttachment()
      });
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError.message);
    }

    // Notify System Admins about new contact inquiry (non-blocking)
    try {
      const adminIds = await getSystemAdminIds();
      if (adminIds.length > 0) {
        const adminBody = `
          <h2 style="color:#0A2540;font-size:20px;font-weight:600;margin:0 0 16px;">New Contact Inquiry</h2>
          <table style="width:100%;border-collapse:collapse;margin:16px 0;">
            <tr><td style="padding:10px 16px;font-size:14px;color:#6B7280;border-bottom:1px solid #E5E7EB;width:35%;">Name</td><td style="padding:10px 16px;font-size:14px;color:#111827;border-bottom:1px solid #E5E7EB;">${name}</td></tr>
            <tr><td style="padding:10px 16px;font-size:14px;color:#6B7280;border-bottom:1px solid #E5E7EB;">Email</td><td style="padding:10px 16px;font-size:14px;color:#111827;border-bottom:1px solid #E5E7EB;">${email}</td></tr>
            ${phone ? `<tr><td style="padding:10px 16px;font-size:14px;color:#6B7280;border-bottom:1px solid #E5E7EB;">Phone</td><td style="padding:10px 16px;font-size:14px;color:#111827;border-bottom:1px solid #E5E7EB;">${phone}</td></tr>` : ''}
            ${company_name ? `<tr><td style="padding:10px 16px;font-size:14px;color:#6B7280;border-bottom:1px solid #E5E7EB;">Company</td><td style="padding:10px 16px;font-size:14px;color:#111827;border-bottom:1px solid #E5E7EB;">${company_name}</td></tr>` : ''}
            <tr><td style="padding:10px 16px;font-size:14px;color:#6B7280;border-bottom:1px solid #E5E7EB;">Type</td><td style="padding:10px 16px;font-size:14px;color:#111827;border-bottom:1px solid #E5E7EB;">${inquiry_type || 'other'}</td></tr>
          </table>
          <div style="background:#F8FAFC;padding:16px;border-radius:8px;margin:16px 0;border-left:4px solid #635BFF;">
            <p style="color:#6B7280;font-size:13px;margin:0 0 8px;"><strong>Message:</strong></p>
            <p style="color:#374151;font-size:14px;margin:0;white-space:pre-wrap;">${message.length > 1000 ? message.substring(0, 1000) + '...' : message}</p>
          </div>
          <div style="text-align:center;margin:24px 0 8px;">
            <a href="${process.env.FRONTEND_URL || (process.env.NODE_ENV === 'production' ? 'https://purplehere.com' : 'https://dev.purplehere.com')}/pos/admin/contact-inquiries" style="display:inline-block;background:#635BFF;color:#ffffff;padding:12px 32px;border-radius:6px;text-decoration:none;font-weight:600;font-size:15px;">View in Dashboard</a>
          </div>`;

        await sendNotificationBatch(adminIds, 'inquiry_received', {
          subject: `[Contact] New inquiry from ${name} - ${inquiry_type || 'other'}`,
          html: emailLayout(adminBody),
          attachments: getLogoAttachment()
        });
      }
    } catch (adminEmailError) {
      console.error('Failed to notify admins:', adminEmailError.message);
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
  <tr><td style="background:linear-gradient(135deg,#635BFF,#4B45C6);padding:24px 32px;"><a href="${process.env.FRONTEND_URL || (process.env.NODE_ENV === 'production' ? 'https://purplehere.com' : 'https://dev.purplehere.com')}" style="text-decoration:none;"><h1 style="margin:0;color:white;font-size:22px;font-weight:600;">PurpleHere</h1></a></td></tr>
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
  <tr><td style="background:#F8FAFC;padding:20px 32px;border-top:1px solid #E6EBF1;"><p style="margin:0;color:#6B7C93;font-size:12px;text-align:center;">Best regards, ${companyName} Team<br>This is a no-reply email. <a href="${process.env.FRONTEND_URL || (process.env.NODE_ENV === 'production' ? 'https://purplehere.com' : 'https://dev.purplehere.com')}" style="color:#635BFF;text-decoration:none;">purplehere.com</a></p></td></tr>
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

// ==============================================
// Public Hardware Packages API (인증 불필요)
// ==============================================

const { SystemProduct, SystemProductCategory, SystemProductPrice, SystemProductAddon } = require('../models');

/**
 * GET /api/public/packages?country=MY
 * Returns set products (packages) with included items, addons, and prices
 * Filtered by country (shipping_countries)
 */
router.get('/packages', async (req, res) => {
  try {
    const { country } = req.query;

    // Get all active set products
    const setProducts = await SystemProduct.findAll({
      where: { is_set: true, is_active: true },
      include: [
        { model: SystemProductCategory, as: 'category', attributes: ['id', 'name', 'emoji'] },
        { model: SystemProductPrice, as: 'prices', where: { is_active: true }, required: false },
        {
          model: SystemProductAddon, as: 'addons',
          include: [{
            model: SystemProduct, as: 'addonProduct',
            attributes: ['id', 'name', 'sku', 'emoji', 'image_url', 'is_active', 'shipping_countries'],
            include: [
              { model: SystemProductPrice, as: 'prices', where: { is_active: true }, required: false },
              { model: SystemProductCategory, as: 'category', attributes: ['id', 'name', 'emoji'] }
            ]
          }],
          order: [['sort_order', 'ASC']]
        }
      ],
      order: [['set_group', 'ASC'], ['set_display_order', 'ASC'], ['sort_order', 'ASC']]
    });

    // Filter by country if provided
    let filtered = setProducts;
    if (country) {
      filtered = setProducts.filter(p => {
        const countries = p.shipping_countries;
        return countries && Array.isArray(countries) && countries.includes(country.toUpperCase());
      });
    }

    // Build response with prices mapped by currency
    const data = filtered.map(p => {
      const json = p.toJSON();

      // Map prices to currency_prices object
      const currency_prices = {};
      if (json.prices) {
        json.prices.forEach(pr => {
          currency_prices[pr.currency] = parseFloat(pr.price);
        });
      }

      // Map addon product prices
      if (json.addons) {
        json.addons = json.addons
          .filter(a => a.addonProduct && a.addonProduct.is_active)
          .map(a => {
            const addonPrices = {};
            if (a.addonProduct.prices) {
              a.addonProduct.prices.forEach(pr => {
                addonPrices[pr.currency] = parseFloat(pr.price);
              });
            }
            return {
              ...a,
              addonProduct: {
                ...a.addonProduct,
                currency_prices: addonPrices
              }
            };
          });
      }

      return {
        ...json,
        currency_prices
      };
    });

    res.json({ success: true, data });
  } catch (error) {
    console.error('Get public packages error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch packages' });
  }
});

/**
 * POST /api/public/hardware-quotes
 * Submit a hardware quote request (no auth required)
 */
router.post('/hardware-quotes', async (req, res) => {
  try {
    const {
      contact_name, contact_email, contact_phone, company_name, message,
      country_code, currency,
      package_product_id, package_snapshot, addon_items,
      package_price, addon_total, total_amount,
      company_address, tax_id, wants_invoice,
      plan_id, billing_cycle
    } = req.body;

    if (!contact_name || !contact_email) {
      return res.status(400).json({ success: false, message: 'Name and email are required' });
    }

    // Generate quote number: QUO-YYMMDDNNN
    const now = new Date();
    const dateStr = now.toISOString().slice(2, 10).replace(/-/g, '');
    const { HardwareQuote } = require('../models');
    const todayCount = await HardwareQuote.count({
      where: {
        created_at: {
          [Op.gte]: new Date(now.getFullYear(), now.getMonth(), now.getDate())
        }
      }
    });
    const quoteNumber = `QUO-${dateStr}${String(todayCount + 1).padStart(3, '0')}`;

    const quote = await HardwareQuote.create({
      quote_number: quoteNumber,
      contact_name: contact_name.trim(),
      contact_email: contact_email.trim(),
      contact_phone: contact_phone || null,
      company_name: company_name || null,
      company_address: company_address || null,
      tax_id: tax_id || null,
      wants_invoice: wants_invoice || false,
      plan_id: plan_id || null,
      billing_cycle: billing_cycle || null,
      message: message || null,
      country_code: country_code || null,
      currency: currency || null,
      package_product_id: package_product_id || null,
      package_snapshot: package_snapshot || null,
      addon_items: addon_items || [],
      package_price: package_price || null,
      addon_total: addon_total || 0,
      total_amount: total_amount || null,
      status: 'new'
    });

    // Send confirmation email to customer
    try {
      const CompanySettings = require('../models/CompanySettings');
      const companySettings = await CompanySettings.findOne();
      const companyName = companySettings?.company_name || 'Purple POS';

      // Build package details for email
      const pkgName = package_snapshot?.name || 'Hardware Package';
      const pkgItems = (package_snapshot?.set_items || []).map(i => `${i.name} x${i.quantity}`).join(', ');
      const addonList = (addon_items || []).filter(a => a.quantity > 0).map(a => `${a.name} x${a.quantity}`).join(', ');

      await sendPlatformEmail({
        to: contact_email,
        subject: `Quote Request Received - ${quoteNumber}`,
        html: emailLayout(companyName, `
          <h2 style="color: #0A2540; margin: 0 0 16px 0;">Quote Request Received</h2>
          <p>Hi ${contact_name},</p>
          <p>Thank you for your interest! We've received your hardware package quote request.</p>
          <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
            <tr><td style="padding: 8px; border-bottom: 1px solid #E6EBF1; color: #6B7280;">Quote Number</td><td style="padding: 8px; border-bottom: 1px solid #E6EBF1; font-weight: 600;">${quoteNumber}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #E6EBF1; color: #6B7280;">Package</td><td style="padding: 8px; border-bottom: 1px solid #E6EBF1; font-weight: 500;">${pkgName}</td></tr>
            ${pkgItems ? `<tr><td style="padding: 8px; border-bottom: 1px solid #E6EBF1; color: #6B7280;">Included</td><td style="padding: 8px; border-bottom: 1px solid #E6EBF1;">${pkgItems}</td></tr>` : ''}
            ${addonList ? `<tr><td style="padding: 8px; border-bottom: 1px solid #E6EBF1; color: #6B7280;">Additional</td><td style="padding: 8px; border-bottom: 1px solid #E6EBF1;">${addonList}</td></tr>` : ''}
            <tr><td style="padding: 8px; border-bottom: 1px solid #E6EBF1; color: #6B7280;">Package Price</td><td style="padding: 8px; border-bottom: 1px solid #E6EBF1;">${currency || ''} ${package_price ? Number(package_price).toLocaleString() : '-'}</td></tr>
            ${addon_total ? `<tr><td style="padding: 8px; border-bottom: 1px solid #E6EBF1; color: #6B7280;">Additional Total</td><td style="padding: 8px; border-bottom: 1px solid #E6EBF1;">${currency || ''} ${Number(addon_total).toLocaleString()}</td></tr>` : ''}
            <tr><td style="padding: 8px; border-bottom: 1px solid #E6EBF1; color: #6B7280;"><strong>Estimated Total</strong></td><td style="padding: 8px; border-bottom: 1px solid #E6EBF1; font-weight: 600; font-size: 16px;">${currency || ''} ${total_amount ? Number(total_amount).toLocaleString() : 'TBD'}</td></tr>
          </table>
          ${message ? `<div style="background: #F8FAFC; padding: 12px 16px; border-radius: 8px; margin: 16px 0;"><p style="color: #6B7280; font-size: 13px; margin: 0 0 4px;">Your message:</p><p style="color: #374151; font-size: 14px; margin: 0;">${message}</p></div>` : ''}
          <p>Our team will review your configuration and contact you within 1-2 business days.</p>
          <p style="color: #6B7280; font-size: 14px;">If you have any questions, please reply to this email.</p>
        `),
        attachments: getLogoAttachment()
      });
    } catch (emailErr) {
      console.error('Quote confirmation email error:', emailErr.message);
    }

    // Notify system admins
    try {
      const adminIds = await getSystemAdminIds();
      if (adminIds.length > 0) {
        await sendNotificationBatch(adminIds, 'hardware_quote', {
          subject: `[Hardware Quote] New request: ${quoteNumber}`,
          html: emailLayout('Purple POS', `
            <h2 style="color: #0A2540;">New Hardware Quote Request</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px; border-bottom: 1px solid #E6EBF1;">Quote</td><td style="padding: 8px; border-bottom: 1px solid #E6EBF1;">${quoteNumber}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #E6EBF1;">Name</td><td style="padding: 8px; border-bottom: 1px solid #E6EBF1;">${contact_name}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #E6EBF1;">Email</td><td style="padding: 8px; border-bottom: 1px solid #E6EBF1;">${contact_email}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #E6EBF1;">Total</td><td style="padding: 8px; border-bottom: 1px solid #E6EBF1;">${currency || ''} ${total_amount ? Number(total_amount).toLocaleString() : 'N/A'}</td></tr>
            </table>
          `),
          attachments: getLogoAttachment()
        });
      }
    } catch (notifyErr) {
      console.error('Admin notification error:', notifyErr.message);
    }

    res.status(201).json({
      success: true,
      message: 'Quote request submitted successfully',
      data: { quote_number: quoteNumber, id: quote.id }
    });
  } catch (error) {
    console.error('Create hardware quote error:', error);
    res.status(500).json({ success: false, message: 'Failed to submit quote request' });
  }
});

module.exports = router;

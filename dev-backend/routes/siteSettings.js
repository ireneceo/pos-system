const express = require('express');
const router = express.Router();
const CompanySettings = require('../models/CompanySettings');
const { authenticateToken, requireRole } = require('../middleware/auth');
const { deleteOldImages, saveImageToFile } = require('../utils/imageProcessor');

// og_image_url (209KB Base64) excluded by default for performance (231KB → ~21KB)
// brand_logo (19KB) and favicon_url (1.5KB) are kept - used by App.tsx and layouts
const IMAGE_FIELDS = ['og_image_url'];

// GET /api/site-settings - Get site settings (public)
// Use ?include=images to include Base64 image fields (for admin settings page only)
router.get('/', async (req, res) => {
  try {
    let settings = await CompanySettings.findOne();

    // If no settings exist, create default
    if (!settings) {
      settings = await CompanySettings.create({
        company_name: 'OrderHere POS System',
        site_name: 'OrderHere POS',
        seo_title: 'OrderHere - Restaurant POS System',
        seo_description: 'Complete restaurant management solution with POS, ordering, and analytics',
        seo_keywords: 'restaurant pos, food ordering, restaurant management, pos system'
      });
    }

    const result = {
      ...settings.toJSON(),
      email: settings.email || 'support@purplehere.com',
      phone: settings.phone || '',
      whatsapp: settings.whatsapp || settings.phone || '',
      business_hours: settings.business_hours || {
        weekdays: '9:00 AM - 6:00 PM (GMT+8)',
        weekend: 'Closed'
      }
    };

    // Exclude heavy Base64 image fields unless explicitly requested
    if (req.query.include !== 'images') {
      for (const field of IMAGE_FIELDS) {
        delete result[field];
      }
    }

    res.json(result);
  } catch (error) {
    console.error('Error fetching site settings:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to fetch site settings', code: 'INTERNAL_ERROR' } });
  }
});

// PUT /api/site-settings - Update site settings (System Admin only)
router.put('/', authenticateToken, requireRole('System Admin'), async (req, res) => {
  try {
    const {
      site_name,
      favicon_url,
      brand_logo,
      seo_title,
      seo_description,
      seo_keywords,
      og_image_url,
      timezone
    } = req.body;

    // Base64 이미지를 고정 파일로 저장
    let savedFavicon = favicon_url;
    let savedBrandLogo = brand_logo;

    if (favicon_url && favicon_url.startsWith('data:image/')) {
      const result = await saveImageToFile(favicon_url, 'favicon', { maxWidth: 64, maxHeight: 64 });
      if (!result) {
        return res.status(400).json({ success: false, message: 'Favicon 저장 실패 — 형식을 확인해주세요 (PNG/JPG/SVG)' });
      }
      savedFavicon = result;
    }
    if (brand_logo && brand_logo.startsWith('data:image/')) {
      const result = await saveImageToFile(brand_logo, 'brand-logo', { maxWidth: 400, maxHeight: 400 });
      if (!result) {
        return res.status(400).json({ success: false, message: 'Logo 저장 실패 — 형식을 확인해주세요 (PNG/JPG/SVG)' });
      }
      savedBrandLogo = result;
    }

    let settings = await CompanySettings.findOne();

    if (!settings) {
      // Create if doesn't exist
      settings = await CompanySettings.create({
        company_name: 'OrderHere POS System',
        site_name,
        favicon_url: savedFavicon,
        brand_logo: savedBrandLogo,
        seo_title,
        seo_description,
        seo_keywords,
        og_image_url,
        timezone: timezone || 'Asia/Kuala_Lumpur'
      });
    } else {
      // 이미지 변경 시 이전 파일 삭제
      if (savedFavicon && settings.favicon_url && savedFavicon !== settings.favicon_url) {
        await deleteOldImages(settings.favicon_url);
      }
      if (savedBrandLogo && settings.brand_logo && savedBrandLogo !== settings.brand_logo) {
        await deleteOldImages(settings.brand_logo);
      }
      if (og_image_url && settings.og_image_url && og_image_url !== settings.og_image_url) {
        await deleteOldImages(settings.og_image_url);
      }
      // Update existing
      const updateData = {
        site_name,
        favicon_url: savedFavicon,
        brand_logo: savedBrandLogo,
        seo_title,
        seo_description,
        seo_keywords,
        og_image_url
      };
      if (timezone !== undefined) {
        updateData.timezone = timezone;
      }
      await settings.update(updateData);
    }

    res.json({
      success: true,
      message: 'Site settings updated successfully',
      settings
    });
  } catch (error) {
    console.error('Error updating site settings:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to update site settings', code: 'INTERNAL_ERROR' } });
  }
});

module.exports = router;

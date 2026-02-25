const express = require('express');
const router = express.Router();
const CompanySettings = require('../models/CompanySettings');
const { authenticateToken, requireRole } = require('../middleware/auth');

// GET /api/site-settings - Get site settings (public)
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

    // Return settings with contact info for public pages (Contact, etc.)
    res.json({
      ...settings.toJSON(),
      // Contact information from AdminSettings
      email: settings.email || 'support@purplehere.com',
      phone: settings.phone || '',
      whatsapp: settings.whatsapp || settings.phone || '',
      business_hours: settings.business_hours || {
        weekdays: '9:00 AM - 6:00 PM (GMT+8)',
        weekend: 'Closed'
      }
    });
  } catch (error) {
    console.error('Error fetching site settings:', error);
    res.status(500).json({ error: 'Failed to fetch site settings' });
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

    let settings = await CompanySettings.findOne();

    if (!settings) {
      // Create if doesn't exist
      settings = await CompanySettings.create({
        company_name: 'OrderHere POS System',
        site_name,
        favicon_url,
        brand_logo,
        seo_title,
        seo_description,
        seo_keywords,
        og_image_url,
        timezone: timezone || 'Asia/Kuala_Lumpur'
      });
    } else {
      // Update existing
      const updateData = {
        site_name,
        favicon_url,
        brand_logo,
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
    res.status(500).json({ error: 'Failed to update site settings' });
  }
});

module.exports = router;

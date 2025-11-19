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

    res.json(settings);
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
      og_image_url
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
        og_image_url
      });
    } else {
      // Update existing
      await settings.update({
        site_name,
        favicon_url,
        brand_logo,
        seo_title,
        seo_description,
        seo_keywords,
        og_image_url
      });
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

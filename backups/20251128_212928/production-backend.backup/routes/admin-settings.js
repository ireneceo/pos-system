const express = require('express');
const router = express.Router();
const CompanySettings = require('../models/CompanySettings');

// GET - 회사 설정 조회
router.get('/', async (req, res) => {
  try {
    // 첫 번째 레코드 가져오기 (시스템에 하나만 존재)
    let settings = await CompanySettings.findOne();

    // 설정이 없으면 기본값 생성
    if (!settings) {
      settings = await CompanySettings.create({
        company_name: 'OrderHere POS System',
        address: 'Level 12, Menara UOA Bangsar',
        city: 'Kuala Lumpur',
        state: 'Federal Territory',
        postal_code: '59200',
        country: 'Malaysia',
        phone: '+60 3-2266 8888',
        email: 'admin@orderhere.my',
        website: 'www.orderhere.my',
        tax_number: '001234567890',
        registration_number: 'ROC 202301234567',
        logo: ''
      });
    }

    // 카멜케이스로 변환하여 응답
    res.json({
      companyName: settings.company_name,
      address: settings.address,
      city: settings.city,
      state: settings.state,
      postalCode: settings.postal_code,
      country: settings.country,
      phone: settings.phone,
      email: settings.email,
      website: settings.website,
      taxNumber: settings.tax_number,
      registrationNumber: settings.registration_number,
      brandLogo: settings.brand_logo || '', // Navigation/header logo
      companyLogo: settings.company_logo || '', // Invoice/document logo
      logo: settings.logo || '' // Keep for backward compatibility
    });

  } catch (error) {
    console.error('Error fetching company settings:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch company settings',
      details: error.message
    });
  }
});

// POST - 회사 설정 저장/업데이트
router.post('/', async (req, res) => {
  try {
    const {
      companyName,
      address,
      city,
      state,
      postalCode,
      country,
      phone,
      email,
      website,
      taxNumber,
      registrationNumber,
      brandLogo,
      companyLogo,
      logo
    } = req.body;

    // 첫 번째 레코드 찾기 또는 생성
    let settings = await CompanySettings.findOne();

    const settingsData = {
      company_name: companyName,
      address,
      city,
      state,
      postal_code: postalCode,
      country,
      phone,
      email,
      website,
      tax_number: taxNumber,
      registration_number: registrationNumber,
      brand_logo: brandLogo || '',
      company_logo: companyLogo || '',
      logo: logo || brandLogo || '' // Keep for backward compatibility
    };

    if (settings) {
      // 업데이트
      await settings.update(settingsData);
    } else {
      // 생성
      settings = await CompanySettings.create(settingsData);
    }

    res.json({
      success: true,
      message: 'Company settings saved successfully',
      data: {
        companyName: settings.company_name,
        address: settings.address,
        city: settings.city,
        state: settings.state,
        postalCode: settings.postal_code,
        country: settings.country,
        phone: settings.phone,
        email: settings.email,
        website: settings.website,
        taxNumber: settings.tax_number,
        registrationNumber: settings.registration_number,
        brandLogo: settings.brand_logo, // Navigation/header logo
        companyLogo: settings.company_logo, // Invoice/document logo
        logo: settings.logo // Keep for backward compatibility
      }
    });

  } catch (error) {
    console.error('Error saving company settings:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to save company settings',
      details: error.message
    });
  }
});

module.exports = router;

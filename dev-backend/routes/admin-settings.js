const express = require('express');
const router = express.Router();
const CompanySettings = require('../models/CompanySettings');
const { deleteOldImages, saveImageToFile } = require('../utils/imageProcessor');
const { authenticateToken, requireRole } = require('../middleware/auth');

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
      whatsapp: settings.whatsapp || '',
      email: settings.email,
      website: settings.website,
      taxNumber: settings.tax_number,
      registrationNumber: settings.registration_number,
      brandLogo: settings.brand_logo || '', // Navigation/header logo
      companyLogo: settings.company_logo || '', // Invoice/document logo
      logo: settings.logo || '', // Keep for backward compatibility
      bankName: settings.bank_name || '',
      bankAccount: settings.bank_account || '',
      bankAccountName: settings.bank_account_name || '',
      swiftCode: settings.swift_code || '',
      businessHours: settings.business_hours || { weekdays: '9:00 AM - 6:00 PM (GMT+8)', weekend: 'Closed' }
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

// POST - 회사 설정 저장/업데이트 (Admin only)
router.post('/', authenticateToken, requireRole('System Admin'), async (req, res) => {
  try {
    const {
      companyName,
      address,
      city,
      state,
      postalCode,
      country,
      phone,
      whatsapp,
      email,
      website,
      taxNumber,
      registrationNumber,
      brandLogo,
      companyLogo,
      logo,
      bankName,
      bankAccount,
      bankAccountName,
      swiftCode,
      businessHours
    } = req.body;

    // 첫 번째 레코드 찾기 또는 생성
    let settings = await CompanySettings.findOne();

    // Base64 이미지를 고정 파일로 저장
    let savedBrandLogo = brandLogo || '';
    if (brandLogo && brandLogo.startsWith('data:image/')) {
      savedBrandLogo = await saveImageToFile(brandLogo, 'brand-logo', { maxWidth: 400, maxHeight: 400 }) || '';
    }

    const settingsData = {
      company_name: companyName,
      address,
      city,
      state,
      postal_code: postalCode,
      country,
      phone,
      whatsapp: whatsapp || '',
      email,
      website,
      tax_number: taxNumber,
      registration_number: registrationNumber,
      brand_logo: savedBrandLogo,
      company_logo: companyLogo || '',
      logo: logo || savedBrandLogo || '', // Keep for backward compatibility
      bank_name: bankName || '',
      bank_account: bankAccount || '',
      bank_account_name: bankAccountName || '',
      swift_code: swiftCode || '',
      business_hours: businessHours || null
    };

    if (settings) {
      // 이미지 변경 시 이전 파일 삭제
      if (brandLogo && settings.brand_logo && brandLogo !== settings.brand_logo) {
        await deleteOldImages(settings.brand_logo);
      }
      if (companyLogo && settings.company_logo && companyLogo !== settings.company_logo) {
        await deleteOldImages(settings.company_logo);
      }
      if (logo && settings.logo && logo !== settings.logo) {
        await deleteOldImages(settings.logo);
      }
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
        whatsapp: settings.whatsapp,
        email: settings.email,
        website: settings.website,
        taxNumber: settings.tax_number,
        registrationNumber: settings.registration_number,
        brandLogo: settings.brand_logo, // Navigation/header logo
        companyLogo: settings.company_logo, // Invoice/document logo
        logo: settings.logo, // Keep for backward compatibility
        bankName: settings.bank_name,
        bankAccount: settings.bank_account,
        bankAccountName: settings.bank_account_name,
        swiftCode: settings.swift_code,
        businessHours: settings.business_hours
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

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
      address_line_2: settings.address_line_2 || '',
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
      address_line_2,
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

    // 인보이스·문서 로고도 파일로 — 그림 글자(base64)로 두면 인보이스 목록 응답에 줄마다 복제돼
    //   응답이 수십 MB 로 불었다(2026-08-23 실측 57배 · 2026-11-08 «인보이스 목록이 안 나와»).
    let savedCompanyLogo = companyLogo || '';
    if (companyLogo && companyLogo.startsWith('data:image/')) {
      savedCompanyLogo = await saveImageToFile(companyLogo, 'company-logo', { maxWidth: 400, maxHeight: 400 }) || '';
    }
    let savedLogo = logo || '';
    if (logo && logo.startsWith('data:image/')) {
      savedLogo = logo === companyLogo
        ? savedCompanyLogo
        : (await saveImageToFile(logo, 'logo-legacy', { maxWidth: 400, maxHeight: 400 }) || '');
    }

    const settingsData = {
      company_name: companyName,
      address,
      address_line_2: address_line_2 || null,
      city,
      state,
      postal_code: postalCode,
      country: country ? String(country).toUpperCase().slice(0, 2) : country,
      phone,
      whatsapp: whatsapp || '',
      email,
      website,
      tax_number: taxNumber,
      registration_number: registrationNumber,
      brand_logo: savedBrandLogo,
      company_logo: savedCompanyLogo,
      logo: savedLogo || savedBrandLogo || '', // Keep for backward compatibility
      bank_name: bankName || '',
      bank_account: bankAccount || '',
      bank_account_name: bankAccountName || '',
      swift_code: swiftCode || '',
      business_hours: businessHours || null
    };

    if (settings) {
      // 이미지 변경 시 이전 파일 삭제
      // 저장된 «파일 주소» 끼리 비교한다 — 고정 파일 이름(brand-logo·company-logo)이라 새 그림이 옛 주소와
      //   같은 자리에 쓰인다. 받은 값(base64)과 비교하면 방금 쓴 새 파일을 지운다.
      const keepUrls = new Set([savedBrandLogo, savedCompanyLogo, savedLogo].filter(Boolean));
      if (brandLogo && settings.brand_logo && !keepUrls.has(settings.brand_logo)) {
        await deleteOldImages(settings.brand_logo);
      }
      if (companyLogo && settings.company_logo && !keepUrls.has(settings.company_logo)) {
        await deleteOldImages(settings.company_logo);
      }
      if (logo && settings.logo && !keepUrls.has(settings.logo)) {
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
        address_line_2: settings.address_line_2 || '',
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

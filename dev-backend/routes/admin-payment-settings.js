const express = require('express');
const router = express.Router();
const SystemSettings = require('../models/SystemSettings');

const PAYMENT_SETTINGS_KEY = 'payment_settings';

// 기본 결제 설정 구조
const defaultPaymentSettings = {
  stripe: {
    enabled: false,
    publishableKey: '',
    secretKey: '',
    webhookSecret: '',
    autoCharge: false
  },
  paypal: {
    enabled: false,
    clientId: '',
    clientSecret: ''
  },
  bankTransfer: {},  // { "MYR": { enabled, bankName, accountNumber, accountName }, "KRW": { ... } }
  qrPayment: {},     // { "MYR": { enabled, qrImage, qrDescription }, "KRW": { ... } }
  // 추가 청구 설정 (3개 항목 - Tax, Service Charge 등)
  additionalCharges: [
    { enabled: false, name: '', rate: 0 },
    { enabled: false, name: '', rate: 0 },
    { enabled: false, name: '', rate: 0 }
  ]
};

// GET - 결제 설정 조회
router.get('/', async (req, res) => {
  try {
    const settings = await SystemSettings.findOne({
      where: { setting_key: PAYMENT_SETTINGS_KEY }
    });

    if (!settings || !settings.setting_value) {
      return res.json(defaultPaymentSettings);
    }

    const savedSettings = settings.setting_value;

    // 저장된 설정과 기본값 병합
    const result = {
      stripe: { ...defaultPaymentSettings.stripe, ...savedSettings.stripe },
      paypal: { ...defaultPaymentSettings.paypal, ...savedSettings.paypal },
      bankTransfer: savedSettings.bankTransfer || {},
      qrPayment: savedSettings.qrPayment || {},
      additionalCharges: savedSettings.additionalCharges || defaultPaymentSettings.additionalCharges
    };

    // 시크릿 키 마스킹 (보안)
    if (result.stripe.secretKey) {
      result.stripe.secretKey = '••••••••' + result.stripe.secretKey.slice(-4);
    }
    if (result.stripe.webhookSecret) {
      result.stripe.webhookSecret = '••••••••' + result.stripe.webhookSecret.slice(-4);
    }
    if (result.paypal.clientSecret) {
      result.paypal.clientSecret = '••••••••' + result.paypal.clientSecret.slice(-4);
    }

    res.json(result);
  } catch (error) {
    console.error('Error fetching payment settings:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch payment settings',
      details: error.message
    });
  }
});

// POST - 결제 설정 저장
router.post('/', async (req, res) => {
  try {
    console.log('📝 [PAYMENT SETTINGS] Saving payment settings...');
    console.log('📝 [PAYMENT SETTINGS] Request body:', JSON.stringify(req.body, null, 2));
    const { stripe, paypal, bankTransfer, qrPayment } = req.body;

    // 기존 설정 조회 (시크릿 키 유지를 위해)
    let existingSettings = await SystemSettings.findOne({
      where: { setting_key: PAYMENT_SETTINGS_KEY }
    });

    const existingData = existingSettings?.setting_value || {};

    // 마스킹된 값이면 기존 값 유지
    const processSecretField = (newValue, existingValue) => {
      if (!newValue || (typeof newValue === 'string' && newValue.startsWith('••••'))) {
        return existingValue || '';
      }
      return newValue;
    };

    const { additionalCharges } = req.body;

    // 추가 청구 항목 처리 (3개 항목)
    const processedCharges = (additionalCharges || []).map((charge, index) => ({
      enabled: charge?.enabled || false,
      name: charge?.name || '',
      rate: parseFloat(charge?.rate) || 0
    }));
    // 항상 3개 항목 유지
    while (processedCharges.length < 3) {
      processedCharges.push({ enabled: false, name: '', rate: 0 });
    }

    const settingsData = {
      stripe: {
        enabled: stripe?.enabled || false,
        publishableKey: stripe?.publishableKey || '',
        secretKey: processSecretField(stripe?.secretKey, existingData.stripe?.secretKey),
        webhookSecret: processSecretField(stripe?.webhookSecret, existingData.stripe?.webhookSecret),
        autoCharge: stripe?.autoCharge || false
      },
      paypal: {
        enabled: paypal?.enabled || false,
        clientId: paypal?.clientId || '',
        clientSecret: processSecretField(paypal?.clientSecret, existingData.paypal?.clientSecret)
      },
      bankTransfer: bankTransfer || {},
      qrPayment: qrPayment || {},
      additionalCharges: processedCharges
    };

    if (existingSettings) {
      await existingSettings.update({
        setting_value: settingsData
      });
    } else {
      await SystemSettings.create({
        setting_key: PAYMENT_SETTINGS_KEY,
        setting_value: settingsData,
        description: 'System payment gateway settings'
      });
    }

    res.json({
      success: true,
      message: 'Payment settings saved successfully'
    });
  } catch (error) {
    console.error('Error saving payment settings:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to save payment settings',
      details: error.message
    });
  }
});

// GET - 특정 통화의 활성화된 결제 수단 조회 (Invoice 결제 시 사용)
router.get('/available/:currency', async (req, res) => {
  try {
    const { currency } = req.params;
    const { getAvailablePaymentMethods } = require('../utils/paymentSettingsHelper');

    const settings = await SystemSettings.findOne({
      where: { setting_key: PAYMENT_SETTINGS_KEY }
    });

    if (!settings || !settings.setting_value) {
      return res.json({ methods: [] });
    }

    const result = getAvailablePaymentMethods(settings.setting_value, currency);
    res.json(result);
  } catch (error) {
    console.error('Error fetching available payment methods:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch payment methods'
    });
  }
});

module.exports = router;

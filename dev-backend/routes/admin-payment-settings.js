const express = require('express');
const router = express.Router();
const SystemSettings = require('../models/SystemSettings');

const PAYMENT_SETTINGS_KEY = 'payment_settings';

// GET - 결제 설정 조회 (통화별)
router.get('/', async (req, res) => {
  try {
    const settings = await SystemSettings.findOne({
      where: { setting_key: PAYMENT_SETTINGS_KEY }
    });

    if (!settings || !settings.setting_value) {
      // 빈 객체 반환 - 프론트엔드에서 통화별로 초기화
      return res.json({});
    }

    // 저장된 설정 반환 (시크릿 키 마스킹)
    const savedSettings = settings.setting_value;
    const maskedSettings = {};

    for (const [currency, methods] of Object.entries(savedSettings)) {
      maskedSettings[currency] = {};

      for (const [method, config] of Object.entries(methods)) {
        const maskedConfig = { ...config };

        // Stripe 시크릿 마스킹
        if (method === 'stripe') {
          if (maskedConfig.secretKey) {
            maskedConfig.secretKey = '••••••••' + maskedConfig.secretKey.slice(-4);
          }
          if (maskedConfig.webhookSecret) {
            maskedConfig.webhookSecret = '••••••••' + maskedConfig.webhookSecret.slice(-4);
          }
        }

        // PayPal 시크릿 마스킹
        if (method === 'paypal' && maskedConfig.clientSecret) {
          maskedConfig.clientSecret = '••••••••' + maskedConfig.clientSecret.slice(-4);
        }

        maskedSettings[currency][method] = maskedConfig;
      }
    }

    res.json(maskedSettings);
  } catch (error) {
    console.error('Error fetching payment settings:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch payment settings',
      details: error.message
    });
  }
});

// POST - 결제 설정 저장 (통화별)
router.post('/', async (req, res) => {
  try {
    const newSettings = req.body;

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

    // 각 통화별로 처리
    const processedSettings = {};

    for (const [currency, methods] of Object.entries(newSettings)) {
      processedSettings[currency] = {};
      const existingCurrency = existingData[currency] || {};

      for (const [method, config] of Object.entries(methods)) {
        const existingMethod = existingCurrency[method] || {};
        const processedConfig = { ...config };

        // Stripe 시크릿 처리
        if (method === 'stripe') {
          processedConfig.secretKey = processSecretField(config.secretKey, existingMethod.secretKey);
          processedConfig.webhookSecret = processSecretField(config.webhookSecret, existingMethod.webhookSecret);
        }

        // PayPal 시크릿 처리
        if (method === 'paypal') {
          processedConfig.clientSecret = processSecretField(config.clientSecret, existingMethod.clientSecret);
        }

        processedSettings[currency][method] = processedConfig;
      }
    }

    if (existingSettings) {
      await existingSettings.update({
        setting_value: processedSettings
      });
    } else {
      await SystemSettings.create({
        setting_key: PAYMENT_SETTINGS_KEY,
        setting_value: processedSettings,
        description: 'System payment gateway settings per currency'
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

    const settings = await SystemSettings.findOne({
      where: { setting_key: PAYMENT_SETTINGS_KEY }
    });

    if (!settings || !settings.setting_value || !settings.setting_value[currency]) {
      return res.json({ methods: [] });
    }

    const currencySettings = settings.setting_value[currency];
    const availableMethods = [];

    // 활성화된 결제 수단만 반환 (시크릿 키 제외)
    for (const [method, config] of Object.entries(currencySettings)) {
      if (config.enabled) {
        const publicConfig = { id: method };

        if (method === 'stripe') {
          publicConfig.name = 'Credit/Debit Card';
          publicConfig.publishableKey = config.publishableKey;
        } else if (method === 'paypal') {
          publicConfig.name = 'PayPal';
          publicConfig.clientId = config.clientId;
        } else if (method === 'bankTransfer') {
          publicConfig.name = 'Bank Transfer';
          publicConfig.bankName = config.bankName;
          publicConfig.accountNumber = config.accountNumber;
          publicConfig.accountName = config.accountName;
        } else if (method === 'qrPayment') {
          publicConfig.name = 'QR Payment';
          publicConfig.qrImage = config.qrImage;
          publicConfig.qrDescription = config.qrDescription;
        }

        availableMethods.push(publicConfig);
      }
    }

    res.json({ methods: availableMethods });
  } catch (error) {
    console.error('Error fetching available payment methods:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch payment methods'
    });
  }
});

module.exports = router;

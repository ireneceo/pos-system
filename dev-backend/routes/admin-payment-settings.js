const express = require('express');
const router = express.Router();
const SystemSettings = require('../models/SystemSettings');

const PAYMENT_SETTINGS_KEY = 'payment_settings';

// GET - 결제 설정 조회
router.get('/', async (req, res) => {
  try {
    const settings = await SystemSettings.findOne({
      where: { setting_key: PAYMENT_SETTINGS_KEY }
    });

    // 기본 결제 설정
    const defaultSettings = {
      stripe: {
        enabled: false,
        label: 'Stripe',
        config: {
          publishableKey: '',
          secretKey: '',
          webhookSecret: '',
          autoCharge: 'false'
        }
      },
      paypal: {
        enabled: false,
        label: 'PayPal',
        config: {
          clientId: '',
          clientSecret: ''
        }
      },
      bankTransfer: {
        enabled: false,
        label: 'Bank Transfer',
        bankName: '',
        accountNumber: '',
        accountName: ''
      },
      qrPayment: {
        enabled: false,
        label: 'QR Payment',
        qrImage: '',
        qrDescription: ''
      },
      _order: ['stripe', 'paypal', 'bankTransfer', 'qrPayment']
    };

    if (!settings || !settings.setting_value) {
      return res.json(defaultSettings);
    }

    // 저장된 설정과 기본값 병합
    const savedSettings = settings.setting_value;
    const mergedSettings = {
      stripe: { ...defaultSettings.stripe, ...savedSettings.stripe },
      paypal: { ...defaultSettings.paypal, ...savedSettings.paypal },
      bankTransfer: { ...defaultSettings.bankTransfer, ...savedSettings.bankTransfer },
      qrPayment: { ...defaultSettings.qrPayment, ...savedSettings.qrPayment },
      _order: savedSettings._order || defaultSettings._order
    };

    // 시크릿 키는 마스킹하여 반환 (보안)
    if (mergedSettings.stripe.config?.secretKey) {
      mergedSettings.stripe.config.secretKey = '••••••••' + mergedSettings.stripe.config.secretKey.slice(-4);
    }
    if (mergedSettings.stripe.config?.webhookSecret) {
      mergedSettings.stripe.config.webhookSecret = '••••••••' + mergedSettings.stripe.config.webhookSecret.slice(-4);
    }
    if (mergedSettings.paypal.config?.clientSecret) {
      mergedSettings.paypal.config.clientSecret = '••••••••' + mergedSettings.paypal.config.clientSecret.slice(-4);
    }

    res.json(mergedSettings);
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
    const { stripe, paypal, bankTransfer, qrPayment, _order } = req.body;

    // 기존 설정 조회 (시크릿 키 유지를 위해)
    let existingSettings = await SystemSettings.findOne({
      where: { setting_key: PAYMENT_SETTINGS_KEY }
    });

    let existingData = existingSettings?.setting_value || {};

    // 마스킹된 값이면 기존 값 유지
    const processSecretField = (newValue, existingValue) => {
      if (!newValue || newValue.startsWith('••••')) {
        return existingValue || '';
      }
      return newValue;
    };

    const settingsData = {
      stripe: {
        enabled: stripe?.enabled || false,
        label: 'Stripe',
        config: {
          publishableKey: stripe?.config?.publishableKey || '',
          secretKey: processSecretField(stripe?.config?.secretKey, existingData.stripe?.config?.secretKey),
          webhookSecret: processSecretField(stripe?.config?.webhookSecret, existingData.stripe?.config?.webhookSecret),
          autoCharge: stripe?.config?.autoCharge || 'false'
        }
      },
      paypal: {
        enabled: paypal?.enabled || false,
        label: 'PayPal',
        config: {
          clientId: paypal?.config?.clientId || '',
          clientSecret: processSecretField(paypal?.config?.clientSecret, existingData.paypal?.config?.clientSecret)
        }
      },
      bankTransfer: {
        enabled: bankTransfer?.enabled || false,
        label: 'Bank Transfer',
        bankName: bankTransfer?.bankName || '',
        accountNumber: bankTransfer?.accountNumber || '',
        accountName: bankTransfer?.accountName || ''
      },
      qrPayment: {
        enabled: qrPayment?.enabled || false,
        label: 'QR Payment',
        qrImage: qrPayment?.qrImage || '',
        qrDescription: qrPayment?.qrDescription || ''
      },
      _order: _order || ['stripe', 'paypal', 'bankTransfer', 'qrPayment']
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

module.exports = router;

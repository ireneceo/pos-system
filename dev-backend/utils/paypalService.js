/**
 * PayPal Service Utility
 * Creates PayPal client instances per issuer (System Admin / Brand / Foodcourt).
 * Each issuer uses their own PayPal credentials from payment_settings.
 * Mirrors stripeService.js pattern exactly.
 */

const paypal = require('@paypal/checkout-server-sdk');
const SystemSettings = require('../models/SystemSettings');
const Brand = require('../models/Brand');
const Foodcourt = require('../models/Foodcourt');

const PAYMENT_SETTINGS_KEY = 'payment_settings';

/**
 * Extract PayPal config from payment_settings JSON.
 */
function extractPayPalConfig(paymentSettings) {
  const ps = typeof paymentSettings === 'string'
    ? JSON.parse(paymentSettings) : paymentSettings;
  if (!ps?.paypal?.enabled || !ps?.paypal?.clientId || !ps?.paypal?.clientSecret) {
    return null;
  }
  return ps.paypal;
}

/**
 * Get PayPal config for the given issuer.
 * @param {string} issuerType - 'system_admin' | 'brand' | 'foodcourt'
 * @param {number|null} issuerId - Brand ID or Foodcourt ID
 * @returns {Promise<{clientId: string, clientSecret: string, sandbox?: boolean}>}
 */
async function getPayPalConfigForIssuer(issuerType, issuerId) {
  switch (issuerType) {
    case 'system_admin': {
      const settings = await SystemSettings.findOne({ where: { setting_key: PAYMENT_SETTINGS_KEY } });
      const config = extractPayPalConfig(settings?.setting_value);
      if (!config) throw new Error('PayPal is not configured for System Admin');
      return config;
    }
    case 'brand': {
      const brand = await Brand.findByPk(issuerId);
      if (!brand) throw new Error(`Brand ${issuerId} not found`);
      const config = extractPayPalConfig(brand.payment_settings);
      if (!config) throw new Error(`PayPal is not configured for Brand ${issuerId}`);
      return config;
    }
    case 'foodcourt': {
      const foodcourt = await Foodcourt.findByPk(issuerId);
      if (!foodcourt) throw new Error(`Foodcourt ${issuerId} not found`);
      const config = extractPayPalConfig(foodcourt.payment_settings);
      if (!config) throw new Error(`PayPal is not configured for Foodcourt ${issuerId}`);
      return config;
    }
    default:
      throw new Error(`Unknown issuer type: ${issuerType}`);
  }
}

/**
 * Get PayPal client ID for frontend (safe to expose).
 */
async function getClientIdForIssuer(issuerType, issuerId) {
  switch (issuerType) {
    case 'system_admin': {
      const settings = await SystemSettings.findOne({ where: { setting_key: PAYMENT_SETTINGS_KEY } });
      const ps = settings?.setting_value;
      return ps?.paypal?.clientId || null;
    }
    case 'brand': {
      const brand = await Brand.findByPk(issuerId);
      const ps = typeof brand?.payment_settings === 'string'
        ? JSON.parse(brand.payment_settings) : brand?.payment_settings;
      return ps?.paypal?.clientId || null;
    }
    case 'foodcourt': {
      const foodcourt = await Foodcourt.findByPk(issuerId);
      const ps = typeof foodcourt?.payment_settings === 'string'
        ? JSON.parse(foodcourt.payment_settings) : foodcourt?.payment_settings;
      return ps?.paypal?.clientId || null;
    }
    default:
      return null;
  }
}

/**
 * Get PayPal webhook ID for webhook signature verification.
 */
async function getWebhookIdForIssuer(issuerType, issuerId) {
  switch (issuerType) {
    case 'system_admin': {
      const settings = await SystemSettings.findOne({ where: { setting_key: PAYMENT_SETTINGS_KEY } });
      const ps = settings?.setting_value;
      return ps?.paypal?.webhookId || null;
    }
    case 'brand': {
      const brand = await Brand.findByPk(issuerId);
      const ps = typeof brand?.payment_settings === 'string'
        ? JSON.parse(brand.payment_settings) : brand?.payment_settings;
      return ps?.paypal?.webhookId || null;
    }
    case 'foodcourt': {
      const foodcourt = await Foodcourt.findByPk(issuerId);
      const ps = typeof foodcourt?.payment_settings === 'string'
        ? JSON.parse(foodcourt.payment_settings) : foodcourt?.payment_settings;
      return ps?.paypal?.webhookId || null;
    }
    default:
      return null;
  }
}

/**
 * Create a PayPal HTTP client for the given issuer.
 * @returns {Promise<{client: paypal.core.PayPalHttpClient, config: object}>}
 */
async function createPayPalClient(issuerType, issuerId) {
  const config = await getPayPalConfigForIssuer(issuerType, issuerId);
  const environment = config.sandbox !== false
    ? new paypal.core.SandboxEnvironment(config.clientId, config.clientSecret)
    : new paypal.core.LiveEnvironment(config.clientId, config.clientSecret);
  const client = new paypal.core.PayPalHttpClient(environment);
  return { client, config };
}

module.exports = {
  getPayPalConfigForIssuer,
  getClientIdForIssuer,
  getWebhookIdForIssuer,
  createPayPalClient
};

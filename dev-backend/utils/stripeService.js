/**
 * Stripe Service Utility
 * Creates Stripe instances per issuer (System Admin / Brand / Foodcourt).
 * Each issuer uses their own Stripe keys from payment_settings.
 */

const Stripe = require('stripe');
const SystemSettings = require('../models/SystemSettings');
const Brand = require('../models/Brand');
const Foodcourt = require('../models/Foodcourt');
const Restaurant = require('../models/Restaurant');

const PAYMENT_SETTINGS_KEY = 'payment_settings';

/**
 * Get a Stripe instance for the given issuer.
 * @param {string} issuerType - 'system_admin' | 'brand' | 'foodcourt'
 * @param {number|null} issuerId - Brand ID or Foodcourt ID
 * @returns {Promise<Stripe>}
 */
async function getStripeForIssuer(issuerType, issuerId) {
  const secretKey = await getSecretKeyForIssuer(issuerType, issuerId);
  return new Stripe(secretKey);
}

/**
 * Get the Stripe secret key for a given issuer.
 */
async function getSecretKeyForIssuer(issuerType, issuerId) {
  switch (issuerType) {
    case 'system_admin': {
      const settings = await SystemSettings.findOne({ where: { setting_key: PAYMENT_SETTINGS_KEY } });
      const ps = settings?.setting_value;
      if (!ps?.stripe?.enabled || !ps?.stripe?.secretKey) {
        throw new Error('Stripe is not configured for System Admin');
      }
      return ps.stripe.secretKey;
    }
    case 'brand': {
      const brand = await Brand.findByPk(issuerId);
      if (!brand) throw new Error(`Brand ${issuerId} not found`);
      const ps = typeof brand.payment_settings === 'string'
        ? JSON.parse(brand.payment_settings) : brand.payment_settings;
      if (!ps?.stripe?.enabled || !ps?.stripe?.secretKey) {
        throw new Error(`Stripe is not configured for Brand ${issuerId}`);
      }
      return ps.stripe.secretKey;
    }
    case 'foodcourt': {
      const foodcourt = await Foodcourt.findByPk(issuerId);
      if (!foodcourt) throw new Error(`Foodcourt ${issuerId} not found`);
      const ps = typeof foodcourt.payment_settings === 'string'
        ? JSON.parse(foodcourt.payment_settings) : foodcourt.payment_settings;
      if (!ps?.stripe?.enabled || !ps?.stripe?.secretKey) {
        throw new Error(`Stripe is not configured for Foodcourt ${issuerId}`);
      }
      return ps.stripe.secretKey;
    }
    case 'restaurant': {
      const restaurant = await Restaurant.findByPk(issuerId);
      if (!restaurant) throw new Error(`Restaurant ${issuerId} not found`);
      const ps = typeof restaurant.payment_settings === 'string'
        ? JSON.parse(restaurant.payment_settings) : restaurant.payment_settings;
      // Restaurant stores Stripe keys in online.config
      const secretKey = ps?.online?.config?.stripeSecretKey;
      if (!ps?.online?.enabled || !secretKey) {
        throw new Error(`Stripe is not configured for Restaurant ${issuerId}`);
      }
      return secretKey;
    }
    default:
      throw new Error(`Unknown issuer type: ${issuerType}`);
  }
}

/**
 * Get the publishable key for a given issuer.
 */
async function getPublishableKeyForIssuer(issuerType, issuerId) {
  switch (issuerType) {
    case 'system_admin': {
      const settings = await SystemSettings.findOne({ where: { setting_key: PAYMENT_SETTINGS_KEY } });
      const ps = settings?.setting_value;
      return ps?.stripe?.publishableKey || null;
    }
    case 'brand': {
      const brand = await Brand.findByPk(issuerId);
      const ps = typeof brand?.payment_settings === 'string'
        ? JSON.parse(brand.payment_settings) : brand?.payment_settings;
      return ps?.stripe?.publishableKey || ps?.stripe?.publicKey || null;
    }
    case 'foodcourt': {
      const foodcourt = await Foodcourt.findByPk(issuerId);
      const ps = typeof foodcourt?.payment_settings === 'string'
        ? JSON.parse(foodcourt.payment_settings) : foodcourt?.payment_settings;
      return ps?.stripe?.publishableKey || ps?.stripe?.publicKey || null;
    }
    case 'restaurant': {
      const restaurant = await Restaurant.findByPk(issuerId);
      const ps = typeof restaurant?.payment_settings === 'string'
        ? JSON.parse(restaurant.payment_settings) : restaurant?.payment_settings;
      return ps?.online?.config?.stripePublicKey || null;
    }
    default:
      return null;
  }
}

/**
 * Get the webhook secret for a given issuer.
 */
async function getWebhookSecretForIssuer(issuerType, issuerId) {
  switch (issuerType) {
    case 'system_admin': {
      const settings = await SystemSettings.findOne({ where: { setting_key: PAYMENT_SETTINGS_KEY } });
      const ps = settings?.setting_value;
      return ps?.stripe?.webhookSecret || null;
    }
    case 'brand': {
      const brand = await Brand.findByPk(issuerId);
      const ps = typeof brand?.payment_settings === 'string'
        ? JSON.parse(brand.payment_settings) : brand?.payment_settings;
      return ps?.stripe?.webhookSecret || null;
    }
    case 'foodcourt': {
      const foodcourt = await Foodcourt.findByPk(issuerId);
      const ps = typeof foodcourt?.payment_settings === 'string'
        ? JSON.parse(foodcourt.payment_settings) : foodcourt?.payment_settings;
      return ps?.stripe?.webhookSecret || null;
    }
    default:
      return null;
  }
}

module.exports = {
  getStripeForIssuer,
  getPublishableKeyForIssuer,
  getWebhookSecretForIssuer
};

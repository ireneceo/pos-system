/**
 * Payment Settings Helper
 *
 * Shared utility for extracting available payment methods from payment_settings JSON.
 * Used by System Admin, Brand, and Foodcourt payment settings APIs.
 */

/**
 * Extract available payment methods for a given currency from payment settings.
 * @param {Object} paymentSettings - The payment_settings JSON object
 * @param {string} currency - Currency code (e.g., 'MYR', 'USD', 'KRW')
 * @returns {{ methods: Array }} Available payment methods
 */
function getAvailablePaymentMethods(paymentSettings, currency) {
  if (!paymentSettings || !currency) {
    return { methods: [] };
  }

  const methods = [];

  // Stripe (global - not currency-specific)
  if (paymentSettings.stripe?.enabled) {
    methods.push({
      id: 'stripe',
      name: 'Credit/Debit Card',
      description: 'Secure payment via Stripe',
      publishableKey: paymentSettings.stripe.publishableKey
    });
  }

  // PayPal (global - not currency-specific)
  if (paymentSettings.paypal?.enabled) {
    methods.push({
      id: 'paypal',
      name: 'PayPal',
      description: 'Pay with PayPal account or card',
      clientId: paymentSettings.paypal.clientId
    });
  }

  // Bank Transfer (currency-specific)
  const bankConfig = paymentSettings.bankTransfer?.[currency];
  if (bankConfig?.enabled) {
    methods.push({
      id: 'bank_transfer',
      name: 'Bank Transfer',
      description: 'Manual transfer with receipt upload',
      bankName: bankConfig.bankName,
      accountNumber: bankConfig.accountNumber,
      accountName: bankConfig.accountName
    });
  }

  // QR Payment (currency-specific)
  const qrConfig = paymentSettings.qrPayment?.[currency];
  if (qrConfig?.enabled) {
    methods.push({
      id: 'qr_payment',
      name: 'QR Payment',
      description: qrConfig.qrDescription || 'Scan QR code to pay',
      qrImage: qrConfig.qrImage,
      qrDescription: qrConfig.qrDescription
    });
  }

  return { methods };
}

/**
 * Check if at least one payment method is configured for a given currency.
 * @param {Object} paymentSettings - The payment_settings JSON object
 * @param {string} currency - Currency code
 * @returns {boolean}
 */
function hasPaymentMethodForCurrency(paymentSettings, currency) {
  const { methods } = getAvailablePaymentMethods(paymentSettings, currency);
  return methods.length > 0;
}

const DEFAULT_CHARGES = [
  { enabled: false, name: '', rate: 0 },
  { enabled: false, name: '', rate: 0 },
  { enabled: false, name: '', rate: 0 }
];

/**
 * Normalize additionalCharges to an array for a given currency.
 * Handles both legacy flat array and new per-currency object format.
 * @param {Array|Object} additionalCharges - The additionalCharges data
 * @param {string} [currency] - Currency code (required for per-currency object format)
 * @returns {Array} Array of charge items [{enabled, name, rate}, ...]
 */
// Map legacy currency symbols to ISO codes
const CURRENCY_ALIASES = { RM: 'MYR' };

function normalizeAdditionalCharges(additionalCharges, currency) {
  if (!additionalCharges) return [...DEFAULT_CHARGES];
  if (Array.isArray(additionalCharges)) return additionalCharges; // legacy flat array
  if (currency) {
    const code = CURRENCY_ALIASES[currency] || currency;
    if (additionalCharges[code]) return additionalCharges[code];
    if (additionalCharges[currency]) return additionalCharges[currency];
  }
  return [...DEFAULT_CHARGES];
}

module.exports = {
  getAvailablePaymentMethods,
  hasPaymentMethodForCurrency,
  normalizeAdditionalCharges
};

// 인보이스 공유 헬퍼
// invoices-main.js, invoices-payment.js, 그리고 routes/owner.js 에서 require

const express = require('express');
require('../models'); // Load associations
const Invoice = require('../models/Invoice');
const InvoiceItem = require('../models/InvoiceItem');
const InvoiceSettings = require('../models/InvoiceSettings');
const Restaurant = require('../models/Restaurant');
const User = require('../models/User');
const CompanySettings = require('../models/CompanySettings');
const SystemSettings = require('../models/SystemSettings');
const PlanPrice = require('../models/PlanPrice');
const PlanTemplate = require('../models/PlanTemplate');
const Brand = require('../models/Brand');
const Foodcourt = require('../models/Foodcourt');
const RestaurantManager = require('../models/RestaurantManager');
const { Op } = require('sequelize');
const invoiceScheduler = require('../services/invoiceScheduler');
const subscriptionScheduler = require('../services/subscriptionScheduler');

const PAYMENT_SETTINGS_KEY = 'payment_settings';
const { authenticateToken, checkRestaurantAccess } = require('../middleware/auth');
const InvoiceCategory = require('../models/InvoiceCategory');
const { normalizeAdditionalCharges, getAvailablePaymentMethods } = require('../utils/paymentSettingsHelper');
const { sendNotification, sendNotificationBatch, getSystemAdminIds, getBrandManagerIds, getFoodcourtManagerIds } = require('../utils/notificationService');
const { invoicePaidEmail } = require('../utils/notificationTemplates');
const { logActivity } = require('../utils/activityLogger');

/**
 * Generate invoice number in format:
 * - System Admin: INV-YYMMDDNNN (e.g., INV-260123001)
 * - Brand: INV-BR{issuer_id}YYMMDDNNN (e.g., INV-BR6260123001)
 * - Foodcourt: INV-FC{issuer_id}YYMMDDNNN (e.g., INV-FC7260123001)
 *
 * @param {string} issuerType - 'system_admin', 'brand', or 'foodcourt'
 * @param {number} issuerId - The issuer's user ID (for brand/foodcourt)
 * @param {object} transaction - Sequelize transaction (optional)
 * @returns {Promise<string>} Generated invoice number
 */
async function generateInvoiceNumber(issuerType = 'system_admin', issuerId = null, transaction = null) {
  const now = new Date();
  const year = String(now.getFullYear()).slice(-2); // YY format
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const dateStr = `${year}${month}${day}`;

  // Build prefix based on issuer type
  let prefix = 'INV-';
  if (issuerType === 'brand' && issuerId) {
    prefix = `INV-BR${issuerId}`;
  } else if (issuerType === 'foodcourt' && issuerId) {
    prefix = `INV-FC${issuerId}`;
  }

  const searchPattern = `${prefix}${dateStr}%`;

  // Find the highest existing invoice number with this pattern
  const queryOptions = {
    where: {
      invoice_number: {
        [Op.like]: searchPattern
      }
    },
    order: [['invoice_number', 'DESC']],
    attributes: ['invoice_number']
  };

  if (transaction) {
    queryOptions.transaction = transaction;
  }

  const lastInvoice = await Invoice.findOne(queryOptions);

  let nextNumber = 1;
  if (lastInvoice && lastInvoice.invoice_number) {
    // Extract the last 3 digits (NNN part)
    const match = lastInvoice.invoice_number.match(/(\d{3})$/);
    if (match) {
      nextNumber = parseInt(match[1], 10) + 1;
    }
  }

  return `${prefix}${dateStr}${String(nextNumber).padStart(3, '0')}`;
}

// Helper function to get additional charges from issuer's payment settings
async function getAdditionalCharges(issuerType, issuerId, currency) {
  try {
    let rawCharges = null;

    if (issuerType === 'system_admin') {
      const paymentSettings = await SystemSettings.findOne({
        where: { setting_key: PAYMENT_SETTINGS_KEY }
      });
      rawCharges = paymentSettings?.setting_value?.additionalCharges;
    } else if (issuerType === 'brand' && issuerId) {
      const brand = await Brand.findByPk(issuerId);
      rawCharges = brand?.payment_settings?.additionalCharges;
    } else if (issuerType === 'foodcourt' && issuerId) {
      const foodcourt = await Foodcourt.findByPk(issuerId);
      rawCharges = foodcourt?.payment_settings?.additionalCharges;
    }

    const charges = normalizeAdditionalCharges(rawCharges, currency);
    return charges.filter(charge => charge.enabled && charge.name && charge.rate > 0);
  } catch (error) {
    console.error('Error fetching additional charges:', error);
    return [];
  }
}

// Helper function to calculate additional charges amounts
function calculateAdditionalCharges(subtotal, additionalChargesConfig) {
  if (!additionalChargesConfig || !Array.isArray(additionalChargesConfig)) {
    return [];
  }

  return additionalChargesConfig.map(charge => ({
    name: charge.name,
    rate: parseFloat(charge.rate) || 0,
    amount: Math.round(subtotal * (parseFloat(charge.rate) || 0) / 100 * 100) / 100
  }));
}

// Extract bank info from a payment_settings object for a given currency.
// Accepts both { bankTransfer: { MYR: {...} } } and { bankTransfer: {...flat } }.
function extractBankFromPaymentSettings(paymentSettings, currency) {
  if (!paymentSettings || typeof paymentSettings !== 'object') return null;
  const bt = paymentSettings.bankTransfer;
  if (!bt || typeof bt !== 'object') return null;

  // Per-currency keyed object (preferred)
  const perCurrency = bt[currency];
  if (perCurrency && typeof perCurrency === 'object' && (perCurrency.bankName || perCurrency.accountNumber)) {
    if (perCurrency.enabled === false) return null;
    return {
      bankName: perCurrency.bankName || '',
      bankAccount: perCurrency.accountNumber || '',
      bankAccountName: perCurrency.accountName || '',
      swiftCode: perCurrency.swiftCode || ''
    };
  }

  // Flat object fallback (legacy shape)
  if (bt.bankName || bt.accountNumber) {
    if (bt.enabled === false) return null;
    return {
      bankName: bt.bankName || '',
      bankAccount: bt.accountNumber || '',
      bankAccountName: bt.accountName || '',
      swiftCode: bt.swiftCode || ''
    };
  }
  return null;
}

// Helper function to get system admin bank info from Payment Settings based on currency
async function getBankInfoByCurrency(currency) {
  try {
    const paymentSettings = await SystemSettings.findOne({
      where: { setting_key: PAYMENT_SETTINGS_KEY }
    });
    return extractBankFromPaymentSettings(paymentSettings?.setting_value, currency);
  } catch (error) {
    console.error('Error fetching bank info by currency:', error);
    return null;
  }
}

// Helper function to build company info object
async function getIssuerCompanyInfo(issuerType, issuerId, currency = 'MYR') {
  if (issuerType === 'system_admin') {
    // Get system admin company settings
    const companySettings = await CompanySettings.findOne({ where: { id: 1 } });

    // Get bank info from Payment Settings based on currency
    const bankInfo = await getBankInfoByCurrency(currency);

    if (companySettings) {
      return {
        name: companySettings.company_name || 'System Admin',
        logoUrl: companySettings.company_logo || companySettings.logo_url || null,
        address: companySettings.address || '',
        city: companySettings.city || '',
        state: companySettings.state || '',
        postalCode: companySettings.postal_code || '',
        country: companySettings.country || 'Malaysia',
        phone: companySettings.phone || '',
        email: companySettings.email || '',
        website: companySettings.website || '',
        taxId: companySettings.tax_number || '',
        businessRegistration: companySettings.registration_number || '',
        // Use bank info from Payment Settings (currency-based) if available
        bankName: bankInfo?.bankName || '',
        bankAccount: bankInfo?.bankAccount || '',
        bankAccountName: bankInfo?.bankAccountName || '',
        swiftCode: bankInfo?.swiftCode || ''
      };
    }
  } else if (issuerType === 'brand' && issuerId) {
    const brand = await Brand.findByPk(issuerId);
    if (brand) {
      const bankFromSettings = extractBankFromPaymentSettings(brand.payment_settings, currency);
      return {
        name: brand.name || 'Brand',
        logoUrl: brand.logo_url || null,
        address: brand.address || '',
        city: brand.city || '',
        state: brand.state || '',
        postalCode: brand.postal_code || '',
        country: brand.country || 'Malaysia',
        phone: brand.phone || '',
        email: brand.email || '',
        website: brand.website || '',
        taxId: brand.tax_id || '',
        businessRegistration: brand.business_registration || '',
        bankName: bankFromSettings?.bankName || brand.bank_name || '',
        bankAccount: bankFromSettings?.bankAccount || brand.bank_account || '',
        bankAccountName: bankFromSettings?.bankAccountName || brand.bank_account_name || '',
        swiftCode: bankFromSettings?.swiftCode || ''
      };
    }
  } else if (issuerType === 'foodcourt' && issuerId) {
    const foodcourt = await Foodcourt.findByPk(issuerId);
    if (foodcourt) {
      const bankFromSettings = extractBankFromPaymentSettings(foodcourt.payment_settings, currency);
      return {
        name: foodcourt.name || 'Foodcourt',
        logoUrl: foodcourt.logo_url || null,
        address: foodcourt.address || '',
        city: foodcourt.city || '',
        state: foodcourt.state || '',
        postalCode: foodcourt.postal_code || '',
        country: foodcourt.country || 'Malaysia',
        phone: foodcourt.phone || '',
        email: foodcourt.email || '',
        website: foodcourt.website || '',
        taxId: foodcourt.tax_id || '',
        businessRegistration: foodcourt.business_registration || '',
        bankName: bankFromSettings?.bankName || foodcourt.bank_name || '',
        bankAccount: bankFromSettings?.bankAccount || foodcourt.bank_account || '',
        bankAccountName: bankFromSettings?.bankAccountName || foodcourt.bank_account_name || '',
        swiftCode: bankFromSettings?.swiftCode || ''
      };
    }
  }
  return null;
}

// Helper function to build payer company info
async function getPayerCompanyInfo(payerType, payerId, restaurant) {
  if (payerType === 'restaurant' || !payerId) {
    // Restaurant pays - use restaurant info
    if (restaurant) {
      return {
        name: restaurant.name || 'Restaurant',
        logoUrl: restaurant.logo_url || null,
        address: restaurant.address || '',
        city: restaurant.city || '',
        state: restaurant.state || '',
        postalCode: restaurant.postal_code || '',
        country: restaurant.country || 'Malaysia',
        phone: restaurant.phone || '',
        email: restaurant.email || '',
        taxId: restaurant.tax_id || '',
        businessRegistration: restaurant.business_registration || ''
      };
    }
  } else if (payerType === 'brand_manager' && payerId) {
    // Brand manager pays - get Brand company info
    const brand = await Brand.findOne({ where: { owner_id: payerId } });
    if (brand) {
      return {
        name: brand.name || 'Brand',
        logoUrl: brand.logo_url || null,
        address: brand.address || '',
        city: brand.city || '',
        state: brand.state || '',
        postalCode: brand.postal_code || '',
        country: brand.country || 'Malaysia',
        phone: brand.phone || '',
        email: brand.email || '',
        taxId: brand.tax_id || '',
        businessRegistration: brand.business_registration || ''
      };
    }
  } else if (payerType === 'foodcourt_manager' && payerId) {
    // Foodcourt manager pays - get Foodcourt company info
    const foodcourt = await Foodcourt.findOne({ where: { owner_id: payerId } });
    if (foodcourt) {
      return {
        name: foodcourt.name || 'Foodcourt',
        logoUrl: foodcourt.logo_url || null,
        address: foodcourt.address || '',
        city: foodcourt.city || '',
        state: foodcourt.state || '',
        postalCode: foodcourt.postal_code || '',
        country: foodcourt.country || 'Malaysia',
        phone: foodcourt.phone || '',
        email: foodcourt.email || '',
        taxId: foodcourt.tax_id || '',
        businessRegistration: foodcourt.business_registration || ''
      };
    }
  }
  return null;
}

// Resolve timezone for an invoice from its restaurant. Falls back to KL.
function getInvoiceTimezone(invoice) {
  try {
    const ops = invoice?.restaurant?.operation_settings;
    const parsed = typeof ops === 'string' ? JSON.parse(ops) : ops;
    return parsed?.timeZone || 'Asia/Kuala_Lumpur';
  } catch {
    return 'Asia/Kuala_Lumpur';
  }
}

// Helper function to format billing period display
function formatBillingPeriod(startDate, endDate, timezone = 'Asia/Kuala_Lumpur') {
  if (!startDate || !endDate) return '-';

  const start = new Date(startDate);
  const end = new Date(endDate);

  // Format: "Jan 23, 2026 - Feb 22, 2026"
  const formatDate = (date) => date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: timezone
  });

  return `${formatDate(start)} - ${formatDate(end)}`;
}

// Helper function to get display name for invoice category
function getCategoryDisplayName(category, customDescription, planType, billingCycle) {
  switch (category) {
    case 'subscription':
      const basePlan = planType || 'Subscription Plan';
      let planDisplay = basePlan;

      // Add billing cycle info if available
      if (billingCycle) {
        const cycleText = billingCycle === 'monthly' ? 'Monthly' : 'Annual';
        planDisplay = `${basePlan} (${cycleText})`;
      }

      return planDisplay;
    case 'service':
      return customDescription || 'Service';
    case 'consulting':
      return customDescription || 'Consulting';
    case 'others':
      return customDescription || 'Others';
    default:
      // For custom categories, use description or format the category code
      if (customDescription) return customDescription;
      if (category) {
        // Convert category code like 'hardware' to 'Hardware'
        return category.charAt(0).toUpperCase() + category.slice(1).replace(/_/g, ' ');
      }
      return planType || 'Service';
  }
}


// Helper function: Check if user can pay this invoice
async function checkPaymentPermission(user, invoice) {
  // System Admin can pay any invoice (for testing/support)
  if (user.role === 'System Admin') {
    return true;
  }

  // Restaurant Admin can pay invoices for their restaurant
  if (user.role === 'Restaurant Admin') {
    const userRestaurantId = user.restaurantId || user.restaurant_id;
    return userRestaurantId && invoice.restaurant_id === userRestaurantId;
  }

  // Restaurant Owner can pay invoices for any of their owned restaurants
  if (user.role === 'Restaurant Owner') {
    const ownerships = await RestaurantManager.findAll({
      where: { manager_id: user.id, relationship_type: 'ownership' },
      attributes: ['restaurant_id']
    });
    const ownedIds = ownerships.map(o => o.restaurant_id);
    return ownedIds.includes(invoice.restaurant_id);
  }

  // Brand General/Manager can pay invoices where they are the payer
  if (user.role === 'Brand General' || user.role === 'Brand Manager') {
    const brand = await Brand.findOne({ where: { owner_id: user.id } });

    // payer_type: 'brand_manager', payer_id: user.id
    if (invoice.payer_type === 'brand_manager' && invoice.payer_id === user.id) {
      return true;
    }
    return false;
  }

  // Foodcourt General/Manager can pay invoices where they are the payer
  if (user.role === 'Foodcourt General' || user.role === 'Foodcourt Manager') {
    // payer_type: 'foodcourt_manager', payer_id: user.id
    if (invoice.payer_type === 'foodcourt_manager' && invoice.payer_id === user.id) {
      return true;
    }
    return false;
  }

  return false;
}

// Helper function: Check if user can confirm/reject this invoice
async function checkConfirmPermission(user, invoice) {
  // System Admin can confirm any invoice
  if (user.role === 'System Admin') {
    return true;
  }

  // Brand General can confirm invoices they issued
  if (user.role === 'Brand General') {
    const brand = await Brand.findOne({ where: { owner_id: user.id } });
    return brand && invoice.issuer_type === 'brand' && invoice.issuer_id === brand.id;
  }

  // Foodcourt General can confirm invoices they issued
  if (user.role === 'Foodcourt General') {
    const foodcourt = await Foodcourt.findOne({ where: { owner_id: user.id } });
    return foodcourt && invoice.issuer_type === 'foodcourt' && invoice.issuer_id === foodcourt.id;
  }

  return false;
}

module.exports = {
  generateInvoiceNumber,
  getAdditionalCharges,
  calculateAdditionalCharges,
  getBankInfoByCurrency,
  getIssuerCompanyInfo,
  getPayerCompanyInfo,
  formatBillingPeriod,
  getInvoiceTimezone,
  getCategoryDisplayName,
  checkPaymentPermission,
  checkConfirmPermission,
};

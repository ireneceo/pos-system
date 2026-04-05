const express = require('express');
const router = express.Router();
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

// Helper function to get bank info from Payment Settings based on currency
async function getBankInfoByCurrency(currency) {
  try {
    const paymentSettings = await SystemSettings.findOne({
      where: { setting_key: PAYMENT_SETTINGS_KEY }
    });

    if (paymentSettings && paymentSettings.setting_value) {
      const settings = paymentSettings.setting_value;
      const bankConfig = settings.bankTransfer?.[currency];

      if (bankConfig?.enabled) {
        return {
          bankName: bankConfig.bankName || '',
          bankAccount: bankConfig.accountNumber || '',
          bankAccountName: bankConfig.accountName || '',
          swiftCode: bankConfig.swiftCode || ''
        };
      }
    }
    return null;
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
        bankName: brand.bank_name || '',
        bankAccount: brand.bank_account || '',
        bankAccountName: brand.bank_account_name || '',
        swiftCode: ''
      };
    }
  } else if (issuerType === 'foodcourt' && issuerId) {
    const foodcourt = await Foodcourt.findByPk(issuerId);
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
        website: foodcourt.website || '',
        taxId: foodcourt.tax_id || '',
        businessRegistration: foodcourt.business_registration || '',
        bankName: foodcourt.bank_name || '',
        bankAccount: foodcourt.bank_account || '',
        bankAccountName: foodcourt.bank_account_name || '',
        swiftCode: ''
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

// Helper function to format billing period display
function formatBillingPeriod(startDate, endDate) {
  if (!startDate || !endDate) return '-';

  const start = new Date(startDate);
  const end = new Date(endDate);

  // Format: "Jan 23, 2026 - Feb 22, 2026"
  const formatDate = (date) => date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
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

// Get company settings for invoice generation
// Accepts optional currency query param for currency-specific bank info
router.get('/invoice-settings', async (req, res) => {
  try {
    const currency = req.query.currency || 'MYR';

    const companySettings = await CompanySettings.findOne({
      where: { id: 1 } // System admin company settings
    });

    if (!companySettings) {
      return res.status(404).json({ error: 'Company settings not found' });
    }

    // Get bank info from Payment Settings based on currency
    const bankInfo = await getBankInfoByCurrency(currency);

    res.json({
      data: {
        companyName: companySettings.company_name,
        address: companySettings.address,
        city: companySettings.city,
        state: companySettings.state,
        postalCode: companySettings.postal_code,
        country: companySettings.country,
        phone: companySettings.phone,
        email: companySettings.email,
        website: companySettings.website,
        taxNumber: companySettings.tax_number,
        registrationNumber: companySettings.registration_number,
        companyLogo: companySettings.company_logo || '',
        // Use bank info from Payment Settings (currency-based) if available
        bankName: bankInfo?.bankName || '',
        bankAccount: bankInfo?.bankAccount || '',
        bankAccountName: bankInfo?.bankAccountName || '',
        swiftCode: bankInfo?.swiftCode || ''
      }
    });
  } catch (error) {
    console.error('Error fetching company settings:', error);
    res.status(500).json({ error: 'Failed to fetch company settings' });
  }
});

// Get all invoices for admin (system-wide overview)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { role, id: userId, brandId, foodcourtId } = req.user;

    // Build where clause based on role
    let whereClause = {};

    if (role === 'System Admin') {
      // System Admin sees only invoices they issued
      whereClause = {
        issuer_type: 'system_admin'
      };
    } else if (role === 'Brand General' || role === 'Brand Manager') {
      // Brand General/Manager: only see invoices they ISSUED (for Issued Invoices tab)
      // Invoices TO them are shown via /api/invoices/to-pay endpoint
      const userBrandId = brandId || req.user.brand_id;
      if (userBrandId) {
        whereClause = {
          issuer_type: 'brand',
          issuer_id: userBrandId
        };
      } else {
        return res.json([]);
      }
    } else if (role === 'Foodcourt General' || role === 'Foodcourt Manager') {
      // Foodcourt General/Manager: only see invoices they ISSUED (for Issued Invoices tab)
      // Invoices TO them are shown via /api/invoices/to-pay endpoint
      const userFoodcourtId = foodcourtId || req.user.foodcourt_id;
      if (userFoodcourtId) {
        whereClause = {
          issuer_type: 'foodcourt',
          issuer_id: userFoodcourtId
        };
      } else {
        return res.json([]);
      }
    } else if (role === 'Restaurant Admin') {
      // Restaurant Admin: only see invoices for their restaurant
      const userRestaurantId = req.user.restaurantId || req.user.restaurant_id;
      if (userRestaurantId) {
        whereClause = { restaurant_id: userRestaurantId };
      } else {
        return res.json([]);
      }
    } else {
      // Other roles: no access
      return res.json([]);
    }

    console.log(`📋 GET /api/invoices - User: ${req.user.email} (${role}), Where:`, whereClause);

    // Demo filter: System Admin excludes demo restaurants by default
    const includeDemo = req.query.includeDemo === 'true';
    const excludeDemo = (role === 'System Admin' && !includeDemo);

    const invoices = await Invoice.findAll({
      where: whereClause,
      include: [{
        model: Restaurant,
        as: 'restaurant',
        attributes: ['id', 'name', 'admin_id', 'admin_name', 'plan_type', 'phone', 'email', 'subscription_snapshot', 'billing_cycle', 'is_demo'],
        required: false  // LEFT JOIN: restaurant_id가 null인 Brand/FC/Owner 인보이스도 포함
      }, {
        model: InvoiceItem,
        as: 'items',
        attributes: ['item_type', 'description', 'calculated_amount', 'tax_amount', 'total_amount']
      }],
      order: [['due_date', 'DESC'], ['id', 'DESC']]
    });

    // Post-filter: exclude demo restaurant invoices if needed
    let filteredInvoices = invoices;
    if (excludeDemo) {
      filteredInvoices = invoices.filter(inv => {
        // restaurant_id가 null인 인보이스(Brand/FC/Owner)는 항상 포함
        if (!inv.restaurant_id) return true;
        // restaurant가 있으면 is_demo 체크
        return inv.restaurant && !inv.restaurant.is_demo;
      });
    }

    // Get all unique payer IDs to fetch manager data
    const payerIds = [...new Set(filteredInvoices
      .filter(inv => inv.payer_id && inv.payer_type !== 'restaurant')
      .map(inv => inv.payer_id)
    )];

    // Fetch payer (manager) information
    const payers = payerIds.length > 0 ? await User.findAll({
      where: { id: { [Op.in]: payerIds } }
    }) : [];

    // Transform data to match frontend expectations
    const transformedInvoices = filteredInvoices.map(invoice => {
      // Determine customer info based on payer type
      let customerName, customerAddress, customerCompany;

      if (invoice.payer_type === 'external') {
        // Non-member payer
        customerName = invoice.external_payer_name || 'Non-Member';
        customerAddress = invoice.external_payer_address || 'No address';
        customerCompany = invoice.external_payer_company || invoice.external_payer_name || 'Non-Member';
      } else if (invoice.payer_type === 'restaurant' || !invoice.payer_id) {
        // Restaurant pays
        customerName = invoice.restaurant?.name || 'Unknown Restaurant';
        customerAddress = invoice.restaurant?.address || 'No address';
        customerCompany = invoice.restaurant?.name || 'Unknown Restaurant';
      } else {
        // Manager pays (foodcourt or brand manager)
        const payer = payers.find(p => p.id === invoice.payer_id);
        if (payer) {
          customerName = payer.full_name || payer.company_name || 'Unknown Manager';
          customerAddress = payer.address || 'No address';
          customerCompany = payer.company_name || payer.full_name || 'Unknown Company';
        } else {
          customerName = 'Unknown Payer';
          customerAddress = 'No address';
          customerCompany = 'Unknown Company';
        }
      }

      // Get payer info (name + plan_type)
      let payerName;
      let payerPlanType = null;
      let payerBillingCycle = null;
      if (invoice.payer_type === 'external') {
        payerName = invoice.external_payer_name || 'Non-Member';
        payerPlanType = null;
        payerBillingCycle = null;
      } else if (invoice.payer_type === 'restaurant' || !invoice.payer_id) {
        payerName = invoice.restaurant?.admin_name || invoice.restaurant?.name || 'Unknown Restaurant';
        payerPlanType = invoice.restaurant?.plan_type;
        payerBillingCycle = invoice.restaurant?.billing_cycle;
      } else {
        const payer = payers.find(p => p.id === invoice.payer_id);
        payerName = payer?.full_name || payer?.company_name || customerName || 'Unknown Payer';
        payerPlanType = payer?.plan_type;
        payerBillingCycle = payer?.billing_cycle;
      }

      // Resolve plan type: restaurant → users table for Brand/FC/Owner
      const resolvedPlanType = invoice.restaurant?.plan_type || payerPlanType;

      return {
        id: invoice.id.toString(),
        invoiceNumber: invoice.invoice_number,
        managerId: invoice.payer_id ? invoice.payer_id.toString() : (invoice.restaurant?.admin_id?.toString() || ''),
        managerName: payerName,
        companyName: customerCompany,
        customerName: customerName,
        customerAddress: customerAddress,
        restaurantId: invoice.restaurant_id?.toString(),
        restaurantName: invoice.restaurant?.name || 'Unknown Restaurant',
        issueDate: invoice.issued_at || invoice.createdAt,
        dueDate: invoice.due_date,
        paidDate: invoice.paid_at,
        status: invoice.status || 'pending_payment',
        currency: invoice.currency || 'MYR',
        amount: invoice.subtotal
          ? parseFloat(invoice.subtotal)
          : parseFloat(invoice.discount_amount || 0) > 0
            ? parseFloat(invoice.total_amount) + parseFloat(invoice.discount_amount)
            : parseFloat(invoice.total_amount) - parseFloat(invoice.items?.reduce((sum, item) => sum + parseFloat(item.tax_amount || 0), 0) || 0),
        tax: parseFloat(invoice.items?.reduce((sum, item) => sum + parseFloat(item.tax_amount || 0), 0) || 0),
        total: parseFloat(invoice.total_amount),
        items: (invoice.items && invoice.items.length > 0) ? invoice.items.map(item => {
          // Build description: category name + user description
          const categoryName = invoice.category_display_name || getCategoryDisplayName(item.item_type || invoice.invoice_category, invoice.custom_description, resolvedPlanType, payerBillingCycle || invoice.restaurant?.billing_cycle);
          const userDescription = item.description?.trim();
          let fullDescription;

          // For subscription, just use the stored display name or plan name
          if ((item.item_type || invoice.invoice_category) === 'subscription') {
            fullDescription = categoryName;
          } else {
            // For others: Category Name + Description (if any)
            fullDescription = userDescription ? `${categoryName}: ${userDescription}` : categoryName;
          }

          return {
            description: fullDescription,
            quantity: 1,
            unitPrice: parseFloat(item.fixed_amount || item.calculated_amount || 0),
            total: parseFloat(item.fixed_amount || item.calculated_amount || 0)
          };
        }) : [{
          // Fallback for invoices without items: create item from invoice data
          description: getCategoryDisplayName(invoice.invoice_category, invoice.custom_description || invoice.notes?.split('\n').pop(), resolvedPlanType, payerBillingCycle || invoice.restaurant?.billing_cycle),
          quantity: 1,
          unitPrice: parseFloat(invoice.total_amount),
          total: parseFloat(invoice.total_amount)
        }],
        billingPeriod: formatBillingPeriod(invoice.billing_period_start, invoice.billing_period_end),
        planType: resolvedPlanType || 'Basic Plan',
        type: invoice.type,
        payerType: invoice.payer_type,
        payerId: invoice.payer_id?.toString(),
        invoiceCategory: invoice.items?.[0]?.item_type || invoice.invoice_category || 'subscription',
        customDescription: invoice.custom_description,
        serviceDescription: invoice.service_description,
        categoryDisplayName: invoice.category_display_name || getCategoryDisplayName(
          invoice.items?.[0]?.item_type || invoice.invoice_category,
          invoice.custom_description || invoice.items?.[0]?.description || invoice.notes?.split('\n').pop(),
          resolvedPlanType,
          payerBillingCycle || invoice.restaurant?.billing_cycle
        ),
        // Payment info for confirmation
        paymentMethod: invoice.payment_method,
        transactionId: invoice.transaction_id,
        receiptUrl: invoice.receipt_url,
        hasPaymentInfo: !!invoice.payment_method || !!invoice.receipt_url,
        // Additional charges (Tax, Service Charge, etc.)
        additionalCharges: invoice.additional_charges || [],
        // Discount info
        discountType: invoice.discount_type || 'none',
        discountValue: parseFloat(invoice.discount_value) || 0,
        discountAmount: parseFloat(invoice.discount_amount) || 0,
        discountReason: invoice.discount_reason || null,
        subtotalBeforeDiscount: invoice.subtotal
          ? parseFloat(invoice.subtotal)
          : parseFloat(invoice.discount_amount || 0) > 0
            ? parseFloat(invoice.total_amount) + parseFloat(invoice.discount_amount)
            : null,
        // Modification tracking
        isModified: invoice.is_modified || false,
        modificationHistory: invoice.modification_history || [],
        // Hardware quote link (extract from notes)
        hardwareQuoteNumber: invoice.notes?.match(/Hardware Quote: (QUO-\d+)/)?.[1] || null,
        // External payer info
        externalPayerName: invoice.external_payer_name || null,
        externalPayerEmail: invoice.external_payer_email || null,
        externalPayerPhone: invoice.external_payer_phone || null,
        externalPayerCompany: invoice.external_payer_company || null,
        externalPayerAddress: invoice.external_payer_address || null,
        externalPayerTaxId: invoice.external_payer_tax_id || null,
        // Demo flag
        isDemo: invoice.restaurant?.is_demo || false
      };
    });

    console.log('📊 Transformed invoices count:', transformedInvoices.length);
    console.log('📊 First 3 invoices:', transformedInvoices.slice(0, 3).map(inv => ({
      id: inv.id,
      invoiceNumber: inv.invoiceNumber,
      status: inv.status
    })));
    res.json(transformedInvoices);
  } catch (error) {
    console.error('Error fetching all invoices:', error);
    res.status(500).json({ error: 'Failed to fetch invoices' });
  }
});

// Get all invoices for a restaurant
// Returns invoices where restaurant_id matches OR (payer_type='restaurant' AND payer_id matches)
// Excludes draft invoices (not yet sent to recipient)
router.get('/restaurant/:restaurantId', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const invoices = await Invoice.findAll({
      where: {
        [Op.and]: [
          {
            [Op.or]: [
              { restaurant_id: restaurantId },
              {
                payer_type: 'restaurant',
                payer_id: restaurantId
              }
            ]
          },
          {
            status: { [Op.ne]: 'draft' }  // Exclude draft invoices
          }
        ]
      },
      include: [{
        model: Restaurant,
        as: 'restaurant',
        attributes: ['id', 'name', 'address', 'city', 'state', 'postal_code', 'country', 'phone', 'email', 'admin_name']
      }, {
        model: InvoiceItem,
        as: 'items'
      }],
      order: [['createdAt', 'DESC']]
    });

    // Transform invoices with issuer/payer company info
    const transformedInvoices = await Promise.all(invoices.map(async (invoice) => {
      const issuerInfo = await getIssuerCompanyInfo(invoice.issuer_type, invoice.issuer_id, invoice.currency || 'MYR');
      const payerInfo = await getPayerCompanyInfo(invoice.payer_type, invoice.payer_id, invoice.restaurant);

      // Calculate amounts from items if available
      const itemsTotal = invoice.items?.reduce((sum, item) => sum + parseFloat(item.calculated_amount || item.fixed_amount || 0), 0) || 0;
      const taxTotal = invoice.items?.reduce((sum, item) => sum + parseFloat(item.tax_amount || 0), 0) || 0;

      // Transform items to frontend format
      const transformedItems = (invoice.items || []).map(item => ({
        id: item.id?.toString(),
        description: item.description || item.item_name || 'Service',
        quantity: item.quantity || 1,
        unitPrice: parseFloat(item.unit_price || item.calculated_amount || item.fixed_amount || 0),
        taxRate: parseFloat(item.tax_rate || 0),
        taxAmount: parseFloat(item.tax_amount || 0),
        total: parseFloat(item.calculated_amount || item.fixed_amount || 0) + parseFloat(item.tax_amount || 0)
      }));

      return {
        id: invoice.id?.toString(),
        invoice_number: invoice.invoice_number,
        status: invoice.status,
        currency: invoice.currency || 'MYR',
        subtotal: itemsTotal || parseFloat(invoice.total_amount) - taxTotal,
        tax_amount: taxTotal || 0,
        total_amount: parseFloat(invoice.total_amount),
        issued_at: invoice.issued_at,
        due_date: invoice.due_date,
        paid_at: invoice.paid_at,
        billing_period_start: invoice.billing_period_start,
        billing_period_end: invoice.billing_period_end,
        issuer_type: invoice.issuer_type,
        issuer_id: invoice.issuer_id,
        issuer_name: issuerInfo?.name || 'Issuer',
        payer_type: invoice.payer_type,
        payer_id: invoice.payer_id,
        restaurant_id: invoice.restaurant_id,
        category_display_name: invoice.category_display_name || invoice.invoice_category || 'Service',
        payment_method: invoice.payment_method,
        transaction_id: invoice.transaction_id,
        receipt_url: invoice.receipt_url,
        items: transformedItems,
        issuerInfo: issuerInfo,
        payerInfo: payerInfo,
        // Additional charges (Tax, Service Charge, etc.)
        additional_charges: invoice.additional_charges || [],
        // Discount info
        discount_type: invoice.discount_type || 'none',
        discount_value: parseFloat(invoice.discount_value) || 0,
        discount_amount: parseFloat(invoice.discount_amount) || 0,
        discount_reason: invoice.discount_reason || null,
        subtotal_before_discount: parseFloat(invoice.subtotal) || null
      };
    }));

    res.json(transformedInvoices);
  } catch (error) {
    console.error('Error fetching invoices:', error);
    res.status(500).json({ error: 'Failed to fetch invoices' });
  }
});

// Get all invoices for manager (across all restaurants they manage + invoices where manager is payer)
router.get('/manager/:managerId', authenticateToken, async (req, res) => {
  try {
    const { managerId } = req.params;
    console.log(`📋 GET /manager/${managerId} - Fetching invoices for manager`);

    // Get restaurants managed by this manager
    const restaurants = await Restaurant.findAll({
      where: { admin_id: managerId }
    });

    const restaurantIds = restaurants.map(r => r.id);
    console.log(`  Found ${restaurantIds.length} restaurants managed by this manager`);

    // Build where clause to get:
    // 1. Invoices for restaurants where this manager manages AND manager pays (payment_responsibility = 'manager')
    // 2. Invoices directly issued to this manager (payer_type = 'manager', payer_id = managerId)
    let whereConditions = [];

    // Condition 1: Invoices for restaurants where manager is responsible for payment
    if (restaurantIds.length > 0) {
      // Get restaurants where manager pays (brand_manager or foodcourt_manager)
      const managerPayRestaurants = await Restaurant.findAll({
        where: {
          id: { [Op.in]: restaurantIds },
          payment_model: { [Op.in]: ['brand_manager', 'foodcourt_manager'] }
        }
      });
      const managerPayRestaurantIds = managerPayRestaurants.map(r => r.id);

      if (managerPayRestaurantIds.length > 0) {
        whereConditions.push({
          restaurant_id: { [Op.in]: managerPayRestaurantIds }
        });
      }
    }

    // Condition 2: Invoices directly issued to this manager (payer_type: brand_manager or foodcourt_manager)
    whereConditions.push({
      payer_type: { [Op.in]: ['brand_manager', 'foodcourt_manager'] },
      payer_id: managerId
    });

    // If no conditions, return empty
    if (whereConditions.length === 0) {
      console.log('  No valid conditions, returning empty');
      return res.json([]);
    }

    // Get invoices matching any of the conditions
    const invoices = await Invoice.findAll({
      where: {
        [Op.or]: whereConditions
      },
      include: [
        {
          model: Restaurant,
          as: 'restaurant',
          attributes: ['id', 'name', 'admin_name', 'plan_type'],
          required: false
        },
        {
          model: InvoiceItem,
          as: 'items',
          required: false
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    console.log(`  Found ${invoices.length} invoices`);

    // Transform data to match frontend format
    const transformedInvoices = invoices.map(invoice => {
      // Determine items to show
      let invoiceItems = [];
      if (invoice.items && invoice.items.length > 0) {
        invoiceItems = invoice.items.map(item => ({
          description: item.description,
          quantity: item.quantity || 1,
          unitPrice: parseFloat(item.fixed_amount || item.calculated_amount || 0),
          taxAmount: parseFloat(item.tax_amount || 0),
          total: parseFloat(item.fixed_amount || item.calculated_amount || 0)
        }));
      } else {
        // Fallback for automatic invoices
        invoiceItems = [{
          description: `${invoice.restaurant?.plan_type || invoice.plan_type || 'Subscription'} - Monthly`,
          quantity: 1,
          unitPrice: parseFloat(invoice.subtotal || invoice.total_amount),
          taxAmount: 0,
          total: parseFloat(invoice.subtotal || invoice.total_amount)
        }];
      }

      // Get category display name from various sources
      let categoryDisplayName = invoice.category_display_name;
      if (!categoryDisplayName && invoice.items && invoice.items.length > 0) {
        // Get from first item description (e.g., "Professional - Monthly Subscription (Jan 2026)")
        const firstItem = invoice.items[0];
        if (firstItem.description) {
          // Extract plan name from description like "Professional - Monthly Subscription (Jan 2026)"
          const match = firstItem.description.match(/^([^-]+)/);
          categoryDisplayName = match ? `Subscription - ${match[1].trim()}` : firstItem.description;
        }
      }
      if (!categoryDisplayName && invoice.invoice_category === 'subscription') {
        categoryDisplayName = `Subscription - ${invoice.restaurant?.plan_type || 'Plan'}`;
      }

      return {
        id: invoice.id,
        invoiceNumber: invoice.invoice_number,
        restaurantId: invoice.restaurant_id,
        restaurantName: invoice.restaurant?.name || invoice.customer_name || 'Unknown',
        restaurantManager: invoice.restaurant?.admin_name || '',
        issueDate: invoice.issued_at?.toISOString().split('T')[0] || invoice.createdAt.toISOString().split('T')[0],
        dueDate: invoice.due_date?.toISOString().split('T')[0] || '',
        paidDate: invoice.paid_at?.toISOString().split('T')[0] || null,
        status: invoice.status,
        currency: invoice.currency || 'MYR',
        amount: invoice.subtotal
          ? parseFloat(invoice.subtotal)
          : parseFloat(invoice.discount_amount || 0) > 0
            ? parseFloat(invoice.total_amount) + parseFloat(invoice.discount_amount)
            : parseFloat(invoice.total_amount),
        tax: invoiceItems?.reduce((sum, item) => sum + parseFloat(item.taxAmount || 0), 0) || 0,
        total: parseFloat(invoice.total_amount),
        billingPeriod: invoice.billing_period_start
          ? `${invoice.billing_period_start.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`
          : invoice.billing_period || '',
        planType: invoice.restaurant?.plan_type || 'Custom',
        type: invoice.type || 'manual',
        categoryDisplayName: categoryDisplayName || '',
        payerType: invoice.payer_type,
        payerId: invoice.payer_id,
        issuerType: invoice.issuer_type,
        issuerId: invoice.issuer_id,
        items: invoiceItems,
        discountType: invoice.discount_type || 'none',
        discountValue: parseFloat(invoice.discount_value) || 0,
        discountAmount: parseFloat(invoice.discount_amount) || 0,
        discountReason: invoice.discount_reason || null,
        subtotalBeforeDiscount: invoice.subtotal
          ? parseFloat(invoice.subtotal)
          : parseFloat(invoice.discount_amount || 0) > 0
            ? parseFloat(invoice.total_amount) + parseFloat(invoice.discount_amount)
            : null,
        // Modification tracking
        isModified: invoice.is_modified || false,
        modificationHistory: invoice.modification_history || []
      };
    });

    res.json(transformedInvoices);
  } catch (error) {
    console.error('Error fetching manager invoices:', error);
    res.status(500).json({ error: 'Failed to fetch manager invoices' });
  }
});

// ============================================
// Invoice Categories API (must be before /:id to avoid route conflict)
// ============================================

// Get all active invoice categories (no auth for dropdown use)
router.get('/categories', async (req, res) => {
  try {
    const categories = await InvoiceCategory.findAll({
      where: { is_active: true },
      order: [['display_order', 'ASC'], ['name', 'ASC']]
    });
    res.json({ success: true, data: categories });
  } catch (error) {
    console.error('Error fetching invoice categories:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch invoice categories' });
  }
});

// Get all invoice categories including inactive (admin)
router.get('/categories/all', authenticateToken, async (req, res) => {
  try {
    const categories = await InvoiceCategory.findAll({
      order: [['display_order', 'ASC'], ['name', 'ASC']]
    });
    res.json({ success: true, data: categories });
  } catch (error) {
    console.error('Error fetching all invoice categories:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch invoice categories' });
  }
});

// Create new invoice category
router.post('/categories', authenticateToken, async (req, res) => {
  try {
    const { name, code, description, display_order, is_active } = req.body;

    if (!name || !code) {
      return res.status(400).json({ success: false, error: 'Name and code are required' });
    }

    // Check for duplicate code
    const existing = await InvoiceCategory.findOne({ where: { code } });
    if (existing) {
      return res.status(400).json({ success: false, error: 'Category code already exists' });
    }

    const category = await InvoiceCategory.create({
      name,
      code,
      description,
      display_order: display_order || 0,
      is_active: is_active !== false,
      is_system: false
    });

    res.status(201).json({ success: true, data: category });
  } catch (error) {
    console.error('Error creating invoice category:', error);
    res.status(500).json({ success: false, error: 'Failed to create invoice category' });
  }
});

// Update invoice category
router.put('/categories/:categoryId', authenticateToken, async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { name, code, description, display_order, is_active } = req.body;

    const category = await InvoiceCategory.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ success: false, error: 'Category not found' });
    }

    // Check for duplicate code if changing
    if (code && code !== category.code) {
      const existing = await InvoiceCategory.findOne({ where: { code } });
      if (existing) {
        return res.status(400).json({ success: false, error: 'Category code already exists' });
      }
    }

    // Don't allow changing system category code
    if (category.is_system && code && code !== category.code) {
      return res.status(400).json({ success: false, error: 'Cannot change system category code' });
    }

    await category.update({
      name: name || category.name,
      code: code || category.code,
      description: description !== undefined ? description : category.description,
      display_order: display_order !== undefined ? display_order : category.display_order,
      is_active: is_active !== undefined ? is_active : category.is_active
    });

    res.json({ success: true, data: category });
  } catch (error) {
    console.error('Error updating invoice category:', error);
    res.status(500).json({ success: false, error: 'Failed to update invoice category' });
  }
});

// Delete invoice category (soft delete by setting is_active = false, or hard delete)
router.delete('/categories/:categoryId', authenticateToken, async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { force } = req.query;

    const category = await InvoiceCategory.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ success: false, error: 'Category not found' });
    }

    if (force === 'true') {
      await category.destroy();
      res.json({ success: true, message: 'Category permanently deleted' });
    } else {
      await category.update({ is_active: false });
      res.json({ success: true, message: 'Category deactivated' });
    }
  } catch (error) {
    console.error('Error deleting invoice category:', error);
    res.status(500).json({ success: false, error: 'Failed to delete invoice category' });
  }
});

// Initialize default invoice categories
router.post('/categories/init', authenticateToken, async (req, res) => {
  try {
    const defaultCategories = [
      { name: 'Subscription', code: 'subscription', description: 'Monthly/Annual subscription fees', display_order: 1, is_system: true },
      { name: 'Service', code: 'service', description: 'One-time service fees', display_order: 2, is_system: true },
      { name: 'Consulting', code: 'consulting', description: 'Consulting and support services', display_order: 3, is_system: true },
      { name: 'Hardware', code: 'hardware', description: 'Hardware and equipment', display_order: 4, is_system: false },
      { name: 'Training', code: 'training', description: 'Training and onboarding', display_order: 5, is_system: false },
      { name: 'Others', code: 'others', description: 'Other miscellaneous charges', display_order: 99, is_system: true }
    ];

    const created = [];
    const skipped = [];

    for (const cat of defaultCategories) {
      const existing = await InvoiceCategory.findOne({ where: { code: cat.code } });
      if (existing) {
        skipped.push(cat.code);
      } else {
        await InvoiceCategory.create({ ...cat, is_active: true });
        created.push(cat.code);
      }
    }

    res.json({
      success: true,
      message: `Created ${created.length} categories, skipped ${skipped.length} existing`,
      created,
      skipped
    });
  } catch (error) {
    console.error('Error initializing invoice categories:', error);
    res.status(500).json({ success: false, error: 'Failed to initialize invoice categories' });
  }
});

// ============================================
// Invoice Detail and Management APIs
// ============================================

// Get invoices to pay (for payer view) - MUST be before /:id route
router.get('/to-pay', authenticateToken, async (req, res) => {
  try {
    console.log(`💳 GET /api/invoices/to-pay - User: ${req.user.email} (${req.user.role})`);

    let whereClause = {};

    // System Admin sees all
    if (req.user.role === 'System Admin') {
      // Return all invoices for monitoring
    }
    // Brand General/Manager sees:
    // 1. Invoices directly issued to them (payer_type: 'brand', payer_id: brand.id)
    // 2. Invoices for restaurants with payment_model: 'brand_manager' under their brand
    // 3. Invoices where payer_type: 'manager' and payer_id matches any of their manager users
    else if (req.user.role === 'Brand General' || req.user.role === 'Brand Manager') {
      const brand = await Brand.findOne({ where: { owner_id: req.user.id } });
      if (!brand) {
        return res.json([]);
      }

      // Get restaurants under this brand where brand pays
      const brandPayRestaurants = await Restaurant.findAll({
        where: {
          brand_id: brand.id,
          payment_model: 'brand_manager'
        },
        attributes: ['id']
      });
      const brandPayRestaurantIds = brandPayRestaurants.map(r => r.id);

      // Build OR condition
      let conditions = [];

      // Condition 1: Direct invoices with payer_type: 'brand_manager' and payer_id is user id
      conditions.push({
        payer_type: 'brand_manager',
        payer_id: req.user.id
      });

      // Condition 2: Invoices for brand-pay restaurants
      if (brandPayRestaurantIds.length > 0) {
        conditions.push({
          restaurant_id: { [Op.in]: brandPayRestaurantIds }
        });
      }

      // IMPORTANT: Exclude invoices issued by this brand (본인이 발행한 인보이스 제외)
      whereClause = {
        [Op.and]: [
          { [Op.or]: conditions },
          {
            [Op.not]: {
              issuer_type: 'brand',
              issuer_id: brand.id
            }
          }
        ]
      };
      console.log(`  Brand ${brand.id} (User ${req.user.id}): Found ${brandPayRestaurantIds.length} brand-pay restaurants`);
      console.log(`  Excluding invoices issued by this brand`);
    }
    // Foodcourt General/Manager sees:
    // 1. Invoices directly issued to them (payer_type: 'foodcourt', payer_id: foodcourt.id)
    // 2. Invoices for restaurants with payment_model: 'foodcourt_manager' under their foodcourt
    // 3. Invoices where payer_type: 'manager' and payer_id matches their user id
    else if (req.user.role === 'Foodcourt General' || req.user.role === 'Foodcourt Manager') {
      const foodcourt = await Foodcourt.findOne({ where: { owner_id: req.user.id } });
      if (!foodcourt) {
        return res.json([]);
      }

      // Get restaurants under this foodcourt where foodcourt pays
      const foodcourtPayRestaurants = await Restaurant.findAll({
        where: {
          foodcourt_id: foodcourt.id,
          payment_model: 'foodcourt_manager'
        },
        attributes: ['id']
      });
      const foodcourtPayRestaurantIds = foodcourtPayRestaurants.map(r => r.id);

      // Build OR condition
      let conditions = [];

      // Condition 1: Direct invoices with payer_type: 'foodcourt_manager' and payer_id is user id
      conditions.push({
        payer_type: 'foodcourt_manager',
        payer_id: req.user.id
      });

      // Condition 2: Invoices for foodcourt-pay restaurants
      if (foodcourtPayRestaurantIds.length > 0) {
        conditions.push({
          restaurant_id: { [Op.in]: foodcourtPayRestaurantIds }
        });
      }

      // IMPORTANT: Exclude invoices issued by this foodcourt (본인이 발행한 인보이스 제외)
      whereClause = {
        [Op.and]: [
          { [Op.or]: conditions },
          {
            [Op.not]: {
              issuer_type: 'foodcourt',
              issuer_id: foodcourt.id
            }
          }
        ]
      };
      console.log(`  Foodcourt ${foodcourt.id}: Found ${foodcourtPayRestaurantIds.length} foodcourt-pay restaurants`);
      console.log(`  Excluding invoices issued by this foodcourt`);
    }
    // Restaurant Admin sees invoices for their restaurant
    // Includes invoices where restaurant_id matches OR (payer_type='restaurant' AND payer_id matches)
    else if (req.user.role === 'Restaurant Admin') {
      const userRestaurantId = req.user.restaurantId || req.user.restaurant_id;
      if (!userRestaurantId) {
        return res.json([]);
      }
      whereClause = {
        [Op.or]: [
          { restaurant_id: userRestaurantId },
          {
            payer_type: 'restaurant',
            payer_id: userRestaurantId
          }
        ]
      };
    }
    else {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Filter by status: default shows unpaid only, ?status=paid for paid, ?status=all for everything
    const statusFilter = req.query.status;
    if (statusFilter === 'paid') {
      whereClause.status = 'paid';
    } else if (statusFilter === 'all') {
      whereClause.status = { [Op.notIn]: ['draft', 'cancelled'] };
    } else {
      // Default: only show invoices that need payment (exclude draft, paid, cancelled)
      whereClause.status = { [Op.in]: ['pending_payment', 'payment_submitted', 'overdue'] };
    }

    const invoices = await Invoice.findAll({
      where: whereClause,
      include: [{
        model: Restaurant,
        as: 'restaurant',
        attributes: ['id', 'name', 'admin_name']
      }, {
        model: InvoiceItem,
        as: 'items'
      }],
      order: [['createdAt', 'DESC']]
    });

    // Transform for frontend - include all fields needed by frontend
    const transformedInvoices = await Promise.all(invoices.map(async (invoice) => {
      // Calculate amount from items or estimate from total
      const itemsTotal = invoice.items?.reduce((sum, item) => sum + parseFloat(item.calculated_amount || item.fixed_amount || 0), 0) || 0;
      const taxTotal = invoice.items?.reduce((sum, item) => sum + parseFloat(item.tax_amount || 0), 0) || 0;
      const amount = itemsTotal || (parseFloat(invoice.total_amount) - taxTotal) || parseFloat(invoice.total_amount);

      // Format billing period
      let billingPeriod = '-';
      if (invoice.billing_period_start && invoice.billing_period_end) {
        const start = new Date(invoice.billing_period_start);
        const end = new Date(invoice.billing_period_end);
        billingPeriod = `${start.toLocaleDateString('en-MY', { month: 'short', year: 'numeric' })} - ${end.toLocaleDateString('en-MY', { month: 'short', year: 'numeric' })}`;
      }

      // Get actual issuer company info
      const issuerInfo = await getIssuerCompanyInfo(invoice.issuer_type, invoice.issuer_id, invoice.currency || 'MYR');
      const issuerName = issuerInfo?.name || (invoice.issuer_type === 'system_admin' ? 'System Admin' : invoice.issuer_type === 'brand' ? 'Brand' : 'Foodcourt');

      // Get payer company info (Bill To)
      const payerInfo = await getPayerCompanyInfo(invoice.payer_type, invoice.payer_id, invoice.restaurant);

      // Convert invoice_category to display name
      // For subscription invoices, show plan type (e.g., "Subscription - Professional")
      let categoryDisplayName = '';
      if (invoice.invoice_category === 'subscription' && invoice.plan_type) {
        const planTypeFormatted = invoice.plan_type.charAt(0).toUpperCase() + invoice.plan_type.slice(1);
        categoryDisplayName = `Subscription - ${planTypeFormatted}`;
      } else {
        const categoryDisplayNames = {
          'subscription': 'Subscription',
          'service': 'Service',
          'consulting': 'Consulting',
          'hardware': 'Hardware',
          'setup': 'Setup Fee',
          'training': 'Training',
          'maintenance': 'Maintenance',
          'support': 'Support',
          'others': 'Others'
        };
        categoryDisplayName = categoryDisplayNames[invoice.invoice_category] ||
                                    (invoice.invoice_category ? invoice.invoice_category.charAt(0).toUpperCase() + invoice.invoice_category.slice(1) : 'Service');
      }

      return {
        id: invoice.id.toString(),
        invoiceNumber: invoice.invoice_number,
        restaurantId: invoice.restaurant_id?.toString(),
        restaurantName: invoice.restaurant?.name || 'Unknown',
        customerName: invoice.customer_name || invoice.restaurant?.name || 'Unknown',
        companyName: issuerInfo?.name || '',
        managerName: payerInfo?.name || invoice.restaurant?.admin_name || 'Unknown',
        issueDate: invoice.issued_at || invoice.createdAt,
        dueDate: invoice.due_date,
        paidDate: invoice.paid_at,
        status: invoice.status,
        currency: invoice.currency || 'MYR',
        amount: amount,
        tax: taxTotal,
        total: parseFloat(invoice.total_amount),
        issuerType: invoice.issuer_type,
        issuerId: invoice.issuer_id,
        issuerName: issuerName,
        issuerInfo: issuerInfo,
        payerType: invoice.payer_type,
        payerId: invoice.payer_id,
        payerInfo: payerInfo,
        paymentMethod: invoice.payment_method,
        transactionId: invoice.transaction_id,
        receiptUrl: invoice.receipt_url,
        paymentNotes: invoice.payment_notes,
        paymentSubmittedAt: invoice.payment_submitted_at,
        rejectionReason: invoice.rejection_reason,
        hasPaymentInfo: !!invoice.payment_method || !!invoice.receipt_url || !!invoice.payment_submitted_at,
        billingPeriod: billingPeriod,
        planType: invoice.plan_type || '',
        type: invoice.type || 'manual',
        categoryDisplayName: categoryDisplayName,
        invoiceCategory: invoice.invoice_category || 'service',
        items: invoice.items?.map(item => {
          // Use description, or fallback to item_type formatted, or category
          let desc = item.description;
          if (!desc || desc.trim() === '') {
            if (item.item_type) {
              desc = item.item_type.charAt(0).toUpperCase() + item.item_type.slice(1).replace(/_/g, ' ');
            } else {
              desc = categoryDisplayName || 'Service';
            }
          }
          return {
            description: desc,
            quantity: item.quantity || 1,
            unitPrice: parseFloat(item.fixed_amount || item.calculated_amount || 0),
            total: parseFloat(item.fixed_amount || item.calculated_amount || 0)
          };
        }) || [],
        // Additional charges (Tax, Service Charge, etc.)
        additionalCharges: invoice.additional_charges || [],
        // Discount info
        discountType: invoice.discount_type || 'none',
        discountValue: parseFloat(invoice.discount_value) || 0,
        discountAmount: parseFloat(invoice.discount_amount) || 0,
        discountReason: invoice.discount_reason || null,
        subtotalBeforeDiscount: invoice.subtotal
          ? parseFloat(invoice.subtotal)
          : parseFloat(invoice.discount_amount || 0) > 0
            ? parseFloat(invoice.total_amount) + parseFloat(invoice.discount_amount)
            : null,
        // Modification tracking
        isModified: invoice.is_modified || false,
        modificationHistory: invoice.modification_history || []
      };
    }));

    console.log(`  Found ${invoices.length} invoices to pay:`, transformedInvoices.map(i => i.invoiceNumber));
    res.json(transformedInvoices);
  } catch (error) {
    console.error('Error fetching invoices to pay:', error);
    res.status(500).json({ error: 'Failed to fetch invoices' });
  }
});

// Get invoice details with items and company info
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const invoice = await Invoice.findByPk(req.params.id, {
      include: [{
        model: Restaurant,
        as: 'restaurant',
        attributes: ['id', 'name', 'address', 'city', 'state', 'postal_code', 'country',
                     'phone', 'email', 'tax_id', 'business_registration', 'logo_url',
                     'admin_id', 'admin_name', 'plan_type', 'billing_cycle']
      }]
    });

    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    const items = await InvoiceItem.findAll({
      where: { invoice_id: req.params.id }
    });

    // Get issuer company info (with currency for bank info)
    const issuerCompany = await getIssuerCompanyInfo(
      invoice.issuer_type || 'system_admin',
      invoice.issuer_id,
      invoice.currency || 'MYR'
    );

    // Get payer company info
    const payerCompany = await getPayerCompanyInfo(
      invoice.payer_type,
      invoice.payer_id,
      invoice.restaurant
    );

    // Transform invoice with company info
    const transformedInvoice = {
      id: invoice.id.toString(),
      invoiceNumber: invoice.invoice_number,
      issuerType: invoice.issuer_type || 'system_admin',
      issuerId: invoice.issuer_id?.toString(),
      issuerName: issuerCompany?.name || 'System Admin',
      issuerCompany: issuerCompany,
      payerType: invoice.payer_type || 'restaurant',
      payerId: invoice.payer_id?.toString(),
      payerName: payerCompany?.name || invoice.restaurant?.name || 'Customer',
      payerCompany: payerCompany,
      restaurantId: invoice.restaurant_id?.toString(),
      restaurantName: invoice.restaurant?.name || 'Unknown Restaurant',
      issueDate: invoice.issued_at || invoice.createdAt,
      dueDate: invoice.due_date,
      paidDate: invoice.paid_at,
      status: invoice.status || 'pending_payment',
      currency: invoice.currency || 'MYR',
      amount: invoice.subtotal
        ? parseFloat(invoice.subtotal)
        : parseFloat(invoice.discount_amount || 0) > 0
          ? parseFloat(invoice.total_amount) + parseFloat(invoice.discount_amount)
          : parseFloat(invoice.total_amount) - (items?.reduce((sum, item) => sum + parseFloat(item.tax_amount || 0), 0) || 0),
      tax: items?.reduce((sum, item) => sum + parseFloat(item.tax_amount || 0), 0) || 0,
      total: parseFloat(invoice.total_amount),
      items: items?.map(item => ({
        id: item.id?.toString(),
        description: item.description,
        quantity: item.quantity || 1,
        unitPrice: parseFloat(item.fixed_amount || item.calculated_amount || 0),
        taxRate: parseFloat(item.tax_rate || 0),
        taxAmount: parseFloat(item.tax_amount || 0),
        total: parseFloat(item.fixed_amount || item.calculated_amount || 0)
      })) || [],
      billingPeriod: invoice.billing_period_start && invoice.billing_period_end
        ? `${new Date(invoice.billing_period_start).toLocaleDateString()} - ${new Date(invoice.billing_period_end).toLocaleDateString()}`
        : null,
      planType: invoice.restaurant?.plan_type || 'Basic Plan',
      type: invoice.type,
      notes: invoice.notes,
      paymentMethod: invoice.payment_method,
      paymentProvider: invoice.payment_provider,
      receiptUrl: invoice.receipt_url,
      confirmedBy: invoice.confirmed_by?.toString(),
      confirmedAt: invoice.confirmed_at,
      rejectionReason: invoice.rejection_reason,
      // Additional charges (Tax, Service Charge, etc.)
      additionalCharges: invoice.additional_charges || [],
      // Discount info
      discountType: invoice.discount_type || 'none',
      discountValue: parseFloat(invoice.discount_value) || 0,
      discountAmount: parseFloat(invoice.discount_amount) || 0,
      discountReason: invoice.discount_reason || null,
      subtotalBeforeDiscount: invoice.subtotal
        ? parseFloat(invoice.subtotal)
        : parseFloat(invoice.discount_amount || 0) > 0
          ? parseFloat(invoice.total_amount) + parseFloat(invoice.discount_amount)
          : null,
      // Modification tracking
      isModified: invoice.is_modified || false,
      modificationHistory: invoice.modification_history || []
    };

    res.json({ invoice: transformedInvoice, items });
  } catch (error) {
    console.error('Error fetching invoice details:', error);
    res.status(500).json({ error: 'Failed to fetch invoice details' });
  }
});

// Create new invoice (manual)
router.post('/', authenticateToken, async (req, res) => {
  console.log('POST /api/invoices called with:', JSON.stringify(req.body, null, 2));
  const { sequelize } = require('../config/database');
  const transaction = await sequelize.transaction();

  try {
    const { invoice_data, items } = req.body;

    // Calculate total amount from items if not provided
    if (!invoice_data.total_amount && items && items.length > 0) {
      invoice_data.total_amount = items.reduce((sum, item) => sum + (parseFloat(item.total_amount) || 0), 0);
    }

    // Auto-fill issued_by from authenticated user if not provided
    if (!invoice_data.issued_by) {
      invoice_data.issued_by = req.user.id;
    }
    if (!invoice_data.issued_at) {
      invoice_data.issued_at = new Date();
    }

    // Validate: issuer has payment methods for invoice currency
    const { hasPaymentMethodForCurrency } = require('../utils/paymentSettingsHelper');
    const issuerType = invoice_data.issuer_type || 'system_admin';
    const issuerId = invoice_data.issuer_id || null;
    const invoiceCurrency = invoice_data.currency || 'MYR';

    let issuerPaymentSettings = null;
    if (issuerType === 'system_admin') {
      const sysSettings = await SystemSettings.findOne({ where: { setting_key: 'payment_settings' } });
      issuerPaymentSettings = sysSettings?.setting_value || {};
    } else if (issuerType === 'brand' && issuerId) {
      const brand = await Brand.findByPk(issuerId);
      issuerPaymentSettings = brand?.payment_settings || {};
    } else if (issuerType === 'foodcourt' && issuerId) {
      const foodcourt = await Foodcourt.findByPk(issuerId);
      issuerPaymentSettings = foodcourt?.payment_settings || {};
    }

    if (!hasPaymentMethodForCurrency(issuerPaymentSettings, invoiceCurrency)) {
      await transaction.rollback();
      return res.status(400).json({
        success: false,
        error: `No payment methods configured for currency ${invoiceCurrency}. Please configure payment settings first.`
      });
    }

    // Map subtotal_before_discount → subtotal (DB column name)
    if (invoice_data.subtotal_before_discount != null && !invoice_data.subtotal) {
      invoice_data.subtotal = invoice_data.subtotal_before_discount;
      delete invoice_data.subtotal_before_discount;
    }

    // Generate invoice number using standardized format
    invoice_data.invoice_number = await generateInvoiceNumber(issuerType, issuerId, transaction);

    // Create invoice within transaction
    const invoice = await Invoice.create(invoice_data, { transaction });

    // Create invoice items within same transaction
    if (items && items.length > 0) {
      const invoiceItems = items.map(item => ({
        ...item,
        invoice_id: invoice.id
      }));
      await InvoiceItem.bulkCreate(invoiceItems, { transaction });
    }

    await transaction.commit();

    logActivity(req, {
      action_type: 'create',
      entity_type: 'invoice',
      entity_id: invoice.id,
      entity_name: invoice.invoice_number,
      description: `Created invoice ${invoice.invoice_number} (${invoiceCurrency} ${invoice.total_amount})`,
      restaurant_id: invoice.restaurant_id
    });

    res.status(201).json({ success: true, invoice });
  } catch (error) {
    await transaction.rollback();
    console.error('Error creating invoice:', error);
    res.status(500).json({ error: 'Failed to create invoice' });
  }
});

// Update invoice (full update)
router.put('/:id', authenticateToken, async (req, res) => {
  const { sequelize } = require('../config/database');
  const transaction = await sequelize.transaction();

  try {
    const invoiceId = req.params.id;
    const {
      amount,
      tax,
      total,
      dueDate,
      status,
      payerType,
      payerId,
      items,
      invoiceCategory,
      customDescription,
      serviceDescription,
      notes
    } = req.body;

    // Find existing invoice
    const invoice = await Invoice.findByPk(invoiceId, { transaction });
    if (!invoice) {
      await transaction.rollback();
      return res.status(404).json({ error: 'Invoice not found' });
    }

    // Prevent editing invoices that are paid, cancelled, or have payment submitted
    if (invoice.status === 'paid' || invoice.status === 'cancelled' || invoice.status === 'payment_submitted') {
      await transaction.rollback();
      return res.status(400).json({ error: `Cannot edit invoice with status: ${invoice.status}` });
    }

    // For automatic invoices, modification reason is required
    const { modificationReason } = req.body;
    if (invoice.type === 'automatic' && !modificationReason) {
      await transaction.rollback();
      return res.status(400).json({ error: 'Modification reason is required for automatic invoices' });
    }

    // Build modification history record
    const changes = {};
    if (amount !== undefined && parseFloat(amount) !== parseFloat(invoice.total_amount)) {
      changes.total_amount = { from: parseFloat(invoice.total_amount), to: parseFloat(total || amount) };
    }
    if (dueDate !== undefined && dueDate !== invoice.due_date?.toISOString?.()?.split('T')[0]) {
      changes.due_date = { from: invoice.due_date, to: dueDate };
    }
    if (notes !== undefined && notes !== invoice.notes) {
      changes.notes = { from: invoice.notes, to: notes };
    }

    // Update invoice fields (status is managed by PATCH /:id/status, not here)
    const updateData = {};
    if (amount !== undefined) updateData.total_amount = (total !== undefined && total !== null) ? total : amount;
    if (dueDate !== undefined) updateData.due_date = dueDate;
    if (payerType !== undefined) updateData.payer_type = payerType;
    if (payerId !== undefined) updateData.payer_id = payerId || null;
    const { restaurantId } = req.body;
    if (restaurantId !== undefined) updateData.restaurant_id = restaurantId || null;
    if (invoiceCategory !== undefined) updateData.invoice_category = invoiceCategory;
    if (customDescription !== undefined) updateData.custom_description = customDescription;
    if (serviceDescription !== undefined) updateData.service_description = serviceDescription;
    if (notes !== undefined) updateData.notes = notes;

    // Track discount changes
    const { discountType, discountValue, discountAmount, discountReason, subtotal } = req.body;
    if (discountType !== undefined) {
      if (discountType !== invoice.discount_type) changes.discount_type = { from: invoice.discount_type, to: discountType };
      updateData.discount_type = discountType;
    }
    if (discountValue !== undefined) {
      if (parseFloat(discountValue) !== parseFloat(invoice.discount_value)) changes.discount_value = { from: parseFloat(invoice.discount_value), to: parseFloat(discountValue) };
      updateData.discount_value = discountValue;
    }
    if (discountAmount !== undefined) updateData.discount_amount = discountAmount;
    if (discountReason !== undefined) updateData.discount_reason = discountReason;
    if (subtotal !== undefined) updateData.subtotal = subtotal;

    // Update additional charges if provided
    const { additionalCharges } = req.body;
    if (additionalCharges !== undefined) {
      updateData.additional_charges = additionalCharges;
    }

    // Save modification history if there are actual changes
    if (Object.keys(changes).length > 0 || modificationReason) {
      const history = Array.isArray(invoice.modification_history) ? [...invoice.modification_history] : [];
      history.push({
        modified_at: new Date().toISOString(),
        modified_by: req.user.id,
        modified_by_name: req.user.full_name || req.user.username,
        changes,
        reason: modificationReason || ''
      });
      updateData.is_modified = true;
      updateData.modification_history = history;
    }

    await invoice.update(updateData, { transaction });

    // Update items if provided
    if (items && Array.isArray(items)) {
      // Delete existing items
      await InvoiceItem.destroy({
        where: { invoice_id: invoiceId },
        transaction
      });

      // Create new items
      if (items.length > 0) {
        const invoiceItems = items.map(item => ({
          invoice_id: invoiceId,
          item_type: item.itemType || item.item_type || 'service',
          description: item.description || '',
          quantity: item.quantity || 1,
          unit_price: item.unitPrice || item.unit_price || 0,
          calculation_method: item.calculationMethod || 'fixed',
          calculated_amount: item.unitPrice || item.unit_price || item.calculatedAmount || 0,
          tax_rate: item.taxRate || item.tax_rate || 0,
          tax_amount: item.taxAmount || item.tax_amount || 0,
          total_amount: item.total || item.total_amount || 0
        }));
        await InvoiceItem.bulkCreate(invoiceItems, { transaction });
      }
    }

    await transaction.commit();

    // Fetch updated invoice with items
    const updatedInvoice = await Invoice.findByPk(invoiceId, {
      include: [{
        model: InvoiceItem,
        as: 'items'
      }]
    });

    res.json({ success: true, invoice: updatedInvoice });
  } catch (error) {
    await transaction.rollback();
    console.error('Error updating invoice:', error.message, error.sql || '');
    res.status(500).json({ error: 'Failed to update invoice', details: error.message });
  }
});

// Update invoice status
router.patch('/:id/status', authenticateToken, async (req, res) => {
  try {
    const { status, paid_amount, paid_at, payment_notes } = req.body;

    const invoice = await Invoice.findByPk(req.params.id);
    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    const updateData = { status };
    if (status === 'paid') {
      updateData.paid_amount = paid_amount || invoice.total_amount;
      updateData.paid_at = paid_at || new Date();
    }
    if (payment_notes) {
      updateData.payment_notes = payment_notes;
    }

    await invoice.update(updateData);

    // If subscription invoice is marked as paid, restore subscription to Active
    if (status === 'paid' && invoice.invoice_category === 'subscription' && invoice.restaurant_id) {
      try {
        const result = await subscriptionScheduler.restoreSubscription(invoice.restaurant_id);
        if (result.success) {
          console.log(`✅ Subscription restored for restaurant ${invoice.restaurant_id} after payment`);
        }
      } catch (subError) {
        console.error('Error restoring subscription:', subError);
        // Don't fail the invoice update if subscription restore fails
      }
    }

    logActivity(req, {
      action_type: 'update',
      entity_type: 'invoice',
      entity_id: invoice.id,
      entity_name: invoice.invoice_number,
      description: `Updated invoice ${invoice.invoice_number} status to "${status}"`,
      restaurant_id: invoice.restaurant_id
    });

    res.json({ success: true, invoice });
  } catch (error) {
    console.error('Error updating invoice status:', error);
    res.status(500).json({ error: 'Failed to update invoice status' });
  }
});

// Record payment for invoice
router.post('/:id/payment', authenticateToken, async (req, res) => {
  try {
    const { payment_method, transaction_id, payment_date, notes, receipt_url } = req.body;

    const invoice = await Invoice.findByPk(req.params.id);
    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    if (invoice.status === 'paid') {
      return res.status(400).json({ error: 'Invoice is already paid' });
    }

    // Update invoice with payment information
    const updateData = {
      status: 'paid',
      paid_amount: invoice.total_amount,
      paid_at: payment_date || new Date(),
      payment_method: payment_method || 'bank_transfer',
      transaction_id,
      payment_notes: notes,
      receipt_url
    };

    await invoice.update(updateData);

    // If subscription invoice is paid, restore subscription to Active
    if (invoice.invoice_category === 'subscription' && invoice.restaurant_id) {
      try {
        const result = await subscriptionScheduler.restoreSubscription(invoice.restaurant_id);
        if (result.success) {
          console.log(`✅ Subscription restored for restaurant ${invoice.restaurant_id} after payment`);
        }
      } catch (subError) {
        console.error('Error restoring subscription:', subError);
        // Don't fail the payment recording if subscription restore fails
      }
    }

    logActivity(req, {
      action_type: 'update',
      entity_type: 'invoice',
      entity_id: invoice.id,
      entity_name: invoice.invoice_number,
      description: `Recorded payment for invoice ${invoice.invoice_number} via ${payment_method || 'bank_transfer'}`,
      restaurant_id: invoice.restaurant_id
    });

    res.json({ success: true, invoice: await Invoice.findByPk(req.params.id) });
  } catch (error) {
    console.error('Error recording payment:', error);
    res.status(500).json({ error: 'Failed to record payment' });
  }
});

// Delete invoice
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const invoice = await Invoice.findByPk(req.params.id);
    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }
    
    // Delete invoice items first
    await InvoiceItem.destroy({
      where: { invoice_id: req.params.id }
    });

    const invoiceNumber = invoice.invoice_number;
    const invoiceRestaurantId = invoice.restaurant_id;

    // Delete invoice
    await invoice.destroy();

    logActivity(req, {
      action_type: 'delete',
      entity_type: 'invoice',
      entity_id: req.params.id,
      entity_name: invoiceNumber,
      description: `Deleted invoice ${invoiceNumber}`,
      restaurant_id: invoiceRestaurantId
    });

    res.json({ success: true, message: 'Invoice deleted successfully' });
  } catch (error) {
    console.error('Error deleting invoice:', error);
    res.status(500).json({ error: 'Failed to delete invoice' });
  }
});

// Get invoice settings for a restaurant
router.get('/settings/:restaurantId', authenticateToken, async (req, res) => {
  try {
    const settings = await InvoiceSettings.findOne({
      where: { restaurant_id: req.params.restaurantId }
    });
    
    if (!settings) {
      // Return default settings if none exist
      return res.json({
        auto_generate: false,
        payment_terms: 30,
        solution_fee_enabled: true,
        tax_rate: 10,
        invoice_prefix: 'INV'
      });
    }
    
    res.json(settings);
  } catch (error) {
    console.error('Error fetching invoice settings:', error);
    res.status(500).json({ error: 'Failed to fetch invoice settings' });
  }
});

// Update invoice settings
router.put('/settings/:restaurantId', authenticateToken, async (req, res) => {
  try {
    const { restaurantId } = req.params;
    
    let settings = await InvoiceSettings.findOne({
      where: { restaurant_id: restaurantId }
    });
    
    if (settings) {
      await settings.update(req.body);
    } else {
      settings = await InvoiceSettings.create({
        restaurant_id: restaurantId,
        ...req.body
      });
    }
    
    res.json({ success: true, settings });
  } catch (error) {
    console.error('Error updating invoice settings:', error);
    res.status(500).json({ error: 'Failed to update invoice settings' });
  }
});

// Generate invoices for all active subscriptions
router.post('/generate-for-subscriptions', authenticateToken, async (req, res) => {
  try {
    console.log('Generating invoices for all active subscriptions...');

    // Get all active restaurants with subscriptions
    const restaurants = await Restaurant.findAll({
      where: {
        status: 'active',
        subscription_start: { [Op.not]: null },
        subscription_end: { [Op.gte]: new Date() } // Active subscriptions
      }
    });

    console.log(`Found ${restaurants.length} active restaurants with subscriptions`);

    const results = [];
    const errors = [];

    for (const restaurant of restaurants) {
      try {
        // Anniversary Billing: Calculate billing period based on subscription start date
        const now = new Date();
        const subscriptionStart = new Date(restaurant.subscription_start);
        const billingCycle = restaurant.billing_cycle || 'monthly';
        const anchorDay = subscriptionStart.getDate(); // e.g., 15 if started on 15th

        // Calculate the next billing period based on subscription anniversary
        let billingStart, billingEnd, dueDate, issueDate;

        if (billingCycle === 'annual') {
          // Annual billing: Full year from subscription anniversary
          const currentYear = now.getFullYear();
          const subscriptionMonth = subscriptionStart.getMonth();

          // Find the next annual billing date
          const anniversaryThisYear = new Date(currentYear, subscriptionMonth, anchorDay);

          if (now >= anniversaryThisYear) {
            // Anniversary this year has passed, bill for next year
            billingStart = new Date(currentYear, subscriptionMonth, anchorDay);
            billingEnd = new Date(currentYear + 1, subscriptionMonth, anchorDay - 1);
          } else {
            // Anniversary hasn't come yet
            billingStart = new Date(currentYear - 1, subscriptionMonth, anchorDay);
            billingEnd = new Date(currentYear, subscriptionMonth, anchorDay - 1);
          }

          // Due date is the start of service period (prepaid model)
          dueDate = new Date(billingStart);
          // Issue invoice 7 days before due date
          issueDate = new Date(billingStart);
          issueDate.setDate(issueDate.getDate() - 7);

        } else {
          // Monthly billing: Based on subscription start day
          const currentMonth = now.getMonth();
          const currentYear = now.getFullYear();

          // Calculate the anchor day for current month (handle month end edge cases)
          const daysInCurrentMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
          const adjustedAnchorDay = Math.min(anchorDay, daysInCurrentMonth);

          // Find the upcoming billing period
          const anchorThisMonth = new Date(currentYear, currentMonth, adjustedAnchorDay);

          if (now >= anchorThisMonth) {
            // Anchor day this month has passed, bill for next period
            billingStart = new Date(currentYear, currentMonth, adjustedAnchorDay);

            // Calculate end date (day before next anchor)
            const nextMonth = currentMonth + 1;
            const daysInNextMonth = new Date(currentYear, nextMonth + 1, 0).getDate();
            const nextAnchorDay = Math.min(anchorDay, daysInNextMonth);
            billingEnd = new Date(currentYear, nextMonth, nextAnchorDay - 1);
          } else {
            // Anchor day hasn't come yet - bill for current period
            const prevMonth = currentMonth - 1;
            const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();
            const prevAnchorDay = Math.min(anchorDay, daysInPrevMonth);

            billingStart = new Date(currentYear, prevMonth, prevAnchorDay);
            billingEnd = new Date(currentYear, currentMonth, adjustedAnchorDay - 1);
          }

          // Due date is the start of service period (prepaid model)
          dueDate = new Date(billingStart);
          // Issue invoice 7 days before due date
          issueDate = new Date(billingStart);
          issueDate.setDate(issueDate.getDate() - 7);
        }

        // Ensure issue date is not in the past (issue today if so)
        if (issueDate < now) {
          issueDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        }

        // Check if invoice already exists for this period
        const existingInvoice = await Invoice.findOne({
          where: {
            restaurant_id: restaurant.id,
            billing_period_start: billingStart,
            billing_period_end: billingEnd
          }
        });

        if (existingInvoice) {
          console.log(`Invoice already exists for restaurant ${restaurant.name} for this period`);
          continue;
        }

        // Generate invoice number (system_admin issuer for auto-generated invoices)
        const invoiceNumber = await generateInvoiceNumber('system_admin', null, null);

        // Determine restaurant's currency (convert RM to MYR)
        let currency = restaurant.currency || 'MYR';
        if (currency === 'RM') currency = 'MYR';

        // Validate: System Admin has payment methods for this currency
        const { hasPaymentMethodForCurrency: hasMethod } = require('../utils/paymentSettingsHelper');
        const sysPaySettings = await SystemSettings.findOne({ where: { setting_key: 'payment_settings' } });
        if (!hasMethod(sysPaySettings?.setting_value || {}, currency)) {
          console.log(`⚠️ Skipping ${restaurant.name}: No payment methods for ${currency}`);
          errors.push({ restaurant: restaurant.name, error: `No payment methods configured for ${currency}` });
          continue;
        }

        // Get plan price from plan_prices table based on restaurant's currency
        let planAmount = parseFloat(restaurant.plan_amount || 29);
        // billingCycle already defined above for anniversary billing calculation

        // Find plan_id from plan_templates by matching plan_type
        const planTemplate = await PlanTemplate.findOne({
          where: { display_name: restaurant.plan_type }
        });

        if (planTemplate) {
          // Get price for this currency
          const planPrice = await PlanPrice.findOne({
            where: {
              plan_id: planTemplate.id,
              currency: currency,
              is_active: true
            }
          });

          if (planPrice) {
            planAmount = billingCycle === 'annual'
              ? parseFloat(planPrice.annual_price) / 12  // Monthly portion of annual price
              : parseFloat(planPrice.monthly_price);
          }
        }

        const taxRate = 0.06; // 6% tax
        const taxAmount = planAmount * taxRate;
        const totalAmount = planAmount + taxAmount;

        // Format dates for notes
        const formatDate = (date) => {
          const d = new Date(date);
          return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
        };
        const cycleText = billingCycle === 'annual' ? 'Annual' : 'Monthly';
        const periodText = `${formatDate(billingStart)} ~ ${formatDate(billingEnd)}`;

        // Determine payer based on restaurant's payment_model setting
        let payerType = 'restaurant';  // Default: Restaurant Admin pays
        let payerId = null;

        if (restaurant.payment_model === 'brand_manager' && restaurant.brand_id) {
          // Brand Manager pays - find the brand owner
          const brand = await Brand.findByPk(restaurant.brand_id);
          if (brand && brand.owner_id) {
            payerType = 'brand_manager';
            payerId = brand.owner_id;
          }
        } else if (restaurant.payment_model === 'foodcourt_manager' && restaurant.foodcourt_id) {
          // Foodcourt Manager pays - find the foodcourt owner
          const foodcourt = await Foodcourt.findByPk(restaurant.foodcourt_id);
          if (foodcourt && foodcourt.owner_id) {
            payerType = 'foodcourt_manager';
            payerId = foodcourt.owner_id;
          }
        }

        // Create invoice with currency - include site name for clarity
        const companyInfo = await CompanySettings.findOne({ where: { id: 1 }, attributes: ['site_name'] });
        const siteName = companyInfo?.site_name || 'POS';
        const categoryDisplayName = `${siteName} - ${restaurant.plan_type} (${cycleText})`;
        const invoice = await Invoice.create({
          restaurant_id: restaurant.id,
          invoice_number: invoiceNumber,
          type: 'automatic',
          invoice_category: 'subscription',
          category_display_name: categoryDisplayName,
          billing_period_start: billingStart,
          billing_period_end: billingEnd,
          due_date: dueDate,
          total_amount: totalAmount,
          currency: currency,
          status: 'pending_payment', // Auto-send subscription invoices
          notes: `${cycleText} subscription invoice for ${restaurant.plan_type}. Service period: ${periodText}. Prepaid - Due on service start date.`,
          issued_by: 0, // System generated
          issued_at: issueDate,
          issuer_type: 'system_admin',
          payer_type: payerType,
          payer_id: payerId
        });

        // Create invoice item
        await InvoiceItem.create({
          invoice_id: invoice.id,
          item_type: 'subscription',
          description: `${restaurant.plan_type} - ${cycleText} Subscription (${periodText})`,
          calculation_method: 'fixed',
          fixed_amount: planAmount,
          calculated_amount: planAmount,
          tax_rate: taxRate * 100,
          tax_amount: taxAmount,
          total_amount: totalAmount
        });

        results.push({
          restaurant_id: restaurant.id,
          restaurant_name: restaurant.name,
          invoice_number: invoiceNumber,
          amount: totalAmount,
          currency: currency
        });

        console.log(`Created invoice ${invoiceNumber} for ${restaurant.name} - ${totalAmount}`);

      } catch (error) {
        console.error(`Error creating invoice for restaurant ${restaurant.name}:`, error);
        errors.push({
          restaurant_id: restaurant.id,
          restaurant_name: restaurant.name,
          error: error.message
        });
      }
    }

    res.json({
      success: true,
      generated: results.length,
      invoices: results,
      errors: errors.length > 0 ? errors : undefined
    });

  } catch (error) {
    console.error('Error generating subscription invoices:', error);
    res.status(500).json({ error: 'Failed to generate subscription invoices' });
  }
});

// Generate invoices automatically (for cron job or manual trigger)
router.post('/generate-automatic', authenticateToken, async (req, res) => {
  try {
    // Support both camelCase and snake_case
    const restaurant_id = req.body.restaurantId || req.body.restaurant_id;
    
    // Get settings for the restaurant
    const settings = await InvoiceSettings.findOne({
      where: { 
        restaurant_id,
        auto_generate: true
      }
    });
    
    if (!settings) {
      return res.status(400).json({ error: 'Auto-generation not enabled for this restaurant' });
    }
    
    // Calculate billing period (previous month)
    const now = new Date();
    const billingStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const billingEnd = new Date(now.getFullYear(), now.getMonth(), 0);
    const dueDate = new Date(now.getFullYear(), now.getMonth(), settings.payment_terms);
    
    // Check if invoice already exists for this period
    const existingInvoice = await Invoice.findOne({
      where: {
        restaurant_id,
        billing_period_start: billingStart,
        billing_period_end: billingEnd,
        type: 'automatic'
      }
    });
    
    if (existingInvoice) {
      return res.status(400).json({ error: 'Invoice already exists for this period' });
    }
    
    // Generate invoice number (system_admin issuer for settings-based auto invoices)
    const invoiceNumber = await generateInvoiceNumber('system_admin', null, null);
    
    // Calculate items and amounts
    const items = [];
    let totalAmount = 0;
    
    // Solution fee
    if (settings.solution_fee_enabled && settings.solution_fee_amount) {
      const solutionFee = {
        item_type: 'solution_fee',
        description: 'POS System Monthly Subscription',
        calculation_method: 'fixed',
        fixed_amount: settings.solution_fee_amount,
        calculated_amount: settings.solution_fee_amount,
        tax_rate: settings.tax_rate,
        tax_amount: settings.solution_fee_amount * (settings.tax_rate / 100),
        total_amount: settings.solution_fee_amount * (1 + settings.tax_rate / 100)
      };
      items.push(solutionFee);
      totalAmount += solutionFee.total_amount;
    }
    
    // Rent calculation
    if (settings.rent_enabled) {
      let rentAmount = 0;
      let description = '';
      
      if (settings.rent_type === 'fixed') {
        rentAmount = settings.rent_fixed_amount;
        description = 'Monthly Rent (Fixed)';
      } else if (settings.rent_type === 'percentage') {
        // TODO: Calculate based on monthly sales
        // For now, we'll use a placeholder
        const monthlySales = 0; // This should be calculated from orders
        rentAmount = monthlySales * (settings.rent_percentage_rate / 100);
        description = `Monthly Rent (${settings.rent_percentage_rate}% of sales)`;
      } else if (settings.rent_type === 'combined') {
        // TODO: Calculate based on monthly sales
        const monthlySales = 0;
        const percentageAmount = monthlySales * (settings.rent_percentage_rate / 100);
        rentAmount = Math.max(settings.rent_minimum_amount, percentageAmount);
        description = `Monthly Rent (Higher of ${settings.rent_minimum_amount} or ${settings.rent_percentage_rate}% of sales)`;
      }
      
      if (rentAmount > 0) {
        const rentItem = {
          item_type: `rent_${settings.rent_type}`,
          description,
          calculation_method: settings.rent_type,
          fixed_amount: settings.rent_type === 'fixed' ? rentAmount : null,
          percentage_rate: settings.rent_type !== 'fixed' ? settings.rent_percentage_rate : null,
          minimum_amount: settings.rent_type === 'combined' ? settings.rent_minimum_amount : null,
          calculated_amount: rentAmount,
          tax_rate: settings.tax_rate,
          tax_amount: rentAmount * (settings.tax_rate / 100),
          total_amount: rentAmount * (1 + settings.tax_rate / 100)
        };
        items.push(rentItem);
        totalAmount += rentItem.total_amount;
      }
    }
    
    // Additional fees from JSON configuration
    if (settings.additional_fees && Array.isArray(settings.additional_fees)) {
      settings.additional_fees.forEach(fee => {
        const feeItem = {
          item_type: fee.type || 'other',
          description: fee.description,
          calculation_method: 'fixed',
          fixed_amount: fee.amount,
          calculated_amount: fee.amount,
          tax_rate: fee.tax_rate || settings.tax_rate,
          tax_amount: fee.amount * ((fee.tax_rate || settings.tax_rate) / 100),
          total_amount: fee.amount * (1 + (fee.tax_rate || settings.tax_rate) / 100)
        };
        items.push(feeItem);
        totalAmount += feeItem.total_amount;
      });
    }
    
    // Create invoice
    const invoice = await Invoice.create({
      restaurant_id,
      invoice_number: invoiceNumber,
      type: 'automatic',
      billing_period_start: billingStart,
      billing_period_end: billingEnd,
      due_date: dueDate,
      total_amount: totalAmount,
      status: 'pending_payment',
      notes: settings.notes_template,
      issued_by: 0, // System generated
      issued_at: new Date()
    });
    
    // Create invoice items
    if (items.length > 0) {
      const invoiceItems = items.map(item => ({
        ...item,
        invoice_id: invoice.id
      }));
      await InvoiceItem.bulkCreate(invoiceItems);
    }
    
    res.json({ success: true, invoice, items });
  } catch (error) {
    console.error('Error generating automatic invoice:', error);
    res.status(500).json({ error: 'Failed to generate automatic invoice' });
  }
});

// (Removed duplicate PUT /:invoiceId - use PUT /:id above which handles discount, modification history, and transactions)

// ============================================
// Payment Flow APIs (Submit, Confirm, Reject)
// ============================================

// Create Stripe PaymentIntent for an invoice
router.post('/:id/create-payment-intent', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const systemLogger = require('../utils/systemLogger');
    const { getStripeForIssuer, getPublishableKeyForIssuer } = require('../utils/stripeService');

    const invoice = await Invoice.findByPk(id, {
      include: [{ model: Restaurant, as: 'restaurant' }]
    });

    if (!invoice) return res.status(404).json({ success: false, error: 'Invoice not found' });
    if (invoice.status !== 'pending_payment' && invoice.status !== 'rejected') {
      return res.status(400).json({ success: false, error: `Cannot pay invoice with status: ${invoice.status}` });
    }

    // Check payment permission
    const canPay = await checkPaymentPermission(req.user, invoice);
    if (!canPay) return res.status(403).json({ success: false, error: 'Permission denied' });

    // Get Stripe for the correct issuer
    const stripe = await getStripeForIssuer(invoice.issuer_type, invoice.issuer_id);

    // Convert amount to smallest currency unit
    const ZERO_DECIMAL = ['JPY', 'KRW', 'VND'];
    const multiplier = ZERO_DECIMAL.includes(invoice.currency?.toUpperCase()) ? 1 : 100;
    const amountInSmallestUnit = Math.round(parseFloat(invoice.total_amount) * multiplier);

    // Create PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInSmallestUnit,
      currency: (invoice.currency || 'MYR').toLowerCase(),
      metadata: {
        invoice_id: String(invoice.id),
        invoice_number: invoice.invoice_number,
        restaurant_id: String(invoice.restaurant_id || ''),
        issuer_type: invoice.issuer_type,
        issuer_id: String(invoice.issuer_id || '')
      },
      description: `Invoice ${invoice.invoice_number} - ${invoice.restaurant?.name || 'N/A'}`
    });

    // Store payment_intent_id on invoice
    await invoice.update({
      payment_intent_id: paymentIntent.id,
      payment_provider: 'stripe',
      payment_method: 'stripe'
    });

    const publishableKey = await getPublishableKeyForIssuer(invoice.issuer_type, invoice.issuer_id);

    await systemLogger.info('payment', 'stripe', `PaymentIntent created: ${invoice.invoice_number}`, {
      paymentIntentId: paymentIntent.id, amount: amountInSmallestUnit, currency: invoice.currency
    });

    res.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      publishableKey,
      paymentIntentId: paymentIntent.id
    });
  } catch (error) {
    console.error('Error creating PaymentIntent:', error);
    const systemLogger = require('../utils/systemLogger');
    await systemLogger.error('payment', 'stripe', 'PaymentIntent creation failed', { error: error.message, invoiceId: req.params.id });
    res.status(500).json({ success: false, error: 'Failed to create payment intent', details: error.message });
  }
});

// Create PayPal order for an invoice (mirrors create-payment-intent)
router.post('/:id/create-paypal-order', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const systemLogger = require('../utils/systemLogger');
    const { createPayPalClient, getClientIdForIssuer } = require('../utils/paypalService');
    const paypal = require('@paypal/checkout-server-sdk');

    const invoice = await Invoice.findByPk(id, {
      include: [{ model: Restaurant, as: 'restaurant' }]
    });

    if (!invoice) return res.status(404).json({ success: false, error: 'Invoice not found' });
    if (invoice.status !== 'pending_payment' && invoice.status !== 'rejected') {
      return res.status(400).json({ success: false, error: `Cannot pay invoice with status: ${invoice.status}` });
    }

    const canPay = await checkPaymentPermission(req.user, invoice);
    if (!canPay) return res.status(403).json({ success: false, error: 'Permission denied' });

    const { client } = await createPayPalClient(invoice.issuer_type, invoice.issuer_id);

    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer('return=representation');
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [{
        reference_id: String(invoice.id),
        description: `Invoice ${invoice.invoice_number} - ${invoice.restaurant?.name || 'N/A'}`,
        custom_id: String(invoice.id),
        amount: {
          currency_code: (invoice.currency || 'MYR').toUpperCase(),
          value: parseFloat(invoice.total_amount).toFixed(2)
        }
      }]
    });

    const order = await client.execute(request);

    await invoice.update({
      payment_intent_id: order.result.id,
      payment_provider: 'paypal',
      payment_method: 'paypal'
    });

    const clientId = await getClientIdForIssuer(invoice.issuer_type, invoice.issuer_id);

    await systemLogger.info('payment', 'paypal', `PayPal order created: ${invoice.invoice_number}`, {
      orderId: order.result.id, amount: invoice.total_amount, currency: invoice.currency
    });

    res.json({
      success: true,
      orderId: order.result.id,
      clientId,
      status: order.result.status
    });
  } catch (error) {
    console.error('Error creating PayPal order:', error);
    const systemLogger = require('../utils/systemLogger');
    await systemLogger.error('payment', 'paypal', 'PayPal order creation failed', { error: error.message, invoiceId: req.params.id });
    res.status(500).json({ success: false, error: 'Failed to create PayPal order', details: error.message });
  }
});

// Capture PayPal order after user approval
router.post('/:id/capture-paypal-order', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { orderId } = req.body;
    const systemLogger = require('../utils/systemLogger');
    const { createPayPalClient } = require('../utils/paypalService');
    const paypal = require('@paypal/checkout-server-sdk');

    const invoice = await Invoice.findByPk(id, {
      include: [{ model: Restaurant, as: 'restaurant' }]
    });

    if (!invoice) return res.status(404).json({ success: false, error: 'Invoice not found' });

    const canPay = await checkPaymentPermission(req.user, invoice);
    if (!canPay) return res.status(403).json({ success: false, error: 'Permission denied' });

    if (invoice.payment_intent_id !== orderId) {
      return res.status(400).json({ success: false, error: 'Order ID mismatch' });
    }

    const { client } = await createPayPalClient(invoice.issuer_type, invoice.issuer_id);

    const request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.requestBody({});
    const capture = await client.execute(request);

    if (capture.result.status === 'COMPLETED') {
      const captureId = capture.result.purchase_units?.[0]?.payments?.captures?.[0]?.id;
      await invoice.update({
        status: 'paid',
        paid_at: new Date(),
        paid_amount: invoice.total_amount,
        payment_method: 'paypal',
        payment_provider: 'paypal',
        transaction_id: captureId || orderId,
        confirmed_at: new Date(),
        confirmed_by: 0
      });

      await systemLogger.info('payment', 'paypal', `Invoice ${invoice.invoice_number} paid via PayPal`, {
        orderId, captureId, amount: invoice.total_amount
      });

      res.json({ success: true, status: 'COMPLETED', captureId });
    } else {
      await systemLogger.warn('payment', 'paypal', `PayPal capture not completed: ${capture.result.status}`, {
        orderId, status: capture.result.status
      });
      res.json({ success: true, status: capture.result.status });
    }
  } catch (error) {
    console.error('Error capturing PayPal order:', error);
    const systemLogger = require('../utils/systemLogger');
    await systemLogger.error('payment', 'paypal', 'PayPal capture failed', { error: error.message, invoiceId: req.params.id });
    res.status(500).json({ success: false, error: 'Failed to capture PayPal payment', details: error.message });
  }
});

// Submit payment for an invoice (by payer - restaurant, brand manager, foodcourt manager)
router.post('/:id/submit-payment', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    // Support both camelCase (frontend) and snake_case field names
    const payment_method = req.body.payment_method || req.body.paymentMethod;
    const payment_provider = req.body.payment_provider || req.body.paymentProvider;
    const payment_intent_id = req.body.payment_intent_id || req.body.paymentIntentId;
    const receipt_url = req.body.receipt_url || req.body.receiptUrl;
    const transaction_id = req.body.transaction_id || req.body.transactionId;
    const notes = req.body.notes || req.body.payment_notes;

    console.log(`💸 POST /api/invoices/${id}/submit-payment - User: ${req.user.email}`);
    console.log(`  payment_method: ${payment_method}, transaction_id: ${transaction_id}, receipt_url length: ${receipt_url ? receipt_url.length : 'NULL'}`);

    const invoice = await Invoice.findByPk(id, {
      include: [{
        model: Restaurant,
        as: 'restaurant'
      }]
    });

    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    // Check if invoice is in payable state
    if (invoice.status !== 'pending_payment' && invoice.status !== 'rejected') {
      return res.status(400).json({
        error: `Cannot submit payment for invoice with status: ${invoice.status}`
      });
    }

    // Verify user has permission to pay this invoice
    const canPay = await checkPaymentPermission(req.user, invoice);
    if (!canPay) {
      return res.status(403).json({ error: 'You do not have permission to pay this invoice' });
    }

    // Validate payment_method against issuer's configured methods
    if (payment_method) {
      let paymentSettings = null;
      const currency = invoice.currency || 'MYR';

      if (invoice.issuer_type === 'brand' && invoice.issuer_id) {
        const brand = await Brand.findByPk(invoice.issuer_id);
        paymentSettings = brand?.payment_settings;
      } else if (invoice.issuer_type === 'foodcourt' && invoice.issuer_id) {
        const foodcourt = await Foodcourt.findByPk(invoice.issuer_id);
        paymentSettings = foodcourt?.payment_settings;
      } else {
        // system_admin issuer
        const settings = await SystemSettings.findOne({ where: { setting_key: PAYMENT_SETTINGS_KEY } });
        paymentSettings = settings?.setting_value;
      }

      if (paymentSettings) {
        const { methods } = getAvailablePaymentMethods(paymentSettings, currency);
        const validMethodIds = methods.map(m => m.id);
        if (validMethodIds.length > 0 && !validMethodIds.includes(payment_method)) {
          return res.status(400).json({
            error: `Payment method '${payment_method}' is not available for this invoice`
          });
        }
      }
    }

    // Update invoice with payment submission
    await invoice.update({
      status: 'payment_submitted',
      payment_method: payment_method || 'bank_transfer',
      transaction_id: transaction_id || null,
      payment_provider: payment_provider || null,
      payment_intent_id: payment_intent_id || null,
      receipt_url: receipt_url || null,
      payment_notes: notes || null,
      payment_submitted_at: new Date(),
      rejection_reason: null // Clear any previous rejection
    });

    console.log(`✅ Payment submitted for invoice ${invoice.invoice_number}`);

    res.json({
      success: true,
      message: 'Payment submitted successfully. Awaiting confirmation.',
      invoice: await Invoice.findByPk(id)
    });
  } catch (error) {
    console.error('Error submitting payment:', error);
    res.status(500).json({ error: 'Failed to submit payment' });
  }
});

// Confirm payment for an invoice (by issuer - system admin, brand general, foodcourt general)
router.post('/:id/confirm-payment', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { notes } = req.body;

    console.log(`✅ POST /api/invoices/${id}/confirm-payment - User: ${req.user.email}`);

    const invoice = await Invoice.findByPk(id);
    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    // Check if invoice is in confirmable state
    if (invoice.status !== 'payment_submitted') {
      return res.status(400).json({
        error: `Cannot confirm payment for invoice with status: ${invoice.status}. Expected: payment_submitted`
      });
    }

    // Verify user has permission to confirm this invoice
    const canConfirm = await checkConfirmPermission(req.user, invoice);
    if (!canConfirm) {
      return res.status(403).json({ error: 'You do not have permission to confirm this invoice' });
    }

    // Update invoice as paid
    await invoice.update({
      status: 'paid',
      paid_at: new Date(),
      paid_amount: invoice.total_amount,
      confirmed_by: req.user.id,
      confirmed_at: new Date(),
      payment_notes: notes ? `${invoice.payment_notes || ''}\n[Confirmation note]: ${notes}` : invoice.payment_notes
    });

    console.log(`✅ Payment confirmed for invoice ${invoice.invoice_number} by user ${req.user.id}`);

    logActivity(req, {
      action_type: 'update',
      entity_type: 'invoice',
      entity_id: invoice.id,
      entity_name: invoice.invoice_number,
      description: `Confirmed payment for invoice ${invoice.invoice_number}`,
      restaurant_id: invoice.restaurant_id
    });

    // Notify issuer about payment confirmation (non-blocking)
    (async () => {
      try {
        const restaurant = await Restaurant.findByPk(invoice.restaurant_id, { attributes: ['id', 'name'] });
        const mail = invoicePaidEmail(invoice, restaurant?.name || 'Unknown Restaurant');
        let issuerIds = [];
        if (invoice.issuer_type === 'system_admin') {
          issuerIds = await getSystemAdminIds();
        } else if (invoice.issuer_type === 'brand' && invoice.issuer_id) {
          issuerIds = await getBrandManagerIds(invoice.issuer_id);
        } else if (invoice.issuer_type === 'foodcourt' && invoice.issuer_id) {
          issuerIds = await getFoodcourtManagerIds(invoice.issuer_id);
        }
        const filteredIds = issuerIds.filter(id => id !== req.user.id);
        if (filteredIds.length > 0) {
          await sendNotificationBatch(filteredIds, 'invoice_paid', mail);
        }
      } catch (e) {
        console.error('[Invoice paid notification error]', e.message);
      }
    })();

    res.json({
      success: true,
      message: 'Payment confirmed successfully.',
      invoice: await Invoice.findByPk(id)
    });
  } catch (error) {
    console.error('Error confirming payment:', error);
    res.status(500).json({ error: 'Failed to confirm payment' });
  }
});

// Reject payment for an invoice (by issuer - system admin, brand general, foodcourt general)
router.post('/:id/reject-payment', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    console.log(`❌ POST /api/invoices/${id}/reject-payment - User: ${req.user.email}`);

    if (!reason || reason.trim() === '') {
      return res.status(400).json({ error: 'Rejection reason is required' });
    }

    const invoice = await Invoice.findByPk(id);
    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    // Check if invoice is in rejectable state
    if (invoice.status !== 'payment_submitted') {
      return res.status(400).json({
        error: `Cannot reject payment for invoice with status: ${invoice.status}. Expected: payment_submitted`
      });
    }

    // Verify user has permission to reject this invoice
    const canReject = await checkConfirmPermission(req.user, invoice);
    if (!canReject) {
      return res.status(403).json({ error: 'You do not have permission to reject this invoice' });
    }

    // Update invoice back to pending with rejection reason
    await invoice.update({
      status: 'pending_payment',
      rejection_reason: reason,
      payment_submitted_at: null
    });

    console.log(`❌ Payment rejected for invoice ${invoice.invoice_number} by user ${req.user.id}. Reason: ${reason}`);

    logActivity(req, {
      action_type: 'update',
      entity_type: 'invoice',
      entity_id: invoice.id,
      entity_name: invoice.invoice_number,
      description: `Rejected payment for invoice ${invoice.invoice_number}. Reason: ${reason}`,
      restaurant_id: invoice.restaurant_id
    });

    res.json({
      success: true,
      message: 'Payment rejected. Invoice returned to pending status.',
      invoice: await Invoice.findByPk(id)
    });
  } catch (error) {
    console.error('Error rejecting payment:', error);
    res.status(500).json({ error: 'Failed to reject payment' });
  }
});

// Get invoices by issuer (for brand/foodcourt to see invoices they issued)
router.get('/issued-by/:issuerType/:issuerId', authenticateToken, async (req, res) => {
  try {
    const { issuerType, issuerId } = req.params;
    console.log(`📋 GET /api/invoices/issued-by/${issuerType}/${issuerId} - User: ${req.user.email}`);

    // Validate issuer type
    if (!['system_admin', 'brand', 'foodcourt'].includes(issuerType)) {
      return res.status(400).json({ error: 'Invalid issuer type' });
    }

    // Check permission
    if (req.user.role !== 'System Admin') {
      if (issuerType === 'brand') {
        const brand = await Brand.findByPk(issuerId);
        if (!brand || brand.owner_id !== req.user.id) {
          return res.status(403).json({ error: 'Access denied' });
        }
      } else if (issuerType === 'foodcourt') {
        const foodcourt = await Foodcourt.findByPk(issuerId);
        if (!foodcourt || foodcourt.owner_id !== req.user.id) {
          return res.status(403).json({ error: 'Access denied' });
        }
      } else {
        return res.status(403).json({ error: 'Access denied' });
      }
    }

    const whereClause = {
      issuer_type: issuerType
    };

    if (issuerType !== 'system_admin') {
      whereClause.issuer_id = issuerId;
    }

    const invoices = await Invoice.findAll({
      where: whereClause,
      include: [{
        model: Restaurant,
        as: 'restaurant',
        attributes: ['id', 'name', 'admin_name', 'plan_type']
      }, {
        model: InvoiceItem,
        as: 'items'
      }],
      order: [['createdAt', 'DESC']]
    });

    // Transform for frontend
    const transformedInvoices = invoices.map(invoice => ({
      id: invoice.id.toString(),
      invoiceNumber: invoice.invoice_number,
      restaurantId: invoice.restaurant_id?.toString(),
      restaurantName: invoice.restaurant?.name || 'Unknown',
      issueDate: invoice.issued_at || invoice.createdAt,
      dueDate: invoice.due_date,
      paidDate: invoice.paid_at,
      status: invoice.status,
      currency: invoice.currency || 'MYR',
      total: parseFloat(invoice.total_amount),
      paymentSubmittedAt: invoice.payment_submitted_at,
      rejectionReason: invoice.rejection_reason,
      confirmedAt: invoice.confirmed_at,
      confirmedBy: invoice.confirmed_by
    }));

    res.json(transformedInvoices);
  } catch (error) {
    console.error('Error fetching issued invoices:', error);
    res.status(500).json({ error: 'Failed to fetch invoices' });
  }
});

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

// Update payer for unpaid invoices when payment_model changes
router.put('/update-payer/:restaurantId', authenticateToken, async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { payment_model } = req.body;

    console.log(`💰 Updating payer for unpaid invoices of restaurant ${restaurantId} to ${payment_model}`);

    // Get restaurant with brand/foodcourt info
    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    // Determine new payer based on payment_model
    let newPayerType = 'restaurant';
    let newPayerId = null;

    if (payment_model === 'brand_manager' && restaurant.brand_id) {
      const brand = await Brand.findByPk(restaurant.brand_id);
      if (brand && brand.owner_id) {
        newPayerType = 'brand_manager';
        newPayerId = brand.owner_id;
      }
    } else if (payment_model === 'foodcourt_manager' && restaurant.foodcourt_id) {
      const foodcourt = await Foodcourt.findByPk(restaurant.foodcourt_id);
      if (foodcourt && foodcourt.owner_id) {
        newPayerType = 'foodcourt_manager';
        newPayerId = foodcourt.owner_id;
      }
    }

    // Update all unpaid invoices (pending_payment, overdue, draft)
    const unpaidStatuses = ['draft', 'pending_payment', 'overdue'];
    const [updatedCount] = await Invoice.update(
      {
        payer_type: newPayerType,
        payer_id: newPayerId
      },
      {
        where: {
          restaurant_id: restaurantId,
          status: unpaidStatuses
        }
      }
    );

    console.log(`✅ Updated ${updatedCount} unpaid invoices to payer_type: ${newPayerType}`);

    res.json({
      success: true,
      message: `Updated ${updatedCount} unpaid invoices`,
      updatedCount,
      newPayerType,
      newPayerId
    });
  } catch (error) {
    console.error('Error updating invoice payers:', error);
    res.status(500).json({ error: 'Failed to update invoice payers' });
  }
});

// Send invoice via email (uses issuer's SMTP settings)
/**
 * POST /api/invoices/:id/link-account
 * Link an external (non-member) invoice to a user account
 */
router.post('/:id/link-account', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { restaurant_id, payer_id, payer_type } = req.body;

    const invoice = await Invoice.findByPk(id);
    if (!invoice) {
      return res.status(404).json({ success: false, message: 'Invoice not found' });
    }

    if (invoice.status === 'paid' || invoice.status === 'cancelled') {
      return res.status(400).json({ success: false, message: `Cannot modify invoice with status: ${invoice.status}` });
    }

    const updateData = {};
    if (restaurant_id !== undefined) updateData.restaurant_id = restaurant_id;
    if (payer_id !== undefined) updateData.payer_id = payer_id;
    if (payer_type !== undefined) updateData.payer_type = payer_type;

    await invoice.update(updateData);

    logActivity(req, {
      action_type: 'update',
      entity_type: 'invoice',
      entity_id: invoice.id,
      entity_name: invoice.invoice_number,
      description: `Linked invoice ${invoice.invoice_number} to account (restaurant_id: ${restaurant_id}, payer_id: ${payer_id})`,
      restaurant_id: restaurant_id
    });

    res.json({ success: true, message: 'Account linked successfully', data: invoice });
  } catch (error) {
    console.error('Link account error:', error);
    res.status(500).json({ success: false, message: 'Failed to link account' });
  }
});

// Send invoice via email (uses issuer's SMTP settings)
router.post('/:id/send-email', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    let { recipientEmail } = req.body;

    // Fallback to external payer email if not provided
    if (!recipientEmail) {
      const tempInvoice = await Invoice.findByPk(id, { attributes: ['external_payer_email'] });
      if (tempInvoice?.external_payer_email) {
        recipientEmail = tempInvoice.external_payer_email;
      }
    }

    if (!recipientEmail || !recipientEmail.includes('@')) {
      return res.status(400).json({ error: 'Valid recipient email is required' });
    }

    // Get the invoice with items and restaurant
    const invoice = await Invoice.findByPk(id, {
      include: [{
        model: Restaurant,
        as: 'restaurant',
        attributes: ['id', 'name', 'admin_id', 'admin_name', 'plan_type', 'email']
      }, {
        model: InvoiceItem,
        as: 'items'
      }]
    });

    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    const { sendIssuerEmail } = require('../utils/emailService');
    const { invoiceEmail, entityPlanInvoiceEmail } = require('../utils/emailTemplates');

    const siteUrl = process.env.SITE_URL || 'https://purplehere.com';
    const formatDate = (d) => d ? new Date(d).toLocaleDateString('en-MY', { year: 'numeric', month: 'long', day: 'numeric' }) : '-';
    const issuerType = invoice.issuer_type || 'system_admin';
    const issuerId = invoice.issuer_id;

    // Get issuer info for branding
    let issuerInfo = null;
    if (issuerType === 'brand' && issuerId) {
      const brand = await Brand.findByPk(issuerId);
      if (brand) {
        issuerInfo = { name: brand.name, logoUrl: brand.logo_url, companyName: brand.company_name, color: '#635BFF' };
      }
    } else if (issuerType === 'foodcourt' && issuerId) {
      const foodcourt = await Foodcourt.findByPk(issuerId);
      if (foodcourt) {
        issuerInfo = { name: foodcourt.name, logoUrl: foodcourt.logo_url, companyName: foodcourt.company_name, color: '#059669' };
      }
    }

    // Get recipient name
    let recipientName = 'Restaurant Admin';
    if (invoice.restaurant?.admin_id) {
      const adminUser = await User.findByPk(invoice.restaurant.admin_id);
      if (adminUser) recipientName = adminUser.full_name || adminUser.username;
    }

    // Build email based on invoice type
    let emailContent;
    if (issuerType !== 'system_admin' && invoice.items && invoice.items.length > 0) {
      // Entity plan invoice (brand/foodcourt) — use multi-item template
      const items = invoice.items.map(item => ({
        description: item.description,
        calculated_amount: item.calculated_amount,
        tax_amount: item.tax_amount,
        total_amount: item.total_amount
      }));
      const subtotal = items.reduce((sum, i) => sum + parseFloat(i.calculated_amount), 0);
      const taxTotal = items.reduce((sum, i) => sum + parseFloat(i.tax_amount), 0);
      // Find revenue from base_amount of percentage items
      const revenueItem = invoice.items.find(i => i.base_amount && parseFloat(i.base_amount) > 0);
      const revenue = revenueItem ? parseFloat(revenueItem.base_amount) : undefined;

      emailContent = entityPlanInvoiceEmail({
        recipientName,
        restaurantName: invoice.restaurant?.name || 'Restaurant',
        invoiceNumber: invoice.invoice_number,
        planName: invoice.category_display_name || 'Plan',
        items,
        subtotal,
        taxAmount: taxTotal,
        totalAmount: parseFloat(invoice.total_amount),
        currency: invoice.currency || 'MYR',
        billingPeriodStart: formatDate(invoice.billing_period_start),
        billingPeriodEnd: formatDate(invoice.billing_period_end),
        dueDate: formatDate(invoice.due_date),
        revenue,
        dashboardUrl: siteUrl + '/pos/login',
        issuerInfo
      });
    } else {
      // POS subscription invoice (system_admin) — use simple template
      const subtotal = invoice.items?.reduce((sum, i) => sum + parseFloat(i.calculated_amount || 0), 0) || parseFloat(invoice.total_amount);
      const taxTotal = invoice.items?.reduce((sum, i) => sum + parseFloat(i.tax_amount || 0), 0) || 0;

      emailContent = invoiceEmail({
        adminName: recipientName,
        restaurantName: invoice.restaurant?.name || 'Restaurant',
        invoiceNumber: invoice.invoice_number,
        planType: invoice.category_display_name || invoice.restaurant?.plan_type || 'Subscription',
        billingCycle: 'Monthly',
        subtotal,
        taxRate: invoice.items?.[0]?.tax_rate || 6,
        taxAmount: taxTotal,
        totalAmount: parseFloat(invoice.total_amount),
        currency: invoice.currency || 'MYR',
        billingPeriodStart: formatDate(invoice.billing_period_start),
        billingPeriodEnd: formatDate(invoice.billing_period_end),
        dueDate: formatDate(invoice.due_date),
        dashboardUrl: siteUrl + '/pos/login',
        issuerInfo
      });
    }

    // Send using issuer's SMTP
    const result = await sendIssuerEmail(issuerType, issuerId, {
      to: recipientEmail,
      subject: emailContent.subject,
      html: emailContent.html,
      text: emailContent.text
    });

    console.log(`📧 Invoice email sent: ${invoice.invoice_number} to ${recipientEmail} (${result.messageId})`);

    res.json({
      success: true,
      message: `Invoice ${invoice.invoice_number} sent to ${recipientEmail}`,
      invoiceNumber: invoice.invoice_number,
      recipient: recipientEmail,
      messageId: result.messageId
    });

  } catch (error) {
    console.error('Error sending invoice email:', error);
    res.status(500).json({ error: `Failed to send invoice email: ${error.message}` });
  }
});

// Generate missing subscription invoices for a restaurant (backfill)
router.post('/generate-missing/:restaurantId', authenticateToken, async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { fromDate } = req.body;

    console.log(`📊 Generating missing invoices for restaurant ${restaurantId}...`);

    const result = await invoiceScheduler.generateMissingInvoices(restaurantId, fromDate);

    if (result.success) {
      res.json({
        success: true,
        message: `Generated ${result.generated.length} missing invoices`,
        generated: result.generated
      });
    } else {
      res.status(400).json({ error: result.error });
    }

  } catch (error) {
    console.error('Error generating missing invoices:', error);
    res.status(500).json({ error: 'Failed to generate missing invoices' });
  }
});

// Trigger daily invoice generation manually (for testing)
router.post('/trigger-daily-generation', authenticateToken, async (req, res) => {
  try {
    console.log('📊 Manually triggering daily invoice generation...');
    await invoiceScheduler.generateSubscriptionInvoices();
    res.json({ success: true, message: 'Daily invoice generation triggered' });
  } catch (error) {
    console.error('Error triggering daily generation:', error);
    res.status(500).json({ error: 'Failed to trigger daily generation' });
  }
});

// Bulk generate missing invoices for all active restaurants (System Admin)
router.post('/generate-missing-bulk', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'System Admin') {
      return res.status(403).json({ success: false, message: 'System Admin only' });
    }

    console.log('📊 [BULK] Generating missing invoices for all active restaurants...');

    const subResult = await invoiceScheduler.generateSubscriptionInvoices();
    const entityResult = await invoiceScheduler.generateEntityPlanInvoices();
    const entitySubResult = await invoiceScheduler.generateEntitySubscriptionInvoices();

    const totalGenerated = (subResult.generated || 0) + (entityResult.generated || 0) + (entitySubResult.generated || 0);
    const totalSkipped = (subResult.skipped || 0) + (entityResult.skipped || 0) + (entitySubResult.skipped || 0);

    res.json({
      success: true,
      message: totalGenerated > 0
        ? `Generated ${totalGenerated} missing invoices (${subResult.generated || 0} restaurant, ${entityResult.generated || 0} entity plan, ${entitySubResult.generated || 0} entity subscription)`
        : 'No missing invoices found. All invoices are up to date.',
      subscription: subResult,
      entityPlan: entityResult,
      entitySubscription: entitySubResult,
      totalGenerated,
      totalSkipped
    });
  } catch (error) {
    console.error('Error bulk generating missing invoices:', error);
    res.status(500).json({ success: false, message: 'Failed to generate missing invoices' });
  }
});

module.exports = router;
module.exports.getIssuerCompanyInfo = getIssuerCompanyInfo;
module.exports.getPayerCompanyInfo = getPayerCompanyInfo;
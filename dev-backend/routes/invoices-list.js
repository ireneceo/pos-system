// list/get only — split from invoices-main.js (2026-05-03)
// 마운트: routes/invoices.js barrel via app.use('/api/invoices', ...)
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

const { authenticateToken, checkRestaurantAccess, getManagerScope } = require('../middleware/auth');
const InvoiceCategory = require('../models/InvoiceCategory');
const { normalizeAdditionalCharges, getAvailablePaymentMethods } = require('../utils/paymentSettingsHelper');
const { sendNotification, sendNotificationBatch, getSystemAdminIds, getBrandManagerIds, getFoodcourtManagerIds } = require('../utils/notificationService');
const { invoicePaidEmail } = require('../utils/notificationTemplates');
const { logActivity } = require('../utils/activityLogger');
const {
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
} = require('./invoices-helpers');
const { invoiceInBranch } = require('./invoices-helpers');

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

    // Branch-scoped Foodcourt Manager: restrict to invoices linked to restaurants/contracts in their branch
    const mgrScope = getManagerScope(req.user);
    if (mgrScope.scoped && mgrScope.branch_id) {
      const Contract = require('../models/Contract');
      const FoodcourtUnit = require('../models/FoodcourtUnit');
      const branchUnits = await FoodcourtUnit.findAll({
        where: { branch_id: mgrScope.branch_id },
        attributes: ['id']
      });
      const unitIds = branchUnits.map(u => u.id);
      const branchContracts = unitIds.length > 0 ? await Contract.findAll({
        where: { unit_id: { [Op.in]: unitIds } },
        attributes: ['id']
      }) : [];
      const contractIds = branchContracts.map(c => c.id);
      const branchRestaurants = await Restaurant.findAll({
        where: { branch_id: mgrScope.branch_id },
        attributes: ['id']
      });
      const restaurantIds = branchRestaurants.map(r => r.id);

      const orConditions = [];
      if (contractIds.length > 0) orConditions.push({ contract_id: { [Op.in]: contractIds } });
      if (restaurantIds.length > 0) orConditions.push({ restaurant_id: { [Op.in]: restaurantIds } });
      if (orConditions.length === 0) return res.json([]);
      whereClause = { ...whereClause, [Op.and]: [{ [Op.or]: orConditions }] };
    }
    // Demo filter: System Admin excludes demo restaurants by default
    const includeDemo = req.query.includeDemo === 'true';
    const excludeDemo = (role === 'System Admin' && !includeDemo);

    const invoices = await Invoice.findAll({
      where: whereClause,
      include: [{
        model: Restaurant,
        as: 'restaurant',
        attributes: ['id', 'name', 'admin_id', 'admin_name', 'plan_type', 'phone', 'email', 'subscription_snapshot', 'billing_cycle', 'is_demo', 'operation_settings'],
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

    // Get all unique payer IDs to fetch user data — includes ALL payer types
    // (restaurant, brand_manager, foodcourt_manager, restaurant_owner).
    // For orphan invoices (restaurant_id=null but payer_id set), we need user info.
    const payerIds = [...new Set(filteredInvoices
      .filter(inv => inv.payer_id)
      .map(inv => inv.payer_id)
    )];

    // Fetch payer User records + their restaurants (for orphan invoice fallback)
    const payers = payerIds.length > 0 ? await User.findAll({
      where: { id: { [Op.in]: payerIds } }
    }) : [];

    // Fetch restaurant names for any payer-User that has a restaurant_id
    const payerRestaurantIds = [...new Set(payers
      .map(p => p.restaurant_id)
      .filter(Boolean)
    )];
    const payerRestaurants = payerRestaurantIds.length > 0 ? await Restaurant.findAll({
      where: { id: { [Op.in]: payerRestaurantIds } },
      attributes: ['id', 'name', 'address']
    }) : [];
    const payerRestaurantById = {};
    payerRestaurants.forEach(r => { payerRestaurantById[r.id] = r; });

    // Fetch linked hardware quotes for hardware invoices (for company_name fallback)
    const invoiceIds = filteredInvoices.map(inv => inv.id);
    const HardwareQuote = require('../models/HardwareQuote');
    const linkedQuotes = invoiceIds.length > 0 ? await HardwareQuote.findAll({
      where: { invoice_id: { [Op.in]: invoiceIds } },
      attributes: ['id', 'invoice_id', 'company_name', 'contact_name', 'contact_email']
    }) : [];
    const quoteByInvoiceId = {};
    linkedQuotes.forEach(q => { quoteByInvoiceId[q.invoice_id] = q; });

    // Cache issuer info by (type,id,currency) to avoid duplicate lookups
    const issuerInfoCache = new Map();
    const getCachedIssuerInfo = async (type, id, currency) => {
      const key = `${type}|${id || ''}|${currency}`;
      if (!issuerInfoCache.has(key)) {
        issuerInfoCache.set(key, await getIssuerCompanyInfo(type, id, currency));
      }
      return issuerInfoCache.get(key);
    };

    // Transform data to match frontend expectations
    const transformedInvoices = await Promise.all(filteredInvoices.map(async invoice => {
      // Resolve customer info with a comprehensive fallback chain:
      //   1. Direct restaurant_id → restaurant.name
      //   2. payer_id → user's restaurant (for orphan invoices where admin is linked)
      //   3. payer_id → user.company_name / full_name
      //   4. Linked hardware_quote.company_name / contact_name
      //   5. external_payer_company / external_payer_name
      //   6. '—'
      let customerName, customerAddress, customerCompany, customerRole;

      const payer = invoice.payer_id ? payers.find(p => p.id === invoice.payer_id) : null;
      const payerRestaurant = payer?.restaurant_id ? payerRestaurantById[payer.restaurant_id] : null;
      const linkedQuote = quoteByInvoiceId[invoice.id];

      if (invoice.payer_type === 'external') {
        customerName = invoice.external_payer_name
          || linkedQuote?.company_name
          || linkedQuote?.contact_name
          || 'Non-Member';
        customerAddress = invoice.external_payer_address || 'No address';
        customerCompany = invoice.external_payer_company
          || linkedQuote?.company_name
          || invoice.external_payer_name
          || 'Non-Member';
        customerRole = null;
      } else {
        // Unified fallback for all non-external payer types
        customerName = invoice.restaurant?.name
          || payerRestaurant?.name
          || payer?.company_name
          || payer?.full_name
          || linkedQuote?.company_name
          || linkedQuote?.contact_name
          || invoice.external_payer_company
          || invoice.external_payer_name
          || '—';
        customerAddress = invoice.restaurant?.address
          || payerRestaurant?.address
          || invoice.external_payer_address
          || 'No address';
        customerCompany = invoice.restaurant?.name
          || payerRestaurant?.name
          || payer?.company_name
          || linkedQuote?.company_name
          || payer?.full_name
          || '—';
        customerRole = payer?.role || null;
      }

      // Get payer info (person name + plan_type)
      let payerName;
      let payerPlanType = null;
      let payerBillingCycle = null;
      if (invoice.payer_type === 'external') {
        payerName = invoice.external_payer_name
          || linkedQuote?.contact_name
          || linkedQuote?.company_name
          || 'Non-Member';
        payerPlanType = null;
        payerBillingCycle = null;
      } else {
        // Prefer user's full_name (actual person), fall back through company names
        payerName = payer?.full_name
          || invoice.restaurant?.admin_name
          || payer?.company_name
          || invoice.restaurant?.name
          || payerRestaurant?.name
          || linkedQuote?.contact_name
          || invoice.external_payer_name
          || '—';
        payerPlanType = payer?.plan_type || invoice.restaurant?.plan_type;
        payerBillingCycle = payer?.billing_cycle || invoice.restaurant?.billing_cycle;
      }

      // Resolve plan type: restaurant → users table for Brand/FC/Owner
      const resolvedPlanType = invoice.restaurant?.plan_type || payerPlanType;

      // Attach issuerInfo so frontend can render bank info on issued invoices
      const issuerInfo = await getCachedIssuerInfo(
        invoice.issuer_type,
        invoice.issuer_id,
        invoice.currency || 'MYR'
      );

      return {
        id: invoice.id.toString(),
        invoiceNumber: invoice.invoice_number,
        managerId: invoice.payer_id ? invoice.payer_id.toString() : (invoice.restaurant?.admin_id?.toString() || ''),
        managerName: payerName,
        companyName: customerCompany,
        customerName: customerName,
        customerAddress: customerAddress,
        restaurantId: invoice.restaurant_id?.toString(),
        restaurantName: invoice.restaurant?.name
          || payerRestaurant?.name
          || linkedQuote?.company_name
          || invoice.external_payer_company
          || invoice.external_payer_name
          || '',
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
        // Tax displayed in invoice list/modals = legacy items.tax_amount + canonical
        // additional_charges. After Path B migration items.tax_amount=0, so this is
        // effectively the additional_charges sum. Both kept for backward compat.
        tax: parseFloat(invoice.items?.reduce((sum, item) => sum + parseFloat(item.tax_amount || 0), 0) || 0)
           + (Array.isArray(invoice.additional_charges)
               ? invoice.additional_charges.reduce((s, c) => s + (parseFloat(c?.amount) || 0), 0)
               : 0),
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
            quantity: item.quantity || 1,
            unitPrice: parseFloat(item.unit_price || item.fixed_amount || item.calculated_amount || 0),
            total: parseFloat(item.fixed_amount || item.calculated_amount || 0)
          };
        }) : [{
          // Fallback for invoices without items: create item from invoice data
          description: getCategoryDisplayName(invoice.invoice_category, invoice.custom_description || invoice.notes?.split('\n').pop(), resolvedPlanType, payerBillingCycle || invoice.restaurant?.billing_cycle),
          quantity: 1,
          unitPrice: parseFloat(invoice.total_amount),
          total: parseFloat(invoice.total_amount)
        }],
        billingPeriod: formatBillingPeriod(invoice.billing_period_start, invoice.billing_period_end, getInvoiceTimezone(invoice)),
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
        // Contract link (one-time invoice traceability)
        contractId: invoice.contract_id || null,
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
        isDemo: invoice.restaurant?.is_demo || false,
        // Issuer info (company name, logo, bank details) for PDF/print rendering
        issuerInfo
      };
    }));
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
        attributes: ['id', 'name', 'address', 'city', 'state', 'postal_code', 'country', 'phone', 'email', 'admin_name', 'operation_settings']
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
      // Tax = legacy item-level tax + canonical additional_charges (Path B).
      const itemsTaxTotal = invoice.items?.reduce((sum, item) => sum + parseFloat(item.tax_amount || 0), 0) || 0;
      const chargesTotal = Array.isArray(invoice.additional_charges)
        ? invoice.additional_charges.reduce((s, c) => s + (parseFloat(c?.amount) || 0), 0)
        : 0;
      const taxTotal = itemsTaxTotal + chargesTotal;

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
    // Get restaurants managed by this manager
    const restaurants = await Restaurant.findAll({
      where: { admin_id: managerId }
    });

    const restaurantIds = restaurants.map(r => r.id);
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
          attributes: ['id', 'name', 'admin_name', 'plan_type', 'operation_settings'],
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
    // Transform data to match frontend format
    const transformedInvoices = invoices.map(invoice => {
      // Determine items to show
      let invoiceItems = [];
      if (invoice.items && invoice.items.length > 0) {
        invoiceItems = invoice.items.map(item => ({
          description: item.description,
          quantity: item.quantity || 1,
          unitPrice: parseFloat(item.unit_price || item.fixed_amount || item.calculated_amount || 0),
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
        // Tax = legacy item-level tax + canonical additional_charges (Path B).
        tax: (invoiceItems?.reduce((sum, item) => sum + parseFloat(item.taxAmount || 0), 0) || 0)
           + (Array.isArray(invoice.additional_charges)
               ? invoice.additional_charges.reduce((s, c) => s + (parseFloat(c?.amount) || 0), 0)
               : 0),
        total: parseFloat(invoice.total_amount),
        billingPeriod: invoice.billing_period_start
          ? `${invoice.billing_period_start.toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: getInvoiceTimezone(invoice) })}`
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
        modificationHistory: invoice.modification_history || [],
        // Contract link
        contractId: invoice.contract_id || null
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

router.get('/to-pay', authenticateToken, async (req, res) => {
  try {
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
        attributes: ['id', 'name', 'admin_name', 'operation_settings']
      }, {
        model: InvoiceItem,
        as: 'items'
      }],
      order: [['createdAt', 'DESC']]
    });

    // Transform for frontend - include all fields needed by frontend
    const transformedInvoices = await Promise.all(invoices.map(async (invoice) => {
      // Calculate amount from items or estimate from total. Tax = legacy
      // item-level tax + canonical additional_charges (Path B).
      const itemsTotal = invoice.items?.reduce((sum, item) => sum + parseFloat(item.calculated_amount || item.fixed_amount || 0), 0) || 0;
      const itemsTaxTotal = invoice.items?.reduce((sum, item) => sum + parseFloat(item.tax_amount || 0), 0) || 0;
      const chargesTotal = Array.isArray(invoice.additional_charges)
        ? invoice.additional_charges.reduce((s, c) => s + (parseFloat(c?.amount) || 0), 0)
        : 0;
      const taxTotal = itemsTaxTotal + chargesTotal;
      const amount = itemsTotal || (parseFloat(invoice.total_amount) - taxTotal) || parseFloat(invoice.total_amount);

      // Format billing period
      let billingPeriod = '-';
      if (invoice.billing_period_start && invoice.billing_period_end) {
        const start = new Date(invoice.billing_period_start);
        const end = new Date(invoice.billing_period_end);
        const invTz = getInvoiceTimezone(invoice);
        billingPeriod = `${start.toLocaleDateString('en-MY', { month: 'short', year: 'numeric', timeZone: invTz })} - ${end.toLocaleDateString('en-MY', { month: 'short', year: 'numeric', timeZone: invTz })}`;
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
            unitPrice: parseFloat(item.unit_price || item.fixed_amount || item.calculated_amount || 0),
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
                     'admin_id', 'admin_name', 'plan_type', 'billing_cycle', 'operation_settings']
      }]
    });

    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    // Branch-scoped Foodcourt Manager: verify invoice is linked to their branch
    const mgrScope = getManagerScope(req.user);
    if (mgrScope.scoped && mgrScope.branch_id) {
      const inBranch = await invoiceInBranch(invoice, mgrScope.branch_id);
      if (!inBranch) return res.status(403).json({ error: 'No access to this invoice' });
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
      // Tax = legacy item-level tax + canonical additional_charges (Path B).
      tax: (items?.reduce((sum, item) => sum + parseFloat(item.tax_amount || 0), 0) || 0)
         + (Array.isArray(invoice.additional_charges)
             ? invoice.additional_charges.reduce((s, c) => s + (parseFloat(c?.amount) || 0), 0)
             : 0),
      total: parseFloat(invoice.total_amount),
      items: items?.map(item => ({
        id: item.id?.toString(),
        description: item.description,
        quantity: item.quantity || 1,
        unitPrice: parseFloat(item.unit_price || item.fixed_amount || item.calculated_amount || 0),
        taxRate: parseFloat(item.tax_rate || 0),
        taxAmount: parseFloat(item.tax_amount || 0),
        total: parseFloat(item.fixed_amount || item.calculated_amount || 0)
      })) || [],
      billingPeriod: invoice.billing_period_start && invoice.billing_period_end
        ? `${new Date(invoice.billing_period_start).toLocaleDateString('en-US', { timeZone: getInvoiceTimezone(invoice) })} - ${new Date(invoice.billing_period_end).toLocaleDateString('en-US', { timeZone: getInvoiceTimezone(invoice) })}`
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
      modificationHistory: invoice.modification_history || [],
      // Contract link (one-time invoice traceability)
      contractId: invoice.contract_id || null
    };

    res.json({ invoice: transformedInvoice, items });
  } catch (error) {
    console.error('Error fetching invoice details:', error);
    res.status(500).json({ error: 'Failed to fetch invoice details' });
  }
});

router.get('/issued-by/:issuerType/:issuerId', authenticateToken, async (req, res) => {
  try {
    const { issuerType, issuerId } = req.params;
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
        attributes: ['id', 'name', 'admin_name', 'plan_type', 'operation_settings']
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


module.exports = router;

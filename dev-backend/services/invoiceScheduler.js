const cron = require('node-cron');
const Invoice = require('../models/Invoice');
const InvoiceItem = require('../models/InvoiceItem');
const Restaurant = require('../models/Restaurant');
const PlanPrice = require('../models/PlanPrice');
const SystemSettings = require('../models/SystemSettings');
const { Op } = require('sequelize');

const PAYMENT_SETTINGS_KEY = 'payment_settings';

class InvoiceScheduler {
  constructor() {
    this.jobs = new Map();
  }

  start() {
    // Run daily at 2 AM to check for subscription invoices that need to be generated
    cron.schedule('0 2 * * *', async () => {
      console.log('📅 [INVOICE SCHEDULER] Running daily subscription invoice check...');
      await this.generateSubscriptionInvoices();
    });

    console.log('✅ Invoice scheduler started - runs daily at 2 AM to check subscription renewals');
  }

  /**
   * Generate subscription invoices for restaurants whose billing cycle is due
   * Based on subscription_start date - generates invoice on the same day each month/year
   */
  async generateSubscriptionInvoices() {
    try {
      const today = new Date();
      const currentDay = today.getDate();
      const currentMonth = today.getMonth();
      const currentYear = today.getFullYear();

      console.log(`📊 [INVOICE SCHEDULER] Checking subscriptions for day ${currentDay} of month...`);

      // Get all active restaurants with valid subscription
      const restaurants = await Restaurant.findAll({
        where: {
          status: 'active',
          subscription_start: { [Op.ne]: null },
          plan_type: { [Op.ne]: null }
        }
      });

      console.log(`📊 [INVOICE SCHEDULER] Found ${restaurants.length} active restaurants with subscriptions`);

      let generated = 0;
      let skipped = 0;
      let errors = 0;

      for (const restaurant of restaurants) {
        try {
          const subscriptionStart = new Date(restaurant.subscription_start);
          const subscriptionDay = subscriptionStart.getDate();
          const billingCycle = restaurant.billing_cycle || 'monthly';

          // For days > 28, handle end of month
          const effectiveDay = subscriptionDay > 28 ? Math.min(subscriptionDay, new Date(currentYear, currentMonth + 1, 0).getDate()) : subscriptionDay;

          // Check if today is the billing day
          if (currentDay !== effectiveDay) {
            continue;
          }

          // Calculate billing period
          let billingStart, billingEnd;
          if (billingCycle === 'annual') {
            // Annual billing: check if it's the right month too
            const subscriptionMonth = subscriptionStart.getMonth();
            if (currentMonth !== subscriptionMonth) {
              continue;
            }
            billingStart = new Date(currentYear, currentMonth, effectiveDay);
            billingEnd = new Date(currentYear + 1, currentMonth, effectiveDay - 1);
          } else {
            // Monthly billing
            billingStart = new Date(currentYear, currentMonth, effectiveDay);
            billingEnd = new Date(currentYear, currentMonth + 1, effectiveDay - 1);
          }

          // Check if invoice already exists for this period
          const existingInvoice = await Invoice.findOne({
            where: {
              restaurant_id: restaurant.id,
              billing_period_start: billingStart,
              type: 'automatic',
              invoice_category: 'subscription'
            }
          });

          if (existingInvoice) {
            console.log(`⏭️ Invoice already exists for ${restaurant.name} (ID: ${restaurant.id}) for period starting ${billingStart.toISOString().split('T')[0]}`);
            skipped++;
            continue;
          }

          // Generate the invoice
          await this.createSubscriptionInvoice(restaurant, billingStart, billingEnd, billingCycle);
          generated++;

        } catch (error) {
          console.error(`❌ Error processing restaurant ${restaurant.name} (ID: ${restaurant.id}):`, error.message);
          errors++;
        }
      }

      console.log(`✅ [INVOICE SCHEDULER] Complete - Generated: ${generated}, Skipped: ${skipped}, Errors: ${errors}`);

    } catch (error) {
      console.error('❌ [INVOICE SCHEDULER] Error in generateSubscriptionInvoices:', error);
    }
  }

  /**
   * Create a subscription invoice for a restaurant
   */
  async createSubscriptionInvoice(restaurant, billingStart, billingEnd, billingCycle) {
    const now = new Date();
    const taxRate = 0.06; // 6% tax

    // Get plan price from subscription_snapshot or plan_prices table
    let planAmount = 0;
    let currency = 'MYR';

    const snapshot = restaurant.subscription_snapshot;
    if (snapshot) {
      planAmount = billingCycle === 'annual'
        ? parseFloat(snapshot.annual_price || snapshot.monthly_price * 12 || 0)
        : parseFloat(snapshot.monthly_price || 0);
      currency = snapshot.currency || 'MYR';
    }

    // Fallback to plan_prices table via PlanTemplate
    if (!planAmount && restaurant.plan_type) {
      const PlanTemplate = require('../models/PlanTemplate');

      // Find the plan template by display_name or name
      const planTemplate = await PlanTemplate.findOne({
        where: {
          [Op.or]: [
            { display_name: restaurant.plan_type },
            { name: restaurant.plan_type.toLowerCase().replace(' plan', '') }
          ]
        }
      });

      if (planTemplate) {
        const planPrice = await PlanPrice.findOne({
          where: {
            plan_id: planTemplate.id,
            currency: currency,
            is_active: true
          }
        });

        if (planPrice) {
          planAmount = billingCycle === 'annual'
            ? parseFloat(planPrice.annual_price || planPrice.monthly_price * 12)
            : parseFloat(planPrice.monthly_price);
        }
      }
    }

    if (!planAmount) {
      console.log(`⚠️ No price found for ${restaurant.name} (plan: ${restaurant.plan_type})`);
      return;
    }

    // Calculate amounts
    const taxAmount = planAmount * taxRate;
    const totalAmount = planAmount + taxAmount;

    // Generate invoice number
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const count = await Invoice.count({
      where: {
        invoice_number: { [Op.like]: `INV-${year}${month}%` }
      }
    });
    const invoiceNumber = `INV-${year}${month}${String(count + 1).padStart(4, '0')}`;

    // Due date is the billing start date (prepaid)
    const dueDate = new Date(billingStart);

    // Determine payer based on payment_model
    let payerType = 'restaurant';
    let payerId = null;

    if (restaurant.payment_model === 'brand_manager' && restaurant.brand_id) {
      // Brand pays - find brand owner
      const Brand = require('../models/Brand');
      const brand = await Brand.findByPk(restaurant.brand_id);
      if (brand && brand.owner_id) {
        payerType = 'brand_manager';
        payerId = brand.owner_id;
      }
    } else if (restaurant.payment_model === 'foodcourt_manager' && restaurant.foodcourt_id) {
      // Foodcourt pays - find foodcourt owner
      const Foodcourt = require('../models/Foodcourt');
      const foodcourt = await Foodcourt.findByPk(restaurant.foodcourt_id);
      if (foodcourt && foodcourt.owner_id) {
        payerType = 'foodcourt_manager';
        payerId = foodcourt.owner_id;
      }
    }
    // Default: restaurant pays (payerId stays null, restaurant_id is used)

    // Create invoice
    const invoice = await Invoice.create({
      restaurant_id: restaurant.id,
      invoice_number: invoiceNumber,
      type: 'automatic',
      invoice_category: 'subscription',
      billing_period_start: billingStart,
      billing_period_end: billingEnd,
      due_date: dueDate,
      total_amount: totalAmount,
      currency: currency,
      status: 'pending_payment',
      notes: `${billingCycle === 'annual' ? 'Annual' : 'Monthly'} subscription invoice for ${restaurant.plan_type}. Auto-generated.`,
      issued_by: 0,
      issued_at: now,
      issuer_type: 'system_admin',
      payer_type: payerType,
      payer_id: payerId
    });

    // Create invoice item
    const periodText = `${billingStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} - ${billingEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;

    await InvoiceItem.create({
      invoice_id: invoice.id,
      item_type: 'subscription',
      description: `${restaurant.plan_type} - ${billingCycle === 'annual' ? 'Annual' : 'Monthly'} Subscription (${periodText})`,
      calculation_method: 'fixed',
      fixed_amount: planAmount,
      calculated_amount: planAmount,
      tax_rate: taxRate * 100,
      tax_amount: taxAmount,
      total_amount: totalAmount
    });

    console.log(`✅ Created invoice ${invoiceNumber} for ${restaurant.name} - ${currency} ${totalAmount.toFixed(2)}`);
  }

  /**
   * Manual trigger to generate missing invoices for a specific restaurant
   */
  async generateMissingInvoices(restaurantId, fromDate) {
    try {
      const restaurant = await Restaurant.findByPk(restaurantId);
      if (!restaurant || !restaurant.subscription_start) {
        return { success: false, error: 'Restaurant not found or no subscription' };
      }

      const subscriptionStart = new Date(restaurant.subscription_start);
      const startFrom = fromDate ? new Date(fromDate) : subscriptionStart;
      const today = new Date();
      const billingCycle = restaurant.billing_cycle || 'monthly';

      let generated = [];
      let current = new Date(startFrom);

      while (current <= today) {
        const billingStart = new Date(current);
        let billingEnd;

        if (billingCycle === 'annual') {
          billingEnd = new Date(current.getFullYear() + 1, current.getMonth(), current.getDate() - 1);
          current.setFullYear(current.getFullYear() + 1);
        } else {
          billingEnd = new Date(current.getFullYear(), current.getMonth() + 1, current.getDate() - 1);
          current.setMonth(current.getMonth() + 1);
        }

        // Check if invoice exists
        const existing = await Invoice.findOne({
          where: {
            restaurant_id: restaurantId,
            billing_period_start: billingStart,
            type: 'automatic',
            invoice_category: 'subscription'
          }
        });

        if (!existing) {
          await this.createSubscriptionInvoice(restaurant, billingStart, billingEnd, billingCycle);
          generated.push(billingStart.toISOString().split('T')[0]);
        }
      }

      return { success: true, generated };

    } catch (error) {
      console.error('Error generating missing invoices:', error);
      return { success: false, error: error.message };
    }
  }

  stop() {
    this.jobs.forEach(job => job.stop());
    this.jobs.clear();
    console.log('Invoice scheduler stopped');
  }
}

module.exports = new InvoiceScheduler();

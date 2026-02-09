const cron = require('node-cron');
const Invoice = require('../models/Invoice');
const InvoiceItem = require('../models/InvoiceItem');
const Restaurant = require('../models/Restaurant');
const PlanPrice = require('../models/PlanPrice');
const SystemSettings = require('../models/SystemSettings');
const EntityPlan = require('../models/EntityPlan');
const EntityPlanRestaurant = require('../models/EntityPlanRestaurant');
const Order = require('../models/Order');
const { Op } = require('sequelize');
const { sequelize } = require('../config/database');

const PAYMENT_SETTINGS_KEY = 'payment_settings';

class InvoiceScheduler {
  constructor() {
    this.jobs = new Map();
  }

  start() {
    // Run daily at 2 AM to check for subscription invoices that need to be generated
    cron.schedule('0 2 * * *', async () => {
      console.log('📅 [INVOICE SCHEDULER] Running daily invoice check...');
      await this.generateSubscriptionInvoices();
      await this.generateEntityPlanInvoices();
    });

    console.log('✅ Invoice scheduler started - runs daily at 2 AM (POS subscriptions + entity plan invoices)');
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

  /**
   * Generate invoices for entity plans (Brand/Foodcourt).
   * Runs on the 1st of each month for monthly plans, generating for the previous month's revenue.
   */
  async generateEntityPlanInvoices() {
    try {
      const today = new Date();
      const currentDay = today.getDate();

      // Entity plan invoices are generated on the 1st of each month for the previous month
      if (currentDay !== 1) {
        console.log(`📊 [ENTITY PLAN SCHEDULER] Not the 1st, skipping entity plan invoice generation`);
        return;
      }

      console.log(`📊 [ENTITY PLAN SCHEDULER] Generating entity plan invoices...`);

      // Previous month billing period
      const periodEnd = new Date(today.getFullYear(), today.getMonth(), 0, 23, 59, 59); // last day of prev month
      const periodStart = new Date(periodEnd.getFullYear(), periodEnd.getMonth(), 1); // 1st of prev month
      const dueDate = new Date(today.getFullYear(), today.getMonth(), 15); // Due on 15th

      // Get all active entity plans with auto_generate enabled and active restaurant assignments
      const plans = await EntityPlan.findAll({
        where: { is_active: true, auto_generate: true },
        include: [{
          model: EntityPlanRestaurant,
          as: 'planRestaurants',
          where: { is_active: true },
          required: true,
          include: [{
            model: Restaurant,
            as: 'restaurant',
            attributes: ['id', 'name', 'email']
          }]
        }]
      });

      console.log(`📊 [ENTITY PLAN SCHEDULER] Found ${plans.length} active auto-generate plans`);

      let generated = 0;
      let skipped = 0;
      let errors = 0;

      for (const plan of plans) {
        for (const pr of plan.planRestaurants) {
          try {
            const restaurant = pr.restaurant;
            if (!restaurant) continue;

            // Check for duplicate
            const existing = await Invoice.findOne({
              where: {
                restaurant_id: restaurant.id,
                issuer_type: plan.entity_type,
                issuer_id: plan.entity_id,
                billing_period_start: periodStart,
                type: 'automatic',
                invoice_category: `${plan.entity_type}_plan`
              }
            });

            if (existing) {
              skipped++;
              continue;
            }

            // Get revenue for billing period
            const revenueResult = await Order.findOne({
              attributes: [[sequelize.fn('SUM', sequelize.col('total_amount')), 'revenue']],
              where: {
                restaurant_id: restaurant.id,
                status: 'completed',
                order_date: { [Op.between]: [periodStart, periodEnd] },
                is_deleted: false
              },
              raw: true
            });
            const revenue = parseFloat(revenueResult?.revenue || 0);

            // Calculate charges
            const charges = this.calculatePlanCharges(plan, revenue);

            if (charges.totalAmount <= 0) {
              skipped++;
              continue;
            }

            // Generate invoice number
            const invoiceNumber = await this.generateEntityInvoiceNumber(plan.entity_type, plan.entity_id);

            // Create invoice
            const invoice = await Invoice.create({
              restaurant_id: restaurant.id,
              invoice_number: invoiceNumber,
              type: 'automatic',
              invoice_category: `${plan.entity_type}_plan`,
              category_display_name: plan.name,
              billing_period_start: periodStart,
              billing_period_end: periodEnd,
              due_date: dueDate,
              total_amount: charges.totalAmount,
              currency: plan.currency || 'MYR',
              status: 'pending_payment',
              notes: `Auto-generated ${plan.entity_type} plan invoice for ${plan.name}. Period: ${periodStart.toISOString().split('T')[0]} ~ ${periodEnd.toISOString().split('T')[0]}`,
              issued_by: 0,
              issued_at: today,
              issuer_type: plan.entity_type,
              issuer_id: plan.entity_id,
              payer_type: 'restaurant',
              payer_id: null
            });

            // Create invoice items
            const invoiceItems = charges.items.map(item => ({
              ...item,
              invoice_id: invoice.id
            }));
            await InvoiceItem.bulkCreate(invoiceItems);

            generated++;
            console.log(`✅ [ENTITY PLAN] ${invoiceNumber} for ${restaurant.name} - ${plan.currency} ${charges.totalAmount.toFixed(2)}`);

          } catch (error) {
            console.error(`❌ [ENTITY PLAN] Error for restaurant ${pr.restaurant?.name}:`, error.message);
            errors++;
          }
        }
      }

      console.log(`✅ [ENTITY PLAN SCHEDULER] Complete - Generated: ${generated}, Skipped: ${skipped}, Errors: ${errors}`);
    } catch (error) {
      console.error('❌ [ENTITY PLAN SCHEDULER] Error:', error);
    }
  }

  /**
   * Calculate charges based on entity plan and revenue (same logic as brands.js)
   */
  calculatePlanCharges(plan, revenue) {
    const items = [];
    let subtotal = 0;
    const taxRate = parseFloat(plan.tax_rate || 0) / 100;

    // 1. Fixed subscription fee
    if (parseFloat(plan.subscription_fee) > 0) {
      const fee = parseFloat(plan.subscription_fee);
      const tax = fee * taxRate;
      items.push({
        item_type: 'subscription_fee',
        description: `${plan.name} - Subscription Fee`,
        calculation_method: 'fixed',
        fixed_amount: fee,
        calculated_amount: fee,
        tax_rate: parseFloat(plan.tax_rate || 0),
        tax_amount: Math.round(tax * 100) / 100,
        total_amount: Math.round((fee + tax) * 100) / 100
      });
      subtotal += fee;
    }

    // 2. Revenue percentage (royalty)
    if (parseFloat(plan.revenue_percentage) > 0) {
      const rate = parseFloat(plan.revenue_percentage);
      const amount = Math.round(revenue * rate / 100 * 100) / 100;
      const tax = amount * taxRate;
      items.push({
        item_type: 'revenue_percentage',
        description: `${plan.name} - Revenue Royalty (${rate}%)`,
        calculation_method: 'percentage',
        percentage_rate: rate,
        base_amount: revenue,
        calculated_amount: amount,
        tax_rate: parseFloat(plan.tax_rate || 0),
        tax_amount: Math.round(tax * 100) / 100,
        total_amount: Math.round((amount + tax) * 100) / 100
      });
      subtotal += amount;
    }

    // 3. Rent
    if (plan.rent_type !== 'none') {
      let rentAmount = 0;
      let description = '';
      let calcMethod = 'fixed';

      if (plan.rent_type === 'fixed') {
        rentAmount = parseFloat(plan.rent_fixed || 0);
        description = `${plan.name} - Rent (Fixed)`;
      } else if (plan.rent_type === 'percentage') {
        const rate = parseFloat(plan.rent_percentage || 0);
        rentAmount = Math.round(revenue * rate / 100 * 100) / 100;
        description = `${plan.name} - Rent (${rate}%)`;
        calcMethod = 'percentage';
      } else if (plan.rent_type === 'combined') {
        const fixedMin = parseFloat(plan.rent_fixed || 0);
        const rate = parseFloat(plan.rent_percentage || 0);
        const percentageAmount = Math.round(revenue * rate / 100 * 100) / 100;
        rentAmount = Math.max(fixedMin, percentageAmount);
        description = `${plan.name} - Rent (Combined)`;
        calcMethod = 'combined';
      }

      if (rentAmount > 0) {
        const tax = rentAmount * taxRate;
        items.push({
          item_type: 'rent',
          description,
          calculation_method: calcMethod,
          fixed_amount: plan.rent_type === 'fixed' || plan.rent_type === 'combined' ? parseFloat(plan.rent_fixed || 0) : null,
          percentage_rate: plan.rent_type === 'percentage' || plan.rent_type === 'combined' ? parseFloat(plan.rent_percentage || 0) : null,
          base_amount: revenue,
          minimum_amount: plan.rent_type === 'combined' ? parseFloat(plan.rent_fixed || 0) : null,
          calculated_amount: rentAmount,
          tax_rate: parseFloat(plan.tax_rate || 0),
          tax_amount: Math.round(tax * 100) / 100,
          total_amount: Math.round((rentAmount + tax) * 100) / 100
        });
        subtotal += rentAmount;
      }
    }

    const taxAmount = Math.round(subtotal * taxRate * 100) / 100;
    const totalAmount = Math.round((subtotal + taxAmount) * 100) / 100;
    return { items, subtotal, taxAmount, totalAmount };
  }

  /**
   * Generate invoice number: INV-BR{id}YYMMDDNNN or INV-FC{id}YYMMDDNNN
   */
  async generateEntityInvoiceNumber(entityType, entityId) {
    const now = new Date();
    const year = String(now.getFullYear()).slice(-2);
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const prefix = entityType === 'brand' ? `INV-BR${entityId}` : `INV-FC${entityId}`;
    const searchPattern = `${prefix}${year}${month}${day}%`;

    const lastInvoice = await Invoice.findOne({
      where: { invoice_number: { [Op.like]: searchPattern } },
      order: [['invoice_number', 'DESC']],
      attributes: ['invoice_number']
    });

    let nextNumber = 1;
    if (lastInvoice?.invoice_number) {
      const match = lastInvoice.invoice_number.match(/(\d{3})$/);
      if (match) nextNumber = parseInt(match[1], 10) + 1;
    }

    return `${prefix}${year}${month}${day}${String(nextNumber).padStart(3, '0')}`;
  }

  stop() {
    this.jobs.forEach(job => job.stop());
    this.jobs.clear();
    console.log('Invoice scheduler stopped');
  }
}

module.exports = new InvoiceScheduler();

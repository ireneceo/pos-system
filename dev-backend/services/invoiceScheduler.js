const cron = require('node-cron');
const { Invoice, InvoiceItem, Restaurant, PlanPrice, PlanTemplate, EntityPlan, EntityPlanRestaurant, Order, Brand, Foodcourt, SystemSettings, ContractPlan } = require('../models');
const { Op } = require('sequelize');
const { sequelize } = require('../config/database');
const systemLogger = require('../utils/systemLogger');
const { sendIssuerEmail } = require('../utils/emailService');
const { generateInvoiceNotificationEmail } = require('../utils/invoiceEmailTemplate');
const { getSiteTimezone, getLocalDate, getRestaurantTimezone } = require('../utils/dateTimeHelper');
const { normalizeAdditionalCharges } = require('../utils/paymentSettingsHelper');
const { sendNotification, getRestaurantOwnerIds } = require('../utils/notificationService');
const { invoiceCreatedEmail } = require('../utils/notificationTemplates');

const FRONTEND_URL = process.env.FRONTEND_URL || 'https://dev.purplehere.com';
const ADVANCE_DAYS = 14; // Generate invoices 14 days before billing day

class InvoiceScheduler {
  constructor() {
    this.jobs = new Map();
  }

  start() {
    // Run daily at 2 AM to check for subscription invoices that need to be generated
    cron.schedule('0 2 * * *', async () => {
      const SchedulerRun = require('../models/SchedulerRun');
      const startedAt = new Date();
      const startMs = Date.now();
      console.log('📅 [INVOICE SCHEDULER] Running daily invoice check...');
      await systemLogger.info('payment', 'invoice-scheduler', 'Daily invoice scheduler run started');

      let run = null;
      try { run = await SchedulerRun.create({ job_name: 'invoice_generation_daily', started_at: startedAt }); }
      catch (e) { console.error('[SchedulerRun] create failed:', e.message); }

      try {
        // Apply any pending plan changes before generating invoices
        const pendingResult = await this.applyPendingPlanChanges();

        const subResult = await this.generateSubscriptionInvoices();
        const entityResult = await this.generateEntityPlanInvoices();
        const entitySubResult = await this.generateEntitySubscriptionInvoices();

        const summary = {
          pendingChanges: pendingResult || { applied: 0, errors: 0 },
          subscription: subResult || { generated: 0, skipped: 0, errors: 0 },
          entityPlan: entityResult || { generated: 0, skipped: 0, errors: 0 },
          entitySubscription: entitySubResult || { generated: 0, skipped: 0, errors: 0 }
        };
        const totalErrors = (pendingResult?.errors || 0) + (subResult?.errors || 0) + (entityResult?.errors || 0) + (entitySubResult?.errors || 0);

        if (totalErrors > 0) {
          await systemLogger.error('payment', 'invoice-scheduler', `Daily run completed with ${totalErrors} error(s)`, summary);
        } else {
          await systemLogger.info('payment', 'invoice-scheduler', 'Daily run completed successfully', summary);
        }

        if (run) {
          try {
            await run.update({
              finished_at: new Date(),
              duration_ms: Date.now() - startMs,
              status: totalErrors > 0 ? 'partial' : 'success',
              results: summary
            });
          } catch (e) { console.error('[SchedulerRun] update failed:', e.message); }
        }
      } catch (error) {
        console.error('✗ [INVOICE SCHEDULER] Daily run failed:', error);
        if (run) {
          try {
            await run.update({
              finished_at: new Date(),
              duration_ms: Date.now() - startMs,
              status: 'error',
              error_message: String(error?.message || error)
            });
          } catch (e) { console.error('[SchedulerRun] error update failed:', e.message); }
        }
      }
    });

    console.log('✓ Invoice scheduler started - runs daily at 2 AM (POS subscriptions + entity plan invoices)');
  }

  /**
   * Generate subscription invoices for restaurants.
   * Generates ADVANCE_DAYS (14) days before the billing day.
   * Based on subscription_start date.
   */
  async generateSubscriptionInvoices() {
    const result = { generated: 0, skipped: 0, errors: 0 };
    try {
      const siteTimezone = await getSiteTimezone();
      const today = getLocalDate(siteTimezone);
      const currentMonth = today.getMonth();
      const currentYear = today.getFullYear();

      console.log(`📊 [INVOICE SCHEDULER] Checking subscription invoices (${ADVANCE_DAYS}-day advance)...`);

      const restaurants = await Restaurant.findAll({
        where: {
          status: 'active',
          is_demo: { [Op.ne]: true },
          is_test: { [Op.ne]: true },
          subscription_start: { [Op.ne]: null },
          plan_type: { [Op.ne]: null }
        }
      });

      console.log(`📊 [INVOICE SCHEDULER] Found ${restaurants.length} active restaurants with subscriptions`);

      for (const restaurant of restaurants) {
        try {
          const subscriptionStart = new Date(restaurant.subscription_start);
          const subscriptionDay = subscriptionStart.getDate();
          const billingCycle = restaurant.billing_cycle || 'monthly';

          // For days > 28, handle end of month
          const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();
          const effectiveDay = subscriptionDay > 28 ? Math.min(subscriptionDay, lastDay) : subscriptionDay;

          // Check if today is ADVANCE_DAYS before the billing day
          if (!this.isTodayAdvanceOf(effectiveDay, today)) {
            continue;
          }

          // Calculate billing period (based on actual billing day, not generation day)
          let billingStart, billingEnd;
          const { targetMonth, targetYear } = this.getTargetBillingMonth(effectiveDay, today);

          if (billingCycle === 'annual') {
            const subscriptionMonth = subscriptionStart.getMonth();
            if (targetMonth !== subscriptionMonth) {
              continue;
            }
            billingStart = new Date(targetYear, targetMonth, effectiveDay);
            billingEnd = new Date(targetYear + 1, targetMonth, effectiveDay - 1);
          } else {
            billingStart = new Date(targetYear, targetMonth, effectiveDay);
            billingEnd = new Date(targetYear, targetMonth + 1, effectiveDay - 1);
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
            result.skipped++;
            continue;
          }

          await this.createSubscriptionInvoice(restaurant, billingStart, billingEnd, billingCycle);
          result.generated++;

        } catch (error) {
          console.error(`✗ Error processing restaurant ${restaurant.name} (ID: ${restaurant.id}):`, error.message);
          await systemLogger.error('payment', 'invoice-scheduler', `Subscription invoice error: ${restaurant.name}`, { restaurantId: restaurant.id, error: error.message });
          result.errors++;
        }
      }

      console.log(`✓ [INVOICE SCHEDULER] Subscription - Generated: ${result.generated}, Skipped: ${result.skipped}, Errors: ${result.errors}`);
      return result;

    } catch (error) {
      console.error('✗ [INVOICE SCHEDULER] Error in generateSubscriptionInvoices:', error);
      await systemLogger.critical('payment', 'invoice-scheduler', 'Subscription invoice generation failed', { error: error.message });
      return result;
    }
  }

  /**
   * Create a subscription invoice for a restaurant
   */
  async createSubscriptionInvoice(restaurant, billingStart, billingEnd, billingCycle, customDueDate) {
    const now = new Date();

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

    // Calculate discount
    const discountType = restaurant.discount_type || 'none';
    const discountValue = parseFloat(restaurant.discount_value) || 0;
    let discountAmount = 0;

    if (discountType === 'percentage' && discountValue > 0) {
      discountAmount = Math.round(planAmount * discountValue / 100 * 100) / 100;
    } else if (discountType === 'fixed' && discountValue > 0) {
      discountAmount = Math.min(discountValue, planAmount); // Cannot exceed subtotal
    }

    const discountedAmount = planAmount - discountAmount;

    // Get additional charges from System Admin payment settings (per currency)
    let additionalChargesConfig = [];
    try {
      const paymentSettings = await SystemSettings.findOne({
        where: { setting_key: 'payment_settings' }
      });
      const rawCharges = paymentSettings?.setting_value?.additionalCharges;
      const charges = normalizeAdditionalCharges(rawCharges, currency);
      additionalChargesConfig = charges.filter(c => c.enabled && c.name && c.rate > 0);
    } catch (err) {
      console.error('Error fetching additional charges for subscription:', err.message);
    }

    // Calculate additional charges on discounted amount
    const calculatedCharges = additionalChargesConfig.map(c => ({
      name: c.name,
      rate: parseFloat(c.rate) || 0,
      amount: Math.round(discountedAmount * (parseFloat(c.rate) || 0) / 100 * 100) / 100
    }));
    const totalChargesAmount = calculatedCharges.reduce((sum, c) => sum + c.amount, 0);
    const totalAmount = Math.round((discountedAmount + totalChargesAmount) * 100) / 100;

    // Generate invoice number
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const count = await Invoice.count({
      where: {
        invoice_number: { [Op.like]: `INV-${year}${month}%` }
      }
    });
    const invoiceNumber = `INV-${year}${month}${String(count + 1).padStart(4, '0')}`;

    // Due date: custom (e.g. trial end) or billing start date (prepaid)
    const dueDate = customDueDate ? new Date(customDueDate) : new Date(billingStart);

    // Determine payer based on payment_model
    let payerType = 'restaurant';
    let payerId = null;

    if (restaurant.payment_model === 'brand_manager' && restaurant.brand_id) {
      // Brand pays - find brand owner
      const brand = await Brand.findByPk(restaurant.brand_id);
      if (brand && brand.owner_id) {
        payerType = 'brand_manager';
        payerId = brand.owner_id;
      }
    } else if (restaurant.payment_model === 'foodcourt_manager' && restaurant.foodcourt_id) {
      // Foodcourt pays - find foodcourt owner
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
      subtotal: planAmount,
      discount_type: discountType,
      discount_value: discountValue,
      discount_amount: discountAmount,
      discount_reason: restaurant.discount_reason || null,
      total_amount: totalAmount,
      currency: currency,
      status: 'pending_payment',
      paid_at: null,
      payment_notes: null,
      notes: `${billingCycle === 'annual' ? 'Annual' : 'Monthly'} subscription invoice for ${restaurant.plan_type}. Auto-generated.`,
      issued_by: 0,
      issued_at: now,
      issuer_type: 'system_admin',
      payer_type: payerType,
      payer_id: payerId,
      additional_charges: calculatedCharges.length > 0 ? calculatedCharges : null
    });

    // Create invoice item
    const restaurantTz = getRestaurantTimezone(restaurant);
    const periodText = `${billingStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: restaurantTz })} - ${billingEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: restaurantTz })}`;

    await InvoiceItem.create({
      invoice_id: invoice.id,
      item_type: 'subscription',
      description: `${restaurant.plan_type} - ${billingCycle === 'annual' ? 'Annual' : 'Monthly'} Subscription (${periodText})`,
      calculation_method: 'fixed',
      fixed_amount: planAmount,
      calculated_amount: discountedAmount,
      tax_rate: 0,
      tax_amount: 0,
      total_amount: discountedAmount
    });

    // Referral first-month discount (negative item) — applied BEFORE finalizeInvoice
    // so the canonical recomputation folds it into subtotal/total. Idempotent at
    // user level via referral_discount_applied flag.
    if (restaurant.admin_id) {
      try {
        const referralService = require('./referralService');
        const User = require('../models/User');
        const adminUser = await User.findByPk(restaurant.admin_id);
        if (adminUser) {
          const applied = await referralService.applyFirstMonthDiscount(invoice, adminUser, planAmount);
          if (applied > 0) {
            console.log(`✓ Referral 1st-month discount applied: ${currency} ${applied.toFixed(2)} on ${invoiceNumber}`);
          }
        }
      } catch (e) {
        console.error('[createSubscriptionInvoice] referral discount hook failed:', e.message);
      }
    }

    // Single source of truth — header recomputed from items + additional_charges + discount.
    const { finalizeInvoice } = require('../utils/invoiceCalculation');
    await finalizeInvoice(invoice.id);

    console.log(`✓ Created invoice ${invoiceNumber} for ${restaurant.name} - ${currency} ${totalAmount.toFixed(2)}`);

    // Auto-charge attempt — if restaurant saved a card and consented to auto-charge.
    // Reload the invoice (to capture finalizeInvoice changes) and try off_session payment.
    let autoChargeOutcome = null;
    if (restaurant.auto_charge_enabled && restaurant.stripe_default_payment_method) {
      try {
        const fresh = await Invoice.findByPk(invoice.id);
        const stripeCustomerService = require('./stripeCustomerService');
        autoChargeOutcome = await stripeCustomerService.chargeInvoiceAutomatic(fresh, 'restaurant');
        if (autoChargeOutcome?.status === 'paid') {
          await fresh.update({
            status: 'paid',
            paid_amount: fresh.total_amount,
            paid_at: new Date(),
            payment_method: 'stripe',
            payment_provider: 'stripe',
            payment_intent_id: autoChargeOutcome.payment_intent_id
          });
          // Centralised post-paid hooks (subscription restore + referral commission)
          const { handleInvoicePaid } = require('./invoiceLifecycle');
          handleInvoicePaid(fresh.id).catch(e =>
            console.error('[invoiceScheduler auto-charge] handleInvoicePaid:', e.message)
          );
          console.log(`✓ Auto-charged invoice ${invoiceNumber} via saved card`);
        } else {
          console.warn(`⚠️ Auto-charge ${autoChargeOutcome?.status}: ${invoiceNumber} — falling back to email reminder`);
        }
      } catch (e) {
        console.error(`[auto-charge] failed for ${invoiceNumber}:`, e.message);
        autoChargeOutcome = { status: 'failed', message: e.message };
      }
    }

    // Email notification — only when invoice still needs manual action.
    // (auto-charge succeeded → user gets a separate paid receipt via webhook flow)
    if (!autoChargeOutcome || autoChargeOutcome.status !== 'paid') {
      this.sendInvoiceEmail(invoice, restaurant, 'system_admin', null, invoiceNumber);
    }
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
   * Uses plan.billing_day (1-28) if set, otherwise defaults to 1.
   * Generates ADVANCE_DAYS (14) days before the billing day.
   * Billing period: billing_day of prev month to (billing_day - 1) of current month.
   */
  async generateEntityPlanInvoices() {
    const result = { generated: 0, skipped: 0, errors: 0 };
    try {
      const siteTimezone = await getSiteTimezone();
      const today = getLocalDate(siteTimezone);

      console.log(`📊 [ENTITY PLAN SCHEDULER] Checking entity plan invoices (${ADVANCE_DAYS}-day advance)...`);

      // Get all active entity plans with auto_generate enabled
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
            attributes: ['id', 'name', 'email', 'currency']
          }]
        }]
      });

      console.log(`📊 [ENTITY PLAN SCHEDULER] Found ${plans.length} active auto-generate plans`);

      for (const plan of plans) {
        // Determine effective billing day for this plan
        const effectiveBillingDay = plan.billing_day != null ? plan.billing_day : 1;

        // Check if today is ADVANCE_DAYS before this plan's billing day
        if (!this.isTodayAdvanceOf(effectiveBillingDay, today)) {
          continue;
        }

        // Calculate billing period based on billing_day
        const { periodStart, periodEnd, dueDate } = this.calculateEntityBillingPeriod(effectiveBillingDay, today);

        for (const pr of plan.planRestaurants) {
          try {
            const restaurant = pr.restaurant;
            if (!restaurant) continue;

            // Phase 2-C: If this plan was created from a Contract (has any ContractPlan row),
            // require at least one OPEN ContractPlan link whose contract.restaurant_id matches.
            // This prevents ghost billing after contract termination/expiry (defense-in-depth;
            // primary guard is EntityPlanRestaurant.is_active).
            const allContractLinks = await ContractPlan.findAll({
              where: { entity_plan_id: plan.id },
              include: [{ model: require('../models').Contract, as: 'contract', attributes: ['id', 'restaurant_id', 'stage'] }]
            });
            let matchingContractId = null;
            let matchingContract = null;
            if (allContractLinks.length > 0) {
              const openMatch = allContractLinks.find(l =>
                !l.end_at && l.contract && l.contract.restaurant_id === restaurant.id
              );
              if (!openMatch) {
                // Contract-originated plan but no open matching contract → skip
                result.skipped++;
                continue;
              }
              matchingContractId = openMatch.contract_id;
              // Phase 2-E: Load full contract for proration (start_date / end_date).
              const Contract = require('../models').Contract;
              matchingContract = await Contract.findByPk(matchingContractId, {
                attributes: ['id', 'start_date', 'end_date', 'contract_number']
              });
            }

            // Phase 2-E: Compute proration factor based on how much of [periodStart, periodEnd]
            // the contract actually covers. Only the FIXED portion is prorated — percentage%
            // of revenue already reflects actual activity so needs no adjustment.
            const prorationFactor = this.computeProrationFactor(matchingContract, periodStart, periodEnd);
            if (prorationFactor === 0) {
              // Contract period doesn't overlap this billing period at all → skip
              result.skipped++;
              continue;
            }

            // Use restaurant's base currency (design rule: invoice in recipient's currency)
            const invoiceCurrency = restaurant.currency || 'MYR';

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
              result.skipped++;
              continue;
            }

            // Determine revenue period based on revenue_base
            const { revenueStart, revenueEnd } = this.getRevenuePeriod(plan, periodStart, periodEnd);

            // Get revenue for billing period
            const revenueResult = await Order.findOne({
              attributes: [[sequelize.fn('SUM', sequelize.col('total_amount')), 'revenue']],
              where: {
                restaurant_id: restaurant.id,
                status: 'completed',
                order_date: { [Op.between]: [revenueStart, revenueEnd] },
                is_deleted: false
              },
              raw: true
            });
            const revenue = parseFloat(revenueResult?.revenue || 0);

            // Get discount info from plan-restaurant assignment
            const discountInfo = {
              type: pr.discount_type || 'none',
              value: parseFloat(pr.discount_value) || 0,
              reason: pr.discount_reason || null
            };

            // Look up fixed monthly price for this plan+currency (fixed + combined types need it)
            let fixedMonthlyPrice = 0;
            if (plan.charge_type === 'fixed' || plan.charge_type === 'combined') {
              const EntityPlanPrice = require('../models/EntityPlanPrice');
              const priceRow = await EntityPlanPrice.findOne({
                where: { entity_plan_id: plan.id, currency: invoiceCurrency, is_active: true }
              });
              // Fallback to plan's default currency price if no exact match
              if (!priceRow) {
                const anyPrice = await EntityPlanPrice.findOne({
                  where: { entity_plan_id: plan.id, is_active: true }
                });
                fixedMonthlyPrice = anyPrice ? Number(anyPrice.monthly_price) : 0;
              } else {
                fixedMonthlyPrice = Number(priceRow.monthly_price);
              }
            }

            // Calculate charges (with Phase 2-E proration applied to fixed portion)
            const charges = this.calculatePlanCharges(plan, revenue, discountInfo, fixedMonthlyPrice, prorationFactor);

            if (charges.totalAmount < 0 || charges.subtotal <= 0) {
              result.skipped++;
              continue;
            }

            // Generate invoice number
            const invoiceNumber = await this.generateEntityInvoiceNumber(plan.entity_type, plan.entity_id);

            // Get additional charges from issuer payment settings (per currency)
            let entityAdditionalCharges = [];
            try {
              let rawCharges = null;
              if (plan.entity_type === 'brand') {
                const brand = await Brand.findByPk(plan.entity_id);
                rawCharges = brand?.payment_settings?.additionalCharges;
              } else if (plan.entity_type === 'foodcourt') {
                const foodcourt = await Foodcourt.findByPk(plan.entity_id);
                rawCharges = foodcourt?.payment_settings?.additionalCharges;
              }
              const normalized = normalizeAdditionalCharges(rawCharges, invoiceCurrency);
              const enabledCharges = normalized.filter(c => c.enabled && c.name && c.rate > 0);
              const discountedSub = (charges.discountedSubtotal !== undefined && charges.discountedSubtotal !== null) ? charges.discountedSubtotal : charges.subtotal;
              entityAdditionalCharges = enabledCharges.map(c => ({
                name: c.name,
                rate: parseFloat(c.rate) || 0,
                amount: Math.round(discountedSub * (parseFloat(c.rate) || 0) / 100 * 100) / 100
              }));
            } catch (err) {
              console.error('Error fetching entity additional charges:', err.message);
            }

            const entityChargesTotal = entityAdditionalCharges.reduce((sum, c) => sum + c.amount, 0);
            const finalTotalAmount = Math.max(0, charges.totalAmount + entityChargesTotal);

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
              subtotal: charges.subtotal,
              discount_type: charges.discountType || 'none',
              discount_value: charges.discountValue || 0,
              discount_amount: charges.discountAmount || 0,
              discount_reason: charges.discountReason || null,
              total_amount: finalTotalAmount,
              currency: invoiceCurrency,
              status: 'pending_payment',
              paid_at: null,
              payment_notes: null,
              notes: `Auto-generated ${plan.entity_type} plan invoice for ${plan.name}. Period: ${periodStart.toISOString().split('T')[0]} ~ ${periodEnd.toISOString().split('T')[0]}`,
              issued_by: 0,
              issued_at: today,
              issuer_type: plan.entity_type,
              issuer_id: plan.entity_id,
              payer_type: 'restaurant',
              payer_id: null,
              additional_charges: entityAdditionalCharges.length > 0 ? entityAdditionalCharges : null,
              // Phase 2-C: traceability link to the originating contract (if any)
              contract_id: matchingContractId
            });

            // Create invoice items
            const invoiceItems = charges.items.map(item => ({
              ...item,
              invoice_id: invoice.id
            }));
            await InvoiceItem.bulkCreate(invoiceItems);

            // Recompute header against the items + additional_charges so the
            // email/UI never disagree with the DB.
            const { finalizeInvoice } = require('../utils/invoiceCalculation');
            await finalizeInvoice(invoice.id);

            result.generated++;
            console.log(`✓ [ENTITY PLAN] ${invoiceNumber} for ${restaurant.name} - ${invoiceCurrency} ${finalTotalAmount.toFixed(2)} (billing_day: ${effectiveBillingDay})`);

            // Send email notification (non-blocking)
            this.sendInvoiceEmail(invoice, restaurant, plan.entity_type, plan.entity_id, invoiceNumber);

          } catch (error) {
            console.error(`✗ [ENTITY PLAN] Error for restaurant ${pr.restaurant?.name}:`, error.message);
            await systemLogger.error('payment', 'invoice-scheduler', `Entity plan invoice error: ${pr.restaurant?.name}`, { restaurantId: pr.restaurant?.id, planId: plan.id, error: error.message });
            result.errors++;
          }
        }
      }

      console.log(`✓ [ENTITY PLAN SCHEDULER] Complete - Generated: ${result.generated}, Skipped: ${result.skipped}, Errors: ${result.errors}`);
      return result;
    } catch (error) {
      console.error('✗ [ENTITY PLAN SCHEDULER] Error:', error);
      await systemLogger.critical('payment', 'invoice-scheduler', 'Entity plan invoice generation failed', { error: error.message });
      return result;
    }
  }

  /**
   * Generate recurring subscription invoices for Brands, Foodcourts, and Owners.
   * Same advance-day logic as generateSubscriptionInvoices (for restaurants).
   * These are POS subscription fees charged by System Admin to these entities.
   */
  async generateEntitySubscriptionInvoices() {
    const result = { generated: 0, skipped: 0, errors: 0 };
    try {
      const siteTimezone = await getSiteTimezone();
      const today = getLocalDate(siteTimezone);
      const currentMonth = today.getMonth();
      const currentYear = today.getFullYear();

      console.log(`📊 [ENTITY SUB SCHEDULER] Checking brand/foodcourt/owner subscription invoices (${ADVANCE_DAYS}-day advance)...`);

      // All entity subscription users: Brand General, Foodcourt General, Restaurant Owner
      // Subscription data is stored on users table for all roles
      const User = require('../models/User');
      const entityUsers = await User.findAll({
        where: {
          role: { [Op.in]: ['Brand General', 'Foodcourt General', 'Restaurant Owner'] },
          subscription_status: { [Op.in]: ['active', 'trial'] },
          is_demo: { [Op.ne]: true },
          is_test: { [Op.ne]: true },
          subscription_start: { [Op.ne]: null },
          plan_type: { [Op.ne]: null }
        }
      });

      const payerTypeMap = {
        'Brand General': 'brand_manager',
        'Foodcourt General': 'foodcourt_manager',
        'Restaurant Owner': 'restaurant_owner'
      };
      const typeMap = { 'Brand General': 'brand', 'Foodcourt General': 'foodcourt', 'Restaurant Owner': 'owner' };

      const entities = entityUsers.map(u => ({
        entity: u,
        type: typeMap[u.role],
        payerType: payerTypeMap[u.role],
        payerId: u.id,
        name: u.company_name || u.full_name,
        currency: u.currency || 'MYR'
      }));

      const brandCount = entityUsers.filter(u => u.role === 'Brand General').length;
      const fcCount = entityUsers.filter(u => u.role === 'Foodcourt General').length;
      const ownerCount = entityUsers.filter(u => u.role === 'Restaurant Owner').length;
      console.log(`📊 [ENTITY SUB SCHEDULER] Found ${brandCount} brand generals, ${fcCount} foodcourt generals, ${ownerCount} owners`);

      for (const { entity, type, payerType, payerId, name, currency } of entities) {
        try {
          const subscriptionStart = new Date(entity.subscription_start);
          const subscriptionDay = subscriptionStart.getDate();
          const billingCycle = entity.billing_cycle || 'monthly';

          const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();
          const effectiveDay = subscriptionDay > 28 ? Math.min(subscriptionDay, lastDay) : subscriptionDay;

          if (!this.isTodayAdvanceOf(effectiveDay, today)) {
            continue;
          }

          const { targetMonth, targetYear } = this.getTargetBillingMonth(effectiveDay, today);

          let billingStart, billingEnd;
          if (billingCycle === 'annual') {
            const subscriptionMonth = subscriptionStart.getMonth();
            if (targetMonth !== subscriptionMonth) continue;
            billingStart = new Date(targetYear, targetMonth, effectiveDay);
            billingEnd = new Date(targetYear + 1, targetMonth, effectiveDay - 1);
          } else {
            billingStart = new Date(targetYear, targetMonth, effectiveDay);
            billingEnd = new Date(targetYear, targetMonth + 1, effectiveDay - 1);
          }

          // Duplicate check
          const existing = await Invoice.findOne({
            where: {
              payer_type: payerType,
              payer_id: payerId,
              billing_period_start: billingStart,
              type: 'automatic',
              invoice_category: 'subscription',
              issuer_type: 'system_admin'
            }
          });

          if (existing) {
            result.skipped++;
            continue;
          }

          // Get plan price: entity.plan_amount → fallback to plan_prices table
          let planAmount = parseFloat(entity.plan_amount) || 0;
          if (planAmount <= 0 && entity.plan_type) {
            // Convert plan_type display name to plan_prices key
            // e.g. "Brand Enterprise" → "brand_enterprise", "Foodcourt Basic" → "foodcourt_basic"
            const planKey = entity.plan_type.toLowerCase().replace(/\s+/g, '_');
            const planPrice = await PlanPrice.findOne({
              where: { currency: currency, is_active: true },
              include: [{
                model: PlanTemplate,
                as: 'plan',
                where: { name: planKey },
                attributes: ['id', 'name']
              }]
            });
            if (planPrice) {
              planAmount = billingCycle === 'annual'
                ? parseFloat(planPrice.annual_price) || 0
                : parseFloat(planPrice.monthly_price) || 0;
            }
          }
          if (planAmount <= 0) {
            result.skipped++;
            continue;
          }

          // Generate invoice number
          const prefix = type === 'brand' ? 'BRD' : type === 'foodcourt' ? 'FC' : 'OWN';
          const dateStr = billingStart.toISOString().slice(0, 10).replace(/-/g, '');
          const invoiceNumber = `INV-${prefix}-${dateStr}-${entity.id}`;

          // Due date = billing start + 14 days
          const dueDate = new Date(billingStart);
          dueDate.setDate(dueDate.getDate() + 14);

          const invoice = await Invoice.create({
            invoice_number: invoiceNumber,
            type: 'automatic',
            invoice_category: 'subscription',
            issuer_type: 'system_admin',
            issuer_id: 1,
            restaurant_id: null,
            payer_type: payerType,
            payer_id: payerId,
            billing_period_start: billingStart,
            billing_period_end: billingEnd,
            due_date: dueDate,
            subtotal: planAmount,
            tax_amount: 0,
            discount_amount: 0,
            total_amount: planAmount,
            currency: currency,
            status: 'pending_payment',
            issued_by: 0,
            issued_at: today,
            notes: `${entity.plan_type} - ${billingCycle} subscription for ${name}`
          });

          await InvoiceItem.create({
            invoice_id: invoice.id,
            description: `${entity.plan_type} Subscription (${billingCycle})`,
            quantity: 1,
            unit_price: planAmount,
            amount: planAmount,
            fixed_amount: planAmount,
            calculated_amount: planAmount,
            tax_rate: 0,
            tax_amount: 0,
            total_amount: planAmount,
            item_type: 'subscription'
          });

          const { finalizeInvoice } = require('../utils/invoiceCalculation');
          await finalizeInvoice(invoice.id);

          result.generated++;
          console.log(`✓ [ENTITY SUB] ${invoiceNumber} for ${name} - ${currency} ${planAmount.toFixed(2)}`);

        } catch (error) {
          console.error(`✗ [ENTITY SUB] Error for ${name}:`, error.message);
          result.errors++;
        }
      }

      console.log(`✓ [ENTITY SUB SCHEDULER] Complete - Generated: ${result.generated}, Skipped: ${result.skipped}, Errors: ${result.errors}`);
      return result;
    } catch (error) {
      console.error('✗ [ENTITY SUB SCHEDULER] Error:', error);
      return result;
    }
  }

  /**
   * Calculate charges based on entity plan and revenue (same logic as brands.js)
   */
  // Compute line items from an EntityPlan based on its own fields.
  // Supports: fixed (EntityPlanPrice.monthly_price) / percentage (percentage_value × revenue) / combined (MAX of both).
  // `fixedPrice` is the EntityPlanPrice row for the invoice currency (caller passes it in charges.items).
  // Phase 2-E: `prorationFactor` (0-1) scales the fixed portion only. Percentage of revenue is
  // naturally prorated by actual activity, so it is not factored.
  calculatePlanCharges(plan, revenue, discountInfo = { type: 'none', value: 0, reason: null }, fixedMonthlyPrice = 0, prorationFactor = 1) {
    const items = [];
    let subtotal = 0;
    const taxRate = 0; // EntityPlan has no tax_rate field — tax applied downstream via payment settings

    const chargeType = plan.charge_type || 'fixed';
    const factor = (typeof prorationFactor === 'number' && prorationFactor >= 0 && prorationFactor <= 1) ? prorationFactor : 1;
    const fullFixed = Number(fixedMonthlyPrice) || 0;
    const fixedAmount = Math.round(fullFixed * factor * 100) / 100;
    const pctRate = parseFloat(plan.percentage_value || 0);
    const percentageAmount = pctRate > 0 ? Math.round(revenue * pctRate / 100 * 100) / 100 : 0;

    let rentAmount = 0;
    let description = '';
    let calcMethod = chargeType;
    let fixedForItem = null;
    let pctRateForItem = null;
    let minForItem = null;
    const proratedSuffix = factor < 1 ? ` [prorated ${Math.round(factor * 100)}%]` : '';

    if (chargeType === 'fixed') {
      rentAmount = fixedAmount;
      description = `${plan.name} (Fixed)${proratedSuffix}`;
      fixedForItem = fixedAmount;
    } else if (chargeType === 'percentage') {
      rentAmount = percentageAmount;
      description = `${plan.name} (${pctRate}% of revenue)`;
      pctRateForItem = pctRate;
    } else if (chargeType === 'combined') {
      // "Fixed OR %": rent = max(fixed floor, percentage × revenue) — min-guarantee pattern.
      // The fixed floor is prorated; percentage reflects actual activity.
      rentAmount = Math.max(fixedAmount, percentageAmount);
      description = `${plan.name} (Combined: max of ${fixedAmount} or ${pctRate}% × ${revenue})${proratedSuffix}`;
      fixedForItem = fixedAmount;
      pctRateForItem = pctRate;
      minForItem = fixedAmount; // prorated fixed acts as minimum guarantee
    } else if (chargeType === 'additive') {
      // "Fixed + %": both charged together — fixed base + revenue percentage.
      // Common in franchise models where fixed monthly management fee AND royalty are separate.
      rentAmount = fixedAmount + percentageAmount;
      description = `${plan.name} (Additive: ${fixedAmount} + ${pctRate}% × ${revenue})${proratedSuffix}`;
      fixedForItem = fixedAmount;
      pctRateForItem = pctRate;
    }

    if (rentAmount > 0) {
      const tax = rentAmount * taxRate;
      items.push({
        item_type: chargeType === 'percentage' ? 'revenue_percentage' : 'rent',
        description,
        calculation_method: calcMethod,
        fixed_amount: fixedForItem,
        percentage_rate: pctRateForItem,
        base_amount: pctRate > 0 ? revenue : null,
        minimum_amount: minForItem,
        calculated_amount: rentAmount,
        tax_rate: 0,
        tax_amount: Math.round(tax * 100) / 100,
        total_amount: Math.round((rentAmount + tax) * 100) / 100
      });
      subtotal += rentAmount;
    }

    // Apply discount
    let discountAmount = 0;
    const discountType = discountInfo.type || 'none';
    const discountValue = parseFloat(discountInfo.value) || 0;

    if (discountType === 'percentage' && discountValue > 0) {
      discountAmount = Math.round(subtotal * discountValue / 100 * 100) / 100;
    } else if (discountType === 'fixed' && discountValue > 0) {
      discountAmount = Math.min(discountValue, subtotal);
    }

    const discountedSubtotal = Math.round((subtotal - discountAmount) * 100) / 100;
    const taxAmount = Math.round(discountedSubtotal * taxRate * 100) / 100;
    const totalAmount = Math.round((discountedSubtotal + taxAmount) * 100) / 100;

    return {
      items, subtotal, taxAmount, totalAmount,
      discountType, discountValue, discountAmount,
      discountReason: discountInfo.reason,
      discountedSubtotal
    };
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

  /**
   * Phase 2-E: Compute proration factor for a contract against a billing period.
   * Returns 0..1 = fraction of [periodStart..periodEnd] that is covered by the contract.
   * - No contract → 1 (legacy plans with no contract continue to bill full month)
   * - Contract fully covers period → 1
   * - Contract starts mid-period → partial (first invoice)
   * - Contract ends mid-period → partial (last invoice)
   * - No overlap → 0 (caller should skip)
   */
  computeProrationFactor(contract, periodStart, periodEnd) {
    if (!contract) return 1;
    const cStart = contract.start_date ? new Date(contract.start_date) : null;
    const cEnd = contract.end_date ? new Date(contract.end_date) : null;
    const pStart = new Date(periodStart);
    const pEnd = new Date(periodEnd);
    // Normalize to midnight for whole-day math
    pStart.setHours(0, 0, 0, 0);
    pEnd.setHours(0, 0, 0, 0);
    if (cStart) cStart.setHours(0, 0, 0, 0);
    if (cEnd) cEnd.setHours(0, 0, 0, 0);

    const effStart = cStart && cStart > pStart ? cStart : pStart;
    const effEnd = cEnd && cEnd < pEnd ? cEnd : pEnd;
    if (effEnd < effStart) return 0;

    const DAY = 24 * 60 * 60 * 1000;
    const totalDays = Math.round((pEnd - pStart) / DAY) + 1;
    const coveredDays = Math.round((effEnd - effStart) / DAY) + 1;
    if (totalDays <= 0) return 1;
    const f = coveredDays / totalDays;
    return Math.min(1, Math.max(0, Math.round(f * 10000) / 10000));
  }

  /**
   * Resolve billing_day to actual day for a given month.
   * -1 means "end of month" (last day of the target month).
   * @param {number} billingDay - Day of month (1-28) or -1 for end of month
   * @param {number} year
   * @param {number} month - 0-indexed
   * @returns {number} actual day of month
   */
  resolveEffectiveDay(billingDay, year, month) {
    const lastDay = new Date(year, month + 1, 0).getDate();
    if (billingDay === -1) return lastDay;
    return Math.min(billingDay, lastDay);
  }

  /**
   * Check if today is exactly ADVANCE_DAYS before a given billing day.
   * Handles month boundary wrapping.
   * @param {number} billingDay - Day of month (1-28) or -1 for end of month
   * @param {Date} today - Current date
   * @returns {boolean}
   */
  isTodayAdvanceOf(billingDay, today) {
    // CATCH-UP MODE: returns true if today is AT OR AFTER the generation date
    // (billing date - ADVANCE_DAYS). This ensures invoices are still generated
    // even if the cron missed a day (server down, timezone shift, etc.).
    // Duplicate prevention is handled by the invoice existence check in the caller.
    const currentDay = today.getDate();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    let billingDate;
    const effectiveThisMonth = this.resolveEffectiveDay(billingDay, currentYear, currentMonth);

    if (currentDay < effectiveThisMonth) {
      billingDate = new Date(currentYear, currentMonth, effectiveThisMonth);
    } else {
      const nextMonth = currentMonth + 1;
      const effectiveNextMonth = this.resolveEffectiveDay(billingDay, currentYear, nextMonth);
      billingDate = new Date(currentYear, nextMonth, effectiveNextMonth);
    }

    const generationDate = new Date(billingDate);
    generationDate.setDate(generationDate.getDate() - ADVANCE_DAYS);

    // Catch-up: today >= generationDate (was: today === generationDate)
    const todayMid = new Date(currentYear, currentMonth, currentDay);
    const genMid = new Date(generationDate.getFullYear(), generationDate.getMonth(), generationDate.getDate());
    return todayMid >= genMid;
  }

  /**
   * Get the target billing month/year for a given billing day.
   * Since we generate in advance, the billing day is in the future.
   * @param {number} billingDay - Day of month (1-28) or -1 for end of month
   * @param {Date} today - Current date
   * @returns {{ targetMonth: number, targetYear: number }}
   */
  getTargetBillingMonth(billingDay, today) {
    const currentDay = today.getDate();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    const effectiveDay = this.resolveEffectiveDay(billingDay, currentYear, currentMonth);

    if (currentDay < effectiveDay) {
      return { targetMonth: currentMonth, targetYear: currentYear };
    } else {
      const nextMonth = currentMonth + 1;
      return {
        targetMonth: nextMonth > 11 ? 0 : nextMonth,
        targetYear: nextMonth > 11 ? currentYear + 1 : currentYear
      };
    }
  }

  /**
   * Calculate billing period for entity plans based on billing_day.
   * Period: billing_day of previous cycle to (billing_day - 1) of current cycle.
   * Due date: the billing_day itself.
   * For end-of-month (-1): period is 1st~last day of month, due date = last day.
   * @param {number} billingDay - Day of month (1-28) or -1 for end of month
   * @param {Date} today - Current date
   */
  calculateEntityBillingPeriod(billingDay, today) {
    const { targetMonth, targetYear } = this.getTargetBillingMonth(billingDay, today);

    if (billingDay === -1) {
      // End of month: period = 1st to last day of target month
      const lastDay = new Date(targetYear, targetMonth + 1, 0).getDate();
      const periodStart = new Date(targetYear, targetMonth, 1);
      const periodEnd = new Date(targetYear, targetMonth, lastDay, 23, 59, 59);
      const dueDate = new Date(targetYear, targetMonth, lastDay);
      return { periodStart, periodEnd, dueDate };
    }

    const effectiveDay = this.resolveEffectiveDay(billingDay, targetYear, targetMonth);

    // Period end: (effectiveDay - 1) of the target billing month
    const periodEnd = new Date(targetYear, targetMonth, effectiveDay - 1, 23, 59, 59);

    // Period start: billingDay of the month before
    const prevMonth = targetMonth === 0 ? 11 : targetMonth - 1;
    const prevYear = targetMonth === 0 ? targetYear - 1 : targetYear;
    const prevEffectiveDay = this.resolveEffectiveDay(billingDay, prevYear, prevMonth);
    const periodStart = new Date(prevYear, prevMonth, prevEffectiveDay);

    // Due date: billing day itself
    const dueDate = new Date(targetYear, targetMonth, effectiveDay);

    return { periodStart, periodEnd, dueDate };
  }

  /**
   * Determine revenue calculation period based on plan.revenue_base.
   */
  getRevenuePeriod(plan, periodStart, periodEnd) {
    switch (plan.revenue_base) {
      case 'previous_year': {
        const year = periodEnd.getFullYear() - 1;
        return {
          revenueStart: new Date(year, 0, 1),
          revenueEnd: new Date(year, 11, 31, 23, 59, 59)
        };
      }
      case 'previous_month': {
        const month = periodEnd.getMonth();
        const year = periodEnd.getFullYear();
        return {
          revenueStart: new Date(year, month, 1),
          revenueEnd: new Date(year, month + 1, 0, 23, 59, 59)
        };
      }
      case 'up_to_billing_day':
      default:
        return { revenueStart: periodStart, revenueEnd: periodEnd };
    }
  }

  /**
   * Send invoice notification email. Never blocks or throws.
   */
  async sendInvoiceEmail(invoice, restaurant, issuerType, issuerId, invoiceNumber) {
    // 1. Existing: send via issuer's SMTP to restaurant email
    try {
      const recipientEmail = restaurant.email;
      if (recipientEmail) {
        const emailContent = generateInvoiceNotificationEmail(invoice, restaurant, FRONTEND_URL);
        await sendIssuerEmail(issuerType, issuerId, {
          to: recipientEmail,
          ...emailContent
        });
        await systemLogger.info('payment', 'invoice-scheduler', `Invoice email sent: ${invoiceNumber}`, { recipientEmail, issuerType });
      }
    } catch (emailError) {
      await systemLogger.warn('payment', 'invoice-scheduler', `Invoice email failed: ${invoiceNumber}`, { error: emailError.message, issuerType });
    }

    // 2. New: send receiver-based notification to Restaurant Admin + Owner
    try {
      const isTrial = restaurant.status === 'trial';
      const restaurantTz = getRestaurantTimezone(restaurant);
      const mail = invoiceCreatedEmail(invoice, restaurant.name, { isTrial, timezone: restaurantTz });
      // Notify restaurant admin
      if (restaurant.admin_id) {
        sendNotification(restaurant.admin_id, 'invoice_created', mail);
      }
      // Notify restaurant owners
      const ownerIds = await getRestaurantOwnerIds(restaurant.id);
      for (const ownerId of ownerIds) {
        sendNotification(ownerId, 'invoice_created', mail);
      }
    } catch (e) {
      console.error('[Invoice notification error]', e.message);
    }
  }

  /**
   * Create subscription invoice for Brand/Foodcourt/Owner entities at signup
   * @param {Object} entity - Brand, Foodcourt, or User (Owner) record
   * @param {string} entityType - 'brand', 'foodcourt', or 'owner'
   * @param {Object} plan - PlanTemplate record
   * @param {string} currency - Currency code (MYR, USD, KRW)
   * @param {Date} dueDate - Invoice due date (trial end date)
   */
  async createEntitySubscriptionInvoice(entity, entityType, plan, currency, dueDate) {
    const now = new Date();
    const billingCycle = entity.billing_cycle || 'monthly';

    // Get currency-specific price
    let planAmount = 0;
    const planPrice = await PlanPrice.findOne({
      where: { plan_id: plan.id, currency: currency, is_active: true }
    });
    if (planPrice) {
      planAmount = billingCycle === 'annual'
        ? parseFloat(planPrice.annual_price)
        : parseFloat(planPrice.monthly_price);
    } else {
      planAmount = billingCycle === 'annual'
        ? parseFloat(plan.base_price_annual || plan.base_price_monthly * 12)
        : parseFloat(plan.base_price_monthly);
    }

    if (!planAmount) {
      console.log(`⚠️ No price for entity subscription: ${entity.name || entity.username}`);
      return;
    }

    // Billing period
    const billingStart = new Date(now);
    const billingEnd = billingCycle === 'annual'
      ? new Date(now.getFullYear() + 1, now.getMonth(), now.getDate() - 1)
      : new Date(now.getFullYear(), now.getMonth() + 1, now.getDate() - 1);

    // Determine issuer type and payer info
    const issuerType = 'system_admin';
    let payerType, payerId, payerName;

    if (entityType === 'brand') {
      payerType = 'brand_manager';
      payerId = entity.owner_id;
      payerName = entity.name;
    } else if (entityType === 'foodcourt') {
      payerType = 'foodcourt_manager';
      payerId = entity.owner_id;
      payerName = entity.name;
    } else if (entityType === 'supplier') {
      // Supplier Admin pays for own SupplierCompany subscription (Sprint 1)
      payerType = 'external';
      payerId = entity.owner_id;
      payerName = entity.name;
    } else {
      // owner
      payerType = 'restaurant_owner';
      payerId = entity.id;
      payerName = entity.company_name || entity.full_name || entity.username;
    }

    // Generate invoice number
    const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
    const prefix = entityType === 'brand' ? 'BRD'
      : entityType === 'foodcourt' ? 'FC'
      : entityType === 'supplier' ? 'SUP'
      : 'OWN';
    const invoiceNumber = `INV-${prefix}-${dateStr}-${entity.id}`;

    // Check duplicate
    const existing = await Invoice.findOne({ where: { invoice_number: invoiceNumber } });
    if (existing) {
      console.log(`⚠️ Invoice already exists: ${invoiceNumber}`);
      return;
    }

    const invoice = await Invoice.create({
      invoice_number: invoiceNumber,
      type: 'automatic',
      invoice_category: 'subscription',
      issuer_type: issuerType,
      issuer_id: 1,
      restaurant_id: null,
      payer_type: payerType,
      payer_id: payerId,
      billing_period_start: billingStart,
      billing_period_end: billingEnd,
      due_date: dueDate,
      subtotal: planAmount,
      tax_amount: 0,
      discount_amount: 0,
      total_amount: planAmount,
      currency: currency,
      status: 'pending',
      notes: `${plan.display_name || plan.name} - ${billingCycle} subscription (Trial period)`
    });

    // Create invoice item
    await InvoiceItem.create({
      invoice_id: invoice.id,
      description: `${plan.display_name || plan.name} Subscription (${billingCycle})`,
      quantity: 1,
      unit_price: planAmount,
      amount: planAmount,
      item_type: 'subscription'
    });

    // Referral first-month discount — applied BEFORE finalizeInvoice (same pattern as
    // createSubscriptionInvoice). entity → payer user mapping mirrors the payer_type
    // resolution above so referred Brand/Foodcourt/Owner/Supplier get the discount too.
    try {
      const referralService = require('./referralService');
      const User = require('../models/User');
      let payerUser = null;
      if (entityType === 'brand' || entityType === 'foodcourt' || entityType === 'supplier') {
        if (entity.owner_id) payerUser = await User.findByPk(entity.owner_id);
      } else if (entityType === 'owner') {
        // For Owner self-signup, `entity` IS the user record
        payerUser = entity.id ? await User.findByPk(entity.id) : null;
      }
      if (payerUser) {
        const applied = await referralService.applyFirstMonthDiscount(invoice, payerUser, planAmount);
        if (applied > 0) {
          console.log(`✓ Referral 1st-month discount applied: ${currency} ${applied.toFixed(2)} on ${invoiceNumber}`);
        }
      }
    } catch (e) {
      console.error('[createEntitySubscriptionInvoice] referral discount hook failed:', e.message);
    }

    const { finalizeInvoice } = require('../utils/invoiceCalculation');
    await finalizeInvoice(invoice.id);

    console.log(`✓ Entity subscription invoice created: ${invoiceNumber} (${currency} ${planAmount})`);
    return invoice;
  }

  /**
   * Apply pending plan changes on their effective date.
   * Runs before invoice generation so new invoices use updated plan data.
   */
  async applyPendingPlanChanges() {
    const result = { applied: 0, errors: 0 };
    const User = require('../models/User');
    const ActivityLog = require('../models/ActivityLog');
    try {
      const siteTimezone = await getSiteTimezone();
      const today = getLocalDate(siteTimezone);
      const todayStr = today.toISOString().split('T')[0];

      console.log(`📊 [PENDING CHANGES] Checking for pending plan changes effective on ${todayStr}...`);

      // 1. Restaurants with pending changes
      const restaurants = await Restaurant.findAll({
        where: {
          pending_plan_type: { [Op.ne]: null },
          plan_change_date: { [Op.lte]: today },
          is_demo: { [Op.ne]: true }
        }
      });

      for (const restaurant of restaurants) {
        try {
          const oldPlan = restaurant.plan_type;
          const oldAmount = parseFloat(restaurant.plan_amount);
          const oldCycle = restaurant.billing_cycle;

          // Apply the pending change
          const updateData = {
            plan_type: restaurant.pending_plan_type,
            plan_amount: restaurant.pending_plan_amount,
            billing_cycle: restaurant.pending_billing_cycle || restaurant.billing_cycle,
            pending_plan_type: null,
            pending_plan_amount: null,
            pending_billing_cycle: null,
            plan_change_date: null,
            plan_change_type: null
          };

          // Recalculate subscription_end
          const start = new Date(restaurant.subscription_start || today);
          if (updateData.billing_cycle === 'annual') {
            start.setFullYear(start.getFullYear() + 1);
          } else {
            start.setMonth(start.getMonth() + 1);
          }
          updateData.subscription_end = start.toISOString().split('T')[0];

          // Update plan limits from PlanTemplate
          const newPlan = await PlanTemplate.findOne({
            where: {
              [Op.or]: [
                { display_name: updateData.plan_type },
                { name: updateData.plan_type }
              ],
              plan_target: 'restaurant'
            }
          });
          if (newPlan) {
            updateData.order_limit = newPlan.order_limit;
            updateData.menu_item_limit = newPlan.menu_item_limit;
            updateData.staff_limit = newPlan.staff_limit;
          }

          await restaurant.update(updateData);

          // Activity log
          await ActivityLog.create({
            restaurant_id: restaurant.id,
            user_id: restaurant.admin_id,
            username: 'system',
            full_name: 'Invoice Scheduler',
            action_type: 'update',
            entity_type: 'subscription',
            entity_id: String(restaurant.id),
            entity_name: updateData.plan_type,
            changes: {
              before: { plan_type: oldPlan, plan_amount: oldAmount, billing_cycle: oldCycle },
              after: { plan_type: updateData.plan_type, plan_amount: parseFloat(updateData.plan_amount), billing_cycle: updateData.billing_cycle }
            },
            description: `Scheduled plan change applied: ${oldPlan} → ${updateData.plan_type}`
          });

          console.log(`✓ [PENDING] Restaurant "${restaurant.name}": ${oldPlan} → ${updateData.plan_type}`);
          result.applied++;
        } catch (error) {
          console.error(`✗ [PENDING] Error applying change for restaurant ${restaurant.name}:`, error.message);
          result.errors++;
        }
      }

      // 2. Users (Brand General, Foodcourt General, Owner) with pending changes
      const users = await User.findAll({
        where: {
          pending_plan_type: { [Op.ne]: null },
          plan_change_date: { [Op.lte]: today },
          is_demo: { [Op.ne]: true },
          is_test: { [Op.ne]: true },
          role: { [Op.in]: ['Brand General', 'Foodcourt General', 'Restaurant Owner'] }
        }
      });

      for (const user of users) {
        try {
          const oldPlan = user.plan_type;
          const oldAmount = parseFloat(user.plan_amount);
          const oldCycle = user.billing_cycle;

          const updateData = {
            plan_type: user.pending_plan_type,
            plan_amount: user.pending_plan_amount,
            billing_cycle: user.pending_billing_cycle || user.billing_cycle,
            pending_plan_type: null,
            pending_plan_amount: null,
            pending_billing_cycle: null,
            plan_change_date: null,
            plan_change_type: null
          };

          // Recalculate subscription_end
          const start = new Date(user.subscription_start || today);
          if (updateData.billing_cycle === 'annual') {
            start.setFullYear(start.getFullYear() + 1);
          } else {
            start.setMonth(start.getMonth() + 1);
          }
          updateData.subscription_end = start.toISOString().split('T')[0];

          await user.update(updateData);

          await ActivityLog.create({
            user_id: user.id,
            username: 'system',
            full_name: 'Invoice Scheduler',
            action_type: 'update',
            entity_type: 'subscription',
            entity_id: String(user.id),
            entity_name: updateData.plan_type,
            changes: {
              before: { plan_type: oldPlan, plan_amount: oldAmount, billing_cycle: oldCycle },
              after: { plan_type: updateData.plan_type, plan_amount: parseFloat(updateData.plan_amount), billing_cycle: updateData.billing_cycle }
            },
            description: `Scheduled plan change applied: ${oldPlan} → ${updateData.plan_type}`
          });

          console.log(`✓ [PENDING] User "${user.full_name}" (${user.role}): ${oldPlan} → ${updateData.plan_type}`);
          result.applied++;
        } catch (error) {
          console.error(`✗ [PENDING] Error applying change for user ${user.full_name}:`, error.message);
          result.errors++;
        }
      }

      // 3. EntityPlanRestaurant with pending plan change (brand/foodcourt plans)
      const EntityPlanRestaurant = require('../models/EntityPlanRestaurant');
      const EntityPlan = require('../models/EntityPlan');
      const eprs = await EntityPlanRestaurant.findAll({
        where: {
          is_active: true,
          pending_plan_id: { [Op.ne]: null },
          pending_activation_date: { [Op.lte]: today }
        }
      });

      for (const epr of eprs) {
        try {
          const oldPlanId = epr.entity_plan_id;
          const newPlanId = epr.pending_plan_id;
          const newPlan = await EntityPlan.findByPk(newPlanId);
          if (!newPlan) {
            console.error(`✗ [PENDING EPR] Pending plan ${newPlanId} not found for EPR ${epr.id}`);
            await epr.update({ pending_plan_id: null, pending_activation_date: null });
            result.errors++;
            continue;
          }

          await epr.update({
            entity_plan_id: newPlanId,
            activation_date: epr.pending_activation_date,
            pending_plan_id: null,
            pending_activation_date: null
          });

          await ActivityLog.create({
            restaurant_id: epr.restaurant_id,
            user_id: null,
            username: 'system',
            full_name: 'Invoice Scheduler',
            action_type: 'update',
            entity_type: `${newPlan.entity_type}_plan_subscription`,
            entity_id: String(epr.id),
            entity_name: newPlan.name,
            changes: { before: { entity_plan_id: oldPlanId }, after: { entity_plan_id: newPlanId } },
            description: `Scheduled entity-plan change applied: plan #${oldPlanId} → ${newPlan.name} (#${newPlanId})`
          });

          console.log(`✓ [PENDING EPR] Restaurant ${epr.restaurant_id}: plan ${oldPlanId} → ${newPlanId}`);
          result.applied++;
        } catch (error) {
          console.error(`✗ [PENDING EPR] Error applying EPR ${epr.id}:`, error.message);
          result.errors++;
        }
      }

      console.log(`📊 [PENDING CHANGES] Applied: ${result.applied}, Errors: ${result.errors}`);
    } catch (error) {
      console.error('✗ [PENDING CHANGES] Fatal error:', error.message);
      result.errors++;
    }
    return result;
  }

  stop() {
    this.jobs.forEach(job => job.stop());
    this.jobs.clear();
    console.log('Invoice scheduler stopped');
  }
}

module.exports = new InvoiceScheduler();

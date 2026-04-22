/**
 * Subscription Status Scheduler
 *
 * Handles automatic status transitions for restaurant subscriptions:
 * 1. Trial (7 days) -> Overdue (when trial expires without payment)
 * 2. Overdue (7-day grace period) -> Suspended (when grace period expires)
 * 3. Payment Complete -> Active (restoration)
 *
 * Runs daily at 3 AM to check and update subscription statuses
 */

const cron = require('node-cron');
const { Op } = require('sequelize');
const Restaurant = require('../models/Restaurant');
const Invoice = require('../models/Invoice');
const Brand = require('../models/Brand');
const Foodcourt = require('../models/Foodcourt');
const User = require('../models/User');
const { sendIssuerEmail } = require('../utils/emailService');
const { emailLayout, getLogoAttachment } = require('../utils/emailTemplates');

// Configuration
const TRIAL_PERIOD_DAYS = 7;
const GRACE_PERIOD_DAYS = 7;

class SubscriptionScheduler {
  constructor() {
    this.jobs = new Map();
  }

  start() {
    // Run daily at 3 AM to check subscription statuses
    const job = cron.schedule('0 3 * * *', async () => {
      console.log('📅 [SUBSCRIPTION SCHEDULER] Running daily subscription status check...');
      await this.processAllSubscriptions();
    });

    this.jobs.set('subscription-check', job);
    console.log('✓ Subscription scheduler started - runs daily at 3 AM to check subscription statuses');

    // Also run immediately on startup (optional - for testing)
    // this.processAllSubscriptions();
  }

  /**
   * Process all subscriptions and update statuses
   */
  async processAllSubscriptions() {
    const startTime = Date.now();
    console.log('🔄 [SUBSCRIPTION SCHEDULER] Processing subscription status transitions...');

    try {
      // 1. Process Trial -> Overdue transitions
      const trialResults = await this.processTrialExpiry();

      // 2. Process Overdue -> Suspended transitions (grace period expired)
      const graceResults = await this.processGracePeriodExpiry();

      // 3. Process Active -> Overdue transitions (missed payment)
      const paymentResults = await this.processOverduePayments();

      // 4. Process Brand/Foodcourt/Owner subscription transitions
      const entityResults = await this.processEntitySubscriptions();

      // 5. Send overdue invoice reminders (D+3, D+7, D+14)
      const reminderResults = await this.processOverdueReminders();

      // 6. Contract expiry reminders (renewal_alert_months threshold + D-7) + auto stage='expired'
      const contractResults = await this.processContractExpiryReminders();

      const duration = ((Date.now() - startTime) / 1000).toFixed(2);
      console.log(`✓ [SUBSCRIPTION SCHEDULER] Completed in ${duration}s`);
      console.log(`   - Trial expired: ${trialResults.updated} restaurants`);
      console.log(`   - Grace period expired: ${graceResults.updated} restaurants`);
      console.log(`   - Overdue payments: ${paymentResults.updated} restaurants`);
      console.log(`   - Entity subscriptions: ${entityResults.updated} entities`);
      console.log(`   - Overdue reminders sent: ${reminderResults.sent}`);
      console.log(`   - Contract expiry reminders: ${contractResults.sent} sent, ${contractResults.expired} auto-expired`);

      return {
        success: true,
        trialExpired: trialResults.updated,
        gracePeriodExpired: graceResults.updated,
        overduePayments: paymentResults.updated,
        remindersSent: reminderResults.sent,
        duration
      };

    } catch (error) {
      console.error('✗ [SUBSCRIPTION SCHEDULER] Error processing subscriptions:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Process Trial -> Overdue transitions
   * Restaurants whose trial period has expired without payment
   */
  async processTrialExpiry() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    try {
      // Find restaurants with trial status and expired trial_end_date (skip demo)
      const expiredTrials = await Restaurant.findAll({
        where: {
          status: 'trial',
          is_demo: { [Op.ne]: true },
          is_test: { [Op.ne]: true },
          trial_end_date: {
            [Op.lt]: today  // Trial end date is before today
          }
        }
      });

      console.log(`📊 Found ${expiredTrials.length} restaurants with expired trials`);

      let updated = 0;
      for (const restaurant of expiredTrials) {
        try {
          // Check if there's a paid invoice covering the current period
          const hasPaidInvoice = await this.hasActivePaidInvoice(restaurant.id);

          if (hasPaidInvoice) {
            // Payment completed, transition to Active
            await restaurant.update({
              status: 'active',
              trial_end_date: null
            });
            console.log(`✓ ${restaurant.name}: Trial -> Active (payment found)`);
          } else {
            // No payment, transition to Overdue with grace period
            await restaurant.update({
              status: 'overdue',
              grace_period_start: today
            });
            console.log(`⚠️ ${restaurant.name}: Trial -> Overdue (no payment found)`);

            // Send email notification via issuer SMTP
            this.sendSubscriptionEmail(restaurant, 'trial_expired').catch(e =>
              console.error(`[Subscription email error] ${restaurant.name}:`, e.message));
          }
          updated++;
        } catch (error) {
          console.error(`✗ Error processing trial expiry for ${restaurant.name}:`, error.message);
        }
      }

      return { updated, total: expiredTrials.length };

    } catch (error) {
      console.error('✗ Error in processTrialExpiry:', error);
      return { updated: 0, error: error.message };
    }
  }

  /**
   * Process Overdue -> Suspended transitions
   * Restaurants whose grace period has expired
   */
  async processGracePeriodExpiry() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Calculate grace period cutoff date
    const gracePeriodCutoff = new Date(today);
    gracePeriodCutoff.setDate(gracePeriodCutoff.getDate() - GRACE_PERIOD_DAYS);

    try {
      // Find restaurants with overdue status and grace_period_start older than 7 days (skip demo)
      const expiredGracePeriods = await Restaurant.findAll({
        where: {
          status: 'overdue',
          is_demo: { [Op.ne]: true },
          is_test: { [Op.ne]: true },
          grace_period_start: {
            [Op.lte]: gracePeriodCutoff  // Grace period started 7+ days ago
          }
        }
      });

      console.log(`📊 Found ${expiredGracePeriods.length} restaurants with expired grace periods`);

      let updated = 0;
      for (const restaurant of expiredGracePeriods) {
        try {
          // Double-check for any recent payment
          const hasPaidInvoice = await this.hasActivePaidInvoice(restaurant.id);

          if (hasPaidInvoice) {
            // Payment completed, transition to Active
            await restaurant.update({
              status: 'active',
              grace_period_start: null
            });
            console.log(`✓ ${restaurant.name}: Overdue -> Active (payment found)`);
          } else {
            // Grace period expired, suspend access + cancel pending plan changes
            const suspendData = { status: 'suspended' };
            if (restaurant.pending_plan_type) {
              suspendData.pending_plan_type = null;
              suspendData.pending_plan_amount = null;
              suspendData.pending_billing_cycle = null;
              suspendData.plan_change_date = null;
              suspendData.plan_change_type = null;
              console.log(`🗑️ ${restaurant.name}: Pending plan change cancelled due to suspension`);
            }
            await restaurant.update(suspendData);
            console.log(`🚫 ${restaurant.name}: Overdue -> Suspended (grace period expired)`);

            // Send email notification via issuer SMTP
            this.sendSubscriptionEmail(restaurant, 'suspended').catch(e =>
              console.error(`[Subscription email error] ${restaurant.name}:`, e.message));
          }
          updated++;
        } catch (error) {
          console.error(`✗ Error processing grace period expiry for ${restaurant.name}:`, error.message);
        }
      }

      return { updated, total: expiredGracePeriods.length };

    } catch (error) {
      console.error('✗ Error in processGracePeriodExpiry:', error);
      return { updated: 0, error: error.message };
    }
  }

  /**
   * Process Active -> Overdue transitions
   * Active restaurants with overdue invoices (no paid invoice for current period)
   */
  async processOverduePayments() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    try {
      // Find active restaurants (skip demo)
      const activeRestaurants = await Restaurant.findAll({
        where: {
          status: 'active',
          is_demo: { [Op.ne]: true },
          is_test: { [Op.ne]: true },
          subscription_start: { [Op.ne]: null }
        }
      });

      console.log(`📊 Checking ${activeRestaurants.length} active restaurants for overdue payments`);

      let updated = 0;
      for (const restaurant of activeRestaurants) {
        try {
          // Check if there's an overdue invoice (status: overdue or pending_payment with past due_date)
          const overdueInvoice = await Invoice.findOne({
            where: {
              restaurant_id: restaurant.id,
              invoice_category: 'subscription',
              [Op.or]: [
                { status: 'overdue' },
                {
                  status: 'pending_payment',
                  due_date: { [Op.lt]: today }
                }
              ]
            },
            order: [['due_date', 'DESC']]
          });

          if (overdueInvoice) {
            // Has overdue invoice, transition to Overdue
            await restaurant.update({
              status: 'overdue',
              grace_period_start: today
            });

            // Also update invoice status to overdue if not already
            if (overdueInvoice.status === 'pending_payment') {
              await overdueInvoice.update({ status: 'overdue' });
            }

            console.log(`⚠️ ${restaurant.name}: Active -> Overdue (overdue invoice #${overdueInvoice.invoice_number})`);

            // Send email notification
            this.sendSubscriptionEmail(restaurant, 'trial_expired').catch(e =>
              console.error(`[Subscription email error] ${restaurant.name}:`, e.message));

            updated++;
          }
        } catch (error) {
          console.error(`✗ Error checking overdue payments for ${restaurant.name}:`, error.message);
        }
      }

      return { updated };

    } catch (error) {
      console.error('✗ Error in processOverduePayments:', error);
      return { updated: 0, error: error.message };
    }
  }

  /**
   * Check if restaurant has a paid invoice covering the current billing period
   */
  async hasActivePaidInvoice(restaurantId) {
    const today = new Date();

    const paidInvoice = await Invoice.findOne({
      where: {
        restaurant_id: restaurantId,
        invoice_category: 'subscription',
        status: 'paid',
        billing_period_end: { [Op.gte]: today }
      }
    });

    return !!paidInvoice;
  }

  /**
   * Process Brand/Foodcourt/Owner subscription transitions
   * Same logic as restaurants: trial->overdue->suspended
   */
  async processEntitySubscriptions() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const graceCutoff = new Date(today);
    graceCutoff.setDate(graceCutoff.getDate() - GRACE_PERIOD_DAYS);

    let updated = 0;

    // Helper: process a list of entities
    const processEntities = async (entities, entityType) => {
      for (const entity of entities) {
        try {
          const status = entity.subscription_status;

          if (status === 'trial' && entity.trial_end_date && new Date(entity.trial_end_date) < today) {
            // Check for paid invoice
            const hasPaid = await this.hasEntityPaidInvoice(entity.id, entityType);
            if (hasPaid) {
              await entity.update({ subscription_status: 'active', trial_end_date: null });
              console.log(`✓ ${entityType} ${entity.name || entity.username}: Trial -> Active`);
            } else {
              await entity.update({ subscription_status: 'overdue', grace_period_start: today });
              console.log(`⚠️ ${entityType} ${entity.name || entity.username}: Trial -> Overdue`);

              this.sendEntitySubscriptionEmail(entity, entityType, 'trial_expired').catch(e =>
                console.error(`[Entity subscription email error] ${entity.name || entity.username}:`, e.message));
            }
            updated++;
          } else if (status === 'overdue' && entity.grace_period_start && new Date(entity.grace_period_start) <= graceCutoff) {
            const hasPaid = await this.hasEntityPaidInvoice(entity.id, entityType);
            if (hasPaid) {
              await entity.update({ subscription_status: 'active', grace_period_start: null });
              console.log(`✓ ${entityType} ${entity.name || entity.username}: Overdue -> Active`);
            } else {
              const suspendData = { subscription_status: 'suspended' };
              if (entity.pending_plan_type) {
                suspendData.pending_plan_type = null;
                suspendData.pending_plan_amount = null;
                suspendData.pending_billing_cycle = null;
                suspendData.plan_change_date = null;
                suspendData.plan_change_type = null;
                console.log(`🗑️ ${entityType} ${entity.name || entity.username}: Pending plan change cancelled due to suspension`);
              }
              await entity.update(suspendData);
              console.log(`🚫 ${entityType} ${entity.name || entity.username}: Overdue -> Suspended`);

              this.sendEntitySubscriptionEmail(entity, entityType, 'suspended').catch(e =>
                console.error(`[Entity subscription email error] ${entity.name || entity.username}:`, e.message));
            }
            updated++;
          }
        } catch (e) {
          console.error(`✗ Error processing ${entityType} ${entity.id}:`, e.message);
        }
      }
    };

    try {
      // All entity subscription users (Brand General, Foodcourt General, Owner)
      // Subscription data is on users table for all roles
      const entityUsers = await User.findAll({
        where: {
          role: { [Op.in]: ['Brand General', 'Foodcourt General', 'Restaurant Owner'] },
          subscription_status: { [Op.in]: ['trial', 'overdue'] },
          is_demo: { [Op.ne]: true }
        }
      });

      const typeMap = { 'Brand General': 'brand', 'Foodcourt General': 'foodcourt', 'Restaurant Owner': 'owner' };
      for (const u of entityUsers) {
        await processEntities([u], typeMap[u.role]);
      }

    } catch (e) {
      console.error('✗ Error in processEntitySubscriptions:', e.message);
    }

    return { updated };
  }

  /**
   * Check if an entity (brand/foodcourt/owner) has a paid invoice
   */
  async hasEntityPaidInvoice(entityId, entityType) {
    const { Op } = require('sequelize');
    const where = { status: 'paid', invoice_category: { [Op.in]: ['subscription', 'pos_subscription'] } };
    if (entityType === 'brand') {
      where.payer_type = 'brand_manager';
      where.payer_id = entityId;
    } else if (entityType === 'foodcourt') {
      where.payer_type = 'foodcourt_manager';
      where.payer_id = entityId;
    } else {
      // owner - payer_id
      where.payer_id = entityId;
      where.payer_type = 'restaurant_owner';
    }

    const paidInvoice = await Invoice.findOne({ where });
    return !!paidInvoice;
  }

  /**
   * Restore subscription to Active status when payment is completed
   * This should be called when an invoice is marked as paid
   */
  async restoreSubscription(restaurantId) {
    try {
      const restaurant = await Restaurant.findByPk(restaurantId);

      if (!restaurant) {
        return { success: false, error: 'Restaurant not found' };
      }

      // Only restore if currently in overdue or suspended status
      if (!['overdue', 'suspended'].includes(restaurant.status)) {
        return { success: true, message: 'Restaurant is not in a suspended state' };
      }

      await restaurant.update({
        status: 'active',
        grace_period_start: null,
        last_payment_date: new Date()
      });

      console.log(`✓ Subscription restored for ${restaurant.name}: ${restaurant.status} -> Active`);

      return { success: true, previousStatus: restaurant.status };

    } catch (error) {
      console.error('✗ Error restoring subscription:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Start a trial period for a new restaurant
   */
  async startTrial(restaurantId) {
    try {
      const restaurant = await Restaurant.findByPk(restaurantId);

      if (!restaurant) {
        return { success: false, error: 'Restaurant not found' };
      }

      const today = new Date();
      const trialEndDate = new Date(today);
      trialEndDate.setDate(trialEndDate.getDate() + TRIAL_PERIOD_DAYS);

      await restaurant.update({
        status: 'trial',
        trial_end_date: trialEndDate,
        subscription_start: today
      });

      console.log(`✓ Trial started for ${restaurant.name}: ends on ${trialEndDate.toISOString().split('T')[0]}`);

      // Generate first subscription invoice immediately so user can pay during trial
      try {
        const invoiceScheduler = require('./invoiceScheduler');
        const billingCycle = restaurant.billing_cycle || 'monthly';
        const billingStart = new Date(today);
        const billingEnd = billingCycle === 'annual'
          ? new Date(today.getFullYear() + 1, today.getMonth(), today.getDate() - 1)
          : new Date(today.getFullYear(), today.getMonth() + 1, today.getDate() - 1);

        await invoiceScheduler.createSubscriptionInvoice(restaurant, billingStart, billingEnd, billingCycle, trialEndDate);
        console.log(`📄 First invoice generated for ${restaurant.name} (due: ${trialEndDate.toISOString().split('T')[0]})`);
      } catch (invoiceError) {
        // Non-blocking: trial starts even if invoice generation fails
        console.error(`⚠️ Could not generate first invoice for ${restaurant.name}:`, invoiceError.message);
      }

      return {
        success: true,
        trialStartDate: today,
        trialEndDate: trialEndDate
      };

    } catch (error) {
      console.error('✗ Error starting trial:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Get subscription status summary for a restaurant
   */
  async getSubscriptionStatus(restaurantId) {
    try {
      const restaurant = await Restaurant.findByPk(restaurantId);

      if (!restaurant) {
        return { success: false, error: 'Restaurant not found' };
      }

      const status = {
        restaurantId: restaurant.id,
        name: restaurant.name,
        currentStatus: restaurant.status,
        planType: restaurant.plan_type,
        billingCycle: restaurant.billing_cycle,
        subscriptionStart: restaurant.subscription_start,
        subscriptionEnd: restaurant.subscription_end,
        trialEndDate: restaurant.trial_end_date,
        gracePeriodStart: restaurant.grace_period_start,
        lastPaymentDate: restaurant.last_payment_date
      };

      // Calculate days remaining for trial or grace period
      const today = new Date();
      if (restaurant.status === 'trial' && restaurant.trial_end_date) {
        const daysRemaining = Math.ceil((new Date(restaurant.trial_end_date) - today) / (1000 * 60 * 60 * 24));
        status.trialDaysRemaining = Math.max(0, daysRemaining);
      }

      if (restaurant.status === 'overdue' && restaurant.grace_period_start) {
        const graceEnd = new Date(restaurant.grace_period_start);
        graceEnd.setDate(graceEnd.getDate() + GRACE_PERIOD_DAYS);
        const daysRemaining = Math.ceil((graceEnd - today) / (1000 * 60 * 60 * 24));
        status.gracePeriodDaysRemaining = Math.max(0, daysRemaining);
        status.gracePeriodEndDate = graceEnd;
      }

      // Check for pending invoices
      const pendingInvoice = await Invoice.findOne({
        where: {
          restaurant_id: restaurantId,
          invoice_category: 'subscription',
          status: { [Op.in]: ['pending_payment', 'overdue'] }
        },
        order: [['due_date', 'DESC']]
      });

      if (pendingInvoice) {
        status.pendingInvoice = {
          id: pendingInvoice.id,
          invoiceNumber: pendingInvoice.invoice_number,
          amount: pendingInvoice.total_amount,
          currency: pendingInvoice.currency,
          dueDate: pendingInvoice.due_date,
          status: pendingInvoice.status
        };
      }

      return { success: true, ...status };

    } catch (error) {
      console.error('✗ Error getting subscription status:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Manual trigger for testing
   */
  async runNow() {
    console.log('🔧 [SUBSCRIPTION SCHEDULER] Manual trigger initiated...');
    return await this.processAllSubscriptions();
  }

  /**
   * Send subscription status change email via issuer SMTP
   * Determines issuer based on restaurant's brand/foodcourt affiliation
   */
  async sendSubscriptionEmail(restaurant, type) {
    const recipientEmail = restaurant.email;
    if (!recipientEmail) return;

    // Determine issuer: brand > foodcourt > system_admin
    let issuerType = 'system_admin';
    let issuerId = null;
    if (restaurant.brand_id) {
      issuerType = 'brand';
      issuerId = restaurant.brand_id;
    } else if (restaurant.foodcourt_id) {
      issuerType = 'foodcourt';
      issuerId = restaurant.foodcourt_id;
    }

    let subject, title, bodyContent;
    const FRONTEND_URL = process.env.FRONTEND_URL || 'https://purplehere.com';

    if (type === 'trial_expired') {
      subject = `[PurpleHere] Trial expired - ${restaurant.name}`;
      title = 'Your Free Trial Has Ended';
      bodyContent = `
        <p style="color:#374151;font-size:14px;line-height:1.6;">Hi,</p>
        <p style="color:#374151;font-size:14px;line-height:1.6;">The free trial period for <strong>${restaurant.name}</strong> has ended.</p>
        <div style="background:#FEF3C7;padding:16px;border-radius:8px;margin:20px 0;border-left:4px solid #F59E0B;">
          <p style="color:#92400E;font-size:14px;margin:0;font-weight:600;">You have ${GRACE_PERIOD_DAYS} days to complete payment before your account is suspended.</p>
        </div>
        <p style="color:#374151;font-size:14px;line-height:1.6;">Please log in to your dashboard and complete the payment to continue using all features.</p>
        <div style="text-align:center;margin:24px 0;">
          <a href="${FRONTEND_URL}/pos" style="display:inline-block;background:#635BFF;color:#ffffff;padding:12px 32px;border-radius:6px;text-decoration:none;font-weight:600;font-size:15px;">Go to Dashboard</a>
        </div>`;
    } else if (type === 'suspended') {
      subject = `[PurpleHere] Account suspended - ${restaurant.name}`;
      title = 'Your Account Has Been Suspended';
      bodyContent = `
        <p style="color:#374151;font-size:14px;line-height:1.6;">Hi,</p>
        <p style="color:#374151;font-size:14px;line-height:1.6;">The account for <strong>${restaurant.name}</strong> has been suspended due to non-payment.</p>
        <div style="background:#FEE2E2;padding:16px;border-radius:8px;margin:20px 0;border-left:4px solid #EF4444;">
          <p style="color:#991B1B;font-size:14px;margin:0;font-weight:600;">Access to POS features has been restricted until payment is completed.</p>
        </div>
        <p style="color:#374151;font-size:14px;line-height:1.6;">To restore access, please log in and complete the outstanding payment.</p>
        <div style="text-align:center;margin:24px 0;">
          <a href="${FRONTEND_URL}/pos" style="display:inline-block;background:#635BFF;color:#ffffff;padding:12px 32px;border-radius:6px;text-decoration:none;font-weight:600;font-size:15px;">Go to Dashboard</a>
        </div>`;
    } else {
      return;
    }

    const html = emailLayout(`
      <h2 style="color:#0A2540;font-size:20px;font-weight:600;margin:0 0 16px;">${title}</h2>
      ${bodyContent}`);

    try {
      await sendIssuerEmail(issuerType, issuerId, {
        to: recipientEmail,
        subject,
        html,
        attachments: getLogoAttachment()
      });
      console.log(`[Subscription] Sent '${type}' email to ${recipientEmail} via ${issuerType} SMTP`);
    } catch (e) {
      console.error(`[Subscription] Email failed for ${restaurant.name}:`, e.message);
    }
  }

  /**
   * Send overdue invoice reminders at D+3, D+7, D+14
   * Sends to Restaurant Admin + Owner via issuer SMTP
   */
  async processOverdueReminders() {
    const REMINDER_DAYS = [3, 7, 14];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let sent = 0;

    try {
      // Find all overdue/pending_payment invoices with past due dates
      const overdueInvoices = await Invoice.findAll({
        where: {
          status: { [Op.in]: ['overdue', 'pending_payment'] },
          due_date: { [Op.lt]: today },
          invoice_category: { [Op.in]: ['subscription', 'pos_subscription', 'brand_plan', 'foodcourt_plan'] }
        },
        include: [{
          model: Restaurant,
          as: 'restaurant',
          attributes: ['id', 'name', 'email', 'brand_id', 'foodcourt_id'],
          where: { is_demo: { [Op.ne]: true }, is_test: { [Op.ne]: true } },
          required: false
        }]
      });

      for (const invoice of overdueInvoices) {
        try {
          const dueDate = new Date(invoice.due_date);
          dueDate.setHours(0, 0, 0, 0);
          const daysSinceDue = Math.floor((today - dueDate) / (1000 * 60 * 60 * 24));

          // Only send on exact reminder days
          if (!REMINDER_DAYS.includes(daysSinceDue)) continue;

          const recipientEmail = invoice.restaurant?.email || invoice.payer_email;
          if (!recipientEmail) continue;

          const restaurantName = invoice.restaurant?.name || invoice.payer_name || 'Customer';

          // Determine issuer
          let issuerType = 'system_admin';
          let issuerId = null;
          if (invoice.issuer_type === 'brand' && invoice.issuer_id) {
            issuerType = 'brand';
            issuerId = invoice.issuer_id;
          } else if (invoice.issuer_type === 'foodcourt' && invoice.issuer_id) {
            issuerType = 'foodcourt';
            issuerId = invoice.issuer_id;
          }

          const FRONTEND_URL = process.env.FRONTEND_URL || (process.env.NODE_ENV === 'production' ? 'https://purplehere.com' : 'https://dev.purplehere.com');
          const formattedAmount = `${invoice.currency || 'MYR'} ${Number(invoice.total_amount).toFixed(2)}`;
          const formattedDueDate = dueDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

          const urgencyColor = daysSinceDue >= 14 ? '#DC2626' : daysSinceDue >= 7 ? '#F59E0B' : '#635BFF';
          const urgencyBg = daysSinceDue >= 14 ? '#FEE2E2' : daysSinceDue >= 7 ? '#FEF3C7' : '#EEF2FF';
          const urgencyLabel = daysSinceDue >= 14 ? 'Final Notice' : daysSinceDue >= 7 ? 'Second Reminder' : 'Payment Reminder';

          const subject = `[PurpleHere] ${urgencyLabel} - Invoice #${invoice.invoice_number}`;
          const bodyContent = `
            <p style="color:#374151;font-size:14px;line-height:1.6;">Hi,</p>
            <p style="color:#374151;font-size:14px;line-height:1.6;">This is a reminder that Invoice <strong>#${invoice.invoice_number}</strong> for <strong>${restaurantName}</strong> is overdue.</p>
            <div style="background:${urgencyBg};padding:16px;border-radius:8px;margin:20px 0;border-left:4px solid ${urgencyColor};">
              <p style="color:${urgencyColor};font-size:14px;margin:0;font-weight:600;">${urgencyLabel} — ${daysSinceDue} days past due</p>
              <p style="color:#374151;font-size:14px;margin:8px 0 0;">Amount: <strong>${formattedAmount}</strong> | Due: ${formattedDueDate}</p>
            </div>
            ${daysSinceDue >= 14 ? '<p style="color:#DC2626;font-size:14px;line-height:1.6;font-weight:600;">Your account may be suspended if payment is not received soon.</p>' : ''}
            <p style="color:#374151;font-size:14px;line-height:1.6;">Please log in to complete the payment.</p>
            <div style="text-align:center;margin:24px 0;">
              <a href="${FRONTEND_URL}/pos" style="display:inline-block;background:#635BFF;color:#ffffff;padding:12px 32px;border-radius:6px;text-decoration:none;font-weight:600;font-size:15px;">Pay Now</a>
            </div>`;

          const html = emailLayout(`
            <h2 style="color:#0A2540;font-size:20px;font-weight:600;margin:0 0 16px;">${urgencyLabel}</h2>
            ${bodyContent}`);

          await sendIssuerEmail(issuerType, issuerId, {
            to: recipientEmail,
            subject,
            html,
            attachments: getLogoAttachment()
          });

          console.log(`[Reminder] D+${daysSinceDue} sent for invoice #${invoice.invoice_number} to ${recipientEmail}`);
          sent++;
        } catch (e) {
          console.error(`[Reminder] Error for invoice #${invoice.invoice_number}:`, e.message);
        }
      }
    } catch (error) {
      console.error('[Reminder] Error in processOverdueReminders:', error.message);
    }

    return { sent };
  }

  /**
   * Contract expiry reminders + auto-expire
   *
   * Rules:
   *   - Active contracts only (demo/test entities filtered)
   *   - daysUntilEnd < 0 → auto stage='expired' + history log
   *   - Reminder thresholds: renewal_alert_months (sets first "warning"), then 7 days (urgent)
   *     Example: renewal_alert_months=3 → 90 days → 7 days → 2 emails total
   *   - Uses contracts.last_expiry_notification_day to prevent duplicates
   *   - Dual emails: issuer team (all Brand General / Foodcourt General users) + applicant_email
   */
  async processContractExpiryReminders() {
    const { Contract, ContractHistory, Brand, Foodcourt, User } = require('../models');
    const { sendIssuerEmail, sendPlatformEmail } = require('../utils/emailService');
    const { contractExpiryIssuerEmail, contractExpiryApplicantEmail } = require('../utils/notificationTemplates');
    const { getLogoAttachment } = require('../utils/emailTemplates');

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let sent = 0;
    let expired = 0;

    try {
      // Fetch active contracts ending within next renewal_alert_months+ window (generous upper bound)
      const contracts = await Contract.findAll({
        where: {
          stage: 'active',
          end_date: { [Op.ne]: null }
        }
      });

      for (const contract of contracts) {
        try {
          const endDate = new Date(contract.end_date);
          endDate.setHours(0, 0, 0, 0);
          const daysUntil = Math.floor((endDate - today) / (1000 * 60 * 60 * 24));

          // Auto-expire past end_date
          if (daysUntil < 0) {
            await contract.update({ stage: 'expired' });
            await ContractHistory.create({
              contract_id: contract.id,
              action: 'stage_changed',
              from_value: 'active',
              to_value: 'expired',
              details: { auto: true, reason: 'end_date_passed' },
              changed_by: null
            });
            // Phase 2-C: match stage PUT logic — close ContractPlan.end_at and deactivate EPR.
            // Without this, expired contracts would keep billing indefinitely.
            try {
              const { ContractPlan, EntityPlanRestaurant } = require('../models');
              const closingLinks = await ContractPlan.findAll({
                where: { contract_id: contract.id, end_at: null }
              });
              if (contract.restaurant_id && closingLinks.length > 0) {
                const planIds = closingLinks.map(l => l.entity_plan_id);
                await EntityPlanRestaurant.update(
                  { is_active: false },
                  { where: { entity_plan_id: planIds, restaurant_id: contract.restaurant_id } }
                );
              }
              await ContractPlan.update(
                { end_at: new Date() },
                { where: { contract_id: contract.id, end_at: null } }
              );
            } catch (e) {
              console.error(`[ContractExpiry] Failed to close plan links for #${contract.id}:`, e.message);
            }
            expired++;
            console.log(`[ContractExpiry] Auto-expired #${contract.id} (${contract.contract_number})`);
            continue;
          }

          // Determine threshold
          const alertMonths = contract.renewal_alert_months ?? 3;
          const primaryThreshold = alertMonths * 30;
          const urgentThreshold = 7;

          let currentThreshold = null;
          if (daysUntil <= urgentThreshold) currentThreshold = urgentThreshold;
          else if (daysUntil <= primaryThreshold) currentThreshold = primaryThreshold;

          if (currentThreshold === null) continue; // not yet in window
          if (contract.last_expiry_notification_day === currentThreshold) continue; // already sent for this threshold

          // Load issuer entity + team + applicant info
          const isBrand = contract.entity_type === 'brand';
          const EntityModel = isBrand ? Brand : Foodcourt;
          const entity = await EntityModel.findByPk(contract.entity_id);
          if (!entity) continue;
          if (entity.is_demo || entity.is_test) continue; // demo/test filter

          // Issuer team: Brand General / Foodcourt General role users owning this entity
          const teamRole = isBrand ? 'Brand General' : 'Foodcourt General';
          const team = await User.findAll({
            where: {
              role: teamRole,
              [isBrand ? 'brand_id' : 'foodcourt_id']: contract.entity_id,
              is_demo: { [Op.ne]: true }
            }
          });

          // Ensure owner_id included (if not already a General user)
          if (entity.owner_id && !team.find(u => u.id === entity.owner_id)) {
            const owner = await User.findByPk(entity.owner_id);
            if (owner && !owner.is_demo) team.push(owner);
          }

          // Issuer emails — entity-branded
          const issuerEmail = contractExpiryIssuerEmail(contract.get({ plain: true }), daysUntil, 'en');
          for (const member of team) {
            if (!member.email) continue;
            try {
              await sendIssuerEmail(contract.entity_type, contract.entity_id, {
                to: member.email,
                subject: issuerEmail.subject,
                html: issuerEmail.html,
                text: issuerEmail.text,
                attachments: getLogoAttachment()
              });
              sent++;
            } catch (e) {
              console.error(`[ContractExpiry] issuer email fail (${member.email}):`, e.message);
            }
          }

          // Applicant email — separate, softer tone
          if (contract.applicant_email) {
            try {
              const issuerName = entity.company_name || entity.name || '';
              const applicantEmail = contractExpiryApplicantEmail(contract.get({ plain: true }), daysUntil, issuerName, 'en');
              await sendIssuerEmail(contract.entity_type, contract.entity_id, {
                to: contract.applicant_email,
                subject: applicantEmail.subject,
                html: applicantEmail.html,
                text: applicantEmail.text,
                attachments: getLogoAttachment()
              });
              sent++;
            } catch (e) {
              console.error(`[ContractExpiry] applicant email fail:`, e.message);
            }
          }

          await contract.update({ last_expiry_notification_day: currentThreshold });
          console.log(`[ContractExpiry] Reminder sent for #${contract.id} (D-${daysUntil}, threshold ${currentThreshold})`);
        } catch (e) {
          console.error(`[ContractExpiry] Error for contract #${contract.id}:`, e.message);
        }
      }
    } catch (error) {
      console.error('[ContractExpiry] Error:', error.message);
    }

    return { sent, expired };
  }

  /**
   * Send subscription status change email for entity users (Brand/Foodcourt/Owner)
   * Uses Platform SMTP since entity users don't have an issuer
   */
  async sendEntitySubscriptionEmail(user, entityType, type) {
    const recipientEmail = user.email;
    if (!recipientEmail) return;

    const displayName = user.name || user.username || 'User';
    const entityLabel = entityType === 'brand' ? 'Brand' : entityType === 'foodcourt' ? 'Foodcourt' : 'Owner';
    const FRONTEND_URL = process.env.FRONTEND_URL || (process.env.NODE_ENV === 'production' ? 'https://purplehere.com' : 'https://dev.purplehere.com');

    let subject, title, bodyContent;

    if (type === 'trial_expired') {
      subject = `[PurpleHere] Trial expired - ${entityLabel} Account`;
      title = 'Your Free Trial Has Ended';
      bodyContent = `
        <p style="color:#374151;font-size:14px;line-height:1.6;">Hi ${displayName},</p>
        <p style="color:#374151;font-size:14px;line-height:1.6;">The free trial period for your <strong>${entityLabel}</strong> account has ended.</p>
        <div style="background:#FEF3C7;padding:16px;border-radius:8px;margin:20px 0;border-left:4px solid #F59E0B;">
          <p style="color:#92400E;font-size:14px;margin:0;font-weight:600;">You have ${GRACE_PERIOD_DAYS} days to complete payment before your account is suspended.</p>
        </div>
        <p style="color:#374151;font-size:14px;line-height:1.6;">Please log in to your dashboard and complete the payment to continue using all features.</p>
        <div style="text-align:center;margin:24px 0;">
          <a href="${FRONTEND_URL}/pos" style="display:inline-block;background:#635BFF;color:#ffffff;padding:12px 32px;border-radius:6px;text-decoration:none;font-weight:600;font-size:15px;">Go to Dashboard</a>
        </div>`;
    } else if (type === 'suspended') {
      subject = `[PurpleHere] Account suspended - ${entityLabel} Account`;
      title = 'Your Account Has Been Suspended';
      bodyContent = `
        <p style="color:#374151;font-size:14px;line-height:1.6;">Hi ${displayName},</p>
        <p style="color:#374151;font-size:14px;line-height:1.6;">Your <strong>${entityLabel}</strong> account has been suspended due to non-payment.</p>
        <div style="background:#FEE2E2;padding:16px;border-radius:8px;margin:20px 0;border-left:4px solid #EF4444;">
          <p style="color:#991B1B;font-size:14px;margin:0;font-weight:600;">Access to management features has been restricted until payment is completed.</p>
        </div>
        <p style="color:#374151;font-size:14px;line-height:1.6;">To restore access, please log in and complete the outstanding payment.</p>
        <div style="text-align:center;margin:24px 0;">
          <a href="${FRONTEND_URL}/pos" style="display:inline-block;background:#635BFF;color:#ffffff;padding:12px 32px;border-radius:6px;text-decoration:none;font-weight:600;font-size:15px;">Go to Dashboard</a>
        </div>`;
    } else {
      return;
    }

    const { sendPlatformEmail } = require('../utils/emailService');

    const html = emailLayout(`
      <h2 style="color:#0A2540;font-size:20px;font-weight:600;margin:0 0 16px;">${title}</h2>
      ${bodyContent}`);

    try {
      await sendPlatformEmail({
        to: recipientEmail,
        subject,
        html,
        attachments: getLogoAttachment()
      });
      console.log(`[Subscription] Sent '${type}' email to ${recipientEmail} (${entityLabel} entity)`);
    } catch (e) {
      console.error(`[Subscription] Entity email failed for ${displayName}:`, e.message);
    }
  }

  stop() {
    this.jobs.forEach(job => job.stop());
    this.jobs.clear();
    console.log('Subscription scheduler stopped');
  }
}

module.exports = new SubscriptionScheduler();
module.exports.SubscriptionScheduler = SubscriptionScheduler;

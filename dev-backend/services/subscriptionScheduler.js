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
    console.log('✅ Subscription scheduler started - runs daily at 3 AM to check subscription statuses');

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

      const duration = ((Date.now() - startTime) / 1000).toFixed(2);
      console.log(`✅ [SUBSCRIPTION SCHEDULER] Completed in ${duration}s`);
      console.log(`   - Trial expired: ${trialResults.updated} restaurants`);
      console.log(`   - Grace period expired: ${graceResults.updated} restaurants`);
      console.log(`   - Overdue payments: ${paymentResults.updated} restaurants`);
      console.log(`   - Entity subscriptions: ${entityResults.updated} entities`);

      return {
        success: true,
        trialExpired: trialResults.updated,
        gracePeriodExpired: graceResults.updated,
        overduePayments: paymentResults.updated,
        duration
      };

    } catch (error) {
      console.error('❌ [SUBSCRIPTION SCHEDULER] Error processing subscriptions:', error);
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
            console.log(`✅ ${restaurant.name}: Trial -> Active (payment found)`);
          } else {
            // No payment, transition to Overdue with grace period
            await restaurant.update({
              status: 'overdue',
              grace_period_start: today
            });
            console.log(`⚠️ ${restaurant.name}: Trial -> Overdue (no payment found)`);
          }
          updated++;
        } catch (error) {
          console.error(`❌ Error processing trial expiry for ${restaurant.name}:`, error.message);
        }
      }

      return { updated, total: expiredTrials.length };

    } catch (error) {
      console.error('❌ Error in processTrialExpiry:', error);
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
            console.log(`✅ ${restaurant.name}: Overdue -> Active (payment found)`);
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
          }
          updated++;
        } catch (error) {
          console.error(`❌ Error processing grace period expiry for ${restaurant.name}:`, error.message);
        }
      }

      return { updated, total: expiredGracePeriods.length };

    } catch (error) {
      console.error('❌ Error in processGracePeriodExpiry:', error);
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
            updated++;
          }
        } catch (error) {
          console.error(`❌ Error checking overdue payments for ${restaurant.name}:`, error.message);
        }
      }

      return { updated };

    } catch (error) {
      console.error('❌ Error in processOverduePayments:', error);
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
              console.log(`✅ ${entityType} ${entity.name || entity.username}: Trial -> Active`);
            } else {
              await entity.update({ subscription_status: 'overdue', grace_period_start: today });
              console.log(`⚠️ ${entityType} ${entity.name || entity.username}: Trial -> Overdue`);
            }
            updated++;
          } else if (status === 'overdue' && entity.grace_period_start && new Date(entity.grace_period_start) <= graceCutoff) {
            const hasPaid = await this.hasEntityPaidInvoice(entity.id, entityType);
            if (hasPaid) {
              await entity.update({ subscription_status: 'active', grace_period_start: null });
              console.log(`✅ ${entityType} ${entity.name || entity.username}: Overdue -> Active`);
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
            }
            updated++;
          }
        } catch (e) {
          console.error(`❌ Error processing ${entityType} ${entity.id}:`, e.message);
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
      console.error('❌ Error in processEntitySubscriptions:', e.message);
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

      console.log(`✅ Subscription restored for ${restaurant.name}: ${restaurant.status} -> Active`);

      return { success: true, previousStatus: restaurant.status };

    } catch (error) {
      console.error('❌ Error restoring subscription:', error);
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

      console.log(`✅ Trial started for ${restaurant.name}: ends on ${trialEndDate.toISOString().split('T')[0]}`);

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
      console.error('❌ Error starting trial:', error);
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
      console.error('❌ Error getting subscription status:', error);
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

  stop() {
    this.jobs.forEach(job => job.stop());
    this.jobs.clear();
    console.log('Subscription scheduler stopped');
  }
}

module.exports = new SubscriptionScheduler();

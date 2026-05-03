// Invoice overdue scheduler — auto-transitions non-subscription invoices to 'overdue' when due_date passes.
//
// Scope: invoice_category ∈ {service, hardware, soa, po, ...} — anything except 'subscription'.
//   subscription invoices are handled by subscriptionScheduler.processOverduePayments()
//   (which also drives Restaurant.status active→overdue→suspended transitions).
//
// SOA children (parent_soa_invoice_id IS NOT NULL) are skipped — their status is
// driven by the parent SOA via finalizeInvoice cascade.
//
// Email: sends invoiceOverdueEmail at first transition. D+3/D+7/D+14 reminders are
// already sent by subscriptionScheduler.processOverdueReminders() for ALL invoice
// categories, so we don't duplicate that here.

const cron = require('node-cron');
const { Op } = require('sequelize');
const { Invoice, Restaurant, SchedulerRun, User } = require('../models');
const { sendNotification } = require('../utils/notificationService');
const { invoiceOverdueEmail } = require('../utils/notificationTemplates');
const logger = require('../utils/logger');

async function transitionOverdueInvoices() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let run;
  try {
    run = await SchedulerRun.create({
      job_name: 'invoice_overdue_daily',
      status: 'running',
      started_at: new Date()
    });
  } catch (e) {
    logger.warn('SchedulerRun.create failed:', e.message);
  }

  try {
    // pending_payment invoices past due, EXCEPT subscription (subscriptionScheduler covers those)
    // and EXCEPT SOA children (parent drives them).
    const candidates = await Invoice.findAll({
      where: {
        status: 'pending_payment',
        due_date: { [Op.lt]: today },
        invoice_category: { [Op.ne]: 'subscription' },
        parent_soa_invoice_id: null
      }
    });

    logger.info(`[InvoiceOverdueScheduler] ${candidates.length} non-subscription invoice(s) past due_date`);

    let transitioned = 0;
    let emailsSent = 0;
    const sample = [];

    for (const invoice of candidates) {
      try {
        await invoice.update({ status: 'overdue' });
        transitioned++;

        // Best-effort email (fire-and-forget). Resolve recipient by restaurant_id → admin.
        (async () => {
          try {
            if (!invoice.restaurant_id) return; // external/system payer — skip auto email here
            const restaurant = await Restaurant.findByPk(invoice.restaurant_id, {
              attributes: ['id', 'name', 'admin_id']
            });
            if (!restaurant?.admin_id) return;
            const admin = await User.findByPk(restaurant.admin_id, { attributes: ['id', 'email'] });
            if (!admin?.email) return;

            const mail = invoiceOverdueEmail(invoice, restaurant.name);
            await sendNotification(admin.id, 'invoice_overdue', mail);
            emailsSent++;
          } catch (e) {
            logger.warn(`[InvoiceOverdueScheduler] email failed for invoice ${invoice.id}:`, e.message);
          }
        })();

        if (sample.length < 5) {
          sample.push({
            id: invoice.id,
            invoice_number: invoice.invoice_number,
            category: invoice.invoice_category,
            due_date: invoice.due_date,
            restaurant_id: invoice.restaurant_id
          });
        }
      } catch (err) {
        logger.error(`[InvoiceOverdueScheduler] failed on invoice ${invoice.id}:`, err.message);
      }
    }

    logger.info(`[InvoiceOverdueScheduler] transitioned ${transitioned}/${candidates.length} → overdue`);

    if (run) {
      await run.update({
        status: 'success',
        finished_at: new Date(),
        results: {
          candidates: candidates.length,
          transitioned,
          emails_sent_async: emailsSent,
          sample
        }
      });
    }

    return { success: true, transitioned, candidates: candidates.length };
  } catch (err) {
    logger.error('[InvoiceOverdueScheduler] aggregation failed:', err.message);
    if (run) {
      await run.update({
        status: 'error',
        finished_at: new Date(),
        error_message: err.message
      });
    }
    return { success: false, error: err.message };
  }
}

function start() {
  // 매일 02:30 UTC — subscriptionScheduler (보통 03:00) 보다 30분 앞에 실행해서
  // restaurant.status 전환 시점에 invoice.status 가 이미 overdue 이도록.
  cron.schedule('30 2 * * *', () => {
    transitionOverdueInvoices();
  });
  logger.info('Invoice overdue scheduler started — runs at 02:30 UTC every day');
}

module.exports = { start, transitionOverdueInvoices };

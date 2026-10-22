// Invoice overdue scheduler — auto-transitions non-subscription invoices to 'overdue' when due_date passes.
//
// Scope: invoice_category ∈ {service, hardware, soa, po, ...} — anything except 'subscription'.
//   subscription invoices are handled by subscriptionScheduler.processOverduePayments()
//   (which also drives Restaurant.status active→overdue→suspended transitions).
//
// SOA children (parent_soa_invoice_id IS NOT NULL) are skipped — their status is
// driven by the parent SOA via finalizeInvoice cascade.
//
// Email: sends invoiceOverdueEmail at first transition — that is the ONLY mail these
// invoices produce. (2026-09-09 실측 정정: subscriptionScheduler.processOverdueReminders()
// 의 D+3/D+7/D+14 독촉은 invoice_category ∈ {subscription, pos_subscription, brand_plan,
// foodcourt_plan} 에만 나간다 — 'trade'·'service'·'hardware' 는 대상이 아니다.
// 종전 주석의 "ALL invoice categories" 는 사실과 달랐다.)
//
// 매장 정지와도 무관하다: processOverduePayments() 의 Restaurant.status
// active→overdue→suspended 전환은 invoice_category='subscription' 으로 한정돼 있다.

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
            const restaurant = await Restaurant.findByPk(invoice.restaurant_id, { attributes: ['id', 'name'] });
            if (!restaurant) return;
            // 2026-10-22 (Irene «권고대로»): 수신자 = 그 매장 관리자 전원 + 오너 — 다른 청구 메일 5곳과 같은 뜻.
            //   예전엔 restaurants.admin_id 한 명(2026-08-31 교정에서 빠진 자리)이라 관리자 2명 매장은 1명만,
            //   admin_id 가 비었거나 남의 매장 관리자를 가리키면 엉뚱하게 갔다.
            //   자격 «{매장} · 매장/오너» + 그 자격 청구서 화면 버튼.
            const { getRestaurantAddressees } = require('../utils/notificationService');
            const { goLink } = require('../utils/notificationLinks');
            const list = await getRestaurantAddressees(restaurant.id);
            if (!list.length) return;
            for (const r of list) {
              const mail = invoiceOverdueEmail(invoice, restaurant.name, { link: goLink(r.addressee, 'invoices') });
              await sendNotification(r.id, 'invoice_overdue', Object.assign(mail, { _addressee: r.addressee }));
            }
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

/**
 * Log Action Guides - Static mapping of service+level to actionable guidance
 */

interface ActionGuide {
  whatHappened: string;
  whatToDo: string[];
}

type GuideMap = Record<string, Record<string, ActionGuide>>;

const LOG_ACTION_GUIDES: GuideMap = {
  'server-health': {
    critical: {
      whatHappened: 'Production server health check failed or a critical threshold exceeded (disk >90%, CPU >95%, Nginx/MySQL down).',
      whatToDo: [
        'SSH to production: ssh irene@87.106.78.146',
        'Check services: systemctl status nginx / systemctl status mysql',
        'If down: systemctl restart nginx or systemctl restart mysql',
        'If disk full: df -h → clear old logs/backups',
        'If unresponsive: contact hosting provider',
      ],
    },
    error: {
      whatHappened: 'One or more PM2 processes stopped on the production server.',
      whatToDo: [
        'SSH to production: ssh irene@87.106.78.146',
        'Check processes: pm2 status',
        'Restart failed process: pm2 restart <name>',
        'Check process logs: pm2 logs <name> --lines 50',
      ],
    },
    warning: {
      whatHappened: 'Server resource usage exceeded 80% threshold (disk, memory, or CPU).',
      whatToDo: [
        'Monitor the trend over the next few hours',
        'If disk: schedule cleanup of old logs and backups',
        'If memory: check for memory leaks with pm2 monit',
        'If CPU: check if any scheduled task is consuming resources',
      ],
    },
  },

  'invoice-scheduler': {
    critical: {
      whatHappened: 'Invoice scheduler crashed entirely. No invoices were generated in this run.',
      whatToDo: [
        'Check backend logs: pm2 logs dev-backend --lines 100',
        'Verify database connectivity',
        'Scheduler retries on next cron run (daily at 2 AM)',
        'If persistent: pm2 restart dev-backend',
      ],
    },
    error: {
      whatHappened: 'Individual restaurant invoice generation failed.',
      whatToDo: [
        'Check error details for the specific restaurant/plan',
        'Verify restaurant subscription and plan settings',
        'The failed invoice can be manually created from Invoices page',
      ],
    },
    warning: {
      whatHappened: 'Invoice email notification failed to send (SMTP error).',
      whatToDo: [
        'Check SMTP settings in Admin > Notification Settings',
        'Verify the recipient email address is valid',
        'Invoice was created successfully, only email failed',
        'Resend email manually from the Invoices page',
      ],
    },
  },

  'subscription-scheduler': {
    error: {
      whatHappened: 'Subscription status check failed for one or more restaurants.',
      whatToDo: [
        'Check error details for the affected restaurant',
        'Verify the subscription plan settings',
        'Review the restaurant status in Admin > Restaurants',
      ],
    },
    warning: {
      whatHappened: 'Subscription status check found expiring subscriptions.',
      whatToDo: [
        'Review expiring subscriptions in Admin > Subscriptions',
        'Contact restaurant admins about renewal',
      ],
    },
  },

  'stripe': {
    error: {
      whatHappened: 'Stripe PaymentIntent creation or charge failed.',
      whatToDo: [
        'Check Stripe Dashboard (dashboard.stripe.com) for the payment status',
        'Verify Stripe API keys in Admin > Payment Settings',
        'Check if the customer card was declined',
        'Contact the restaurant to retry payment or use alternative method',
      ],
    },
    warning: {
      whatHappened: 'Stripe payment encountered a non-critical issue.',
      whatToDo: [
        'Check the payment status in Stripe Dashboard',
        'No immediate action needed unless customer reports an issue',
      ],
    },
  },

  'stripe-webhook': {
    error: {
      whatHappened: 'Stripe webhook signature verification failed or handler error.',
      whatToDo: [
        'Verify Webhook Secret in Admin > Payment Settings > Stripe',
        'Ensure webhook endpoint URL matches: /api/payment/stripe/webhook',
        'Check Stripe Dashboard > Developers > Webhooks for delivery failures',
      ],
    },
    warning: {
      whatHappened: 'Stripe webhook received but payment was not completed.',
      whatToDo: [
        'Check the invoice status in the Invoices page',
        'The payment may still be processing on Stripe side',
      ],
    },
  },

  'paypal': {
    error: {
      whatHappened: 'PayPal order creation or capture failed.',
      whatToDo: [
        'Check PayPal Dashboard for transaction status',
        'Verify PayPal API credentials in Admin > Payment Settings',
        'If capture failed: payment may be pending on PayPal side',
        'Contact restaurant to retry or use alternative payment',
      ],
    },
    warning: {
      whatHappened: 'PayPal transaction completed with unexpected status.',
      whatToDo: [
        'Check PayPal Dashboard for the order details',
        'Payment may be pending review',
        'No action needed unless customer reports an issue',
      ],
    },
  },

  'paypal-webhook': {
    error: {
      whatHappened: 'PayPal webhook handler encountered an error.',
      whatToDo: [
        'Check PayPal Developer Dashboard for webhook delivery status',
        'Verify webhook URL and event subscriptions',
        'Check the invoice status manually in Invoices page',
      ],
    },
    warning: {
      whatHappened: 'PayPal webhook received a payment denial or unexpected event.',
      whatToDo: [
        'Check the specific invoice status',
        'Contact the payer if payment was denied',
      ],
    },
  },

  'backup-service': {
    critical: {
      whatHappened: 'Database backup failed completely.',
      whatToDo: [
        'Verify disk space on backup destination',
        'Check database connectivity',
        'Run manual backup and check for errors',
        'Previous successful backups are still available',
      ],
    },
    error: {
      whatHappened: 'Backup process encountered an error.',
      whatToDo: [
        'Check error details for specific failure reason',
        'Verify backup storage permissions and disk space',
      ],
    },
    warning: {
      whatHappened: 'Backup completed but with warnings (slow or large size).',
      whatToDo: [
        'Monitor backup size trends',
        'Consider archiving or purging old data if backups grow too large',
      ],
    },
  },

  '_default': {
    critical: {
      whatHappened: 'A critical system error occurred.',
      whatToDo: [
        'Check error details below for specific information',
        'Check server logs: pm2 logs dev-backend --lines 100',
        'This requires immediate investigation',
      ],
    },
    error: {
      whatHappened: 'A system error occurred.',
      whatToDo: [
        'Review the error details below',
        'If recurring, investigate the root cause in service logs',
        'Check pm2 logs dev-backend for related errors',
      ],
    },
    warning: {
      whatHappened: 'A potential issue was detected.',
      whatToDo: [
        'Review the details below',
        'Monitor if the warning frequency increases',
        'Usually no immediate action needed',
      ],
    },
  },
};

export function getActionGuide(service: string, level: string): ActionGuide | null {
  return LOG_ACTION_GUIDES[service]?.[level] || LOG_ACTION_GUIDES['_default']?.[level] || null;
}

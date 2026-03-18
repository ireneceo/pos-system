/**
 * Invoice Email Template
 * Generates notification email for auto-generated invoices.
 * Uses shared emailLayout from emailTemplates.js for consistent branding.
 */

const { emailLayout } = require('./emailTemplates');

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric'
  });
}

function formatAmount(amount, currency) {
  return `${currency} ${parseFloat(amount).toFixed(2)}`;
}

/**
 * Generate invoice notification email content.
 * @param {Object} invoice - Invoice model instance
 * @param {Object} restaurant - Restaurant model instance
 * @param {string} baseUrl - Frontend base URL
 * @returns {{ subject: string, html: string, text: string }}
 */
function generateInvoiceNotificationEmail(invoice, restaurant, baseUrl) {
  const amount = formatAmount(invoice.total_amount, invoice.currency);
  const dueDate = formatDate(invoice.due_date);
  const periodStart = formatDate(invoice.billing_period_start);
  const periodEnd = formatDate(invoice.billing_period_end);
  const paymentUrl = `${baseUrl}/pos/invoices`;

  const subject = `Invoice ${invoice.invoice_number} - ${amount} Due ${dueDate}`;

  const bodyContent = `
    <p style="color: #374151; font-size: 16px; margin: 0 0 24px;">
      Dear <strong>${restaurant.name}</strong>,
    </p>
    <p style="color: #6B7280; font-size: 14px; margin: 0 0 24px;">
      A new invoice has been generated for your account. Please review the details below and arrange payment before the due date.
    </p>
    <table style="width: 100%; border-collapse: collapse; margin: 0 0 24px; border: 1px solid #E5E7EB; border-radius: 8px;">
      <tr style="background: #F9FAFB;">
        <td style="padding: 12px 16px; font-size: 14px; color: #6B7280; border-bottom: 1px solid #E5E7EB; width: 40%;">Invoice Number</td>
        <td style="padding: 12px 16px; font-size: 14px; color: #111827; font-weight: 600; border-bottom: 1px solid #E5E7EB;">${invoice.invoice_number}</td>
      </tr>
      <tr>
        <td style="padding: 12px 16px; font-size: 14px; color: #6B7280; border-bottom: 1px solid #E5E7EB;">Amount</td>
        <td style="padding: 12px 16px; font-size: 18px; color: #635BFF; font-weight: 700; border-bottom: 1px solid #E5E7EB;">${amount}</td>
      </tr>
      <tr style="background: #F9FAFB;">
        <td style="padding: 12px 16px; font-size: 14px; color: #6B7280; border-bottom: 1px solid #E5E7EB;">Billing Period</td>
        <td style="padding: 12px 16px; font-size: 14px; color: #111827; border-bottom: 1px solid #E5E7EB;">${periodStart} - ${periodEnd}</td>
      </tr>
      <tr>
        <td style="padding: 12px 16px; font-size: 14px; color: #6B7280;">Due Date</td>
        <td style="padding: 12px 16px; font-size: 14px; color: #DC2626; font-weight: 600;">${dueDate}</td>
      </tr>
    </table>
    <div style="text-align: center; margin: 32px 0;">
      <a href="${paymentUrl}" style="display: inline-block; background: #635BFF; color: #ffffff; padding: 14px 36px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
        View & Pay Invoice
      </a>
    </div>`;

  const html = emailLayout(bodyContent);

  const text = [
    `Invoice Notification`,
    ``,
    `Dear ${restaurant.name},`,
    ``,
    `A new invoice has been generated for your account.`,
    ``,
    `Invoice Number: ${invoice.invoice_number}`,
    `Amount: ${amount}`,
    `Billing Period: ${periodStart} - ${periodEnd}`,
    `Due Date: ${dueDate}`,
    ``,
    `View and pay: ${paymentUrl}`,
    ``,
    `This is an automatically generated invoice.`
  ].join('\n');

  return { subject, html, text };
}

module.exports = { generateInvoiceNotificationEmail };

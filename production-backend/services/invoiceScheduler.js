const cron = require('node-cron');
const Invoice = require('../models/Invoice');
const InvoiceItem = require('../models/InvoiceItem');
const InvoiceSettings = require('../models/InvoiceSettings');
const Order = require('../models/Order');
const { Op } = require('sequelize');

class InvoiceScheduler {
  constructor() {
    this.jobs = new Map();
  }

  start() {
    // Run on the 1st day of every month at 2 AM to generate subscription invoices
    cron.schedule('0 2 1 * *', async () => {
      console.log('Running monthly subscription invoice generation on 1st of month...');
      await this.generateMonthlyInvoices();
    });

    console.log('Invoice scheduler started - will run on 1st of every month at 2 AM');
  }

  async checkAndGenerateInvoices() {
    try {
      const today = new Date();
      const currentDay = today.getDate();

      // Get all auto-generate enabled settings
      const settings = await InvoiceSettings.findAll({
        where: {
          auto_generate: true,
          generation_day: currentDay
        }
      });

      for (const setting of settings) {
        await this.generateInvoiceForRestaurant(setting.restaurant_id, setting);
      }
    } catch (error) {
      console.error('Error in checkAndGenerateInvoices:', error);
    }
  }

  async generateMonthlyInvoices() {
    try {
      // Get all auto-generate enabled settings for end of month
      const settings = await InvoiceSettings.findAll({
        where: {
          auto_generate: true,
          generation_day: {
            [Op.gte]: 29 // For days 29-31, generate on last day
          }
        }
      });

      for (const setting of settings) {
        await this.generateInvoiceForRestaurant(setting.restaurant_id, setting);
      }
    } catch (error) {
      console.error('Error in generateMonthlyInvoices:', error);
    }
  }

  async generateInvoiceForRestaurant(restaurantId, settings) {
    try {
      const now = new Date();
      const billingStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const billingEnd = new Date(now.getFullYear(), now.getMonth(), 0);
      const dueDate = new Date(now.getFullYear(), now.getMonth(), settings.payment_terms);

      // Check if invoice already exists for this period
      const existingInvoice = await Invoice.findOne({
        where: {
          restaurant_id: restaurantId,
          billing_period_start: billingStart,
          billing_period_end: billingEnd,
          type: 'automatic'
        }
      });

      if (existingInvoice) {
        console.log(`Invoice already exists for restaurant ${restaurantId} for period ${billingStart.toISOString().split('T')[0]} to ${billingEnd.toISOString().split('T')[0]}`);
        return;
      }

      // Calculate monthly sales if needed for percentage-based rent
      let monthlySales = 0;
      if (settings.rent_enabled && (settings.rent_type === 'percentage' || settings.rent_type === 'combined')) {
        const orders = await Order.findAll({
          where: {
            restaurant_id: restaurantId,
            status: 'completed',
            createdAt: {
              [Op.between]: [billingStart, billingEnd]
            }
          }
        });
        
        monthlySales = orders.reduce((sum, order) => sum + parseFloat(order.total_amount), 0);
      }

      // Generate invoice number
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const count = await Invoice.count({
        where: {
          invoice_number: {
            [Op.like]: `${settings.invoice_prefix}-${year}${month}%`
          }
        }
      });
      
      const invoiceNumber = `${settings.invoice_prefix}-${year}${month}${String(count + 1).padStart(4, '0')}`;

      // Calculate items and amounts
      const items = [];
      let totalAmount = 0;

      // Solution fee
      if (settings.solution_fee_enabled && settings.solution_fee_amount) {
        const solutionFee = {
          item_type: 'solution_fee',
          description: 'POS System Monthly Subscription',
          calculation_method: 'fixed',
          fixed_amount: parseFloat(settings.solution_fee_amount),
          calculated_amount: parseFloat(settings.solution_fee_amount),
          tax_rate: parseFloat(settings.tax_rate),
          tax_amount: parseFloat(settings.solution_fee_amount) * (parseFloat(settings.tax_rate) / 100),
          total_amount: parseFloat(settings.solution_fee_amount) * (1 + parseFloat(settings.tax_rate) / 100)
        };
        items.push(solutionFee);
        totalAmount += solutionFee.total_amount;
      }

      // Rent calculation
      if (settings.rent_enabled) {
        let rentAmount = 0;
        let description = '';
        
        if (settings.rent_type === 'fixed') {
          rentAmount = parseFloat(settings.rent_fixed_amount);
          description = 'Monthly Rent (Fixed)';
        } else if (settings.rent_type === 'percentage') {
          rentAmount = monthlySales * (parseFloat(settings.rent_percentage_rate) / 100);
          description = `Monthly Rent (${settings.rent_percentage_rate}% of $${monthlySales.toFixed(2)} sales)`;
        } else if (settings.rent_type === 'combined') {
          const percentageAmount = monthlySales * (parseFloat(settings.rent_percentage_rate) / 100);
          rentAmount = Math.max(parseFloat(settings.rent_minimum_amount), percentageAmount);
          const isMinimum = rentAmount === parseFloat(settings.rent_minimum_amount);
          description = `Monthly Rent (${isMinimum ? 'Minimum' : settings.rent_percentage_rate + '% of sales'}: $${rentAmount.toFixed(2)})`;
        }
        
        if (rentAmount > 0) {
          const rentItem = {
            item_type: `rent_${settings.rent_type}`,
            description,
            calculation_method: settings.rent_type,
            fixed_amount: settings.rent_type === 'fixed' ? rentAmount : null,
            percentage_rate: settings.rent_type !== 'fixed' ? parseFloat(settings.rent_percentage_rate) : null,
            base_amount: settings.rent_type !== 'fixed' ? monthlySales : null,
            minimum_amount: settings.rent_type === 'combined' ? parseFloat(settings.rent_minimum_amount) : null,
            calculated_amount: rentAmount,
            tax_rate: parseFloat(settings.tax_rate),
            tax_amount: rentAmount * (parseFloat(settings.tax_rate) / 100),
            total_amount: rentAmount * (1 + parseFloat(settings.tax_rate) / 100)
          };
          items.push(rentItem);
          totalAmount += rentItem.total_amount;
        }
      }

      // Additional fees from JSON configuration
      if (settings.additional_fees && Array.isArray(settings.additional_fees)) {
        settings.additional_fees.forEach(fee => {
          const feeAmount = parseFloat(fee.amount);
          const taxRate = parseFloat(fee.tax_rate || settings.tax_rate);
          const feeItem = {
            item_type: fee.type || 'other',
            description: fee.description,
            calculation_method: 'fixed',
            fixed_amount: feeAmount,
            calculated_amount: feeAmount,
            tax_rate: taxRate,
            tax_amount: feeAmount * (taxRate / 100),
            total_amount: feeAmount * (1 + taxRate / 100)
          };
          items.push(feeItem);
          totalAmount += feeItem.total_amount;
        });
      }

      if (items.length === 0) {
        console.log(`No items to invoice for restaurant ${restaurantId}`);
        return;
      }

      // Create invoice
      const invoice = await Invoice.create({
        restaurant_id: restaurantId,
        invoice_number: invoiceNumber,
        type: 'automatic',
        billing_period_start: billingStart,
        billing_period_end: billingEnd,
        due_date: dueDate,
        total_amount: totalAmount,
        status: 'sent',
        notes: settings.notes_template || 'Automatically generated monthly invoice',
        issued_by: 0, // System generated
        issued_at: new Date()
      });

      // Create invoice items
      const invoiceItems = items.map(item => ({
        ...item,
        invoice_id: invoice.id
      }));
      await InvoiceItem.bulkCreate(invoiceItems);

      console.log(`Successfully generated invoice ${invoiceNumber} for restaurant ${restaurantId}`);
      
      // Here you could add email notification logic
      await this.sendInvoiceNotification(invoice, restaurantId);
      
    } catch (error) {
      console.error(`Error generating invoice for restaurant ${restaurantId}:`, error);
    }
  }

  async sendInvoiceNotification(invoice, restaurantId) {
    // TODO: Implement email notification
    // This would typically use a service like SendGrid, AWS SES, etc.
    console.log(`Invoice notification would be sent for invoice ${invoice.invoice_number} to restaurant ${restaurantId}`);
  }

  stop() {
    // Stop all cron jobs if needed
    this.jobs.forEach(job => job.stop());
    this.jobs.clear();
    console.log('Invoice scheduler stopped');
  }
}

module.exports = new InvoiceScheduler();
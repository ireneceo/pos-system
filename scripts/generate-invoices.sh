#!/bin/bash
# 구독 인보이스 자동 생성 스크립트
# 크론: 매월 1일 오전 1시 실행

LOG_FILE="/var/www/logs/invoice-generation.log"
DATE=$(date '+%Y-%m-%d %H:%M:%S')

echo "[$DATE] Starting invoice generation..." >> $LOG_FILE

cd /var/www/dev-backend

node << 'SCRIPT' >> $LOG_FILE 2>&1
require('dotenv').config();
const db = require('./config/database');
const Invoice = require('./models/Invoice');
const InvoiceItem = require('./models/InvoiceItem');
const Restaurant = require('./models/Restaurant');
const PlanPrice = require('./models/PlanPrice');
const PlanTemplate = require('./models/PlanTemplate');
const { Op } = require('sequelize');

async function generateInvoices() {
  await db.sequelize.authenticate();

  const now = new Date();
  console.log('Current date:', now.toISOString());

  // 활성 구독 레스토랑 조회
  const restaurants = await Restaurant.findAll({
    where: {
      status: 'active',
      subscription_start: { [Op.not]: null },
      subscription_end: { [Op.gte]: now }
    }
  });

  console.log('Found', restaurants.length, 'active restaurants with subscriptions');
  let created = 0;
  let skipped = 0;

  for (const restaurant of restaurants) {
    const subscriptionStart = new Date(restaurant.subscription_start);
    const billingCycle = restaurant.billing_cycle || 'monthly';
    const anchorDay = subscriptionStart.getDate();

    // 이번 달 인보이스 기간 계산
    let billingStart, billingEnd;

    if (billingCycle === 'annual') {
      billingStart = new Date(subscriptionStart);
      billingEnd = new Date(subscriptionStart);
      billingEnd.setFullYear(billingEnd.getFullYear() + 1);
      billingEnd.setDate(billingEnd.getDate() - 1);
    } else {
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();
      const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
      const adjustedAnchor = Math.min(anchorDay, daysInMonth);

      billingStart = new Date(currentYear, currentMonth, adjustedAnchor);

      const nextMonth = currentMonth + 1;
      const nextYear = nextMonth > 11 ? currentYear + 1 : currentYear;
      const actualNextMonth = nextMonth > 11 ? 0 : nextMonth;
      const daysInNextMonth = new Date(nextYear, actualNextMonth + 1, 0).getDate();
      const nextAnchor = Math.min(anchorDay, daysInNextMonth);

      billingEnd = new Date(nextYear, actualNextMonth, nextAnchor - 1);
    }

    // 이미 존재하는지 확인
    const existing = await Invoice.findOne({
      where: {
        restaurant_id: restaurant.id,
        billing_period_start: billingStart,
        billing_period_end: billingEnd
      }
    });

    if (existing) {
      skipped++;
      continue;
    }

    // 인보이스 번호 생성
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const count = await Invoice.count({
      where: { invoice_number: { [Op.like]: 'INV-' + year + month + '%' } }
    });
    const invoiceNumber = 'INV-' + year + month + String(count + 1).padStart(4, '0');

    // 가격 계산
    let currency = restaurant.currency || 'MYR';
    if (currency === 'RM') currency = 'MYR';

    let planAmount = parseFloat(restaurant.plan_amount || 99);

    const planTemplate = await PlanTemplate.findOne({
      where: { display_name: restaurant.plan_type }
    });

    if (planTemplate) {
      const planPrice = await PlanPrice.findOne({
        where: { plan_id: planTemplate.id, currency: currency, is_active: true }
      });

      if (planPrice) {
        planAmount = billingCycle === 'annual'
          ? parseFloat(planPrice.annual_price)
          : parseFloat(planPrice.monthly_price);
      }
    }

    const taxRate = 0.06;
    const taxAmount = planAmount * taxRate;
    const totalAmount = planAmount + taxAmount;

    // 인보이스 생성
    const invoice = await Invoice.create({
      restaurant_id: restaurant.id,
      invoice_number: invoiceNumber,
      type: 'automatic',
      billing_period_start: billingStart,
      billing_period_end: billingEnd,
      due_date: billingStart,
      total_amount: totalAmount,
      currency: currency,
      status: 'pending_payment',
      notes: (billingCycle === 'annual' ? 'Annual' : 'Monthly') + ' subscription - ' + restaurant.plan_type,
      issued_by: 0,
      issued_at: now,
      issuer_type: 'system_admin',
      payer_type: 'restaurant',
      payer_id: null
    });

    await InvoiceItem.create({
      invoice_id: invoice.id,
      item_type: 'subscription',
      description: restaurant.plan_type + ' - ' + (billingCycle === 'annual' ? 'Annual' : 'Monthly') + ' Subscription',
      calculation_method: 'fixed',
      fixed_amount: planAmount,
      calculated_amount: planAmount,
      tax_rate: taxRate * 100,
      tax_amount: taxAmount,
      total_amount: totalAmount
    });

    console.log('Created:', invoiceNumber, 'for', restaurant.name);
    created++;
  }

  console.log('Summary: Created', created, ', Skipped (existing)', skipped);
  process.exit(0);
}

generateInvoices().catch(e => {
  console.error('Error:', e.message);
  process.exit(1);
});
SCRIPT

echo "[$DATE] Invoice generation completed" >> $LOG_FILE

const database = require('./config/database');
require('./models'); // Load associations
const User = require('./models/User');
const Restaurant = require('./models/Restaurant');
const Invoice = require('./models/Invoice');
const InvoiceItem = require('./models/InvoiceItem');
const Order = require('./models/Order');

async function addHistoricalData() {
  try {
    console.log('📅 Adding historical data...');

    // Add more restaurants
    console.log('🏪 Adding more restaurants...');
    const additionalRestaurants = await Restaurant.bulkCreate([
      {
        id: 5,
        name: 'Thai Delights',
        admin_id: 2,
        admin_name: 'Somchai Patel',
        email: 'admin@thaidelights.com',
        phone: '+60123456793',
        address: 'Chinatown, Kuala Lumpur',
        plan_type: 'Professional Plan',
        plan_amount: 599.00,
        status: 'active',
        subscription_start: new Date('2023-06-01'),
        subscription_end: new Date('2024-06-01'),
        created_by: 2
      },
      {
        id: 6,
        name: 'Indian Curry House',
        admin_id: 2,
        admin_name: 'Raj Patel',
        email: 'admin@curryhouse.com',
        phone: '+60123456794',
        address: 'Little India, Kuala Lumpur',
        plan_type: 'Basic Plan',
        plan_amount: 299.00,
        status: 'cancelled',
        subscription_start: new Date('2023-03-01'),
        subscription_end: new Date('2024-03-01'),
        created_by: 2
      }
    ]);
    console.log(`✅ Added ${additionalRestaurants.length} more restaurants`);

    // Add historical invoices (2023-2024)
    console.log('📄 Adding historical invoices...');
    const historicalInvoices = await Invoice.bulkCreate([
      // 2023 invoices
      {
        id: 5,
        restaurant_id: 1,
        invoice_number: 'INV-2023-M001',
        type: 'automatic',
        billing_period_start: new Date('2023-01-01'),
        billing_period_end: new Date('2023-01-31'),
        due_date: new Date('2023-01-31'),
        total_amount: 316.94,
        paid_amount: 316.94,
        status: 'paid',
        notes: 'Monthly subscription invoice',
        issued_by: 2,
        issued_at: new Date('2023-01-01'),
        paid_at: new Date('2023-01-28'),
        payment_method: 'bank_transfer',
        transaction_id: 'TXN2023001'
      },
      {
        id: 6,
        restaurant_id: 2,
        invoice_number: 'INV-2023-M002',
        type: 'automatic',
        billing_period_start: new Date('2023-02-01'),
        billing_period_end: new Date('2023-02-28'),
        due_date: new Date('2023-02-28'),
        total_amount: 634.94,
        paid_amount: 634.94,
        status: 'paid',
        notes: 'Monthly subscription invoice',
        issued_by: 2,
        issued_at: new Date('2023-02-01'),
        paid_at: new Date('2023-02-25'),
        payment_method: 'bank_transfer',
        transaction_id: 'TXN2023002'
      },
      // 2024 invoices for multiple months
      {
        id: 7,
        restaurant_id: 5,
        invoice_number: 'INV-2024-M001',
        type: 'automatic',
        billing_period_start: new Date('2024-06-01'),
        billing_period_end: new Date('2024-06-30'),
        due_date: new Date('2024-06-30'),
        total_amount: 634.94,
        paid_amount: 634.94,
        status: 'paid',
        notes: 'Monthly subscription invoice',
        issued_by: 2,
        issued_at: new Date('2024-06-01'),
        paid_at: new Date('2024-06-28'),
        payment_method: 'bank_transfer',
        transaction_id: 'TXN2024001'
      },
      {
        id: 8,
        restaurant_id: 5,
        invoice_number: 'INV-2024-M002',
        type: 'automatic',
        billing_period_start: new Date('2024-11-01'),
        billing_period_end: new Date('2024-11-30'),
        due_date: new Date('2024-11-30'),
        total_amount: 634.94,
        paid_amount: 634.94,
        status: 'paid',
        notes: 'Monthly subscription invoice',
        issued_by: 2,
        issued_at: new Date('2024-11-01'),
        paid_at: new Date('2024-11-25'),
        payment_method: 'bank_transfer',
        transaction_id: 'TXN2024002'
      },
      // Cancelled restaurant invoices
      {
        id: 9,
        restaurant_id: 6,
        invoice_number: 'INV-2023-M101',
        type: 'automatic',
        billing_period_start: new Date('2023-03-01'),
        billing_period_end: new Date('2023-03-31'),
        due_date: new Date('2023-03-31'),
        total_amount: 316.94,
        paid_amount: 316.94,
        status: 'paid',
        notes: 'Monthly subscription invoice',
        issued_by: 2,
        issued_at: new Date('2023-03-01'),
        paid_at: new Date('2023-03-30'),
        payment_method: 'bank_transfer',
        transaction_id: 'TXN2023101'
      },
      {
        id: 10,
        restaurant_id: 6,
        invoice_number: 'INV-2024-M102',
        type: 'manual',
        billing_period_start: new Date('2024-02-01'),
        billing_period_end: new Date('2024-02-29'),
        due_date: new Date('2024-02-29'),
        total_amount: 316.94,
        paid_amount: 0,
        status: 'cancelled',
        notes: 'Final invoice before cancellation',
        issued_by: 2,
        issued_at: new Date('2024-02-01')
      }
    ]);
    console.log(`✅ Added ${historicalInvoices.length} historical invoices`);

    // Add corresponding invoice items
    console.log('📝 Adding historical invoice items...');
    const historicalItems = await InvoiceItem.bulkCreate([
      {
        invoice_id: 5,
        item_type: 'subscription',
        description: 'Basic Plan - Monthly Subscription (Jan 2023)',
        calculation_method: 'fixed',
        fixed_amount: 299.00,
        calculated_amount: 299.00,
        tax_rate: 6.0,
        tax_amount: 17.94,
        total_amount: 316.94
      },
      {
        invoice_id: 6,
        item_type: 'subscription',
        description: 'Professional Plan - Monthly Subscription (Feb 2023)',
        calculation_method: 'fixed',
        fixed_amount: 599.00,
        calculated_amount: 599.00,
        tax_rate: 6.0,
        tax_amount: 35.94,
        total_amount: 634.94
      },
      {
        invoice_id: 7,
        item_type: 'subscription',
        description: 'Professional Plan - Monthly Subscription (Jun 2024)',
        calculation_method: 'fixed',
        fixed_amount: 599.00,
        calculated_amount: 599.00,
        tax_rate: 6.0,
        tax_amount: 35.94,
        total_amount: 634.94
      },
      {
        invoice_id: 8,
        item_type: 'subscription',
        description: 'Professional Plan - Monthly Subscription (Nov 2024)',
        calculation_method: 'fixed',
        fixed_amount: 599.00,
        calculated_amount: 599.00,
        tax_rate: 6.0,
        tax_amount: 35.94,
        total_amount: 634.94
      },
      {
        invoice_id: 9,
        item_type: 'subscription',
        description: 'Basic Plan - Monthly Subscription (Mar 2023)',
        calculation_method: 'fixed',
        fixed_amount: 299.00,
        calculated_amount: 299.00,
        tax_rate: 6.0,
        tax_amount: 17.94,
        total_amount: 316.94
      },
      {
        invoice_id: 10,
        item_type: 'subscription',
        description: 'Basic Plan - Monthly Subscription (Feb 2024)',
        calculation_method: 'fixed',
        fixed_amount: 299.00,
        calculated_amount: 299.00,
        tax_rate: 6.0,
        tax_amount: 17.94,
        total_amount: 316.94
      }
    ]);
    console.log(`✅ Added ${historicalItems.length} historical invoice items`);

    // Add more order history
    console.log('🛍️ Adding historical orders...');
    const historicalOrders = await Order.bulkCreate([
      // 2023 orders
      {
        id: 4,
        restaurant_id: 1,
        order_number: 'ORD-2023-001',
        customer_name: 'Hassan Ali',
        table_number: 'A3',
        total_amount: 18.50,
        status: 'completed',
        order_type: 'dine_in',
        payment_method: 'cash',
        order_date: new Date('2023-06-15')
      },
      {
        id: 5,
        restaurant_id: 2,
        order_number: 'ORD-2023-002',
        customer_name: 'Michelle Tan',
        table_number: 'B1',
        total_amount: 35.80,
        status: 'completed',
        order_type: 'dine_in',
        payment_method: 'card',
        order_date: new Date('2023-08-20')
      },
      // 2024 orders
      {
        id: 6,
        restaurant_id: 5,
        order_number: 'ORD-2024-001',
        customer_name: 'Priya Sharma',
        table_number: 'C2',
        total_amount: 28.90,
        status: 'completed',
        order_type: 'takeaway',
        payment_method: 'card',
        order_date: new Date('2024-11-10')
      },
      {
        id: 7,
        restaurant_id: 6,
        order_number: 'ORD-2024-002',
        customer_name: 'Kumar Singh',
        table_number: 'D1',
        total_amount: 22.50,
        status: 'completed',
        order_type: 'dine_in',
        payment_method: 'cash',
        order_date: new Date('2024-02-05')
      }
    ]);
    console.log(`✅ Added ${historicalOrders.length} historical orders`);

    console.log('🎉 Historical data added successfully!');
    
    // Display summary
    console.log('\n📊 UPDATED SUMMARY:');
    const totalUsers = await User.count();
    const totalRestaurants = await Restaurant.count();
    const totalInvoices = await Invoice.count();
    const totalItems = await InvoiceItem.count();
    const totalOrders = await Order.count();
    
    console.log(`Users: ${totalUsers}`);
    console.log(`Restaurants: ${totalRestaurants}`);
    console.log(`Invoices: ${totalInvoices}`);
    console.log(`Invoice Items: ${totalItems}`);
    console.log(`Orders: ${totalOrders}`);

  } catch (error) {
    console.error('❌ Error adding historical data:', error);
  } finally {
    await database.sequelize.close();
  }
}

// Run the script
addHistoricalData();
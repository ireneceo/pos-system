const database = require('./config/database');

async function fixInvoiceStatusEnum() {
  try {
    console.log('🔧 Fixing invoice status enum...');

    // First, update any existing 'sent' status to 'pending_payment'
    await database.sequelize.query(
      "UPDATE invoices SET status = 'pending_payment' WHERE status = 'sent'"
    );
    console.log('✓ Updated existing "sent" status to "pending_payment"');

    // Drop and recreate the enum with correct values
    await database.sequelize.query(
      "ALTER TABLE invoices MODIFY COLUMN status ENUM('draft', 'pending_payment', 'payment_submitted', 'paid', 'overdue', 'cancelled') DEFAULT 'draft'"
    );
    console.log('✓ Updated invoice status enum with correct values');

    // Verify the change
    const [results] = await database.sequelize.query(
      "SHOW COLUMNS FROM invoices LIKE 'status'"
    );
    console.log('📊 New status column definition:', results[0]);

    // Check current statuses
    const [statuses] = await database.sequelize.query(
      "SELECT DISTINCT status FROM invoices"
    );
    console.log('📋 Current status values in database:', statuses.map(s => s.status));

    process.exit(0);
  } catch (error) {
    console.error('✗ Error fixing invoice status enum:', error);
    process.exit(1);
  }
}

fixInvoiceStatusEnum();
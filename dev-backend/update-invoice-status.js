const database = require('./config/database');

async function updateInvoiceStatus() {
  try {
    console.log('📝 Updating invoice table structure and status...');

    // First, add the new status values to the ENUM
    console.log('1️⃣ Updating ENUM column to include new status values...');
    await database.sequelize.query(
      "ALTER TABLE invoices MODIFY COLUMN status ENUM('draft', 'sent', 'pending_payment', 'payment_submitted', 'paid', 'overdue', 'cancelled') DEFAULT 'draft'"
    );

    // Then update all 'sent' status to 'pending_payment'
    console.log('2️⃣ Updating sent status to pending_payment...');
    const [results] = await database.sequelize.query(
      "UPDATE invoices SET status = 'pending_payment' WHERE status = 'sent'"
    );

    // Finally, remove 'sent' from ENUM
    console.log('3️⃣ Removing sent from ENUM...');
    await database.sequelize.query(
      "ALTER TABLE invoices MODIFY COLUMN status ENUM('draft', 'pending_payment', 'payment_submitted', 'paid', 'overdue', 'cancelled') DEFAULT 'draft'"
    );

    console.log('✅ Invoice status updated successfully');

    // Show current status distribution
    const [statusCount] = await database.sequelize.query(
      "SELECT status, COUNT(*) as count FROM invoices GROUP BY status"
    );

    console.log('📊 Current invoice status distribution:');
    statusCount.forEach(row => {
      console.log(`   ${row.status}: ${row.count}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error updating invoice status:', error);
    process.exit(1);
  }
}

updateInvoiceStatus();
const database = require('./config/database');

async function fixEmptyStatus() {
  try {
    console.log('📝 Fixing empty invoice status...');

    // Check for empty statuses
    const [emptyCount] = await database.sequelize.query(
      "SELECT COUNT(*) as count FROM invoices WHERE status = '' OR status IS NULL"
    );

    console.log(`Found ${emptyCount[0].count} invoices with empty status`);

    // Update empty statuses to pending_payment
    if (emptyCount[0].count > 0) {
      await database.sequelize.query(
        "UPDATE invoices SET status = 'pending_payment' WHERE status = '' OR status IS NULL"
      );
      console.log('✅ Updated empty statuses to pending_payment');
    }

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
    console.error('❌ Error fixing invoice status:', error);
    process.exit(1);
  }
}

fixEmptyStatus();
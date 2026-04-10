const database = require('./config/database');

async function checkSpecificInvoice() {
  try {
    console.log('📝 Checking specific invoices...');

    // Check invoices with these specific numbers
    const [invoices] = await database.sequelize.query(
      "SELECT * FROM invoices WHERE invoice_number IN ('INV-2025090003', 'INV-2025090006') OR invoice_number LIKE 'INV-202509%'"
    );

    console.log('\n📊 Found Invoices:');
    console.log('================================');
    invoices.forEach(invoice => {
      console.log(`\nInvoice: ${invoice.invoice_number}`);
      console.log(`  ID: ${invoice.id}`);
      console.log(`  Status: "${invoice.status}"`);
      console.log(`  Restaurant ID: ${invoice.restaurant_id}`);
      console.log(`  Total: ${invoice.total_amount}`);
      console.log(`  Due Date: ${invoice.due_date}`);
    });

    // Check if there are any invoices with null or empty status
    const [emptyStatus] = await database.sequelize.query(
      "SELECT id, invoice_number, status, LENGTH(status) as status_length FROM invoices WHERE status IS NULL OR status = '' OR LENGTH(status) = 0"
    );

    if (emptyStatus.length > 0) {
      console.log('\n⚠️ Invoices with Empty Status:');
      console.log('================================');
      emptyStatus.forEach(invoice => {
        console.log(`ID: ${invoice.id}, Number: ${invoice.invoice_number}, Status: "${invoice.status}", Length: ${invoice.status_length}`);
      });
    }

    process.exit(0);
  } catch (error) {
    console.error('✗ Error checking invoice:', error);
    process.exit(1);
  }
}

checkSpecificInvoice();
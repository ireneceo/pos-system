const database = require('./config/database');

async function checkInvoiceStatus() {
  try {
    console.log('📝 Checking invoice status in database...');

    // Raw query to see actual database values
    const [invoices] = await database.sequelize.query(
      "SELECT id, invoice_number, status FROM invoices ORDER BY id DESC LIMIT 10"
    );

    console.log('\n📊 Invoice Status in Database:');
    console.log('================================');
    invoices.forEach(invoice => {
      console.log(`ID: ${invoice.id}, Number: ${invoice.invoice_number}, Status: "${invoice.status}"`);
    });

    // Check ENUM definition
    const [columnInfo] = await database.sequelize.query(
      "SHOW COLUMNS FROM invoices WHERE Field = 'status'"
    );

    console.log('\n📋 Status Column Definition:');
    console.log('================================');
    console.log(columnInfo[0]);

    process.exit(0);
  } catch (error) {
    console.error('✗ Error checking invoice status:', error);
    process.exit(1);
  }
}

checkInvoiceStatus();
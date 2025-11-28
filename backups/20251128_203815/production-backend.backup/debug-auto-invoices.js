const database = require('./config/database');

async function debugAutoInvoices() {
  try {
    console.log('🔍 Debugging auto-generated invoices...');

    // Check for INV-202509 invoices specifically
    const [autoInvoices] = await database.sequelize.query(
      "SELECT * FROM invoices WHERE invoice_number LIKE 'INV-202509%' ORDER BY id DESC"
    );

    console.log('\n📊 Auto-generated Invoices:');
    console.log('================================');
    autoInvoices.forEach(invoice => {
      console.log(`ID: ${invoice.id}`);
      console.log(`Number: ${invoice.invoice_number}`);
      console.log(`Status: "${invoice.status}"`);
      console.log(`Restaurant ID: ${invoice.restaurant_id}`);
      console.log(`Type: ${invoice.type}`);
      console.log(`Created: ${invoice.createdAt}`);
      console.log('---');
    });

    // Delete these auto-generated invoices
    if (autoInvoices.length > 0) {
      console.log(`\n🗑️ Deleting ${autoInvoices.length} auto-generated invoices...`);
      await database.sequelize.query(
        "DELETE FROM invoices WHERE invoice_number LIKE 'INV-202509%'"
      );
      console.log('✅ Auto-generated invoices deleted');
    }

    // Show remaining invoices
    const [remainingInvoices] = await database.sequelize.query(
      "SELECT id, invoice_number, status FROM invoices ORDER BY id DESC LIMIT 5"
    );

    console.log('\n📋 Remaining Invoices:');
    console.log('================================');
    remainingInvoices.forEach(invoice => {
      console.log(`ID: ${invoice.id}, Number: ${invoice.invoice_number}, Status: "${invoice.status}"`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error debugging auto invoices:', error);
    process.exit(1);
  }
}

debugAutoInvoices();
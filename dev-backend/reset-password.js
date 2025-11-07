const bcrypt = require('bcrypt');
const { Customer } = require('./models');

(async () => {
  try {
    const phone = '+60172083359';
    const newPassword = process.argv[2] || 'irene123'; // Default password

    console.log(`🔐 Resetting password for ${phone}...\n`);

    const customer = await Customer.findOne({ where: { phone } });

    if (!customer) {
      console.log('❌ Customer not found');
      process.exit(1);
    }

    const password_hash = await bcrypt.hash(newPassword, 10);
    await customer.update({ password_hash });

    console.log('✅ Password reset successfully!');
    console.log(`\n📋 New Login Credentials:`);
    console.log(`   Phone: ${phone}`);
    console.log(`   Password: ${newPassword}`);
    console.log(`\n🔑 Use these to login now.`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
})();

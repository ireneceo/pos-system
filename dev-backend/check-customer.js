const bcrypt = require('bcrypt');
const { Customer, RestaurantCustomer } = require('./models');

(async () => {
  try {
    const phone = '+60172083359';

    console.log(`🔍 Checking customer with phone: ${phone}\n`);

    const customer = await Customer.findOne({
      where: { phone },
      attributes: ['id', 'phone', 'name', 'email', 'type', 'password_hash']
    });

    if (!customer) {
      console.log('✗ Customer NOT FOUND in database');
      console.log('   This phone number has not been registered yet.\n');
      process.exit(0);
    }

    console.log('✓ Customer FOUND:');
    console.log(`   ID: ${customer.id}`);
    console.log(`   Name: ${customer.name}`);
    console.log(`   Phone: ${customer.phone}`);
    console.log(`   Email: ${customer.email || 'N/A'}`);
    console.log(`   Type: ${customer.type}`);
    console.log(`   Has Password: ${customer.password_hash ? 'YES' : 'NO'}`);

    // Check restaurant relationship
    const relation = await RestaurantCustomer.findOne({
      where: {
        restaurant_id: 1,
        customer_id: customer.id
      }
    });

    if (relation) {
      console.log('\n✓ Restaurant Relationship FOUND:');
      console.log(`   Points: ${relation.points}`);
      console.log(`   Total Orders: ${relation.total_orders}`);
      console.log(`   Total Spent: RM ${relation.total_spent}`);
      console.log(`   Loyalty Tier: ${relation.loyalty_tier}`);
    } else {
      console.log('\n⚠️  Restaurant Relationship NOT FOUND');
      console.log('   Creating relationship now...');

      await RestaurantCustomer.create({
        restaurant_id: 1,
        customer_id: customer.id,
        points: 0,
        total_orders: 0,
        total_spent: 0,
        loyalty_tier: 'Bronze',
        first_order_at: new Date()
      });

      console.log('   ✓ Relationship created!');
    }

    // Test password if exists
    if (customer.password_hash && customer.type === 'member') {
      console.log('\n🔐 Testing Password:');
      console.log('   Type: member (password required)');

      // Test with common passwords
      const testPasswords = ['test123', '123456', 'password', customer.name.toLowerCase()];

      for (const testPwd of testPasswords) {
        const isMatch = await bcrypt.compare(testPwd, customer.password_hash);
        if (isMatch) {
          console.log(`   ✓ Password matched: "${testPwd}"`);
          break;
        }
      }
    }

    console.log('\n📋 To login, use:');
    console.log(`   Phone: ${customer.phone}`);
    console.log(`   Password: (the password you used during registration)`);

    process.exit(0);
  } catch (error) {
    console.error('✗ Error:', error.message);
    process.exit(1);
  }
})();

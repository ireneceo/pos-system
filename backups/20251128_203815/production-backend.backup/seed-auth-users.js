const { sequelize } = require('./config/database');
const User = require('./models/User');
const bcrypt = require('bcrypt');

async function seedAuthUsers() {
  try {
    // Test connection
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');

    // AuthContext에서 사용하는 테스트 계정들
    const testAccounts = [
      {
        id: 1,
        username: 'admin',
        email: 'admin@orderhere.com',
        password: 'admin123',
        role: 'System Admin',
        full_name: 'System Administrator',
        department: 'System Administration'
      },
      {
        id: 8,
        username: 'manager_kdine',
        email: 'manager@kdine.com',
        password: 'manager123',
        role: 'Manager',
        full_name: 'K-DINE Chain Manager',
        department: 'Management'
      },
      {
        id: 3,
        username: 'admin_nasilemak',
        email: 'admin@nasilemak.com',
        password: 'restaurant123',
        role: 'Restaurant Admin',
        full_name: 'Ahmad Rahman',
        department: 'Restaurant Management'
      },
      {
        id: 4,
        username: 'admin_kueyteow',
        email: 'admin@kueyteow.com',
        password: 'restaurant123',
        role: 'Restaurant Admin',
        full_name: 'Sarah Lim',
        department: 'Restaurant Management'
      },
      {
        id: 5,
        username: 'admin_koreanbbq',
        email: 'admin@koreanbbq.com',
        password: 'restaurant123',
        role: 'Restaurant Admin',
        full_name: 'David Kim',
        department: 'Restaurant Management'
      },
      {
        id: 6,
        username: 'admin_kdine_rest',
        email: 'admin@kdine.com',
        password: 'restaurant123',
        role: 'Restaurant Admin',
        full_name: 'K-DINE Admin',
        department: 'Restaurant Management'
      },
      {
        id: 7,
        username: 'staff_kdine',
        email: 'staff@kdine.com',
        password: 'staff123',
        role: 'Staff',
        full_name: 'K-DINE Staff Member',
        department: 'Operations'
      }
    ];

    for (const account of testAccounts) {
      // 이미 존재하는지 확인
      const existingUser = await User.findOne({ where: { email: account.email } });

      if (!existingUser) {
        const hashedPassword = await bcrypt.hash(account.password, 10);

        await User.create({
          id: account.id,
          username: account.username,
          email: account.email,
          password: hashedPassword,
          role: account.role,
          full_name: account.full_name,
          department: account.department
        });

        console.log(`✅ Created user: ${account.email} (${account.role})`);
      } else {
        console.log(`👍 User already exists: ${account.email}`);
      }
    }

    console.log('✅ All auth users have been seeded successfully.');

  } catch (error) {
    console.error('❌ Error seeding auth users:', error);
  } finally {
    await sequelize.close();
  }
}

// Run the seeding if this file is executed directly
if (require.main === module) {
  seedAuthUsers();
}

module.exports = seedAuthUsers;
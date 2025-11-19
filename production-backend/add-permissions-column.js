const { sequelize } = require('./config/database');

async function addPermissionsColumn() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established');

    // Check if permissions column exists
    const [results] = await sequelize.query("SHOW COLUMNS FROM users LIKE 'permissions'");

    if (results.length === 0) {
      console.log('📝 Adding permissions column...');
      await sequelize.query("ALTER TABLE users ADD COLUMN permissions TEXT DEFAULT '[]'");
      console.log('✅ Permissions column added successfully');
    } else {
      console.log('✅ Permissions column already exists');
      console.log('Current column info:', results[0]);
    }

    // Test the column by checking a few users
    const [users] = await sequelize.query('SELECT id, username, permissions FROM users LIMIT 3');
    console.log('📝 Sample users with permissions:');
    users.forEach(user => {
      console.log(`  - ${user.username}: ${user.permissions}`);
    });

    await sequelize.close();
    console.log('✅ Database connection closed');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

addPermissionsColumn();
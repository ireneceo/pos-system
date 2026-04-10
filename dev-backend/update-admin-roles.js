const { sequelize } = require('./config/database');

async function updateAdminRoles() {
  try {
    await sequelize.authenticate();
    console.log('✓ Database connection established successfully.');

    // 먼저 'Super Admin'을 'System Admin'으로 업데이트
    const [results] = await sequelize.query(`
      UPDATE users SET role = 'System Admin' WHERE role = 'Super Admin'
    `);

    console.log('✓ Updated', results.affectedRows, 'Super Admin records to System Admin');

    // 이제 enum 변경
    await sequelize.query(`
      ALTER TABLE users MODIFY COLUMN role ENUM('System Admin', 'Manager', 'Restaurant Admin', 'Staff') DEFAULT 'Staff'
    `);

    console.log('✓ Updated role enum to use System Admin');

  } catch (error) {
    console.error('✗ Error updating admin roles:', error);
  } finally {
    await sequelize.close();
  }
}

updateAdminRoles();
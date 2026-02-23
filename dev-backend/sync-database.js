const path = require('path');
const fs = require('fs');
const { sequelize } = require('./config/database');

async function syncDatabase() {
  try {
    // Test connection
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');

    // Auto-load ALL models from models/ directory
    const modelsDir = path.join(__dirname, 'models');
    const modelFiles = fs.readdirSync(modelsDir)
      .filter(f => f.endsWith('.js') && f !== 'index.js');

    const models = {};
    for (const file of modelFiles) {
      const model = require(path.join(modelsDir, file));
      if (model && model.name) {
        models[model.name] = model;
      }
    }
    console.log(`✅ ${Object.keys(models).length} models loaded: ${Object.keys(models).join(', ')}`);

    // Skip associations - they are initialized by models/index.js at server startup.
    // sync-database.js only needs to sync table columns (ADD/ALTER columns).
    // Running associate() here causes duplicate alias conflicts.

    // Temporarily disable FK checks to avoid constraint issues during ALTER TABLE.
    // Legacy data may violate FK constraints that Sequelize tries to re-create.
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');

    // Sync each model individually with ALTER.
    // This way a failure on one table doesn't block the rest.
    const failed = [];
    const succeeded = [];

    for (const [name, model] of Object.entries(models)) {
      try {
        await model.sync({ alter: true });
        succeeded.push(name);
      } catch (err) {
        failed.push({ name, error: err.message });
        console.warn(`⚠️  ${name}: ${err.message}`);
      }
    }

    // Re-enable FK checks
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

    console.log(`\n✅ ${succeeded.length} models synchronized successfully.`);
    if (failed.length > 0) {
      console.log(`⚠️  ${failed.length} models had issues (may need manual migration):`);
      failed.forEach(f => console.log(`   - ${f.name}: ${f.error.substring(0, 120)}`));
    }

    process.exit(failed.length > 0 ? 2 : 0);
  } catch (error) {
    console.error('❌ Unable to sync database:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  syncDatabase();
}
